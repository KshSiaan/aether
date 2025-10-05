import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Share1Icon } from "@radix-ui/react-icons";
import { BookmarkIcon } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <main className="p-6">
      <div className="mt-6">
        <h1 className="text-4xl text-center font-bold">Most Recent Blogs</h1>
      </div>
      <section className="p-6 bg-secondary rounded-lg mt-6 grid gap-6">
        {Array(10)
          .fill("")
          .map((_, i) => (
            <Card
              className="w-full relative bg-background rounded-lg bg-cover bg-center"
              key={i}
            >
              <CardHeader className="border-b">
                <CardTitle>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mt-2 text-sm">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Accusamus perspiciatis vero nisi! Voluptas in officia modi,
                  reprehenderit fugiat, molestiae tempore ipsum voluptates
                  dolores, qui non aspernatur! Aut sapiente inventore eligendi.
                </CardDescription>
              </CardContent>
              <CardFooter className="border-t flex justify-between items-center">
                <div className="">
                  <Button variant={"outline"}>Read this blog</Button>
                </div>
                <div className="space-x-2">
                  <Button variant={"outline"} size={"icon"}>
                    <BookmarkIcon />
                  </Button>
                  <Button variant={"outline"} size={"icon"}>
                    <Share1Icon />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
      </section>
    </main>
  );
}
