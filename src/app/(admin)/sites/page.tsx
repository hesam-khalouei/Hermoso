import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Header } from "@/components/admin/header";
import { SitesList } from "@/components/admin/sites-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function SitesPage() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session!.userId },
    select: { name: true, email: true, role: true },
  });

  const sites = await db.site.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      theme: {
        select: {
          id: true,
          name: true,
          primary: true,
          secondary: true,
          accent: true,
          fontFamily: true,
        },
      },
      _count: {
        select: { pages: true },
      },
    },
  });

  const themesCount = await db.theme.count();

  return (
    <>
      <Header user={user!} title="سایت‌ها" />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">مدیریت سایت‌ها</h2>
            <p className="text-sm text-muted-foreground">
              سایت‌های لندینگ خودت رو اینجا بساز و مدیریت کن
            </p>
          </div>
          {themesCount === 0 ? (
            <Link href="/themes/new">
              <Button variant="outline">اول یه تم بساز</Button>
            </Link>
          ) : (
            <Link href="/sites/new">
              <Button className="gap-2">
                <Plus className="size-4" />
                سایت جدید
              </Button>
            </Link>
          )}
        </div>

        <SitesList sites={sites} hasThemes={themesCount > 0} />
      </div>
    </>
  );
}