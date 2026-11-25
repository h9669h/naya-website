'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  FileQuestion,
  UserRound,
} from 'lucide-react';
import { useHomeDashboard } from '@/components/shared/ContentProvider';
import { ApiError, api } from '@/lib/api';
import { formatDate, readingTime } from '@/lib/format';
import { useRemoteData } from '@/lib/use-remote-data';
import type { BlogPost, PaginationMeta } from '@/lib/types';
import { ApiState } from '@/components/shared/ApiState';
import { RichText } from '@/components/shared/RichText';
import { SmartImage } from '@/components/shared/SmartImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BlogGrid } from '@/components/sections/BlogGrid';
import { ContactCta } from '@/components/sections/ContactCta';

function ArticleLoading() {
  return (
    <div className="container py-16" aria-busy="true">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mt-8 h-12 w-4/5" />
      <Skeleton className="mt-4 h-6 w-2/3" />
      <Skeleton className="mt-12 aspect-[16/7] w-full rounded-3xl" />
      <div className="mt-12 max-w-3xl space-y-4">
        {Array.from({ length: 9 }, (_, index) => (
          <Skeleton key={index} className={`h-4 ${index % 3 === 2 ? 'w-3/4' : 'w-full'}`} />
        ))}
      </div>
    </div>
  );
}

function ArticleNotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="grid size-20 place-items-center rounded-3xl bg-primary/10 text-primary">
        <FileQuestion className="size-9" />
      </span>
      <h1 className="mt-7 text-3xl font-semibold tracking-tight">文章未找到</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
        这篇文章可能已被移除、更改了地址，或链接输入有误。
      </p>
      <Button asChild className="mt-8">
        <Link href="/blog">
          <ArrowLeft />
          返回文章列表
        </Link>
      </Button>
    </div>
  );
}

function ArticleContent({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  return (
    <article>
      <header className="border-b border-border/50 bg-muted/20 py-12 lg:py-16">
        <div className="container">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            返回文章列表
          </Link>
          <div className="mt-8 max-w-4xl">
            <Badge variant="secondary" className="mb-5">
              {post.category}
            </Badge>
            <h1 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <UserRound className="size-3.5" />
                {post.author}
              </span>
              <time dateTime={post.publishedAt} className="inline-flex items-center gap-2">
                <CalendarDays className="size-3.5" />
                {formatDate(post.publishedAt)}
              </time>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-3.5" />
                {readingTime(post.readingMinutes)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <SmartImage
        src={post.coverImage}
        alt={`${post.title}文章封面`}
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="mx-auto mt-10 aspect-[16/7] max-w-[1280px] rounded-none sm:mt-12 sm:rounded-3xl lg:px-0"
        priority
      />

      <div className="container grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16 lg:py-16">
        <div className="min-w-0 max-w-3xl">
          <RichText content={post.content} />
          <div className="mt-12 border-t border-border pt-8">
            <p className="text-xs font-medium text-muted-foreground">文章标签</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Article Info
            </p>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">作者</dt>
                <dd className="mt-1 font-medium">{post.author}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">分类</dt>
                <dd className="mt-1 font-medium">{post.category}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">阅读时间</dt>
                <dd className="mt-1 font-medium">{readingTime(post.readingMinutes)}</dd>
              </div>
            </dl>
            <Button asChild variant="outline" className="mt-6 w-full">
              <Link href="/contact">
                交流与咨询
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border/50 bg-muted/25 py-16 lg:py-20">
          <div className="container">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">相关阅读</h2>
            <p className="mt-3 text-sm text-muted-foreground">继续浏览更多文章。</p>
            <div className="mt-9">
              <BlogGrid posts={related} />
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const home = useHomeDashboard();
  const post = useRemoteData<BlogPost>(
    (signal) => api.getBlogPost(params.slug, signal),
    params.slug,
  );
  const list = useRemoteData<{ data: BlogPost[]; meta?: PaginationMeta }>(
    (signal) => api.getBlogPosts({ page: 1, limit: 12 }, signal),
    params.slug,
  );
  const notFound = post.errorCause instanceof ApiError && post.errorCause.status === 404;
  const allPosts = list.data?.data ?? [];
  const related = (
    post.data
      ? [
          ...allPosts.filter(
            (item) => item.slug !== post.data?.slug && item.category === post.data?.category,
          ),
          ...allPosts.filter(
            (item) => item.slug !== post.data?.slug && item.category !== post.data?.category,
          ),
        ]
      : []
  )
    .filter(
      (item, index, items) => items.findIndex((candidate) => candidate.id === item.id) === index,
    )
    .slice(0, 3);

  if (notFound) return <ArticleNotFound />;

  return (
    <ApiState state={post} loading={<ArticleLoading />}>
      {post.data && (
        <>
          <ArticleContent post={post.data} related={related} />
          {home.data && <ContactCta content={home.data.content} />}
        </>
      )}
    </ApiState>
  );
}
