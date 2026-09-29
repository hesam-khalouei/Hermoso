"use client";

import { useState } from "react";
import { RenderedContent } from "@/components/ui/rendered-content";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqV1Props {
  content: {
    title?: string;
    description?: string;
    items?: {
      question: string;
      answer: string;
    }[];
  };
}

export default function FaqV1({ content }: FaqV1Props) {
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
          {description && (
            <RenderedContent
              html={description}
              className="text-base lg:text-lg leading-8 text-[var(--site-text-muted)]"
            />
          )}
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-3xl border-2 transition-all"
                style={{
                  backgroundColor: isOpen
                    ? "var(--site-primary)"
                    : "var(--site-bg)",
                  borderColor: isOpen
                    ? "rgb(24, 24, 27)"
                    : "var(--site-border)",
                  boxShadow: isOpen
                    ? "0 2px 0 0 rgb(24, 24, 27)"
                    : "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-right"
                >
                  <RenderedContent
                    html={item.question}
                    className={cn(
                      "flex-1 text-lg font-semibold",
                      isOpen ? "[&_*]:!text-white" : ""
                    )}
                  />
                  <div
                    className={cn(
                      "size-8 rounded-full flex items-center justify-center shrink-0 transition-transform",
                      isOpen ? "rotate-180" : ""
                    )}
                    style={{
                      backgroundColor: isOpen
                        ? "rgba(255,255,255,0.2)"
                        : "var(--site-bg-muted)",
                    }}
                  >
                    <ChevronDown
                      className={cn(
                        "size-4",
                        isOpen ? "text-white" : "text-[var(--site-text)]"
                      )}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0">
                    <RenderedContent
                      html={item.answer}
                      className="text-sm leading-8 [&_*]:!text-white/90"
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