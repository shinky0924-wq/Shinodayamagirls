/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SeoConfig {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  robots?: string;
  jsonLd?: object | object[];
}

export const BASE_SITE_URL = 'https://osaka-shinodayamashinchi-recruit.com';
export const DEFAULT_OG_IMAGE = `${BASE_SITE_URL}/images/shinodayama_hero_banner_1792225964954.jpg`;
const DEFAULT_ROBOTS = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

/**
 * Formats blog article titles to stay concise for Google SERP rendering while preserving full headline in H1/JSON-LD.
 */
export function formatBlogSeoTitle(articleTitle: string): string {
  const cleanTitle = (articleTitle || '').trim();
  const suffix = '｜信太山ガールズ';
  if (`${cleanTitle}${suffix}`.length <= 60) {
    return `${cleanTitle}${suffix}`;
  }
  if (cleanTitle.length <= 60) {
    return cleanTitle;
  }
  return `${cleanTitle.slice(0, 58)}…`;
}

/**
 * Normalizes and trims meta description cleanly at sentence/phrase boundaries for optimal SERP snippet display.
 */
export function formatMetaDescription(rawDescription?: string, fallback: string = ''): string {
  const normalized = (rawDescription || fallback).replace(/\s+/g, ' ').trim();
  if (normalized.length <= 155) return normalized;
  const sliced = normalized.slice(0, 140);
  const lastPeriod = Math.max(sliced.lastIndexOf('。'), sliced.lastIndexOf('、'), sliced.lastIndexOf(' '));
  if (lastPeriod >= 90) {
    const candidate = sliced.slice(0, lastPeriod + (sliced[lastPeriod] === '。' ? 1 : 0));
    return candidate.endsWith('。') ? candidate : `${candidate}…`;
  }
  return `${sliced}…`;
}

/**
 * Dynamically updates document metadata for SEO and Generative AI (LLMO) crawlers
 */
export function updatePageSeo(config: SeoConfig) {
  if (typeof document === 'undefined') return;

  // 1. Document Title
  document.title = config.title;

  const setMeta = (attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 2. Standard Meta
  const robots = config.robots || DEFAULT_ROBOTS;
  setMeta('name', 'description', config.description);
  setMeta('name', 'robots', robots);

  // 3. OpenGraph Meta
  setMeta('property', 'og:title', config.title);
  setMeta('property', 'og:description', config.description);
  setMeta('property', 'og:type', config.ogType || 'website');
  setMeta('property', 'og:locale', 'ja_JP');
  setMeta('property', 'og:site_name', '信太山ガールズ（信太山新地 旅館直営公式求人）');

  const canonical = config.canonicalUrl || (window.location.origin + window.location.pathname);
  setMeta('property', 'og:url', canonical);

  const ogImage = config.ogImage
    ? (config.ogImage.startsWith('http') ? config.ogImage : `${BASE_SITE_URL}${config.ogImage}`)
    : DEFAULT_OG_IMAGE;
  const ogImageType = ogImage.endsWith('.webp')
    ? 'image/webp'
    : ogImage.endsWith('.png')
      ? 'image/png'
      : 'image/jpeg';
  setMeta('property', 'og:image', ogImage);
  setMeta('property', 'og:image:secure_url', ogImage);
  setMeta('property', 'og:image:type', ogImageType);
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');
  setMeta('property', 'og:image:alt', config.title);

  // 4. Twitter Cards
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:url', canonical);
  setMeta('name', 'twitter:title', config.title);
  setMeta('name', 'twitter:description', config.description);
  setMeta('name', 'twitter:image', ogImage);
  setMeta('name', 'twitter:image:alt', config.title);

  // 5. Canonical & Hreflang Links
  const isNoIndex = robots.includes('noindex');
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (isNoIndex && canonical === `${BASE_SITE_URL}${window.location.pathname}` && window.location.pathname !== '/admin') {
    if (canonicalLink) canonicalLink.remove();
  } else {
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
  }

  const syncHreflang = (lang: string, href: string | null) => {
    let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
    if (!href) {
      if (link) link.remove();
      return;
    }
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  };

  if (isNoIndex) {
    syncHreflang('ja', null);
    syncHreflang('x-default', null);
  } else {
    syncHreflang('ja', canonical);
    syncHreflang('x-default', canonical);
  }

  // 6. Clean up stale route schemas during SPA navigation & inject updated JSON-LD
  const isHomeRoute = canonical === `${BASE_SITE_URL}/` || canonical === BASE_SITE_URL;
  const STALE_IDS = ['dynamic-page-seo-schema', 'prerender-breadcrumb-schema', 'prerender-entity-schema', 'subpage-base-schema'];
  if (!isHomeRoute) {
    STALE_IDS.push('root-structured-data');
  }
  for (const id of STALE_IDS) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  if (!isHomeRoute && !isNoIndex) {
    try {
      const baseScript = document.createElement('script');
      baseScript.id = 'subpage-base-schema';
      baseScript.type = 'application/ld+json';
      baseScript.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${BASE_SITE_URL}/#website`,
            url: `${BASE_SITE_URL}/`,
            name: '信太山ガールズ（信太山新地求人公式サイト）',
            inLanguage: 'ja-JP',
            publisher: { '@id': `${BASE_SITE_URL}/#organization` }
          },
          {
            '@type': 'Organization',
            '@id': `${BASE_SITE_URL}/#organization`,
            name: '信太山ガールズ（旅館直営求人・女性採用サポート）',
            url: `${BASE_SITE_URL}/`,
            logo: {
              '@type': 'ImageObject',
              url: `${BASE_SITE_URL}/favicon.png`
            }
          }
        ]
      });
      document.head.appendChild(baseScript);
    } catch {
      // ignore base schema injection error
    }
  }

  if (config.jsonLd) {
    try {
      const script = document.createElement('script');
      script.id = 'dynamic-page-seo-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(config.jsonLd);
      document.head.appendChild(script);
    } catch (e) {
      console.warn('Failed to inject JSON-LD', e);
    }
  }
}
