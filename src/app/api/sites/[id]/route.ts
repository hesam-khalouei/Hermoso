import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "احراز هویت نشده" }, { status: 401 });
  }

  const site = await db.site.findUnique({
    where: { id: params.id },
    include: {
      theme: true,
      pages: {
        include: {
          blocks: { orderBy: { orderIndex: "asc" } },
        },
      },
    },
  });

  if (!site) {
    return NextResponse.json({ error: "سایت پیدا نشد" }, { status: 404 });
  }

  return NextResponse.json(site);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "احراز هویت نشده" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // چک slug یکتا (اگه در حال تغییر باشه)
    if (body.slug) {
      const existing = await db.site.findFirst({
        where: {
          slug: body.slug,
          NOT: { id: params.id },
        },
      });
      if (existing) {
        return NextResponse.json(
          { error: "این آدرس قبلاً استفاده شده" },
          { status: 400 }
        );
      }
    }

    const site = await db.site.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(site);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در ویرایش" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "احراز هویت نشده" }, { status: 401 });
  }

  try {
    await db.site.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در حذف" }, { status: 500 });
  }
}