import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CodeXmlIcon,
  ConstructionIcon,
  HouseIcon,
  Laptop2Icon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="grid grid-cols-7 w-full p-6 min-h-screen gap-6">
      <div className="border rounded-lg p-4 space-y-4">
        <Button className="w-full" variant={"outline"} disabled>
          <HouseIcon /> Home
        </Button>
        <Button className="w-full">
          <CodeXmlIcon /> Featured
        </Button>
        <Button className="w-full" variant={"outline"} disabled>
          <Laptop2Icon /> Contact Developer
        </Button>
      </div>
      <div className="col-span-5 h-full border rounded-lg p-6">{children}</div>
      <div className="">
        <h4 className="text-xl">Friends</h4>
        <div className="w-full rounded-sm p-2 text-sm text-muted-foreground flex flex-col justify-center items-center gap-2 ">
          <ConstructionIcon />
          <p>This feature is under development..</p>
          <Button variant={"link"} asChild>
            <Link href={"/contact"}>want to help??</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
