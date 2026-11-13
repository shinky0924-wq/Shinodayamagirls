/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface ShopsPageContentProps {
  onCtaclick: () => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onInjectedScroll?: (msg: string) => void;
  onNavigateCompare?: () => void;
}

export default function ShopsPageContent({
  onCtaclick,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
  onNavigateCompare,
}: ShopsPageContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [checkedList, setCheckedList] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedList(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleLineClick = (e: React.MouseEvent) => {
    const msg = '【信太山新地の当店へ応募・相談】お店選び（集客力や待機環境、半年ルールなど）について詳しく相談してみたいです。';
    if (onInjectedScroll) {
      e.preventDefault();
      onInjectedScroll(msg);
    } else if (onCtaclick) {
      e.preventDefault();
      onCtaclick();
    }
  };

  // 8. お店選びに関するよくある質問
  const shopsFaqs = [
    {
      q: 'お店によってお給料は違いますか？',
      a: 'お給料の設定やバックの仕組みはお店によって異なります。表示金額だけでなく、実際の受取条件を確認することが大切です。当店は天引き完全ゼロの明朗会計です。'
    },
    {
      q: 'お店の集客力はどうやって確認できますか？',
      a: 'お客様の来店状況や待機時間、集客方法などを面接や見学の際に質問してみましょう。当店では実際の来客状況や待機時間を事前に包み隠さずお答えします。'
    },
    {
      q: '入店前にお店を見学できますか？',
      a: '見学の可否や方法については、お店に事前にご相談ください。当店では履歴書不要・私服のままで待機個室や旅館環境の事前見学を随時歓迎しております。'
    },
    {
      q: '半年ルールとは何ですか？',
      a: '信太山新地全体の統一規約として、一度ある旅館（お店）に入店して在籍すると、原則として半年間（6ヶ月間）が経過するまで信太山新地内の他店へ移籍できないという独自ルールです。客足の少ないお店を選んでしまうと半年間思うように稼げないリスクがあるため、最初のお店選びが非常に重要です。当店ではこのルールについても包み隠さず丁寧にご説明しております。'
    },
    {
      q: 'すぐに入店を決めないといけませんか？',
      a: '条件や仕事内容を確認し、納得したうえで判断することが大切です。不明点は事前にご相談ください。当店では無理な勧誘や即決の強要は一切行いません。'
    }
  ];

  const checklistItems = [
    '実際に受け取れるお給料はいくらか',
    'お給料から控除されるものはあるか',
    'お客様の入り方や待機時間の目安',
    '出勤日数や勤務時間の条件',
    '待機場所や勤務環境',
    '接客内容や仕事内容',
    '欠勤・遅刻・早退時のルール',
    '退店・移籍に関する条件',
    '困ったときに相談できるスタッフがいるか',
    '求人情報と実際の条件に違いがないか'
  ];

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

      {/* 1. ファーストビューを全面変更 */}
      <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* 左側：見出し・説明文 */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#D8175D] uppercase mb-2">
              SHOP SELECTION GUIDE
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1F2432] leading-tight mb-3 tracking-tight">
              後悔しないお店選び。<br />
              <span className="text-[#D8175D]">自分に合ったお店を見つけよう</span>
            </h1>
            <p className="text-sm sm:text-base font-bold text-[#D8175D] mb-4 leading-snug">
              集客力・お給料・接客スタイル・サポート体制。<br className="hidden sm:inline" />
              働き始めてから後悔しないために、入店前に確認しておきたいポイントを分かりやすく解説します。
            </p>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
              信太山新地には、それぞれ特徴の異なるお店があります。お給料だけで決めるのではなく、お客様の入り方や働きやすさ、スタッフの対応なども大切です。自分に合ったお店を見つけるために、選び方のポイントを確認していきましょう。
            </p>

            {/* ボタンエリア */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLineClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base shadow-md shadow-[#06C755]/20 hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
                id="shops-hero-line-cta-btn"
              >
                <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
                <span>LINEでお店選びを相談する</span>
              </a>
              <span className="text-xs text-[#777777] font-medium pl-1">
                相談・質問だけでも大歓迎です。
              </span>
            </div>
          </div>

          {/* 右側：上品な和風の店舗外観・清潔感のある店内写真 */}
          <div className="w-full md:w-[42%] lg:w-[40%] shrink-0">
            <div className="relative rounded-[20px] overflow-hidden border border-[#F0DDE4] shadow-sm aspect-[4/3] bg-[#FFF1F5]">
              <img
                src="/images/col_secure_ryotei_1792475628730.webp"
                alt="上品で落ち着いた和風の料亭旅館外観"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                width={480}
                height={360}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold bg-black/45 backdrop-blur-xs px-3 py-1.5 rounded-[10px] text-center border border-white/20">
                落ち着いた老舗旅館・清潔な完全個室待機環境
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. お店選びで確認したい6つのポイント (3列×2段) */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            6 CHECKPOINTS
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] mb-3">
            お店選びで失敗しないために確認したい6つのポイント
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            入店してから「思っていた条件と違った」とならないように、事前に確認しておきたいポイントをまとめました。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              num: '01',
              title: '集客力・お客様の入り方',
              desc: 'お給料だけでなく、お客様がどのくらい来店するのかも大切なポイントです。お客様の入り方や待機時間の目安、集客方法などを事前に確認しておきましょう。',
              icon: 'Users'
            },
            {
              num: '02',
              title: 'お給料・バックの仕組み',
              desc: '表示されている金額だけで判断せず、実際の受取金額やバックの計算方法を確認しましょう。控除や交通費、各種手当についても事前に聞いておくと安心です。お店によってもバックは変わります。',
              icon: 'Coins'
            },
            {
              num: '03',
              title: '待機時間・勤務環境',
              desc: '出勤してからどのように過ごすのか、待機場所はどんな環境なのかも確認したいポイントです。落ち着いて過ごせる環境かどうか、自分の目で確かめましょう。集団待機か完全個室待機かも大切です。',
              icon: 'Home'
            },
            {
              num: '04',
              title: '接客スタイル・仕事内容',
              desc: 'どのようなお客様を接客するのか、仕事内容や接客の流れを事前に確認しましょう。自分が無理なく働ける内容かどうかを知ることが大切です。過剰なサービスを強要されないかもチェックしましょう。',
              icon: 'HeartHandshake'
            },
            {
              num: '05',
              title: 'スタッフの対応・サポート',
              desc: '困ったときに相談できるスタッフがいるか、初めての方への説明が丁寧かどうかも重要です。質問にきちんと答えてくれるお店を選びましょう。',
              icon: 'Smile'
            },
            {
              num: '06',
              title: '出勤条件・お店独自のルール',
              desc: '出勤日数や勤務時間、欠勤時の対応、移籍に関する条件などはお店によって異なります。入店前にルールを確認し、納得したうえで働き始めましょう。',
              icon: 'ClipboardCheck'
            }
          ].map((item) => (
            <div
              key={item.num}
              className="bg-[#FFFAFC] rounded-[20px] p-5 sm:p-6 border border-[#F0DDE4] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shadow-2xs">
                    <LucideIcon name={item.icon} size={19} />
                  </div>
                  <span className="font-mono font-black text-xs text-[#D8175D] bg-[#FFF1F5] px-2.5 py-1 rounded-full border border-[#F0DDE4]">
                    POINT {item.num}
                  </span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-2 leading-snug">
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

      {/* 3. 当店を選ぶメリット */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            OUR ADVANTAGES
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] mb-3">
            当店で働く前に知ってほしいこと
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            お店を選ぶときは、条件だけでなく、実際に働く環境やスタッフの対応も大切です。<br className="hidden sm:inline" />
            当店では、入店前のご相談から勤務開始まで、一人ひとりの疑問に丁寧にお答えします。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              num: '01',
              title: '入店前に条件を確認できる',
              desc: '働き始めてから認識の違いが生まれないよう、給与・勤務時間・仕事内容などを事前にご説明します。'
            },
            {
              num: '02',
              title: '初めての方も相談しやすい',
              desc: '分からないことや不安なことは、入店前でもお気軽にご相談いただけます。'
            },
            {
              num: '03',
              title: '自分に合った働き方を相談できる',
              desc: '希望する出勤日数や時間帯、生活スタイルなどをお聞きしながら働き方をご案内します。'
            },
            {
              num: '04',
              title: '女性スタッフに相談できる',
              desc: '働くうえで気になることや困ったことを相談できる窓口をご案内します。'
            },
            {
              num: '05',
              title: '働きやすい環境',
              desc: '店先での顔出しは一切なく、旅館の清潔な完全個室で人目を気にせず落ち着いて待機していただけます。'
            },
            {
              num: '06',
              title: '昔から経営していて常連様が多く集客力があって安定して稼げる',
              desc: '信太山新地で長年培ってきた信頼と知名度があり、紳士的な常連様を中心に安定した客足があるため、待機損なく安心して稼いでいただけます。'
            }
          ].map((item) => (
            <div
              key={item.num}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#D8175D] text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                    {item.num}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-[#1F2432] leading-snug">
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

      {/* 4. 集客力について分かりやすく解説 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3.5 py-1 rounded-full border border-[#F0DDE4] mb-2.5">
            <LucideIcon name="TrendingUp" size={13} />
            <span>来客状況のチェック</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] mb-3">
            お客様の入り方はお店選びの大切なポイント
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            同じエリアにあるお店でも、お客様の来店状況や集客方法は異なります。<br />
            そのため、求人に掲載されているお給料だけで判断するのではなく、実際のお客様の入り方や待機時間についても確認することが大切です。
          </p>
        </div>

        {/* 確認したい3つのポイント */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            {
              title: 'お客様はどのような方法で来店するのか',
              desc: '長年の常連様中心か、観光やフリー客の比率など、どんな集客基盤があるか確認しましょう。',
              icon: 'Footprints'
            },
            {
              title: '平日・週末でお客様の入り方に違いはあるのか',
              desc: '昼間や平日の稼働状況、週末の回転ペースなど、時間帯による違いを把握しておくと安心です。',
              icon: 'Calendar'
            },
            {
              title: '出勤した際の待機時間はどのくらいなのか',
              desc: '1日の平均接客本数や、お部屋に入っていない時間の過ごし方・目安を事前に質問しましょう。',
              icon: 'Clock'
            }
          ].map((c, i) => (
            <div key={i} className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mx-auto mb-3 shadow-2xs">
                <LucideIcon name={c.icon} size={19} />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-2 leading-snug">
                {c.title}
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 半年ルール・移籍条件について（ピンクと薄い黄色を使った注意喚起デザイン） */}
      <section className="bg-gradient-to-b from-[#FFFDF5] to-[#FFF5F8] rounded-[24px] p-6 sm:p-9 border-2 border-amber-200/90 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <LucideIcon name="AlertTriangle" size={17} />
            </span>
            <div className="inline-block bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">
              入店前に知っておくべき業界ルール
            </div>
          </div>

          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-3">
            入店前に知っておくべき「半年ルール」と移籍条件
          </h2>

          <div className="text-xs sm:text-sm text-[#444444] leading-relaxed mb-6 space-y-2">
            <p>
              信太山新地には、新地エリア全体の統一規約として<strong className="text-[#D8175D] font-bold">「一度ある旅館（店舗）に入店・在籍すると、原則半年間（6ヶ月間）が経過するまで信太山新地内の他のお店へ移籍できない」</strong>という独自ルール（半年ルール）が存在します。
            </p>
            <p>
              もし最初に入ったお店でお客様の入りが悪かったり、待機環境やお店の雰囲気が合わなかった場合でも、半年間はエリア内の他店舗で働くことができなくなってしまいます。
            </p>
            <p className="font-bold text-[#1F2432]">
              だからこそ、信太山新地で働くうえで「最初のお店選び」は最も大切で、後悔しないための決定的なポイントになります。
            </p>
          </div>

          <div className="bg-white rounded-[18px] p-5 sm:p-6 border border-amber-200 shadow-2xs">
            <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-3 flex items-center gap-2">
              <LucideIcon name="CheckCircle2" size={17} className="text-[#D8175D]" />
              <span>「半年ルール」について事前に知っておくべき重要事項</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#555555]">
              <li className="flex items-start gap-2.5 bg-[#FFFDF5] p-3 rounded-[10px] border border-amber-100">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="font-bold text-[#1F2432] block mb-0.5">信太山新地エリア全体の共通規約</strong>
                  <span className="text-[#555555]">特定のお店だけのハウスルールではなく、信太山新地の組合加盟店舗すべてに適用される地域共通のルールです。</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5 bg-[#FFFDF5] p-3 rounded-[10px] border border-amber-100">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="font-bold text-[#1F2432] block mb-0.5">他店へ移籍するには6ヶ月間のインターバルが必要</strong>
                  <span className="text-[#555555]">一度入店した店舗を退店しても、6ヶ月間が経過するまでは信太山新地内の別の旅館で働くことはできません。</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5 bg-[#FFFDF5] p-3 rounded-[10px] border border-amber-100">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="font-bold text-[#1F2432] block mb-0.5">集客力のない店舗に入ると半年間稼げないリスク</strong>
                  <span className="text-[#555555]">客足の少ないお店を選んでしまうと、稼げない・待機が長いと感じても半年間身動きが取れなくなってしまいます。</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5 bg-[#FFFDF5] p-3 rounded-[10px] border border-amber-100">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="font-bold text-[#1F2432] block mb-0.5">当店（直営老舗グループ）なら安定稼働・グループ内相談も可能</strong>
                  <span className="text-[#555555]">当店は信太山新地でもトップクラスの知名度と紳士常連様を抱える老舗旅館直営のため、客足が途切れず安心。系列複数店舗の直営ネットワークがあるため、環境が合わない場合も柔軟に相談に乗ることができます。</span>
                </div>
              </li>
            </ul>
            <p className="text-[11px] text-[#777777] mt-4 pt-3 border-t border-amber-100 leading-relaxed">
              ※当店では、女性が不利になるような情報を隠すことはいたしません。面接や見学、事前のLINE相談でもこの「半年ルール」について分かりやすく正直にご説明しております。
            </p>
          </div>
        </div>
      </section>

      {/* 6. 入店前に確認するチェックリスト */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3.5 py-1 rounded-full border border-[#F0DDE4] mb-2.5">
            <LucideIcon name="CheckSquare" size={13} />
            <span>CHECKLIST</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] mb-3">
            面接・見学で確認しておきたいこと
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            気になることは、入店を決める前に遠慮なく確認しておきましょう。
          </p>
        </div>

        <div className="bg-[#FFFAFC] rounded-[20px] p-5 sm:p-7 border border-[#F0DDE4] max-w-3xl mx-auto shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checklistItems.map((text, idx) => {
              const isChecked = !!checkedList[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-3.5 rounded-[14px] border transition-all cursor-pointer flex items-center gap-3 select-none ${
                    isChecked
                      ? 'bg-[#FFF1F5] border-[#D8175D] text-[#D8175D]'
                      : 'bg-white border-[#F0DDE4] text-[#333333] hover:border-[#D8175D]/40'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-[#D8175D] border-[#D8175D] text-white'
                        : 'border-zinc-300 bg-white'
                    }`}
                  >
                    {isChecked && <LucideIcon name="Check" size={13} />}
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold leading-snug">
                    {text}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-[#777777] text-center mt-4">
            ※タップして確認済みにチェックを入れられます。面接時の確認メモとしてご活用ください。
          </p>
        </div>
      </section>

      {/* 7. お店選びでよくある失敗 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            COMMON MISTAKES
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] mb-3">
            入店してから後悔しないために
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            お店選びでありがちな失敗ポイントを知り、納得のいく店舗を選びましょう。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              num: '01',
              title: '給与の金額だけで決めてしまう',
              desc: '表示されている金額だけでなく、実際の受取条件や控除についても確認しましょう。'
            },
            {
              num: '02',
              title: 'お客様の入り方を確認していない',
              desc: '求人情報だけでは分からない待機時間や来店状況についても質問しておきましょう。'
            },
            {
              num: '03',
              title: 'お店のルールを理解していない',
              desc: '勤務条件や移籍条件など、後から困らないように入店前に確認しましょう。'
            },
            {
              num: '04',
              title: '不安や疑問を残したまま入店する',
              desc: '分からないことをそのままにせず、納得できるまで説明を受けてから判断しましょう。'
            }
          ].map((item) => (
            <div
              key={item.num}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs flex flex-col justify-between"
            >
              <div>
                <span className="font-mono font-black text-xs text-[#D8175D] bg-[#FFF1F5] px-2.5 py-0.5 rounded-full border border-[#F0DDE4] inline-block mb-2.5">
                  FAIL {item.num}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. 関連記事 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            RECOMMENDED ARTICLES
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            お店選びに役立つおすすめ記事
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: '信太山新地でお店を選ぶときに確認したいポイント',
              desc: '後悔しないための環境・客層・サポート体制の見極め方',
              topicId: 'job',
              img: '/images/col_ryokan_manner_1792465891118.webp'
            },
            {
              title: 'お給料の仕組みと実際の受取金額について',
              desc: 'コース別報酬・日払い・天引きゼロの計算方法',
              topicId: 'salary',
              img: '/images/col_bonus_envelope_jp_1792476753315.webp'
            },
            {
              title: '半年ルールとは？入店前に確認したい移籍条件',
              desc: '組合規約の仕組みとトラブルを防ぐための事前確認',
              topicId: 'experienced',
              img: '/images/col_official_documents_1792465890547.webp'
            },
            {
              title: '初めてのお店選びで失敗しないためのチェックリスト',
              desc: '面接や見学で聞いておくべき必須の10項目まとめ',
              topicId: 'flow',
              img: '/images/col_taiken_prep_1792475646166.webp'
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
                    width={1200}
                    height={670}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xs sm:text-sm text-[#1F2432] group-hover:text-[#D8175D] transition-colors mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#777777] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="px-4 pb-3 text-[11px] font-bold text-[#D8175D] flex items-center justify-end gap-1">
                <span>詳しく読む</span>
                <LucideIcon name="ChevronRight" size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. よくある質問 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="HelpCircle" size={13} />
            <span>Q&A</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            お店選びに関するよくある質問
          </h2>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {shopsFaqs.map((faq, idx) => {
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

      {/* 10. 最後のLINE相談エリア */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-3">
          <LucideIcon name="MessageCircle" size={13} />
          <span>24時間受付中</span>
        </div>

        <h2 className="font-display font-extrabold text-lg sm:text-xl md:text-[22px] text-[#1F2432] mb-2">
          信太山新地では、最初のお店選びがかなり重要です。
        </h2>

        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-xl mx-auto">
          信太山新地には「半年ルール」があるからこそ、最初のお店選びで絶対に後悔してほしくありません。<br className="hidden sm:inline" />
          「自分に合うお店の基準が分からない」「客足やお給料の目安、待機環境を事前に詳しく知りたい」など、どんな疑問もお気軽にご相談ください。<br className="hidden sm:inline" />
          無理な勧誘や入店を急かすことは一切なく、あなたが納得して安心できるよう一つひとつ丁寧にお答えします。
        </p>

        <div className="flex flex-col items-center">
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLineClick}
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#06C755]/25 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            id="shops-page-final-line-btn"
          >
            <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
            <span>LINEでお店選びを相談する</span>
          </a>

          <span className="text-xs text-[#777777] font-medium mt-2.5">
            質問だけでも大歓迎｜女性スタッフが丁寧にお答えします。
          </span>
        </div>
      </section>

    </div>
  );
}
