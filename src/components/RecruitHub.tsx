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
      image: "/images/ryokan_working_woman_1792485020272.jpg",
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
      image: "/images/col_salary_yen_1792463652387.jpg",
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
      image: "/images/hub_beginner_cast_1792485407920.jpg",
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
      image: "/images/hub_experienced_cast_1792485405837.jpg",
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
      image: "/images/col_official_documents_1792465890547.jpg",
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
      image: "/images/col_trial_orient_jp_1792475594501.jpg",
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
      image: "/images/col_double_work_jp_1792475554864.jpg",
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
      image: "/images/col_secure_ryotei_1792475628730.jpg",
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
      image: "/images/col_dorm_interior_1792463651469.jpg",
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
      image: "/images/col_privacy_safe_1792463653857.jpg",
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
      image: "/images/shinodayama_advisor_sakura_1792225964799.jpg",
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
      image: "/images/col_ryokan_manner_1792465891118.jpg",
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
                      target.src = '/images/shinodayama_hero_banner_1792225964954.jpg';
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
                        <div
                          key={art.slug}
                          onClick={() => {
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
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 7. 最下部：詳しい解説を見るボタン (角丸10〜12px、幅100%) */}
              <div className="p-5 pt-0 bg-white">
                <button
                  type="button"
                  onClick={() => handleCardClick(topic)}
                  className="w-full py-2.5 px-4 rounded-[11px] font-bold text-xs sm:text-sm bg-[#E5004F] hover:bg-[#c90044] text-white transition-all flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
                >
                  <span>{topic.buttonText}</span>
                </button>
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

        {/* 8つのタイプ別ガイドへのクイック導線バナー */}
        <div className="bg-gradient-to-r from-[#E5004F] via-pink-600 to-[#E5004F] rounded-[18px] p-6 sm:p-8 text-white shadow-md mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <button
                type="button"
                onClick={() => onNavigateCompare ? onNavigateCompare() : onScrollToSection('compare')}
                className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full mb-3 shadow-2xs cursor-pointer transition-colors"
              >
                <LucideIcon name="Target" size={13} />
                <span>あなたにぴったりの働き方・タイプ別ガイド</span>
                <LucideIcon name="ChevronRight" size={12} />
              </button>
              <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight mb-2">
                「未経験」「高収入」「週1日」「短期」「寮付き」「Wワーク」「20代」「30代・40代」から選ぶ
              </h3>
              <p className="text-xs sm:text-sm text-rose-100 leading-relaxed mb-4">
                「自分に合う働き方はどれ？」「未経験や副業でも大丈夫？」など、あなたの生活スタイルや希望条件にぴったりの働き方をご紹介しています。
              </p>
              
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: '未経験向け', slug: 'inexperienced' },
                  { label: '高収入', slug: 'high-income' },
                  { label: '週1日〜', slug: 'weekly-1' },
                  { label: '短期集中', slug: 'short-term' },
                  { label: '個室寮付き', slug: 'dormitory' },
                  { label: 'Wワーク', slug: 'double-work' },
                  { label: '20代向け', slug: 'age-20s' },
                  { label: '30代・40代向け', slug: 'age-30s' },
                ].map((tag) => (
                  <button
                    key={tag.slug}
                    type="button"
                    onClick={() => onNavigateCompare ? onNavigateCompare(tag.slug) : onScrollToSection('compare')}
                    className="text-xs bg-white/20 hover:bg-white text-white hover:text-[#E5004F] px-3 py-1 rounded-full font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    #{tag.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => onNavigateCompare ? onNavigateCompare() : onScrollToSection('compare')}
                className="w-full lg:w-auto bg-white hover:bg-rose-50 text-[#E5004F] font-black text-sm px-6 py-3.5 rounded-[12px] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                id="recruit-hub-compare-btn"
              >
                <LucideIcon name="Scale" size={16} />
                <span>タイプ別の働き方を見る</span>
                <LucideIcon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* お仕事コラム一覧へのリンク */}
        {onNavigateToBlog && (
          <div className="text-center">
            <button
              onClick={() => onNavigateToBlog()}
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-[#E5004F] hover:text-[#c90044] bg-white border border-[#E5004F]/20 px-7 py-3 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
              id="recruit-hub-all-blog-btn"
            >
              <LucideIcon name="BookOpen" size={15} className="text-[#E5004F]" />
              <span>お仕事コラム・解説記事一覧（全100本以上）を見る</span>
              <LucideIcon name="ChevronRight" size={15} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
