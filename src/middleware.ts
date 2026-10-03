import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// دامنه‌های اصلی که نباید middleware اعمال بشه
const MAIN_DOMAINS = [
  "localhost",
  "127.0.0.1",
  "hermoso.local",
  // دامنه‌های اضافه کن:
  // "myhermoso.com",
];

// مسیرهایی که نباید middleware اعمال بشه
const EXCLUDED_PATHS = [
  "/_next",
  "/api",
  "/favicon.ico",
  "/uploads",
  "/fonts",
  "/images",
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const pathname = url.pathname;

  // ۱. مسیرهای excluded رو skip کن
  if (EXCLUDED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // ۲. مسیرهای پنل (admin) رو skip کن
  const adminPaths = [
    "/login",
    "/dashboard",
    "/sites",
    "/themes",
    "/media",
    "/submissions",
    "/users",
    "/settings",
    "/preview",
    "/api",
  ];

  if (adminPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // ۳. hostname رو بدون پورت جدا کن
  const hostnameWithoutPort = hostname.split(":")[0];
  const port = hostname.split(":")[1] || "";

  // ۴. چک کن دامنه اصلیه یا خیر
  const isMainDomain = MAIN_DOMAINS.some(
    (domain) =>
      hostnameWithoutPort === domain ||
      hostnameWithoutPort === `www.${domain}`
  );

  // اگه دامنه اصلی بود → مسیر رو ادامه بده
  if (isMainDomain) {
    // ولی اگه subdomain داشت (مثل ewano.localhost)
    const subdomain = getSubdomain(hostnameWithoutPort);

    if (subdomain) {
      // redirect به /preview/[slug]
      return NextResponse.rewrite(
        new URL(`/preview/${subdomain}${pathname}`, request.url)
      );
    }

    return NextResponse.next();
  }

  // ۵. دامنه اختصاصی (نه main)
  // → دنبال سایتی با این دامنه بگردیم
  // تو middleware نمی‌تونیم به DB دسترسی داشته باشیم (Edge Runtime)
  // پس از API یا یه روش دیگه استفاده می‌کنیم
  // فعلاً فرض می‌کنیم دامنه = slug site

  // راه‌حل: دامنه رو برمی‌گردونیم به یه پارامتر خاص
  // یا از یه API چک می‌کنیم

  // برای سادگی فعلاً:
  // دامنه اختصاصی → /preview با query domain
  return NextResponse.rewrite(
    new URL(`/preview/by-domain${pathname}?domain=${hostnameWithoutPort}`, request.url)
  );
}

/**
 * استخراج subdomain از hostname
 * مثال: ewano.localhost → ewano
 * مثال: localhost → null
 * مثال: www.example.com → null
 * مثال: ewano.example.com → ewano
 */
function getSubdomain(hostname: string): string | null {
  // حذف www
  const cleanHost = hostname.replace(/^www\./, "");

  // اگه localhost بود
  if (cleanHost === "localhost" || cleanHost === "127.0.0.1") {
    return null;
  }

  // تقسیم بر اساس نقطه
  const parts = cleanHost.split(".");

  // اگه فقط ۲ قسمت بود (example.com) → subdomain نداره
  if (parts.length <= 2) {
    return null;
  }

  // اگه ۳ یا بیشتر بود، اولین قسمت subdomain هست
  // ولی باید چک کنیم که خودش دامنه نباشه
  const possibleSubdomain = parts[0];

  // لیست subdomain های رزرو
  const reserved = ["www", "api", "admin", "app", "mail", "ftp"];

  if (reserved.includes(possibleSubdomain)) {
    return null;
  }

  return possibleSubdomain;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};