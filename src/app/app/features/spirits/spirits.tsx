import NotFound from "@/app/not-found";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiConfig } from "@/lib/config";
import { User } from "@/lib/types/user";
import Link from "next/link";
import React from "react";

interface SpiritType extends User {
  post_count?: number;
  contributions_count?: number;
  connects?: any[];
}

export default async function Spirits() {
  try {
    const call = await fetch(`${apiConfig.baseUrl}/users`);

    // Check if the response is okay
    if (!call.ok) {
      console.error("Failed to fetch users:", call.statusText);
      return <NotFound />;
    }

    const res = await call.json();

    // Ensure res.data is an array
    if (!res?.data || !Array.isArray(res.data)) {
      console.error("Invalid response data:", res);
      return <NotFound />;
    }

    // Map safely over users
    return (
      <>
        {res.data.map((x: SpiritType) => (
          <Link href={`/user?id=${x.uid}`} key={x.uid}>
            <div className="w-full border cursor-target hover:bg-secondary/30">
              <div className="w-full grid grid-cols-2 gap-4 p-4">
                <Avatar className="size-24 border bg-background">
                  {x.avatar_url ? (
                    <AvatarImage src={x.avatar_url} />
                  ) : (
                    <AvatarFallback>UI</AvatarFallback>
                  )}
                </Avatar>
                <div className="w-full flex flex-col justify-start items-end">
                  <h4>
                    {x.prefer_alias
                      ? x.alias ?? "Unknown"
                      : x.name ?? "Unknown"}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {x.email ?? "No email"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 px-4">
                <div className="w-full aspect-square flex flex-col items-center justify-center">
                  <p className="text-xs text-muted-foreground">Buddies</p>
                  <p>{x.connects?.length ?? 0}</p>
                </div>
                <div className="w-full aspect-square flex flex-col items-center justify-center">
                  <p className="text-xs text-muted-foreground">Posts</p>
                  <p>{x.post_count ?? 0}</p>
                </div>
                <div className="w-full aspect-square flex flex-col items-center justify-center">
                  <p className="text-xs text-muted-foreground">Contributions</p>
                  <p>{x.contributions_count ?? 0}</p>
                </div>
              </div>
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
