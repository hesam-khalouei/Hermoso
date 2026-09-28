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

  const theme = await db.theme.findUnique({ where: { id: params.id } });
  if (!theme) {
    return NextResponse.json({ error: "تم پیدا نشد" }, { status: 404 });
  }

  return NextResponse.json(theme);
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
    const theme = await db.theme.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(theme);
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
    // چک کن سایتی از این تم استفاده نمی‌کنه
    const sitesCount = await db.site.count({
      where: { themeId: params.id },
    });

    if (sitesCount > 0) {
      return NextResponse.json(
        { error: `این تم در ${sitesCount} سایت استفاده شده و قابل حذف نیست` },
        { status: 400 }
      );
    }

    await db.theme.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در حذف" }, { status: 500 });
  }
}