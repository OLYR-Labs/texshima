import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const db=new PrismaClient();

const images=[
"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85",
"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85",
"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85"
];

const names=[
"Essential Heavy Tee","Relaxed Oxford Shirt","Wide Leg Trousers","Soft Knit Cardigan","Everyday Overshirt",
"Minimal Polo","Straight Denim","Boxy Graphic Tee","Tailored Blazer","Ribbed Long Sleeve",
"Utility Jacket","Linen Blend Shirt","Clean Cut Hoodie","Relaxed Chino","Fine Gauge Crew",
"Structured Coat","Pleated Midi Skirt","Fluid Wide Trousers","Ribbed Tank","Oversized Sweatshirt",
"Classic Trench","Satin Slip Dress","Cropped Denim Jacket","Everyday Mini Skirt","Cotton Poplin Dress",
"Soft Lounge Set","Lightweight Bomber","Relaxed Cargo","Merino Mock Neck","Longline Shirt",
"Canvas Tote","Leather Belt","Everyday Cap","Minimal Crossbody","Slim Wallet",
"Studio Backpack","Classic Sunglasses","Fine Rib Beanie","Leather Card Holder","Daily Socks"
];

const categories=["Men","Women","Kids","Accessories"];
async function main(){
  await db.review.deleteMany(); await db.wishlist.deleteMany(); await db.orderItem.deleteMany(); await db.order.deleteMany(); await db.address.deleteMany(); await db.product.deleteMany(); await db.user.deleteMany();
  const hash=await bcrypt.hash("password123",12);
  await db.user.create({data:{name:"Demo Customer",email:"demo@texshima.com",password:hash}});
  for(let i=0;i<names.length;i++){
    const category=categories[i%categories.length];
    const base=5900+(i%10)*900;
    const sale=i%7===0?Math.round(base*.75):null;
    const slug=names[i].toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
    const imgs=[images[i%images.length],images[(i+1)%images.length]];
    await db.product.create({data:{
      name:names[i],slug,description:"A refined everyday piece with a clean silhouette, considered proportions and versatile styling. Designed for modern wardrobes.",
      price:base,salePrice:sale,category,images:JSON.stringify(imgs),sizes:JSON.stringify(category==="Accessories"?["ONE SIZE"]:["XS","S","M","L","XL"]),colors:JSON.stringify(["Black","White","Stone"]),stock:15+(i%25),featured:i<8
    }});
  }
}
main().finally(()=>db.$disconnect());
