"use client";

import { RenderedContent } from "@/components/ui/rendered-content";
import { StyleButton } from "@/components/ui/style-button";
import { sizeToCss } from "@/components/admin/size-field";

interface IntroV2Props {
  content: {
    badge?: string;
    title?: string;
    description?: string;
    image?: string;
    image_size?: any;
    button?: {
      text: string;
      link: string;
      size?: any;
      font_size?: any;
      padding_x?: any;
    };
  };
}

export default function IntroV2({ content }: IntroV2Props) {
  const { badge, title, description, image, image_size, button } = content;

  const imgSize = sizeToCss(image_size, "500px");

  return (
    <section
      dir="rtl"
      className="py-20 px-6 lg:px-8 bg-[var(--site-bg)]"
      style={{ fontFamily: "var(--site-font)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-[var(--site-bg-muted)] rounded-3xl p-8 lg:p-12 shadow-sm border border-[var(--site-border)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center items-center lg:order-1">
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="w-full h-auto object-contain rounded-2xl"
                  style={{ maxWidth: imgSize }}
                />
              ) : (
                <div
                  className="aspect-square rounded-3xl flex items-center justify-center border-2 border-dashed border-[var(--site-border)]"
                  style={{ maxWidth: imgSize, width: "100%" }}
                >
                  <div className="text-sm text-[var(--site-text-muted)]">
                    تصویر را از پنل آپلود کنید
                  </div>
                </div>
              )}
            </div>

            <div className="text-right space-y-5 lg:order-2">
              {badge && (
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--site-border)] text-sm text-[var(--site-primary)] font-medium">
                  {badge}
                </div>
              )}

              {title && (
                <RenderedContent
                  html={title}
                  as="h2"
                  className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
                />
              )}

              {description && (
                <RenderedContent
                  html={description}
                  className="text-base lg:text-lg leading-8 text-[var(--site-text-muted)]"
                />
              )}

              {button && button.text && (
                <div className="pt-2">
                  <StyleButton
                    text={button.text}
                    link={button.link}
                    style="primary"
                    size={button.size}
                    fontSize={button.font_size}
                    paddingX={button.padding_x}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}