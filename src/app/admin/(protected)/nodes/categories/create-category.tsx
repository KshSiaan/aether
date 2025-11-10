"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { idk } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCategoryApi, getNodesApi } from "@/lib/api/node";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCookies } from "react-cookie";

export default function CreateCategory() {
  const [{ token }] = useCookies(["token"]);
  const [title, setTitle] = useState("");
  const [node, setNode] = useState<string>("");
  const qcl = useQueryClient();
  const { data, isPending }: idk = useQuery({
    queryKey: ["nodes"],
    queryFn: getNodesApi,
  });
  const { mutate, isPending: creating } = useMutation({
    mutationKey: ["create_cat"],
    mutationFn: () => {
      return createCategoryApi({ name: title, node, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      qcl.invalidateQueries({ queryKey: ["cats"] });
      toast.success(res.message ?? "Successfully created category");
    },
  });
  return (
    <div className="h-16 border-t w-full flex justify-between items-center gap-4">
      <Input
        placeholder="Create Category"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Select value={node} onValueChange={(e) => setNode(e)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Node" />
        </SelectTrigger>
        <SelectContent>
          {!isPending &&
            data?.data?.map((x: idk) => (
              <SelectItem value={x.id} key={x.id}>
                {x.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Button
        disabled={creating}
        onClick={() => {
          mutate();
        }}
      >
        {creating ? "Doing magic..!" : "Create Category"}
      </Button>
    </div>
  );
}
