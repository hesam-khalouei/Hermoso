"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/utils";

interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  fontFamily: string;
}

interface SiteFormProps {
  themes: Theme[];
}

export function SiteForm({ themes }: SiteFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [domain, setDomain] = useState("");
  const [themeId, setThemeId] = useState(themes[0]?.id || "");
  const [saving, setSaving] = useState(false);

  function handleNameChange(value: string) {
    setName(value);
    if (!slug || slug === slugify(name)) {
      setSlug(slugify(value));
    }
  }

  const selectedTheme = themes.find((t) => t.id === themeId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("نام سایت رو وارد کن");
      return;
    }
    if (!slug.trim()) {
      toast.error("آدرس سایت (slug) رو وارد کن");
      return;
    }
    if (!themeId) {
      toast.error("یه تم انتخاب کن");
      return;
    }

    setSaving(true);

    const res = await fetch("/api/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug: slug.toLowerCase(),
        domain: domain.trim() || null,
        themeId,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("سایت ساخته شد");
      router.push(`/sites/${data.id}`);
      router.refresh();
    } else {
      toast.error(data.error || "خطا در ساخت سایت");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <Link
        href="/sites"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowRight className="size-4" />
        بازگشت به سایت‌ها
      </Link>

      <div className="space-y-6">
        {/* اطلاعات پایه */}
        <div className="bg-card rounded-2xl border p-6 space-y-5">
          <div>
            <h3 className="font-semibold mb-1">اطلاعات پایه</h3>
            <p className="text-xs text-muted-foreground">
              اسم سایت و آدرسش رو مشخص کن
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">نام سایت *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="مثلاً: کمپین اعتبار پوشاک"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">آدرس سایت (slug) *</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground shrink-0">/</span>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                placeholder="ewano-credit"
                dir="ltr"
                className="text-left font-mono"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              فقط حروف انگلیسی، عدد و خط تیره
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">دامنه اختصاصی (اختیاری)</Label>
            <Input
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="ewano.example.com"
              dir="ltr"
              className="text-left font-mono"
            />
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <AlertCircle className="size-3" />
              بعداً می‌تونی این رو تنظیم کنی
            </p>
          </div>
        </div>

        {/* انتخاب تم */}
        <div className="bg-card rounded-2xl border p-6 space-y-5">
          <div>
            <h3 className="font-semibold mb-1">انتخاب تم</h3>
            <p className="text-xs text-muted-foreground">
              رنگ‌ها و فونت سایت رو تعیین می‌کنه (بعداً هم قابل تغییره)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">تم *</Label>
            <Select value={themeId} onValueChange={setThemeId}>
              <SelectTrigger>
                <SelectValue placeholder="انتخاب تم" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div
                          className="size-3 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div
                          className="size-3 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        />
                        <div
                          className="size-3 rounded-full"
                          style={{ backgroundColor: theme.accent }}
                        />
                      </div>
                      <span>{theme.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTheme && (
            <div
              className="p-5 rounded-xl border"
              style={{
                backgroundColor: "hsl(var(--secondary))",
                borderColor: selectedTheme.primary,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="size-12 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: selectedTheme.primary }}
                >
                  {name?.charAt(0) || "؟"}
                </div>
                <div>
                  <div className="font-semibold text-sm">
                    {name || "نام سایت"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    فونت: {selectedTheme.fontFamily}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* دکمه */}
        <div className="flex gap-3 justify-end">
          <Link href="/sites">
            <Button type="button" variant="outline">
              انصراف
            </Button>
          </Link>
          <Button type="submit" className="gap-2" disabled={saving}>
            <Save className="size-4" />
            {saving ? "در حال ساخت..." : "ساخت سایت"}
          </Button>
        </div>
      </div>
    </form>
  );
}