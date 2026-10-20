import { DOCTORS, SERVICES, NEWS_ITEMS } from './hospitalData.ts';
import type { Doctor, ServiceItem, NewsItem } from '../types/index.ts';

export type SearchCategory = 'doctor' | 'service' | 'news';

export interface SearchResultItem {
  id: string;
  type: SearchCategory;
  title: string;
  subtitle: string;
  badge?: string;
  path: string;
  matchedField?: string;
}

export interface SearchResults {
  query: string;
  totalCount: number;
  doctors: SearchResultItem[];
  services: SearchResultItem[];
  news: SearchResultItem[];
  all: SearchResultItem[];
}

/**
 * Normalizes text for case-insensitive matching
 */
export function normalizeSearchText(text: string): string {
  return (text || '').trim().toLowerCase();
}

/**
 * Pure search function over hospital doctors, treatments/services, and news.
 */
export function searchHospital(rawQuery: string): SearchResults {
  const query = normalizeSearchText(rawQuery);

  if (!query) {
    return {
      query: '',
      totalCount: 0,
      doctors: [],
      services: [],
      news: [],
      all: [],
    };
  }

  // Search Doctors
  const doctors: SearchResultItem[] = DOCTORS.filter((doc: Doctor) => {
    const nameMatch = doc.name?.toLowerCase().includes(query);
    const roleMatch = doc.role?.toLowerCase().includes(query);
    const deptMatch = doc.department?.toLowerCase().includes(query);
    const specialtiesMatch = doc.specialties?.some((s) => s.toLowerCase().includes(query));
    const branchesMatch = doc.branches?.some((b) => b.toLowerCase().includes(query));
    const eduMatch = doc.education?.some((e) => e.toLowerCase().includes(query));
    const schedMatch = doc.scheduleNote?.toLowerCase().includes(query);

    return nameMatch || roleMatch || deptMatch || specialtiesMatch || branchesMatch || eduMatch || schedMatch;
  }).map((doc: Doctor) => {
    const specialtyText = (doc.specialties && doc.specialties.length > 0)
      ? doc.specialties.slice(0, 2).join(', ')
      : doc.role;

    return {
      id: doc.id,
      type: 'doctor' as const,
      title: doc.name,
      subtitle: `${specialtyText} • ${doc.branches?.join(', ') || ''}`,
      badge: doc.isConsultant ? 'Зөвлөх эмч' : doc.role,
      path: `/doctors#doc-${doc.id}`,
      matchedField: doc.name.toLowerCase().includes(query) ? 'Нэр' : 'Мэргэжил/Салбар',
    };
  });

  // Search Eye Treatments / Services
  const services: SearchResultItem[] = SERVICES.filter((srv: ServiceItem) => {
    const titleMatch = srv.title?.toLowerCase().includes(query);
    const shortDescMatch = srv.shortDesc?.toLowerCase().includes(query);
    const catMatch = srv.categoryLabel?.toLowerCase().includes(query);
    const fullDescMatch = srv.fullDesc?.toLowerCase().includes(query);
    const indicationsMatch = srv.indications?.some((ind) => ind.toLowerCase().includes(query));
    const proceduresMatch = srv.procedures?.some((p) => p.toLowerCase().includes(query));

    return titleMatch || shortDescMatch || catMatch || fullDescMatch || indicationsMatch || proceduresMatch;
  }).map((srv: ServiceItem) => ({
    id: srv.id,
    type: 'service' as const,
    title: srv.title,
    subtitle: srv.shortDesc,
    badge: srv.badge || srv.categoryLabel,
    path: `/services/${srv.slug}`,
    matchedField: srv.title.toLowerCase().includes(query) ? 'Үйлчилгээ' : 'Эмчилгээний тайлбар',
  }));

  // Search News & Articles
  const news: SearchResultItem[] = NEWS_ITEMS.filter((item: NewsItem) => {
    const titleMatch = item.title?.toLowerCase().includes(query);
    const summaryMatch = item.summary?.toLowerCase().includes(query);
    const contentMatch = Array.isArray(item.content)
      ? item.content.some((p) => p.toLowerCase().includes(query))
      : false;
    const catMatch = item.category?.toLowerCase().includes(query);
    const tagsMatch = item.tags?.some((t) => t.toLowerCase().includes(query));

    return titleMatch || summaryMatch || contentMatch || catMatch || tagsMatch;
  }).map((item: NewsItem) => ({
    id: item.id,
    type: 'news' as const,
    title: item.title,
    subtitle: `${item.publishedDate} • ${item.category}`,
    badge: item.category,
    path: `/news/${item.slug}`,
    matchedField: item.title.toLowerCase().includes(query) ? 'Гарчиг' : 'Мэдээний агуулга',
  }));

  const all = [...doctors, ...services, ...news];

  return {
    query: rawQuery,
    totalCount: all.length,
    doctors,
    services,
    news,
    all,
  };
}
