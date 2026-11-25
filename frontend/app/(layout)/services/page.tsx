'use client';

import { useHomeDashboard } from '@/components/shared/ContentProvider';
import { api } from '@/lib/api';
import { useRemoteData } from '@/lib/use-remote-data';
import { ApiState } from '@/components/shared/ApiState';
import { ContactCta } from '@/components/sections/ContactCta';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceGrid } from '@/components/sections/ServiceGrid';

export default function ServicesPage() {
  const home = useHomeDashboard();
  const services = useRemoteData((signal) => api.getServices(signal));
  const items = [...(services.data ?? [])].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="服务与解决方案"
        description={home.data?.content.subheadline}
      />
      <section className="py-20 lg:py-28">
        <div className="container">
          <ApiState
            state={services}
            empty={items.length === 0}
            emptyTitle="服务内容准备中"
            emptyDescription="我们正在整理服务信息，您也可以通过联系页直接咨询。"
            loading={
              <div className="grid gap-6 lg:grid-cols-2" aria-busy="true">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="h-96 animate-pulse rounded-3xl bg-muted/60" />
                ))}
              </div>
            }
          >
            <ServiceGrid services={items} detailed />
          </ApiState>
        </div>
      </section>
      {home.data && <ContactCta content={home.data.content} />}
    </>
  );
}
