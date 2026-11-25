'use client';

import { useMemo, useState } from 'react';
import { useHomeDashboard } from '@/components/shared/ContentProvider';
import { api } from '@/lib/api';
import { useRemoteData } from '@/lib/use-remote-data';
import { unique } from '@/lib/utils';
import { ApiState } from '@/components/shared/ApiState';
import { Button } from '@/components/ui/button';
import { CaseGrid } from '@/components/sections/CaseGrid';
import { ContactCta } from '@/components/sections/ContactCta';
import { PageHero } from '@/components/sections/PageHero';

export default function CasesPage() {
  const home = useHomeDashboard();
  const cases = useRemoteData((signal) => api.getCases(signal));
  const [industry, setIndustry] = useState('');
  const items = [...(cases.data ?? [])].sort((a, b) => a.order - b.order);
  const industries = useMemo(() => unique(items.map((item) => item.industry)), [items]);
  const filtered = industry ? items.filter((item) => item.industry === industry) : items;

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="项目案例"
        description={home.data?.content.subheadline}
      />
      <section className="py-16 lg:py-24">
        <div className="container">
          <ApiState
            state={cases}
            empty={items.length === 0}
            emptyTitle="案例内容准备中"
            emptyDescription="案例更新后会在这里展示。"
          >
            <>
              <div className="mb-10 flex flex-col gap-5 border-b border-border/70 pb-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2" aria-label="按行业筛选案例">
                  <Button
                    type="button"
                    size="sm"
                    variant={industry === '' ? 'default' : 'outline'}
                    onClick={() => setIndustry('')}
                    aria-pressed={industry === ''}
                  >
                    全部
                  </Button>
                  {industries.map((item) => (
                    <Button
                      key={item}
                      type="button"
                      size="sm"
                      variant={industry === item ? 'default' : 'outline'}
                      onClick={() => setIndustry(item)}
                      aria-pressed={industry === item}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground" aria-live="polite">
                  共 {filtered.length} 个案例
                </p>
              </div>
              <ApiState
                state={{ loading: false, error: null, retry: () => undefined }}
                empty={filtered.length === 0}
                emptyTitle="该行业暂无案例"
                emptyDescription="可以切换其他行业继续浏览。"
              >
                <CaseGrid items={filtered} />
              </ApiState>
            </>
          </ApiState>
        </div>
      </section>
      {home.data && <ContactCta content={home.data.content} />}
    </>
  );
}
