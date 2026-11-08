/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { 
  SITE_COMPARISON_ROWS, 
  AREA_COMPARISON_ROWS,
  COURSE_REWARD_SCHEDULE,
  ComparisonRow,
  AreaComparisonRow 
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
    q: '飛田新地や松島新地との一番大きな違いは何ですか？',
    a: '最も大きな違いは「店先での顔見せ（顔出し）が一切ないこと」です。飛田新地や松島新地では通りに面した玄関先（上がり框）に座って通行人にお顔を見せるスタイルですが、信太山新地は完全な個室待機です。通りから顔を見られることが一切ないため、知り合いや通行人にバレる心配がありません。'
  },
  {
    q: 'スカウト業者や仲介サイトから応募するのと何が違いますか？',
    a: '信太山ガールズは旅館直営の公式採用窓口です。スカウト業者や外部の仲介者を挟まないため、毎月の給料から紹介料（10〜30%）が天引きされることは絶対にありません。100%全額があなたの手取りになり、時給1万円保証や日給保証、寮費補助、交通費全額支給などの待遇がすべてそのまま適用されます。'
  },
  {
    q: '一般のデリヘルやソープランドと比べて稼ぎやすさはどうですか？',
    a: '信太山新地は15分単位（15分3,800円〜）の短時間コース設定のため、1回あたりの身体的負担が非常に少なく、効率よく回転してお給料を積み上げられます。また信太山新地独自の「時給10,000円保証」や「日給保証（8万〜10万円）」があるため、閑散期でも待機損がありません。'
  },
  {
    q: 'ネットやSNSに写真が載ることはありますか？',
    a: '一切ありません。一般的な風俗店のようにパネル写真・顔写真・写メ日記などをネット上に掲載することは100%ありません。完全源氏名でお仕事ができるため、プライバシーが厳重に守られます。'
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
  const [activeComparisonTab, setActiveComparisonTab] = useState<'area' | 'channel'>('area');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    updatePageSeo({
      title: '信太山新地 徹底比較ガイド｜飛田・松島・一般風俗・スカウトとの違いを完全比較',
      description: '【2026最新比較】信太山新地と飛田新地・松島新地、一般風俗、スカウト業者との違いを一覧表で徹底比較。店先顔見せなし・完全個室待機・15分短時間コース・天引き完全0円・時給1万円保証・即日全額日払いの安心環境を公開。',
      canonicalUrl: 'https://osaka-shinodayamashinchi-recruit.com/compare',
      ogType: 'website'
    });
  }, []);

  const renderGradeBadge = (grade: ComparisonRow['ourShop']['grade']) => {
    switch (grade) {
      case 'excellent':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full">
            <span className="text-sm">◎</span> 最適・優良
          </span>
        );
      case 'good':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-800 text-xs font-bold px-2 py-0.5 rounded-full">
            <span className="text-sm">◯</span> 良好
          </span>
        );
      case 'average':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
            <span className="text-sm">△</span> 普通・注意
          </span>
        );
      case 'poor':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded-full">
            <span className="text-sm">✕</span> 不可・危険
          </span>
        );
      default:
        return null;
    }
  };

  const handleConsult = (topicTitle: string) => {
    const msg = `【徹底比較についてのご相談】\n${topicTitle}について確認したいです。他エリアや一般風俗との違い、信太山新地の待遇について教えてください。`;
    if (onInjectedScroll) {
      onInjectedScroll(msg);
    } else {
      onCtaclick();
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-zinc-500 font-sans">
          <ol className="flex items-center flex-wrap gap-2">
            <li>
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-secondary transition-colors underline cursor-pointer"
              >
                トップ（求人総合）
              </button>
              <span className="ml-2">/</span>
            </li>
            <li className="text-zinc-800 font-bold">
              信太山新地 徹底比較ガイド
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-[#E5004F] text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-4 shadow-2xs">
            <LucideIcon name="Scale" size={16} />
            <span>2026年最新版｜公式徹底比較ガイド</span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4">
            信太山新地 徹底比較ガイド<br />
            <span className="text-[#E5004F]">飛田・松島・一般風俗・スカウトとの違い</span>を完全公開
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-6">
            「店先での顔見せはあるの？」「給料の天引きや引かれものは？」「身バレのリスクは？」「スカウト経由と旅館直営で何が違う？」
            働く女性が本当に気になる重要ポイントを、公式データと実態に基づいて徹底比較・解説します。
          </p>

          {/* Key Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
            <span className="bg-white border border-rose-200 text-zinc-700 px-3.5 py-1.5 rounded-full font-bold shadow-2xs flex items-center gap-1.5">
              <LucideIcon name="ShieldCheck" size={14} className="text-[#E5004F]" />
              旅館直営・店先顔見せなし
            </span>
            <span className="bg-white border border-rose-200 text-zinc-700 px-3.5 py-1.5 rounded-full font-bold shadow-2xs flex items-center gap-1.5">
              <LucideIcon name="Coins" size={14} className="text-[#E5004F]" />
              15分高額バック＆即日日払い
            </span>
            <span className="bg-white border border-rose-200 text-zinc-700 px-3.5 py-1.5 rounded-full font-bold shadow-2xs flex items-center gap-1.5">
              <LucideIcon name="EyeOff" size={14} className="text-[#E5004F]" />
              ネット写真掲載完全ゼロ
            </span>
            <span className="bg-white border border-rose-200 text-zinc-700 px-3.5 py-1.5 rounded-full font-bold shadow-2xs flex items-center gap-1.5">
              <LucideIcon name="Ban" size={14} className="text-[#E5004F]" />
              お酒・連絡先交換一切不要
            </span>
          </div>
        </header>

        {/* Quick Link to Workstyle Guide */}
        {onNavigateWorkstyleGuide && (
          <div className="mb-12 bg-gradient-to-r from-rose-50 via-pink-50/60 to-white rounded-3xl p-5 sm:p-6 border-2 border-rose-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
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
            <button
              type="button"
              onClick={() => onNavigateWorkstyleGuide()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-white hover:bg-rose-50 text-[#E5004F] border border-[#E5004F]/30 shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>タイプ別働き方ガイドを見る</span>
              <LucideIcon name="ChevronRight" size={15} />
            </button>
          </div>
        )}

        {/* SECTION 1: 比較表（大阪新地比較 ＆ 採用形態比較） */}
        <section className="mb-16 md:mb-24 scroll-mt-24" id="site-comparison-matrix">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <div className="text-xs font-extrabold text-[#E5004F] tracking-wider mb-1 flex items-center gap-1.5">
                <LucideIcon name="ShieldCheck" size={14} />
                <span>COMPARISON TABLES</span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-zinc-900">
                徹底比較｜他の新地・一般風俗・スカウトとの違い
              </h2>
            </div>
            <span className="text-xs bg-rose-50 text-[#E5004F] border border-rose-200 px-3 py-1 rounded-full font-semibold self-start sm:self-auto">
              ※表は左右にスクロールできます
            </span>
          </div>

          {/* Table Switcher Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              onClick={() => setActiveComparisonTab('area')}
              className={`text-xs sm:text-sm font-black px-4 sm:px-5 py-2.5 rounded-2xl transition-all cursor-pointer border flex items-center gap-2 ${
                activeComparisonTab === 'area'
                  ? 'bg-[#E5004F] text-white border-[#E5004F] shadow-sm'
                  : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200'
              }`}
            >
              <LucideIcon name="MapPin" size={15} />
              <span>【エリア比較】信太山 vs 飛田 vs 松島 vs 一般風俗</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveComparisonTab('channel')}
              className={`text-xs sm:text-sm font-black px-4 sm:px-5 py-2.5 rounded-2xl transition-all cursor-pointer border flex items-center gap-2 ${
                activeComparisonTab === 'channel'
                  ? 'bg-[#E5004F] text-white border-[#E5004F] shadow-sm'
                  : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200'
              }`}
            >
              <LucideIcon name="ShieldCheck" size={15} />
              <span>【採用形態比較】旅館直営公式 vs スカウト業者 vs 外部サイト</span>
            </button>
          </div>

          {/* Comparison Table Container */}
          <div className="bg-white rounded-3xl border border-rose-100 shadow-md overflow-hidden mb-6">
            <div className="overflow-x-auto scrollbar-thin">
              {activeComparisonTab === 'area' ? (
                /* TAB 1: AREA COMPARISON */
                <table className="w-full text-left border-collapse min-w-[920px]">
                  <caption className="sr-only">
                    大阪三大新地（信太山新地・飛田新地・松島新地）と一般風俗・キャバクラの待遇・働き方比較表
                  </caption>
                  <thead>
                    <tr className="border-b border-rose-100">
                      <th scope="col" className="p-4 bg-zinc-50 font-bold text-xs sm:text-sm text-zinc-700 w-[17%] min-w-[135px] sticky left-0 z-10 border-r border-rose-100/60">
                        比較項目
                      </th>
                      <th scope="col" className="p-4 bg-rose-500 text-white font-black text-xs sm:text-sm w-[27%] min-w-[220px] shadow-xs border-r border-rose-600/40">
                        <div className="flex items-center gap-1.5">
                          <LucideIcon name="Award" size={16} className="text-yellow-300 flex-shrink-0" />
                          <span>【公式】信太山新地（旅館直営）</span>
                        </div>
                      </th>
                      <th scope="col" className="p-4 bg-zinc-100 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px] border-r border-zinc-200/60">
                        飛田新地
                      </th>
                      <th scope="col" className="p-4 bg-zinc-50 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px] border-r border-zinc-200/60">
                        松島新地
                      </th>
                      <th scope="col" className="p-4 bg-zinc-100 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px]">
                        一般風俗・キャバクラ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-50 text-xs sm:text-sm">
                    {AREA_COMPARISON_ROWS.map((row, idx) => (
                      <tr 
                        key={row.criteria} 
                        className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30' : 'bg-zinc-50/40 hover:bg-rose-50/30'}
                      >
                        <th scope="row" className="p-4 font-bold text-zinc-800 bg-inherit sticky left-0 z-10 border-r border-rose-100/60 min-w-[135px] text-left">
                          {row.criteria}
                        </th>
                        <td className="p-4 bg-rose-50/50 border-r border-rose-200/70 font-semibold text-[#3c2a2e] min-w-[220px]">
                          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                            {renderGradeBadge(row.shinodayama.grade)}
                            {row.shinodayama.badge && (
                              <span className="text-[10px] font-black bg-[#E5004F] text-white px-2 py-0.5 rounded-md">
                                {row.shinodayama.badge}
                              </span>
                            )}
                          </div>
                          <p className="leading-snug font-medium text-xs sm:text-sm">
                            {row.shinodayama.text}
                          </p>
                        </td>
                        <td className="p-4 text-zinc-600 border-r border-zinc-200/60 min-w-[180px]">
                          <div className="mb-1.5">
                            {renderGradeBadge(row.tobita.grade)}
                          </div>
                          <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                            {row.tobita.text}
                          </p>
                        </td>
                        <td className="p-4 text-zinc-600 border-r border-zinc-200/60 min-w-[180px]">
                          <div className="mb-1.5">
                            {renderGradeBadge(row.matsushima.grade)}
                          </div>
                          <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                            {row.matsushima.text}
                          </p>
                        </td>
                        <td className="p-4 text-zinc-600 min-w-[180px]">
                          <div className="mb-1.5">
                            {renderGradeBadge(row.generalNight.grade)}
                          </div>
                          <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                            {row.generalNight.text}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                /* TAB 2: CHANNEL COMPARISON */
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <caption className="sr-only">
                    旅館直営公式採用とSNSスカウト業者・外部求人ポータルの比較表
                  </caption>
                  <thead>
                    <tr className="border-b border-rose-100">
                      <th scope="col" className="p-4 bg-zinc-50 font-bold text-xs sm:text-sm text-zinc-600 w-[16%] min-w-[130px] sticky left-0 z-10 border-r border-rose-100/60">
                        チェック項目
                      </th>
                      <th scope="col" className="p-4 bg-rose-500 text-white font-extrabold text-xs sm:text-sm w-[28%] min-w-[220px] shadow-xs border-r border-rose-600/40">
                        <div className="flex items-center gap-1.5">
                          <LucideIcon name="Award" size={16} className="text-yellow-300 flex-shrink-0" />
                          <span>【公式】信太山ガールズ（旅館直営）</span>
                        </div>
                      </th>
                      <th scope="col" className="p-4 bg-zinc-100 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px] border-r border-zinc-200/60">
                        SNS・街頭スカウト業者
                      </th>
                      <th scope="col" className="p-4 bg-zinc-50 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px] border-r border-zinc-200/60">
                        他求人サイト（外部ポータルなど）
                      </th>
                      <th scope="col" className="p-4 bg-zinc-100 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px]">
                        他業種ナイトワーク（ソープ等）
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-50 text-xs sm:text-sm">
                    {SITE_COMPARISON_ROWS.map((row, idx) => (
                      <tr 
                        key={row.criteria} 
                        className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30' : 'bg-zinc-50/40 hover:bg-rose-50/30'}
                      >
                        <th scope="row" className="p-4 font-bold text-zinc-800 bg-inherit sticky left-0 z-10 border-r border-rose-100/60 min-w-[130px] text-left">
                          {row.criteria}
                        </th>
                        <td className="p-4 bg-rose-50/40 border-r border-rose-200/60 font-semibold text-[#3c2a2e] min-w-[220px]">
                          <div className="mb-1.5">
                            {renderGradeBadge(row.ourShop.grade)}
                          </div>
                          <p className="leading-snug font-medium text-xs sm:text-sm">
                            {row.ourShop.text}
                          </p>
                        </td>
                        <td className="p-4 text-zinc-600 border-r border-zinc-200/60 min-w-[180px]">
                          <div className="mb-1.5">
                            {renderGradeBadge(row.scoutAgency.grade)}
                          </div>
                          <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                            {row.scoutAgency.text}
                          </p>
                        </td>
                        <td className="p-4 text-zinc-600 border-r border-zinc-200/60 min-w-[180px]">
                          <div className="mb-1.5">
                            {renderGradeBadge(row.generalPortal.grade)}
                          </div>
                          <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                            {row.generalPortal.text}
                          </p>
                        </td>
                        <td className="p-4 text-zinc-600 min-w-[180px]">
                          <div className="mb-1.5">
                            {renderGradeBadge(row.otherNightwork.grade)}
                          </div>
                          <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                            {row.otherNightwork.text}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Warning Callout Box for Scouts */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-50 to-rose-50 border-t border-rose-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs sm:text-sm">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                <LucideIcon name="AlertTriangle" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-zinc-900 mb-1">
                  【警告】街頭やSNS裏垢（X/旧Twitter）のスカウト業者経由は絶対にNG！
                </h3>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  スカウトを通すと、あなたの売上から毎月10〜30%が「紹介料」として永久に天引きされます。また個人情報の流出や退職時の脅迫トラブルも後を絶ちません。信太山新地は<strong className="text-[#E5004F] font-black">旅館直営公式採用（信太山ガールズ）</strong>から直接応募することで、仲介手数料ゼロ・高額バック即日全額手渡し・時給1万円保証・日給保証が約束されます。
                </p>
              </div>
            </div>
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
              他の新地エリアや一般風俗店でよくある不安やデメリットを解消した、信太山新地ならではの安心体制です。
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
              <button
                type="button"
                onClick={() => onNavigateWorkstyleGuide()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-[12px] font-bold text-xs sm:text-sm bg-white/20 hover:bg-white/30 text-white transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <LucideIcon name="Layers" size={16} />
                <span>タイプ別働き方ガイドへ</span>
              </button>
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
