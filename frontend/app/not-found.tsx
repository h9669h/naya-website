import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="grid min-h-screen place-items-center bg-background px-5 py-16"
    >
      <div className="text-center">
        <Logo className="justify-center" />
        <p className="mt-14 text-sm font-semibold uppercase tracking-[0.25em] text-primary">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">页面未找到</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted-foreground">
          您访问的页面不存在或已经移动，请返回首页继续浏览。
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft />
            返回首页
          </Link>
        </Button>
      </div>
    </main>
  );
}
