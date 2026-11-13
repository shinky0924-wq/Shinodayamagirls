/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface JobIntroSectionProps {
  onNavigateJobDetail: () => void;
  onCtaclick: () => void;
}

export default function JobIntroSection({
  onNavigateJobDetail,
  onCtaclick,
}: JobIntroSectionProps) {
  const jobTopics = [
    {
      icon: 'Coffee',
      title: '具体的なお仕事内容',
      body: '信太山新地の旅館内における個室での接客（お茶出し・歓談・15分単位のショートコースを中心とするおもてなし）です。お酒の無理な席やお客様との連絡先交換・営業LINEは一切ありません。なお、旅館の案内や客室準備を行う「仲居スタッフ」のお仕事もご相談いただけます。',
    },
    {
      icon: 'ListOrdered',
      title: '接客の基本的な流れ',
      body: '①お客様が旅館に到着すると、仲居さんがお部屋へご案内します（キャストが店先に立つことはありません）→ ②お部屋でお客様をお出迎えし、お茶出し・歓談・コース時間（15分〜60分）のおもてなし → ③時間になると仲居さんが丁寧にお知らせするため時間管理も安心です。',
    },
    {
      icon: 'Clock',
      title: '出勤してから退勤するまで',
      body: 'シフト時間に出勤・お着替え（衣装は無料貸出）→ 待機スペース・個室でリラックス待機 → 仲居さんの案内に合わせて接客 → 終業時にその日の報酬を全額現金でお渡しして退勤。短時間勤務やご希望の上がり時間にも柔軟に対応します。',
    },
    {
      icon: 'DoorClosed',
      title: '勤務中の待機について',
      body: '飛田新地や松島新地のように「お店の前に座って顔を見せる」行為はありません。空調・Wi-Fiの整った清潔な個室や専用待機スペースで、スマートフォンを見たり読書をしたりしながら落ち着いて待機できます。',
    },
    {
      icon: 'HeartHandshake',
      title: '分からないことがあった場合の相談先',
      body: '現場では経験豊富な仲居さんが常に近くにおり、接客前の手順やお客様との対応で迷った際もすぐフォローします。シフトや待遇のご相談は、公式LINEまたは女性サポートスタッフ（あおい）へいつでもご相談いただけます。',
    },
    {
      icon: 'HelpCircle',
      title: '仕事内容に関するよくある質問',
      body: '「夜職が初めてでも大丈夫？」「お酒が飲めないけれど平気？」といった疑問をよくいただきます。在籍キャストの多くが未経験から始めており、ソフトドリンク対応・営業義務なしのため無理なく覚えられる環境です。',
    },
  ];

  return (
    <section
      id="job-intro"
      className="py-16 sm:py-20 bg-white"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
            JOB DESCRIPTION
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] leading-snug mb-3">
            初めての方にも分かる、お仕事内容
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            実際にどのようなお仕事をするのか、応募前に確認しておきましょう。
          </p>
        </div>

        {/* Visual Showcase + Summary Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-10 bg-[#F7F2EC] rounded-2xl p-5 sm:p-7 border border-[#E9DFD4]">
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            <figure className="rounded-xl overflow-hidden bg-white border border-[#E9DFD4]">
              <img
                src="/images/ryokan_working_woman_1792485020272.webp"
                alt="旅館のお部屋で落ち着いた接客イメージ"
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] object-cover"
              />
              <figcaption className="px-2.5 py-1.5 text-[11px] text-[#555555] bg-white">
                接客の雰囲気イメージ
              </figcaption>
            </figure>
            <figure className="rounded-xl overflow-hidden bg-white border border-[#E9DFD4]">
              <img
                src="/images/privacy_ryokan_room_1794375281070.webp"
                alt="落ち着いた和室・個室待機スペースイメージ"
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] object-cover"
              />
              <figcaption className="px-2.5 py-1.5 text-[11px] text-[#555555] bg-white">
                和室・個室イメージ
              </figcaption>
            </figure>
          </div>

          <div className="md:col-span-7 space-y-3">
            <p className="text-xs font-bold text-[#A65D79]">
              信太山新地・旅館営業ならではのポイント
            </p>
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#333333] leading-snug">
              店先での顔見せなし。仲居さんの案内で進める短時間個室接客です。
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
              街頭や店先に座ってお客様を待つ必要がないため、初めての方でも落ち着いて勤務できます。お客様のご案内やお部屋の用意、時間の管理は専任の仲居さんが行うため、一人で無理に対応することはありません。
            </p>
            <p className="text-[11px] text-[#666666]">
              ※掲載写真は雰囲気をお伝えするためのイメージです。実際の館内・個室・待機場所は面接・見学時に直接ご覧いただけます。
            </p>
          </div>
        </div>

        {/* 6 Detailed Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {jobTopics.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFF6F8]/60 rounded-2xl p-5 sm:p-6 border border-[#F0E2E7] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EFE2E7] flex items-center justify-center text-[#A65D79] shrink-0">
                    <LucideIcon name={item.icon} size={18} />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#333333] leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="/job"
            onClick={(e) => {
              e.preventDefault();
              onNavigateJobDetail();
            }}
            id="job-intro-detail-btn"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#A65D79] hover:bg-[#8E4C66] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-[0_2px_10px_rgba(166,93,121,0.2)]"
          >
            <span>詳しい仕事内容を見る</span>
            <LucideIcon name="ArrowRight" size={16} />
          </a>
          <button
            type="button"
            onClick={onCtaclick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#FFF6F8] text-[#A65D79] font-bold text-sm border border-[#E2CED6] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LucideIcon name="MessageCircle" size={16} className="text-[#06C755]" />
            <span>仕事内容についてLINEで質問する</span>
          </button>
        </div>
      </div>
    </section>
  );
}
