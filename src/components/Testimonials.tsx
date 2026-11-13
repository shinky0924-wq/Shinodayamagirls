/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

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
  categories: ('beginner' | 'income' | 'pace' | 'safety')[];
  headline: string;
  description: string;
  workPeriod: string;
  weeklyDays: string;
  dailyHours: string;
  earningsTitle: string;
  earningsAmount: string;
  earningsSubtext: string;
  qas: InterviewQA[];
}

const CAST_INTERVIEWS: CastInterview[] = [
  {
    id: 'mai',
    name: 'まい',
    age: '24歳',
    avatarUrl: '/images/cast_mai_snap_1794475286956.webp',
    tag: '未経験スタート',
    categories: ['beginner', 'income', 'safety'],
    headline: '「初めてでも、一つずつ教えてもらえました」',
    description: '働き始めたきっかけや、初めてのお仕事で感じた不安、実際に働いてみた感想を聞きました。',
    workPeriod: '8ヶ月（在籍中）',
    weeklyDays: '週4日勤務（月16日前後）',
    dailyHours: '昼〜夕方メイン（約5〜6時間）',
    earningsTitle: '月収実績（手取り・日払い）',
    earningsAmount: '1,180,000円',
    earningsSubtext: '初月78万円 → 現在月収110万〜125万円前後（即日全額現金手渡し）',
    qas: [
      {
        qNumber: 'Q1',
        question: 'なぜ信太山新地で働こうと思ったの？',
        answer: '一番の理由は「店先での顔見せ（顔出し）がない」ことです。通りに座って通行人に見られるのがどうしても怖かったのですが、信太山新地は旅館の個室や専用スタンドで待機できるので、身バレの不安なく落ち着いて働けています。'
      },
      {
        qNumber: 'Q2',
        question: '数あるお店の中で、なぜ当店を選んだの？',
        answer: '旅館直営で紹介料のピンハネや天引きが一切なく、女性スタッフさんが応募前の質問に親身に答えてくれたからです。他のお店と比べて待機環境やサポートがしっかりしていると感じて決めました。'
      },
      {
        qNumber: 'Q3',
        question: '働く前に不安だったことは？',
        answer: 'ナイトワークが完全に初めてだったので、本当に私でもできるのか、怖いお客様が来たらどうしようと不安でした。でも「無理なリクエストは断っていいし、仲居さんがすぐ助けてくれる」と聞いて安心しました。'
      },
      {
        qNumber: 'Q4',
        question: '実際に働いてみて、お店の印象はどうだった？',
        answer: '旅館の個室でスマホを見ながらゆったり待機でき、仲居さんがお茶を入れてくれたりと本当にアットホームでした。お客様も紳士的な常連さんが多く、想像していたような怖さは全くありませんでした。'
      },
      {
        qNumber: 'Q5',
        question: 'お給料や勤務日数は実際どう？',
        answer: '週4日、昼メインの勤務で月収118万円前後稼げています。1回15分〜の短時間接客なので体力的な負担が少なく、退勤時にその日の給料を全額現金手渡しで受け取れるのでモチベーションが続きます。'
      },
      {
        qNumber: 'Q6',
        question: 'スタッフの対応はどうだった？',
        answer: '女性スタッフさんや仲居さんが「緊張しなくて大丈夫だよ」と優しく声をかけてくれて、初日も隣で丁寧に付き添ってくれました。分からないことも聞きやすい雰囲気です。'
      },
      {
        qNumber: 'Q7',
        question: '待機時間はどのように過ごしている？',
        answer: '冷暖房完備の綺麗な個室で、スマホを見たり本を読んだり、仲居さんとお話ししながら落ち着いて過ごしています。人目を気にせずリラックスできるのが本当に助かります。'
      },
      {
        qNumber: 'Q8',
        question: '未経験でも仕事を覚えられた？',
        answer: 'はい、お仕事の手順はとてもシンプルで、初日の接客前に仲居さんが一つずつレクチャーしてくれました。難しい営業や連絡先交換もないので、すぐ自然に慣れることができました。'
      },
      {
        qNumber: 'Q9',
        question: 'これから応募する女性に伝えたいことは？',
        answer: '店先での顔出しがないので、身バレが不安な未経験の女性に本当に信太山新地はおすすめです！質問だけでもスタッフさんが優しく対応してくれるので、まずは気軽に相談してみてほしいです。'
      }
    ]
  },
  {
    id: 'yuri',
    name: 'ゆり',
    age: '33歳',
    avatarUrl: '/images/cast_yuri_snap_1794475308769.webp',
    tag: '30代・主婦・Wワーク',
    categories: ['beginner', 'pace', 'safety'],
    headline: '「家庭と仕事、自分の生活に合わせて働いています」',
    description: '家事や日常生活と両立しながら、どのような働き方をしているのか聞きました。',
    workPeriod: '1年（在籍中）',
    weeklyDays: '週2日（月8日勤務）',
    dailyHours: '平日昼 11:00〜16:00（5時間・残業なし）',
    earningsTitle: '月収実績（手取り・日払い）',
    earningsAmount: '520,000円',
    earningsSubtext: '月8日稼働（平日昼のみ）で月収46万〜58万円前後（即日全額現金手渡し）',
    qas: [
      {
        qNumber: 'Q1',
        question: 'なぜ信太山新地で働こうと思ったの？',
        answer: '他の新地のように通りに座る必要がなく、個室で待機できると知ったからです。主婦をしているので近所や知り合いに絶対バレたくなかったのですが、信太山新地ならプライバシーが守られると思いました。'
      },
      {
        qNumber: 'Q2',
        question: '数あるお店の中で、なぜ当店を選んだの？',
        answer: '20代だけでなく30代・40代の女性も温かく歓迎してくれることと、託児費用の補助や専用駐車場（車通勤OK）があったからです。家庭のある女性への配慮が一番手厚いと感じました。'
      },
      {
        qNumber: 'Q3',
        question: '働く前に不安だったことは？',
        answer: '30代で夜職未経験の私が採用してもらえるのか、若い子ばかりの中で浮いてしまわないかが一番不安でした。'
      },
      {
        qNumber: 'Q4',
        question: '実際に働いてみて、お店の印象はどうだった？',
        answer: '客層が大人の落ち着いた方ばかりで、30代の女性を好んで指名してくださるお客様が多くて驚きました。仲居さんも同年代やベテランの方が多く、とても温かい雰囲気です。'
      },
      {
        qNumber: 'Q5',
        question: 'お給料や勤務日数は実際どう？',
        answer: '子どもの学校や家事に合わせて、平日昼11:00〜16:00の週2日（月8日）だけ働いています。それでも月収50万円以上になり、毎日手渡しで日払いしてもらえるので家計にゆとりができました。'
      },
      {
        qNumber: 'Q6',
        question: 'スタッフの対応はどうだった？',
        answer: '急な子どもの体調不良や学校行事にも「無理しないで家庭を最優先にしてね」と柔軟にシフトを調整してくださり、本当に感謝しています。'
      },
      {
        qNumber: 'Q7',
        question: '待機時間はどのように過ごしている？',
        answer: '完全個室なので、家計簿をつけたり動画を見たり、静かに自分だけの時間を過ごしています。他の人と無理に会話する必要もないので気楽です。'
      },
      {
        qNumber: 'Q8',
        question: '未経験でも仕事を覚えられた？',
        answer: 'お酒を飲む必要が一切なく、ソフトドリンクでおもてなしできるので翌日の家事にも全く影響がありませんでした。接客の流れもすぐに覚えられました。'
      },
      {
        qNumber: 'Q9',
        question: 'これから応募する女性に伝えたいことは？',
        answer: '年齢を気にして躊躇している方にこそ当店をおすすめしたいです。自分のペースで無理なく働けて、しっかり収入を得られる環境が整っています。'
      }
    ]
  },
  {
    id: 'ayaka',
    name: 'あやか',
    age: '28歳',
    avatarUrl: '/images/cast_ayaka_snap_1794475329022.webp',
    tag: '地方からの応募',
    categories: ['income', 'pace', 'safety'],
    headline: '「応募前の不安から、働き始めるまで」',
    description: '応募したきっかけや、通勤・住まい・実際の職場環境について聞きました。',
    workPeriod: '短期出稼ぎ（2週間滞在）',
    weeklyDays: '週5〜6日集中稼働',
    dailyHours: '11:00〜23:00（フル待機保証活用）',
    earningsTitle: '短期2週間手取り実績',
    earningsAmount: '950,000円',
    earningsSubtext: '新幹線往復交通費全額支給・家電付き個室マンション寮完備（即日全額日払い）',
    qas: [
      {
        qNumber: 'Q1',
        question: 'なぜ信太山新地で働こうと思ったの？',
        answer: '地方からの出稼ぎで、短期間でまとまった貯金を作りたかったからです。信太山新地は全国からの出稼ぎ受け入れ実績が多く、往復交通費全額支給と個室寮完備の条件が魅力的でした。'
      },
      {
        qNumber: 'Q2',
        question: '数あるお店の中で、なぜ当店を選んだの？',
        answer: '旅館を複数経営していて集客力が抜群なことと、待機時間に応じた日給保証制度がしっかりしていたからです。遠方から来て稼げなかったらどうしようという心配がなくなりました。'
      },
      {
        qNumber: 'Q3',
        question: '働く前に不安だったことは？',
        answer: '大阪の土地勘が全くないので無事に辿り着けるか、寮の治安や設備は綺麗かどうかが不安でした。'
      },
      {
        qNumber: 'Q4',
        question: '実際に働いてみて、お店の印象はどうだった？',
        answer: '新大阪駅までスタッフさんが車でお迎えに来てくださり、家具家電付きの綺麗なワンルーム個室マンションに即日入れました。治安も良く、安心して滞在できました。'
      },
      {
        qNumber: 'Q5',
        question: 'お給料や勤務日数は実際どう？',
        answer: '2週間の短期集中出稼ぎで、手取り約95万円を現金で受け取りました。待機日給保証のおかげで客足に左右されず、毎日全額日払いでしっかり手元に残りました。'
      },
      {
        qNumber: 'Q6',
        question: 'スタッフの対応はどうだった？',
        answer: '地方から一人で来た私を気遣って、周辺のスーパーやコンビニを案内してくれたり、毎日優しく声をかけてくれました。'
      },
      {
        qNumber: 'Q7',
        question: '待機時間はどのように過ごしている？',
        answer: '旅館の清潔な個室でWi-Fiを使って過ごしました。仲居さんも親切で、お仕事の合間も居心地良く過ごせました。'
      },
      {
        qNumber: 'Q8',
        question: '未経験でも仕事を覚えられた？',
        answer: '15分単位の短時間接客なので回転が良く、身体への負担が少なかったです。ルールやお客様の案内も仲居さんがすべてリードしてくれました。'
      },
      {
        qNumber: 'Q9',
        question: 'これから応募する女性に伝えたいことは？',
        answer: 'カバン1つで来ても生活用品から衣装まで全て揃っています。短期間でまとまった資金を作りたい全国の女性に、自信を持っておすすめできます。'
      }
    ]
  }
];

