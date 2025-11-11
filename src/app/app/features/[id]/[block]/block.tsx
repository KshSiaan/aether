"use client";
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
import { LANGUAGES } from "@/lib/dataset";
import React from "react";
import { toast } from "sonner";

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
    author: number;
    private: boolean;
    description: string;
    node: {
      name: string;
      childs: Array<number>;
    };
  };
}) {
  const codeSet = [
    {
      language: code.language,
      filename: `${code.title}${
        LANGUAGES.find((l) => l.value === code.language)?.ext ?? ".txt"
      }`,
      code: code.code,
    },
  ];
  return (
    <main className="h-full w-full flex-1">
      <div className="border-b">
        <h1 className="text-2xl border w-fit p-2 px-6">
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
    </main>
  );
}
