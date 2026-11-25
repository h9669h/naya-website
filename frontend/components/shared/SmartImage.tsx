'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SmartImageProps {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function SmartImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  priority = false,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  return (
    <div
      className={cn('relative overflow-hidden bg-muted', className)}
      role={failed ? 'img' : undefined}
      aria-label={failed ? alt : undefined}
    >
      {src && !failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn('object-cover transition duration-700', imageClassName)}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-navy-800 via-primary/25 to-lavender-300/30 text-muted-foreground">
          <ImageIcon className="size-10 opacity-40" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
