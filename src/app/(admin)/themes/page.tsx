import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Header } from "@/components/admin/header";
import { ThemesList } from "@/components/admin/themes-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function ThemesPage() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session!.userId },
    select: { name: true, email: true, role: true },
  });

  const themes = await db.theme.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { sites: true },
      },
    },
  });

  return (
    <>
      <Header user={user!} title="تم‌ها" />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">مدیریت تم‌ها</h2>
            <p className="text-sm text-muted-foreground">
              رنگ‌ها، فونت و ظاهر کلی سایت‌های لندینگ رو اینجا تعریف کن
            </p>
          </div>
          <Link href="/themes/new">
            <Button className="gap-2">
              <Plus className="size-4" />
              تم جدید
            </Button>
          </Link>
        </div>

        <ThemesList themes={themes} />
      </div>
    </>
  );
}