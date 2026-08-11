"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";

export default function AddToCart({ product, sizes, colors }: { product: any; sizes: string[]; colors: string[] }) {
  const add = useCart((s) => s.add);
  const [size, setSize] = useState(sizes[0] ?? "");
  const [color, setColor] = useState(colors[0] ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const image = JSON.parse(product.images)[0];

  function submit() {
    add({ id: product.id, name: product.name, price: product.salePrice ?? product.price, image, size, color, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div>
      <div className="mb-6">
        <div className="mb-3 flex justify-between text-xs uppercase tracking-[.15em]"><span>Size</span><span className="text-muted">Select</span></div>
        <div className="grid grid-cols-4 gap-2">{sizes.map((s) => <button key={s} onClick={() => setSize(s)} className={`border py-3 text-sm ${size === s ? "border-black bg-black text-white" : "border-line"}`}>{s}</button>)}</div>
      </div>
      <div className="mb-6">
        <p className="mb-3 text-xs uppercase tracking-[.15em]">Colour</p>
        <div className="flex flex-wrap gap-2">{colors.map((c) => <button key={c} onClick={() => setColor(c)} className={`border px-4 py-2 text-sm ${color === c ? "border-black" : "border-line"}`}>{c}</button>)}</div>
      </div>
      <div className="flex gap-2">
        <div className="flex border border-line"><button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11">−</button><span className="flex w-10 items-center justify-center text-sm">{qty}</span><button onClick={() => setQty(qty + 1)} className="w-11">+</button></div>
        <button onClick={submit} className="flex-1 bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800">{added ? "Added to bag ✓" : "Add to bag"}</button>
      </div>
    </div>
  );
}
