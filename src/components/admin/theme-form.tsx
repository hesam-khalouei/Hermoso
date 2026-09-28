"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "./color-picker";
import { FontPicker } from "./font-picker";
import { ThemePreview } from "./theme-preview";
import { Save, ArrowRight } from "lucide-react";
import Link from "next/link";

const presetThemes = [
  {
    name: "اوانو (فیروزه‌ای)",
    colors: {
      primary: "#14B8A6",
      secondary: "#FB923C",
      accent: "#06B6D4",
      text: "#18181B",
      textMuted: "#71717A",
      background: "#FFFFFF",
      border: "#E4E4E7",
    },
  },
  {
    name: "آبی کلاسیک",
    colors: {
      primary: "#2563EB",
      secondary: "#F59E0B",
      accent: "#06B6D4",
      text: "#0F172A",
      textMuted: "#64748B",
      background: "#FFFFFF",
      border: "#E2E8F0",
    },
  },
  {
    name: "بنفش مدرن",
    colors: {
      primary: "#7C3AED",
      secondary: "#EC4899",
      accent: "#06B6D4",
      text: "#1E1B4B",
      textMuted: "#6B7280",
      background: "#FFFFFF",
      border: "#E5E7EB",
    },
  },
  {
    name: "سبز طبیعی",
    colors: {
      primary: "#059669",
      secondary: "#F59E0B",
      accent: "#10B981",
      text: "#064E3B",
      textMuted: "#6B7280",
      background: "#FFFFFF",
      border: "#D1FAE5",
    },
  },
];

interface ThemeFormProps {
  initialData?: {
    id: string;
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textMuted: string;
    background: string;
    border: string;
    fontFamily: string;
    radius: string;
  };
}

export function ThemeForm({ initialData }: ThemeFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [name, setName] = useState(initialData?.name || "");
  const [primary, setPrimary] = useState(initialData?.primary || "#14B8A6");
  const [secondary, setSecondary] = useState(initialData?.secondary || "#FB923C");
  const [accent, setAccent] = useState(initialData?.accent || "#06B6D4");
  const [text, setText] = useState(initialData?.text || "#18181B");
  const [textMuted, setTextMuted] = useState(initialData?.textMuted || "#71717A");
  const [background, setBackground] = useState(initialData?.background || "#FFFFFF");
  const [border, setBorder] = useState(initialData?.border || "#E4E4E7");
  const [fontFamily, setFontFamily] = useState(initialData?.fontFamily || "IRANYekanX");
  const [radius, setRadius] = useState(initialData?.radius || "16px");
  const [saving, setSaving] = useState(false);

  function applyPreset(preset: (typeof presetThemes)[0]) {
    setPrimary(preset.colors.primary);
    setSecondary(preset.colors.secondary);
    setAccent(preset.colors.accent);
    setText(preset.colors.text);
    setTextMuted(preset.colors.textMuted);
    setBackground(preset.colors.background);
    setBorder(preset.colors.border);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("نام تم رو وارد کن");
      return;
    }

    setSaving(true);

    const payload = {
      name,
      primary,
      secondary,
      accent,
      text,
      textMuted,
      background,
      border,
      fontFamily,
      radius,
    };

    const url = isEdit ? `/api/themes/${initialData!.id}` : "/api/themes";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(isEdit ? "تم ویرایش شد" : "تم ساخته شد");
      router.push("/themes");
      router.refresh();
    } else {
      const data = await res.json();
      toast.error(data.error || "خطا در ذخیره");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl">
      {/* برو برگرد */}
      <Link
        href="/themes"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowRight className="size-4" />
        بازگشت به تم‌ها
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* ستون چپ: فرم */}
        <div className="space-y-6">
          {/* نام تم */}
          <div className="bg-white rounded-2xl border p-6 space-y-4">
            <h3 className="font-semibold">اطلاعات پایه</h3>
            <div className="space-y-2">
              <Label htmlFor="name">نام تم *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثلاً: کمپین تابستان ۱۴۰۴"
                required
              />
            </div>
          </div>

          {/* تم‌های آماده */}
          <div className="bg-white rounded-2xl border p-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-1">تم‌های آماده</h3>
              <p className="text-xs text-muted-foreground">
                یه تم آماده انتخاب کن، بعد رنگ‌ها رو دلخواه تغییر بده
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {presetThemes.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="p-3 rounded-xl border hover:border-primary transition text-right"
                >
                  <div className="flex gap-1 mb-2">
                    <div
                      className="size-6 rounded"
                      style={{ backgroundColor: preset.colors.primary }}
                    />
                    <div
                      className="size-6 rounded"
                      style={{ backgroundColor: preset.colors.secondary }}
                    />
                    <div
                      className="size-6 rounded"
                      style={{ backgroundColor: preset.colors.accent }}
                    />
                  </div>
                  <div className="text-xs font-medium">{preset.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* رنگ‌ها */}
          <div className="bg-white rounded-2xl border p-6 space-y-4">
            <h3 className="font-semibold">رنگ‌ها</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ColorPicker
                label="رنگ اصلی"
                value={primary}
                onChange={setPrimary}
              />
              <ColorPicker
                label="رنگ ثانویه"
                value={secondary}
                onChange={setSecondary}
              />
              <ColorPicker
                label="رنگ تاکیدی"
                value={accent}
                onChange={setAccent}
              />
              <ColorPicker
                label="رنگ پس‌زمینه"
                value={background}
                onChange={setBackground}
              />
              <ColorPicker
                label="رنگ متن"
                value={text}
                onChange={setText}
              />
              <ColorPicker
                label="رنگ متن کم‌رنگ"
                value={textMuted}
                onChange={setTextMuted}
              />
              <ColorPicker
                label="رنگ حاشیه"
                value={border}
                onChange={setBorder}
              />
            </div>
          </div>

          {/* فونت */}
          <div className="bg-white rounded-2xl border p-6 space-y-4">
            <h3 className="font-semibold">فونت</h3>
            <FontPicker value={fontFamily} onChange={setFontFamily} />
          </div>

          {/* شکل */}
          <div className="bg-white rounded-2xl border p-6 space-y-4">
            <h3 className="font-semibold">شعاع گوشه‌ها</h3>
            <div className="flex gap-2 flex-wrap">
              {["0px", "4px", "8px", "12px", "16px", "24px", "999px"].map(
                (r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRadius(r)}
                    className={`px-4 py-2 rounded-lg border text-sm transition ${
                      radius === r
                        ? "border-primary bg-primary/5 text-primary"
                        : "hover:border-muted-foreground/50"
                    }`}
                  >
                    {r === "999px" ? "دایره" : r}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* ستون راست: پیش‌نمایش */}
        <div className="lg:sticky lg:top-24 self-start space-y-4">
          <div className="bg-white rounded-2xl border p-6">
            <h3 className="font-semibold mb-4">پیش‌نمایش زنده</h3>
            <ThemePreview
              colors={{
                primary,
                secondary,
                text,
                textMuted,
                background,
                border,
              }}
              fontFamily={fontFamily}
              radius={radius}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 gap-2"
            disabled={saving}
          >
            <Save className="size-4" />
            {saving
              ? "در حال ذخیره..."
              : isEdit
              ? "ذخیره تغییرات"
              : "ساخت تم"}
          </Button>
        </div>
      </div>
    </form>
  );
}