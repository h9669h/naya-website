export interface NavigationItem {
  label: string;
  href: string;
}

export const navigation: NavigationItem[] = [
  { label: '首页', href: '/' },
  { label: '服务', href: '/services' },
  { label: '案例', href: '/cases' },
  { label: '团队', href: '/team' },
  { label: '洞察', href: '/blog' },
  { label: '联系', href: '/contact' },
];

export function isActivePath(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}
