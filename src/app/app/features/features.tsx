"use client";
import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getNodesApi } from "@/lib/api/node";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface Dataset {
  name: string;
  description: string;
  childs: number[];
  id: number;
}

export default function Features() {
  const { theme } = useTheme();
  const { data, isPending }: idk = useQuery({
    queryKey: ["nodes"],
    queryFn: getNodesApi,
  });
  if (isPending) {
    <div className={`flex justify-center items-center h-24 mx-auto`}>
      <Loader2Icon className={`animate-spin`} />
    </div>;
  }
  const dataSet: Dataset[] = data?.data;
  return dataSet?.map((x) => (
    <MagicCard
      key={x.id}
      gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      className="aspect-video rounded-xl relative group cursor-pointer transform hover:scale-105 transition-all duration-300"
    >
      {/* Flex wrapper inside MagicCard */}
      <div className="w-full flex flex-col aspect-video py-6">
        <CardHeader>
          <CardTitle>{x.name}</CardTitle>
          <p className="text-slate-300 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
            {x.description}
          </p>
        </CardHeader>

        <CardContent className="flex justify-between items-center mt-auto">
          <CardDescription className="flex gap-2 items-center">
            <div className="text-4xl rounded-sm bg-secondary aspect-square size-10 flex justify-center items-center">
              {x.childs.length.toLocaleString()}
            </div>{" "}
            nodes available
          </CardDescription>
          <Button variant={"outline"} asChild>
            <Link href={`features/${x.id}`} className="h-fit" key={x.name}>
              <SparklesIcon /> Explore this node
            </Link>
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
  ));
}
