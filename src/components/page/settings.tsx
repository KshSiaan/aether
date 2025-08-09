"use client";
import {
  ChevronLeft,
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

export default function Settings() {
  const themes = ["light", "dark", "system"];
  const { theme, setTheme } = useTheme();
  return (
    <div className="">
      <div className="h-18 border-b flex jsutify-start items-center px-6">
        <h3>Settings</h3>
      </div>
      <section className="w-full grid grid-cols-5">
        <div className="h-dvh w-full border-r">
          <nav className="w-full h-full space-y-6 p-6 pt-0">
            <div className="border-b py-4">
              <Button variant={"ghost"}>
                <ChevronLeft />
                Go back
              </Button>
            </div>
            <Button className="w-full justify-start" variant={"secondary"}>
              <HomeIcon /> General
            </Button>
            <Button className="w-full justify-start" variant={"link"}>
              Others
            </Button>
          </nav>
        </div>
        <div className="col-span-4 p-12">
          <h2 className="text-lg font-bold">General Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your preferences and application behavior
          </p>
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
          <div className="pt-4">
            <span>Choose Time format preference:</span>
            <div className="grid grid-cols-2 pt-4 gap-6">
              <Button className="w-full" variant={"outline"}>
                (12-hour clock) 6:20 PM
              </Button>
              <Button className="w-full" variant={"outline"}>
                (Military hour clock) 18:20
              </Button>
            </div>
          </div>
          <Separator className="mt-6" />
          <div className="pt-4">
            <span>Choose your loading icon:</span>
            <div className="flex flex-row justify-start items-center gap-4 mt-4">
              <Button className="" size={"icon"} variant={"outline"}>
                <Loader2Icon />
              </Button>
              <Button className="" size={"icon"} variant={"outline"}>
                <LoaderIcon />
              </Button>
              <Button className="" size={"icon"} variant={"outline"}>
                <LucideLoaderPinwheel />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
