"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  MoreVertical,
  Edit,
  Trash2,
  Globe,
  ExternalLink,
  FileText,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toPersianDate } from "@/lib/utils";

interface Site {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  logo: string | null;
  isActive: boolean;
  createdAt: Date;
  theme: {
    id: string;
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    fontFamily: string;
  } | null;
  _count: { pages: number };
}

interface SitesListProps {
  sites: Site[];
  hasThemes: boolean;
}

export function SitesList({ sites, hasThemes }: SitesListProps) {
  const router = useRouter();

  async function handleDelete(id: string, name: string) {
    if (!confirm(`آیا از حذف سایت «${name}» مطمئنی؟\n\nهمه صفحات و محتواش پاک میشه!`))
      return;

    const res = await fetch(`/api/sites/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("سایت حذف شد");
      router.refresh();
    } else {
      const data = await res.json();
      toast.error(data.error || "خطا در حذف سایت");
    }
  }

  // حالت اول: هنوز تمی نساخته
  if (!hasThemes) {
    return (
      <div className="bg-white rounded-2xl border p-16 text-center">
        <div className="size-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4">
          <Globe className="size-8" />
        </div>
        <h3 className="text-lg font-semibold mb-2">اول باید یه تم بسازی</h3>
        <p className="text-muted-foreground mb-6 text-sm">
          هر سایت به یک تم (رنگ + فونت) نیاز داره
        </p>
        <Link
          href="/themes/new"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
        >
          ساخت تم جدید
        </Link>
      </div>
    );
  }

  // حالت دوم: تم داره ولی سایتی نساخته
  if (sites.length === 0) {
    return (
      <div className="bg-white rounded-2xl border p-16 text-center">
        <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
          <Globe className="size-8" />
        </div>
        <h3 className="text-lg font-semibold mb-2">هنوز سایتی نداری</h3>
        <p className="text-muted-foreground mb-6 text-sm">
          اولین سایتت رو بساز و شروع کن به ساخت لندینگ
        </p>
        <Link
          href="/sites/new"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
        >
          ساخت اولین سایت
        </Link>
      </div>
    );
  }

  // حالت سوم: لیست سایت‌ها
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sites.map((site) => (
        <div
          key={site.id}
          className="bg-white rounded-2xl border overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* پیش‌نمایش بالا */}
          <div
            className="h-32 relative flex items-center justify-center"
            style={{
              background: site.theme
                ? `linear-gradient(135deg, ${site.theme.primary}, ${site.theme.accent})`
                : "#e5e7eb",
            }}
          >
            {site.logo ? (
              <img
                src={site.logo}
                alt={site.name}
                className="h-12 object-contain bg-white/90 rounded-lg px-3 py-1"
              />
            ) : (
              <div className="size-14 rounded-2xl bg-white/90 flex items-center justify-center">
                <span className="text-2xl font-bold" style={{ color: site.theme?.primary }}>
                  {site.name.charAt(0)}
                </span>
              </div>
            )}

            {/* بج وضعیت */}
            <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-xs font-medium border">
              {site.isActive ? (
                <span className="flex items-center gap-1 text-green-700">
                  <span className="size-1.5 rounded-full bg-green-500" />
                  فعال
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-500">
                  <span className="size-1.5 rounded-full bg-gray-400" />
                  غیرفعال
                </span>
              )}
            </div>
          </div>

          {/* اطلاعات */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{site.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 truncate" dir="ltr">
                  {site.domain || `/${site.slug}`}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="size-8 rounded-lg hover:bg-secondary flex items-center justify-center transition shrink-0">
                    <MoreVertical className="size-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/sites/${site.id}`}
                      className="cursor-pointer gap-2"
                    >
                      <Edit className="size-4" />
                      ویرایش محتوا
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/preview/${site.slug}`}
                      target="_blank"
                      className="cursor-pointer gap-2"
                    >
                      <Eye className="size-4" />
                      پیش‌نمایش
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer gap-2"
                    onClick={() => handleDelete(site.id, site.name)}
                  >
                    <Trash2 className="size-4" />
                    حذف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* متادیتا */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <FileText className="size-3.5" />
                {site._count.pages} صفحه
              </span>
              {site.theme && (
                <span className="flex items-center gap-1 truncate">
                  <div
                    className="size-3 rounded-full border"
                    style={{ backgroundColor: site.theme.primary }}
                  />
                  {site.theme.name}
                </span>
              )}
            </div>

            {/* دکمه‌ها */}
            <div className="flex gap-2">
              <Link
                href={`/sites/${site.id}`}
                className="flex-1 text-center bg-primary text-primary-foreground text-sm font-medium py-2 rounded-lg hover:bg-primary/90 transition"
              >
                ویرایش
              </Link>
              <Link
                href={`/preview/${site.slug}`}
                target="_blank"
                className="flex items-center justify-center size-9 border rounded-lg hover:bg-secondary transition"
                title="پیش‌نمایش"
              >
                <ExternalLink className="size-4" />
              </Link>
            </div>

            {/* تاریخ */}
            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground text-center">
              ساخته‌شده در {toPersianDate(site.createdAt)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}