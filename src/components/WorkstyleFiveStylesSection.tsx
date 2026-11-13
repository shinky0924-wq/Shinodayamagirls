/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface WorkstyleFiveStylesSectionProps {
  onCtaclickWithData?: (msg: string) => void;
  onCtaclick?: () => void;
}

interface WorkstyleItem {
  num: string;
  title: string;
  target: string;
  hours: string;
  days: string;
  desc: string;
  image: string;
  imageAlt: string;
  badge: string;
  icon: string;
}

export default function WorkstyleFiveStylesSection({
  onCtaclickWithData,
  onCtaclick,
}: WorkstyleFiveStylesSectionProps) {
  const handleLineClick = (e: React.MouseEvent) => {
    const msg = '【信太山新地の当店へ応募・相談】自分に合った働き方（出勤時間・日数など）について相談してみたいです。';
    if (onCtaclickWithData) {
      e.preventDefault();
      onCtaclickWithData(msg);
    } else if (onCtaclick) {
      e.preventDefault();
      onCtaclick();
    }
  };

  const workstyles: WorkstyleItem[] = [
    {
      num: '01',
      title: '昼間中心に働きたい',
      target: '家事やプライベートと両立したい女性',
      hours: '10:00〜16:00（モデル例）',
      days: '週2〜3日（モデル例）',
      desc: '「夜は自宅でゆっくり過ごしたい」「明るい時間帯に働きたい」という女性におすすめ。昼間を中心に、自分の生活リズムに合わせて働くスタイルです。',
      image: '/images/col_daytime_clock_jp_1792476810942.webp',
      imageAlt: '自然光が入る明るい時間帯に働く日本人女性イメージ',
      badge: 'お昼シフト人気',
      icon: 'Sun',
    },
    {
      num: '02',
      title: '昼職・本業と掛け持ち',
      target: '会社員・接客業など本業がある女性',
      hours: '18:00〜22:00（モデル例）',
      days: '週1〜2日（モデル例）',
      desc: '本業を続けながら、仕事終わりや休日を活用したい女性におすすめ。空いている時間を有効活用して、自分の目標に向けた収入づくりを目指せます。',
      image: '/images/col_double_work_jp_1792475554864.webp',
      imageAlt: '仕事帰りにカフェなどで過ごす日本人女性イメージ',
      badge: '副業・Wワーク',
      icon: 'Briefcase',
    },
    {
      num: '03',
      title: '学校や予定に合わせて働く',
      target: '学生・予定が不規則な女性',
      hours: '授業のない時間・休日など',
      days: '週1〜2日（モデル例）',
      desc: '学校やプライベートの予定を優先したい女性におすすめ。試験期間や長期休暇などの予定も考慮しながら、無理のない働き方を相談できます。',
      image: '/images/col_weekend_planner_1792475629264.webp',
      imageAlt: 'ノートや勉強に取り組む日本人女性イメージ',
      badge: '学業・予定優先',
      icon: 'GraduationCap',
    },
    {
      num: '04',
      title: '週4〜5日しっかり働く',
      target: '安定した収入や貯金を目指したい女性',
      hours: '10:00〜18:00（モデル例）',
      days: '週4〜5日（モデル例）',
      desc: 'ある程度まとまった日数で働きたい女性におすすめ。毎月の収入目標や生活リズムに合わせて、計画的に働きたい方に向いているスタイルです。',
      image: '/images/col_ryokan_manner_1792465891118.webp',
      imageAlt: '落ち着いた和室の個室で笑顔を見せる日本人女性イメージ',
      badge: 'レギュラー安定',
      icon: 'CalendarCheck',
    },
    {
      num: '05',
      title: '期間を決めて短期集中',
      target: '短期間で目標に向けて働きたい女性・遠方からの出稼ぎ希望者',
      hours: '相談可能（フル稼働可）',
      days: '勤務期間：1週間〜2週間（モデル例）',
      desc: '引っ越し費用や旅行資金など、具体的な目標がある女性におすすめ。あらかじめ働く期間を決めて、短期間で集中して働くスタイルです。遠方からの応募についてもご相談ください。',
      image: '/images/col_cozy_apartment_jp_1792476810515.webp',
      imageAlt: '旅行バッグや個室寮のある上品な部屋で過ごす日本人女性イメージ',
      badge: '短期集中・個室寮',
      icon: 'Luggage',
    },
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* 5つの働き方セクション本体 */}
      <section className="bg-white rounded-3xl p-6 sm:p-9 border border-rose-100 shadow-sm">
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3.5 py-1 rounded-full border border-[#F0DDE4] mb-2.5">
            <LucideIcon name="Clock" size={13} />
            <span>5つのライフスタイル別</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] mb-3">
            あなたに合った働き方を見つけよう
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            昼間だけ・副業・週1日・レギュラー・短期集中。<br className="hidden sm:inline" />
            あなたの生活や目標に合わせた働き方をご紹介します。
          </p>
        </div>

        {/* 5つの働き方カード: PCでは3列＋2列、スマホでは縦1列 */}
        <div className="space-y-4 sm:space-y-5">
          {/* 上段 3列 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {workstyles.slice(0, 3).map((item) => (
              <div
                key={item.num}
                className="bg-white rounded-[20px] border border-[#F0DDE4] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* 画像エリア */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-rose-50">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      width={1200}
                      height={670}
                      decoding="async"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#D8175D] text-white font-mono font-black text-xs px-2.5 py-1 rounded-full shadow-sm">
                      {item.num}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#D8175D] font-bold text-[11px] px-2.5 py-0.5 rounded-full border border-white/40 shadow-2xs">
                      {item.badge}
                    </div>
                  </div>

                  {/* コンテンツエリア */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-1.5 flex items-center gap-1.5">
                      <span>{item.title}</span>
                    </h3>

                    {/* 対象 */}
                    <div className="inline-block bg-[#FFF1F5] text-[#D8175D] text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-[#F0DDE4] mb-3">
                      対象：{item.target}
                    </div>

                    {/* モデル例ラベル */}
                    <div className="space-y-1.5 bg-[#FFFAFC] p-3 rounded-[12px] border border-[#F0DDE4] text-xs mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#1F2432] shrink-0">出勤時間：</span>
                        <span className="text-[#D8175D] font-semibold">{item.hours}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#1F2432] shrink-0">出勤日数：</span>
                        <span className="text-[#555555] font-medium">{item.days}</span>
                      </div>
                    </div>

                    {/* 紹介文章 */}
                    <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 下段 2列 (中央寄せ) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {workstyles.slice(3, 5).map((item) => (
              <div
                key={item.num}
                className="bg-white rounded-[20px] border border-[#F0DDE4] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* 画像エリア */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-rose-50">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      width={1200}
                      height={670}
                      decoding="async"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#D8175D] text-white font-mono font-black text-xs px-2.5 py-1 rounded-full shadow-sm">
                      {item.num}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#D8175D] font-bold text-[11px] px-2.5 py-0.5 rounded-full border border-white/40 shadow-2xs">
                      {item.badge}
                    </div>
                  </div>

                  {/* コンテンツエリア */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-1.5 flex items-center gap-1.5">
                      <span>{item.title}</span>
                    </h3>

                    {/* 対象 */}
                    <div className="inline-block bg-[#FFF1F5] text-[#D8175D] text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-[#F0DDE4] mb-3">
                      対象：{item.target}
                    </div>

                    {/* モデル例ラベル */}
                    <div className="space-y-1.5 bg-[#FFFAFC] p-3 rounded-[12px] border border-[#F0DDE4] text-xs mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#1F2432] shrink-0">出勤時間：</span>
                        <span className="text-[#D8175D] font-semibold">{item.hours}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#1F2432] shrink-0">出勤日数：</span>
                        <span className="text-[#555555] font-medium">{item.days}</span>
                      </div>
                    </div>

                    {/* 紹介文章 */}
                    <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. カードの下に応募導線（ピンク系の薄い背景） */}
        <div className="mt-8 sm:mt-10 bg-[#FFF5F8] rounded-[22px] p-6 sm:p-8 border border-[#F0DDE4] text-center max-w-2xl mx-auto shadow-2xs">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-white px-3 py-0.5 rounded-full border border-[#F0DDE4] mb-2.5 shadow-2xs">
            <LucideIcon name="HeartHandshake" size={13} />
            <span>いつでも相談無料</span>
          </div>

          <h3 className="font-display font-black text-lg sm:text-xl text-[#1F2432] mb-2.5">
            「自分に合う働き方が分からなくても大丈夫！」
          </h3>

          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-lg mx-auto">
            「週に何日働けるか決まっていない」「昼と夜どちらが自分に合うか分からない」そんな方もお気軽にご相談ください。<br className="hidden sm:inline" />
            女性スタッフが希望や生活スタイルをお聞きしながら、一緒に働き方を考えます。
          </p>

          <div className="flex flex-col items-center">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLineClick}
              className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#06C755]/25 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
              id="workstyle-custom-five-line-btn"
            >
              <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
              <span>LINEで自分に合う働き方を相談する</span>
            </a>
            <span className="text-[11px] text-[#777777] font-medium mt-2">
              相談・質問だけでも大歓迎です。
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
