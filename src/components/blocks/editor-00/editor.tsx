"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, SerializedEditorState } from "lexical";

import { editorTheme } from "@/components/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ParagraphNode, TextNode } from "lexical";
import dynamic from "next/dynamic";

const Plugins = dynamic(() => import("./plugins").then((m) => m.Plugins), {
  ssr: false,
});
import { ListItemNode, ListNode } from "@lexical/list";
import { EmojiNode } from "@/components/editor/nodes/emoji-node";

// ✨ import HTML generator
import { $generateHtmlFromNodes } from "@lexical/html";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    EmojiNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  onHtmlChange, // <-- new optional prop
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  onHtmlChange?: (html: string) => void; // <-- new prop type
}) {
  return (
    <div className="bg-background overflow-hidden rounded-lg border shadow">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <Plugins />

          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={(editorState, editor) => {
              onChange?.(editorState);
              onSerializedChange?.(editorState.toJSON());

              // ✅ Convert to HTML
              editorState.read(() => {
                const html = $generateHtmlFromNodes(editor);
                onHtmlChange?.(html);
              });
            }}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
