"use client";

import Link from "next/link";
import { sizeToCss } from "@/components/admin/size-field";

interface HeaderV1Props {
  content: {
    logo?: string;
    logo_size?: any;
    height?: any;
    menu_items?: {
      title: string;
      link: string;
      is_active?: boolean;
    }[];
  };
}

export default function HeaderV1({ content }: HeaderV1Props) {
  const { logo, logo_size, height, menu_items = [] } = content;

  const headerHeight = sizeToCss(height, "64px");
  const logoSize = sizeToCss(logo_size, "40px");

  return (
    <header
      dir="rtl"
      className="w-full bg-[var(--site-bg)] border-b border-[var(--site-border)] sticky top-0 z-40"
      style={{
        fontFamily: "var(--site-font)",
        height: headerHeight,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
        {/* لوگو - سمت راست */}
        <Link href="/" className="flex items-center shrink-0">
          {logo ? (
            <img
              src={logo}
              alt="لوگو"
              className="w-auto object-contain"
              style={{ height: logoSize }}
            />
          ) : (
            <div
              className="rounded-lg flex items-center justify-center text-sm font-bold"
              style={{
                backgroundColor: "var(--site-primary)",
                color: "var(--site-text)",
                height: logoSize,
                width: `calc(${logoSize} * 2.4)`,
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
              className="relative h-full flex items-center text-sm font-medium transition-colors"
              style={{
                color: item.is_active
                  ? "var(--site-primary)"
                  : "var(--site-text-muted)",
              }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: String(item.title || "").replace(/<[^>]*>/g, ""),
                }}
              />
              {item.is_active && (
                <span
                  className="absolute bottom-0 right-0 left-0 h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--site-primary)" }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block" style={{ width: `calc(${logoSize} * 2.4)` }} />
      </div>
    </header>
  );
}