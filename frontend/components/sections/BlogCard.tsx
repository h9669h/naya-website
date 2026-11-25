import Link from 'next/link';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SmartImage } from '@/components/shared/SmartImage';
import { formatDate, readingTime } from '@/lib/format';
import type { BlogPost } from '@/lib/types';

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Card className="group h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
      <Link
        href={`/blog/${post.slug}`}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <SmartImage
          src={post.coverImage}
          alt={`${post.title}文章封面`}
          sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
          className={featured ? 'aspect-[16/9]' : 'aspect-[16/9]'}
          imageClassName="group-hover:scale-[1.03]"
        />
        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <Badge variant="secondary">{post.category}</Badge>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>
          <div className="mt-4 flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold leading-snug tracking-tight transition group-hover:text-primary">
              {post.title}
            </h3>
            <ArrowUpRight className="mt-1 size-4 shrink-0 text-primary opacity-60 transition group-hover:opacity-100" />
          </div>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-2 border-t border-border/60 pt-5 text-xs text-muted-foreground">
            <Clock3 className="size-3.5" />
            <span>{readingTime(post.readingMinutes)}</span>
            <span className="mx-1 size-1 rounded-full bg-muted-foreground/40" />
            <span>{post.author}</span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
