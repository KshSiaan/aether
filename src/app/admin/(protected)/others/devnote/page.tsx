"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getDevNoteApi, postDevNoteApi } from "@/lib/api/extra";
import { idk } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Page() {
  const [note, setNote] = useState("");
  const [{ token }] = useCookies(["token"]);
  const { data, isPending }: idk = useQuery({
    queryKey: ["devnote"],
    queryFn: getDevNoteApi,
  });
  const { mutate } = useMutation({
    mutationKey: ["update_devnote"],
    mutationFn: () => {
      return postDevNoteApi({ body: { note }, token });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Updated developer note in homepage!");
    },
  });

  useEffect(() => {
    if (!isPending) {
      console.log(data);

      setNote(data?.data?.note);
    }
  }, [isPending]);

  return (
    <main className="w-full space-y-6">
      <Textarea
        className="min-h-[300px]"
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
        }}
        placeholder="Dev note.."
      />
      <Button disabled={!note?.trim()} onClick={() => mutate()}>
        Update Dev note
      </Button>
    </main>
  );
}
