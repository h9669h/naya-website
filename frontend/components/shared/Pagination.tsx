'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PaginationMeta } from '@/lib/types';

type PageItem = number | 'ellipsis-left' | 'ellipsis-right';

function getPageItems(page: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  const valid = [...pages].filter((item) => item >= 1 && item <= totalPages).sort((a, b) => a - b);
  const result: PageItem[] = [];
  valid.forEach((item, index) => {
    const previous = valid[index - 1];
    if (previous && item - previous > 1) {
      result.push(item - previous === 2 ? previous + 1 : `ellipsis-${item % 2 ? 'left' : 'right'}`);
    }
    result.push(item);
  });
  return result;
}

interface PaginationProps {
  meta: PaginationMeta;
  onChange: (page: number) => void;
}

export function Pagination({ meta, onChange }: PaginationProps) {
  const pages = getPageItems(meta.page, meta.totalPages);

  return (
    <nav aria-label="文章分页" className="mt-12 flex flex-col items-center gap-5">
      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => onChange(meta.page - 1)}
          disabled={!meta.hasPreviousPage}
          aria-label="上一页"
        >
          <ChevronLeft />
        </Button>
        {pages.map((item, index) =>
          typeof item === 'number' ? (
            <Button
              key={item}
              type="button"
              variant={item === meta.page ? 'default' : 'ghost'}
              size="icon"
              className={cn('rounded-full text-sm', item !== meta.page && 'text-muted-foreground')}
              onClick={() => onChange(item)}
              aria-label={`第 ${item} 页`}
              aria-current={item === meta.page ? 'page' : undefined}
            >
              {item}
            </Button>
          ) : (
            <span
              key={`${item}-${index}`}
              className="grid size-9 place-items-center text-sm text-muted-foreground"
            >
              …
            </span>
          ),
        )}
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => onChange(meta.page + 1)}
          disabled={!meta.hasNextPage}
          aria-label="下一页"
        >
          <ChevronRight />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground" aria-live="polite">
        第 {meta.page} / {meta.totalPages} 页 · 共 {meta.total} 篇文章
      </p>
    </nav>
  );
}
