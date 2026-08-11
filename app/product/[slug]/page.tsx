import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { money, productColors, productImages, productSizes } from "@/lib/utils";
import AddToCart from "@/components/AddToCart";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await db.product.findUnique({ where: { slug: params.slug } });
  if (!product) notFound();
  const images = productImages(product.images);
  const sizes = productSizes(product.sizes);
  const colors = productColors(product.colors);

  return (
    <section className="page-pad py-8 md:py-12">
      <div className="grid gap-10 lg:grid-cols-[1.35fr_.65fr]">
        <div className="grid grid-cols-2 gap-2">
          {images.slice(0, 4).map((image, i) => (
            <div key={image} className={`relative aspect-[3/4] overflow-hidden bg-surface ${i === 0 ? "col-span-2" : ""}`}>
              <Image src={image} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 60vw" />
            </div>
          ))}
        </div>
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <p className="text-xs uppercase tracking-[.2em] text-muted">{product.category}</p>
          <h1 className="display mt-3 text-4xl font-semibold md:text-5xl">{product.name}</h1>
          <div className="mt-4 text-lg">
            {product.salePrice ? <><span>{money(product.salePrice)}</span><span className="ml-3 text-sm text-muted line-through">{money(product.price)}</span></> : money(product.price)}
          </div>
          <div className="my-8 border-y border-line py-6">
            <p className="text-sm leading-7 text-muted">{product.description}</p>
          </div>
          <AddToCart product={product} sizes={sizes} colors={colors} />
          <div className="mt-10 border-t border-line pt-6 text-sm">
            <details className="border-b border-line py-4"><summary className="cursor-pointer font-medium">Shipping & returns</summary><p className="pt-4 leading-6 text-muted">Free standard delivery over LKR 15,000. Returns accepted within 14 days in original condition.</p></details>
            <details className="border-b border-line py-4"><summary className="cursor-pointer font-medium">Product details</summary><p className="pt-4 leading-6 text-muted">Designed for everyday wear with a clean, versatile silhouette.</p></details>
          </div>
        </div>
      </div>
    </section>
  );
}
