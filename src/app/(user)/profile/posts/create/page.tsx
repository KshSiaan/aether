"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { SerializedEditorState } from "lexical";
import { useMutation } from "@tanstack/react-query";
import { postBlogApi } from "@/lib/api/blog";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { idk } from "@/lib/utils";
import { Editor } from "@/components/blocks/editor-00/post-editor";
import { createPostApi } from "@/lib/api/post";
import { useRouter } from "next/navigation";

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
  const navig = useRouter();
  const [{ token }] = useCookies(["token"]);
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialValue);
  const [html, setHtml] = useState<string>(""); // ✅ store HTML separately
  const { mutate, isPending } = useMutation({
    mutationKey: ["create_post"],
    mutationFn: () => {
      return createPostApi({ token, body: html as string });
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (res: idk) => {
      toast.error(res.message);
      console.log(res);
      navig.push("/profile/posts");
    },
  });

  return (
    <section className="p-6 mt-20">
      <h1 className="text-4xl text-center">What's in your mind?</h1>
      <div className="mt-6 w-full mx-auto space-y-6">
        <Editor
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
          onHtmlChange={(htmlString) => setHtml(htmlString)}
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
