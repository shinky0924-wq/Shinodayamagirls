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
  const courseRates = [
    { duration: '15分コース', pay: '3,800円〜', note: '短時間の基本コース' },
    { duration: '30分コース', pay: '7,600円〜', note: '定番・ゆったり対応' },
    { duration: '45分コース', pay: '11,400円〜', note: '長めにお話ししたい方向け' },
    { duration: '60分コース', pay: '15,200円〜', note: 'じっくり接客（以降15分毎加算）' },
  ];

  const incomeExamples = [
    {
      label: '例1｜Wワーク・短時間勤務の場合',
      condition: '週2日・1日5時間（17:00〜22:00）稼働',
      detail: '1日あたり4〜6本対応した場合の目安：日給15,200円〜22,800円前後',
      caveat: '※実際の支給額は当日のご案内本数・コース時間により変動します。',
    },
    {
      label: '例2｜昼間中心でしっかり働く場合',
      condition: '週4日・1日8時間（11:00〜19:00）稼働',
      detail: '1日あたり8〜12本対応した場合の目安：日給30,400円〜45,600円以上',
      caveat: '※時間帯・曜日・待機状況により本数は異なります。保証適用には規定時間内の待機等の条件があります。',
    },
  ];

  const salaryDetails = [
    {
      icon: 'Calculator',
      title: '報酬の計算方法',
      body: '15分ごとのコース単位で明確に決まっています（15分 3,800円 / 30分 7,600円 / 45分 11,400円 / 60分 15,200円〜）。延長時は15分ごとに加算されます。',
    },
    {
      icon: 'Banknote',
      title: '支払い日・日払いの対応条件',
      body: '勤務終了時に、その日働いた分の報酬を現金で全額お渡しする「即日全額日払い」です。体験入店の日も同様に、当日退勤時にお渡ししています。',
    },
    {
      icon: 'Receipt',
      title: '控除や費用の有無',
      body: '衣装レンタル・アメニティ・衛生費・紹介手数料などの名目による天引き・雑費控除はありません（天引き0円）。寮を利用される場合のみ、事前に明示した実費条件のみ適用されます。',
    },
    {
      icon: 'ShieldCheck',
      title: '保証制度の有無と適用条件',
      body: '未経験の方の不安を減らすため、最低時給10,000円保証や待機時間に応じた日給保証制度を設けています。対象となる出勤時間帯・連続待機時間などの適用条件は、面接時に事前にお伝えします。',
    },
    {
      icon: 'MessagesSquare',
      title: '収入についての個別相談',
      body: '「目標金額までに月どれくらい出勤すればよいか」「短時間勤務だとどれくらいになるか」など、ご希望のペースに合わせた試算もLINEで個別にお答えします。',
    },
  ];

  return (
    <section
      id="salary-overview"
      className="py-16 sm:py-20 bg-[#F7F2EC]/70 border-y border-[#ECE3D8]"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
            SALARY &amp; CONDITIONS
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] leading-snug mb-3">
            気になるお給料について、分かりやすくご説明します
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            報酬の仕組みや支払い方法など、働く前に確認しておきたい条件をご案内します。
          </p>
        </div>

        {/* Top Row: Course Rate Table + Conditional Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Course Pay Table */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#EFE2E7] p-5 sm:p-6 shadow-[0_2px_12px_rgba(166,93,121,0.04)]">
            <h3 className="font-display font-bold text-base sm:text-lg text-[#333333] mb-4 flex items-center gap-2">
              <LucideIcon name="Coins" size={18} className="text-[#E85B91]" />
              <span>コース別の報酬基準（天引きなし）</span>
            </h3>
            <div className="divide-y divide-[#F5EBEE]">
              {courseRates.map((rate) => (
                <div
                  key={rate.duration}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-bold text-sm text-[#333333]">
                      {rate.duration}
                    </div>
                    <div className="text-xs text-[#666666]">{rate.note}</div>
                  </div>
                  <div className="font-display font-bold text-lg sm:text-xl text-[#A65D79] whitespace-nowrap">
                    {rate.pay}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#666666] mt-3 pt-3 border-t border-[#F5EBEE]">
              ※上記は女性側の基本支給額です。雑費や紹介料の天引きは行いません。
            </p>
          </div>

          {/* Condition-disclosed Income Examples */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#EFE2E7] p-5 sm:p-6 shadow-[0_2px_12px_rgba(166,93,121,0.04)] flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#333333] mb-4 flex items-center gap-2">
                <LucideIcon name="BarChart3" size={18} className="text-[#E85B91]" />
                <span>勤務条件ごとの報酬例（目安）</span>
              </h3>
              <div className="space-y-3.5">
                {incomeExamples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-[#FFF6F8] border border-[#F0DFE5] p-4"
                  >
                    <p className="text-xs font-bold text-[#A65D79] mb-1">
                      {ex.label}
                    </p>
                    <p className="text-xs text-[#4A4A4A] font-medium mb-1">
                      条件：{ex.condition}
                    </p>
                    <p className="text-sm font-bold text-[#333333] mb-1">
                      {ex.detail}
                    </p>
                    <p className="text-[11px] text-[#666666] leading-relaxed">
                      {ex.caveat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-[#666666] mt-3 leading-relaxed">
              ※収入は出勤日数・勤務時間帯・お客様のご案内状況によって一人ひとり異なります。保証制度をご希望の方は、面接時に適用条件を必ずご確認ください。
            </p>
          </div>
        </div>

        {/* 5 Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
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
            <span>給料や保証条件をLINEで確認する</span>
          </button>
        </div>
      </div>
    </section>
  );
}
