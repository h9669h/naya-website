import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getServiceIcon } from '@/lib/content';
import type { HomeContent, Service } from '@/lib/types';

interface CapabilityItem {
  id: string;
  title: string;
  context: string;
  icon: string;
}

export function Advantages({ content, services }: { content: HomeContent; services: Service[] }) {
  const capabilities: CapabilityItem[] = services
    .flatMap((service) => {
      const entries = service.capabilities.length
        ? service.capabilities.map((capability) => ({ title: capability, context: service.title }))
        : [{ title: service.shortDescription, context: service.title }];
      return entries.map((entry) => ({
        id: `${service.id}-${entry.title}`,
        title: entry.title,
        context: entry.context,
        icon: service.icon,
      }));
    })
    .slice(0, 6);

  if (capabilities.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Core Capabilities"
            title="核心能力"
            description={content.subheadline}
            align="center"
          />
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border/70 bg-border sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => {
            const Icon = getServiceIcon(capability.icon);
            return (
              <Reveal key={capability.id} delay={(index % 3) * 0.05} className="h-full">
                <div className="group relative h-full bg-card p-7 transition hover:bg-primary/[0.035] sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs font-medium tabular-nums text-muted-foreground/50">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-7 text-lg font-semibold leading-7">{capability.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">
                    {capability.context}
                  </p>
                  <ArrowUpRight className="absolute bottom-7 right-7 size-4 text-primary opacity-0 transition group-hover:opacity-100" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
