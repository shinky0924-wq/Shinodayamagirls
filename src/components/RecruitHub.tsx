/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface RecruitHubProps {
  onScrollToSection: (sectionId: string) => void;
  onNavigateToArticle?: (slug: string) => void;
  onNavigateToBlog?: (category?: string) => void;
  onNavigateCompare?: (categorySlug?: string) => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateFaq?: () => void;
}

export interface HubTopicItem {
  id: string;
  path: string;
  number: string;
  tag: string;
  title: string;
  shortTitle: string;
  description: string;
  points: string[];
  buttonText: string;
  image: string;
  icon: string;
  featuredArticles?: {
    slug: string;
    title: string;
    tag: string;
  }[];
}

export default function RecruitHub({
  onScrollToSection,
  onNavigateToArticle,
  onNavigateToBlog,
  onNavigateCompare,
  onNavigateTopic,
  onNavigateFaq,
}: RecruitHubProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const handleCategorySelect = (e: CustomEvent<string>) => {
      if (e.detail) {
        setActiveCategory(e.detail);
      }
    };
    window.addEventListener('select-hub-category' as any, handleCategorySelect);
    return () => window.removeEventListener('select-hub-category' as any, handleCategorySelect);
  }, []);

  // 12 Themes strictly configured per the Renewal Specifications
  const topicItems: HubTopicItem[] = [
    {
      id: "job",
      path: "/job",
      number: "01",
      tag: "お仕事内容",
      title: "どんなお仕事をするの？",
      shortTitle: "仕事内容",
      description: "仕事内容や接客の流れ、勤務前に知っておきたい基本情報を分かりやすく解説。初めての方にもイメージしやすいように紹介します。",
      points: [
        "仕事内容と基本的な流れ",
        "コース時間と勤務内容",
        "事前に確認したい注意点"
      ],
      buttonText: "仕事内容を詳しく見る →",
      image: "/images/ryokan_working_woman_1792485020272.webp",
      icon: "HeartHandshake",
      featuredArticles: [
        { slug: "shinodayama-job-guide", title: "信太山新地のお仕事内容と1回の接客の流れ", tag: "お仕事ガイド" },
        { slug: "shinodayama-non-alcoholic", title: "お酒不要・短時間接客で稼げる理由", tag: "ノンアル" }
      ]
    },
    {
      id: "salary",
      path: "/salary",
      number: "02",
      tag: "収入・待遇",
      title: "お給料・待遇を詳しく解説",
      shortTitle: "給料・待遇",
      description: "給与システム・保証制度・日払い条件・各種控除など、応募前に確認しておきたいお金に関する情報を解説します。",
      points: [
        "給与システムと計算方法",
        "保証制度と支払い条件",
        "控除や交通費などの確認事項"
      ],
      buttonText: "給料・待遇を詳しく見る →",
      image: "/images/col_salary_yen_1792463652387.webp",
      icon: "Coins",
      featuredArticles: [
        { slug: "shinodayama-salary-system", title: "給与システムと高収入の仕組み", tag: "給料明細" },
        { slug: "shinodayama-dormitory-relocation", title: "個室寮完備・全国交通費支給の待遇詳細", tag: "福利厚生" }
      ]
    },
    {
      id: "beginner",
      path: "/beginner",
      number: "03",
      tag: "初めての方へ",
      title: "未経験から始める方へ",
      shortTitle: "未経験",
      description: "初めてのお仕事探しで不安な方へ。応募前に知っておきたいことや、面接・体験までの流れを丁寧に紹介します。",
      points: [
        "未経験者向けの案内",
        "応募前に確認したいこと",
        "不安や疑問の相談方法"
      ],
      buttonText: "未経験向けガイドを見る →",
      image: "/images/hub_beginner_cast_1792485407920.webp",
      icon: "Sparkles",
      featuredArticles: [
        { slug: "shinodayama-beginner-guide", title: "未経験の女性が知っておくべきこと", tag: "初心者向け" },
        { slug: "shinodayama-age-and-looks", title: "年齢層と未経験歓迎の理由", tag: "採用基準" }
      ]
    },
    {
      id: "experienced",
      path: "/experienced",
      number: "04",
      tag: "経験者向け",
      title: "経験を活かして働きたい方へ",
      shortTitle: "経験者",
      description: "経験者が新しいお店を検討する際に確認したい給与条件・集客・待遇・勤務環境などを解説します。",
      points: [
        "待遇や給与条件の比較",
        "集客力と勤務環境",
        "移籍前の確認事項"
      ],
      buttonText: "経験者向け情報を見る →",
      image: "/images/hub_experienced_cast_1792485405837.webp",
      icon: "Award",
      featuredArticles: [
        { slug: "shinodayama-vs-other-night-jobs", title: "他エリア・他業種との徹底比較", tag: "比較解説" },
        { slug: "shinodayama-high-income-secrets", title: "日給10万円以上を無理なく達成する秘訣", tag: "高収入" }
      ]
    },
    {
      id: "requirements",
      path: "/requirements",
      number: "05",
      tag: "応募条件",
      title: "応募資格・採用条件について",
      shortTitle: "募集要項",
      description: "応募できる方の条件や必要書類、採用までに確認しておきたい事項を分かりやすくまとめています。",
      points: [
        "応募資格と年齢条件",
        "必要書類と確認事項",
        "採用基準と注意点"
      ],
      buttonText: "募集要項を詳しく見る →",
      image: "/images/col_official_documents_1792465890547.webp",
      icon: "ClipboardList",
      featuredArticles: [
        { slug: "shinodayama-safe-recruitment", title: "採用基準と安心の安全管理ルール", tag: "採用基準" },
        { slug: "shinodayama-interview-documents", title: "面接に必要な書類と当日体入の流れ", tag: "手ぶら面接" }
      ]
    },
    {
      id: "flow",
      path: "/flow",
      number: "06",
      tag: "応募から体験まで",
      title: "応募から体験までの流れ",
      shortTitle: "面接・体験入店",
      description: "問い合わせから面接、条件説明、体験までの流れを紹介。各段階で確認しておきたいことも解説します。",
      points: [
        "問い合わせと面接の流れ",
        "条件説明と意思確認",
        "体験時の確認事項"
      ],
      buttonText: "面接・体験の流れを見る →",
      image: "/images/col_trial_orient_jp_1792475594501.webp",
      icon: "Calendar",
      featuredArticles: [
        { slug: "shinodayama-interview-guide", title: "面接から体験入店までの詳しい手順", tag: "応募手順" },
        { slug: "shinodayama-trial-guide", title: "体験入店当日の持ち物と心構え", tag: "体入ガイド" }
      ]
    },
    {
      id: "workstyle",
      path: "/workstyle",
      number: "07",
      tag: "自由な働き方",
      title: "自分に合った働き方を考える",
      shortTitle: "働き方",
      description: "出勤日数・勤務時間・休日など、生活スタイルに合わせた働き方を考えるための情報を紹介します。",
      points: [
        "出勤日数と勤務時間",
        "休日やシフトの相談",
        "働き方を決める際の注意点"
      ],
      buttonText: "働き方を詳しく見る →",
      image: "/images/col_double_work_jp_1792475554864.webp",
      icon: "Clock",
      featuredArticles: [
        { slug: "shinodayama-double-work-lifestyle", title: "主婦・OLのWワーク掛け持ち成功術", tag: "Wワーク" },
        { slug: "shinodayama-monthly-20-holiday", title: "「毎月20日」の一斉定休日と健康管理", tag: "定休日" }
      ]
    },
    {
      id: "shops",
      path: "/shops",
      number: "08",
      tag: "重要ポイント",
      title: "後悔しないお店選びのポイント",
      shortTitle: "お店選び",
      description: "給与条件だけでなく、集客力・勤務環境・待遇・半年ルールなど、お店を比較するときに確認したいポイントを解説します。",
      points: [
        "集客力とお店の特徴",
        "半年ルールの仕組みと確認事項",
        "契約や勤務条件の比較"
      ],
      buttonText: "お店選びのポイントを見る →",
      image: "/images/col_secure_ryotei_1792475628730.webp",
      icon: "Store",
      featuredArticles: [
        { slug: "shinodayama-ryokan-guide", title: "信太山新地のお店選び・集客力と半年ルールの真実", tag: "お店選び" },
        { slug: "shinodayama-nakai-job-guide", title: "仲居業務の仕事内容と求人詳細", tag: "仲居求人" }
      ]
    },
    {
      id: "dorm",
      path: "/dorm",
      number: "09",
      tag: "住環境・遠方勤務",
      title: "寮・出稼ぎについて",
      shortTitle: "寮・出稼ぎ",
      description: "寮の設備・費用・利用条件・遠方からの勤務など、住環境や移動に関する情報を紹介します。",
      points: [
        "寮の設備と利用条件",
        "費用や生活環境",
        "交通費や移動に関する確認事項"
      ],
      buttonText: "寮・出稼ぎ情報を見る →",
      image: "/images/dorm_main_studio_1794374510330.webp",
      icon: "Home",
      featuredArticles: [
        { slug: "shinodayama-housing-support", title: "個室寮の設備・セキュリティと入居手順", tag: "個室寮" },
        { slug: "shinodayama-out-of-town-support", title: "全国からの短期出稼ぎ・交通費支給ルール", tag: "出稼ぎ" }
      ]
    },
    {
      id: "safety",
      path: "/safety",
      number: "10",
      tag: "プライバシー対策",
      title: "プライバシーと安全への取り組み",
      shortTitle: "身バレ・安全",
      description: "顔出し・個人情報・待機環境など、プライバシーを守るために確認したいことや安全面への取り組みを紹介します。",
      points: [
        "顔出しや写真掲載の確認",
        "個人情報の取り扱い",
        "待機環境と安全対策"
      ],
      buttonText: "身バレ・安全対策を見る →",
      image: "/images/col_privacy_safe_1792463653857.webp",
      icon: "EyeOff",
      featuredArticles: [
        { slug: "shinodayama-privacy-guide", title: "誰にも知られずに働くための身バレ防止策", tag: "身バレ対策" },
        { slug: "shinodayama-safety-rules", title: "安全管理基準と飲酒者拒否ルール", tag: "安全対策" }
      ]
    },
    {
      id: "faq",
      path: "/faq",
      number: "11",
      tag: "FAQ・疑問解消",
      title: "応募前によくある質問",
      shortTitle: "よくある質問",
      description: "応募資格・給与・保証・面接・体験・働き方など、問い合わせ前に知っておきたい疑問に回答します。",
      points: [
        "応募前の疑問",
        "給与や待遇に関する質問",
        "面接・体験について"
      ],
      buttonText: "よくある質問を見る →",
      image: "/images/shinodayama_advisor_sakura_1792225964799.webp",
      icon: "HelpCircle",
      featuredArticles: [
        { slug: "shinodayama-safe-recruitment", title: "安全管理とよくある質問総まとめ", tag: "よくある質問" },
        { slug: "shinodayama-faq-guide", title: "信太山新地求人のFAQ解説", tag: "Q&A" }
      ]
    },
    {
      id: "blog",
      path: "/blog",
      number: "12",
      tag: "基礎知識・最新情報",
      title: "信太山のお仕事情報・基礎知識",
      shortTitle: "お仕事コラム",
      description: "信太山新地でのお仕事探しに役立つ情報や、給与・待遇・お店選びなどの知識をテーマ別に紹介します。",
      points: [
        "信太山の求人に関する基礎知識",
        "給与や待遇の仕組み",
        "お店選びに役立つ情報"
      ],
      buttonText: "お仕事コラムを見る →",
      image: "/images/col_ryokan_manner_1792465891118.webp",
      icon: "BookOpen",
      featuredArticles: [
        { slug: "shinodayama-job-guide", title: "信太山新地求人の総合解説ガイド", tag: "人気コラム" },
        { slug: "shinodayama-salary-system", title: "給与システムと高収入の秘密", tag: "給与解説" }
      ]
    }
  ];

  const handleCardClick = (item: HubTopicItem) => {
    if (item.id === 'faq') {
      if (onNavigateFaq) onNavigateFaq();
      else onScrollToSection('faq');
    } else if (item.id === 'blog') {
      if (onNavigateToBlog) onNavigateToBlog();
      else onScrollToSection('jobs');
    } else {
      if (onNavigateTopic) {
        onNavigateTopic(item.id);
      } else {
        onScrollToSection('jobs');
      }
    }
  };

  const displayedItems = activeCategory === 'all'
    ? topicItems
    : topicItems.filter(c => c.id === activeCategory);

  return (
    <section className="py-14 md:py-24 bg-[#FFFCFC] relative" id="recruit-hub">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 2: ページ最上部の構成 */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          {/* 小さなラベル */}
          <div className="inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#E5004F] uppercase mb-2">
            SHINODAYAMA GIRLS GUIDE
          </div>
          
          {/* 大きな見出し */}
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#29252A] leading-tight mb-2 tracking-tight">
            信太山新地求人 <span className="text-[#E5004F]">総合ガイド</span>
          </h2>

          {/* メインコピー */}
          <div className="font-display font-bold text-lg sm:text-xl md:text-2xl text-[#29252A] mb-4">
            知りたいことから、安心のお仕事探し。
          </div>
          
          {/* 説明文 */}
          <p className="font-sans text-xs sm:text-sm text-[#777777] leading-relaxed max-w-2xl mx-auto">
            仕事内容・お給料・待遇・未経験者向け情報・採用条件・働き方・お店選びなど、求人に関する疑問を全12テーマに分けて詳しく解説しています。初めての方も経験者の方も、気になる情報からご覧ください。
          </p>
        </div>

        {/* テーマ絞り込みセレクター */}
        <div className="mb-8" id="category-selector">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-[#29252A] flex items-center gap-1.5">
              <LucideIcon name="Search" size={13} className="text-[#E5004F]" />
              <span>テーマを選択して絞り込み</span>
            </span>
            {activeCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="text-xs font-bold text-[#E5004F] hover:text-[#c90044] cursor-pointer flex items-center gap-1"
              >
                <span>全12テーマを表示に戻す</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#E5004F] text-white shadow-xs'
                  : 'bg-white text-[#777777] hover:bg-[#FFF3F6] hover:text-[#E5004F] border border-gray-200'
              }`}
            >
              <span>すべて (全12テーマ)</span>
            </button>

            {topicItems.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#E5004F] text-white shadow-xs'
                    : 'bg-white text-[#777777] hover:bg-[#FFF3F6] hover:text-[#E5004F] border border-gray-200'
                }`}
              >
                <span>{cat.shortTitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 3 & 4: 12テーマのカード配置 (PC: 3列×4段, タブレット: 2列, スマホ: 1列) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedItems.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
              className="bg-white rounded-[16px] overflow-hidden border border-[#FFF0F4] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(229,0,79,0.08)] hover:border-[#E5004F]/30 transition-all duration-300 flex flex-col justify-between group"
              id={`hub-topic-${topic.id}`}
            >
              <div>
                {/* 1. 上部：テーマ画像 (16:9比率統一) */}
                <div
                  onClick={() => handleCardClick(topic)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(topic);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${topic.title}の詳しいページを見る`}
                  className="relative aspect-video w-full overflow-hidden bg-rose-50 cursor-pointer group/img focus:outline-hidden focus:ring-2 focus:ring-[#E5004F]"
                >
                  <img
                    src={topic.image}
                    alt={`${topic.shortTitle}の解説イメージ - ${topic.title}`}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/shinodayama_hero_banner_1792225964954.webp';
                    }}
                  />
                  {/* 黒の半透明グラデーションを下部だけ適用 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* 2. 左上：TOPIC番号ラベル */}
                  <div className="absolute top-3 left-3">
                    <span className="font-mono font-bold text-[10px] tracking-wider text-white bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      TOPIC {topic.number}
                    </span>
                  </div>

                  {/* 3. 右上：テーマを表す小さなタグ */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full shadow-xs bg-white/95 text-[#E5004F] border border-rose-100">
                      {topic.tag}
                    </span>
                  </div>

                  {/* 4. 画像下部：テーマタイトル（白文字） */}
                  <div className="absolute bottom-3 left-3.5 right-3.5">
                    <h3 className="font-display font-bold text-lg sm:text-[19px] text-white tracking-tight drop-shadow-sm leading-snug group-hover/img:text-rose-100 transition-colors">
                      {topic.title}
                    </h3>
                  </div>
                </div>

                {/* カード本文エリア */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* 5. カード本文：2〜3行の説明 */}
                    <p className="font-sans text-[14px] text-[#29252A] leading-relaxed mb-4">
                      {topic.description}
                    </p>

                    {/* 6. ポイント：重要な内容を3項目以内で薄いピンク背景に表示 */}
                    <div className="bg-[#FFF3F6] rounded-[12px] p-3.5 border border-[#FFF0F4] space-y-2 mb-4">
                      {topic.points.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2 text-[12.5px] text-[#29252A] font-medium">
                          <LucideIcon name="Check" size={13} className="text-[#E5004F] shrink-0" />
                          <span className="leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 関連記事リンク（コンパクト表示） */}
                  {topic.featuredArticles && topic.featuredArticles.length > 0 && (
                    <div className="space-y-1 mb-1">
                      {topic.featuredArticles.map((art) => (
                        <a
                          key={art.slug}
                          href={`/blog/${art.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (onNavigateToArticle) onNavigateToArticle(art.slug);
                            else onScrollToSection('jobs');
                          }}
                          className="p-1.5 px-2.5 rounded-lg border border-gray-100 hover:border-rose-200 bg-white hover:bg-[#FFF3F6]/50 transition-all cursor-pointer flex items-center justify-between group/art text-[11px]"
                        >
                          <div className="flex items-center gap-1.5 truncate mr-1">
                            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-[#FFF3F6] text-[#E5004F] shrink-0">
                              {art.tag}
                            </span>
                            <span className="text-[#777777] group-hover/art:text-[#E5004F] truncate font-medium">
                              {art.title}
                            </span>
                          </div>
                          <LucideIcon name="ChevronRight" size={12} className="text-zinc-300 group-hover/art:text-[#E5004F] shrink-0" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 7. 最下部：詳しい解説を見るボタン (角丸10〜12px、幅100%) */}
              <div className="p-5 pt-0 bg-white">
                <a
                  href={topic.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCardClick(topic);
                  }}
                  className="w-full py-2.5 px-4 rounded-[11px] font-bold text-xs sm:text-sm bg-[#E5004F] hover:bg-[#c90044] text-white transition-all flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
                >
                  <span>{topic.buttonText}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 9: ページ下部の応募導線 */}
        <div className="bg-[#FFF3F6] border border-[#E5004F]/20 rounded-[18px] p-6 sm:p-8 md:p-10 text-center max-w-3xl mx-auto shadow-xs mb-8">
          <div className="w-10 h-10 rounded-full bg-[#E5004F]/10 text-[#E5004F] flex items-center justify-center mx-auto mb-3">
            <LucideIcon name="HelpCircle" size={20} />
          </div>
          <h3 className="font-display font-black text-xl sm:text-2xl text-[#29252A] mb-2 tracking-tight">
            お仕事について、気になることはありませんか？
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#777777] leading-relaxed max-w-xl mx-auto mb-6">
            仕事内容・待遇・働き方など、分からないことはお気軽にご相談ください。<br className="hidden sm:inline" />
            応募を決める前の質問や条件確認も歓迎しています。
          </p>
          <div className="flex justify-center">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-w-[260px] px-8 py-3.5 rounded-[12px] font-extrabold text-sm sm:text-base bg-[#06C755] hover:bg-[#05b34c] text-white transition-all flex items-center justify-center gap-2.5 shadow-md shadow-[#06C755]/25 hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
              <span>LINEで相談する</span>
            </a>
          </div>
        </div>

        {/* ========================================================
            あなたに合った働き方・タイプ別ガイド ナビゲーションバナー
           ======================================================== */}
        <section 
          className="bg-[#FFFAFC] border border-[#F0DDE4] rounded-[18px] p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_-4px_rgba(216,23,93,0.06)] mb-8 overflow-hidden"
          aria-labelledby="workstyle-banner-title"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* 左側 70%: 見出し・説明・8つのタグ・CTAボタン */}
            <div className="w-full lg:w-[68%] xl:w-[70%]">
              {/* 小さな英字ラベル */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1F5] text-[#D8175D] font-black text-[10px] tracking-wider uppercase mb-2 border border-[#F0DDE4]">
                <LucideIcon name="Sparkles" size={12} />
                <span>WORK STYLE GUIDE</span>
              </div>

              {/* 日本語の小見出し */}
              <div className="text-xs sm:text-sm font-bold text-[#D8175D] mb-1.5 tracking-wide">
                あなたに合った働き方・タイプ別ガイド
              </div>

              {/* メイン見出し */}
              <h3 
                id="workstyle-banner-title"
                className="font-display font-extrabold text-xl sm:text-2xl lg:text-[26px] text-[#292329] leading-snug mb-3 tracking-tight"
              >
                あなたに合った働き方、<br className="hidden xs:inline sm:hidden" />
                <span className="text-[#D8175D]">ここから見つけませんか？</span>
              </h3>

              {/* 説明文 */}
              <p className="font-sans text-xs sm:text-sm text-[#777777] leading-relaxed mb-6 max-w-2xl">
                未経験から始めたい方、収入を重視したい方、プライバシーが気になる方、自由な働き方を希望する方まで。あなたの希望やライフスタイルに合わせたお仕事探しに役立つ情報をご紹介します。
              </p>

              {/* 8つのタグナビゲーション */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2.5 mb-7">
                {[
                  {
                    id: 'beginner',
                    label: '未経験から始めたい',
                    href: '/types/inexperienced',
                    icon: 'HeartHandshake',
                    onClick: () => {
                      try {
                        const raw = localStorage.getItem('workstyle_banner_tag_clicks');
                        const counts = raw ? JSON.parse(raw) : {};
                        counts['beginner'] = (counts['beginner'] || 0) + 1;
                        localStorage.setItem('workstyle_banner_tag_clicks', JSON.stringify(counts));
                      } catch {}
                      if (onNavigateCompare) onNavigateCompare('inexperienced');
                      else if (onNavigateTopic) onNavigateTopic('beginner');
                      else onScrollToSection('jobs');
                    }
                  },
                  {
                    id: 'salary',
                    label: '高収入を目指したい',
                    href: '/types/high-income',
                    icon: 'Wallet',
                    onClick: () => {
                      try {
                        const raw = localStorage.getItem('workstyle_banner_tag_clicks');
                        const counts = raw ? JSON.parse(raw) : {};
                        counts['salary'] = (counts['salary'] || 0) + 1;
                        localStorage.setItem('workstyle_banner_tag_clicks', JSON.stringify(counts));
                      } catch {}
                      if (onNavigateCompare) onNavigateCompare('high-income');
                      else if (onNavigateTopic) onNavigateTopic('salary');
                      else onScrollToSection('jobs');
                    }
                  },
                  {
                    id: 'weekly1',
                    label: '週1日から働きたい',
                    href: '/types/weekly-1',
                    icon: 'CalendarDays',
                    onClick: () => {
                      try {
                        const raw = localStorage.getItem('workstyle_banner_tag_clicks');
                        const counts = raw ? JSON.parse(raw) : {};
                        counts['weekly1'] = (counts['weekly1'] || 0) + 1;
                        localStorage.setItem('workstyle_banner_tag_clicks', JSON.stringify(counts));
                      } catch {}
                      if (onNavigateCompare) onNavigateCompare('weekly-1');
                      else if (onNavigateTopic) onNavigateTopic('workstyle');
                      else onScrollToSection('jobs');
                    }
                  },
                  {
                    id: 'privacy',
                    label: '顔出しなし・身バレ対策',
                    href: '/types/privacy',
                    icon: 'ShieldCheck',
                    onClick: () => {
                      try {
                        const raw = localStorage.getItem('workstyle_banner_tag_clicks');
                        const counts = raw ? JSON.parse(raw) : {};
                        counts['privacy'] = (counts['privacy'] || 0) + 1;
                        localStorage.setItem('workstyle_banner_tag_clicks', JSON.stringify(counts));
                      } catch {}
                      if (onNavigateCompare) onNavigateCompare('privacy');
                      else if (onNavigateTopic) onNavigateTopic('safety');
                      else onScrollToSection('jobs');
                    }
                  },
                  {
                    id: 'short-time',
                    label: '短時間・短期で働きたい',
                    href: '/types/short-term',
                    icon: 'Clock',
                    onClick: () => {
                      try {
                        const raw = localStorage.getItem('workstyle_banner_tag_clicks');
                        const counts = raw ? JSON.parse(raw) : {};
                        counts['short-time'] = (counts['short-time'] || 0) + 1;
                        localStorage.setItem('workstyle_banner_tag_clicks', JSON.stringify(counts));
                      } catch {}
                      if (onNavigateCompare) onNavigateCompare('short-term');
                      else if (onNavigateTopic) onNavigateTopic('workstyle');
                      else onScrollToSection('jobs');
                    }
                  },
                  {
                    id: 'staff-consult',
                    label: '女性スタッフに相談したい',
                    href: '/types/female-staff',
                    icon: 'MessagesSquare',
                    onClick: () => {
                      try {
                        const raw = localStorage.getItem('workstyle_banner_tag_clicks');
                        const counts = raw ? JSON.parse(raw) : {};
                        counts['staff-consult'] = (counts['staff-consult'] || 0) + 1;
                        localStorage.setItem('workstyle_banner_tag_clicks', JSON.stringify(counts));
                      } catch {}
                      if (onNavigateCompare) onNavigateCompare('female-staff');
                      else onScrollToSection('recruiter-interview');
                    }
                  },
                  {
                    id: 'dorm',
                    label: '出稼ぎ・寮付き希望',
                    href: '/types/dormitory',
                    icon: 'House',
                    onClick: () => {
                      try {
                        const raw = localStorage.getItem('workstyle_banner_tag_clicks');
                        const counts = raw ? JSON.parse(raw) : {};
                        counts['dorm'] = (counts['dorm'] || 0) + 1;
                        localStorage.setItem('workstyle_banner_tag_clicks', JSON.stringify(counts));
                      } catch {}
                      if (onNavigateCompare) onNavigateCompare('dormitory');
                      else if (onNavigateTopic) onNavigateTopic('dorm');
                      else onScrollToSection('jobs');
                    }
                  },
                  {
                    id: 'first-inquiry',
                    label: 'まずは話を聞きたい',
                    href: '/types/consultation',
                    icon: 'MessageCircle',
                    onClick: () => {
                      try {
                        const raw = localStorage.getItem('workstyle_banner_tag_clicks');
                        const counts = raw ? JSON.parse(raw) : {};
                        counts['first-inquiry'] = (counts['first-inquiry'] || 0) + 1;
                        localStorage.setItem('workstyle_banner_tag_clicks', JSON.stringify(counts));
                      } catch {}
                      if (onNavigateCompare) onNavigateCompare('consultation');
                      else onScrollToSection('consultation');
                    }
                  }
                ].map((tag) => (
                  <a
                    key={tag.id}
                    href={tag.href}
                    onClick={(e) => {
                      e.preventDefault();
                      tag.onClick();
                    }}
                    className="h-[42px] sm:h-[44px] px-2.5 sm:px-3.5 rounded-[12px] bg-[#FFF1F5] hover:bg-[#ffe3eb] active:scale-[0.98] border border-[#F0DDE4] hover:border-[#D8175D]/40 text-[#D8175D] font-bold text-[11px] sm:text-xs md:text-[13px] flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-2xs group"
                    id={`workstyle-tag-${tag.id}`}
                    title={tag.label}
                  >
                    <LucideIcon 
                      name={tag.icon} 
                      size={15} 
                      className="text-[#D8175D] shrink-0 group-hover:scale-110 transition-transform" 
                    />
                    <span className="truncate">{tag.label}</span>
                  </a>
                ))}
              </div>

              {/* CTAボタン & 補足文 */}
              <div className="flex flex-col items-center sm:items-start max-w-md">
                <a
                  href="/types"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateCompare) onNavigateCompare();
                    else onScrollToSection('compare');
                  }}
                  className="w-full sm:w-auto sm:min-w-[300px] h-[52px] sm:h-[54px] px-8 rounded-[12px] font-extrabold text-sm sm:text-base bg-[#D8175D] hover:bg-[#b5124c] text-white transition-all flex items-center justify-center gap-2 shadow-md shadow-[#D8175D]/20 hover:shadow-lg cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                  id="recruit-hub-compare-btn"
                >
                  <span>自分に合った働き方を探す →</span>
                </a>
                <p className="text-xs text-[#777777] text-center sm:text-left mt-2.5 w-full">
                  気になる条件から、あなたに合った情報をご覧いただけます。
                </p>
              </div>
            </div>

            {/* 右側 30%: 成人女性の上品なイメージ画像（PCのみ表示、スマホでは省略） */}
            <div className="hidden lg:flex lg:w-[32%] xl:w-[30%] shrink-0 flex-col items-center justify-center pl-2">
              <div className="relative w-full max-w-[280px] rounded-[16px] overflow-hidden border border-[#F0DDE4] shadow-sm bg-white p-2.5">
                <div className="relative rounded-[12px] overflow-hidden aspect-[4/5] bg-[#FFF1F5]">
                  <img
                    src="/images/col_search_phone_jp_1792475574840.webp"
                    alt="自分に合った働き方を探す女性"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                    width={280}
                    height={350}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-xs px-3 py-2 rounded-[10px] text-center shadow-xs border border-rose-100">
                    <span className="text-[11px] font-bold text-[#D8175D] block">
                      女性スタッフが丁寧に対応
                    </span>
                    <span className="text-[9.5px] text-[#777777] block mt-0.5">
                      質問・相談だけでも大歓迎です
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
