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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FieldRenderer } from "@/components/admin/field-renderer";
import { getBlock } from "@/blocks/registry";
import { Save, Layout, Check } from "lucide-react";

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
  siteId: string;
}

export function BlockSettingsDialog({
  block,
  open,
  onClose,
  onSave,
  pageId,
  siteId,
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

  const selectedVariant = definition.variants.find((v) => v.code === variant);

  async function handleSave() {
    setSaving(true);
    const res = await fetch(`/api/pages/${pageId}/blocks/${block!.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, variant }),
    });

    if (res.ok) {
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

        <Tabs
          defaultValue="content"
          className="flex-1 overflow-hidden flex flex-col"
        >
          <TabsList className="self-start">
            <TabsTrigger value="content">محتوا</TabsTrigger>
            <TabsTrigger value="variant">طرح نمایش</TabsTrigger>
          </TabsList>

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
                siteId={siteId}
              />
            ))}
          </TabsContent>

          {/* ═══ تب طرح نمایش — به صورت Dropdown ═══ */}
          <TabsContent
            value="variant"
            className="flex-1 overflow-y-auto mt-4 pr-1"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 justify-end">
                <Label className="font-semibold">انتخاب طرح نمایش</Label>
                <Layout className="size-4 text-primary" />
              </div>

              {/* Dropdown واریانت‌ها */}
              <Select value={variant} onValueChange={setVariant}>
                <SelectTrigger className="h-12 text-right">
                  <SelectValue placeholder="یه طرح انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {definition.variants.map((v) => (
                    <SelectItem key={v.code} value={v.code}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{v.label}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {v.code}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* توضیحات واریانت انتخاب‌شده */}
              {selectedVariant?.description && (
                <div className="p-4 rounded-xl bg-secondary/40 border border-border">
                  <div className="text-xs text-muted-foreground mb-1">
                    درباره این طرح:
                  </div>
                  <div className="text-sm">{selectedVariant.description}</div>
                </div>
              )}

              {/* پیش‌نمایش کوچیک همه واریانت‌ها */}
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground text-right">
                  همه طرح‌های موجود:
                </div>
                <div className="space-y-1">
                  {definition.variants.map((v) => (
                    <button
                      key={v.code}
                      type="button"
                      onClick={() => setVariant(v.code)}
                      className={`w-full text-right p-3 rounded-lg border transition flex items-center justify-between gap-2 ${
                        variant === v.code
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{v.label}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {v.code}
                        </span>
                      </div>
                      {variant === v.code && (
                        <Check className="size-4 text-primary shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
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