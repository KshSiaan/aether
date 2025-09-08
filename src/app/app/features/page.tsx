import { Button } from "@/components/ui/button";
import { ConstructionIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-full rounded-sm p-2 text-sm text-muted-foreground flex flex-col justify-center items-center gap-2 ">
        <ConstructionIcon />
        <p>This feature is under development..</p>
        <Button variant={"link"} asChild>
          <Link href={"/contact"}>want to help??</Link>
        </Button>
      </div>
    </div>
  );
}
