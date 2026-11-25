'use client';

import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SmartImage } from './SmartImage';
import type { CaseStudy } from '@/lib/types';

interface CaseDialogProps {
  item: CaseStudy | null;
  onOpenChange: (open: boolean) => void;
}

export function CaseDialog({ item, onOpenChange }: CaseDialogProps) {
  return (
    <Dialog open={item !== null} onOpenChange={onOpenChange}>
      <DialogContent
        title={item?.title ?? '案例详情'}
        description={item ? `${item.client} · ${item.industry} · ${item.year}` : undefined}
        className="max-w-4xl"
      >
        {item && (
          <div className="space-y-8">
            <SmartImage
              src={item.coverImage}
              alt={`${item.title}项目封面`}
              sizes="(max-width: 768px) 100vw, 896px"
              className="aspect-[16/8] rounded-2xl"
            />
            <div className="pb-2 sm:pb-3">
              <div className="flex flex-wrap gap-2">
                {item.techStack.map((technology) => (
                  <Badge key={technology} variant="muted">
                    {technology}
                  </Badge>
                ))}
              </div>
              <p className="mt-6 whitespace-pre-line text-base leading-8 text-muted-foreground">
                {item.description}
              </p>

              {item.highlights.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-base font-semibold">项目亮点</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-sm leading-6">
                        <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.results.length > 0 && (
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {item.results.map((result) => (
                    <div key={result.label} className="rounded-2xl bg-muted/60 p-5">
                      <p className="text-2xl font-semibold tracking-tight text-primary">
                        {result.value}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">{result.label}</p>
                    </div>
                  ))}
                </div>
              )}

              <Button asChild className="mt-8">
                <a href={`/contact?subject=${encodeURIComponent(item.title)}`}>
                  咨询类似项目
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
