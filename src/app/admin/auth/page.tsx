"use client";

import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Link from "next/link";
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

// Zod schema for login
const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Page() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (body: { email: string; password: string }) => {
      return loginApi(body);
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Success!");
    },
  });
  function onSubmit(values: LoginSchema) {
    console.log("Login Data:", values);
    mutate(values);
  }

  return (
    <main className="h-screen justify-center items-center flex flex-col shadow-none! relative">
      <div className="w-xl h-fit flex flex-col justify-center items-center p-4">
        <span
          onClick={() => {
            toast.info("Why would you click that?");
          }}
        >
          <SparklesText
            className="text-3xl! text-center mb-6"
            sparklesCount={6}
          >
            Welcome Raven
          </SparklesText>
        </span>

        <Card className="w-full h-full shadow-none p-0 flex justify-center items-center bg-background">
          <CardContent className="p-4 w-full">
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

                <Button
                  type="submit"
                  variant={"secondary"}
                  className="w-full mt-6"
                  disabled={isPending}
                >
                  {isPending ? "Doing Backend stuff" : "Hop in"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] -z-10"
        )}
      />
    </main>
  );
}
