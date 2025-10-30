"use client";
import PostBlock from "@/components/core/post";
import { getPostsApi } from "@/lib/api/post";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";

export default function Feed() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending } = useQuery({
    queryKey: ["feed"],
    queryFn: (): idk => {
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
  return data.data.map((x: idk) => <PostBlock key={x.id} data={x} />);
}
