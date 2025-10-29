import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/db";
export async function GET(req: NextRequest) {
    
    const url = new URL(req.url);
    const id = url.searchParams.get("from");

    const {data,error} = await supabase.from("user").select().eq("uid",id);

  
    if (error) {
        return NextResponse.json({message:error.message},{status:401})
    }
    if (data.length <= 0 || !data[0].password) {
        return NextResponse.json({message:"Not found"},{status:401})
    }

  const {password,...user}  = data[0]


  return NextResponse.json({...user, message:"User data fetched"});
}
