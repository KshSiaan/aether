import React, { Suspense } from "react";
import PostList from "./post-list";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="p-6 pt-26">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-xl w-full">My Posts</h2>
        <Button variant={"outline"} asChild>
          <Link href={"/profile/posts/create"}>Create another post</Link>
        </Button>
      </div>
      <Separator />
      <div className="w-full space-y-6 mt-6">
        <Suspense fallback={<div></div>}>
          <PostList />
        </Suspense>
      </div>
    </main>
  );
}
