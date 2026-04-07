import { useState } from "react";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading";
import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatBulletedList } from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatCheckList } from "@/components/editor/plugins/toolbar/block-format/format-check-list";
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ActionsPlugin } from "@/components/editor/plugins/actions/actions-plugin";
import { CounterCharacterPlugin } from "@/components/editor/plugins/actions/counter-character-plugin";
import { SpeechToTextPlugin } from "@/components/editor/plugins/actions/speech-to-text-plugin";
import { EmojisPlugin } from "@/components/editor/plugins/emojis-plugin";
import { EmojiPickerPlugin } from "@/components/editor/plugins/emoji-picker-plugin";
import { EditModeTogglePlugin } from "@/components/editor/plugins/actions/edit-mode-toggle-plugin";
export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative">
      {/* toolbar plugins */}
      <ToolbarPlugin>
        {() => (
          <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
            <HistoryToolbarPlugin />
            <ElementFormatToolbarPlugin />
            <FontFormatToolbarPlugin format="bold" />
            <FontFormatToolbarPlugin format="italic" />
            <FontFormatToolbarPlugin format="underline" />
            <FontFormatToolbarPlugin format="strikethrough" />
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatHeading levels={["h1", "h2", "h3"]} />
              <FormatNumberedList />
              <FormatBulletedList />
              <FormatCheckList />
              <FormatQuote />
            </BlockFormatDropDown>
          </div>
        )}
      </ToolbarPlugin>
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable placeholder={"Start typing ..."} />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        {/* editor plugins */}
        <ListPlugin />
        <CheckListPlugin />
        <TabIndentationPlugin />
        <HistoryPlugin />
        <EmojisPlugin />
        <EmojiPickerPlugin />
      </div>
      <ActionsPlugin>
        <div className="clear-both flex items-center justify-between gap-2 overflow-auto border-t p-1">
          <div className="flex flex-1 justify-start">
            {/* left side action buttons */}
            <EditModeTogglePlugin />
          </div>
          <div>
            <CounterCharacterPlugin charset="UTF-16" />
            {/* center action buttons */}
          </div>
          <div className="flex flex-1 justify-end">
            <SpeechToTextPlugin />
          </div>
        </div>
      </ActionsPlugin>
    </div>
  );
}
