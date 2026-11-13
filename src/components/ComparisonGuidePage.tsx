/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { 
  MAIN_6_TARGETS,
  MAIN_11_COMPARISON_ITEMS,
  COURSE_REWARD_SCHEDULE,
  IndustryComparisonTarget,
  MainComparisonItem
} from '../compareData';
import { LINE_OFFICIAL_URL, CONSULTANT_AVATAR_URL } from '../data';
import { updatePageSeo } from '../seo';

interface ComparisonGuidePageProps {
  onNavigateHome: () => void;
  onNavigateWorkstyleGuide?: (categorySlug?: string) => void;
  onCtaclick: () => void;
  onInjectedScroll?: (message: string) => void;
}

const COMPARISON_FAQS = [
  {
    q: '飛田新地との一番大きな違いは何ですか？',
    a: '最も大きな違いは「店先での顔見せ（顔出し）が一切ないこと」です。飛田新地では通りに面した玄関先（上がり框）に座って通行人にお顔を見せるスタイルですが、信太山新地は完全な個室待機です。通りから顔を見られることが一切ないため、知り合いや通行人にバレる心配がありません。'
  },
  {
    q: 'スカウト業者や仲介サイトから応募するのと何が違いますか？',
    a: '信太山ガールズは旅館直営の公式採用窓口です。スカウト業者や外部の仲介者を挟まないため、毎月の給料から紹介料（10〜30%）が天引きされることは絶対にありません。100%全額があなたの手取りになり、時給1万円保証や日給保証、寮費補助、交通費全額支給などの待遇がすべてそのまま適用されます。'
  },
  {
    q: 'メンズエステやキャバクラ、ソープランドと比べて稼ぎやすさはどうですか？',
    a: '信太山新地は15分単位（15分3,800円〜）の短時間コース設定のため、1回あたりの身体的負担が非常に少なく、効率よく回転してお給料を積み上げられます。また信太山新地独自の「時給10,000円保証」や「日給保証（8万〜10万円）」があるため、閑散期でも待機損がありません。キャバクラのような売上ノルマ・営業連絡やお酒の強要も一切不要です。'
  },
  {
    q: 'ネットやSNSに写真が載ることはありますか？',
    a: '一切ありません。メンズエステやソープランドのようにパネル写真・顔写真・写メ日記などをネット上に掲載することは100%ありません。完全源氏名でお仕事ができるため、プライバシーが厳重に守られます。'
  },
  {
    q: 'お酒を飲む必要はありますか？',
    a: 'お酒は一切不要です。信太山新地のおもてなしはお茶やジュースなどのソフトドリンクのみで行います。二日酔いや体調不良の心配がなく、翌日の昼職や家事、学校への影響もありません。'
  }
];

