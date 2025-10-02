"use client";
import NotFound from "@/app/not-found";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { meApi } from "@/lib/api/auth";
import { User } from "@/lib/types/user";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { BananaIcon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["me"],
    queryFn: (): idk => {
      return meApi(token);
    },
    // retry: false,
  });
  if (isPending) {
    return (
      <div className=" pt-24! p-6 space-y-6">
        <Skeleton className="w-full  h-[400px] rounded-2xl" />
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="w-full  h-[400px] rounded-2xl" />
          <Skeleton className="w-full  h-[400px] rounded-2xl" />
          <Skeleton className="w-full  h-[400px] rounded-2xl" />
        </div>
      </div>
    );
  }
  if (isError) {
    console.error(error);
    return NotFound();
  }

  const user: User = data;
  return (
    <main className="w-full p-6 mt-[64px]">
      <section className="w-full h-[400px] bg-secondary border-b-12 border-background relative rounded-3xl p-6">
        <div className="absolute h-full w-full overflow-hidden top-0 left-0">
          {user?.bio ? (
            user.bio
          ) : (
            <div className="h-full w-full flex flex-col justify-center items-center text-muted-foreground">
              <BananaIcon className="size-12 mb-6" />
              <p>Bio isn&apos;t provided</p>
            </div>
          )}
        </div>
        <div className="size-[200px] absolute right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-[10%] -bottom-[112px] z-30">
          <div className="absolute bottom-1/2 w-full mb-3">
            <div className="absolute bg-background w-12 h-9 bottom-1/2 -left-[40px]">
              <div className="size-full bg-secondary rounded-br-full"></div>
            </div>
            <div className="absolute bg-background w-12 h-9 bottom-1/2 -right-[40px]">
              <div className="size-full bg-secondary rounded-bl-full"></div>
            </div>
          </div>
          <Avatar className="size-[200px] aspect-square border-background border-[12px] bg-secondary">
            <AvatarImage src={user.avatar_url ?? ""} />
            <AvatarFallback>RV</AvatarFallback>
          </Avatar>
          <div className="absolute bg-background size-12 top-1/2 -left-[40px]">
            <div className="size-full bg-secondary rounded-tr-full"></div>
          </div>
          <div className="absolute bg-background size-12 top-1/2 -right-[40px]">
            <div className="size-full bg-secondary rounded-tl-full"></div>
          </div>
        </div>
      </section>
      <section className="w-full bg-secondary p-6 rounded-2xl pt-[120px] lg:pt-6">
        <div className="">
          <h1 className="text-4xl font-bold">{user.alias}</h1>
          <p>
            <span className="text-muted-foreground">AKA</span> ( {user.name} )
          </p>
        </div>
        <div className="flex w-full justify-end items-center gap-2 mt-6">
          <Button variant={"outline"}>Edit Profile</Button>
          <Button variant={"destructive"}>Sign Out</Button>
        </div>
        <div className="w-full grid pt-6 grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Contribution Amount</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl">
              {user.contributions_count ?? 0}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Connection amount</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl">
              {user.connects?.length ?? 0}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
