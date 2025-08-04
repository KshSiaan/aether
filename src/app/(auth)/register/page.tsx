"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Link from "next/link";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
export default function Page() {
  const { theme } = useTheme();
  return (
    <main className="h-screen justify-center items-center flex  flex-col shadow-none! relative">
      <div className="w-3xl h-fit flex flex-col justify-center items-center p-4">
        <SparklesText className="text-3xl! text-center mb-6" sparklesCount={2}>
          <Link href={"/"}>Aether</Link>
        </SparklesText>
        <Card className="w-full h-full shadow-none border-none p-0 flex justify-center items-center bg-background">
          <MagicCard
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            className="p-0 w-full h-full bg-background! "
          >
            <CardContent className="p-4">
              <form>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Full name</Label>
                    <Input id="name" type="text" placeholder="Your name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Tag name</Label>
                    <Input id="tag" type="text" placeholder="Your alias name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm">Confirm Password</Label>
                    <Input id="confirm" type="password" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="p-4 border-t border-border [.border-t]:pt-4 flex flex-col gap-2">
              <Button className="w-full">Register</Button>
              <Button className="w-full" variant={"link"}>
                Have an account?
              </Button>
            </CardFooter>
          </MagicCard>
        </Card>
        <h4 className="my-4">Or</h4>
        <p>Complete sign up using</p>
        <div className="w-full flex flex-row justify-center items-center gap-4  mt-4">
          <Button size={"icon"} className="rounded-full">
            <GitHubLogoIcon />
          </Button>
          <Button size={"icon"} className="rounded-full">
            <DiscordLogoIcon />
          </Button>
        </div>
      </div>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] -z-10"
        )}
      />
    </main>
  );
}
