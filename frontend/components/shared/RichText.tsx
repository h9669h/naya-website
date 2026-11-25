'use client';

import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { isRenderableImage } from '@/lib/utils';

function safeHref(href: string | undefined): string {
  return href && /^(https?:\/\/|mailto:|\/|#)/i.test(href) ? href : '#';
}

const components: Components = {
  a: ({ href, children }) => {
    const target = safeHref(href);
    if (target.startsWith('/') || target.startsWith('#')) {
      return (
        <Link href={target} className="font-medium text-primary underline underline-offset-4">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={target}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-4"
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) =>
    typeof src === 'string' && isRenderableImage(src) ? (
      <span className="relative my-8 block aspect-video overflow-hidden rounded-2xl bg-muted">
        <Image src={src} alt={alt ?? ''} fill sizes="(max-width: 768px) 100vw, 768px" />
      </span>
    ) : null,
  table: ({ children }) => (
    <div className="my-7 overflow-x-auto rounded-xl border border-border">
      <table>{children}</table>
    </div>
  ),
};

export function RichText({ content, className = '' }: { content: string; className?: string }) {
  return (
    <div className={`prose-nova ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
