"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function BlogNaver() {
  const path = usePathname();
  const navig = useRouter();
  return (
    <div className="w-full px-6">
      <section className="bg-secondary p-6 rounded-lg w-full flex justify-between items-center overflow-hidden">
        <AnimatePresence mode="wait">
          {path !== "/blog" && (
            <motion.div
              key="back-btn"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <Button
                onClick={() => {
                  navig.back();
                }}
              >
                <ArrowLeft className="mr-1" />
                Go back
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          key="center-btns"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="space-x-2"
        >
          <Button variant="link">
            <Link href={"/blog"}>Recent Blogs</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href={"/blog/saved"}>Saved Blogs</Link>
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          {path === "/blog" && (
            <motion.div
              key="write-btn"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
            >
              <Button asChild>
                <Link href={"/blog/write"}>Write a Blog</Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
