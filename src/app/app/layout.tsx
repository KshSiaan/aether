import NavigContent from "@/components/extra/navig-content";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CodeXmlIcon,
  ConstructionIcon,
  DramaIcon,
  HouseIcon,
  MenuIcon,
  NewspaperIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const FriendsPanel = () => (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold">Friends</h4>
      <div className="w-full rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground flex flex-col justify-center items-center gap-3">
        <ConstructionIcon className="h-8 w-8" />
        <p className="text-center">This feature is under development..</p>
        <Button variant={"link"} asChild className="h-auto p-0">
          <Link href={"/contact"}>want to help??</Link>
        </Button>
      </div>
    </div>
  );

  return (
    <section className="w-full min-h-screen">
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                </SheetHeader>
                <nav className="p-6">
                  <NavigContent />
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold"></h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  Friends
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                </SheetHeader>
                <div className="p-6">
                  <FriendsPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <main className="flex-1 p-4">
          <div className="w-full h-full border rounded-lg bg-background">
            {children}
          </div>
        </main>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-[240px_1fr_280px] w-full p-6 min-h-screen gap-6">
        <aside className="border rounded-lg p-4">
          <NavigContent />
        </aside>
        <main className="h-full border rounded-lg bg-background">
          {children}
        </main>
        <aside className="border rounded-lg p-4">
          <FriendsPanel />
        </aside>
      </div>
    </section>
  );
}
