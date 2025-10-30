import { extraConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { supabase } from "@/lib/db";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json(
      { message: "No authorization header" },
      { status: 401 }
    );
  }

  // Extract token
  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { message: "Invalid token format" },
      { status: 401 }
    );
  }

  const secret = new TextEncoder().encode(extraConfig.token_secret);
  let verifiedToken;

  try {
    verifiedToken = await jose.jwtVerify(token, secret, {
      issuer: "user",
      audience: "user",
    });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Get user saved blogs
  const { data: user, error: userErr } = await supabase
    .from("user")
    .select("saved_blogs")
    .eq("uid", verifiedToken.payload.uid)
    .single();

  if (userErr) {
    return NextResponse.json({
      ok: false,
      message: userErr.message,
    });
  }

  // Convert saved_blogs into array of numbers
  const savedIds = Array.isArray(user?.saved_blogs)
    ? user.saved_blogs
    : typeof user?.saved_blogs === "string"
    ? user.saved_blogs
        .split(",")
        .map((id: string) => Number(id.trim()))
        .filter((id) => !isNaN(id))
    : [];

  if (!savedIds.length) {
    return NextResponse.json({
      ok: true,
      data: [],
      message: "No saved blogs found",
    });
  }

  // Fetch blogs by IDs
  const { data: dbData, error } = await supabase
    .from("blog")
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
        avatar_url,
        prefer_alias
      )
      `
    )
    .in("id", savedIds);

  if (error) {
    return NextResponse.json({
      ok: false,
      message: error.message,
    });
  }

  return NextResponse.json({
    ok: true,
    data: dbData,
    message: "Successfully fetched blogs",
  });
}
