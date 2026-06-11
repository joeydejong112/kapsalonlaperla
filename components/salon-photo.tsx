"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import manifest from "@/lib/salon-images.json";

interface SalonImage {
  file: string;
  sourceUrl: string;
  bytes?: number;
}

const photos = manifest as SalonImage[];

interface SalonPhotoProps {
  /** Index into the scraped-photo manifest (wraps around) */
  index: number;
  alt: string;
  /** Rendered when no photos have been downloaded yet */
  fallback: ReactNode;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  imgClassName?: string;
}

/**
 * Renders a real salon photo from public/images (downloaded by
 * scripts/fetch-images.mjs) inside a `relative` parent, falling back to the
 * styled gradient placeholder until photos exist.
 */
export function SalonPhoto({
  index,
  alt,
  fallback,
  priority = false,
  quality = 90,
  sizes = "100vw",
  imgClassName = "object-cover",
}: SalonPhotoProps) {
  if (photos.length === 0) return <>{fallback}</>;

  const photo = photos[index % photos.length];

  return (
    <Image
      src={photo.file}
      alt={alt}
      fill
      priority={priority}
      quality={quality}
      sizes={sizes}
      className={imgClassName}
    />
  );
}
