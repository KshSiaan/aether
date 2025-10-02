import { supabase } from "@/lib/db";
import { User } from "@/lib/types/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
import { extraConfig } from "@/lib/config";
export async function POST(req:NextRequest) {
    const res:{email:string,password:string} = await req.json();
    let message;
    let status = 200;

    //validation
    if (!res.email || !res.password) {
        message = "Email or password wasn't provided";
        status = 400;
    }

    //db fetch
    const {data,error} = await supabase.from("user").select().eq("email",res.email);
    
    //error handle
    if (error) {
        message = "Invaid email or password"
        status = 401;
        return NextResponse.json({message,ok:false},{status})
    }

    //data assurance

    if (data?.length === 0 || !data || !data[0].password) {
        status = 401;        
        message = "Invaid email or password"
        return NextResponse.json({message,ok:false},{status})
    }

    //data simplification
    
    const user:User = data[0];

    //password comparasion
    const passIsOk = await bcrypt.compare(res.password,user.password)

    if (!passIsOk) {
        status = 401;        
        message = "Invaid email or password"
        return NextResponse.json({message,ok:false},{status})
    }
    
    message =`${user.alias}… the shadows missed you. Welcome.`

    //token creation
    const secret = new TextEncoder().encode(
        extraConfig.token_secret,
    )

    const alg = 'HS256'

    const jwt = await new jose.SignJWT({ uid: user.uid })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('user')
    .setAudience('user')
    .setExpirationTime('3d')
    .sign(secret);

    return NextResponse.json({message,user:{name:user.name,alias:user.alias},token:jwt,ok:true},{status})
}