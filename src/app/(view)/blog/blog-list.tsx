"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBlogApi } from "@/lib/api/blog";
import { idk } from "@/lib/utils";
import { Share1Icon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BookmarkIcon, Loader2Icon } from "lucide-react";
import React from "react";
import DOMPurify from "dompurify";
import Link from "next/link";
import { toast } from "sonner";
export default function BlogList() {
  const { data, isPending }: idk = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogApi,
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }

  return data.data.map(
    (x: {
      id: number;
      user_id: number;
      title: string;
      body: string;
      created_at: string;
      user: {
        name: string;
        role: string;
        alias: string;
        email: string;
        gender: idk;
        connects: idk;
        original: boolean;
        avatar_url: string;
        prefer_alias: boolean;
      };
    }) => (
      <Card
        className="w-full relative bg-background rounded-lg bg-cover bg-center"
        key={x.id}
      >
        <CardHeader className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage src={x.user.avatar_url ?? "/avatar/default.png"} />
            <AvatarFallback>RV</AvatarFallback>
          </Avatar>
          <p className="text-sm">
            {x.user.prefer_alias ? x.user.alias : x.user.name}
          </p>
        </CardHeader>
        <CardHeader className="border-b">
          <div className="w-full flex justify-between items-center">
            <CardTitle className="py-0">{x.title}</CardTitle>
            <p className="text-xs text-muted-foreground">
              Posted at: {new Date(x.created_at).toDateString()}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription
            className="mt-2 text-sm"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(x.body) }}
          />
        </CardContent>
        <CardFooter className="border-t flex justify-between items-center">
          <div className="">
            <Button variant={"outline"} asChild>
              <Link href={`/blog/${x.id}`}>Read this blog</Link>
            </Button>
          </div>
          <div className="space-x-2">
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => {
                toast.info("Under Development");
              }}
            >
              <BookmarkIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: x.title,
                      text: "Check out this blog!",
                      url: `${window.location.origin}/blog/${x.id}`,
                    })
                    .then(() => console.log("Shared successfully"))
                    .catch((err) => console.error("Error sharing:", err));
                } else {
                  // Fallback if the browser doesn't support native share
                  alert("Your browser does not support sharing this link.");
                }
              }}
            >
              <Share1Icon />
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
  );
}
