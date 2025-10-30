import { extraConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { supabase } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const idParam = url.searchParams.get("id"); // blog ID

  if (!idParam) {
    return NextResponse.json({ message: "Missing blog ID" }, { status: 400 });
  }

  const id = String(idParam); // normalize as string

  // Auth check
  const authHeader = req.headers.get("Authorization");
  if (!authHeader)
    return NextResponse.json({ message: "Please log in to interact" }, { status: 401 });

  const token = authHeader.split(" ")[1];
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

  const uid = Number(verifiedToken.payload.uid);

  // Step 1: Fetch current saved_blogs
  const { data: userData, error: fetchErr } = await supabase
    .from("user")
    .select("saved_blogs")
    .eq("uid", uid)
    .single();

  if (fetchErr)
    return NextResponse.json({ message: fetchErr.message }, { status: 404 });

  const current = userData?.saved_blogs || [];

  // Ensure all IDs are strings for consistency
  const normalized = current.map((item: any) => String(item));

  // Step 2: Toggle
  let updatedArray;
  let action;
  if (normalized.includes(id)) {
    updatedArray = normalized.filter((item: string) => item !== id);
    action = "removed from";
  } else {
    updatedArray = [...normalized, id];
    action = "added to";
  }

  // Step 3: Update in DB
  const { error: updateErr } = await supabase
    .from("user")
    .update({ saved_blogs: updatedArray })
    .eq("uid", uid);

  if (updateErr)
    return NextResponse.json({ message: updateErr.message }, { status: 400 });

  return NextResponse.json({
    message: `Blog ${action} bookmarks successfully`,
  });
}
