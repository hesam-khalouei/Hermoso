import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Header } from "@/components/admin/header";
import { ThemeForm } from "@/components/admin/theme-form";

export default async function NewThemePage() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session!.userId },
    select: { name: true, email: true, role: true },
  });

  return (
    <>
      <Header user={user!} title="تم جدید" />
      <div className="p-6">
        <ThemeForm />
      </div>
    </>
  );
}