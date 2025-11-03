"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { postFeedbackApi } from "@/lib/api/extra";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

// -------------------- Animated Check Icon --------------------
export interface CircleCheckBigIconHandle {
  startAnimation: () => void;
}

export const CircleCheckBigIcon = forwardRef<
  CircleCheckBigIconHandle,
  { size: number; duration?: number }
>(({ size, duration = 1 }, ref) => {
  const pathRef = useRef<SVGPathElement>(null);

  const startAnimation = () => {
    const path = pathRef.current;
    if (!path) return;
    path.style.transition = `stroke-dashoffset ${duration}s ease-out`;
    path.style.strokeDashoffset = "0";
  };

  useImperativeHandle(ref, () => ({
    startAnimation,
  }));

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#22c55e"
        strokeWidth="5"
        strokeDasharray="282.743"
        strokeDashoffset="282.743"
      />
      <path
        ref={pathRef}
        d="M30 50 L45 65 L70 35"
        stroke="#22c55e"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="60"
        strokeDashoffset="60"
      />
    </svg>
  );
});

// -------------------- Feedback Form --------------------
type FeedbackData = {
  name: string;
  email: string;
  feedback: string;
};

export default function FeedbackForm() {
  const CircleCheckBigIconRef = useRef<CircleCheckBigIconHandle>(null);
  const [{ token }] = useCookies(["token"]);

  const form = useForm<FeedbackData>({
    defaultValues: { name: "", email: "", feedback: "" },
  });

  const {
    mutate,
    isSuccess,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ["post_feedback"],
    mutationFn: (body: FeedbackData) => postFeedbackApi({ body, token }),
    onError: (err: any) =>
      toast.error(err.message ?? "Failed to submit feedback"),
    onSuccess: (res: idk) => toast.success(res.message ?? "Feedback sent!"),
  });

  const onSubmit = (data: FeedbackData) => mutate(data);

  useEffect(() => {
    if (isSuccess) CircleCheckBigIconRef.current?.startAnimation();
  }, [isSuccess]);

  // ---------------- Success Screen ----------------
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full aspect-video flex flex-col justify-center items-center gap-6"
      >
        <motion.div
          className="w-28 h-28"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <CircleCheckBigIcon
            ref={CircleCheckBigIconRef}
            size={112}
            duration={1}
          />
        </motion.div>

        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-semibold text-center"
        >
          Feedback Submitted!
        </motion.h4>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted-foreground text-center"
        >
          The admin will review it soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            asChild
            variant="outline"
            className="hover:scale-105 transition-transform duration-200"
          >
            <Link href="/">Go Home</Link>
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  // ---------------- Feedback Form ----------------
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="feedback"
          rules={{ required: "Feedback is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your thoughts..."
                  className="min-h-[100px]"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Feedback"}
        </Button>
      </form>
    </Form>
  );
}
