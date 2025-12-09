"use client";
import NotFound from "@/app/not-found";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/lib/types/user";
import { idk } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BananaIcon, CornerUpRightIcon, UserPlus2Icon } from "lucide-react";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { followSpiritApi, getProfileApi } from "@/lib/api/user";
import PostSect from "./post-sect";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import * as jose from "jose";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function Page() {
  const id: string | null = useSearchParams().get("id");
  const [myId, setMyId] = useState<number | undefined>(undefined);
  const [{ token }] = useCookies(["token"]);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: (): idk => {
      return getProfileApi({ id: id ?? "" });
    },
    enabled: !!id,
  });
  const { mutate } = useMutation({
    mutationKey: ["follow", id],
    mutationFn: () => {
      return followSpiritApi(id as string, token);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
    },
  });

  useEffect(() => {
    if (token) {
      try {
        const unwraped: { uid: number } = jose.decodeJwt(token);

        setMyId(unwraped.uid);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
  }, []);
  if (!id) {
    return notFound();
  }

  if (isPending) {
    return (
      <div className=" pt-24! p-6 space-y-6">
        <Skeleton className="w-full  h-[400px] rounded-2xl" />
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="w-full  h-[200px] rounded-2xl" />
          <Skeleton className="w-full  h-[200px] rounded-2xl" />
          <Skeleton className="w-full  h-[200px] rounded-2xl" />
          <Skeleton className="w-full  h-[200px] rounded-2xl" />
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
    <main className="w-full p-6 px-0 lg:px-6 mt-[64px]">
      <section className="w-full h-[400px] bg-secondary border-b-12 border-background relative rounded-b-3xl lg:rounded-3xl p-6">
        <div className="absolute h-full w-full overflow-hidden top-0 left-0 p-6 flex justify-center items-center">
          {user?.bio ? (
            <AnimatedShinyText>{user.bio}</AnimatedShinyText>
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
      <section className="w-full bg-secondary p-2 lg:p-6 rounded-2xl pt-[120px] lg:pt-6">
        <div className="">
          <h1 className="text-4xl font-bold">{user.alias}</h1>
          <p>
            <span className="text-muted-foreground">aka</span> ( {user.name} )
          </p>
        </div>

        <div className="w-full grid pt-6 grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
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
          <Card>
            <CardHeader>
              <CardTitle>Blog nodes</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl">
              {user.connects?.length ?? 0}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Posts Created</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl">
              {user.connects?.length ?? 0}
            </CardContent>
          </Card>
        </div>
        <div className="flex w-full justify-end items-center gap-2 mt-6">
          {!!token && String(myId) !== String(user.uid) && (
            <div className="space-x-6">
              <Button
                onClick={() => {
                  mutate();
                }}
              >
                <UserPlus2Icon /> Follow this spirit
              </Button>
              <Button variant="ghost">
                <CornerUpRightIcon /> Share Profile
              </Button>
            </div>
          )}
        </div>
      </section>
      <Tabs className="mt-6 lg:px-0" defaultValue="0">
        <div className="w-fit lg:w-auto mx-auto lg:mx-0">
          <TabsList>
            <TabsTrigger value="0">Posts</TabsTrigger>
            <TabsTrigger value="1">Contributions</TabsTrigger>
            <TabsTrigger value="3">Others</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="0" className="">
          <section className="mt-3 w-full p-6 bg-secondary rounded-xl space-y-6">
            <PostSect id={id} />
            <div className="w-full grid align-middle">
              <Button variant={"link"} className="mx-auto" asChild>
                <Link href={"/profile/posts"}>View all posts</Link>
              </Button>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
}
