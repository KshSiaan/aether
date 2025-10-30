"use client";
import { usePathname } from "next/navigation";
import React from "react";

import { CodeXmlIcon, DramaIcon, HouseIcon, NewspaperIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
export default function NavigContent() {
  const navItems = [
    { name: "Home", href: "/", icon: HouseIcon },
    { name: "Feed", href: "/app/feed", icon: NewspaperIcon },
    { name: "Featured", href: "/app/features", icon: CodeXmlIcon },
    { name: "Spirits", href: "/app/features/spirits", icon: DramaIcon },
  ];
  const pathname = usePathname();
  return (
    <div className="space-y-4">
      {navItems.map(({ name, href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Button
            key={href}
            asChild
            variant={isActive ? "default" : "outline"}
            className="w-full"
          >
            <Link href={href}>
              <Icon className="mr-2 h-4 w-4" /> {name}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
