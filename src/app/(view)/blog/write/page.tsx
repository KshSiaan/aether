"use client";
import { Editor } from "@/components/blocks/editor-00/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { log } from "console";
import { SerializedEditorState } from "lexical";
import React, { useState } from "react";
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
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialValue);
  return (
    <section className="p-6">
      <h1 className="text-4xl text-center">Create a new blog</h1>
      <div className="mt-6 w-full mx-auto space-y-6">
        <Label>Blog Title</Label>
        <Input className="bg-background!" />
        <Label>Blog Content</Label>
        <Editor
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
        />
      </div>
      <div className="flex justify-end items-center mt-6">
        <Button
          onClick={() => {
            console.log(editorState.root);
          }}
        >
          Confirm & Post
        </Button>
      </div>
    </section>
  );
}
