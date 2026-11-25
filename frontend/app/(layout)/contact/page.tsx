'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  Building2,
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
} from 'lucide-react';
import { useHomeDashboard } from '@/components/shared/ContentProvider';
import { ApiState } from '@/components/shared/ApiState';
import { ContactForm } from '@/components/shared/ContactForm';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/sections/PageHero';
import type { ContactInfo } from '@/lib/types';

function ContactDetails({ info }: { info: ContactInfo }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <a
        href={`mailto:${info.email}`}
        className="group rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition hover:border-primary/30 hover:shadow-lift"
      >
        <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <Mail className="size-5" />
        </span>
        <p className="mt-5 text-xs text-muted-foreground">电子邮箱</p>
        <p className="mt-1.5 break-all text-sm font-medium transition group-hover:text-primary">
          {info.email}
        </p>
      </a>
      <a
        href={`tel:${info.phone}`}
        className="group rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition hover:border-primary/30 hover:shadow-lift"
      >
        <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <Phone className="size-5" />
        </span>
        <p className="mt-5 text-xs text-muted-foreground">联系电话</p>
        <p className="mt-1.5 text-sm font-medium transition group-hover:text-primary">
          {info.phone}
        </p>
      </a>
      <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft sm:col-span-2 lg:col-span-1">
        <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <MapPin className="size-5" />
        </span>
        <p className="mt-5 text-xs text-muted-foreground">办公地址</p>
        <p className="mt-1.5 text-sm font-medium leading-7">{info.address}</p>
        {info.addressEn && (
          <p className="mt-1 text-xs leading-6 text-muted-foreground">{info.addressEn}</p>
        )}
      </div>
      <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft sm:col-span-2 lg:col-span-1">
        <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
          <Clock3 className="size-5" />
        </span>
        <p className="mt-5 text-xs text-muted-foreground">工作时间</p>
        <p className="mt-1.5 text-sm font-medium leading-7">{info.workingHours}</p>
      </div>
    </div>
  );
}

function MapPlaceholder({ info }: { info: ContactInfo }) {
  return (
    <div className="map-grid relative min-h-72 overflow-hidden rounded-3xl border border-border/70 bg-muted/25">
      <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-primary/5" />
      <div className="absolute left-[18%] top-[22%] h-16 w-40 rotate-[-18deg] rounded-xl border border-border/60 bg-background/35" />
      <div className="absolute bottom-[14%] right-[12%] h-28 w-24 rotate-12 rounded-xl border border-border/60 bg-background/35" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/10 motion-reduce:animate-none" />
        <span className="relative grid size-14 place-items-center rounded-2xl bg-primary text-white shadow-glow">
          <Building2 className="size-6" />
        </span>
      </div>
      <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-border/70 bg-background/90 p-4 shadow-soft backdrop-blur-md">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium">Naya Corp</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{info.address}</p>
          </div>
        </div>
      </div>
      <span className="absolute right-4 top-4 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[10px] text-muted-foreground backdrop-blur">
        位置示意
      </span>
    </div>
  );
}

export default function ContactPage() {
  const home = useHomeDashboard();
  const content = home.data?.content;

  return (
    <>
      <PageHero eyebrow="Contact" title="联系我们" description={content?.subheadline}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-emerald-500" />
          欢迎通过表单或下方联系方式与我们沟通
        </div>
      </PageHero>

      <section className="py-16 lg:py-24">
        <div className="container grid items-start gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-14">
          <div>
            <ApiState
              state={home}
              empty={!content}
              emptyTitle="联系方式暂不可用"
              emptyDescription="您仍然可以通过右侧表单提交需求。"
              loading={
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" aria-busy="true">
                  {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="h-36 animate-pulse rounded-2xl bg-muted/60" />
                  ))}
                </div>
              }
            >
              {content && (
                <>
                  <ContactDetails info={content.contactInfo} />
                  <div className="mt-6">
                    <MapPlaceholder info={content.contactInfo} />
                  </div>
                </>
              )}
            </ApiState>

            <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/[0.045] p-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <MessageSquareText className="size-4 text-primary" />
                沟通提示
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                请在需求描述中说明项目背景、目标与时间安排。提交后请保持联系方式畅通，我们会根据您提供的信息进行跟进。
              </p>
              {content?.contactInfo.workingHours && (
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  工作时段：{content.contactInfo.workingHours}
                </p>
              )}
            </div>
          </div>

          <Reveal delay={0.08}>
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Send className="size-4" />
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">发送项目需求</h2>
                <p className="mt-1 text-xs text-muted-foreground">带 * 的项目为必填项</p>
              </div>
            </div>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section
        id="privacy"
        className="scroll-mt-24 border-t border-border/50 bg-muted/25 py-16 lg:py-20"
      >
        <div className="container max-w-4xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Privacy
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">隐私说明</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                我们仅将您通过联系表单提交的姓名、联系方式与需求描述用于本次业务沟通，不会在未经同意的情况下出售或向无关第三方共享这些信息。
              </p>
              <p>
                如需更正或删除您提交的信息，请通过本页所列邮箱或电话与我们联系。请不要在表单中提交密码、支付凭证等敏感资料。
              </p>
            </div>
            <Button asChild variant="outline" className="mt-7">
              <Link href="#main-content">
                返回页面顶部
                <ArrowUpRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
