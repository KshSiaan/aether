"use client";
import NotFound from "@/app/not-found";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { meApi } from "@/lib/api/auth";
import { User } from "@/lib/types/user";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ConstructionIcon, EditIcon } from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  //   const router = useRouter();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["me"],
    queryFn: (): idk => {
      return meApi(token);
    },
  });
  if (isPending) {
    return (
      <div className=" pt-24! p-6 space-y-6">
        <Skeleton className="w-full  h-[400px] rounded-2xl" />
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="w-full  h-[200px] rounded-2xl" />
          <Skeleton className="w-full  h-[200px] rounded-2xl" />
          <Skeleton className="w-full  h-[200px] rounded-2xl" />
          <Skeleton className="w-full  h-[200px] rounded-2xl" />
        </div>
      </div>
    );
  }
  if (isError) {
    console.error(error);
    return NotFound();
  }
  const user: User = data;
  return (
    <main className="pt-18 p-4 pb-6 space-y-6">
      <div className="flex justify-center items-center mt-6">
        <div className="size-[30dvw] lg:size-[200px] relative">
          <Avatar className="size-full bg-secondary z-10">
            <AvatarImage src={user.avatar_url ?? ""} />
            <AvatarFallback>RV</AvatarFallback>
          </Avatar>
          <div className="h-full w-full rounded-full flex items-center justify-center bg-background/80 opacity-0 hover:opacity-100 top-0 left-0 absolute z-30 transition-all">
            <Button
              size={"icon"}
              className="w-full h-full rounded-full"
              variant={"ghost"}
              asChild
            >
              <Link href={"edit/avatar"}>
                <EditIcon />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button asChild>
          <Link href={"edit/avatar"}>Edit Avatar</Link>
        </Button>
      </div>
      <h4 className="text-xl font-semibold mt-12">Edit Profile</h4>
      <div className="space-y-4 flex justify-center items-center">
        <div className="w-full rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground flex flex-col justify-center items-center gap-3">
          <ConstructionIcon className="h-8 w-8" />
          <p className="text-center">This feature is under development..</p>
          <Button variant={"link"} asChild className="h-auto p-0">
            <Link href={"/contact"}>want to help??</Link>
          </Button>
        </div>
      </div>
      <div className="space-y-4 hidden">
        <Label>Name:</Label>
        <Input />
        <Label>Alias:</Label>
        <Input />
        <div className="flex gap-2 justify-end items-center mt-6">
          <Checkbox /> <Label>Prefer Alias</Label>
        </div>
        <Label>Bio:</Label>
        <Textarea className="h-[300px] resize-none" />
        <Label>Gender:</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="others">Others</SelectItem>
          </SelectContent>
        </Select>
        {/* <Label>Gender:</Label> */}
      </div>
    </main>
  );
}
