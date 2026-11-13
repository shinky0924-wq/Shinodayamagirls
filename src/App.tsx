/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import RecruitHub from './components/RecruitHub';
import JobRequirementsSection from './components/JobRequirementsSection';
import WorkFlowSection from './components/WorkFlowSection';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import LucideIcon from './components/LucideIcon';
import ArticleCardImage from './components/ArticleCardImage';

const RecruiterInterviewPage = lazy(() => import('./components/RecruiterInterviewPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ComparisonPage = lazy(() => import('./components/ComparisonPage'));
const ComparisonGuidePage = lazy(() => import('./components/ComparisonGuidePage'));
const FAQPage = lazy(() => import('./components/FAQPage'));
const TopicClusterPage = lazy(() => import('./components/TopicClusterPage'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));

import { getStoredSiteContent, SiteContent } from './siteContent';
import { LINE_OFFICIAL_URL } from './data';
import { BLOG_ARTICLES, BlogArticle, getValidArticleEyeCatch, loadFullBlogArticle } from './blogData';
import { TOPIC_CLUSTERS } from './topicClusterData';
import { updatePageSeo } from './seo';

type AppTab = 'recruit' | 'blog' | 'admin' | 'about' | 'policy' | 'compare' | 'workstyle' | 'faq' | 'cluster' | 'interview' | 'notfound';

export default function App() {
  const [siteContent] = useState<SiteContent>(getStoredSiteContent());
  const [currentTab, setCurrentTab] = useState<AppTab>('recruit');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('job');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
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
      } else if (pathname.startsWith('/admin')) {
        setCurrentTab('admin');
      } else if (pathname.startsWith('/blog')) {
        setCurrentTab('blog');
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length > 1) {
          setSelectedBlogSlug(parts[1]);
        } else {
          setSelectedBlogSlug(null);
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
      navigateTo('blog', '/blog');
    }
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

  // Lazy-loaded full article body cache
  const [loadedFullArticle, setLoadedFullArticle] = useState<BlogArticle | null>(null);

  useEffect(() => {
    let active = true;
    if (currentTab === 'blog' && selectedBlogSlug) {
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
  }, [currentTab, selectedBlogSlug]);

  // Currently viewing blog article (merges instant summary index with lazy full content)
  const currentArticle = useMemo(() => {
    if (currentTab === 'blog' && selectedBlogSlug) {
      if (loadedFullArticle && loadedFullArticle.slug === selectedBlogSlug) {
        return loadedFullArticle;
      }
      return BLOG_ARTICLES.find((a) => a.slug === selectedBlogSlug) || null;
    }
    return null;
  }, [currentTab, selectedBlogSlug, loadedFullArticle]);

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
      faq: 'consultation'
    };
    return mapping[currentArticle.category] || 'inexperienced';
  }, [currentArticle]);

  // Contextual primary topic cluster for internal cross-linking
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
      faq: 'safety'
    };
    return mapping[currentArticle.category] || 'job';
  }, [currentArticle]);

  // Contextual 3 related articles for internal link network
  const relatedArticles = useMemo(() => {
    if (!currentArticle) return [];
    const sameCategory = BLOG_ARTICLES.filter(
      (a) => a.id !== currentArticle.id && a.category === currentArticle.category
    );
    if (sameCategory.length >= 3) {
      return sameCategory.slice(0, 3);
    }
    const otherArticles = BLOG_ARTICLES.filter(
      (a) => a.id !== currentArticle.id && a.category !== currentArticle.category
    );
    return [...sameCategory, ...otherArticles].slice(0, 3);
  }, [currentArticle]);

  // Synchronize dynamic SEO metadata and JSON-LD structured data for LLM and Web crawlers
  useEffect(() => {
    if (currentTab === 'recruit') {
      updatePageSeo({
        title: '信太山新地求人・信太山求人【公式】未経験歓迎・顔出しなし｜信太山ガールズ',
        description: '【信太山新地求人・信太山求人公式】未経験から始めやすい信太山新地の旅館直営求人。店先顔出しなし・個室待機・15分短時間コース3,800円〜・即日全額日払い・週1日〜相談可。仕事内容・給料・寮・身バレ対策を分かりやすくご案内します。',
        canonicalUrl: 'https://osaka-shinodayamashinchi-recruit.com/',
        ogImage: '/images/shinodayama_hero_banner_1792225964954.jpg',
        ogType: 'website'
      });
    } else if (currentTab === 'blog') {
      if (currentArticle) {
        updatePageSeo({
          title: `${currentArticle.title}｜信太山新地お仕事コラム【信太山ガールズ公式】`,
          description: currentArticle.summary || `${currentArticle.title}についての信太山新地公式解説記事です。未経験女性が知りたい現場のリアルをお届けします。`,
          canonicalUrl: `https://osaka-shinodayamashinchi-recruit.com/blog/${currentArticle.slug}`,
          ogImage: currentArticle.eyeCatch || '/images/hub_beginner_cast_1792485407920.webp',
          ogType: 'article',
          publishedTime: currentArticle.publishedAt,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': currentArticle.title,
            'description': currentArticle.summary,
            'datePublished': currentArticle.publishedAt,
            'dateModified': currentArticle.publishedAt,
            'inLanguage': 'ja-JP',
            'isAccessibleForFree': true,
            'keywords': Array.isArray(currentArticle.tags) ? currentArticle.tags.join(', ') : '信太山新地, 信太山ガールズ, 求人, 旅館個室待機, 即日全額日払い',
            'image': currentArticle.eyeCatch ? `https://osaka-shinodayamashinchi-recruit.com${currentArticle.eyeCatch}` : undefined,
            'author': {
              '@type': 'Person',
              'name': currentArticle.author?.name || 'あおい（信太山新地女性専任アドバイザー）',
              'jobTitle': '女性採用アドバイザー・現場サポート責任者',
              'worksFor': {
                '@type': 'Organization',
                'name': '信太山新地 老舗旅館直営グループ（信太山ガールズ）',
                'url': 'https://osaka-shinodayamashinchi-recruit.com/'
              }
            },
            'publisher': {
              '@type': 'Organization',
              'name': '信太山ガールズ（旅館直営求人・女性採用サポート）',
              'url': 'https://osaka-shinodayamashinchi-recruit.com/',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://osaka-shinodayamashinchi-recruit.com/favicon.png'
              }
            },
            'speakable': {
              '@type': 'SpeakableSpecification',
              'cssSelector': ['#llm-article-summary-text', 'h1']
            },
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': `https://osaka-shinodayamashinchi-recruit.com/blog/${currentArticle.slug}`
            }
          }
        });
      } else {
        updatePageSeo({
          title: '信太山新地求人・信太山求人 お仕事コラム一覧｜信太山ガールズ公式',
          description: '信太山新地の仕事内容、給料システム、旅館個室待機、顔出しなしルール、未経験向けガイドなど働く前に役立つ公式解説コラム一覧。',
          canonicalUrl: 'https://osaka-shinodayamashinchi-recruit.com/blog',
          ogType: 'website'
        });
      }
    } else if (currentTab === 'about') {
      updatePageSeo({
        title: '運営者情報・店舗概要｜信太山ガールズ（信太山新地 旅館直営公式採用窓口）',
        description: '信太山新地の老舗旅館直営求人窓口「信太山ガールズ」の運営者情報、所在地（大阪府和泉市）、理念、女性サポート体制についてご紹介します。',
        canonicalUrl: 'https://osaka-shinodayamashinchi-recruit.com/about',
        ogType: 'website'
      });
    } else if (currentTab === 'interview') {
      updatePageSeo({
        title: '旅館の求人・採用担当者インタビュー｜信太山新地 旅館直営公式採用',
        description: '信太山新地の老舗旅館直営採用。面接・給与担当の松本マネージャーと、女性相談窓口のあおいスタッフが信太山新地のリアルな現場実態に本音で回答しました。店先顔見せなし、未経験率90%、給与・日払い、面接内容まで詳しく解説。',
        canonicalUrl: 'https://osaka-shinodayamashinchi-recruit.com/interview',
        ogType: 'article'
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
  }, [currentTab, currentArticle]);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800 antialiased selection:bg-rose-200 selection:text-rose-900">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onChangeTab={handleTabChange}
        onCtaclick={handleCtaclick}
        onScrollToSection={handleScrollToSection}
        onNavigateTopic={handleNavigateTopic}
      />

      {/* Main Content Router */}
      <main className="flex-1 pt-16 sm:pt-20 pb-28 sm:pb-12">
        {currentTab === 'recruit' && (
          <div>
            {/* Hero Section */}
            <Hero
              content={siteContent.hero}
              onCtaclick={handleCtaclick}
              onBlogClick={() => handleNavigateBlog()}
              articles={BLOG_ARTICLES}
              onArticleClick={(slug) => handleNavigateBlog(slug)}
            />

            {/* Recruit Hub Section (知りたい専門テーマから探す 公式分野別ガイド) */}
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

            {/* Reasons Why Shinodayama Is Chosen (信太山新地で、当店が選ばれる6つの理由) */}
            <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#FFFAFC] to-white relative overflow-hidden" id="reasons">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
                {/* 見出しブロック */}
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                  <div className="inline-block text-[11px] font-bold tracking-[0.2em] text-[#D8175D] uppercase bg-[#FFF1F5] px-3.5 py-1 rounded-full border border-[#F0DDE4] mb-3">
                    OUR ADVANTAGES
                  </div>
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-[32px] text-[#222228] leading-tight">
                    信太山新地で、当店が選ばれる6つの理由
                  </h2>
                  {/* 短いピンクのアクセントライン */}
                  <div className="w-12 h-0.5 bg-[#D8175D] mx-auto mt-4 mb-4 rounded-full" />
                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                    お店選びで大切なのは、お給料だけではありません。働く環境・プライバシーへの配慮・スタッフのサポートまで、女性が安心して働ける環境を大切にしています。
                  </p>
                </div>

                {/* 6つのカード（PC：横3列×縦2段、スマホ：縦1列） */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {siteContent.reasons.items.map((reason) => (
                    <div
                      key={reason.number}
                      className="bg-white rounded-[18px] p-6 sm:p-7 border border-[#F3E5EB] shadow-[0_4px_20px_-4px_rgba(216,23,93,0.05)] hover:shadow-[0_8px_30px_-6px_rgba(216,23,93,0.12)] hover:border-[#D8175D]/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                    >
                      <div>
                        {/* 上部：左に淡いピンクの番号、右に上品なアイコンバッジ */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-display font-black text-2xl sm:text-[28px] text-[#F3A5BE] group-hover:text-[#D8175D] transition-colors tracking-wider">
                            {reason.number}
                          </span>
                          <div className="w-11 h-11 rounded-[14px] bg-[#FFF1F5] text-[#D8175D] flex items-center justify-center border border-[#F0DDE4] group-hover:bg-[#D8175D] group-hover:text-white transition-all shadow-2xs group-hover:scale-105">
                            <LucideIcon name={reason.iconName} size={20} />
                          </div>
                        </div>

                        {/* 見出し（濃いネイビー・チャコール系） */}
                        <h3 className="font-bold text-base sm:text-lg text-[#222228] mb-2.5 leading-snug">
                          {reason.title}
                        </h3>

                        {/* 説明文（落ち着いた濃いグレー、左揃え） */}
                        <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed text-left">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* セクション下部：自然な応募・LINE相談への導線 */}
                <div className="mt-12 sm:mt-16 max-w-2xl mx-auto bg-white rounded-[20px] p-6 sm:p-8 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-3">
                    <LucideIcon name="MessageCircle" size={13} />
                    <span>24時間いつでも受付中</span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl md:text-[22px] text-[#222228] mb-2.5">
                    まずは、気になることを聞いてみませんか？
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6 max-w-lg mx-auto">
                    応募するかどうかは、話を聞いてから決めても大丈夫です。お仕事内容・お給料・働き方など、気になることは女性スタッフにお気軽にご相談ください。
                  </p>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <a
                      href={LINE_OFFICIAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCtaclick();
                      }}
                      className="w-full sm:w-auto sm:min-w-[320px] h-[52px] sm:h-[54px] px-8 rounded-[12px] font-extrabold text-sm sm:text-base bg-[#06C755] hover:bg-[#05b34c] text-white transition-all flex items-center justify-center gap-2.5 shadow-md shadow-[#06C755]/20 hover:shadow-lg cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                      id="reasons-line-cta-btn"
                    >
                      <LucideIcon name="MessageCircle" size={20} className="fill-white text-white" />
                      <span>LINEで気軽に相談する</span>
                    </a>
                    <span className="text-xs text-[#888888] font-medium mt-1">
                      相談だけでも大歓迎です
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials / Real Interviews (信太山新地で働いた女性インタビュー: リアル体験談) */}
            <Testimonials onCtaclick={handleCtaclick} />

            {/* Job Requirements Section (募集要項・採用条件一覧) */}
            <JobRequirementsSection
              onCtaclick={handleCtaclick}
              onNavigateDetail={() => handleNavigateTopic('requirements')}
            />

            {/* WorkFlow Section (応募からお仕事開始までの流れ) */}
            <WorkFlowSection
              onCtaclick={handleCtaclick}
              onNavigateDetail={() => handleNavigateTopic('flow')}
            />

            {/* Consultation / LINE Section */}
            <div id="consultation">
              <ConsultationForm
                content={siteContent.consultation}
                initialMessage={consultationMessage}
                onClearInitialMessage={() => setConsultationMessage('')}
              />
            </div>
          </div>
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

        {/* Blog / Column View */}
        {currentTab === 'blog' && (
          <div className="bg-surface min-h-screen py-8 sm:py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              {/* If viewing a single article */}
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
                            navigateTo('recruit', '/');
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
                            handleNavigateBlog();
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
                            handleNavigateTopic(relatedClusterTopic);
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
                    <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-zinc-900 mb-4 leading-tight">
                      {currentArticle.title}
                    </h1>
                    <div className="flex items-center gap-4 text-xs text-zinc-400 mb-6 pb-6 border-b border-zinc-100">
                      {currentArticle.publishedAt && <span>📅 {currentArticle.publishedAt}</span>}
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

                    {/* 📌 Article 30-Second Summary Card (3 Key Takeaways & LLMO Direct Answer) */}
                    {currentArticle.summary && (
                      <section
                        id="llm-article-summary"
                        aria-label="この記事のポイント（30秒でわかる3行要約）"
                        data-entity-type="DirectAnswer"
                        itemScope
                        itemType="https://schema.org/Answer"
                        className="bg-gradient-to-br from-rose-50/95 via-[#fff8f8] to-amber-50/30 border-2 border-rose-200/90 p-5 sm:p-6 rounded-3xl mb-8 shadow-sm relative overflow-hidden"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-rose-200/70">
                          <div className="flex items-center gap-2 text-rose-900 font-black text-xs sm:text-sm">
                            <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs shadow-2xs">📌</span>
                            <span>この記事のポイント（30秒でわかる3行要約）</span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[11px] bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full font-bold border border-rose-200">
                            <LucideIcon name="Sparkles" size={11} className="text-rose-600" />
                            <span>AI検索・Google推奨サマリー</span>
                          </span>
                        </div>

                        {/* 3 Bullet Points */}
                        <div className="space-y-2 mb-4">
                          {[
                            currentArticle.title.includes('給料') || currentArticle.title.includes('稼')
                              ? '信太山新地の給料システム・日給5万〜12万円即日手渡し日払いのリアル'
                              : '信太山新地は店先顔見せ一切なし・旅館個室待機で知り合いバレ徹底防止',
                            'ノルマ・罰金・飲酒・客との連絡先交換（営業LINE）は一切不要',
                            '老舗旅館直営の専任仲居さん＆女性スタッフによる24時間親身サポート'
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

                        {/* Direct Answer Paragraph */}
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

                    {/* Article Body Content (lazy-loaded full article body) */}
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
                                          handleNavigateBlog(linkHref.replace('/blog/', ''));
                                        } else if (linkHref === '/blog') {
                                          handleNavigateBlog();
                                        } else if (linkHref.startsWith('/types')) {
                                          handleNavigateWorkstyles(linkHref === '/types' ? undefined : linkHref.replace('/types/', ''));
                                        } else if (linkHref === '/compare') {
                                          handleNavigateCompare();
                                        } else if (linkHref === '/faq') {
                                          handleNavigateFaq();
                                        } else {
                                          navigateTo('recruit', '/');
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
                            return (
                              <h2 key={idx} className="font-display font-black text-xl sm:text-2xl text-zinc-900 mt-10 mb-4 pb-2.5 border-b border-rose-100 flex items-center gap-2.5">
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
                                  onClick={handleCtaclick}
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
                            <h2 className="font-bold text-lg sm:text-xl text-zinc-900 mb-3 flex items-center gap-2">
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
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-[11px] text-zinc-500 font-medium">
                          <span className="flex items-center gap-1">
                            <LucideIcon name="ShieldCheck" size={13} className="text-emerald-600" />
                            信太山新地旅館組合ルール準拠
                          </span>
                          <span className="flex items-center gap-1">
                            <LucideIcon name="CheckCircle2" size={13} className="text-rose-500" />
                            店先顔見せなし・完全個室待機公認
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contextual Internal Links to Core Guides (/types, /compare, topic cluster) */}
                    <div className="mt-8 p-5 rounded-2xl bg-rose-50/40 border border-rose-100">
                      <p className="text-xs font-extrabold text-rose-800 mb-3 flex items-center gap-1.5">
                        <LucideIcon name="Compass" size={14} className="text-rose-600" />
                        <span>あわせて読みたい公式専門ガイド</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-bold">
                        <a
                          href={`/types/${relatedWorkstyleSlug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigateWorkstyles(relatedWorkstyleSlug);
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
                            handleNavigateCompare();
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
                            handleNavigateTopic(relatedClusterTopic);
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
                              handleNavigateBlog();
                            }}
                            className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>コラム一覧へ</span>
                            <LucideIcon name="ArrowRight" size={13} />
                          </a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {relatedArticles.map((rel) => (
                            <a
                              key={rel.id}
                              href={`/blog/${rel.slug}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavigateBlog(rel.slug);
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

                    {/* Article CTA Banner: Direct Shop Recruitment Prompt */}
                    <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 text-white text-center shadow-lg relative overflow-hidden">
                      <div className="inline-block bg-white/20 backdrop-blur-xs text-white text-[11px] font-black px-3.5 py-1 rounded-full mb-3 shadow-2xs">
                        ＼ 信太山新地 老舗旅館直営グループ「信太山ガールズ」公式採用 ／
                      </div>
                      <h3 className="font-display font-black text-xl sm:text-2xl mb-2 text-white">
                        信太山新地の当店で、あなたも高収入と安心を手に入れませんか？
                      </h3>
                      <p className="text-xs sm:text-sm text-rose-100 max-w-xl mx-auto mb-6 leading-relaxed">
                        当店は紹介所や仲介ではなく、信太山新地の現場旅館が直接運営する正規公式求人です。<br className="hidden sm:inline" />
                        【店先顔見せ一切なし（完全個室待機）】【15分3,800円〜即日全額現金日払い】【日給保証・時給1万円保証】など、未経験の方も初日から安心して高収入を稼げる環境をお約束します。
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={handleCtaclick}
                          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-rose-50 text-rose-600 font-black text-sm shadow-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                        >
                          <LucideIcon name="MessageCircle" size={18} />
                          <span>当店へLINEで応募・無料相談する</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            navigateTo('recruit', '/');
                            setTimeout(() => {
                              const el = document.getElementById('consultation');
                              el?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          }}
                          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-rose-800/60 hover:bg-rose-800/90 text-white font-bold text-xs border border-white/30 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                        >
                          <LucideIcon name="Calendar" size={15} />
                          <span>体験入店・店舗見学について見る</span>
                        </button>
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
                          handleNavigateBlog();
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
                  <div className="text-center max-w-2xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-1.5 bg-rose-100 text-secondary text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-2xs">
                      <LucideIcon name="BookOpen" size={14} />
                      <span>OFFICIAL COLUMN</span>
                    </div>
                    <h1 className="font-display font-black text-2xl sm:text-4xl text-zinc-900 mb-3">
                      信太山新地求人 お仕事コラム一覧
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-600">
                      仕事内容、給与システム、店先顔見せなしの待機ルール、毎月20日の定休日など、未経験の女性に役立つ公式解説をお届けします。
                    </p>
                  </div>

                  {/* Grid of Articles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {BLOG_ARTICLES.map((article) => (
                      <a
                        key={article.id}
                        href={`/blog/${article.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigateBlog(article.slug);
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
                </div>
              )}
            </div>
          </div>
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

      {/* Mobile Sticky Bottom Dock Bar (Section 8: 3 Items Navigation) */}
      <div className="block sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-rose-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="grid grid-cols-12 gap-2 items-center">
          {/* 1. 求人トップ */}
          <button
            type="button"
            onClick={() => {
              if (currentTab !== 'recruit') handleTabChange('recruit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="col-span-3 flex flex-col items-center justify-center py-1 px-1 rounded-xl text-zinc-700 hover:text-[#E5004F] transition-colors cursor-pointer"
          >
            <LucideIcon name="Home" size={18} className="text-[#E5004F]" />
            <span className="text-[10px] font-bold mt-0.5">求人トップ</span>
          </button>

          {/* 2. ガイド一覧 */}
          <button
            type="button"
            onClick={() => {
              if (currentTab !== 'recruit') handleTabChange('recruit');
              handleScrollToSection('recruit-hub');
            }}
            className="col-span-3 flex flex-col items-center justify-center py-1 px-1 rounded-xl text-zinc-700 hover:text-[#E5004F] transition-colors cursor-pointer"
          >
            <LucideIcon name="Compass" size={18} className="text-[#E5004F]" />
            <span className="text-[10px] font-bold mt-0.5">ガイド一覧</span>
          </button>

          {/* 3. 応募・相談 (最も目立つボタン) */}
          <div className="col-span-6">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#06C755]/30 cursor-pointer"
              id="mobile-sticky-line-cta"
            >
              <LucideIcon name="MessageCircle" size={16} className="fill-white text-white shrink-0" />
              <span>LINEで応募・相談</span>
            </a>
          </div>
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
