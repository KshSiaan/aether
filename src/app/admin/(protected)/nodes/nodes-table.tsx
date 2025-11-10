"use client";
import { deleteNodeApi, getNodesApi } from "@/lib/api/node";
import { idk } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon, Loader2Icon, Trash2Icon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export default function NodesTable() {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const { data, isPending }: idk = useQuery({
    queryKey: ["nodes"],
    queryFn: getNodesApi,
  });
  const { mutate } = useMutation({
    mutationKey: ["deleteNode"],
    mutationFn: (id: string | number) => {
      return deleteNodeApi({ id, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({ queryKey: ["nodes"] });
      toast.success(res.message ?? "Successfully deleted node");
    },
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
          (x: {
            id: string | number;
            name: string;
            description: string;
            childs: string[];
          }) => (
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      className="text-destructive"
                    >
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delet this node?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Raven, you sure you wanna do this?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Oops, No</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          mutate(x.id);
                        }}
                      >
                        <Trash2Icon />
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
