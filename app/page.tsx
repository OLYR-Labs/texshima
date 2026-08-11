import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";

export default async function Home() {
  const products = await db.product.findMany({ where: { featured: true }, take: 8, orderBy: { createdAt: "desc" } });

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-black text-white">
        <Image
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=2200&q=85"
          alt="Texshima new season editorial"
          fill
          priority
          className="object-cover opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20" />
        <div className="relative flex min-h-[78vh] items-end page-pad pb-12 md:pb-16">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em]">New season · 2026</p>
            <h1 className="display text-6xl font-semibold leading-[.9] sm:text-8xl lg:text-[9.5rem]">
              THE EVERYDAY EDIT
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop/women" className="bg-white px-7 py-3 text-sm font-medium text-black transition hover:bg-neutral-200">Shop women</Link>
              <Link href="/shop/men" className="border border-white/70 px-7 py-3 text-sm font-medium transition hover:bg-white hover:text-black">Shop men</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad page-pad">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[.25em] text-muted">Curated now</p>
            <h2 className="display text-4xl font-semibold md:text-6xl">New arrivals</h2>
          </div>
          <Link href="/shop/all" className="border-b border-black pb-1 text-sm">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[65vh] overflow-hidden bg-neutral-100">
          <Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=85" alt="Women's collection" fill className="object-cover" sizes="50vw" />
          <div className="absolute inset-0 bg-black/10" />
          <Link href="/shop/women" className="absolute bottom-8 left-8 border-b border-white pb-1 text-sm font-medium text-white">Women — explore</Link>
        </div>
        <div className="relative min-h-[65vh] overflow-hidden bg-neutral-100">
          <Image src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85" alt="Men's collection" fill className="object-cover" sizes="50vw" />
          <div className="absolute inset-0 bg-black/15" />
          <Link href="/shop/men" className="absolute bottom-8 left-8 border-b border-white pb-1 text-sm font-medium text-white">Men — explore</Link>
        </div>
      </section>

      <section className="page-pad section-pad">
        <div className="border-y border-line py-14 text-center">
          <p className="text-xs uppercase tracking-[.3em] text-muted">Texshima essentials</p>
          <h2 className="display mx-auto mt-4 max-w-4xl text-4xl font-semibold md:text-6xl">Less noise. Better clothes.</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted">Clean silhouettes, considered fabrics and everyday pieces made to work together.</p>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
