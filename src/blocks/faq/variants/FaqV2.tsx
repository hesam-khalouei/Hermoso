"use client";

import { useState } from "react";
import { RenderedContent } from "@/components/ui/rendered-content";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqV2Props {
  content: {
    title?: string;
    description?: string;
    items?: {
      question: string;
      answer: string;
    }[];
  };
}

export default function FaqV2({ content }: FaqV2Props) {
  const { title, description, items = [] } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      dir="rtl"
      className="py-20 px-6 lg:px-8 bg-[var(--site-bg)]"
      style={{ fontFamily: "var(--site-font)" }}
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          {title && (
            <RenderedContent
              html={title}
              as="h2"
              className="text-2xl md:text-3xl lg:text-4xl font-bold"
            />
          )}
        </div>

        <div className="divide-y divide-[var(--site-border)]">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="py-2">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full py-4 flex items-center justify-between gap-4 text-right"
                >
                  <RenderedContent
                    html={item.question}
                    className={cn(
                      "flex-1 text-base font-medium",
                      isOpen ? "text-[var(--site-primary)]" : ""
                    )}
                  />
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 transition-transform text-[var(--site-text-muted)]",
                      isOpen ? "rotate-180 text-[var(--site-primary)]" : ""
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="pb-4 pr-6">
                    <RenderedContent
                      html={item.answer}
                      className="text-sm leading-8 text-[var(--site-text-muted)]"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}