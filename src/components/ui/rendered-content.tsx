import { cn } from "@/lib/utils";

interface RenderedContentProps {
  html: string;
  className?: string;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "p";
}

/**
 * کامپوننت رندر محتوای HTML از ادیتور
 * استایل‌های پایه رو اعمال می‌کنه و دارک‌مود رو پشتیبانی می‌کنه
 */
export function RenderedContent({
  html,
  className,
  as: Component = "div",
}: RenderedContentProps) {
  if (!html) return null;

  return (
    <Component
      className={cn(
        // استایل‌های پایه برای محتوای ادیتور
        "rendered-content",
        "[&_p]:m-0 [&_p]:leading-8",
        "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:my-2",
        "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:my-2",
        "[&_h3]:text-xl [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:my-2",
        "[&_ul]:list-disc [&_ul]:pr-6 [&_ul]:my-2",
        "[&_ol]:list-decimal [&_ol]:pr-6 [&_ol]:my-2",
        "[&_li]:leading-7",
        "[&_a]:text-primary [&_a]:underline [&_a]:cursor-pointer",
        "[&_strong]:font-bold",
        "[&_em]:italic",
        "[&_u]:underline",
        "[&_s]:line-through",
        "[&_br]:leading-8",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}