"use client";

import { DynamicIcon } from "@/components/admin/icon-picker";

interface HeroV2Props {
  content: {
    title?: string;
    title_highlight?: string;
    subtitle?: string;
    image?: string;
    background_color?: string;
    buttons?: {
      text: string;
      link: string;
      style?: string;
      icon?: string;
    }[];
  };
}

export default function HeroV2({ content }: HeroV2Props) {
  const {
    title = "",
    title_highlight = "",
    subtitle = "",
    image = "",
    background_color = "#F8FAFC",
    buttons = [],
  } = content;

  const renderTitle = () => {
    if (!title_highlight || !title.includes(title_highlight)) {
      return title;
    }
    const parts = title.split(title_highlight);
    return (
      <>
        {parts[0]}
        <span style={{ color: "var(--site-primary)" }}>
          {title_highlight}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden"
      style={{
        backgroundColor: background_color,
        fontFamily: "var(--site-font)",
      }}
    >
      {/* پس‌زمینه شبکه‌ای (grid dots) */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--site-border) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center top, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center top, black 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* متن و دکمه‌ها - وسط */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: "var(--site-text)" }}
          >
            {renderTitle()}
          </h1>

          {subtitle && (
            <p
              className="text-base lg:text-lg leading-8"
              style={{ color: "var(--site-text-muted)" }}
            >
              {subtitle}
            </p>
          )}

          {buttons.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {buttons.map((btn, i) => (
                <a
                  key={i}
                  href={btn.link || "#"}
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 font-semibold text-sm transition-all hover:-translate-y-0.5"
                  style={{
                    backgroundColor:
                      btn.style === "primary"
                        ? "var(--site-primary)"
                        : "var(--site-bg)",
                    color: "var(--site-text)",
                    borderRadius: "var(--site-radius)",
                    boxShadow: "0 2px 0 0 rgb(24, 24, 27)",
                    border: "2px solid rgb(24, 24, 27)",
                  }}
                >
                  {btn.icon && (
                    <DynamicIcon name={btn.icon} className="size-4" />
                  )}
                  <span>{btn.text}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* تصویر - پایین وسط */}
        <div className="mt-12 flex justify-center">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full max-w-3xl h-auto object-contain"
            />
          ) : (
            <div
              className="w-full max-w-3xl aspect-[16/9] rounded-3xl flex items-center justify-center border-2 border-dashed"
              style={{ borderColor: "var(--site-border)" }}
            >
              <div
                className="text-sm"
                style={{ color: "var(--site-text-muted)" }}
              >
                تصویر را از پنل آپلود کنید
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}