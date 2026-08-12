import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      {/* Blue Gradient Glow */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-[120px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-blue-500/15 blur-[140px]"
        aria-hidden="true"
      />

      {/* Main Footer */}
      <div className="page-pad relative grid gap-12 py-14 md:grid-cols-4 md:py-16">
        {/* Brand */}
        <div className="md:col-span-2">
          <Link
            href="/"
            aria-label="Texshima home"
            className="group inline-block"
          >
            <span
              className="
                block
                select-none
                text-3xl
                font-black
                leading-none
                tracking-[0.015em]
                text-white
                antialiased
                transition-all
                duration-300
                group-hover:tracking-[0.035em]
                sm:text-4xl
              "
            >
              TEXSHIMA
            </span>

            <span
              className="
                mt-2
                block
                h-[2px]
                w-0
                rounded-full
                bg-gradient-to-r
                from-blue-400
                via-blue-500
                to-cyan-400
                transition-all
                duration-300
                group-hover:w-full
              "
            />
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-6 text-white/55">
            Modern clothing for everyday life. Designed with restraint,
            made to last.
          </p>

          {/* Brand Accent */}
          <div className="mt-7 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
              Modern essentials
            </span>
          </div>
        </div>

        {/* Shop */}
        <div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
            Shop
          </p>

          <div className="flex flex-col gap-3.5 text-sm text-white/50">
            <Link
              href="/shop/women"
              className="w-fit transition-colors hover:text-white"
            >
              Women
            </Link>

            <Link
              href="/shop/men"
              className="w-fit transition-colors hover:text-white"
            >
              Men
            </Link>

            <Link
              href="/shop/kids"
              className="w-fit transition-colors hover:text-white"
            >
              Kids
            </Link>

            <Link
              href="/shop/sale"
              className="w-fit text-blue-400 transition-colors hover:text-blue-300"
            >
              Sale
            </Link>
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
            Info
          </p>

          <div className="flex flex-col gap-3.5 text-sm text-white/50">
            <Link
              href="/about"
              className="w-fit transition-colors hover:text-white"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="w-fit transition-colors hover:text-white"
            >
              Contact
            </Link>

            <Link
              href="/account"
              className="w-fit transition-colors hover:text-white"
            >
              Account
            </Link>

            <Link
              href="/cart"
              className="w-fit transition-colors hover:text-white"
            >
              Bag
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="page-pad flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-white/35">
            © 2026 TEXSHIMA. All rights reserved.
          </p>

          {/* OLYR Labs Credit */}
          <div className="flex items-center gap-2 text-[10px] text-white/35">
            <span>Developed by</span>

            <Link
              href="https://olyrlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-semibold
                tracking-[0.08em]
                text-white/70
                transition-colors
                hover:text-blue-400
              "
            >
              OLYR LABS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}