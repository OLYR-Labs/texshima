import { db } from "@/lib/db";
import { verifyPayHereNotification } from "@/lib/payhere";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const merchantId = String(
      formData.get("merchant_id") || ""
    );

    const orderId = String(
      formData.get("order_id") || ""
    );

    const paymentId = String(
      formData.get("payment_id") || ""
    );

    const amount = String(
      formData.get("payhere_amount") || ""
    );

    const currency = String(
      formData.get("payhere_currency") || ""
    );

    const statusCode = String(
      formData.get("status_code") || ""
    );

    const md5sig = String(
      formData.get("md5sig") || ""
    );

    const configuredMerchantId =
      process.env.PAYHERE_MERCHANT_ID;

    const merchantSecret =
      process.env.PAYHERE_MERCHANT_SECRET;

    if (
      !configuredMerchantId ||
      !merchantSecret
    ) {
      return new Response(
        "PayHere configuration missing",
        {
          status: 500,
        }
      );
    }

    if (merchantId !== configuredMerchantId) {
      return new Response(
        "Invalid merchant",
        {
          status: 400,
        }
      );
    }

    if (
      !orderId ||
      !paymentId ||
      !amount ||
      !currency ||
      !statusCode ||
      !md5sig
    ) {
      return new Response(
        "Missing payment data",
        {
          status: 400,
        }
      );
    }

    const valid =
      verifyPayHereNotification(
        merchantId,
        orderId,
        amount,
        currency,
        statusCode,
        md5sig,
        merchantSecret
      );

    if (!valid) {
      console.error(
        "Invalid PayHere notification signature"
      );

      return new Response(
        "Invalid signature",
        {
          status: 400,
        }
      );
    }

    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return new Response(
        "Order not found",
        {
          status: 404,
        }
      );
    }

    const receivedAmount = Number(amount);
    const receivedCurrency =
      currency.toUpperCase();

    if (
      Math.abs(
        order.total - receivedAmount
      ) > 0.01 ||
      receivedCurrency !== "LKR"
    ) {
      console.error(
        "PayHere amount/currency mismatch",
        {
          orderId,
          expected: order.total,
          received: receivedAmount,
          currency: receivedCurrency,
        }
      );

      return new Response(
        "Payment mismatch",
        {
          status: 400,
        }
      );
    }

    /*
     * PayHere status codes:
     *
     * 2  = Success
     * 0  = Pending
     * -1 = Canceled
     * -2 = Failed
     * -3 = Charged back
     */

    if (statusCode === "2") {
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "PAID",
          paymentStatus: "PAID",
          payherePaymentId: paymentId,
        },
      });
    } else if (statusCode === "0") {
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          paymentStatus: "PENDING",
          payherePaymentId: paymentId,
        },
      });
    } else {
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "CANCELLED",
          paymentStatus: "FAILED",
          payherePaymentId: paymentId,
        },
      });
    }

    return new Response("OK", {
      status: 200,
    });
  } catch (error) {
    console.error(
      "PayHere notification error:",
      error
    );

    return new Response(
      "Notification failed",
      {
        status: 500,
      }
    );
  }
}