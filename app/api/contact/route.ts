import { NextResponse } from "next/server";
import { z } from "zod";
const schema=z.object({name:z.string().min(2),email:z.string().email(),message:z.string().min(10)});
export async function POST(req:Request){try{schema.parse(await req.json());return NextResponse.json({ok:true})}catch{return NextResponse.json({error:"Invalid form"},{status:400})}}
