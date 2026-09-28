import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Header } from "@/components/admin/header";
import { ThemeForm } from "@/components/admin/theme-form";

export default async function EditThemePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session!.userId },
    select: { name: true, email: true, role: true },
  });

  const theme = await db.theme.findUnique({
    where: { id: params.id },
  });

  if (!theme) notFound();

  return (
    <>
      <Header user={user!} title={`ویرایش: ${theme.name}`} />
      <div className="p-6">
        <ThemeForm
          initialData={{
            id: theme.id,
            name: theme.name,
            primary: theme.primary,
            secondary: theme.secondary,
            accent: theme.accent,
            text: theme.text,
            textMuted: theme.textMuted,
            background: theme.background,
            border: theme.border,
            fontFamily: theme.fontFamily,
            radius: theme.radius,
          }}
        />
      </div>
    </>
  );
}