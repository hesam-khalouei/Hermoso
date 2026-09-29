"use client";

import { RenderedContent } from "@/components/ui/rendered-content";
import { StyleButton } from "@/components/ui/style-button";
import { sizeToCss } from "@/components/admin/size-field";

interface CtaV2Props {
  content: {
    title?: string;
    description?: string;
    button_text?: string;
    button_link?: string;
    button_size?: any;
    image?: string;
    image_size?: any;
  };
}

export default function CtaV2({ content }: CtaV2Props) {
  const {
    title,
    description,
    button_text,
    button_link,
    button_size,
    image,
    image_size,
  } = content;

  const imgSize = sizeToCss(image_size, "400px");

  return (
    <section
      dir="rtl"
      className="py-16 px-6 lg:px-8"
      style={{ fontFamily: "var(--site-font)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center"
          style={{ backgroundColor: "var(--site-primary)" }}
        >
          {/* متن */}
          <div className="p-10 lg:p-14 text-right space-y-6">
            {title && (
              <RenderedContent
                html={title}
                as="h2"
                className="text-2xl md:text-3xl lg:text-4xl font-bold [&_*]:!text-white"
              />
            )}
            {description && (
              <RenderedContent
                html={description}
                className="text-base lg:text-lg leading-8 [&_*]:!text-white/90"
              />
            )}
            {button_text && (
              <div className="pt-2">
                <StyleButton
                  text={button_text}
                  link={button_link || "#"}
                  style="secondary"
                  size={button_size}
                  bgColor="#FFFFFF"
                  forceTextColor="#18181B"
                />
              </div>
            )}
          </div>

          {/* تصویر */}
          <div className="flex justify-center items-center p-6">
            {image ? (
              <img
                src={image}
                alt=""
                className="w-full h-auto object-contain"
                style={{ maxWidth: imgSize }}
              />
            ) : (
              <div
                className="aspect-square rounded-2xl flex items-center justify-center bg-white/10"
                style={{ maxWidth: imgSize, width: "100%" }}
              >
                <div className="text-sm text-white/60">
                  تصویر را از پنل آپلود کنید
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}