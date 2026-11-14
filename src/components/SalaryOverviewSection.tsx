/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface SalaryOverviewSectionProps {
  onNavigateSalaryDetail: () => void;
  onCtaclick: () => void;
}

export default function SalaryOverviewSection({
  onNavigateSalaryDetail,
  onCtaclick,
}: SalaryOverviewSectionProps) {
  const salarySummaryStrip = [
    { label: '報酬の計算方法', value: '15分単位のコース別加算' },
    { label: '支給日・支払い', value: '当日終業時に全額現金日払い' },
    { label: '控除・天引き', value: '雑費・紹介料・衣装代 0円' },
    { label: '勤務条件の目安', value: '週1日・1日3〜4時間〜相談可' },
  ];

  const courseRates = [
    { duration: '15分コース', pay: '3,800円〜', note: '短時間の基本コース' },
    { duration: '30分コース', pay: '7,600円〜', note: '定番・ゆったり接客' },
    { duration: '45分コース', pay: '11,400円〜', note: '長めにお話ししたい方向け' },
    { duration: '60分コース', pay: '15,200円〜', note: 'じっくり接客（以降15分毎加算）' },
  ];

  const incomeExamples = [
    {
      label: '例1｜Wワーク・短時間勤務（スキマ時間）',
      condition: '週2日・1日4時間（18:00〜22:00）',
      breakdown: '15分×2本（7,600円）＋30分×1本（7,600円）〜30分×3本（22,800円）',
      detail: '日給目安：15,200円〜22,800円（月8日で約12万〜18万円目安）',
    },
    {
      label: '例2｜副業・夕方〜夜ペース',
      condition: '週3日・1日6時間（17:00〜23:00）',
      breakdown: '15分×3本＋30分×2本（26,600円）〜30分×5本（38,000円）',
      detail: '日給目安：26,600円〜38,000円（月12日で約31万〜45万円目安）',
    },
    {
      label: '例3｜日中中心でしっかり勤務',
      condition: '週4日・1日8時間（11:00〜19:00）',
      breakdown: '30分×5本（38,000円）〜30分×6本＋45分×1本（57,000円）',
      detail: '日給目安：38,000円〜57,000円（月16日で約60万〜91万円目安）',
    },
  ];

  const salaryDetails = [
    {
      icon: 'Calculator',
      title: '報酬の計算方法',
      body: '15分＝3,800円を基準に、コース時間に応じて明確に決まっています（30分7,600円・45分11,400円・60分15,200円〜）。延長時は15分ごとに加算されます。',
    },
    {
      icon: 'Banknote',
      title: '支給日（即日全額日払い）',
      body: 'その日勤務した分の報酬は、退勤時に現金で全額お渡しします。体験入店の日も同様に、当日お帰りになる際にお受け取りいただけます。',
    },
    {
      icon: 'Receipt',
      title: '控除なし（天引き0円）',
      body: '紹介所を通さないお店直接募集のため、紹介料の中抜きはありません。衣装レンタル代・待機料・雑費などの天引きも0円です。',
    },
    {
      icon: 'ShieldCheck',
      title: '保証制度と勤務条件',
      body: '最低時給10,000円保証や待機時間に応じた日給保証制度あり。対象となる出勤時間帯・連続待機時間などの条件は面接時に事前ご説明します。',
    },
  ];

  return (
    <section
      id="salary-overview"
      className="py-16 sm:py-20 bg-[#F7F2EC]/70 border-y border-[#ECE3D8]"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
            SALARY &amp; CONDITIONS
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] leading-snug mb-3 text-balance">
            気になるお給料について、分かりやすくご説明します
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            報酬の計算方法・支給日・勤務条件・条件別の収入例を応募前にご確認いただけます。
          </p>
        </div>

        {/* 4-Point Key Rules Summary Strip */}
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {salarySummaryStrip.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl border border-[#EFE2E7] p-3.5 sm:p-4 text-center sm:text-left"
            >
              <dt className="text-[11px] font-bold text-[#A65D79] mb-1">
                {item.label}
              </dt>
              <dd className="font-display font-bold text-xs sm:text-sm text-[#333333] tabular-nums">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Top Row: Course Rate Table + Conditional Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-stretch">
          {/* Course Pay Table */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EFE2E7] p-5 sm:p-6 shadow-[0_2px_12px_rgba(166,93,121,0.04)] flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#333333] mb-4 flex items-center gap-2">
                <LucideIcon name="Coins" size={18} className="text-[#E85B91]" />
                <span>コース別の報酬基準（天引きなし）</span>
              </h3>
              <div className="divide-y divide-[#F5EBEE]">
                {courseRates.map((rate) => (
                  <div
                    key={rate.duration}
                    className="py-3.5 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-sm text-[#333333]">
                        {rate.duration}
                      </div>
                      <div className="text-xs text-[#666666]">{rate.note}</div>
                    </div>
                    <div className="font-display font-bold text-lg sm:text-xl text-[#A65D79] whitespace-nowrap tabular-nums">
                      {rate.pay}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-[#666666] mt-4 pt-3 border-t border-[#F5EBEE] leading-relaxed">
              ※上記は女性側の基本支給額です。計算式はシンプルに「対応コースの合計＝当日の手取り額」となり、雑費や紹介料は引かれません。
            </p>
          </div>

          {/* Condition-disclosed Income Examples */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EFE2E7] p-5 sm:p-6 shadow-[0_2px_12px_rgba(166,93,121,0.04)] flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#333333] mb-4 flex items-center gap-2">
                <LucideIcon name="BarChart3" size={18} className="text-[#E85B91]" />
                <span>勤務条件ごとの収入例（条件・計算例つき）</span>
              </h3>
              <div className="space-y-3">
                {incomeExamples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-[#FFF6F8] border border-[#F0DFE5] p-3.5 sm:p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
                      <p className="text-xs font-bold text-[#85465F]">
                        {ex.label}
                      </p>
                      <p className="text-xs font-bold text-[#A65D79] tabular-nums">
                        条件：{ex.condition}
                      </p>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#555555] mb-1 tabular-nums">
                      内訳例：{ex.breakdown}
                    </p>
                    <p className="text-sm font-bold text-[#333333] tabular-nums">
                      {ex.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-[#666666] mt-3 leading-relaxed">
              ※上記は勤務日数・時間・コース組み合わせを揃えた試算例です。実際の支給額は当日のご案内本数やコース時間により変動します。保証制度の適用条件は面接時に事前にお伝えします。
            </p>
          </div>
        </div>

        {/* 4 Key Salary Rules Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
          {salaryDetails.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#EFE2E7] shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#FFF6F8] text-[#A65D79] flex items-center justify-center border border-[#F0DFE5] shrink-0">
                  <LucideIcon name={item.icon} size={17} />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-[#333333]">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="/salary"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSalaryDetail();
            }}
            id="salary-overview-detail-btn"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#A65D79] hover:bg-[#8E4C66] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_2px_10px_rgba(166,93,121,0.2)]"
          >
            <span>お給料・待遇を詳しく見る</span>
            <LucideIcon name="ArrowRight" size={16} />
          </a>
          <button
            type="button"
            onClick={onCtaclick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#FFF6F8] text-[#A65D79] font-bold text-sm border border-[#E2CED6] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LucideIcon name="MessageCircle" size={16} className="text-[#06C755]" />
            <span>希望のシフトでどれくらい稼げるかLINEで相談</span>
          </button>
        </div>
      </div>
    </section>
  );
}
