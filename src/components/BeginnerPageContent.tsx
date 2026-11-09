/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface BeginnerPageContentProps {
  onCtaclick: () => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onInjectedScroll?: (msg: string) => void;
  onNavigateCompare?: () => void;
}

export default function BeginnerPageContent({
  onCtaclick,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
  onNavigateCompare,
}: BeginnerPageContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleLineClick = (e: React.MouseEvent) => {
    const msg = '【信太山新地の当店へ応募・相談】未経験からの求人について詳しく聞いてみたいです。';
    if (onInjectedScroll) {
      e.preventDefault();
      onInjectedScroll(msg);
    } else if (onCtaclick) {
      e.preventDefault();
      onCtaclick();
    }
  };

  // 8. 未経験者向けFAQ (10問)
  const beginnerFaqs = [
    {
      q: '本当に未経験でも応募できますか？',
      a: 'はい、大歓迎です。当店で働く女性の約90%が夜職や接客の完全未経験からスタートしています。特別な経験やスキルは一切必要ありません。'
    },
    {
      q: '接客経験がなくても大丈夫ですか？',
      a: 'はい、大丈夫です。お茶出しや歓談、短時間の接客マナーは初日に女性スタッフが横について丁寧にお教えします。困ったときは仲居さんがすぐサポートします。'
    },
    {
      q: '仕事を始める前に仕事内容を確認できますか？',
      a: 'はい、面接時にお仕事内容や接客ルール、給与体系を包み隠さずすべてご説明します。疑問や不安があれば何でも質問していただけます。'
    },
    {
      q: '面接だけでも可能ですか？',
      a: 'はい、面接やご相談だけでも歓迎しております。履歴書不要で私服のまま手ぶらでお越しいただけます。'
    },
    {
      q: '体験入店だけでも可能ですか？',
      a: 'はい、短時間の体験入店だけでも大歓迎です。稼いだ給与はその場で全額日払いいたします。合わないと感じた場合はその日限りで終了していただいて構いません。'
    },
    {
      q: '顔出しをしなくても働けますか？',
      a: 'はい、信太山新地の当店は店先での顔出し（顔見せ）が一切ありません。写真のネット掲載も行いませんので、顔バレ・身バレを防いで働けます。'
    },
    {
      q: '家族や知人に知られないか心配です。',
      a: '完全源氏名での勤務、完全個室待機、女性専用の無料送迎車の運行など、プライバシーに最大限配慮した環境を徹底しています。'
    },
    {
      q: '働いてみて合わなかった場合はどうなりますか？',
      a: '無理に勤務を続ける必要は一切ありません。退職の手続きやご相談も女性スタッフが丁寧に対応し、無理な引き止めやペナルティはありません。'
    },
    {
      q: 'お給料や待遇は面接前に確認できますか？',
      a: 'はい、公式LINEにて面接前でもコース別の受取給与や待遇の詳細をご確認いただけます。質問だけでもお気軽にお問い合わせください。'
    },
    {
      q: '女性スタッフに相談できますか？',
      a: 'はい、当店には女性専任サポートスタッフ（あおい）が常駐しております。面接から体験、勤務中の悩み相談まで女性スタッフが親身に対応します。'
    }
  ];

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

      {/* 2. ページ上部のメインエリア */}
      <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* 左側：タイトル・説明文 */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#D8175D] uppercase mb-2">
              FIRST TIME GUIDE
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1F2432] leading-tight mb-2 tracking-tight">
              未経験から始める方へ
            </h1>
            <p className="text-sm sm:text-base font-bold text-[#D8175D] mb-4">
              初めてのお仕事だからこそ、丁寧にサポートします。
            </p>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
              信太山新地で働くのが初めての方へ。仕事内容やお給料、働き方、接客の流れまで、分からないことを事前に確認できるようにご案内します。<br className="hidden sm:inline" />
              不安や疑問を残したまま働き始めることがないよう、一つずつ丁寧に説明します。
            </p>
            <div className="flex flex-wrap gap-2">
              {['約90%が未経験スタート', '女性スタッフ常駐', '店先顔出しなし', '履歴書不要・手ぶらOK'].map((tag) => (
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

          {/* 右側：女性スタッフの写真 */}
          <div className="w-full md:w-[42%] lg:w-[40%] shrink-0">
            <div className="relative rounded-[20px] overflow-hidden border border-[#F0DDE4] shadow-sm aspect-[4/3] bg-[#FFF1F5]">
              <img
                src="/images/shinodayama_advisor_sakura_1792225964799.jpg"
                alt="信太山新地 女性相談窓口 あおいスタッフ"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                width={480}
                height={360}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-[10px] text-center border border-white/20">
                女性相談窓口 あおいスタッフが丁寧にご案内します
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 未経験者が安心できる4つのサポート */}
      <section className="bg-white rounded-[22px] p-6 sm:p-8 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="HeartHandshake" size={13} />
            <span>安心サポート体制</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            初めての方をサポートする当店の取り組み
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {[
            {
              title: '女性スタッフが対応',
              desc: '女性スタッフに仕事や働き方について相談できます。',
              icon: 'Smile'
            },
            {
              title: '事前に仕事内容を説明',
              desc: '仕事の内容やルールを確認してから判断できます。',
              icon: 'FileText'
            },
            {
              title: '待機環境をご案内',
              desc: '実際に働く場所や待機環境を事前に確認できます。',
              icon: 'DoorClosed'
            },
            {
              title: '困ったときの相談体制',
              desc: '不安やトラブルがあった場合の相談先をご案内します。',
              icon: 'ShieldCheck'
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] text-center flex flex-col items-center justify-between shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mx-auto mb-3 shadow-2xs">
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

      {/* 4. 当店が未経験者に選ばれる6つの理由 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            6 REASONS TO CHOOSE
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            未経験の方に知ってほしい当店の6つの特徴
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {[
            {
              num: '①',
              title: '女性スタッフに相談できる',
              desc: '初めてのお仕事について、女性スタッフに疑問や不安を相談できます。面接から日常のサポートまで親身に対応します。',
              icon: 'Smile'
            },
            {
              num: '②',
              title: '実際の待機環境を確認できる',
              desc: '働く前に、待機場所や設備などを自分の目で確認できます。清潔感や安全性を実際に確かめてから決められます。',
              icon: 'Eye'
            },
            {
              num: '③',
              title: '仕事内容・給与を事前に確認',
              desc: '仕事内容や受取額、勤務条件を確認してから判断できます。不明瞭な天引きや条件の後出しは一切ありません。',
              icon: 'FileCheck'
            },
            {
              num: '④',
              title: '落ち着いた待機環境',
              desc: '旅館直営の個室待機環境について、実際の様子をご案内します。Wi-Fi・冷暖房完備の個室で人目を気にせず過ごせます。',
              icon: 'Home'
            },
            {
              num: '⑤',
              title: '困ったときに相談できる',
              desc: '接客や勤務について困ったことがあれば、相談方法や対応ルールを確認できます。仲居さんやスタッフが常に現場でサポートします。',
              icon: 'HeartHandshake'
            },
            {
              num: '⑥',
              title: '自分の希望を相談できる',
              desc: '出勤日数や勤務時間など、自分の希望を事前に相談できます。ノルマや罰金はなく、無理のないシフトで働けます。',
              icon: 'Calendar'
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
                <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1.5 leading-snug flex items-center gap-1.5">
                  <span className="text-[#D8175D]">{item.num}</span>
                  <span>{item.title}</span>
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 初めての方が気になる6つの不安 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="HelpCircle" size={13} />
            <span>疑問と不安にお答えします</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            初めてのお仕事で気になることにお答えします。
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: '① 接客が初めてでも大丈夫？',
              desc: '仕事内容や接客のルールを事前に説明します。お茶出しやお声がけの手順など、分からないことは勤務前に確認できます。',
              icon: 'Sparkles'
            },
            {
              title: '② 顔出しは必要？',
              desc: '顔出しに関する店舗のルールや掲載媒体について、応募前に確認できます。当店は店先での顔見せやネット写真公開は一切ありません。',
              icon: 'EyeOff'
            },
            {
              title: '③ 知り合いに知られない？',
              desc: 'プライバシーへの配慮や個人情報の取り扱い、身バレ対策について具体的に説明します。完全源氏名・無料送迎で対策しています。',
              icon: 'Lock'
            },
            {
              title: '④ お客様への対応が不安',
              desc: '接客の基本や対応ルール、困った場合の相談先をご案内します。無理な要求はお断りでき、仲居さんによる時間管理もあります。',
              icon: 'ShieldCheck'
            },
            {
              title: '⑤ 自分に合わないと思ったら？',
              desc: '無理に続ける必要はありません。体験や勤務を続けない場合の手続きについても事前に説明し、無理な引き止めは行いません。',
              icon: 'CheckCircle'
            },
            {
              title: '⑥ お給料の仕組みが分からない',
              desc: 'コース別の受取額、支払い方法、控除の有無などを事前に確認できます。当店は天引きゼロの手取り100%支給です。',
              icon: 'Coins'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[16px] p-4 sm:p-5 border border-[#F0DDE4] flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0 mt-0.5 shadow-2xs">
                <LucideIcon name={item.icon} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. 応募からお仕事開始までの流れ（縦型ステップ形式） */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            HOW TO START
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-2">
            初めての方も安心。お仕事開始までの5ステップ
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            見学や条件確認を通して、自分が納得してから働くかどうかを決められます。
          </p>
        </div>

        <div className="max-w-2xl mx-auto relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[34px] sm:left-[39px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#D8175D]/40 via-[#D8175D]/20 to-[#D8175D]/40 -z-0 pointer-events-none hidden sm:block" />

          <div className="space-y-4 relative z-10">
            {[
              {
                step: 'STEP 01',
                title: 'LINE・電話で相談',
                desc: '仕事内容や給与、働き方など気になることを質問できます。応募を決めていなくても、質問だけで大丈夫です。',
                icon: 'MessageCircle'
              },
              {
                step: 'STEP 02',
                title: '面接・希望条件の確認',
                desc: '希望する働き方や不安なことを確認します。履歴書不要で私服のまま手ぶらでお越しいただけます。',
                icon: 'ClipboardCheck'
              },
              {
                step: 'STEP 03',
                title: '仕事内容・給与・ルールの説明',
                desc: '実際の仕事内容、給与体系、勤務条件について詳しく説明します。疑問や不安があれば何でも確認できます。',
                icon: 'FileText'
              },
              {
                step: 'STEP 04',
                title: '希望者は体験・見学',
                desc: '実際の環境を確認し、自分に合うか判断できます。体験入店するかどうかはご自身で決められます。',
                icon: 'DoorOpen'
              },
              {
                step: 'STEP 05',
                title: '納得したうえで勤務開始',
                desc: '仕事内容や条件を理解し、本人が希望した場合に勤務を開始します。出勤日や時間も自由に相談可能です。',
                icon: 'CheckCircle2'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FFFAFC] rounded-[18px] p-4 sm:p-5 border border-[#F0DDE4] flex items-start gap-4 relative shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="flex flex-col items-center shrink-0">
                  <span className="font-mono font-black text-xs text-[#D8175D] bg-[#FFF1F5] px-2.5 py-1 rounded-full border border-[#F0DDE4]">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mt-2 shadow-2xs">
                    <LucideIcon name={item.icon} size={18} />
                  </div>
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 未経験から始めた女性の体験談 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="Quote" size={13} />
            <span>リアルな体験談</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-2">
            未経験から始めた女性の体験談
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            実際に働いている女性の声を通じて、応募前の不安や働き始めた後の感想をご紹介します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
          {/* まいさん */}
          <div className="bg-[#FFFAFC] rounded-[18px] p-5 sm:p-6 border border-[#F0DDE4] flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#F0DDE4]">
                <img
                  src="/images/cast_mai_card_1792227181512.jpg"
                  alt="まいさん"
                  className="w-12 h-12 rounded-full object-cover border border-[#F0DDE4] shadow-2xs"
                  loading="lazy"
                />
                <div>
                  <span className="font-bold text-sm text-[#1F2432] block">まいさん（21歳）</span>
                  <span className="text-[11px] text-[#D8175D] font-bold">夜職・接客完全未経験スタート</span>
                </div>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-2 leading-snug">
                「初めてでも、一つずつ教えてもらえました」
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed mb-3">
                夜のお仕事自体が初めてで、本当に自分にできるのかすごく不安でした。でも事前の説明が丁寧で、お茶出しの手順や接客の流れを一つずつ優しく教えてもらえたので、初日から安心してお仕事ができました。
              </p>
            </div>
            <div className="pt-3 border-t border-[#F0DDE4] text-[11px] text-[#777777] flex justify-between items-center">
              <span>勤務期間：6ヶ月（週2日勤務）</span>
              <span className="text-[#D8175D] font-bold">日給実績：約45,000円</span>
            </div>
          </div>

          {/* あやかさん */}
          <div className="bg-[#FFFAFC] rounded-[18px] p-5 sm:p-6 border border-[#F0DDE4] flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#F0DDE4]">
                <img
                  src="/images/cast_ayaka_card_1792227230489.jpg"
                  alt="あやかさん"
                  className="w-12 h-12 rounded-full object-cover border border-[#F0DDE4] shadow-2xs"
                  loading="lazy"
                />
                <div>
                  <span className="font-bold text-sm text-[#1F2432] block">あやかさん（27歳）</span>
                  <span className="text-[11px] text-[#D8175D] font-bold">昼職OLからの副業スタート</span>
                </div>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-2 leading-snug">
                「応募前の不安から、働き始めるまで」
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed mb-3">
                昼職と掛け持ちだったので、身バレや出勤の融通が利くかが一番の心配でした。店先での顔見せがなく、個室待機で知り合いに会う心配がないことを確認して安心できました。女性スタッフさんに何でも相談できるのが心強いです。
              </p>
            </div>
            <div className="pt-3 border-t border-[#F0DDE4] text-[11px] text-[#777777] flex justify-between items-center">
              <span>勤務期間：1年（週1〜2日勤務）</span>
              <span className="text-[#D8175D] font-bold">日給実績：約53,000円</span>
            </div>
          </div>
        </div>

        {/* インタビュー詳細へのリンク */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => onNavigateTopic('interview')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#D8175D] hover:text-[#b8124d] bg-[#FFF1F5] hover:bg-[#ffe4ed] px-5 py-2.5 rounded-full border border-[#F0DDE4] transition-colors cursor-pointer"
          >
            <span>働く女性のリアルなインタビュー記事一覧を見る</span>
            <LucideIcon name="ChevronRight" size={14} />
          </button>
        </div>
      </section>

      {/* 8. 未経験者向けFAQ (10問) */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="HelpCircle" size={13} />
            <span>Q&A</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            未経験についてのよくある質問
          </h2>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {beginnerFaqs.map((faq, idx) => {
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

      {/* 9. 関連ページへの案内 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            MORE INFORMATION
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            もっと詳しく知りたい方はこちら
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
          {[
            {
              title: '仕事内容',
              desc: '接客の流れ・待機環境',
              topicId: 'job',
              img: '/images/col_ryokan_manner_1792465891118.jpg'
            },
            {
              title: '給料・待遇',
              desc: 'コース別給料・シミュレーター',
              topicId: 'salary',
              img: '/images/col_bonus_envelope_jp_1792476753315.jpg'
            },
            {
              title: 'お仕事までの流れ',
              desc: '応募から開始までの5ステップ',
              topicId: 'flow',
              img: '/images/col_taiken_prep_1792475646166.jpg'
            },
            {
              title: '女性インタビュー',
              desc: '実際に働く女性のリアルな声',
              topicId: 'interview',
              img: '/images/cast_mai_card_1792227181512.jpg'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateTopic(item.topicId)}
              className="bg-[#FFFAFC] rounded-[18px] border border-[#F0DDE4] overflow-hidden hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-rose-50">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-3.5">
                  <h3 className="font-bold text-xs sm:text-sm text-[#1F2432] group-hover:text-[#D8175D] transition-colors mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#777777]">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="px-3.5 pb-3 text-[11px] font-bold text-[#D8175D] flex items-center justify-end gap-1">
                <span>詳しく見る</span>
                <LucideIcon name="ChevronRight" size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. 最後のLINE相談エリア */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-3">
          <LucideIcon name="MessageCircle" size={13} />
          <span>LINEで気軽に質問OK</span>
        </div>

        <h2 className="font-display font-extrabold text-lg sm:text-xl md:text-[22px] text-[#1F2432] mb-2">
          初めてだからこそ、まずは相談から始めませんか？
        </h2>

        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-lg mx-auto">
          仕事内容やお給料、働き方など、気になることを一つずつご説明します。まだ応募を決めていない方も、質問や相談だけで大丈夫です。
        </p>

        <div className="flex flex-col items-center">
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLineClick}
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#06C755]/25 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            id="beginner-page-line-cta-btn"
          >
            <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
            <span>LINEで未経験について相談する</span>
          </a>

          <span className="text-xs text-[#777777] font-medium mt-2.5">
            応募前の質問だけでも大歓迎です。
          </span>
        </div>
      </section>

    </div>
  );
}
