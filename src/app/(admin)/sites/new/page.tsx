import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Header } from "@/components/admin/header";
import { SiteForm } from "@/components/admin/site-form";

export default async function NewSitePage() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session!.userId },
    select: { name: true, email: true, role: true },
  });

  const themes = await db.theme.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      primary: true,
      secondary: true,
      accent: true,
      fontFamily: true,
    },
  });

  if (themes.length === 0) {
    redirect("/themes/new");
  }

  return (
    <>
      <Header user={user!} title="سایت جدید" />
      <div className="p-6">
        <SiteForm themes={themes} />
      </div>
    </>
  );
}