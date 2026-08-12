"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { money } from "@/lib/utils";

export default function CartPage() {
  const { items, update, remove } = useCart();

  const subtotal = items.reduce(
    (n, i) => n + i.price * i.quantity,
    0
  );

  const shipping =
    subtotal >= 15000 || subtotal === 0 ? 0 : 450;

  const total = subtotal + shipping;

  return (
    <section className="page-pad section-pad">
      {/* Header */}
      <div className="mb-10 border-b border-line pb-8 md:mb-14">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted">
          Your selection
        </p>

        <div className="mt-3 flex items-end justify-between gap-4">
          <h1 className="display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Shopping bag
          </h1>

          {items.length > 0 && (
            <span className="mb-1 rounded-full bg-black px-3 py-1.5 text-[10px] font-semibold text-white">
              {items.reduce((n, i) => n + i.quantity, 0)} items
            </span>
          )}
        </div>
      </div>

      {/* Empty Cart */}
      {items.length === 0 ? (
        <div className="mx-auto flex min-h-[45vh] max-w-md flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-2xl">
            ♡
          </div>

          <h2 className="display text-3xl font-semibold">
            Your bag is empty
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted">
            Looks like you haven't added anything to your bag yet.
          </p>

          <Link
            href="/shop/all"
            className="mt-7 rounded-full bg-black px-7 py-3.5 text-xs font-semibold text-white transition hover:bg-neutral-800"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          {/* Cart Items */}
          <div>
            <div className="mb-4 hidden items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-muted sm:flex">
              <span>Products</span>
              <span>{items.length} selections</span>
            </div>

            <div className="divide-y divide-line rounded-2xl border border-line bg-white">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 p-4 sm:gap-5 sm:p-5"
                >
                  {/* Product Image */}
                  <Link
                    href={`/product/${item.id}`}
                    className="relative h-32 w-24 flex-none overflow-hidden rounded-xl bg-surface sm:h-40 sm:w-28"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="112px"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex min-w-0 flex-1 justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold sm:text-base">
                        {item.name}
                      </h2>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.color && (
                          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] text-muted">
                            {item.color}
                          </span>
                        )}

                        {item.size && (
                          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] text-muted">
                            Size {item.size}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          remove(item.id, item.size, item.color)
                        }
                        className="mt-5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted underline underline-offset-4 transition hover:text-black"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Price + Quantity */}
                    <div className="flex flex-col items-end justify-between">
                      <p className="text-sm font-semibold">
                        {money(item.price * item.quantity)}
                      </p>

                      <div className="flex items-center overflow-hidden rounded-full border border-line bg-neutral-50">
                        <button
                          onClick={() =>
                            update(
                              item.id,
                              item.size,
                              item.color,
                              item.quantity - 1
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center text-sm transition hover:bg-black hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span className="flex h-8 w-8 items-center justify-center text-[11px] font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            update(
                              item.id,
                              item.size,
                              item.color,
                              item.quantity + 1
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center text-sm transition hover:bg-black hover:text-white"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <Link
              href="/shop/all"
              className="mt-6 inline-flex items-center gap-2 text-xs font-medium transition hover:gap-3"
            >
              <span>←</span>
              Continue shopping
            </Link>
          </div>

          {/* Order Summary */}
          <aside className="h-fit rounded-2xl border border-black/5 bg-neutral-50 p-6 sm:p-7 lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">
                Order summary
              </h2>

              <span className="text-[10px] uppercase tracking-[0.15em] text-muted">
                {items.length} products
              </span>
            </div>

            <div className="mt-7 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium">
                  {money(subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted">Delivery</span>
                <span className="font-medium">
                  {shipping ? money(shipping) : "Free"}
                </span>
              </div>
            </div>

            {shipping > 0 && (
              <div className="mt-5 rounded-xl bg-white px-4 py-3 text-[10px] leading-5 text-muted">
                Add {money(15000 - subtotal)} more to your bag to
                unlock free delivery.
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
              <span className="text-sm font-semibold">
                Total
              </span>

              <span className="text-lg font-semibold">
                {money(total)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block rounded-full bg-gradient-to-r from-black via-neutral-800 to-black py-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Proceed to checkout
            </Link>

            <p className="mt-4 text-center text-[9px] leading-4 text-muted">
              Secure checkout · Multiple payment options available
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}