"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("hermoso-theme") as
      | "light"
      | "dark"
      | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("hermoso-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }

  if (!mounted) {
    return <div className="size-9 rounded-lg" />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="size-9 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors relative overflow-hidden"
      aria-label="تغییر تم"
      title={theme === "dark" ? "تم روشن" : "تم تاریک"}
    >
      <Sun
        className={`size-5 absolute transition-all duration-300 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
      <Moon
        className={`size-5 absolute transition-all duration-300 ${
          theme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}