import { NextResponse } from "next/server";
import { extraConfig } from "./config";
import * as jose from "jose";

export async function authChecker(authHeader: string | null) {
  if (!authHeader) {
    return NextResponse.json(
      { message: "No authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { message: "Invalid token format" },
      { status: 401 }
    );
  }

  const secret = new TextEncoder().encode(extraConfig.token_secret);

  try {
    const { payload } = await jose.jwtVerify(token, secret, {
      issuer: "user",
      audience: "user",
    });

    return payload; // 👉 return decoded payload (this includes uid)
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
