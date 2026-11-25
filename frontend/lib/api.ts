import axios, { type AxiosError } from 'axios';
import type {
  ApiEnvelope,
  BlogPost,
  BlogQuery,
  CaseStudy,
  ContactPayload,
  ContactResponse,
  HomeDashboard,
  PaginationMeta,
  Service,
  TeamMember,
} from './types';

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(message: string, status = 0, code = 'UNKNOWN_ERROR', details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isEnvelope(value: unknown): value is ApiEnvelope<unknown> {
  return (
    isRecord(value) &&
    value.success === true &&
    typeof value.message === 'string' &&
    typeof value.timestamp === 'string' &&
    'data' in value
  );
}

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
});

client.interceptors.response.use(
  (response) => {
    if (!isEnvelope(response.data)) {
      throw new ApiError('服务返回了无法识别的数据格式。', response.status, 'INVALID_RESPONSE');
    }
    return response;
  },
  (error: unknown) => {
    if (axios.isAxiosError<unknown>(error)) {
      const axiosError = error as AxiosError<unknown>;
      const payload = axiosError.response?.data;
      if (isRecord(payload) && payload.success === false && isRecord(payload.error)) {
        const message =
          typeof payload.error.message === 'string'
            ? payload.error.message
            : '请求失败，请稍后重试。';
        const code = typeof payload.error.code === 'string' ? payload.error.code : 'REQUEST_FAILED';
        throw new ApiError(message, axiosError.response?.status ?? 0, code, payload.error.details);
      }
      if (axiosError.code === 'ECONNABORTED') {
        throw new ApiError('请求超时，请检查网络后重试。', 0, 'TIMEOUT');
      }
      if (!axiosError.response) {
        throw new ApiError('暂时无法连接服务，请稍后重试。', 0, 'NETWORK_ERROR');
      }
      throw new ApiError(
        typeof payload === 'string' ? payload : '请求失败，请稍后重试。',
        axiosError.response?.status ?? 0,
        'REQUEST_FAILED',
      );
    }
    throw error;
  },
);

async function getData<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await client.get<ApiEnvelope<T>>(path, { signal });
  return response.data.data;
}

async function getPage<T>(
  path: string,
  query: BlogQuery,
  signal?: AbortSignal,
): Promise<{ data: T; meta?: PaginationMeta }> {
  const response = await client.get<ApiEnvelope<T>>(path, {
    signal,
    params: {
      page: query.page,
      limit: query.limit,
      category: query.category,
    },
  });
  return { data: response.data.data, meta: response.data.meta };
}

export const api = {
  getHome(signal?: AbortSignal) {
    return getData<HomeDashboard>('/home', signal);
  },
  getServices(signal?: AbortSignal) {
    return getData<Service[]>('/services', signal);
  },
  getService(slug: string, signal?: AbortSignal) {
    return getData<Service>(`/services/${encodeURIComponent(slug)}`, signal);
  },
  getCases(signal?: AbortSignal) {
    return getData<CaseStudy[]>('/cases', signal);
  },
  getCase(slug: string, signal?: AbortSignal) {
    return getData<CaseStudy>(`/cases/${encodeURIComponent(slug)}`, signal);
  },
  getTeam(signal?: AbortSignal) {
    return getData<TeamMember[]>('/team', signal);
  },
  getBlogPosts(query: BlogQuery = {}, signal?: AbortSignal) {
    return getPage<BlogPost[]>('/blog', query, signal);
  },
  getBlogCategories(signal?: AbortSignal) {
    return getData<string[]>('/blog/categories', signal);
  },
  getBlogPost(slug: string, signal?: AbortSignal) {
    return getData<BlogPost>(`/blog/${encodeURIComponent(slug)}`, signal);
  },
  submitContact(payload: ContactPayload) {
    return client.post<ApiEnvelope<ContactResponse>>('/contact', payload).then((response) => {
      return response.data.data;
    });
  },
};
