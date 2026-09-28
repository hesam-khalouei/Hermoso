import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Header } from "@/components/admin/header";
import {
  Globe,
  MessageSquare,
  Palette,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { toPersianNumber } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session!.userId },
    select: { name: true, email: true, role: true },
  });

  const [sitesCount, themesCount, submissionsCount, unreadCount] =
    await Promise.all([
      db.site.count(),
      db.theme.count(),
      db.submission.count(),
      db.submission.count({ where: { isRead: false } }),
    ]);

  const recentSites = await db.site.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      theme: { select: { name: true, primary: true } },
      _count: { select: { pages: true } },
    },
  });

  const recentSubmissions = await db.submission.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      site: { select: { name: true } },
    },
  });

  const stats = [
    {
      title: "سایت‌ها",
      value: sitesCount,
      icon: Globe,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      href: "/sites",
    },
    {
      title: "تم‌ها",
      value: themesCount,
      icon: Palette,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      href: "/themes",
    },
    {
      title: "پیام‌ها",
      value: submissionsCount,
      icon: MessageSquare,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      href: "/submissions",
    },
    {
      title: "خوانده‌نشده",
      value: unreadCount,
      icon: TrendingUp,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      href: "/submissions",
    },
  ];

  return (
    <>
      <Header user={user!} title="داشبورد" />

      <div className="p-6 space-y-6">
        {/* خوش‌آمد */}
        <div className="bg-gradient-to-l from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 border">
          <h2 className="text-2xl font-bold mb-2">
            خوش آمدی، {user?.name} 👋
          </h2>
          <p className="text-muted-foreground">
            از اینجا می‌تونی سایت‌ها، تم‌ها و محتوای لندینگ‌هات رو مدیریت کنی.
          </p>
        </div>

        {/* کارت‌های آمار */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.title}
                href={stat.href}
                className="bg-card rounded-xl border p-5 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`size-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-3xl font-bold mb-1">
                  {toPersianNumber(stat.value)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.title}
                </div>
              </Link>
            );
          })}
        </div>

        {/* دو ستونه */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* آخرین سایت‌ها */}
          <div className="bg-card rounded-xl border">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="font-semibold">آخرین سایت‌ها</h3>
              <Link
                href="/sites"
                className="text-sm text-primary hover:underline"
              >
                مشاهده همه
              </Link>
            </div>
            <div className="p-2">
              {recentSites.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  هنوز سایتی نساختی
                  <br />
                  <Link
                    href="/sites/new"
                    className="text-primary hover:underline mt-2 inline-block"
                  >
                    ساخت اولین سایت →
                  </Link>
                </div>
              ) : (
                recentSites.map((site) => (
                  <Link
                    key={site.id}
                    href={`/sites/${site.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div
                      className="size-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style={{
                        backgroundColor: site.theme?.primary || "#6366F1",
                      }}
                    >
                      {site.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {site.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {site.domain || `/${site.slug}`}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {toPersianNumber(site._count.pages)} صفحه
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* آخرین پیام‌ها */}
          <div className="bg-card rounded-xl border">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="font-semibold">آخرین پیام‌ها</h3>
              <Link
                href="/submissions"
                className="text-sm text-primary hover:underline"
              >
                مشاهده همه
              </Link>
            </div>
            <div className="p-2">
              {recentSubmissions.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  هنوز پیامی دریافت نکردی
                </div>
              ) : (
                recentSubmissions.map((sub) => (
                  <Link
                    key={sub.id}
                    href="/submissions"
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="size-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                      <MessageSquare className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">
                          {(sub.data as any)?.name || "کاربر ناشناس"}
                        </span>
                        {!sub.isRead && (
                          <span className="size-2 rounded-full bg-primary shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {(sub.data as any)?.message || "—"}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground shrink-0">
                      {new Date(sub.createdAt).toLocaleDateString("fa-IR")}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}