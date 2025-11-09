"use client";
import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeft, SparklesIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import NodeNav from "./node-nav";
interface Dataset {
  id: number;
  title: string;
  description: string;
  node: number;
  to: string;
}

export default function Page() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState<undefined | number>();
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

  const dataSet: Dataset[] = [
    {
      id: 1,
      title: "Applications",
      description: "Here you can explore some helpful tools",
      node: 1,
      to: "application",
    },
    {
      id: 2,
      title: "Front end Code blocks",
      description: "Tired to find exceptional code blocks?",
      node: 0,
      to: "frontend",
    },
    {
      id: 3,
      title: "Back end Code blocks",
      description: "Need a hand to get things done now?",
      node: 0,
      to: "backend",
    },
  ];
  return (
    <main className="h-dvh w-full flex flex-col overflow-y-auto">
      <NodeNav title="Select Categories" />
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start p-6">
        {dataSet.map((x) => (
          <MagicCard
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            key={x.id}
            className="rounded-xl relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            {/* Flex wrapper inside MagicCard */}
            <div
              className={cn(
                "w-full flex flex-col py-6  rounded-lg",
                selected === x.id && "bg-secondary"
              )}
            >
              <CardHeader className="border-b">
                <CardTitle>{x.title}</CardTitle>
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
    </main>
  );
}
