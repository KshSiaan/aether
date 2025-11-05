"use client";
import { getDevNoteApi } from "@/lib/api/extra";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";

export default function Note() {
  const { data, isPending }: idk = useQuery({
    queryKey: ["note"],
    queryFn: getDevNoteApi,
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return data?.data?.note;
}
