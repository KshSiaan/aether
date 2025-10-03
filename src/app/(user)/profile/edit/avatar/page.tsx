import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export default function Page() {
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
        <div className="w-full grid grid-cols-8 gap-6 mt-6">
          <div className="aspect-square w-full">
            <Avatar className="w-full h-full bg-secondary rounded-lg">
              <AvatarImage src="/avatar/default.png" />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </section>
    </main>
  );
}
