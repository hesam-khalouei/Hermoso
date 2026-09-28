"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, X } from "lucide-react";

interface ImageFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ImageField({ value, onChange, label }: ImageFieldProps) {
  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative group">
          <div className="rounded-lg border-2 border-dashed overflow-hidden bg-secondary/50">
            <img
              src={value}
              alt="پیش‌نمایش"
              className="w-full h-32 object-contain p-2"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 left-2 size-7 rounded-lg bg-destructive text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition"
            title="حذف"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <div className="rounded-lg border-2 border-dashed p-6 text-center bg-secondary/30">
          <ImageIcon className="size-8 text-muted-foreground mx-auto mb-2" />
          <div className="text-xs text-muted-foreground mb-3">
            آدرس تصویر رو وارد کن (فعلاً فقط URL)
          </div>
        </div>
      )}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/image.png"
        dir="ltr"
        className="text-left text-xs font-mono"
      />
    </div>
  );
}