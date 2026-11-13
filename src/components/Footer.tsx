/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MouseEvent, useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { getStoredSiteContent, getEffectiveLastUpdated } from '../siteContent';

interface FooterProps {
  currentTab: string;
  onChangeTab: (tab: 'recruit' | 'blog' | 'admin' | 'about' | 'policy' | 'compare' | 'workstyle' | 'faq' | 'cluster' | 'interview') => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onNavigateCompare?: (categorySlug?: string) => void;
  onNavigateWorkstyle?: (categorySlug?: string) => void;
  onNavigateTopic?: (topicId: string) => void;
  isAdminMode?: boolean;
}

export default function Footer({
  currentTab,
  onChangeTab,
  onScrollToSection,
  onOpenAdmin,
  onNavigateCompare,
  onNavigateWorkstyle,
  onNavigateTopic,
}: FooterProps) {
  const [showAdminLink, setShowAdminLink] = useState(false);
  const siteContent = getStoredSiteContent();
  const lastUpdated = getEffectiveLastUpdated(siteContent.lastUpdated);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('creator') === 'shinodayama' || params.get('admin') === 'true') {
        localStorage.setItem('show_admin_portal', 'true');
        setShowAdminLink(true);
      } else if (localStorage.getItem('show_admin_portal') === 'true') {
        setShowAdminLink(true);
      }
    } catch {}
  }, []);

  const sectionLinks = [
    { name: '求人トップ', action: 'section', target: '#hero' },
    { name: '大切にしている6つのこと', action: 'section', target: '#reasons' },
    { name: '仕事内容の紹介', action: 'section', target: '#job-intro' },
    { name: 'お給料・報酬について', action: 'section', target: '#salary-overview' },
    { name: '働く環境・設備', action: 'section', target: '#environment' },
    { name: '実際に働く女性の声', action: 'section', target: '#voice' },
    { name: '募集要項一覧', action: 'section', target: '#jobs' },
    { name: '応募からの流れ', action: 'section', target: '#flow' },
  ];

  const workstyleLinks = [
    { name: '未経験から始めたい', slug: 'inexperienced', target: '/types/inexperienced' },
    { name: '高収入を目指したい', slug: 'high-income', target: '/types/high-income' },
    { name: '週1日から働きたい', slug: 'weekly-1', target: '/types/weekly-1' },
    { name: '顔出しなし・身バレ対策', slug: 'privacy', target: '/types/privacy' },
    { name: '短時間・短期で働きたい', slug: 'short-term', target: '/types/short-term' },
    { name: '女性スタッフに相談したい', slug: 'female-staff', target: '/types/female-staff' },
    { name: '出稼ぎ・寮付き希望', slug: 'dormitory', target: '/types/dormitory' },
    { name: 'まずは話を聞きたい', slug: 'consultation', target: '/types/consultation' },
  ];

  const comprehensiveGuideLinks = [
    { id: 'job', name: '01 仕事内容', path: '/job' },
    { id: 'salary', name: '02 給料・待遇', path: '/salary' },
    { id: 'beginner', name: '03 未経験ガイド', path: '/beginner' },
    { id: 'experienced', name: '04 経験者ガイド', path: '/experienced' },
    { id: 'requirements', name: '05 募集要項・応募条件', path: '/requirements' },
    { id: 'flow', name: '06 面接・体験入店の流れ', path: '/flow' },
    { id: 'workstyle', name: '07 自由な働き方', path: '/workstyle' },
    { id: 'shops', name: '08 お店選び', path: '/shops' },
    { id: 'dorm', name: '09 寮・出稼ぎ', path: '/dorm' },
    { id: 'safety', name: '10 身バレ・安全対策', path: '/safety' },
    { id: 'faq', name: '11 よくある質問 FAQ（66問）', path: '/faq' },
    { id: 'blog', name: '12 お仕事コラム', path: '/blog' },
  ];

  const handleSectionLink = (e: MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const id = target.replace(/^#/, '');
    if (currentTab !== 'recruit') {
      onChangeTab('recruit');
      setTimeout(() => onScrollToSection(id), 100);
    } else {
      onScrollToSection(id);
    }
  };

  const handleWorkstyleLink = (e: MouseEvent<HTMLAnchorElement>, slug?: string) => {
    e.preventDefault();
    if (onNavigateWorkstyle) {
      onNavigateWorkstyle(slug);
    } else {
      onChangeTab('workstyle');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#F7F2EC] border-t border-[#E9DFD4] pt-14 pb-24 sm:pb-10" id="app-footer">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/shinodayama_logo.svg"
                alt="信太山ガールズ"
                className="w-8 h-8 rounded-full object-cover border border-[#E5D4DC] bg-white"
                width={32}
                height={32}
                decoding="async"
              />
              <span className="font-display font-bold text-lg text-[#A65D79]">
                信太山ガールズ
              </span>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              信太山新地にある老舗旅館直営店が女性を直接募集する公式求人サイトです。仲介や紹介所を介さない直接採用のため、仕事内容・お給料・待遇・働く環境をそのままご案内しています。
            </p>
            <div className="text-xs text-[#555555] space-y-1">
              <p>店舗所在地：大阪府和泉市 幸二丁目（信太山新地）</p>
              <p>応募窓口：当店公式LINEにて24時間相談受付中</p>
              <p className="text-[11px] text-[#666666]">最終更新日：{lastUpdated}</p>
            </div>
          </div>

          {/* Col 2: Top Page Sections */}
          <div className="space-y-3">
            <p className="font-display font-bold text-sm text-[#333333]">
              求人案内メニュー
            </p>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              {sectionLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.target}
                    onClick={(e) => handleSectionLink(e, link.target)}
                    className="text-[#4A4A4A] hover:text-[#A65D79] hover:underline transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Workstyle Links */}
          <div className="space-y-3">
            <p className="font-display font-bold text-sm text-[#333333]">
              <a
                href="/types"
                onClick={(e) => handleWorkstyleLink(e)}
                className="hover:text-[#A65D79] transition-colors inline-flex items-center gap-1"
              >
                <span>タイプ別の働き方</span>
                <LucideIcon name="ChevronRight" size={14} />
              </a>
            </p>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              {workstyleLinks.map((cat) => (
                <li key={cat.slug}>
                  <a
                    href={cat.target}
                    onClick={(e) => handleWorkstyleLink(e, cat.slug)}
                    className="text-[#4A4A4A] hover:text-[#A65D79] hover:underline transition-colors"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Store Info & Policies */}
          <div className="space-y-3">
            <p className="font-display font-bold text-sm text-[#333333]">
              運営方針・関連ページ
            </p>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <a
                  href="/compare"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateCompare) onNavigateCompare();
                    else onChangeTab('compare');
                  }}
                  className="text-[#4A4A4A] hover:text-[#A65D79] hover:underline"
                >
                  他業種・他エリアとの徹底比較
                </a>
              </li>
              <li>
                <a
                  href="/interview"
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeTab('interview');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#4A4A4A] hover:text-[#A65D79] hover:underline"
                >
                  採用担当者・女性スタッフ対談
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#4A4A4A] hover:text-[#A65D79] hover:underline font-medium"
                >
                  運営者情報・店舗概要
                </a>
              </li>
              <li>
                <a
                  href="/policy"
                  onClick={(e) => {
                    e.preventDefault();
                    onChangeTab('policy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#4A4A4A] hover:text-[#A65D79] hover:underline font-medium"
                >
                  求人情報掲載ポリシー・個人情報保護
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Dedicated Footer Hub Directory: 信太山新地求人 総合ガイド（12テーマ一覧リンク） */}
        <div className="bg-white rounded-2xl border border-[#E9DFD4] p-5 sm:p-6 mb-8">
          <div className="mb-3">
            <p className="font-display font-bold text-sm sm:text-base text-[#333333]">
              信太山新地求人 総合ガイド（テーマ一覧リンク）
            </p>
            <p className="text-xs text-[#666666] mt-0.5">
              仕事内容・お給料・待遇・未経験者向け情報・採用条件・働き方・お店選びなど、全12テーマの詳細ページをご覧いただけます。
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
            {comprehensiveGuideLinks.map((topic) => (
              <a
                key={topic.id}
                href={topic.path}
                onClick={(e) => {
                  e.preventDefault();
                  if (topic.id === 'faq') {
                    onChangeTab('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (topic.id === 'blog') {
                    onChangeTab('blog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (onNavigateTopic) {
                    onNavigateTopic(topic.id);
                  }
                }}
                className="px-3 py-2 rounded-xl bg-[#FFF6F8] hover:bg-[#A65D79] text-[#333333] hover:text-white border border-[#EFE2E7] font-bold transition-colors text-center truncate"
              >
                {topic.name}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#E9DFD4] flex flex-col sm:flex-row justify-between items-center gap-3 text-center">
          <p className="font-sans text-xs text-[#666666]">
            © 信太山ガールズ All Rights Reserved. 信太山新地 お店直接公式女性求人サイト
          </p>
          {showAdminLink && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-xs text-[#666666] hover:text-[#A65D79] transition-colors cursor-pointer flex items-center gap-1"
              id="footer-admin-btn"
            >
              <LucideIcon name="Lock" size={12} />
              <span>管理者画面</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
