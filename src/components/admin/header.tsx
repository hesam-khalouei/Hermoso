"use client";

import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
  title?: string;
}

export function Header({ user, title }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-10">
      {/* عنوان صفحه */}
      <div>
        {title && (
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        )}
      </div>

      {/* جستجو */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="جستجو..."
            className="pr-10 bg-secondary border-0"
          />
        </div>
      </div>

      {/* اکشن‌ها */}
      <div className="flex items-center gap-3">
        {/* نوتیفیکیشن */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="اعلان‌ها"
        >
          <Bell className="size-5" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive" />
        </Button>

        {/* پروفایل */}
        <div className="flex items-center gap-3 pr-3 border-r">
          <div className="text-left hidden sm:block">
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">
              {user.role === "ADMIN" ? "مدیر" : "ویرایشگر"}
            </div>
          </div>
          <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <User className="size-5" />
          </div>
        </div>
      </div>
    </header>
  );
}