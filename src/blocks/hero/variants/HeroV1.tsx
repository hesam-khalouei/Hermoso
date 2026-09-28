"use client";

import { DynamicIcon } from "@/components/admin/icon-picker";

interface HeroV1Props {
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

export default function HeroV1({ content }: HeroV1Props) {
  const {
    title = "",
    title_highlight = "",
    subtitle = "",
    image = "",
    background_color = "#030712",
    buttons = [],
  } = content;

  // جدا کردن کلمه رنگی از عنوان
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
      {/* دایره‌های تزئینی */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute size-32 rounded-full opacity-10 blur-3xl"
          style={{
            backgroundColor: "var(--site-primary)",
            top: "10%",
            right: "5%",
          }}
        />
        <div
          className="absolute size-64 rounded-full opacity-5 blur-3xl"
          style={{
            backgroundColor: "var(--site-primary)",
            bottom: "10%",
            left: "10%",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* متن - راست */}
          <div className="order-2 lg:order-1 text-right space-y-6">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight lg:leading-[1.3]"
              style={{ color: "#FFFFFF" }}
            >
              {renderTitle()}
            </h1>

            {subtitle && (
              <p
                className="text-base lg:text-lg leading-8 max-w-xl mr-auto"
                style={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
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
                    {btn.icon && <DynamicIcon name={btn.icon} className="size-4" />}
                    <span>{btn.text}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* تصویر - چپ */}
          <div className="order-1 lg:order-2 flex justify-center items-center">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full max-w-lg h-auto object-contain"
              />
            ) : (
              <div
                className="w-full max-w-lg aspect-square rounded-3xl flex items-center justify-center border-2 border-dashed"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  className="text-sm text-center"
                  style={{ color: "rgba(255, 255, 255, 0.3)" }}
                >
                  تصویر را از پنل آپلود کنید
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}