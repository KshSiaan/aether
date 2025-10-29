import { extraConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { supabase } from "@/lib/db";

export async function PATCH(req:NextRequest) {
    
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

    const avatar:{img:string} = await req.json();

    if (!avatar.img) {
      return NextResponse.json({message:"Image to update isnt found"},{status:404});
    }

    const {data,error} = await supabase.from("user").update({"avatar_url":avatar.img}).eq("uid",verifiedToken.payload.uid).select("*")
    if (error) {
      return NextResponse.json({message:error.message??"Something went wrong"},{status:503});
    }
    console.log(data);

    return NextResponse.json({message:"Successfully updated the avatar of you",data})
}