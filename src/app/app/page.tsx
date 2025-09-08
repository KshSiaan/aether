import { Button } from "@/components/ui/button";
import { Users2Icon } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <div>
      <div
        className="h-[100px] w-[200px] bg-zinc-900 fixed top-0 right-0 flex justify-end items-start p-6"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      >
        <Button variant={"ghost"}>
          <Users2Icon />
        </Button>
      </div>
      Page
    </div>
  );
}
