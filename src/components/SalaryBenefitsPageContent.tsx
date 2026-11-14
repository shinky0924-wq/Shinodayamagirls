/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface SalaryBenefitsPageContentProps {
  onCtaclick: () => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onInjectedScroll?: (msg: string) => void;
}

export default function SalaryBenefitsPageContent({
  onCtaclick,
  onInjectedScroll,
}: SalaryBenefitsPageContentProps) {
  // 4. 収入シミュレーター State（15分コース 3,800円中心）
  const baseCourseReward = 3800;
  const [sessionsPerDay, setSessionsPerDay] = useState<number>(20);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const weeksPerMonth = 4;

  const dailyEarnings = baseCourseReward * sessionsPerDay;
  const weeklyEarnings = dailyEarnings * daysPerWeek;
  const monthlyEarnings = dailyEarnings * daysPerWeek * weeksPerMonth;

  // 8. FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleLineClick = (e: React.MouseEvent) => {
    const msg = `【給料・待遇について相談】給与シミュレーション：15分コース基準（3,800円）・1日${sessionsPerDay}本・週${daysPerWeek}日（月収目安：約${monthlyEarnings.toLocaleString()}円）について詳しく聞いてみたいです。`;
    if (onInjectedScroll) {
      e.preventDefault();
      onInjectedScroll(msg);
    } else if (onCtaclick) {
      e.preventDefault();
      onCtaclick();
    }
  };

  // 8. 給与・待遇に関するFAQ (9問)
  const salaryFaqs = [
    {
      q: 'お給料はいつ受け取れますか？',
      a: '退勤時にその場で全額現金手渡しとなります。その日の売上や保証分はその日のうちに100%全額受け取ってお持ち帰りいただけます。'
    },
    {
      q: '全額日払いは可能ですか？',
      a: 'はい、完全全額即日日払いです。「一部だけ日払いで残りは月払い」といった分割や保留は一切ありません。'
    },
    {
      q: '給料から引かれるものはありますか？',
      a: 'いいえ、一切ありません。スカウト業者や仲介所を介さない老舗旅館直営のため、紹介料・待機料・厚生費・衣装代などの天引き・控除は完全0円です。手取り100%が支給されます。'
    },
    {
      q: 'コースごとの受取額はいくらですか？',
      a: '15分3,800円、30分7,600円、45分11,400円、60分15,200円です。以降15分延長ごとに3,800円が加算されます。お客様料金ではなく、女性の手取り受取額です。'
    },
    {
      q: '指名料やオプションの扱いは？',
      a: '指名料や延長バックは女性へ全額還元されます。店舗による中間搾取や引かれ物は一切ありません。'
    },
    {
      q: '待機中に給与は発生しますか？',
      a: '当店では未経験の方向けに【時給1万円保証】や【待機日給保証】制度を設けています。客足が読めない日でも安心して勤務していただけます。'
    },
    {
      q: '交通費や送迎の条件は？',
      a: '信太山駅や主要駅・指定場所からの女性専用無料送迎車を常時運行しています。また、遠方や出稼ぎからお越しの方には、新幹線・飛行機などの往復交通費を全額支給（規定あり）いたします。'
    },
    {
      q: '出勤日数や勤務時間は相談できますか？',
      a: 'はい、完全自由出勤制です。「週1日だけ」「平日お昼の3時間だけ」「仕事帰りの夜だけ」「週末のみ」など、希望に合わせて100%自由に設定できます。出勤ノルマやペナルティは一切ありません。'
    },
    {
      q: '未経験でも同じ給与体系ですか？',
      a: 'はい、未経験でも経験者でも給与バックの条件は全く同じです。未経験だからといってバック率が下がることは一切ありませんのでご安心ください。'
    }
  ];

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

      {/* 1. メインタイトル */}
      <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* 左側：タイトルと説明文 */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#D8175D] uppercase mb-2">
              SALARY & BENEFITS
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1F2432] leading-tight mb-2 tracking-tight">
              給料・待遇について
            </h1>
            <p className="text-sm sm:text-base font-bold text-[#D8175D] mb-4">
              頑張った分が分かりやすい給与体系。
            </p>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
              当店のコース別給与や支払い方法、勤務スタイルに合わせた収入例、働く女性をサポートする待遇をご紹介します。応募前に気になる条件を一つずつご確認ください。
            </p>
            <div className="flex flex-wrap gap-2">
              {['即日全額日払い', '雑費天引きゼロ（手取り100%）', '時給1万円保証完備', '往復交通費全額支給'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-[#FFF1F5] text-[#D8175D] text-xs font-bold px-3 py-1 rounded-full border border-[#F0DDE4]"
                >
                  <LucideIcon name="Check" size={13} />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 右側：実際の旅館・待機環境の写真 */}
          <div className="w-full md:w-[42%] lg:w-[40%] shrink-0">
            <div className="relative rounded-[20px] overflow-hidden border border-[#F0DDE4] shadow-sm aspect-[4/3] bg-[#FFF1F5]">
              <img
                src="/images/col_bonus_envelope_jp_1792476753315.webp"
                alt="信太山新地 当店の給与・全額即日日払い"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                width={480}
                height={360}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-[10px] text-center border border-white/20">
                全額即日現金手渡し・引かれ物一切ゼロ
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 最初に知りたい4つの給与条件 */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* ① 女性の受取額 */}
          <div className="bg-white rounded-[18px] p-4 sm:p-5 border border-[#F0DDE4] shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F5] border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3">
              <LucideIcon name="Coins" size={19} />
            </div>
            <span className="text-[11px] font-bold text-[#777777] block mb-0.5">① 女性の受取額</span>
            <span className="font-display font-black text-lg sm:text-xl text-[#D8175D] block mb-1">
              コース別に明記
            </span>
            <p className="text-[11px] text-[#555555] leading-snug">
              15分3,800円〜・30分7,600円〜など実際の受取額を表示。
            </p>
          </div>

          {/* ② 給与の支払い */}
          <div className="bg-white rounded-[18px] p-4 sm:p-5 border border-[#F0DDE4] shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F5] border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3">
              <LucideIcon name="Banknote" size={19} />
            </div>
            <span className="text-[11px] font-bold text-[#777777] block mb-0.5">② 給与の支払い</span>
            <span className="font-display font-black text-lg sm:text-xl text-[#1F2432] block mb-1">
              全額日払い
            </span>
            <p className="text-[11px] text-[#555555] leading-snug">
              退勤時にその場で全額現金手渡し（即日受取）。
            </p>
          </div>

          {/* ③ 天引き・控除 */}
          <div className="bg-white rounded-[18px] p-4 sm:p-5 border border-[#F0DDE4] shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F5] border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3">
              <LucideIcon name="ShieldCheck" size={19} />
            </div>
            <span className="text-[11px] font-bold text-[#777777] block mb-0.5">③ 天引き・控除</span>
            <span className="font-display font-black text-lg sm:text-xl text-[#1F2432] block mb-1">
              完全ゼロ（0円）
            </span>
            <p className="text-[11px] text-[#555555] leading-snug">
              待機料・厚生費・紹介料なし（手取り100%）。
            </p>
          </div>

          {/* ④ 勤務スタイル */}
          <div className="bg-white rounded-[18px] p-4 sm:p-5 border border-[#F0DDE4] shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F5] border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3">
              <LucideIcon name="Calendar" size={19} />
            </div>
            <span className="text-[11px] font-bold text-[#777777] block mb-0.5">④ 勤務スタイル</span>
            <span className="font-display font-black text-lg sm:text-xl text-[#1F2432] block mb-1">
              希望を相談
            </span>
            <p className="text-[11px] text-[#555555] leading-snug">
              週1日〜・短時間OK・出勤ノルマ一切なし。
            </p>
          </div>
        </div>
      </section>

      {/* 3. コース別の給与一覧 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="Table" size={13} />
            <span>明朗会計・受取保証</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-2">
            コース別・女性の受取給与一覧
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            接客コースごとの女性の受取額を掲載しています。お客様の利用料金ではなく、女性に支払われる金額をご確認ください。
          </p>
        </div>

        {/* コース別テーブル */}
        <div className="overflow-x-auto scrollbar-thin mb-6 rounded-[16px] border border-[#F0DDE4]">
          <table className="w-full text-xs sm:text-sm border-collapse min-w-[580px]">
            <thead>
              <tr className="bg-[#FFF1F5] text-[#1F2432] border-b border-[#F0DDE4]">
                <th scope="col" className="py-3.5 px-4 text-left font-bold w-[20%]">コース時間</th>
                <th scope="col" className="py-3.5 px-4 text-left font-bold w-[26%]">女性の受取給与額</th>
                <th scope="col" className="py-3.5 px-4 text-left font-bold w-[24%]">指名・オプション・延長</th>
                <th scope="col" className="py-3.5 px-4 text-left font-bold w-[15%]">支払い方法</th>
                <th scope="col" className="py-3.5 px-4 text-left font-bold w-[15%]">控除・手数料</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0DDE4]/80 bg-white">
              <tr className="hover:bg-[#FFFAFC] transition-colors">
                <th scope="row" className="py-4 px-4 font-bold text-[#1F2432] text-left">
                  15分コース
                  <span className="block text-[10px] text-[#777777] font-normal">最短短時間接客</span>
                </th>
                <td className="py-4 px-4">
                  <span className="font-display font-black text-lg sm:text-xl text-[#D8175D]">3,800円</span>
                  <span className="block text-[10px] text-zinc-500 font-medium">時給換算 約15,200円</span>
                </td>
                <td className="py-4 px-4 text-xs text-[#555555]">
                  延長15分毎に+3,800円加算<br />指名料全額還元
                </td>
                <td className="py-4 px-4 text-xs font-bold text-[#1F2432]">
                  全額即日日払い
                </td>
                <td className="py-4 px-4 text-xs font-bold text-[#D8175D]">
                  天引きなし（0円）
                </td>
              </tr>

              <tr className="hover:bg-[#FFFAFC] transition-colors">
                <th scope="row" className="py-4 px-4 font-bold text-[#1F2432] text-left">
                  30分コース
                  <span className="block text-[10px] text-[#777777] font-normal">定番・一番人気</span>
                </th>
                <td className="py-4 px-4">
                  <span className="font-display font-black text-lg sm:text-xl text-[#D8175D]">7,600円</span>
                  <span className="block text-[10px] text-zinc-500 font-medium">時給換算 約15,200円</span>
                </td>
                <td className="py-4 px-4 text-xs text-[#555555]">
                  延長15分毎に+3,800円加算<br />指名料全額還元
                </td>
                <td className="py-4 px-4 text-xs font-bold text-[#1F2432]">
                  全額即日日払い
                </td>
                <td className="py-4 px-4 text-xs font-bold text-[#D8175D]">
                  天引きなし（0円）
                </td>
              </tr>

              <tr className="hover:bg-[#FFFAFC] transition-colors">
                <th scope="row" className="py-4 px-4 font-bold text-[#1F2432] text-left">
                  45分コース
                  <span className="block text-[10px] text-[#777777] font-normal">ゆったり接客</span>
                </th>
                <td className="py-4 px-4">
                  <span className="font-display font-black text-lg sm:text-xl text-[#D8175D]">11,400円</span>
                  <span className="block text-[10px] text-zinc-500 font-medium">時給換算 約15,200円</span>
                </td>
                <td className="py-4 px-4 text-xs text-[#555555]">
                  延長15分毎に+3,800円加算<br />指名料全額還元
                </td>
                <td className="py-4 px-4 text-xs font-bold text-[#1F2432]">
                  全額即日日払い
                </td>
                <td className="py-4 px-4 text-xs font-bold text-[#D8175D]">
                  天引きなし（0円）
                </td>
              </tr>

              <tr className="hover:bg-[#FFFAFC] transition-colors">
                <th scope="row" className="py-4 px-4 font-bold text-[#1F2432] text-left">
                  60分コース
                  <span className="block text-[10px] text-[#777777] font-normal">高額バックコース</span>
                </th>
                <td className="py-4 px-4">
                  <span className="font-display font-black text-lg sm:text-xl text-[#D8175D]">15,200円</span>
                  <span className="block text-[10px] text-zinc-500 font-medium">以降15分毎に+3,800円加算</span>
                </td>
                <td className="py-4 px-4 text-xs text-[#555555]">
                  延長15分毎に+3,800円加算<br />指名料全額還元
                </td>
                <td className="py-4 px-4 text-xs font-bold text-[#1F2432]">
                  全額即日日払い
                </td>
                <td className="py-4 px-4 text-xs font-bold text-[#D8175D]">
                  天引きなし（0円）
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 給与保証制度のハイライト */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          <div className="p-4 bg-[#FFF5F8] rounded-[16px] border border-[#F0DDE4] flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0 mt-0.5">
              <LucideIcon name="ShieldCheck" size={17} />
            </div>
            <div>
              <span className="font-bold text-sm text-[#1F2432] block mb-0.5">
                時給1万円保証制度
              </span>
              <p className="text-xs text-[#555555] leading-relaxed">
                未経験の方でも安心してスタートできるよう、客足に関わらず時給1万円を保証する制度を完備しています。
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#FFF5F8] rounded-[16px] border border-[#F0DDE4] flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0 mt-0.5">
              <LucideIcon name="CalendarCheck" size={17} />
            </div>
            <div>
              <span className="font-bold text-sm text-[#1F2432] block mb-0.5">
                待機日給保証制度
              </span>
              <p className="text-xs text-[#555555] leading-relaxed">
                お部屋に入れない時間があっても保証日給を支給。手ぶらで帰るようなことは絶対にありません。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 収入シミュレーター */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            SIMULATOR
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-2">
            あなたの希望する働き方で収入をシミュレーション
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            15分コース（受取額3,800円）が多めの実態に合わせて、1日の接客本数や週の出勤日数から収入の目安を確認できます。
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-[#FFFAFC] rounded-[20px] p-5 sm:p-7 border border-[#F0DDE4]">
          {/* コントロール項目 */}
          <div className="space-y-5 mb-7">
            {/* 1日の接客人数（15分コース中心） */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#1F2432]">
                  1日の接客人数（15分コース中心）:
                </label>
                <span className="font-mono font-black text-[#D8175D] text-base">
                  {sessionsPerDay}本{sessionsPerDay > 30 ? '（30本超え）' : ''}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={35}
                step={1}
                value={sessionsPerDay}
                onChange={(e) => setSessionsPerDay(parseInt(e.target.value, 10))}
                className="w-full accent-[#D8175D] cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>少なくて10本</span>
                <span>普通で20本</span>
                <span>多くて30本超え</span>
              </div>
            </div>

            {/* 週の出勤日数 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#1F2432]">
                  週の出勤日数:
                </label>
                <span className="font-mono font-black text-[#D8175D] text-base">
                  週{daysPerWeek}日
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                step={1}
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(parseInt(e.target.value, 10))}
                className="w-full accent-[#D8175D] cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                <span>週1日（お小遣い）</span>
                <span>週3日（一番人気）</span>
                <span>週5〜6日（高収入）</span>
              </div>
            </div>
          </div>

          {/* 計算結果表示 */}
          <div className="bg-white rounded-[16px] p-5 sm:p-6 border border-[#F0DDE4] text-center shadow-xs">
            <span className="text-[11px] font-bold text-[#777777] block mb-1">
              計算上の月間受取額（目安）
            </span>
            <div className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#D8175D] leading-none my-2 tracking-tight">
              約 {monthlyEarnings.toLocaleString()} <span className="text-xl sm:text-2xl font-bold text-[#1F2432]">円</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs text-[#555555] mt-3 pt-3 border-t border-[#F0DDE4]">
              <span>1日の目安：約{dailyEarnings.toLocaleString()}円</span>
              <span>·</span>
              <span>週間の目安：約{weeklyEarnings.toLocaleString()}円</span>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="mt-4 p-3 bg-white/60 rounded-[12px] border border-[#F0DDE4] text-[11px] text-[#777777] leading-relaxed">
            <p className="font-bold text-[#1F2432] mb-0.5">※ シミュレーションに関する注意事項：</p>
            <p>
              ・信太山新地では15分コース（受取額3,800円）が多いため、1本3,800円を基準に計算上の目安を表示しています（30分7,600円などのコースや延長・指名等も実際にはございます）。接客人数や勤務機会を保証するものではありません。<br />
              ・当店は雑費・待機料・紹介料などの天引き・控除は一切ありません（控除0円・手取り100%）。
            </p>
          </div>
        </div>
      </section>

      {/* 5. 働き方別の収入例 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            WORK STYLE EXAMPLES
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-2">
            あなたに合った働き方を考えてみましょう。
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            生活スタイルや目標金額に合わせて、実際に多くの女性が選んでいる3つの勤務スタイルをご紹介します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ① 短時間勤務 */}
          <div className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div>
              <span className="inline-block text-[10px] font-bold text-[#D8175D] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full border border-[#F0DDE4] mb-2">
                副業・Wワーク向け
              </span>
              <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-2">
                ① 短時間勤務
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed mb-4">
                昼間の本業や学業、家庭を最優先にしながら、空いた時間で無理なく副収入を得たい女性向けです。
              </p>
              <div className="space-y-1.5 text-xs text-[#1F2432] bg-white p-3 rounded-[12px] border border-[#F0DDE4] mb-3">
                <div className="flex justify-between">
                  <span className="text-[#777777]">出勤ペース:</span>
                  <span className="font-bold">週1〜2日（1日3〜4時間）</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">1日の受取目安:</span>
                  <span className="font-bold">約22,800円〜38,000円</span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-[#F0DDE4]">
              <span className="text-[10px] text-[#777777] block">月間受取の目安</span>
              <span className="font-display font-black text-xl text-[#D8175D]">
                約 12万〜25万円
              </span>
            </div>
          </div>

          {/* ② 週2〜3日勤務 */}
          <div className="bg-[#FFFAFC] rounded-[18px] p-5 border-2 border-[#D8175D]/40 flex flex-col justify-between shadow-xs relative">
            <span className="absolute -top-2.5 right-4 bg-[#D8175D] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-2xs">
              一番人気
            </span>
            <div>
              <span className="inline-block text-[10px] font-bold text-[#D8175D] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full border border-[#F0DDE4] mb-2">
                生活と両立
              </span>
              <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-2">
                ② 週2〜3日勤務
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed mb-4">
                プライベートの時間も十分に確保しながら、毎月安定したまとまった高収入を得たい女性向けです。
              </p>
              <div className="space-y-1.5 text-xs text-[#1F2432] bg-white p-3 rounded-[12px] border border-[#F0DDE4] mb-3">
                <div className="flex justify-between">
                  <span className="text-[#777777]">出勤ペース:</span>
                  <span className="font-bold">週2〜3日（1日5〜6時間）</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">1日の受取目安:</span>
                  <span className="font-bold">約38,000円〜60,800円</span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-[#F0DDE4]">
              <span className="text-[10px] text-[#777777] block">月間受取の目安</span>
              <span className="font-display font-black text-xl text-[#D8175D]">
                約 30万〜55万円
              </span>
            </div>
          </div>

          {/* ③ 週4〜5日勤務 */}
          <div className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div>
              <span className="inline-block text-[10px] font-bold text-[#D8175D] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full border border-[#F0DDE4] mb-2">
                高収入・集中稼働
              </span>
              <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-2">
                ③ 週4〜5日勤務
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed mb-4">
                貯金目標の達成や出稼ぎ、短期集中でしっかり勤務して大きな収入を目指したい女性向けです。
              </p>
              <div className="space-y-1.5 text-xs text-[#1F2432] bg-white p-3 rounded-[12px] border border-[#F0DDE4] mb-3">
                <div className="flex justify-between">
                  <span className="text-[#777777]">出勤ペース:</span>
                  <span className="font-bold">週4〜5日（1日6〜7時間）</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777777]">1日の受取目安:</span>
                  <span className="font-bold">約60,800円〜98,800円</span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-[#F0DDE4]">
              <span className="text-[10px] text-[#777777] block">月間受取の目安</span>
              <span className="font-display font-black text-xl text-[#D8175D]">
                約 70万〜120万円以上
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 当店の待遇・福利厚生（8つの待遇カード） */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="Gift" size={13} />
            <span>充実の厚待遇</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            働きやすさを支える当店の待遇・サポート
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: '① 全額日払い',
              desc: '退勤時にその場で全額現金手渡し。翌日以降への繰り越しや天引きは一切ありません。',
              icon: 'Banknote'
            },
            {
              title: '② 旅館直営の個室待機',
              desc: '清潔で落ち着いた旅館の個室で待機。Wi-Fi・冷暖房・充電器完備でプライベートが守られます。',
              icon: 'Home'
            },
            {
              title: '③ 送迎対応',
              desc: '信太山駅・主要駅・指定場所からの女性専用無料送迎車を常時運行。雨の日や夜間も安心です。',
              icon: 'Car'
            },
            {
              title: '④ 交通費支給',
              desc: '全国からの往復交通費を全額支給（新幹線・飛行機代含む／規定あり）。遠方からの出稼ぎも大歓迎。',
              icon: 'Train'
            },
            {
              title: '⑤ 自由出勤・シフト相談',
              desc: '完全自由出勤制。出勤ノルマ・ペナルティ・罰金ゼロ。テスト期間や繁忙期の長期休暇も自由。',
              icon: 'CalendarCheck'
            },
            {
              title: '⑥ 女性スタッフのサポート',
              desc: '応募・面接・体験入店から日常の悩み相談まで、専任女性スタッフ（あおい）が親身に伴走。',
              icon: 'Smile'
            },
            {
              title: '⑦ 顔出し不要の接客',
              desc: '飛田新地のように店先に座る顔見せは一切なし。写真のネット掲載禁止・路上撮影禁止で身バレ防止。',
              icon: 'EyeOff'
            },
            {
              title: '⑧ 未経験者へのサポート',
              desc: '入室の流れや安全ルール・接客マナーを女性スタッフや仲居さんが丁寧に付き添い指導。約90%が未経験スタートです。',
              icon: 'Sparkles'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3 shadow-2xs">
                  <LucideIcon name={item.icon} size={19} />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. 当店を選ぶメリット（他店比較表を削除し、当店の環境を紹介） */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            WHY CHOOSE US
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            信太山新地で働くなら、当店の環境もご確認ください。
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: '旅館直営の待機環境',
              desc: '老舗旅館直営だからこそ、清潔な客室での完全個室待機を実現。他人の視線を気にせず過ごせます。',
              icon: 'Building2'
            },
            {
              title: '店先で顔を出さない接客スタイル',
              desc: '衣装を着て通りに座る必要は一切ありません。個室待機・内線呼び出しでプライバシーを守ります。',
              icon: 'ShieldCheck'
            },
            {
              title: '女性スタッフによるサポート',
              desc: '男性スタッフには話しづらいことも、女性相談窓口（あおい）にいつでも気兼ねなく相談できます。',
              icon: 'HeartHandshake'
            },
            {
              title: '給与体系の事前説明',
              desc: '面接時に手取り額や条件を包み隠さず明示。後から不明瞭な天引きが発生することは一切ありません。',
              icon: 'FileText'
            },
            {
              title: '送迎・交通費のサポート',
              desc: '主要駅からの女性専用無料送迎車と、遠方からの往復交通費支給で通いやすさをサポートします。',
              icon: 'Car'
            },
            {
              title: '生活に合わせた勤務相談',
              desc: '週1日・短時間・お昼のみなど、ご自身の生活や体調を最優先にシフトを自由に相談いただけます。',
              icon: 'Clock'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[16px] p-4 sm:p-5 border border-[#F0DDE4] flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0 mt-0.5 shadow-2xs">
                <LucideIcon name={item.icon} size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-[#1F2432] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. 給与・待遇に関するFAQ */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="HelpCircle" size={13} />
            <span>Q&A</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            給料・待遇についてのよくある質問
          </h2>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {salaryFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-[16px] border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-[#D8175D]/40 bg-[#FFF5F8]/40 ring-1 ring-[#D8175D]/20'
                    : 'border-[#F0DDE4] bg-[#FFFAFC] hover:border-[#D8175D]/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span className="font-bold text-xs sm:text-sm text-[#1F2432] flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#D8175D] text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      Q
                    </span>
                    <span className="leading-snug">{faq.q}</span>
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0">
                    <LucideIcon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-[#555555] leading-relaxed border-t border-[#F0DDE4]/60 bg-white">
                    <div className="flex items-start gap-2.5 pt-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        A
                      </span>
                      <p className="leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. 最後の応募・相談エリア */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-3">
          <LucideIcon name="MessageCircle" size={13} />
          <span>LINEで気軽に質問OK</span>
        </div>

        <h2 className="font-display font-extrabold text-lg sm:text-xl md:text-[22px] text-[#1F2432] mb-2">
          給料や待遇について、気になることはありませんか？
        </h2>

        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-lg mx-auto">
          お給料の仕組みや支払い方法、勤務日数など、気になることは何でもご相談ください。応募するか迷っている方も、まずはお気軽にお問い合わせください。
        </p>

        <div className="flex flex-col items-center">
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLineClick}
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#06C755]/25 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            id="salary-page-line-cta-btn"
          >
            <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
            <span>LINEで給与・待遇について相談する</span>
          </a>

          <span className="text-xs text-[#777777] font-medium mt-2.5">
            応募前の質問だけでも大歓迎です。
          </span>
        </div>
      </section>

    </div>
  );
}
