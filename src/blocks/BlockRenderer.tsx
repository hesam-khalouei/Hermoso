import { getBlock } from "./registry";
import HeaderRenderer from "./header/renderer";

interface BlockRendererProps {
  blockType: string;
  variant: string;
  content: Record<string, any>;
  styles?: Record<string, any>;
}

// ═══════════════════════════════════════
// نگاشت بلاک‌ها به کامپوننت‌هایشان
// ═══════════════════════════════════════
const blockComponents: Record<
  string,
  React.ComponentType<{ variant: string; content: Record<string, any> }>
> = {
  header: HeaderRenderer,
  // بقیه بلاک‌ها رو یکی یکی اضافه می‌کنیم:
  // hero: HeroRenderer,
  // intro: IntroRenderer,
  // timeline: TimelineRenderer,
  // ...
};

export function BlockRenderer({
  blockType,
  variant,
  content,
  styles,
}: BlockRendererProps) {
  const definition = getBlock(blockType);
  if (!definition) {
    return (
      <div className="p-8 bg-destructive/10 text-destructive text-center text-sm rounded-lg">
        بلاک «{blockType}» پیدا نشد
      </div>
    );
  }

  const Component = blockComponents[blockType];

  // اگه کامپوننت واقعی رو ساختیم
  if (Component) {
    return <Component variant={variant} content={content} />;
  }

  // پلیس‌هولدر برای بلاک‌هایی که هنوز ساخته نشدن
  return (
    <div className="py-12 px-6 bg-secondary/50 text-center border-2 border-dashed rounded-xl">
      <div className="text-sm font-medium mb-2">
        بلاک: {definition.label}
      </div>
      <div className="text-xs text-muted-foreground mb-4">
        واریانت: {variant} — (به‌زودی ساخته می‌شود)
      </div>
      <pre
        className="text-[10px] text-left bg-white p-4 rounded-lg overflow-auto max-h-40"
        dir="ltr"
      >
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
}