import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";
import bcrypt from "bcryptjs";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "fallback-secret-change-me"
);

const COOKIE_NAME = "hermoso_session";

export type SessionPayload = {
  userId: string;
  email: string;
  role: "ADMIN" | "EDITOR";
};

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
  return token;
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function setSessionCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function clearSession() {
  cookies().delete(COOKIE_NAME);
}

export async function loginUser(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return { error: "کاربر پیدا نشد" };

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return { error: "رمز عبور اشتباه است" };

  const token = await createSession({
    userId: user.id,
    email: user.email,
    role: user.role as "ADMIN" | "EDITOR",
  });

  return { token, user };
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}