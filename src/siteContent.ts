/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import defaultSiteContent from '../data/siteContent.json';

export interface SiteContent {
  lastUpdated: string;
  hero: {
    tagline: string;
    titleLine1: string;
    titleLine2: string;
    descriptionLine1?: string;
    descriptionLine2?: string;
    descriptionLine3?: string;
    descriptionParagraphs?: string[];
    ctaButtonText: string;
    badgeText: string;
  };
  concerns: {
    title: string;
    subtitle: string;
    items: {
      id: string;
      iconName: string;
      title: string;
      question: string;
      answer: string;
    }[];
  };
  reasons: {
    title: string;
    subtitle: string;
    description?: string;
    items: {
      number: string;
      iconName: string;
      title: string;
      description: string;
    }[];
  };
  jobs: {
    title: string;
    subtitle: string;
    infoSubtitle: string;
    simulatorTitle: string;
    simulatorDesc: string;
  };
  flow: {
    title: string;
    subtitle: string;
    items: {
      number: string;
      title: string;
    }[];
  };
  faq: {
    title: string;
    sidebarTitle: string;
    sidebarRole: string;
    sidebarMessage: string;
    items: {
      id: string;
      question: string;
      answer: string;
    }[];
  };
  consultation: {
    title: string;
    description: string;
    badgeText: string;
    copySubtitle: string;
    templateText: string;
    copyButtonText: string;
    lineBadgeText: string;
    lineButtonText: string;
    lineSubtitle: string;
    privacyNote: string;
  };
}

declare const __BUILD_DATE__: string | undefined;

const STORAGE_KEY = 'shinodayama_site_content_v19';

export function getEffectiveLastUpdated(configuredDate?: string): string {
  if (typeof __BUILD_DATE__ !== 'undefined' && __BUILD_DATE__) {
    return __BUILD_DATE__;
  }
  return configuredDate || defaultSiteContent.lastUpdated || '2026年10月28日';
}

export function getStoredSiteContent(): SiteContent {
  const effectiveDate = getEffectiveLastUpdated(defaultSiteContent.lastUpdated);
  if (typeof window === 'undefined') {
    return { ...defaultSiteContent, lastUpdated: effectiveDate } as SiteContent;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultSiteContent, ...parsed, lastUpdated: effectiveDate } as SiteContent;
    }
  } catch (e) {
    console.warn('Failed to load siteContent from localStorage:', e);
  }
  return { ...defaultSiteContent, lastUpdated: effectiveDate } as SiteContent;
}

export function saveSiteContent(content: SiteContent): void {
  if (typeof window === 'undefined') return;
  try {
    const toSave = {
      ...content,
      lastUpdated: getEffectiveLastUpdated(content.lastUpdated)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save siteContent to localStorage:', e);
  }
}

export default getStoredSiteContent;
