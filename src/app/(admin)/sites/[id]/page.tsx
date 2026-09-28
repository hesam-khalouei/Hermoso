import { notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Header } from "@/components/admin/header";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Settings,
  ExternalLink,
  Palette,
  Edit,
  Plus,
  ArrowRight,
} from "lucide-react";
import { toPersianDate, toPersianNumber } from "@/lib/utils";

export default async function SiteEditPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session!.userId },
    select: { name: true, email: true, role: true },
  });

  const site = await db.site.findUnique({
    where: { id: params.id },
    include: {
      theme: true,
      pages: {
        orderBy: { createdAt: "asc" },
        include: {
          _count: { select: { blocks: true } },
        },
      },
    },
  });

  if (!site) notFound();

  return (
    <>
      <Header user={user!} title={site.name} />

      <div className="p-6 space-y-6">
        <Link
          href="/sites"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowRight className="size-4" />
          بازگشت به سایت‌ها
        </Link>

        {/* هدر سایت */}
        <div
          className="rounded-2xl p-6 text-white"
          style={{
            background: `linear-gradient(135deg, ${site.theme?.primary || "#6366F1"}, ${site.theme?.accent || "#06B6D4"})`,
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="size-16 rounded-2xl bg-white/90 flex items-center justify-center text-2xl font-bold"
              style={{ color: site.theme?.primary }}
            >
              {site.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{site.name}</h2>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <span dir="ltr">/{site.slug}</span>
                {site.domain && (
                  <>
                    <span>•</span>
                    <span dir="ltr">{site.domain}</span>
                  </>
                )}
                <span>•</span>
                <span>تم: {site.theme?.name}</span>
              </div>
            </div>
            <Link
              href={`/preview/${site.slug}`}
              target="_blank"
              className="bg-white/20 hover:bg-white/30 transition p-3 rounded-xl"
              title="پیش‌نمایش سایت"
            >
              <ExternalLink className="size-5" />
            </Link>
          </div>
        </div>

        {/* کارت‌های اکشن سریع */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href={`/sites/${site.id}/appearance`}
            className="bg-card rounded-2xl border p-5 hover:shadow-md transition group"
          >
            <div className="size-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-3">
              <Palette className="size-6" />
            </div>
            <h3 className="font-semibold mb-1">تنظیمات ظاهری</h3>
            <p className="text-xs text-muted-foreground">
              تغییر لوگو، فاوآیکون، رنگ‌ها
            </p>
          </Link>

          <Link
            href={`/sites/${site.id}/settings`}
            className="bg-card rounded-2xl border p-5 hover:shadow-md transition group"
          >
            <div className="size-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
              <Settings className="size-6" />
            </div>
            <h3 className="font-semibold mb-1">تنظیمات سایت</h3>
            <p className="text-xs text-muted-foreground">
              نام، دامنه، SEO و موارد دیگر
            </p>
          </Link>

          <Link
            href={`/sites/${site.id}/seo`}
            className="bg-card rounded-2xl border p-5 hover:shadow-md transition group"
          >
            <div className="size-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-3">
              <FileText className="size-6" />
            </div>
            <h3 className="font-semibold mb-1">SEO</h3>
            <p className="text-xs text-muted-foreground">
              متا تگ‌ها و بهینه‌سازی
            </p>
          </Link>
        </div>

        {/* لیست صفحات */}
        <div className="bg-card rounded-2xl border">
          <div className="flex items-center justify-between p-5 border-b">
            <div>
              <h3 className="font-semibold">صفحات سایت</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                محتوای هر صفحه رو از اینجا ویرایش کن
              </p>
            </div>
            <Button className="gap-2" size="sm">
              <Plus className="size-4" />
              صفحه جدید
            </Button>
          </div>

          <div className="divide-y">
            {site.pages.map((page) => (
              <Link
                key={page.id}
                href={`/sites/${site.id}/pages/${page.id}`}
                className="flex items-center gap-4 p-5 hover:bg-secondary/50 transition group"
              >
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <FileText className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{page.title}</span>
                    {page.isHome && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        صفحه اصلی
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {toPersianNumber(page._count.blocks)} بلاک • /{page.slug} •
                    ساخته‌شده {toPersianDate(page.createdAt)}
                  </div>
                </div>
                <Edit className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}