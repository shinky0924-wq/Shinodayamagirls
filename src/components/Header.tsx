/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';

interface HeaderProps {
  currentTab: 'recruit' | 'blog' | 'admin' | 'about' | 'policy' | 'compare' | 'workstyle' | 'faq' | 'cluster' | 'interview' | 'notfound';
  onChangeTab: (tab: 'recruit' | 'blog' | 'admin' | 'about' | 'policy' | 'compare' | 'workstyle' | 'faq' | 'cluster' | 'interview' | 'notfound') => void;
  onCtaclick: () => void;
  onScrollToSection: (sectionId: string) => void;
  onNavigateTopic?: (topicId: string) => void;
  isAdminMode?: boolean;
}

export default function Header({ currentTab, onChangeTab, onCtaclick, onScrollToSection, onNavigateTopic }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [guideDropdownOpen, setGuideDropdownOpen] = useState(false);
  const [mobileGuideExpanded, setMobileGuideExpanded] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('hero');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pageSectionLinks = [
    { id: 'hero', desktopLabel: 'トップ', mobileLabel: '求人トップ', href: '/', action: 'recruit', target: '#hero' },
    { id: 'reasons', desktopLabel: '6つの魅力', mobileLabel: '大切にしている6つのこと', href: '#reasons', action: 'section', target: '#reasons' },
    { id: 'workstyle-finder', desktopLabel: '働き方', mobileLabel: 'あなたに合った働き方', href: '#workstyle-finder', action: 'section', target: '#workstyle-finder' },
    { id: 'job-intro', desktopLabel: '仕事内容', mobileLabel: '仕事内容の紹介', href: '#job-intro', action: 'section', target: '#job-intro' },
    { id: 'salary-overview', desktopLabel: 'お給料', mobileLabel: 'お給料・報酬について', href: '#salary-overview', action: 'section', target: '#salary-overview' },
    { id: 'environment', desktopLabel: '働く環境', mobileLabel: '働く環境・設備', href: '#environment', action: 'section', target: '#environment' },
    { id: 'voice', desktopLabel: '女性の声', mobileLabel: '実際に働く女性の声', href: '#voice', action: 'section', target: '#voice' },
    { id: 'jobs', desktopLabel: '募集条件', mobileLabel: '信太山ガールズの募集条件', href: '#jobs', action: 'section', target: '#jobs' },
    { id: 'top-faq', desktopLabel: 'FAQ', mobileLabel: 'よくある質問', href: '#top-faq', action: 'section', target: '#top-faq' },
    { id: 'flow', desktopLabel: '流れ', mobileLabel: '応募からの流れ', href: '#flow', action: 'section', target: '#flow' },
  ];

  useEffect(() => {
    const orderedIds = [
      'hero',
      'reasons',
      'workstyle-finder',
      'job-intro',
      'salary-overview',
      'environment',
      'voice',
      'jobs',
      'top-faq',
      'flow',
      'recruit-hub',
      'consultation',
    ];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      if (currentTab !== 'recruit') return;

      const offset = 120;
      let current = 'hero';
      for (const id of orderedIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset) {
          current = id;
        }
      }
      setActiveSectionId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentTab]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setGuideDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const guideCategories = [
    { id: 'job', name: '仕事内容', icon: 'Coffee', desc: '個室待機・短時間接客の基本的な流れ' },
    { id: 'salary', name: '給料・待遇', icon: 'Coins', desc: '15分3,800円〜・即日全額日払い・保証条件' },
    { id: 'beginner', name: '未経験', icon: 'Sparkles', desc: '初めての方の事前準備とサポート体制' },
    { id: 'experienced', name: '経験者', icon: 'Award', desc: '移籍前に確認したい待遇や環境の違い' },
    { id: 'requirements', name: '募集要項', icon: 'ClipboardList', desc: '応募資格・必要書類・勤務条件一覧' },
    { id: 'flow', name: '面接・体験入店までの流れ', icon: 'Calendar', desc: '相談から見学・体験・開始までの手順' },
    { id: 'workstyle', name: '働き方', icon: 'Clock', desc: '週1日・短時間・毎月20日一斉定休日' },
    { id: 'shops', name: 'お店選び', icon: 'Store', desc: 'お店直接応募と半年ルール・当店の安心ポイント' },
    { id: 'dorm', name: '寮・出稼ぎ', icon: 'Home', desc: '個室寮・交通費・遠方からの勤務案内' },
    { id: 'safety', name: '身バレ・安全', icon: 'EyeOff', desc: '顔出しなし・個人情報とプライバシー対策' },
    { id: 'faq', name: 'よくある質問 FAQ', icon: 'HelpCircle', desc: '応募前に多い疑問66問を一覧で確認' },
    { id: 'blog', name: 'お仕事コラム', icon: 'BookOpen', desc: '働き方や制度の解説記事一覧' },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, link: { action: string; target?: string }) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setGuideDropdownOpen(false);

    if (link.action === 'recruit') {
      onChangeTab('recruit');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'faq') {
      onChangeTab('faq');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'compare') {
      onChangeTab('compare');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'workstyle') {
      onChangeTab('workstyle');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'blog') {
      onChangeTab('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'about') {
      onChangeTab('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'section' && link.target) {
      const sectionId = link.target.startsWith('#') ? link.target.substring(1) : link.target;
      if (currentTab !== 'recruit') {
        onChangeTab('recruit');
        setTimeout(() => {
          onScrollToSection(sectionId);
        }, 120);
      } else {
        onScrollToSection(sectionId);
      }
    }
  };

  const handleGuideCategoryClick = (categoryId: string) => {
    setMobileMenuOpen(false);
    setGuideDropdownOpen(false);
    if (categoryId === 'faq') {
      onChangeTab('faq');
      window.scrollTo(0, 0);
      return;
    }
    if (categoryId === 'blog') {
      onChangeTab('blog');
      window.scrollTo(0, 0);
      return;
    }
    if (onNavigateTopic) {
      onNavigateTopic(categoryId);
    }
  };

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setGuideDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setGuideDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-[#EFE2E7] ${
          isScrolled ? 'shadow-sm py-2 sm:py-2.5' : 'py-2.5 sm:py-3'
        }`}
      >
        <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 max-w-[1320px] mx-auto">
          {/* Clean Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onChangeTab('recruit');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group cursor-pointer shrink-0"
            id="header-brand-logo"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#E5D4DC] bg-white shrink-0">
              <img
                src="/images/shinodayama_logo.svg"
                alt="信太山ガールズ"
                className="w-full h-full object-cover"
                width={36}
                height={36}
                decoding="async"
              />
            </div>
            <span className="font-display font-bold text-base sm:text-lg text-[#A65D79] group-hover:text-[#E85B91] transition-colors tracking-tight whitespace-nowrap">
              信太山ガールズ
            </span>
          </a>

          {/* Desktop Navigation (Strictly Ordered by Page Flow) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1" id="desktop-navigation">
            {pageSectionLinks.map((item) => {
              const isActive = currentTab === 'recruit' && activeSectionId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`font-sans text-[12px] xl:text-[13px] px-2 xl:px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#FFF6F8] text-[#A65D79] font-bold'
                      : 'text-[#333333] hover:text-[#A65D79] hover:bg-[#FFF6F8]/60 font-medium'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.desktopLabel}
                </a>
              );
            })}

            {/* 総合ガイド Dropdown (Matches Section 13: RECRUIT GUIDE) */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnterDropdown}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                type="button"
                onClick={() => setGuideDropdownOpen(!guideDropdownOpen)}
                className={`font-sans text-[12px] xl:text-[13px] px-2 xl:px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                  guideDropdownOpen || (currentTab === 'recruit' && activeSectionId === 'recruit-hub') || currentTab === 'cluster'
                    ? 'bg-[#FFF6F8] text-[#A65D79] font-bold'
                    : 'text-[#333333] hover:text-[#A65D79] hover:bg-[#FFF6F8]/60 font-medium'
                }`}
                id="nav-link-guide"
                aria-expanded={guideDropdownOpen}
              >
                <span>総合ガイド</span>
                <LucideIcon
                  name={guideDropdownOpen ? 'ChevronUp' : 'ChevronDown'}
                  size={13}
                  className="text-[#A65D79]"
                />
              </button>

              <AnimatePresence>
                {guideDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-[520px] bg-white rounded-2xl shadow-xl border border-[#EFE2E7] p-3.5 z-50"
                  >
                    <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-[#F5EBEE]">
                      <span className="text-xs font-bold text-[#A65D79]">
                        信太山新地求人 総合ガイド（全12テーマ）
                      </span>
                      <a
                        href="/#recruit-hub"
                        onClick={(e) => {
                          e.preventDefault();
                          setGuideDropdownOpen(false);
                          if (currentTab !== 'recruit') onChangeTab('recruit');
                          setTimeout(() => onScrollToSection('recruit-hub'), 100);
                        }}
                        className="text-xs font-bold text-[#A65D79] hover:text-[#E85B91] flex items-center gap-1"
                      >
                        <span>テーマ一覧へ</span>
                        <LucideIcon name="ArrowRight" size={12} />
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {guideCategories.map((cat) => (
                        <a
                          key={cat.id}
                          href={`/${cat.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleGuideCategoryClick(cat.id);
                          }}
                          className="p-2 rounded-xl hover:bg-[#FFF6F8] transition-colors flex items-start gap-2.5 group"
                          id={`nav-guide-cat-${cat.id}`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#FFF6F8] text-[#A65D79] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#A65D79] group-hover:text-white transition-colors">
                            <LucideIcon name={cat.icon} size={14} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-xs text-[#333333] group-hover:text-[#A65D79] truncate">
                              {cat.name}
                            </div>
                            <div className="text-[10px] text-[#666666] line-clamp-1">
                              {cat.desc}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>

                    <div className="mt-2.5 pt-2.5 border-t border-[#F5EBEE] grid grid-cols-2 gap-2">
                      <a
                        href="/types"
                        onClick={(e) => handleLinkClick(e, { action: 'workstyle' })}
                        className="py-2 px-3 rounded-xl bg-[#FFF6F8] hover:bg-[#FCE8EF] text-[#A65D79] font-bold flex items-center justify-center gap-1.5 text-xs"
                      >
                        <LucideIcon name="Target" size={14} />
                        <span>タイプ別働き方ガイド</span>
                      </a>
                      <a
                        href="/compare"
                        onClick={(e) => handleLinkClick(e, { action: 'compare' })}
                        className="py-2 px-3 rounded-xl bg-[#F7F2EC] hover:bg-[#EFE7DD] text-[#333333] font-bold flex items-center justify-center gap-1.5 text-xs"
                      >
                        <LucideIcon name="Scale" size={14} className="text-[#A65D79]" />
                        <span>他業種との徹底比較</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Header Actions (Matches Section 14: LINE CONSULTATION CTA) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onCtaclick}
              id="header-cta"
              className="bg-[#06C755] hover:bg-[#05b34c] text-white font-sans font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-[0_2px_8px_rgba(6,199,85,0.22)]"
            >
              <LucideIcon name="MessageCircle" size={16} className="fill-white" />
              <span>LINEで相談</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-[#333333] hover:text-[#A65D79] hover:bg-[#FFF6F8] lg:hidden border border-[#EFE2E7] cursor-pointer"
              aria-label="メニューを開く"
            >
              <LucideIcon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Strictly Ordered by Page Flow) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-[56px] sm:top-[64px] bottom-0 z-50 bg-white border-b border-[#EFE2E7] shadow-2xl lg:hidden flex flex-col overflow-hidden"
            id="mobile-navigation-drawer"
          >
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-6 space-y-2.5">
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  ...pageSectionLinks.map((item) => ({
                    label: item.mobileLabel,
                    href: item.href,
                    action: item.action,
                    target: item.target,
                  })),
                  {
                    label: '応募前に知っておきたい情報（総合ガイド）',
                    href: '#recruit-hub',
                    action: 'section',
                    target: '#recruit-hub',
                  },
                  {
                    label: 'LINE相談・お問い合わせ',
                    href: '#consultation',
                    action: 'section',
                    target: '#consultation',
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    className="px-4 py-3 rounded-xl bg-[#FFF6F8]/50 hover:bg-[#FFF6F8] border border-[#EFE2E7] font-bold text-sm text-[#333333] flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <LucideIcon name="ChevronRight" size={16} className="text-[#A65D79]" />
                  </a>
                ))}
              </div>

              {/* Expandable 12-Theme Guide */}
              <div className="rounded-xl border border-[#E2CED6] bg-[#FFF6F8]/40 overflow-hidden mt-3">
                <button
                  type="button"
                  onClick={() => setMobileGuideExpanded(!mobileGuideExpanded)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-white font-bold text-sm text-[#A65D79] cursor-pointer"
                  id="mobile-link-guide-toggle"
                >
                  <span>信太山新地求人 総合ガイド（12テーマ）</span>
                  <LucideIcon name={mobileGuideExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
                </button>
                {mobileGuideExpanded && (
                  <div className="p-2 grid grid-cols-2 gap-1.5 border-t border-[#EFE2E7]">
                    {guideCategories.map((cat) => (
                      <a
                        key={cat.id}
                        href={`/${cat.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleGuideCategoryClick(cat.id);
                        }}
                        className="px-3 py-2 rounded-lg bg-white hover:bg-[#FFF6F8] text-xs font-bold text-[#333333] border border-[#EFE2E7] truncate"
                      >
                        {cat.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <a
                  href="/types"
                  onClick={(e) => handleLinkClick(e, { action: 'workstyle' })}
                  className="py-2.5 px-2 rounded-xl bg-[#F7F2EC] text-[#333333] font-bold"
                >
                  働き方ガイド
                </a>
                <a
                  href="/compare"
                  onClick={(e) => handleLinkClick(e, { action: 'compare' })}
                  className="py-2.5 px-2 rounded-xl bg-[#F7F2EC] text-[#333333] font-bold"
                >
                  他業種比較
                </a>
                <a
                  href="/about"
                  onClick={(e) => handleLinkClick(e, { action: 'about' })}
                  className="py-2.5 px-2 rounded-xl bg-[#F7F2EC] text-[#333333] font-bold"
                >
                  運営者情報
                </a>
              </div>
            </div>

            <div className="border-t border-[#EFE2E7] bg-white px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] shrink-0">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCtaclick();
                }}
                className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer text-sm"
                id="mobile-drawer-cta-btn"
              >
                <LucideIcon name="MessageCircle" className="fill-white text-white shrink-0" size={18} />
                <span>LINEで気軽に相談する</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
