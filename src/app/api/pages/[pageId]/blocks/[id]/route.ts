import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

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
    const block = await db.block.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(block);
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
    await db.block.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در حذف" }, { status: 500 });
  }
}