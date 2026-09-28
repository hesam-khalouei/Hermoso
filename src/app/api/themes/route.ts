import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "احراز هویت نشده" }, { status: 401 });
  }

  const themes = await db.theme.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(themes);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "احراز هویت نشده" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const theme = await db.theme.create({
      data: {
        name: body.name,
        primary: body.primary,
        secondary: body.secondary,
        accent: body.accent,
        text: body.text,
        textMuted: body.textMuted,
        background: body.background,
        border: body.border,
        fontFamily: body.fontFamily,
        radius: body.radius,
      },
    });

    return NextResponse.json(theme);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در ساخت تم" }, { status: 500 });
  }
}