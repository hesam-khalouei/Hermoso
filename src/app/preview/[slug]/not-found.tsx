import Link from "next/link";

export default function NotFound() {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center bg-background p-8"
    >
      <div className="text-center space-y-6 max-w-md">
        <div className="text-8xl font-bold text-primary">۴۰۴</div>
        <h1 className="text-2xl font-bold text-foreground">
          صفحه مورد نظر پیدا نشد
        </h1>
        <p className="text-muted-foreground text-sm leading-7">
          سایتی که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}