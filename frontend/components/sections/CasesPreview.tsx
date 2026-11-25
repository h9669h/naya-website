import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiState } from '@/components/shared/ApiState';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { CaseStudy } from '@/lib/types';
import { CaseGrid } from './CaseGrid';

export function CasesPreview({ items }: { items: CaseStudy[] }) {
  const featured = items.filter((item) => item.featured).slice(0, 3);
  const cases = featured.length >= 3 ? featured : items.slice(0, 3);

  return (
    <section className="border-y border-border/50 bg-muted/25 py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Selected Work"
            title="项目案例"
            description={cases[0]?.summary}
            action={
              <Button asChild variant="outline">
                <Link href="/cases">
                  浏览全部案例
                  <ArrowUpRight />
                </Link>
              </Button>
            }
          />
        </Reveal>
        <ApiState
          state={{ loading: false, error: null, retry: () => undefined }}
          empty={cases.length === 0}
          emptyTitle="案例内容准备中"
        >
          <CaseGrid items={cases} />
        </ApiState>
      </div>
    </section>
  );
}
