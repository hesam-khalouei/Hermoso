"use client";

import { DynamicIcon } from "@/components/admin/icon-picker";
import { RenderedContent } from "@/components/ui/rendered-content";
import { sizeToCss } from "@/components/admin/size-field";

interface FooterV1Props {
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

export default function FooterV1({ content }: FooterV1Props) {
  const {
    logo = "",
    logo_size,
    about_text = "",
    copyright = "",
    social_size,
    socials = [],
    contacts = [],
  } = content;

  const logoSz = sizeToCss(logo_size, "48px");
  const socialSz = sizeToCss(social_size, "40px");

  return (
    <footer
      dir="rtl"
      className="w-full"
      style={{
        backgroundColor: "#18181B",
        fontFamily: "var(--site-font)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* ستون ۱: شبکه‌های اجتماعی */}
          <div className="space-y-4 text-right">
            <h4 className="text-white text-base font-bold">شبکه‌های اجتماعی</h4>
            {socials.length > 0 ? (
              <div className="flex gap-3 justify-end">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: "#27272A",
                      width: socialSz,
                      height: socialSz,
                    }}
                  >
                    <DynamicIcon
                      name={social.icon}
                      className="size-5 text-white"
                    />
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-white/30 text-sm">
                آیکن‌ها را از پنل اضافه کنید
              </div>
            )}
          </div>

          {/* ستون ۲: راه‌های ارتباطی */}
          <div className="space-y-4 text-right">
            <h4 className="text-white text-base font-bold">راه‌های ارتباطی</h4>
            <div className="space-y-3">
              {contacts.length > 0 ? (
                contacts.map((contact, i) => (
                  <div key={i} className="flex items-center gap-2 justify-end">
                    <RenderedContent
                      html={contact.value || ""}
                      className="text-white/40 text-sm [&_*]:!text-inherit"
                    />
                    <div
                      className="size-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "#27272A" }}
                    >
                      <DynamicIcon
                        name={contact.icon}
                        className="size-4 text-white"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-white/30 text-sm">
                  اطلاعات تماس را از پنل اضافه کنید
                </div>
              )}
            </div>
          </div>

          {/* ستون ۳: درباره */}
          <div className="space-y-4 text-right">
            {logo ? (
              <img
                src={logo}
                alt="لوگو"
                className="w-auto object-contain mr-auto"
                style={{ height: logoSz }}
              />
            ) : (
              <div
                className="rounded-lg flex items-center justify-center text-white text-sm font-bold mr-auto"
                style={{
                  backgroundColor: "var(--site-primary)",
                  height: logoSz,
                  width: `calc(${logoSz} * 2.4)`,
                }}
              >
                لوگو
              </div>
            )}
            <RenderedContent
              html={about_text}
              className="text-white/40 text-sm leading-7 [&_*]:!text-inherit"
            />
          </div>
        </div>

        <div className="my-8 h-px bg-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <RenderedContent
            html={copyright}
            className="text-white/40 text-xs [&_*]:!text-inherit"
          />
          <div className="text-white/30 text-xs">
            ساخته‌شده با ❤️ در هرموسو
          </div>
        </div>
      </div>
    </footer>
  );
}