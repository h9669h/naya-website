import type { Prisma } from '@prisma/client';
import type { ContactInfo, SocialLink, StatItem } from '../dto/content.dto';

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const readString = (record: Record<string, unknown>, key: string): string => {
  const value = record[key];
  return typeof value === 'string' ? value : '';
};

export const parseStatItems = (value: Prisma.JsonValue): StatItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const entries: unknown[] = value;
  return entries.flatMap((entry) => {
    if (!isRecord(entry)) {
      return [];
    }

    const label = readString(entry, 'label');
    const metricValue = readString(entry, 'value');
    return label && metricValue ? [{ label, value: metricValue }] : [];
  });
};

export const parseContactInfo = (value: Prisma.JsonValue): ContactInfo => {
  const record = isRecord(value) ? value : {};
  return {
    address: readString(record, 'address'),
    addressEn: readString(record, 'addressEn'),
    phone: readString(record, 'phone'),
    email: readString(record, 'email'),
    workingHours: readString(record, 'workingHours'),
  };
};

export const parseSocialLinks = (value: Prisma.JsonValue): SocialLink[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const entries: unknown[] = value;
  return entries.flatMap((entry) => {
    if (!isRecord(entry)) {
      return [];
    }

    const label = readString(entry, 'label');
    const href = readString(entry, 'href');
    const icon = readString(entry, 'icon');
    return label && href && icon ? [{ label, href, icon }] : [];
  });
};
