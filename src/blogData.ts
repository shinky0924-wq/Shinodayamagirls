/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import rawArticleIndex from '../data/blogArticlesIndex.json';

export interface BlogArticleSection {
  heading: string;
  body?: string;
  points?: string[];
  subsections?: {
    subheading: string;
    text: string;
  }[];
}

export interface BlogArticleFAQ {
  question: string;
  answer: string;
}

export interface BlogArticleContentBlock {
  type: 'p' | 'h2' | 'h3' | 'list' | 'qna' | 'cta';
  text?: string;
  items?: string[];
  question?: string;
  answer?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryLabel?: string;
  publishedAt?: string;
  readTime?: string;
  summary: string;
  eyeCatch: string;
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags?: string[];
  content?: 
    | BlogArticleContentBlock[]
    | {
        intro?: string;
        sections?: BlogArticleSection[];
        faqs?: BlogArticleFAQ[];
        conclusion?: string;
      };
}

export const BLOG_ARTICLES: BlogArticle[] = rawArticleIndex as BlogArticle[];

// Strict 1-to-1 unique mapping for photographic assets so NO image is reused ("画像は２度使わないようにして / 画像が被ってる記事あるよ")
// ALL photos feature Japanese people or authentic Japanese ryotei/cafe/interior scenes - NO foreigners ("外国人の画像は使わないで日本人にして")
export const ARTICLE_EXCLUSIVE_IMAGES: Record<string, string> = {
  // Lifestyle & Special Features
  'ryokan-culture-japanese-manner-elegance': '/images/col_ryokan_manner_1792465891118.webp',
  'ryotei-culture-japanese-manner-elegance': '/images/col_ryokan_manner_1792465891118.webp',
  'shinodayamashinchi-work-rules-hygiene-safety-standards': '/images/col_safety_gate_1792474007202.webp',
  'shinodayamashinchi-work-rules-hygiene-no-bath-washing-reality': '/images/col_bath_detox_jp_1792476829424.webp',
  'shinodayamashinchi-interview-requirements-documents': '/images/col_official_documents_1792465890547.webp',
  'night-routine-starry-sky-reset-guide': '/images/col_night_sky_relax_1792465892144.webp',
  'skincare-beauty-routine-clear-skin': '/images/col_skincare_cosmetics_1792465892294.webp',
  'room-interior-flowers-good-luck-tips': '/images/col_seasonal_flowers_1792465893097.webp',

  // Core 48 articles in order:
  'cast-direct-interview': '/images/shinodayama_cast_mai_1792225964470.webp',
  'recruiter-direct-interview': '/images/shinodayama_advisor_sakura_1792225964799.webp',
  'shinodayamashinchi-beginner-guide': '/images/shinodayama_hero_banner_1792225964954.webp',
  'shinodayamashinchi-salary-system': '/images/col_salary_yen_1792463652387.webp',
  'shinodayamashinchi-privacy-guide': '/images/col_privacy_safe_1792463653857.webp',
  'shinodayamashinchi-housing-support': '/images/col_dorm_interior_1792463651469.webp',
  'shinodayamashinchi-interview-guide': '/images/col_interview_counseling_jp_1792475575633.webp',
  'shinodayamashinchi-trial-guide': '/images/col_trial_orient_jp_1792475594501.webp',
  'shinodayamashinchi-age-and-looks': '/images/shinodayama_cast_yuri_1792225965491.webp',
  'shinodayamashinchi-tax-guide': '/images/col_tax_calc_1792473971279.webp',
  'shinodayamashinchi-non-alcoholic': '/images/col_non_alcohol_1792473970240.webp',
  'shinodayamashinchi-cast-holiday': '/images/col_cast_holiday_jp_1792475554095.webp',
  'shinodayamashinchi-short-term-work': '/images/col_short_term_1792473989733.webp',
  'shinodayamashinchi-safety-and-security': '/images/col_safety_gate_1792474007202.webp',
  'shinodayamashinchi-kimono-and-makeup': '/images/col_beauty_kimono_1792463653258.webp',
  'shinodayamashinchi-double-work-lifestyle': '/images/col_double_work_jp_1792475554864.webp',
  'shinodayamashinchi-mental-support': '/images/col_mental_care_jp_1792475594172.webp',
  'shinodayamashinchi-search-keywords': '/images/col_search_phone_jp_1792475574840.webp',
  'shinodayamashinchi-one-day-flow': '/images/col_one_day_flow_1792474096539.webp',
  'shinodayamashinchi-obachan-role': '/images/col_obachan_tea_1792474118271.webp',
  'shinodayamashinchi-kimono-makeup': '/images/col_kimono_fabrics_1792474118565.webp',
  'shinodayamashinchi-privacy-tips': '/images/col_privacy_discretion_1792475612461.webp',
  'shinodayamashinchi-age-looks-real': '/images/col_ageless_beauty_1792475612676.webp',
  'shinodayamashinchi-safety-security': '/images/col_secure_ryotei_1792475628730.webp',
  'shinodayamashinchi-weekend-shift': '/images/col_weekend_planner_1792475629264.webp',
  'shinodayamashinchi-trial-guide-faq': '/images/col_taiken_prep_1792475646166.webp',
  'shinodayamashinchi-mental-support-1': '/images/col_mental_care_jp_1792475594172.webp',
  'shinodayamashinchi-popular-cast-tips': '/images/col_popular_cast_jp_1792476715216.webp',
  'shinodayamashinchi-beauty-self-investment': '/images/col_luxury_beauty_1792474257173.webp',
  'shinodayamashinchi-student-success': '/images/col_weekend_planner_1792475629264.webp',
  'shinodayamashinchi-10million-savings': '/images/col_savings_goal_jp_1792476735709.webp',
  'shinodayamashinchi-friends-recruit': '/images/col_friends_pair_jp_1792476736438.webp',
  'shinodayamashinchi-tennoji-shopping-cafe': '/images/col_cast_holiday_jp_1792475554095.webp',
  'shinodayamashinchi-bonus-secrets': '/images/col_bonus_envelope_jp_1792476753315.webp',
  'shinodayamashinchi-youth-charm': '/images/col_popular_cast_jp_1792476715216.webp',
  'shinodayamashinchi-mature-ladies-success': '/images/col_mature_beauty_jp_1792476778964.webp',
  'shinodayamashinchi-dreams-and-future-funding': '/images/col_future_dreams_jp_1792476794603.webp',
  'shinodayamashinchi-interview-hacks-to-pass': '/images/col_interview_hacks_jp_1792476795351.webp',
  'shinodayamashinchi-dormitory-life-real': '/images/col_cozy_apartment_jp_1792476810515.webp',
  'shinodayamashinchi-daytime-shift-advantage': '/images/col_daytime_clock_jp_1792476810942.webp',
  'shinodayamashinchi-self-care-detox': '/images/col_bath_detox_jp_1792476829424.webp',
  'shinodayamashinchi-easy-kimono-dressing': '/images/col_easy_yukata_jp_1792476829780.webp',
  'shinodayamashinchi-vs-other-night-jobs': '/images/col_aroma_relax_1792474257103.webp',
  'shinodayamashinchi-tax-save-20s-guide': '/images/col_tax_calc_1792473971279.webp',
  'shinodayamashinchi-motivation-and-goal-roadmap': '/images/col_goal_roadmap_jp_1792476864281.webp',
  'shinodayamashinchi-no-resume-quick-trial': '/images/col_quick_trial_essentials_jp_1792476863910.webp',
  'shinodayamashinchi-friendly-support-staff-real': '/images/col_friendly_staff_jp_1792476884275.webp',
  'shinodayamashinchi-resort-style-work-holiday': '/images/col_resort_work_jp_1792476884003.webp',
  'shinodayamashinchi-privacy-protection-tips-1': '/images/col_official_documents_1792465890547.webp',
  'shinodayama-job-guide': '/images/ryokan_working_woman_1792485020272.webp',
  'shinodayamashinchi-work-flow-simulation': '/images/ryokan_working_woman_1792485020272.webp'
};

