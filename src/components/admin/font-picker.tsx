"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const fonts = [
  {
    id: "IRANYekanX",
    name: "ایرانیکان ایکس",
    sample: "آب",
    family: "IRANYekanX",
  },
  {
    id: "Vazirmatn",
    name: "وزیرمتن",
    sample: "آب",
    family: "Vazirmatn",
  },
  {
    id: "YekanBakh",
    name: "یکان‌بخ",
    sample: "آب",
    family: "YekanBakh",
  },
];

interface FontPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function FontPicker({ value, onChange }: FontPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {fonts.map((font) => {
        const isSelected = value === font.id;
        return (
          <button
            key={font.id}
            type="button"
            onClick={() => onChange(font.id)}
            className={cn(
              "relative p-4 rounded-xl border-2 transition-all text-right",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/50"
            )}
          >
            {isSelected && (
              <div className="absolute top-2 left-2 size-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="size-3 text-primary-foreground" />
              </div>
            )}
            <div
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: font.family }}
            >
              {font.sample}
            </div>
            <div className="text-xs text-muted-foreground">{font.name}</div>
          </button>
        );
      })}
    </div>
  );
}