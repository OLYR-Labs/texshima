import Link from "next/link";
import { db } from "@/lib/db";

type SuccessPageProps = {
  searchParams: Promise<{
    order_id?: string;
  }>;
};

export default async function SuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const orderId = params.order_id;

  if (!orderId) {
    return (
      <section className="page-pad flex min-h-[70vh] items-center justify-center py-20 text-center">
        <div>
          <p className="text-xs uppercase tracking-[.3em] text-muted">
            Payment information
          </p>

          <h1 className="display mt-5 text-5xl font-semibold">
            Order not found.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-muted">
            We couldn't find an order associated with this
            payment session.
          </p>

          <Link
            href="/shop/all"
            className="mt-8 inline-block bg-black px-8 py-3 text-sm text-white"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      id: true,
      status: true,
      paymentStatus: true,
      total: true,
      shippingEmail: true,
    },
  });

  if (!order) {
    return (
      <section className="page-pad flex min-h-[70vh] items-center justify-center py-20 text-center">
        <div>
          <p className="text-xs uppercase tracking-[.3em] text-muted">
            Order
          </p>

          <h1 className="display mt-5 text-5xl font-semibold">
            Order not found.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-muted">
            We couldn't find that order. Please contact us
            if you believe this is an error.
          </p>

          <Link
            href="/shop/all"
            className="mt-8 inline-block bg-black px-8 py-3 text-sm text-white"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  const isPaid =
    order.status === "PAID" &&
    order.paymentStatus === "PAID";

  const isCancelled =
    order.status === "CANCELLED" ||
    order.paymentStatus === "FAILED";

  if (isPaid) {
    return (
      <section className="page-pad flex min-h-[70vh] items-center justify-center py-20 text-center">
        <div>
          <p className="text-xs uppercase tracking-[.3em] text-muted">
            Order confirmed
          </p>

          <h1 className="display mt-5 text-6xl font-semibold">
            Thank you.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-muted">
            Your payment has been confirmed and your order
            has been received. We'll send your delivery
            updates to:
          </p>

          <p className="mt-3 text-sm font-medium">
            {order.shippingEmail}
          </p>

          <p className="mt-3 text-xs text-muted">
            Order #{order.id}
          </p>

          <Link
            href="/shop/all"
            className="mt-8 inline-block bg-black px-8 py-3 text-sm text-white"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  if (isCancelled) {
    return (
      <section className="page-pad flex min-h-[70vh] items-center justify-center py-20 text-center">
        <div>
          <p className="text-xs uppercase tracking-[.3em] text-muted">
            Payment
          </p>

          <h1 className="display mt-5 text-5xl font-semibold">
            Payment unsuccessful.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-muted">
            Your payment was not completed, so your order
            has not been confirmed.
          </p>

          <Link
            href="/checkout"
            className="mt-8 inline-block bg-black px-8 py-3 text-sm text-white"
          >
            Return to checkout
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-pad flex min-h-[70vh] items-center justify-center py-20 text-center">
      <div>
        <p className="text-xs uppercase tracking-[.3em] text-muted">
          Payment processing
        </p>

        <h1 className="display mt-5 text-5xl font-semibold">
          We're processing your payment.
        </h1>

        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-muted">
          Your order has been received, but PayHere hasn't
          confirmed the payment yet. Please wait a moment
          before closing this page.
        </p>

        <p className="mt-4 text-xs text-muted">
          Order #{order.id}
        </p>

        <Link
          href="/shop/all"
          className="mt-8 inline-block bg-black px-8 py-3 text-sm text-white"
        >
          Continue shopping
        </Link>
      </div>
    </section>
  );
}