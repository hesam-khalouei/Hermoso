import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "هرموسو | پنل مدیریت محتوا",
  description: "CMS فارسی برای ساخت لندینگ‌پیج‌ها",
};

// اسکریپت کوچیک برای جلوگیری از پرش تم (FOUC)
const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('hermoso-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = stored || (prefersDark ? 'dark' : 'light');
      if (theme === 'dark') document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}