import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("block")
    .select(
      `
      *,
      node:node_id(
        name,
        childs
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true, data });
}
