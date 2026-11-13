/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LucideIcon from './LucideIcon';
import { BLOG_ARTICLES, BlogArticle } from '../blogData';
import { LINE_OFFICIAL_URL } from '../data';

interface JobPageContentProps {
  onCtaclick: () => void;
  onNavigateBlog: (slug?: string) => void;
  onNavigateFaq: () => void;
  onInjectedScroll?: (msg: string) => void;
  onNavigateCompare?: () => void;
}

export default function JobPageContent({
  onCtaclick,
  onNavigateBlog,
  onInjectedScroll,
}: JobPageContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleLineClick = (e: React.MouseEvent) => {
    const msg = '【信太山新地の当店へ応募・相談】お仕事内容について詳しく聞いてみたいです。';
    if (onInjectedScroll) {
      e.preventDefault();
      onInjectedScroll(msg);
    } else if (onCtaclick) {
      e.preventDefault();
      onCtaclick();
    }
  };

  // 11. よくある質問 (8問)
  const jobFaqs = [
    {
      q: '未経験でも働けますか？',
      a: 'はい、全く問題ありません。当店で働く女性の約90%が夜職や接客の完全未経験からスタートしています。初日は女性スタッフが横について丁寧にお仕事の手順をお教えしますのでご安心ください。'
    },
    {
      q: '仕事内容について面接前に詳しく聞けますか？',
      a: 'はい、公式LINEにて面接前でも詳しくお答えしています。応募するか決めていない段階でのご質問や、仕事内容・給料についての確認だけでも大歓迎です。'
    },
    {
      q: '待機中はどこで過ごしますか？',
      a: '旅館の清潔な完全個室で待機していただきます。飛田新地のように店先に座る必要は一切ありません。Wi-Fi・冷暖房・充電器を完備しており、スマホを見ながら自由にお過ごしいただけます。'
    },
    {
      q: '出勤日数や時間は相談できますか？',
      a: 'はい、完全自由出勤制ですので自由に相談可能です。10:00〜24:00の間で「お昼の3時間だけ」「仕事帰りの夜だけ」「週1日・週末のみ」など、ライフスタイルに合わせて柔軟に調整できます。'
    },
    {
      q: 'お給料はいつ受け取れますか？',
      a: '退勤時にその場で全額現金手渡し（即日全額日払い）となります。紹介料や雑費の天引きは一切なく、稼いだ報酬は100%その日にお持ち帰りいただけます。'
    },
    {
      q: '体験入店だけでも可能ですか？',
      a: 'はい、短時間の体験入店だけでも大歓迎です。体験入店で稼いだ給与も全額その場で日払いいたします。合わないと感じた場合はその日だけで終了していただいても全く問題ありません。'
    },
    {
      q: '面接時に必要な持ち物はありますか？',
      a: '顔写真付き公的身分証明書（運転免許証・マイナンバーカード・パスポート等）が1点あればOKです。履歴書や住民票は一切不要で、私服のまま手ぶらでお越しいただけます。'
    },
    {
      q: '働くかどうかは見学後に決めても大丈夫ですか？',
      a: 'はい、もちろん大丈夫です。お店の雰囲気や待機個室を実際に見学し、お仕事内容や条件に納得してから働くかどうかをご自身で決めていただけます。無理な勧誘は一切行いません。'
    }
  ];

  // 10. お仕事内容に関連する記事 (4本)
  const relatedSlugs = [
    'shinodayama-job-guide',
    'shinodayamashinchi-work-flow-simulation',
    'shinodayama-salary-system',
    'shinodayama-safe-recruitment'
  ];

  const relatedArticles: BlogArticle[] = relatedSlugs
    .map(slug => BLOG_ARTICLES.find(a => a.slug === slug))
    .filter((a): a is BlogArticle => !!a);

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

      {/* 2. ページ上部のメインエリア */}
      <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* 左側：タイトルと説明文 */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#D8175D] uppercase mb-2">
              OUR WORK
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1F2432] leading-tight mb-2 tracking-tight">
              当店のお仕事内容について
            </h1>
            <p className="text-sm sm:text-base font-bold text-[#D8175D] mb-4">
              初めての方にも分かりやすく、仕事内容をご紹介します。
            </p>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
              信太山新地でのお仕事を検討している女性へ。接客の基本的な流れや勤務時間、お給料、待機中の過ごし方など、応募する前に知っておきたい情報をまとめました。
            </p>
            <div className="flex flex-wrap gap-2">
              {['店先顔出しなし', '完全個室待機', '15分〜短時間接客', '即日全額日払い'].map((tag) => (
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

          {/* 右側：実際の旅館・室内の写真 */}
          <div className="w-full md:w-[42%] lg:w-[40%] shrink-0">
            <div className="relative rounded-[20px] overflow-hidden border border-[#F0DDE4] shadow-sm aspect-[4/3] bg-[#FFF1F5]">
              <img
                src="/images/col_ryokan_manner_1792465891118.webp"
                alt="信太山新地 当店のお仕事環境・清潔な旅館個室"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                width={480}
                height={360}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-[10px] text-center border border-white/20">
                清潔な旅館客室・店先顔見せなし・完全個室待機
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 仕事内容の基本情報（4つのカード） */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* ① 接客時間 */}
          <div className="bg-white rounded-[18px] p-4 sm:p-5 border border-[#F0DDE4] shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F5] border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3">
              <LucideIcon name="Clock" size={19} />
            </div>
            <span className="text-[11px] font-bold text-[#777777] block mb-0.5">① 接客時間</span>
            <span className="font-display font-black text-lg sm:text-xl text-[#1F2432] block mb-1">
              15分〜60分
            </span>
            <p className="text-[11px] text-[#555555] leading-snug">
              コースにより異なります（最短15分〜）。
            </p>
          </div>

          {/* ② 給与体系 */}
          <div className="bg-white rounded-[18px] p-4 sm:p-5 border border-[#F0DDE4] shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F5] border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3">
              <LucideIcon name="Coins" size={19} />
            </div>
            <span className="text-[11px] font-bold text-[#777777] block mb-0.5">② 給与体系</span>
            <span className="font-display font-black text-lg sm:text-xl text-[#D8175D] block mb-1">
              歩合制＋保証
            </span>
            <p className="text-[11px] text-[#555555] leading-snug">
              15分3,800円〜・時給1万保証・即日日払い。
            </p>
          </div>

          {/* ③ 勤務スタイル */}
          <div className="bg-white rounded-[18px] p-4 sm:p-5 border border-[#F0DDE4] shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F5] border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3">
              <LucideIcon name="Calendar" size={19} />
            </div>
            <span className="text-[11px] font-bold text-[#777777] block mb-0.5">③ 勤務スタイル</span>
            <span className="font-display font-black text-lg sm:text-xl text-[#1F2432] block mb-1">
              自由シフト
            </span>
            <p className="text-[11px] text-[#555555] leading-snug">
              週1日〜・短時間OK・出勤ノルマなし。
            </p>
          </div>

          {/* ④ 待機環境 */}
          <div className="bg-white rounded-[18px] p-4 sm:p-5 border border-[#F0DDE4] shadow-2xs hover:shadow-xs transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#FFF1F5] border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3">
              <LucideIcon name="Home" size={19} />
            </div>
            <span className="text-[11px] font-bold text-[#777777] block mb-0.5">④ 待機環境</span>
            <span className="font-display font-black text-lg sm:text-xl text-[#1F2432] block mb-1">
              個室待機
            </span>
            <p className="text-[11px] text-[#555555] leading-snug">
              旅館直営の完全個室（店先顔出しなし）。
            </p>
          </div>
        </div>
      </section>

      {/* 4. 当店のサポート環境 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-8 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="HeartHandshake" size={13} />
            <span>安心の環境づくり</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            働く女性が安心できる環境づくりを大切にしています。
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {[
            {
              title: '女性スタッフサポート',
              desc: '応募・面接・体験まで女性スタッフが親身に対応します。',
              icon: 'Smile'
            },
            {
              title: '旅館の個室待機',
              desc: '他人の目を気にせず、プライベートな個室で過ごせます。',
              icon: 'DoorClosed'
            },
            {
              title: '事前の丁寧な説明',
              desc: 'お仕事内容や給与、ルールを事前に一つずつ説明します。',
              icon: 'FileText'
            },
            {
              title: '送迎・通勤の相談',
              desc: '主要駅からの無料送迎や車通勤・専用駐車場も相談可能です。',
              icon: 'Car'
            },
            {
              title: 'プライバシー配慮',
              desc: '完全源氏名・写真ネット公開なしで身バレを防止します。',
              icon: 'ShieldCheck'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[16px] p-4 border border-[#F0DDE4] text-center flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-2.5 shadow-2xs">
                <LucideIcon name={item.icon} size={18} />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-[#1F2432] mb-1 leading-snug">
                {item.title}
              </h3>
              <p className="text-[11px] text-[#555555] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 仕事内容で知っておきたい8つのポイント */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            CHECK POINTS
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            お仕事を始める前に知っておきたい8つのポイント
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {[
            {
              num: '①',
              title: 'どんなお仕事？',
              desc: '旅館のお部屋でお客様をおもてなしする個室接客です。お茶出しや歓談、スキンシップが中心で、お部屋の掃除や片付けは専任の仲居さんが行います。',
              icon: 'HeartHandshake'
            },
            {
              num: '②',
              title: '接客時間は？',
              desc: '最短15分から30分・45分・60分などの短時間コースです。時間の管理は仲居さんが行い、終了時に内線ワンコールでお知らせするため安心です。',
              icon: 'Clock'
            },
            {
              num: '③',
              title: 'お給料は？',
              desc: '15分3,800円〜・30分7,600円〜の高額バック＋時給1万円保証や日給保証。退勤時にその場で全額現金手渡し（雑費天引き0円）です。',
              icon: 'Coins'
            },
            {
              num: '④',
              title: '待機中は？',
              desc: '店先に座る必要は一切ありません。Wi-Fi・冷暖房・充電器完備の清潔な鍵付き個室で、スマホを見たり仮眠をとったり自由に過ごせます。',
              icon: 'Smartphone'
            },
            {
              num: '⑤',
              title: '未経験でも大丈夫？',
              desc: '在籍女性の約90%が夜職初心者からのスタートです。応募から面接、体験入店まで女性スタッフが親身に付き添い、丁寧にお教えします。',
              icon: 'Sparkles'
            },
            {
              num: '⑥',
              title: '出勤日は？',
              desc: '10:00〜24:00の間で完全自由出勤制です。「週1日だけ」「お昼の短時間だけ」「土日のみ」など、希望に合わせて自由に設定できます。',
              icon: 'CalendarDays'
            },
            {
              num: '⑦',
              title: '送迎はある？',
              desc: '信太山駅をはじめ主要駅や指定場所からの女性専用無料送迎を運行しています。マイカー・バイク通勤もOKで無料専用駐車場も完備しています。',
              icon: 'Car'
            },
            {
              num: '⑧',
              title: '嫌なことがあったら？',
              desc: '絶対ゴム着用厳守です。無理な要求やルール外の行為は断ってOKで、強引な場合は即座に退室できます。仲居さん・フロントが常に常駐しています。',
              icon: 'ShieldCheck'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-[16px] bg-[#FFFAFC] border border-[#F0DDE4] flex items-start gap-3.5 hover:border-[#D8175D]/40 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0 mt-0.5 shadow-2xs">
                <LucideIcon name={item.icon} size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1 flex items-center gap-1.5">
                  <span className="text-[#D8175D]">{item.num}</span>
                  <span>{item.title}</span>
                </h3>
                <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. 当店の働く環境・待遇（他店比較を削除し、当店の特徴を掲載） */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="Building2" size={13} />
            <span>公式採用窓口</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            当店で働く環境・待遇をご紹介
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: '① 旅館直営の個室待機',
              desc: '清潔で落ち着いた旅館の個室で、周りの目を気にせずプライベートに待機できます。Wi-Fiや冷暖房も完備。',
              icon: 'Home'
            },
            {
              title: '② 女性スタッフによるサポート',
              desc: '面接・体験入店から日常の相談まで、女性スタッフ（あおい）が親身に寄り添いサポートします。',
              icon: 'Smile'
            },
            {
              title: '③ 店先で顔を出さない接客スタイル',
              desc: '飛田新地のように通りに面した店先に座る必要は一切なく、身バレ・顔バレを徹底的に防ぎます。',
              icon: 'EyeOff'
            },
            {
              title: '④ 即日全額日払い',
              desc: '退勤時にその場で全額現金手渡し。紹介料・衣装代・厚生費などの不明瞭な天引きは一切ありません。',
              icon: 'Coins'
            },
            {
              title: '⑤ 送迎・交通費支給',
              desc: '主要駅からの無料送迎を完備。遠方・出稼ぎの方には規定により往復交通費を全額支給いたします。',
              icon: 'Car'
            },
            {
              title: '⑥ 自分の希望に合わせた出勤相談',
              desc: '出勤ノルマ・ペナルティ・罰金は一切なし。ご自身の生活都合に合わせてシフトを自由に相談できます。',
              icon: 'CalendarCheck'
            }
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3 shadow-2xs">
                  <LucideIcon name={card.icon} size={19} />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-2 leading-snug">
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

      {/* 7. 1日のスケジュール（時間軸・ステップ形式） */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            DAILY SCHEDULE
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-2">
            出勤から退勤までの1日の流れ
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            初めての方でも働くイメージができるよう、基本的な1日の流れをご紹介します。出勤時間や勤務状況によって内容は異なります。
          </p>
        </div>

        <div className="space-y-3.5 max-w-2xl mx-auto">
          {[
            {
              step: 'STEP 01',
              title: 'お店に到着・出勤確認',
              desc: '私服のまま手ぶらで出勤。仲居さんや女性スタッフが笑顔でお迎えし、本日の予定を確認します。',
              icon: 'DoorOpen'
            },
            {
              step: 'STEP 02',
              title: '身支度・準備',
              desc: '清潔な個室控室へ。無料レンタル衣装に着替えたり、メイク直しをしてリラックスして準備します。',
              icon: 'Sparkles'
            },
            {
              step: 'STEP 03',
              title: '待機・お客様のご案内',
              desc: '個室でスマホを見たり自由に待機。お客様がご来店されると、仲居さんがお部屋へご案内します。',
              icon: 'Clock'
            },
            {
              step: 'STEP 04',
              title: '接客・終了後の確認',
              desc: '15分〜60分の接客。仲居さんが時間管理し、内線電話でお知らせ。お部屋の掃除や片付けは不要です。',
              icon: 'HeartHandshake'
            },
            {
              step: 'STEP 05',
              title: 'お給料の確認・退勤',
              desc: 'その日の売上や保証給を計算し、全額現金で手渡し受取。無料送迎車で安全に帰宅できます。',
              icon: 'Coins'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[16px] p-4 sm:p-5 border border-[#F0DDE4] flex items-start gap-4"
            >
              <div className="flex flex-col items-center shrink-0">
                <span className="font-mono font-black text-xs text-[#D8175D] bg-[#FFF1F5] px-2.5 py-1 rounded-full border border-[#F0DDE4]">
                  {item.step}
                </span>
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

      {/* 8. 接客の基本的な流れ（ステップ形式） */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            SERVICE FLOW
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-2">
            1回の接客の基本的な流れ
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            接客前の確認から終了後の対応まで、初めての女性でも安心しておもてなしができる流れをご説明します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
          {[
            {
              step: '01',
              title: 'お部屋へ移動・ご挨拶',
              desc: '仲居さんの案内でお部屋へ。笑顔でお茶出しとご挨拶を行います。',
              icon: 'Smile'
            },
            {
              step: '02',
              title: 'コース確認・おもてなし',
              desc: '15分〜60分の時間に合わせて、会話やスキンシップを楽しみます。',
              icon: 'Heart'
            },
            {
              step: '03',
              title: '安全ルールの徹底',
              desc: '絶対ゴム着用厳守。無理な要求は断ってOK、即中断可能です。',
              icon: 'ShieldCheck'
            },
            {
              step: '04',
              title: '時間管理と終了',
              desc: '仲居さんが正確に計測。終了時に内線ワンコールが鳴り終了します。',
              icon: 'Bell'
            },
            {
              step: '05',
              title: 'シャワー・お見送り',
              desc: 'シャワー後にお見送り。お部屋の掃除や片付けは仲居さん担当です。',
              icon: 'Sparkles'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[16px] p-4 border border-[#F0DDE4] flex flex-col justify-between text-center"
            >
              <div>
                <span className="font-mono font-black text-xs text-[#D8175D] bg-[#FFF1F5] px-2 py-0.5 rounded-full border border-[#F0DDE4] inline-block mb-2.5">
                  STEP {item.step}
                </span>
                <div className="w-9 h-9 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mx-auto mb-2 shadow-2xs">
                  <LucideIcon name={item.icon} size={16} />
                </div>
                <h3 className="font-bold text-xs sm:text-[13px] text-[#1F2432] mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. 安心して働くためのルール */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="ShieldCheck" size={13} />
            <span>女性を守る方針</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            女性が安心して働くために、当店が大切にしていること
          </h2>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {[
            {
              title: '無理な要求やルール外の対応を強制しない',
              desc: '泥酔客やマナーの悪い客はお断り。女性が嫌がる行為やゴムなし行為は固く禁止しています。',
              icon: 'ShieldOff'
            },
            {
              title: '困ったことはスタッフに相談できる',
              desc: '女性相談窓口（あおい）や仲居さんが常に現場に常駐し、どんな些細な疑問やトラブルも守ります。',
              icon: 'MessageCircle'
            },
            {
              title: 'プライバシーや個人情報を大切に扱う',
              desc: '完全源氏名勤務、写真のネット公開なし、街の路上撮影禁止など、身バレ対策を徹底しています。',
              icon: 'Lock'
            },
            {
              title: '事前に仕事内容・給与・待遇を説明する',
              desc: '面接時に条件やルールを包み隠さず明示。引かれ物なしの手取り100%支給をお約束します。',
              icon: 'FileCheck'
            },
            {
              title: '不安や疑問を残したまま仕事を始めない',
              desc: '質問や見学だけでも大歓迎。疑問が解消し、ご自身が納得してからお仕事をスタートできます。',
              icon: 'CheckCircle'
            }
          ].map((rule, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[16px] p-4 sm:p-4.5 border border-[#F0DDE4] flex items-start gap-3.5"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0 mt-0.5 shadow-2xs">
                <LucideIcon name={rule.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xs sm:text-sm text-[#1F2432] mb-0.5">
                  {rule.title}
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. 関連記事 */}
      {relatedArticles.length > 0 && (
        <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#F0DDE4]">
            <div>
              <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-0.5">
                RELATED ARTICLES
              </span>
              <h2 className="font-display font-black text-lg sm:text-xl text-[#1F2432]">
                お仕事内容に関連する解説コラム
              </h2>
            </div>
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                onNavigateBlog();
              }}
              className="text-xs font-bold text-[#D8175D] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>コラム一覧を見る</span>
              <LucideIcon name="ChevronRight" size={13} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedArticles.map((art) => (
              <a
                key={art.slug}
                href={`/blog/${art.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateBlog(art.slug);
                }}
                className="bg-[#FFFAFC] rounded-[18px] border border-[#F0DDE4] overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group text-left"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-rose-50">
                    <img
                      src={art.eyeCatch || '/images/col_ryokan_manner_1792465891118.webp'}
                      alt={art.title}
                      width={1200}
                      height={670}
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-[#D8175D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {art.categoryLabel || art.category}
                    </div>
                  </div>
                  <div className="p-3.5">
                    <h3 className="font-bold text-xs sm:text-[13px] text-[#1F2432] group-hover:text-[#D8175D] transition-colors line-clamp-2 leading-snug mb-1.5">
                      {art.title}
                    </h3>
                    <p className="text-[11px] text-[#777777] line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                </div>
                <div className="px-3.5 pb-3 pt-1 text-[11px] font-bold text-[#D8175D] flex items-center justify-end gap-1">
                  <span>詳しく読む</span>
                  <LucideIcon name="ArrowRight" size={12} />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 11. よくある質問（アコーディオン形式） */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="HelpCircle" size={13} />
            <span>Q&A</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            お仕事内容についてのよくある質問
          </h2>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {jobFaqs.map((faq, idx) => {
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

      {/* 12. 最後の応募エリア */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-3">
          <LucideIcon name="MessageCircle" size={13} />
          <span>LINEで気軽に質問OK</span>
        </div>

        <h2 className="font-display font-extrabold text-lg sm:text-xl md:text-[22px] text-[#1F2432] mb-2">
          お仕事内容について、気になることはありませんか？
        </h2>

        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-lg mx-auto">
          初めてのお仕事は分からないことや不安も多いと思います。仕事内容・お給料・働き方など、気になることは女性スタッフにお気軽にご相談ください。
        </p>

        <div className="flex flex-col items-center">
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLineClick}
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#06C755]/25 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            id="job-page-line-cta-btn"
          >
            <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
            <span>LINEで仕事内容について相談する</span>
          </a>

          <span className="text-xs text-[#777777] font-medium mt-2.5">
            応募前の質問だけでも大歓迎です。
          </span>
        </div>
      </section>

    </div>
  );
}
