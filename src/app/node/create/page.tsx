"use client";
import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, idk } from "@/lib/utils";
import {
  ChevronLeft,
  FileTextIcon,
  Loader2Icon,
  PointerIcon,
  SparklesIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import NodeNav from "./node-nav";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDescription } from "@/components/ui/alert";
import { Kbd } from "@/components/ui/kbd";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getNodesApi } from "@/lib/api/node";

export default function Page() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState<undefined | number>();
  const [pastCode, setPastCode] = useState<undefined | idk>();
  const navig = useRouter();
  function confirmSelect() {
    try {
      localStorage.setItem("selectedNode", JSON.stringify({ node: selected }));
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      return;
    }
    navig.push("/node/create/code");
  }

  const { data, isPending }: idk = useQuery({
    queryKey: ["nodes"],
    queryFn: getNodesApi,
  });

  useEffect(() => {
    const locPastCode = localStorage.getItem("codeset");

    if (locPastCode) {
      const codeset = JSON.parse(locPastCode);
      setPastCode(codeset);
    }
  }, []);

  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }

  return (
    <main className="h-dvh w-full flex flex-col overflow-y-auto">
      <NodeNav title="Select Categories" />
      {pastCode ? (
        <div className="h-full w-full flex-1 flex justify-center items-center">
          <Card className="w-1/2 bg-background rounded-none">
            <CardHeader className="border-b">
              <CardTitle>Still on that block?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="border p-4 hover:bg-secondary/30 flex justify-between items-center">
                    <div className="flex text-sm font-semibold items-center gap-2">
                      <FileTextIcon className="size-4" /> {pastCode?.title}
                    </div>
                    <PointerIcon className="size-5 text-muted-foreground" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent align="start" className="w-full">
                  <div className="w-full">
                    <pre className="whitespace-pre-wrap bg-muted text-sm rounded-lg p-4 font-mono overflow-x-auto">
                      <code>
                        {pastCode?.code?.split("\n")?.slice(0, 5)?.join("\n")}
                        {pastCode?.code?.split("\n")?.length > 5 && "\n..."}
                      </code>
                    </pre>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <p className="text-muted-foreground ">
                type: &nbsp;{" "}
                <Badge className="capitalize">{pastCode?.language}</Badge>
              </p>
              <div className=""></div>
            </CardContent>
            <CardFooter className="justify-end gap-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={"ghost"} className="hover:text-destructive">
                    Start Fresh
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear the code?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Once you confirm, your current code fades into nothing —
                      no undo, no trace.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="pt-6">
                    <AlertDialogCancel
                      className="bg-transparent! border-0"
                      asChild
                    >
                      <Button variant={"ghost"}>Reconsider</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        try {
                          localStorage.removeItem("codeset");
                        } catch (error) {
                          console.error(error);
                          toast.error("Something went wrong");
                        }
                        setPastCode(undefined);
                      }}
                      className="text-foreground"
                      asChild
                    >
                      <Button variant={"destructive"}>Clear Code</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button>
                <Link href={"create/code"}>Check your code</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="h-full flex-1 flex flex-col">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start p-6">
            {data?.data?.map((x: idk) => (
              <MagicCard
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                key={x.id}
                className="rounded-xl relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                {/* Flex wrapper inside MagicCard */}
                <div
                  className={cn(
                    "w-full flex flex-col py-6 rounded-lg",
                    selected === x.id && "bg-secondary"
                  )}
                >
                  <CardHeader className="border-b">
                    <CardTitle>{x.name}</CardTitle>
                    <CardDescription className=" leading-relaxed group-hover:text-white transition-colors duration-300">
                      {x.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="border-t">
                    <Button
                      onClick={() => {
                        setSelected(x.id);
                      }}
                      disabled={x.id === selected}
                    >
                      {x.id === selected
                        ? "Selected this node"
                        : "Select this node"}
                    </Button>
                  </CardFooter>
                </div>
              </MagicCard>
            ))}
          </div>
          <div className="w-full border-t p-6 flex justify-end items-center gap-4">
            {selected ? (
              <>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setSelected(undefined);
                  }}
                >
                  Reset Selection
                </Button>
                <Button
                  onClick={() => {
                    confirmSelect();
                  }}
                >
                  Confirm Selection
                </Button>
              </>
            ) : (
              <div className="w-full flex justify-center items-center text-sm text-muted-foreground">
                Please select a node
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
