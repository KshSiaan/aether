import React, { Suspense } from "react";
import Code from "./code";
import NodeNav from "../node-nav";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  return (
    <main className="h-dvh w-full flex flex-col overflow-hidden bg-background">
      <NodeNav title="Finalize your code" />
      <Suspense
        fallback={
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        }
      >
        <Code />
      </Suspense>
    </main>
  );
}
