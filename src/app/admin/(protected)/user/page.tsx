"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsersApi } from "@/lib/api/user";
import { User } from "@/lib/types/user";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  DeleteIcon,
  Loader2Icon,
  Trash2Icon,
  XCircleIcon,
} from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function Page() {
  const { data, isPending }: idk = useQuery({
    queryKey: ["spirits"],
    queryFn: getUsersApi,
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  return (
    <div className="h-full w-full">
      <div className="w-full py-6">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Field" />
          </SelectTrigger>
        </Select>
      </div>
      <div className="max-h-[60dvh] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>UID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Alias</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Prefer Alias</TableHead>
              <TableHead>Original</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((x: User) => (
              <TableRow key={x.uid}>
                <TableCell>#{x.uid}</TableCell>
                <TableCell>{x.name}</TableCell>
                <TableCell>{x.alias}</TableCell>
                <TableCell>{x.email}</TableCell>
                <TableCell className="">
                  <Badge>{x.role}</Badge>
                </TableCell>
                <TableCell>{x.gender ?? "N/A"}</TableCell>
                <TableCell>
                  {x.prefer_alias ? (
                    <CheckCircle2 className="text-green-600 size-5" />
                  ) : (
                    <XCircleIcon className="text-rose-600 size-5" />
                  )}
                </TableCell>
                <TableCell>
                  {x.original ? (
                    <CheckCircle2 className="text-green-600 size-5" />
                  ) : (
                    <XCircleIcon className="text-rose-600 size-5" />
                  )}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={() => {
                      toast.info("Under Development");
                    }}
                  >
                    <Trash2Icon className="text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
