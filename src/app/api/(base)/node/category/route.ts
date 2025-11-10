import { extraConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { supabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  const data: {
    name:string,
    node:string
  } = await req.json();
  console.log(data);
  
  if (!data) {
    return NextResponse.json(
      { message: "Please provide valid dataset", ok: false },
      { status: 422 }
    );
  } else if (!data.name || !data.node) {
    return NextResponse.json(
      { message: "Please provide valid dataset", ok: false },
      { status: 422 }
    );
  }

  let uid: string | null = null;

  // Optional auth
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
            return NextResponse.json(
          { message: "You must be an admin in order to change it", ok: false },
          { status: 402 }
        );
  }
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      const secret = new TextEncoder().encode(extraConfig.token_secret);
      try {
        const verifiedToken = await jose.jwtVerify(token, secret, {
          issuer: "user",
          audience: "user",
        });
        uid = verifiedToken.payload.uid as string;
      } catch {
        return NextResponse.json(
          { message: "You must be an admin in order to change it", ok: false },
          { status: 402 }
        );
      }
    }
  }

  const { data: user, error: dbErr } = await supabase
    .from("user")
    .select("*")
    .eq("uid", uid)
    .single();

  if (dbErr || !user || user.role !== "admin") {
    return NextResponse.json(
      { message: "You must be logged in as admin to do this", ok: false }, 
      { status: 401 }
    );
  }
  
  
  //This is the thing
  const { data: dbData, error } = await supabase
    .from("category").insert([{name:data.name,node_id:data.node}]).select(      `
        *,
        node:node_id(
          name,
          childs
        )
      `).single();

  if (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    data: dbData, 
    message:`Successfully created the category ${dbData.name}!`
  });
}


export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("node");

  let query = supabase
    .from("category")
    .select(`
      *,
      node:node_id(
        name,
        childs
      )
    `);

  if (id) query = query.eq("node_id", id);

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


export async function DELETE(req: NextRequest) {
  let uid: string | null = null;
  // Optional auth
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
            return NextResponse.json(
          { message: "You must be an admin in order to delete it", ok: false },
          { status: 402 }
        );
  }

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      const secret = new TextEncoder().encode(extraConfig.token_secret);
      try {
        const verifiedToken = await jose.jwtVerify(token, secret, {
          issuer: "user",
          audience: "user",
        });
        uid = verifiedToken.payload.uid as string;
      } catch {
        return NextResponse.json(
          { message: "You must be an admin in order to change it", ok: false },
          { status: 402 }
        );
      }
    }
  }

  const { data: user, error: dbErr } = await supabase
    .from("user")
    .select("*")
    .eq("uid", uid)
    .single();

  if (dbErr || !user || user.role !== "admin") {
    return NextResponse.json(
      { message: "You must be logged in as admin to do this", ok: false }, 
      { status: 401 }
    );
  }
  
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  //This is the thing
  const { data: dbData, error } = await supabase
    .from("category").delete().eq("id",id).select("*").single();

  if (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    data: dbData,
    message:`${dbData.name} is deleted!`
  });
}