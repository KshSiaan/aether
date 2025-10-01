import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const res = await req.json();

    
    return NextResponse.json({message:"Successfully whatever",...res},{status:200})
}