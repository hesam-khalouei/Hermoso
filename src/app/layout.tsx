import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "هرموسو | پنل مدیریت محتوا",
  description: "CMS فارسی برای ساخت لندینگ‌پیج‌ها",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}