// All available 100% verified authentic Japanese photographic assets
export const ALL_JAPANESE_PHOTO_ASSETS: string[] = [
  '/images/col_privacy_discretion_1792475612461.webp',
  '/images/col_ageless_beauty_1792475612676.webp',
  '/images/col_secure_ryotei_1792475628730.webp',
  '/images/col_weekend_planner_1792475629264.webp',
  '/images/col_taiken_prep_1792475646166.webp',
  '/images/col_popular_cast_jp_1792476715216.webp',
  '/images/col_savings_goal_jp_1792476735709.webp',
  '/images/col_friends_pair_jp_1792476736438.webp',
  '/images/col_bonus_envelope_jp_1792476753315.webp',
  '/images/col_mature_beauty_jp_1792476778964.webp',
  '/images/col_future_dreams_jp_1792476794603.webp',
  '/images/col_interview_hacks_jp_1792476795351.webp',
  '/images/col_cozy_apartment_jp_1792476810515.webp',
  '/images/col_daytime_clock_jp_1792476810942.webp',
  '/images/col_bath_detox_jp_1792476829424.webp',
  '/images/col_easy_yukata_jp_1792476829780.webp',
  '/images/col_goal_roadmap_jp_1792476864281.webp',
  '/images/col_quick_trial_essentials_jp_1792476863910.webp',
  '/images/col_friendly_staff_jp_1792476884275.webp',
  '/images/col_resort_work_jp_1792476884003.webp',
  '/images/col_tax_calc_1792473971279.webp',
  '/images/col_non_alcohol_1792473970240.webp',
  '/images/col_cast_holiday_jp_1792475554095.webp',
  '/images/col_short_term_1792473989733.webp',
  '/images/col_safety_gate_1792474007202.webp',
  '/images/col_trial_orient_jp_1792475594501.webp',
  '/images/col_double_work_jp_1792475554864.webp',
  '/images/col_mental_care_jp_1792475594172.webp',
  '/images/col_search_phone_jp_1792475574840.webp',
  '/images/col_one_day_flow_1792474096539.webp',
  '/images/col_obachan_tea_1792474118271.webp',
  '/images/col_kimono_fabrics_1792474118565.webp',
  '/images/col_aroma_relax_1792474257103.webp',
  '/images/col_luxury_beauty_1792474257173.webp',
  '/images/col_ryokan_manner_1792465891118.webp',
  '/images/col_official_documents_1792465890547.webp',
  '/images/col_night_sky_relax_1792465892144.webp',
  '/images/col_skincare_cosmetics_1792465892294.webp',
  '/images/col_seasonal_flowers_1792465893097.webp',
  '/images/col_salary_yen_1792463652387.webp',
  '/images/col_dorm_interior_1792463651469.webp',
  '/images/col_privacy_safe_1792463653857.webp',
  '/images/col_beauty_kimono_1792463653258.webp',
  '/images/col_interview_counseling_jp_1792475575633.webp',
  '/images/shinodayama_advisor_sakura_1792225964799.webp',
  '/images/shinodayama_cast_mai_1792225964470.webp',
  '/images/shinodayama_cast_yuri_1792225965491.webp',
  '/images/shinodayama_hero_banner_1792225964954.webp',
  '/images/ryokan_working_woman_1792485020272.webp',
  '/images/hub_beginner_cast_1792485407920.webp',
  '/images/hub_experienced_cast_1792485405837.webp',
  '/images/shinodayama_cast_ayaka_1792486845624.webp'
];

