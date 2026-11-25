import { Reveal } from '@/components/shared/Reveal';
import type { BlogPost } from '@/lib/types';
import { BlogCard } from './BlogCard';

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <Reveal key={post.id} delay={(index % 3) * 0.06} className="h-full">
          <BlogCard post={post} />
        </Reveal>
      ))}
    </div>
  );
}
