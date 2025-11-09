import CreateNode from "./create-node";
import NodesTable from "./nodes-table";

export default function Page() {
  return (
    <main className="w-full">
      <div className="flex justify-end items-center">
        <CreateNode />
      </div>
      <NodesTable />
    </main>
  );
}
