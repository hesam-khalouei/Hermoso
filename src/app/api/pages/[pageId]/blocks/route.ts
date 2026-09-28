import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { pageId: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "احراز هویت نشده" }, { status: 401 });
  }

  try {
    const { blockType, variant, content, orderIndex } = await request.json();

    const block = await db.block.create({
      data: {
        pageId: params.pageId,
        blockType,
        variant,
        content,
        orderIndex,
      },
    });

    return NextResponse.json(block);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در ساخت بلاک" }, { status: 500 });
  }
}