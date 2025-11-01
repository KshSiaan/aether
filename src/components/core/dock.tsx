"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DockCard, DockCardInner, useDock } from "@/components/ui/dock";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavItem } from "@/lib/navigation";

export default function Docked({ links }: { links: NavItem[] }) {
  const { animatingIndexes, setAnimatingIndexes } = useDock();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const displayedItems = links;

  useEffect(() => {
    const currentItem = displayedItems.find((item) => item.href === pathname);
    const currentIndex = currentItem ? [parseInt(currentItem.id)] : [];
    if (
      currentIndex.length !== animatingIndexes.length ||
      currentIndex[0] !== animatingIndexes[0]
    ) {
      setAnimatingIndexes(currentIndex);
    }
  }, [pathname, animatingIndexes, setAnimatingIndexes, displayedItems]);

  return (
    <div className="flex justify-center items-center gap-4 flex-wrap">
      <TooltipProvider>
        {displayedItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              {/* Use a div, not a button */}
              <div
                className="cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                <DockCard id={item.id}>
                  <DockCardInner src={item.src} id={item.id}>
                    {item.icon}
                  </DockCardInner>
                </DockCard>
              </div>
            </TooltipTrigger>
            <TooltipContent>{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
