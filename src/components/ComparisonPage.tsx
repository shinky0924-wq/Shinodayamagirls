/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import {
  WORKSTYLE_8_TYPES,
  WORKSTYLE_OVERVIEW_FAQS,
  WorkstyleTypeItem,
  WorkstyleRelatedLink
} from '../workstyleGuideData';
import { LINE_OFFICIAL_URL } from '../data';
import { updatePageSeo } from '../seo';

interface ComparisonPageProps {
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateFaq?: (category?: string) => void;
  onCtaclick: () => void;
  onInjectedScroll?: (message: string) => void;
  initialCategorySlug?: string | null;
  onSelectCategorySlug?: (slug: string) => void;
  onNavigateComparisonGuide?: () => void;
}

const HERO_ILLUSTRATION_URL = '/images/workstyle_guide_hero_1794546577303.jpg';

function resolveTypeBySlug(slug?: string | null): WorkstyleTypeItem {
  if (!slug || slug === 'all') {
    return WORKSTYLE_8_TYPES[0];
  }
  const found = WORKSTYLE_8_TYPES.find(
    (item) => item.slug === slug || (item.aliases && item.aliases.includes(slug))
  );
  return found || WORKSTYLE_8_TYPES[0];
}

export default function ComparisonPage({
  onNavigateHome,
  onNavigateTopic,
  onNavigateFaq,
  onInjectedScroll,
  initialCategorySlug,
  onSelectCategorySlug,
  onNavigateComparisonGuide
}: ComparisonPageProps) {
  const [activeSlug, setActiveSlug] = useState<string>(() => resolveTypeBySlug(initialCategorySlug).slug);
  const [openTypeFaqIndex, setOpenTypeFaqIndex] = useState<number | null>(0);
  const [openOverviewFaqIndex, setOpenOverviewFaqIndex] = useState<number | null>(0);
  const [heroImageError, setHeroImageError] = useState(false);

  const activeType = useMemo(() => resolveTypeBySlug(activeSlug), [activeSlug]);

  // Sync external initialCategorySlug changes & deep-link scroll
  useEffect(() => {
    if (initialCategorySlug && initialCategorySlug !== 'all') {
      const resolved = resolveTypeBySlug(initialCategorySlug);
      setActiveSlug(resolved.slug);
      setOpenTypeFaqIndex(0);
      const timer = setTimeout(() => {
        const el = document.getElementById('workstyle-detail');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 180);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [initialCategorySlug]);

  // Update SEO metadata cleanly
  useEffect(() => {
    const isSpecific = initialCategorySlug && initialCategorySlug !== 'all';
    const title = isSpecific
      ? `${activeType.title}｜信太山新地・信太山求人 働き方ガイド`
      : '信太山新地 タイプ別働き方ガイド｜未経験・週1日・顔出しなし【公式】';
    const description = isSpecific
      ? activeType.lead
      : '未経験から始めたい方、収入を重視したい方、勤務日数やプライバシーが気になる方まで。あなたの希望やライフスタイルに合わせて、知りたい情報をタイプ別にご紹介します。';
    const canonicalUrl = isSpecific
      ? `https://osaka-shinodayamashinchi-recruit.com/types/${activeType.slug}`
      : 'https://osaka-shinodayamashinchi-recruit.com/types';

    updatePageSeo({
      title,
      description,
      canonicalUrl,
      ogType: 'website'
    });
  }, [activeType, initialCategorySlug]);

  // Inject clean structured data matching actual page content
  useEffect(() => {
    const existingScript = document.getElementById('workstyle-guide-schema');
    if (existingScript) existingScript.remove();

    try {
      const script = document.createElement('script');
      script.id = 'workstyle-guide-schema';
      script.type = 'application/ld+json';

      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://osaka-shinodayamashinchi-recruit.com/types',
        name: 'あなたに合った働き方を見つけよう｜信太山新地 タイプ別働き方ガイド',
        description:
          '未経験から始めたい方、収入を重視したい方、勤務日数やプライバシーが気になる方まで、希望や条件から探せる信太山新地のタイプ別ガイド。',
        url: 'https://osaka-shinodayamashinchi-recruit.com/types',
        mainEntity: {
          '@type': 'ItemList',
          name: '信太山新地 タイプ別働き方ガイド 8選',
          itemListElement: WORKSTYLE_8_TYPES.map((item, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: item.title,
            description: item.cardDescription,
            url: `https://osaka-shinodayamashinchi-recruit.com/types/${item.slug}`
          }))
        }
      };

      script.textContent = JSON.stringify(schemaData);
      document.head.appendChild(script);
    } catch {
      // ignore json-ld injection failure
    }

    return () => {
      const script = document.getElementById('workstyle-guide-schema');
      if (script) script.remove();
    };
  }, []);

  const handleSelectType = (slug: string, shouldScroll = true) => {
    setActiveSlug(slug);
    setOpenTypeFaqIndex(0);
    if (onSelectCategorySlug) {
      onSelectCategorySlug(slug);
    }
    if (shouldScroll) {
      setTimeout(() => {
        const el = document.getElementById('workstyle-detail');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    }
  };

  const handleRelatedNavigation = (link: WorkstyleRelatedLink) => {
    if (link.action === 'home') {
      onNavigateHome();
    } else if (link.action === 'compare' && onNavigateComparisonGuide) {
      onNavigateComparisonGuide();
    } else if (link.action === 'topic' && onNavigateTopic && link.target) {
      onNavigateTopic(link.target);
    } else if (link.action === 'faq' && onNavigateFaq) {
      onNavigateFaq(link.target);
    } else {
      onNavigateHome();
    }
  };

  const handleConsultWithMessage = (msg?: string) => {
    if (onInjectedScroll && msg) {
      onInjectedScroll(msg);
    } else {
      window.open(LINE_OFFICIAL_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article className="min-h-screen bg-[#FFFDFD] text-on-surface pt-4 sm:pt-6 pb-20 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb */}
        <nav aria-label="パンくずリスト" className="mb-6 sm:mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <li>
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-[#E5004F] transition-colors underline cursor-pointer"
              >
                トップ（求人総合）
              </button>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-zinc-800 font-semibold">
              WORK STYLE GUIDE（タイプ別働き方ガイド）
            </li>
          </ol>
        </nav>

        {/* ============================================================
            SECTION 1 & 2: ファーストビュー（上から順番に配置）
           ============================================================ */}
        <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* ① 小さなラベル */}
          <p className="text-xs sm:text-sm font-bold tracking-[0.18em] text-[#E5004F] mb-3">
            WORK STYLE GUIDE
          </p>

          {/* ② メインタイトル */}
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl md:text-[42px] text-zinc-900 leading-tight mb-3 text-balance">
            あなたに合った働き方を見つけよう。
          </h1>

          {/* ③ サブタイトル */}
          <p className="font-display font-bold text-base sm:text-lg text-[#E5004F] mb-4">
            希望や条件から探せる、信太山新地のタイプ別ガイド
          </p>

          {/* ④ 説明文 */}
          <div className="text-xs sm:text-sm md:text-[15px] text-zinc-600 leading-relaxed max-w-2xl mx-auto space-y-2 mb-8">
            <p>
              「どんな働き方が自分に合う？」「未経験でも大丈夫？」「週1日から働ける？」そんな疑問に合わせて、知りたい情報をタイプ別にまとめました。
            </p>
            <p className="text-zinc-500 text-xs sm:text-sm">
              未経験から始めたい方、収入を重視したい方、勤務日数やプライバシーが気になる方まで。あなたの希望やライフスタイルに合わせて、知りたい情報をタイプ別にご紹介します。
            </p>
          </div>

          {/* ⑤ メイン画像（清潔感のある淡いピンク基調のイラスト） */}
          <div className="max-w-xl mx-auto rounded-3xl overflow-hidden border border-rose-200/70 bg-gradient-to-b from-rose-50/70 to-white shadow-xs">
            {!heroImageError ? (
              <img
                src={HERO_ILLUSTRATION_URL}
                alt="スマートフォンで求人情報を見ながら、自分に合った働き方を探している女性のイラスト"
                referrerPolicy="no-referrer"
                onError={() => setHeroImageError(true)}
                className="w-full h-auto aspect-[4/3] object-cover block"
              />
            ) : (
              <div className="w-full aspect-[4/3] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-rose-50 via-white to-pink-50">
                <div className="w-16 h-16 rounded-2xl bg-rose-100 text-[#E5004F] flex items-center justify-center mb-4">
                  <LucideIcon name="Smartphone" size={32} />
                </div>
                <p className="font-bold text-sm text-zinc-800 mb-1">WORK STYLE GUIDE</p>
                <p className="text-xs text-zinc-500">希望や条件に合わせて働き方を探せます</p>
              </div>
            )}
          </div>
        </header>

        {/* ============================================================
            SECTION 3 & 4: 8つのタイプ（PC: 4列×2段 / SP: 2列×4段）
           ============================================================ */}
        <section className="mb-12 sm:mb-16 scroll-mt-24" id="workstyle-types-grid" aria-labelledby="types-grid-heading">
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
            <h2
              id="types-grid-heading"
              className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-zinc-900 mb-2 text-balance"
            >
              希望や条件から、気になるタイプを選ぶ
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600">
              8つのタイプの中から当てはまるものを選ぶと、詳しい情報へ移動します。
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {WORKSTYLE_8_TYPES.map((typeItem) => {
              const isSelected = activeType.slug === typeItem.slug;
              return (
                <a
                  key={typeItem.slug}
                  href={`/types/${typeItem.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectType(typeItem.slug, true);
                  }}
                  aria-current={isSelected ? 'true' : undefined}
                  className={`w-full text-left rounded-2xl p-3.5 sm:p-5 border transition-all duration-200 flex flex-col justify-between cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5004F] ${
                    isSelected
                      ? 'bg-[#FFF7F9] border-[#E5004F]/70 shadow-sm'
                      : 'bg-white border-rose-200/80 hover:border-rose-300 hover:bg-[#FFF9FA] hover:-translate-y-0.5 hover:shadow-xs'
                  }`}
                >
                  <div>
                    {/* Top row: 番号 & アイコン */}
                    <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                      <span className="text-xs sm:text-sm font-extrabold tabular-nums text-[#E5004F] tracking-wider">
                        {typeItem.number}
                      </span>
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#E5004F] text-white'
                            : 'bg-rose-50 text-[#E5004F] group-hover:bg-rose-100'
                        }`}
                      >
                        <LucideIcon name={typeItem.icon} size={18} />
                      </div>
                    </div>

                    {/* タイプ名（太字） */}
                    <h3 className="font-display font-bold text-[13.5px] sm:text-base text-zinc-900 group-hover:text-[#E5004F] leading-snug mb-2 transition-colors">
                      {typeItem.title}
                    </h3>

                    {/* 短い説明文 */}
                    <p className="text-[11.5px] sm:text-xs text-zinc-600 leading-relaxed mb-4">
                      {typeItem.cardDescription}
                    </p>
                  </div>

                  {/* カード下部アクション */}
                  <div className="pt-2.5 sm:pt-3 border-t border-rose-100 flex items-center justify-between gap-1 text-[11px] sm:text-xs font-bold text-[#E5004F]">
                    <span className="leading-tight">{typeItem.buttonLabel}</span>
                    <LucideIcon
                      name="ChevronRight"
                      size={14}
                      className="shrink-0 group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            SECTION 8: ページ中間の相談CTA（8カード直後に設置）
           ============================================================ */}
        <section className="mb-14 sm:mb-18" aria-label="タイプ選びに迷ったときのLINE相談">
          <div className="bg-gradient-to-r from-[#FFF5F7] via-white to-[#FFF5F7] rounded-3xl border border-rose-200/80 p-6 sm:p-8 text-center">
            <h2 className="font-display font-extrabold text-lg sm:text-xl md:text-2xl text-zinc-900 mb-2.5">
              自分に合うタイプが分からなくても大丈夫
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl mx-auto mb-5">
              どんな働き方が合っているか分からない方も、まずは気になることからご相談ください。応募を決める前の情報収集にもご利用いただけます。
            </p>
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-xs transition-all cursor-pointer min-h-[44px]"
            >
              <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
              <span>LINEで気軽に相談する</span>
            </a>
          </div>
        </section>

        {/* ============================================================
            SECTION 5 & 6: タイプ別の詳細コンテンツ
           ============================================================ */}
        <section
          id="workstyle-detail"
          className="mb-16 sm:mb-20 scroll-mt-24"
          aria-labelledby="detail-type-heading"
        >
          {/* Switcher bar for quick browsing across all 8 types */}
          <div className="mb-5">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-bold text-zinc-500">
                選択中のタイプ別ガイドを切り替える
              </span>
              <a
                href="#workstyle-types-grid"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('workstyle-types-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#E5004F] hover:underline flex items-center gap-1"
              >
                <LucideIcon name="ArrowUp" size={12} />
                <span>8タイプ一覧に戻る</span>
              </a>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin -mx-4 px-4 sm:mx-0 sm:px-0">
              {WORKSTYLE_8_TYPES.map((t) => {
                const isActive = t.slug === activeType.slug;
                return (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => handleSelectType(t.slug, false)}
                    className={`shrink-0 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border cursor-pointer flex items-center gap-1.5 min-h-[40px] ${
                      isActive
                        ? 'bg-[#E5004F] text-white border-[#E5004F]'
                        : 'bg-white text-zinc-700 border-rose-200/80 hover:bg-rose-50/70'
                    }`}
                  >
                    <span className="tabular-nums opacity-80">{t.number}</span>
                    <span>{t.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail Card Container (Single-elevation, crisp hairline dividers) */}
          <div className="bg-white rounded-3xl border border-rose-200/80 shadow-xs p-5 sm:p-8 md:p-10">
            {/* Detail Header */}
            <div className="pb-6 mb-8 border-b border-rose-100">
              <div className="flex items-center gap-2 text-xs text-[#E5004F] font-bold tracking-wider mb-2">
                <span className="tabular-nums">TYPE {activeType.number}</span>
                <span aria-hidden="true">·</span>
                <span>タイプ別詳細ガイド</span>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-rose-50 text-[#E5004F] flex items-center justify-center shrink-0">
                  <LucideIcon name={activeType.icon} size={22} />
                </div>
                <div>
                  <h2
                    id="detail-type-heading"
                    className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-zinc-900 mb-2"
                  >
                    {activeType.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-[15px] text-zinc-600 leading-relaxed">
                    {activeType.lead}
                  </p>
                </div>
              </div>
            </div>

            {/* 1. どんな女性に向いているか & 2. どんな働き方を検討できるか */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 mb-8 border-b border-rose-100">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 mb-3 flex items-center gap-2">
                  <LucideIcon name="UserCheck" size={18} className="text-[#E5004F] shrink-0" />
                  <span>どんな女性に向いているか</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700">
                  {activeType.suitableFor.map((point) => (
                    <li key={point} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-[#E5004F] font-bold mt-0.5 shrink-0">・</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 mb-3 flex items-center gap-2">
                  <LucideIcon name="Compass" size={18} className="text-[#E5004F] shrink-0" />
                  <span>どんな働き方を検討できるか</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700">
                  {activeType.considerations.map((point) => (
                    <li key={point} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-[#E5004F] font-bold mt-0.5 shrink-0">・</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. タイプ別の具体的なテーマ解説 (Section 6) */}
            <div className="pb-8 mb-8 border-b border-rose-100">
              <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 mb-5 flex items-center gap-2">
                <LucideIcon name="BookOpen" size={18} className="text-[#E5004F] shrink-0" />
                <span>「{activeType.title}」で確認したいポイント詳細</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {activeType.specificTopics.map((topic, idx) => (
                  <div key={topic.title} className="pb-4 border-b border-rose-100/60 sm:border-b-0 sm:pb-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-extrabold tabular-nums text-[#E5004F]">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <h4 className="font-bold text-sm sm:text-[15px] text-zinc-900">
                        {topic.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed pl-6">
                      {topic.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. 事前に確認したい条件 */}
            <div className="pb-8 mb-8 border-b border-rose-100">
              <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 mb-3 flex items-center gap-2">
                <LucideIcon name="ClipboardCheck" size={18} className="text-[#E5004F] shrink-0" />
                <span>応募・相談前に確認したい条件</span>
              </h3>
              <p className="text-xs text-zinc-500 mb-4">
                ※実際の採用条件・待遇・受け入れ枠はお店によって異なります。相談時に以下の点を確かめておくとスムーズです。
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-700">
                {activeType.preCheckList.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 bg-[#FFF9FA] p-3.5 rounded-xl border border-rose-100"
                  >
                    <LucideIcon name="Check" size={15} className="text-[#E5004F] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. このタイプに関するよくある疑問 */}
            <div className="pb-8 mb-8 border-b border-rose-100">
              <h3 className="font-display font-bold text-base sm:text-lg text-zinc-900 mb-4 flex items-center gap-2">
                <LucideIcon name="HelpCircle" size={18} className="text-[#E5004F] shrink-0" />
                <span>「{activeType.title}」についてのよくある疑問</span>
              </h3>
              <div className="space-y-3">
                {activeType.faqs.map((faq, idx) => {
                  const isOpen = openTypeFaqIndex === idx;
                  return (
                    <div
                      key={faq.q}
                      className="rounded-2xl border border-rose-100 bg-[#FFFDFD] overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenTypeFaqIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full text-left p-4 font-bold text-xs sm:text-sm text-zinc-900 flex items-center justify-between gap-3 hover:text-[#E5004F] transition-colors cursor-pointer min-h-[44px]"
                      >
                        <span className="flex items-start gap-2">
                          <span className="text-[#E5004F] font-extrabold shrink-0">Q.</span>
                          <span>{faq.q}</span>
                        </span>
                        <LucideIcon
                          name="ChevronDown"
                          size={16}
                          className={`shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#E5004F]' : 'text-zinc-400'
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-2 border-t border-rose-100/70 text-xs sm:text-sm text-zinc-600 leading-relaxed flex items-start gap-2 bg-rose-50/25">
                          <span className="text-[#E5004F] font-extrabold shrink-0">A.</span>
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 6. 関連する求人・情報へのリンク ＆ LINE相談ボタン */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h4 className="text-xs font-bold text-zinc-500 mb-2.5">
                  関連する求人・詳細情報へのリンク
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeType.relatedLinks.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => handleRelatedNavigation(link)}
                      className="text-xs font-semibold text-zinc-700 hover:text-[#E5004F] bg-white hover:bg-rose-50/60 border border-rose-200/80 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1 cursor-pointer min-h-[40px]"
                    >
                      <span>{link.label}</span>
                      <LucideIcon name="ChevronRight" size={13} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                <a
                  href={LINE_OFFICIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (onInjectedScroll) {
                      e.preventDefault();
                      handleConsultWithMessage(activeType.lineMessage);
                    }
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xs transition-all cursor-pointer min-h-[44px]"
                >
                  <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
                  <span>「{activeType.title}」についてLINEで相談する</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 9: よくある質問（8問を整理して掲載）
           ============================================================ */}
        <section className="mb-16 sm:mb-20 scroll-mt-24 max-w-3xl mx-auto" id="workstyle-faqs" aria-labelledby="overview-faq-heading">
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-[0.16em] text-[#E5004F] mb-2">
              FAQ
            </p>
            <h2
              id="overview-faq-heading"
              className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-zinc-900 mb-2"
            >
              よくある質問
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600">
              働き方選びやご相談の前によく寄せられる質問をまとめました。
            </p>
          </div>

          <div className="space-y-3">
            {WORKSTYLE_OVERVIEW_FAQS.map((faq, idx) => {
              const isOpen = openOverviewFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-rose-100 shadow-2xs overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenOverviewFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-4 sm:p-5 font-bold text-xs sm:text-sm text-zinc-900 flex items-center justify-between gap-3 hover:text-[#E5004F] transition-colors cursor-pointer min-h-[48px]"
                  >
                    <span className="flex items-start gap-2.5">
                      <span className="text-[#E5004F] font-extrabold shrink-0">Q.</span>
                      <span>{faq.q}</span>
                    </span>
                    <LucideIcon
                      name="ChevronDown"
                      size={18}
                      className={`shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#E5004F]' : 'text-zinc-400'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2.5 border-t border-rose-50 text-xs sm:text-sm text-zinc-600 leading-relaxed flex items-start gap-2.5 bg-rose-50/20">
                      <span className="text-[#E5004F] font-extrabold shrink-0">A.</span>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            SECTION 10: 最後のCTA
           ============================================================ */}
        <section aria-labelledby="final-cta-heading">
          <div className="bg-gradient-to-br from-[#FFF4F6] via-white to-[#FFF4F6] rounded-3xl border border-rose-200 p-7 sm:p-10 md:p-12 text-center shadow-xs">
            <h2
              id="final-cta-heading"
              className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-zinc-900 mb-3 text-balance"
            >
              あなたに合った働き方を一緒に見つけませんか？
            </h2>
            <p className="text-xs sm:text-sm md:text-[15px] text-zinc-600 leading-relaxed max-w-xl mx-auto mb-7">
              未経験・収入・出勤日数・身バレ対策など、気になることをお気軽にご相談ください。まだ働くか決めていなくても大丈夫です。
            </p>

            <div className="flex flex-col items-center gap-4">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-w-[260px] inline-flex items-center justify-center gap-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-sm transition-all cursor-pointer min-h-[48px]"
              >
                <LucideIcon name="MessageCircle" size={20} className="fill-white shrink-0" />
                <span>LINEで無料相談する</span>
              </a>

              <button
                type="button"
                onClick={onNavigateHome}
                className="text-xs sm:text-sm font-bold text-[#E5004F] hover:underline flex items-center gap-1 cursor-pointer py-1.5"
              >
                <span>信太山新地の求人一覧を見る</span>
                <LucideIcon name="ChevronRight" size={14} />
              </button>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}
