/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface ExperiencedPageContentProps {
  onCtaclick: () => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onInjectedScroll?: (msg: string) => void;
  onNavigateCompare?: () => void;
}

export default function ExperiencedPageContent({
  onCtaclick,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
  onNavigateCompare,
}: ExperiencedPageContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleLineClick = (e: React.MouseEvent) => {
    const msg = '【信太山新地の当店へ移籍・相談】他店・他業種での経験があり、当店の条件や働き方について詳しく相談してみたいです。';
    if (onInjectedScroll) {
      e.preventDefault();
      onInjectedScroll(msg);
    } else if (onCtaclick) {
      e.preventDefault();
      onCtaclick();
    }
  };

  // 8. 経験者の方からよくある質問 (10問)
  const experiencedFaqs = [
    {
      q: '他の信太山新地のお店から移籍できますか？',
      a: 'はい、もちろん可能です。他店舗での在籍トラブルを避けるため、秘密厳守を徹底しております。完全源氏名・プライバシー厳守でスムーズに移籍していただけます。'
    },
    {
      q: '他業種からの移籍も可能ですか？',
      a: 'はい、大歓迎です。ソープランド、ヘルス、キャバクラ、ガールズバー、エステなど、他業種での接客経験をそのまま活かして高水準な環境でスタートできます。'
    },
    {
      q: '今のお店を辞める前に相談できますか？',
      a: 'はい、在職中のご相談も多数いただいております。条件の比較や見学だけを行い、納得してから退職日を決めていただけます。'
    },
    {
      q: '現在の給与と比較して検討できますか？',
      a: 'はい、大歓迎です。現在のお店のバック率や天引き条件をお伺いし、当店での手取り受取額を具体的にシミュレーションして比較していただけます。'
    },
    {
      q: 'これまでの経験は給与や待遇に反映されますか？',
      a: 'はい、当店は全コース明朗な高水準バック（15分3,800円〜）に加え、ご経験や勤務希望に応じたシフト・個室寮・特別待遇などを柔軟にご相談いただけます。'
    },
    {
      q: 'お客様の集客方法について教えてもらえますか？',
      a: '当店は老舗旅館直営としての強い集客基盤と長年の常連様・会員様を多数抱えております。フリーのお客様も公平に順番通りにご案内するため、待機時間が無駄になりません。'
    },
    {
      q: '移籍前に待機場所を見学できますか？',
      a: 'はい、事前に実際の個室待機室や旅館の設備をご自身の目でご確認いただけます。見学後に働くかどうかをご判断ください。'
    },
    {
      q: '出勤日数や時間帯は相談できますか？',
      a: 'はい、週1日〜・短時間勤務・週末のみ・専業フル出勤など、これまでのペースやご都合に合わせて自由に設定していただけます。ノルマや罰金は一切ありません。'
    },
    {
      q: '面接前に給与や待遇を確認できますか？',
      a: 'はい、公式LINEにて面接前でもコース別の手取り受取額や待遇詳細を事前にお答えしております。気になる点はお気軽にご質問ください。'
    },
    {
      q: 'まずは相談だけでも可能ですか？',
      a: 'はい、相談・質問だけでも大歓迎です。無理な勧誘や引き止めは一切行いませんので、他店との比較検討として気軽にご活用ください。'
    }
  ];

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

      {/* 2. ファーストビューを全面変更 */}
      <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* 左側：文章 */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#D8175D] uppercase mb-2">
              EXPERIENCED STAFF GUIDE
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1F2432] leading-tight mb-2 tracking-tight">
              経験者の方へ
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-bold text-[#D8175D] mb-4 leading-snug">
              今までの経験を、もっと自分に合った環境で活かしませんか？
            </p>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
              これまで培ってきた接客経験やスキルを活かして、新しい環境で働きたい女性へ。<br className="hidden sm:inline" />
              当店では、給与・待遇・働き方・待機環境などを事前にご説明しています。<br className="hidden sm:inline" />
              現在のお店との違いや、移籍後の働き方についても、一つずつ確認していただけます。
            </p>

            {/* 給与や待遇の重要情報の小さなカード */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
              {[
                { label: '手取り受取', val: '100%支給', sub: '天引き・雑費0円' },
                { label: '支給方法', val: '全額即日日払い', sub: '退勤時現金手渡し' },
                { label: '待機環境', val: '旅館完全個室', sub: '店先顔出し一切なし' },
                { label: '出勤シフト', val: 'ノルマ・罰金0', sub: '週1日〜希望制' }
              ].map((c, i) => (
                <div key={i} className="bg-[#FFFAFC] border border-[#F0DDE4] rounded-[14px] p-2.5 text-center">
                  <span className="text-[10px] text-[#777777] block font-medium">{c.label}</span>
                  <span className="text-xs sm:text-[13px] font-bold text-[#D8175D] block">{c.val}</span>
                  <span className="text-[9px] text-[#555555] block">{c.sub}</span>
                </div>
              ))}
            </div>

            {/* CTAボタン */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLineClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white py-3.5 px-7 rounded-full font-extrabold text-sm shadow-md shadow-[#06C755]/20 hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
              >
                <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
                <span>LINEで移籍について相談する</span>
              </a>
              <span className="text-xs text-[#777777] font-medium pl-1">
                条件確認だけでも大歓迎です。
              </span>
            </div>
          </div>

          {/* 右側：実際の店舗・女性スタッフの写真 */}
          <div className="w-full md:w-[42%] lg:w-[40%] shrink-0">
            <div className="relative rounded-[20px] overflow-hidden border border-[#F0DDE4] shadow-sm aspect-[4/3] bg-[#FFF1F5]">
              <img
                src="/images/hub_experienced_cast_1792485405837.webp"
                alt="信太山新地 経験者・移籍のご案内"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                width={480}
                height={360}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold bg-black/45 backdrop-blur-xs px-3 py-1.5 rounded-[10px] text-center border border-white/20">
                落ち着いた老舗旅館直営・個室待機・秘密厳守
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ファーストビュー直下に当店のメリット4項目 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-8 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="Sparkles" size={13} />
            <span>事前確認で安心</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            経験者の方に確認してほしい当店の4つのポイント
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {[
            {
              title: '給与・待遇を事前に確認',
              desc: 'コースごとの受取額や給与の仕組み、支払い条件などを事前に確認できます。',
              icon: 'Coins'
            },
            {
              title: '集客・お客様について説明',
              desc: '集客方法やお客様のご案内について、当店の仕組みを具体的にご説明します。',
              icon: 'Users'
            },
            {
              title: '落ち着いた待機環境',
              desc: '旅館直営の待機環境や設備について、実際の様子をご確認いただけます。',
              icon: 'Home'
            },
            {
              title: '働き方を相談できる',
              desc: '希望する出勤日数や時間帯など、これまでの働き方も踏まえて相談できます。',
              icon: 'Calendar'
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

      {/* 4. 当店に移籍する6つのメリット（最重要セクション・2列×3段） */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            6 TRANSFER MERITS
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            経験者だからこそ知ってほしい、当店の6つのメリット
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {[
            {
              num: '①',
              title: '給与・待遇が明確',
              desc: 'コースごとの受取額、給与体系、支払い方法などを事前に確認できます。移籍後に条件の認識違いが起きないよう、具体的に説明します。'
            },
            {
              num: '②',
              title: '集客・お客様のご案内',
              desc: '当店の集客方法やお客様のご案内の仕組みについてご説明します。実際の集客状況や稼働状況を確認してから検討できます。'
            },
            {
              num: '③',
              title: '旅館直営の待機環境',
              desc: '働く場所や待機設備を事前に確認できます。実際の環境を自分の目で見て判断できます。'
            },
            {
              num: '④',
              title: '経験やスキルを活かせる',
              desc: 'これまでの接客経験や希望する働き方を確認し、当店での仕事内容や勤務条件をご案内します。'
            },
            {
              num: '⑤',
              title: '出勤・シフトの相談',
              desc: '希望する出勤日数や勤務時間について相談できます。自分の生活に合わせた働き方を検討できます。'
            },
            {
              num: '⑥',
              title: '移籍前から女性スタッフに相談',
              desc: '現在のお店との違いや移籍に関する不安など、女性スタッフに相談できます。応募を決める前の条件確認も歓迎します。'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="font-mono font-black text-sm text-white bg-[#D8175D] w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-2xs">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-base text-[#1F2432]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 経験者が移籍前に確認したい重要ポイント（チェックリスト形式） */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="CheckSquare" size={13} />
            <span>CHECKLIST</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            移籍する前に確認しておきたい5つのポイント
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {[
            {
              title: '① 給与・受取額',
              desc: 'コースごとの受取額や給与の支払い条件を確認できます。'
            },
            {
              title: '② 集客・稼働状況',
              desc: 'お客様のご案内方法や、実際の稼働状況について説明します。'
            },
            {
              title: '③ 待機環境・設備',
              desc: '待機場所や設備、利用できる環境について確認できます。'
            },
            {
              title: '④ 出勤・勤務条件',
              desc: '希望する出勤日数や時間帯など、働き方を相談できます。'
            },
            {
              title: '⑤ 移籍後のサポート',
              desc: '勤務開始後の相談先や、困ったときの対応方法を確認できます。'
            }
          ].map((chk, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[16px] p-4 sm:p-4.5 border border-[#F0DDE4] flex items-start gap-3.5"
            >
              <div className="w-6 h-6 rounded-md bg-[#FFF1F5] border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0 mt-0.5">
                <LucideIcon name="Check" size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-0.5">
                  {chk.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed">
                  {chk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. 経験者向け給与・待遇セクション */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="BadgePercent" size={13} />
            <span>給与システム</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-2">
            経験者の方へ。給与・待遇を事前にご確認ください。
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            これまでの経験や希望する働き方を伺い、当店の給与体系や待遇について詳しくご説明します。
          </p>
        </div>

        {/* コース別受取額テーブル */}
        <div className="overflow-x-auto scrollbar-thin mb-6 rounded-[16px] border border-[#F0DDE4]">
          <table className="w-full text-xs sm:text-sm border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-[#FFF1F5] text-[#1F2432] border-b border-[#F0DDE4]">
                <th scope="col" className="py-3 px-4 text-left font-bold">コース時間</th>
                <th scope="col" className="py-3 px-4 text-left font-bold">女性の受取給与額</th>
                <th scope="col" className="py-3 px-4 text-left font-bold">支払い方法・タイミング</th>
                <th scope="col" className="py-3 px-4 text-left font-bold">控除・天引き</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0DDE4]/80 bg-white">
              <tr className="hover:bg-[#FFFAFC]">
                <td className="py-3.5 px-4 font-bold text-[#1F2432]">15分コース</td>
                <td className="py-3.5 px-4">
                  <span className="font-black text-[#D8175D] text-base">3,800円</span>
                  <span className="text-[10px] text-zinc-500 block">延長15分毎に+3,800円</span>
                </td>
                <td className="py-3.5 px-4 font-bold text-[#1F2432]">全額即日日払い（退勤時手渡し）</td>
                <td className="py-3.5 px-4 font-bold text-[#D8175D]">完全0円（天引き一切なし）</td>
              </tr>
              <tr className="hover:bg-[#FFFAFC]">
                <td className="py-3.5 px-4 font-bold text-[#1F2432]">30分コース</td>
                <td className="py-3.5 px-4">
                  <span className="font-black text-[#D8175D] text-base">7,600円</span>
                  <span className="text-[10px] text-zinc-500 block">延長15分毎に+3,800円</span>
                </td>
                <td className="py-3.5 px-4 font-bold text-[#1F2432]">全額即日日払い（退勤時手渡し）</td>
                <td className="py-3.5 px-4 font-bold text-[#D8175D]">完全0円（天引き一切なし）</td>
              </tr>
              <tr className="hover:bg-[#FFFAFC]">
                <td className="py-3.5 px-4 font-bold text-[#1F2432]">45分コース</td>
                <td className="py-3.5 px-4">
                  <span className="font-black text-[#D8175D] text-base">11,400円</span>
                  <span className="text-[10px] text-zinc-500 block">延長15分毎に+3,800円</span>
                </td>
                <td className="py-3.5 px-4 font-bold text-[#1F2432]">全額即日日払い（退勤時手渡し）</td>
                <td className="py-3.5 px-4 font-bold text-[#D8175D]">完全0円（天引き一切なし）</td>
              </tr>
              <tr className="hover:bg-[#FFFAFC]">
                <td className="py-3.5 px-4 font-bold text-[#1F2432]">60分コース</td>
                <td className="py-3.5 px-4">
                  <span className="font-black text-[#D8175D] text-base">15,200円</span>
                  <span className="text-[10px] text-zinc-500 block">以降15分毎に+3,800円加算</span>
                </td>
                <td className="py-3.5 px-4 font-bold text-[#1F2432]">全額即日日払い（退勤時手渡し）</td>
                <td className="py-3.5 px-4 font-bold text-[#D8175D]">完全0円（天引き一切なし）</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 勤務条件・待遇の掲載項目 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#FFFAFC] p-3.5 rounded-[14px] border border-[#F0DDE4]">
            <span className="font-bold text-[#1F2432] block mb-1">出勤条件・シフト</span>
            <p className="text-[#555555]">週1日〜・短時間OK。出勤ノルマ・罰金・待機カットは一切ありません。</p>
          </div>
          <div className="bg-[#FFFAFC] p-3.5 rounded-[14px] border border-[#F0DDE4]">
            <span className="font-bold text-[#1F2432] block mb-1">勤務時間</span>
            <p className="text-[#555555]">昼のみ・夜のみ・フルタイムなど自由に設定可能。終電上がりも歓迎。</p>
          </div>
          <div className="bg-[#FFFAFC] p-3.5 rounded-[14px] border border-[#F0DDE4]">
            <span className="font-bold text-[#1F2432] block mb-1">交通費などの支給条件</span>
            <p className="text-[#555555]">交通費支給制度あり。女性専用の無料送迎車も運行しています。</p>
          </div>
          <div className="bg-[#FFFAFC] p-3.5 rounded-[14px] border border-[#F0DDE4]">
            <span className="font-bold text-[#1F2432] block mb-1">その他の厚待遇</span>
            <p className="text-[#555555]">家具家電付き即入居個室寮完備、衣装無料レンタル、提携託児所補助あり。</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => onNavigateTopic('salary')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D8175D] hover:underline cursor-pointer"
          >
            <span>給料・待遇の詳細ページを見る</span>
            <LucideIcon name="ChevronRight" size={14} />
          </button>
        </div>
      </section>

      {/* 7. 移籍を検討している女性へのメッセージ */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            STAFF MESSAGE
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            移籍について、一人で悩まずご相談ください。
          </h2>
        </div>

        <div className="bg-[#FFFAFC] rounded-[20px] p-5 sm:p-8 border border-[#F0DDE4] max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#D8175D]/30 shrink-0 shadow-sm bg-rose-50">
              <img
                src="/images/shinodayama_advisor_sakura_1792225964799.webp"
                alt="女性相談窓口 あおいスタッフ"
                width={96}
                height={96}
                decoding="async"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="mb-2">
                <span className="inline-block text-[11px] font-bold bg-[#FFF1F5] text-[#D8175D] px-2.5 py-0.5 rounded-full border border-[#F0DDE4] mb-1">
                  女性相談窓口 担当
                </span>
                <h3 className="font-bold text-base sm:text-lg text-[#1F2432]">
                  あおいスタッフ
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-4">
                今のお店から移籍することは、給与や働き方だけでなく、これからの生活にも関わる大切な選択です。<br />
                「今より条件が良くなるのか」「新しいお店に馴染めるのか」「お客様はつくのか」など、気になることは人それぞれです。<br />
                当店では、移籍を検討している方のお話を伺い、給与・待遇・仕事内容などを一つずつご説明します。
              </p>

              <div className="bg-white rounded-[14px] p-3.5 border border-[#F0DDE4] text-xs text-[#555555] mb-4 text-left">
                <span className="font-bold text-[#1F2432] block mb-1">ご相談いただける内容例：</span>
                <ul className="space-y-1 pl-4 list-disc text-[11px] sm:text-xs text-[#666666]">
                  <li>現在のお店の給与システムとの手取り比較</li>
                  <li>客層や指名の入り方、日々の稼働状況</li>
                  <li>以前のお店との人間関係や身バレを避けるための出勤方法</li>
                  <li>実際の待機室・旅館設備の見学希望</li>
                </ul>
              </div>

              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLineClick}
                className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white py-2.5 px-6 rounded-full font-bold text-xs sm:text-sm shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                <LucideIcon name="MessageCircle" size={16} className="fill-white" />
                <span>あおいスタッフにLINEで移籍相談する</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 移籍前に確認したい質問 (10問のアコーディオン) */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="HelpCircle" size={13} />
            <span>Q&A</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            経験者の方からよくある質問
          </h2>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {experiencedFaqs.map((faq, idx) => {
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

      {/* 9. 関連記事（既存の関連性が高い記事・写真付きカード） */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            RELATED ARTICLES
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            経験者の方におすすめの記事
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4">
          {[
            {
              title: '仕事内容について',
              desc: '接客の流れ・旅館環境',
              topicId: 'job',
              img: '/images/col_ryokan_manner_1792465891118.webp'
            },
            {
              title: '給料・待遇について',
              desc: 'コース別給与・支払い',
              topicId: 'salary',
              img: '/images/col_bonus_envelope_jp_1792476753315.webp'
            },
            {
              title: '信太山新地で働くメリット',
              desc: '他業種との違い・働きやすさ',
              slug: 'shinodayamashinchi-vs-other-night-jobs',
              img: '/images/col_aroma_relax_1792474257103.webp'
            },
            {
              title: '女性インタビュー',
              desc: '実際に働く女性のリアルな声',
              topicId: 'interview',
              img: '/images/cast_mai_snap_1794475286956.webp'
            },
            {
              title: 'お仕事までの流れ',
              desc: '相談から勤務開始まで',
              topicId: 'flow',
              img: '/images/col_taiken_prep_1792475646166.webp'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (item.topicId) {
                  onNavigateTopic(item.topicId);
                } else if (item.slug && onNavigateBlog) {
                  onNavigateBlog(item.slug);
                }
              }}
              className="bg-[#FFFAFC] rounded-[18px] border border-[#F0DDE4] overflow-hidden hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-rose-50">
                  <img
                    src={item.img}
                    alt={item.title}
                    width={1200}
                    height={670}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-xs sm:text-[13px] text-[#1F2432] group-hover:text-[#D8175D] transition-colors mb-0.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#777777]">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="px-3 pb-2.5 text-[10px] sm:text-[11px] font-bold text-[#D8175D] flex items-center justify-end gap-0.5">
                <span>読む</span>
                <LucideIcon name="ChevronRight" size={11} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. 最後のLINE相談エリア */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-3">
          <LucideIcon name="MessageCircle" size={13} />
          <span>秘密厳守・条件確認OK</span>
        </div>

        <h2 className="font-display font-extrabold text-lg sm:text-xl md:text-[22px] text-[#1F2432] mb-2">
          今のお店と比較して、納得できる移籍先を探しませんか？
        </h2>

        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-lg mx-auto">
          給与・待遇・集客・待機環境・働き方など、気になることを事前にご確認いただけます。<br />
          移籍を決めていない段階でも、条件についての質問や相談だけで大丈夫です。
        </p>

        <div className="flex flex-col items-center">
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLineClick}
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#06C755]/25 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            id="experienced-page-line-cta-btn"
          >
            <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
            <span>LINEで移籍について相談する</span>
          </a>

          <span className="text-xs text-[#777777] font-medium mt-2.5">
            経験者の方からのご相談をお待ちしています。
          </span>
        </div>
      </section>

    </div>
  );
}
