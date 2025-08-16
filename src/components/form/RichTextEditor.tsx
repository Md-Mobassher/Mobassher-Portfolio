"use client";
import dynamic from "next/dynamic";
import React, { useMemo, useRef } from "react";

// Dynamically import JoditEditor to avoid SSR issues
const JoditEditor = dynamic(
  () => import("jodit-react").then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-32 bg-gray-100 rounded animate-pulse flex items-center justify-center">
        Loading editor...
      </div>
    ),
  }
);

type RichTextEditorProps = {
  placeholder?: string;
  value?: string;
  onChange?: (content: string) => void;
  config?: object;
  tabIndex?: number;
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  placeholder = "Start typing...",
  value = "",
  onChange,
  tabIndex = 1,
  config: customConfig = {},
}) => {
  const editor = useRef<any>(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder,
      sourceEditor: "area",
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_clear_html" as any,
      ...customConfig,
    }),
    [placeholder, customConfig]
  );

  const handleBlur = (newContent: string) => {
    if (onChange) {
      onChange(newContent);
    }
  };

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onBlur={(newContent) => handleBlur(newContent as string)}
      onChange={(newContent) => {}}
    />
  );
};

export default RichTextEditor;
