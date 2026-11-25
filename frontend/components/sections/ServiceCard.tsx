import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SmartImage } from '@/components/shared/SmartImage';
import { getServiceIcon } from '@/lib/content';
import type { Service } from '@/lib/types';

export function ServiceCard({
  service,
  detailed = false,
}: {
  service: Service;
  detailed?: boolean;
}) {
  const Icon = getServiceIcon(service.icon);

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
      {detailed && (
        <SmartImage
          src={service.coverImage}
          alt={`${service.title}服务封面`}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="aspect-[16/7]"
          imageClassName="group-hover:scale-[1.03]"
        />
      )}
      <CardContent className={`flex h-full flex-col ${detailed ? 'p-7 sm:p-9' : 'p-7'}`}>
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-[3.25rem] shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-6" />
          </span>
          {service.featured && <Badge variant="muted">重点服务</Badge>}
        </div>
        <h3 className="mt-6 text-xl font-semibold tracking-tight">{service.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {detailed ? service.description : service.shortDescription}
        </p>

        {detailed && service.capabilities.length > 0 && (
          <div className="mt-7">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              服务能力
            </h4>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-2.5 text-sm leading-6">
                  <Check className="mt-1 size-3.5 shrink-0 text-primary" />
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        )}

        {detailed && service.deliverables.length > 0 && (
          <div className="mt-7 rounded-2xl bg-muted/50 p-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              交付内容
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {service.deliverables.map((deliverable) => (
                <Badge key={deliverable} variant="outline" className="bg-background/60">
                  {deliverable}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Link
          href={`/contact?subject=${encodeURIComponent(service.title)}`}
          className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-medium text-primary underline-offset-4 transition hover:gap-3 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          咨询此服务
          <ArrowUpRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
