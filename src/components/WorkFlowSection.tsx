/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import LucideIcon from './LucideIcon';

interface WorkFlowSectionProps {
  onCtaclick?: () => void;
  onNavigateDetail?: () => void;
}

interface StepItem {
  step: string;
  title: string;
  badge: string;
  desc: string;
  icon: string;
}

export default function WorkFlowSection({
  onCtaclick,
  onNavigateDetail,
}: WorkFlowSectionProps) {
  const steps: StepItem[] = [
    {
      step: '01',
      title: 'まずはLINEで相談',
      badge: '匿名での相談もOK',
      desc: '気になることや不安なことを、LINEや電話でお気軽にご相談ください。応募を決めていなくても、質問だけで大丈夫です。',
      icon: 'message-circle',
    },
    {
      step: '02',
      title: '希望条件の確認・お店見学',
      badge: '見学だけでも歓迎',
      desc: '希望する働き方や収入、出勤日数などを確認します。実際のお店や待機場所を見てから検討することもできます。',
      icon: 'building-2',
    },
    {
      step: '03',
      title: '面接・仕事内容の説明',
      badge: '履歴書不要',
      desc: 'お仕事内容・給与・待遇・ルールを一つずつ説明します。疑問や不安は面接時に何でも質問してください。',
      icon: 'clipboard-check',
    },
    {
      step: '04',
      title: '希望者は体験入店',
      badge: '希望する方のみ',
      desc: 'お店の雰囲気や仕事の流れを実際に確認できます。体験するかどうかはご自身で決められます。',
      icon: 'door-open',
    },
    {
      step: '05',
      title: '納得したらお仕事スタート',
      badge: '自分のペースで開始',
      desc: '働き方や出勤日を相談してスタート。お給料の受け取り方法や勤務ルールも事前に確認できます。',
      icon: 'check-circle',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FFFAFC] relative overflow-hidden" id="flow">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. メインタイトル */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#D8175D] uppercase mb-2">
            HOW TO START
          </span>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#1F2432] leading-tight mb-2 tracking-tight">
            応募からお仕事開始まで
          </h2>

          <p className="text-base sm:text-lg font-bold text-[#D8175D] mb-3">
            はじめてでも安心の5ステップ
          </p>

          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed max-w-xl mx-auto">
            まずは相談だけでも大丈夫。お店の見学や条件の確認をしてから、働くかどうかを決められます。
          </p>
        </div>

        {/* 2 & 3. 5ステップ（PC版：横一列5枚 / スマホ版：縦一列タイムライン） */}

        {/* --- PC版（md以上：5枚横一列） --- */}
        <div className="hidden md:grid md:grid-cols-5 gap-3 lg:gap-4 mb-10 items-stretch relative">
          {steps.map((st, idx) => (
            <div key={st.step} className="relative flex flex-col h-full group">
              {/* カード本体 */}
              <div className="h-full bg-white rounded-[18px] border border-[#F0DDE4] p-4 lg:p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(216,23,93,0.03)] hover:shadow-[0_6px_20px_rgba(216,23,93,0.08)] transition-all">
                <div>
                  {/* 上部：STEP番号 & 補助タグ */}
                  <div className="flex items-center justify-between gap-1 mb-3">
                    <span className="font-mono font-black text-2xl lg:text-3xl text-[#E5829D]/70 leading-none">
                      {st.step}
                    </span>
                    <span className="text-[10px] font-bold text-[#D8175D] bg-[#FFF1F5] px-2 py-0.5 rounded-full border border-[#F0DDE4] whitespace-nowrap">
                      {st.badge}
                    </span>
                  </div>

                  {/* アイコン（ピンクの薄い円形背景） */}
                  <div className="w-11 h-11 rounded-full bg-[#FFF1F5] border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3.5 group-hover:scale-105 transition-transform">
                    <LucideIcon name={st.icon} size={20} />
                  </div>

                  {/* タイトル（濃いネイビー） */}
                  <h3 className="font-bold text-[13px] lg:text-sm text-[#1F2432] mb-2 leading-snug min-h-[38px] flex items-center">
                    {st.title}
                  </h3>

                  {/* 説明文（濃いグレー） */}
                  <p className="text-[11.5px] lg:text-xs text-[#555555] leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>

              {/* PC版ステップ間のコネクト矢印（最後のカード以外） */}
              {idx < steps.length - 1 && (
                <div
                  className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-[#FFF1F5] border border-[#F0DDE4] text-[#D8175D] items-center justify-center shadow-2xs pointer-events-none"
                  aria-hidden="true"
                >
                  <LucideIcon name="ChevronRight" size={12} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- スマートフォン版（md未満：縦一列タイムライン） --- */}
        <div className="md:hidden space-y-3.5 mb-8">
          {steps.map((st, idx) => (
            <div
              key={st.step}
              className="bg-white rounded-[18px] border border-[#F0DDE4] p-4 shadow-[0_2px_10px_rgba(216,23,93,0.03)] flex gap-3.5 relative"
            >
              {/* 左側：STEP番号とアイコン */}
              <div className="flex flex-col items-center shrink-0 w-12">
                <span className="font-mono font-black text-xl text-[#E5829D]/80 leading-none mb-1">
                  {st.step}
                </span>
                <div className="w-10 h-10 rounded-full bg-[#FFF1F5] border border-[#F0DDE4] flex items-center justify-center text-[#D8175D]">
                  <LucideIcon name={st.icon} size={18} />
                </div>
                {/* 縦のガイドライン（最後のステップ以外） */}
                {idx < steps.length - 1 && (
                  <div className="w-[1.5px] bg-[#F0DDE4] flex-1 my-1.5" />
                )}
              </div>

              {/* 右側：コンテンツ */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="inline-block text-[10px] font-bold text-[#D8175D] bg-[#FFF1F5] px-2 py-0.5 rounded-full border border-[#F0DDE4] mb-1.5">
                  {st.badge}
                </div>
                <h3 className="font-bold text-sm text-[#1F2432] mb-1.5 leading-snug">
                  {st.title}
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 安心の約束エリア */}
        <div className="bg-[#FFF5F8] border border-[#F0DDE4] rounded-[18px] p-6 sm:p-7 text-center max-w-2xl mx-auto shadow-2xs">
          <div className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#D8175D] mb-2">
            <LucideIcon name="ShieldCheck" size={17} />
            <span>安心の約束</span>
          </div>
          <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-1.5">
            応募したからといって、働くことを強制されません。
          </h3>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed max-w-xl mx-auto">
            見学・面接・体験を通して、お店や条件に納得してから決めてください。無理な勧誘は行いません。
          </p>

          {onNavigateDetail && (
            <div className="mt-4 pt-3.5 border-t border-[#F0DDE4]/70">
              <button
                type="button"
                onClick={onNavigateDetail}
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-[#D8175D] hover:text-[#b5124c] font-bold bg-white px-5 py-2.5 rounded-full border border-[#F0DDE4] shadow-2xs hover:shadow-xs transition-all cursor-pointer hover:scale-[1.01]"
                id="flow-detail-link-btn"
              >
                <span>詳しい採用の流れ・必要書類の解説を見る</span>
                <LucideIcon name="ChevronRight" size={13} />
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
