"use client";

import { RenderedContent } from "@/components/ui/rendered-content";
import { DynamicIcon } from "@/components/admin/icon-picker";
import { sizeToCss } from "@/components/admin/size-field";

interface AboutV2Props {
  content: {
    title?: string;
    description?: string;
    cards?: {
      icon?: string;
      title?: string;
      description?: string;
      link_text?: string;
      link?: string;
    }[];
    image?: string;
    image_size?: any;
  };
}

export default function AboutV2({ content }: AboutV2Props) {
  const { title, description, cards = [], image, image_size } = content;

  const imgSize = sizeToCss(image_size, "500px");

  return (
    <section
      dir="rtl"
      className="py-20 px-6 lg:px-8 bg-[var(--site-bg-muted)]"
      style={{ fontFamily: "var(--site-font)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* متن - راست */}
          <div className="space-y-6 text-right">
            {title && (
              <RenderedContent
                html={title}
                as="h2"
                className="text-2xl md:text-3xl lg:text-4xl font-bold"
              />
            )}
            {description && (
              <RenderedContent
                html={description}
                className="text-base lg:text-lg leading-8 text-[var(--site-text-muted)]"
              />
            )}

            {cards.length > 0 && (
              <div className="space-y-4 pt-4">
                {cards.map((card, i) => (
                  <div
                    key={i}
                    className="bg-[var(--site-bg)] rounded-2xl p-5 border border-[var(--site-border)] flex items-start gap-4"
                  >
                    <div className="size-12 rounded-xl bg-[var(--site-primary)]/10 flex items-center justify-center shrink-0">
                      {card.icon && (
                        <DynamicIcon
                          name={card.icon}
                          className="size-6 text-[var(--site-primary)]"
                        />
                      )}
                    </div>
                    <div className="flex-1 text-right space-y-1">
                      {card.title && (
                        <RenderedContent
                          html={card.title}
                          as="h3"
                          className="text-base font-bold"
                        />
                      )}
                      {card.description && (
                        <RenderedContent
                          html={card.description}
                          className="text-sm text-[var(--site-text-muted)] leading-7"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* تصویر - چپ */}
          <div className="flex justify-center items-start lg:sticky lg:top-24">
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
        </div>
      </div>
    </section>
  );
}