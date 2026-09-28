"use client";

import Link from "next/link";
import { MoreVertical, Edit, Trash2, Palette } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Theme {
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
  isDefault: boolean;
  _count: { sites: number };
}

interface ThemesListProps {
  themes: Theme[];
}

export function ThemesList({ themes }: ThemesListProps) {
  const router = useRouter();

  async function handleDelete(id: string, name: string) {
    if (!confirm(`آیا از حذف تم «${name}» مطمئنی؟`)) return;

    const res = await fetch(`/api/themes/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("تم حذف شد");
      router.refresh();
    } else {
      const data = await res.json();
      toast.error(data.error || "خطا در حذف تم");
    }
  }

  if (themes.length === 0) {
    return (
      <div className="bg-white rounded-2xl border p-16 text-center">
        <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
          <Palette className="size-8" />
        </div>
        <h3 className="text-lg font-semibold mb-2">هنوز تمی نداری</h3>
        <p className="text-muted-foreground mb-6 text-sm">
          اولین تمت رو بساز تا بتونی سایتی روش بسازی
        </p>
        <Link
          href="/themes/new"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
        >
          ساخت اولین تم
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {themes.map((theme) => (
        <div
          key={theme.id}
          className="bg-white rounded-2xl border overflow-hidden hover:shadow-md transition-shadow group"
        >
          {/* پیش‌نمایش رنگ‌ها */}
          <div className="h-32 relative" style={{ backgroundColor: theme.background }}>
            <div className="absolute inset-0 flex items-center justify-center gap-2">
              <div
                className="size-12 rounded-xl shadow-sm"
                style={{ backgroundColor: theme.primary }}
              />
              <div
                className="size-12 rounded-xl shadow-sm"
                style={{ backgroundColor: theme.secondary }}
              />
              <div
                className="size-12 rounded-xl shadow-sm"
                style={{ backgroundColor: theme.accent }}
              />
            </div>
            {theme.isDefault && (
              <div className="absolute top-3 right-3 px-2 py-1 bg-white rounded-lg text-xs font-medium border">
                پیش‌فرض
              </div>
            )}
          </div>

          {/* اطلاعات */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{theme.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {theme.fontFamily} • {theme._count.sites} سایت
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="size-8 rounded-lg hover:bg-secondary flex items-center justify-center transition">
                    <MoreVertical className="size-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/themes/${theme.id}`}
                      className="cursor-pointer gap-2"
                    >
                      <Edit className="size-4" />
                      ویرایش
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer gap-2"
                    onClick={() => handleDelete(theme.id, theme.name)}
                  >
                    <Trash2 className="size-4" />
                    حذف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* رنگ‌های کوچیک */}
            <div className="flex gap-1 mb-3">
              {[
                theme.primary,
                theme.secondary,
                theme.accent,
                theme.text,
                theme.border,
              ].map((c, i) => (
                <div
                  key={i}
                  className="size-5 rounded-md border"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>

            {/* دکمه ویرایش */}
            <Link
              href={`/themes/${theme.id}`}
              className="block w-full text-center bg-secondary hover:bg-secondary/80 text-sm font-medium py-2 rounded-lg transition"
            >
              ویرایش تم
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}