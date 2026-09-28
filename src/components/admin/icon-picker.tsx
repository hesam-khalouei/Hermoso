"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const commonIcons = [
  "Star", "Heart", "Shield", "Zap", "Award", "Gift",
  "Phone", "Mail", "MapPin", "Globe", "Link", "Share2",
  "User", "Users", "Building", "Briefcase", "ShoppingBag", "ShoppingCart",
  "CreditCard", "Wallet", "Receipt", "Tag", "Package", "Truck",
  "Clock", "Calendar", "Timer", "CheckCircle", "XCircle", "AlertCircle",
  "Info", "HelpCircle", "MessageCircle", "MessageSquare", "Send", "Bell",
  "Search", "Filter", "Settings", "Sliders", "BarChart", "TrendingUp",
  "Home", "File", "FileText", "Folder", "Image", "Video",
  "Smartphone", "Tablet", "Laptop", "Monitor", "Wifi", "Bluetooth",
  "Sun", "Moon", "Cloud", "Umbrella", "Leaf", "Flower",
  "Coffee", "Pizza", "Apple", "Carrot",
  "Instagram", "Twitter", "Facebook", "Linkedin", "Youtube", "Github",
  "Chrome", "Firefox", "Slack",
];

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [search, setSearch] = useState("");

  const filtered = commonIcons.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  function renderIcon(name: string) {
    const IconComponent = (Icons as any)[name];
    if (!IconComponent) return null;
    return <IconComponent className="size-5" />;
  }

  return (
    <div className="space-y-3">
      <Input
        placeholder="جستجوی آیکن..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-8 gap-1.5 max-h-64 overflow-y-auto p-1">
        {filtered.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            title={name}
            className={cn(
              "aspect-square rounded-lg border-2 flex items-center justify-center transition",
              value === name
                ? "border-primary bg-primary/10 text-primary"
                : "border-transparent hover:bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {renderIcon(name)}
          </button>
        ))}
      </div>
      {value && (
        <div className="text-xs text-muted-foreground flex items-center gap-2 pt-2 border-t">
          انتخاب‌شده:
          <span className="font-mono bg-secondary px-2 py-0.5 rounded text-foreground">
            {value}
          </span>
        </div>
      )}
    </div>
  );
}

// ═══════ کامپوننت رندر آیکن ═══════
interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) {
    return <Icons.HelpCircle className={className} />;
  }
  return <IconComponent className={className} />;
}