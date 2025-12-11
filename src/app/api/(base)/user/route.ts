import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { supabase } from "@/lib/db";
import { extraConfig } from "@/lib/config";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const from = url.searchParams.get("from");

    if (!from) {
      return NextResponse.json(
        { message: "Missing 'from' parameter" },
        { status: 400 }
      );
    }

    // Fetch the profile user
    const { data: userData, error: userErr } = await supabase
      .from("user")
      .select("*")
      .eq("uid", from)
      .maybeSingle();

    if (userErr) {
      return NextResponse.json(
        { message: userErr.message },
        { status: 500 }
      );
    }

    if (!userData || !userData.password) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const { password, ...user } = userData;

    // ---------- AUTH OPTIONAL ----------
    let requesterId: number | null = null;

    const authHeader = req.headers.get("Authorization");

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token) {
        const secret = new TextEncoder().encode(extraConfig.token_secret);

        try {
          const decoded = await jose.jwtVerify(token, secret, {
            issuer: "user",
            audience: "user",
          });

          requesterId = Number(decoded.payload.uid) || null;
        } catch {
          requesterId = null; // treat as guest
        }
      }
    }

    // ---------- FOLLOW CHECK ----------
    let isFollowing = false;

    if (requesterId) {
      const { data: connectData, error: connectErr } = await supabase
        .from("connects")
        .select("*")
        .eq("connector_id", requesterId)
        .eq("connected_id", user.uid)
        .maybeSingle();
        
      if (!connectErr && connectData) {
        isFollowing = true;
      }
    }

    return NextResponse.json({
      ...user,
      isFollowing,
      message: "User data fetched",
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}
