import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";

export default async function Home() {
  const products = await db.product.findMany({
    where: { featured: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="overflow-hidden bg-white text-neutral-950">
      {/* HERO */}
      <section className="page-pad pt-4 sm:pt-6">
        <div className="relative min-h-[72vh] overflow-hidden rounded-[28px] bg-neutral-950 text-white sm:min-h-[78vh] sm:rounded-[36px]">
          <Image
            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=2200&q=90"
            alt="Texshima new season editorial"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

          {/* Gradient glow */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />

          <div className="relative flex min-h-[72vh] items-end p-6 sm:min-h-[78vh] sm:p-10 md:p-14 lg:p-16">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.25em] backdrop-blur-md sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                New season · 2026
              </div>

              <h1 className="display max-w-4xl text-[3.8rem] font-semibold leading-[0.88] tracking-[-0.05em] sm:text-7xl md:text-8xl lg:text-[9rem]">
                THE
                <br />
                EVERYDAY
                <br />
                <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                  EDIT.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-6 text-white/75 sm:text-base">
                Clean silhouettes, considered fabrics and everyday pieces
                designed to move with you.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/shop/women"
                  className="rounded-full bg-white px-6 py-3 text-xs font-semibold text-black shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-100 sm:px-7 sm:py-3.5 sm:text-sm"
                >
                  Shop women
                </Link>

                <Link
                  href="/shop/men"
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black sm:px-7 sm:py-3.5 sm:text-sm"
                >
                  Shop men
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-7 right-7 hidden items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/60 sm:flex">
            <span>Explore</span>
            <span className="h-px w-10 bg-white/40" />
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="page-pad section-pad">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
                Curated now
              </p>
            </div>

            <h2 className="display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl md:text-6xl">
              New arrivals
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-muted">
              Fresh pieces selected for the season.
            </p>
          </div>

          <Link
            href="/shop/all"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-line px-5 py-2.5 text-xs font-medium transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
          >
            View all
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] border border-line bg-neutral-50 px-6 py-16 text-center">
            <p className="text-sm text-muted">
              New arrivals are coming soon.
            </p>
          </div>
        )}
      </section>

      {/* COLLECTIONS */}
      <section className="page-pad pb-8 sm:pb-12">
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
          {/* WOMEN */}
          <Link
            href="/shop/women"
            className="group relative min-h-[55vh] overflow-hidden rounded-[28px] bg-neutral-100 sm:min-h-[65vh] sm:rounded-[32px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=90"
              alt="Women's collection"
              fill
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            <div className="absolute left-6 right-6 top-6 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md">
                Collection 01
              </span>

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition duration-300 group-hover:bg-white group-hover:text-black">
                ↗
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
              <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-white/60">
                The women's edit
              </p>

              <h3 className="display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Women
              </h3>

              <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition duration-300 group-hover:px-6">
                Explore collection
                <span>→</span>
              </div>
            </div>
          </Link>

          {/* MEN */}
          <Link
            href="/shop/men"
            className="group relative min-h-[55vh] overflow-hidden rounded-[28px] bg-neutral-100 sm:min-h-[65vh] sm:rounded-[32px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=90"
              alt="Men's collection"
              fill
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            <div className="absolute left-6 right-6 top-6 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8">
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md">
                Collection 02
              </span>

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition duration-300 group-hover:bg-white group-hover:text-black">
                ↗
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
              <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-white/60">
                The men's edit
              </p>

              <h3 className="display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Men
              </h3>

              <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition duration-300 group-hover:px-6">
                Explore collection
                <span>→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="page-pad section-pad">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-neutral-50 px-6 py-16 sm:rounded-[32px] sm:px-10 sm:py-20 md:px-16 md:py-24">
          {/* Decorative gradient */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-neutral-200 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-neutral-200 blur-3xl" />

          <div className="relative mx-auto max-w-5xl text-center">
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
              Texshima essentials
            </div>

            <h2 className="display mt-7 text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl lg:text-8xl">
              Less noise.
              <br />
              <span className="text-muted">Better clothes.</span>
            </h2>

            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-muted sm:text-base">
              Clean silhouettes, considered fabrics and everyday pieces made
              to work together. Designed for the way you actually live.
            </p>

            <Link
              href="/shop/all"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-neutral-950 px-6 py-3 text-xs font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-800"
            >
              Discover Texshima
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="page-pad pb-8 sm:pb-12">
        <div className="overflow-hidden rounded-[28px] bg-neutral-950 sm:rounded-[32px]">
          <Newsletter />
        </div>
      </section>
    </main>
  );
}