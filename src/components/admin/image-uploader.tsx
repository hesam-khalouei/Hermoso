"use client";

import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  Link as LinkIcon,
  Trash2,
} from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  siteId?: string;
  label?: string;
}

export function ImageUploader({
  value,
  onChange,
  siteId,
  label,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      if (siteId) formData.append("siteId", siteId);

      try {
        const progressInterval = setInterval(() => {
          setProgress((p) => Math.min(p + 10, 90));
        }, 100);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        clearInterval(progressInterval);
        setProgress(100);

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "خطا در آپلود");
          return;
        }

        onChange(data.url);
        toast.success("تصویر آپلود شد");
      } catch (error) {
        toast.error("خطا در آپلود");
      } finally {
        setTimeout(() => {
          setUploading(false);
          setProgress(0);
        }, 300);
      }
    },
    [siteId, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setUrlInput("");
    setShowUrlInput(false);
    toast.success("آدرس تصویر اضافه شد");
  };

  // حالت ۱: تصویر داریم
  if (value) {
    return (
      <div className="space-y-2">
        <div className="relative group rounded-xl border-2 border-dashed overflow-hidden bg-secondary/30">
          <div className="aspect-video flex items-center justify-center p-4">
            <img
              src={value}
              alt="پیش‌نمایش"
              className="max-h-full max-w-full object-contain rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3Eخطا در بارگذاری%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>

          <div className="absolute top-2 left-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="size-8 rounded-lg bg-card border shadow-lg flex items-center justify-center hover:bg-secondary transition"
              title="تغییر تصویر"
            >
              <Upload className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="size-8 rounded-lg bg-destructive text-destructive-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition"
              title="حذف تصویر"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>

        <div
          className="text-[10px] text-muted-foreground font-mono truncate px-1"
          dir="ltr"
        >
          {value}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    );
  }

  // حالت ۲: آپلود در حال انجام
  if (uploading) {
    return (
      <div className="rounded-xl border-2 border-dashed p-8 bg-secondary/30">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 text-primary animate-spin" />
          <div className="text-sm font-medium">در حال آپلود...</div>
          <div className="w-full max-w-xs h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground">{progress}%</div>
        </div>
      </div>
    );
  }

  // حالت ۳: URL دستی
  if (showUrlInput) {
    return (
      <div className="space-y-2">
        <div className="rounded-xl border-2 border-dashed p-4 bg-secondary/30 space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <LinkIcon className="size-4" />
            <span className="font-medium">افزودن از URL</span>
          </div>
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.png"
            dir="ltr"
            className="text-left font-mono text-xs"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleUrlSubmit();
              }
            }}
            autoFocus
          />
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleUrlSubmit}
              size="sm"
              className="gap-2"
            >
              افزودن
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setShowUrlInput(false);
                setUrlInput("");
              }}
            >
              انصراف
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // حالت ۴: خالی (Drag & Drop)
  return (
    <div className="space-y-2">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition",
          dragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-secondary/30"
        )}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <ImageIcon className="size-6" />
          </div>
          <div>
            <div className="text-sm font-medium mb-1">
              {dragging ? "فایل رو رها کن" : "تصویر رو بکش و اینجا رها کن"}
            </div>
            <div className="text-xs text-muted-foreground">
              یا کلیک کن برای انتخاب
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground">
            JPG, PNG, WebP, GIF, SVG — حداکثر ۵ مگابایت
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowUrlInput(true)}
        className="w-full text-xs text-muted-foreground hover:text-primary transition flex items-center justify-center gap-1.5 py-2"
      >
        <LinkIcon className="size-3.5" />
        یا آدرس URL تصویر رو وارد کن
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}