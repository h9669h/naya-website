import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiState } from '@/components/shared/ApiState';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { Service } from '@/lib/types';
import { ServiceGrid } from './ServiceGrid';

export function ServicesPreview({ services }: { services: Service[] }) {
  const featured = services.filter((service) => service.featured).slice(0, 6);
  const items = featured.length >= 3 ? featured : services.slice(0, 6);

  return (
    <section className="border-y border-border/50 bg-muted/25 py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="服务"
            description={items[0]?.shortDescription}
            action={
              <Button asChild variant="outline">
                <Link href="/services">
                  查看全部服务
                  <ArrowUpRight />
                </Link>
              </Button>
            }
          />
        </Reveal>
        <ApiState
          state={{ loading: false, error: null, retry: () => undefined }}
          empty={items.length === 0}
          emptyTitle="服务内容准备中"
        >
          <ServiceGrid services={items} />
        </ApiState>
      </div>
    </section>
  );
}
