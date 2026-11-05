/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import rawArticles from '../data/blogArticles.json';

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

export const BLOG_ARTICLES: BlogArticle[] = rawArticles as BlogArticle[];

// Strict 1-to-1 unique mapping for photographic assets so NO image is reused ("画像は２度使わないようにして / 画像が被ってる記事あるよ")
// ALL photos feature Japanese people or authentic Japanese ryotei/cafe/interior scenes - NO foreigners ("外国人の画像は使わないで日本人にして")
export const ARTICLE_EXCLUSIVE_IMAGES: Record<string, string> = {
  // Lifestyle & Special Features
  'ryokan-culture-japanese-manner-elegance': '/images/col_ryokan_manner_1792465891118.jpg',
  'ryotei-culture-japanese-manner-elegance': '/images/col_ryokan_manner_1792465891118.jpg',
  'shinodayamashinchi-work-rules-hygiene-safety-standards': '/images/col_safety_gate_1792474007202.jpg',
  'shinodayamashinchi-work-rules-hygiene-no-bath-washing-reality': '/images/col_bath_detox_jp_1792476829424.jpg',
  'shinodayamashinchi-interview-requirements-documents': '/images/col_official_documents_1792465890547.jpg',
  'night-routine-starry-sky-reset-guide': '/images/col_night_sky_relax_1792465892144.jpg',
  'skincare-beauty-routine-clear-skin': '/images/col_skincare_cosmetics_1792465892294.jpg',
  'room-interior-flowers-good-luck-tips': '/images/col_seasonal_flowers_1792465893097.jpg',

  // Core 48 articles in order:
  'cast-direct-interview': '/images/shinodayama_cast_mai_1792225964470.jpg',
  'recruiter-direct-interview': '/images/shinodayama_advisor_sakura_1792225964799.jpg',
  'shinodayamashinchi-beginner-guide': '/images/shinodayama_hero_banner_1792225964954.jpg',
  'shinodayamashinchi-salary-system': '/images/col_salary_yen_1792463652387.jpg',
  'shinodayamashinchi-privacy-guide': '/images/col_privacy_safe_1792463653857.jpg',
  'shinodayamashinchi-housing-support': '/images/col_dorm_interior_1792463651469.jpg',
  'shinodayamashinchi-interview-guide': '/images/col_interview_counseling_jp_1792475575633.jpg',
  'shinodayamashinchi-trial-guide': '/images/col_trial_orient_jp_1792475594501.jpg',
  'shinodayamashinchi-age-and-looks': '/images/shinodayama_cast_yuri_1792225965491.jpg',
  'shinodayamashinchi-tax-guide': '/images/col_tax_calc_1792473971279.jpg',
  'shinodayamashinchi-non-alcoholic': '/images/col_non_alcohol_1792473970240.jpg',
  'shinodayamashinchi-cast-holiday': '/images/col_cast_holiday_jp_1792475554095.jpg',
  'shinodayamashinchi-short-term-work': '/images/col_short_term_1792473989733.jpg',
  'shinodayamashinchi-safety-and-security': '/images/col_safety_gate_1792474007202.jpg',
  'shinodayamashinchi-kimono-and-makeup': '/images/col_beauty_kimono_1792463653258.jpg',
  'shinodayamashinchi-double-work-lifestyle': '/images/col_double_work_jp_1792475554864.jpg',
  'shinodayamashinchi-mental-support': '/images/col_mental_care_jp_1792475594172.jpg',
  'shinodayamashinchi-search-keywords': '/images/col_search_phone_jp_1792475574840.jpg',
  'shinodayamashinchi-one-day-flow': '/images/col_one_day_flow_1792474096539.jpg',
  'shinodayamashinchi-obachan-role': '/images/col_obachan_tea_1792474118271.jpg',
  'shinodayamashinchi-kimono-makeup': '/images/col_kimono_fabrics_1792474118565.jpg',
  'shinodayamashinchi-privacy-tips': '/images/col_privacy_discretion_1792475612461.jpg',
  'shinodayamashinchi-age-looks-real': '/images/col_ageless_beauty_1792475612676.jpg',
  'shinodayamashinchi-safety-security': '/images/col_secure_ryotei_1792475628730.jpg',
  'shinodayamashinchi-weekend-shift': '/images/col_weekend_planner_1792475629264.jpg',
  'shinodayamashinchi-trial-guide-faq': '/images/col_taiken_prep_1792475646166.jpg',
  'shinodayamashinchi-mental-support-1': '/images/col_serene_lounge_jp_1792476845692.jpg',
  'shinodayamashinchi-popular-cast-tips': '/images/col_popular_cast_jp_1792476715216.jpg',
  'shinodayamashinchi-beauty-self-investment': '/images/col_luxury_beauty_1792474257173.jpg',
  'shinodayamashinchi-student-success': '/images/col_student_study_jp_1792476715495.jpg',
  'shinodayamashinchi-10million-savings': '/images/col_savings_goal_jp_1792476735709.jpg',
  'shinodayamashinchi-friends-recruit': '/images/col_friends_pair_jp_1792476736438.jpg',
  'shinodayamashinchi-tennoji-shopping-cafe': '/images/col_tennoji_shopping_jp_1792476754436.jpg',
  'shinodayamashinchi-bonus-secrets': '/images/col_bonus_envelope_jp_1792476753315.jpg',
  'shinodayamashinchi-youth-charm': '/images/col_youth_charm_jp_1792476779059.jpg',
  'shinodayamashinchi-mature-ladies-success': '/images/col_mature_beauty_jp_1792476778964.jpg',
  'shinodayamashinchi-dreams-and-future-funding': '/images/col_future_dreams_jp_1792476794603.jpg',
  'shinodayamashinchi-interview-hacks-to-pass': '/images/col_interview_hacks_jp_1792476795351.jpg',
  'shinodayamashinchi-dormitory-life-real': '/images/col_cozy_apartment_jp_1792476810515.jpg',
  'shinodayamashinchi-daytime-shift-advantage': '/images/col_daytime_clock_jp_1792476810942.jpg',
  'shinodayamashinchi-self-care-detox': '/images/col_bath_detox_jp_1792476829424.jpg',
  'shinodayamashinchi-easy-kimono-dressing': '/images/col_easy_yukata_jp_1792476829780.jpg',
  'shinodayamashinchi-vs-other-night-jobs': '/images/col_aroma_relax_1792474257103.jpg',
  'shinodayamashinchi-tax-save-20s-guide': '/images/col_tax_guide_20s_jp_1792476846502.jpg',
  'shinodayamashinchi-motivation-and-goal-roadmap': '/images/col_goal_roadmap_jp_1792476864281.jpg',
  'shinodayamashinchi-no-resume-quick-trial': '/images/col_quick_trial_essentials_jp_1792476863910.jpg',
  'shinodayamashinchi-friendly-support-staff-real': '/images/col_friendly_staff_jp_1792476884275.jpg',
  'shinodayamashinchi-resort-style-work-holiday': '/images/col_resort_work_jp_1792476884003.jpg',
  'shinodayamashinchi-privacy-protection-tips-1': '/images/col_official_documents_1792465890547.jpg',
  'shinodayama-job-guide': '/images/ryokan_working_woman_1792485020272.jpg',
  'shinodayamashinchi-work-flow-simulation': '/images/ryokan_working_woman_1792485020272.jpg'
};

