import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React from "react";

export default function NodeNav({ title }: { title: string }) {
  return (
    <div className="text-xl h-16 p-2 border-b flex justify-between items-center">
      <Button size={"icon"} variant={"ghost"}>
        <ChevronLeft />
      </Button>
      <div className="h-full flex justify-center items-center pr-6 text-sm text-muted-foreground">
        {title}
      </div>
    </div>
  );
}
