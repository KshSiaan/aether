"use client";

import {
  ChevronLeft,
  EllipsisIcon,
  Loader2Icon,
  LoaderIcon,
  LucideLoaderPinwheel,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HomeIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

function NavigationContent({ onNavigate }: { onNavigate?: () => void }) {
  const navig = useRouter();

  return (
    <nav className="w-full h-full space-y-6 bg-secondary/50 rounded-lg p-6 pt-0">
      <div className="border-b py-4">
        <Button
          variant="ghost"
          onClick={() => {
            navig.back();
            onNavigate?.();
          }}
        >
          <ChevronLeft />
          Go back
        </Button>
      </div>
      <div className="space-y-2 p-2">
        <Button className="w-full justify-start" variant="secondary">
          <HomeIcon /> General
        </Button>
        <Button className="w-full justify-start" variant="ghost">
          <EllipsisIcon />
          Others
        </Button>
      </div>
    </nav>
  );
}

export default function Settings() {
  const themes = ["light", "dark", "system"];
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);

  const loaders = {
    names: ["type-1", "type-2", "type-3"],
    tags: [
      <Loader2Icon key={1} />,
      <LoaderIcon key={2} />,
      <LucideLoaderPinwheel key={3} />,
    ],
  };

  return (
    <div className="h-dvh flex flex-col">
      {/* Header */}
      <header className="h-12 border-b flex justify-between items-center px-4 md:px-6 w-full">
        <h3>Settings</h3>
        {isMobile && (
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="">
                <NavigationContent onNavigate={() => setSheetOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        )}
      </header>

      {/* Main Content */}
      <section className="flex-1 grid md:grid-cols-5 overflow-auto">
        {/* Sidebar - hidden on mobile */}
        {!isMobile && (
          <div className="w-full p-6">
            <NavigationContent />
          </div>
        )}

        {/* Main Settings */}
        <div className="md:col-span-4 p-4 md:p-12">
          <h2 className="text-lg font-bold">General Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your preferences and application behavior
          </p>

          {/* Theme Selection */}
          <div className="mt-8 md:mt-12 border-t pt-4">
            <span>Choose your theme:</span>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-4">
              {themes.map((x, i) => (
                <Card
                  suppressHydrationWarning
                  className={cn(
                    "w-full aspect-[6/5] rounded-lg border flex flex-col bg-bottom bg-no-repeat bg-contain hover:bg-secondary hover:shadow cursor-pointer active:scale-95 transition-all",
                    theme === x && "!bg-zinc-200 dark:!bg-zinc-700"
                  )}
                  style={{ backgroundImage: `url('/img/${x}.svg')` }}
                  key={x}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setTheme(x);
                    }
                  }}
                  onClick={() => {
                    setTheme(x);
                  }}
                >
                  <CardHeader className="w-full">
                    <CardTitle className="text-sm capitalize">
                      &gt; _{" "}
                      {i + 1 === themes.length
                        ? "System Default"
                        : `${x} Theme`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="w-full flex-1"></CardContent>
                  <CardFooter className="w-full"></CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <Separator className="mt-6" />

          {/* Time Format Selection */}
          <div className="pt-4">
            <span>Choose Time format preference:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 pt-4 gap-4 md:gap-6">
              <Button className="w-full bg-transparent" variant="outline">
                (12-hour clock) 6:20 PM
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                (Military hour clock) 18:20
              </Button>
            </div>
          </div>

          <Separator className="mt-6" />

          {/* Loader Selection */}
          <div className="pt-4">
            <span>Choose your loading icon:</span>
            <div className="flex flex-row justify-start items-center gap-4 mt-4">
              {loaders.names.map((_, i) => (
                <Button size="icon" variant="outline" key={i}>
                  {loaders.tags[i]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
