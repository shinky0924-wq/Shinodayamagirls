/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface RequirementsPageContentProps {
  onCtaclick: () => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onInjectedScroll?: (msg: string) => void;
  onNavigateCompare?: () => void;
}

export default function RequirementsPageContent({
  onCtaclick,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
  onNavigateCompare,
}: RequirementsPageContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleLineClick = (e: React.MouseEvent) => {
    const msg = '【信太山新地の当店へ応募・相談】募集要項について確認したいことがあり、応募・条件の相談をしたいです。';
    if (onInjectedScroll) {
      e.preventDefault();
      onInjectedScroll(msg);
    } else if (onCtaclick) {
      e.preventDefault();
      onCtaclick();
    }
  };

  // よくある質問 (11問)
  const requirementsFaqs = [
    {
      q: '応募資格は何歳からですか？',
      a: '満20歳以上の女性です。法令および組合規約に基づき20歳未満（未成年・高校生）の方はご応募いただけません。20代・30代の方まで幅広くご活躍いただけます。'
    },
    {
      q: '未経験でも応募できますか？',
      a: 'はい、大歓迎です。当店で働く女性の約90%が夜職や接客の完全未経験からスタートしています。'
    },
    {
      q: '経験者も応募できますか？',
      a: 'はい、大歓迎です。他店や他業種（ソープ、ヘルス、キャバクラ等）からの移籍・副業も秘密厳守でサポートいたします。'
    },
    {
      q: '日給30,000円〜150,000円の条件を教えてください。',
      a: '出勤時間や接客本数・コース時間に応じた実績です。短時間・数本接客で約30,000円〜、専業フル勤務でロングコースや延長・本数が重なった場合に日給10万〜150,000円の実績となります。'
    },
    {
      q: 'コース別の受取額を事前に確認できますか？',
      a: 'はい、事前にすべてご確認いただけます。15分3,800円、30分7,600円、45分11,400円、60分15,200円（天引き0円手取り100%）と完全にオープンにしております。'
    },
    {
      q: '日払いは可能ですか？',
      a: 'はい、退勤時にその日の稼ぎを全額現金で手渡しいたします。翌日への持ち越しや分割払い、雑費の天引きは一切ありません。'
    },
    {
      q: '勤務時間は相談できますか？',
      a: 'はい、10:00〜24:00の間で「昼だけ」「夕方から」「終電まで」などご都合に合わせて1時間単位で自由に設定していただけます。'
    },
    {
      q: '出勤日数は相談できますか？',
      a: 'はい、週1日〜・月数回・週末だけなど、生活リズムに合わせて自由に設定可能です。出勤ノルマやペナルティは一切ありません。'
    },
    {
      q: '面接だけでも可能ですか？',
      a: 'はい、面接やご相談だけでも歓迎しております。履歴書不要で私服のまま手ぶらでお越しいただけます。'
    },
    {
      q: '体験入店について相談できますか？',
      a: 'はい、見学や短時間の体験入店も随時受け付けております。体験で得たお給料もその場で全額日払いいたします。'
    },
    {
      q: '応募前にLINEで質問するだけでも大丈夫ですか？',
      a: 'はい、応募を決めていなくても大丈夫です。条件の確認や気になる疑問について、LINEから女性スタッフがお気軽にお答えします。'
    }
  ];

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

      {/* 2. ファーストビュー */}
      <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* 左側：タイトル・説明文・ボタン */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#D8175D] uppercase mb-2">
              RECRUITMENT INFORMATION
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1F2432] leading-tight mb-2 tracking-tight">
              募集要項
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-bold text-[#D8175D] mb-4 leading-snug">
              応募前に、知りたい条件をすべて確認。
            </p>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
              応募資格・お給料・勤務時間・待遇など、当店の募集条件を分かりやすくまとめています。<br className="hidden sm:inline" />
              働き方や給与について分からないことがあれば、応募前にLINEからご確認いただけます。
            </p>

            {/* CTAボタン */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href={LINE_OFFICIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLineClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base shadow-md shadow-[#06C755]/20 hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer"
                id="requirements-hero-line-cta-btn"
              >
                <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
                <span>LINEで応募・条件を相談する</span>
              </a>
              <span className="text-xs text-[#777777] font-medium pl-1">
                応募を決める前の質問だけでも大歓迎です。
              </span>
            </div>
          </div>

          {/* 右側：実際の店舗や待機環境の写真 */}
          <div className="w-full md:w-[42%] lg:w-[40%] shrink-0">
            <div className="relative rounded-[20px] overflow-hidden border border-[#F0DDE4] shadow-sm aspect-[4/3] bg-[#FFF1F5]">
              <img
                src="/images/col_ryokan_manner_1792465891118.webp"
                alt="信太山新地 老舗旅館の客室・完全個室待機"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                width={480}
                height={360}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold bg-black/45 backdrop-blur-xs px-3 py-1.5 rounded-[10px] text-center border border-white/20">
                信太山新地 老舗旅館直営・完全個室待機・店先顔出しなし
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 応募資格 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="mb-6">
          <span className="text-xs font-black text-[#D8175D] tracking-wider uppercase block mb-1">
            01｜応募資格
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] mb-2">
            20歳以上の女性を募集しています。
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            未経験の方・経験者の方ともにご応募いただけます。応募条件や仕事内容について、事前にご説明いたします。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          <div className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3 shadow-2xs">
                <LucideIcon name="UserCheck" size={19} />
              </div>
              <span className="text-[11px] text-[#777777] font-bold block mb-1">応募資格</span>
              <p className="font-black text-lg text-[#D8175D] leading-snug">
                20歳以上の女性
              </p>
            </div>
            <p className="text-[11px] text-[#555555] mt-2 pt-2 border-t border-[#F0DDE4]/60">
              ※法令および組合規約に基づき20歳以上限定（高校生・未成年不可）
            </p>
          </div>

          <div className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3 shadow-2xs">
                <LucideIcon name="Sparkles" size={19} />
              </div>
              <span className="text-[11px] text-[#777777] font-bold block mb-1">未経験者</span>
              <p className="font-black text-lg text-[#1F2432] leading-snug">
                応募可能（大歓迎）
              </p>
            </div>
            <p className="text-[11px] text-[#555555] mt-2 pt-2 border-t border-[#F0DDE4]/60">
              在籍の約90%が未経験スタート。初日に丁寧な事前サポートあり。
            </p>
          </div>

          <div className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3 shadow-2xs">
                <LucideIcon name="Award" size={19} />
              </div>
              <span className="text-[11px] text-[#777777] font-bold block mb-1">経験者</span>
              <p className="font-black text-lg text-[#1F2432] leading-snug">
                応募可能（優遇・相談）
              </p>
            </div>
            <p className="text-[11px] text-[#555555] mt-2 pt-2 border-t border-[#F0DDE4]/60">
              他店・他業種からの移籍も秘密厳守。これまでの経験を活かせます。
            </p>
          </div>

          <div className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] mb-3 shadow-2xs">
                <LucideIcon name="MessageCircle" size={19} />
              </div>
              <span className="text-[11px] text-[#777777] font-bold block mb-1">応募方法</span>
              <p className="font-black text-lg text-[#1F2432] leading-snug">
                LINE・お電話
              </p>
            </div>
            <p className="text-[11px] text-[#555555] mt-2 pt-2 border-t border-[#F0DDE4]/60">
              履歴書不要・私服手ぶらでOK。質問・相談だけでも受付中。
            </p>
          </div>
        </div>
      </section>

      {/* 4. 給与・報酬 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="mb-6">
          <span className="text-xs font-black text-[#D8175D] tracking-wider uppercase block mb-1">
            02｜給与・報酬
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] mb-2">
            頑張りに応じた給与体系をご案内します。
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            接客コースごとの女性の受取額や、日給の計算条件・日払い条件について具体的にご案内します。
          </p>
        </div>

        {/* ① 給与の目安 */}
        <div className="bg-[#FFFAFC] rounded-[20px] p-6 sm:p-7 border border-[#F0DDE4] mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F0DDE4]">
            <div>
              <span className="text-xs font-bold text-[#777777] block mb-1">日給目安</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-2xl sm:text-4xl text-[#D8175D]">
                  日給 30,000円 〜 150,000円
                </span>
              </div>
            </div>
            <div className="text-xs sm:text-right text-[#555555]">
              <span className="inline-block bg-[#FFF1F5] text-[#D8175D] font-bold px-3 py-1 rounded-full border border-[#F0DDE4] mb-1">
                全額即日日払い（退勤時現金手渡し）
              </span>
              <p className="text-[11px] text-[#777777]">天引き・雑費・厚生費は完全0円（手取り100%支給）</p>
            </div>
          </div>
          <p className="text-xs text-[#555555] leading-relaxed pt-3">
            ※日給30,000円〜150,000円は、出勤時間・接客本数・コース時間に応じた実績目安です。短時間・数本接客で約30,000円〜、専業フル勤務でロングコースや延長・本数が重なった場合に10万〜150,000円となります。全ての女性が毎日一律で同額を受け取れるという意味ではありません。
          </p>
        </div>

        {/* ② コース別の受取額（表形式） */}
        <div className="mb-8">
          <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#FFF1F5] text-[#D8175D] font-bold text-xs flex items-center justify-center border border-[#F0DDE4]">
              1
            </span>
            <span>コース別の女性受取額一覧</span>
          </h3>
          <div className="overflow-x-auto scrollbar-thin rounded-[16px] border border-[#F0DDE4]">
            <table className="w-full text-xs sm:text-sm border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-[#FFF1F5] text-[#1F2432] border-b border-[#F0DDE4]">
                  <th scope="col" className="py-3 px-4 text-left font-bold">コース時間</th>
                  <th scope="col" className="py-3 px-4 text-left font-bold">女性の受取給与額</th>
                  <th scope="col" className="py-3 px-4 text-left font-bold">延長・指名料</th>
                  <th scope="col" className="py-3 px-4 text-left font-bold">支払い方法</th>
                  <th scope="col" className="py-3 px-4 text-left font-bold">天引き・控除</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0DDE4]/80 bg-white">
                <tr className="hover:bg-[#FFFAFC]">
                  <td className="py-3.5 px-4 font-bold text-[#1F2432]">15分コース</td>
                  <td className="py-3.5 px-4">
                    <span className="font-black text-[#D8175D] text-base">3,800円</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#555555]">延長15分毎に+3,800円</td>
                  <td className="py-3.5 px-4 font-bold text-[#1F2432]">全額即日日払い</td>
                  <td className="py-3.5 px-4 font-bold text-[#D8175D]">0円（天引きなし）</td>
                </tr>
                <tr className="hover:bg-[#FFFAFC]">
                  <td className="py-3.5 px-4 font-bold text-[#1F2432]">30分コース</td>
                  <td className="py-3.5 px-4">
                    <span className="font-black text-[#D8175D] text-base">7,600円</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#555555]">延長15分毎に+3,800円</td>
                  <td className="py-3.5 px-4 font-bold text-[#1F2432]">全額即日日払い</td>
                  <td className="py-3.5 px-4 font-bold text-[#D8175D]">0円（天引きなし）</td>
                </tr>
                <tr className="hover:bg-[#FFFAFC]">
                  <td className="py-3.5 px-4 font-bold text-[#1F2432]">45分コース</td>
                  <td className="py-3.5 px-4">
                    <span className="font-black text-[#D8175D] text-base">11,400円</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#555555]">延長15分毎に+3,800円</td>
                  <td className="py-3.5 px-4 font-bold text-[#1F2432]">全額即日日払い</td>
                  <td className="py-3.5 px-4 font-bold text-[#D8175D]">0円（天引きなし）</td>
                </tr>
                <tr className="hover:bg-[#FFFAFC]">
                  <td className="py-3.5 px-4 font-bold text-[#1F2432]">60分コース</td>
                  <td className="py-3.5 px-4">
                    <span className="font-black text-[#D8175D] text-base">15,200円</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-[#555555]">以降15分毎に+3,800円加算</td>
                  <td className="py-3.5 px-4 font-bold text-[#1F2432]">全額即日日払い</td>
                  <td className="py-3.5 px-4 font-bold text-[#D8175D]">0円（天引きなし）</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ③ 日給の計算例（別カード） */}
        <div className="mb-8">
          <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#FFF1F5] text-[#D8175D] font-bold text-xs flex items-center justify-center border border-[#F0DDE4]">
              2
            </span>
            <span>日給の計算例（15分メイン・接客本数ごとのリアルなシミュレーション）</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] flex flex-col justify-between">
              <div>
                <span className="inline-block text-[10px] font-bold bg-[#FFF1F5] text-[#D8175D] px-2.5 py-0.5 rounded-full border border-[#F0DDE4] mb-2">
                  短時間・スキマ副業（約3〜4時間）
                </span>
                <h4 className="font-bold text-base text-[#1F2432] mb-1">
                  1日 8〜10本接客（15分メイン）
                </h4>
                <p className="text-xs text-[#555555] mb-3 leading-relaxed">
                  昼職帰りや空いた時間だけでサクッと短時間勤務した場合の目安。
                </p>
              </div>
              <div className="pt-3 border-t border-[#F0DDE4]">
                <span className="text-[11px] text-[#777777] block">受取給与実績目安</span>
                <span className="font-display font-black text-xl sm:text-2xl text-[#D8175D]">
                  30,400円 〜 38,000円
                </span>
                <span className="text-[10px] text-[#777777] block mt-0.5">3,800円 × 8〜10本（即日手渡し）</span>
              </div>
            </div>

            <div className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#D8175D]/40 ring-1 ring-[#D8175D]/20 flex flex-col justify-between shadow-xs">
              <div>
                <span className="inline-block text-[10px] font-bold bg-[#D8175D] text-white px-2.5 py-0.5 rounded-full mb-2">
                  定番レギュラー勤務（約6〜8時間）★平均20本前後
                </span>
                <h4 className="font-bold text-base text-[#1F2432] mb-1">
                  1日 18〜22本接客（15分メイン＋延長）
                </h4>
                <p className="text-xs text-[#555555] mb-3 leading-relaxed">
                  信太山新地の回転率を活かし、平均20本前後をテンポよく接客する中心スタイル。
                </p>
              </div>
              <div className="pt-3 border-t border-[#F0DDE4]">
                <span className="text-[11px] text-[#777777] block">受取給与実績目安</span>
                <span className="font-display font-black text-xl sm:text-2xl text-[#D8175D]">
                  76,000円 〜 90,000円超
                </span>
                <span className="text-[10px] text-[#777777] block mt-0.5">3,800円 × 20本 ＝ 76,000円（＋延長・指名）</span>
              </div>
            </div>

            <div className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] flex flex-col justify-between">
              <div>
                <span className="inline-block text-[10px] font-bold bg-[#FFF1F5] text-[#D8175D] px-2.5 py-0.5 rounded-full border border-[#F0DDE4] mb-2">
                  フル出勤・繁忙日（約8〜10時間）
                </span>
                <h4 className="font-bold text-base text-[#1F2432] mb-1">
                  1日 25〜35本以上＋延長・ロング
                </h4>
                <p className="text-xs text-[#555555] mb-3 leading-relaxed">
                  週末や給料日後など、客足の多い日に集中して高収入を狙う場合の最高水準。
                </p>
              </div>
              <div className="pt-3 border-t border-[#F0DDE4]">
                <span className="text-[11px] text-[#777777] block">受取給与実績目安</span>
                <span className="font-display font-black text-xl sm:text-2xl text-[#D8175D]">
                  114,000円 〜 150,000円
                </span>
                <span className="text-[10px] text-[#777777] block mt-0.5">30本前後成立時＋延長手当多数</span>
              </div>
            </div>
          </div>
        </div>

        {/* ④ 支払い方法・日払い条件 & ⑤ 控除・費用について */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#FFFAFC] rounded-[16px] p-4 sm:p-5 border border-[#F0DDE4]">
            <h4 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1.5 flex items-center gap-2">
              <LucideIcon name="Wallet" size={17} className="text-[#D8175D]" />
              <span>支払い方法・日払い条件</span>
            </h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              退勤時にその日の売上・バック分を計算し、全額を現金で手渡しいたします。一部のみ翌月払いになったり、銀行振込まで待たされることはありません。
            </p>
          </div>

          <div className="bg-[#FFFAFC] rounded-[16px] p-4 sm:p-5 border border-[#F0DDE4]">
            <h4 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1.5 flex items-center gap-2">
              <LucideIcon name="ShieldCheck" size={17} className="text-[#D8175D]" />
              <span>控除・費用について（完全0円）</span>
            </h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              待機料、厚生費、光熱費、衣装代、ペナルティなどの名目で給与から差し引かれる費用は一切ありません。計算された受取額がそのまま手取りとなります。
            </p>
          </div>
        </div>
      </section>

      {/* 5. 勤務時間・出勤条件 */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="mb-6">
          <span className="text-xs font-black text-[#D8175D] tracking-wider uppercase block mb-1">
            03｜勤務時間・出勤条件
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] mb-2 flex items-center gap-2">
            <LucideIcon name="Clock" size={26} className="text-[#D8175D]" />
            <span>勤務時間：10:00 〜 24:00</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            生活リズムや目標収入に合わせて、1時間単位で出勤時間・退勤時間を自由に相談していただけます。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          <div className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs">
            <span className="text-xs font-bold text-[#D8175D] block mb-1">勤務時間</span>
            <h4 className="font-bold text-base text-[#1F2432] mb-1">10:00〜24:00</h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              昼だけ（10:00〜17:00）、夜だけ（18:00〜24:00）、終電上がりなど相談可能。
            </p>
          </div>

          <div className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs">
            <span className="text-xs font-bold text-[#D8175D] block mb-1">出勤日数</span>
            <h4 className="font-bold text-base text-[#1F2432] mb-1">希望に応じて相談</h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              週1日〜・月数回・土日のみ・短期集中出勤OK。出勤ノルマは一切ありません。
            </p>
          </div>

          <div className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs">
            <span className="text-xs font-bold text-[#D8175D] block mb-1">勤務スタイル</span>
            <h4 className="font-bold text-base text-[#1F2432] mb-1">完全自由シフト</h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              希望する勤務ペースや生活スタイルに合わせて相談できます。Wワークや学業との両立も安心。
            </p>
          </div>

          <div className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs">
            <span className="text-xs font-bold text-[#D8175D] block mb-1">出勤について</span>
            <h4 className="font-bold text-base text-[#1F2432] mb-1">事前にご相談可能</h4>
            <p className="text-xs text-[#555555] leading-relaxed">
              出勤日数・時間帯・勤務条件については、事前にLINEやお電話でいつでもご相談いただけます。
            </p>
          </div>
        </div>
      </section>

      {/* 6. 待遇・サポート */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="mb-6">
          <span className="text-xs font-black text-[#D8175D] tracking-wider uppercase block mb-1">
            04｜待遇・サポート
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] mb-2">
            働く女性を支える充実のサポート
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            当店で実際に提供している待遇とサポート体制です。利用条件や具体的な内容をご確認ください。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: '全額即日日払い対応',
              desc: '退勤時にその日の売上・バック分を全額現金で手渡しいたします。日払い上限や分割払い、雑費の天引きはありません。',
              condition: '利用条件：当日勤務されたすべての方',
              icon: 'Coins'
            },
            {
              title: '女性専用の無料送迎車',
              desc: '最寄り駅や指定場所からの送迎を常時運行しています。人目を気にせず、安全かつ快適に通勤していただけます。',
              condition: '利用条件：事前の送迎希望連絡のみで利用可能',
              icon: 'Car'
            },
            {
              title: '旅館直営の完全個室待機環境',
              desc: '店先での顔見せ（顔出し）は一切ありません。Wi-Fi・冷暖房完備の旅館客室で、スマホを見ながら静かに待機できます。',
              condition: '利用条件：在籍・体験入店のすべての方',
              icon: 'Home'
            },
            {
              title: '女性スタッフへの個別相談',
              desc: '女性相談窓口スタッフ（あおい）が常駐。仕事の不安やお給料、シフト、身バレ対策など何でも女性目線で相談できます。',
              condition: '利用条件：応募前・勤務中いつでも無料',
              icon: 'Smile'
            },
            {
              title: '面接・見学のみの受付',
              desc: '履歴書不要、私服のまま手ぶらでお越しいただけます。実際の待機室や旅館の設備を見てから働くかを決められます。',
              condition: '利用条件：事前にLINEまたはお電話で予約',
              icon: 'Eye'
            },
            {
              title: 'お仕事開始前の丁寧な説明',
              desc: '接客の流れやお茶出しの手順、ルールについて事前に丁寧にお教えします。疑問を残したまま勤務開始することはありません。',
              condition: '利用条件：初日勤務・体験入店時に実施',
              icon: 'FileText'
            },
            {
              title: '出勤・勤務についての柔軟な相談',
              desc: '週1日〜・短時間・週末のみなど自由シフト。急な体調不良やプライベートの用事にも柔軟に対応いたします。ノルマ・罰金0円。',
              condition: '利用条件：在籍のすべての方',
              icon: 'CalendarCheck'
            },
            {
              title: '家具家電付き即入居個室寮・交通費支給',
              desc: '出稼ぎや遠方からのご応募の方には、即入居可能な個室寮をご用意。新幹線代・飛行機代など往復交通費の支給制度もあります。',
              condition: '利用条件：遠方からの出勤・出稼ぎ希望者（詳細要相談）',
              icon: 'Building'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] flex items-start gap-4 shadow-2xs"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0 mt-0.5 shadow-2xs">
                <LucideIcon name={item.icon} size={19} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed mb-2">
                  {item.desc}
                </p>
                <span className="inline-block text-[10px] text-[#D8175D] font-bold bg-[#FFF1F5] px-2 py-0.5 rounded border border-[#F0DDE4]">
                  {item.condition}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. 詳しい募集条件一覧（テーブル / スマホ縦型カード対応） */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="mb-6">
          <span className="text-xs font-black text-[#D8175D] tracking-wider uppercase block mb-1">
            05｜詳しい募集条件・採用情報
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] mb-2">
            募集条件一覧表
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            当店の採用条件を一覧でご確認いただけます。
          </p>
        </div>

        {/* PC向けテーブル */}
        <div className="hidden sm:block overflow-hidden rounded-[16px] border border-[#F0DDE4]">
          <table className="w-full text-sm border-collapse">
            <tbody className="divide-y divide-[#F0DDE4] bg-white">
              {[
                { label: '募集職種', value: '接客スタッフ（短時間接客・旅館個室待機）' },
                { label: '応募資格', value: '20歳以上の女性（未成年・高校生不可）' },
                { label: '募集対象', value: '未経験者・経験者（Wワーク・学生・主婦の方も歓迎）' },
                { label: '給与・報酬', value: '日給 30,000円 〜 150,000円（15分3,800円〜高額バック）' },
                { label: '給与支払い', value: '全額即日日払い対応（退勤時に現金手渡し・天引き0円）' },
                { label: '勤務時間', value: '10:00 〜 24:00（1時間単位で希望相談可能）' },
                { label: '出勤日数', value: '希望に応じて相談（週1日〜・短時間・月数回OK・ノルマなし）' },
                { label: '勤務地', value: '大阪府和泉市・信太山新地（老舗直営旅館）' },
                { label: '最寄り駅', value: 'JR阪和線「信太山駅」徒歩5分（無料送迎車・マイカー通勤OK）' },
                { label: '仕事内容', value: '旅館客室での短時間接客・歓談（店先での顔出し一切なし）' },
                { label: '待遇', value: '日払い、無料送迎、完全個室待機、女性スタッフ常駐、個室寮完備、交通費支給、託児所補助' },
                { label: '応募方法', value: '公式LINE・お電話（履歴書不要・私服手ぶらOK）' },
                { label: '必要書類', value: '年齢確認ができる身分証明書（免許証・マイナンバーカード・パスポート等）' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FFFAFC]">
                  <th scope="row" className="py-3.5 px-5 font-bold text-[#1F2432] bg-[#FFF1F5]/50 w-[28%] text-left border-r border-[#F0DDE4]">
                    {row.label}
                  </th>
                  <td className="py-3.5 px-5 text-[#333333] leading-relaxed">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* スマホ向け縦型カード */}
        <div className="sm:hidden space-y-3">
          {[
            { label: '募集職種', value: '接客スタッフ（短時間接客・旅館個室待機）' },
            { label: '応募資格', value: '20歳以上の女性（未成年・高校生不可）' },
            { label: '募集対象', value: '未経験者・経験者（Wワーク・学生・主婦の方も歓迎）' },
            { label: '給与・報酬', value: '日給 30,000円 〜 150,000円（15分3,800円〜高額バック）' },
            { label: '給与支払い', value: '全額即日日払い対応（退勤時に現金手渡し・天引き0円）' },
            { label: '勤務時間', value: '10:00 〜 24:00（1時間単位で希望相談可能）' },
            { label: '出勤日数', value: '希望に応じて相談（週1日〜・短時間・月数回OK・ノルマなし）' },
            { label: '勤務地', value: '大阪府和泉市・信太山新地（老舗直営旅館）' },
            { label: '最寄り駅', value: 'JR阪和線「信太山駅」徒歩5分（無料送迎車・マイカー通勤OK）' },
            { label: '仕事内容', value: '旅館客室での短時間接客・歓談（店先での顔出し一切なし）' },
            { label: '待遇', value: '日払い、無料送迎、完全個室待機、女性スタッフ常駐、個室寮完備、交通費支給、託児所補助' },
            { label: '応募方法', value: '公式LINE・お電話（履歴書不要・私服手ぶらOK）' },
            { label: '必要書類', value: '年齢確認ができる身分証明書（免許証・マイナンバーカード・パスポート等）' }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#FFFAFC] p-3.5 rounded-[14px] border border-[#F0DDE4]">
              <span className="text-[11px] font-bold text-[#D8175D] block mb-1">
                {item.label}
              </span>
              <p className="text-xs text-[#1F2432] leading-relaxed font-medium">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. 応募前の確認事項（チェックリスト形式） */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="mb-6 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="CheckSquare" size={13} />
            <span>CHECKLIST</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-2">
            応募前に確認しておきたいこと
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            応募前に条件を確認していただき、疑問点があればお気軽にご質問ください。
          </p>
        </div>

        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            '応募資格・年齢条件（20歳以上の女性）',
            '給与体系・コース別受取額（15分3,800円〜）',
            '日給の計算条件（実働・本数に応じた目安）',
            '支払い方法・日払い条件（全額即日日払い）',
            '勤務時間・出勤日数（10:00〜24:00・希望制）',
            '控除・費用の有無（天引き・雑費0円）',
            '待遇・送迎などの利用条件（無料送迎・個室寮）',
            '面接・体験入店について（私服手ぶら・質問のみOK）'
          ].map((text, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[14px] p-3.5 border border-[#F0DDE4] flex items-center gap-2.5"
            >
              <div className="w-5 h-5 rounded-md bg-[#FFF1F5] border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0">
                <LucideIcon name="Check" size={13} />
              </div>
              <span className="text-xs font-bold text-[#1F2432]">
                {text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 9. 応募から勤務開始までの流れ（5ステップ縦型レイアウト） */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-black text-[#D8175D] tracking-wider uppercase block mb-1">
            06｜応募方法・お仕事開始までの流れ
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-2">
            お仕事開始までの5ステップ
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            まずは質問や相談だけでも大丈夫。条件に納得してから働くかどうかを決められます。
          </p>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-[34px] sm:left-[39px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#D8175D]/40 via-[#D8175D]/20 to-[#D8175D]/40 -z-0 pointer-events-none hidden sm:block" />

          <div className="space-y-4 relative z-10">
            {[
              {
                step: 'STEP 01',
                title: 'LINE・電話でお問い合わせ',
                desc: '仕事内容や募集条件について質問できます。応募を決めていなくても、質問だけで大丈夫です。',
                icon: 'MessageCircle'
              },
              {
                step: 'STEP 02',
                title: '面接・希望条件の確認',
                desc: '希望する働き方や気になる条件について確認します。履歴書不要で私服のまま手ぶらでお越しいただけます。',
                icon: 'ClipboardCheck'
              },
              {
                step: 'STEP 03',
                title: '給与・待遇・仕事内容の説明',
                desc: '給与体系や勤務条件、仕事内容を詳しくご説明します。疑問や不安があれば何でも確認できます。',
                icon: 'FileText'
              },
              {
                step: 'STEP 04',
                title: '見学・体験について相談',
                desc: '希望される場合は、実際の環境や体験についてご案内します。体験入店するかどうかはご自身で決められます。',
                icon: 'DoorOpen'
              },
              {
                step: 'STEP 05',
                title: '納得したうえで勤務開始',
                desc: '条件を理解し、本人が希望した場合に勤務を開始します。無理な勧誘や引き止めは一切行いません。',
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

      {/* 10. よくある質問 (11問のアコーディオン) */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-7">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-2">
            <LucideIcon name="HelpCircle" size={13} />
            <span>Q&A</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432]">
            募集要項についてのよくある質問
          </h2>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          {requirementsFaqs.map((faq, idx) => {
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

      {/* 11. 関連ページ */}
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
              img: '/images/cast_mai_snap_1794475286956.webp'
            },
            {
              title: 'お仕事までの流れ',
              topicId: 'flow',
              img: '/images/col_taiken_prep_1792475646166.webp'
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
                    width={1200}
                    height={670}
                    decoding="async"
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

      {/* 12. 最後のLINE応募エリア */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-3">
          <LucideIcon name="MessageCircle" size={13} />
          <span>24時間受付中</span>
        </div>

        <h2 className="font-display font-extrabold text-lg sm:text-xl md:text-[22px] text-[#1F2432] mb-2">
          募集条件について、気になることはありませんか？
        </h2>

        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-lg mx-auto">
          給与・勤務時間・待遇など、応募前に確認しておきたいことがあればお気軽にご相談ください。<br />
          応募をまだ決めていない方も、条件確認や質問だけで大丈夫です。
        </p>

        <div className="flex flex-col items-center">
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLineClick}
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#06C755]/25 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            id="requirements-page-line-cta-btn"
          >
            <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
            <span>LINEで応募・条件を相談する</span>
          </a>

          <span className="text-xs text-[#777777] font-medium mt-2.5">
            女性スタッフが丁寧にご案内します。
          </span>
        </div>
      </section>

    </div>
  );
}
