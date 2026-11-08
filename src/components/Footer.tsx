/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MouseEvent, useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { getStoredSiteContent, getEffectiveLastUpdated } from '../siteContent';

interface FooterProps {
  currentTab: string;
  onChangeTab: (tab: 'recruit' | 'blog' | 'admin' | 'about' | 'compare' | 'faq' | 'cluster') => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onNavigateCompare?: (categorySlug?: string) => void;
  onNavigateTopic?: (topicId: string) => void;
  isAdminMode?: boolean;
}

export default function Footer({ currentTab, onChangeTab, onScrollToSection, onOpenAdmin, onNavigateCompare, onNavigateTopic, isAdminMode }: FooterProps) {
  const [showAdminLink, setShowAdminLink] = useState(false);
  const [activeModal, setActiveModal] = useState<'policy' | 'company' | null>(null);
  const siteContent = getStoredSiteContent();
  const lastUpdated = getEffectiveLastUpdated(siteContent.lastUpdated);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('creator') === 'shinodayama' || params.get('creator') === 'tobita' || params.get('admin') === 'true') {
        localStorage.setItem('show_admin_portal', 'true');
        setShowAdminLink(true);
      } else if (localStorage.getItem('show_admin_portal') === 'true') {
        setShowAdminLink(true);
      }
    } catch (e) {
      console.warn('localStorage or window.location not accessible', e);
    }
  }, []);

  const navLinks = [
    { name: 'タイプ別の働き方ガイド', action: 'compare', target: '/compare' },
    { name: '求人総合ガイド', action: 'section', target: '#hub' },
    { name: 'お仕事コラム一覧', action: 'blog' },
    { name: '運営者情報・グループ店舗概要', action: 'about', target: '/about' },
    { name: '選ばれる理由', action: 'section', target: '#reasons' },
    { name: 'よくある質問 FAQ（100選）', action: 'faq', target: '/faq' },
    { name: '女性の声・体験談', action: 'section', target: '#voice' },
    { name: '給料（報酬・日払い）', action: 'topic', target: 'salary' },
    { name: '待遇（寮・交通費・環境）', action: 'topic', target: 'benefits' },
    { name: '応募・面接の流れ', action: 'section', target: '#flow' },
  ];

  const targetCategoryLinks = [
    { name: '未経験向け求人（約9割が初心者）', slug: 'inexperienced' },
    { name: '高収入求人（日給10万〜・時給1万保証）', slug: 'high-income' },
    { name: '週1日・マイペース求人', slug: 'weekly-1' },
    { name: '短期・出稼ぎ求人（往復交通費支給）', slug: 'short-term' },
    { name: '個室寮付き（即日住み込み・格安）', slug: 'dormitory' },
    { name: 'Wワーク・副業向け（顔見せなし・身バレ防止）', slug: 'double-work' },
    { name: '20代向け求人（学生・フリーター）', slug: 'age-20s' },
    { name: '30代〜40代積極採用求人', slug: 'age-30s' },
  ];

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();

    if (link.action === 'compare') {
      onChangeTab('compare');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'blog') {
      onChangeTab('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'about') {
      onChangeTab('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'faq') {
      onChangeTab('faq');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.action === 'topic' && link.target) {
      if (onNavigateTopic) {
        onNavigateTopic(link.target);
      }
    } else if (link.action === 'section' && link.target) {
      const sectionId = link.target.startsWith('#') ? link.target.substring(1) : link.target;
      onScrollToSection(sectionId);
    }
  };

  const handleCategoryLinkClick = (e: MouseEvent<HTMLAnchorElement>, slug?: string) => {
    e.preventDefault();
    if (onNavigateCompare) {
      onNavigateCompare(slug);
    } else {
      if (typeof window !== 'undefined') {
        const targetUrl = slug ? `/compare/${slug}` : '/compare';
        window.history.pushState({}, '', targetUrl);
      }
      onChangeTab('compare');
    }
  };

  return (
    <footer className="bg-surface-container-low border-t border-rose-100/40 pt-16 pb-8" id="app-footer">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Logo & Operational Info */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider">
                信太山新地 旅館直営求人・公式採用窓口
              </div>
              <div className="font-display font-extrabold text-xl text-secondary flex items-center gap-2.5 pb-2">
                <img
                  src="/images/shinodayama_logo.svg"
                  alt="Shinodayama Girls Logo"
                  className="w-7 h-7 rounded-full object-cover border border-rose-200 shadow-xs bg-white"
                  width={28}
                  height={28}
                  decoding="async"
                />
                <span>信太山ガールズ</span>
              </div>
            </div>
            <p className="font-sans text-xs text-on-surface-variant leading-loose">
              受付時間：24時間年中無休<br />
              活動拠点：大阪府和泉市（信太山新地 旅館直営）<br />
              採用窓口：旅館現場スタッフ・女性専任サポート常駐
            </p>
            <div className="flex items-center gap-2 text-[11px] text-gray-500 font-mono bg-white p-2.5 rounded-xl border border-rose-100/60 inline-flex">
              <LucideIcon name="CalendarCheck" size={13} className="text-secondary" />
              <span>サイト最終更新日：{lastUpdated}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h5 className="font-display font-bold text-on-surface text-sm uppercase tracking-wider flex items-center gap-1.5">
              <LucideIcon name="Layers" size={15} className="text-secondary" />
              <span>サイト内リンク</span>
            </h5>
            <ul className="space-y-2 font-sans text-xs md:text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.target || '#'}
                    onClick={(e) => handleLinkClick(e, link)}
                    className="text-on-surface-variant hover:text-secondary hover:underline transition-all block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: タイプ別の働き方ガイド */}
          <div className="space-y-4">
            <h5 className="font-display font-bold text-on-surface text-sm uppercase tracking-wider">
              <a
                href="/compare"
                onClick={(e) => handleCategoryLinkClick(e)}
                className="hover:text-secondary flex items-center gap-1.5 transition-colors group cursor-pointer"
                title="タイプ別の働き方ガイドへ"
              >
                <LucideIcon name="Target" size={15} className="text-secondary" />
                <span className="group-hover:underline">タイプ別の働き方</span>
                <LucideIcon name="ChevronRight" size={13} className="text-zinc-400 group-hover:text-secondary transition-transform group-hover:translate-x-0.5" />
              </a>
            </h5>
            <ul className="space-y-2 font-sans text-xs md:text-sm">
              {targetCategoryLinks.map((cat) => (
                <li key={cat.slug}>
                  <a 
                    href={`/compare/${cat.slug}`}
                    onClick={(e) => handleCategoryLinkClick(e, cat.slug)}
                    className="text-on-surface-variant hover:text-secondary hover:underline transition-all block"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: E-E-A-T & Editorial / Compliance Info */}
          <div className="space-y-4">
            <h5 className="font-display font-bold text-on-surface text-sm uppercase tracking-wider flex items-center gap-1.5">
              <LucideIcon name="ShieldCheck" size={15} className="text-secondary" />
              <span>求人掲載基準・運営方針</span>
            </h5>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              当サイト「信太山ガールズ」は、外部の紹介所や仲介業者ではなく、信太山新地の老舗旅館が直接運営する公式求人窓口です。店先での顔見せがなく、完全個室待機でプライバシー保護を徹底。信太山新地の当店では15分単位の高単価設定、即日全額手渡し日払い、家具家電付き個室寮完備、毎月20日の一斉定休日など、女性が安心して高収入を稼げる環境を整えております。ぜひ信太山新地の当店へご応募ください。
            </p>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  onChangeTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-secondary font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <LucideIcon name="ShieldCheck" size={13} />
                <span>運営者情報・店舗体制</span>
              </a>
              <button
                onClick={() => setActiveModal('policy')}
                className="text-left text-secondary font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <LucideIcon name="FileCheck" size={13} />
                <span>求人情報掲載ポリシーと安全規約（要約）</span>
              </button>
            </div>
          </div>

        </div>

        {/* Topic Cluster Spoke Directory (SEO & LLMO Core Reciprocal Linking) */}
        <div className="py-6 border-t border-rose-100/60 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <LucideIcon name="Compass" size={15} className="text-secondary" />
            <h5 className="font-display font-bold text-on-surface text-xs uppercase tracking-wider">
              信太山新地求人 テーマ別お役立ちガイド（全13テーマ）
            </h5>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
            {[
              { id: 'job', name: '🍵 お仕事内容・待機', path: '/job' },
              { id: 'salary', name: '💰 給料（報酬・日払い）', path: '/salary' },
              { id: 'benefits', name: '🌸 待遇（寮・環境）', path: '/benefits' },
              { id: 'beginner', name: '🔰 未経験スタート', path: '/beginner' },
              { id: 'experienced', name: '👑 経験者・移籍', path: '/experienced' },
              { id: 'requirements', name: '📋 採用基準・書類', path: '/requirements' },
              { id: 'flow', name: '🌸 面接・体入の流れ', path: '/flow' },
              { id: 'workstyle', name: '⏰ 自由な働き方', path: '/workstyle' },
              { id: 'shops', name: '🏮 お店選び・半年ルール', path: '/shops' },
              { id: 'dorm', name: '🏠 個室寮・出稼ぎ', path: '/dorm' },
              { id: 'safety', name: '🤫 身バレ・顔見せなし', path: '/safety' },
              { id: 'faq', name: '💡 よくある質問 (100選)', path: '/faq' },
              { id: 'blog', name: '📚 お仕事コラム', path: '/blog' },
            ].map((topic) => (
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
                  } else {
                    onChangeTab('recruit');
                    onScrollToSection('recruit-hub');
                  }
                }}
                className="p-2 rounded-xl bg-white hover:bg-rose-50 border border-gray-200/70 hover:border-rose-300 text-zinc-700 hover:text-rose-700 font-medium transition-colors block text-center truncate"
              >
                {topic.name}
              </a>
            ))}
          </div>
        </div>


        {/* Lower copyright & Admin link */}
        <div className="pt-8 border-t border-rose-100/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="font-sans text-xs text-on-surface-variant opacity-60">
            © Shinodayama Girls All Rights Reserved. 信太山新地求人なら信太山ガールズ
          </p>
          <button 
            onClick={onOpenAdmin}
            className="text-xs text-on-surface-variant opacity-50 hover:opacity-100 hover:text-secondary transition-all cursor-pointer flex items-center gap-1 font-mono"
            id="footer-admin-btn"
          >
            <LucideIcon name="Lock" size={12} />
            管理者画面（コラム追加・管理）
          </button>
        </div>

      </div>

      {/* Policy Modal */}
      {activeModal === 'policy' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-rose-100">
            <div className="flex items-center justify-between pb-4 border-b border-rose-100 mb-4">
              <h4 className="font-display font-bold text-base text-gray-900 flex items-center gap-2">
                <LucideIcon name="FileCheck" className="text-secondary" size={18} />
                求人情報掲載ポリシーと安全規約
              </h4>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <LucideIcon name="X" size={18} />
              </button>
            </div>
            <div className="text-xs text-gray-700 space-y-3 leading-relaxed font-sans">
              <p><strong>1. 法令遵守と健全性の徹底（20歳以上完全限定）</strong><br />信太山新地の規約およびコンプライアンス管理に基づき、20歳未満の就労を固く禁じております。顔写真付き身分証原本（免許証・パスポート等）による厳正な本人確認・年齢確認・日本国籍確認を行い、違法行為・反社会的勢力との関わりを一切排除しています。</p>
              <p><strong>2. 虚偽・誇大広告の禁止と正確な情報の明示</strong><br />当サイトの掲載情報は、旅館の現場スタッフへの直接ヒアリングと実際の募集条件をもとに作成しています。15分単位の明確な給料体系（15分3,800円、30分7,600円、45分11,400円、60分15,200円、時給1万円保証・日給保証）と実態に即した正確な情報を掲載し、条件変更時は随時更新を行っています。</p>
              <p><strong>3. ノルマ・天引きの禁止</strong><br />指名ノルマ・罰金・雑費引き・講習などの天引きを行う店舗の掲載は一切認めておりません。</p>
            </div>
          </div>
        </div>
      )}

      {/* Company / Privacy Modal */}
      {activeModal === 'company' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-rose-100">
            <div className="flex items-center justify-between pb-4 border-b border-rose-100 mb-4">
              <h4 className="font-display font-bold text-base text-gray-900 flex items-center gap-2">
                <LucideIcon name="ShieldCheck" className="text-secondary" size={18} />
                運営者情報・プライバシー保護体制
              </h4>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <LucideIcon name="X" size={18} />
              </button>
            </div>
            <div className="text-xs text-gray-700 space-y-3 leading-relaxed font-sans">
              <p><strong>運営組織：</strong>信太山新地 旅館 店舗採用・女性サポートチーム（直営公式窓口）</p>
              <p><strong>店舗所在地：</strong>大阪府和泉市（信太山新地 旅館街）</p>
              <p><strong>求人責任者：</strong>女性サポート統括担当 あおい / 採用マネージャー 松本</p>
              <p><strong>個人情報保護：</strong>ご相談・ご応募時のLINE情報や個人情報は、店舗見学・面接連絡にのみ厳重に使用し、第三者への開示・販売は一切行いません。</p>
              <p><strong>身バレ防止対策：</strong>店先での顔見せは一切なく、個室や専用スタンド待機です。Webサイト・SNS等への写真掲載も行いません。</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

