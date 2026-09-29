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
import { SizeField } from "./size-field";
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
import { DraggableRepeater } from "./draggable-repeater";

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
  // ═══════ text ═══════
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

  // ═══════ textarea ═══════
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

  // ═══════ richtext ═══════
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

  // ═══════ size ═══════
  if (field.type === "size") {
    return (
      <SizeField
        label={field.label}
        value={value}
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
      <div
        className="flex items-center justify-between p-3 bg-secondary rounded-lg"
        dir="rtl"
      >
        <Label className="cursor-pointer text-right flex-1">
          {field.label}
        </Label>
        <div className="shrink-0">
          <Switch checked={!!value} onCheckedChange={onChange} />
        </div>
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
      <DraggableRepeater
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

