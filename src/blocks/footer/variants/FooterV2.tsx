"use client";

import { DynamicIcon } from "@/components/admin/icon-picker";
import { RenderedContent } from "@/components/ui/rendered-content";

interface FooterV2Props {
  content: {
    logo?: string;
    about_text?: string;
    copyright?: string;
    socials?: { icon: string; link: string }[];
    contacts?: { icon: string; label: string; value: string }[];
  };
}

export default function FooterV2({ content }: FooterV2Props) {
  const {
    logo = "",
    about_text = "",
    copyright = "",
    socials = [],
    contacts = [],
  } = content;

  return (
    <footer
      dir="rtl"
      className="w-full"
      style={{
        backgroundColor: "#18181B",
        fontFamily: "var(--site-font)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* بالا: ۲ ستونه */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* چپ: اطلاعات تماس */}
          <div className="flex flex-col gap-4 text-right md:order-2">
            <h4 className="text-white text-base font-bold">سوالی دارید؟</h4>
            <RenderedContent
              html={about_text}
              className="text-white/40 text-sm leading-7 [&_*]:!text-inherit"
            />
          </div>

          {/* راست: تماس‌ها */}
          <div className="grid grid-cols-2 gap-4 md:order-1">
            {contacts.slice(0, 2).map((contact, i) => (
              <div key={i} className="text-right space-y-2">
                <div
                  className="size-9 rounded-full flex items-center justify-center mr-auto"
                  style={{ backgroundColor: "#27272A" }}
                >
                  <DynamicIcon
                    name={contact.icon}
                    className="size-4 text-white"
                  />
                </div>
                <RenderedContent
                  html={contact.label || ""}
                  className="text-white text-sm font-semibold [&_*]:!text-inherit"
                />
                <RenderedContent
                  html={contact.value || ""}
                  className="text-white/40 text-xs [&_*]:!text-inherit"
                />
              </div>
            ))}
          </div>
        </div>

        {/* خط جدا */}
        <div className="h-px bg-white/10 my-6" />

        {/* پایین: کپی‌رایت + شبکه‌ها */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <RenderedContent
            html={copyright}
            className="text-white/30 text-xs [&_*]:!text-inherit"
          />

          {socials.length > 0 && (
            <div className="flex gap-2">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#27292C" }}
                >
                  <DynamicIcon
                    name={social.icon}
                    className="size-4 text-white"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}