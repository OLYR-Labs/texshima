"use client";

import { useCart } from "@/lib/cart-store";
import { money } from "@/lib/utils";
import { useState } from "react";

export default function Checkout() {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const form = new FormData(e.currentTarget);

      const response = await fetch(
        "/api/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer:
              Object.fromEntries(form),
            items,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Checkout failed"
        );
      }

      if (
        !data.paymentUrl ||
        !data.paymentData
      ) {
        throw new Error(
          "Invalid PayHere payment response"
        );
      }

      /*
       * PayHere Checkout API expects
       * a POST form submission.
       */

      const paymentForm =
        document.createElement("form");

      paymentForm.method = "POST";
      paymentForm.action =
        data.paymentUrl;

      Object.entries(
        data.paymentData
      ).forEach(([key, value]) => {
        const input =
          document.createElement(
            "input"
          );

        input.type = "hidden";
        input.name = key;
        input.value = String(value);

        paymentForm.appendChild(
          input
        );
      });

      document.body.appendChild(
        paymentForm
      );

      paymentForm.submit();
    } catch (error) {
      console.error(
        "Checkout error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Checkout failed"
      );

      setLoading(false);
    }
  }

  if (!items.length) {
    return (
      <section className="page-pad section-pad">
        <h1 className="display text-5xl font-semibold">
          Your bag is empty.
        </h1>
      </section>
    );
  }

  return (
    <section className="page-pad section-pad">
      <div className="grid gap-14 lg:grid-cols-[1fr_380px]">
        <form
          onSubmit={submit}
          className="max-w-xl"
        >
          <p className="text-xs uppercase tracking-[.3em] text-muted">
            Checkout
          </p>

          <h1 className="display mt-4 text-5xl font-semibold">
            Delivery details
          </h1>

          <div className="mt-10 grid gap-6">
            {[
              ["name", "Full name"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["address", "Address"],
              ["city", "City"],
              ["postal", "Postal code"],
            ].map(([name, label]) => (
              <div key={name}>
                <label className="mb-2 block text-xs uppercase tracking-[.15em]">
                  {label}
                </label>

                <input
                  name={name}
                  required
                  type={
                    name === "email"
                      ? "email"
                      : "text"
                  }
                  className="w-full border-b border-line py-3 outline-none focus:border-black"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-10 w-full bg-black py-4 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading
              ? "Redirecting to PayHere…"
              : "Continue to PayHere"}
          </button>
        </form>

        <aside className="h-fit border-t border-black pt-5">
          <h2 className="text-sm font-semibold">
            Order summary
          </h2>

          {items.map((item) => (
            <div
              key={`${item.id}${item.size}${item.color}`}
              className="mt-4 flex justify-between text-sm"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                {money(
                  item.price *
                    item.quantity
                )}
              </span>
            </div>
          ))}

          <div className="mt-6 flex justify-between border-t border-line pt-5 font-medium">
            <span>Total</span>

            <span>
              {money(subtotal)}
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}