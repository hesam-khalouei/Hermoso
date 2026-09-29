"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageField } from "./image-field";
import { IconPicker } from "./icon-picker";
import { ColorPicker } from "./color-picker";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { RichTextEditorCompact } from "@/components/ui/rich-text-editor-compact";
import type { BlockField } from "@/blocks/registry";
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

interface FieldRendererProps {
  field: BlockField;
  value: any;
  onChange: (value: any) => void;
  siteId?: string;
}

export function FieldRenderer({
  field,
  value,
  onChange,
  siteId,
}: FieldRendererProps) {
  // ═══════ text (ادیتور Compact) ═══════
  if (field.type === "text") {
    return (
      <div className="space-y-2">
        <Label>
          {field.label}
          {field.required && <span className="text-destructive mr-1">*</span>}
        </Label>
        <RichTextEditorCompact
          value={value || ""}
          onChange={onChange}
          placeholder={field.placeholder || "اینجا بنویسید..."}
        />
      </div>
    );
  }

  // ═══════ textarea (ادیتور Full) ═══════
  if (field.type === "textarea") {
    return (
      <div className="space-y-2">
        <Label>
          {field.label}
          {field.required && <span className="text-destructive mr-1">*</span>}
        </Label>
        <RichTextEditor
          value={value || ""}
          onChange={onChange}
          placeholder={field.placeholder || "اینجا بنویسید..."}
          minHeight={100}
        />
      </div>
    );
  }

  // ═══════ richtext (ادیتور Full با ارتفاع بیشتر) ═══════
  if (field.type === "richtext") {
    return (
      <div className="space-y-2">
        <Label>
          {field.label}
          {field.required && <span className="text-destructive mr-1">*</span>}
        </Label>
        <RichTextEditor
          value={value || ""}
          onChange={onChange}
          placeholder={field.placeholder || "اینجا بنویسید..."}
          minHeight={150}
        />
      </div>
    );
  }

  // ═══════ number ═══════
  if (field.type === "number") {
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <Input
          type="number"
          value={value ?? ""}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder={field.placeholder}
        />
      </div>
    );
  }

  // ═══════ url ═══════
  if (field.type === "url") {
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <Input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          dir="ltr"
          className="text-left font-mono text-xs"
        />
      </div>
    );
  }

  // ═══════ image ═══════
  if (field.type === "image") {
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <ImageField value={value || ""} onChange={onChange} siteId={siteId} />
      </div>
    );
  }

  // ═══════ color ═══════
  if (field.type === "color") {
    return (
      <ColorPicker
        label={field.label}
        value={value || "#000000"}
        onChange={onChange}
      />
    );
  }

  // ═══════ icon ═══════
  if (field.type === "icon") {
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <IconPicker value={value || ""} onChange={onChange} />
      </div>
    );
  }

  // ═══════ toggle ═══════
  if (field.type === "toggle") {
    return (
      <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
        <Label className="cursor-pointer">{field.label}</Label>
        <Switch checked={!!value} onCheckedChange={onChange} />
      </div>
    );
  }

  // ═══════ select ═══════
  if (field.type === "select") {
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <Select value={value || ""} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  // ═══════ group ═══════
  if (field.type === "group") {
    const groupValue = value || {};
    return (
      <div className="space-y-3 p-4 border rounded-xl bg-secondary/40">
        <Label className="font-semibold text-sm">{field.label}</Label>
        {field.fields?.map((subField) => (
          <FieldRenderer
            key={subField.key}
            field={subField}
            value={groupValue[subField.key]}
            onChange={(val) => onChange({ ...groupValue, [subField.key]: val })}
            siteId={siteId}
          />
        ))}
      </div>
    );
  }

  // ═══════ repeater ═══════
  if (field.type === "repeater") {
    return (
      <RepeaterField
        field={field}
        value={value || []}
        onChange={onChange}
        siteId={siteId}
      />
    );
  }

  return (
    <div className="p-3 bg-destructive/10 text-destructive text-xs rounded-lg">
      نوع فیلد ناشناخته: {field.type}
    </div>
  );
}

// ═══════ Repeater ═══════
interface RepeaterFieldProps {
  field: BlockField;
  value: any[];
  onChange: (value: any[]) => void;
  siteId?: string;
}

function RepeaterField({
  field,
  value,
  onChange,
  siteId,
}: RepeaterFieldProps) {
  const [openItems, setOpenItems] = useState<number[]>([0]);

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

  function moveItem(index: number, direction: "up" | "down") {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= value.length) return;
    const newValue = [...value];
    [newValue[index], newValue[newIndex]] = [
      newValue[newIndex],
      newValue[index],
    ];
    onChange(newValue);
  }

  const canAdd = !field.max || value.length < field.max;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-semibold">{field.label}</Label>
        <span className="text-xs text-muted-foreground">
          {value.length} آیتم
        </span>
      </div>

      <div className="space-y-2">
        {value.map((item, index) => {
          const isOpen = openItems.includes(index);
          const title =
            item.title || item.name || item.label || `آیتم ${index + 1}`;
          const cleanTitle = String(title).replace(/<[^>]*>/g, "").trim();

          return (
            <div
              key={index}
              className="border rounded-xl overflow-hidden bg-card"
            >
              <div className="flex items-center gap-2 p-3 bg-secondary">
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="size-6 rounded flex items-center justify-center hover:bg-card"
                >
                  {isOpen ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                </button>
                <GripVertical className="size-4 text-muted-foreground" />
                <div className="flex-1 text-sm font-medium text-foreground truncate">
                  {cleanTitle || `آیتم ${index + 1}`}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                    className="size-6 rounded flex items-center justify-center hover:bg-card disabled:opacity-30"
                  >
                    <ChevronUp className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, "down")}
                    disabled={index === value.length - 1}
                    className="size-6 rounded flex items-center justify-center hover:bg-card disabled:opacity-30"
                  >
                    <ChevronDown className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="size-6 rounded flex items-center justify-center hover:bg-destructive/10 text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="p-3 space-y-3 bg-card">
                  {field.fields?.map((subField) => (
                    <FieldRenderer
                      key={subField.key}
                      field={subField}
                      value={item[subField.key]}
                      onChange={(val) => updateItem(index, subField.key, val)}
                      siteId={siteId}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

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