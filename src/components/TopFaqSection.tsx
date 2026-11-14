/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LucideIcon from './LucideIcon';

interface TopFaqSectionProps {
  onNavigateFullFaq: () => void;
  onCtaclick: () => void;
}

interface TopFaqItem {
  id: string;
  question: string;
  answer: string;
}

const TOP_FAQS: TopFaqItem[] = [
  {
    id: 'faq-inexperienced',
    question: '未経験でも応募できますか？',
    answer:
      'はい、未経験の方もご応募いただけます。当店に在籍している女性の約9割が未経験からのスタートで、お仕事の流れや安全ルール（避妊具着用の徹底・時間管理など）は当店の仲居さん・女性スタッフが丁寧にご説明します。',
  },
  {
    id: 'faq-just-listen',
    question: 'まずは話を聞くだけでも大丈夫ですか？',
    answer:
      'はい、大丈夫です。当店公式LINEでの事前相談のみ、あるいは実際に当店の館内や待機用の個室を見学してから働くかどうかを決めていただけます。話を聞いたうえで辞退されても問題ありません。',
  },
  {
    id: 'faq-weekly1',
    question: '週1日からでも相談できますか？',
    answer:
      'はい、週1日からの勤務も当店で直接ご相談いただけます。本業（昼職）や学校、ご家庭の予定と両立されている方も多く、出勤ペースや曜日は無理のない範囲でご希望に合わせます。',
  },
  {
    id: 'faq-short-time',
    question: '短時間勤務はできますか？',
    answer:
      'はい、1日3〜4時間ほどの短時間勤務や「昼間だけ」「終電前まで」といったご希望も当店で直接ご相談いただけます。10:00〜24:00の間でシフトを柔軟に組めるため、ご自身の生活ペースに合わせて無理なくお働きいただけます。',
  },
  {
    id: 'faq-salary-calc',
    question: 'お給料はどのように決まりますか？',
    answer:
      '15分単位の明確なコース報酬（15分 3,800円 / 30分 7,600円 / 45分 11,400円 / 60分 15,200円〜）を基準としています。当店では条件に応じた最低時給保証や待機日給保証の制度も設けており、適用条件を含めて面接時に書面・口頭でご説明します。',
  },
  {
    id: 'faq-payout',
    question: '支払い方法はどうなっていますか？',
    answer:
      '退勤時にその日のお給料を当店から現金でお渡しする「即日全額日払い」に対応しています。体験入店当日の報酬も、同じく勤務終了時に現金でお受け取りいただけます。',
  },
  {
    id: 'faq-interview',
    question: '面接では何を聞かれますか？',
    answer:
      'ご希望の出勤ペース（曜日・時間帯）、お仕事で不安に思っていること、通勤や寮・送迎のご希望などを当店の採用担当・女性スタッフが伺います。履歴書は不要で私服のままお越しいただけます。なお年齢確認のため顔写真付きの公的身分証1点が必要です。',
  },
  {
    id: 'faq-trial',
    question: '体験入店について相談できますか？',
    answer:
      'はい、ご希望の方は体験入店（1日体験）についてご相談いただけます。まずは実際に当店の館内や待機用の個室を見学し、説明を聞いたうえで体験するかどうかを決めていただけます。',
  },
  {
    id: 'faq-privacy',
    question: '顔や個人情報の取り扱いはどうなっていますか？',
    answer:
      '当店がある信太山新地では通りや店先に立って顔を見せる接客はありません。また、Webサイト・SNSへの顔写真掲載も行わず、源氏名での勤務となります。お預かりした身分証情報やLINEの連絡先も当店の採用管理以外には一切使用しません。',
  },
  {
    id: 'faq-dorm-transfer',
    question: '寮や送迎について相談できますか？',
    answer:
      'はい、当店ではJR信太山駅周辺に家具・家電付きの個室マンション寮をご用意しており、駅からの無料送迎や専用駐車場も完備しています。ご希望の入居時期や日額費用（0〜2,000円目安）、送迎時間帯も当店スタッフよりそのままご案内します。',
  },
];

export default function TopFaqSection({
  onNavigateFullFaq,
  onCtaclick,
}: TopFaqSectionProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-inexperienced': true,
    'faq-just-listen': true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="top-faq" className="py-16 sm:py-20 bg-[#FFF6F8] border-y border-[#F3E5EA]">
      <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
            FAQ
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] leading-snug mb-3">
            応募前によくいただく質問
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            応募やご相談の前に気になることが多い質問をまとめました。
          </p>
        </div>

        {/* 10 Accordions */}
        <div className="space-y-3 mb-10">
          {TOP_FAQS.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#EFE2E7] overflow-hidden shadow-[0_2px_8px_rgba(166,93,121,0.03)]"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-[#FFF9FB] transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-display font-bold text-sm sm:text-base text-[#E85B91] shrink-0">
                      Q.
                    </span>
                    <span className="font-bold text-sm sm:text-base text-[#333333] leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <LucideIcon
                    name={isOpen ? 'ChevronUp' : 'ChevronDown'}
                    size={18}
                    className="text-[#A65D79] shrink-0"
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 border-t border-[#FAF2F5] flex items-start gap-3">
                    <span className="font-display font-bold text-sm text-[#A65D79] shrink-0 mt-0.5">
                      A.
                    </span>
                    <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Full FAQ & LINE Consultation CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="/faq"
            onClick={(e) => {
              e.preventDefault();
              onNavigateFullFaq();
            }}
            id="top-faq-all-btn"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#F7F2EC] text-[#A65D79] font-bold text-sm border border-[#E2CED6] transition-colors flex items-center justify-center gap-2"
          >
            <span>よくある質問一覧（全66問）を見る</span>
            <LucideIcon name="ArrowRight" size={15} />
          </a>
          <button
            type="button"
            onClick={onCtaclick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_2px_10px_rgba(6,199,85,0.22)]"
          >
            <LucideIcon name="MessageCircle" size={17} className="fill-white" />
            <span>分からないことをLINEで質問する</span>
          </button>
        </div>
      </div>
    </section>
  );
}
