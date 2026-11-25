import Link from 'next/link';
import { useId } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/shared/Reveal';
import type { HomeContent } from '@/lib/types';

export function ContactCta({ content }: { content: HomeContent }) {
  const beamId1 = useId();
  const beamId2 = useId();

  return (
    <section className="py-20 lg:py-28">
      <style>{`
        .beam-a {
          /* 亮段22，空白78，短光带，和示例一致 */
          stroke-dasharray: 22 78;
          stroke-dashoffset: 0;
          animation: beam-run-a 7s linear infinite;
          filter: drop-shadow(0 0 4px rgba(166, 129, 255, 0.9));
        }
        .beam-b {
          stroke-dasharray: 22 78;
          /* 偏移半圈，刚好对角，一前一后，永远碰不到 */
          stroke-dashoffset: -50;
          animation: beam-run-b 7s linear infinite;
          filter: drop-shadow(0 0 4px rgba(181, 243, 255, 0.85));
        }

        @keyframes beam-run-a {
        from {
      stroke-dashoffset: 0;
    }
          to {
            stroke-dashoffset: -100;
          }
        }

         /* 第二条流光：始终比第一条错开 50 */
  @keyframes beam-run-b {
    from {
      stroke-dashoffset: -50;
    }

    to {
      stroke-dashoffset: -150;
    }
  }

        @media (prefers-reduced-motion: reduce) {
          .beam-a, .beam-b {
            animation: none;
          }
        }
      `}</style>
      <div className="container">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-hero-gradient px-6 py-14 text-white shadow-lift sm:px-12 sm:py-16 lg:px-16">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_25%,rgba(166,129,255,.3),transparent_38%),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:auto,48px_48px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-20 -z-10 size-80 rounded-full border border-white/10" />
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full"
              fill="none"
            >
              <defs>
                <linearGradient id={beamId1} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor="#8b5cf6" />
                  <stop offset="45%" stopColor="#c3a8ff" />
                  <stop offset="100%" stopColor="#b5f3ff" />
                </linearGradient>
                <linearGradient id={beamId2} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor="#b5f3ff" />
                  <stop offset="45%" stopColor="#c3a8ff" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              {/* 第一条流光 */}
              <rect
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="31"
                pathLength="100"
                stroke={`url(#${beamId1})`}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="beam-a"
              />
              {/* 第二条流光，天生对角错开，同方向追赶，永不相撞 */}
              <rect
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="31"
                pathLength="100"
                stroke={`url(#${beamId2})`}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="beam-b"
              />
            </svg>
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
                    <ArrowUpRight className="ml-1" />
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
                      <ArrowRight className="ml-1" />
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
