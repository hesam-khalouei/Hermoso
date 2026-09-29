"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Palette,
  Type,
  RemoveFormatting,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ═══════════════════════════════════════
// رنگ‌های پیشنهادی
// ═══════════════════════════════════════
const presetColors = [
  "#000000", "#18181B", "#374151", "#6B7280", "#9CA3AF",
  "#EF4444", "#F97316", "#F59E0B", "#EAB308", "#84CC16",
  "#22C55E", "#10B981", "#14B8A6", "#06B6D4", "#0EA5E9",
  "#3B82F6", "#6366F1", "#8B5CF6", "#A855F7", "#D946EF",
  "#EC4899", "#F43F5E",
];

// ═══════════════════════════════════════
// اندازه‌های فونت
// ═══════════════════════════════════════
const fontSizes = [
  { label: "کوچک", value: "13px" },
  { label: "معمولی", value: "15px" },
  { label: "متوسط", value: "17px" },
  { label: "بزرگ", value: "20px" },
  { label: "خیلی بزرگ", value: "24px" },
  { label: "تیتر", value: "32px" },
];

// ═══════════════════════════════════════
// فونت‌ها
// ═══════════════════════════════════════
const fonts = [
  { label: "ایرانیکان", value: "IRANYekanX" },
  { label: "وزیرمتن", value: "Vazirmatn" },
  { label: "یکان‌بخ", value: "YekanBakh" },
];

interface RichTextEditorCompactProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  dir?: "rtl" | "ltr";
}

export function RichTextEditorCompact({
  value,
  onChange,
  placeholder = "اینجا بنویسید...",
}: RichTextEditorCompactProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Underline,
      Color,
      TextStyle,
      FontFamily,
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "focus:outline-none px-3 py-2 text-sm leading-7 text-foreground text-right"
        ),
        dir: "rtl",
        style: "direction: rtl; text-align: right;",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-input bg-background overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-1.5 py-1 bg-secondary/50 border-b">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="ضخیم"
        >
          <Bold className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="مورب"
        >
          <Italic className="size-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="زیرخط"
        >
          <UnderlineIcon className="size-3.5" />
        </ToolbarButton>

        <div className="w-px h-5 bg-border mx-1" />

        <FontSizeSelect editor={editor} />
        <FontFamilySelect editor={editor} />

        <div className="w-px h-5 bg-border mx-1" />

        <ColorPicker
          editor={editor}
          icon={<Palette className="size-3.5" />}
          title="رنگ متن"
          colors={presetColors}
          onPick={(color) => editor.chain().focus().setColor(color).run()}
          isActive={!!editor.getAttributes("textStyle").color}
        />

        <div className="mr-auto" />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          title="پاک کردن فرمت"
        >
          <RemoveFormatting className="size-3.5" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}

// ═══════════════════════════════════════
// کامپوننت‌ها
// ═══════════════════════════════════════

function ToolbarButton({
  children,
  onClick,
  isActive,
  disabled,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "size-7 rounded-md flex items-center justify-center transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-secondary text-muted-foreground hover:text-foreground",
        disabled && "opacity-30 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}

function FontSizeSelect({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);

  function applySize(size: string) {
    editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="اندازه فونت"
        className="size-7 rounded-md flex items-center justify-center hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
      >
        <Type className="size-3.5" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 right-0 z-50 w-36 rounded-lg border bg-popover shadow-lg p-1 space-y-0.5">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                type="button"
                onClick={() => applySize(size.value)}
                className="w-full text-right px-2 py-1 rounded-md text-xs hover:bg-secondary transition"
                style={{ fontSize: size.value }}
              >
                {size.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function FontFamilySelect({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);

  function applyFont(font: string) {
    editor.chain().focus().setFontFamily(font).run();
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="فونت"
        className="h-7 px-1.5 rounded-md flex items-center gap-1 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-[10px]"
      >
        فونت
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 right-0 z-50 w-32 rounded-lg border bg-popover shadow-lg p-1 space-y-0.5">
            {fonts.map((font) => (
              <button
                key={font.value}
                type="button"
                onClick={() => applyFont(font.value)}
                className="w-full text-right px-2 py-1 rounded-md text-xs hover:bg-secondary transition"
                style={{ fontFamily: font.value }}
              >
                {font.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ColorPicker({
  editor,
  icon,
  title,
  colors,
  onPick,
  onClear,
  isActive,
}: {
  editor: Editor;
  icon: React.ReactNode;
  title: string;
  colors: string[];
  onPick: (color: string) => void;
  onClear?: () => void;
  isActive?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [customColor, setCustomColor] = useState("#000000");

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title={title}
        className={cn(
          "size-7 rounded-md flex items-center justify-center transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
        )}
      >
        {icon}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 right-0 z-50 w-56 rounded-lg border bg-popover shadow-lg p-2.5 space-y-2">
            <div className="grid grid-cols-8 gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    onPick(color);
                    setOpen(false);
                  }}
                  className="size-5 rounded-md border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>

            <div className="space-y-1.5 pt-2 border-t">
              <label className="text-[10px] text-muted-foreground">
                کد رنگ (hex)
              </label>
              <div className="flex gap-1.5">
                <Input
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  placeholder="#000000"
                  dir="ltr"
                  className="font-mono text-xs h-8"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    onPick(customColor);
                    setOpen(false);
                  }}
                  className="h-8 px-3 text-xs"
                >
                  اعمال
                </Button>
              </div>
            </div>

            {onClear && (
              <button
                type="button"
                onClick={() => {
                  onClear();
                  setOpen(false);
                }}
                className="w-full text-right px-2 py-1 rounded-md text-[10px] hover:bg-secondary transition text-muted-foreground"
              >
                حذف رنگ
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}