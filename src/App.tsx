/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import WorkstyleFinderSection from './components/WorkstyleFinderSection';
import JobIntroSection from './components/JobIntroSection';
import SalaryOverviewSection from './components/SalaryOverviewSection';
import EnvironmentSection from './components/EnvironmentSection';
import Testimonials from './components/Testimonials';
import JobRequirementsSection from './components/JobRequirementsSection';
import TopFaqSection from './components/TopFaqSection';
import WorkFlowSection from './components/WorkFlowSection';
import ConsultationForm from './components/ConsultationForm';
import RecruitHub from './components/RecruitHub';
import AiSearchQueryGuideSection from './components/AiSearchQueryGuideSection';
import { QUERY_SUMMARY_CARDS } from './quickGuideData';
import Footer from './components/Footer';
import LucideIcon from './components/LucideIcon';

const RecruiterInterviewPage = lazy(() => import('./components/RecruiterInterviewPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ComparisonPage = lazy(() => import('./components/ComparisonPage'));
const ComparisonGuidePage = lazy(() => import('./components/ComparisonGuidePage'));
const FAQPage = lazy(() => import('./components/FAQPage'));
const TopicClusterPage = lazy(() => import('./components/TopicClusterPage'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const BlogView = lazy(() => import('./components/BlogView'));

import { getStoredSiteContent, SiteContent } from './siteContent';
import { LINE_OFFICIAL_URL } from './data';
import { updatePageSeo, getIsoLastUpdated } from './seo';
import { initAnalytics, trackPageView, trackLineCtaClick } from './analytics';

type AppTab = 'recruit' | 'blog' | 'admin' | 'about' | 'policy' | 'compare' | 'workstyle' | 'faq' | 'cluster' | 'interview' | 'quick-guide' | 'notfound';

export default function App() {
  const [siteContent] = useState<SiteContent>(getStoredSiteContent());
  const [currentTab, setCurrentTab] = useState<AppTab>('recruit');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('job');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [blogSearchQuery, setBlogSearchQuery] = useState<string>('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>('all');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [initialFaqCategory, setInitialFaqCategory] = useState<string | null>(null);
  const [consultationMessage, setConsultationMessage] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync route on mount and back/forward navigation
  useEffect(() => {
    const parseLocation = () => {
      const pathname = window.location.pathname;
      const search = window.location.search;
      const params = new URLSearchParams(search);

      if (pathname === '/' || pathname === '' || pathname === '/index.html') {
        setCurrentTab('recruit');
      } else if (pathname.startsWith('/about')) {
        setCurrentTab('about');
      } else if (pathname.startsWith('/policy') || pathname.startsWith('/privacy')) {
        setCurrentTab('policy');
      } else if (pathname === '/compare' || pathname === '/compare/' || pathname.startsWith('/comparison')) {
        setCurrentTab('compare');
      } else if (pathname.startsWith('/compare/')) {
        setCurrentTab('workstyle');
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length > 1) {
          setSelectedCategorySlug(parts[1]);
        }
      } else if (pathname.startsWith('/types') || pathname.startsWith('/workstyles')) {
        setCurrentTab('workstyle');
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length > 1) {
          setSelectedCategorySlug(parts[1]);
        } else if (params.get('category')) {
          setSelectedCategorySlug(params.get('category'));
        } else {
          setSelectedCategorySlug('all');
        }
      } else if (pathname.startsWith('/faq')) {
        setCurrentTab('faq');
        if (params.get('category')) {
          setInitialFaqCategory(params.get('category'));
        }
      } else if (pathname === '/interview' || pathname === '/interview/' || pathname.startsWith('/staff-interview') || pathname.startsWith('/recruiter-interview')) {
        setCurrentTab('interview');
      } else if (pathname === '/quick-guide' || pathname === '/quick-guide/') {
        setCurrentTab('quick-guide');
      } else if (pathname.startsWith('/admin')) {
        setCurrentTab('admin');
      } else if (pathname.startsWith('/blog')) {
        setCurrentTab('blog');
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length >= 3 && parts[1] === 'category') {
          setSelectedBlogSlug(null);
          setBlogCategoryFilter(decodeURIComponent(parts[2]));
          setBlogSearchQuery(params.get('q') || '');
        } else if (parts.length > 1) {
          setSelectedBlogSlug(parts[1]);
        } else {
          setSelectedBlogSlug(null);
          setBlogSearchQuery(params.get('q') || '');
          setBlogCategoryFilter(params.get('category') || 'all');
        }
      } else {
        const clusterTopics = [
          'job',
          'salary',
          'benefits',
          'beginner',
          'experienced',
          'requirements',
          'flow',
          'workstyle',
          'shops',
          'dorm',
          'safety'
        ];
        const matchCluster = clusterTopics.find((t) => pathname === `/${t}` || pathname === `/${t}/`);
        if (matchCluster) {
          setCurrentTab('cluster');
          setSelectedTopicId(matchCluster === 'benefits' ? 'salary' : matchCluster);
        } else {
          setCurrentTab('notfound');
        }
      }
    };

    parseLocation();
    window.addEventListener('popstate', parseLocation);
    return () => window.removeEventListener('popstate', parseLocation);
  }, []);

  // Initialize optional GA4 analytics when VITE_GA_MEASUREMENT_ID is configured
  useEffect(() => {
    initAnalytics();
  }, []);

  // Show scroll-to-top button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation helpers that push browser history
  const navigateTo = (tab: AppTab, path: string = '/') => {
    setCurrentTab(tab);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: AppTab) => {
    if (tab === 'recruit') {
      navigateTo('recruit', '/');
    } else if (tab === 'about') {
      navigateTo('about', '/about');
    } else if (tab === 'policy') {
      navigateTo('policy', '/policy');
    } else if (tab === 'compare') {
      navigateTo('compare', '/compare');
    } else if (tab === 'workstyle') {
      setSelectedCategorySlug('all');
      navigateTo('workstyle', '/types');
    } else if (tab === 'faq') {
      navigateTo('faq', '/faq');
    } else if (tab === 'blog') {
      setSelectedBlogSlug(null);
      navigateTo('blog', '/blog');
    } else if (tab === 'interview') {
      navigateTo('interview', '/interview');
    } else if (tab === 'quick-guide') {
      navigateTo('quick-guide', '/quick-guide');
    } else if (tab === 'admin') {
      navigateTo('admin', '/admin');
    } else if (tab === 'cluster') {
      const topic = selectedTopicId === 'benefits' ? 'salary' : selectedTopicId;
      navigateTo('cluster', `/${topic}`);
    } else if (tab === 'notfound') {
      navigateTo('notfound', window.location.pathname);
    }
  };

  const handleNavigateTopic = (topicId: string) => {
    if (topicId === 'interview') {
      navigateTo('interview', '/interview');
      return;
    }
    const targetTopic = topicId === 'benefits' ? 'salary' : topicId;
    setSelectedTopicId(targetTopic);
    navigateTo('cluster', `/${targetTopic}`);
  };

  const handleNavigateCompare = () => {
    navigateTo('compare', '/compare');
  };

  const handleNavigateWorkstyles = (categorySlug?: string) => {
    setSelectedCategorySlug(categorySlug || null);
    const path = categorySlug ? `/types/${categorySlug}` : '/types';
    navigateTo('workstyle', path);
  };

  const handleNavigateFaq = (category?: string) => {
    setInitialFaqCategory(category || null);
    const path = category ? `/faq?category=${category}` : '/faq';
    navigateTo('faq', path);
  };

  const handleNavigateBlog = (slug?: string) => {
    if (slug) {
      setSelectedBlogSlug(slug);
      navigateTo('blog', `/blog/${slug}`);
    } else {
      setSelectedBlogSlug(null);
      setBlogCategoryFilter('all');
      navigateTo('blog', '/blog');
    }
  };

  const handleNavigateBlogCategory = (catId: string) => {
    setSelectedBlogSlug(null);
    setBlogCategoryFilter(catId || 'all');
    const q = blogSearchQuery.trim();
    const basePath = catId && catId !== 'all' ? `/blog/category/${encodeURIComponent(catId)}` : '/blog';
    const nextUrl = q ? `${basePath}?q=${encodeURIComponent(q)}` : basePath;
    navigateTo('blog', nextUrl);
  };

  const handleScrollToSection = (sectionId: string) => {
    if (currentTab !== 'recruit') {
      setCurrentTab('recruit');
      window.history.pushState({}, '', '/');
      setTimeout(() => {
        const id = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const id = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
      const elem = document.getElementById(id);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaclick = () => {
    trackLineCtaClick('cta_button');
    window.open(LINE_OFFICIAL_URL, '_blank', 'noopener,noreferrer');
  };

  const handleInjectedScroll = (message: string) => {
    setConsultationMessage(message);
    if (currentTab !== 'recruit') {
      setCurrentTab('recruit');
      window.history.pushState({}, '', '/');
    }
    setTimeout(() => {
      const elem = document.getElementById('consultation');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Synchronize dynamic SEO metadata and JSON-LD structured data for top-level routes
  useEffect(() => {
    if (currentTab === 'recruit') {
      updatePageSeo({
        title: '信太山新地の求人なら信太山ガールズ｜未経験歓迎・お店直接募集・日払い',
        description: '信太山新地の老舗旅館直営店が女性を直接募集する公式求人サイトです。未経験歓迎・仲介天引き0円で、店先顔出しなしの待機環境、15分3,800円〜の明確な報酬と即日全額日払い、週1日・短時間勤務、個室寮・託児所条件まで応募前にご案内。LINE相談歓迎。',
        canonicalUrl: 'https://osaka-shinodayamashinchi-recruit.com/',
        ogImage: '/images/shinodayama_hero_banner_1792225964954.jpg',
        ogType: 'website'
      });
    } else if (currentTab === 'quick-guide') {
      updatePageSeo({
        title: '信太山新地求人 キーワード別公式要点まとめ｜給料・未経験・仕事内容【公式】',
        description: '信太山新地の求人・お店直接募集・給料・日払い・未経験・仕事内容・待機方法（顔出しなし）・週1日シフト・個室寮や出稼ぎ・飛田新地との違いなど、応募前によく検索されるキーワード別に結論をわかりやすくまとめました。公式LINEでの無料事前相談も随時受付中です。',
        canonicalUrl: 'https://osaka-shinodayamashinchi-recruit.com/quick-guide',
        ogImage: '/images/col_search_phone_jp_1792475574840.webp',
        ogType: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': 'https://osaka-shinodayamashinchi-recruit.com/quick-guide#webpage',
              'name': '気になるキーワード別にすぐ分かる｜信太山新地求人 公式要点まとめ',
              'description': '信太山新地の求人・給料・未経験・仕事内容・待機方法・働き方・寮出稼ぎ・他業種比較について公式結論をまとめたページ',
              'url': 'https://osaka-shinodayamashinchi-recruit.com/quick-guide',
              'dateModified': getIsoLastUpdated(),
              'inLanguage': 'ja-JP',
              'speakable': {
                '@type': 'SpeakableSpecification',
                'cssSelector': ['h1', 'h2', '.ai-direct-answer']
              }
            },
            {
              '@type': 'FAQPage',
              '@id': 'https://osaka-shinodayamashinchi-recruit.com/quick-guide#faq',
              'mainEntity': QUERY_SUMMARY_CARDS.map((card) => ({
                '@type': 'Question',
                'name': card.questionHeading,
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': card.directAnswer
                }
              }))
            },
            {
              '@type': 'BreadcrumbList',
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  'position': 1,
                  'name': '信太山新地求人トップ',
                  'item': 'https://osaka-shinodayamashinchi-recruit.com/'
                },
                {
                  '@type': 'ListItem',
                  'position': 2,
                  'name': '気になるキーワード別 公式要点まとめ',
                  'item': 'https://osaka-shinodayamashinchi-recruit.com/quick-guide'
                }
              ]
            }
          ]
        }
      });
    } else if (currentTab === 'admin') {
      updatePageSeo({
        title: '管理者画面｜信太山ガールズ',
        description: '信太山ガールズ管理用ページ',
        canonicalUrl: 'https://osaka-shinodayamashinchi-recruit.com/admin',
        robots: 'noindex, nofollow'
      });
    } else if (currentTab === 'notfound') {
      updatePageSeo({
        title: 'ページが見つかりません（404）｜信太山ガールズ',
        description: 'お探しのページは移動または削除された可能性があります。信太山新地求人公式サイトの主要ガイドからご覧ください。',
        canonicalUrl: `https://osaka-shinodayamashinchi-recruit.com${window.location.pathname}`,
        robots: 'noindex, nofollow'
      });
    }
  }, [currentTab]);

  // Track virtual SPA page_view transitions cleanly when VITE_GA_MEASUREMENT_ID is set
  useEffect(() => {
    trackPageView(window.location.pathname, document.title);
  }, [currentTab, selectedBlogSlug, blogCategoryFilter, selectedTopicId, selectedCategorySlug]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#333333] antialiased selection:bg-[#FCE8EF] selection:text-[#85465F]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onChangeTab={handleTabChange}
        onCtaclick={handleCtaclick}
        onScrollToSection={handleScrollToSection}
        onNavigateTopic={handleNavigateTopic}
      />

      {/* Main Content Router */}
      <main className="flex-1 pt-14 sm:pt-16 pb-20 sm:pb-12">
        {currentTab === 'recruit' && (
          <div>
            {/* Section 3: First View */}
            <Hero
              content={siteContent.hero}
              onCtaclick={handleCtaclick}
              onScrollToRequirements={() => handleScrollToSection('jobs')}
            />

            {/* Section 4: 信太山ガールズの5つの魅力 */}
            <section className="py-16 sm:py-20 bg-white" id="reasons">
              <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
                  <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
                    {siteContent.reasons.subtitle || 'OUR STRENGTHS'}
                  </p>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] leading-snug mb-3 text-balance">
                    {siteContent.reasons.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                    {siteContent.reasons.description}
                  </p>
                </div>

                {/* Top Tier: 3 Highlighted Store-Unique Strengths (Large Icon Cards) */}
                {(() => {
                  const featuredReasons = siteContent.reasons.items.filter((item) => item.featured);
                  const standardReasons = siteContent.reasons.items.filter((item) => !item.featured);
                  return (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                        {featuredReasons.map((reason) => (
                          <article
                            key={reason.number}
                            id={`charm-card-${reason.number}`}
                            className="rounded-3xl bg-gradient-to-b from-[#FFF6F8] to-white border-2 border-[#E85B91]/45 p-6 sm:p-7 shadow-[0_10px_28px_rgba(232,91,145,0.09)] flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-4 mb-5">
                                <div className="w-14 h-14 rounded-2xl bg-[#E85B91] text-white flex items-center justify-center shrink-0 shadow-[0_6px_16px_rgba(232,91,145,0.28)]">
                                  <LucideIcon name={reason.iconName} size={28} />
                                </div>
                                <div className="text-right">
                                  <span className="block font-display font-bold text-2xl leading-none text-[#E85B91] tabular-nums">
                                    {reason.number}
                                  </span>
                                  <span className="block text-[11px] font-bold tracking-wide text-[#A65D79] mt-1">
                                    お店独自の強み
                                  </span>
                                </div>
                              </div>

                              <h3 className="font-display font-bold text-lg sm:text-xl text-[#85465F] leading-snug mb-3">
                                {reason.title}
                              </h3>
                              <p className="text-sm text-[#4A4A4A] leading-relaxed">
                                {reason.description}
                              </p>
                            </div>
                          </article>
                        ))}
                      </div>

                      {/* Bottom Tier: 2 Supporting Points (Balanced 2-Column Row) */}
                      {standardReasons.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
                          {standardReasons.map((reason) => (
                            <article
                              key={reason.number}
                              id={`charm-card-${reason.number}`}
                              className="rounded-2xl bg-[#FAF6F8] border border-[#EFE2E7] p-5 sm:p-6 flex items-start gap-4"
                            >
                              <div className="w-11 h-11 rounded-xl bg-white border border-[#EFE2E7] text-[#A65D79] flex items-center justify-center shrink-0 mt-0.5">
                                <LucideIcon name={reason.iconName} size={21} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 text-xs font-bold text-[#A65D79] mb-1 tabular-nums">
                                  <span>{reason.number}</span>
                                  <span aria-hidden="true">·</span>
                                  <span>安心ポイント</span>
                                </div>
                                <h3 className="font-display font-bold text-base sm:text-lg text-[#333333] leading-snug mb-1.5">
                                  {reason.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                                  {reason.description}
                                </p>
                              </div>
                            </article>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </section>

            {/* Section 5: あなたに合った働き方を見つけましょう (7 Cards) */}
            <WorkstyleFinderSection
              onSelectWorkstyle={(slug) => handleNavigateWorkstyles(slug)}
              onViewAllWorkstyles={() => handleNavigateWorkstyles('all')}
            />

            {/* Section 6: 初めての方にも分かる、お仕事内容 */}
            <JobIntroSection
              onNavigateJobDetail={() => handleNavigateTopic('job')}
              onCtaclick={handleCtaclick}
            />

            {/* Section 7: 気になるお給料について、分かりやすくご説明します */}
            <SalaryOverviewSection
              onNavigateSalaryDetail={() => handleNavigateTopic('salary')}
              onCtaclick={handleCtaclick}
            />

            {/* Section 8: 実際に働く場所や環境をご紹介します */}
            <EnvironmentSection onCtaclick={handleCtaclick} />

            {/* Section 9: 実際に働く女性の声をご紹介 */}
            <Testimonials onCtaclick={handleCtaclick} />

            {/* Section 10: 信太山ガールズの募集条件 */}
            <JobRequirementsSection
              onCtaclick={handleCtaclick}
              onNavigateDetail={() => handleNavigateTopic('requirements')}
            />

            {/* Section 11: 応募前によくいただく質問 (10 FAQs) */}
            <TopFaqSection
              onNavigateFullFaq={() => handleNavigateFaq()}
              onCtaclick={handleCtaclick}
            />

            {/* Section 12: 応募からお仕事開始までの流れ (5 Steps) */}
            <WorkFlowSection
              onCtaclick={handleCtaclick}
              onNavigateDetail={() => handleNavigateTopic('flow')}
            />

            {/* Section 13: 最終応募・LINE相談エリア */}
            <ConsultationForm
              content={siteContent.consultation}
              initialMessage={consultationMessage}
              onClearInitialMessage={() => setConsultationMessage('')}
              onScrollToRequirements={() => handleScrollToSection('jobs')}
            />

            {/* Section 14: 応募前に知っておきたい情報 (12テーマ詳細ページへの導線) */}
            <div id="hub">
              <RecruitHub
                onScrollToSection={handleScrollToSection}
                onNavigateToArticle={(slug) => handleNavigateBlog(slug)}
                onNavigateToBlog={() => handleNavigateBlog()}
                onNavigateCompare={handleNavigateWorkstyles}
                onNavigateTopic={handleNavigateTopic}
                onNavigateFaq={() => handleNavigateFaq()}
              />
            </div>
          </div>
        )}

        {currentTab === 'quick-guide' && (
          <AiSearchQueryGuideSection
            onNavigateHome={() => navigateTo('recruit', '/')}
            onNavigateTopic={handleNavigateTopic}
            onNavigateCompare={handleNavigateCompare}
            onNavigateAbout={() => handleTabChange('about')}
            onNavigateFaq={() => handleNavigateFaq()}
            onCtaclick={handleCtaclick}
          />
        )}

        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" aria-label="読み込み中" />
            </div>
          }
        >
          {/* About / Policy Page View */}
          {(currentTab === 'about' || currentTab === 'policy') && (
            <AboutPage
              mode={currentTab === 'policy' ? 'policy' : 'about'}
              onNavigateHome={() => navigateTo('recruit', '/')}
              onNavigateBlog={() => handleNavigateBlog()}
              onCtaclick={handleCtaclick}
            />
          )}

          {/* Dedicated Comparison Guide Page View (徹底比較ページ) */}
          {currentTab === 'compare' && (
            <ComparisonGuidePage
              onNavigateHome={() => navigateTo('recruit', '/')}
              onNavigateWorkstyleGuide={(slug) => handleNavigateWorkstyles(slug)}
              onCtaclick={handleCtaclick}
              onInjectedScroll={handleInjectedScroll}
            />
          )}

          {/* Workstyle & Reasons Guide View (当店が選ばれる理由＆タイプ別働き方ガイド) */}
          {currentTab === 'workstyle' && (
            <ComparisonPage
              onNavigateHome={() => navigateTo('recruit', '/')}
              onNavigateBlog={() => handleNavigateBlog()}
              onNavigateTopic={handleNavigateTopic}
              onNavigateFaq={(cat) => handleNavigateFaq(cat)}
              onCtaclick={handleCtaclick}
              onInjectedScroll={handleInjectedScroll}
              initialCategorySlug={selectedCategorySlug}
              onSelectCategorySlug={(slug) => {
                setSelectedCategorySlug(slug);
                window.history.pushState({}, '', slug === 'all' ? '/types' : `/types/${slug}`);
              }}
              onNavigateComparisonGuide={() => handleNavigateCompare()}
            />
          )}

          {/* FAQ Page View */}
          {currentTab === 'faq' && (
            <FAQPage
              initialCategory={initialFaqCategory}
              onNavigateHome={() => navigateTo('recruit', '/')}
              onNavigateTopic={handleNavigateTopic}
              onCtaclick={handleCtaclick}
              onNavigateBlog={handleNavigateBlog}
            />
          )}

          {/* Topic Cluster Page View */}
          {currentTab === 'cluster' && (
            <TopicClusterPage
              topicId={selectedTopicId}
              onNavigateHome={() => navigateTo('recruit', '/')}
              onNavigateTopic={handleNavigateTopic}
              onNavigateBlog={handleNavigateBlog}
              onNavigateFaq={() => handleNavigateFaq()}
              onCtaclick={handleCtaclick}
              onInjectedScroll={handleInjectedScroll}
              onNavigateCompare={() => handleNavigateCompare()}
            />
          )}

          {/* Recruiter & Staff Interview Page View */}
          {currentTab === 'interview' && (
            <RecruiterInterviewPage
              onNavigateHome={() => navigateTo('recruit', '/')}
              onCtaclick={handleCtaclick}
              onNavigateBlog={() => handleNavigateBlog()}
              onNavigateFaq={() => handleNavigateFaq()}
            />
          )}

          {/* Admin Panel View */}
          {currentTab === 'admin' && (
            <AdminPanel
              onNavigateHome={() => navigateTo('recruit', '/')}
              onNavigateBlog={(slug) => handleNavigateBlog(slug)}
            />
          )}
        </Suspense>

        {/* 404 Not Found View (prevents Soft 404 indexing) */}
        {currentTab === 'notfound' && (
          <div className="bg-surface min-h-[70vh] py-16 px-4 flex items-center justify-center">
            <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 border border-rose-100 shadow-sm text-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <LucideIcon name="AlertCircle" size={28} />
              </div>
              <p className="text-xs font-mono font-bold text-rose-500 tracking-widest mb-1">404 NOT FOUND</p>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-zinc-900 mb-3">
                お探しのページが見つかりません
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                URLが変更されたか、ページが削除された可能性があります。下記の公式メニューから目的の情報をご覧ください。
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-bold mb-6">
                <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('recruit', '/'); }} className="p-3 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors">トップページ</a>
                <a href="/job" onClick={(e) => { e.preventDefault(); handleNavigateTopic('job'); }} className="p-3 rounded-xl bg-zinc-50 text-zinc-700 hover:bg-rose-50 transition-colors">仕事内容</a>
                <a href="/salary" onClick={(e) => { e.preventDefault(); handleNavigateTopic('salary'); }} className="p-3 rounded-xl bg-zinc-50 text-zinc-700 hover:bg-rose-50 transition-colors">給料・待遇</a>
                <a href="/types" onClick={(e) => { e.preventDefault(); handleNavigateWorkstyles(); }} className="p-3 rounded-xl bg-zinc-50 text-zinc-700 hover:bg-rose-50 transition-colors">働き方ガイド</a>
                <a href="/compare" onClick={(e) => { e.preventDefault(); handleNavigateCompare(); }} className="p-3 rounded-xl bg-zinc-50 text-zinc-700 hover:bg-rose-50 transition-colors">徹底比較ガイド</a>
                <a href="/faq" onClick={(e) => { e.preventDefault(); handleNavigateFaq(); }} className="p-3 rounded-xl bg-zinc-50 text-zinc-700 hover:bg-rose-50 transition-colors">よくある質問</a>
              </div>
              <a
                href="/blog"
                onClick={(e) => { e.preventDefault(); handleNavigateBlog(); }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:underline"
              >
                <LucideIcon name="BookOpen" size={14} />
                <span>お仕事コラム一覧を見る</span>
              </a>
            </div>
          </div>
        )}

        {/* Blog / Column View (Lazy-loaded so initial bundle stays lightweight on /) */}
        {currentTab === 'blog' && (
          <Suspense
            fallback={
              <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" aria-label="コラムを読み込み中" />
              </div>
            }
          >
            <BlogView
              selectedBlogSlug={selectedBlogSlug}
              categoryFilter={blogCategoryFilter}
              searchQuery={blogSearchQuery}
              onNavigateHome={() => navigateTo('recruit', '/')}
              onNavigateBlog={handleNavigateBlog}
              onNavigateBlogCategory={handleNavigateBlogCategory}
              onSearchQueryChange={setBlogSearchQuery}
              onNavigateTopic={handleNavigateTopic}
              onNavigateWorkstyles={handleNavigateWorkstyles}
              onNavigateCompare={handleNavigateCompare}
              onNavigateFaq={() => handleNavigateFaq()}
              onNavigateTab={(tab) => handleTabChange(tab)}
              onNavigateConsultation={() => {
                navigateTo('recruit', '/');
                setTimeout(() => {
                  const el = document.getElementById('consultation');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              onCtaclick={handleCtaclick}
            />
          </Suspense>
        )}
      </main>

      {/* 4. Enhanced Responsive Floating / Fixed Bottom LINE Bar with Reassurance Microcopy */}
      {/* Scroll-to-Top Button (Always Available Above the Bar) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 sm:bottom-24 right-4 sm:right-6 z-40 w-10 h-10 rounded-full bg-white text-zinc-600 shadow-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors cursor-pointer"
            title="ページ上部へ戻る"
          >
            <LucideIcon name="ArrowUp" size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom Dock Bar (2 Essential Actions: 募集要項 / LINEで相談) */}
      <div className="block sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EFE2E7] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-3 pt-2 pb-[max(0.65rem,env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-12 gap-2.5 items-center">
          <a
            href="/#jobs"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection('jobs');
            }}
            id="mobile-sticky-requirements-btn"
            className="col-span-5 py-2.5 px-3 rounded-xl bg-[#FFF6F8] hover:bg-[#FCE8EF] text-[#A65D79] border border-[#E2CED6] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LucideIcon name="ClipboardList" size={15} className="shrink-0" />
            <span>募集要項</span>
          </a>

          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-7 bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_3px_10px_rgba(6,199,85,0.28)] cursor-pointer"
            id="mobile-sticky-line-cta"
          >
            <LucideIcon name="MessageCircle" size={16} className="fill-white text-white shrink-0" />
            <span>LINEで相談</span>
          </a>
        </div>
      </div>

      {/* Desktop / Tablet Floating Pill (640px and Up) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-1.5">
        <div className="bg-white/95 backdrop-blur-xs border border-rose-200/90 rounded-full px-3 py-1 shadow-xs flex items-center gap-2 text-[11px] font-bold text-zinc-600">
          <span className="text-emerald-600 flex items-center gap-0.5">
            <LucideIcon name="Check" size={12} /> 女性スタッフ対応
          </span>
          <span>·</span>
          <span className="text-emerald-600 flex items-center gap-0.5">
            <LucideIcon name="Check" size={12} /> 匿名OK
          </span>
          <span>·</span>
          <span>無理な勧誘なし</span>
        </div>

        <a
          href={LINE_OFFICIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold px-5 py-3 rounded-full shadow-[0_4px_18px_rgba(6,199,85,0.45)] hover:shadow-[0_6px_24px_rgba(6,199,85,0.55)] transition-all cursor-pointer hover:scale-105 active:scale-95"
          id="desktop-floating-line-cta"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <LucideIcon name="MessageCircle" size={18} className="fill-white text-white" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-black text-emerald-100 leading-tight">
              店先顔見せなし・即日日払い
            </div>
            <div className="text-xs sm:text-sm font-black tracking-tight leading-tight">
              LINEで無料相談する
            </div>
          </div>
        </a>
      </div>

      {/* Global Footer */}
      <Footer
        currentTab={currentTab}
        onChangeTab={handleTabChange}
        onScrollToSection={handleScrollToSection}
        onOpenAdmin={() => handleTabChange('admin')}
        onNavigateCompare={handleNavigateCompare}
        onNavigateWorkstyle={handleNavigateWorkstyles}
        onNavigateTopic={handleNavigateTopic}
      />
    </div>
  );
}
