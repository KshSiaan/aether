"use client";
import { getSpecificBlogApi } from "@/lib/api/blog";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";
import DOMPurify from "dompurify"; // <-- import DOMPurify

export default function Blog({ id }: { id: string }) {
  const { data, isPending } = useQuery({
    queryKey: ["blog_id", id],
    queryFn: (): idk => {
      return getSpecificBlogApi({ id });
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-24 mx-auto">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  // Sanitize the body content
  const sanitizedBody = DOMPurify.sanitize(data?.data?.body || "");

  return (
    <>
      <h1 className="mt-6 text-5xl font-semibold">{data.data.title}</h1>
      <div className="mt-6 flex justify-between items-center">
        <p>
          Author:{" "}
          {data?.data?.user?.prefer_alias
            ? data?.data?.user?.alias
            : data?.data?.user?.name}
        </p>
        <p>Date posted: {new Date(data?.data?.created_at).toDateString()}</p>
      </div>
      <article
        className="mt-18"
        dangerouslySetInnerHTML={{ __html: sanitizedBody }}
      />
      <br />
    </>
  );
}
