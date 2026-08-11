"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    setDone(true);
  }

  return (
    <section className="bg-black px-5 py-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[.3em] text-white/60">Stay in the loop</p>
        <h2 className="display mt-4 max-w-2xl text-5xl font-semibold tracking-[-.05em] md:text-7xl">New drops, not noise.</h2>
        <form onSubmit={submit} className="mt-9 flex max-w-xl border-b border-white/40 pb-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Your email address" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/40" />
          <button className="text-sm font-medium">{done ? "Joined" : "Subscribe →"}</button>
        </form>
      </div>
    </section>
  );
}
