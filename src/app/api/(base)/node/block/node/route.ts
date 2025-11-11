import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("node");
    if (!id) {
        
    }
let query = supabase
  .from("block")
  .select(`
    *,
    node:node_id(
      name,
      childs
    ),
    author:author(
      uid,
      name
    )
  `)
  .eq("node_id", id)
  .eq("private", false);


  const { data, error } = await query;

  if (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, data });
}
