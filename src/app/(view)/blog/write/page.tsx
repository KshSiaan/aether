"use client";

import { Editor } from "@/components/blocks/editor-00/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { SerializedEditorState } from "lexical";
import { useMutation } from "@tanstack/react-query";
import { postBlogApi } from "@/lib/api/blog";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { idk } from "@/lib/utils";

const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialValue);
  const [html, setHtml] = useState<string>(""); // ✅ store HTML separately
  const { mutate, isPending } = useMutation({
    mutationKey: ["post_blog"],
    mutationFn: () => {
      return postBlogApi({ token, body: { title, body: html as string } });
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (res: idk) => {
      toast.error(res.message);
      console.log(res);
    },
  });

  return (
    <section className="p-6">
      <h1 className="text-4xl text-center">Create a new blog</h1>

      <div className="mt-6 w-full mx-auto space-y-6">
        <Label>Blog Title</Label>
        <Input
          className="bg-background"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <Label>Blog Content</Label>
        <Editor
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
          onHtmlChange={(htmlString) => setHtml(htmlString)} // ✅ capture HTML here
        />
      </div>

      <div className="flex justify-end items-center mt-6">
        <Button
          onClick={() => {
            mutate();
          }}
          disabled={isPending}
        >
          {isPending ? "Confirming" : "Confirm & Post"}
        </Button>
      </div>
    </section>
  );
}
