import Image from "next/image";
import Link from "next/link";
import { money, productImages } from "@/lib/utils";

export default function ProductCard({ product }: { product: any }) {
  const images = productImages(product.images);
  const price = product.salePrice ?? product.price;

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-surface">
          <Image src={images[0]} alt={product.name} fill className="image-hover object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
          {product.salePrice && <span className="absolute left-3 top-3 bg-sale px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white">Sale</span>}
          <span className="absolute bottom-3 right-3 hidden bg-white px-3 py-2 text-xs font-medium shadow-sm transition group-hover:block">Quick view</span>
        </div>
        <div className="flex justify-between gap-3 pt-3">
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="mt-1 text-xs text-muted">{product.colors}</p>
          </div>
          <div className="text-right text-sm font-medium">
            <span>{money(price)}</span>
            {product.salePrice && <span className="ml-2 text-xs text-muted line-through">{money(product.price)}</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}
