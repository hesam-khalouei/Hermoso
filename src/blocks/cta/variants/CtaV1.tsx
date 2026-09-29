"use client";

import { RenderedContent } from "@/components/ui/rendered-content";
import { StyleButton } from "@/components/ui/style-button";

interface CtaV1Props {
  content: {
    title?: string;
    description?: string;
    button_text?: string;
    button_link?: string;
    button_size?: any;
  };
}

export default function CtaV1({ content }: CtaV1Props) {
  const { title, description, button_text, button_link, button_size } = content;

  return (
    <section
      dir="rtl"
      className="py-16 px-6 lg:px-8"
      style={{ fontFamily: "var(--site-font)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-10 lg:p-14 text-center space-y-6"
          style={{
            backgroundColor: "var(--site-primary)",
          }}
        >
          {title && (
            <RenderedContent
              html={title}
              as="h2"
              className="text-2xl md:text-3xl lg:text-4xl font-bold [&_*]:!text-white"
            />
          )}
          {description && (
            <RenderedContent
              html={description}
              className="text-base lg:text-lg leading-8 max-w-2xl mx-auto [&_*]:!text-white/90"
            />
          )}
          {button_text && (
            <div className="pt-4">
              <StyleButton
                text={button_text}
                link={button_link || "#"}
                style="secondary"
                size={button_size}
                bgColor="#FFFFFF"
                forceTextColor="#18181B"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}