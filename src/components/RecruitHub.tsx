/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface RecruitHubProps {
  onScrollToSection: (sectionId: string) => void;
  onNavigateToArticle?: (slug: string) => void;
  onNavigateToBlog?: (category?: string) => void;
  onNavigateCompare?: (categorySlug?: string) => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateFaq?: () => void;
}

export interface HubTopicItem {
  id: string;
  path: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
}

export const HUB_TOPIC_ITEMS: HubTopicItem[] = [
  {
    id: 'job',
    path: '/job',
    number: '01',
    title: '仕事内容を詳しく見る',
    shortTitle: '仕事内容',
    description: '接客の手順、待機スペースでの過ごし方、仲居さんのフォロー体制などを解説しています。',
    image: '/images/col_aroma_relax_1792474257103.webp',
  },
  {
    id: 'salary',
    path: '/salary',
    number: '02',
    title: 'お給料・報酬の仕組みを見る',
    shortTitle: '給料・待遇',
    description: '15分ごとのコース報酬や保証制度、日払い条件、控除の有無について分かりやすく説明しています。',
    image: '/images/col_bonus_envelope_jp_1792476753315.webp',
  },
  {
    id: 'beginner',
    path: '/beginner',
    number: '03',
    title: '未経験者向けガイドを見る',
    shortTitle: '未経験',
    description: '初めてお仕事を探す方が安心して始められるよう、事前準備やよくある不安にお答えします。',
    image: '/images/col_easy_yukata_jp_1792476829780.webp',
  },
  {
    id: 'experienced',
    path: '/experienced',
    number: '04',
    title: '経験者向けガイドを見る',
    shortTitle: '経験者',
    description: '他店・他業種からの移籍を検討されている方向けに、待機環境や条件の違いをまとめています。',
    image: '/images/hub_experienced_cast_1792485405837.webp',
  },
  {
    id: 'requirements',
    path: '/requirements',
    number: '05',
    title: '募集要項・採用条件を見る',
    shortTitle: '募集要項',
    description: '応募資格や必要な本人確認書類、勤務地、採用にあたっての確認事項をご案内します。',
    image: '/images/col_official_documents_1792465890547.webp',
  },
  {
    id: 'flow',
    path: '/flow',
    number: '06',
    title: '面接・体験入店の流れを見る',
    shortTitle: '面接・体験入店',
    description: 'LINE相談から見学、面接、体験入店、お仕事開始までのステップを順を追って確認できます。',
    image: '/images/col_trial_orient_jp_1792475594501.webp',
  },
  {
    id: 'workstyle',
    path: '/workstyle',
    number: '07',
    title: '自由な働き方について見る',
    shortTitle: '働き方',
    description: '週1日や短時間、本業・家庭との両立、毎月20日の定休日などシフトの考え方を解説します。',
    image: '/images/col_double_work_jp_1792475554864.webp',
  },
  {
    id: 'shops',
    path: '/shops',
    number: '08',
    title: '当店が選ばれる理由・半年ルールを見る',
    shortTitle: 'お店選び',
    description: 'お店直接応募と紹介経由の違いや、信太山新地の「半年ルール」を踏まえた当店ならではの安心ポイントを紹介します。',
    image: '/images/col_friendly_staff_jp_1792476884275.webp',
  },
  {
    id: 'dorm',
    path: '/dorm',
    number: '09',
    title: '寮・出稼ぎ情報を見る',
    shortTitle: '寮・出稼ぎ',
    description: 'JR信太山駅周辺に当店がご用意する個室寮の設備・費用目安や、往復交通費の全額支給条件をご案内します。',
    image: '/images/dorm_bed_area_1794374510713.webp',
  },
  {
    id: 'safety',
    path: '/safety',
    number: '10',
    title: '身バレ・安全対策を見る',
    shortTitle: '身バレ・安全',
    description: '店先顔出しなし・Web写真非掲載・個人情報の厳格管理など、当店のプライバシー保護への取り組みです。',
    image: '/images/col_privacy_safe_1792463653857.webp',
  },
  {
    id: 'faq',
    path: '/faq',
    number: '11',
    title: 'よくある質問（全66問）を見る',
    shortTitle: 'よくある質問',
    description: 'お仕事内容・給料・年齢・面接・寮・プライバシーなど、当店への応募前に多い疑問を網羅しています。',
    image: '/images/shinodayama_advisor_sakura_1792225964799.webp',
  },
  {
    id: 'blog',
    path: '/blog',
    number: '12',
    title: 'お役立ち情報・コラムを見る',
    shortTitle: 'お仕事コラム',
    description: '信太山新地の働き方や業界の知識、当店スタッフのQ&Aなど役立つ解説記事を掲載しています。',
    image: '/images/col_search_phone_jp_1792475574840.webp',
  },
];

export default function RecruitHub({
  onScrollToSection,
  onNavigateToBlog,
  onNavigateTopic,
  onNavigateFaq,
}: RecruitHubProps) {
  const handleCardClick = (item: HubTopicItem) => {
    if (item.id === 'faq') {
      if (onNavigateFaq) onNavigateFaq();
      else onScrollToSection('top-faq');
    } else if (item.id === 'blog') {
      if (onNavigateToBlog) onNavigateToBlog();
      else onScrollToSection('jobs');
    } else if (onNavigateTopic) {
      onNavigateTopic(item.id);
    } else {
      onScrollToSection('jobs');
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#F3E5EA]" id="recruit-hub">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
            RECRUIT GUIDE
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] leading-snug mb-3">
            応募前に知っておきたい情報
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            気になるテーマから当店の募集情報を詳しく確認できます。分からないことはLINEでも当店スタッフが直接お答えします。
          </p>
        </div>

        {/* 12 Compact Uniform Cards (PC 3 cols x 4 rows, Tablet 2 cols, Mobile 1 col) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HUB_TOPIC_ITEMS.map((topic) => (
            <article
              key={topic.id}
              id={`hub-topic-${topic.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-[#EFE2E7] shadow-[0_2px_10px_rgba(166,93,121,0.04)] hover:shadow-[0_6px_18px_rgba(166,93,121,0.1)] hover:border-[#A65D79]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Uniform 16:9 Photo */}
                <a
                  href={topic.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCardClick(topic);
                  }}
                  className="block relative aspect-[16/9] bg-[#F7F2EC] overflow-hidden"
                >
                  <img
                    src={topic.image}
                    alt={`${topic.shortTitle}｜${topic.title}`}
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/shinodayama_hero_banner_1792225964954.webp';
                    }}
                  />
                </a>

                {/* Card Body */}
                <div className="p-4 sm:p-5 pb-3">
                  <p className="text-[11px] font-bold text-[#A65D79] mb-1">
                    {topic.number}｜{topic.shortTitle}
                  </p>
                  <h3 className="font-display font-bold text-base text-[#333333] group-hover:text-[#A65D79] transition-colors mb-2 leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed line-clamp-2">
                    {topic.description}
                  </p>
                </div>
              </div>

              {/* Detail Link Button */}
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1">
                <a
                  href={topic.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCardClick(topic);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FFF6F8] hover:bg-[#A65D79] text-[#A65D79] hover:text-white font-bold text-xs sm:text-sm border border-[#EFE2E7] hover:border-[#A65D79] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>詳しく見る</span>
                  <LucideIcon name="ChevronRight" size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
