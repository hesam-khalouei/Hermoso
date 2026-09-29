"use client";

import { RenderedContent } from "@/components/ui/rendered-content";
import { DynamicIcon } from "@/components/admin/icon-picker";
import { sizeToCss } from "@/components/admin/size-field";

interface FeaturesV2Props {
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

export default function FeaturesV2({ content }: FeaturesV2Props) {
  const { title, description, items = [] } = content;

  return (
    <section
      dir="rtl"
      className="py-20 px-6 lg:px-8 bg-[var(--site-bg)]"
      style={{ fontFamily: "var(--site-font)" }}
    >
      <div className="max-w-4xl mx-auto space-y-12">
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
              className="text-base lg:text-lg leading-8 text-[var(--site-text-muted)]"
            />
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-4">
            {items.map((item, i) => {
              const iconSz = sizeToCss(item.icon_size, "40px");
              return (
                <div
                  key={i}
                  className="flex items-start gap-5 p-5 rounded-2xl border border-[var(--site-border)] bg-[var(--site-bg)]"
                >
                  <div
                    className="rounded-xl bg-[var(--site-primary)]/10 flex items-center justify-center shrink-0"
                    style={{ width: iconSz, height: iconSz }}
                  >
                    {item.icon && (
                      <DynamicIcon
                        name={item.icon}
                        className="size-1/2 text-[var(--site-primary)]"
                      />
                    )}
                  </div>

                  <div className="flex-1 text-right space-y-2">
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}