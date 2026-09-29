"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FieldRenderer } from "./field-renderer";
import type { BlockField } from "@/blocks/registry";
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface DraggableRepeaterProps {
  field: BlockField;
  value: any[];
  onChange: (value: any[]) => void;
  siteId?: string;
}

export function DraggableRepeater({
  field,
  value,
  onChange,
  siteId,
}: DraggableRepeaterProps) {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  // sensors برای drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px حرکت، بعد drag فعال میشه
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // آیتم‌ها رو با id موقت می‌کنیم (چون dnd-kit نیاز داره)
  const itemsWithIds = value.map((item, index) => ({
    ...item,
    _dragId: `item-${index}`,
    _index: index,
  }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = itemsWithIds.findIndex((i) => i._dragId === active.id);
    const newIndex = itemsWithIds.findIndex((i) => i._dragId === over.id);

    const newValue = arrayMove(value, oldIndex, newIndex);
    onChange(newValue);
  }

  function toggleItem(index: number) {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }

  function addItem() {
    const newItem: Record<string, any> = {};
    field.fields?.forEach((f) => {
      newItem[f.key] =
        f.type === "toggle" ? false : f.type === "number" ? 0 : "";
    });
    onChange([...value, newItem]);
    setOpenItems((prev) => [...prev, value.length]);
  }

  function updateItem(index: number, key: string, val: any) {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], [key]: val };
    onChange(newValue);
  }

  function removeItem(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  const canAdd = !field.max || value.length < field.max;

  return (
    <div className="space-y-3" dir="rtl">
      {/* هدر */}
      <div className="flex items-center justify-between gap-3">
        <Label className="font-semibold text-right">{field.label}</Label>
        <span className="text-xs text-muted-foreground shrink-0">
          {value.length} آیتم
        </span>
      </div>

      {/* لیست با Drag & Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={itemsWithIds.map((i) => i._dragId)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {itemsWithIds.map((item, index) => (
              <SortableRepeaterItem
                key={item._dragId}
                dragId={item._dragId}
                index={index}
                isOpen={openItems.includes(index)}
                onToggle={() => toggleItem(index)}
                onRemove={() => removeItem(index)}
                item={item}
              >
                {/* محتوای آیتم */}
                {field.fields?.map((subField) => (
                  <FieldRenderer
                    key={subField.key}
                    field={subField}
                    value={item[subField.key]}
                    onChange={(val) => updateItem(index, subField.key, val)}
                    siteId={siteId}
                  />
                ))}
              </SortableRepeaterItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {canAdd && (
        <Button
          type="button"
          onClick={addItem}
          variant="outline"
          className="w-full gap-2"
          size="sm"
        >
          <Plus className="size-4" />
          افزودن {field.label}
        </Button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// آیتم قابل درگ
// ═══════════════════════════════════════
interface SortableRepeaterItemProps {
  dragId: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  onRemove: () => void;
  item: any;
  children: React.ReactNode;
}

function SortableRepeaterItem({
  dragId,
  index,
  isOpen,
  onToggle,
  onRemove,
  item,
  children,
}: SortableRepeaterItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: dragId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 100 : "auto",
  };

  const title = item.title || item.name || item.label || `آیتم ${index + 1}`;
  const cleanTitle = String(title).replace(/<[^>]*>/g, "").trim();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border rounded-xl overflow-hidden bg-card ${
        isDragging ? "shadow-2xl ring-2 ring-primary" : ""
      }`}
      dir="rtl"
    >
            {/* هدر آیتم */}
      <div className="flex items-center gap-2 p-3 bg-secondary">
        {/* آیکن درگ - راست، قبل از عنوان */}
        <button
          type="button"
          {...listeners}
          {...attributes}
          className="size-6 rounded flex items-center justify-center hover:bg-card cursor-grab active:cursor-grabbing touch-none shrink-0"
          title="برای جابجایی بکشید"
        >
          <GripVertical className="size-4 text-muted-foreground" />
        </button>

        {/* عنوان - کنار آیکن */}
        <div className="flex-1 text-sm font-medium text-foreground truncate text-right">
          {cleanTitle || `آیتم ${index + 1}`}
        </div>

        {/* دکمه‌های عملیات - چپ */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onRemove}
            className="size-6 rounded flex items-center justify-center hover:bg-destructive/10 text-destructive"
            title="حذف"
          >
            <Trash2 className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={onToggle}
            className="size-6 rounded flex items-center justify-center hover:bg-card"
            title={isOpen ? "بستن" : "باز کردن"}
          >
            {isOpen ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* محتوای آیتم */}
      {isOpen && <div className="p-3 space-y-3 bg-card">{children}</div>}
    </div>
  );
}