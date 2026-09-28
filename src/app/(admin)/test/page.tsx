"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

export default function TestPage() {
  const [value, setValue] = useState("");

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">تست ادیتور</h1>
      <RichTextEditor value={value} onChange={setValue} />
      <div className="mt-4 p-4 bg-secondary rounded-lg">
        <div className="text-xs text-muted-foreground mb-2">HTML خروجی:</div>
        <pre className="text-xs font-mono whitespace-pre-wrap" dir="ltr">
          {value || "(خالی)"}
        </pre>
      </div>
    </div>
  );
}