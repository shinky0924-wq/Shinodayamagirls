/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';
import {
  ONAYAMI_PAGE_META,
  ONAYAMI_CATEGORIES,
  ONAYAMI_QUESTIONS,
  PRE_APPLICATION_CHECKLIST,
  OnayamiRelatedLink,
} from '../onayamiGuideData';

interface OnayamiGuidePageProps {
  onNavigateHome: () => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateWorkstyles: (slug?: string) => void;
  onNavigateAbout: () => void;
  onNavigateInterview: () => void;
  onNavigateQuickGuide: () => void;
  onNavigateFaq: () => void;
  onScrollToHomeSection: (sectionId: string) => void;
  onCtaclick: () => void;
}

export default function OnayamiGuidePage({
  onNavigateHome,
  onNavigateTopic,
  onNavigateWorkstyles,
  onNavigateAbout,
  onNavigateInterview,
  onNavigateQuickGuide,
  onNavigateFaq,
  onScrollToHomeSection,
  onCtaclick,
}: OnayamiGuidePageProps) {
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const checkedCount = Object.values(checkedIds).filter(Boolean).length;
  const totalCheckCount = PRE_APPLICATION_CHECKLIST.length;

  const toggleCheckItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetChecklist = () => {
    setCheckedIds({});
  };

  const scrollToQuestion = (questionId: string) => {
    const el = document.getElementById(questionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRelatedClick = (e: MouseEvent<HTMLAnchorElement>, link: OnayamiRelatedLink) => {
    e.preventDefault();
    if (link.type === 'topic' && link.topicId) {
      onNavigateTopic(link.topicId);
    } else if (link.type === 'section' && link.sectionId) {
      onScrollToHomeSection(link.sectionId);
    } else if (link.type === 'route') {
      if (link.tab === 'workstyle') {
        const parts = link.href.split('/').filter(Boolean);
        onNavigateWorkstyles(parts[1] || undefined);
      } else if (link.tab === 'about') {
        onNavigateAbout();
      } else if (link.tab === 'interview') {
        onNavigateInterview();
      } else if (link.tab === 'quick-guide') {
        onNavigateQuickGuide();
      } else if (link.tab === 'faq') {
        onNavigateFaq();
      } else {
        onNavigateHome();
      }
    }
  };

  const renderLineCallout = (id: string) => (
    <section
      id={id}
      aria-label="LINE相談案内"
      className="my-10 sm:my-12 rounded-3xl bg-gradient-to-br from-[#FFF6F8] via-white to-[#F7F2EC] border border-[#E8D7DE] p-6 sm:p-9 shadow-[0_6px_24px_rgba(166,93,121,0.06)] text-center"
    >
      <div className="max-w-xl mx-auto">
        <p className="text-xs font-bold tracking-[0.16em] text-[#A65D79] mb-2">
          LINE CONSULTATION
        </p>
        <h2 className="font-display font-bold text-xl sm:text-2xl text-[#333333] mb-3 text-balance">
          まだ分からないことがある方へ
        </h2>
        <p className="text-sm sm:text-[15px] text-[#4A4A4A] leading-relaxed mb-6">
          仕事内容やお給料、働き方など、気になることはありませんか？
          <br className="hidden sm:inline" />
          応募するか決めていなくても大丈夫です。
          <br className="hidden sm:inline" />
          まずは疑問や不安をLINEでご相談ください。
        </p>
        <a
          href={LINE_OFFICIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            onCtaclick();
          }}
          className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm sm:text-base transition-colors whitespace-nowrap shrink-0 shadow-[0_3px_12px_rgba(6,199,85,0.22)] cursor-pointer"
        >
          <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
          <span>LINEで気軽に相談する</span>
        </a>
        <p className="text-xs text-[#666666] mt-3">
          女性相談スタッフが匿名でのご質問にも対応します（無理な応募の勧誘は行いません）
        </p>
      </div>
    </section>
  );

  return (
    <div id="onayami-guide-page" className="min-h-screen bg-[#FFFDFD] text-[#333333] py-8 sm:py-12">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
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
            <li className="text-[#85465F] font-bold" aria-current="page">
              {ONAYAMI_PAGE_META.pageTitle}
            </li>
          </ol>
        </nav>

        {/* Section 2: First View / Hero */}
        <section
          id="onayami-hero"
          className="rounded-3xl bg-gradient-to-br from-[#FFF6F8] via-white to-[#F7F2EC] border border-[#EFE2E7] p-5 sm:p-8 lg:p-10 shadow-[0_8px_28px_rgba(166,93,121,0.06)] mb-10 sm:mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-sm sm:text-base font-bold text-[#A65D79] mb-2">
                {ONAYAMI_PAGE_META.heroSubheading}
              </p>
              <h1 className="font-display font-bold text-[22px] sm:text-4xl text-[#333333] leading-snug mb-4 text-balance">
                {ONAYAMI_PAGE_META.heroHeading}
              </h1>

              <div className="bg-white/90 rounded-2xl border border-[#EFE2E7] p-4 sm:p-5 mb-4">
                <p className="font-display font-bold text-base sm:text-lg text-[#85465F] leading-relaxed mb-2">
                  {ONAYAMI_PAGE_META.heroCatchLine1}
                  <br />
                  {ONAYAMI_PAGE_META.heroCatchLine2}
                </p>
                <p className="text-sm sm:text-[15px] text-[#333333] font-medium leading-relaxed mb-2">
                  {ONAYAMI_PAGE_META.heroCatchFollow}
                </p>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {ONAYAMI_PAGE_META.heroSubcopy}
                </p>
              </div>

              <div className="space-y-1.5 text-sm sm:text-[15px] text-[#4A4A4A] leading-relaxed">
                <p className="font-bold text-[#333333]">{ONAYAMI_PAGE_META.heroDescription1}</p>
                <p>{ONAYAMI_PAGE_META.heroDescription2}</p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <figure className="h-full flex flex-col">
                <div className="relative rounded-2xl overflow-hidden border border-[#E8D7DE] bg-[#FAF6F8] aspect-[4/3] lg:flex-1">
                  {!heroImgFailed ? (
                    <img
                      src={ONAYAMI_PAGE_META.heroImage}
                      alt={ONAYAMI_PAGE_META.heroImageAlt}
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgFailed(true)}
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FFF6F8] to-[#F7F2EC]">
                      <LucideIcon name="HeartHandshake" size={40} className="text-[#A65D79] mb-2" />
                      <p className="text-sm font-bold text-[#85465F]">女性のためのお仕事ガイド</p>
                      <p className="text-xs text-[#666666] mt-1">応募前の疑問を一つずつ丁寧に解説</p>
                    </div>
                  )}
                </div>
                <figcaption className="text-[11px] text-[#666666] leading-relaxed mt-2">
                  {ONAYAMI_PAGE_META.heroImageCaption}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Section 3: 8 Quick Categories */}
        <section id="onayami-categories" className="mb-12 sm:mb-14">
          <div className="mb-5">
            <h2 className="font-display font-bold text-[19px] sm:text-2xl text-[#333333] leading-snug mb-1.5 text-balance">
              気になる疑問からテーマを選ぶ（8カテゴリー）
            </h2>
            <p className="text-xs sm:text-sm text-[#555555]">
              知りたいテーマのカードをタップすると、該当する解説セクションへ移動します。
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {ONAYAMI_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToQuestion(cat.targetQuestionId)}
                className="group text-left rounded-2xl bg-white hover:bg-[#FFF6F8] border border-[#EFE2E7] hover:border-[#A65D79]/50 p-4 transition-colors shadow-[0_2px_8px_rgba(166,93,121,0.03)] flex flex-col justify-between gap-3 min-h-[108px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#A65D79]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF6F8] group-hover:bg-[#A65D79] text-[#A65D79] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                    <LucideIcon name={cat.iconName} size={19} />
                  </div>
                  <span className="text-[11px] font-bold text-[#A65D79] tabular-nums whitespace-nowrap shrink-0">
                    {cat.subLabel}
                  </span>
                </div>
                <div>
                  <span className="font-display font-bold text-xs sm:text-sm text-[#333333] group-hover:text-[#85465F] leading-snug block">
                    {cat.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Section 4: 10 Detailed Question Sections (01 - 05) */}
        <div className="space-y-8 sm:space-y-10">
          {ONAYAMI_QUESTIONS.slice(0, 5).map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-24 rounded-3xl bg-white border border-[#EFE2E7] p-5 sm:p-8 shadow-[0_4px_16px_rgba(166,93,121,0.04)]"
            >
              <div className="flex items-center gap-2 text-xs text-[#A65D79] font-bold mb-2">
                <span className="tabular-nums">疑問 {item.number}</span>
                <span aria-hidden="true">·</span>
                <span>{item.categoryLabel}</span>
              </div>

              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#333333] leading-snug mb-4 pb-3 border-b border-[#FAF2F5] text-balance">
                {item.questionHeading}
              </h2>

              {/* Direct Answer */}
              <div className="rounded-2xl bg-[#FFF6F8] border border-[#F2DFE7] p-4 sm:p-5 mb-5">
                <p className="ai-direct-answer font-bold text-sm sm:text-base text-[#85465F] leading-relaxed">
                  {item.directAnswer}
                </p>
              </div>

              {/* Explanatory Prose */}
              <div className="space-y-3 text-sm sm:text-[15px] text-[#333333] leading-relaxed mb-6">
                {item.bodyParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Key Points */}
              <div className="rounded-2xl bg-[#F7F2EC]/75 border border-[#E9DFD4] p-4 sm:p-5 mb-5">
                <h3 className="font-display font-bold text-sm sm:text-base text-[#333333] mb-3 flex items-center gap-2">
                  <LucideIcon name="CheckCircle2" size={17} className="text-[#A65D79] shrink-0" />
                  <span>{item.pointsTitle}</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#444444] leading-relaxed">
                  {item.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#A65D79] font-bold shrink-0 mt-0.5">・</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Staff Check Note (Truthfulness & Confirmation Guidance) */}
              {item.staffCheckItems && item.staffCheckItems.length > 0 && (
                <div className="rounded-2xl bg-[#FAF6F8] border border-[#EFE2E7] p-4 sm:p-5 mb-5">
                  <p className="font-bold text-xs sm:text-sm text-[#85465F] mb-2 flex items-center gap-1.5">
                    <LucideIcon name="HelpCircle" size={15} className="text-[#A65D79] shrink-0" />
                    <span>{item.staffCheckNoteTitle || '運営へ事前確認したい事項'}</span>
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#555555]">
                    {item.staffCheckItems.map((chk, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#A65D79] shrink-0">-</span>
                        <span>{chk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Detail Links */}
              <div className="pt-4 border-t border-[#FAF2F5] flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold text-[#666666] mr-1">関連ページ：</span>
                {item.relatedLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleRelatedClick(e, link)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#FFF6F8] text-[#A65D79] border border-[#E2CED6] text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{link.label}</span>
                    <LucideIcon name="ArrowRight" size={13} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Section 6: Mid-Page LINE Consultation Callout */}
        {renderLineCallout('onayami-line-mid')}

        {/* Section 4 (Continued): Questions 06 - 10 */}
        <div className="space-y-8 sm:space-y-10">
          {ONAYAMI_QUESTIONS.slice(5).map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-24 rounded-3xl bg-white border border-[#EFE2E7] p-5 sm:p-8 shadow-[0_4px_16px_rgba(166,93,121,0.04)]"
            >
              <div className="flex items-center gap-2 text-xs text-[#A65D79] font-bold mb-2">
                <span className="tabular-nums">疑問 {item.number}</span>
                <span aria-hidden="true">·</span>
                <span>{item.categoryLabel}</span>
              </div>

              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#333333] leading-snug mb-4 pb-3 border-b border-[#FAF2F5] text-balance">
                {item.questionHeading}
              </h2>

              <div className="rounded-2xl bg-[#FFF6F8] border border-[#F2DFE7] p-4 sm:p-5 mb-5">
                <p className="ai-direct-answer font-bold text-sm sm:text-base text-[#85465F] leading-relaxed">
                  {item.directAnswer}
                </p>
              </div>

              <div className="space-y-3 text-sm sm:text-[15px] text-[#333333] leading-relaxed mb-6">
                {item.bodyParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="rounded-2xl bg-[#F7F2EC]/75 border border-[#E9DFD4] p-4 sm:p-5 mb-5">
                <h3 className="font-display font-bold text-sm sm:text-base text-[#333333] mb-3 flex items-center gap-2">
                  <LucideIcon name="CheckCircle2" size={17} className="text-[#A65D79] shrink-0" />
                  <span>{item.pointsTitle}</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#444444] leading-relaxed">
                  {item.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#A65D79] font-bold shrink-0 mt-0.5">・</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {item.staffCheckItems && item.staffCheckItems.length > 0 && (
                <div className="rounded-2xl bg-[#FAF6F8] border border-[#EFE2E7] p-4 sm:p-5 mb-5">
                  <p className="font-bold text-xs sm:text-sm text-[#85465F] mb-2 flex items-center gap-1.5">
                    <LucideIcon name="HelpCircle" size={15} className="text-[#A65D79] shrink-0" />
                    <span>{item.staffCheckNoteTitle || '運営へ事前確認したい事項'}</span>
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#555555]">
                    {item.staffCheckItems.map((chk, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#A65D79] shrink-0">-</span>
                        <span>{chk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pre-Application Interactive Checklist in Question 10 */}
              {item.id === 'question-10' && (
                <div
                  id="pre-application-checklist"
                  className="rounded-2xl bg-[#FFF6F8]/60 border border-[#E8D7DE] p-5 sm:p-6 mb-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-[#85465F]">
                        応募前チェックリスト（確認用）
                      </h3>
                      <p className="text-xs text-[#666666] mt-0.5">
                        応募やLINE相談の前に、気になっている項目を確認したかチェックしてみてください。
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#A65D79] tabular-nums">
                        {checkedCount} / {totalCheckCount} 確認済み
                      </span>
                      {checkedCount > 0 && (
                        <button
                          type="button"
                          onClick={resetChecklist}
                          className="text-xs text-[#666666] hover:text-[#A65D79] underline cursor-pointer whitespace-nowrap shrink-0"
                        >
                          リセット
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {PRE_APPLICATION_CHECKLIST.map((chk) => {
                      const isChecked = !!checkedIds[chk.id];
                      return (
                        <button
                          key={chk.id}
                          type="button"
                          onClick={() => toggleCheckItem(chk.id)}
                          aria-pressed={isChecked}
                          className={`text-left p-3.5 rounded-xl border transition-colors flex items-start gap-3 cursor-pointer ${
                            isChecked
                              ? 'bg-white border-[#A65D79] text-[#333333]'
                              : 'bg-white/80 hover:bg-white border-[#EFE2E7] text-[#4A4A4A]'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChecked
                                ? 'bg-[#A65D79] border-[#A65D79] text-white'
                                : 'bg-white border-[#D6BFC8]'
                            }`}
                          >
                            {isChecked && <LucideIcon name="Check" size={13} />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[11px] font-bold text-[#A65D79] block mb-0.5">
                              {chk.category}
                            </span>
                            <span className="text-xs sm:text-[13px] leading-relaxed block">
                              {chk.text}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[#FAF2F5] flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold text-[#666666] mr-1">関連ページ：</span>
                {item.relatedLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleRelatedClick(e, link)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#FFF6F8] text-[#A65D79] border border-[#E2CED6] text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{link.label}</span>
                    <LucideIcon name="ArrowRight" size={13} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Section 6: Bottom LINE Consultation Callout */}
        {renderLineCallout('onayami-line-bottom')}

        {/* Bottom Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/faq"
            onClick={(e) => {
              e.preventDefault();
              onNavigateFaq();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#FFF6F8] text-[#A65D79] border border-[#E2CED6] text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0"
          >
            <span>よくある質問（66問）も見る</span>
            <LucideIcon name="ArrowRight" size={15} />
          </a>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F7F2EC] hover:bg-[#EFE7DD] text-[#4A4A4A] text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0"
          >
            <LucideIcon name="ArrowLeft" size={15} />
            <span>信太山新地求人トップページへ戻る</span>
          </a>
        </div>
      </div>
    </div>
  );
}
