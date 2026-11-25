'use client';

import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const themes = [
  { value: 'system', label: '跟随系统', icon: Monitor },
  { value: 'light', label: '切换为浅色模式', icon: Sun },
  { value: 'dark', label: '切换为深色模式', icon: Moon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="grid size-11 place-items-center rounded-full border border-border/60"
        aria-hidden="true"
      >
        <Monitor className="size-4 opacity-40" />
      </div>
    );
  }

  const currentIndex = themes.findIndex((item) => item.value === theme);
  const next = themes[(currentIndex + 1 + themes.length) % themes.length] ?? themes[0];
  const Icon = themes[currentIndex]?.icon ?? Monitor;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="rounded-full border border-border/60"
      onClick={() => setTheme(next.value)}
      title={next.label}
      aria-label={next.label}
    >
      <Icon />
    </Button>
  );
}
