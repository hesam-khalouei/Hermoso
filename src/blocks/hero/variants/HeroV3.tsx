"use client";

import { DynamicIcon } from "@/components/admin/icon-picker";

interface HeroV3Props {
  content: {
    title?: string;
    title_highlight?: string;
    subtitle?: string;
    image?: string;
    buttons?: {
      text: string;
      link: string;
      style?: string;
      icon?: string;
    }[];
  };
}

export default function HeroV3({ content }: HeroV3Props) {
  const {
    title = "",
    title_highlight = "",
    subtitle = "",
    image = "",
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
      className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden"
      style={{ fontFamily: "var(--site-font)" }}
    >
      {/* تصویر پس‌زمینه */}
      {image ? (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-black/30" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700" />
      )}

      {/* محتوا */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20 w-full">
        <div className="max-w-2xl ml-auto text-right space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
            {renderTitle()}
          </h1>

          {subtitle && (
            <p className="text-base lg:text-lg leading-8 text-white/80 max-w-xl mr-auto">
              {subtitle}
            </p>
          )}

          {buttons.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-end pt-2">
              {buttons.map((btn, i) => (
                <a
                  key={i}
                  href={btn.link || "#"}
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 font-semibold text-sm transition-all hover:-translate-y-0.5"
                  style={{
                    backgroundColor:
                      btn.style === "primary"
                        ? "var(--site-primary)"
                        : "#FFFFFF",
                    color:
                      btn.style === "primary" ? "#FFFFFF" : "#18181B",
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
      </div>
    </section>
  );
}