type CategoryFilter = 'all' | 'beginner' | 'income' | 'pace' | 'safety';

interface FilterOption {
  key: CategoryFilter;
  label: string;
  iconName: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { key: 'all', label: '全員の体験談を見る', iconName: 'Users' },
  { key: 'beginner', label: '① 未経験から始めた女性', iconName: 'Sparkles' },
  { key: 'income', label: '② 収入を重視したい女性', iconName: 'Wallet' },
  { key: 'pace', label: '③ 自分のペースで働く女性', iconName: 'CalendarDays' },
  { key: 'safety', label: '④ 安心感を重視する女性', iconName: 'ShieldCheck' }
];

interface TestimonialsProps {
  onCtaclick?: () => void;
}

export default function Testimonials({ onCtaclick }: TestimonialsProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [expandedQAs, setExpandedQAs] = useState<Record<string, boolean>>({});

  const handleOpenInterview = (id: string) => {
    setOpenCardId(prev => (prev === id ? null : id));
  };

  const toggleAccordionQA = (castId: string, qNumber: string) => {
    const key = `${castId}-${qNumber}`;
    setExpandedQAs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCta = () => {
    if (onCtaclick) {
      onCtaclick();
    } else {
      window.open(LINE_OFFICIAL_URL, '_blank', 'noopener,noreferrer');
    }
  };

  // Filter casts based on active category
  const filteredCasts = CAST_INTERVIEWS.filter(cast => {
    if (selectedCategory === 'all') return true;
    return cast.categories.includes(selectedCategory);
  });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-[#FFFAFC] to-white relative overflow-hidden" id="voice">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-block text-[11px] font-bold tracking-[0.2em] text-[#D8175D] uppercase bg-[#FFF1F5] px-3.5 py-1 rounded-full border border-[#F0DDE4] mb-3">
            REAL INTERVIEW
          </div>
          
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-[34px] text-[#292329] leading-tight mb-2">
            実際に働く女性に聞きました。
          </h2>
          
          <p className="text-base sm:text-lg font-bold text-[#D8175D] mb-3">
            信太山新地・当店のリアルな体験談
          </p>
          
          {/* 短いピンクのアクセントライン */}
          <div className="w-12 h-0.5 bg-[#D8175D] mx-auto mt-2 mb-4 rounded-full" />

          <p className="font-sans text-xs sm:text-sm text-[#666666] leading-relaxed max-w-2xl mx-auto">
            応募したきっかけから、お仕事の感想、実際のお給料まで。働く女性のリアルな声をご紹介します。
          </p>
        </div>

        {/* 4種類の検索カテゴリー（スマートフォンでは横スクロール可能） */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = selectedCategory === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setSelectedCategory(filter.key)}
                  className={`flex-shrink-0 h-10 sm:h-11 px-4 sm:px-5 rounded-full text-xs sm:text-[13px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#D8175D] text-white shadow-md shadow-[#D8175D]/25 scale-[1.02]'
                      : 'bg-white hover:bg-[#FFF1F5] text-[#444444] border border-[#F0DDE4] hover:border-[#D8175D]/40'
                  }`}
                  id={`voice-filter-${filter.key}`}
                >
                  <LucideIcon 
                    name={filter.iconName} 
                    size={14} 
                    className={isActive ? 'text-white' : 'text-[#D8175D]'} 
                  />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* インタビューカード（PC：3列、スマホ：1列） */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-start">
          {filteredCasts.map((cast) => {
            const isCardOpen = openCardId === cast.id;

            return (
              <article
                key={cast.id}
                className="bg-white rounded-[20px] border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] hover:shadow-[0_8px_32px_-6px_rgba(216,23,93,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                id={`interview-card-${cast.id}`}
              >
                <div>
                  {/* 1. 女性の写真（大きく表示） */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full bg-[#FFF1F5] overflow-hidden">
                    <img 
                      src={cast.avatarUrl} 
                      alt={`${cast.name}さん (${cast.age})`} 
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                    
                    {/* 写真上の特徴タグ（右上） */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#D8175D] text-[11px] font-bold px-3 py-1 rounded-full shadow-xs border border-rose-100">
                      {cast.tag}
                    </div>

                    {/* 写真上の名前・年齢（左下） */}
                    <div className="absolute bottom-3 left-4 text-white">
                      <span className="font-display font-extrabold text-xl sm:text-2xl drop-shadow-sm">
                        {cast.name}さん
                      </span>
                      <span className="text-xs sm:text-sm font-semibold opacity-90 ml-2 drop-shadow-sm bg-black/30 px-2 py-0.5 rounded-full">
                        {cast.age}
                      </span>
                    </div>
                  </div>

                  {/* カード本文エリア */}
                  <div className="p-5 sm:p-6 space-y-4">
                    
                    {/* 4. 短いコメント・見出し */}
                    <div>
                      <h3 className="font-display font-extrabold text-base sm:text-lg text-[#292329] leading-snug mb-1.5">
                        {cast.headline}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#666666] leading-relaxed">
                        {cast.description}
                      </p>
                    </div>

                    {/* 5. 勤務期間・勤務スタイル */}
                    <div className="bg-[#FFFDFE] border border-[#F3E5EB] rounded-[14px] p-3 text-xs text-[#555555] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[#888888] font-medium">勤務期間</span>
                        <span className="font-bold text-[#292329]">{cast.workPeriod}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#888888] font-medium">勤務日数</span>
                        <span className="font-bold text-[#292329]">{cast.weeklyDays}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#888888] font-medium">勤務時間</span>
                        <span className="font-bold text-[#292329]">{cast.dailyHours}</span>
                      </div>
                    </div>

                    {/* 6. 専用の給与紹介エリア（大きく目立たせる） */}
                    <div className="bg-gradient-to-br from-[#FFF1F5] via-[#FFF7F9] to-white rounded-[16px] p-4 border border-[#F0DDE4] text-center shadow-2xs">
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D8175D] uppercase tracking-wider mb-1">
                        <LucideIcon name="Coins" size={13} />
                        <span>実際の勤務・給与データ</span>
                      </div>
                      <div className="text-xs text-[#777777] font-medium mb-1">
                        {cast.earningsTitle}
                      </div>
                      <div className="font-display font-black text-2xl sm:text-3xl text-[#D8175D] tracking-tight leading-none my-1.5">
                        {cast.earningsAmount}
                      </div>
                      <p className="text-[10.5px] sm:text-[11px] text-[#777777] leading-tight mt-1.5">
                        {cast.earningsSubtext}
                      </p>
                    </div>

                    {/* 7. インタビューを読むボタン */}
                    <div>
                      <button
                        type="button"
                        onClick={() => handleOpenInterview(cast.id)}
                        className={`w-full py-3 px-4 rounded-[12px] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isCardOpen
                            ? 'bg-[#292329] text-white hover:bg-black'
                            : 'bg-[#D8175D] hover:bg-[#b5124c] text-white shadow-sm shadow-[#D8175D]/20 hover:shadow-md'
                        }`}
                        id={`interview-toggle-btn-${cast.id}`}
                      >
                        <LucideIcon name={isCardOpen ? 'ChevronUp' : 'MessageCircle'} size={15} />
                        <span>{isCardOpen ? 'インタビューを閉じる' : 'インタビューを読む'}</span>
                      </button>
                    </div>

                    {/* 展開されるインタビュー本文（Q1〜Q5最初表示、Q6〜Q9アコーディオン） */}
                    <AnimatePresence>
                      {isCardOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-2 border-t border-[#F0DDE4] space-y-3"
                        >
                          <div className="text-center pt-2 pb-1">
                            <span className="text-[11px] font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] inline-block">
                              対面インタビュー全9問
                            </span>
                          </div>

                          {/* 最初から表示する質問5つ（Q1〜Q5） */}
                          <div className="space-y-3">
                            {cast.qas.slice(0, 5).map((qa) => {
                              const isOpen = expandedQAs[`${cast.id}-${qa.qNumber}`] ?? true; // Q1〜Q5は最初から回答を表示
                              return (
                                <div
                                  key={qa.qNumber}
                                  className="bg-white rounded-[14px] border border-[#F0DDE4] overflow-hidden"
                                >
                                  <button
                                    type="button"
                                    onClick={() => toggleAccordionQA(cast.id, qa.qNumber)}
                                    className="w-full p-3 sm:p-3.5 text-left flex items-start justify-between gap-2 bg-[#FFF8FA] hover:bg-[#FFF1F5] transition-colors cursor-pointer"
                                  >
                                    <div className="flex items-start gap-2">
                                      <span className="w-5 h-5 rounded-full bg-[#D8175D] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                        {qa.qNumber}
                                      </span>
                                      <h4 className="font-bold text-xs sm:text-[13px] text-[#292329] leading-snug">
                                        {qa.question}
                                      </h4>
                                    </div>
                                    <LucideIcon 
                                      name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
                                      size={14} 
                                      className="text-[#888888] shrink-0 mt-1" 
                                    />
                                  </button>
                                  {isOpen && (
                                    <div className="p-3 sm:p-3.5 pt-2 text-xs sm:text-[13px] text-[#444444] leading-relaxed border-t border-[#F0DDE4]/60 bg-white">
                                      {qa.answer}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* 折りたたみ質問4つ（Q6〜Q9） */}
                          <div className="space-y-2.5 pt-1">
                            <div className="text-[11px] font-bold text-[#888888] px-1">
                              さらに詳しい質問（クリックして回答を見る）
                            </div>

                            {cast.qas.slice(5, 9).map((qa) => {
                              const isOpen = !!expandedQAs[`${cast.id}-${qa.qNumber}`];
                              return (
                                <div
                                  key={qa.qNumber}
                                  className="bg-white rounded-[14px] border border-[#F0DDE4] overflow-hidden"
                                >
                                  <button
                                    type="button"
                                    onClick={() => toggleAccordionQA(cast.id, qa.qNumber)}
                                    className="w-full p-3 text-left flex items-start justify-between gap-2 bg-white hover:bg-[#FFF8FA] transition-colors cursor-pointer"
                                  >
                                    <div className="flex items-start gap-2">
                                      <span className="w-5 h-5 rounded-full bg-[#666666] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                        {qa.qNumber}
                                      </span>
                                      <h4 className="font-bold text-xs sm:text-[13px] text-[#292329] leading-snug">
                                        {qa.question}
                                      </h4>
                                    </div>
                                    <LucideIcon 
                                      name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
                                      size={14} 
                                      className="text-[#888888] shrink-0 mt-1" 
                                    />
                                  </button>
                                  {isOpen && (
                                    <div className="p-3 sm:p-3.5 pt-2 text-xs sm:text-[13px] text-[#444444] leading-relaxed border-t border-[#F0DDE4]/60 bg-[#FFFAFC]">
                                      {qa.answer}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* 9. ページ下部の応募・相談導線 */}
        <div className="mt-14 sm:mt-18 max-w-2xl mx-auto bg-white rounded-[20px] p-6 sm:p-8 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3.5 py-1 rounded-full border border-[#F0DDE4] mb-3">
            <LucideIcon name="MessageSquareHeart" size={13} />
            <span>女性スタッフが丁寧に対応</span>
          </div>
          
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#292329] mb-2.5">
            次は、あなたのお話を聞かせてください。
          </h3>
          
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6 max-w-lg mx-auto">
            お仕事内容や働き方について、気になることは何でもご相談ください。応募するか迷っている方も、まずはお気軽にお問い合わせください。
          </p>

          <div className="flex flex-col items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleCta}
              className="w-full sm:w-auto sm:min-w-[320px] h-[52px] sm:h-[54px] px-8 rounded-[12px] font-extrabold text-sm sm:text-base bg-[#06C755] hover:bg-[#05b34c] text-white transition-all flex items-center justify-center gap-2.5 shadow-md shadow-[#06C755]/20 hover:shadow-lg cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
              id="voice-bottom-line-btn"
            >
              <LucideIcon name="MessageCircle" size={20} className="fill-white text-white" />
              <span>LINEで気軽に相談する</span>
            </button>
            <span className="text-xs text-[#888888] font-medium mt-1">
              相談だけでも大歓迎です。
            </span>
          </div>
        </div>

      </div>

      {/* Schema.org 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": CAST_INTERVIEWS.map((t) => ({
              "@type": "Article",
              "@id": `https://osaka-shinodayamashinchi-recruit.com/#interview-${t.id}`,
              "headline": `信太山新地で働く女性のリアルな体験談【${t.name}さん・${t.age}・${t.tag}】`,
              "description": `${t.name}さん（${t.age}・${t.tag}）への公式インタビュー。${t.headline} ${t.description}`,
              "inLanguage": "ja-JP",
              "about": {
                "@type": "Person",
                "name": `${t.name}（源氏名）`,
                "jobTitle": "旅館コンパニオン"
              },
              "articleBody": `${t.headline} ${t.description} 勤務期間:${t.workPeriod}、勤務日数:${t.weeklyDays}、給与実績:${t.earningsAmount}`,
              "publisher": {
                "@type": "Organization",
                "name": "信太山新地求人 信太山ガールズ（旅館直営）",
                "url": "https://osaka-shinodayamashinchi-recruit.com"
              }
            }))
          })
        }}
      />
    </section>
  );
}
