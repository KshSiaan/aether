"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SparklesIcon } from "lucide-react";
import React from "react";

interface Dataset {
  title: string;
  description: string;
  node: number;
}

export default function Page() {
  const dataSet: Dataset[] = [
    {
      title: "Applications",
      description: "Here you can explore some helpful tools",
      node: 0,
    },
    {
      title: "Front end Code blocks",
      description: "Tired to find exceptional code blocks?",
      node: 0,
    },
    {
      title: "Back end Code blocks",
      description: "Need a hand to get things done now?",
      node: 0,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 h-full w-full p-6">
      {dataSet.map((x) => (
        <MagicCard
          key={x.title}
          className="aspect-video rounded-xl relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
        >
          {/* Flex wrapper inside MagicCard */}
          <div className="w-full flex flex-col h-full aspect-video py-6">
            <CardHeader>
              <CardTitle>{x.title}</CardTitle>
              <p className="text-slate-300 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
                {x.description}
              </p>
            </CardHeader>

            <CardContent className="flex justify-between items-center mt-auto">
              <CardDescription className="flex gap-2 items-center">
                <div className="text-4xl rounded-sm bg-secondary aspect-square size-10 flex justify-center items-center">
                  {x.node.toLocaleString()}
                </div>{" "}
                nodes available
              </CardDescription>
              <Button variant={"outline"}>
                <SparklesIcon /> Explore this node
              </Button>
            </CardContent>
          </div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/4 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </MagicCard>
      ))}
    </div>
  );
}
