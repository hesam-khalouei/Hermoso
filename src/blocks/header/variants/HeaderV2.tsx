"use client";

import Link from "next/link";
import { sizeToCss } from "@/components/admin/size-field";

interface HeaderV2Props {
  content: {
    logo?: string;
    logo_size?: any;
    height?: any;
    menu_items?: {
      title: string;
      link: string;
      is_active?: boolean;
    }[];
    cta_text?: string;
    cta_link?: string;
    cta_size?: any;
  };
}

export default function HeaderV2({ content }: HeaderV2Props) {
  const {
    logo,
    logo_size,
    height,
    menu_items = [],
    cta_text = "شروع کنید",
    cta_link = "#",
    cta_size,
  } = content;

  const headerHeight = sizeToCss(height, "64px");
  const logoSize = sizeToCss(logo_size, "40px");
  const ctaHeight = sizeToCss(cta_size, "40px");

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
        {/* لوگو */}
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

        {/* منو */}
        <nav className="hidden md:flex items-center gap-8 h-full">
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

        {/* دکمه CTA */}
        <Link
          href={cta_link}
          className="hidden md:inline-flex items-center justify-center px-5 text-sm font-semibold transition-transform hover:-translate-y-0.5 shrink-0"
          style={{
            backgroundColor: "var(--site-primary)",
            color: "var(--site-text)",
            height: ctaHeight,
            borderRadius: "var(--site-radius)",
            boxShadow: "0 2px 0 0 rgb(24, 24, 27)",
            border: "2px solid rgb(24, 24, 27)",
          }}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: String(cta_text || "").replace(/<[^>]*>/g, ""),
            }}
          />
        </Link>

        {/* دکمه موبایل */}
        <button
          type="button"
          className="md:hidden size-10 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: "var(--site-bg)",
            border: "1px solid var(--site-border)",
          }}
          aria-label="منو"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ color: "var(--site-text)" }}
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}