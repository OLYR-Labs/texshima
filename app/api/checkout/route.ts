import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  generatePayHereHash,
  PAYHERE_SANDBOX_URL,
} from "@/lib/payhere";

const schema = z.object({
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    address: z.string().min(3),
    city: z.string().min(2),
    postal: z.string().min(2),
  }),

  items: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        quantity: z.number().int().positive(),
        size: z.string(),
        color: z.string(),
        image: z.string(),
      })
    )
    .min(1),
});

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());

    const merchantId = process.env.PAYHERE_MERCHANT_ID;
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!merchantId) {
      throw new Error("PAYHERE_MERCHANT_ID is not configured");
    }

    if (!merchantSecret) {
      throw new Error("PAYHERE_MERCHANT_SECRET is not configured");
    }

    if (!appUrl) {
      throw new Error("NEXT_PUBLIC_APP_URL is not configured");
    }

    const ids = data.items.map((item) => item.id);

    const products = await db.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const productMap = new Map(
      products.map((product) => [product.id, product])
    );

    let total = 0;

    for (const item of data.items) {
      const product = productMap.get(item.id);

      if (!product) {
        throw new Error(`Product not found: ${item.id}`);
      }

      const unitPrice = product.salePrice ?? product.price;

      total += unitPrice * item.quantity;
    }

    total = Number(total.toFixed(2));

    const order = await db.order.create({
      data: {
        total,

        status: "PENDING",
        paymentStatus: "PENDING",

        shippingName: data.customer.name,
        shippingEmail: data.customer.email,
        shippingPhone: data.customer.phone,
        shippingAddress: data.customer.address,
        shippingCity: data.customer.city,
        shippingPostal: data.customer.postal,

        items: {
          create: data.items.map((item) => {
            const product = productMap.get(item.id);

            if (!product) {
              throw new Error(`Product not found: ${item.id}`);
            }

            return {
              productId: product.id,
              name: product.name,
              price: product.salePrice ?? product.price,
              quantity: item.quantity,
              size: item.size,
              color: item.color,
            };
          }),
        },
      },
    });

    const nameParts = data.customer.name
      .trim()
      .split(/\s+/);

    const firstName =
      nameParts.shift() || data.customer.name;

    const lastName =
      nameParts.join(" ") || firstName;

    const currency = "LKR";

    const hash = generatePayHereHash(
      merchantId,
      order.id,
      total,
      currency,
      merchantSecret
    );

    const paymentData = {
      merchant_id: merchantId,

      return_url:
        `${appUrl}/order/success?order_id=${order.id}`,

      cancel_url:
        `${appUrl}/cart?payment=cancelled`,

      notify_url:
        `${appUrl}/api/payhere/notify`,

      first_name: firstName,
      last_name: lastName,

      email: data.customer.email,
      phone: data.customer.phone,

      address: data.customer.address,
      city: data.customer.city,
      country: "Sri Lanka",

      order_id: order.id,

      items: data.items
        .map(
          (item) =>
            `${item.name} x ${item.quantity}`
        )
        .join(", "),

      currency,
      amount: total.toFixed(2),
      hash,
    };

    return NextResponse.json({
      paymentUrl: PAYHERE_SANDBOX_URL,
      paymentData,
    });
  } catch (error) {
    console.error(
      "PayHere checkout error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Checkout failed",
      },
      {
        status: 400,
      }
    );
  }
}