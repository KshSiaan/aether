"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { myFollowsApi } from "@/lib/api/user";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CatIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";

export default function FriendsPanel() {
  const [{ token }] = useCookies(["token"]);

  const { data, isPending } = useQuery({
    queryKey: ["buds"],
    queryFn: (): idk => {
      return myFollowsApi(token);
    },
    enabled: !!token,
  });
  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold">Friends</h4>
      <div className="w-full rounded-lg border p-2 text-sm text-muted-foreground flex flex-col justify-center items-center gap-3">
        {!token ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <CatIcon />
              </EmptyMedia>
            </EmptyHeader>
            <EmptyContent>
              {/* <EmptyTitle>Authentication Required</EmptyTitle> */}
              <Button variant={"link"} asChild>
                <Link href={"/login"}>Authenticate to make friends</Link>
              </Button>
            </EmptyContent>
          </Empty>
        ) : isPending ? (
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        ) : (
          data.data.map((x: idk) => (
            <Card key={x.user.uid} className="w-full py-2 border-0">
              <CardContent className="flex justify-between items-center px-2">
                <div className="flex justify-start items-center gap-4">
                  <Avatar>
                    <AvatarImage src={x.user.avatar_url} />
                    <AvatarFallback>UI</AvatarFallback>
                  </Avatar>

                  <Link
                    className="text-xs hover:text-muted-foreground"
                    href={`/user?id=${x?.user?.uid}`}
                  >
                    {x.user.prefer_alias ? x.user?.alias : x.user?.name}
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
