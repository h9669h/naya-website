import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

export function isRenderableImage(src: string | undefined): src is string {
  if (!src) return false;
  if (src.startsWith('/')) return true;
  try {
    const url = new URL(src);
    return (
      url.protocol === 'https:' &&
      (url.hostname === 'picsum.photos' || url.hostname === 'images.picsum.photos')
    );
  } catch {
    return false;
  }
}
