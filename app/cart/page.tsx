"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { money } from "@/lib/utils";

export default function CartPage() {
  const { items, update, remove } = useCart();
  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  const shipping = subtotal >= 15000 || subtotal === 0 ? 0 : 450;

  return (
    <section className="page-pad section-pad">
      <div className="mb-12 border-b border-line pb-8"><p className="text-xs uppercase tracking-[.3em] text-muted">Your selection</p><h1 className="display mt-3 text-5xl font-semibold">Shopping bag</h1></div>
      {items.length === 0 ? <div className="py-20 text-center"><p className="text-muted">Your bag is empty.</p><Link href="/shop/all" className="mt-6 inline-block border-b border-black pb-1 text-sm">Continue shopping</Link></div> : (
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="divide-y divide-line">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-5 py-6">
                <div className="relative h-40 w-28 flex-none bg-surface"><Image src={item.image} alt={item.name} fill className="object-cover" sizes="112px" /></div>
                <div className="flex min-w-0 flex-1 justify-between gap-4">
                  <div><h2 className="text-sm font-medium">{item.name}</h2><p className="mt-2 text-xs text-muted">{item.color} · {item.size}</p><button onClick={() => remove(item.id, item.size, item.color)} className="mt-8 text-xs underline">Remove</button></div>
                  <div className="text-right"><p className="text-sm font-medium">{money(item.price * item.quantity)}</p><div className="mt-6 flex border border-line"><button onClick={() => update(item.id,item.size,item.color,item.quantity-1)} className="w-8">−</button><span className="flex w-8 items-center justify-center text-xs">{item.quantity}</span><button onClick={() => update(item.id,item.size,item.color,item.quantity+1)} className="w-8">+</button></div></div>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit border-t border-black pt-5">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="mt-3 flex justify-between text-sm"><span>Delivery</span><span>{shipping ? money(shipping) : "Free"}</span></div>
            <div className="mt-5 flex justify-between border-t border-line pt-5 font-medium"><span>Total</span><span>{money(subtotal + shipping)}</span></div>
            <Link href="/checkout" className="mt-7 block bg-black py-4 text-center text-sm font-medium text-white">Checkout</Link>
          </aside>
        </div>
      )}
    </section>
  );
}
