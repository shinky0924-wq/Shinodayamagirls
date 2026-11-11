/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface DormPageContentProps {
  onCtaclick: () => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onInjectedScroll?: (msg: string) => void;
  onNavigateCompare?: () => void;
}

export default function DormPageContent({
  onCtaclick,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
}: DormPageContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [checkedList, setCheckedList] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedList(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleLineClick = (e: React.MouseEvent) => {
    const msg = '【信太山新地の当店へ応募・相談】寮の利用（信太山駅近辺）や出稼ぎ・交通費の相談をしてみたいです。';
    if (onInjectedScroll) {
      e.preventDefault();
      onInjectedScroll(msg);
    } else if (onCtaclick) {
      e.preventDefault();
      onCtaclick();
    }
  };

  // 11. よくある質問
  const dormFaqs = [
    {
      q: '寮はどこにありますか？',
      a: '信太山駅近辺の寮をご案内しています。詳しい場所や通勤方法については、LINEでお問い合わせください。'
    },
    {
      q: '遠方に住んでいても応募できますか？',
      a: '遠方にお住まいの女性もご相談いただけます。寮の利用条件や勤務開始までの流れをご案内します。'
    },
    {
      q: '寮には家具や家電がありますか？',
      a: '実際に利用できる設備については、入寮前にご案内します。必要な持ち物も事前にご確認ください。'
    },
    {
      q: '寮費はかかりますか？',
      a: '寮費や光熱費などの費用については、利用条件と合わせて事前にご説明します。'
    },
    {
      q: 'どのくらいの期間から利用できますか？',
      a: '利用期間や入寮条件は状況によって異なる場合があります。詳しくはお問い合わせください。'
    },
    {
      q: 'すぐに入寮できますか？',
      a: '寮の空き状況や手続きによって異なります。希望する入寮日をお知らせください。'
    }
  ];

  // 8. 入寮前の確認チェックリスト
  const checklistItems = [
    '寮の場所は信太山駅近辺か',
    '勤務地までの移動方法',
    '寮費はいくらか',
    '光熱費など別途必要な費用はあるか',
    '家具・家電・寝具は用意されているか',
    'お部屋の設備や環境',
    '入寮できる日',
    '利用できる期間',
    '交通費の支給条件',
    '退寮時のルール',
    '勤務開始までのスケジュール'
  ];

  // 10. 関連記事
  const relatedArticles = [
    {
      title: '信太山新地で寮を利用して働くには？',
      summary: '信太山駅近辺の寮を利用しながら働くメリットや、入寮の条件、実際の通勤方法について分かりやすく解説します。',
      slug: 'shinodayamashinchi-housing-support',
      tag: '寮・住まい'
    },
    {
      title: '遠方から応募する女性が事前に確認したいこと',
      summary: '大阪府外や遠方から応募する際の準備、面接予約の流れ、移動費用の相談方法をまとめました。',
      slug: 'shinodayamashinchi-dormitory-life-real',
      tag: '遠方応募'
    },
    {
      title: '入寮前に確認したい寮費・設備・生活環境',
      summary: '入寮後に困らないよう、事前に確認しておきたい費用や備え付け家電、持参すべき荷物の目安をご案内します。',
      slug: 'shinodayamashinchi-safety-and-security',
      tag: '生活設備'
    },
    {
      title: '出稼ぎで働く際の交通費や勤務条件について',
      summary: '短期出稼ぎでの働き方やシフトの組み方、交通費支給に関する注意点や確認事項を整理しました。',
      slug: 'shinodayamashinchi-double-work-lifestyle',
      tag: '出稼ぎ・交通費'
    }
  ];

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

      {/* 1. ファーストビューを全面変更 */}
      <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* 左側：見出し・説明文・安心ポイント */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#D8175D] uppercase mb-2">
              DORMITORY & RELOCATION GUIDE
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1F2432] leading-tight mb-3 tracking-tight">
              <span className="text-[#D8175D]">遠方からの応募も歓迎！</span><br />
              <span className="text-[#D8175D]">信太山駅近く</span>の寮で新生活をスタート
            </h1>

            <p className="font-bold text-sm sm:text-base text-[#1F2432] mb-3">
              住まいの心配を減らして、信太山新地で新しい働き方を始めませんか？
            </p>

            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
              「遠方に住んでいるけれど働いてみたい」「通勤が難しいので近くに住みたい」「出稼ぎで短期間働きたい」<br className="hidden sm:inline" />
              そんな女性に向けて、信太山駅近辺の寮や住まいについてご案内します。<br className="hidden sm:inline" />
              寮の場所・設備・利用条件・費用など、気になることは入店前に確認できます。
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#1F2432]">
              <span className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#D8175D] px-3 py-1 rounded-full border border-[#F0DDE4]">
                <LucideIcon name="MapPin" size={13} />
                信太山駅近辺の寮
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#D8175D] px-3 py-1 rounded-full border border-[#F0DDE4]">
                <LucideIcon name="CheckCircle2" size={13} />
                完全個室・プライベート確保
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#D8175D] px-3 py-1 rounded-full border border-[#F0DDE4]">
                <LucideIcon name="ShieldCheck" size={13} />
                事前の条件説明徹底
              </span>
            </div>
          </div>

          {/* 右側：清潔感のある寮の室内写真 */}
          <div className="w-full md:w-[420px] shrink-0">
            <div className="relative rounded-[20px] overflow-hidden border border-[#F0DDE4] shadow-sm bg-[#FFF5F8]/40 aspect-[4/3]">
              <img
                src="/images/dorm_main_studio_1794374510330.jpg"
                alt="信太山駅近辺の寮の室内環境（生活に必要なベッド・テーブル・収納を備えた清潔な個室）"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 rounded-lg font-medium text-center">
                信太山駅近辺の寮｜清潔で安心できる個室空間
              </div>
            </div>
          </div>
        </div>

        {/* 下部：4つの特徴カード */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-8 border-t border-[#F0DDE4]">
          {[
            {
              num: '01',
              title: '寮の場所',
              desc: '信太山駅近辺',
              icon: 'MapPin'
            },
            {
              num: '02',
              title: '住まい',
              desc: '寮の設備・環境を事前に確認',
              icon: 'Home'
            },
            {
              num: '03',
              title: '出稼ぎ',
              desc: '遠方からの応募も相談可能',
              icon: 'Plane'
            },
            {
              num: '04',
              title: '生活サポート',
              desc: '交通費・生活面について相談可能',
              icon: 'HeartHandshake'
            }
          ].map((card, i) => (
            <div
              key={i}
              className="bg-[#FFFAFC] rounded-[16px] p-4 border border-[#F0DDE4] shadow-2xs hover:border-[#D8175D]/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[#D8175D]">
                  {card.num}
                </span>
                <LucideIcon name={card.icon} size={16} className="text-[#D8175D]" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-[#1F2432] mb-1">
                {card.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#555555] leading-snug">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 寮について詳しく紹介 */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
            LOCATION & DETAILS
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
            信太山駅近辺の寮について
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            住み込みで働きたい女性に向けて、信太山駅近辺の寮をご案内しています。<br />
            初めての土地で生活を始める方にも分かりやすいように、寮の場所や設備、利用条件などを事前にご説明します。
          </p>
        </div>

        {/* 4つの確認カード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            {
              num: '01',
              title: '寮の場所',
              desc: '信太山駅からの距離や通勤方法など、実際の場所について確認できます。',
              icon: 'Navigation'
            },
            {
              num: '02',
              title: 'お部屋の設備',
              desc: 'ベッド・収納・冷暖房・家具・家電など、実際に利用できる設備をご案内します。',
              icon: 'Tv'
            },
            {
              num: '03',
              title: '寮の利用料金',
              desc: '寮費・光熱費・その他必要な費用について、事前に確認できるようにします。',
              icon: 'BadgePercent'
            },
            {
              num: '04',
              title: '入寮の条件',
              desc: '入寮できるタイミングや利用期間、退寮時の条件などをご説明します。',
              icon: 'CalendarCheck'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs flex items-start gap-4 hover:border-[#D8175D]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0 shadow-2xs mt-0.5">
                <span className="font-mono font-bold text-xs text-[#D8175D]">{item.num}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <LucideIcon name={item.icon} size={15} className="text-[#D8175D]" />
                  <h3 className="font-bold text-sm sm:text-base text-[#1F2432]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 寮の写真・住環境 */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
            ROOM ENVIRONMENT
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
            実際に生活するお部屋の環境
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            働く場所だけでなく、仕事以外の時間を過ごす住環境も大切です。<br />
            お部屋の広さや設備、収納、生活に必要なものなど、入寮前に気になるポイントを確認できるようにしてください。
          </p>
        </div>

        {/* 写真3枚並び */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            {
              title: '寝室・ベッド周辺',
              desc: '清潔なリネンと心地よいベッドで、お仕事後もゆっくり身体を休められます。',
              img: '/images/dorm_bed_area_1794374510713.jpg'
            },
            {
              title: '室内全体',
              desc: '明るく落ち着いた個室空間。プライベートがしっかり守られる一人部屋です。',
              img: '/images/dorm_main_studio_1794374510330.jpg'
            },
            {
              title: '収納や生活設備',
              desc: '衣類や荷物をすっきり収納できるスペースや、テーブルなどの生活家具を完備。',
              img: '/images/dorm_storage_desk_1794374512351.jpg'
            }
          ].map((room, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] border border-[#F0DDE4] overflow-hidden shadow-2xs flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-rose-50">
                <img
                  src={room.img}
                  alt={room.title}
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1.5">
                    {room.title}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    {room.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-[#777777] max-w-xl mx-auto leading-relaxed">
            ※実物と異なる高級マンションやホテルの写真ではなく、実際の生活に近い落ち着いた住環境をご案内しています。詳細はお問い合わせ時に画像と合わせてご確認いただけます。
          </p>
        </div>
      </section>

      {/* 4. 出稼ぎで働く女性への案内 */}
      <section className="bg-gradient-to-b from-[#FFFDF5] to-[#FFF5F8] rounded-[24px] p-6 sm:p-9 border border-amber-200/90 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="flex-1">
              <div className="inline-block bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 mb-2">
                遠方・他府県からの応募も大歓迎
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-3">
                遠方にお住まいの女性もお気軽にご相談ください
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                大阪府外や遠方にお住まいの女性も、寮の利用や勤務条件についてご相談いただけます。<br />
                初めて信太山に来る方にも、事前に必要な情報をご案内します。
              </p>
            </div>
            <div className="w-full md:w-[260px] shrink-0">
              <div className="rounded-[18px] overflow-hidden border border-[#F0DDE4] shadow-xs aspect-[4/3]">
                <img
                  src="/images/relocation_suitcase_travel_1794374512087.jpg"
                  alt="遠方からの出稼ぎ・荷造りの様子"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* 4つのカード */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                num: '01',
                title: '遠方からの応募',
                desc: '現在お住まいの地域を問わず、まずはご相談ください。',
                icon: 'MapPin'
              },
              {
                num: '02',
                title: '入寮のタイミング',
                desc: 'いつから入寮できるのか、勤務開始までの流れをご説明します。',
                icon: 'Clock'
              },
              {
                num: '03',
                title: '勤務期間',
                desc: '希望する勤務期間や出勤日数について事前にご相談いただけます。',
                icon: 'Calendar'
              },
              {
                num: '04',
                title: '生活・通勤',
                desc: '寮から勤務地までの移動方法や、生活面で気になることをご確認いただけます。',
                icon: 'Compass'
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[18px] p-5 border border-amber-200/80 shadow-2xs flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-mono font-bold text-xs shrink-0 mt-0.5">
                  {card.num}
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 交通費・移動費について */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
            TRANSPORTATION SUPPORT
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
            遠方からの移動費・交通費について
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            遠方から応募する女性にとって、交通費や移動費も気になるポイントです。<br />
            支給の有無・対象となる交通手段・支給上限・支給タイミング・適用条件などを分かりやすく掲載しています。
          </p>
        </div>

        {/* 確認項目カード */}
        <div className="bg-[#FFFAFC] rounded-[20px] p-5 sm:p-7 border border-[#F0DDE4] max-w-3xl mx-auto shadow-2xs">
          <div className="space-y-4">
            {[
              {
                label: '交通費の支給はあるか',
                answer: '遠方から応募される方を対象に、移動費・交通費のサポートを行っております。',
                icon: 'Check'
              },
              {
                label: '対象となる交通手段',
                answer: '新幹線、飛行機、高速バス、在来線特急など、移動手段に応じてご相談いただけます。',
                icon: 'Train'
              },
              {
                label: '支給上限はいくらか',
                answer: 'お住まいの地域や出勤予定期間によって設定がございます。詳しくはLINEでお気軽にご相談ください。',
                icon: 'DollarSign'
              },
              {
                label: 'いつ支給されるのか',
                answer: '面接・体入当日または勤務初日など、事前に取り決めたタイミングで精算いたします。',
                icon: 'Calendar'
              },
              {
                label: '支給を受けるための条件',
                answer: '交通機関の領収書や予約控えのご提示、規定の出勤日数などの条件を事前にご確認いただけます。',
                icon: 'Receipt'
              },
              {
                label: '途中退店などの場合の取り扱い',
                answer: '万が一の途中退店時における取り扱いルールも、事前の条件説明時に明確にご案内します。',
                icon: 'FileText'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[14px] p-4 border border-[#F0DDE4]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div className="flex items-center gap-2.5 font-bold text-xs sm:text-sm text-[#1F2432] shrink-0 sm:w-56">
                  <span className="w-6 h-6 rounded-full bg-[#FFF1F5] text-[#D8175D] flex items-center justify-center shrink-0">
                    <LucideIcon name={item.icon} size={13} />
                  </span>
                  <span>{item.label}</span>
                </div>
                <div className="text-xs sm:text-sm text-[#555555] sm:text-right flex-1 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-[14px] bg-[#FFF5F8] border border-[#F0DDE4] text-center">
            <p className="text-xs text-[#D8175D] font-bold mb-1">
              ※金額や支給条件はお住まいの地域・期間によって異なります
            </p>
            <p className="text-xs text-[#555555] leading-relaxed">
              勝手な試算ではなく、あなたの出発地やご希望に合わせて確実な条件をご案内いたします。<br />
              具体的な支給額や領収書のご案内については、LINE公式アカウントにてお気軽にご相談ください。
            </p>
          </div>
        </div>
      </section>

      {/* 6. 寮・出稼ぎで確認したい6つのポイント */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
            CHECK POINTS
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
            入寮前に確認しておきたい6つのポイント
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            後から「知らなかった」と後悔しないために、入寮を決める前に以下の6項目を必ずチェックしておきましょう。
          </p>
        </div>

        {/* 3列×2段のカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            {
              num: '01',
              title: '寮の場所',
              desc: '信太山駅からの距離や、勤務地までの移動方法を確認しましょう。',
              icon: 'MapPin'
            },
            {
              num: '02',
              title: '寮費・生活費',
              desc: '寮費や光熱費など、毎月必要になる費用を確認しましょう。',
              icon: 'Coins'
            },
            {
              num: '03',
              title: 'お部屋の設備',
              desc: '家具・家電・寝具など、実際に使える設備を確認しましょう。',
              icon: 'Home'
            },
            {
              num: '04',
              title: '入寮できる時期',
              desc: '応募から入寮までのスケジュールを確認しましょう。',
              icon: 'Calendar'
            },
            {
              num: '05',
              title: '交通費・移動費',
              desc: '交通費の支給条件や、遠方からの移動について確認しましょう。',
              icon: 'Train'
            },
            {
              num: '06',
              title: '勤務条件',
              desc: '出勤日数・勤務時間・希望する勤務期間などを確認しましょう。',
              icon: 'Clock'
            }
          ].map((point, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs hover:border-[#D8175D]/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-2 py-0.5 rounded border border-[#F0DDE4]">
                  {point.num}
                </span>
                <LucideIcon name={point.icon} size={16} className="text-[#D8175D]" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1.5">
                {point.title}
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. 入寮から勤務開始までの流れ */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
            STEP BY STEP
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
            お問い合わせから勤務開始までの簡単5ステップ
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            遠方からの応募でも迷わないよう、お問い合わせから入寮・勤務スタートまでの流れを整理しました。
          </p>
        </div>

        {/* 5ステップ */}
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              step: 'STEP 01',
              title: 'LINEでお問い合わせ',
              desc: '現在住んでいる地域や、寮の利用希望、出稼ぎの期間などをお気軽にお伝えください。',
              icon: 'MessageCircle'
            },
            {
              step: 'STEP 02',
              title: '条件・希望を確認',
              desc: '信太山駅近辺の寮の空き状況、利用条件、勤務日数や時間などのご希望をすり合わせます。',
              icon: 'ClipboardCheck'
            },
            {
              step: 'STEP 03',
              title: '面接・お仕事内容の説明',
              desc: '仕事内容・給与システム・待遇について丁寧に説明します。不安な点はこの場で解消できます。',
              icon: 'Users'
            },
            {
              step: 'STEP 04',
              title: '寮の確認・入寮',
              desc: '入寮条件や設備、費用などにしっかり納得していただいたうえでお部屋へご案内します。',
              icon: 'Key'
            },
            {
              step: 'STEP 05',
              title: '勤務スタート',
              desc: '生活環境を整え、ご自身のペースや希望するシフトに合わせてお仕事をスタートします。',
              icon: 'Sparkles'
            }
          ].map((s, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-4 sm:p-5 border border-[#F0DDE4] shadow-2xs flex items-start gap-4 hover:border-[#D8175D]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#D8175D] text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                <LucideIcon name={s.icon} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[11px] font-bold text-[#D8175D] bg-[#FFF1F5] px-2 py-0.5 rounded border border-[#F0DDE4]">
                    {s.step}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-[#1F2432]">
                    {s.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. 入寮前の確認チェックリスト（白背景のカードでスマートフォンでも読みやすい設計） */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
            PRE-ENTRY CHECKLIST
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
            入寮を決める前に確認しておきたいこと
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            気になる項目をタップしてチェックできます。すべてクリアにしてから安心して入寮を決めましょう。
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-[#FFFAFC] rounded-[20px] p-5 sm:p-7 border border-[#F0DDE4] shadow-2xs">
          <div className="space-y-2.5">
            {checklistItems.map((item, idx) => {
              const isChecked = !!checkedList[idx];
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleCheck(idx)}
                  className={`w-full text-left p-3.5 rounded-[12px] border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isChecked
                      ? 'bg-[#E6F4EA] border-emerald-300 text-emerald-900'
                      : 'bg-white border-[#F0DDE4] text-[#333333] hover:border-[#D8175D]/40'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-medium flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 text-white'
                          : 'border border-[#CCCCCC] bg-white'
                      }`}
                    >
                      {isChecked && <LucideIcon name="Check" size={13} />}
                    </span>
                    <span>{item}</span>
                  </span>
                  <span className="text-[11px] text-[#777777] shrink-0 font-medium">
                    {isChecked ? '確認済み' : 'タップで確認'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-[#F0DDE4] flex items-center justify-between text-xs text-[#555555]">
            <span>
              確認状況: <strong className="text-[#D8175D] font-bold">{Object.values(checkedList).filter(Boolean).length}</strong> / {checklistItems.length}
            </span>
            <button
              type="button"
              onClick={() => {
                const all: Record<number, boolean> = {};
                checklistItems.forEach((_, i) => (all[i] = true));
                setCheckedList(all);
              }}
              className="text-xs text-[#D8175D] hover:underline font-bold cursor-pointer"
            >
              すべてチェックする
            </button>
          </div>
        </div>
      </section>

      {/* 9. 関連記事 */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1 block">
              RELATED ARTICLES
            </span>
            <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl text-[#1F2432]">
              寮・出稼ぎに関するおすすめ記事
            </h2>
          </div>
          {onNavigateBlog && (
            <button
              type="button"
              onClick={() => onNavigateBlog()}
              className="text-xs font-bold text-[#D8175D] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>コラム一覧へ</span>
              <LucideIcon name="ArrowRight" size={14} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedArticles.map((art, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateBlog && onNavigateBlog(art.slug)}
              className="bg-[#FFFAFC] rounded-[16px] border border-[#F0DDE4] p-4 flex flex-col justify-between hover:border-[#D8175D]/40 transition-colors shadow-2xs cursor-pointer group"
            >
              <div>
                <span className="inline-block bg-[#FFF1F5] text-[#D8175D] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#F0DDE4] mb-2">
                  {art.tag}
                </span>
                <h3 className="font-bold text-xs sm:text-sm text-[#1F2432] group-hover:text-[#D8175D] transition-colors leading-snug mb-1.5">
                  {art.title}
                </h3>
                <p className="text-[11px] text-[#666666] leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#F0DDE4]/60 text-[11px] text-[#D8175D] font-bold flex items-center justify-end gap-1">
                <span>詳しく読む</span>
                <LucideIcon name="ChevronRight" size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. よくある質問 */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
            寮・出稼ぎに関するよくある質問
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            住まいや出稼ぎに関して女性から多く寄せられる質問にお答えします。
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {dormFaqs.map((faq, idx) => {
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

      {/* 12. 最後のLINE相談エリア */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-3">
          <LucideIcon name="MessageCircle" size={13} />
          <span>24時間受付中</span>
        </div>

        <h2 className="font-display font-extrabold text-lg sm:text-xl md:text-[22px] text-[#1F2432] mb-2">
          住まいの心配も、まずはお気軽にご相談ください
        </h2>

        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-lg mx-auto">
          「遠方から働きに行きたい」「信太山駅近くの寮について詳しく知りたい」「寮費や交通費が気になる」<br className="hidden sm:inline" />
          そんな疑問もLINEでお気軽にご相談ください。<br className="hidden sm:inline" />
          寮の利用条件や勤務内容について、一つずつ丁寧にご案内します。
        </p>

        <div className="flex flex-col items-center">
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLineClick}
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#06C755]/25 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            id="dorm-page-final-line-btn"
          >
            <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
            <span>LINEで寮・出稼ぎについて相談する</span>
          </a>

          <span className="text-xs text-[#777777] font-medium mt-2.5">
            質問だけでも大歓迎｜女性スタッフが丁寧にお答えします。
          </span>
        </div>
      </section>

    </div>
  );
}
