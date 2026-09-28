import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Sidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // گرفتن اطلاعات کامل کاربر
  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-secondary/30" dir="rtl">
      {/* سایدبار سمت راست */}
      <Sidebar />

      {/* محتوای اصلی */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}