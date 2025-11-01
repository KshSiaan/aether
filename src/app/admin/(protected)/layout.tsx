import Dock from "@/components/ui/dock";
import { Metadata } from "next";
import Docked from "../../../components/core/dock";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon, UserCircle2Icon } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { navItems } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Aether - Admin",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="h-dvh w-dvw bg-background flex flex-col justify-between items-center gap-6 p-6 overflow-hidden">
      <div className="w-full flex justify-between items-center">
        <SparklesText className="text-2xl!" sparklesCount={2}>
          <Link href={"/"}>Aether</Link>
        </SparklesText>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-help bg-card size-10">
              <AvatarImage src={"/avatar/default.png"} />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <UserCircle2Icon />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <BellIcon />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 w-full">{children}</div>

      {/* Dock container centered */}
      <div className="w-full">
        <div className="w-full grid grid-cols-5 gap-6">
          <div className="col-span-4 grid grid-cols-3 gap-4 bg-card rounded-sm text-xs">
            <div className="flex justify-center items-center w-full">
              Total Nodes: 78
            </div>
            <div className="flex justify-center items-center w-full">
              Total Users: 78
            </div>
            <div className="flex justify-center items-center w-full ">
              Total Blogs: 78
            </div>
          </div>
          {/* <div className="w-full bg-card rounded-sm">

          </div> */}
          <MagicCard className="w-full rounded-sm">
            <ButtonGroup>
              <Button variant={"outline"}>Stastics</Button>
              <Button variant={"outline"}>Stastics</Button>
            </ButtonGroup>
          </MagicCard>
        </div>
        <div className="w-full flex justify-center items-end relative h-[100px]">
          <Dock className="absolute bottom-0 top-1/2! left-1/2! -translate-1/2!">
            <Docked links={navItems} />
          </Dock>
        </div>
      </div>
    </main>
  );
}
