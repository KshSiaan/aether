import { extraConfig } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose"
import { authChecker } from "@/lib/authchecker";
import { supabase } from "@/lib/db";


export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  const result = await authChecker(authHeader);

  if (result instanceof NextResponse) {
    return result; 
  }

  const uid = result.uid;

//   const { data, error } = await supabase
//   .from("connects")
//   .select(`
//     *,
//     user:connected_id (
//       uid,
//       name,
//       email,
//       alias,
//       bio,
//       avatar_url,
//       role,
//       gender,
//       original,
//       prefer_alias,
//     )
//   `)
//   .eq("connector_id", uid);
  const { data, error } = await supabase
  .from("connects")
  .select(`
    *,
    user:connected_id (
      uid,
      name,
      alias,
      avatar_url,
      prefer_alias
    )
  `)
  .eq("connector_id", uid);


  


  if (error) {
      console.log(error);
    return Response.json({ok:false,message:error.message});
  }


  
  return NextResponse.json({ ok: true,data });
}
