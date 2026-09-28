import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Header } from "@/components/admin/header";

export default async function SubmissionsPage() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session!.userId },
    select: { name: true, email: true, role: true },
  });

  return (
    <>
      <Header user={user!} title="پیام‌ها" />
      <div className="p-6">
        <div className="bg-white rounded-xl border p-12 text-center text-muted-foreground">
          لیست پیام‌های دریافتی
        </div>
      </div>
    </>
  );
}