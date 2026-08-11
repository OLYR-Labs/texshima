import { headers } from "next/headers";
import Stripe from "stripe";
import { db } from "@/lib/db";

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY||"",{apiVersion:"2025-06-30.basil"});

export async function POST(req:Request){
  const body=await req.text();
  const signature=(await headers()).get("stripe-signature");
  if(!signature||!process.env.STRIPE_WEBHOOK_SECRET)return new Response("Missing signature", {status:400});
  let event:Stripe.Event;
  try{event=stripe.webhooks.constructEvent(body,signature,process.env.STRIPE_WEBHOOK_SECRET)}catch{return new Response("Invalid signature",{status:400})}
  if(event.type==="checkout.session.completed"){
    const session=event.data.object as Stripe.Checkout.Session;
    const orderId=session.metadata?.orderId;
    if(orderId)await db.order.update({where:{id:orderId},data:{status:"PAID",paymentStatus:"PAID"}});
  }
  return new Response("ok");
}
