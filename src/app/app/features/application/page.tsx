"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dataSet } from "@/lib/dataset";
import { useTheme } from "next-themes";

import Link from "next/link";
import React from "react";

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="grid grid-cols-3 gap-6 h-full w-full p-6">
      {dataSet.map((x) => (
        <Link
          href={
            x.internal
              ? `https://snipit-iota.vercel.app`
              : x.link ?? "https://github.com/kshsiaan"
          }
          key={x.title}
        >
          <MagicCard
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            className="aspect-video rounded-xl relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            {/* Flex wrapper inside MagicCard */}
            <div className="w-full flex flex-col h-full aspect-video py-6">
              <CardHeader>
                <CardTitle>{x.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground transition-colors duration-300">
                  {x.description}
                </p>
                <div className=" space-x-2">
                  {x.tags.map((y) => (
                    <Badge key={y} className="inline-block">
                      {y}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="flex justify-between items-center mt-auto">
                <Button variant={"outline"} className="w-full">
                  Open this application
                </Button>
              </CardContent>
              <CardFooter className="flex justify-end items-end text-xs mt-2">
                Author: {x.author}
              </CardFooter>
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
        </Link>
      ))}
    </div>
  );
}
