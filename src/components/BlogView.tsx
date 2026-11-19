/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import LucideIcon from './LucideIcon';
import ArticleCardImage from './ArticleCardImage';
import { BLOG_ARTICLES, BlogArticle, getValidArticleEyeCatch, loadFullBlogArticle } from '../blogData';
import { TOPIC_CLUSTERS } from '../topicClusterData';
import { updatePageSeo, formatBlogSeoTitle, formatMetaDescription, getIsoLastUpdated } from '../seo';

interface BlogViewProps {
  selectedBlogSlug: string | null;
  categoryFilter: string;
  searchQuery: string;
  onNavigateHome: () => void;
  onNavigateBlog: (slug?: string) => void;
  onNavigateBlogCategory: (catId: string) => void;
  onSearchQueryChange: (q: string) => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateWorkstyles: (categorySlug?: string) => void;
  onNavigateCompare: () => void;
  onNavigateFaq: () => void;
  onNavigateTab: (tab: 'recruit' | 'about' | 'policy' | 'interview' | 'quick-guide') => void;
  onNavigateConsultation: () => void;
  onCtaclick: () => void;
}

const PAGE_SIZE = 18;

export default function BlogView({
  selectedBlogSlug,
  categoryFilter,
  searchQuery,
  onNavigateHome,
  onNavigateBlog,
  onNavigateBlogCategory,
  onSearchQueryChange,
  onNavigateTopic,
  onNavigateWorkstyles,
  onNavigateCompare,
  onNavigateFaq,
  onNavigateTab,
  onNavigateConsultation,
  onCtaclick,
}: BlogViewProps) {
  const [loadedFullArticle, setLoadedFullArticle] = useState<BlogArticle | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const listTopRef = useRef<HTMLDivElement>(null);

  // Reset pagination when category or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, searchQuery, selectedBlogSlug]);

  useEffect(() => {
    let active = true;
    if (selectedBlogSlug) {
      loadFullBlogArticle(selectedBlogSlug)
        .then((full) => {
          if (active) setLoadedFullArticle(full || null);
        })
        .catch(() => {
          if (active) setLoadedFullArticle(null);
        });
    } else {
      setLoadedFullArticle(null);
    }
    return () => {
      active = false;
    };
  }, [selectedBlogSlug]);

  const currentArticle = useMemo(() => {
    if (!selectedBlogSlug) return null;
    if (loadedFullArticle && loadedFullArticle.slug === selectedBlogSlug) {
      return loadedFullArticle;
    }
    return BLOG_ARTICLES.find((a) => a.slug === selectedBlogSlug) || null;
  }, [selectedBlogSlug, loadedFullArticle]);

  const relatedWorkstyleSlug = useMemo(() => {
    if (!currentArticle) return 'inexperienced';
    const mapping: Record<string, string> = {
      salary: 'high-income',
      beginner: 'inexperienced',
      safety: 'privacy',
      dorm: 'dormitory',
      job: 'inexperienced',
      workstyle: 'weekly-1',
      experienced: 'high-income',
      shops: 'consultation',
      interview: 'female-staff',
      beauty: 'inexperienced',
      faq: 'consultation',
    };
    return mapping[currentArticle.category] || 'inexperienced';
  }, [currentArticle]);

  const relatedClusterTopic = useMemo(() => {
    if (!currentArticle) return 'job';
    const mapping: Record<string, string> = {
      salary: 'salary',
      beginner: 'beginner',
      safety: 'safety',
      dorm: 'dorm',
      job: 'job',
      workstyle: 'workstyle',
      experienced: 'experienced',
      shops: 'shops',
      interview: 'job',
      beauty: 'beginner',
      faq: 'safety',
    };
    return mapping[currentArticle.category] || 'job';
  }, [currentArticle]);

  const relatedArticles = useMemo(() => {
    if (!currentArticle) return [];
    const currentTags = new Set(Array.isArray(currentArticle.tags) ? currentArticle.tags : []);
    const seedStr = String(currentArticle.id || currentArticle.slug || '');
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) {
      seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
    }
    const indexable = BLOG_ARTICLES.filter((a) => !a.noindex && a.id !== currentArticle.id);
    return indexable
      .map((a, idx) => {
        const sameCategory = a.category === currentArticle.category ? 12 : 0;
        const sharedTags = (Array.isArray(a.tags) ? a.tags : []).filter((t) => currentTags.has(t)).length;
        const rotationBonus = ((seed + idx * 7) % 11) * 0.1;
        return { article: a, score: sameCategory + sharedTags * 5 + rotationBonus };
      })
      .sort((x, y) => y.score - x.score)
      .slice(0, 4)
      .map((entry) => entry.article);
  }, [currentArticle]);

  const blogCategories = useMemo(() => {
    const map = new Map<string, string>();
    for (const a of BLOG_ARTICLES) {
      if (a.noindex) continue;
      if (a.category && !map.has(a.category)) {
        map.set(a.category, a.categoryLabel || a.category);
      }
    }
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, []);

  const filteredBlogArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return BLOG_ARTICLES.filter((a) => {
      if (a.noindex) return false;
      if (categoryFilter !== 'all' && a.category !== categoryFilter) {
        return false;
      }
      if (!q) return true;
      const haystack = `${a.title} ${a.summary || ''} ${a.categoryLabel || ''} ${(a.tags || []).join(' ')}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [searchQuery, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogArticles.length / PAGE_SIZE));

  const visibleArticles = useMemo(() => {
    const safePage = Math.min(Math.max(1, currentPage), totalPages);
    const startIdx = (safePage - 1) * PAGE_SIZE;
    return filteredBlogArticles.slice(startIdx, startIdx + PAGE_SIZE);
  }, [filteredBlogArticles, currentPage, totalPages]);

  const paginationItems = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const items: (number | 'ellipsis')[] = [1];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 3) {
      items.push('ellipsis');
    } else if (start === 3) {
      items.push(2);
    }

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (end < totalPages - 2) {
      items.push('ellipsis');
    } else if (end === totalPages - 2) {
      items.push(totalPages - 1);
    }

    items.push(totalPages);
    return items;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    const next = Math.min(Math.max(1, page), totalPages);
    if (next === currentPage) return;
    setCurrentPage(next);
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Extract headings & assign stable anchor IDs (#sec-1, #sec-2...) for Table of Contents
  const tocItems = useMemo(() => {
    if (!currentArticle?.content) return [];
    const items: { id: string; title: string }[] = [];
    if (Array.isArray(currentArticle.content)) {
      let n = 0;
      for (const block of currentArticle.content) {
        if (block?.type === 'h2' && block.text) {
          n++;
          items.push({ id: `sec-${n}`, title: block.text });
        }
      }
    } else if (Array.isArray(currentArticle.content.sections)) {
      currentArticle.content.sections.forEach((sec, idx) => {
        if (sec?.heading) {
          items.push({ id: `sec-${idx + 1}`, title: sec.heading });
        }
      });
    }
    return items;
  }, [currentArticle]);

  const syncBlogQueryUrl = (nextQ: string, nextCat: string) => {
    if (typeof window === 'undefined') return;
    const basePath = nextCat && nextCat !== 'all' ? `/blog/category/${encodeURIComponent(nextCat)}` : '/blog';
    const qs = nextQ.trim() ? `?q=${encodeURIComponent(nextQ.trim())}` : '';
    window.history.replaceState({}, '', `${basePath}${qs}`);
  };

  // Sync dynamic SEO metadata for /blog, /blog/category/:cat, and /blog/:slug
  useEffect(() => {
    if (currentArticle) {
      const dateModified = currentArticle.updatedAt || currentArticle.publishedAt || getIsoLastUpdated();
      updatePageSeo({
        title: formatBlogSeoTitle(currentArticle.title),
        description: formatMetaDescription(
          currentArticle.summary,
          `${currentArticle.title}についての信太山新地公式解説記事です。未経験女性が知りたい仕事内容・給料・待機環境・安全ルールまで詳しくお届けします。`
        ),
        canonicalUrl: `https://osaka-shinodayamashinchi-recruit.com/blog/${currentArticle.slug}`,
        robots: currentArticle.noindex ? 'noindex, follow' : undefined,
        ogImage: currentArticle.eyeCatch || '/images/hub_beginner_cast_1792485407920.webp',
        ogType: 'article',
        publishedTime: currentArticle.publishedAt,
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BlogPosting',
              'headline': currentArticle.title,
              'description': currentArticle.summary,
              'articleSection': currentArticle.categoryLabel || currentArticle.category || '解説コラム',
              'wordCount': (() => {
                let chars = (currentArticle.summary || '').length;
                if (Array.isArray(currentArticle.content)) {
                  for (const b of currentArticle.content) {
                    if (b.text) chars += b.text.length;
                    if (b.question) chars += b.question.length;
                    if (b.answer) chars += b.answer.length;
                    if (Array.isArray(b.items)) chars += b.items.join('').length;
                  }
                }
                return Math.max(chars, 300);
              })(),
              'datePublished': currentArticle.publishedAt,
              'dateModified': dateModified,
              'inLanguage': 'ja-JP',
              'isAccessibleForFree': true,
              'keywords': Array.isArray(currentArticle.tags)
                ? currentArticle.tags.join(', ')
                : '信太山新地, 信太山ガールズ, 求人, 待機所, 即日全額日払い',
              'image': currentArticle.eyeCatch
                ? `https://osaka-shinodayamashinchi-recruit.com${currentArticle.eyeCatch}`
                : undefined,
              'author': {
                '@type': 'Person',
                'name': currentArticle.author?.name || 'あおい（信太山新地女性専任アドバイザー）',
                'jobTitle': '女性採用アドバイザー・現場サポート責任者',
                'url': 'https://osaka-shinodayamashinchi-recruit.com/interview',
                'sameAs': ['https://osaka-shinodayamashinchi-recruit.com/about'],
                'worksFor': {
                  '@type': 'Organization',
                  'name': '信太山新地 老舗旅館直営グループ（信太山ガールズ）',
                  'url': 'https://osaka-shinodayamashinchi-recruit.com/about',
                },
              },
              'reviewedBy': {
                '@type': 'Organization',
                'name': '信太山ガールズ編集部・旅館組合情報確認窓口',
                'url': 'https://osaka-shinodayamashinchi-recruit.com/policy',
              },
              'publisher': {
                '@type': 'Organization',
                'name': '信太山ガールズ（旅館直営求人・女性採用サポート）',
                'url': 'https://osaka-shinodayamashinchi-recruit.com/',
                'logo': {
                  '@type': 'ImageObject',
                  'url': 'https://osaka-shinodayamashinchi-recruit.com/favicon.png',
                },
              },
              'speakable': {
                '@type': 'SpeakableSpecification',
                'cssSelector': ['#llm-article-summary-text', 'h1'],
              },
              'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': `https://osaka-shinodayamashinchi-recruit.com/blog/${currentArticle.slug}`,
              },
            },
            {
              '@type': 'BreadcrumbList',
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  'position': 1,
                  'name': '信太山新地求人トップ',
                  'item': 'https://osaka-shinodayamashinchi-recruit.com/',
                },
                {
                  '@type': 'ListItem',
                  'position': 2,
                  'name': 'お仕事コラム一覧',
                  'item': 'https://osaka-shinodayamashinchi-recruit.com/blog',
                },
                {
                  '@type': 'ListItem',
                  'position': 3,
                  'name': currentArticle.title,
                  'item': `https://osaka-shinodayamashinchi-recruit.com/blog/${currentArticle.slug}`,
                },
              ],
            },
          ],
        },
      });
    } else {
      const activeCat = categoryFilter !== 'all'
        ? blogCategories.find((c) => c.id === categoryFilter)
        : null;
      const hasSearchQuery = searchQuery.trim().length > 0;
      const catPath = activeCat ? `/blog/category/${activeCat.id}` : '/blog';
      const catTitle = activeCat
        ? `信太山新地「${activeCat.label}」コラム一覧｜信太山ガールズ公式`
        : '信太山新地求人・信太山求人 お仕事コラム一覧｜信太山ガールズ公式';
      const catDescription = activeCat
        ? formatMetaDescription(
            `信太山新地求人「${activeCat.label}」カテゴリの公式解説コラム一覧（全${filteredBlogArticles.length}件）。店先顔出しなしの待機環境、15分3,800円〜の日払い報酬、未経験安心サポートなど応募前に知りたい要点を詳しくご案内しています。LINE相談歓迎。`
          )
        : '信太山新地の仕事内容、15分単位の給料システム、待機所（スタンドまたは旅館）での待機や顔出しなしルール、未経験向けガイド、週1日勤務、個室寮・出稼ぎ情報、身バレ対策など、働く前に役立つ公式解説コラム一覧を掲載しています。気になる点はLINEでお気軽にご質問ください。';
      const catList = activeCat
        ? BLOG_ARTICLES.filter((a) => !a.noindex && a.category === activeCat.id)
        : BLOG_ARTICLES.filter((a) => !a.noindex);

      updatePageSeo({
        title: catTitle,
        description: catDescription,
        canonicalUrl: `https://osaka-shinodayamashinchi-recruit.com${catPath}`,
        robots: hasSearchQuery ? 'noindex, follow' : undefined,
        ogImage: '/images/col_search_phone_jp_1792475574840.webp',
        ogType: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': `https://osaka-shinodayamashinchi-recruit.com${catPath}#collection`,
              'name': activeCat ? `${activeCat.label}｜信太山新地求人 お仕事コラム一覧` : '信太山新地求人 お仕事コラム一覧',
              'description': catDescription,
              'url': `https://osaka-shinodayamashinchi-recruit.com${catPath}`,
              'dateModified': getIsoLastUpdated(),
              'inLanguage': 'ja-JP',
              'speakable': {
                '@type': 'SpeakableSpecification',
                'cssSelector': ['h1', 'h2'],
              },
              'mainEntity': {
                '@type': 'ItemList',
                'numberOfItems': catList.length,
                'itemListElement': catList.slice(0, 30).map((a, idx) => ({
                  '@type': 'ListItem',
                  'position': idx + 1,
                  'name': a.title,
                  'url': `https://osaka-shinodayamashinchi-recruit.com/blog/${a.slug}`,
                })),
              },
            },
            {
              '@type': 'BreadcrumbList',
              'itemListElement': activeCat
                ? [
                    {
                      '@type': 'ListItem',
                      'position': 1,
                      'name': '信太山新地求人トップ',
                      'item': 'https://osaka-shinodayamashinchi-recruit.com/',
                    },
                    {
                      '@type': 'ListItem',
                      'position': 2,
                      'name': 'お仕事コラム一覧',
                      'item': 'https://osaka-shinodayamashinchi-recruit.com/blog',
                    },
                    {
                      '@type': 'ListItem',
                      'position': 3,
                      'name': activeCat.label,
                      'item': `https://osaka-shinodayamashinchi-recruit.com/blog/category/${activeCat.id}`,
                    },
                  ]
                : [
                    {
                      '@type': 'ListItem',
                      'position': 1,
                      'name': '信太山新地求人トップ',
                      'item': 'https://osaka-shinodayamashinchi-recruit.com/',
                    },
                    {
                      '@type': 'ListItem',
                      'position': 2,
                      'name': 'お仕事コラム一覧',
                      'item': 'https://osaka-shinodayamashinchi-recruit.com/blog',
                    },
                  ],
            },
          ],
        },
      });
    }
  }, [currentArticle, categoryFilter, searchQuery, blogCategories, filteredBlogArticles.length]);

  let h2AnchorCounter = 0;

  return (
    <div className="bg-surface min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {currentArticle ? (
          <div>
            {/* Article Breadcrumbs with Schema.org Microdata */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol
                itemScope
                itemType="https://schema.org/BreadcrumbList"
                className="flex items-center gap-1.5 text-xs text-zinc-500 flex-wrap"
              >
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="flex items-center gap-1.5"
                >
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateHome();
                    }}
                    className="hover:text-secondary transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <LucideIcon name="Home" size={12} className="text-rose-500" />
                    <span itemProp="name">信太山新地求人トップ</span>
                  </a>
                  <meta itemProp="position" content="1" />
                  <meta itemProp="item" content="https://osaka-shinodayamashinchi-recruit.com/" />
                  <span>/</span>
                </li>
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="flex items-center gap-1.5"
                >
                  <a
                    href="/blog"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateBlog();
                    }}
                    className="hover:text-secondary transition-colors cursor-pointer"
                  >
                    <span itemProp="name">お仕事コラム一覧</span>
                  </a>
                  <meta itemProp="position" content="2" />
                  <meta itemProp="item" content="https://osaka-shinodayamashinchi-recruit.com/blog" />
                  <span>/</span>
                </li>
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="flex items-center gap-1.5"
                >
                  <a
                    href={`/${relatedClusterTopic}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateTopic(relatedClusterTopic);
                    }}
                    className="hover:text-secondary transition-colors cursor-pointer text-rose-600 font-medium"
                  >
                    <span itemProp="name">{TOPIC_CLUSTERS[relatedClusterTopic]?.title || currentArticle.categoryLabel}</span>
                  </a>
                  <meta itemProp="position" content="3" />
                  <meta itemProp="item" content={`https://osaka-shinodayamashinchi-recruit.com/${relatedClusterTopic}`} />
                  <span>/</span>
                </li>
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="text-zinc-800 font-bold line-clamp-1 max-w-[280px] sm:max-w-md"
                >
                  <span itemProp="name">{currentArticle.title}</span>
                  <meta itemProp="position" content="4" />
                  <meta itemProp="item" content={`https://osaka-shinodayamashinchi-recruit.com/blog/${currentArticle.slug}`} />
                </li>
              </ol>
            </nav>

            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-sm mb-10">
              <div className="inline-block bg-rose-100 text-secondary text-xs font-bold px-3 py-1 rounded-full mb-3">
                {currentArticle.categoryLabel || currentArticle.category}
              </div>
              <h1 className="font-display font-black text-[22px] sm:text-3xl md:text-4xl text-zinc-900 mb-4 leading-snug text-balance">
                {currentArticle.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mb-6 pb-6 border-b border-zinc-100">
                {currentArticle.publishedAt && <span>📅 公開 {currentArticle.publishedAt}</span>}
                {currentArticle.updatedAt && currentArticle.updatedAt !== currentArticle.publishedAt && (
                  <span>🔄 更新 {currentArticle.updatedAt}</span>
                )}
                {currentArticle.readTime && <span>⏱️ 読了目安 {currentArticle.readTime}</span>}
                {currentArticle.author && <span>✍️ {currentArticle.author.name}</span>}
              </div>

              {/* Eyecatch */}
              <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-8 bg-rose-50 shadow-xs">
                <ArticleCardImage
                  src={getValidArticleEyeCatch(currentArticle)}
                  alt={currentArticle.title}
                  title={currentArticle.title}
                  articleId={currentArticle.id}
                  slug={currentArticle.slug}
                  category={currentArticle.category}
                  categoryLabel={currentArticle.categoryLabel}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article 30-Second Summary Card */}
              {currentArticle.summary && (
                <section
                  id="llm-article-summary"
                  aria-label="この記事のポイント（30秒でわかる3行要約）"
                  data-entity-type="DirectAnswer"
                  itemScope
                  itemType="https://schema.org/Answer"
                  className="bg-gradient-to-br from-rose-50/95 via-[#fff8f8] to-amber-50/30 border-2 border-rose-200/90 p-5 sm:p-6 rounded-3xl mb-6 shadow-sm relative overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-rose-200/70">
                    <div className="flex items-center gap-2 text-rose-900 font-black text-xs sm:text-sm">
                      <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs shadow-2xs">📌</span>
                      <span>この記事のポイント（30秒でわかる3行要約）</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {[
                      currentArticle.title.includes('給料') || currentArticle.title.includes('稼')
                        ? '信太山新地の給料システム・15分3,800円〜の明朗報酬＆即日手渡し日払い'
                        : '信太山新地は店先顔見せなし・待機所（スタンドまたは旅館）待機でプライバシーに配慮',
                      'ノルマ・罰金・飲酒・客との連絡先交換（営業LINE）は一切不要',
                      '老舗旅館直営の専任仲居さん＆女性スタッフによる丁寧な事前サポート',
                    ].map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/95 border border-rose-100/90 shadow-2xs">
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-black shrink-0 mt-0.5 shadow-2xs">
                          ✓
                        </span>
                        <span className="text-xs sm:text-sm text-zinc-900 font-bold leading-relaxed">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-rose-100/80">
                    <p
                      id="llm-article-summary-text"
                      itemProp="text"
                      className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium"
                    >
                      {currentArticle.summary}
                    </p>
                  </div>
                </section>
              )}

              {/* Table of Contents (Jump Links for Users & Search Snippets) */}
              {tocItems.length >= 2 && (
                <nav
                  aria-label="この記事の目次"
                  className="bg-[#FFF9FB] border border-rose-100 rounded-2xl p-4 sm:p-5 mb-8 shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-zinc-900 mb-3">
                    <LucideIcon name="List" size={16} className="text-rose-600" />
                    <span>この記事の目次</span>
                  </div>
                  <ol className="space-y-1.5 text-xs sm:text-sm">
                    {tocItems.map((item, idx) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(item.id);
                            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className="text-zinc-700 hover:text-rose-600 font-medium inline-flex items-baseline gap-2 py-0.5 transition-colors"
                        >
                          <span className="text-[11px] font-bold text-rose-500 tabular-nums shrink-0">
                            {String(idx + 1).padStart(2, '0')}.
                          </span>
                          <span className="underline-offset-2 hover:underline">{item.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {/* Article Body Content */}
              {!currentArticle.content && (
                <div className="py-10 flex items-center justify-center gap-2 text-xs text-zinc-400">
                  <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                  <span>記事本文を読み込み中...</span>
                </div>
              )}
              {Array.isArray(currentArticle.content) && (
                <div className="article-body-content space-y-2">
                  {currentArticle.content.map((block: any, idx: number) => {
                    if (block.type === 'p') {
                      const rawText = String(block.text || '');
                      const parts = rawText.split(/(\[[^\]]+\]\(\/[^\)]+\))/g);
                      return (
                        <p key={idx} className="text-sm sm:text-base text-zinc-700 leading-relaxed mb-6 font-normal whitespace-pre-line">
                          {parts.map((part, pIdx) => {
                            const match = part.match(/^\[([^\]]+)\]\((\/[^\)]+)\)$/);
                            if (!match) return <span key={pIdx}>{part}</span>;
                            const [, linkLabel, linkHref] = match;
                            return (
                              <a
                                key={pIdx}
                                href={linkHref}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (linkHref.startsWith('/blog/')) {
                                    onNavigateBlog(linkHref.replace('/blog/', ''));
                                  } else if (linkHref === '/blog') {
                                    onNavigateBlog();
                                  } else if (linkHref.startsWith('/types')) {
                                    onNavigateWorkstyles(linkHref === '/types' ? undefined : linkHref.replace('/types/', ''));
                                  } else if (linkHref === '/compare') {
                                    onNavigateCompare();
                                  } else if (linkHref === '/faq') {
                                    onNavigateFaq();
                                  } else if (linkHref === '/interview') {
                                    onNavigateTab('interview');
                                  } else if (linkHref === '/quick-guide') {
                                    onNavigateTab('quick-guide');
                                  } else if (linkHref === '/about') {
                                    onNavigateTab('about');
                                  } else if (linkHref === '/policy') {
                                    onNavigateTab('policy');
                                  } else if (
                                    [
                                      '/job',
                                      '/salary',
                                      '/benefits',
                                      '/beginner',
                                      '/experienced',
                                      '/requirements',
                                      '/flow',
                                      '/workstyle',
                                      '/shops',
                                      '/dorm',
                                      '/safety',
                                    ].includes(linkHref)
                                  ) {
                                    onNavigateTopic(linkHref.slice(1));
                                  } else {
                                    onNavigateHome();
                                  }
                                }}
                                className="text-rose-600 font-bold underline underline-offset-2 hover:text-rose-700 transition-colors"
                              >
                                {linkLabel}
                              </a>
                            );
                          })}
                        </p>
                      );
                    }
                    if (block.type === 'h2') {
                      h2AnchorCounter++;
                      const anchorId = `sec-${h2AnchorCounter}`;
                      return (
                        <h2
                          key={idx}
                          id={anchorId}
                          className="scroll-mt-24 font-display font-black text-xl sm:text-2xl text-zinc-900 mt-10 mb-4 pb-2.5 border-b border-rose-100 flex items-center gap-2.5"
                        >
                          <span className="w-2.5 h-6 bg-gradient-to-b from-rose-500 to-pink-600 rounded-full inline-block shrink-0 shadow-2xs" />
                          <span>{block.text}</span>
                        </h2>
                      );
                    }
                    if (block.type === 'h3') {
                      return (
                        <h3 key={idx} className="font-bold text-base sm:text-lg text-zinc-800 mt-6 mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                          <span>{block.text}</span>
                        </h3>
                      );
                    }
                    if (block.type === 'list') {
                      return (
                        <div key={idx} className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 sm:p-5 my-6 shadow-2xs">
                          <ul className="space-y-2.5">
                            {block.items?.map((item: string, i: number) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                                <span className="text-secondary font-black shrink-0 mt-0.5">✔</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    if (block.type === 'qna') {
                      return (
                        <div key={idx} className="bg-gradient-to-r from-rose-50/80 via-pink-50/40 to-white p-4 sm:p-5 rounded-2xl border border-rose-200/80 my-6 shadow-2xs">
                          <div className="font-bold text-sm sm:text-base text-zinc-900 mb-2 flex items-start gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-rose-600 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-2xs">
                              Q
                            </span>
                            <span className="leading-snug">{block.question}</span>
                          </div>
                          <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed pl-8">
                            <span className="font-bold text-rose-600 mr-1.5">A.</span>
                            {block.answer || block.text}
                          </div>
                        </div>
                      );
                    }
                    if (block.type === 'cta') {
                      return (
                        <div key={idx} className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50/40 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
                          <div>
                            <div className="inline-block bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full mb-1">
                              信太山新地の当店公式募集
                            </div>
                            <h4 className="font-bold text-sm sm:text-base text-zinc-900 mb-1">
                              信太山新地の当店へ応募！気になる点や不安は女性スタッフにLINEで直接質問できます
                            </h4>
                            <p className="text-xs text-zinc-600">
                              面接前の給料システム・シフト・即日寮・身バレ対策など、信太山新地の当店専任スタッフが匿名で親身にお答えします。
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={onCtaclick}
                            className="shrink-0 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <LucideIcon name="MessageCircle" size={14} />
                            <span>信太山新地の当店へLINEで応募・相談</span>
                          </button>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              {/* Fallback for Object-based sections/intro */}
              {!Array.isArray(currentArticle.content) && currentArticle.content && (
                <div className="article-body-content">
                  {currentArticle.content.intro && (
                    <p className="text-sm sm:text-base text-zinc-700 leading-relaxed mb-8">
                      {currentArticle.content.intro}
                    </p>
                  )}

                  {currentArticle.content.sections?.map((sec: any, idx: number) => (
                    <div key={idx} className="mb-8">
                      <h2
                        id={`sec-${idx + 1}`}
                        className="scroll-mt-24 font-bold text-lg sm:text-xl text-zinc-900 mb-3 flex items-center gap-2"
                      >
                        <span className="w-2 h-5 bg-secondary rounded-full inline-block" />
                        <span>{sec.heading}</span>
                      </h2>
                      {sec.body && (
                        <p className="text-sm sm:text-base text-zinc-700 leading-relaxed mb-4">
                          {sec.body}
                        </p>
                      )}
                      {sec.points && sec.points.length > 0 && (
                        <ul className="space-y-2 bg-zinc-50 p-4 rounded-2xl mb-4 text-xs sm:text-sm text-zinc-700">
                          {sec.points.map((pt: string, pIdx: number) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="text-secondary font-bold">✔</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  {currentArticle.content.faqs && currentArticle.content.faqs.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-zinc-100">
                      <h3 className="font-bold text-base sm:text-lg text-zinc-900 mb-4">
                        この記事に関するQ&A
                      </h3>
                      <div className="space-y-3">
                        {currentArticle.content.faqs.map((f: any, fIdx: number) => (
                          <div key={fIdx} className="bg-rose-50/30 p-4 rounded-2xl border border-rose-100">
                            <div className="font-bold text-sm text-zinc-900 mb-1 flex items-start gap-2">
                              <span className="text-secondary font-black">Q.</span>
                              <span>{f.question}</span>
                            </div>
                            <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                              {f.answer}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* E-E-A-T Author & Supervisor Profile Card */}
              <div className="mt-12 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-rose-50/80 via-pink-50/40 to-amber-50/30 border border-rose-100 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-2xs">
                <img
                  src="/images/shinodayama_cast_ayaka_1792486845624.webp"
                  alt="あおい（信太山新地 専任女性採用担当・相談役）"
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border-2 border-white shadow-xs"
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                    <span className="font-extrabold text-sm sm:text-base text-zinc-900">
                      記事監修・執筆：あおい
                    </span>
                    <span className="text-[10px] bg-rose-600 text-white font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                      女性サポート責任者
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                      信太山新地 老舗旅館直営店 所属
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-2">
                    信太山新地の現場旅館で女性採用とキャストサポートを担当。自身も夜職経験があり、未経験の方が抱える「身バレ」「お仕事内容」「給与」のリアルな疑問に寄り添って解説しています。
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-[11px] text-zinc-500 font-medium mb-2.5">
                    <span className="flex items-center gap-1">
                      <LucideIcon name="ShieldCheck" size={13} className="text-emerald-600" />
                      信太山新地旅館組合ルール準拠
                    </span>
                    <span className="flex items-center gap-1">
                      <LucideIcon name="CheckCircle2" size={13} className="text-rose-500" />
                      店先顔見せなし・待機所待機ルール公認
                    </span>
                  </div>
                  <div className="pt-2.5 border-t border-rose-200/70 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-[11px]">
                    <span className="font-bold text-zinc-700">監修・ファクト確認：</span>
                    <a
                      href="/interview"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigateTab('interview');
                      }}
                      className="text-rose-600 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>採用担当者の現場インタビュー</span>
                      <LucideIcon name="ChevronRight" size={11} />
                    </a>
                    <span className="text-zinc-300">|</span>
                    <a
                      href="/policy"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigateTab('policy');
                      }}
                      className="text-rose-600 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>編集方針・掲載ポリシー</span>
                      <LucideIcon name="ChevronRight" size={11} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contextual Internal Links */}
              <div className="mt-8 p-5 rounded-2xl bg-rose-50/40 border border-rose-100">
                <p className="text-xs font-extrabold text-rose-800 mb-3 flex items-center gap-1.5">
                  <LucideIcon name="Compass" size={14} className="text-rose-600" />
                  <span>あわせて読みたい公式専門ガイド</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-bold">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateHome();
                    }}
                    className="p-3 rounded-xl bg-white border border-rose-100 hover:border-rose-300 text-zinc-800 hover:text-rose-600 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>信太山新地求人トップへ</span>
                    <LucideIcon name="ChevronRight" size={13} className="text-rose-400 shrink-0" />
                  </a>
                  <a
                    href="/beginner"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateTopic('beginner');
                    }}
                    className="p-3 rounded-xl bg-white border border-rose-100 hover:border-rose-300 text-zinc-800 hover:text-rose-600 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>未経験ガイドを見る</span>
                    <LucideIcon name="ChevronRight" size={13} className="text-rose-400 shrink-0" />
                  </a>
                  <a
                    href="/quick-guide"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateTab('quick-guide');
                    }}
                    className="p-3 rounded-xl bg-white border border-rose-100 hover:border-rose-300 text-zinc-800 hover:text-rose-600 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>キーワード別要点まとめ</span>
                    <LucideIcon name="ChevronRight" size={13} className="text-rose-400 shrink-0" />
                  </a>
                  <a
                    href={`/types/${relatedWorkstyleSlug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateWorkstyles(relatedWorkstyleSlug);
                    }}
                    className="p-3 rounded-xl bg-white border border-rose-100 hover:border-rose-300 text-zinc-800 hover:text-rose-600 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>タイプ別の働き方を見る</span>
                    <LucideIcon name="ChevronRight" size={13} className="text-rose-400 shrink-0" />
                  </a>
                  <a
                    href="/compare"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateCompare();
                    }}
                    className="p-3 rounded-xl bg-white border border-rose-100 hover:border-rose-300 text-zinc-800 hover:text-rose-600 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>他業種との徹底比較を見る</span>
                    <LucideIcon name="ChevronRight" size={13} className="text-rose-400 shrink-0" />
                  </a>
                  <a
                    href={`/${relatedClusterTopic}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateTopic(relatedClusterTopic);
                    }}
                    className="p-3 rounded-xl bg-white border border-rose-100 hover:border-rose-300 text-zinc-800 hover:text-rose-600 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>{TOPIC_CLUSTERS[relatedClusterTopic]?.title || '公式ガイド'}を見る</span>
                    <LucideIcon name="ChevronRight" size={13} className="text-rose-400 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Related Articles Cards (3 Columns) */}
              {relatedArticles.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-black text-base sm:text-lg text-zinc-900 flex items-center gap-2">
                      <LucideIcon name="BookOpen" size={17} className="text-rose-600" />
                      <span>この記事を読んだ人におすすめの公式コラム</span>
                    </h3>
                    <a
                      href="/blog"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigateBlog();
                      }}
                      className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>コラム一覧へ</span>
                      <LucideIcon name="ArrowRight" size={13} />
                    </a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {relatedArticles.map((rel) => (
                      <a
                        key={rel.id}
                        href={`/blog/${rel.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigateBlog(rel.slug);
                        }}
                        className="bg-zinc-50/70 hover:bg-white rounded-2xl border border-zinc-200/80 hover:border-rose-300 overflow-hidden shadow-2xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-0.5 text-left"
                      >
                        <div className="relative h-28 w-full overflow-hidden bg-rose-50">
                          <ArticleCardImage
                            src={getValidArticleEyeCatch(rel)}
                            alt={rel.title}
                            title={rel.title}
                            articleId={rel.id}
                            slug={rel.slug}
                            category={rel.category}
                            categoryLabel={rel.categoryLabel}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {rel.categoryLabel}
                          </span>
                        </div>
                        <div className="p-3 flex-1 flex flex-col justify-between">
                          <h4 className="font-bold text-xs text-zinc-900 group-hover:text-rose-600 transition-colors line-clamp-2 mb-1.5">
                            {rel.title}
                          </h4>
                          <div className="text-[10px] text-zinc-400 flex items-center gap-2">
                            <span>⏱️ {rel.readTime || '3分'}</span>
                            <span>📅 {rel.publishedAt}</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Article CTA Banner */}
              <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 text-white text-center shadow-lg relative overflow-hidden">
                <div className="inline-block bg-white/20 backdrop-blur-xs text-white text-[11px] font-black px-3.5 py-1 rounded-full mb-3 shadow-2xs">
                  ＼ 信太山新地 老舗旅館直営グループ「信太山ガールズ」公式採用 ／
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl mb-2 text-white">
                  信太山新地の当店で、あなたも高収入と安心を手に入れませんか？
                </h3>
                <p className="text-xs sm:text-sm text-rose-100 max-w-xl mx-auto mb-6 leading-relaxed">
                  当店は紹介所や仲介ではなく、信太山新地の現場旅館が直接運営する正規公式求人です。<br className="hidden sm:inline" />
                  【店先顔見せなし（待機所：スタンドまたは旅館）】【15分3,800円〜即日全額現金日払い】【当店独自の最低時給・日給保証制度（条件あり）】など、未経験の方も安心して働ける環境をご案内しています。
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onCtaclick}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-rose-50 text-rose-600 font-black text-sm shadow-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <LucideIcon name="MessageCircle" size={18} />
                    <span>当店へLINEで応募・無料相談する</span>
                  </button>
                  <a
                    href="/#consultation"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateConsultation();
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-rose-800/60 hover:bg-rose-800/90 text-white font-bold text-xs border border-white/30 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    <LucideIcon name="Calendar" size={15} />
                    <span>体験入店・店舗見学について見る</span>
                  </a>
                </div>
                <p className="text-[11px] text-rose-200 mt-4">
                  ※履歴書不要・私服のまま手ぶらでOK！女性専任スタッフ（あおい）が親身に対応いたします。
                </p>
              </div>

              <div className="mt-8 text-center">
                <a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateBlog();
                  }}
                  className="text-xs font-bold text-zinc-500 hover:text-zinc-800 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <LucideIcon name="ArrowLeft" size={14} />
                  <span>コラム一覧に戻る</span>
                </a>
              </div>
            </article>
          </div>
        ) : (
          /* Article Listing View */
          <div>
            <div className="text-center max-w-lg sm:max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 bg-rose-100 text-secondary text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-2xs">
                <LucideIcon name="BookOpen" size={14} />
                <span>OFFICIAL COLUMN</span>
              </div>
              <h1 className="font-display font-black text-[22px] sm:text-4xl text-zinc-900 leading-snug mb-3 text-balance">
                {categoryFilter !== 'all'
                  ? `${blogCategories.find((c) => c.id === categoryFilter)?.label || categoryFilter}｜信太山新地求人 お仕事コラム一覧`
                  : '信太山新地求人 お仕事コラム一覧'}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 text-pretty">
                仕事内容、給与システム、店先顔見せなしの待機ルール、毎月20日の定休日など、未経験の女性に役立つ公式解説をお届けします。
              </p>
            </div>

            {/* Search & Category Filter Bar */}
            <div ref={listTopRef} className="mb-8 bg-white rounded-3xl p-4 sm:p-5 border border-rose-100 shadow-2xs space-y-3 scroll-mt-20">
              <div className="relative">
                <LucideIcon
                  name="Search"
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    const v = e.target.value;
                    onSearchQueryChange(v);
                    syncBlogQueryUrl(v, categoryFilter);
                  }}
                  placeholder="キーワードでコラムを検索（例：未経験、日払い、待機所、寮、週1日）"
                  aria-label="お仕事コラムを検索"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-rose-100 bg-rose-50/30 focus:bg-white focus:border-rose-300 focus:outline-hidden text-zinc-800 placeholder:text-zinc-400"
                />
              </div>
              <nav aria-label="コラムカテゴリー一覧" className="flex flex-wrap items-center gap-1.5">
                <a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateBlogCategory('all');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                    categoryFilter === 'all'
                      ? 'bg-secondary text-white shadow-2xs'
                      : 'bg-rose-50 text-zinc-600 hover:bg-rose-100'
                  }`}
                >
                  すべて（{BLOG_ARTICLES.filter((a) => !a.noindex).length}件）
                </a>
                {blogCategories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`/blog/category/${cat.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateBlogCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                      categoryFilter === cat.id
                        ? 'bg-secondary text-white shadow-2xs'
                        : 'bg-rose-50 text-zinc-600 hover:bg-rose-100'
                    }`}
                  >
                    {cat.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Grid of Articles (staged pagination for crisp rendering performance) */}
            {filteredBlogArticles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-rose-100 p-6">
                <p className="text-sm font-bold text-zinc-700 mb-3">
                  該当するコラムが見つかりませんでした。
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onSearchQueryChange('');
                    onNavigateBlogCategory('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs hover:bg-rose-100 cursor-pointer"
                >
                  検索条件をリセットする
                </button>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {visibleArticles.map((article) => (
                    <a
                      key={article.id}
                      href={`/blog/${article.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigateBlog(article.slug);
                      }}
                      className="bg-white rounded-3xl overflow-hidden border border-rose-100/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 text-left"
                    >
                      <div>
                        <div className="w-full h-48 bg-rose-50 overflow-hidden relative">
                          <ArticleCardImage
                            src={getValidArticleEyeCatch(article)}
                            alt={article.title}
                            title={article.title}
                            articleId={article.id}
                            slug={article.slug}
                            category={article.category}
                            categoryLabel={article.categoryLabel}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-5">
                          <h2 className="font-bold text-sm sm:text-base text-zinc-900 line-clamp-2 group-hover:text-secondary transition-colors mb-2">
                            {article.title}
                          </h2>
                          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                            {article.summary}
                          </p>
                        </div>
                      </div>
                      <div className="p-5 pt-0 flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-100 mt-2">
                        <span>{article.publishedAt || '最新'}</span>
                        <span className="text-secondary font-bold group-hover:translate-x-1 transition-transform">
                          続きを読む →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav aria-label="ページネーション" className="mt-10 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="前のページへ"
                      className={`inline-flex items-center gap-1 h-10 px-3.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                        currentPage === 1
                          ? 'bg-white/80 text-zinc-400 border-rose-100 cursor-not-allowed'
                          : 'bg-white text-zinc-700 border-rose-100 hover:bg-rose-50 hover:border-rose-200 cursor-pointer shadow-2xs'
                      }`}
                    >
                      <LucideIcon name="ChevronLeft" size={15} />
                      <span>前へ</span>
                    </button>

                    {paginationItems.map((item, idx) =>
                      item === 'ellipsis' ? (
                        <span
                          key={`ellipsis-${idx}`}
                          className="px-1.5 text-zinc-500 font-bold select-none text-sm"
                          aria-hidden="true"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handlePageChange(item)}
                          aria-label={`${item}ページ目`}
                          aria-current={currentPage === item ? 'page' : undefined}
                          className={`min-w-[40px] h-10 px-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                            currentPage === item
                              ? 'bg-secondary text-white border-secondary shadow-sm shadow-secondary/25'
                              : 'bg-white text-zinc-800 border-rose-100 hover:bg-rose-50 hover:border-rose-200 shadow-2xs'
                          }`}
                        >
                          {item}
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="次のページへ"
                      className={`inline-flex items-center gap-1 h-10 px-3.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                        currentPage === totalPages
                          ? 'bg-white/80 text-zinc-400 border-rose-100 cursor-not-allowed'
                          : 'bg-white text-zinc-800 border-rose-100 hover:bg-rose-50 hover:border-rose-200 cursor-pointer shadow-2xs'
                      }`}
                    >
                      <span>次へ</span>
                      <LucideIcon name="ChevronRight" size={15} />
                    </button>
                  </nav>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
