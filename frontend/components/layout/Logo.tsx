import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({
  className,
  inverted = false,
  onClick,
}: {
  className?: string;
  inverted?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Nova Corp 首页"
      className={cn(
        'inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
    >
      <Image src="/logo-mark.svg" alt="" width={34} height={34} priority className="size-8" />
      <span
        className={cn(
          'text-[15px] font-bold tracking-[0.16em]',
          inverted ? 'text-white' : 'text-foreground',
        )}
      >
        NOVA <span className={inverted ? 'text-lavender-200' : 'text-primary'}>CORP</span>
      </span>
    </Link>
  );
}
