/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface JobIntroSectionProps {
  onNavigateJobDetail: () => void;
  onCtaclick: () => void;
}

export default function JobIntroSection({
  onNavigateJobDetail,
  onCtaclick,
}: JobIntroSectionProps) {
  const shiftFlow = [
    { step: 'STEP 1', title: '出勤・無料衣装に着替え', detail: '手ぶら出勤OK・身支度' },
    { step: 'STEP 2', title: '待機所で待機', detail: '空調・Wi-Fi完備で自由時間' },
    { step: 'STEP 3', title: '仲居さんの案内で接客', detail: '15分〜の個室コース対応' },
    { step: 'STEP 4', title: '全額現金受取・退勤', detail: 'その日の報酬を当日手渡し' },
  ];

  const jobTopics = [
    {
      icon: 'HeartHandshake',
      stepLabel: '01',
      title: '具体的なお仕事内容',
      body: '旅館内個室で行う15分単位のショートコース（15分〜60分）を中心とした1対1の接客です。軽い会話のあと、スキンシップ・フェラ・コンドーム着用厳守での本番行為（生本番禁止）などを行います。お茶出しや飲酒、連絡先交換・営業LINEはありません（仲居職も別途相談可）。',
    },
    {
      icon: 'ListOrdered',
      stepLabel: '02',
      title: '仕事の進め方と時間管理',
      body: '①お客様が来店すると仲居さんが受付・案内し、先にお客様がシャワー等を済ませます（キャストが店先に立つことはありません）→ ②待機所（スタンドまたは旅館）から仲居さんの呼び出しで客室へ移動し接客 → ③終了時刻は仲居さんが内線でお知らせするため時間管理も安心です。',
    },
    {
      icon: 'Coffee',
      stepLabel: '03',
      title: '勤務中の過ごし方（待機中）',
      body: '店先に座って顔を見せる待機は一切ありません。お仕事が入るまでは空調・Wi-Fiが整った待機所（スタンドまたは旅館の個室）で、スマートフォンを見たり軽食・水分補給をしたりしながら落ち着いて過ごせます。',
    },
    {
      icon: 'Clock',
      stepLabel: '04',
      title: '出勤から退勤までと片付け',
      body: 'ご希望のシフト時間に出勤し、無料貸出の衣装に着替えて待機します。お見送り後の客室片付けや清掃は仲居さんが担当するため、接客に集中しやすい流れです。終業時に当日分を全額現金でお渡しして退勤します。',
    },
    {
      icon: 'MessagesSquare',
      stepLabel: '05',
      title: '困ったときの相談先',
      body: '現場では経験豊富な仲居さんが常に近くに待機しており、手順の疑問やお客様対応で困った際もすぐフォローします。シフト調整や働き方のお悩みは、専任女性スタッフ（あおい）と公式LINEへいつでもご相談いただけます。',
    },
    {
      icon: 'ShieldCheck',
      stepLabel: '06',
      title: '未経験の方のための安全ルール',
      body: 'コンドーム着用100%徹底、泥酔客やルールを守れないお客様のお断り、ネットへの顔写真非掲載・完全源氏名制など、初めてでも安心して働けるルールを整えています。',
    },
  ];

  return (
    <section
      id="job-intro"
      className="py-16 sm:py-20 bg-white"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
            JOB DESCRIPTION
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] leading-snug mb-3 text-balance">
            初めての方にも分かる、お仕事内容
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            出勤から退勤までの流れや仕事の進め方など、当店で実際にお願いしている内容をご案内します。
          </p>
        </div>

        {/* Visual Showcase + Summary Banner (Unique Job-Specific Imagery) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6 bg-[#F7F2EC] rounded-2xl p-5 sm:p-7 border border-[#E9DFD4]">
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            <figure className="rounded-xl overflow-hidden bg-white border border-[#E9DFD4]">
              <img
                src="/images/col_one_day_flow_1792474096539.webp"
                alt="出勤から退勤までの1日の勤務イメージ"
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] object-cover"
              />
              <figcaption className="px-2.5 py-1.5 text-[11px] text-[#555555] bg-white">
                出勤〜退勤の流れイメージ
              </figcaption>
            </figure>
            <figure className="rounded-xl overflow-hidden bg-white border border-[#E9DFD4]">
              <img
                src="/images/ryokan_working_woman_1792485020272.webp"
                alt="旅館のお部屋で落ち着いた接客イメージ"
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] object-cover"
              />
              <figcaption className="px-2.5 py-1.5 text-[11px] text-[#555555] bg-white">
                接客の雰囲気イメージ
              </figcaption>
            </figure>
          </div>

          <div className="md:col-span-7 space-y-3">
            <p className="text-xs font-bold text-[#A65D79]">
              信太山新地・当店（旅館直営）ならではのポイント
            </p>
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#333333] leading-snug">
              店先での顔見せなし。当店の仲居さんの案内で進める短時間個室接客です。
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
              街頭や店先に座ってお客様を待つ必要がないため、初めての方でも落ち着いて勤務できます。お客様のご案内やお部屋の用意・片付け、時間の管理は当店の仲居さんが行うため、一人で無理に対応することはありません。
            </p>
            <p className="text-[11px] text-[#666666]">
              ※掲載写真は雰囲気をお伝えするためのイメージです。当店の実際の館内・個室・待機場所は面接・見学時に直接ご覧いただけます。
            </p>
          </div>
        </div>

        {/* Concise 4-Step Daily Shift Flow */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {shiftFlow.map((item) => (
            <div
              key={item.step}
              className="rounded-xl bg-[#FAF6F8] border border-[#EFE2E7] p-3.5 sm:p-4 flex flex-col justify-between"
            >
              <div>
                <p className="text-[11px] font-bold text-[#E85B91] tabular-nums mb-1">
                  {item.step}
                </p>
                <p className="font-display font-bold text-xs sm:text-sm text-[#333333] leading-snug mb-1">
                  {item.title}
                </p>
              </div>
              <p className="text-[11px] sm:text-xs text-[#666666] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* 6 Detailed Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
          {jobTopics.map((item) => (
            <div
              key={item.stepLabel}
              className="bg-[#FFF6F8]/60 rounded-2xl p-5 sm:p-6 border border-[#F0E2E7] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EFE2E7] flex items-center justify-center text-[#A65D79] shrink-0">
                    <LucideIcon name={item.icon} size={18} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-[#A65D79] tabular-nums">
                      {item.stepLabel}
                    </span>
                    <h3 className="font-display font-bold text-base text-[#333333] leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="/job"
            onClick={(e) => {
              e.preventDefault();
              onNavigateJobDetail();
            }}
            id="job-intro-detail-btn"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#A65D79] hover:bg-[#8E4C66] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_2px_10px_rgba(166,93,121,0.2)]"
          >
            <span>詳しい仕事内容を見る</span>
            <LucideIcon name="ArrowRight" size={16} />
          </a>
          <button
            type="button"
            onClick={onCtaclick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#FFF6F8] text-[#A65D79] font-bold text-sm border border-[#E2CED6] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LucideIcon name="MessageCircle" size={16} className="text-[#06C755]" />
            <span>仕事内容についてLINEで質問する</span>
          </button>
        </div>
      </div>
    </section>
  );
}
