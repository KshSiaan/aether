"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CopyIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Detail() {
  const data = {
    email: "kshsiaan@gmail.com",
    github: "https://github.com/KshSiaan",
    behance: "https://www.behance.net/kshsiaan",
    Aether: "https://aetherorigin.vercel.app/user?id=1",
  };

  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <div className="w-full">
      <Table className="border">
        <TableBody>
          {Object.entries(data).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-semibold capitalize border-r">
                {key.replace(/_/g, " ")}
              </TableCell>
              <TableCell className="text-muted-foreground break-all">
                {value}
              </TableCell>
              <TableCell className="text-muted-foreground text-right">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={() => handleCopy(value, key)}
                >
                  {copied === key ? (
                    <CheckIcon className="text-green-500" />
                  ) : (
                    <CopyIcon />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
