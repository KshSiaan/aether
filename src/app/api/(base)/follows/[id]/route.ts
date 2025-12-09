import { extraConfig } from "@/lib/config";
import { supabase } from "@/lib/db";
import * as jose from "jose"
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  console.log({ id });

  const authHeader = req.headers.get("Authorization");
    if (!authHeader)
      return Response.json({ message: "Please log in to interact" }, { status: 401 });
  
    const token = authHeader.split(" ")[1];
    const secret = new TextEncoder().encode(extraConfig.token_secret);
  
    let verifiedToken;
    try {
      verifiedToken = await jose.jwtVerify(token, secret, {
        issuer: "user",
        audience: "user",
      });
    } catch {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const uid = Number(verifiedToken.payload.uid);
    

    if (!uid) {
        return Response.json({ok:false,message:"Authorization failure"})
    }
    if (!id) {
        return Response.json({ok:false,message:"Such spirit doesnt exist"},{status:404})
    }

    const user = await supabase.from("user").select("*").eq("uid",id).single()
    
    if (user.error) {
        return Response.json({ok:false,message:"Such spirit doesnt exist"},{status:404})
    }


    const { data, error } = await supabase
    .from("connects")
    .insert([{ connector_id: uid, connected_id: id }])
    .select()
    .single();


    if (error) {
        Response.json({ok:false,message:"Such spirit doesnt exist"},{status:406})
    }


    
  return Response.json(
    {data, message: `You followed ${user.data.prefer_alias?user.data.alias:user.data.name} successfully` },
    { status: 200 }
  );
  return Response.json(
    { message: `id is: ${id} and user is ${user.data.alias}` },
    { status: 200 }
  );
}
