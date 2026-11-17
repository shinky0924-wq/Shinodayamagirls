/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim();

let initialized = false;
let lastTrackedPath = '';

export function initAnalytics(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (initialized || !GA_MEASUREMENT_ID) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true
  });

  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.appendChild(script);
  }

  // Global delegated tracking for all external LINE consultation links
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href*="lin.ee"]') as HTMLAnchorElement | null;
      if (anchor) {
        trackLineCtaClick(anchor.id || anchor.textContent?.trim().slice(0, 40) || 'line_link');
      }
    },
    { passive: true }
  );
}

export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || !window.gtag) return;
  const normalized = path || window.location.pathname;
  if (normalized === lastTrackedPath) return;
  lastTrackedPath = normalized;

  window.gtag('event', 'page_view', {
    page_path: normalized,
    page_location: window.location.origin + normalized + window.location.search,
    page_title: title || document.title
  });
}

export function trackLineCtaClick(source: string = 'cta'): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag('event', 'line_cta_click', {
    event_category: 'conversion',
    event_label: source,
    page_path: window.location.pathname
  });
}
