import { extraConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { supabase } from "@/lib/db";
import { idk } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("from");
  const limit = url.searchParams.get("limit");

  const authHeader = request.headers.get("Authorization");
  let uid: number | null = null;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const secret = new TextEncoder().encode(extraConfig.token_secret);

    try {
      const verifiedToken = await jose.jwtVerify(token, secret, {
        issuer: "user",
        audience: "user",
      });
      uid = verifiedToken.payload.uid ? Number(verifiedToken.payload.uid) : null;
    } catch (err) {
      console.error("JWT verification failed:", err);
    }
  }

  // Build base query
  let query:idk = supabase
    .from("post")
    .select(
      `id, body, created_at, user_id, hearts,
       user:user_id(
        name, role, alias, email, gender, connects,
        original, avatar_url, prefer_alias
      )`
    );

  if (id) query = query.eq("id", id).single();
  else if (limit) query = query.limit(parseInt(limit));

  const { data: dbData, error } = await query;

  if (error) {
    return NextResponse.json({ ok: false, message: error.message });
  }

  // Normalize data array
  const posts = Array.isArray(dbData) ? dbData : [dbData];

const updatedDataset = posts.map(post => ({
  ...post,
  hearts: Array.isArray(post.hearts) ? post.hearts : [],
  isLiked: uid ? (Array.isArray(post.hearts) && post.hearts.includes(uid)) : false,
}));
  // If single object, return as object, else array
  const responseData = id ? updatedDataset[0] : updatedDataset;

  return NextResponse.json({
    ok: true,
    data: responseData,
    message: "Successfully fetched posts",
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


export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Missing post ID" }, { status: 400 });

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return NextResponse.json({ message: "No authorization header" }, { status: 401 });

  const token = authHeader.split(" ")[1];
  if (!token) return NextResponse.json({ message: "Invalid token format" }, { status: 401 });

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

  // fetch post that contains uid in hearts
  const { data, error } = await supabase
    .from("post")
    .select("hearts")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ message: error.message }, { status: 404 });

  let hearts: number[] = data?.hearts || [];

  const removing = hearts.includes(uid);
  // toggle uid in hearts
  const updatedHearts = hearts.includes(uid)
    ? hearts.filter(h => h !== uid)
    : [...hearts, uid];

  const { data: updData, error: updErr } = await supabase
    .from("post")
    .update({ hearts: updatedHearts })
    .eq("id", id)
    .select();

  if (updErr) return NextResponse.json({ message: updErr.message }, { status: 503 });

  return NextResponse.json({
    ok: true,
    data: updData,
    message: removing?`Removed like successfully`:`Post liked successfully`,
  });
}