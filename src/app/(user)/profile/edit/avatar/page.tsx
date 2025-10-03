"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function Page() {
  const [selectedAv, setSelectedAv] = useState<number | undefined>();
  return (
    <main className="p-6 py-24">
      <section className="w-full flex justify-center items-center">
        <Avatar className="size-[200px] bg-secondary">
          <AvatarImage src={"/avatar/default.png"} />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
      </section>
      <section className="mt-12 bg-card rounded-lg w-full p-6">
        <h1>Select Avatar</h1>
        <div className="w-full grid grid-cols-2 lg:grid-cols-8 gap-6 mt-6">
          {Array(16)
            .fill("")
            .map((_, i) => (
              <div
                className="aspect-square w-full"
                onClick={() => {
                  setSelectedAv(i);
                }}
                key={i}
              >
                <Avatar
                  className={cn(
                    `w-full h-full rounded-lg transition-all`,
                    selectedAv !== i
                      ? "bg-background"
                      : "bg-secondary scale-105 shadow-lg border"
                  )}
                >
                  <AvatarImage src="/avatar/default.png" />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
