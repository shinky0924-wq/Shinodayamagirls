/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface WorkstylePageContentProps {
  onCtaclick: () => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onInjectedScroll?: (msg: string) => void;
  onNavigateCompare?: () => void;
}

interface WorkstyleCardItem {
  num: string;
  title: string;
  target: string;
  hours: string;
  days: string;
  desc: string;
  image: string;
  imageAlt: string;
  badge: string;
}

export default function WorkstylePageContent({
  onCtaclick,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
  onNavigateCompare,
}: WorkstylePageContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleLineClick = (e: React.MouseEvent) => {
    const msg = '【信太山新地の当店へ応募・相談】働き方（出勤時間・日数・シフト）について相談してみたいです。';
    if (onInjectedScroll) {
      e.preventDefault();
      onInjectedScroll(msg);
    } else if (onCtaclick) {
      e.preventDefault();
      onCtaclick();
    }
  };

  const workstyles: WorkstyleCardItem[] = [
    {
      num: '01',
      title: '昼間中心に働きたい',
      target: '昼間に働きたい女性・家庭やプライベートを大切にしたい女性',
      hours: '10:00〜16:00',
      days: '週2〜3日',
      desc: '夜は自宅でゆっくり過ごしたい、明るい時間帯を中心に働きたいという女性におすすめ。昼間の時間を活用して、自分の生活リズムに合わせた働き方を目指せます。',
      image: '/images/col_daytime_clock_jp_1792476810942.jpg',
      imageAlt: '自然光が入る部屋で過ごす日本人女性イメージ',
      badge: 'お昼シフト人気',
    },
    {
      num: '02',
      title: '昼職・本業と掛け持ちしたい',
      target: '会社員・接客業など、本業がある女性',
      hours: '18:00〜22:00',
      days: '週1〜2日',
      desc: '本業を続けながら、仕事終わりや休日の時間を活用したい女性におすすめ。今の仕事や生活を大切にしながら、副業として働くスタイルです。',
      image: '/images/col_double_work_jp_1792475554864.jpg',
      imageAlt: '仕事帰りにカフェなどで過ごす日本人女性イメージ',
      badge: '副業・Wワーク',
    },
    {
      num: '03',
      title: '学校や予定に合わせて働きたい',
      target: '学生・予定が不規則な女性',
      hours: '授業のない時間・休日など',
      days: '週1〜2日',
      desc: '学校やプライベートの予定を優先したい女性におすすめ。試験期間や長期休暇などの予定も考慮しながら、出勤について相談できる働き方です。',
      image: '/images/col_student_study_jp_1792476715495.jpg',
      imageAlt: 'ノートや勉強に取り組む日本人女性イメージ',
      badge: '学業・予定優先',
    },
    {
      num: '04',
      title: '週4〜5日しっかり働きたい',
      target: '安定した収入や貯金を目指したい女性',
      hours: '10:00〜18:00',
      days: '週4〜5日',
      desc: 'ある程度まとまった日数で働きたい女性におすすめ。毎月の収入目標や生活リズムに合わせて、計画的に働きたい方に向いています。',
      image: '/images/col_ryokan_manner_1792465891118.jpg',
      imageAlt: '落ち着いた和室で笑顔を見せる日本人女性イメージ',
      badge: 'レギュラー安定',
    },
    {
      num: '05',
      title: '期間を決めて短期集中で働きたい',
      target: '短期間で目標に向けて働きたい女性・遠方からの応募を検討している女性',
      hours: '相談可能（フル稼働可）',
      days: '1週間〜2週間',
      desc: '引っ越し費用や旅行資金など、具体的な目標がある女性におすすめ。あらかじめ働く期間を決めて、短期間で集中して働くスタイルです。',
      image: '/images/col_cozy_apartment_jp_1792476810515.jpg',
      imageAlt: '旅行バッグや個室寮のある上品な部屋で過ごす日本人女性イメージ',
      badge: '短期集中・個室寮',
    },
  ];

  const workstyleFaqs = [
    {
      q: '本当に週1日や月数回だけでも働けますか？',
      a: 'はい、完全自由出勤制ですので週1日や月数回の出勤でも大歓迎です。出勤ノルマやペナルティは一切ありません。'
    },
    {
      q: 'お昼だけのシフト（10:00〜16:00等）でも稼げますか？',
      a: 'はい、信太山新地はお昼10時から開門しており、観光や出張のお客様で昼間から非常に賑わっています。夜更かしせず健康的に稼げます。'
    },
    {
      q: '急な体調不良や生理のときは休めますか？罰金はありますか？',
      a: 'もちろん休めます。女性の身体と安全を第一に考えておりますので、体調がすぐれないときは無理せずご連絡ください。遅刻・欠勤罰金は一切ありません。'
    },
    {
      q: 'テスト期間や本業の繁忙期に1ヶ月丸々休むことはできますか？',
      a: 'はい、可能です。事前にご相談いただければ、籍を置いたまま長期でお休みいただけます。復帰時も同じ条件で温かくお迎えします。'
    },
    {
      q: '終電までに帰ることはできますか？',
      a: 'はい、終電上がりも歓迎しております。女性専用の無料送迎車も運行しておりますので、駅まで安全に移動していただけます。'
    }
  ];

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

      {/* 2. ファーストビュー */}
      <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* 左側：タイトルと説明文 */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#D8175D] uppercase mb-2">
              WORKSTYLE GUIDE
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1F2432] leading-tight mb-3 tracking-tight">
              自分の生活に合わせて働ける、信太山新地のお仕事スタイル
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-bold text-[#D8175D] mb-4 leading-snug">
              昼間だけ・副業・週1日・レギュラー・短期集中。<br className="hidden sm:inline" />
              あなたの希望や生活リズムに合わせた働き方をご相談いただけます。
            </p>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
              「毎日働かないといけない？」「昼間だけでも大丈夫？」「本業と掛け持ちできる？」そんな疑問もお気軽にご相談ください。<br className="hidden sm:inline" />
              勤務時間や出勤日数など、一人ひとりの希望を確認しながら働き方をご案内します。
            </p>

            {/* ボタンエリア */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLineClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base shadow-md shadow-[#06C755]/20 hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
                id="workstyle-hero-line-cta-btn"
              >
                <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
                <span>LINEで自分に合う働き方を相談する</span>
              </a>
              <span className="text-xs text-[#777777] font-medium pl-1">
                相談・質問だけでも大歓迎です。
              </span>
            </div>
          </div>

          {/* 右側：清潔感のある落ち着いた和室で自然な笑顔を見せる日本人女性の写真 */}
          <div className="w-full md:w-[42%] lg:w-[40%] shrink-0">
            <div className="relative rounded-[20px] overflow-hidden border border-[#F0DDE4] shadow-sm aspect-[4/3] bg-[#FFF1F5]">
              <img
                src="/images/col_ryokan_manner_1792465891118.jpg"
                alt="落ち着いた和室で過ごす日本人女性"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                width={480}
                height={360}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold bg-black/45 backdrop-blur-xs px-3 py-1.5 rounded-[10px] text-center border border-white/20">
                完全自由出勤制・あなたの生活リズムを最優先
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 女性スタッフのサポート紹介 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 bg-[#FFFAFC] rounded-[20px] p-5 sm:p-8 border border-[#F0DDE4] max-w-4xl mx-auto">
          {/* 左側：女性スタッフの写真 */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#D8175D]/30 shrink-0 shadow-sm bg-rose-50">
            <img
              src="/images/shinodayama_advisor_sakura_1792225964799.jpg"
              alt="女性相談窓口 あおいスタッフ"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* 右側：文章 */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-0.5 rounded-full border border-[#F0DDE4] mb-2">
              <LucideIcon name="HeartHandshake" size={13} />
              <span>個別サポート体制</span>
            </div>
            <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl text-[#1F2432] mb-3 leading-snug">
              初めての方も安心。女性スタッフが働き方を一緒に考えます
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-4">
              「どのくらい働けばいいのか分からない」「自分に合う勤務時間を相談したい」など、働く前の疑問や不安もお気軽にご相談ください。<br className="hidden sm:inline" />
              希望する収入や生活スタイルをお聞きしながら、無理のない働き方をご案内します。
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {['ノルマ・ペナルティ一切なし', '遅刻・欠勤罰金0円', '急な体調不良も連絡でOK', 'テスト期間・繁忙期の長期休みOK'].map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D8175D] bg-white px-2.5 py-1 rounded-full border border-[#F0DDE4]"
                >
                  <LucideIcon name="Check" size={12} />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. メインコンテンツ：あなたに合った5つの働き方 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        {/* セクション見出し */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            5 WORKSTYLES
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] mb-3">
            あなたに合った働き方を見つけよう
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            働く理由も、希望する生活スタイルも人それぞれ。自分に合った働き方を見つけてみてください。
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
                    <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-1.5 leading-snug">
                      {item.title}
                    </h3>

                    {/* 対象 */}
                    <div className="inline-block bg-[#FFF1F5] text-[#D8175D] text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-[#F0DDE4] mb-3">
                      対象：{item.target}
                    </div>

                    {/* モデル例ラベル */}
                    <div className="space-y-1.5 bg-[#FFFAFC] p-3 rounded-[12px] border border-[#F0DDE4] text-xs mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#1F2432] shrink-0">勤務時間の例：</span>
                        <span className="text-[#D8175D] font-semibold">{item.hours}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#1F2432] shrink-0">出勤日数の例：</span>
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
                    <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-1.5 leading-snug">
                      {item.title}
                    </h3>

                    {/* 対象 */}
                    <div className="inline-block bg-[#FFF1F5] text-[#D8175D] text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-[#F0DDE4] mb-3">
                      対象：{item.target}
                    </div>

                    {/* モデル例ラベル */}
                    <div className="space-y-1.5 bg-[#FFFAFC] p-3 rounded-[12px] border border-[#F0DDE4] text-xs mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#1F2432] shrink-0">勤務時間の例：</span>
                        <span className="text-[#D8175D] font-semibold">{item.hours}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#1F2432] shrink-0">出勤日数の例：</span>
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

        <p className="text-[11px] text-[#777777] text-center mt-4">
          ※上記の時間・日数はモデル例です。実際に対応できる勤務条件に合わせて調整していただけます。
        </p>

        {/* カードの下に応募導線（薄いピンク背景） */}
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
              id="workstyle-custom-five-line-cta-btn"
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

      {/* 5. お昼のシフトが人気急上昇の理由 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="Sun" size={13} />
            <span>昼間勤務のメリット</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            お昼のシフト（10:00〜18:00）が選ばれる理由
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mt-1">
            近年、夜だけでなくお昼の時間帯に稼ぐ女性が急増しています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: '昼間から客足が途切れない',
              desc: '出張のお客様や地元・観光客が多く訪れるため、昼間からテンポよく接客に入ることができます。',
              icon: 'Users'
            },
            {
              title: '健康的な生活リズムを維持',
              desc: '夜更かしをせず明るい時間に働けるため、体内時計を崩さず、肌荒れや体調不良を防げます。',
              icon: 'Heart'
            },
            {
              title: '安心・安全に通える',
              desc: '電車が混雑しない時間帯に通え、夜道の一人歩きのリスクもありません。無料送迎も利用可能です。',
              icon: 'ShieldCheck'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3 shadow-2xs">
                <LucideIcon name={item.icon} size={19} />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. 働き方についてのよくある質問 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="HelpCircle" size={13} />
            <span>Q&A</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            働き方についてのよくある質問
          </h2>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {workstyleFaqs.map((faq, idx) => {
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

      {/* 7. 関連ページへの案内 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <span className="text-[11px] font-bold text-[#D8175D] tracking-widest uppercase block mb-1">
            RELATED INFORMATION
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            合わせてチェックしたい情報
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
          {[
            {
              title: 'お仕事内容',
              desc: '接客の流れ・旅館環境',
              topicId: 'job',
              img: '/images/col_ryokan_manner_1792465891118.jpg'
            },
            {
              title: '給料・待遇',
              desc: 'コース別給料・即日日払い',
              topicId: 'salary',
              img: '/images/col_bonus_envelope_jp_1792476753315.jpg'
            },
            {
              title: '募集要項',
              desc: '応募資格・採用基準一覧',
              topicId: 'requirements',
              img: '/images/col_official_documents_1792465890547.jpg'
            },
            {
              title: 'お仕事までの流れ',
              desc: '面接・見学・体験入店',
              topicId: 'flow',
              img: '/images/col_taiken_prep_1792475646166.jpg'
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

      {/* 8. 最後のLINE応募エリア */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-3">
          <LucideIcon name="MessageCircle" size={13} />
          <span>24時間受付中</span>
        </div>

        <h2 className="font-display font-extrabold text-lg sm:text-xl md:text-[22px] text-[#1F2432] mb-2">
          まずは話を聞いてみるだけでも大丈夫です。
        </h2>

        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-lg mx-auto">
          「昼間だけ働きたい」「本業と両立できるか不安」など、どんなご相談でもお気軽にお問い合わせください。<br className="hidden sm:inline" />
          女性スタッフがあなたの生活スタイルに合わせた働き方を親身にご提案します。
        </p>

        <div className="flex flex-col items-center">
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLineClick}
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#06C755]/25 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            id="workstyle-page-final-line-btn"
          >
            <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
            <span>LINEで自分に合う働き方を相談する</span>
          </a>

          <span className="text-xs text-[#777777] font-medium mt-2.5">
            質問だけでも歓迎｜女性スタッフが丁寧にご案内します。
          </span>
        </div>
      </section>

    </div>
  );
}
