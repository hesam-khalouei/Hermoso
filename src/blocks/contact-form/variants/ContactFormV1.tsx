"use client";

import { useState } from "react";
import { RenderedContent } from "@/components/ui/rendered-content";

interface ContactFormV1Props {
  content: {
    title?: string;
    description?: string;
    success_message?: string;
    fields?: {
      name: string;
      label: string;
      type: string;
      required?: boolean;
    }[];
  };
}

export default function ContactFormV1({ content }: ContactFormV1Props) {
  const { title, description, success_message, fields = [] } = content;
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }

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

        {submitted ? (
          <div className="rounded-3xl p-10 bg-[var(--site-primary)]/10 border border-[var(--site-primary)]/30 text-center">
            <div className="text-[var(--site-primary)] text-lg font-bold">
              {success_message || "پیام شما با موفقیت ارسال شد"}
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[var(--site-border)] p-8 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field, i) => (
                <div
                  key={i}
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <label className="block text-sm font-medium text-[var(--site-text)] mb-2 text-right">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 mr-1">*</span>
                    )}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      required={field.required}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full rounded-xl border border-[var(--site-border)] bg-[var(--site-bg)] px-4 py-3 text-sm text-right focus:outline-none focus:border-[var(--site-primary)]"
                    />
                  ) : (
                    <input
                      type={field.type}
                      required={field.required}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]: e.target.value,
                        })
                      }
                      dir={field.type === "tel" || field.type === "email" ? "ltr" : "rtl"}
                      className="w-full rounded-xl border border-[var(--site-border)] bg-[var(--site-bg)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--site-primary)]"
                      style={{
                        textAlign:
                          field.type === "tel" || field.type === "email"
                            ? "left"
                            : "right",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--site-primary)",
                color: "#FFFFFF",
                boxShadow: "0 2px 0 0 rgb(24, 24, 27)",
                border: "2px solid rgb(24, 24, 27)",
              }}
            >
              ارسال پیام
            </button>
          </form>
        )}
      </div>
    </section>
  );
}