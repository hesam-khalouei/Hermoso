"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="size-10 rounded-lg border cursor-pointer appearance-none bg-transparent p-0 overflow-hidden"
            style={{ backgroundColor: value }}
          />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir="ltr"
          className="font-mono text-xs h-10"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}