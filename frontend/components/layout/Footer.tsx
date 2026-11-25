'use client';

import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { useHomeDashboard } from '@/components/shared/ContentProvider';
import { Separator } from '@/components/ui/separator';
import { getIcon } from '@/lib/content';
import { navigation } from '@/lib/navigation';
import { Logo } from './Logo';

export function Footer() {
  const { data, loading } = useHomeDashboard();
  const content = data?.content;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Nova Corp';

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute -right-32 -top-40 size-[480px] rounded-full bg-primary/15 blur-[100px]" />
      <div className="container relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_.65fr_1fr] lg:gap-16">
          <div>
            <Logo inverted />
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              {content?.footerTagline ??
                (loading ? '正在加载网站内容…' : '详细联系方式请访问联系页面。')}
            </p>
            {content && content.socialLinks.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2">
                {content.socialLinks.map((social) => {
                  const Icon = getIcon(social.icon);
                  return (
                    <a
                      key={`${social.label}-${social.href}`}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-lavender-300/60 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-300"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white">快速导航</h2>
            <nav
              aria-label="页脚导航"
              className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-white/60 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white">联系方式</h2>
            <address className="mt-5 space-y-4 text-sm not-italic text-white/60">
              {content?.contactInfo.address && (
                <a
                  href="/contact"
                  className="flex items-start gap-3 leading-6 transition hover:text-white"
                >
                  <MapPin className="mt-1 size-4 shrink-0 text-lavender-300" />
                  <span>{content.contactInfo.address}</span>
                </a>
              )}
              {content?.contactInfo.phone && (
                <a
                  href={`tel:${content.contactInfo.phone}`}
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Phone className="size-4 shrink-0 text-lavender-300" />
                  {content.contactInfo.phone}
                </a>
              )}
              {content?.contactInfo.email && (
                <a
                  href={`mailto:${content.contactInfo.email}`}
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Mail className="size-4 shrink-0 text-lavender-300" />
                  {content.contactInfo.email}
                </a>
              )}
            </address>
            {content?.contactInfo.workingHours && (
              <p className="mt-5 pl-7 text-xs leading-6 text-white/40">
                {content.contactInfo.workingHours}
              </p>
            )}
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />
        <div className="flex flex-col gap-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteName}. 保留所有权利。
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact#privacy" className="transition hover:text-white">
              隐私说明
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              与我们联系
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
