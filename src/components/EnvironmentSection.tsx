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
    title: 'お店の外観・周辺雰囲気',
    image: '/images/col_secure_ryotei_1792475628730.webp',
    captionLabel: '※信太山新地エリアの雰囲気イメージ',
    description:
      '落ち着いた和風の街並みの中に位置し、JR信太山駅から徒歩約5分。目立つ看板や呼び込みがなく、出勤時も人目を気にせずお越しいただけます。',
  },
  {
    title: '館内の様子',
    image: '/images/col_ryokan_manner_1792465891118.webp',
    captionLabel: '※旅館内の落ち着いた雰囲気イメージ',
    description:
      '清掃の行き届いた清潔な和風館内です。仲居さん・女性スタッフが常駐しており、働き始める前に実際の館内を見学いただけます。',
  },
  {
    title: '待機スペース',
    image: '/images/col_privacy_discretion_1792475612461.webp',
    captionLabel: '※待機環境のイメージ',
    description:
      '通りから見える場所に座る必要はありません。空調・Wi-Fiが整った専用スペースで、スマートフォンなどを見ながら落ち着いて待機できます。',
  },
  {
    title: '個室・設備',
    image: '/images/privacy_ryokan_room_1794375281070.webp',
    captionLabel: '※個室・客室の雰囲気イメージ',
    description:
      'シャワー・空調・タオル類・アメニティを完備した個室を用意しています。衛生面や設備の使い方も初日に分かりやすくご案内します。',
  },
  {
    title: '当店の寮（ワンルーム個室）',
    image: '/images/dorm_main_studio_1794374510330.webp',
    captionLabel: '※当店ご用意の個室寮参考イメージ',
    description:
      'JR信太山駅周辺に家具・家電付きのワンルーム個室寮をご用意しています（日額0〜2,000円目安）。入居時期や滞在期間のご希望もお気軽にお伝えください。',
  },
  {
    title: '当店の送迎・車通勤サポート',
    image: '/images/col_safety_gate_1792474007202.webp',
    captionLabel: '※送迎・アクセス案内イメージ',
    description:
      'JR信太山駅や指定場所からの無料送迎に対応しており、マイカー通勤向けの専用駐車場も完備しています。送迎希望のお時間もお知らせください。',
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
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] leading-snug mb-3">
            実際に働く場所や環境をご紹介します
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            信太山新地にある当店の雰囲気や働く環境・設備を、応募前にご確認いただけます。
          </p>
        </div>

        {/* 6 Environment Photo Cards */}
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
                    alt={`${item.title}（${item.captionLabel}）`}
                    width={640}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
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
              働く前に、当店の館内や待機個室を実際に見学いただけます
            </p>
            <p className="text-xs sm:text-sm text-[#555555]">
              ※掲載画像は施設・設備の雰囲気をお伝えするためのイメージです。ご希望の方は面接時に当店のお部屋・待機スペースをご案内します。
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
