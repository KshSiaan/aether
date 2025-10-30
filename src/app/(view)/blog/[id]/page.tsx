import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Blog from "./blog";
import { Loader2Icon } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const store = await params;

  if (!store.id || isNaN(parseInt(store.id))) {
    return notFound();
  }

  return (
    <main className="pt-20! p-6 lg:px-[10%]">
      <Suspense
        fallback={
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        }
      >
        <Blog id={store?.id} />
      </Suspense>
    </main>
  );
}
