import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiState } from '@/components/shared/ApiState';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { TeamMember } from '@/lib/types';
import { TeamGrid } from './TeamGrid';

export function TeamPreview({ members }: { members: TeamMember[] }) {
  const featured = members.filter((member) => member.featured).slice(0, 4);
  const team = featured.length >= 4 ? featured : members.slice(0, 4);

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Our People"
            title="团队成员"
            description={team[0]?.bio}
            action={
              <Button asChild variant="outline">
                <Link href="/team">
                  认识团队
                  <ArrowUpRight />
                </Link>
              </Button>
            }
          />
        </Reveal>
        <ApiState
          state={{ loading: false, error: null, retry: () => undefined }}
          empty={team.length === 0}
          emptyTitle="团队信息准备中"
        >
          <TeamGrid members={team} />
        </ApiState>
      </div>
    </section>
  );
}
