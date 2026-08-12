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

  const itemCount = items.reduce(
    (n, i) => n + i.quantity,
    0
  );

  return (
    <section className="page-pad section-pad">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="relative mb-10 overflow-hidden rounded-[2rem] border border-black/5 bg-gradient-to-br from-neutral-50 via-white to-blue-50/50 px-6 py-8 sm:px-8 sm:py-10 md:mb-14 md:px-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
                Your selection
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h1 className="display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl md:text-6xl">
                Shopping bag
              </h1>

              {items.length > 0 && (
                <div className="flex w-fit items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 shadow-sm">
                  <span className="text-xs font-semibold">
                    {itemCount}
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.15em] text-muted">
                    {itemCount === 1 ? "item" : "items"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        {items.length === 0 ? (
          <div className="relative mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-black/5 bg-gradient-to-br from-neutral-50 via-white to-blue-50/40 px-6 text-center">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative z-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-2xl text-white shadow-xl">
                ♡
              </div>

              <h2 className="display mt-7 text-3xl font-semibold tracking-tight sm:text-4xl">
                Your bag is empty
              </h2>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-muted">
                Nothing here yet. Discover the latest TEXSHIMA pieces
                and find something made for your everyday.
              </p>

              <Link
                href="/shop/all"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-black px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-xl"
              >
                Continue shopping

                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-14">
            {/* Cart Items */}
            <div>
              <div className="mb-4 flex items-center justify-between px-1">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                    Your products
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    {items.length}{" "}
                    {items.length === 1 ? "selection" : "selections"}
                  </p>
                </div>

                <span className="hidden rounded-full bg-neutral-100 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-muted sm:block">
                  TEXSHIMA
                </span>
              </div>

              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-4"
                  >
                    <div className="flex gap-4 sm:gap-5">
                      {/* Product Image */}
                      <Link
                        href={`/product/${item.id}`}
                        className="relative h-32 w-24 flex-none overflow-hidden rounded-xl bg-surface sm:h-40 sm:w-28"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-105"
                          sizes="112px"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                      </Link>

                      {/* Product Details */}
                      <div className="flex min-w-0 flex-1 justify-between gap-3">
                        <div className="flex min-w-0 flex-col">
                          <div>
                            <h2 className="truncate text-sm font-semibold sm:text-base">
                              {item.name}
                            </h2>

                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {item.color && (
                                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[9px] font-medium text-muted">
                                  {item.color}
                                </span>
                              )}

                              {item.size && (
                                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[9px] font-medium text-muted">
                                  Size {item.size}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              remove(
                                item.id,
                                item.size,
                                item.color
                              )
                            }
                            className="mt-auto w-fit pt-5 text-[9px] font-semibold uppercase tracking-[0.15em] text-muted underline underline-offset-4 transition hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>

                        {/* Price + Quantity */}
                        <div className="flex flex-col items-end justify-between">
                          <p className="text-sm font-semibold">
                            {money(item.price * item.quantity)}
                          </p>

                          <div className="flex items-center overflow-hidden rounded-full border border-black/8 bg-neutral-50 shadow-sm">
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

                            <span className="flex h-8 min-w-8 items-center justify-center border-x border-black/5 px-1 text-[10px] font-semibold">
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
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Link
                href="/shop/all"
                className="group mt-7 inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] transition duration-300 hover:border-black hover:bg-black hover:text-white"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>

                Continue shopping
              </Link>
            </div>

            {/* Order Summary */}
            <aside className="h-fit lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-[1.75rem] bg-black p-6 text-white shadow-2xl shadow-black/10 sm:p-7">
                {/* Gradient */}
                <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
                        Checkout
                      </p>

                      <h2 className="display mt-2 text-2xl font-semibold">
                        Order summary
                      </h2>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs">
                      {itemCount}
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/45">
                        Subtotal
                      </span>

                      <span className="font-medium">
                        {money(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-white/45">
                        Delivery
                      </span>

                      <span className="font-medium">
                        {shipping ? money(shipping) : "Free"}
                      </span>
                    </div>
                  </div>

                  {shipping > 0 && (
                    <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-white/[0.06]">
                      <div className="h-1 bg-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                          style={{
                            width: `${Math.min(
                              (subtotal / 15000) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>

                      <div className="px-4 py-3">
                        <p className="text-[10px] leading-5 text-white/50">
                          Add{" "}
                          <span className="font-semibold text-white/80">
                            {money(15000 - subtotal)}
                          </span>{" "}
                          more to unlock free delivery.
                        </p>
                      </div>
                    </div>
                  )}

                  {shipping === 0 && subtotal > 0 && (
                    <div className="mt-6 flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-[9px]">
                        ✓
                      </span>

                      <p className="text-[10px] font-medium text-white/70">
                        You qualify for free delivery.
                      </p>
                    </div>
                  )}

                  <div className="mt-7 border-t border-white/10 pt-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                          Total
                        </p>

                        <p className="mt-1 text-xs text-white/40">
                          Including delivery
                        </p>
                      </div>

                      <span className="text-2xl font-semibold tracking-tight">
                        {money(total)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="group relative mt-7 flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-white py-4 text-xs font-semibold uppercase tracking-[0.15em] text-black transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/20"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 transition-transform duration-500 group-hover:translate-x-0" />

                    <span className="relative z-10 transition-colors group-hover:text-white">
                      Proceed to checkout
                    </span>

                    <span className="relative z-10 text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                      →
                    </span>
                  </Link>

                  <div className="mt-5 flex items-center justify-center gap-2 text-[9px] text-white/30">
                    <span className="h-1 w-1 rounded-full bg-cyan-400" />
                    Secure checkout
                    <span className="text-white/15">·</span>
                    Multiple payment options
                  </div>
                </div>
              </div>

              {/* Trust Card */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-black/5 bg-neutral-50 px-2 py-3 text-center">
                  <p className="text-[9px] font-semibold">
                    ✓
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-wider text-muted">
                    Secure
                  </p>
                </div>

                <div className="rounded-xl border border-black/5 bg-neutral-50 px-2 py-3 text-center">
                  <p className="text-[9px] font-semibold">
                    ↺
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-wider text-muted">
                    Easy returns
                  </p>
                </div>

                <div className="rounded-xl border border-black/5 bg-neutral-50 px-2 py-3 text-center">
                  <p className="text-[9px] font-semibold">
                    ◆
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-wider text-muted">
                    TEXSHIMA
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}