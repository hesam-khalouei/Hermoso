"use client";

interface ThemePreviewProps {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    textMuted: string;
    background: string;
    border: string;
  };
  fontFamily: string;
  radius: string;
}

export function ThemePreview({
  colors,
  fontFamily,
  radius,
}: ThemePreviewProps) {
  return (
    <div
      className="rounded-2xl border-2 overflow-hidden"
      style={{ borderColor: colors.border }}
    >
      {/* هدر شبیه‌سازی */}
      <div
        className="p-3 flex items-center justify-between border-b"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.border,
        }}
      >
        <div className="flex gap-2">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: colors.border }}
          />
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: colors.border }}
          />
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: colors.border }}
          />
        </div>
        <div
          className="text-xs font-mono"
          style={{ color: colors.textMuted }}
        >
          preview.hermoso.app
        </div>
      </div>

      {/* محتوای شبیه‌سازی */}
      <div
        className="p-6 space-y-4"
        style={{
          backgroundColor: colors.background,
          fontFamily: fontFamily,
          color: colors.text,
        }}
      >
        {/* تیتر */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold" style={{ color: colors.text }}>
            آغاز طرح{" "}
            <span style={{ color: colors.primary }}>اعتبار</span> پوشاک
          </h3>
          <p className="text-xs" style={{ color: colors.textMuted }}>
            این یک متن نمونه برای پیش‌نمایش است
          </p>
        </div>

        {/* دکمه‌ها */}
        <div className="flex gap-2 justify-center">
          <button
            className="px-4 py-2 text-sm font-semibold"
            style={{
              backgroundColor: colors.primary,
              color: colors.text,
              borderRadius: radius,
              border: `2px solid ${colors.text}`,
              boxShadow: `0 2px 0 0 ${colors.text}`,
            }}
          >
            دکمه اصلی
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold"
            style={{
              backgroundColor: colors.background,
              color: colors.text,
              borderRadius: radius,
              border: `2px solid ${colors.text}`,
              boxShadow: `0 2px 0 0 ${colors.text}`,
            }}
          >
            دکمه دوم
          </button>
        </div>

        {/* کارت‌ها */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-3 text-center"
              style={{
                backgroundColor:
                  i === 2 ? colors.secondary : `${colors.border}40`,
                borderRadius: radius,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="text-xs font-semibold">آیتم {i}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}