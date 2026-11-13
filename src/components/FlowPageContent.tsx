/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface FlowPageContentProps {
  onCtaclick: () => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onInjectedScroll?: (msg: string) => void;
  onNavigateCompare?: () => void;
}

export default function FlowPageContent({
  onCtaclick,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
  onNavigateCompare,
}: FlowPageContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleLineClick = (e: React.MouseEvent) => {
    const msg = '【信太山新地の当店へ応募・相談】面接・見学・体験入店の流れについて詳しく聞いてみたいです。';
    if (onInjectedScroll) {
      e.preventDefault();
      onInjectedScroll(msg);
    } else if (onCtaclick) {
      e.preventDefault();
      onCtaclick();
    }
  };

  const scrollToTimeline = () => {
    const el = document.getElementById('five-steps-timeline');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 6. 初めての方が不安に感じること (Q&A 6問)
  const anxietyFaqs = [
    {
      q: '面接だけでも大丈夫ですか？',
      a: 'まずは仕事内容や条件について話を聞いていただくだけでもご相談いただけます。履歴書不要で私服のまま手ぶらでお越しいただけます。'
    },
    {
      q: 'その日に必ず入店しないといけませんか？',
      a: '面接や条件説明を受けたうえで、ご自身で判断していただけます。無理な入店勧誘や引き止めは一切行いません。'
    },
    {
      q: '未経験でも大丈夫ですか？',
      a: '未経験の方もご相談いただけます。仕事内容や必要なことを事前にご説明し、女性スタッフが横について丁寧にお教えします。'
    },
    {
      q: '何を持って行けばいいですか？',
      a: '必要書類や持ち物は、面接日程を調整する際に事前にご案内します。基本的には顔写真付き身分証1点のみで大丈夫です。'
    },
    {
      q: '体験入店だけでも相談できますか？',
      a: '体験入店の条件や実施方法について、事前にお問い合わせいただけます。体験で稼いだお給料もその場で全額日払いいたします。'
    },
    {
      q: '条件が合わなかった場合は断れますか？',
      a: '条件や仕事内容を確認したうえで、ご自身の意思で判断していただけます。「思っていたのと違った」「合わなそう」と感じた場合も気兼ねなくお断りいただけます。'
    }
  ];

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

      {/* 1. ファーストビュー */}
      <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* 左側：タイトルと説明文 */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#D8175D] uppercase mb-2">
              APPLICATION GUIDE
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1F2432] leading-tight mb-2 tracking-tight">
              面接・体験入店までの流れ
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-bold text-[#D8175D] mb-4 leading-snug">
              応募から見学・体験まで、初めての方にも分かりやすくご案内します。
            </p>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
              「まずは話だけ聞いてみたい」「お店の雰囲気を見てから考えたい」という方も大歓迎です。<br className="hidden sm:inline" />
              LINEでのご相談から、面接・条件確認・見学・体験入店まで、一つずつ丁寧にご案内します。
            </p>

            {/* ボタンエリア */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLineClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white py-3.5 px-7 rounded-full font-extrabold text-sm shadow-md shadow-[#06C755]/20 hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
                id="flow-hero-line-cta-btn"
              >
                <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
                <span>LINEで応募・質問する</span>
              </a>

              <button
                type="button"
                onClick={scrollToTimeline}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#FFF1F5] hover:bg-[#ffe4ed] text-[#D8175D] py-3.5 px-6 rounded-full font-bold text-sm border border-[#F0DDE4] transition-colors cursor-pointer"
              >
                <span>体験入店までの流れを見る</span>
                <LucideIcon name="ArrowDown" size={15} />
              </button>
            </div>
            <span className="text-xs text-[#777777] font-medium block pl-1">
              質問・相談だけでも大丈夫です。
            </span>
          </div>

          {/* 右側：女性スタッフと応募希望者が相談している写真 */}
          <div className="w-full md:w-[42%] lg:w-[40%] shrink-0">
            <div className="relative rounded-[20px] overflow-hidden border border-[#F0DDE4] shadow-sm aspect-[4/3] bg-[#FFF1F5]">
              <img
                src="/images/col_interview_counseling_jp_1792475575633.webp"
                alt="女性スタッフとの面接・相談風景"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                width={480}
                height={360}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold bg-black/45 backdrop-blur-xs px-3 py-1.5 rounded-[10px] text-center border border-white/20">
                女性相談窓口スタッフが個別で丁寧にお応えします
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 最初に伝える4つのポイント */}
      <section className="bg-white rounded-[22px] p-6 sm:p-8 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="ShieldCheck" size={13} />
            <span>安心のお約束</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            応募前に知っておきたい4つのこと
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {[
            {
              title: 'LINEで事前相談OK',
              desc: '仕事内容や給与、勤務条件などを応募前に確認できます。',
              icon: 'MessageCircle'
            },
            {
              title: '面接前に条件を確認',
              desc: '自分の希望や気になることを事前に相談できます。',
              icon: 'ClipboardCheck'
            },
            {
              title: '見学について相談OK',
              desc: '実際の店舗や待機環境について確認できます。',
              icon: 'Eye'
            },
            {
              title: '無理な入店勧誘なし',
              desc: '条件や仕事内容を確認したうえで、自分の意思で判断できます。',
              icon: 'HeartHandshake'
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-4 sm:p-5 border border-[#F0DDE4] text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mx-auto mb-2.5 shadow-2xs">
                  <LucideIcon name={card.icon} size={19} />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-[#1F2432] mb-1">
                  {card.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#555555] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 応募から体験入店までの5ステップ（縦型タイムライン・交互画像） */}
      <section id="five-steps-timeline" className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs scroll-mt-20">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-black text-[#D8175D] tracking-wider uppercase block mb-1">
            HOW TO PROCEED
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] mb-2">
            応募から体験入店までの5ステップ
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            初めての方でも流れが分かるように、応募から当日までの手順をまとめました。
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10 max-w-3xl mx-auto">
          {/* STEP 01 */}
          <div className="bg-[#FFFAFC] rounded-[20px] p-5 sm:p-7 border border-[#F0DDE4] shadow-2xs flex flex-col md:flex-row items-center gap-5 sm:gap-7">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono font-black text-xs text-white bg-[#D8175D] px-2.5 py-1 rounded-full shadow-2xs">
                  STEP 01
                </span>
                <span className="text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full border border-[#F0DDE4]">
                  LINE・電話でお問い合わせ
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-2">
                まずは気軽にご相談ください。
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-3">
                LINEまたはお電話からお問い合わせいただけます。仕事内容・給与・勤務時間・応募資格など、気になることは何でもご質問ください。
              </p>
              <ul className="space-y-1 text-xs text-[#666666] bg-white p-3 rounded-[12px] border border-[#F0DDE4]">
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> LINEから24時間お問い合わせ受付</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 質問だけでもOK</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 未経験の方も歓迎</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 面接・見学について相談可能</li>
              </ul>
            </div>
            <div className="w-full md:w-[38%] shrink-0">
              <div className="rounded-[16px] overflow-hidden aspect-[4/3] border border-[#F0DDE4]">
                <img
                  src="/images/col_search_phone_jp_1792475574840.webp"
                  alt="スマホでLINE相談する様子"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* STEP 02 */}
          <div className="bg-[#FFFAFC] rounded-[20px] p-5 sm:p-7 border border-[#F0DDE4] shadow-2xs flex flex-col md:flex-row-reverse items-center gap-5 sm:gap-7">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono font-black text-xs text-white bg-[#D8175D] px-2.5 py-1 rounded-full shadow-2xs">
                  STEP 02
                </span>
                <span className="text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full border border-[#F0DDE4]">
                  面接の日程・希望条件を確認
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-2">
                あなたの希望や不安をお聞きします。
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-3">
                面接の日程を調整し、希望する働き方や気になっている条件を確認します。無理に希望を決める必要はありません。分からないことは、そのままご相談ください。
              </p>
              <ul className="space-y-1 text-xs text-[#666666] bg-white p-3 rounded-[12px] border border-[#F0DDE4]">
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 面接日時の調整</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 希望する勤務時間</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 希望する出勤日数</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 給与・待遇についての質問</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 未経験・経験者それぞれの相談</li>
              </ul>
            </div>
            <div className="w-full md:w-[38%] shrink-0">
              <div className="rounded-[16px] overflow-hidden aspect-[4/3] border border-[#F0DDE4]">
                <img
                  src="/images/col_trial_orient_jp_1792475594501.webp"
                  alt="落ち着いた雰囲気での相談風景"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* STEP 03 */}
          <div className="bg-[#FFFAFC] rounded-[20px] p-5 sm:p-7 border border-[#F0DDE4] shadow-2xs flex flex-col md:flex-row items-center gap-5 sm:gap-7">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono font-black text-xs text-white bg-[#D8175D] px-2.5 py-1 rounded-full shadow-2xs">
                  STEP 03
                </span>
                <span className="text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full border border-[#F0DDE4]">
                  面接・仕事内容・条件の説明
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-2">
                働く前に大切な条件を確認します。
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-3">
                面接では、仕事内容や給与体系、勤務条件などを詳しくご説明します。分からないことを残したまま話を進めず、納得できるまで確認できます。
              </p>
              <ul className="space-y-1 text-xs text-[#666666] bg-white p-3 rounded-[12px] border border-[#F0DDE4]">
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 仕事内容の説明</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 給与・コース別報酬の説明</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 勤務時間・出勤条件の確認</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 待遇・送迎などの説明</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 不安や疑問点の確認</li>
              </ul>
            </div>
            <div className="w-full md:w-[38%] shrink-0">
              <div className="rounded-[16px] overflow-hidden aspect-[4/3] border border-[#F0DDE4]">
                <img
                  src="/images/col_interview_hacks_jp_1792476795351.webp"
                  alt="面接・条件説明をしている室内"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* STEP 04 */}
          <div className="bg-[#FFFAFC] rounded-[20px] p-5 sm:p-7 border border-[#F0DDE4] shadow-2xs flex flex-col md:flex-row-reverse items-center gap-5 sm:gap-7">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono font-black text-xs text-white bg-[#D8175D] px-2.5 py-1 rounded-full shadow-2xs">
                  STEP 04
                </span>
                <span className="text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full border border-[#F0DDE4]">
                  店舗・待機環境の見学、体験入店の相談
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-2">
                実際の環境を確認してから判断できます。
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-3">
                希望される方には、店舗や待機環境についてご案内します。見学だけを希望する場合も、事前にご相談ください。
              </p>
              <ul className="space-y-1 text-xs text-[#666666] bg-white p-3 rounded-[12px] border border-[#F0DDE4]">
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 店舗や待機環境の確認</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 設備・備品についての説明</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 仕事の進め方の説明</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 体験入店の条件確認</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 不安な点の最終確認</li>
              </ul>
            </div>
            <div className="w-full md:w-[38%] shrink-0">
              <div className="rounded-[16px] overflow-hidden aspect-[4/3] border border-[#F0DDE4]">
                <img
                  src="/images/col_serene_lounge_jp_1792476845692.webp"
                  alt="清潔感のある待機スペース・旅館個室"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* STEP 05 */}
          <div className="bg-[#FFFAFC] rounded-[20px] p-5 sm:p-7 border border-[#F0DDE4] shadow-2xs flex flex-col md:flex-row items-center gap-5 sm:gap-7">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono font-black text-xs text-white bg-[#D8175D] px-2.5 py-1 rounded-full shadow-2xs">
                  STEP 05
                </span>
                <span className="text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full border border-[#F0DDE4]">
                  希望者のみ体験入店・勤務開始
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-2">
                条件を確認したうえで、自分の意思で判断できます。
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-3">
                仕事内容や条件を理解し、本人が希望する場合に体験入店・勤務開始へ進みます。体験入店の条件や報酬は、実際の店舗規定に基づいて事前に説明します。
              </p>
              <ul className="space-y-1 text-xs text-[#666666] bg-white p-3 rounded-[12px] border border-[#F0DDE4]">
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 体験入店の条件を事前に確認</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 当日の流れを説明</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 報酬・支払い条件を確認</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 勤務終了後の精算方法を説明（全額日払い）</li>
                <li className="flex items-center gap-1.5"><LucideIcon name="Check" size={13} className="text-[#D8175D]" /> 継続して働くかどうかを相談</li>
              </ul>
            </div>
            <div className="w-full md:w-[38%] shrink-0">
              <div className="rounded-[16px] overflow-hidden aspect-[4/3] border border-[#F0DDE4]">
                <img
                  src="/images/col_ryokan_manner_1792465891118.webp"
                  alt="落ち着いた旅館の室内"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 面接当日に確認できること */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="ClipboardList" size={13} />
            <span>INTERVIEW CHECK</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            面接では、こんなことを確認できます。
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: '仕事内容',
              desc: '具体的な仕事内容や勤務時の流れについて説明します。',
              icon: 'HeartHandshake'
            },
            {
              title: '給与・報酬',
              desc: 'コース別の報酬や支払い方法、給与の計算条件を確認できます。',
              icon: 'Coins'
            },
            {
              title: '勤務時間・出勤条件',
              desc: '勤務時間や出勤日数など、希望する働き方について相談できます。',
              icon: 'Clock'
            },
            {
              title: '待遇・サポート',
              desc: '送迎や待機環境、女性スタッフへの相談体制などを確認できます。',
              icon: 'ShieldCheck'
            },
            {
              title: '必要書類・手続き',
              desc: '応募時に必要な書類や手続きについて説明します。',
              icon: 'FileText'
            },
            {
              title: '不安・疑問の相談',
              desc: '初めての方も、気になることを遠慮なく質問できます。',
              icon: 'Smile'
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3 shadow-2xs">
                  <LucideIcon name={card.icon} size={19} />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1.5">
                  {card.title}
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 体験入店について */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="DoorOpen" size={13} />
            <span>TRIAL GUIDE</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-2">
            体験入店について
          </h2>
          <p className="text-xs sm:text-sm font-bold text-[#D8175D]">
            実際の環境や仕事内容を確認してから判断したい方へ。
          </p>
          <p className="text-xs text-[#555555] leading-relaxed mt-1">
            体験入店を希望される方には、事前に当日の流れや仕事内容、報酬、支払い条件などをご説明します。
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 bg-[#FFFAFC] rounded-[20px] p-5 sm:p-7 border border-[#F0DDE4]">
          <div className="flex-1 min-w-0 space-y-4">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#D8175D] text-white text-[11px] font-black flex items-center justify-center">1</span>
                <span>体験前に確認すること</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#555555]">
                {['当日のスケジュール', '仕事内容', '給与・報酬の条件', '必要な持ち物', '支払い方法', '安全面やサポート体制'].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-white p-2 rounded-[10px] border border-[#F0DDE4]">
                    <LucideIcon name="Check" size={12} className="text-[#D8175D] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#D8175D] text-white text-[11px] font-black flex items-center justify-center">2</span>
                <span>体験後について</span>
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed bg-white p-3.5 rounded-[12px] border border-[#F0DDE4]">
                体験後は、仕事内容や環境について感想を確認します。継続して働くかどうかは、ご本人の意思を尊重します。無理な勧誘や引き止めは一切行いません。
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[42%] shrink-0">
            <div className="rounded-[16px] overflow-hidden aspect-[4/3] border border-[#F0DDE4]">
              <img
                src="/images/col_taiken_prep_1792475646166.webp"
                alt="体験入店・店舗待機環境"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. 初めての方が不安に感じること (カード形式Q&A) */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="HelpCircle" size={13} />
            <span>FAQ</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            初めての面接・体験入店でよくある不安
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {anxietyFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs"
            >
              <div className="flex items-start gap-2.5 mb-2">
                <span className="w-5 h-5 rounded-full bg-[#D8175D] text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  Q
                </span>
                <h3 className="font-bold text-sm sm:text-base text-[#1F2432] leading-snug">
                  {faq.q}
                </h3>
              </div>
              <div className="flex items-start gap-2.5 pt-1 pl-1">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  A
                </span>
                <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. 面接・体験入店の前に確認しておきたいこと (チェックリスト) */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="CheckSquare" size={13} />
            <span>CHECKLIST</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-2">
            当日までに確認しておきたいチェックリスト
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            分からないことは事前にLINEでご確認いただけます。
          </p>
        </div>

        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            '応募資格・年齢条件',
            '面接場所・集合場所',
            '面接日時',
            '必要書類',
            '給与・報酬の条件',
            '勤務時間・出勤条件',
            '体験入店の有無・条件',
            '交通費・送迎について'
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[14px] p-3.5 border border-[#F0DDE4] flex items-center gap-2.5"
            >
              <div className="w-5 h-5 rounded-md bg-[#FFF1F5] border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0">
                <LucideIcon name="Check" size={13} />
              </div>
              <span className="text-xs font-bold text-[#1F2432]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. 関連ページ */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            RELATED INFORMATION
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            応募前にこちらもご確認ください
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            {
              title: '募集要項',
              topicId: 'requirements',
              img: '/images/col_official_documents_1792465890547.webp'
            },
            {
              title: '仕事内容',
              topicId: 'job',
              img: '/images/col_ryokan_manner_1792465891118.webp'
            },
            {
              title: '給料・待遇',
              topicId: 'salary',
              img: '/images/col_bonus_envelope_jp_1792476753315.webp'
            },
            {
              title: '未経験の方へ',
              topicId: 'beginner',
              img: '/images/col_friendly_staff_jp_1792476884275.webp'
            },
            {
              title: '経験者の方へ',
              topicId: 'experienced',
              img: '/images/hub_experienced_cast_1792485405837.webp'
            },
            {
              title: '女性インタビュー',
              topicId: 'interview',
              img: '/images/cast_mai_card_1792227181512.webp'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateTopic(item.topicId)}
              className="bg-[#FFFAFC] rounded-[16px] border border-[#F0DDE4] overflow-hidden hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden bg-rose-50">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-2.5 text-center">
                  <h3 className="font-bold text-xs text-[#1F2432] group-hover:text-[#D8175D] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="px-2 pb-2 text-[10px] font-bold text-[#D8175D] flex items-center justify-center gap-0.5">
                <span>見る</span>
                <LucideIcon name="ChevronRight" size={11} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. 最後のLINE応募エリア */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-3">
          <LucideIcon name="MessageCircle" size={13} />
          <span>24時間受付中</span>
        </div>

        <h2 className="font-display font-extrabold text-lg sm:text-xl md:text-[22px] text-[#1F2432] mb-2">
          まずは話を聞いてみるだけでも大丈夫です。
        </h2>

        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-lg mx-auto">
          「仕事内容を詳しく知りたい」「給与や待遇を確認したい」「お店の雰囲気を見てみたい」など、どんなご相談でもお気軽にお問い合わせください。
        </p>

        <div className="flex flex-col items-center">
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLineClick}
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#06C755]/25 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            id="flow-page-line-cta-btn"
          >
            <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
            <span>LINEで応募・相談する</span>
          </a>

          <span className="text-xs text-[#777777] font-medium mt-2.5">
            質問だけでも歓迎｜女性スタッフが丁寧にご案内します。
          </span>
        </div>
      </section>

    </div>
  );
}
