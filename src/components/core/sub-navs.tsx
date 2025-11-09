"use client";
import React from "react";
import { MagicCard } from "../magicui/magic-card";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/navigation";
import Link from "next/link";

export default function SubNavs() {
  const path = usePathname();
  const set = navItems.find((x) => {
    return path.includes(x.href);
  });
  return (
    <MagicCard className="w-full rounded-sm h-12 flex justify-start p-2 items-center">
      <ButtonGroup>
        <Button variant={path === set?.href ? "secondary" : "outline"} asChild>
          <Link href={set?.href ?? ""}>{set?.label}</Link>
        </Button>
        {set?.childs?.map((x) => (
          <Button
            variant={path === x.href ? "secondary" : "outline"}
            key={x.label}
            asChild
          >
            <Link href={x.href}>{x.label}</Link>
          </Button>
        ))}
      </ButtonGroup>
    </MagicCard>
  );
}
