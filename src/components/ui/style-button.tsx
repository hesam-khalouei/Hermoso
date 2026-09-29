"use client";

import { DynamicIcon } from "@/components/admin/icon-picker";
import { sizeToCss } from "@/components/admin/size-field";

interface StyleButtonProps {
  text: string;
  link: string;
  style?: "primary" | "secondary" | "outline";
  icon?: string;
  size?: any;
  fontSize?: any;
  paddingX?: any;
  // رنگ‌ها می‌تونن از theme بیان
  primaryColor?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  forceTextColor?: string; // برای override
}

export function StyleButton({
  text,
  link,
  style = "primary",
  icon,
  size,
  fontSize,
  paddingX,
  primaryColor,
  bgColor,
  textColor,
  borderColor,
  forceTextColor,
}: StyleButtonProps) {
  const height = sizeToCss(size, "48px");
  const textSize = sizeToCss(fontSize, "14px");
  const px = sizeToCss(paddingX, "24px");

  // رنگ‌ها بر اساس style
  const finalBg =
    bgColor ||
    (style === "primary"
      ? primaryColor || "var(--site-primary)"
      : "var(--site-bg)");

  const finalTextColor =
    forceTextColor || textColor || (style === "primary" ? "#FFFFFF" : "var(--site-text)");

  return (
    <a
      href={link || "#"}
      className="inline-flex items-center justify-center gap-2 font-semibold transition-all hover:-translate-y-0.5"
      style={{
        backgroundColor: finalBg,
        color: finalTextColor,
        height: height,
        paddingLeft: px,
        paddingRight: px,
        fontSize: textSize,
        borderRadius: "var(--site-radius)",
        boxShadow: "0 2px 0 0 rgb(24, 24, 27)",
        border: `2px solid ${borderColor || "rgb(24, 24, 27)"}`,
      }}
    >
      {icon && <DynamicIcon name={icon} className="size-4" />}
      <span
        dangerouslySetInnerHTML={{
          __html: String(text || "").replace(/<[^>]*>/g, ""),
        }}
      />
    </a>
  );
}