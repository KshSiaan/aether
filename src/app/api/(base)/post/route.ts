import { extraConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { supabase } from "@/lib/db";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("from");

  if (id) {
    const { data: dbData, error } = await supabase
      .from("post")
      .select(
        `*,user:user_id(
          name,
          role,
          alias,
          email,
          gender,
          connects,
          original,
          avatar_url,
          prefer_alias
        )`
      )
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({
        ok: false,
        message: error.message,
      });
    }

    return NextResponse.json({
      ok: true,
      data: dbData,
      message: `Successfully fetched post of ${dbData?.user?.name}`,
    });
  }

  const { data: dbData, error } = await supabase.from("post").select(`
        *,
        user:user_id(
          name,
          role,
          alias,
          email,
          gender,
          connects,
          original,
          avatar_url,
          prefer_alias
        )
      `);
  if (error) {
    return NextResponse.json({
      ok: false,
      message: error.message,
    });
  }

  return NextResponse.json({
    ok: true,
    data: dbData,
    message: `Successfully fetched posts`,
  });
}

export async function POST(req: NextRequest) {
  const data: string = await req.json();
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json(
      { message: "No authorization header" },
      { status: 401 }
    );
  }
  console.log(data);

  if (!data || typeof data !== "string") {
    return NextResponse.json(
      { message: "Please provide a valid post body", ok: false },
      { status: 422 }
    );
  }

  // Extract token
  const token = authHeader.split(" ")[1];
  let verifiedToken;
  if (!token) {
    return NextResponse.json(
      { message: "Invalid token format" },
      { status: 401 }
    );
  }
  const secret = new TextEncoder().encode(extraConfig.token_secret);
  try {
    verifiedToken = await jose.jwtVerify(token, secret, {
      issuer: "user",
      audience: "user",
    });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { data: dbData, error } = await supabase
    .from("post")
    .insert([
      {
        user_id: verifiedToken.payload.uid,
        body: data,
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
    message: `Successfully created the post for ${dbData.user.name}`,
  });
}
