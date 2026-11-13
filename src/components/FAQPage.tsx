/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';
import TopicClusterBottomNav from './TopicClusterBottomNav';
import { updatePageSeo } from '../seo';
import {
  FAQ_11_CATEGORIES,
  FAQ_66_QUESTIONS,
  FAQ_RELATED_ARTICLES,
  FAQCategoryItem,
  FAQQuestionItem
} from '../faq11CategoriesData';

interface FAQPageProps {
  initialCategory?: string | null;
  onNavigateHome: () => void;
  onNavigateTopic?: (topicId: string) => void;
  onCtaclick?: () => void;
  onNavigateBlog?: (slug?: string) => void;
}

export default function FAQPage({
  initialCategory,
  onNavigateHome,
  onNavigateTopic,
  onCtaclick,
  onNavigateBlog
}: FAQPageProps) {
  // Category state: 'all' or categoryId
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (initialCategory && FAQ_11_CATEGORIES.some(c => c.id === initialCategory)) {
      return initialCategory;
    }
    return 'all';
  });

  // Search input query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Accordion open state: Set of question IDs for multi-open support
  const [openIds, setOpenIds] = useState<Set<number>>(new Set([1, 7]));

  const faqListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    updatePageSeo({
      title: '信太山新地・信太山求人のよくある質問 FAQ（66問）【公式】',
      description:
        '信太山新地求人・信太山求人のよくある質問全66問を11カテゴリーで整理。未経験の面接・顔出しなし・日払い給料・寮・身バレ対策・シフト・半年ルールなど働く前の疑問にお答えします。',
      canonicalUrl: 'https://osaka-shinodayamashinchi-recruit.com/faq',
      ogType: 'website',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://osaka-shinodayamashinchi-recruit.com/faq#faqpage',
        mainEntity: FAQ_66_QUESTIONS.slice(0, 20).map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a
          }
        }))
      }
    });
  }, []);

  // Sync initialCategory if changed externally
  useEffect(() => {
    if (initialCategory && FAQ_11_CATEGORIES.some(c => c.id === initialCategory)) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const toggleQuestion = (id: number) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectCategory = (catId: string, shouldScroll = true) => {
    setSelectedCategory(catId);
    if (shouldScroll && faqListRef.current) {
      faqListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openAll = () => {
    const all = new Set(filteredQuestions.map(q => q.id));
    setOpenIds(all);
  };

  const closeAll = () => {
    setOpenIds(new Set());
  };

  // Filtered questions based on search query and category tab
  const filteredQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return FAQ_66_QUESTIONS.filter(item => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
      if (!matchesCategory) return false;

      // Query filter: matches question title or answer text
      if (!query) return true;
      const qText = item.q.toLowerCase();
      const aText = item.a.toLowerCase();
      const catText = item.categoryName.toLowerCase();
      return qText.includes(query) || aText.includes(query) || catText.includes(query);
    });
  }, [selectedCategory, searchQuery]);

  const popularTags = [
    '日払い',
    '未経験',
    '寮',
    '顔バレ',
    '週1日',
    '半年ルール',
    '体験入店',
    '短時間'
  ];

  const handleLineClick = () => {
    if (onCtaclick) {
      onCtaclick();
    } else {
      window.open(LINE_OFFICIAL_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-[#FAF7F8] min-h-screen pb-12">
      {/* 1. Breadcrumbs */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-4 pb-2">
        <nav aria-label="Breadcrumb">
          <ol
            className="flex items-center gap-1.5 text-xs text-zinc-500 overflow-x-auto whitespace-nowrap scrollbar-none py-1"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                itemProp="item"
              >
                <LucideIcon name="Home" size={12} className="text-zinc-400" />
                <span itemProp="name">信太山新地求人TOP</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-zinc-300">/</li>
            <li
              className="flex items-center gap-1.5 text-rose-600 font-bold"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <span>❓</span>
              <span itemProp="name">よくある質問FAQ</span>
              <meta itemProp="position" content="2" />
              <meta itemProp="item" content="https://osaka-shinodayamashinchi-recruit.com/faq" />
            </li>
          </ol>
        </nav>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

        {/* 1. ファーストビューを全面変更 */}
        <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* 左側：メイン見出しと説明文 */}
            <div className="flex-1 min-w-0">
              <div>
                <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#777777] uppercase mb-1.5">
                  RECRUITMENT FAQ & GUIDE
                </span>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1F2432] leading-tight mb-3 tracking-tight">
                <span className="text-[#D8175D]">疑問や不安を解消して、</span><br />
                安心してお仕事探し。
                <span className="block text-base sm:text-lg md:text-xl font-bold text-[#444444] mt-2 font-sans">
                  信太山新地求人 よくある質問FAQ
                </span>
              </h1>

              <p className="font-bold text-xs sm:text-sm text-[#1F2432] mb-3 leading-relaxed">
                応募資格・お給料・働き方・仕事内容・身バレ対策など、働く前に知っておきたい疑問をカテゴリー別にまとめました。
              </p>

              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
                「未経験でも大丈夫？」「実際のお給料はいくら？」「家族や知人に知られない？」など、応募前に気になることは人それぞれです。<br className="hidden sm:inline" />
                こちらのFAQでは、信太山新地で働くことを検討している女性からよく寄せられる質問を分かりやすくご紹介します。<br className="hidden sm:inline" />
                気になるカテゴリーから、自分の知りたい情報を探してみてください。
              </p>

              <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#1F2432]">
                <span className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#D8175D] px-3 py-1 rounded-full border border-[#F0DDE4]">
                  <LucideIcon name="CheckCircle2" size={13} />
                  全11カテゴリー・66問掲載
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#D8175D] px-3 py-1 rounded-full border border-[#F0DDE4]">
                  <LucideIcon name="ShieldCheck" size={13} />
                  女性目線で誠実に回答
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#D8175D] px-3 py-1 rounded-full border border-[#F0DDE4]">
                  <LucideIcon name="MessageCircleHeart" size={13} />
                  LINE事前相談24h受付
                </span>
              </div>
            </div>

            {/* 右側：女性スタッフが相談に対応している写真 */}
            <div className="w-full md:w-[400px] shrink-0">
              <div className="relative rounded-[20px] overflow-hidden border border-[#F0DDE4] shadow-sm bg-[#FFF5F8]/40 aspect-[4/3]">
                <img
                  src="/images/safety_female_consultation_1794375281375.webp"
                  alt="専任女性スタッフが親身に質問・相談に対応している様子"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 rounded-lg font-medium text-center">
                  専任の女性スタッフが疑問や不安に寄り添います
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FAQカテゴリーを11種類に再構成（PC 4列、スマホ 2列カード） */}
        <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
              CATEGORY DIRECTORY
            </span>
            <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
              知りたい分野から探す 11のFAQカテゴリー
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              気になるカテゴリーをタップすると、該当する質問一覧へジャンプして確認できます。
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {FAQ_11_CATEGORIES.map((cat: FAQCategoryItem) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id, true)}
                  className={`text-left rounded-[18px] p-4 sm:p-4.5 border transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-[#FFF5F8] border-[#D8175D] shadow-sm ring-1 ring-[#D8175D]/20'
                      : 'bg-[#FFFAFC] border-[#F0DDE4] hover:border-[#D8175D]/50 hover:bg-white shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[11px] font-bold text-[#D8175D] bg-[#FFF1F5] px-2 py-0.5 rounded border border-[#F0DDE4]">
                        {cat.num}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#D8175D] text-white' : 'bg-white border border-[#F0DDE4] text-[#D8175D] group-hover:bg-[#FFF1F5]'
                      }`}>
                        <LucideIcon name={cat.icon} size={16} />
                      </div>
                    </div>
                    <h3 className={`font-bold text-xs sm:text-sm mb-1.5 leading-snug transition-colors ${
                      isSelected ? 'text-[#D8175D]' : 'text-[#1F2432] group-hover:text-[#D8175D]'
                    }`}>
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-[#666666] leading-relaxed line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#F0DDE4]/60 flex items-center justify-between text-[11px] font-medium text-[#777777]">
                    <span>質問 {cat.count}件</span>
                    <span className="text-[#D8175D] font-bold group-hover:translate-x-0.5 transition-transform flex items-center">
                      見る →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. FAQ検索機能 & 4. カテゴリー切り替えタブ */}
        <div ref={faqListRef} className="scroll-mt-6">
          <section className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
            {/* 検索窓エリア */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="text-center mb-3">
                <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1 block">
                  KEYWORD SEARCH
                </span>
                <h3 className="font-display font-black text-lg sm:text-xl text-[#1F2432]">
                  知りたいことをキーワードで検索
                </h3>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="例：日払い・未経験・寮・顔バレ・週1日・半年ルール"
                  className="w-full bg-[#FFFAFC] border-2 border-[#F0DDE4] focus:border-[#D8175D] focus:bg-white rounded-full py-3.5 pl-12 pr-10 text-xs sm:text-sm text-[#1F2432] placeholder-[#999999] outline-none transition-all shadow-2xs"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D8175D] pointer-events-none">
                  <LucideIcon name="Search" size={18} />
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1 cursor-pointer"
                    title="検索クリア"
                  >
                    <LucideIcon name="X" size={16} />
                  </button>
                )}
              </div>

              {/* クイック検索タグ */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3 justify-center">
                <span className="text-[11px] text-[#777777] font-medium mr-1">人気キーワード:</span>
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="text-[11px] bg-[#FFF1F5] hover:bg-[#D8175D] hover:text-white text-[#D8175D] font-medium px-2.5 py-1 rounded-full border border-[#F0DDE4] transition-colors cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* カテゴリー切り替えタブ（横スクロール対応） */}
            <div className="border-t border-[#F0DDE4] pt-6 mb-6">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <span className="text-xs font-bold text-[#1F2432]">
                  カテゴリー絞り込み:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={openAll}
                    className="text-[11px] font-bold text-[#555555] hover:text-[#D8175D] bg-[#FFFAFC] border border-[#F0DDE4] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    すべて開く
                  </button>
                  <button
                    type="button"
                    onClick={closeAll}
                    className="text-[11px] font-bold text-[#555555] hover:text-[#D8175D] bg-[#FFFAFC] border border-[#F0DDE4] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    すべて閉じる
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3.5 py-2 rounded-full whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#D8175D] text-white shadow-xs'
                      : 'bg-[#FFFAFC] text-[#555555] hover:text-[#1F2432] border border-[#F0DDE4]'
                  }`}
                >
                  すべて (66)
                </button>
                {FAQ_11_CATEGORIES.map((cat: FAQCategoryItem) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-2 rounded-full whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#D8175D] text-white shadow-xs'
                          : 'bg-[#FFFAFC] text-[#555555] hover:text-[#1F2432] border border-[#F0DDE4]'
                      }`}
                    >
                      <LucideIcon name={cat.icon} size={13} />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. よくある質問一覧（アコーディオン） */}
            <div className="space-y-3">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((item: FAQQuestionItem, index: number) => {
                  const isOpen = openIds.has(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`rounded-[16px] border transition-all overflow-hidden ${
                        isOpen
                          ? 'border-[#D8175D]/40 bg-[#FFF5F8]/30 ring-1 ring-[#D8175D]/15'
                          : 'border-[#F0DDE4] bg-[#FFFAFC] hover:border-[#D8175D]/40'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleQuestion(item.id)}
                        className="w-full text-left p-4 sm:p-4.5 flex items-start justify-between gap-3 cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#D8175D] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                            Q
                          </span>
                          <div>
                            <span className="inline-block text-[10px] font-bold text-[#D8175D] bg-[#FFF1F5] px-2 py-0.5 rounded-full border border-[#F0DDE4] mb-1">
                              {item.categoryName}
                            </span>
                            <h4 className="font-bold text-xs sm:text-sm text-[#1F2432] leading-snug">
                              {item.q}
                            </h4>
                          </div>
                        </div>

                        <div className="w-6 h-6 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0 mt-1">
                          <LucideIcon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={14} />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-[#F0DDE4]/60 bg-[#E6F4EA]/30">
                          <div className="flex items-start gap-3 pt-2.5">
                            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                              A
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm text-[#333333] leading-relaxed font-medium">
                                {item.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 px-4 bg-[#FFFAFC] rounded-[18px] border border-[#F0DDE4]">
                  <div className="w-12 h-12 rounded-full bg-[#FFF1F5] text-[#D8175D] flex items-center justify-center mx-auto mb-3">
                    <LucideIcon name="HelpCircle" size={24} />
                  </div>
                  <p className="font-bold text-sm text-[#1F2432] mb-1">
                    該当する質問が見つかりませんでした。
                  </p>
                  <p className="text-xs text-[#666666] mb-4">
                    別のキーワードで検索するか、カテゴリーを変更してお試しください。
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="text-xs text-[#D8175D] font-bold bg-[#FFF1F5] hover:bg-[#D8175D] hover:text-white px-4 py-2 rounded-full border border-[#F0DDE4] transition-colors cursor-pointer"
                  >
                    検索条件をリセットする
                  </button>
                </div>
              )}
            </div>

            {/* 件数表示 */}
            <div className="mt-4 text-center text-xs text-[#777777]">
              表示件数: <strong className="text-[#D8175D] font-bold">{filteredQuestions.length}</strong> 件 / 全 66 件
            </div>
          </section>
        </div>

        {/* 6. 関連記事（よく読まれているお役立ち記事） */}
        <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1 block">
                RELATED ARTICLES
              </span>
              <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl text-[#1F2432]">
                よく読まれているお役立ち記事
              </h2>
            </div>
            {onNavigateBlog && (
              <button
                type="button"
                onClick={() => onNavigateBlog()}
                className="text-xs font-bold text-[#D8175D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>コラム一覧へ</span>
                <LucideIcon name="ArrowRight" size={14} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FAQ_RELATED_ARTICLES.map((article, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateBlog && onNavigateBlog(article.slug)}
                className="bg-[#FFFAFC] rounded-[18px] border border-[#F0DDE4] overflow-hidden flex flex-col justify-between hover:border-[#D8175D]/40 transition-colors shadow-2xs cursor-pointer group"
              >
                <div>
                  <div className="aspect-[16/9] w-full overflow-hidden bg-rose-50 relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#D8175D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                      {article.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-xs sm:text-sm text-[#1F2432] group-hover:text-[#D8175D] transition-colors leading-snug mb-1.5 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-[11px] text-[#666666] leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 text-[11px] text-[#D8175D] font-bold flex items-center justify-end gap-1">
                  <span>記事を読む</span>
                  <LucideIcon name="ChevronRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. 最後のLINE相談エリア */}
        <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-3">
            <LucideIcon name="MessageCircle" size={13} />
            <span>24時間受付中</span>
          </div>

          <h2 className="font-display font-extrabold text-lg sm:text-xl md:text-[22px] text-[#1F2432] mb-2">
            まだ分からないことや、不安なことはありませんか？
          </h2>

          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-lg mx-auto">
            「自分でも働けるのかな？」「お給料や勤務条件を詳しく知りたい」「まずは話だけ聞いてみたい」など、どんな小さな疑問でもお気軽にご相談ください。<br className="hidden sm:inline" />
            無理に入店を決める必要はありません。気になることを一つずつ確認して、自分に合った働き方を考えていきましょう。
          </p>

          <div className="flex flex-col items-center">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLineClick}
              className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#06C755]/25 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
              id="faq-page-final-line-btn"
            >
              <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
              <span>LINEで気軽に質問・相談する</span>
            </a>

            <span className="text-xs text-[#777777] font-medium mt-2.5">
              質問だけでも大歓迎｜専任の女性スタッフが丁寧にお答えします。
            </span>
          </div>
        </section>

        {/* 8. ページ下部の公式テーマ・分野別ガイド一覧 */}
        <TopicClusterBottomNav
          currentTopicId="faq"
          onNavigateHome={onNavigateHome}
          onNavigateTopic={(topicId) => {
            if (onNavigateTopic) onNavigateTopic(topicId);
          }}
          onNavigateBlog={onNavigateBlog}
          onNavigateFaq={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

      </div>
    </div>
  );
}
