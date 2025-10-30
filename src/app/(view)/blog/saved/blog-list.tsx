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
import { getBlogApi, getSavedBlogApi, toggleBookmarkApi } from "@/lib/api/blog";
import { idk } from "@/lib/utils";
import { Share1Icon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookmarkIcon,
  CircleXIcon,
  InboxIcon,
  Loader2Icon,
} from "lucide-react";
import React from "react";
import DOMPurify from "dompurify";
import Link from "next/link";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { meApi } from "@/lib/api/auth";
import { useTheme } from "next-themes";

export default function BlogList() {
  const [{ token }] = useCookies(["token"]);
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const qcl = useQueryClient();
  const { resolvedTheme } = useTheme();

  const { data, isPending }: idk = useQuery({
    queryKey: ["saved_blogs"],
    queryFn: () => {
      return getSavedBlogApi({ token });
    },
  });

  const { data: me }: idk = useQuery({
    queryKey: ["me"],
    queryFn: () => meApi(token),
    enabled: !!token,
  });

  const bookmarks = me?.saved_blogs || [];

  const { mutate: toggler, isPending: toggling } = useMutation({
    mutationKey: ["toggle_bookmark"],
    mutationFn: async ({ id }: { id: number }) => {
      setActiveId(id);
      return await toggleBookmarkApi({ id, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
      setActiveId(null);
    },
    onSuccess: (res: idk, { id }) => {
      // Instant feedback — optimistic update
      qcl.setQueryData(["me"], (old: any) => {
        if (!old?.saved_blogs) return old;
        const already = old.saved_blogs.includes(id);
        return {
          ...old,
          saved_blogs: already
            ? old.saved_blogs.filter((b: number) => b !== id)
            : [...old.saved_blogs, id],
        };
      });

      toast.success(res.message ?? "Bookmark updated!");
      setActiveId(null);

      // Refetch for full sync
      qcl.invalidateQueries({ queryKey: ["me"] });
      qcl.invalidateQueries({ queryKey: ["blogs"] });
      qcl.invalidateQueries({ queryKey: ["saved_blogs"] });
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-24 mx-auto">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }
  if (data?.data?.length === 0) {
    return (
      <div className="w-full min-h-[50dvh] h-full  flex flex-col gap-6 justify-center items-center">
        <InboxIcon />
        No blog has been bookmarked
      </div>
    );
  }

  return data?.data?.map((x: any) => (
    <Card key={x.id} className="w-full relative bg-background rounded-lg">
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
        <Button variant="outline" asChild>
          <Link href={`/blog/${x.id}`}>Read this blog</Link>
        </Button>

        <div className="space-x-2 flex">
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggler({ id: x.id })}
            disabled={toggling && activeId === x.id}
          >
            {toggling && activeId === x.id ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <BookmarkIcon
                fill={
                  bookmarks.includes(x.id)
                    ? resolvedTheme === "light"
                      ? "#191919"
                      : "#ffffff"
                    : "none"
                }
              />
            )}
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
                  .catch((err) => console.error("Error sharing:", err));
              } else {
                alert("Your browser doesn’t support sharing this link.");
              }
            }}
          >
            <Share1Icon />
          </Button>
        </div>
      </CardFooter>
    </Card>
  ));
}
