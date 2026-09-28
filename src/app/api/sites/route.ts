import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "احراز هویت نشده" }, { status: 401 });
  }

  const sites = await db.site.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      theme: true,
      _count: { select: { pages: true } },
    },
  });

  return NextResponse.json(sites);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "احراز هویت نشده" }, { status: 401 });
  }

  try {
    const { name, slug, domain, themeId } = await request.json();

    if (!name || !slug || !themeId) {
      return NextResponse.json(
        { error: "نام، آدرس و تم الزامی هستند" },
        { status: 400 }
      );
    }

    // چک کن slug یکتا باشه
    const existingSlug = await db.site.findUnique({ where: { slug } });
    if (existingSlug) {
      return NextResponse.json(
        { error: "این آدرس قبلاً استفاده شده. یه آدرس دیگه انتخاب کن" },
        { status: 400 }
      );
    }

    // چک کن دامنه یکتا باشه (اگه داده شده)
    if (domain) {
      const existingDomain = await db.site.findUnique({ where: { domain } });
      if (existingDomain) {
        return NextResponse.json(
          { error: "این دامنه قبلاً استفاده شده" },
          { status: 400 }
        );
      }
    }

    // ساخت سایت + یک صفحه Home پیش‌فرض
    const site = await db.site.create({
      data: {
        name,
        slug,
        domain: domain || null,
        themeId,
        pages: {
          create: {
            title: "صفحه اصلی",
            slug: "home",
            isHome: true,
          },
        },
      },
      include: {
        theme: true,
        pages: true,
      },
    });

    return NextResponse.json(site);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "خطا در ساخت سایت" },
      { status: 500 }
    );
  }
}