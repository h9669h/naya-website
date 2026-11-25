import { Compass, Eye, Target } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import type { HomeContent } from '@/lib/types';

export function CompanyIntro({ content }: { content: HomeContent }) {
  return (
    <section id="company" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="relative mx-auto aspect-[4/4.2] w-full max-w-lg overflow-hidden rounded-[2rem] border border-border/60 bg-muted/30 p-7 sm:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/.5)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(black,transparent_75%)]" />
              <div className="absolute -right-24 -top-24 size-72 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Nova Corp
                  </span>
                  <span className="rounded-full border border-border bg-background/70 px-3 py-1 text-[10px] text-muted-foreground">
                    Company profile
                  </span>
                </div>
                <div className="relative mx-auto my-8 grid size-44 place-items-center rounded-full border border-primary/20 sm:size-52">
                  <div className="absolute inset-5 rounded-full border border-dashed border-primary/25" />
                  <div className="absolute inset-10 rounded-full bg-gradient-to-br from-primary/15 to-lavender-200/20 blur-md" />
                  <div className="relative grid size-24 place-items-center rounded-3xl bg-gradient-to-br from-navy-800 to-primary text-white shadow-glow">
                    <span className="text-4xl font-semibold tracking-tight">N</span>
                  </div>
                  <span className="absolute -left-3 top-1/2 size-3 rounded-full bg-primary shadow-[0_0_0_6px_hsl(var(--background))]" />
                  <span className="absolute right-4 top-4 size-2 rounded-full bg-lavender-400" />
                </div>
                <p className="text-balance text-center text-lg font-medium leading-8 text-foreground/80">
                  {content.highlightedHeadline}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              关于 Nova
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-[2.8rem] lg:leading-[1.16]">
              {content.introTitle}
            </h2>
            <p className="mt-6 whitespace-pre-line text-base leading-8 text-muted-foreground">
              {content.introBody}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
                <Target className="size-5 text-primary" />
                <h3 className="mt-5 text-sm font-semibold">我们的使命</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{content.mission}</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
                <Eye className="size-5 text-primary" />
                <h3 className="mt-5 text-sm font-semibold">我们的愿景</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{content.vision}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {content.stats.length > 0 && (
          <Reveal delay={0.12}>
            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/70 bg-border lg:grid-cols-4">
              {content.stats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="bg-card px-5 py-8 text-center sm:px-8 sm:py-10">
                  <p className="text-3xl font-semibold tracking-[-0.04em] text-primary sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <div className="mt-8 flex justify-center gap-2 text-primary/50" aria-hidden="true">
          <Compass className="size-4" />
          <span className="h-px w-12 bg-primary/20" />
        </div>
      </div>
    </section>
  );
}
