"use client";

import {
  ChevronLeft,
  EllipsisIcon,
  Loader2Icon,
  LoaderIcon,
  LucideLoaderPinwheel,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { HomeIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Settings() {
  const themes = ["light", "dark", "system"];
  const { theme, setTheme } = useTheme();
  const navig = useRouter();
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
      <header className="h-12 border-b flex justify-start items-center px-6 w-full">
        <h3>Settings</h3>
      </header>

      {/* Main Content */}
      <section className="flex-1 grid grid-cols-5">
        {/* Sidebar */}
        <div className="w-full p-6">
          <nav className="w-full h-full space-y-6 bg-secondary/50 rounded-lg p-6 pt-0">
            <div className="border-b py-4">
              <Button
                variant="ghost"
                onClick={() => {
                  navig.back();
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
        </div>

        {/* Main Settings */}
        <div className="col-span-4 p-12">
          <h2 className="text-lg font-bold">General Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your preferences and application behavior
          </p>

          {/* Theme Selection */}
          <div className="mt-12 border-t pt-4">
            <span>Choose your theme:</span>
            <div className="w-full grid grid-cols-3 gap-6 mt-4">
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
            <div className="grid grid-cols-2 pt-4 gap-6">
              <Button className="w-full" variant="outline">
                (12-hour clock) 6:20 PM
              </Button>
              <Button className="w-full" variant="outline">
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
