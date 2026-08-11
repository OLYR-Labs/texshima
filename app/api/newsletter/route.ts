import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email || !String(email).includes("@")) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
