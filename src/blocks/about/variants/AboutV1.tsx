"use client";

import { RenderedContent } from "@/components/ui/rendered-content";
import { DynamicIcon } from "@/components/admin/icon-picker";
import { sizeToCss } from "@/components/admin/size-field";

interface AboutV1Props {
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

export default function AboutV1({ content }: AboutV1Props) {
  const { title, description, cards = [], image, image_size } = content;

  const imgSize = sizeToCss(image_size, "500px");

  return (
    <section
      dir="rtl"
      className="py-20 px-6 lg:px-8 bg-[var(--site-bg-muted)]"
      style={{ fontFamily: "var(--site-font)" }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
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
              className="text-base lg:text-lg leading-8 text-[var(--site-text-muted)] max-w-3xl mx-auto"
            />
          )}
        </div>

        {cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-[var(--site-bg)] rounded-3xl p-8 border-2 border-[var(--site-text)] shadow-[0_4px_0_0_rgba(26,26,26,1)] space-y-4"
              >
                <div className="flex justify-center">
                  <div className="size-24 rounded-3xl bg-[var(--site-bg-muted)] border border-[var(--site-border)] flex items-center justify-center">
                    {card.icon && (
                      <DynamicIcon
                        name={card.icon}
                        className="size-10 text-[var(--site-primary)]"
                      />
                    )}
                  </div>
                </div>

                {card.title && (
                  <RenderedContent
                    html={card.title}
                    as="h3"
                    className="text-lg font-bold text-center"
                  />
                )}

                {card.description && (
                  <RenderedContent
                    html={card.description}
                    className="text-sm leading-7 text-[var(--site-text-muted)] text-center"
                  />
                )}

                {card.link_text && (
                  <div className="text-center pt-2">
                    <a
                      href={card.link || "#"}
                      className="text-[var(--site-primary)] text-sm font-bold hover:underline"
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: String(card.link_text || "").replace(
                            /<[^>]*>/g,
                            ""
                          ),
                        }}
                      />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {image && (
          <div className="flex justify-center">
            <img
              src={image}
              alt=""
              className="w-auto h-auto object-contain"
              style={{ maxWidth: imgSize }}
            />
          </div>
        )}
      </div>
    </section>
  );
}