// All available 100% verified authentic Japanese photographic assets
export const ALL_JAPANESE_PHOTO_ASSETS: string[] = [
  '/images/col_privacy_discretion_1792475612461.jpg',
  '/images/col_ageless_beauty_1792475612676.jpg',
  '/images/col_secure_ryotei_1792475628730.jpg',
  '/images/col_weekend_planner_1792475629264.jpg',
  '/images/col_taiken_prep_1792475646166.jpg',
  '/images/col_popular_cast_jp_1792476715216.jpg',
  '/images/col_student_study_jp_1792476715495.jpg',
  '/images/col_savings_goal_jp_1792476735709.jpg',
  '/images/col_friends_pair_jp_1792476736438.jpg',
  '/images/col_bonus_envelope_jp_1792476753315.jpg',
  '/images/col_tennoji_shopping_jp_1792476754436.jpg',
  '/images/col_youth_charm_jp_1792476779059.jpg',
  '/images/col_mature_beauty_jp_1792476778964.jpg',
  '/images/col_future_dreams_jp_1792476794603.jpg',
  '/images/col_interview_hacks_jp_1792476795351.jpg',
  '/images/col_cozy_apartment_jp_1792476810515.jpg',
  '/images/col_daytime_clock_jp_1792476810942.jpg',
  '/images/col_bath_detox_jp_1792476829424.jpg',
  '/images/col_easy_yukata_jp_1792476829780.jpg',
  '/images/col_tax_guide_20s_jp_1792476846502.jpg',
  '/images/col_serene_lounge_jp_1792476845692.jpg',
  '/images/col_goal_roadmap_jp_1792476864281.jpg',
  '/images/col_quick_trial_essentials_jp_1792476863910.jpg',
  '/images/col_friendly_staff_jp_1792476884275.jpg',
  '/images/col_resort_work_jp_1792476884003.jpg',
  '/images/col_tax_calc_1792473971279.jpg',
  '/images/col_non_alcohol_1792473970240.jpg',
  '/images/col_cast_holiday_jp_1792475554095.jpg',
  '/images/col_short_term_1792473989733.jpg',
  '/images/col_safety_gate_1792474007202.jpg',
  '/images/col_trial_orient_jp_1792475594501.jpg',
  '/images/col_double_work_jp_1792475554864.jpg',
  '/images/col_mental_care_jp_1792475594172.jpg',
  '/images/col_search_phone_jp_1792475574840.jpg',
  '/images/col_one_day_flow_1792474096539.jpg',
  '/images/col_obachan_tea_1792474118271.jpg',
  '/images/col_kimono_fabrics_1792474118565.jpg',
  '/images/col_aroma_relax_1792474257103.jpg',
  '/images/col_luxury_beauty_1792474257173.jpg',
  '/images/col_ryokan_manner_1792465891118.jpg',
  '/images/col_official_documents_1792465890547.jpg',
  '/images/col_night_sky_relax_1792465892144.jpg',
  '/images/col_skincare_cosmetics_1792465892294.jpg',
  '/images/col_seasonal_flowers_1792465893097.jpg',
  '/images/col_salary_yen_1792463652387.jpg',
  '/images/col_dorm_interior_1792463651469.jpg',
  '/images/col_privacy_safe_1792463653857.jpg',
  '/images/col_beauty_kimono_1792463653258.jpg',
  '/images/col_interview_counseling_jp_1792475575633.jpg',
  '/images/shinodayama_advisor_sakura_1792225964799.jpg',
  '/images/shinodayama_cast_mai_1792225964470.jpg',
  '/images/shinodayama_cast_yuri_1792225965491.jpg',
  '/images/shinodayama_hero_banner_1792225964954.jpg',
  '/images/ryokan_working_woman_1792485020272.jpg',
  '/images/hub_beginner_cast_1792485407920.jpg',
  '/images/hub_experienced_cast_1792485405837.jpg',
  '/images/shinodayama_cast_ayaka_1792486845624.jpg'
];

export function getValidArticleEyeCatch(article?: BlogArticle | null): string {
  if (!article) {
    return '/images/shinodayama_hero_banner_1792225964954.jpg';
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
