"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { HeartIcon, MessageCircleQuestionIcon } from "lucide-react";
import { Share1Icon } from "@radix-ui/react-icons";
import { idk } from "@/lib/utils";
import DOMPurify from "dompurify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { togglePostHeart } from "@/lib/api/post";
import { useCookies } from "react-cookie";
import { useTheme } from "next-themes";
export default function PostBlock({
  data,
}: {
  data: {
    id: number;
    user_id: number;
    body: string;
    created_at: string;
    isLiked: boolean;
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
  };
}) {
  const [{ token }] = useCookies(["token"]);
  const { resolvedTheme } = useTheme();
  const qcl = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["like_dislike"],
    mutationFn: () => {
      return togglePostHeart({ id: data.id, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({ queryKey: ["posts"] });
      qcl.invalidateQueries({ queryKey: ["post_limited"] });
      toast.success(res.message ?? "Successful");
    },
  });

  return (
    <Card className="w-full relative bg-background rounded-lg bg-cover bg-center">
      <CardHeader className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage src={data?.user.avatar_url ?? "/avatar/default.png"} />
          <AvatarFallback>RV</AvatarFallback>
        </Avatar>
        <p className="text-sm">
          {data?.user.prefer_alias ? data?.user.alias : data?.user.name}
        </p>
      </CardHeader>
      <CardContent>
        <CardDescription
          className="mt-2 text-sm"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.body),
          }}
        />
      </CardContent>
      <CardFooter className="border-t flex justify-between items-center">
        <div className="">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => mutate()}
            disabled={isPending}
          >
            <HeartIcon
              fill={data.isLiked ? "red" : "none"}
              stroke={
                data.isLiked
                  ? "none"
                  : resolvedTheme === "dark"
                  ? "#ffffff"
                  : "#191919"
              }
            />
          </Button>

          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              toast.info("This feature is currently being worked on");
            }}
          >
            <MessageCircleQuestionIcon />
          </Button>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="icon"
            // onClick={() => {
            //   if (navigator.share) {
            //     navigator
            //       .share({
            //         title: x.title,
            //         text: "Check out this blog!",
            //         url: `${window.location.origin}/blog/${x.id}`,
            //       })
            //       .then(() => console.log("Shared successfully"))
            //       .catch((err) => console.error("Error sharing:", err));
            //   } else {
            //     alert(
            //       "Your browser does not support sharing this link."
            //     );
            //   }
            // }}
          >
            <Share1Icon />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
