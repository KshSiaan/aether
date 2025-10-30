"use client";
import NotFound from "@/app/not-found";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUsersApi } from "@/lib/api/user";
import { apiConfig } from "@/lib/config";
import { User } from "@/lib/types/user";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Spirits() {
  const { data, isPending }: idk = useQuery({
    queryKey: ["spirits"],
    queryFn: getUsersApi,
  });
  interface SpiritType extends User {
    post_count: number;
  }
  if (isPending) {
    return (
      <div
        className={`flex justify-center items-center h-24 mx-auto col-span-4`}
      >
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return data?.data?.map((x: SpiritType) => (
    <Link href={`/user?id=${x.uid}`} key={x.uid}>
      <div className="w-full border cursor-target hover:bg-secondary/30">
        <div className="w-full grid grid-cols-2 gap-4 p-4">
          <Avatar className="size-24 border bg-background">
            <AvatarImage src={x.avatar_url} />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
          <div className="w-full flex flex-col justify-start items-end">
            <h4>{x.prefer_alias ? x.alias : x.name}</h4>
            <p className="text-xs text-muted-foreground">{x.email}</p>
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
  ));
}
