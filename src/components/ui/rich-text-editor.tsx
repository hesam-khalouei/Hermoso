"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignRight,
  AlignCenter,
  AlignLeft,
  AlignJustify,
  List,
  ListOrdered,
  Link as LinkIcon,
  Highlighter,
  Undo,
  Redo,
  Palette,
  Type,
  Heading1,
  Heading2,
  Heading3,
  RemoveFormatting,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const fonts = [
  { label: "ایرانیکان", value: "IRANYekanX" },
  { label: "وزیرمتن", value: "Vazirmatn" },
  { label: "یکان‌بخ", value: "YekanBakh" },
];

const presetColors = [
  "#000000", "#18181B", "#374151", "#6B7280", "#9CA3AF",
  "#EF4444", "#F97316", "#F59E0B", "#EAB308", "#84CC16",
  "#22C55E", "#10B981", "#14B8A6", "#06B6D4", "#0EA5E9",
  "#3B82F6", "#6366F1", "#8B5CF6", "#A855F7", "#D946EF",
  "#EC4899", "#F43F5E", "#78350F", "#7C2D12",
];

const fontSizes = [
  { label: "کوچک", value: "14px" },
  { label: "معمولی", value: "16px" },
  { label: "متوسط", value: "18px" },
  { label: "بزرگ", value: "20px" },
  { label: "خیلی بزرگ", value: "24px" },
  { label: "تیتر", value: "32px" },
  { label: "تیتر بزرگ", value: "40px" },
];

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
  dir?: "rtl" | "ltr";
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "اینجا بنویسید...",
  minHeight = 120,
  dir = "rtl",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "right",
      }),
      Color,
      TextStyle,
      Highlight.configure({ multicolor: true }),
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
          "prose prose-sm dark:prose-invert max-w-none",
          "focus:outline-none p-3 min-h-[100px] leading-8 text-foreground",
          dir === "rtl" ? "text-right" : "text-left"
        ),
        dir: dir,
        style: `min-height: ${minHeight}px; direction: ${dir};`,
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
      <div className="rounded-lg border border-input bg-background p-4 text-sm text-muted-foreground">
        در حال بارگذاری ادیتور...
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-input bg-background overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-secondary/50 border-b">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
          title="تیتر ۱"
        >
          <Heading1 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          title="تیتر ۲"
        >
          <Heading2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
          title="تیتر ۳"
        >
          <Heading3 className="size-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="ضخیم"
        >
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="مورب"
        >
          <Italic className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="زیرخط"
        >
          <UnderlineIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="خط‌خورده"
        >
          <Strikethrough className="size-4" />
        </ToolbarButton>

        <Divider />

        <FontSizeSelect editor={editor} />
        <FontFamilySelect editor={editor} />

        <Divider />

        <ColorPicker
          editor={editor}
          icon={<Palette className="size-4" />}
          title="رنگ متن"
          colors={presetColors}
          onPick={(color) => editor.chain().focus().setColor(color).run()}
          isActive={!!editor.getAttributes("textStyle").color}
        />
        <ColorPicker
          editor={editor}
          icon={<Highlighter className="size-4" />}
          title="پس‌زمینه"
          colors={["#FEF08A", "#FBCFE8", "#BFDBFE", "#BBF7D0", "#FED7AA"]}
          onPick={(color) =>
            editor.chain().focus().toggleHighlight({ color }).run()
          }
          onClear={() => editor.chain().focus().unsetHighlight().run()}
          isActive={editor.isActive("highlight")}
        />

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          title="راست‌چین"
        >
          <AlignRight className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          title="وسط‌چین"
        >
          <AlignCenter className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          title="چپ‌چین"
        >
          <AlignLeft className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editor.isActive({ textAlign: "justify" })}
          title="هم‌تراز"
        >
          <AlignJustify className="size-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="لیست نقطه‌ای"
        >
          <List className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="لیست شماره‌دار"
        >
          <ListOrdered className="size-4" />
        </ToolbarButton>

        <Divider />

        <LinkButton editor={editor} />

        <Divider />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="واگرد"
        >
          <Undo className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="ازنو"
        >
          <Redo className="size-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          title="پاک کردن فرمت"
        >
          <RemoveFormatting className="size-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

// ═══════ کامپوننت‌ها ═══════

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
        "size-8 rounded-md flex items-center justify-center transition-colors",
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

function Divider() {
  return <div className="w-px h-6 bg-border mx-1" />;
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
        className="size-8 rounded-md flex items-center justify-center hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
      >
        <Type className="size-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 right-0 z-50 w-40 rounded-lg border bg-popover shadow-lg p-1 space-y-0.5">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                type="button"
                onClick={() => applySize(size.value)}
                className="w-full text-right px-3 py-1.5 rounded-md text-sm hover:bg-secondary transition"
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
        className="h-8 px-2 rounded-md flex items-center gap-1 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-xs"
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
                className="w-full text-right px-3 py-1.5 rounded-md text-sm hover:bg-secondary transition"
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
          "size-8 rounded-md flex items-center justify-center transition-colors",
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
          <div className="absolute top-full mt-1 right-0 z-50 w-64 rounded-lg border bg-popover shadow-lg p-3 space-y-3">
            <div className="grid grid-cols-8 gap-1.5">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    onPick(color);
                    setOpen(false);
                  }}
                  className="size-6 rounded-md border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t">
              <label className="text-xs text-muted-foreground">
                کد رنگ دلخواه (hex)
              </label>
              <div className="flex gap-2">
                <Input
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  placeholder="#000000"
                  dir="ltr"
                  className="font-mono text-xs h-9"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    onPick(customColor);
                    setOpen(false);
                  }}
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
                className="w-full text-right px-3 py-1.5 rounded-md text-xs hover:bg-secondary transition text-muted-foreground"
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

function LinkButton({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (open) {
      const prev = editor.getAttributes("link").href || "";
      setUrl(prev);
    }
  }, [open, editor]);

  function applyLink() {
    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        title="لینک"
        className={cn(
          "size-8 rounded-md flex items-center justify-center transition-colors",
          editor.isActive("link")
            ? "bg-primary text-primary-foreground"
            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
        )}
      >
        <LinkIcon className="size-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 right-0 z-50 w-72 rounded-lg border bg-popover shadow-lg p-3 space-y-2">
            <label className="text-xs text-muted-foreground">آدرس لینک</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              dir="ltr"
              className="font-mono text-xs h-9"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyLink();
                }
              }}
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                onClick={applyLink}
                className="flex-1"
              >
                اعمال
              </Button>
              {editor.isActive("link") && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    editor.chain().focus().unsetLink().run();
                    setOpen(false);
                  }}
                >
                  حذف
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}