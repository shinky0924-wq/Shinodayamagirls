/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LucideIcon from './LucideIcon';

interface SalaryPageContentProps {
  onCtaclickWithData: (data: string) => void;
}

export default function SalaryPageContent({
  onCtaclickWithData,
}: SalaryPageContentProps) {
  // Simulator State
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [sessionsPerDay, setSessionsPerDay] = useState(4);

  const rewardPerSession = 12000;
  const dailyEarnings = sessionsPerDay * rewardPerSession;
  const weeklyEarnings = dailyEarnings * daysPerWeek;
  const monthlyEarnings = weeklyEarnings * 4.2;

  const workingFormatter = (num: number) => {
    return Math.floor(num).toLocaleString();
  };

  const handleShareToForm = () => {
    const dataMessage = `【給料について相談】給料シミュレーター希望：週${daysPerWeek}日・1日${sessionsPerDay}回接客 (月収目安: 約${workingFormatter(monthlyEarnings)}円)`;
    onCtaclickWithData(dataMessage);
  };

  return (
    <div className="space-y-8">
      {/* 1. 15分単位コース料金・手取り支給額・時給換算表 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200/90 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-amber-500 rounded-full inline-block" />
            <h2 className="font-display font-black text-lg sm:text-xl text-zinc-900">
              15分単位の明確な給料体系＆時給換算表
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            手取り100%支給・天引きゼロ
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 mb-5 leading-relaxed">
          信太山新地の当店では最短15分単位の明朗会計を徹底しています。短時間接客・高回転で効率よく稼ぐことができ、他店のような待機料や厚生費の引かれ物は一切ありません。日給5万〜10万円以上を確実に目指せる当店の高待遇へぜひご応募ください。
        </p>

        <div className="overflow-x-auto scrollbar-thin mb-6">
          <table className="w-full text-xs sm:text-sm border-collapse min-w-[540px]">
            <caption className="sr-only">信太山新地のコース別手取り報酬および時給換算表</caption>
            <thead>
              <tr className="bg-amber-100/70 border-b border-amber-200 text-amber-950">
                <th scope="col" className="py-3 px-4 text-left font-bold w-[22%]">コース時間</th>
                <th scope="col" className="py-3 px-4 text-left font-bold w-[26%]">キャスト手取り支給額</th>
                <th scope="col" className="py-3 px-4 text-left font-bold w-[26%]">時給換算相当額</th>
                <th scope="col" className="py-3 px-4 text-left font-bold w-[26%]">特徴・ポイント</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100/80 bg-white">
              <tr className="hover:bg-amber-50/30">
                <th scope="row" className="py-3.5 px-4 font-bold text-zinc-900 text-left">15分コース</th>
                <td className="py-3.5 px-4 font-black text-rose-600 text-base">3,800円</td>
                <td className="py-3.5 px-4 font-bold text-zinc-800">時給換算 約15,200円</td>
                <td className="py-3.5 px-4 text-zinc-600">最短短時間コース。サクッと高回転で稼ぐ</td>
              </tr>
              <tr className="hover:bg-amber-50/30">
                <th scope="row" className="py-3.5 px-4 font-bold text-zinc-900 text-left">30分コース</th>
                <td className="py-3.5 px-4 font-black text-rose-600 text-base">7,600円</td>
                <td className="py-3.5 px-4 font-bold text-zinc-800">時給換算 約15,200円</td>
                <td className="py-3.5 px-4 text-zinc-600">定番人気コース。ゆったり世間話とおもてなし</td>
              </tr>
              <tr className="hover:bg-amber-50/30">
                <th scope="row" className="py-3.5 px-4 font-bold text-zinc-900 text-left">45分コース</th>
                <td className="py-3.5 px-4 font-black text-rose-600 text-base">11,400円</td>
                <td className="py-3.5 px-4 font-bold text-zinc-800">時給換算 約15,200円</td>
                <td className="py-3.5 px-4 text-zinc-600">リラックス接客。仲居さんが時間管理</td>
              </tr>
              <tr className="hover:bg-amber-50/30">
                <th scope="row" className="py-3.5 px-4 font-bold text-zinc-900 text-left">60分コース</th>
                <td className="py-3.5 px-4 font-black text-rose-600 text-base">15,200円</td>
                <td className="py-3.5 px-4 font-bold text-zinc-800">時給換算 約15,200円</td>
                <td className="py-3.5 px-4 text-zinc-600">以降15分毎に3,800円加算。延長時も高バック</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3大給与保証制度 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs pt-4 border-t border-amber-100">
          <div className="p-4 bg-gradient-to-b from-amber-50 to-orange-50/40 rounded-2xl border border-amber-200/90 shadow-2xs">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold mb-1">
              <LucideIcon name="ShieldCheck" size={16} className="text-amber-600" />
              <span className="text-sm font-black">時給1万円保証制度</span>
            </div>
            <p className="text-zinc-600 text-xs leading-relaxed">
              客足に関係なく時給10,000円保証を完備。初心者の方でも「待機損」の心配なく安定した収入を得られます。
            </p>
          </div>

          <div className="p-4 bg-gradient-to-b from-amber-50 to-orange-50/40 rounded-2xl border border-amber-200/90 shadow-2xs">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold mb-1">
              <LucideIcon name="Clock" size={16} className="text-amber-600" />
              <span className="text-sm font-black">12時間待機で日給保証</span>
            </div>
            <p className="text-zinc-600 text-xs leading-relaxed">
              12時間のフル待機シフトなら日給8万〜10万円保証。短期でしっかりまとまった貯金を作りたい方に最適です。
            </p>
          </div>

          <div className="p-4 bg-gradient-to-b from-amber-50 to-orange-50/40 rounded-2xl border border-amber-200/90 shadow-2xs">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold mb-1">
              <LucideIcon name="Coins" size={16} className="text-amber-600" />
              <span className="text-sm font-black">退勤時に全額手渡し日払い</span>
            </div>
            <p className="text-zinc-600 text-xs leading-relaxed">
              勤務終了後、その日の稼ぎを全額現金手渡し。銀行振込ではないため通帳に記録が残らず、身バレ防止も万全です。
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Salary Simulator */}
      <div className="bg-gradient-to-br from-amber-50/60 via-white to-orange-50/30 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm" id="salary-simulator">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="bg-amber-600 text-white font-display font-extrabold text-[10px] tracking-wide px-2.5 py-1 rounded-full uppercase shadow-2xs">
                EARNINGS SIMULATOR
              </span>
              <h3 className="font-display font-extrabold text-lg sm:text-2xl text-zinc-900 mt-2.5 mb-1.5">
                1分でわかる！信太山新地 給料シミュレーター
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                週の出勤日数と1日の目安接客数を選ぶだけで、あなたのリアルな見込み手取り収入を即座に計算します。
              </p>
            </div>

            {/* Days slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-zinc-800 flex items-center gap-1.5">
                  <LucideIcon name="Calendar" size={16} className="text-amber-600" />
                  <span>週の勤務日数:</span>
                </label>
                <span className="font-display font-extrabold text-amber-700 text-base">
                  週 <span className="text-xl font-black">{daysPerWeek}</span> 日
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                className="w-full accent-amber-600 h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-bold px-1">
                <span>週1日 (副業・お試し)</span>
                <span>週3日 (レギュラー)</span>
                <span>週5〜6日 (本気で稼ぐ)</span>
              </div>
            </div>

            {/* Sessions slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="font-bold text-zinc-800 flex items-center gap-1.5">
                  <LucideIcon name="Briefcase" size={16} className="text-amber-600" />
                  <span>1日の目安接客数:</span>
                </label>
                <span className="font-display font-extrabold text-amber-700 text-base">
                  1日 <span className="text-xl font-black">{sessionsPerDay}</span> 回
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                value={sessionsPerDay}
                onChange={(e) => setSessionsPerDay(Number(e.target.value))}
                className="w-full accent-amber-600 h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-bold px-1">
                <span>マイペース (2回)</span>
                <span>のんびり (4回)</span>
                <span>大活躍 (8回以上)</span>
              </div>
            </div>
          </div>

          {/* Result display */}
          <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-amber-200/90 shadow-md flex flex-col justify-between h-full">
            <div className="space-y-3.5">
              <span className="text-[10px] font-extrabold text-zinc-400 block tracking-wide uppercase">
                ESTIMATED NET EARNINGS
              </span>
              
              <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                <span className="text-xs font-bold text-zinc-600">日給目安:</span>
                <span className="font-display font-black text-sm text-zinc-800">
                  約 {workingFormatter(dailyEarnings)} 円
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                <span className="text-xs font-bold text-zinc-600">週給目安:</span>
                <span className="font-display font-black text-sm text-zinc-800">
                  約 {workingFormatter(weeklyEarnings)} 円
                </span>
              </div>

              <div className="bg-amber-50/80 border border-amber-200/70 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-amber-800 mb-0.5">【月収見込み目安】</span>
                <span className="font-display font-black text-2xl sm:text-3xl text-amber-700">
                  約 {workingFormatter(monthlyEarnings)} <span className="text-sm font-sans font-bold">円</span>
                </span>
              </div>

              <p className="text-[10px] text-amber-900/80 leading-normal bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                ※15分単位の短時間コース制（15分3,800円〜）と時給1万円保証、日給5万〜10万円実績に基づく試算です。手取り100%支給で天引きは一切ありません。
              </p>
            </div>

            <button
              type="button"
              onClick={handleShareToForm}
              className="mt-4 w-full bg-[#06c755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LucideIcon name="MessageCircle" size={16} className="fill-white" />
              <span>信太山新地の当店へ応募！希望給料をLINEで相談する</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. 出勤モデル別のリアル月収実績 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-sm">
        <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-3 flex items-center gap-2">
          <LucideIcon name="TrendingUp" size={17} className="text-amber-600" />
          <span>ライフスタイル別 リアル収入モデル</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100">
            <span className="font-bold text-amber-900 block mb-1">週1日・週末Wワーク（月4日）</span>
            <p className="text-zinc-600 leading-relaxed">
              1日5万円接客 × 月4日 ＝ <strong className="text-rose-700 font-black">月収 約20万円</strong>
              <br /><span className="text-[11px] text-zinc-500">本業の給料にプラスして無理なく貯金</span>
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100">
            <span className="font-bold text-amber-900 block mb-1">週3日・マイペース勤務（月12日）</span>
            <p className="text-zinc-600 leading-relaxed">
              1日6万円接客 × 月12日 ＝ <strong className="text-rose-700 font-black">月収 約72万円</strong>
              <br /><span className="text-[11px] text-zinc-500">プライベートを充実させつつ半年で300万貯金</span>
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100">
            <span className="font-bold text-amber-900 block mb-1">週5日・レギュラーフル勤務（月20日）</span>
            <p className="text-zinc-600 leading-relaxed">
              1日8〜10万円 × 月20日 ＝ <strong className="text-rose-700 font-black">月収 約160万〜200万円</strong>
              <br /><span className="text-[11px] text-zinc-500">短期集中で1,000万円貯金達成者多数</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
