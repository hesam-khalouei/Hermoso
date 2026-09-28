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
    const { order } = await request.json();

    await Promise.all(
      order.map((item: { id: string; orderIndex: number }) =>
        db.block.update({
          where: { id: item.id },
          data: { orderIndex: item.orderIndex },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در ترتیب" }, { status: 500 });
  }
}