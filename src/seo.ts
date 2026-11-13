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
  jsonLd?: object | object[];
}

export const BASE_SITE_URL = 'https://osaka-shinodayamashinchi-recruit.com';
export const DEFAULT_OG_IMAGE = `${BASE_SITE_URL}/images/shinodayama_hero_banner_1792225964954.jpg`;

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
  setMeta('name', 'description', config.description);
  setMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  // 3. OpenGraph Meta
  setMeta('property', 'og:title', config.title);
  setMeta('property', 'og:description', config.description);
  setMeta('property', 'og:type', config.ogType || 'website');
  setMeta('property', 'og:site_name', '信太山ガールズ（信太山新地 旅館直営公式求人）');

  const canonical = config.canonicalUrl || (window.location.origin + window.location.pathname);
  setMeta('property', 'og:url', canonical);

  const ogImage = config.ogImage
    ? (config.ogImage.startsWith('http') ? config.ogImage : `${BASE_SITE_URL}${config.ogImage}`)
    : DEFAULT_OG_IMAGE;
  setMeta('property', 'og:image', ogImage);

  // 4. Twitter Cards
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', config.title);
  setMeta('name', 'twitter:description', config.description);
  setMeta('name', 'twitter:image', ogImage);

  // 5. Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonical);

  // 6. Dynamic JSON-LD Structured Data
  const DYNAMIC_SCHEMA_ID = 'dynamic-page-seo-schema';
  const existing = document.getElementById(DYNAMIC_SCHEMA_ID);
  if (existing) {
    existing.remove();
  }

  if (config.jsonLd) {
    try {
      const script = document.createElement('script');
      script.id = DYNAMIC_SCHEMA_ID;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(config.jsonLd);
      document.head.appendChild(script);
    } catch (e) {
      console.warn('Failed to inject JSON-LD', e);
    }
  }
}
