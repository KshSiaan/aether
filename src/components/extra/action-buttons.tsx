"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, HomeIcon, WrenchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ActionButtons() {
  const navig = useRouter();
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4 animate-in slide-in-from-bottom-4 duration-700 delay-700">
      <Button
        variant="default"
        className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        asChild
      >
        <Link href={"/"}>
          <HomeIcon className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
          Go Home
        </Link>
      </Button>

      <Button
        variant="outline"
        className="group hover:bg-muted/50 transition-all duration-300 transform hover:scale-105 bg-transparent"
        onClick={() => {
          navig.back();
        }}
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
        Go Back
      </Button>

      <Button
        variant="ghost"
        className="group hover:bg-muted/50 transition-all duration-300"
        asChild
      >
        <Link href={"/feedback"}>
          <WrenchIcon className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
          Need Fixing?
        </Link>
      </Button>
    </div>
  );
}
