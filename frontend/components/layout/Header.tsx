'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { navigation, isActivePath } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-all duration-300',
        scrolled
          ? 'border-border/70 bg-background/85 shadow-soft backdrop-blur-xl'
          : 'border-transparent bg-background/70 backdrop-blur-md',
      )}
    >
      <div className="container flex h-[76px] items-center justify-between gap-5">
        <Logo />
        <nav aria-label="主导航" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  active && 'bg-primary/[0.08] text-primary',
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-[9px] h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="ml-2 hidden sm:inline-flex">
            <Link href="/contact">
              项目咨询
              <ArrowUpRight />
            </Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full border border-border/60 lg:hidden"
            aria-label="打开导航菜单"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </Button>
        </div>
      </div>
      <MobileNav open={menuOpen} onOpenChange={setMenuOpen} />
    </header>
  );
}
