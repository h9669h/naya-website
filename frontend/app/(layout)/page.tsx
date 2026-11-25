'use client';

import { useHomeDashboard } from '@/components/shared/ContentProvider';
import { ApiState } from '@/components/shared/ApiState';
import { Skeleton } from '@/components/ui/skeleton';
import { Advantages } from '@/components/sections/Advantages';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { CasesPreview } from '@/components/sections/CasesPreview';
import { CompanyIntro } from '@/components/sections/CompanyIntro';
import { ContactCta } from '@/components/sections/ContactCta';
import { Hero } from '@/components/sections/Hero';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { TeamPreview } from '@/components/sections/TeamPreview';
import type { HomeDashboard } from '@/lib/types';

function HomeLoading() {
  return (
    <div className="bg-hero-gradient py-24" aria-busy="true" aria-label="正在加载首页内容">
      <div className="container max-w-3xl space-y-6">
        <Skeleton className="h-8 w-48 bg-white/10" />
        <Skeleton className="h-16 w-full bg-white/10" />
        <Skeleton className="h-16 w-4/5 bg-white/10" />
        <Skeleton className="h-6 w-full bg-white/10" />
        <div className="flex gap-3 pt-5">
          <Skeleton className="h-12 w-36 bg-white/10" />
          <Skeleton className="h-12 w-36 bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function HomePageContent({ dashboard }: { dashboard: HomeDashboard }) {
  return (
    <>
      <Hero dashboard={dashboard} />
      <CompanyIntro content={dashboard.content} />
      <ServicesPreview services={dashboard.services} />
      <Advantages content={dashboard.content} services={dashboard.services} />
      <CasesPreview items={dashboard.cases} />
      <TeamPreview members={dashboard.team} />
      <BlogPreview posts={dashboard.posts} />
      <ContactCta content={dashboard.content} />
    </>
  );
}

export default function HomePage() {
  const home = useHomeDashboard();

  return (
    <ApiState state={home} loading={<HomeLoading />} empty={home.data === null}>
      {home.data && <HomePageContent dashboard={home.data} />}
    </ApiState>
  );
}
