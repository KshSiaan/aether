"use client";
import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { SparklesText } from "../magicui/sparkles-text";
import { ShimmerButton } from "../magicui/shimmer-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
export default function Navbar() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState<boolean>(false);
  const [{ token }] = useCookies(["token"]);
  const scrollVelocity = useVelocity(scrollY);
  const velocitySpring = useSpring(scrollVelocity, {
    stiffness: 300,
    damping: 70,
    mass: 0.2,
  });
  useEffect(() => {
    setMounted(true);
  }, []);
  const shiftY = useTransform(velocitySpring, (v) => {
    return v > 0 ? Math.min(v / -25, 0) : Math.max(v / -25, 0);
  });
  if (!mounted) {
    return null;
  }
  return (
    <motion.div
      style={{
        y: shiftY,
        willChange: "transform",
        transform: "translateZ(0)",
      }}
      className="fixed py-4 left-1/2 -translate-x-1/2 w-full px-4 grid grid-cols-3 items-center gap-4 bg-zinc-50/30 dark:bg-zinc-950/30 backdrop-blur-sm z-50"
    >
      {/* Left section */}
      <div className="flex justify-start">
        <SparklesText className="text-2xl!" sparklesCount={2}>
          <Link href={"/"}>Aether</Link>
        </SparklesText>
      </div>

      {/* Center section - perfectly centered */}
      <div className="lg:hidden w-min"></div>
      <nav className="hidden h-12 lg:flex justify-center items-center">
        <div className="px-4 h-full rounded-full border flex justify-center items-center bg-zinc-50/40 dark:bg-zinc-950/40 shadow">
          <Button variant={"link"} asChild>
            <Link href={"/app/features"}>Features</Link>
          </Button>
          <Button variant={"link"} asChild>
            <Link href={"/origin"}>Origin</Link>
          </Button>
          <Button variant={"link"}>Blogs</Button>
          <Button variant={"link"} asChild>
            <Link href={"/settings"}>Settings</Link>
          </Button>
        </div>
      </nav>

      {/* Right section */}
      <div className="flex justify-end items-center gap-6">
        <Link href={token ? "/profile" : "/login"} suppressHydrationWarning>
          <ShimmerButton className="shadow-2xl">
            <span
              suppressHydrationWarning
              className="lg:whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg"
            >
              {token ? "My Profile" : "Login"}
            </span>
          </ShimmerButton>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"secondary"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <div className="h-full w-full space-y-6 p-6">
              <Button className="w-full" variant={"secondary"} asChild>
                <Link href={"/app/features"}>Features</Link>
              </Button>
              <Button className="w-full" variant={"secondary"} asChild>
                <Link href={"/origin"}>Origin</Link>
              </Button>
              <Button className="w-full" variant={"secondary"}>
                Blogs
              </Button>
              <Button className="w-full" variant={"secondary"} asChild>
                <Link href={"/settings"}>Settings</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.div>
  );
}
