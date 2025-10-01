import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { extraConfig } from "@/lib/config";
import { supabase } from "@/lib/db";

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

  const {error} = await supabase.from("user").insert([{
    name:data.name,
    alias:data.tag,
    email:data.email,
    password:hashedPassword,
    avatar_url:"/avatar/default.png",
  }]);

  if (error) {
      return NextResponse.json(
    {
      ok: false,
      message:error.message,
    },
    { status }
  );
  }

  // You’d normally store hashedPassword in DB instead of sending it back
  message = `Account for ${data.tag} created successfully`;
  status = 200;

  return NextResponse.json(
    {
      ok: true,
      message,
      user: {
        name: data.name,
        tag: data.tag,
      },
    },
    { status }
  );
}
