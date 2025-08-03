"use client";
import React from "react";
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

export default function Navbar() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const velocitySpring = useSpring(scrollVelocity, {
    stiffness: 300,
    damping: 70,
    mass: 0.2,
  });

  const shiftY = useTransform(velocitySpring, (v) => {
    return v > 0 ? Math.min(v / -25, 0) : Math.max(v / -25, 0);
  });

  return (
    <motion.div
      style={{
        y: shiftY,
        willChange: "transform",
        transform: "translateZ(0)",
      }}
      className="fixed py-4 left-1/2 -translate-x-1/2 w-full px-4 grid grid-cols-3 items-center gap-4 bg-zinc-50/30 backdrop-blur-sm z-50"
    >
      {/* Left section */}
      <div className="flex justify-start">
        <SparklesText className="text-2xl!" sparklesCount={2}>
          <Link href={"/"}>Aether</Link>
        </SparklesText>
      </div>

      {/* Center section - perfectly centered */}
      <nav className="h-12 flex justify-center items-center">
        <div className="px-4 h-full rounded-full border flex justify-center items-center bg-zinc-50/40 shadow">
          <Button variant={"link"}>Features</Button>
          <Button variant={"link"}>Origin</Button>
          <Button variant={"link"}>Blogs</Button>
          <Button variant={"link"}>Settings</Button>
        </div>
      </nav>

      {/* Right section */}
      <div className="flex justify-end">
        <ShimmerButton className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            Join Now
          </span>
        </ShimmerButton>
      </div>
    </motion.div>
  );
}
