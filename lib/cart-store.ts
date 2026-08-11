import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string, size: string, color: string) => void;
  update: (id: string, size: string, color: string, quantity: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const existing = state.items.find(
            (x) => x.id === item.id && x.size === item.size && x.color === item.color
          );
          if (existing) {
            return {
              items: state.items.map((x) =>
                x === existing ? { ...x, quantity: x.quantity + item.quantity } : x
              )
            };
          }
          return { items: [...state.items, item] };
        }),
      remove: (id, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (x) => !(x.id === id && x.size === size && x.color === color)
          )
        })),
      update: (id, size, color, quantity) =>
        set((state) => ({
          items: state.items
            .map((x) =>
              x.id === id && x.size === size && x.color === color
                ? { ...x, quantity: Math.max(1, quantity) }
                : x
            )
            .filter((x) => x.quantity > 0)
        })),
      clear: () => set({ items: [] })
    }),
    { name: "texshima-cart" }
  )
);
