"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SortableItem({ id, children, className }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(className, isDragging && "shadow-2xl")}
      {...attributes}
    >
      {/* آیکن درگ - جدا */}
      <div {...listeners} className="cursor-grab active:cursor-grabbing">
        {/* children داخلش قرار نمی‌گیره، فقط برای listener */}
      </div>
      {children}
    </div>
  );
}

// نسخه‌ای که خودش آیکن درگ رو رندر می‌کنه
interface SortableItemWithHandleProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  handleClassName?: string;
}

export function SortableItemWithHandle({
  id,
  children,
  className,
  handleClassName,
}: SortableItemWithHandleProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(className, isDragging && "shadow-2xl")}
      {...attributes}
    >
      {/* آیکن درگ - قابل کشیدن */}
      <button
        type="button"
        {...listeners}
        className={cn(
          "cursor-grab active:cursor-grabbing touch-none",
          handleClassName
        )}
        title="جابجایی"
      >
        <GripVertical className="size-4 text-muted-foreground" />
      </button>
      {children}
    </div>
  );
}