"use client";
import { useTheme } from "next-themes";
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
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getBlocksByNodeIdApi, getCategoriesApi } from "@/lib/api/node";
import { Loader2Icon } from "lucide-react";
import { idk } from "@/lib/utils";
import { useState } from "react";

export default function Block_list({ id }: { id: string }) {
  const { theme } = useTheme();
  const [selectedCat, setSelectedCat] = useState<string | undefined>();
  const { data, isPending } = useQuery({
    queryKey: ["block_of_node", id, selectedCat],
    queryFn: (): idk => {
      return getBlocksByNodeIdApi({ node: id, cat: selectedCat ?? "" });
    },
  });
  const { data: cats } = useQuery({
    queryKey: ["cats", id],
    queryFn: (): idk => {
      return getCategoriesApi({ node: parseInt(id) });
    },
  });
  if (isPending) {
    return (
      <div
        className={`flex justify-center items-center h-24 mx-auto col-span-4`}
      >
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return (
    <>
      <div className="col-span-3 grid-cols-2 grid gap-6 p-6">
        {data?.data?.map((x: idk) => (
          <MagicCard
            key={x.title}
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
                  {x.categories.map((catId: number) => {
                    const cat = cats?.data?.find((c: idk) => c.id === catId);
                    return cat ? (
                      <Badge className="inline-block" key={cat.id}>
                        {cat.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </CardHeader>

              <CardContent className="flex justify-between items-center mt-auto">
                <Button variant={"outline"} className="w-full" asChild>
                  <Link href={`/app/features/${id}/${x.id}`}>
                    Open this block
                  </Link>
                </Button>
              </CardContent>
              <CardFooter className="flex justify-end items-end text-xs mt-2">
                Author: {x.author.name}
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
        ))}
      </div>
      <div className="border-l h-full flex flex-col justify-start items-start w-full">
        <div className="border-b p-2 w-full">
          <h4 className="text-end text-lg px-4">Categories</h4>
        </div>
        <div className="w-full flex-1 space-x-2 space-y-2 p-2">
          <Button
            size={"sm"}
            disabled={!selectedCat}
            variant={!selectedCat ? "outline" : "default"}
            onClick={() => {
              setSelectedCat("");
            }}
          >
            All
          </Button>
          {cats?.data?.map((x: idk) => (
            <Button
              size={"sm"}
              disabled={x.id === selectedCat}
              key={x.id}
              variant={selectedCat === x.id ? "outline" : "default"}
              onClick={() => {
                setSelectedCat(x.id);
              }}
            >
              {x.name}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
