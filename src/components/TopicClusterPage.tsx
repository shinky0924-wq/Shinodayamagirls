/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import LucideIcon from './LucideIcon';
import { TOPIC_CLUSTERS, ALL_CLUSTER_NODES, TopicClusterData } from '../topicClusterData';
import { BLOG_ARTICLES } from '../blogData';
import SalaryPageContent from './SalaryPageContent';
import BenefitsPageContent from './BenefitsPageContent';
import { getStoredSiteContent } from '../siteContent';
import { updatePageSeo } from '../seo';

interface TopicClusterPageProps {
  topicId: string;
  onNavigateHome: () => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateBlog: (slug?: string) => void;
  onNavigateFaq: () => void;
  onCtaclick: () => void;
  onInjectedScroll?: (msg: string) => void;
  onNavigateCompare?: () => void;
}

// Topic-specific visual enhancement assets for preventing bounce and engaging visitors
const TOPIC_VISUAL_ASSETS: Record<string, {
  secondaryImage: string;
  imageCaption: string;
  reassuranceTags: string[];
  icon: string;
  accentBg: string;
}> = {
  job: {
    secondaryImage: '/images/col_ryokan_manner_1792465891118.jpg',
    imageCaption: '落ち着いた旅館客室・店先顔見せなし・完全個室待機',
    reassuranceTags: ['店先顔見せ一切なし', '完全個室待機', '15分〜短時間接客', '絶対ゴム着用厳守', '部屋掃除不要'],
    icon: 'HeartHandshake',
    accentBg: 'from-emerald-50 via-white to-teal-50/30',
  },
  salary: {
    secondaryImage: '/images/col_bonus_envelope_jp_1792476753315.jpg',
    imageCaption: '全額即日現金手渡し・引かれ物一切ゼロの明朗会計',
    reassuranceTags: ['15分3,800円〜高額支給', '退勤時全額現金手渡し', '雑費・待機料天引きゼロ', '時給1万円保証完備'],
    icon: 'Coins',
    accentBg: 'from-amber-50 via-white to-orange-50/30',
  },
  benefits: {
    secondaryImage: '/images/col_ryokan_manner_1792465891118.jpg',
    imageCaption: '手ぶら出勤OK・衣装無料レンタル・完全個室待機',
    reassuranceTags: ['雑費天引き完全0円', '家具家電付き個室寮', '新幹線・飛行機代全額支給', '提携託児所完備', '店先顔出しなし'],
    icon: 'HeartHandshake',
    accentBg: 'from-pink-50 via-white to-rose-50/30',
  },
  beginner: {
    secondaryImage: '/images/col_friendly_staff_jp_1792476884275.jpg',
    imageCaption: '在籍の約90%が夜職未経験スタート・女性スタッフが親身に伴走',
    reassuranceTags: ['未経験率約90%', '履歴書不要・私服手ぶら面接', '営業活動・写真公開一切なし', '20代〜40代幅広く歓迎'],
    icon: 'Sparkles',
    accentBg: 'from-rose-50 via-white to-pink-50/30',
  },
  experienced: {
    secondaryImage: '/images/col_popular_cast_jp_1792476715216.jpg',
    imageCaption: '他業種からの移籍人気No.1・営業連絡や写真公開のストレスから解放',
    reassuranceTags: ['Webパネル写真なし', '営業LINE一切不要', 'お風呂掃除などの肉体労働ゼロ', '即戦力高日給'],
    icon: 'Award',
    accentBg: 'from-purple-50 via-white to-indigo-50/30',
  },
  requirements: {
    secondaryImage: '/images/col_official_documents_1792465890547.jpg',
    imageCaption: '顔写真付き身分証明書1点のみでOK・住民票は必須ではありません',
    reassuranceTags: ['20歳以上の女性限定', '履歴書一切不要', '顔写真付き身分証のみでOK', '私服で手ぶら見学OK'],
    icon: 'FileText',
    accentBg: 'from-blue-50 via-white to-cyan-50/30',
  },
  flow: {
    secondaryImage: '/images/col_taiken_prep_1792475646166.jpg',
    imageCaption: '応募〜面接・即日体験入店〜お給料手渡しまで最短当日に完結',
    reassuranceTags: ['公式LINEで即予約', '駅までお迎え送迎あり', '衣装・アメニティ完全無料', '体入終了後に全額日払い'],
    icon: 'Calendar',
    accentBg: 'from-rose-50 via-white to-amber-50/30',
  },
  workstyle: {
    secondaryImage: '/images/col_daytime_clock_jp_1792476810942.jpg',
    imageCaption: '10:00〜24:00完全自由出勤制・週1日・短時間・週末のみ自由自在',
    reassuranceTags: ['完全自由シフト制', '週1日・短時間OK', '昼シフト・夜シフト選択自由', '長期休暇・旅行OK'],
    icon: 'Clock',
    accentBg: 'from-orange-50 via-white to-rose-50/30',
  },
  shops: {
    secondaryImage: '/images/col_secure_ryotei_1792475628730.jpg',
    imageCaption: '信太山新地屈指の直営老舗旅館・清潔な個室待機室と設備完備',
    reassuranceTags: ['老舗旅館直営店', 'オートロック・警備万全', 'Wi-Fi・冷暖房完備の個室待機', '無料レンタル衣装充実'],
    icon: 'Building2',
    accentBg: 'from-emerald-50 via-white to-cyan-50/30',
  },
  dorm: {
    secondaryImage: '/images/col_cozy_apartment_jp_1792476810515.jpg',
    imageCaption: '家具・家電付き即入居完全個室寮・出稼ぎ・遠方からの応募大歓迎',
    reassuranceTags: ['即日入居OKの完全個室', '家具・家電・Wi-Fi完備', 'JR天王寺まで直通約20分', '初期費用ゼロ・手ぶらOK'],
    icon: 'Home',
    accentBg: 'from-teal-50 via-white to-emerald-50/30',
  },
  safety: {
    secondaryImage: '/images/col_safety_gate_1792474007202.jpg',
    imageCaption: '店先顔出し一切なし・完全個室待機・厳格なプライバシー保護規約',
    reassuranceTags: ['店先顔見せ一切なし', '完全個室待機で鉢合わせゼロ', 'ネット写真・SNS掲載厳禁', 'アリバイ・副業対策万全'],
    icon: 'ShieldCheck',
    accentBg: 'from-rose-50 via-white to-purple-50/30',
  },
};

