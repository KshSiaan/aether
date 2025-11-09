"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { idk } from "@/lib/utils";
import { FileTextIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Finalizer() {
  const [codeSet, setCodeSet] = useState<
    { title: string; language: string; code: idk; node: number } | undefined
  >();
  useEffect(() => {
    const codeset = localStorage.getItem("codeset");
    if (codeset) {
      setCodeSet(JSON.parse(codeset));
    }
  }, []);
  return (
    <Card className="w-1/2 bg-background rounded-none">
      <CardHeader className="border-b">
        <CardTitle>Do you want to save it?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="flex text-sm font-semibold items-center gap-2 border p-4 hover:bg-secondary/30">
              <FileTextIcon className="size-4" /> {codeSet?.title}
            </div>
          </HoverCardTrigger>
          <HoverCardContent align="start" className="w-full">
            <div className="w-full">
              <pre className="whitespace-pre-wrap bg-muted text-sm rounded-lg p-4 font-mono overflow-x-auto">
                <code>
                  {codeSet?.code?.split("\n")?.slice(0, 5)?.join("\n")}
                  {codeSet?.code?.split("\n")?.length > 5 && "\n..."}
                </code>
              </pre>
            </div>
          </HoverCardContent>
        </HoverCard>
        <p className="text-muted-foreground ">
          type: &nbsp; <Badge className="capitalize">{codeSet?.language}</Badge>
        </p>
        <div className=""></div>
      </CardContent>
      <CardFooter className="justify-end gap-4">
        <Button variant={"ghost"}>Go back</Button>
        <Button>Confirm & Save</Button>
      </CardFooter>
    </Card>
  );
}
