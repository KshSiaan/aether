"use client";
import { getNodesApi } from "@/lib/api/node";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon, Loader2Icon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function NodesTable() {
  const { data, isPending }: idk = useQuery({
    queryKey: ["nodes"],
    queryFn: getNodesApi,
  });
  if (isPending) {
    <div className={`flex justify-center items-center h-24 mx-auto`}>
      <Loader2Icon className={`animate-spin`} />
    </div>;
  }
  return (
    <Table className="border mt-6">
      <TableCaption>List of nodes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Node ID</TableHead>
          <TableHead>Node name</TableHead>
          <TableHead>Active node childs</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.map(
          (x: { name: string; description: string; childs: string[] }) => (
            <TableRow key={x.name}>
              <TableCell>{x.name}</TableCell>
              <TableCell>{x.description}</TableCell>
              <TableCell className="text-muted-foreground">
                {x.childs.length > 0
                  ? x.childs.slice(0, 6).join(",")
                  : "No block is created"}
              </TableCell>
              <TableCell className="space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"outline"} size={"icon"}>
                      <EyeIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Childs of {x.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-6 gap-4">
                      {x.childs.length > 0 ? (
                        x.childs.map((y) => <p key={y}>{y}</p>)
                      ) : (
                        <p className="h-12 w-full flex justify-center items-center text-muted-foreground col-span-6">
                          No child found
                        </p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="text-destructive"
                >
                  <TrashIcon />
                </Button>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
