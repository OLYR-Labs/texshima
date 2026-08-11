import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { money } from "@/lib/utils";

export default async function Account() {
  const session = await getAuthSession();
  if (!session?.user?.id) redirect("/login");
  const orders = await db.order.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, take: 20 });
  return <section className="page-pad section-pad"><p className="text-xs uppercase tracking-[.3em] text-muted">Account</p><h1 className="display mt-4 text-6xl font-semibold">Hello, {session.user.name || "there"}.</h1><div className="mt-16"><h2 className="mb-6 text-sm font-semibold uppercase tracking-[.15em]">Orders</h2>{orders.length===0?<p className="text-sm text-muted">No orders yet.</p>:<div className="divide-y divide-line border-y border-line">{orders.map(o=><div key={o.id} className="flex justify-between py-5 text-sm"><span>#{o.id.slice(-8).toUpperCase()}</span><span>{o.status}</span><span>{money(o.total)}</span></div>)}</div>}</div></section>;
}
