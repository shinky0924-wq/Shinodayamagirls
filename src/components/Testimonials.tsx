/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface InterviewHighlight {
  label: string;
  answer: string;
}

interface InterviewQA {
  qNumber: string;
  question: string;
  answer: string;
}

interface CastInterview {
  id: string;
  name: string;
  age: string;
  avatarUrl: string;
  tag: string;
  headline: string;
  workPeriod: string;
  weeklyDays: string;
  dailyHours: string;
  highlights: InterviewHighlight[];
  qas: InterviewQA[];
}

const CAST_INTERVIEWS: CastInterview[] = [
  {
    id: 'mai',
    name: 'まい',
    age: '24歳',
    avatarUrl: '/images/cast_mai_snap_1794475286956.webp',
    tag: '未経験スタート',
    headline: '「初めてでも、一つずつ教えてもらえました」',
    workPeriod: '在籍8ヶ月',
    weeklyDays: '週4日勤務',
    dailyHours: '昼〜夕方（約5〜6時間）',
    highlights: [
      {
        label: '働き始める前に不安だったこと',
        answer: '夜職が初めてだったので、自分にできるかや怖くないか、人に見られないかが不安でした。',
      },
      {
        label: '応募したきっかけ',
        answer: '店先で顔を見せる待機がないことと、直営のお店で応募前の質問に丁寧に答えてもらえたことです。',
      },
      {
        label: '仕事を始めて感じたこと',
        answer: '初日の接客前に仲居さんが手順を教えてくれたので緊張がほぐれ、15分からの短い接客で負担が少なかったです。',
      },
      {
        label: 'お店の雰囲気',
        answer: '清潔な個室で自分の時間を過ごせて、仲居さんも優しく気さくに声をかけてくれる落ち着いた雰囲気です。',
      },
      {
        label: '働き方について',
        answer: '昼〜夕方メインで週4日ほど、退勤時にその日の分を現金で受け取れるので生活リズムと両立しやすいです。',
      },
      {
        label: 'これから応募を考えている女性へのメッセージ',
        answer: '顔出しがないため未経験の方でも安心感があると思います。まずはLINEで気になる点だけ聞いてみてください。',
      },
    ],
    qas: [
      {
        qNumber: 'Q1',
        question: 'なぜ信太山新地で働こうと思ったの？',
        answer:
          '通りに座って通行人に見られるのが怖かったのですが、信太山新地は旅館の個室や専用待機場所で待てるので落ち着いて働けると思いました。',
      },
      {
        qNumber: 'Q2',
        question: '待機時間はどのように過ごしている？',
        answer:
          '冷暖房やWi-Fiがある個室で、スマートフォンを見たり本を読んだりしながらリラックスして過ごしています。',
      },
      {
        qNumber: 'Q3',
        question: 'お給料や支払いはどう？',
        answer:
          '15分単位のコース設定で分かりやすく、退勤時にその日の分をそのまま手渡しで受け取れるので安心です。',
      },
    ],
  },
  {
    id: 'yuri',
    name: 'ゆり',
    age: '33歳',
    avatarUrl: '/images/cast_yuri_snap_1794475308769.webp',
    tag: '30代・家庭と両立',
    headline: '「生活スタイルに合わせて無理なく働いています」',
    workPeriod: '在籍1年',
    weeklyDays: '週2日（月8日ほど）',
    dailyHours: '平日昼 11:00〜16:00',
    highlights: [
      {
        label: '働き始める前に不安だったこと',
        answer: '30代で未経験でも受け入れてもらえるのか、自宅や近所の方に知られないかが心配でした。',
      },
      {
        label: '応募したきっかけ',
        answer: '店先での顔見せがない点と、平日昼だけ・週2日でも相談できること、託児サポートや駐車場の案内があったことです。',
      },
      {
        label: '仕事を始めて感じたこと',
        answer: 'キャバクラ等と違いお酒を飲む接客ではないため、二日酔いや体調を崩すこともなく翌日の家事にも響きませんでした。',
      },
      {
        label: 'お店の雰囲気',
        answer: '落ち着いたお客様や同年代・ベテランの仲居さんが多く、家庭の事情にも配慮してもらえる温かさがあります。',
      },
      {
        label: '働き方について',
        answer: '平日11:00〜16:00の短時間で残業なく帰れるため、家事や家族の予定を優先しながら続けられています。',
      },
      {
        label: 'これから応募を考えている女性へのメッセージ',
        answer: '年齢や経験で迷っている方こそ、自分のペースに合わせて働ける条件かどうか一度相談してみることをおすすめします。',
      },
    ],
    qas: [
      {
        qNumber: 'Q1',
        question: '急な予定変更や家庭の都合はどう対応してもらえる？',
        answer:
          '子どもや家庭の急用を相談した際も無理を言われることがなく、シフトを柔軟に調整してもらえて助かっています。',
      },
      {
        qNumber: 'Q2',
        question: '他のスタッフとの人間関係はどう？',
        answer:
          '待機中も個室中心で落ち着いて過ごせるため、変な気遣いやグループ関係に悩むことがありません。',
      },
    ],
  },
  {
    id: 'ayaka',
    name: 'あやか',
    age: '28歳',
    avatarUrl: '/images/cast_ayaka_snap_1794475329022.webp',
    tag: '遠方・寮利用',
    headline: '「住まいの不安も事前に確認できて安心でした」',
    workPeriod: '短期滞在2週間',
    weeklyDays: '希望期間集中（相談シフト）',
    dailyHours: '11:00〜23:00（休憩あり）',
    highlights: [
      {
        label: '働き始める前に不安だったこと',
        answer: '大阪の土地勘がなく、寮のお部屋や治安、帰りの交通費がどうなるのかが不安でした。',
      },
      {
        label: '応募したきっかけ',
        answer: 'ワンルームの個室寮や往復交通費の条件について、応募前にLINEで具体的に確認できたためです。',
      },
      {
        label: '仕事を始めて感じたこと',
        answer: '初日は駅までお迎えがあり、家具・家電があるお部屋にスムーズに入居できたので気持ちに余裕が出ました。',
      },
      {
        label: 'お店の雰囲気',
        answer: '仲居さんが周辺の買い物スポットを教えてくれるなど親切で、遠方から一人でも心細さを感じませんでした。',
      },
      {
        label: '働き方について',
        answer: '2週間という期間を決めて集中し、働いた分を毎日現金で受け取りながら計画的に貯金ができました。',
      },
      {
        label: 'これから応募を考えている女性へのメッセージ',
        answer: '遠方からの応募は事前確認が大切なので、寮の条件や交通費の支給規定は遠慮なくLINEで聞いてから決めると安心です。',
      },
    ],
    qas: [
      {
        qNumber: 'Q1',
        question: '遠方から行く際の持ち物で大変なことはあった？',
        answer:
          '生活に必要な家具家電や仕事用の衣装は用意されていたため、着替えなど身の回りの荷物だけで移動できました。',
      },
      {
        qNumber: 'Q2',
        question: '働く期間や条件は自分で決められた？',
        answer:
          'はい、事前に「2週間程度」と相談した通りにスケジュールを組んでもらい、無理なく終えることができました。',
      },
    ],
  },
];

