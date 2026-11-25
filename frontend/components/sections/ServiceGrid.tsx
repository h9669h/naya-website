import { Reveal } from '@/components/shared/Reveal';
import type { Service } from '@/lib/types';
import { ServiceCard } from './ServiceCard';

export function ServiceGrid({
  services,
  detailed = false,
}: {
  services: Service[];
  detailed?: boolean;
}) {
  return (
    <div className={`grid gap-6 ${detailed ? 'lg:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
      {services.map((service, index) => (
        <Reveal key={service.id} delay={(index % 3) * 0.07} className="h-full">
          <ServiceCard service={service} detailed={detailed} />
        </Reveal>
      ))}
    </div>
  );
}
