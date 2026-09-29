"use client";

import { RenderedContent } from "@/components/ui/rendered-content";
import { StyleButton } from "@/components/ui/style-button";
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
                <StyleButton
                  key={i}
                  text={btn.text}
                  link={btn.link}
                  style={(btn.style as any) || "primary"}
                  icon={btn.icon}
                  size={btn.size}
                  fontSize={btn.font_size}
                  paddingX={btn.padding_x}
                />
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