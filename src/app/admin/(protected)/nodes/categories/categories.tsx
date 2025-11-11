"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCategoryApi,
  deleteNodeApi,
  getCategoriesApi,
} from "@/lib/api/node";
import { Loader2Icon, Trash2Icon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
export default function Categories() {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["cats"],
    queryFn: () => {
      return getCategoriesApi({});
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["deleteNode"],
    mutationFn: (id: string | number) => {
      return deleteCategoryApi({ id, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({ queryKey: ["cats"] });
      toast.success(res.message ?? "Successfully deleted node");
    },
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>#ID</TableHead>
          <TableHead>Category Title</TableHead>
          <TableHead>Category of</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data?.map((x) => (
          <TableRow key={x.id}>
            <TableCell>{x.id}</TableCell>
            <TableCell>{x.name}</TableCell>
            <TableCell>{x.node.name}</TableCell>
            <TableCell>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="text-destructive"
                  >
                    <Trash2Icon />
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
        ))}
      </TableBody>
    </Table>
  );
}
