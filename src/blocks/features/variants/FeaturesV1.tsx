"use client";

import { RenderedContent } from "@/components/ui/rendered-content";
import { DynamicIcon } from "@/components/admin/icon-picker";
import { sizeToCss } from "@/components/admin/size-field";

interface FeaturesV1Props {
  content: {
    title?: string;
    description?: string;
    items?: {
      icon?: string;
      icon_size?: any;
      title?: string;
      description?: string;
    }[];
  };
}

export default function FeaturesV1({ content }: FeaturesV1Props) {
  const { title, description, items = [] } = content;

  return (
    <section
      dir="rtl"
      className="py-20 px-6 lg:px-8 bg-[var(--site-bg)]"
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

        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => {
              const iconSz = sizeToCss(item.icon_size, "40px");
              return (
                <div
                  key={i}
                  className="bg-[var(--site-bg)] rounded-2xl p-6 border border-[var(--site-border)] hover:shadow-lg transition-shadow text-right space-y-4"
                >
                  <div
                    className="rounded-xl bg-[var(--site-primary)]/10 flex items-center justify-center mr-auto"
                    style={{ width: iconSz, height: iconSz }}
                  >
                    {item.icon && (
                      <DynamicIcon
                        name={item.icon}
                        className="size-1/2 text-[var(--site-primary)]"
                      />
                    )}
                  </div>

                  {item.title && (
                    <RenderedContent
                      html={item.title}
                      as="h3"
                      className="text-lg font-bold"
                    />
                  )}

                  {item.description && (
                    <RenderedContent
                      html={item.description}
                      className="text-sm leading-7 text-[var(--site-text-muted)]"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}