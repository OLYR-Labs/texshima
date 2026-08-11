"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl">
      <div className="page-pad flex h-16 items-center justify-between gap-6">
        <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Toggle menu">
          <span className="block h-px w-5 bg-black" />
          <span className="mt-1.5 block h-px w-5 bg-black" />
        </button>

        <Link href="/" className="display text-2xl font-black tracking-[-.07em]">TEXSHIMA</Link>

        <nav className="hidden items-center gap-7 text-xs font-medium uppercase tracking-[.08em] md:flex">
          <Link href="/shop/women" className="hover:text-muted">Women</Link>
          <Link href="/shop/men" className="hover:text-muted">Men</Link>
          <Link href="/shop/kids" className="hover:text-muted">Kids</Link>
          <Link href="/shop/accessories" className="hover:text-muted">Accessories</Link>
          <Link href="/shop/sale" className="text-sale">Sale</Link>
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/search" aria-label="Search" className="hidden sm:block">Search</Link>
          <Link href="/wishlist" aria-label="Wishlist">♡</Link>
          <Link href="/account" aria-label="Account" className="hidden sm:block">Account</Link>
          <Link href="/cart" className="relative">Bag <span className="text-muted">({count})</span></Link>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-white px-5 py-6 md:hidden">
          <div className="flex flex-col gap-5 text-lg">
            {[
              ["Women", "/shop/women"], ["Men", "/shop/men"], ["Kids", "/shop/kids"],
              ["Accessories", "/shop/accessories"], ["Sale", "/shop/sale"], ["Search", "/search"], ["Account", "/account"]
            ].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