export default function ComparisonGuidePage({
  onNavigateHome,
  onNavigateWorkstyleGuide,
  onCtaclick,
  onInjectedScroll
}: ComparisonGuidePageProps) {
  const [activeMobileTargetId, setActiveMobileTargetId] = useState<string>('shinodayama');
  const [mobileDisplayMode, setMobileDisplayMode] = useState<'card' | 'table'>('card');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    updatePageSeo({
      title: '信太山新地・他業種 徹底比較｜飛田新地・メンエス・キャバクラとの違い',
      description: '信太山新地と飛田新地・メンズエステ・キャバクラ・ソープランド、スカウト経由との違いを11項目で比較。仕事内容、接客スタイル、給料の仕組み、勤務時間、身バレ対策まで詳しく解説します。',
      canonicalUrl: 'https://osaka-shinodayamashinchi-recruit.com/compare',
      ogType: 'website'
    });
  }, []);

  const handleConsult = (topicTitle: string) => {
    const msg = `【徹底比較についてのご相談】\n${topicTitle}について確認したいです。他業種との違い、信太山新地の待遇について教えてください。`;
    if (onInjectedScroll) {
      onInjectedScroll(msg);
    } else {
      onCtaclick();
    }
  };

  const selectedMobileTarget = MAIN_6_TARGETS.find(t => t.id === activeMobileTargetId) || MAIN_6_TARGETS[0];

  return (
    <div className="bg-surface text-on-surface min-h-screen pt-4 sm:pt-6 pb-20 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-zinc-500 font-sans">
          <ol className="flex items-center flex-wrap gap-2">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="hover:text-secondary transition-colors underline cursor-pointer"
              >
                トップ（求人総合）
              </a>
              <span className="ml-2">/</span>
            </li>
            <li className="text-zinc-800 font-bold">
              信太山新地 徹底比較ガイド
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-[#E5004F] text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-4 shadow-2xs">
            <LucideIcon name="Scale" size={16} />
            <span>2026年最新版｜公式徹底比較ガイド</span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4">
            信太山新地 徹底比較ガイド<br />
            <span className="text-[#E5004F]">飛田新地・メンズエステ・キャバクラ・ソープランド・スカウト経由との違い</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-6">
            「仕事内容や接客スタイルの違いは？」「時給制・歩合制・コース制で給料はどう違う？」「未経験からの始めやすさや身バレ対策は？」
            曖昧な表現を排し、具体的な5つの業種と、応募・紹介方法であるスカウト経由の特徴を全11項目で徹底比較します。
          </p>

          {/* Key Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
            <span className="bg-white border border-rose-200 text-zinc-700 px-3.5 py-1.5 rounded-full font-bold shadow-2xs flex items-center gap-1.5">
              <LucideIcon name="ShieldCheck" size={14} className="text-[#E5004F]" />
              旅館直営・店先顔見せなし
            </span>
            <span className="bg-white border border-rose-200 text-zinc-700 px-3.5 py-1.5 rounded-full font-bold shadow-2xs flex items-center gap-1.5">
              <LucideIcon name="Coins" size={14} className="text-[#E5004F]" />
              15分規定バック＆即日日払い
            </span>
            <span className="bg-white border border-rose-200 text-zinc-700 px-3.5 py-1.5 rounded-full font-bold shadow-2xs flex items-center gap-1.5">
              <LucideIcon name="EyeOff" size={14} className="text-[#E5004F]" />
              ネット写真掲載完全ゼロ
            </span>
            <span className="bg-white border border-rose-200 text-zinc-700 px-3.5 py-1.5 rounded-full font-bold shadow-2xs flex items-center gap-1.5">
              <LucideIcon name="Ban" size={14} className="text-[#E5004F]" />
              お酒・営業連絡一切不要
            </span>
          </div>
        </header>

        {/* Quick Link to Workstyle Guide */}
        {onNavigateWorkstyleGuide && (
          <div className="mb-10 bg-gradient-to-r from-rose-50 via-pink-50/60 to-white rounded-3xl p-5 sm:p-6 border-2 border-rose-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#E5004F] text-white flex items-center justify-center shrink-0 shadow-sm">
                <LucideIcon name="Sparkles" size={22} />
              </div>
              <div>
                <span className="text-[11px] font-black text-[#E5004F] uppercase tracking-wider block">
                  WORKSTYLE GUIDE
                </span>
                <h3 className="font-bold text-sm sm:text-base text-zinc-900">
                  あなたに最適な働き方を見つけたい方はこちら
                </h3>
                <p className="text-xs text-zinc-600">
                  未経験・高収入・週1日・個室寮・Wワーク・20代・30代40代など、8つの働き方タイプを詳しく解説。
                </p>
              </div>
            </div>
            <a
              href="/types"
              onClick={(e) => {
                e.preventDefault();
                onNavigateWorkstyleGuide();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-white hover:bg-rose-50 text-[#E5004F] border border-[#E5004F]/30 shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>タイプ別働き方ガイドを見る</span>
              <LucideIcon name="ChevronRight" size={15} />
            </a>
          </div>
        )}

        {/* SECTION 1: 徹底比較メインセクション（6種類×11項目） */}
        <section className="mb-16 md:mb-20 scroll-mt-24" id="main-comparison-section">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <div className="text-xs font-extrabold text-[#E5004F] tracking-wider mb-1 flex items-center gap-1.5">
                <LucideIcon name="Layers" size={15} />
                <span>6 TYPES & 11 CRITERIA COMPARISON</span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-zinc-900">
                徹底比較｜信太山新地と他業種・応募形態の違い
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                ※5つの具体業種と、応募方法であるスカウト経由の全11項目を公平に比較
              </p>
            </div>

            {/* View Mode Switcher (スマホ対応・カード表示/横並び表の切り替え) */}
            <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-2xl border border-zinc-200 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setMobileDisplayMode('card')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  mobileDisplayMode === 'card'
                    ? 'bg-white text-zinc-900 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <LucideIcon name="CreditCard" size={13} />
                <span>業種別カード</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileDisplayMode('table')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  mobileDisplayMode === 'table'
                    ? 'bg-white text-zinc-900 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <LucideIcon name="Table" size={13} />
                <span>横並び比較表</span>
              </button>
            </div>
          </div>

          {/* Condition Variability Notice */}
          <div className="flex items-start gap-2.5 text-xs text-zinc-600 bg-zinc-50/80 p-3.5 sm:p-4 rounded-2xl border border-zinc-200/80 mb-6">
            <LucideIcon name="Info" size={16} className="text-[#E5004F] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-zinc-800 font-bold block mb-0.5">【ご確認事項】</strong>
              本比較表は一般的な業界基準・各業種の標準的システムに基づいて作成しています。店舗や地域、運営方針によって実際の条件や待遇は異なります。
              また<strong className="text-amber-800 font-bold">「スカウト・紹介経由」は業種ではなく店舗への応募・紹介方法</strong>であり、他の5種類とは性質が異なります。
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              VIEW 1: PC & TABLET WIDE TABLE (横並び比較表)
              ※ mobileDisplayMode === 'table' または PC大画面で最適表示
             ───────────────────────────────────────────────────────────── */}
          <div className={`${mobileDisplayMode === 'card' ? 'hidden md:block' : 'block'} mb-6`}>
            <div className="bg-white rounded-3xl border border-rose-100 shadow-md overflow-hidden">
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full text-left border-collapse min-w-[1240px]">
                  <caption className="sr-only">
                    信太山新地、飛田新地、メンズエステ、キャバクラ、ソープランド、スカウト・紹介経由の11項目徹底比較表
                  </caption>
                  <thead>
                    <tr className="border-b border-rose-100">
                      {/* Sticky Left: 比較項目 */}
                      <th scope="col" className="p-4 bg-zinc-50 font-bold text-xs sm:text-sm text-zinc-700 w-[14%] min-w-[130px] sticky left-0 z-20 border-r border-rose-100/80 shadow-xs">
                        <div className="flex items-center gap-1.5 text-zinc-800">
                          <LucideIcon name="CheckSquare" size={15} className="text-[#E5004F]" />
                          <span>比較項目</span>
                        </div>
                      </th>

                      {/* 1. 信太山新地 (上品なピンクで強調) */}
                      <th scope="col" className="p-4 bg-gradient-to-b from-rose-500 to-[#E5004F] text-white font-black text-xs sm:text-sm w-[18%] min-w-[210px] shadow-sm border-r border-rose-600/40">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                            <LucideIcon name="Landmark" size={16} className="text-white" />
                          </div>
                          <div>
                            <span className="text-[10px] text-rose-100 font-semibold block leading-tight">老舗料亭街・旅館直営</span>
                            <span className="text-sm font-black tracking-wide">信太山新地</span>
                          </div>
                        </div>
                        <span className="inline-block text-[10px] bg-white text-[#E5004F] font-black px-2 py-0.5 rounded-full">
                          完全個室・顔出しなし
                        </span>
                      </th>

                      {/* 2. 飛田新地 (白・薄グレー) */}
                      <th scope="col" className="p-4 bg-zinc-100 text-zinc-800 font-bold text-xs sm:text-sm w-[17%] min-w-[190px] border-r border-zinc-200">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-700">
                            <LucideIcon name="Store" size={16} />
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-500 font-medium block leading-tight">大阪花街・料亭新地</span>
                            <span className="text-sm font-bold">飛田新地</span>
                          </div>
                        </div>
                        <span className="inline-block text-[10px] bg-zinc-200 text-zinc-700 font-bold px-2 py-0.5 rounded-full">
                          店頭座り・短時間
                        </span>
                      </th>

                      {/* 3. メンズエステ (白・薄グレー) */}
                      <th scope="col" className="p-4 bg-zinc-50 text-zinc-800 font-bold text-xs sm:text-sm w-[17%] min-w-[190px] border-r border-zinc-200">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-700">
                            <LucideIcon name="Sparkles" size={16} />
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-500 font-medium block leading-tight">個室アロマリフレ</span>
                            <span className="text-sm font-bold">メンズエステ</span>
                          </div>
                        </div>
                        <span className="inline-block text-[10px] bg-zinc-200 text-zinc-700 font-bold px-2 py-0.5 rounded-full">
                          オイル施術・リフレ
                        </span>
                      </th>

                      {/* 4. キャバクラ (白・薄グレー) */}
                      <th scope="col" className="p-4 bg-zinc-100 text-zinc-800 font-bold text-xs sm:text-sm w-[17%] min-w-[190px] border-r border-zinc-200">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-700">
                            <LucideIcon name="Wine" size={16} />
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-500 font-medium block leading-tight">社交接待飲食業</span>
                            <span className="text-sm font-bold">キャバクラ</span>
                          </div>
                        </div>
                        <span className="inline-block text-[10px] bg-zinc-200 text-zinc-700 font-bold px-2 py-0.5 rounded-full">
                          社交飲食・お酒提供
                        </span>
                      </th>

                      {/* 5. ソープランド (白・薄グレー) */}
                      <th scope="col" className="p-4 bg-zinc-50 text-zinc-800 font-bold text-xs sm:text-sm w-[17%] min-w-[190px] border-r border-zinc-200">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-700">
                            <LucideIcon name="Bath" size={16} />
                          </div>
                          <div>
                            <span className="text-[10px] text-zinc-500 font-medium block leading-tight">個室入浴（1号営業）</span>
                            <span className="text-sm font-bold">ソープランド</span>
                          </div>
                        </div>
                        <span className="inline-block text-[10px] bg-zinc-200 text-zinc-700 font-bold px-2 py-0.5 rounded-full">
                          個室浴室・高額歩合
                        </span>
                      </th>

                      {/* 6. スカウト・紹介経由 (※業種ではなく応募・紹介方法として別枠表示) */}
                      <th scope="col" className="p-4 bg-amber-50 text-amber-950 font-bold text-xs sm:text-sm w-[17%] min-w-[190px] border-l-2 border-amber-300">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 rounded-lg bg-amber-200/70 text-amber-900 flex items-center justify-center shrink-0">
                            <LucideIcon name="Share2" size={16} />
                          </div>
                          <div>
                            <span className="text-[10px] text-amber-800 font-black block leading-tight">※応募・紹介方法</span>
                            <span className="text-sm font-bold">スカウト・紹介経由</span>
                          </div>
                        </div>
                        <span className="inline-block text-[10px] bg-amber-200 text-amber-900 font-black px-2 py-0.5 rounded-full">
                          別枠：仲介ルート
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-rose-50 text-xs sm:text-sm">
                    {MAIN_11_COMPARISON_ITEMS.map((item, idx) => (
                      <tr 
                        key={item.id} 
                        className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/20' : 'bg-zinc-50/30 hover:bg-rose-50/20'}
                      >
                        {/* 比較項目名 (Sticky Left) */}
                        <th scope="row" className="p-4 font-bold text-zinc-900 bg-inherit sticky left-0 z-10 border-r border-rose-100/80 min-w-[130px] text-left">
                          <div className="flex items-center gap-1.5 mb-1">
                            <LucideIcon name={item.icon} size={15} className="text-[#E5004F] shrink-0" />
                            <span className="font-extrabold text-xs sm:text-sm">{item.name}</span>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-normal block leading-tight">
                            {item.summary}
                          </span>
                        </th>

                        {/* 1. 信太山新地 (上品なピンクセル) */}
                        <td className="p-4 bg-rose-50/60 border-r border-rose-200/80 font-normal text-zinc-800 min-w-[210px] align-top">
                          {item.values.shinodayama.point && (
                            <div className="inline-block text-[11px] font-black bg-rose-100 text-[#E5004F] border border-rose-200 px-2 py-0.5 rounded-md mb-1.5">
                              ✔ {item.values.shinodayama.point}
                            </div>
                          )}
                          <p className="leading-relaxed text-xs sm:text-sm font-medium text-zinc-800">
                            {item.values.shinodayama.text}
                          </p>
                        </td>

                        {/* 2. 飛田新地 */}
                        <td className="p-4 text-zinc-700 border-r border-zinc-200 min-w-[190px] align-top">
                          {item.values.tobita.point && (
                            <div className="inline-block text-[11px] font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-md mb-1.5">
                              ・{item.values.tobita.point}
                            </div>
                          )}
                          <p className="leading-relaxed text-xs sm:text-sm">
                            {item.values.tobita.text}
                          </p>
                        </td>

                        {/* 3. メンズエステ */}
                        <td className="p-4 text-zinc-700 border-r border-zinc-200 min-w-[190px] align-top">
                          {item.values.mensEsthe.point && (
                            <div className="inline-block text-[11px] font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-md mb-1.5">
                              ・{item.values.mensEsthe.point}
                            </div>
                          )}
                          <p className="leading-relaxed text-xs sm:text-sm">
                            {item.values.mensEsthe.text}
                          </p>
                        </td>

                        {/* 4. キャバクラ */}
                        <td className="p-4 text-zinc-700 border-r border-zinc-200 min-w-[190px] align-top">
                          {item.values.cabaret.point && (
                            <div className="inline-block text-[11px] font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-md mb-1.5">
                              ・{item.values.cabaret.point}
                            </div>
                          )}
                          <p className="leading-relaxed text-xs sm:text-sm">
                            {item.values.cabaret.text}
                          </p>
                        </td>

                        {/* 5. ソープランド */}
                        <td className="p-4 text-zinc-700 border-r border-zinc-200 min-w-[190px] align-top">
                          {item.values.soap.point && (
                            <div className="inline-block text-[11px] font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-md mb-1.5">
                              ・{item.values.soap.point}
                            </div>
                          )}
                          <p className="leading-relaxed text-xs sm:text-sm">
                            {item.values.soap.text}
                          </p>
                        </td>

                        {/* 6. スカウト・紹介経由 (別枠・注意喚起セル) */}
                        <td className="p-4 bg-amber-50/30 text-zinc-700 border-l-2 border-amber-300 min-w-[190px] align-top">
                          {item.values.scout.point && (
                            <div className="inline-block text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md mb-1.5">
                              ▲ {item.values.scout.point}
                            </div>
                          )}
                          <p className="leading-relaxed text-xs sm:text-sm text-zinc-700">
                            {item.values.scout.text}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Warning Footnote Callout in Table */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-50 to-amber-50/50 border-t border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <span className="text-zinc-600">
                  ※表は左右にスクロールして全6種類をご確認いただけます。
                </span>
                <span className="text-[#E5004F] font-bold">
                  信太山新地は【旅館直営の直接公式採用】のため仲介マージンや紹介手数料は完全0円です。
                </span>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              VIEW 2: SMARTPHONE-OPTIMIZED CARDS (業種別比較カード)
              ※ スマホで読みやすい縦並び比較カードUI
             ───────────────────────────────────────────────────────────── */}
          <div className={`${mobileDisplayMode === 'table' ? 'hidden' : 'block md:hidden'} mb-8`}>
            {/* Target Selector Horizontal Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-thin">
              {MAIN_6_TARGETS.map((t) => {
                const isSelected = t.id === activeMobileTargetId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveMobileTargetId(t.id)}
                    className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isSelected
                        ? t.highlight
                          ? 'bg-[#E5004F] text-white border-[#E5004F] shadow-xs'
                          : t.isRecruitmentMethod
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                            : 'bg-zinc-800 text-white border-zinc-800 shadow-xs'
                        : t.highlight
                          ? 'bg-rose-50 text-[#E5004F] border-rose-200'
                          : t.isRecruitmentMethod
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-white text-zinc-700 border-zinc-200'
                    }`}
                  >
                    <LucideIcon name={t.icon} size={14} />
                    <span>{t.name}</span>
                    {t.isRecruitmentMethod && (
                      <span className="text-[9px] opacity-80">※応募方法</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Target Card */}
            <div className={`rounded-3xl p-5 sm:p-6 shadow-sm border ${
              selectedMobileTarget.highlight
                ? 'bg-gradient-to-b from-rose-50/90 via-white to-rose-50/30 border-2 border-rose-300'
                : selectedMobileTarget.isRecruitmentMethod
                  ? 'bg-gradient-to-b from-amber-50/80 via-white to-amber-50/20 border-2 border-amber-300'
                  : 'bg-white border-zinc-200'
            }`}>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-4 pb-4 border-b border-zinc-200/80">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                    selectedMobileTarget.highlight
                      ? 'bg-[#E5004F] text-white'
                      : selectedMobileTarget.isRecruitmentMethod
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-zinc-100 text-zinc-700'
                  }`}>
                    <LucideIcon name={selectedMobileTarget.icon} size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        selectedMobileTarget.highlight
                          ? 'bg-rose-100 text-[#E5004F]'
                          : selectedMobileTarget.isRecruitmentMethod
                            ? 'bg-amber-100 text-amber-900 font-black'
                            : 'bg-zinc-100 text-zinc-600'
                      }`}>
                        {selectedMobileTarget.subName}
                      </span>
                      {selectedMobileTarget.isRecruitmentMethod && (
                        <span className="text-[10px] bg-amber-500 text-white font-black px-2 py-0.5 rounded-full">
                          ※業種ではなく応募方法
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-black text-xl text-zinc-900 mt-0.5">
                      {selectedMobileTarget.name}
                    </h3>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-xl shrink-0 ${
                  selectedMobileTarget.highlight
                    ? 'bg-[#E5004F] text-white'
                    : 'bg-zinc-100 text-zinc-700'
                }`}>
                  {selectedMobileTarget.shortBadge}
                </span>
              </div>

              {/* Card Description */}
              <p className="text-xs text-zinc-600 leading-relaxed mb-6 bg-white/70 p-3 rounded-xl border border-zinc-100">
                {selectedMobileTarget.description}
              </p>

              {/* 11 Items Listed Vertically */}
              <div className="space-y-4">
                {MAIN_11_COMPARISON_ITEMS.map((item, idx) => {
                  const val = item.values[selectedMobileTarget.id as keyof typeof item.values];
                  return (
                    <div 
                      key={item.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        selectedMobileTarget.highlight
                          ? 'bg-white/90 border-rose-100'
                          : selectedMobileTarget.isRecruitmentMethod
                            ? 'bg-white/90 border-amber-200'
                            : 'bg-zinc-50/60 border-zinc-200/70'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-black shrink-0 ${
                            selectedMobileTarget.highlight ? 'bg-rose-100 text-[#E5004F]' : 'bg-zinc-200 text-zinc-700'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="font-bold text-xs text-zinc-900 flex items-center gap-1">
                            <LucideIcon name={item.icon} size={13} className="text-zinc-500" />
                            {item.name}
                          </span>
                        </div>

                        {val.point && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            selectedMobileTarget.highlight
                              ? 'bg-rose-100 text-[#E5004F]'
                              : selectedMobileTarget.isRecruitmentMethod
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-zinc-200/80 text-zinc-700'
                          }`}>
                            {val.point}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-zinc-700 leading-relaxed pl-6">
                        {val.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Switch Helper */}
              <div className="mt-6 pt-4 border-t border-zinc-200/80 flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-medium">他の業種・方法と比較する：</span>
                <div className="flex items-center gap-1">
                  {MAIN_6_TARGETS.filter(t => t.id !== activeMobileTargetId).slice(0, 3).map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveMobileTargetId(t.id)}
                      className="text-[11px] font-bold text-[#E5004F] hover:underline px-1.5 py-0.5 rounded cursor-pointer"
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              比較表の下に追加する文章 ＆ LINE相談CTA (ユーザー指示厳守)
             ───────────────────────────────────────────────────────────── */}
          <div className="bg-gradient-to-br from-rose-50/80 via-white to-pink-50/60 rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-rose-200/90 shadow-sm text-center my-10">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-[#E5004F] flex items-center justify-center mx-auto mb-4 shadow-2xs">
              <LucideIcon name="HeartHandshake" size={24} />
            </div>

            <p className="font-sans text-sm sm:text-base md:text-lg text-zinc-800 font-bold leading-relaxed max-w-2xl mx-auto mb-3">
              働き方によって、仕事内容・お給料・勤務時間・必要な準備は異なります。大切なのは、自分の希望に合った働き方を選ぶことです。
            </p>

            <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl mx-auto mb-6">
              信太山新地での働き方や求人条件について詳しく知りたい方は、お気軽にご相談ください。
            </p>

            <div>
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xl font-extrabold text-sm sm:text-base bg-[#06C755] hover:bg-[#05b34c] text-white transition-all shadow-md shadow-[#06C755]/25 hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <LucideIcon name="MessageCircle" size={20} className="fill-white shrink-0" />
                <span>信太山新地の求人についてLINEで相談する</span>
              </a>
            </div>

            <span className="text-[11px] text-zinc-500 block mt-3">
              ※相談無料・完全匿名OK・無理な勧誘や引き止めは一切ありません
            </span>
          </div>

          {/* SECTION 2: 15分単位の標準報酬設定＆時給換算表 */}
          <div className="bg-white rounded-3xl border border-rose-200/80 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#E5004F] font-black text-xs bg-rose-100 px-3 py-1 rounded-full flex items-center gap-1">
                <LucideIcon name="Coins" size={13} />
                <span>具体的数字で見る給与体系</span>
              </span>
            </div>
            <h3 className="font-display font-black text-lg sm:text-2xl text-zinc-900 mb-2">
              信太山新地のコース時間と支給額・時給換算データ表
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mb-6 leading-relaxed">
              1コース最短15分からスタート。時給換算15,200円の高額還元率で、雑費や天引きは完全0円です。
            </p>

            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-xs sm:text-sm border-collapse min-w-[640px]">
                <caption className="sr-only">
                  信太山新地の15分単位コース料金・キャスト支給額・時給換算表
                </caption>
                <thead>
                  <tr className="bg-rose-50/70 border-b border-rose-200 text-zinc-800">
                    <th scope="col" className="py-3.5 px-4 text-left font-bold w-[18%]">コース時間</th>
                    <th scope="col" className="py-3.5 px-4 text-left font-bold w-[22%]">キャスト手取り支給額</th>
                    <th scope="col" className="py-3.5 px-4 text-left font-bold w-[22%]">時給換算相当額</th>
                    <th scope="col" className="py-3.5 px-4 text-left font-bold w-[38%]">特徴・保障制度</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {COURSE_REWARD_SCHEDULE.map((item) => (
                    <tr key={item.courseTime} className="hover:bg-rose-50/30">
                      <th scope="row" className="py-3 px-4 font-bold text-zinc-900 text-left">
                        {item.courseTime}コース
                      </th>
                      <td className="py-3 px-4 font-black text-[#E5004F] text-base">
                        {item.reward.toLocaleString()}円
                      </td>
                      <td className="py-3 px-4 font-bold text-zinc-800">
                        時給換算 約{item.hourlyEquivalent.toLocaleString()}円
                      </td>
                      <td className="py-3 px-4 text-zinc-600 text-xs">
                        {item.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-4 border-t border-rose-100">
              <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100">
                <span className="font-bold text-[#E5004F] block mb-0.5">時給10,000円保証</span>
                <span className="text-zinc-600 text-[11px]">客足に関係なく最低時給1万円を保証。待機損がありません。</span>
              </div>
              <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100">
                <span className="font-bold text-[#E5004F] block mb-0.5">日給8万〜10万円保証</span>
                <span className="text-zinc-600 text-[11px]">12時間フル待機時の日給保証制度あり。確実な手取りを確保。</span>
              </div>
              <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100">
                <span className="font-bold text-[#E5004F] block mb-0.5">天引き完全0円</span>
                <span className="text-zinc-600 text-[11px]">厚生費・衣装代・写真代などの中抜き一切なし、100%全額手渡し。</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 徹底比較の重要ポイント5選 */}
        <section className="mb-16 md:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 bg-rose-100 text-[#E5004F] text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-2xs">
              <LucideIcon name="CheckCircle2" size={14} />
              <span>5 KEY ADVANTAGES</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-zinc-900 mb-3">
              信太山新地が選ばれる5つの決定的な違い
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              他エリアや他業種（メンズエステ・キャバクラ・ソープなど）でよくある不安やデメリットを解消した、信太山新地ならではの安心体制です。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#E5004F] flex items-center justify-center font-black text-sm mb-4">
                  01
                </div>
                <h3 className="font-bold text-base text-zinc-900 mb-2">
                  店先の顔見せ（顔出し）一切なし
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  飛田新地や松島新地のような通りに座るスタイルではなく、旅館の清潔な個室で待機。通りを歩く通行人から顔を見られる心配が100%ありません。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-100/80 text-[11px] font-bold text-[#E5004F]">
                ✔ 通りからの視線ゼロ・完全個室待機
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#E5004F] flex items-center justify-center font-black text-sm mb-4">
                  02
                </div>
                <h3 className="font-bold text-base text-zinc-900 mb-2">
                  15分短時間コース＆即日全額日払い
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  デリヘルやソープのような60分〜120分の長時間接客とは異なり、15分からのお手軽接客。その日の給料は全額現金手渡しで支給されます。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-100/80 text-[11px] font-bold text-[#E5004F]">
                ✔ 体力負担が少なく・その場で全額手渡し
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#E5004F] flex items-center justify-center font-black text-sm mb-4">
                  03
                </div>
                <h3 className="font-bold text-base text-zinc-900 mb-2">
                  ネット・SNS写真掲載完全0％
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  求人サイトやSNS、パネル写真への掲載は一切なし。完全源氏名（偽名）でお仕事でき、専用駐車場や送迎もあるため身バレ対策は万全です。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-100/80 text-[11px] font-bold text-[#E5004F]">
                ✔ 写真公開ゼロ・身バレ防止徹底
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#E5004F] flex items-center justify-center font-black text-sm mb-4">
                  04
                </div>
                <h3 className="font-bold text-base text-zinc-900 mb-2">
                  天引き・厚生費・雑費完全ゼロ
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  スカウト業者や外部求人サイトでよくある仲介マージン（10〜30%天引き）や、衣装代・ヘアメイク代などの不当な引かれものは一切ありません。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-100/80 text-[11px] font-bold text-[#E5004F]">
                ✔ 旅館直営だから中間コスト0円
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#E5004F] flex items-center justify-center font-black text-sm mb-4">
                  05
                </div>
                <h3 className="font-bold text-base text-zinc-900 mb-2">
                  家具家電付き個室寮・交通費全額支給
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  近隣の賃貸マンション個室寮を完備（即日入居OK）。遠方からの短期出稼ぎの方には新幹線・飛行機などの往復交通費を全額支給します。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-100/80 text-[11px] font-bold text-[#E5004F]">
                ✔ 手ぶらで即日スタート・出稼ぎ大歓迎
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#E5004F] flex items-center justify-center font-black text-sm mb-4">
                  06
                </div>
                <h3 className="font-bold text-base text-zinc-900 mb-2">
                  お酒一切不要＆毎月20日一斉定休日
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  キャバクラやラウンジのようにお酒を飲む必要は一切なし。さらにエリア共通の「毎月20日一斉定休日」があるため、健康的に無理なく働けます。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-100/80 text-[11px] font-bold text-[#E5004F]">
                ✔ 昼職・家庭・学業とラクラク両立
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: 比較に関するよくある質問 (FAQ) */}
        <section className="mb-16 md:mb-20 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 bg-rose-100 text-[#E5004F] text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-2xs">
              <LucideIcon name="HelpCircle" size={14} />
              <span>COMPARISON FAQ</span>
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-zinc-900">
              比較に関するよくある質問
            </h2>
          </div>

          <div className="space-y-3">
            {COMPARISON_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={faq.q} 
                  className="bg-white rounded-2xl border border-rose-100 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-zinc-900 flex items-center justify-between gap-3 cursor-pointer hover:bg-rose-50/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-[#E5004F] text-xs font-black flex items-center justify-center shrink-0">
                        Q
                      </span>
                      <span>{faq.q}</span>
                    </div>
                    <LucideIcon 
                      name="ChevronDown" 
                      size={16} 
                      className={`text-[#E5004F] transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-rose-50">
                      <div className="flex items-start gap-2.5 mt-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                          A
                        </span>
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: LINE相談＆応募導線 */}
        <section className="bg-gradient-to-br from-rose-500 via-pink-600 to-[#E5004F] rounded-3xl p-6 sm:p-10 text-white text-center shadow-lg max-w-3xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mx-auto mb-4">
            <LucideIcon name="MessageCircle" size={28} className="text-white" />
          </div>
          <span className="text-xs font-black text-rose-100 uppercase tracking-widest block mb-1">
            OFFICIAL LINE SUPPORT
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white mb-3">
            他店との違いや気になること、何でもご相談ください
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 max-w-xl mx-auto mb-6 leading-relaxed">
            「他のお店と迷っている」「飛田や松島を考えていたけれど信太山が気になった」「寮の空き状況を知りたい」など、ご質問だけでも大歓迎です。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-w-[260px] px-8 py-3.5 rounded-[12px] font-extrabold text-sm sm:text-base bg-[#06C755] hover:bg-[#05b34c] text-white transition-all flex items-center justify-center gap-2.5 shadow-md shadow-[#06C755]/25 hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
              <span>LINEで無料相談する（24時間受付）</span>
            </a>
            {onNavigateWorkstyleGuide && (
              <a
                href="/types"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateWorkstyleGuide();
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-[12px] font-bold text-xs sm:text-sm bg-white/20 hover:bg-white/30 text-white transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <LucideIcon name="Layers" size={16} />
                <span>タイプ別働き方ガイドへ</span>
              </a>
            )}
          </div>
          <span className="text-[11px] text-rose-200 block mt-3 font-medium">
            ※完全匿名・秘密厳守・相談のみOK・しつこい営業一切なし
          </span>
        </section>

      </div>
    </div>
  );
}
