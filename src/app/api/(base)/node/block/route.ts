import { extraConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { supabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  const data: {
  title: string
  language: string
  code: string
  node: number
  private:boolean
  categories: Array<number>
  description:string
} = await req.json();
  console.log(data);
  
  if (!data) {
    return NextResponse.json(
      { message: "Please provide valid dataset", ok: false },
      { status: 422 }
    );
  } else if (!data.title ||!data.language) {
    return NextResponse.json(
      { message: "Please provide valid dataset", ok: false },
      { status: 422 }
    );
  }else if(!data.code){
    return NextResponse.json(
      { message: "No code found, Go back and write something to store", ok: false },
      { status: 422 }
    );
  }else if(data.categories.length<=0){
    return NextResponse.json(
      { message: "You must select at least one category", ok: false },
      { status: 422 }
    );
  }

  let uid: string | null = null;

  // Optional auth
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
            return NextResponse.json(
          { message: "You must be logged in to do this", ok: false },
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
          { message: "You must be logged in to do this", ok: false },
          { status: 402 }
        );
      }
    }
  }
  
  
  //This is the thing
  const { data: dbData, error } = await supabase
    .from("block").insert([{
      title:data.title,
      language:data.language,
      code:data.code,
      node_id:data.node,
      categories:data.categories,
      author:uid,
      private:data.private,
      description: data.description
    }]).select(      `
        *,
        node:node_id(
          name,
          childs
        )
      `).single();

    // 1. Fetch the existing node data (if you haven't already)
    const { data: previousDataNode, error: fetchError } = await supabase
      .from("nodes")
      .select("childs")
      .eq("id", data.node)
      .single();

    if (fetchError) throw fetchError;

    // 2. Append the new ID to the existing array
    const updatedChilds = [...(previousDataNode.childs || []), dbData.id];

    // 3. Update the node
    const { data: dbData2, error: error2 } = await supabase
      .from("nodes")
      .update({ childs: updatedChilds })
      .eq("id", data.node);


  if (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 502 });
  }
  if (error2) {
    console.log(error2);
    return NextResponse.json({ message: error2.message }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    data: dbData, 
    message:`Successfully created your block -> ${dbData.title}!`
  });
}


export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("node");

  let query = supabase
    .from("block")
    .select(`
      *,
      node:node_id(
        name,
        childs
      ),

    `);

  // if (id) query = query.eq("node_id", id);

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