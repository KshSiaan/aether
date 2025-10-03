"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Link from "next/link";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn, idk } from "@/lib/utils";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

// Zod schema for login
const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Page() {
  const [, setCookie] = useCookies(["token"]);
  const navig = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (body: LoginSchema) => {
      return loginApi(body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      setCookie("token", res.token);
      navig.push("/profile");
      toast.success(res.message ?? "Successfully logged in");
    },
  });
  const { theme } = useTheme();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginSchema) {
    mutate(values);
  }

  return (
    <main className="h-screen justify-center items-center flex flex-col shadow-none! relative">
      <div className="lg:w-3xl h-fit flex flex-col justify-center items-center p-4">
        <SparklesText className="text-3xl! text-center mb-6" sparklesCount={2}>
          <Link href={"/"}>Aether</Link>
        </SparklesText>

        <Card className="w-full h-full shadow-none border-none p-0 flex justify-center items-center bg-background">
          <MagicCard
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            className="p-0 w-full h-full bg-background! "
          >
            <CardContent className="p-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="name@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Verifying.." : "Sign In"}
                  </Button>
                </form>
              </Form>
            </CardContent>

            <CardFooter className="p-4 border-t border-border [.border-t]:pt-4 flex flex-col gap-2">
              <Button className="w-full" variant="outline" asChild>
                <Link href={"/register"}>Sign Up</Link>
              </Button>
            </CardFooter>
          </MagicCard>
        </Card>

        <h4 className="my-4">Or</h4>
        <p>Sign in using</p>
        <div className="w-full flex flex-row justify-center items-center gap-4 mt-4">
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