interface TestimonialsProps {
  onCtaclick?: () => void;
}

export default function Testimonials({ onCtaclick }: TestimonialsProps) {
  const [openCardIds, setOpenCardIds] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setOpenCardIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCta = () => {
    if (onCtaclick) {
      onCtaclick();
    } else {
      window.open(LINE_OFFICIAL_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="voice"
      className="py-16 sm:py-20 bg-[#FFF6F8] border-y border-[#F3E5EA] overflow-hidden"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
            INTERVIEW
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] leading-snug mb-3 text-balance">
            働き方の例・インタビューイメージ
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            働き始める前に気になりやすい点や、1日の過ごし方のモデルケースをご紹介します。
          </p>
          <p className="text-[11px] text-[#666666] mt-1.5">
            ※プライバシー保護のため、掲載写真はすべてイメージ素材を使用しています（実際の在籍スタッフの顔写真ではありません）。
          </p>
        </div>

        {/* Mobile horizontal swipe hint */}
        <p className="lg:hidden text-[11px] text-[#A65D79] font-bold text-center mb-3 flex items-center justify-center gap-1">
          <LucideIcon name="ArrowRight" size={12} />
          <span>横にスライドして3パターンの例をご覧いただけます</span>
        </p>

        {/* 3 Interview Cards: PC 3 columns, Mobile horizontal snap slide */}
        <div className="flex lg:grid lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 items-stretch">
          {CAST_INTERVIEWS.map((cast) => {
            const isOpen = !!openCardIds[cast.id];

            return (
              <article
                key={cast.id}
                id={`interview-card-${cast.id}`}
                className="w-[86vw] sm:w-[70vw] lg:w-auto shrink-0 snap-center bg-white rounded-2xl border border-[#EFE2E7] shadow-[0_2px_14px_rgba(166,93,121,0.06)] overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative aspect-[16/10] bg-[#F7F2EC] overflow-hidden">
                    <img
                      src={cast.avatarUrl}
                      alt={`${cast.tag}の働き方イメージ`}
                      width={640}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                    <span className="absolute top-2.5 right-2.5 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                      画像はイメージです
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white flex items-baseline justify-between gap-2">
                      <div>
                        <span className="font-display font-bold text-lg sm:text-xl">
                          {cast.name}さん（仮名）
                        </span>
                        <span className="text-xs sm:text-sm ml-2 opacity-90">
                          {cast.age}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold bg-white/95 text-[#A65D79] px-2.5 py-0.5 rounded-lg">
                        {cast.tag}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-[#333333] leading-snug mb-2">
                        {cast.headline}
                      </h3>
                      {/* Work conditions summary */}
                      <p className="text-xs text-[#666666] bg-[#F7F2EC] rounded-xl px-3 py-2">
                        {cast.workPeriod} · {cast.weeklyDays} · {cast.dailyHours}
                      </p>
                    </div>

                    {/* Required 6 Interview Points */}
                    <dl className="space-y-2.5 text-xs sm:text-[13px]">
                      {cast.highlights.map((hl) => (
                        <div
                          key={hl.label}
                          className="border-b border-[#FAF2F5] pb-2 last:border-b-0 last:pb-0"
                        >
                          <dt className="font-bold text-[#A65D79] mb-0.5">
                            {hl.label}
                          </dt>
                          <dd className="text-[#4A4A4A] leading-relaxed">
                            {hl.answer}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {/* Expandable Detailed Q&A */}
                    {isOpen && (
                      <div className="pt-3 border-t border-[#EFE2E7] space-y-2.5">
                        {cast.qas.map((qa) => (
                          <div
                            key={qa.qNumber}
                            className="bg-[#FFF6F8] rounded-xl p-3 border border-[#F0DFE5]"
                          >
                            <p className="font-bold text-xs text-[#333333] mb-1">
                              {qa.qNumber}. {qa.question}
                            </p>
                            <p className="text-xs text-[#4A4A4A] leading-relaxed">
                              {qa.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expand toggle */}
                <div className="px-5 pb-5 pt-1">
                  <button
                    type="button"
                    onClick={() => toggleCard(cast.id)}
                    id={`interview-toggle-btn-${cast.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FFF6F8] hover:bg-[#FCE8EF] text-[#A65D79] font-bold text-xs sm:text-sm border border-[#EFE2E7] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LucideIcon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={15} />
                    <span>{isOpen ? '詳しいQ&Aを閉じる' : '詳しいQ&Aをもっと見る'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Soft bottom CTA */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={handleCta}
            id="voice-bottom-line-btn"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm sm:text-base transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_3px_12px_rgba(6,199,85,0.22)]"
          >
            <LucideIcon name="MessageCircle" size={18} className="fill-white" />
            <span>不安なことを女性スタッフにLINEで相談する</span>
          </button>
        </div>
      </div>
    </section>
  );
}
