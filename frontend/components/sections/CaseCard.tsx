import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SmartImage } from '@/components/shared/SmartImage';
import type { CaseStudy } from '@/lib/types';

export function CaseCard({ item, onOpen }: { item: CaseStudy; onOpen: () => void }) {
  return (
    <Card className="group h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
      <button
        type="button"
        onClick={onOpen}
        className="block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        aria-label={`查看案例：${item.title}`}
      >
        <SmartImage
          src={item.coverImage}
          alt={`${item.title}案例封面`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="aspect-[16/10]"
          imageClassName="group-hover:scale-[1.04]"
        />
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
            <span>{item.client}</span>
            <span>
              {item.industry} · {item.year}
            </span>
          </div>
          <div className="mt-4 flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold leading-snug tracking-tight transition group-hover:text-primary">
              {item.title}
            </h3>
            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-border transition group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
            {item.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.techStack.slice(0, 4).map((technology) => (
              <Badge key={technology} variant="muted">
                {technology}
              </Badge>
            ))}
          </div>
        </div>
      </button>
    </Card>
  );
}
