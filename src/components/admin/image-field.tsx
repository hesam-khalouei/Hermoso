"use client";

import { ImageUploader } from "./image-uploader";

interface ImageFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  siteId?: string;
}

export function ImageField({
  value,
  onChange,
  label,
  siteId,
}: ImageFieldProps) {
  return (
    <ImageUploader
      value={value}
      onChange={onChange}
      siteId={siteId}
      label={label}
    />
  );
}