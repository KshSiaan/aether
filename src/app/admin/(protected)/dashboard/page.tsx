import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteIcon, EyeIcon } from "lucide-react";
import React from "react";

export default async function Page() {
  return (
    <div className="h-full w-full grid grid-cols-3 gap-6">
      <div className="w-full h-full bg-accent rounded-lg grid grid-cols-3 gap-1 p-1">
        <div className="w-full h-full rounded-lg bg-background flex flex-col justify-center items-center gap-2">
          <h4 className="text-xs">Application</h4>
          <p>23</p>
        </div>
        <div className="w-full h-full rounded-lg bg-background flex flex-col justify-center items-center gap-2">
          <h4 className="text-xs">Back-end Nodes</h4>
          <p>23</p>
        </div>
        <div className="w-full h-full rounded-lg bg-background flex flex-col justify-center items-center gap-2">
          <h4 className="text-xs">Front-end Nodes</h4>
          <p>23</p>
        </div>
        <div className="w-full h-full rounded-lg bg-background flex flex-col justify-center items-center gap-2">
          <h4 className="text-xs">External Blocks</h4>
          <p>23</p>
        </div>
        <div className="w-full h-full rounded-lg bg-background flex flex-col justify-center items-center gap-2">
          <h4 className="text-xs">...</h4>
          <p>23</p>
        </div>
      </div>
      <Card className="w-full h-full col-span-2 bg-accent rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Most Contributors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>UID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Alias</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Siaan</TableCell>
                <TableCell>Raven</TableCell>
                <TableCell>kshsiaan@gmail.com</TableCell>
                <TableCell className="space-x-2">
                  <Button size={"icon"}>
                    <EyeIcon />
                  </Button>
                  <Button size={"icon"} variant={"outline"}>
                    <DeleteIcon className="text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="w-full h-full col-span-2 bg-accent rounded-lg">
        <CardHeader className="border-b">
          <CardTitle>Most Beloved Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>By</TableHead>
                <TableHead>Heart Count</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Raven</TableCell>
                <TableCell>45</TableCell>
                <TableCell>25-12-2025</TableCell>
                <TableCell className="space-x-2">
                  <Button size={"icon"}>
                    <EyeIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="w-full h-full bg-accent rounded-lg grid grid-cols-3 gap-1 p-1">
        {/* <div className="w-full h-full rounded-lg bg-background flex flex-col justify-center items-center gap-2">
          <h4 className="text-xs">Front end Nodes</h4>
          <p>23</p>
        </div>
        <div className="w-full h-full rounded-lg bg-background flex flex-col justify-center items-center gap-2">
          <h4 className="text-xs">Front end Nodes</h4>
          <p>23</p>
        </div>
        <div className="w-full h-full rounded-lg bg-background flex flex-col justify-center items-center gap-2">
          <h4 className="text-xs">Front end Nodes</h4>
          <p>23</p>
        </div>
        <div className="w-full h-full rounded-lg bg-background flex flex-col justify-center items-center gap-2">
          <h4 className="text-xs">Front end Nodes</h4>
          <p>23</p>
        </div>
        <div className="w-full h-full rounded-lg bg-background flex flex-col justify-center items-center gap-2">
          <h4 className="text-xs">Front end Nodes</h4>
          <p>23</p>
        </div> */}
        <div className="col-span-3 w-full flex justify-center items-center text-xs">
          Need to think..
        </div>
      </div>
    </div>
  );
}
