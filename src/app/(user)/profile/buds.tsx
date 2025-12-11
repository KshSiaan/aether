"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { myFollowsApi } from "@/lib/api/user";
import { useCookies } from "react-cookie";
import { ArrowRight, Loader2Icon } from "lucide-react";
import { idk } from "@/lib/utils";
import Link from "next/link";
export default function Buds() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["buds"],
    queryFn: (): idk => {
      return myFollowsApi(token);
    },
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  //   return (
  //     <pre className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-amber-400 rounded-xl p-6 shadow-lg overflow-x-auto text-sm leading-relaxed border border-zinc-700">
  //       <code className="whitespace-pre-wrap">
  //         {JSON.stringify(data.data, null, 2)}
  //       </code>
  //     </pre>
  //   );
  return data.data.map((x: idk) => (
    <Card key={x.user.uid}>
      <CardContent className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src={x.user.avatar_url} />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
          <h4>{x.user.prefer_alias ? x.user?.alias : x.user?.name}</h4>
        </div>
        <Button variant={"ghost"} asChild>
          <Link href={`/user?id=${x?.user?.uid}`}>
            View Profile <ArrowRight />
          </Link>
        </Button>
      </CardContent>
    </Card>
  ));
}
