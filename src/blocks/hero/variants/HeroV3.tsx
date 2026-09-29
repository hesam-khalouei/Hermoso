"use client";

import { DynamicIcon } from "@/components/admin/icon-picker";
import { RenderedContent } from "@/components/ui/rendered-content";
import { sizeToCss } from "@/components/admin/size-field";

interface HeroV3Props {
  content: {
    title?: string;
    subtitle?: string;
    image?: string;
    height?: any;
    padding_y?: any;
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

export default function HeroV3({ content }: HeroV3Props) {
  const {
    title = "",
    subtitle = "",
    image = "",
    height,
    padding_y,
    buttons = [],
  } = content;

  const blockHeight = sizeToCss(height, "700px");
  const verticalPadding = sizeToCss(padding_y, "80px");

  return (
    <section
      dir="rtl"
      className="relative flex items-center overflow-hidden"
      style={{
        fontFamily: "var(--site-font)",
        minHeight: blockHeight,
      }}
    >
      {image ? (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-black/30" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700" />
      )}

      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full"
        style={{
          paddingTop: verticalPadding,
          paddingBottom: verticalPadding,
        }}
      >
        <div className="max-w-2xl ml-auto text-right space-y-6">
          <RenderedContent
            html={title}
            as="h1"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
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
      </div>

      <style jsx>{`
        h1,
        h1 :global(*) {
          color: #ffffff !important;
        }
        p,
        p :global(*) {
          color: rgba(255, 255, 255, 0.85) !important;
        }
      `}</style>
    </section>
  );
}