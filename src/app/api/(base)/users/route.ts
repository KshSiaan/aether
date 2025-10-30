import { supabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  // Fetch all users
  const { data: users, error } = await supabase.from("user").select("*, uid");

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }

  // Get post count for each user
  const userWithPostCount = await Promise.all(
    users.map(async (user) => {
      const { count, error: countError } = await supabase
        .from("post")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.uid);

      if (countError) console.error(countError);

      const { password, ...rest } = user;
      return { ...rest, post_count: count || 0 };
    })
  );

  return NextResponse.json({
    message: "Retrieved all users with post count",
    data: userWithPostCount,
  });
}
