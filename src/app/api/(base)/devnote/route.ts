import { extraConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { supabase } from "@/lib/db";



export async function PUT(req: NextRequest) {
  const data: {
    note: string;
  } = await req.json();
  console.log(data);
  
  if (!data) {
    return NextResponse.json(
      { message: "Please provide thenote", ok: false },
      { status: 422 }
    );
  } else if (!data.note) {
    return NextResponse.json(
      { message: "Please provide the note", ok: false },
      { status: 422 }
    );
  }

  let uid: string | null = null;

  // Optional auth
  const authHeader = req.headers.get("Authorization");
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
      { message: "You must be logged in as admin to view this", ok: false },
      { status: 401 }
    );
  }



  const { data: dbData, error } = await supabase
    .from("devnote").update({note:data.note}).eq("id",1)
    .select(`*`)
    .single();

  if (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    data: dbData,
    message:`Successfully updated the note!`
  });
}

export async function GET(req: NextRequest) {

  const { data: dbData, error } = await supabase.from("devnote").select("*").single();

  if (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message, ok: false },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, data: dbData });
}
