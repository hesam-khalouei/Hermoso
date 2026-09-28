import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// محدودیت‌ها
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "احراز هویت نشده" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const siteId = formData.get("siteId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "فایلی انتخاب نشده" }, { status: 400 });
    }

    // چک حجم
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "حجم فایل بیشتر از ۵ مگابایت است" },
        { status: 400 }
      );
    }

    // چک نوع
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "فرمت فایل پشتیبانی نمی‌شود (فقط JPG, PNG, WebP, GIF, SVG)" },
        { status: 400 }
      );
    }

    // نام یکتا
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const ext = file.name.split(".").pop() || "png";
    const fileName = `${timestamp}-${randomStr}.${ext}`;

    // مسیر ذخیره‌سازی
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // آدرس نهایی
    const url = `/uploads/${fileName}`;

    return NextResponse.json({
      url,
      fileName,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "خطا در آپلود" }, { status: 500 });
  }
}