import { NextRequest, NextResponse } from "next/server";

export async function POST(res: NextRequest) {
  const data = await res.json();
  console.log(data);

  return NextResponse.json({
    ok: true,
    ...data,
    message: "Successfully posted the blog",
  });
}
