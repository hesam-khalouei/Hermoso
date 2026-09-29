"use client";

import { RenderedContent } from "@/components/ui/rendered-content";
import { sizeToCss } from "@/components/admin/size-field";

interface MerchantsV1Props {
  content: {
    title?: string;
    description?: string;
    logo_size?: any;
    logos?: {
      image?: string;
      name?: string;
      link?: string;
    }[];
  };
}

export default function MerchantsV1({ content }: MerchantsV1Props) {
  const { title, description, logo_size, logos = [] } = content;

  const logoSz = sizeToCss(logo_size, "80px");

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

        <div className="flex flex-wrap justify-center items-center gap-6">
          {logos.map((logo, i) => (
            <a
              key={i}
              href={logo.link || "#"}
              className="bg-[var(--site-bg-muted)] rounded-full border border-[var(--site-border)] flex items-center justify-center hover:shadow-md transition-shadow p-3"
              style={{ width: logoSz, height: logoSz }}
              title={logo.name}
            >
              {logo.image ? (
                <img
                  src={logo.image}
                  alt={logo.name || ""}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-[10px] text-[var(--site-text-muted)] text-center">
                  {logo.name || "لوگو"}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}