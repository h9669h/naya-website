'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, X } from 'lucide-react';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { navigation, isActivePath } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title="网站导航"
        hideClose
        className="left-0 top-0 h-dvh max-h-none w-[88vw] max-w-sm translate-x-0 translate-y-0 rounded-none border-y-0 border-l-0 border-r p-0 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left sm:w-[86vw] [&>div:first-child]:sr-only"
      >
        <div className="flex min-h-dvh flex-col p-6">
          <div className="flex items-center justify-between gap-1">
            <Logo onClick={() => onOpenChange(false)} className="[&_span]:text-xs [&_img]:size-7" />
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <DialogClose asChild>
                <Button type="button" variant="ghost" size="icon" aria-label="关闭导航菜单">
                  <X />
                </Button>
              </DialogClose>
            </div>
          </div>
          <nav aria-label="移动端导航" className="mt-12 flex flex-col">
            {navigation.map((item, index) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group flex items-center justify-between border-b border-border/60 py-4 text-lg font-medium transition hover:pl-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    active && 'text-primary',
                  )}
                >
                  <span>
                    <span className="mr-4 text-xs font-normal text-muted-foreground">
                      0{index + 1}
                    </span>
                    {item.label}
                  </span>
                  <ArrowUpRight className="size-4 opacity-0 transition group-hover:opacity-100" />
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto pt-10">
            <DialogClose asChild>
              <Link
                href="/contact"
                onClick={() => onOpenChange(false)}
                className="flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
              >
                开始沟通
                <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
