import Image from "next/image";
import Link from "next/link";
import { money, productImages } from "@/lib/utils";

export default function ProductCard({ product }: { product: any }) {
  const images = productImages(product.images);
  const price = product.salePrice ?? product.price;

  return (
    <article className="group min-w-0">
      <Link href={`/product/${product.slug}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
          <Image
            src={images[0]}
            alt={product.name}
            fill
            className="image-hover object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
            sizes="(max-width: 640px) 44vw, (max-width: 1024px) 29vw, 22vw"
          />

          {/* Sale Badge */}
          {product.salePrice && (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-sale px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[10px]">
              Sale
            </span>
          )}

          {/* Quick View */}
          <span className="absolute bottom-2.5 right-2.5 hidden rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-medium text-neutral-900 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:block sm:bottom-3 sm:right-3 sm:px-3.5 sm:py-2 sm:text-xs">
            Quick view
          </span>
        </div>

        {/* Product Information */}
        <div className="flex items-start justify-between gap-2 px-0.5 pt-2.5 sm:pt-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-xs font-semibold tracking-[-0.01em] text-neutral-950 sm:text-sm">
              {product.name}
            </h3>

            {product.colors && (
              <p className="mt-0.5 truncate text-[10px] text-muted sm:mt-1 sm:text-xs">
                {product.colors}
              </p>
            )}
          </div>

          <div className="shrink-0 text-right text-xs font-semibold text-neutral-950 sm:text-sm">
            <span>{money(price)}</span>

            {product.salePrice && (
              <span className="ml-1.5 text-[9px] font-normal text-muted line-through sm:ml-2 sm:text-xs">
                {money(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}