import NotFound from "@/app/not-found";
import TargetCursor from "@/components/TargetCursor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiConfig } from "@/lib/config";
import Link from "next/link";
import React, { Suspense } from "react";
import Spirits from "./spirits";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  return (
    <main className="p-4 px-6 h-full overflow-y-auto">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        <Suspense
          fallback={
            <div
              className={`flex justify-center items-center h-full mx-auto col-span-1 md:col-span-2 lg:col-span-4`}
            >
              <Loader2Icon className={`animate-spin`} />
            </div>
          }
        >
          <Spirits />
        </Suspense>
      </div>
      <TargetCursor hideDefaultCursor={false} spinDuration={5} />
    </main>
  );
}
