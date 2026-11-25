'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { api } from '@/lib/api';
import { useRemoteData, type ResourceState } from '@/lib/use-remote-data';
import type { HomeDashboard } from '@/lib/types';

const HomeContext = createContext<ResourceState<HomeDashboard> | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const home = useRemoteData<HomeDashboard>((signal) => api.getHome(signal));

  return <HomeContext.Provider value={home}>{children}</HomeContext.Provider>;
}

export function useHomeDashboard(): ResourceState<HomeDashboard> {
  const context = useContext(HomeContext);
  if (!context) throw new Error('useHomeDashboard 必须在 ContentProvider 内使用。');
  return context;
}
