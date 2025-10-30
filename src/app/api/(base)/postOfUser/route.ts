import { supabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("from");

    if (!id) {
        return NextResponse.json({
        message: `Please provide the user id`,
    },{status:404});
    }

    const { data: dbData, error } = await supabase
      .from("post")
      .select(
        `*,user:user_id(
          name,
          role,
          alias,
          email,
          gender,
          connects,
          original,
          avatar_url,
          prefer_alias
        )`
      )
      .eq("user_id", id);

    if (error) {
      return NextResponse.json({
        ok: false,
        message: error.message,
      });
    }

    return NextResponse.json({
      ok: true,
      data: dbData,
      message: `Successfully fetched posts of ${dbData[0]?.user?.name}`,
    });
  
}
