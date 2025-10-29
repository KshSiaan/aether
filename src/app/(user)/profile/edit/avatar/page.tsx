"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { meApi, updateProfilePicApi } from "@/lib/api/auth";
import { cn, idk } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCheckIcon,
  CheckIcon,
  Loader2Icon,
  MarsIcon,
  VenusIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Page() {
  const [selectedAv, setSelectedAv] = useState<string | undefined>();
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["me"],
    queryFn: (): idk => {
      return meApi(token);
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["avatar_update"],
    mutationFn: () => {
      return updateProfilePicApi({
        token,
        img: selectedAv ?? "/avatar/default.png",
      });
    },
    onError: (err) => {
      toast.error(err.message ?? "Failed to complete this request");
    },
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successfully updated the avatar!");
      qcl.invalidateQueries({ queryKey: ["me"] });
    },
  });
  useEffect(() => {
    if (!isPending) {
      if (isError) {
        toast.error(error.message ?? "Failed to fetch your avatar");
      } else {
        console.log(data);
        setSelectedAv(data.avatar_url);
      }
    }
  }, [isPending]);

  return (
    <main className="p-6 py-24">
      <section className="w-full flex flex-col gap-6 justify-center items-center">
        <Avatar className="size-[200px] bg-secondary">
          <AvatarImage src={selectedAv} />
          <AvatarFallback>
            {isPending ? <Loader2Icon className="animate-spin" /> : "UI"}
          </AvatarFallback>
        </Avatar>
        {selectedAv && (
          <Button
            disabled={isPending || selectedAv === data.avatar_url}
            onClick={() => {
              if (selectedAv === data.avatar_url) {
                toast.error("This avatar is currently active");
              } else {
                mutate();
              }
            }}
          >
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" /> Loading
              </>
            ) : selectedAv === data.avatar_url ? (
              <>
                Confirmed <CheckCheckIcon />
              </>
            ) : (
              <>
                Confirm <CheckIcon />
              </>
            )}
          </Button>
        )}
      </section>
      <Card className="mt-12">
        <CardHeader className="border-b">
          <CardTitle>Select Avatar</CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="flex justify-center items-center bg-secondary p-2">
            Default
          </h4>
          <div className="w-full grid grid-cols-2 lg:grid-cols-8 gap-6 mt-6">
            <div
              className="aspect-square w-full"
              onClick={() => {
                setSelectedAv(`/avatar/default.png`);
              }}
            >
              <Avatar
                className={cn(
                  `w-full h-full rounded-lg transition-all`,
                  selectedAv !== `/avatar/default.png`
                    ? "bg-background"
                    : "bg-secondary scale-105 shadow-lg border-4"
                )}
              >
                <AvatarImage src={`/avatar/default.png`} />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <h4 className="flex justify-center items-center bg-secondary p-2 mt-6">
            <VenusIcon />
          </h4>

          <div className="w-full grid grid-cols-2 lg:grid-cols-8 gap-6 mt-6">
            {Array(26)
              .fill("")
              .map((_, i) => (
                <div
                  className="aspect-square w-full"
                  onClick={() => {
                    setSelectedAv(`/avatar/girl/avatar(${i + 1}).jpg`);
                  }}
                  key={i}
                >
                  <Avatar
                    className={cn(
                      `w-full h-full rounded-lg transition-all`,
                      selectedAv !== `/avatar/girl/avatar(${i + 1}).jpg`
                        ? "bg-background"
                        : "bg-secondary scale-105 shadow-lg border-4"
                    )}
                  >
                    <AvatarImage src={`/avatar/girl/avatar(${i + 1}).jpg`} />
                    <AvatarFallback>UI</AvatarFallback>
                  </Avatar>
                </div>
              ))}
          </div>
        </CardContent>
        <CardContent>
          <h4 className="flex justify-center items-center bg-secondary p-2">
            <MarsIcon />
          </h4>
          <div className="w-full grid grid-cols-2 lg:grid-cols-8 gap-6 mt-6">
            {Array(22)
              .fill("")
              .map((_, i) => (
                <div
                  className="aspect-square w-full"
                  onClick={() => {
                    setSelectedAv(`/avatar/boy/avatar(${i + 1}).jpg`);
                  }}
                  key={i}
                >
                  <Avatar
                    className={cn(
                      `w-full h-full rounded-lg transition-all`,
                      selectedAv !== `/avatar/boy/avatar(${i + 1}).jpg`
                        ? "bg-background"
                        : "bg-secondary scale-105 shadow-lg border-4!"
                    )}
                  >
                    <AvatarImage src={`/avatar/boy/avatar(${i + 1}).jpg`} />
                    <AvatarFallback>UI</AvatarFallback>
                  </Avatar>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
