"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ruler } from "lucide-react";
import { cn } from "@/lib/utils";

export type SizeUnit = "px" | "rem" | "%" | "vw";

interface SizeFieldProps {
  label: string;
  value: {
    custom?: number;
    unit?: SizeUnit;
  } | null | undefined;
  onChange: (value: any) => void;
  defaultUnit?: SizeUnit;
  min?: number;
  max?: number;
  helpText?: string;
}

export function SizeField({
  label,
  value,
  onChange,
  defaultUnit = "px",
  min = 0,
  max = 2000,
  helpText,
}: SizeFieldProps) {
  const currentCustom = value?.custom;
  const currentUnit = value?.unit || defaultUnit;

  function updateCustom(num: number) {
    onChange({
      custom: num,
      unit: currentUnit,
    });
  }

  function updateUnit(unit: SizeUnit) {
    onChange({
      custom: currentCustom,
      unit,
    });
  }

  return (
    <div className="space-y-2" dir="rtl" style={{ direction: "rtl" }}>
      {/* هدر - با inline style */}
        <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          direction: "rtl",
        }}
      >
        <Ruler className="size-4 text-primary" style={{ flexShrink: 0 }} />
        <Label className="font-medium">{label}</Label>
      </div>

      {/* input + واحد */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          direction: "rtl",
        }}
      >
        {/* input عددی - راست */}
        <Input
          type="number"
          value={currentCustom ?? ""}
          onChange={(e) => updateCustom(Number(e.target.value))}
          placeholder="مثلاً 200"
          min={min}
          max={max}
          dir="ltr"
          className="text-left font-mono text-sm h-9 placeholder:text-right"
          style={{ flex: 1 }}
        />

        {/* واحدها - چپ */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            flexShrink: 0,
          }}
        >
          {(["px", "rem", "%", "vw"] as SizeUnit[]).map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => updateUnit(unit)}
              className={cn(
                "px-2.5 h-9 rounded-md text-xs font-mono border transition-colors",
                currentUnit === unit
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:bg-secondary text-muted-foreground"
              )}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>

      {helpText && (
        <p
          className="text-[10px] text-muted-foreground"
          style={{ textAlign: "right", direction: "rtl" }}
        >
          {helpText}
        </p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// تابع کمکی
// ═══════════════════════════════════════
export function sizeToCss(
  value: any,
  fallback: string = "auto"
): string {
  if (!value) return fallback;

  const num = value.custom;
  const unit = value.unit || "px";

  if (!num || num === 0) return fallback;

  return `${num}${unit}`;
}