/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BACKUP FILE - Pre-Renewal RecruitHub Component
 * To restore this component at any time, copy this content back into RecruitHub.tsx.
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import LucideIcon from './LucideIcon';

interface RecruitHubProps {
  onScrollToSection: (sectionId: string) => void;
  onNavigateToArticle?: (slug: string) => void;
  onNavigateToBlog?: (category?: string) => void;
  onNavigateCompare?: (categorySlug?: string) => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateFaq?: () => void;
}

interface HubClusterItem {
  id: string;
  path: string;
  number: string;
  emoji: string;
  title: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  icon: string;
  image: string;
  summary: string;
  keyPoints: string[];
  featuredArticles: {
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

  // 12 Hub Nodes strictly mapping to user's Topic Cluster - all with 100% unique authentic Japanese photos
  const clusterItems: HubClusterItem[] = [
    {
      id: "job",
      path: "/job",
      number: "01",
      emoji: "🍵",
      title: "仕事内容",
      tagline: "コース15分〜60分・仲居さんマッチング・絶対ゴム着用・掃除不要",
      badge: "常連様多数",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: "HeartHandshake",
      image: "/images/ryokan_working_woman_1792485020272.jpg",
      summary: "店先顔見せなし・個室待機。仲居さんがマッチング＆内線電話でお部屋へ。基本サービス（会話・キス・生フェラ・ゴム着用挿入）。タイマー計測は仲居さんが行い内線ワンコールで終了。部屋の片付けや掃除は仲居さん担当で手伝い不要。",
      keyPoints: ["1コース15分〜60分（延長あり）", "絶対ゴム着用・嫌な要求は即中断OK", "片付け・掃除は仲居さん担当で不要"],
      featuredArticles: [
        { slug: "shinodayama-job-guide", title: "信太山新地のお仕事内容と1回の接客の流れ", tag: "お仕事ガイド" },
        { slug: "shinodayama-non-alcoholic", title: "お酒不要・短時間接客で稼げる理由", tag: "ノンアル" }
      ]
    },
    {
      id: "salary",
      path: "/salary",
      number: "02",
      emoji: "💰",
      title: "給料・待遇",
      tagline: "15分3,800円・時給1万保証・即日全額日払い＆天引きゼロ・個室寮完備",
      badge: "即日日払い・天引き0円",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      icon: "Coins",
      image: "/images/col_salary_yen_1792463652387.jpg",
      summary: "信太山新地の当店なら15分単位の明確な給料体系（15分3,800円、時給換算約15,200円）。時給1万円保証や日給8〜10万円保証完備。退勤時にその場で全額現金手渡し。さらに待機料・厚生費などの天引き完全0円、家具家電付き個室寮や往復交通費支給など手厚い待遇でお迎えします。",
      keyPoints: ["15分3,800円（時給換算約15,200円）・即日全額日払い", "時給1万保証・日給8〜10万円保証完備", "雑費・天引き完全0円＆家具家電付き個室寮・交通費全額"],
      featuredArticles: [
        { slug: "shinodayama-salary-system", title: "給与システムと高収入の仕組み", tag: "給料明細" },
        { slug: "shinodayama-dormitory-relocation", title: "個室寮完備・全国交通費支給の待遇詳細", tag: "福利厚生" }
      ]
    },
    {
      id: "beginner",
      path: "/beginner",
      number: "03",
      emoji: "🔰",
      title: "未経験",
      tagline: "在籍キャストの約90%が夜職完全初心者・20〜40代歓迎",
      badge: "初心者歓迎",
      badgeColor: "bg-pink-100 text-rose-700 border-pink-200",
      icon: "Sparkles",
      image: "/images/hub_beginner_cast_1792485407920.jpg",
      summary: "夜職経験ゼロ・主婦・学生・OL多数在籍。20代・30代はもちろん40代（45歳位まで）も積極採用。先輩スタッフが丁寧に伴走します。",
      keyPoints: ["在籍女性の約9割が未経験", "20代〜40代幅広く歓迎", "営業活動・写メ日記不要"],
      featuredArticles: [
        { slug: "shinodayama-beginner-guide", title: "未経験の女性が知っておくべきこと", tag: "初心者向け" },
        { slug: "shinodayama-age-and-looks", title: "年齢層と未経験歓迎の理由", tag: "採用基準" }
      ]
    },
    {
      id: "experienced",
      path: "/experienced",
      number: "04",
      emoji: "👑",
      title: "経験者",
      tagline: "他新地・風俗・キャバクラからの移籍人気・高水準報酬",
      badge: "移籍歓迎",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      icon: "Award",
      image: "/images/hub_experienced_cast_1792485405837.jpg",
      summary: "店先座りなし・Web写真なし・お風呂掃除なし・営業連絡なし。短時間コースで高回転、移籍初日から日給10万円超えを狙えます。",
      keyPoints: ["店先顔見せなしでストレス軽減", "営業LINE・SNS更新義務なし", "15分高単価で効率稼働"],
      featuredArticles: [
        { slug: "shinodayama-vs-other-night-jobs", title: "他エリア・他業種との徹底比較", tag: "比較解説" },
        { slug: "shinodayama-high-income-secrets", title: "日給10万円以上を無理なく達成する秘訣", tag: "高収入" }
      ]
    },
    {
      id: "requirements",
      path: "/requirements",
      number: "05",
      emoji: "📋",
      title: "募集要項",
      tagline: "20歳以上限定・詳しいお仕事条件一覧・即日体入OK",
      badge: "条件一覧",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
      icon: "ClipboardList",
      image: "/images/col_official_documents_1792465890547.jpg",
      summary: "信太山新地 老舗旅館直営の募集要項。応募資格（20歳以上の女性・未経験9割歓迎）、給与システム、勤務地（和泉市）、勤務時間（10:00〜24:00自由出勤）、必要書類（顔写真付き身分証1点のみ）など詳しい条件一覧を明示。",
      keyPoints: ["20歳以上の女性（未経験9割・20〜40代歓迎）", "履歴書不要・私服手ぶら面談＆即日体入", "顔写真付き公的身分証1点のみ（住民票不要）"],
      featuredArticles: [
        { slug: "shinodayama-safe-recruitment", title: "採用基準と安心の安全管理ルール", tag: "採用基準" },
        { slug: "shinodayama-interview-documents", title: "面接に必要な書類と当日体入の流れ", tag: "手ぶら面接" }
      ]
    },
    {
      id: "flow",
      path: "/flow",
      number: "06",
      emoji: "🌸",
      title: "面接・体験入店までの流れ",
      tagline: "履歴書不要・私服見学OK・出張面談＆即日体入対応",
      badge: "手ぶらOK",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      icon: "Calendar",
      image: "/images/col_trial_orient_jp_1792475594501.jpg",
      summary: "問い合わせから希望ヒアリング、旅館見学、面接、体験入店、全額日払い受け取りまでの流れ。合わなければ即日終了OK。",
      keyPoints: ["LINE・電話で24時間相談", "私服のまま手ぶら面接", "体験入店も通常全額日払い"],
      featuredArticles: [
        { slug: "shinodayama-interview-guide", title: "面接から体験入店までの詳しい手順", tag: "応募手順" },
        { slug: "shinodayama-trial-guide", title: "体験入店当日の持ち物と心構え", tag: "体入ガイド" }
      ]
    },
    {
      id: "workstyle",
      path: "/workstyle",
      number: "07",
      emoji: "⏰",
      title: "働き方",
      tagline: "完全自由出勤制・週1日〜・毎月20日エリア一斉定休日",
      badge: "自由出勤",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      icon: "Clock",
      image: "/images/col_double_work_jp_1792475554864.jpg",
      summary: "完全自由出勤制。週1日〜、お昼だけ、本業や育児の合間など柔軟にシフト調整可能。毎月20日の一斉定休日は確実な休養日です。",
      keyPoints: ["週1日〜・短時間・マイペースOK", "毎月20日エリア一斉定休日", "出勤ノルマ・ペナルティ一切なし"],
      featuredArticles: [
        { slug: "shinodayama-double-work-lifestyle", title: "主婦・OLのWワーク掛け持ち成功術", tag: "Wワーク" },
        { slug: "shinodayama-monthly-20-holiday", title: "「毎月20日」の一斉定休日と健康管理", tag: "定休日" }
      ]
    },
    {
      id: "shops",
      path: "/shops",
      number: "08",
      emoji: "🏮",
      title: "お店選び",
      tagline: "集客力の格差と半年ルール！最初のお店選びが最重要",
      badge: "集客力＆半年ルール",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      icon: "Store",
      image: "/images/col_secure_ryotei_1792475628730.jpg",
      summary: "信太山新地はお店によって集客力が全く異なります。さらに一度入店すると他店への移籍が半年間制限される【半年ルール】があるため、最初のお店選びは慎重にしなければいけません。エリア屈指の集客力と盤石な顧客層を誇る老舗直営の当店なら、初日から安心してしっかり稼げます。",
      keyPoints: ["店舗による集客力の大きな格差（人気店と閑古鳥店）", "他店へ移籍できない【半年ルール】があるためお店選びが最重要", "エリア屈指の集客力と常連基盤を誇る老舗直営の当店"],
      featuredArticles: [
        { slug: "shinodayama-ryokan-guide", title: "信太山新地のお店選び・集客力と半年ルールの真実", tag: "お店選び" },
        { slug: "shinodayama-nakai-job-guide", title: "仲居業務の仕事内容と求人詳細", tag: "仲居求人" }
      ]
    },
    {
      id: "dorm",
      path: "/dorm",
      number: "09",
      emoji: "🏠",
      title: "寮・出稼ぎ",
      tagline: "家具家電付きマンション個室寮・全国往復交通費支給",
      badge: "個室寮完備",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
      icon: "Home",
      image: "/images/col_dorm_interior_1792463651469.jpg",
      summary: "家電・生活用品完備の個室マンション寮（出稼ぎ1日0〜2,000円と低額）。新幹線・飛行機等の往復交通費全額支給。初日の駅送迎あり。",
      keyPoints: ["完全個室（エアコン・Wi-Fi完備）", "新幹線・飛行機往復交通費支給", "初日の駅送迎・挨拶サポート"],
      featuredArticles: [
        { slug: "shinodayama-housing-support", title: "個室寮の設備・セキュリティと入居手順", tag: "個室寮" },
        { slug: "shinodayama-out-of-town-support", title: "全国からの短期出稼ぎ・交通費支給ルール", tag: "出稼ぎ" }
      ]
    },
    {
      id: "safety",
      path: "/safety",
      number: "10",
      emoji: "🤫",
      title: "身バレ・安全",
      tagline: "店先顔見せなし・旅館個室待機・泥酔客入店拒否",
      badge: "秘密厳守",
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
      icon: "EyeOff",
      image: "/images/col_privacy_safe_1792463653857.jpg",
      summary: "店先での顔見せが一切なく、個室や専用スタンド待機。Web写真掲載ゼロ、完全源氏名。全室シャワー完備・ゴム着用徹底・泥酔客拒否。",
      keyPoints: ["店先顔見せなし・個室待機", "全室シャワー・ゴム着用徹底", "住民税の普通徴収で会社バレ防止"],
      featuredArticles: [
        { slug: "shinodayama-privacy-guide", title: "誰にも知られずに働くための身バレ防止策", tag: "身バレ対策" },
        { slug: "shinodayama-safety-rules", title: "安全管理基準と飲酒者拒否ルール", tag: "安全対策" }
      ]
    },
    {
      id: "faq",
      path: "/faq",
      number: "11",
      emoji: "💡",
      title: "よくある質問 FAQ",
      tagline: "信太山新地の疑問を網羅・100選Q&A",
      badge: "100選",
      badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
      icon: "HelpCircle",
      image: "/images/shinodayama_advisor_sakura_1792225964799.jpg",
      summary: "顔見せなし、給料、保証、20日定休日、出稼ぎ、託児所、仲居求人など、応募前の疑問に現場スタッフが忖度なしの本音で回答。",
      keyPoints: ["信太山新地特有の疑問を網羅", "カテゴリ別で検索可能", "現場スタッフによる本音回答"],
      featuredArticles: [
        { slug: "shinodayama-safe-recruitment", title: "安全管理とよくある質問総まとめ", tag: "よくある質問" },
        { slug: "shinodayama-faq-guide", title: "信太山新地求人のFAQ解説", tag: "Q&A" }
      ]
    },
    {
      id: "blog",
      path: "/blog",
      number: "12",
      emoji: "📚",
      title: "お仕事コラム",
      tagline: "信太山新地の就労環境・給与・制度の解説記事",
      badge: "解説多数",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      icon: "BookOpen",
      image: "/images/shinodayama_hero_banner_1792225964954.jpg",
      summary: "信太山新地求人に関するリアルな給料実績、待機システム、15分コースの稼ぎ方、出稼ぎ体験談など専門記事をテーマ別に網羅。",
      keyPoints: ["信太山新地専門の解説記事", "現役キャスト・スタッフの実務知恵", "カテゴリ・キーワードで検索可能"],
      featuredArticles: [
        { slug: "shinodayama-job-guide", title: "信太山新地求人の総合解説ガイド", tag: "人気コラム" },
        { slug: "shinodayama-salary-system", title: "給与システムと高収入の秘密", tag: "給与解説" }
      ]
    }
  ];

  const handleCardClick = (item: HubClusterItem) => {
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
    ? clusterItems
    : clusterItems.filter(c => c.id === activeCategory);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white via-rose-50/20 to-white relative" id="recruit-hub">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hub Header with Topic Cluster Authority Badge */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 text-xs font-black px-4 py-1.5 rounded-full mb-3.5 shadow-2xs border border-rose-200/80">
            <LucideIcon name="Compass" size={14} className="text-rose-600" />
            <span>信太山新地求人　総合ガイド（全12テーマ）</span>
          </div>
          
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4 tracking-tight">
            自分が知りたい情報から、合ったテーマを探せる<br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700">
              信太山新地求人 公式・分野別ガイド
            </span>
          </h2>
          
          <div className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl mx-auto space-y-3">
            <p>
              仕事内容・給料や待遇・未経験者向け情報・経験者向け情報・採用基準・面接の流れ・働き方・お店選び（集客力・半年ルール）・寮・身バレ対策など、求人に関する疑問や不安を12の専門テーマに分けて詳しく解説しています。
            </p>
            <p>
              初めてお仕事を探す方も、経験を活かして新しいお店を探している方も、知りたいテーマから必要な情報をご覧いただけます。
            </p>
            <p className="text-zinc-500">
              各ガイドカードから、詳しい解説・条件・確認しておきたいポイントをご確認ください。
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-8" id="category-selector">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
              <LucideIcon name="Search" size={13} className="text-rose-500" />
              <span>テーマを選択して絞り込み</span>
            </span>
            {activeCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer flex items-center gap-1"
              >
                <span>全12テーマを表示に戻す</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'all'
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/20'
                  : 'bg-white text-zinc-700 hover:bg-rose-50 hover:text-rose-600 border border-gray-200'
              }`}
            >
              <span>すべて (全12テーマ)</span>
            </button>

            {clusterItems.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/20'
                    : 'bg-white text-zinc-700 hover:bg-rose-50 hover:text-rose-600 border border-gray-200'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 12 Category Hub Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12">
          {displayedItems.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
              className="bg-white rounded-3xl overflow-hidden border border-rose-100/90 shadow-sm hover:shadow-xl hover:border-rose-300 transition-all duration-300 flex flex-col justify-between group"
              id={`hub-cluster-${cat.id}`}
            >
              <div>
                {/* Image Banner (Clickable to Topic Page) */}
                <div
                  onClick={() => handleCardClick(cat)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(cat);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${cat.title}の詳しいページを見る`}
                  className="relative h-44 overflow-hidden bg-rose-50 cursor-pointer group/img focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/shinodayama_hero_banner_1792225964954.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover/img:from-black/90 group-hover/img:via-black/45 transition-colors duration-300" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="font-mono font-black text-[10px] bg-white/95 text-rose-700 px-2 py-0.5 rounded-md shadow-xs border border-rose-200">
                      TOPIC {cat.number}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs border flex items-center gap-1 ${cat.badgeColor} bg-white/95`}>
                      <span>{cat.emoji}</span>
                      <span>{cat.badge}</span>
                    </span>
                  </div>

                  {/* Click Affordance Badge on Hover */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
                    <span className="inline-flex items-center gap-1 text-[11px] font-black bg-rose-600 text-white px-2.5 py-1 rounded-full shadow-md">
                      <span>詳しく見る</span>
                      <LucideIcon name="ArrowRight" size={12} />
                    </span>
                  </div>

                  {/* Title & Click Guide */}
                  <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-end justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-display font-black text-lg sm:text-xl text-white tracking-tight drop-shadow-sm flex items-center gap-1.5 group-hover/img:text-rose-200 transition-colors">
                        <span>{cat.emoji}</span>
                        <span>{cat.title}</span>
                      </h3>
                      <p className="text-[11px] text-zinc-100 font-medium line-clamp-1 drop-shadow-xs">
                        {cat.tagline}
                      </p>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold text-white/90 bg-white/20 backdrop-blur-xs px-2 py-1 rounded-lg group-hover/img:bg-rose-600 group-hover/img:text-white transition-all flex items-center gap-1">
                      <span>タップして開く</span>
                      <LucideIcon name="ChevronRight" size={11} />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-sans text-xs text-zinc-600 leading-relaxed mb-3.5">
                      {cat.summary}
                    </p>

                    {/* Key points */}
                    <div className="bg-rose-50/40 rounded-xl p-2.5 border border-rose-100/60 mb-3.5 space-y-1">
                      {cat.keyPoints.map((pt, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-700 font-medium">
                          <LucideIcon name="Check" size={12} className="text-rose-500 shrink-0" />
                          <span className="leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured articles */}
                  <div className="space-y-1">
                    {cat.featuredArticles.map((art) => (
                      <div
                        key={art.slug}
                        onClick={() => {
                          if (onNavigateToArticle) onNavigateToArticle(art.slug);
                          else onScrollToSection('jobs');
                        }}
                        className="p-1.5 px-2 rounded-lg border border-gray-100 hover:border-rose-200 bg-white hover:bg-rose-50/50 transition-all cursor-pointer flex items-center justify-between group/art text-[11px]"
                      >
                        <div className="flex items-center gap-1.5 truncate mr-1">
                          <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-rose-100/80 text-rose-700 shrink-0">
                            {art.tag}
                          </span>
                          <span className="text-zinc-700 group-hover/art:text-rose-600 truncate font-medium">
                            {art.title}
                          </span>
                        </div>
                        <LucideIcon name="ChevronRight" size={12} className="text-zinc-300 group-hover/art:text-rose-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-4 pt-0 bg-white border-t border-gray-50 mt-1">
                <button
                  type="button"
                  onClick={() => handleCardClick(cat)}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-md"
                >
                  <LucideIcon name={cat.icon} size={14} />
                  <span>「{cat.title}」の詳しい解説を見る</span>
                  <LucideIcon name="ArrowRight" size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Link Banner: 8-Category Comparison Feature */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <button
                type="button"
                onClick={() => onNavigateCompare ? onNavigateCompare() : onScrollToSection('compare')}
                className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white text-[11px] font-black px-3 py-1 rounded-full mb-3 shadow-2xs cursor-pointer transition-colors"
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
                    className="text-xs bg-white/20 hover:bg-white text-white hover:text-rose-700 px-3 py-1 rounded-full font-bold transition-all cursor-pointer shadow-2xs"
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
                className="w-full lg:w-auto bg-white hover:bg-rose-50 text-rose-700 font-black text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                id="recruit-hub-compare-btn"
              >
                <LucideIcon name="Scale" size={16} />
                <span>タイプ別の働き方を見る</span>
                <LucideIcon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* View All Blog Link */}
        {onNavigateToBlog && (
          <div className="text-center">
            <button
              onClick={() => onNavigateToBlog()}
              className="inline-flex items-center gap-2 text-xs md:text-sm font-extrabold text-rose-700 hover:text-rose-800 bg-white border border-rose-200 px-7 py-3 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
              id="recruit-hub-all-blog-btn"
            >
              <LucideIcon name="BookOpen" size={15} className="text-rose-600" />
              <span>お仕事コラム・解説記事一覧（全100本以上）を見る</span>
              <LucideIcon name="ChevronRight" size={15} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
