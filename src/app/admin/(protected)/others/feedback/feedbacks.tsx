"use client";
import { getFeedbacksApi } from "@/lib/api/extra";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { useCookies } from "react-cookie";

export default function Feedbacks() {
  const [{ token }] = useCookies(["token"]);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: (): idk => {
      return getFeedbacksApi({ token });
    },
  });
  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }
  if (isError) {
    <div className={`flex justify-center items-center h-24 mx-auto`}>
      {error.message}
    </div>;
  }
  return data?.data?.map(
    (x: {
      id: number;
      user_id: any;
      name: string;
      email: string;
      feedback: string;
      created_at: string;
    }) => (
      <div className="py-6 border" key={x.id}>
        <div className="border-b px-6 pb-6 w-full flex justify-between items-center">
          <h4>
            {x?.name}{" "}
            <span className="text-muted-foreground">({x?.email})</span>
          </h4>
          {x.user_id && <div>User ID : #{x.user_id}</div>}
        </div>
        <div className="p-6 text-sm text-muted-foreground">{x?.feedback}</div>
      </div>
    )
  );
}
