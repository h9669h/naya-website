import type { ReactNode } from 'react';
import { AlertCircle, Inbox, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { ResourceState } from '@/lib/use-remote-data';
import { cn } from '@/lib/utils';

interface ApiStateProps {
  state: Pick<ResourceState<unknown>, 'loading' | 'error' | 'retry'>;
  empty?: boolean;
  loading?: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  children: ReactNode;
}

export function ApiState({
  state,
  empty = false,
  loading,
  emptyTitle = '暂无内容',
  emptyDescription = '内容更新后会在这里展示。',
  className,
  children,
}: ApiStateProps) {
  if (state.loading) {
    return (
      <div className={className} aria-busy="true" aria-live="polite">
        {loading ?? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="rounded-2xl border border-border/60 p-6">
                <Skeleton className="mb-6 size-12 rounded-2xl" />
                <Skeleton className="mb-3 h-6 w-2/3" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (state.error) {
    return (
      <div
        className={cn(
          'flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/20 px-6 py-14 text-center',
          className,
        )}
        role="alert"
      >
        <span className="mb-5 grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertCircle className="size-6" />
        </span>
        <h2 className="text-xl font-semibold">内容暂时无法加载</h2>
        <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">{state.error}</p>
        <Button type="button" variant="outline" className="mt-6" onClick={state.retry}>
          <RotateCcw />
          重新加载
        </Button>
      </div>
    );
  }

  if (empty) {
    return (
      <div
        className={cn(
          'flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/20 px-6 py-14 text-center',
          className,
        )}
      >
        <span className="mb-5 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Inbox className="size-6" />
        </span>
        <h2 className="text-xl font-semibold">{emptyTitle}</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{emptyDescription}</p>
      </div>
    );
  }

  return <>{children}</>;
}
