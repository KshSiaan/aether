import NotFound from "@/app/not-found";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiConfig } from "@/lib/config";
import { User } from "@/lib/types/user";
import Link from "next/link";
import React from "react";
import { headers } from "next/headers";
interface SpiritType extends User {
  post_count?: number;
  contributions_count?: number;
  connects?: any[];
}

export default async function Spirits() {
  try {
    const headersList = headers();
    const host = (await headersList).get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";

    const baseUrl = `${protocol}://${host}`; // no trailing slash

    const call = await fetch(`${baseUrl}/users`);

    if (!call.ok) {
      console.error("Failed to fetch users:", call.statusText);
      return <NotFound />;
    }

    const res = await call.json();
    if (!res?.data || !Array.isArray(res.data)) {
      console.error("Invalid response data:", res);
      return <NotFound />;
    }

    return (
      <>
        {res.data.map((x: SpiritType) => (
          <Link href={`/user?id=${x.uid}`} key={x.uid}>
            <div className="w-full border cursor-target hover:bg-secondary/30">
              {/* avatar and stats code */}
            </div>
          </Link>
        ))}
      </>
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return <NotFound />;
  }
}