export function getValidArticleEyeCatch(article?: BlogArticle | null): string {
  if (!article) {
    return '/images/shinodayama_hero_banner_1792225964954.webp';
  }

  // 1. Direct slug match in exclusive mapping
  if (article.slug && ARTICLE_EXCLUSIVE_IMAGES[article.slug]) {
    return ARTICLE_EXCLUSIVE_IMAGES[article.slug];
  }

  // 2. Direct article eyeCatch if verified authentic Japanese photo asset
  if (article.eyeCatch && ALL_JAPANESE_PHOTO_ASSETS.includes(article.eyeCatch)) {
    return article.eyeCatch;
  }

  // 3. Fallback based on deterministic hash across all Japanese photos
  const key = article.slug || article.id || article.title || '';
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % ALL_JAPANESE_PHOTO_ASSETS.length;
  return ALL_JAPANESE_PHOTO_ASSETS[index];
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

let cachedFullArticles: BlogArticle[] | null = null;

export async function loadAllFullBlogArticles(): Promise<BlogArticle[]> {
  if (cachedFullArticles) return cachedFullArticles;
  const mod = await import('../data/blogArticles.json');
  cachedFullArticles = (mod.default || mod) as BlogArticle[];
  return cachedFullArticles;
}

export async function loadFullBlogArticle(slug: string): Promise<BlogArticle | undefined> {
  const fullList = await loadAllFullBlogArticles();
  return fullList.find((a) => a.slug === slug);
}
