"use client";

import { RenderedContent } from "@/components/ui/rendered-content";

interface TimelineV2Props {
  content: {
    title?: string;
    description?: string;
    steps?: {
      number?: number;
      title?: string;
      description?: string;
      image?: string;
    }[];
  };
}

export default function TimelineV2({ content }: TimelineV2Props) {
  const { title, description, steps = [] } = content;

  return (
    <section
      dir="rtl"
      className="py-20 px-6 lg:px-8 bg-[var(--site-bg)]"
      style={{ fontFamily: "var(--site-font)" }}
    >
      <div className="max-w-6xl mx-auto space-y-16">
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

        {/* زیگزاگ عمودی */}
        <div className="relative">
          {/* خط وسط */}
          <div
            className="absolute right-1/2 translate-x-1/2 top-0 bottom-0 w-1 hidden lg:block"
            style={{ backgroundColor: "var(--site-border)" }}
          />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, i) => {
              const isRight = i % 2 === 0; // زوج → راست، فرد → چپ

              return (
                <div
                  key={i}
                  className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  {/* شماره وسط */}
                  <div
                    className="hidden lg:flex absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 size-14 rounded-full items-center justify-center font-bold text-xl z-10"
                    style={{
                      backgroundColor: "var(--site-primary)",
                      color: "#FFFFFF",
                      border: "4px solid rgb(24, 24, 27)",
                      boxShadow: "0 4px 0 0 rgb(24, 24, 27)",
                    }}
                  >
                    {step.number || i + 1}
                  </div>

                  {/* محتوای راست */}
                  <div
                    className={`${
                      isRight ? "lg:order-1 lg:pl-16" : "lg:order-2 lg:pr-16"
                    } lg:text-right`}
                  >
                    <div
                      className="p-6 rounded-3xl border-2"
                      style={{
                        backgroundColor: "var(--site-bg-muted)",
                        borderColor: "rgb(24, 24, 27)",
                        boxShadow: "0 4px 0 0 rgba(26,26,26,1)",
                      }}
                    >
                      <div className="flex items-center gap-3 justify-end mb-3">
                        {/* شماره موبایل */}
                        <span
                          className="lg:hidden size-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                          style={{
                            backgroundColor: "var(--site-primary)",
                            color: "#FFFFFF",
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
                    </div>
                  </div>

                  {/* تصویر / فضای خالی */}
                  <div
                    className={`${
                      isRight ? "lg:order-2 lg:pr-16" : "lg:order-1 lg:pl-16"
                    } flex justify-center`}
                  >
                    {step.image ? (
                      <img
                        src={step.image}
                        alt=""
                        className="w-full max-w-xs h-auto object-contain rounded-2xl"
                      />
                    ) : (
                      <div className="hidden lg:block" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}