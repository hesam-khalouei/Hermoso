"use client";

import { DynamicIcon } from "@/components/admin/icon-picker";
import { sizeToCss } from "@/components/admin/size-field";

interface SizeButtonProps {
  text: string;
  link: string;
  style?: string;
  icon?: string;
  size?: any;
  fontSize?: any;
  paddingX?: any;
  radius?: number;
}

export function SizeButton({
  text,
  link,
  style = "primary",
  icon,
  size,
  fontSize,
  paddingX,
  radius,
}: SizeButtonProps) {
  const height = sizeToCss(size, "48px");
  const textSize = sizeToCss(fontSize, "14px");
  const px = sizeToCss(paddingX, "24px");

  const bgColor =
    style === "primary"
      ? "var(--site-primary)"
      : style === "secondary"
      ? "var(--site-bg)"
      : "transparent";

  const textColor =
    style === "primary" ? "#FFFFFF" : "var(--site-text)";

  return (
    <a
      href={link || "#"}
      className="inline-flex items-center justify-center gap-2 font-semibold transition-all hover:-translate-y-0.5"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        height: height,
        paddingLeft: px,
        paddingRight: px,
        fontSize: textSize,
        borderRadius: radius ? `${radius}px` : "var(--site-radius)",
        boxShadow: "0 2px 0 0 rgb(24, 24, 27)",
        border: "2px solid rgb(24, 24, 27)",
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