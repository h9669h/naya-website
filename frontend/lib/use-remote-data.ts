'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface ResourceState<T> {
  data: T | null;
  error: string | null;
  errorCause: unknown;
  loading: boolean;
  retry: () => void;
}

export function useRemoteData<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  queryKey = '',
): ResourceState<T> {
  const fetcherRef = useRef(fetcher);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorCause, setErrorCause] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  const retry = useCallback(() => setRequestVersion((version) => version + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setErrorCause(null);

    fetcherRef
      .current(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setData(result);
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        setErrorCause(reason);
        setError(reason instanceof Error ? reason.message : '加载失败，请稍后重试。');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [queryKey, requestVersion]);

  return { data, error, errorCause, loading, retry };
}
