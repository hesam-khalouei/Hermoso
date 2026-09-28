import { notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Header } from "@/components/admin/header";
import { BlockEditor } from "@/components/admin/block-editor";
import { ArrowRight } from "lucide-react";

export default async function PageEditor({
  params,
}: {
  params: { id: string; pageId: string };
}) {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session!.userId },
    select: { name: true, email: true, role: true },
  });

  const site = await db.site.findUnique({
    where: { id: params.id },
    include: { theme: true },
  });

  if (!site) notFound();

  const page = await db.page.findUnique({
    where: { id: params.pageId },
    include: {
      blocks: {
        orderBy: { orderIndex: "asc" },
      },
    },
  });

  if (!page || page.siteId !== site.id) notFound();

  return (
    <>
      <Header user={user!} title={`${site.name} › ${page.title}`} />

      <div className="p-6 space-y-4">
        <Link
          href={`/sites/${site.id}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowRight className="size-4" />
          بازگشت به سایت
        </Link>

        <BlockEditor
          siteId={site.id}
          pageId={page.id}
          pageTitle={page.title}
          theme={site.theme}
          initialBlocks={page.blocks.map((b) => ({
            id: b.id,
            blockType: b.blockType,
            variant: b.variant,
            content: b.content as Record<string, any>,
            isVisible: b.isVisible,
            orderIndex: b.orderIndex,
          }))}
        />
      </div>
    </>
  );
}