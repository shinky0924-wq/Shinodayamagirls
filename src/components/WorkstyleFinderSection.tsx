/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface WorkstyleFinderSectionProps {
  onSelectWorkstyle: (slug: string) => void;
  onViewAllWorkstyles: () => void;
}

interface WorkstyleCardItem {
  number: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

const WORKSTYLE_CARDS: WorkstyleCardItem[] = [
  {
    number: '01',
    slug: 'inexperienced',
    title: '未経験から始めたい',
    description: '初めてのお仕事で不安な方へ。仕事内容や働き始めるまでの流れをご案内します。',
    image: '/images/hub_beginner_cast_1792485407920.webp',
    icon: 'Sparkles',
  },
  {
    number: '02',
    slug: 'high-income',
    title: '高収入を目指したい',
    description: '報酬の仕組みや収入例を確認したい方へ。',
    image: '/images/col_salary_yen_1792463652387.webp',
    icon: 'Wallet',
  },
  {
    number: '03',
    slug: 'weekly-1',
    title: '週1日から働きたい',
    description: '本業や家庭と両立しながら働きたい方へ。',
    image: '/images/col_weekend_planner_1792475629264.webp',
    icon: 'CalendarDays',
  },
  {
    number: '04',
    slug: 'privacy',
    title: '顔出しなし・身バレ対策を重視したい',
    description: 'プライバシーについて事前に相談したい方へ。',
    image: '/images/privacy_phone_discreet_1794375281535.webp',
    icon: 'EyeOff',
  },
  {
    number: '05',
    slug: 'short-term',
    title: '短時間・短期で働きたい',
    description: '限られた時間や期間で働きたい方へ。',
    image: '/images/col_daytime_clock_jp_1792476810942.webp',
    icon: 'Clock',
  },
  {
    number: '06',
    slug: 'female-staff',
    title: '女性スタッフに相談したい',
    description: '応募前に不安や疑問を相談したい方へ。',
    image: '/images/safety_female_consultation_1794375281375.webp',
    icon: 'MessagesSquare',
  },
  {
    number: '07',
    slug: 'dormitory',
    title: '出稼ぎ・寮付き希望',
    description: '遠方から働きたい方や住まいについて相談したい方へ。',
    image: '/images/relocation_suitcase_travel_1794374512087.webp',
    icon: 'Home',
  },
];

export default function WorkstyleFinderSection({
  onSelectWorkstyle,
  onViewAllWorkstyles,
}: WorkstyleFinderSectionProps) {
  return (
    <section
      id="workstyle-finder"
      className="py-16 sm:py-20 bg-[#FFF6F8] border-y border-[#F3E5EA]"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
            WORKSTYLE MATCH
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] leading-snug mb-3">
            あなたに合った働き方を見つけましょう
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            当店での働き方や募集条件について、ご希望や状況に合う項目からご確認いただけます。
          </p>
        </div>

        {/* 7 Cards: PC 3 cols, Mobile 2 cols (or 1 col on narrow screens) */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {WORKSTYLE_CARDS.map((card) => (
            <a
              key={card.slug}
              href={`/types/${card.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onSelectWorkstyle(card.slug);
              }}
              id={`workstyle-card-${card.slug}`}
              className="group bg-white rounded-2xl border border-[#EFE2E7] shadow-[0_2px_12px_rgba(166,93,121,0.05)] hover:shadow-[0_6px_22px_rgba(166,93,121,0.12)] hover:border-[#A65D79]/40 transition-all duration-200 overflow-hidden flex flex-col justify-between text-left"
            >
              <div>
                {/* Compact thumbnail with number indicator */}
                <div className="flex items-center gap-3.5 p-4 sm:p-5 pb-3 border-b border-[#FAF2F5]">
                  <div className="w-16 h-16 sm:w-20 sm:h-16 rounded-xl overflow-hidden bg-[#F7F2EC] shrink-0 border border-[#EFE2E7]">
                    <img
                      src={card.image}
                      alt={`${card.title}のイメージ`}
                      width={160}
                      height={128}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#A65D79] mb-1">
                      <LucideIcon name={card.icon} size={14} className="text-[#E85B91] shrink-0" />
                      <span>STYLE {card.number}</span>
                    </div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#333333] group-hover:text-[#A65D79] transition-colors leading-snug">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Description (approx 2 lines) */}
                <div className="px-4 sm:px-5 pt-3 pb-2">
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Detail link footer */}
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 flex items-center justify-end">
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#A65D79] group-hover:text-[#E85B91] transition-colors">
                  <span>詳しく見る</span>
                  <LucideIcon
                    name="ChevronRight"
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* All Workstyles CTA */}
        <div className="mt-8 text-center">
          <a
            href="/types"
            onClick={(e) => {
              e.preventDefault();
              onViewAllWorkstyles();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#F7F2EC] text-[#A65D79] font-bold text-xs sm:text-sm border border-[#E5D4DC] shadow-[0_2px_8px_rgba(166,93,121,0.05)] transition-colors"
            id="workstyle-finder-all-btn"
          >
            <span>タイプ別の働き方一覧を見る</span>
            <LucideIcon name="ArrowRight" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
