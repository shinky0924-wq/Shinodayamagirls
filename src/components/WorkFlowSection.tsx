/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface WorkFlowSectionProps {
  onCtaclick: () => void;
  onNavigateDetail: () => void;
}

export default function WorkFlowSection({
  onCtaclick,
  onNavigateDetail,
}: WorkFlowSectionProps) {
  const steps = [
    {
      step: '01',
      title: 'LINE・お電話で無料相談',
      time: '所要時間：1〜3分',
      desc: '24時間いつでも受付中。匿名での質問や「お話だけ聞いてみたい」という段階でも大歓迎です。女性スタッフが親身に対応します。',
      icon: 'MessageCircle',
      badge: '匿名OK・24h受付'
    },
    {
      step: '02',
      title: '希望ヒアリング・店舗見学',
      time: '所要時間：15〜20分',
      desc: '働くペースや希望日給、生活状況を伺います。私服のまま手ぶらで清潔な旅館個室や控え室を実際にご覧いただけます。駅送迎あり。',
      icon: 'Eye',
      badge: '私服手ぶら見学'
    },
    {
      step: '03',
      title: '手ぶら面談・条件確認',
      time: '所要時間：約10分',
      desc: '履歴書不要！顔写真付き身分証1点（免許証・マイナンバー・パスポート等）のみでOK。住民票は不要です。',
      icon: 'FileCheck',
      badge: '履歴書不要'
    },
    {
      step: '04',
      title: '即日体験入店（日払い）',
      time: '最短当日からOK',
      desc: '無料レンタル衣装に着替えて即日体入OK！仲居さんが優しく付き添います。体入終了時に稼いだ分を全額現金手渡し。合わなければ即日終了も自由です。',
      icon: 'Sparkles',
      badge: '全額即日日払い'
    },
    {
      step: '05',
      title: '本入店・お仕事スタート',
      time: '完全自由出勤制',
      desc: '気に入っていただけたら本入店へ。完全自由出勤制なので週1日〜マイペースに働けます。家具家電付き個室寮や交通費支給も即日適用。',
      icon: 'Award',
      badge: 'ノルマ・罰金ゼロ'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-rose-50/40 via-white to-pink-50/20 relative overflow-hidden" id="flow">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-2xs border border-rose-200/80">
            <LucideIcon name="GitMerge" size={14} className="text-rose-600" />
            <span>応募からお仕事開始までの流れ（簡単5ステップ）</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4 tracking-tight">
            お仕事までの簡単ステップ
            <span className="block text-base sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mt-1.5 font-sans">
              履歴書不要・私服手ぶらOK・最短即日で体験入店＆全額日払い
            </span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            応募から面接、体験入店、全額現金日払いの受け取りまでとてもスムーズ。無理な引き止めや強引な勧誘は一切ありませんのでご安心ください。
          </p>
        </div>

        {/* 5 Stepper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full -z-0 pointer-events-none group-hover:bg-rose-100/60 transition-colors" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono font-black text-2xl text-rose-600">
                    {st.step}
                  </span>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    {st.badge}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3 group-hover:bg-rose-600 group-hover:text-white transition-colors shadow-2xs">
                  <LucideIcon name={st.icon} size={18} />
                </div>

                <h3 className="font-display font-black text-sm text-zinc-900 mb-1.5 leading-snug">
                  {st.title}
                </h3>
                <p className="text-[11px] font-bold text-rose-600 mb-2">
                  {st.time}
                </p>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white text-center shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-display font-black text-lg sm:text-xl mb-1">
              まずは私服のまま見学だけでも大歓迎です！
            </h3>
            <p className="text-xs sm:text-sm text-rose-100">
              駅までの無料送迎・交通費支給あり。女性スタッフが笑顔でお迎えします。
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={onCtaclick}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-rose-50 text-rose-600 font-black text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              id="flow-cta-btn"
            >
              <LucideIcon name="MessageCircle" size={16} />
              <span>LINEで見学予約する</span>
            </button>
            <button
              type="button"
              onClick={onNavigateDetail}
              className="w-full sm:w-auto px-4 py-3 rounded-full bg-rose-800/40 hover:bg-rose-800/70 text-white font-bold text-xs border border-white/30 transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>詳しい流れ</span>
              <LucideIcon name="ArrowRight" size={13} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
