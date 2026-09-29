"use client";

import { useState } from "react";
import { RenderedContent } from "@/components/ui/rendered-content";
import { sizeToCss } from "@/components/admin/size-field";
import { cn } from "@/lib/utils";

interface MerchantsV2Props {
  content: {
    title?: string;
    description?: string;
    logo_size?: any;
    categories?: { title: string }[];
    logos?: {
      image?: string;
      name?: string;
      link?: string;
      category?: string;
    }[];
  };
}

export default function MerchantsV2({ content }: MerchantsV2Props) {
  const { title, description, logo_size, categories = [], logos = [] } = content;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const logoSz = sizeToCss(logo_size, "80px");

  const filteredLogos = activeCategory
    ? logos.filter((l) => l.category === activeCategory)
    : logos;

  return (
    <section
      dir="rtl"
      className="py-20 px-6 lg:px-8 bg-[var(--site-bg)]"
      style={{ fontFamily: "var(--site-font)" }}
    >
      <div className="max-w-7xl mx-auto space-y-10">
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

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium border transition-colors",
                activeCategory === null
                  ? "bg-[var(--site-primary)] text-white border-[var(--site-primary)]"
                  : "bg-[var(--site-bg)] border-[var(--site-border)] text-[var(--site-text)]"
              )}
            >
              همه
            </button>
            {categories.map((cat) => (
              <button
                key={cat.title}
                type="button"
                onClick={() => setActiveCategory(cat.title)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium border transition-colors",
                  activeCategory === cat.title
                    ? "bg-[var(--site-primary)] text-white border-[var(--site-primary)]"
                    : "bg-[var(--site-bg)] border-[var(--site-border)] text-[var(--site-text)]"
                )}
              >
                {cat.title}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center items-center gap-6">
          {filteredLogos.map((logo, i) => (
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