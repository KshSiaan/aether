import React, { Suspense } from "react";
import Feed from "./feed";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
  return (
    <ScrollArea className="h-[calc(100dvh-64px)]">
      <div className="p-4 space-y-4 min-h-full">
        <Suspense>
          <Feed />
        </Suspense>
      </div>
    </ScrollArea>
  );
}
