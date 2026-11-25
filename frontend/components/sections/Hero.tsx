'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Code2, Database, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getServiceIcon } from '@/lib/content';
import { cn } from '@/lib/utils';
import type { HomeDashboard } from '@/lib/types';

const particles = [
  { left: '8%', top: '22%', delay: '0s', size: 5 },
  { left: '18%', top: '72%', delay: '-2s', size: 3 },
  { left: '48%', top: '12%', delay: '-5s', size: 4 },
  { left: '82%', top: '18%', delay: '-1s', size: 3 },
  { left: '91%', top: '64%', delay: '-4s', size: 5 },
  { left: '72%', top: '86%', delay: '-7s', size: 3 },
];

export function Hero({ dashboard }: { dashboard: HomeDashboard }) {
  const { content, services } = dashboard;
  const reduceMotion = useReducedMotion();
  const featuredServices = services.filter((service) => service.featured).slice(0, 3);
  const visualServices = (featuredServices.length ? featuredServices : services).slice(0, 3);
  const firstStat = content.stats[0];

  return (
    <section className="relative isolate overflow-hidden bg-hero-gradient text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]" />
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 size-[520px] rounded-full bg-lavender-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 size-[580px] rounded-full bg-primary/15 blur-[130px]" />

      {particles.map((particle, index) => (
        <span
          key={index}
          className={cn(
            'pointer-events-none absolute -z-10 rounded-full bg-lavender-200/70 blur-[1px]',
            !reduceMotion && 'animate-drift',
          )}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="container grid min-h-[calc(100svh-76px)] items-center gap-14 py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-10 lg:py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl"
        >
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-medium tracking-wide text-lavender-100 backdrop-blur-md">
            <Sparkles className="size-3.5 text-lavender-300" />
            {content.eyebrow}
          </div>
          <h1 className="text-balance text-[2.65rem] font-semibold leading-[1.12] tracking-[-0.045em] sm:text-6xl lg:text-[4.3rem] xl:text-[4.8rem]">
            {content.headline}
            <span className="mt-2 block bg-gradient-to-r from-lavender-200 via-white to-lavender-300 bg-clip-text text-transparent">
              {content.highlightedHeadline}
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-pretty text-base leading-8 text-white/65 sm:text-lg sm:leading-9">
            {content.subheadline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-navy-950 hover:bg-lavender-100">
              <Link href={content.primaryCtaHref}>
                {content.primaryCtaLabel}
                <ArrowUpRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/[0.04] text-white hover:border-white/35 hover:bg-white/10"
            >
              <Link href={content.secondaryCtaHref}>{content.secondaryCtaLabel}</Link>
            </Button>
          </div>
          <a
            href="#company"
            className="mt-12 hidden w-fit items-center gap-3 text-xs tracking-wide text-white/40 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-300 sm:flex"
          >
            <span className="grid size-9 place-items-center rounded-full border border-white/15">
              <ArrowDown className="size-3.5" />
            </span>
            向下探索
          </a>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden w-full max-w-[560px] lg:block"
          aria-hidden="true"
        >
          <div className="relative aspect-square">
            <div className="absolute inset-[7%] rounded-full border border-white/[0.07]" />
            <div
              className={cn(
                'absolute inset-[18%] rounded-full border border-dashed border-lavender-300/20',
                !reduceMotion && 'animate-orbit-slow',
              )}
            />
            <div className="absolute inset-[31%] rounded-full border border-white/10 bg-white/[0.025] backdrop-blur-sm" />
            <div className="absolute inset-0 rounded-full bg-radial-violet blur-2xl" />

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2.2rem] border border-white/20 bg-white/10 shadow-glow backdrop-blur-xl"
            >
              <div className="grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-lavender-300/30 to-primary/20">
                <Image src="/logo-mark.svg" alt="" width={58} height={58} />
              </div>
            </motion.div>

            {visualServices.map((service, index) => {
              const Icon = getServiceIcon(service.icon);
              const positions = [
                'left-[5%] top-[16%]',
                'right-[1%] top-[44%]',
                'bottom-[8%] left-[18%]',
              ];
              return (
                <motion.div
                  key={service.id}
                  animate={reduceMotion ? undefined : { y: [0, index % 2 ? 9 : -9, 0] }}
                  transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }}
                  className={cn(
                    'absolute w-44 rounded-2xl border border-white/15 bg-navy-900/65 p-4 shadow-xl backdrop-blur-xl',
                    positions[index],
                  )}
                >
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/25 text-lavender-200">
                    <Icon className="size-4" />
                  </span>
                  <p className="mt-3 line-clamp-1 text-sm font-medium text-white/90">
                    {service.title}
                  </p>
                  <p className="mt-1 line-clamp-1 text-[11px] text-white/40">
                    {service.shortDescription}
                  </p>
                </motion.div>
              );
            })}

            {firstStat && (
              <div className="absolute bottom-[4%] right-[3%] w-48 rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <span className="line-clamp-1 text-[11px] text-white/50">{firstStat.label}</span>
                  <Code2 className="size-4 shrink-0 text-lavender-300" />
                </div>
                <p className="mt-3 text-3xl font-semibold tracking-tight">{firstStat.value}</p>
                <div className="mt-4 flex h-8 items-end gap-1.5" aria-hidden="true">
                  {[35, 55, 42, 70, 62, 84, 74, 95].map((height, index) => (
                    <span
                      key={index}
                      className="flex-1 rounded-t bg-lavender-300/50"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {visualServices[0] && (
              <div className="absolute left-[2%] top-[47%] flex max-w-40 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/50 backdrop-blur-md">
                <ShieldCheck className="size-3.5 shrink-0 text-lavender-300" />
                <span className="truncate">
                  {visualServices[0].capabilities[0] ?? visualServices[0].title}
                </span>
              </div>
            )}
            {visualServices[1] && (
              <div className="absolute right-[16%] top-[7%] flex max-w-40 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-white/50 backdrop-blur-md">
                <Database className="size-3.5 shrink-0 text-lavender-300" />
                <span className="truncate">
                  {visualServices[1].capabilities[0] ?? visualServices[1].title}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
