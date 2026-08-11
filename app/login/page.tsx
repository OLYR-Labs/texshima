"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
export default function Login() {
  const [error,setError]=useState("");
  async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget);const r=await signIn("credentials",{email:f.get("email"),password:f.get("password"),redirect:false});if(r?.error)setError("Invalid email or password.");else window.location.href="/account";}
  return <section className="page-pad section-pad"><div className="mx-auto max-w-md"><p className="text-xs uppercase tracking-[.3em] text-muted">Account</p><h1 className="display mt-4 text-5xl font-semibold">Sign in</h1><form onSubmit={submit} className="mt-10 space-y-6"><input name="email" type="email" required placeholder="Email" className="w-full border-b border-line py-3 outline-none"/><input name="password" type="password" required placeholder="Password" className="w-full border-b border-line py-3 outline-none"/>{error&&<p className="text-sm text-sale">{error}</p>}<button className="w-full bg-black py-4 text-sm font-medium text-white">Sign in</button></form><p className="mt-6 text-sm text-muted">New here? <Link href="/register" className="text-black underline">Create an account</Link></p></div></section>;
}
