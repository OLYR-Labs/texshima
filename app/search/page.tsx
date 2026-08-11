import { db } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export default async function Search({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q?.trim() ?? "";
  const products = q ? await db.product.findMany({
    where: { OR: [{ name: { contains: q } }, { category: { contains: q } }, { description: { contains: q } }] },
    orderBy: { createdAt: "desc" }
  }) : [];

  return (
    <section className="page-pad section-pad">
      <p className="text-xs uppercase tracking-[.3em] text-muted">Search</p>
      <form className="mt-5 border-b-2 border-black pb-3"><input name="q" defaultValue={q} autoFocus placeholder="Search products" className="w-full text-3xl outline-none md:text-5xl" /></form>
      <p className="mt-6 text-sm text-muted">{q ? `${products.length} results for “${q}”` : "Enter a search term."}</p>
      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">{products.map(p => <ProductCard key={p.id} product={p} />)}</div>
    </section>
  );
}
