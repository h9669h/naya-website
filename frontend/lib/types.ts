export interface StatItem {
  label: string;
  value: string;
}

export interface ContactInfo {
  address: string;
  addressEn: string;
  phone: string;
  email: string;
  workingHours: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface HomeContent {
  id: string;
  key: string;
  eyebrow: string;
  headline: string;
  highlightedHeadline: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  introTitle: string;
  introBody: string;
  mission: string;
  vision: string;
  stats: StatItem[];
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  footerTagline: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  coverImage: string;
  capabilities: string[];
  deliverables: string[];
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: number;
  summary: string;
  description: string;
  coverImage: string;
  techStack: string[];
  highlights: string[];
  results: Array<{ label: string; value: string }>;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  expertise: string[];
  socialLinks: SocialLink[];
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  content: string;
  readingMinutes: number;
  publishedAt: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HomeDashboard {
  content: HomeContent;
  services: Service[];
  cases: CaseStudy[];
  team: TeamMember[];
  posts: BlogPost[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiEnvelope<T> {
  success: true;
  message: string;
  data: T;
  meta?: PaginationMeta;
  timestamp: string;
}

export interface ErrorEnvelope {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
  path: string;
}

export interface BlogQuery {
  page?: number;
  limit?: number;
  category?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  website?: string;
}

export interface ContactResponse {
  id: string;
  status: string;
  createdAt: string;
}
