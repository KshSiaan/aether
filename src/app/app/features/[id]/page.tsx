import { notFound } from "next/navigation";
import Block_list from "./block-list";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const waiter = await params;
  const { id } = waiter;

  if (!id) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-4 gap-6 h-full w-full items-start">
      <Block_list id={id} />
    </div>
  );
}
