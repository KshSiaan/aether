import { supabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const { data, error } = await supabase.from("user").select("*");

    if (error) {
        return NextResponse.json({ message: error.message }, { status: 404 });
    }

    // Remove password from each user object
    const sanitizedData = data.map(({ password, ...rest }) => rest);

    return NextResponse.json({ message: "Retrieved all user data", data: sanitizedData });
}
