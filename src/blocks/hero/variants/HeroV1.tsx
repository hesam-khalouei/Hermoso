"use client";

import { DynamicIcon } from "@/components/admin/icon-picker";
import { RenderedContent } from "@/components/ui/rendered-content";
import { sizeToCss } from "@/components/admin/size-field";

interface HeroV1Props {
  content: {
    title?: string;
    subtitle?: string;
    image?: string;
    image_size?: any;
    height?: any;
    padding_y?: any;
    background_color?: string;
    buttons?: {
      text: string;
      link: string;
      style?: string;
      icon?: string;
      size?: any;
      font_size?: any;
      padding_x?: any;
    }[];
  };
}

export default function HeroV1({ content }: HeroV1Props) {
  const {
    title = "",
    subtitle = "",
    image = "",
    image_size,
    height,
    padding_y,
    background_color = "#030712",
    buttons = [],
  } = content;

  const blockHeight = sizeToCss(height, "auto");
  const verticalPadding = sizeToCss(padding_y, "96px");
  const imgSize = sizeToCss(image_size, "500px");

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden"
      style={{
        backgroundColor: background_color,
        fontFamily: "var(--site-font)",
        minHeight: blockHeight,
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

      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-8"
        style={{
          paddingTop: verticalPadding,
          paddingBottom: verticalPadding,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* متن - راست */}
          <div className="order-2 lg:order-1 text-right space-y-6">
            <RenderedContent
              html={title}
              as="h1"
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight lg:leading-[1.3]"
            />

            {subtitle && (
              <RenderedContent
                html={subtitle}
                className="text-base lg:text-lg leading-8 max-w-xl mr-auto"
              />
            )}

            {buttons.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-end pt-2">
                {buttons.map((btn, i) => (
                  <a
                    key={i}
                    href={btn.link || "#"}
                    className="inline-flex items-center justify-center gap-2 font-semibold transition-all hover:-translate-y-0.5"
                    style={{
                      backgroundColor:
                        btn.style === "primary"
                          ? "var(--site-primary)"
                          : "#FFFFFF",
                      color:
                        btn.style === "primary" ? "#FFFFFF" : "#18181B",
                      height: sizeToCss(btn.size, "48px"),
                      paddingLeft: sizeToCss(btn.padding_x, "24px"),
                      paddingRight: sizeToCss(btn.padding_x, "24px"),
                      fontSize: sizeToCss(btn.font_size, "14px"),
                      borderRadius: "var(--site-radius)",
                      boxShadow: "0 2px 0 0 rgb(24, 24, 27)",
                      border: "2px solid rgb(24, 24, 27)",
                    }}
                  >
                    {btn.icon && (
                      <DynamicIcon name={btn.icon} className="size-4" />
                    )}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: String(btn.text || "").replace(/<[^>]*>/g, ""),
                      }}
                    />
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
                alt=""
                className="h-auto object-contain"
                style={{ width: imgSize }}
              />
            ) : (
              <div
                className="aspect-square rounded-3xl flex items-center justify-center border-2 border-dashed"
                style={{
                  width: imgSize,
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

      {/* استایل برای متن سفید روی Hero تیره */}
      <style jsx>{`
        h1,
        h1 :global(*) {
          color: #ffffff !important;
        }
        p,
        p :global(*) {
          color: rgba(255, 255, 255, 0.7) !important;
        }
      `}</style>
    </section>
  );
}