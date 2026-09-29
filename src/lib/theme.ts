import { CSSProperties } from "react";

interface ThemeData {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textMuted: string;
  background: string;
  border: string;
  radius: string;
  fontFamily: string;
}

/**
 * تبدیل اطلاعات تم به CSS Variables
 * این variables روی container اصلی سایت اعمال میشن
 */
export function themeToCssVars(theme: ThemeData | null): CSSProperties {
  if (!theme) {
    // پیش‌فرض‌ها اگه تم نبود
    return {
      "--site-primary": "#6366F1",
      "--site-secondary": "#F59E0B",
      "--site-accent": "#06B6D4",
      "--site-text": "#18181B",
      "--site-text-muted": "#71717A",
      "--site-bg": "#FFFFFF",
      "--site-bg-muted": "#F8FAFC",
      "--site-border": "#E4E4E7",
      "--site-radius": "16px",
      "--site-font": "IRANYekanX",
    } as CSSProperties;
  }

  return {
    "--site-primary": theme.primary,
    "--site-secondary": theme.secondary,
    "--site-accent": theme.accent,
    "--site-text": theme.text,
    "--site-text-muted": theme.textMuted,
    "--site-bg": theme.background,
    "--site-bg-muted": `${theme.background}F0`,
    "--site-border": theme.border,
    "--site-radius": theme.radius,
    "--site-font": theme.fontFamily,
  } as CSSProperties;
}