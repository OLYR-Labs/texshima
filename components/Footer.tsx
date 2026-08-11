import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="page-pad grid gap-12 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="display text-3xl font-black tracking-[-.07em]">TEXSHIMA</div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted">Modern clothing for everyday life. Designed with restraint, made to last.</p>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em]">Shop</p>
          <div className="flex flex-col gap-3 text-sm text-muted">
            <Link href="/shop/women">Women</Link><Link href="/shop/men">Men</Link><Link href="/shop/kids">Kids</Link><Link href="/shop/sale">Sale</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em]">Info</p>
          <div className="flex flex-col gap-3 text-sm text-muted">
            <Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/account">Account</Link><Link href="/cart">Bag</Link>
          </div>
        </div>
      </div>
      <div className="page-pad border-t border-line py-5 text-xs text-muted">© 2026 TEXSHIMA. All rights reserved.</div>
    </footer>
  );
}
