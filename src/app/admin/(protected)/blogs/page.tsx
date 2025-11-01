"use client";
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
import { getBlogApi } from "@/lib/api/blog";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import React from "react";
import DOMPurify from "dompurify";
import truncate from "truncate-html"; // 👈 install this with: npm i truncate-html

export default function Page() {
  const { data, isPending }: idk = useQuery({
    queryKey: ["spirits"],
    queryFn: getBlogApi,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-24 mx-auto">
        <Loader2Icon className="animate-spin" />
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
              <TableHead>ID</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Title (first 20 chars)</TableHead>
              <TableHead>Body (first 20 chars)</TableHead>
              <TableHead>Has Explicit words</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.data?.map((x: idk) => {
              // safely truncate body HTML to first 20 visible characters
              const truncatedHTML = truncate(x.body, { length: 20 });
              const safeHTML = DOMPurify.sanitize(truncatedHTML);

              return (
                <TableRow key={x.id}>
                  <TableCell>#{x.id}</TableCell>
                  <TableCell>{x?.user?.name}</TableCell>
                  <TableCell>{x.title.slice(0, 20)}</TableCell>
                  <TableCell
                    dangerouslySetInnerHTML={{
                      __html: safeHTML,
                    }}
                  />
                  <TableCell>No</TableCell>
                  <TableCell className="space-x-2">
                    <Button size="icon" variant="outline">
                      <Trash2Icon className="text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
