import { extraConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { supabase } from "@/lib/db";



export async function POST(req: NextRequest) {
  const data: {
  name: string;
  email: string;
  feedback: string;
} = await req.json();

  if (!data) {
    return NextResponse.json(
      { message: "Please provide a valid feedback body", ok: false },
      { status: 422 }
    );
  }else if(!data.name){
    return NextResponse.json(
      { message: "Please provide a name", ok: false },
      { status: 422 }
    );
  }else if (!data.email) {
    return NextResponse.json(
      { message: "Please provide an email", ok: false },
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
        // console.log("Invalid token, continuing without UID");
      }
    }
  }

 
  const { data: dbData, error } = await supabase
    .from("feedback")
    .insert([
      {
        user_id: uid,
        ...data
      },
    ])
    .select(
      `
        *,
        user:user_id(
          name,
          role,
          alias,
          email,
          gender,
          connects,
          original,
          avatar_url
        )
      `
    )
    .single();

  if (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    data: dbData,
    message: uid
      ? `Successfully created the feedback of ${dbData.user?.name}`
      : "Successfully created the feedback",
  });
}

export async function GET(req: NextRequest) {

  let uid: string | null = null;

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
          { message: "Invalid or expired token", ok: false },
          { status: 401 }
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

  const { data: dbData, error } = await supabase.from("feedback").select("*");

  if (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message, ok: false },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, data: dbData });
}
