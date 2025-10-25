import React, { Suspense } from "react";
import BlogList from "./blog-list";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  return (
    <main className="p-6">
      <div className="mt-6">
        <h1 className="text-4xl text-center font-bold">Most Recent Blogs</h1>
      </div>
      <section className="p-6 bg-secondary rounded-lg mt-6 grid gap-6">
        <Suspense
          fallback={
            <div className={`flex justify-center items-center h-24 mx-auto`}>
              <Loader2Icon className={`animate-spin`} />
            </div>
          }
        >
          <BlogList />
        </Suspense>
      </section>
    </main>
  );
}
