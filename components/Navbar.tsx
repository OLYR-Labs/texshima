"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const count = useCart((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
      <div className="page-pad flex h-[68px] items-center justify-between gap-5 md:h-[72px]">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-black/5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`block h-[1.5px] w-5 bg-black transition-transform duration-300 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-black transition-transform duration-300 ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        {/* TEXSHIMA Logo */}
        <Link
          href="/"
          aria-label="Texshima home"
          className="group relative shrink-0"
        >
          <span
            className="
              block
              select-none
              text-[22px]
              font-black
              leading-none
              tracking-[0.015em]
              text-black
              antialiased
              transition-all
              duration-300
              group-hover:tracking-[0.035em]
              sm:text-[24px]
              md:text-[26px]
            "
          >
            TEXSHIMA
          </span>

          {/* Subtle logo accent */}
          <span
            className="
              absolute
              -bottom-1
              left-0
              h-[2px]
              w-0
              rounded-full
              bg-gradient-to-r
              from-black
              via-neutral-500
              to-black
              transition-all
              duration-300
              group-hover:w-full
            "
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.12em] md:flex lg:gap-8">
          <Link
            href="/shop/women"
            className="relative py-2 transition-colors hover:text-neutral-500"
          >
            Women
          </Link>

          <Link
            href="/shop/men"
            className="relative py-2 transition-colors hover:text-neutral-500"
          >
            Men
          </Link>

          <Link
            href="/shop/kids"
            className="relative py-2 transition-colors hover:text-neutral-500"
          >
            Kids
          </Link>

          <Link
            href="/shop/accessories"
            className="relative py-2 transition-colors hover:text-neutral-500"
          >
            Accessories
          </Link>

          <Link
            href="/shop/sale"
            className="rounded-full bg-black px-3.5 py-1.5 text-[10px] font-bold tracking-[0.14em] text-white transition-all hover:bg-neutral-700"
          >
            Sale
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 text-sm sm:gap-3">
          <Link
            href="/search"
            aria-label="Search"
            className="
              hidden
              rounded-full
              px-3
              py-2
              text-xs
              font-medium
              transition
              hover:bg-black/5
              sm:block
            "
          >
            Search
          </Link>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-lg
              transition
              hover:bg-black/5
            "
          >
            ♡
          </Link>

          <Link
            href="/account"
            aria-label="Account"
            className="
              hidden
              rounded-full
              px-3
              py-2
              text-xs
              font-medium
              transition
              hover:bg-black/5
              sm:block
            "
          >
            Account
          </Link>

          <Link
            href="/cart"
            className="
              flex
              items-center
              rounded-full
              bg-black
              px-3.5
              py-2
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-neutral-800
              sm:px-4
            "
          >
            Bag
            <span className="ml-1.5 text-white/60">({count})</span>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <nav className="border-t border-black/5 bg-white/95 px-5 py-6 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {[
              ["Women", "/shop/women"],
              ["Men", "/shop/men"],
              ["Kids", "/shop/kids"],
              ["Accessories", "/shop/accessories"],
              ["Sale", "/shop/sale"],
              ["Search", "/search"],
              ["Account", "/account"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`
                  rounded-xl
                  px-4
                  py-3.5
                  text-base
                  font-medium
                  transition
                  hover:bg-black/5
                  ${
                    label === "Sale"
                      ? "text-sale"
                      : "text-black"
                  }
                `}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}