import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(8) });

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());
    const exists = await db.user.findUnique({ where: { email: data.email } });
    if (exists) return NextResponse.json({ error: "Email already registered." }, { status: 409 });
    const password = await bcrypt.hash(data.password, 12);
    await db.user.create({ data: { name: data.name, email: data.email, password } });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Invalid registration details." }, { status: 400 }); }
}
