/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface WorkFlowSectionProps {
  onCtaclick?: () => void;
  onNavigateDetail?: () => void;
}

interface StepItem {
  step: string;
  title: string;
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
      title: 'LINEでお問い合わせ',
      desc: 'まずは公式LINEから、気になる点やご希望（曜日・時間帯・質問のみでも可）をお送りください。',
      icon: 'MessageCircle',
    },
    {
      step: '02',
      title: '仕事内容・条件のご説明',
      desc: 'お仕事の内容、報酬の仕組み、待機環境やルールについて事前に分かりやすくご案内します。',
      icon: 'FileText',
    },
    {
      step: '03',
      title: '面接・相談',
      desc: '実際のお店にお越しいただき（履歴書不要・私服OK）、ご希望を伺いながら館内の雰囲気もご確認いただけます。',
      icon: 'Coffee',
    },
    {
      step: '04',
      title: '条件の確認・意思確認',
      desc: '勤務条件や待遇に納得いただいたうえで働くかどうかをご判断ください。体験入店のご相談も可能です。',
      icon: 'ClipboardCheck',
    },
    {
      step: '05',
      title: '勤務開始',
      desc: 'ご希望のペースに合わせてお仕事スタート。初日も仲居さん・女性スタッフが近くでサポートします。',
      icon: 'CheckCircle2',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white" id="flow">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
            FLOW
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] leading-snug mb-3">
            応募からお仕事開始までの流れ
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            まずは相談や見学だけでも大丈夫です。納得してから始められます。
          </p>
        </div>

        {/* 5 Steps: PC 5-column cards, Mobile clean vertical timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {steps.map((st, idx) => (
            <div
              key={st.step}
              className="relative bg-[#FFF6F8]/60 rounded-2xl border border-[#EFE2E7] p-5 flex md:flex-col gap-4 md:gap-0 items-start"
            >
              {/* Step & Icon */}
              <div className="flex md:w-full items-center justify-between gap-2 md:mb-4 shrink-0">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EFE2E7] text-[#A65D79] flex items-center justify-center shrink-0">
                    <LucideIcon name={st.icon} size={18} />
                  </div>
                  <span className="font-display font-bold text-sm text-[#E85B91] text-center md:text-left">
                    STEP {st.step}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-display font-bold text-sm sm:text-base text-[#333333] mb-2 leading-snug">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#4A4A4A] leading-relaxed">
                  {st.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-[#EFE2E7] text-[#A65D79] items-center justify-center shadow-2xs"
                  aria-hidden="true"
                >
                  <LucideIcon name="ChevronRight" size={13} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reassurance Box & Links */}
        <div className="bg-[#F7F2EC] border border-[#E9DFD4] rounded-2xl p-6 text-center max-w-2xl mx-auto">
          <h3 className="font-display font-bold text-base sm:text-lg text-[#333333] mb-2">
            話を聞いたうえで、お断りいただいても構いません
          </h3>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-5">
            見学や説明を聞いたあとに「少し考えたい」という場合は、その場で無理に決める必要はありません。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {onCtaclick && (
              <button
                type="button"
                onClick={onCtaclick}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <LucideIcon name="MessageCircle" size={16} className="fill-white" />
                <span>LINEで流れや持ち物を聞く</span>
              </button>
            )}
            {onNavigateDetail && (
              <a
                href="/flow"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateDetail();
                }}
                id="flow-detail-link-btn"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-[#FFF6F8] text-[#A65D79] font-bold text-xs sm:text-sm border border-[#E2CED6] transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <span>面接・体験の流れを詳しく見る</span>
                <LucideIcon name="ChevronRight" size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
