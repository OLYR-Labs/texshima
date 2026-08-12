"use client";

import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const f = new FormData(e.currentTarget);

    const r = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(f)),
    });

    if (!r.ok) {
      setError((await r.json()).error || "Unable to register");
      return;
    }

    setDone(true);
  }

  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-neutral-50">
      {/* Background gradients */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="page-pad relative flex min-h-[calc(100vh-72px)] items-center justify-center py-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-3xl border border-black/5 bg-white p-7 shadow-[0_20px_70px_rgba(0,0,0,0.08)] sm:p-9">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-black tracking-[0.02em] text-white">
                T
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
                TEXSHIMA ACCOUNT
              </p>

              <h1 className="display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Create account
              </h1>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted">
                Create your account to save items, manage orders and
                enjoy a faster checkout.
              </p>
            </div>

            {/* Success State */}
            {done ? (
              <div className="mt-8">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
                    ✓
                  </div>

                  <h2 className="mt-4 text-sm font-semibold text-emerald-950">
                    Account created successfully
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-emerald-800/70">
                    Your TEXSHIMA account is ready. You can now sign in
                    and start shopping.
                  </p>
                </div>

                <Link
                  href="/login"
                  className="
                    mt-5
                    block
                    w-full
                    rounded-full
                    bg-gradient-to-r
                    from-black
                    via-neutral-800
                    to-black
                    py-4
                    text-center
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-xl
                  "
                >
                  Sign in
                </Link>
              </div>
            ) : (
              <>
                {/* Registration Form */}
                <form onSubmit={submit} className="mt-8 space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted"
                    >
                      Full name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-black/10
                        bg-neutral-50
                        px-4
                        py-3.5
                        text-sm
                        outline-none
                        transition
                        placeholder:text-neutral-400
                        focus:border-black
                        focus:bg-white
                        focus:ring-4
                        focus:ring-black/5
                      "
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-black/10
                        bg-neutral-50
                        px-4
                        py-3.5
                        text-sm
                        outline-none
                        transition
                        placeholder:text-neutral-400
                        focus:border-black
                        focus:bg-white
                        focus:ring-4
                        focus:ring-black/5
                      "
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      minLength={8}
                      required
                      autoComplete="new-password"
                      placeholder="Minimum 8 characters"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-black/10
                        bg-neutral-50
                        px-4
                        py-3.5
                        text-sm
                        outline-none
                        transition
                        placeholder:text-neutral-400
                        focus:border-black
                        focus:bg-white
                        focus:ring-4
                        focus:ring-black/5
                      "
                    />

                    <p className="mt-2 text-[10px] text-muted">
                      Use at least 8 characters for your password.
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                      <p className="text-xs font-medium text-red-600">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    className="
                      group
                      relative
                      mt-2
                      w-full
                      overflow-hidden
                      rounded-full
                      bg-gradient-to-r
                      from-black
                      via-neutral-800
                      to-black
                      py-4
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-white
                      shadow-lg
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:shadow-xl
                    "
                  >
                    <span className="relative z-10">
                      Create account
                    </span>

                    <span
                      className="
                        absolute
                        inset-0
                        -translate-x-full
                        bg-gradient-to-r
                        from-transparent
                        via-white/10
                        to-transparent
                        transition-transform
                        duration-700
                        group-hover:translate-x-full
                      "
                    />
                  </button>
                </form>

                {/* Divider */}
                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-black/8" />

                  <span className="text-[9px] uppercase tracking-[0.2em] text-muted">
                    Already a member?
                  </span>

                  <div className="h-px flex-1 bg-black/8" />
                </div>

                {/* Login */}
                <Link
                  href="/login"
                  className="
                    block
                    w-full
                    rounded-full
                    border
                    border-black/10
                    bg-white
                    py-3.5
                    text-center
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-black
                    transition
                    hover:border-black
                    hover:bg-black
                    hover:text-white
                  "
                >
                  Sign in
                </Link>
              </>
            )}
          </div>

          {/* Bottom Branding */}
          <p className="mt-6 text-center text-[9px] uppercase tracking-[0.25em] text-muted">
            Texshima · Modern essentials
          </p>
        </div>
      </div>
    </section>
  );
}