export default function TopicClusterPage({
  topicId,
  onNavigateHome,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onCtaclick,
  onInjectedScroll,
  onNavigateCompare,
}: TopicClusterPageProps) {
  const data: TopicClusterData = TOPIC_CLUSTERS[topicId] || TOPIC_CLUSTERS.job;
  const siteContent = getStoredSiteContent();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Cluster Navigation Carousel Scroll State
  const navScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!navScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Automatically scroll active button into center on topic change
  useEffect(() => {
    if (navScrollRef.current) {
      const activeBtn = navScrollRef.current.querySelector('[data-active="true"]') as HTMLElement | null;
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
    const timer = setTimeout(checkScroll, 350);
    return () => clearTimeout(timer);
  }, [topicId]);

  const scrollNav = (direction: 'left' | 'right') => {
    if (!navScrollRef.current) return;
    const offset = direction === 'left' ? -260 : 260;
    navScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  const visualAsset = TOPIC_VISUAL_ASSETS[topicId] || {
    secondaryImage: '/images/shinodayama_hero_banner_1792225964954.jpg',
    imageCaption: '信太山新地 直営老舗旅館グループ',
    reassuranceTags: ['店先顔見せなし', '完全個室待機', '即日全額日払い', '履歴書不要'],
    icon: 'Sparkles',
    accentBg: 'from-rose-50 via-white to-pink-50/30',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicId]);

  // Synchronize Page Title, Meta, Canonical & JSON-LD Structured Data
  useEffect(() => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `https://shinodayamashinchi-recruit.com${data.path}#article`,
          'headline': data.title,
          'description': data.metaDescription || data.overview,
          'image': data.heroImage ? `https://shinodayamashinchi-recruit.com${data.heroImage}` : undefined,
          'inLanguage': 'ja-JP',
          'author': {
            '@type': 'Organization',
            'name': '信太山ガールズ（信太山新地 旅館直営公式採用窓口）'
          },
          'publisher': {
            '@type': 'Organization',
            'name': '信太山ガールズ',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://shinodayamashinchi-recruit.com/favicon.png'
            }
          },
          'speakable': {
            '@type': 'SpeakableSpecification',
            'cssSelector': ['#llm-direct-answer-text', 'h1']
          },
          'about': {
            '@type': 'Thing',
            'name': '信太山新地求人・旅館直営・即日全額日払い'
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `https://shinodayamashinchi-recruit.com${data.path}#breadcrumb`,
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': '信太山新地求人トップ',
              'item': 'https://shinodayamashinchi-recruit.com/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': data.title,
              'item': `https://shinodayamashinchi-recruit.com${data.path}`
            }
          ]
        },
        {
          '@type': 'FAQPage',
          '@id': `https://shinodayamashinchi-recruit.com${data.path}#faq`,
          'mainEntity': (data.faqs || []).map((item) => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': item.a
            }
          }))
        }
      ]
    };

    updatePageSeo({
      title: data.seoTitle || `${data.title}｜信太山新地求人 公式分野別ガイド【信太山ガールズ】`,
      description: data.metaDescription || `${data.overview} 信太山新地の旅館直営公式求人情報。店先顔見せなし・完全個室待機・即日全額日払い。`,
      canonicalUrl: `https://shinodayamashinchi-recruit.com${data.path}`,
      ogImage: data.heroImage || visualAsset.secondaryImage,
      ogType: 'article',
      jsonLd: schemaData
    });
  }, [data, visualAsset]);

  // Find featured articles from blogData
  const featuredArticles = (data.featuredArticleSlugs || [])
    .map((slug) => BLOG_ARTICLES.find((a) => a.slug === slug))
    .filter(Boolean);

  const handleLineConsultation = () => {
    const defaultMsg = `【信太山新地の当店へ応募・相談】${data.title}（${data.badge}）について詳しく相談したいです。`;
    if (onInjectedScroll) {
      onInjectedScroll(defaultMsg);
    } else {
      onCtaclick();
    }
  };

  // Helper icons for checklist points
  const getKeyPointIcon = (index: number) => {
    const icons = ['CheckCircle2', 'HeartHandshake', 'ShieldCheck', 'Clock', 'Coins', 'Sparkles', 'Building2', 'Smile'];
    return icons[index % icons.length];
  };

  return (
    <div className="bg-surface min-h-screen text-zinc-900 pb-20 pt-4 sm:pt-6">
      
      {/* 1. Breadcrumbs Navigation */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mb-4">
        <nav 
          aria-label="Breadcrumb" 
          className="flex items-center text-xs"
        >
          <ol
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            className="flex items-center gap-1.5 flex-wrap text-zinc-600"
          >
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-1"
            >
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-rose-600 font-bold flex items-center gap-1 text-zinc-700 hover:underline cursor-pointer"
                id="breadcrumb-hub-home"
              >
                <LucideIcon name="Home" size={13} className="text-rose-500" />
                <span itemProp="name">信太山新地求人（トップ）</span>
              </button>
              <meta itemProp="position" content="1" />
              <meta itemProp="item" content="https://shinodayamashinchi-recruit.com/" />
            </li>
            <li className="text-zinc-400">/</li>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-1 text-rose-700 font-bold"
              aria-current="page"
            >
              <span>{data.emoji}</span>
              <span itemProp="name">{data.title}</span>
              <meta itemProp="position" content="2" />
              <meta itemProp="item" content={`https://shinodayamashinchi-recruit.com${data.path}`} />
            </li>
          </ol>
        </nav>
      </div>

      {/* 2. Topic Cluster Quick Switcher Carousel Bar */}
      <div className="bg-gradient-to-r from-rose-50/90 via-white to-pink-50/90 border-y border-rose-200/80 py-2.5 mb-6 md:mb-8 sticky top-0 z-30 backdrop-blur-md bg-white/95 shadow-xs">
        <div className="max-w-[1140px] mx-auto px-2 sm:px-6 relative flex items-center">
          
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollNav('left')}
              className="absolute left-1 sm:left-2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 border border-rose-300 shadow-md text-zinc-700 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center cursor-pointer transition-all shrink-0"
              aria-label="前へスクロール"
            >
              <LucideIcon name="ChevronLeft" size={16} />
            </button>
          )}

          {/* Left subtle fade mask */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
          )}

          {/* Scroll Container */}
          <div
            ref={navScrollRef}
            onScroll={checkScroll}
            className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 px-1 sm:px-2 w-full scroll-smooth"
          >
            <button
              type="button"
              onClick={onNavigateHome}
              className="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-zinc-700 hover:text-rose-600 border border-rose-200/80 hover:bg-rose-50 transition-all cursor-pointer shadow-2xs flex items-center gap-1"
            >
              <LucideIcon name="Home" size={13} className="text-rose-500" />
              <span>求人トップ</span>
            </button>
            
            <div className="h-4 w-px bg-rose-200 mx-1 shrink-0" />

            {ALL_CLUSTER_NODES.filter(n => n.id !== 'recruit').map((node) => {
              const isActive = node.id === topicId;
              return (
                <button
                  key={node.id}
                  type="button"
                  data-active={isActive ? "true" : undefined}
                  onClick={() => {
                    if (node.id === 'faq') {
                      onNavigateFaq();
                    } else if (node.id === 'blog') {
                      onNavigateBlog();
                    } else {
                      onNavigateTopic(node.id);
                    }
                  }}
                  className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs ${
                    isActive
                      ? 'bg-rose-600 text-white font-extrabold shadow-sm ring-2 ring-rose-300'
                      : 'bg-white text-zinc-700 hover:text-rose-600 border border-gray-200/80 hover:bg-rose-50'
                  }`}
                >
                  <span className="shrink-0">{node.emoji}</span>
                  <span className="whitespace-nowrap">{node.title}</span>
                </button>
              );
            })}
          </div>

          {/* Right subtle fade mask */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
          )}

          {/* Right Arrow Button */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollNav('right')}
              className="absolute right-1 sm:right-2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 border border-rose-300 shadow-md text-zinc-700 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center cursor-pointer transition-all shrink-0 hover:scale-105"
              aria-label="次へスクロール"
            >
              <LucideIcon name="ChevronRight" size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        
        {/* 3. Hero Visual Header (2-Column Magazine Style with Real Japanese Photography) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-rose-100 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-rose-100/40 via-pink-50/20 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Text & Structured Info */}
            <div className="lg:col-span-7">
              {/* Trust Badges */}
              <div className="flex items-center gap-2 mb-3.5 flex-wrap">
                <span className="inline-flex items-center gap-1 bg-rose-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-2xs">
                  <LucideIcon name="ShieldCheck" size={12} />
                  <span>信太山新地 老舗旅館直営【当店公式採用情報】</span>
                </span>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-2xs ${data.badgeColor}`}>
                  {data.emoji} {data.badge}
                </span>
              </div>

              {/* Main Title H1 */}
              <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-3 tracking-tight">
                {data.title}
                <span className="block text-base sm:text-lg font-bold text-rose-600 mt-1.5 font-sans">
                  {data.tagline}
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                {data.overview}
              </p>

              {/* Direct Answer & Summary Section */}
              <section
                id="llm-direct-answer"
                aria-label={`${data.title}の安心ポイントまとめ`}
                data-entity-type="DirectAnswer"
                data-llm-topic={topicId}
                itemScope
                itemType="https://schema.org/Answer"
                className="bg-gradient-to-r from-rose-50/90 via-pink-50/60 to-white rounded-2xl p-4 sm:p-5 border border-rose-200/90 mb-6 shadow-2xs relative"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                    <LucideIcon name="Sparkles" size={15} className="text-rose-600 shrink-0" />
                    <span className="font-black">ここだけ読めば安心！30秒でわかる要点まとめ</span>
                  </div>
                  <span className="hidden sm:inline-flex text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                    信太山新地 当店公式
                  </span>
                </div>
                <p
                  id="llm-direct-answer-text"
                  itemProp="text"
                  className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium"
                >
                  {data.llmDirectAnswer}
                </p>
              </section>

              {/* Quick LINE Consultation Pill */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleLineConsultation}
                  className="bg-[#06c755] hover:bg-[#05b34c] text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <LucideIcon name="MessageCircle" size={16} className="fill-white" />
                  <span>信太山新地の当店へLINEで応募・質問する</span>
                </button>
                <span className="text-[11px] text-zinc-500 font-medium">
                  ※完全匿名・相談のみ大歓迎
                </span>
              </div>
            </div>

            {/* Right Column: High-Resolution Photo Hero Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-rose-100 shadow-lg group">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-rose-50">
                  <img
                    src={data.heroImage || visualAsset.secondaryImage}
                    alt={data.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/shinodayama_hero_banner_1792225964954.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Stamp Badge */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="inline-flex items-center gap-1 bg-white/95 text-rose-700 font-black text-[11px] px-3 py-1 rounded-full shadow-md border border-rose-200">
                      <LucideIcon name="Sparkles" size={12} className="text-rose-500" />
                      <span>直営旅館 現場写真</span>
                    </span>
                  </div>

                  {/* Caption & Floating Reassurance Badges */}
                  <div className="absolute bottom-3 left-3.5 right-3.5">
                    <p className="text-white text-xs font-bold drop-shadow-md mb-2 flex items-center gap-1.5">
                      <LucideIcon name="CheckCircle2" size={14} className="text-emerald-400 shrink-0" />
                      <span>{visualAsset.imageCaption}</span>
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {visualAsset.reassuranceTags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Numerical Stats (4 Bento Cards with Icons) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-8 pt-6 border-t border-rose-100">
            {data.stats.map((st, i) => {
              const statIcons = ['Clock', 'ShieldCheck', 'Coins', 'Sparkles'];
              const statIcon = statIcons[i % statIcons.length];
              return (
                <div key={i} className="p-3.5 sm:p-4 bg-gradient-to-b from-rose-50/50 to-pink-50/30 rounded-2xl border border-rose-100/90 shadow-2xs hover:border-rose-300 transition-colors">
                  <div className="flex items-center gap-1.5 text-rose-600 mb-1">
                    <LucideIcon name={statIcon} size={14} />
                    <span className="text-[10px] text-zinc-500 font-bold block">{st.label}</span>
                  </div>
                  <p className="font-display font-black text-rose-700 text-sm sm:text-base md:text-lg leading-snug">
                    {st.value}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1 leading-tight">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Visual Atmosphere & Reassurance Showcase Banner */}
        <div className={`bg-gradient-to-r ${visualAsset.accentBg} rounded-3xl p-6 sm:p-8 border border-rose-200/80 shadow-sm mb-8 overflow-hidden relative`}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-56 h-40 sm:h-44 rounded-2xl overflow-hidden shrink-0 border border-rose-200/80 shadow-md relative">
              <img
                src={visualAsset.secondaryImage}
                alt={visualAsset.imageCaption}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/images/shinodayama_hero_banner_1792225964954.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-bold line-clamp-1 drop-shadow-xs">
                {visualAsset.imageCaption}
              </span>
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-rose-700 bg-white/90 border border-rose-200 px-3 py-1 rounded-full mb-2.5 shadow-2xs">
                <LucideIcon name="HeartHandshake" size={13} className="text-rose-500" />
                <span>信太山新地の当店ならではの安心環境</span>
              </div>
              <h2 className="font-display font-black text-lg sm:text-xl text-zinc-900 mb-2">
                女の子目線のサポートが徹底されているから、無理なく自分のペースで稼げます
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                他エリアのように厳しいノルマや人間関係のストレス、店先での待機はなく、全室清潔な個室待機を完備。優しい仲居さんと女性スタッフが24時間体制であなたをサポートします。
              </p>

              {/* Badges Grid */}
              <div className="flex flex-wrap gap-2">
                {visualAsset.reassuranceTags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 bg-white text-zinc-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-rose-200/80 shadow-2xs">
                    <LucideIcon name="Check" size={13} className="text-rose-600" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Core Points Checklist (Visual Cards with Icons) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-100">
            <h2 className="font-display font-black text-lg sm:text-xl text-zinc-900 flex items-center gap-2">
              <LucideIcon name="CheckCircle2" size={20} className="text-rose-600" />
              <span>「{data.title}」で絶対に押さえておくべき重要ポイント</span>
            </h2>
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              全{data.keyPoints.length}項目
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {data.keyPoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-rose-50/40 via-white to-pink-50/20 border border-rose-100/90 shadow-2xs hover:border-rose-300 transition-all">
                <span className="w-7 h-7 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <LucideIcon name={getKeyPointIcon(i)} size={15} />
                </span>
                <span className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-semibold">
                  {pt}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Deep-Dive Detailed Sections: Custom views for salary & benefits, standard sections for others */}
        {topicId === 'salary' ? (
          <div className="mb-8">
            <SalaryPageContent 
              onCtaclickWithData={(msg) => onInjectedScroll ? onInjectedScroll(msg) : onCtaclick()} 
            />
          </div>
        ) : topicId === 'benefits' ? (
          <div className="mb-8">
            <BenefitsPageContent 
              onCtaclickWithData={(msg) => onInjectedScroll ? onInjectedScroll(msg) : onCtaclick()} 
              onNavigateCompare={onNavigateCompare}
            />
          </div>
        ) : (
          <div className="space-y-6 mb-8">
            {(data.sections || []).map((sec, i) => {
              const isStepProcess = (sec.points || []).some(p => p.includes('STEP') || p.includes('【'));

              return (
                <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
                  <h2 className="font-display font-black text-lg sm:text-xl text-zinc-900 mb-3 flex items-center gap-2.5">
                    <span className="w-3 h-7 bg-gradient-to-b from-rose-500 to-pink-600 rounded-full inline-block" />
                    <span>{sec.title}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-5">
                    {sec.description}
                  </p>

                  {/* Optional Callout Box */}
                  {sec.callout && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/90 mb-6 text-xs text-amber-950 shadow-2xs">
                      <div className="flex items-center gap-2 mb-1.5 text-amber-900 font-bold text-sm">
                        <LucideIcon name="AlertCircle" size={16} className="text-amber-600 shrink-0" />
                        <span>{sec.callout.title}</span>
                      </div>
                      <p className="leading-relaxed font-medium pl-6">{sec.callout.text}</p>
                    </div>
                  )}

                  {/* Points: Rendered as Visual Stepper if Sequential */}
                  {sec.points && (
                    isStepProcess ? (
                      <div className="space-y-3 mb-4">
                        {sec.points.map((p, idx) => {
                          const stepMatch = p.match(/STEP\s*(\d+)【(.*?)】：(.*)/);
                          if (stepMatch) {
                            const [, stepNum, stepTitle, stepDesc] = stepMatch;
                            return (
                              <div key={idx} className="p-4 rounded-2xl bg-gradient-to-r from-rose-50/50 via-white to-pink-50/30 border border-rose-100 flex items-start gap-3.5 shadow-2xs">
                                <span className="w-8 h-8 rounded-xl bg-rose-600 text-white font-mono font-black text-xs flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                                  0{stepNum}
                                </span>
                                <div className="flex-1">
                                  <h3 className="text-xs sm:text-sm font-black text-zinc-900 mb-1 flex items-center gap-1.5">
                                    <span>{stepTitle}</span>
                                  </h3>
                                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                                    {stepDesc}
                                  </p>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/80 border border-gray-100">
                              <LucideIcon name="ChevronRight" size={16} className="text-rose-600 shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium">{p}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-800 mb-4">
                        {sec.points.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/20 border border-rose-100/60">
                            <LucideIcon name="CheckCircle2" size={15} className="text-rose-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-medium">{p}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  )}

                  {/* Optional Detailed Table */}
                  {sec.table && (
                    <div className="overflow-x-auto rounded-2xl border border-rose-100 shadow-2xs mt-4">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-gradient-to-r from-rose-100/80 via-pink-50 to-rose-50 text-rose-950 font-black border-b border-rose-200">
                          <tr>
                            {sec.table.headers.map((th, idx) => (
                              <th key={idx} className="p-3.5 whitespace-nowrap">{th}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-rose-50/40 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td 
                                  key={cIdx} 
                                  className={`p-3.5 leading-relaxed ${cIdx === 0 ? 'font-bold text-zinc-900 bg-rose-50/20' : 'text-zinc-700'}`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 8. Featured Column Articles (With Real Photographic EyeCatch Thumbnails!) */}
        {featuredArticles.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-rose-100">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200 mb-1">
                  <LucideIcon name="BookOpen" size={13} />
                  <span>専門解説コラム</span>
                </div>
                <h2 className="font-display font-black text-lg sm:text-xl text-zinc-900">
                  「{data.title}」をもっと詳しく知るおすすめ記事
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigateBlog()}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-100 transition-colors shrink-0"
              >
                <span>コラム全139件を見る</span>
                <LucideIcon name="ChevronRight" size={13} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredArticles.map((art: any) => (
                <div
                  key={art.slug}
                  onClick={() => onNavigateBlog(art.slug)}
                  className="rounded-2xl border border-gray-100 hover:border-rose-300 bg-white overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-2xs hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div>
                    {/* Article Thumbnail */}
                    <div className="relative h-36 overflow-hidden bg-rose-50">
                      <img
                        src={art.eyeCatch || '/images/shinodayama_hero_banner_1792225964954.jpg'}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/images/shinodayama_hero_banner_1792225964954.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] font-bold">
                        <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
                          {art.categoryLabel || data.title}
                        </span>
                        <span className="flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded font-mono">
                          <LucideIcon name="Clock" size={10} />
                          {art.readTime || '3分'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-xs sm:text-sm text-zinc-900 group-hover:text-rose-600 leading-snug line-clamp-2 transition-colors mb-2">
                        {art.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                        {art.summary || art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-rose-600">
                      <span>詳しく読む</span>
                      <LucideIcon name="ArrowRight" size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. Topic-Specific FAQs Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200 mb-1">
                <LucideIcon name="HelpCircle" size={13} />
                <span>よくある質問</span>
              </div>
              <h2 className="font-display font-black text-lg sm:text-xl text-zinc-900">
                「{data.title}」についての疑問を解決
              </h2>
            </div>
            <button
              type="button"
              onClick={onNavigateFaq}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-100 transition-colors shrink-0"
            >
              <span>FAQ全119問を見る</span>
              <LucideIcon name="ChevronRight" size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {(data.faqs || []).map((f, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-rose-100/80 overflow-hidden bg-rose-50/15 transition-colors shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-rose-50/40 transition-colors"
                  >
                    <span className="font-bold text-xs sm:text-sm text-zinc-900 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">Q</span>
                      <span className="leading-snug">{f.q}</span>
                    </span>
                    <LucideIcon 
                      name={isOpen ? "ChevronUp" : "ChevronDown"} 
                      size={18} 
                      className="text-rose-500 shrink-0" 
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-zinc-700 leading-relaxed border-t border-rose-100/60 bg-white flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">A</span>
                      <span className="leading-relaxed">{f.a}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 10. Official LINE Consultation Box with Recruiter Aoi */}
        <div className="bg-gradient-to-r from-rose-100/70 via-white to-rose-100/70 rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            <img
              src="/images/shinodayama_advisor_sakura_1792225964799.jpg"
              alt="店舗採用担当 あおい"
              className="w-20 h-20 rounded-full object-cover border-2 border-rose-300 shadow-md shrink-0"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = '/images/shinodayama_logo.svg';
              }}
            />
            <div>
              <div className="inline-flex items-center gap-1 bg-white text-rose-700 text-[11px] font-black px-3 py-0.5 rounded-full border border-rose-200 mb-1.5 shadow-2xs">
                <LucideIcon name="BadgeCheck" size={13} className="text-rose-600" />
                <span>女性採用担当 あおいより</span>
              </div>
              <h3 className="font-display font-black text-base sm:text-lg text-zinc-900 leading-snug">
                信太山新地の当店で安心スタート！「{data.title}」について気になることは何でもお聞きください
              </h3>
              <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed max-w-xl">
                「未経験でも大丈夫？」「即日体験入店してみたい」「寮の空き状況は？」など、どんな些細なことでも女性目線で親身にお答えします。無理な勧誘は一切ありませんのでご安心くださいね。
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-[11px] text-zinc-500 font-semibold">
                <span className="flex items-center gap-1">
                  <LucideIcon name="ShieldCheck" size={13} className="text-emerald-600" />
                  完全匿名OK
                </span>
                <span>·</span>
                <span>履歴書不要</span>
                <span>·</span>
                <span>24時間受付中</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLineConsultation}
            className="w-full md:w-auto bg-[#06c755] hover:bg-[#05b34c] text-white font-black text-sm px-7 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap transform hover:-translate-y-0.5 shrink-0"
            id="cluster-line-cta-btn"
          >
            <LucideIcon name="MessageCircle" size={20} className="fill-white text-white" />
            <span>当店へLINEで応募・相談する</span>
          </button>
        </div>

        {/* 11. Bottom Multi-Theme Explorer (Browse Other Topics Without Returning to Top) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-black text-base sm:text-lg text-zinc-900 flex items-center gap-2">
              <LucideIcon name="Compass" size={18} className="text-rose-600" />
              <span>他の公式分野別ガイドを見る</span>
            </h3>
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-xs font-bold text-zinc-600 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
            >
              <span>求人トップへ戻る</span>
              <LucideIcon name="ArrowLeft" size={13} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {ALL_CLUSTER_NODES.filter(n => n.id !== 'recruit' && n.id !== topicId).map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => {
                  if (node.id === 'faq') {
                    onNavigateFaq();
                  } else if (node.id === 'blog') {
                    onNavigateBlog();
                  } else {
                    onNavigateTopic(node.id);
                  }
                }}
                className="p-2.5 rounded-xl border border-gray-100 hover:border-rose-300 bg-rose-50/20 hover:bg-white text-left transition-all cursor-pointer group shadow-2xs hover:shadow-xs"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-base">{node.emoji}</span>
                  <span className="text-xs font-bold text-zinc-900 group-hover:text-rose-600 transition-colors">
                    {node.title}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 group-hover:text-rose-500 flex items-center gap-0.5">
                  <span>詳しく見る</span>
                  <LucideIcon name="ChevronRight" size={10} />
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
