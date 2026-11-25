import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiState } from '@/components/shared/ApiState';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { BlogPost } from '@/lib/types';
import { BlogGrid } from './BlogGrid';

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const featured = posts.filter((post) => post.featured).slice(0, 3);
  const items = featured.length >= 3 ? featured : posts.slice(0, 3);

  return (
    <section className="border-t border-border/50 bg-muted/25 py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Insights"
            title="文章与洞察"
            description={items[0]?.excerpt}
            action={
              <Button asChild variant="outline">
                <Link href="/blog">
                  阅读全部洞察
                  <ArrowUpRight />
                </Link>
              </Button>
            }
          />
        </Reveal>
        <ApiState
          state={{ loading: false, error: null, retry: () => undefined }}
          empty={items.length === 0}
          emptyTitle="文章内容准备中"
        >
          <BlogGrid posts={items} />
        </ApiState>
      </div>
    </section>
  );
}
