import { db } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

const categories: Record<string, string | undefined> = {
  women: "Women", men: "Men", kids: "Kids", accessories: "Accessories", sale: undefined, all: undefined
};

export default async function Shop({ params }: { params: { category: string } }) {
  const category = categories[params.category] ?? undefined;
  const products = await db.product.findMany({
    where: category ? { category } : params.category === "sale" ? { salePrice: { not: null } } : {},
    orderBy: { createdAt: "desc" }
  });

  const title = params.category === "all" ? "All pieces" : params.category === "sale" ? "Sale" : category;

  return (
    <section className="page-pad section-pad">
      <div className="mb-12 border-b border-line pb-8">
        <p className="text-xs uppercase tracking-[.3em] text-muted">Collection</p>
        <h1 className="display mt-3 text-5xl font-semibold capitalize md:text-7xl">{title}</h1>
        <p className="mt-4 text-sm text-muted">{products.length} pieces</p>
      </div>
      <div className="mb-8 flex items-center justify-between border-b border-line pb-4 text-xs uppercase tracking-[.15em]">
        <span>Filter</span><span>Sort: Newest</span>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
