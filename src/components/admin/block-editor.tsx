"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BLOCK_LIST } from "@/blocks/registry";
import { BlockRenderer } from "@/blocks/BlockRenderer";
import { Button } from "@/components/ui/button";
import { BlockSettingsDialog } from "./block-settings-dialog";
import {
  Plus,
  GripVertical,
  Eye,
  EyeOff,
  Trash2,
  ChevronDown,
  ChevronUp,
  Settings2,
} from "lucide-react";

interface Block {
  id: string;
  blockType: string;
  variant: string;
  content: Record<string, any>;
  isVisible: boolean;
  orderIndex: number;
}

interface BlockEditorProps {
  siteId: string;
  pageId: string;
  pageTitle: string;
  theme: any;
  initialBlocks: Block[];
}

export function BlockEditor({
  siteId,
  pageId,
  pageTitle,
  theme,
  initialBlocks,
}: BlockEditorProps) {
  const router = useRouter();
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);

  async function addBlock(blockCode: string) {
    const definition = BLOCK_LIST.find((b) => b.code === blockCode);
    if (!definition) return;

    try {
      const res = await fetch(`/api/pages/${pageId}/blocks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blockType: blockCode,
          variant: definition.defaultVariant,
          content: definition.defaultContent,
          orderIndex: blocks.length,
        }),
      });

      const newBlock = await res.json();

      if (!res.ok) {
        toast.error(newBlock.error || "خطا در افزودن بلاک");
        return;
      }

      setBlocks([...blocks, newBlock]);
      setShowAddPanel(false);
      toast.success(`بلاک «${definition.label}» اضافه شد`);
    } catch (error) {
      toast.error("خطا در افزودن بلاک");
    }
  }

  async function deleteBlock(id: string) {
    if (!confirm("این بلاک حذف شود؟")) return;

    const res = await fetch(`/api/pages/${pageId}/blocks/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setBlocks(blocks.filter((b) => b.id !== id));
      toast.success("بلاک حذف شد");
    } else {
      toast.error("خطا در حذف");
    }
  }

  async function moveBlock(id: string, direction: "up" | "down") {
    const index = blocks.findIndex((b) => b.id === id);
    if (index === -1) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[newIndex]] = [
      newBlocks[newIndex],
      newBlocks[index],
    ];

    newBlocks.forEach((b, i) => (b.orderIndex = i));
    setBlocks(newBlocks);

    await fetch(`/api/pages/${pageId}/blocks/reorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order: newBlocks.map((b) => ({ id: b.id, orderIndex: b.orderIndex })),
      }),
    });
  }

  async function toggleVisible(id: string) {
    const block = blocks.find((b) => b.id === id);
    if (!block) return;

    const newVisible = !block.isVisible;
    setBlocks(
      blocks.map((b) => (b.id === id ? { ...b, isVisible: newVisible } : b))
    );

    await fetch(`/api/pages/${pageId}/blocks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVisible: newVisible }),
    });
  }

  function handleBlockSave(updated: Block) {
    setBlocks(blocks.map((b) => (b.id === updated.id ? updated : b)));
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
        {/* ستون راست: لیست بلاک‌ها */}
        <div className="space-y-3">
          <div className="bg-card rounded-2xl border">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">بلاک‌ها</h3>
                <span className="text-xs text-muted-foreground">
                  {blocks.length} بلاک
                </span>
              </div>
            </div>

            <div className="p-3 space-y-2 max-h-[600px] overflow-y-auto">
              {blocks.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  هنوز بلاکی اضافه نکردی.
                  <br />
                  روی «افزودن بلاک» بزن
                </div>
              ) : (
                blocks.map((block, index) => {
                  const def = BLOCK_LIST.find(
                    (b) => b.code === block.blockType
                  );
                  return (
                    <div
                      key={block.id}
                      className={`p-3 rounded-xl border-2 transition ${
                        block.isVisible
                          ? "border-border bg-card"
                          : "border-dashed border-muted-foreground/30 bg-muted/30 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="size-4 text-muted-foreground shrink-0" />
                        <button
                          onClick={() => setEditingBlock(block)}
                          className="flex-1 min-w-0 text-right hover:opacity-80"
                        >
                          <div className="font-medium text-sm truncate">
                            {def?.label || block.blockType}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            طرح: {block.variant}
                          </div>
                        </button>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setEditingBlock(block)}
                            className="size-7 rounded flex items-center justify-center hover:bg-primary/10 text-primary"
                            title="ویرایش محتوا"
                          >
                            <Settings2 className="size-3.5" />
                          </button>
                          <button
                            onClick={() => moveBlock(block.id, "up")}
                            disabled={index === 0}
                            className="size-7 rounded flex items-center justify-center hover:bg-secondary disabled:opacity-30"
                          >
                            <ChevronUp className="size-3.5" />
                          </button>
                          <button
                            onClick={() => moveBlock(block.id, "down")}
                            disabled={index === blocks.length - 1}
                            className="size-7 rounded flex items-center justify-center hover:bg-secondary disabled:opacity-30"
                          >
                            <ChevronDown className="size-3.5" />
                          </button>
                          <button
                            onClick={() => toggleVisible(block.id)}
                            className="size-7 rounded flex items-center justify-center hover:bg-secondary"
                          >
                            {block.isVisible ? (
                              <Eye className="size-3.5" />
                            ) : (
                              <EyeOff className="size-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => deleteBlock(block.id)}
                            className="size-7 rounded flex items-center justify-center hover:bg-destructive/10 text-destructive"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-3 border-t">
              <Button
                onClick={() => setShowAddPanel(!showAddPanel)}
                className="w-full gap-2"
                variant={showAddPanel ? "outline" : "default"}
              >
                <Plus className="size-4" />
                {showAddPanel ? "بستن" : "افزودن بلاک"}
              </Button>
            </div>
          </div>

          {showAddPanel && (
            <div className="bg-card rounded-2xl border p-4 space-y-2 max-h-[500px] overflow-y-auto">
              <div className="text-xs font-semibold text-muted-foreground mb-2">
                انتخاب بلاک
              </div>
              {BLOCK_LIST.map((block) => (
                <button
                  key={block.code}
                  onClick={() => addBlock(block.code)}
                  className="w-full text-right p-3 rounded-xl border hover:border-primary hover:bg-primary/5 transition"
                >
                  <div className="font-medium text-sm">{block.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {block.description}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">
                    {block.variants.length} واریانت
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ستون چپ: پیش‌نمایش */}
        <div className="space-y-3">
          <div className="bg-card rounded-2xl border p-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-red-400" />
                <div className="size-2.5 rounded-full bg-yellow-400" />
                <div className="size-2.5 rounded-full bg-green-400" />
              </div>
              <div
                className="flex-1 text-center text-xs text-muted-foreground"
                dir="ltr"
              >
                preview.hermoso.local / {pageTitle}
              </div>
            </div>

            <div
              className="rounded-xl overflow-hidden border bg-white"
              style={{
                ["--site-primary" as any]: theme?.primary || "#6366F1",
                ["--site-secondary" as any]: theme?.secondary || "#F59E0B",
                ["--site-accent" as any]: theme?.accent || "#06B6D4",
                ["--site-text" as any]: theme?.text || "#18181B",
                ["--site-text-muted" as any]: theme?.textMuted || "#71717A",
                ["--site-bg" as any]: theme?.background || "#FFFFFF",
                ["--site-border" as any]: theme?.border || "#E4E4E7",
                ["--site-radius" as any]: theme?.radius || "16px",
                ["--site-font" as any]: theme?.fontFamily || "IRANYekanX",
              }}
            >
              <div className="bg-white min-h-[600px] space-y-4">
                {blocks.filter((b) => b.isVisible).length === 0 ? (
                  <div className="flex items-center justify-center h-[400px] text-muted-foreground text-sm">
                    هنوز محتوایی برای نمایش نیست
                  </div>
                ) : (
                  blocks
                    .filter((b) => b.isVisible)
                    .map((block) => (
                      <BlockRenderer
                        key={block.id}
                        blockType={block.blockType}
                        variant={block.variant}
                        content={block.content}
                      />
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BlockSettingsDialog
        block={editingBlock}
        open={!!editingBlock}
        onClose={() => setEditingBlock(null)}
        onSave={handleBlockSave}
        pageId={pageId}
        siteId={siteId}
      />
    </>
  );
}