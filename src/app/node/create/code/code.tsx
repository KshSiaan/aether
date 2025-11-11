"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Editor from "@monaco-editor/react";
import { Copy, Check, Code2, FileText, Settings, Share2 } from "lucide-react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn, idk } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LANGUAGES } from "@/lib/dataset";

export default function Code() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Welcome to the code editor");
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("default");
  const { resolvedTheme } = useTheme();
  const navig = useRouter();

  useEffect(() => {
    const codeSet = localStorage.getItem("codeset");
    if (codeSet) {
      const extractedCodeset: {
        title: string;
        language: string;
        code: idk;
        node: number;
      } = JSON.parse(codeSet);
      setFileName(extractedCodeset.title);
      setLanguage(extractedCodeset.language);
      setCode(extractedCodeset.code);
    }
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const selectedLang = LANGUAGES.find((l) => l.value === language);
    const ext = selectedLang?.ext || ".txt";
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      `data:text/plain;charset=utf-8,${encodeURIComponent(code)}`
    );
    element.setAttribute("download", `${fileName}${ext}`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const lineCount = code.split("\n").length;
  const charCount = code.length;

  return (
    <div className="flex-1 w-full grid grid-cols-12 gap-0 overflow-hidden">
      <div className="col-span-9 flex flex-col bg-secondary/20 border-r border-border overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/50 backdrop-blur-sm">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {fileName}
          </span>
          <span className="text-xs text-muted-foreground ml-auto">
            {lineCount} lines •{" "}
            <span className={cn(charCount > 10000 && "text-destructive")}>
              {charCount} chars
            </span>
          </span>
        </div>

        <div className="flex-1 overflow-hidden">
          <Editor
            theme={resolvedTheme === "light" ? "light" : "vs-dark"}
            height="100%"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              fontFamily: "'Geist Mono', monospace",
              lineHeight: 1.6,
              padding: { top: 16, bottom: 16 },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              automaticLayout: true,
            }}
          />
        </div>
      </div>

      <div className="col-span-3 flex flex-col h-full bg-background border-l border-border overflow-hidden">
        {/* top section with controls */}
        <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto">
          {/* Language Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              <label className="text-sm font-semibold text-foreground">
                Language
              </label>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full bg-secondary/50 border-secondary">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-border/50" />

          {/* File Name */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">
              Block Name
            </Label>
            <Input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name"
            />
          </div>

          <Separator className="bg-border/50" />

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Share2 className="w-4 h-4 text-primary" />
              Actions
            </h4>
            <div className="space-y-2">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="w-full justify-start gap-2 bg-secondary/50 hover:bg-secondary/70 border-secondary"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </>
                )}
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="w-full justify-start gap-2 bg-secondary/50 hover:bg-secondary/70 border-secondary"
              >
                <FileText className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border bg-background/50 backdrop-blur-sm">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-md transition-all"
            size="lg"
            onClick={() => {
              if (charCount > 10000) {
                toast.error(
                  "Your code must be under 10000 characters to submit"
                );
                return;
              }

              try {
                const nodeAmm = localStorage.getItem("selectedNode");
                const prevCodeset = localStorage.getItem("codeset");

                let nodeData: Record<string, any> | null = null;
                if (nodeAmm) {
                  try {
                    nodeData = JSON.parse(nodeAmm);
                  } catch {
                    console.warn("Invalid selectedNode JSON, resetting it");
                    localStorage.removeItem("selectedNode");
                  }
                }

                let oldCodeset: Record<string, any> = {};
                if (prevCodeset) {
                  try {
                    oldCodeset = JSON.parse(prevCodeset);
                  } catch {
                    console.warn("Invalid previous codeset JSON, ignoring it");
                  }
                }

                const codeset = {
                  ...oldCodeset,
                  title: fileName,
                  language,
                  code,
                  ...(nodeData ?? oldCodeset.node ?? {}),
                };

                if (nodeData) {
                  localStorage.removeItem("selectedNode");
                }

                localStorage.setItem("codeset", JSON.stringify(codeset));
              } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
                localStorage.removeItem("codeset");
                return;
              }

              navig.push("code/finalize");
            }}
          >
            Finalize
          </Button>
        </div>
      </div>
    </div>
  );
}
