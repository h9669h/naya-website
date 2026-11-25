'use client';

import { useState } from 'react';
import { CaseDialog } from '@/components/shared/CaseDialog';
import { Reveal } from '@/components/shared/Reveal';
import type { CaseStudy } from '@/lib/types';
import { CaseCard } from './CaseCard';

export function CaseGrid({ items }: { items: CaseStudy[] }) {
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={(index % 3) * 0.07} className="h-full">
            <CaseCard item={item} onOpen={() => setSelected(item)} />
          </Reveal>
        ))}
      </div>
      <CaseDialog item={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </>
  );
}
