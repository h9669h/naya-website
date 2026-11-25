import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/shared/Reveal';
import type { HomeContent } from '@/lib/types';

export function ContactCta({ content }: { content: HomeContent }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-hero-gradient px-6 py-14 text-white shadow-lift sm:px-12 sm:py-16 lg:px-16">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_25%,rgba(166,129,255,.3),transparent_38%),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:auto,48px_48px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-20 -z-10 size-80 rounded-full border border-white/10" />
            <div className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-lavender-300">
                  {content.eyebrow}
                </p>
                <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  {content.introTitle}
                </h2>
                <p className="mt-5 text-pretty text-sm leading-7 text-white/65 sm:text-base">
                  {content.subheadline}
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
                <Button asChild size="lg" className="bg-white text-navy-950 hover:bg-lavender-100">
                  <Link href="/contact">
                    联系我们
                    <ArrowUpRight />
                  </Link>
                </Button>
                {content.contactInfo.email && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                  >
                    <a href={`mailto:${content.contactInfo.email}`}>
                      发送邮件
                      <ArrowRight />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
