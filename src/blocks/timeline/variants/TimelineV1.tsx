"use client";

import { useState } from "react";
import { RenderedContent } from "@/components/ui/rendered-content";
import { sizeToCss } from "@/components/admin/size-field";

interface TimelineV1Props {
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

export default function TimelineV1({ content }: TimelineV1Props) {
  const { title, description, image, image_size, steps = [] } = content;
  const [activeIndex, setActiveIndex] = useState(0);

  const imgSize = sizeToCss(image_size, "260px");
  const activeStep = steps[activeIndex];

  return (
    <section
      dir="rtl"
      className="py-20 px-6 lg:px-8 bg-[var(--site-bg)]"
      style={{ fontFamily: "var(--site-font)" }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
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

        {/* محتوا */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          {/* ستون راست: تصویر موبایل */}
          <div className="flex justify-center lg:justify-end items-center order-2 lg:order-1">
            {image ? (
              <img
                src={image}
                alt=""
                className="w-auto h-auto object-contain rounded-3xl shadow-2xl"
                style={{ width: imgSize }}
              />
            ) : (
              <div
                className="aspect-[9/19] rounded-3xl flex items-center justify-center border-2 border-dashed border-[var(--site-border)]"
                style={{ width: imgSize }}
              >
                <div className="text-sm text-[var(--site-text-muted)] text-center px-4">
                  تصویر موبایل را از پنل آپلود کنید
                </div>
              </div>
            )}
          </div>

          {/* وسط: خط عمودی + شماره‌ها */}
          <div className="hidden lg:flex flex-col items-center gap-8 order-2">
            {steps.map((step, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`size-12 rounded-full flex items-center justify-center font-bold text-lg transition-all shrink-0 ${
                    isActive ? "scale-110" : "opacity-50 hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor: isActive
                      ? "var(--site-primary)"
                      : "var(--site-bg-muted)",
                    color: isActive
                      ? "#FFFFFF"
                      : "var(--site-text-muted)",
                    border: isActive
                      ? "3px solid rgb(24, 24, 27)"
                      : "1px solid var(--site-border)",
                  }}
                >
                  {step.number || i + 1}
                </button>
              );
            })}
          </div>

          {/* ستون چپ: کارت‌های مراحل */}
          <div className="space-y-4 order-1 lg:order-3">
            {steps.map((step, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="w-full text-right p-6 rounded-3xl border-2 transition-all"
                  style={{
                    backgroundColor: isActive
                      ? "var(--site-bg-muted)"
                      : "var(--site-bg)",
                    borderColor: isActive
                      ? "rgb(24, 24, 27)"
                      : "var(--site-border)",
                    boxShadow: isActive
                      ? "0 2px 0 0 rgb(24, 24, 27)"
                      : "none",
                  }}
                >
                  <div className="flex items-center gap-3 justify-end mb-3">
                    {/* شماره برای موبایل */}
                    <span
                      className="lg:hidden size-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                      style={{
                        backgroundColor: isActive
                          ? "var(--site-primary)"
                          : "var(--site-bg-muted)",
                        color: isActive
                          ? "#FFFFFF"
                          : "var(--site-text-muted)",
                      }}
                    >
                      {step.number || i + 1}
                    </span>
                    {step.title && (
                      <RenderedContent
                        html={step.title}
                        as="h3"
                        className="text-lg font-bold"
                      />
                    )}
                  </div>
                  {step.description && (
                    <RenderedContent
                      html={step.description}
                      className="text-sm leading-7 text-[var(--site-text-muted)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}