"use client";

import { Separator } from "@/components/ui/separator";
import {
  BundledLanguage,
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/ui/shadcn-io/code-block";
import { getCategoriesApi } from "@/lib/api/node";
import { LANGUAGES } from "@/lib/dataset";
import { User } from "@/lib/types/user";
import { idk } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Block({
  code,
}: {
  code: {
    id: number;
    title: string;
    language: string;
    code: string;
    node_id: number;
    categories: Array<number>;
    created_at: string;
    author: User;
    private: boolean;
    description: string;
    node: {
      name: string;
      childs: Array<number>;
    };
  };
}) {
  const { data: cats } = useQuery({
    queryKey: ["cats", code.node_id],
    queryFn: (): idk => {
      return getCategoriesApi({ node: code.node_id });
    },
  });
  const navig = useRouter();
  const codeSet = [
    {
      language: code.language,
      filename: `${code.title}${
        LANGUAGES.find((l) => l.value === code.language)?.ext ?? ".txt"
      }`,
      code: code.code,
    },
  ];
  const lineCount = code.code.split("\n").length;
  return (
    <main className="h-full w-full flex-1">
      <div className="border-b pb-2 flex items-center justify-between">
        <Button
          variant={"ghost"}
          onClick={() => {
            navig.back();
          }}
        >
          <ArrowLeft />
          Go back
        </Button>
        <h1 className="text-lg text-end">
          {code.title}
          {LANGUAGES.find((l) => l.value === code.language)?.ext ?? ".txt"}
        </h1>
      </div>
      <div className="mt-6">
        <CodeBlock data={codeSet} defaultValue={codeSet[0].language}>
          <CodeBlockHeader>
            <CodeBlockFiles>
              {(item) => (
                <CodeBlockFilename key={item.language} value={item.language}>
                  {item.filename}
                </CodeBlockFilename>
              )}
            </CodeBlockFiles>
            <CodeBlockCopyButton
              onCopy={() => toast.info(`${code.title} is copied!`)}
              onError={() => console.error("Failed to copy code to clipboard")}
            />
          </CodeBlockHeader>
          <CodeBlockBody>
            {(item) => (
              <CodeBlockItem key={item.language} value={item.language}>
                <CodeBlockContent
                  themes={{
                    light: `vitesse-light`,
                    dark: `min-dark`,
                  }}
                  language={item.language as BundledLanguage}
                >
                  {item.code}
                </CodeBlockContent>
              </CodeBlockItem>
            )}
          </CodeBlockBody>
        </CodeBlock>
      </div>
      <Table className="mt-4 text-center ">
        <TableBody>
          <TableRow className="bg-background!">
            <TableCell className="text-center">
              <div className="text-sm text-muted-foreground">Author</div>
              <div className="mt-1">
                <Badge className="group" asChild>
                  <Link href={`/user?id=${code.author.uid}`}>
                    {code.author.prefer_alias
                      ? code.author.alias
                      : code.author.name}
                  </Link>
                </Badge>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <div className="text-sm text-muted-foreground">Node</div>
              <div className="mt-1">
                <Badge variant="secondary">{code.node.name}</Badge>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <div className="text-sm text-muted-foreground">Lines</div>
              <div className="mt-1">{lineCount}</div>
            </TableCell>
            <TableCell className="text-center">
              <div className="text-sm text-muted-foreground">This block is</div>
              <div className="mt-1">
                <Badge variant="outline">
                  {code.private ? "Private" : "Public"}
                </Badge>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Separator className="my-6" />
      <p className="text-muted-foreground mb-6 text-sm">{code.description}</p>
      <div className="text-sm flex flex-wrap items-center gap-2">
        <span className="font-medium text-muted-foreground mr-1">
          Categories:
        </span>
        {code.categories.map((catId: number) => {
          const cat = cats?.data?.find((c: any) => c.id === catId);
          return cat ? (
            <Badge
              key={cat.id}
              className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {cat.name}
            </Badge>
          ) : null;
        })}
      </div>
    </main>
  );
}
