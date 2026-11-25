import { Reveal } from '@/components/shared/Reveal';
import type { TeamMember } from '@/lib/types';
import { TeamCard } from './TeamCard';

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member, index) => (
        <Reveal key={member.id} delay={(index % 4) * 0.06} className="h-full">
          <TeamCard member={member} />
        </Reveal>
      ))}
    </div>
  );
}
