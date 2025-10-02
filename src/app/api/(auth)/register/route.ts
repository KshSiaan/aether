import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/db";
import { extraConfig } from "@/lib/config";
import * as jose from "jose"
export async function POST(req: NextRequest) {
  const data: {
    name: string;
    tag: string;
    email: string;
    password: string;
    confirm: string;
  } = await req.json();

  let message = "";
  let status = 400;

  // Check empty fields
  if (!data.name || !data.tag || !data.email || !data.password || !data.confirm) {
    message = "All fields are required.";
    return NextResponse.json({ success: false, message }, { status });
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    message = "Invalid email format.";
    return NextResponse.json({ success: false, message }, { status });
  }

  // Password match
  if (data.password !== data.confirm) {
    message = "Passwords do not match.";
    return NextResponse.json({ success: false, message }, { status });
  }

  // Password length (basic)
  if (data.password.length < 6) {
    message = "Password must be at least 6 characters.";
    return NextResponse.json({ success: false, message }, { status });
  }

  // ✅ Passed all checks → hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

const { error, data: users } = await supabase
  .from("user")
  .insert([
    {
      name: data.name,
      alias: data.tag,
      email: data.email,
      password: hashedPassword,
      avatar_url: "/avatar/default.png",
    },
  ])
  .select("uid");


  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }
  const user = users?.[0];
  // You’d normally store hashedPassword in DB instead of sending it back
  message = `Account for ${data.tag} created successfully`;
  status = 200;

    //token creation
    const secret = new TextEncoder().encode(
        extraConfig.token_secret,
    )

    const alg = 'HS256'

    const jwt = await new jose.SignJWT({ uid: user?.uid })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('user')
    .setAudience('user')
    .setExpirationTime('3d')
    .sign(secret);
  return NextResponse.json(
    {
      ok: true,
      message,
      user: {
        name: data.name,
        tag: data.tag,
      },
      token:jwt
    },
    { status }
  );
}
