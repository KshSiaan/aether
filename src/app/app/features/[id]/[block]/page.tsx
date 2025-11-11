"use cache";
import { getBlockByIdApi } from "@/lib/api/node";
import { howl } from "@/lib/utils";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Block from "./block";

export default async function Page({
  params,
}: {
  params: Promise<{ block: string }>;
}) {
  const waiter = await params;
  const { block: id } = waiter;

  if (!id) {
    return notFound();
  }
  const code = await getBlockByIdApi({ id });
  return (
    <section className="flex-1 h-full w-full p-4">
      <Block code={code.data} />
    </section>
  );
}
