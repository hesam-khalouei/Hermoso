"use client";

import Link from "next/link";

interface HeaderV1Props {
  content: {
    logo?: string;
    menu_items?: {
      title: string;
      link: string;
      is_active?: boolean;
    }[];
  };
}

export default function HeaderV1({ content }: HeaderV1Props) {
  const { logo, menu_items = [] } = content;

  return (
    <header
      dir="rtl"
      className="w-full bg-[var(--site-bg)] border-b border-[var(--site-border)] sticky top-0 z-40"
      style={{
        fontFamily: "var(--site-font)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* لوگو - سمت راست */}
        <Link href="/" className="flex items-center shrink-0">
          {logo ? (
            <img
              src={logo}
              alt="لوگو"
              className="h-10 w-auto object-contain"
            />
          ) : (
            <div
              className="h-10 w-24 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{
                backgroundColor: "var(--site-primary)",
                color: "var(--site-text)",
              }}
            >
              لوگو
            </div>
          )}
        </Link>

        {/* منو - وسط */}
        <nav className="hidden md:flex items-center gap-8">
          {menu_items.map((item, index) => (
            <Link
              key={index}
              href={item.link || "#"}
              className="relative py-5 text-sm font-medium transition-colors"
              style={{
                color: item.is_active
                  ? "var(--site-primary)"
                  : "var(--site-text-muted)",
              }}
            >
              {item.title}
              {item.is_active && (
                <span
                  className="absolute bottom-0 right-0 left-0 h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--site-primary)" }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* فضای خالی سمت چپ (برای تعادل) */}
        <div className="w-24 hidden md:block" />
      </div>
    </header>
  );
}