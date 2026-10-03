"use client";

import { useState } from "react";
import { RenderedContent } from "@/components/ui/rendered-content";
import { sizeToCss } from "@/components/admin/size-field";

interface TimelineV3Props {
  content: {
    title?: string;
    description?: string;
    image?: string;
    image_size?: any;
    steps?: {
      number?: number;
      title?: string;
      description?: string;
      image?: string;
    }[];
  };
}

export default function TimelineV3({ content }: TimelineV3Props) {
  const { title, description, image, image_size, steps = [] } = content;
  const [activeIndex, setActiveIndex] = useState(0);

  const imgSize = sizeToCss(image_size, "260px");
  const activeStep = steps[activeIndex];

  return (
    <section
      dir="rtl"
      className="py-20 px-6 lg:px-8 bg-[var(--site-bg-muted)]"
      style={{ fontFamily: "var(--site-font)" }}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* هدر */}
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

        {/* تب‌بندی */}
        <div className="relative">
          {/* خط پشت تب‌ها */}
          <div
            className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2"
            style={{ backgroundColor: "var(--site-border)" }}
          />

          {/* تب‌ها */}
          <div className="relative flex justify-between items-center gap-2">
            {steps.map((step, i) => {
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div
                    className="size-10 lg:size-12 rounded-full flex items-center justify-center font-bold text-sm lg:text-lg transition-all shrink-0"
                    style={{
                      backgroundColor: isActive
                        ? "var(--site-primary)"
                        : isPast
                        ? "var(--site-primary)"
                        : "var(--site-bg)",
                      color: isActive || isPast ? "#FFFFFF" : "var(--site-text-muted)",
                      border: `3px solid ${
                        isActive
                          ? "rgb(24, 24, 27)"
                          : "var(--site-border)"
                      }`,
                      boxShadow: isActive
                        ? "0 3px 0 0 rgb(24, 24, 27)"
                        : "none",
                    }}
                  >
                    {step.number || i + 1}
                  </div>
                  {step.title && (
                    <div
                      className="text-xs lg:text-sm font-medium text-center hidden lg:block"
                      style={{
                        color: isActive
                          ? "var(--site-primary)"
                          : "var(--site-text-muted)",
                      }}
                    >
                      {String(step.title).replace(/<[^>]*>/g, "").substring(0, 30)}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* محتوای تب فعال */}
        {activeStep && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[var(--site-bg)] rounded-3xl p-8 lg:p-12 border-2 border-[var(--site-text)] shadow-[0_4px_0_0_rgba(26,26,26,1)]">
            {/* تصویر */}
            <div className="flex justify-center order-2 lg:order-1">
              {activeStep.image || image ? (
                <img
                  src={activeStep.image || image}
                  alt=""
                  className="w-auto h-auto object-contain rounded-3xl"
                  style={{ width: imgSize }}
                />
              ) : (
                <div
                  className="aspect-[9/19] rounded-3xl flex items-center justify-center border-2 border-dashed border-[var(--site-border)]"
                  style={{ width: imgSize }}
                >
                  <div className="text-sm text-[var(--site-text-muted)] text-center px-4">
                    تصویر را از پنل آپلود کنید
                  </div>
                </div>
              )}
            </div>

            {/* متن */}
            <div className="text-right space-y-4 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2">
                <span
                  className="size-8 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{
                    backgroundColor: "var(--site-primary)",
                    color: "#FFFFFF",
                  }}
                >
                  {activeStep.number || activeIndex + 1}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--site-primary)" }}
                >
                  مرحله {(activeStep.number || activeIndex + 1).toLocaleString("fa-IR")}
                </span>
              </div>

              {activeStep.title && (
                <RenderedContent
                  html={activeStep.title}
                  as="h3"
                  className="text-xl lg:text-2xl font-bold"
                />
              )}

              {activeStep.description && (
                <RenderedContent
                  html={activeStep.description}
                  className="text-base leading-8 text-[var(--site-text-muted)]"
                />
              )}

              {/* دکمه‌های ناوبری */}
              <div className="flex gap-2 pt-4 justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev > 0 ? prev - 1 : steps.length - 1
                    )
                  }
                  className="size-10 rounded-full border-2 flex items-center justify-center transition-all hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "var(--site-bg)",
                    borderColor: "rgb(24, 24, 27)",
                    boxShadow: "0 2px 0 0 rgb(24, 24, 27)",
                  }}
                  title="مرحله قبل"
                >
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    style={{ color: "var(--site-text)" }}
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev < steps.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="size-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "var(--site-primary)",
                    border: "2px solid rgb(24, 24, 27)",
                    boxShadow: "0 2px 0 0 rgb(24, 24, 27)",
                  }}
                  title="مرحله بعد"
                >
                  <svg
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    style={{ color: "#FFFFFF" }}
                  >
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}