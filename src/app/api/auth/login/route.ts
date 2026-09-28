import { NextResponse } from "next/server";
import { loginUser, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "ایمیل و رمز عبور الزامی است" },
        { status: 400 }
      );
    }

    const result = await loginUser(email, password);

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    await setSessionCookie(result.token);

    return NextResponse.json({
      success: true,
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "خطای سرور. دوباره تلاش کنید." },
      { status: 500 }
    );
  }
}