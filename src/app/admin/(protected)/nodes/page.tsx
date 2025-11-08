import { Button } from "@/components/ui/button";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateNode from "./create-node";

export default function Page() {
  return (
    <main className="w-full">
      <div className="flex justify-end items-center">
        <CreateNode />
      </div>
      <Table>
        <TableCaption>List of nodes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Node ID</TableHead>
            <TableHead>Node name</TableHead>
            <TableHead>Active node childs</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </main>
  );
}
