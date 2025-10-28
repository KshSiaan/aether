"use client";
import PostBlock from "@/components/core/post";
import { getPostsApi } from "@/lib/api/post";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";

export default function PostList() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending }: idk = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return getPostsApi({ token });
    },
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
    }) => <PostBlock key={x.id} data={x} />
  );
}
