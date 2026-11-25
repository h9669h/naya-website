'use client';

import { Eye, Target } from 'lucide-react';
import { useHomeDashboard } from '@/components/shared/ContentProvider';
import { api } from '@/lib/api';
import { useRemoteData } from '@/lib/use-remote-data';
import { unique } from '@/lib/utils';
import { ApiState } from '@/components/shared/ApiState';
import { Reveal } from '@/components/shared/Reveal';
import { Badge } from '@/components/ui/badge';
import { ContactCta } from '@/components/sections/ContactCta';
import { PageHero } from '@/components/sections/PageHero';
import { TeamGrid } from '@/components/sections/TeamGrid';

export default function TeamPage() {
  const home = useHomeDashboard();
  const team = useRemoteData((signal) => api.getTeam(signal));
  const members = [...(team.data ?? [])].sort((a, b) => a.order - b.order);
  const expertise = unique(members.flatMap((member) => member.expertise)).slice(0, 10);
  const content = home.data?.content;

  return (
    <>
      <PageHero eyebrow="Our Team" title="团队与文化" description={content?.introBody} />
      <section className="py-20 lg:py-28">
        <div className="container">
          <ApiState state={team} empty={members.length === 0} emptyTitle="团队信息准备中">
            <TeamGrid members={members} />
          </ApiState>
        </div>
      </section>

      {content && (
        <section className="border-y border-border/50 bg-muted/25 py-20 lg:py-24">
          <div className="container">
            <Reveal>
              <div className="relative isolate overflow-hidden rounded-[2rem] bg-hero-gradient p-7 text-white sm:p-10 lg:p-14">
                <div className="pointer-events-none absolute -right-20 -top-24 -z-10 size-80 rounded-full bg-primary/25 blur-3xl" />
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-lavender-300">
                  Culture & Values
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight">共同的方向</h2>
                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-sm">
                    <Target className="size-5 text-lavender-300" />
                    <h3 className="mt-5 text-sm font-semibold">使命</h3>
                    <p className="mt-3 text-sm leading-7 text-white/65">{content.mission}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-sm">
                    <Eye className="size-5 text-lavender-300" />
                    <h3 className="mt-5 text-sm font-semibold">愿景</h3>
                    <p className="mt-3 text-sm leading-7 text-white/65">{content.vision}</p>
                  </div>
                </div>
                {expertise.length > 0 && (
                  <div className="mt-10 border-t border-white/10 pt-8">
                    <p className="text-xs text-white/45">专业领域</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {expertise.map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="border-white/15 bg-white/5 px-3 py-1.5 text-white/70"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}
      {content && <ContactCta content={content} />}
    </>
  );
}
