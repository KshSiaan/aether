import { supabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
const [blogRes, userRes, postRes] = await Promise.all([
  supabase.from("blog").select("*", { count: "exact", head: true }),
  supabase.from("user").select("*", { count: "exact", head: true }),
  supabase.from("post").select("*", { count: "exact", head: true }),
]);

  return NextResponse.json({
    message: "Count fetched successfully",
    blogs:blogRes.count,
    users:userRes.count,
    posts:postRes.count,
    ok: true,
  });
}
