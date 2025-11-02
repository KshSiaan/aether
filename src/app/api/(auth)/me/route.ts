import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { extraConfig } from "@/lib/config";
import { supabase } from "@/lib/db";
export async function GET(req: NextRequest) {
    
  const authHeader = req.headers.get("Authorization"); 

  if (!authHeader) {
    return NextResponse.json({ message: "No authorization header" }, { status: 401 });
  }

  // Extract token
  const token = authHeader.split(" ")[1];
  let verifiedToken;
  if (!token) {
    return NextResponse.json({ message: "Invalid token format" }, { status: 401 });
  }
    const secret = new TextEncoder().encode(
        extraConfig.token_secret,
    )
try {
   verifiedToken = await jose.jwtVerify(token,secret,{issuer:"user", audience:"user"})
} catch {
    return NextResponse.json({message:"Unauthorized"},{status:401})
}
    const userId = verifiedToken.payload.uid
    

    const {data,error} = await supabase.from("user").select().eq("uid",userId);

    if (error) {

        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    
    if (data.length <= 0 || !data[0].password) {
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }

const {password,...user}  = data[0]


  return NextResponse.json({...user, message:"User data fetched"});
}


export async function PATCH(req: NextRequest) {
    
  const authHeader = req.headers.get("Authorization"); 

  if (!authHeader) {
    return NextResponse.json({ message: "No authorization header" }, { status: 401 });
  }

  // Extract token
  const token = authHeader.split(" ")[1];
  let verifiedToken;
  if (!token) {
    return NextResponse.json({ message: "Invalid token format" }, { status: 401 });
  }
    const secret = new TextEncoder().encode(
        extraConfig.token_secret,
    )
try {
   verifiedToken = await jose.jwtVerify(token,secret,{issuer:"user", audience:"user"})
} catch {
    return NextResponse.json({message:"Unauthorized"},{status:401})
}
const userId = verifiedToken.payload.uid;

const body: {
  name: string;
  gender: string;
  alias?: string;
  prefer_alias?: boolean;
  bio?: string;
} = await req.json();

if (!body) {
  return NextResponse.json(
    { message: "No such data found to change" },
    { status: 404 }
  );
}

const {data, error } = await supabase
  .from("user")
  .update(body)
  .eq("uid", userId)
  // .select("*")
  // .single();

  if (error) {
        return NextResponse.json({message:error.message??"Failed to update dataset"},{status:500})
  }

  return NextResponse.json({message:"Successfully updated your profile",ok:true},{status:500})
}