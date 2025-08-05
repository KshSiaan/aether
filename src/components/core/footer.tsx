"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { AnimatePresence, motion } from "framer-motion";

export default function Footer() {
  const [extended, setExtended] = useState(false);

  return (
    <footer className="p-4 bg-secondary">
      <div className="p-4 bg-foreground dark:bg-background border rounded-lg">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-black text-background  dark:!text-foreground">
            Aether
          </h4>
          <div className="flex gap-6">
            <Button>Connect with Raven</Button>
          </div>
        </div>

        <div className="mt-6 relative flex justify-between items-center text-xs text-muted  dark:!text-muted-foreground">
          <span>&copy; 2025 Aether</span>
          <div className="absolute inset-x-0 flex justify-center">
            <Button
              size="sm"
              variant="link"
              className="text-background dark:!text-muted-foreground"
              onClick={() => setExtended((prev) => !prev)}
            >
              {extended ? (
                <>
                  <ArrowUpIcon className="mr-1" />
                  Hide
                  <ArrowUpIcon className="ml-1" />
                </>
              ) : (
                <>
                  <ArrowDownIcon className="mr-1" />
                  Extend
                  <ArrowDownIcon className="ml-1" />
                </>
              )}
            </Button>
          </div>
          <span>— crafted beyond dimensions</span>
        </div>

        <AnimatePresence initial={false}>
          {extended && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <Separator className="mt-4 bg-zinc-600!" />
              <div className="mt-4 text-background dark:!text-muted-foreground w-full flex justify-between gap-4 items-center">
                <div className="text-sm">Legal Pages:</div>
                <div className="">
                  <Button
                    variant="link"
                    className="text-background dark:!text-foreground"
                  >
                    Terms & Conditions
                  </Button>
                  <Button
                    variant="link"
                    className="text-background dark:!text-foreground"
                  >
                    Privacy Policy
                  </Button>
                  <Button
                    variant="link"
                    className="text-background dark:!text-foreground"
                  >
                    Return Policy
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
}
