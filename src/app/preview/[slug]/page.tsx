import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { BlockRenderer } from "@/blocks/BlockRenderer";
import { themeToCssVars } from "@/lib/theme";

interface PageProps {
  params: { slug: string };
}

// ═══════ SEO داینامیک ═══════
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const site = await db.site.findUnique({
    where: { slug: params.slug },
    include: {
      pages: {
        where: { isHome: true },
        take: 1,
      },
    },
  });

  if (!site) {
    return {
      title: "سایت پیدا نشد",
    };
  }

  const homePage = site.pages[0];

  return {
    title: homePage?.seoTitle || site.name,
    description: homePage?.seoDescription || "",
    openGraph: {
      title: homePage?.seoTitle || site.name,
      description: homePage?.seoDescription || "",
      images: homePage?.ogImage ? [homePage.ogImage] : [],
    },
  };
}

// ═══════ صفحه اصلی ═══════
export default async function PreviewPage({ params }: PageProps) {
  // پیدا کردن سایت با slug
  const site = await db.site.findUnique({
    where: { slug: params.slug },
    include: {
      theme: true,
      pages: {
        where: { isHome: true },
        take: 1,
        include: {
          blocks: {
            orderBy: { orderIndex: "asc" },
            where: { isVisible: true },
          },
        },
      },
    },
  });

  // اگه سایت نبود یا غیرفعال بود → 404
  if (!site || !site.isActive) {
    notFound();
  }

  const homePage = site.pages[0];

  // اگه صفحه اصلی نبود → 404
  if (!homePage) {
    notFound();
  }

  // تبدیل تم به CSS Variables
  const themeVars = themeToCssVars(site.theme);

  return (
    <div
      dir="rtl"
      className="site-scope min-h-screen"
      style={{
        ...themeVars,
        fontFamily: "var(--site-font), IRANYekanX, sans-serif",
        backgroundColor: "var(--site-bg)",
        color: "var(--site-text)",
      }}
    >
      {homePage.blocks.map((block) => (
        <BlockRenderer
          key={block.id}
          blockType={block.blockType}
          variant={block.variant}
          content={block.content as Record<string, any>}
        />
      ))}
    </div>
  );
}