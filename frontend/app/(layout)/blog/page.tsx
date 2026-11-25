'use client';

import { useState } from 'react';
import { useHomeDashboard } from '@/components/shared/ContentProvider';
import { api } from '@/lib/api';
import { useRemoteData } from '@/lib/use-remote-data';
import type { BlogPost, PaginationMeta } from '@/lib/types';
import { ApiState } from '@/components/shared/ApiState';
import { Pagination } from '@/components/shared/Pagination';
import { Button } from '@/components/ui/button';
import { BlogGrid } from '@/components/sections/BlogGrid';
import { ContactCta } from '@/components/sections/ContactCta';
import { PageHero } from '@/components/sections/PageHero';

const PAGE_SIZE = 6;

export default function BlogPage() {
  const home = useHomeDashboard();
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const categories = useRemoteData((signal) => api.getBlogCategories(signal));
  const posts = useRemoteData<{ data: BlogPost[]; meta?: PaginationMeta }>(
    (signal) =>
      api.getBlogPosts({ page, limit: PAGE_SIZE, category: category || undefined }, signal),
    `${page}:${category}`,
  );

  function changePage(nextPage: number) {
    setPage(nextPage);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => {
      document.getElementById('blog-results')?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  }

  function changeCategory(nextCategory: string) {
    setCategory(nextCategory);
    setPage(1);
  }

  const items = posts.data?.data ?? [];

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="文章与洞察"
        description={home.data?.content.subheadline}
      />
      <section id="blog-results" className="scroll-mt-24 py-16 lg:py-24">
        <div className="container">
          <div className="mb-10 rounded-2xl border border-border/70 bg-card p-4 shadow-soft sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2" aria-label="按分类筛选文章">
                <span className="mr-2 text-xs font-medium text-muted-foreground">分类</span>
                <Button
                  type="button"
                  size="sm"
                  variant={category === '' ? 'default' : 'ghost'}
                  onClick={() => changeCategory('')}
                  aria-pressed={category === ''}
                >
                  全部
                </Button>
                {(categories.data ?? []).map((item) => (
                  <Button
                    key={item}
                    type="button"
                    size="sm"
                    variant={category === item ? 'default' : 'ghost'}
                    onClick={() => changeCategory(item)}
                    aria-pressed={category === item}
                  >
                    {item}
                  </Button>
                ))}
              </div>
              {categories.error && (
                <button
                  type="button"
                  onClick={categories.retry}
                  className="w-fit text-xs text-destructive underline underline-offset-4"
                >
                  分类加载失败，点击重试
                </button>
              )}
            </div>
          </div>

          <ApiState
            state={posts}
            empty={items.length === 0}
            emptyTitle={category ? '该分类暂无文章' : '文章内容准备中'}
            emptyDescription="内容更新后会在这里展示。"
          >
            <BlogGrid posts={items} />
          </ApiState>

          {posts.data?.meta && posts.data.meta.totalPages > 1 && (
            <Pagination meta={posts.data.meta} onChange={changePage} />
          )}
        </div>
      </section>
      {home.data && <ContactCta content={home.data.content} />}
    </>
  );
}
