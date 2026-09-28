"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FieldRenderer } from "./field-renderer";
import { getBlock } from "@/blocks/registry";
import { cn } from "@/lib/utils";
import { Save, Check } from "lucide-react";

interface Block {
  id: string;
  blockType: string;
  variant: string;
  content: Record<string, any>;
  isVisible: boolean;
  orderIndex: number;
}

interface BlockSettingsDialogProps {
  block: Block | null;
  open: boolean;
  onClose: () => void;
  onSave: (updatedBlock: Block) => void;
  pageId: string;
}

export function BlockSettingsDialog({
  block,
  open,
  onClose,
  onSave,
  pageId,
}: BlockSettingsDialogProps) {
  const [content, setContent] = useState<Record<string, any>>({});
  const [variant, setVariant] = useState("v1");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (block) {
      setContent(block.content || {});
      setVariant(block.variant);
    }
  }, [block]);

  if (!block) return null;

  const definition = getBlock(block.blockType);
  if (!definition) return null;

  async function handleSave() {
    setSaving(true);
    const res = await fetch(`/api/pages/${pageId}/blocks/${block!.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, variant }),
    });

    if (res.ok) {
      const updated = await res.json();
      toast.success("بلاک ذخیره شد");
      onSave({
        ...block!,
        content,
        variant,
      });
      onClose();
    } else {
      toast.error("خطا در ذخیره");
    }
    setSaving(false);
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>ویرایش: {definition.label}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="variant" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="self-start">
            <TabsTrigger value="variant">طرح نمایش</TabsTrigger>
            <TabsTrigger value="content">محتوا</TabsTrigger>
          </TabsList>

          {/* ═══ تب انتخاب واریانت ═══ */}
          <TabsContent
            value="variant"
            className="flex-1 overflow-y-auto mt-4 pr-1"
          >
            <div className="grid grid-cols-2 gap-3">
              {definition.variants.map((v) => (
                <button
                  key={v.code}
                  type="button"
                  onClick={() => setVariant(v.code)}
                  className={cn(
                    "relative p-4 rounded-xl border-2 text-right transition-all",
                    variant === v.code
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  {variant === v.code && (
                    <div className="absolute top-2 left-2 size-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="size-3 text-primary-foreground" />
                    </div>
                  )}
                  <div className="font-medium mb-1">{v.label}</div>
                  {v.description && (
                    <div className="text-xs text-muted-foreground">
                      {v.description}
                    </div>
                  )}
                  <div className="mt-2 text-[10px] text-muted-foreground font-mono">
                    {v.code}
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* ═══ تب محتوا ═══ */}
          <TabsContent
            value="content"
            className="flex-1 overflow-y-auto mt-4 pr-1 space-y-4"
          >
            {definition.fields.map((field) => (
              <FieldRenderer
                key={field.key}
                field={field}
                value={content[field.key]}
                onChange={(val) =>
                  setContent((prev) => ({ ...prev, [field.key]: val }))
                }
              />
            ))}
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 justify-start pt-4 border-t">
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            <Save className="size-4" />
            {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </Button>
          <Button variant="outline" onClick={onClose}>
            انصراف
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}