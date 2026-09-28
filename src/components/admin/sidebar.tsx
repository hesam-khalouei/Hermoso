"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Globe,
  Palette,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  LogOut,
  Users,
} from "lucide-react";

const menuItems = [
  {
    title: "داشبورد",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "سایت‌ها",
    href: "/sites",
    icon: Globe,
  },
  {
    title: "تم‌ها",
    href: "/themes",
    icon: Palette,
  },
  {
    title: "رسانه‌ها",
    href: "/media",
    icon: ImageIcon,
  },
  {
    title: "پیام‌ها",
    href: "/submissions",
    icon: MessageSquare,
  },
];

const bottomItems = [
  {
    title: "کاربران",
    href: "/users",
    icon: Users,
  },
  {
    title: "تنظیمات",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <aside className="w-64 h-screen bg-card border-l flex flex-col sticky top-0">
      {/* لوگو */}
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-xl font-bold">ه</span>
          </div>
          <div>
            <div className="font-bold text-base leading-tight">هرموسو</div>
            <div className="text-[11px] text-muted-foreground">
              پنل مدیریت محتوا
            </div>
          </div>
        </Link>
      </div>

      {/* منوی اصلی */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wider">
          مدیریت محتوا
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="size-[18px] shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}

        <div className="text-[11px] font-semibold text-muted-foreground px-3 py-2 pt-6 uppercase tracking-wider">
          سیستم
        </div>
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="size-[18px] shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* خروج */}
      <div className="p-3 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
        >
          <LogOut className="size-[18px] shrink-0" />
          <span>خروج از حساب</span>
        </button>
      </div>
    </aside>
  );
}