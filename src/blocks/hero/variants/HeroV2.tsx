"use client";

import { RenderedContent } from "@/components/ui/rendered-content";
import { StyleButton } from "@/components/ui/style-button";
import { sizeToCss } from "@/components/admin/size-field";

interface HeroV2Props {
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

export default function HeroV2({ content }: HeroV2Props) {
  const {
    title = "",
    subtitle = "",
    image = "",
    image_size,
    height,
    padding_y,
    background_color = "#F8FAFC",
    buttons = [],
  } = content;

  const blockHeight = sizeToCss(height, "auto");
  const verticalPadding = sizeToCss(padding_y, "80px");
  const imgSize = sizeToCss(image_size, "100%");

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

      <div
        className="relative max-w-5xl mx-auto px-6 lg:px-8"
        style={{
          paddingTop: verticalPadding,
          paddingBottom: verticalPadding,
        }}
      >
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <RenderedContent
            html={title}
            as="h1"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
          />

          {subtitle && (
            <RenderedContent
              html={subtitle}
              className="text-base lg:text-lg leading-8 text-muted-foreground"
            />
          )}

          {buttons.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center pt-2">
              {buttons.map((btn, i) => (
                <StyleButton
                  key={i}
                  text={btn.text}
                  link={btn.link}
                  style={(btn.style as any) || "primary"}
                  icon={btn.icon}
                  size={btn.size}
                  fontSize={btn.font_size}
                  paddingX={btn.padding_x}
                  bgColor={btn.style === "primary" ? undefined : "var(--site-bg)"}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-center">
          {image ? (
            <img
              src={image}
              alt=""
              className="h-auto object-contain"
              style={{ width: imgSize }}
            />
          ) : (
            <div
              className="aspect-[16/9] rounded-3xl flex items-center justify-center border-2 border-dashed"
              style={{
                width: imgSize,
                borderColor: "var(--site-border)",
              }}
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