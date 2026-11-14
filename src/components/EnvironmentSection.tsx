/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface EnvironmentSectionProps {
  onCtaclick: () => void;
}

interface EnvironmentItem {
  title: string;
  image: string;
  captionLabel: string;
  description: string;
}

const ENVIRONMENT_ITEMS: EnvironmentItem[] = [
  {
    title: '街並み・周辺の雰囲気',
    image: '/images/col_secure_ryotei_1792475628730.webp',
    captionLabel: '※エリアの雰囲気イメージ（実物写真ではありません）',
    description:
      'JR信太山駅から徒歩約5分の落ち着いた街並みの中にあります。目立つ看板や街頭での呼び込みがないため、出退勤時も周囲を気にせず通いやすい環境です。',
  },
  {
    title: '館内の落ち着いた雰囲気',
    image: '/images/col_ryokan_manner_1792465891118.webp',
    captionLabel: '※館内の雰囲気イメージ（実物写真ではありません）',
    description:
      '仲居さん・女性スタッフが常駐し、働き始める前の事前見学で実際の館内の様子をご確認いただけます。',
  },
  {
    title: '待機時の過ごし方',
    image: '/images/col_privacy_discretion_1792475612461.webp',
    captionLabel: '※待機時のイメージ（実物写真ではありません）',
    description:
      '通りから見える場所に座る待機はありません。待機所（スタンドまたは旅館）でスマートフォンを見たりしながら、ご自身のペースで待機できます。',
  },
  {
    title: 'お部屋・設備のご案内方針',
    image: '/images/privacy_ryokan_room_1794375281070.webp',
    captionLabel: '※接客空間のイメージ（実物写真ではありません）',
    description:
      'シャワーやタオル類などお仕事に必要な備品をご用意しています。実際のお部屋や備品の使い方は見学・初日案内の際にそのままご確認いただけます。',
  },
  {
    title: '寮利用のご相談について',
    image: '/images/dorm_main_studio_1794374510330.webp',
    captionLabel: '※寮生活のイメージ（実際の間取りは異なります）',
    description:
      'JR信太山駅周辺で個室寮のご案内を行っています（日額0〜2,000円目安）。入居可能な時期や設備の詳細は、ご希望に合わせて事前に個別ご案内します。',
  },
  {
    title: '送迎・アクセスサポート',
    image: '/images/col_safety_gate_1792474007202.webp',
    captionLabel: '※通勤・送迎のイメージ（実物写真ではありません）',
    description:
      'JR信太山駅や指定場所からの送迎、マイカー通勤の駐車スペースについてご相談いただけます。対応可能な時間や場所は事前にお伝えします。',
  },
];

export default function EnvironmentSection({ onCtaclick }: EnvironmentSectionProps) {
  return (
    <section id="environment" className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
            ENVIRONMENT
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] leading-snug mb-3 text-balance">
            働く環境や雰囲気のご案内
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            信太山新地にある当店の働く環境の特徴や過ごし方を、雰囲気イメージとあわせてご紹介します。
          </p>
          <p className="text-[11px] text-[#666666] mt-1.5">
            ※掲載写真はすべてイメージ素材です。実際の店舗・待機場所・お部屋は面接・見学時に直接ご覧いただけます。
          </p>
        </div>

        {/* 6 Environment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8">
          {ENVIRONMENT_ITEMS.map((item) => (
            <figure
              key={item.title}
              className="bg-[#FFF6F8]/40 rounded-2xl overflow-hidden border border-[#EFE2E7] flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-[#F7F2EC] overflow-hidden">
                  <img
                    src={item.image}
                    alt={`${item.title}のイメージ`}
                    width={640}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                    画像はイメージです
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-[11px] font-medium text-[#A65D79] mb-1">
                    {item.captionLabel}
                  </p>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#333333] mb-2">
                    {item.title}
                  </h3>
                  <figcaption className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    {item.description}
                  </figcaption>
                </div>
              </div>
            </figure>
          ))}
        </div>

        {/* Honest tour invitation */}
        <div className="bg-[#F7F2EC] rounded-2xl p-5 sm:p-6 border border-[#E9DFD4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-display font-bold text-sm sm:text-base text-[#333333] mb-1">
              働く前に、実際のお部屋や待機場所を見学いただけます
            </p>
            <p className="text-xs sm:text-sm text-[#555555]">
              ※当サイトではプライバシー配慮と誤解防止のためイメージ画像を使用しています。実物の館内や設備はご見学時にぜひ直接お確かめください。
            </p>
          </div>
          <button
            type="button"
            onClick={onCtaclick}
            className="shrink-0 w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-[#FFF6F8] text-[#A65D79] font-bold text-xs sm:text-sm border border-[#E2CED6] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LucideIcon name="Calendar" size={16} />
            <span>お店見学についてLINEで相談する</span>
          </button>
        </div>
      </div>
    </section>
  );
}
