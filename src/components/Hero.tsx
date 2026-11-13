/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HERO_IMAGE_URL } from '../data';
import LucideIcon from './LucideIcon';
import { SiteContent } from '../siteContent';
import { BlogArticle } from '../blogData';

interface HeroProps {
  content: SiteContent['hero'];
  onCtaclick: () => void;
  onScrollToRequirements?: () => void;
  onBlogClick?: () => void;
  articles?: BlogArticle[];
  onArticleClick?: (slug: string) => void;
}

export default function Hero({
  content,
  onCtaclick,
  onScrollToRequirements,
}: HeroProps) {
  const reassurancePoints = [
    { icon: 'Sparkles', label: '未経験の方も相談OK' },
    { icon: 'CalendarDays', label: '週1日から相談OK' },
    { icon: 'Clock', label: '働き方の相談OK' },
    { icon: 'MessageCircle', label: 'LINEで事前相談OK' },
  ];

  const handleScrollJobs = () => {
    if (onScrollToRequirements) {
      onScrollToRequirements();
    } else {
      const el = document.getElementById('jobs');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative pt-6 sm:pt-10 md:pt-14 pb-12 sm:pb-16 bg-gradient-to-b from-[#FFF6F8] via-[#FFFAFC] to-white overflow-hidden"
      id="hero"
    >
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <p
          className="text-xs sm:text-sm font-bold tracking-[0.12em] text-[#A65D79] mb-2.5 sm:mb-3"
          id="hero-tagline"
        >
          {content.tagline}
        </p>

        {/* Main Display Title (H1) */}
        <h1
          className="font-display font-bold text-2xl sm:text-3xl md:text-[42px] text-[#333333] leading-[1.35] mb-4 sm:mb-5 tracking-tight"
          id="hero-title"
        >
          <span className="block text-base sm:text-xl md:text-2xl font-bold text-[#A65D79] mb-1.5 sm:mb-2">
            {content.titleLine1}
          </span>
          <span className="block">
            自分に合った働き方を、
            <br className="sm:hidden" />
            <span className="text-[#E85B91]">信太山ガールズ</span>
            で見つけませんか？
          </span>
        </h1>

        {/* Concise Sub Description */}
        <div
          className="font-sans text-xs sm:text-sm md:text-base text-[#4A4A4A] leading-relaxed mb-5 sm:mb-6 max-w-2xl space-y-1.5"
          id="hero-description"
        >
          <p className="font-bold text-[#333333]">
            未経験の方も、経験のある方も歓迎。
          </p>
          <p>
            仕事内容・お給料・待遇・働く環境まで、応募前に分かりやすくご案内します。
          </p>
          <p>
            週1日からの勤務や短時間勤務など、希望の働き方もお気軽にご相談ください。
          </p>
        </div>

        {/* 4 Reassurance Points with Subtle Icons */}
        <ul
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-2xl mb-6 sm:mb-7"
          aria-label="信太山ガールズの安心ポイント"
          id="hero-reassurance-points"
        >
          {reassurancePoints.map((pt) => (
            <li
              key={pt.label}
              className="bg-white border border-[#EFE2E7] rounded-xl px-2.5 py-2 sm:py-2.5 flex items-center justify-center gap-1.5 shadow-[0_2px_8px_rgba(166,93,121,0.04)]"
            >
              <LucideIcon name={pt.icon} size={15} className="text-[#E85B91] shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold text-[#333333] whitespace-nowrap">
                {pt.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Main Image + Explicit Official Recruitment Caption */}
        <div className="w-full max-w-[820px] mb-5 sm:mb-6" id="hero-visual">
          <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-[#EFE2E7] shadow-[0_6px_24px_rgba(166,93,121,0.08)] overflow-hidden">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#F7F2EC]">
              <img
                src={HERO_IMAGE_URL}
                alt="信太山新地 信太山ガールズ 公式求人イメージ"
                className="w-full h-auto object-cover aspect-[16/9] sm:aspect-[16/8.5] object-center"
                decoding="async"
                fetchPriority="high"
                width={820}
                height={435}
                referrerPolicy="no-referrer"
                id="hero-img-element"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = '/images/shinodayama_hero_banner_1792225964954.webp';
                }}
              />
            </div>

            {/* Integrated Clear Recruitment Bar Below Image (never ambiguous) */}
            <div className="px-3 sm:px-5 pt-2.5 pb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-left">
              <p className="font-display font-bold text-xs sm:text-sm text-[#333333]">
                信太山ガールズ 公式女性求人｜店先顔出しなし・個室待機・女性スタッフ対応
              </p>
              <span className="text-[11px] text-[#666666] shrink-0">
                ※雰囲気イメージ・見学受付中
              </span>
            </div>
          </div>
        </div>

        {/* Two Large Primary Action Buttons Directly Under Image (Visible in Mobile Viewport) */}
        <div
          className="w-full max-w-[640px] flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
          id="hero-primary-ctas"
        >
          <button
            type="button"
            onClick={onCtaclick}
            id="hero-line-cta-btn"
            className="flex-1 bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white font-display font-bold text-sm sm:text-base py-3.5 sm:py-4 px-6 rounded-2xl shadow-[0_4px_16px_rgba(6,199,85,0.28)] hover:shadow-[0_6px_20px_rgba(6,199,85,0.36)] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <LucideIcon name="MessageCircle" size={20} className="fill-white text-white shrink-0" />
            <span>LINEで気軽に相談する</span>
          </button>

          <button
            type="button"
            onClick={handleScrollJobs}
            id="hero-requirements-btn"
            className="sm:w-auto sm:min-w-[220px] bg-white hover:bg-[#FFF6F8] text-[#A65D79] font-display font-bold text-sm sm:text-base py-3.5 sm:py-4 px-6 rounded-2xl border-2 border-[#E2CED6] hover:border-[#A65D79] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LucideIcon name="ClipboardList" size={18} className="text-[#E85B91] shrink-0" />
            <span>募集条件を確認する</span>
          </button>
        </div>

        <p className="text-[11px] sm:text-xs text-[#666666] mt-3">
          ※相談だけでも大丈夫です。応募を無理におすすめすることはありません。
        </p>
      </div>
    </section>
  );
}
