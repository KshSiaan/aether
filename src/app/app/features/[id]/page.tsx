import Block_list from "./block-list";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const waiter = await params;
  const { id } = waiter;
  console.log(id);

  return (
    <div className="grid grid-cols-4 gap-6 h-full w-full items-start">
      <Block_list />
    </div>
  );
}
