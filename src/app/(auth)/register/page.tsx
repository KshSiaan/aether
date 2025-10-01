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
import { toast } from "sonner";
import { registerApi } from "@/lib/api/auth";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

// Zod schema
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    tag: z.string().min(2, "Tag name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export default function Page() {
  const { theme } = useTheme();
  const [, setCookie] = useCookies(["token"]);
  // const navig = useRouter();
  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: (body: RegisterSchema) => {
      return registerApi(body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      console.log(res);
      // setCookie("token", res.token);
      // navig.push("/profile");
      toast.success(res.message ?? "Successfully created account");
    },
  });
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      tag: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  function onSubmit(values: RegisterSchema) {
    mutate(values);
  }

  return (
    <main className="h-screen justify-center items-center flex flex-col shadow-none! relative">
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tag Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your alias name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

                  <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="p-4 border-t border-border [.border-t]:pt-4 flex flex-col gap-2">
              <Button variant={"link"} className="w-full" asChild>
                <Link href={"/login"}>Have an account?</Link>
              </Button>
            </CardFooter>
          </MagicCard>
        </Card>
        <h4 className="my-4">Or</h4>
        <p>Complete sign up using</p>
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
