/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';
import { QUERY_SUMMARY_CARDS } from '../quickGuideData';

interface AiSearchQueryGuideSectionProps {
  onNavigateHome: () => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateCompare: () => void;
  onNavigateAbout: () => void;
  onNavigateFaq: () => void;
  onCtaclick: () => void;
}

export default function AiSearchQueryGuideSection({
  onNavigateHome,
  onNavigateTopic,
  onNavigateCompare,
  onNavigateAbout,
  onNavigateFaq,
  onCtaclick,
}: AiSearchQueryGuideSectionProps) {
  return (
    <div id="ai-query-summary" className="min-h-screen bg-[#FAF6F8] py-10 sm:py-16">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="パンくずリスト" className="mb-6">
          <ol className="flex items-center gap-1.5 text-xs text-[#666666] flex-wrap">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="hover:text-[#A65D79] hover:underline font-medium"
              >
                信太山新地求人トップ
              </a>
            </li>
            <li aria-hidden="true">
              <LucideIcon name="ChevronRight" size={13} className="text-[#A65D79]" />
            </li>
            <li className="text-[#85465F] font-bold">
              気になるキーワード別 公式要点まとめ
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
            QUICK GUIDE BY TOPIC
          </p>
          <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#333333] leading-snug mb-4 text-balance">
            気になるキーワード別にすぐ分かる｜公式要点まとめ
          </h1>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            「給料」「未経験」「仕事内容」「待機方法・身バレ対策」「寮・出稼ぎ」など、応募前によく調べられるポイントを結論からお伝えします。
          </p>
        </header>

        {/* 8 Query Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-12">
          {QUERY_SUMMARY_CARDS.map((card) => (
            <article
              key={card.id}
              className="bg-white rounded-2xl border border-[#EFE2E7] p-5 sm:p-6 shadow-[0_2px_10px_rgba(166,93,121,0.04)] flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-bold text-[#A65D79] tracking-wide mb-1.5">
                  {card.queryLabel}
                </p>
                <h2 className="font-display font-bold text-base sm:text-lg text-[#333333] leading-snug mb-2.5">
                  {card.questionHeading}
                </h2>
                <p className="ai-direct-answer text-xs sm:text-sm text-[#4A4A4A] leading-relaxed mb-4">
                  {card.directAnswer}
                </p>
              </div>
              <div className="pt-3 border-t border-[#FAF2F5] flex items-center justify-between">
                <a
                  href={card.targetPath}
                  onClick={(e) => {
                    e.preventDefault();
                    if (card.actionType === 'compare') onNavigateCompare();
                    else if (card.actionType === 'about') onNavigateAbout();
                    else if (card.topicId) onNavigateTopic(card.topicId);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#A65D79] hover:text-[#E85B91] transition-colors"
                >
                  <span>{card.targetLabel}</span>
                  <LucideIcon name="ArrowRight" size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTAs */}
        <div className="bg-white rounded-3xl border border-[#EFE2E7] p-6 sm:p-8 text-center max-w-3xl mx-auto shadow-[0_4px_16px_rgba(166,93,121,0.05)]">
          <h2 className="font-display font-bold text-lg sm:text-xl text-[#333333] mb-2">
            さらに詳しく確認したい・個別に質問したい方へ
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
            詳しい全66問のQ&Aページをご覧いただくか、当店公式LINEで女性スタッフへ直接ご質問いただけます。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onCtaclick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm transition-colors cursor-pointer shadow-[0_2px_10px_rgba(6,199,85,0.22)]"
            >
              <LucideIcon name="MessageCircle" size={17} className="fill-white" />
              <span>LINEで直接質問してみる</span>
            </button>
            <a
              href="/faq"
              onClick={(e) => {
                e.preventDefault();
                onNavigateFaq();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFF6F8] hover:bg-[#FCE8EF] text-[#A65D79] font-bold text-sm border border-[#E2CED6] transition-colors"
            >
              <span>よくある質問（66問）を見る</span>
              <LucideIcon name="ArrowRight" size={15} />
            </a>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl bg-white hover:bg-[#FAF6F8] text-[#555555] font-bold text-sm border border-[#E9DFD4] transition-colors"
            >
              <LucideIcon name="ArrowLeft" size={15} />
              <span>トップページへ戻る</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
