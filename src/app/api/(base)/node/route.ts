import { extraConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { supabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  const data: {
    name:string,
    description:string
  } = await req.json();
  console.log(data);
  
  if (!data) {
    return NextResponse.json(
      { message: "Please provide valid dataset", ok: false },
      { status: 422 }
    );
  } else if (!data.name || !data.description) {
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
    .from("nodes").insert([{name:data.name,description:data.description,childs:[]}]).select("*").single();

  if (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    data: dbData,
    message:`Successfully created the node ${dbData.name}!`
  });
}




export async function GET() {

  const { data: dbData, error } = await supabase.from("nodes").select("*");

  if (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message, ok: false },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, data: dbData });
}
