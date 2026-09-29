"use client";

import { DynamicIcon } from "@/components/admin/icon-picker";
import { RenderedContent } from "@/components/ui/rendered-content";
import { sizeToCss } from "@/components/admin/size-field";

interface FooterV2Props {
  content: {
    logo?: string;
    logo_size?: any;
    about_text?: string;
    copyright?: string;
    social_size?: any;
    socials?: { icon: string; link: string }[];
    contacts?: { icon: string; label: string; value: string }[];
  };
}

export default function FooterV2({ content }: FooterV2Props) {
  const {
    logo = "",
    logo_size,
    about_text = "",
    copyright = "",
    social_size,
    socials = [],
    contacts = [],
  } = content;

  const logoSz = sizeToCss(logo_size, "40px");
  const socialSz = sizeToCss(social_size, "32px");

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col gap-4 text-right md:order-2">
            <h4 className="text-white text-base font-bold">سوالی دارید؟</h4>
            <RenderedContent
              html={about_text}
              className="text-white/40 text-sm leading-7 [&_*]:!text-inherit"
            />
          </div>

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

        <div className="h-px bg-white/10 my-6" />

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
                  className="rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "#27292C",
                    width: socialSz,
                    height: socialSz,
                  }}
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