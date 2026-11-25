import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SmartImage } from '@/components/shared/SmartImage';
import { getIcon } from '@/lib/content';
import type { TeamMember } from '@/lib/types';

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Card className="group h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
      <SmartImage
        src={member.avatar}
        alt={`${member.name}，${member.role}`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="aspect-[4/4.35]"
        imageClassName="group-hover:scale-[1.03]"
      />
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold tracking-tight">{member.name}</h3>
        <p className="mt-1.5 text-sm font-medium text-primary">{member.role}</p>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">{member.bio}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {member.expertise.map((expertise) => (
            <Badge key={expertise} variant="muted">
              {expertise}
            </Badge>
          ))}
        </div>
        {member.socialLinks.length > 0 && (
          <div className="mt-6 flex gap-2 border-t border-border/60 pt-5">
            {member.socialLinks.map((social) => {
              const Icon = getIcon(social.icon);
              return (
                <a
                  key={`${social.label}-${social.href}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}：${social.label}`}
                  title={social.label}
                  className="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground transition hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
