/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface JobRequirementsSectionProps {
  onCtaclick: () => void;
  onNavigateDetail: () => void;
}

export default function JobRequirementsSection({
  onCtaclick,
  onNavigateDetail,
}: JobRequirementsSectionProps) {
  const requirementsData = [
    {
      label: '募集職種',
      value: '旅館個室接客コンパニオン（希望により旅館の仲居スタッフも相談可）',
      note: '※店先での顔見せはなく、旅館内の個室・待機スペースでお仕事のご案内を待ちます。',
    },
    {
      label: '応募資格',
      value: '20歳以上の女性（未経験歓迎・20代〜40代の方までご相談可能）',
      note: '※法令および旅館組合規約に基づき20歳未満の方はご応募いただけません。面接時に顔写真付きの公的身分証明書（免許証・マイナンバーカード・パスポート等）が1点必要です。',
    },
    {
      label: '勤務地',
      value: '大阪府和泉市 幸二丁目（信太山新地にある当店・老舗旅館直営）',
      note: '※仲介業者や紹介所を通さないお店直接の募集です。JR阪和線「信太山駅」から徒歩約5分（天王寺駅から快速で約20分）。主要駅からの無料送迎や専用駐車場も完備しています。',
    },
    {
      label: '仕事内容',
      value: '旅館個室での15分〜60分ショートコース接客（ゴム着用厳守での本番等を含むマンツーマンサービス）',
      note: '※お茶出しや飲酒を伴う席、お客様との連絡先交換・SNS更新義務は一切ありません。受付案内や客室清掃は当店の仲居さんが担当します。',
    },
    {
      label: '報酬',
      value: '15分 3,800円〜 / 30分 7,600円〜 / 45分 11,400円〜 / 60分 15,200円〜',
      note: '※当店では最低時給10,000円保証・待機時間に応じた日給保証制度を設けています（適用となる時間帯・待機条件は面接時に書面と口頭で事前にご案内します）。雑費・紹介料の天引きは0円です。',
    },
    {
      label: '勤務時間',
      value: '10:00〜24:00の間で希望相談制（昼のみ・夕方まで・夜のみ等）',
      note: '※「お昼だけ」「夕方まで」「1日3〜4時間の短時間」など、ご自身の生活スタイルに合わせて当店スタッフと直接ご相談・調整いただけます。',
    },
    {
      label: '勤務日数',
      value: '週1日〜・月数回・土日のみ・短期勤務もご相談可能',
      note: '※出勤ノルマ・罰金はありません。なお毎月20日は信太山新地エリア一斉定休日です。',
    },
    {
      label: '支払い',
      value: '即日全額現金手渡し日払い',
      note: '※当日の勤務終了時に当店より全額現金でお渡しします。体験入店の日も当日にお渡ししています。',
    },
    {
      label: '待遇',
      value: '衣装無料貸出・完全個室待機・家具家電付きワンルーム個室寮完備・往復交通費全額支給（規定あり）・駅送迎/専用駐車場完備・提携託児所サポートあり',
      note: '※当店が用意するワンルーム個室寮の入居時期や費用（日額0〜2,000円目安）、送迎対応のお時間、交通費支給の領収書条件などもご希望をお聞きして当店よりそのままご案内します。',
    },
    {
      label: '応募方法',
      value: '当店公式LINEより24時間受付中（まずは質問・見学相談のみも歓迎）',
      note: '※履歴書は不要、私服のまま当店へお越しいただけます。体験入店を希望される場合も事前見学のうえでご判断いただけます。',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white" id="jobs">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.18em] text-[#A65D79] uppercase mb-2">
            JOB REQUIREMENTS
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#333333] leading-snug mb-3">
            信太山ガールズの募集条件
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            仲介業者や紹介所を通さない、信太山新地にある当店が女性を直接募集する公式求人条件です。
          </p>
        </div>

        {/* Clean Table Card */}
        <div className="bg-white rounded-2xl border border-[#E8D7DE] shadow-[0_4px_20px_rgba(166,93,121,0.05)] overflow-hidden mb-8">
          <div className="bg-[#A65D79] px-5 sm:px-6 py-4 text-white flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg">
                信太山ガールズ 公式募集要項
              </h3>
              <p className="text-xs text-white/90">
                20歳以上の女性対象｜お店直接募集・履歴書不要・事前見学OK
              </p>
            </div>
            <span className="text-xs font-bold bg-white/15 px-3 py-1 rounded-lg border border-white/25">
              お店直接採用
            </span>
          </div>

          <dl className="divide-y divide-[#F3E7EC]">
            {requirementsData.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 gap-1.5 md:gap-4 items-baseline hover:bg-[#FFF6F8]/40 transition-colors"
              >
                <dt className="md:col-span-3 font-display font-bold text-sm text-[#A65D79]">
                  {item.label}
                </dt>
                <dd className="md:col-span-9">
                  <p className="font-bold text-sm sm:text-[15px] text-[#333333] leading-relaxed">
                    {item.value}
                  </p>
                  {item.note && (
                    <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                      {item.note}
                    </p>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onCtaclick}
            id="job-requirements-line-cta"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm sm:text-base shadow-[0_3px_12px_rgba(6,199,85,0.22)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LucideIcon name="MessageCircle" size={18} className="fill-white" />
            <span>LINEで募集条件について質問する</span>
          </button>

          <a
            href="/requirements"
            onClick={(e) => {
              e.preventDefault();
              onNavigateDetail();
            }}
            id="job-requirements-detail-btn"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#FFF6F8] text-[#A65D79] font-bold text-xs sm:text-sm border border-[#E2CED6] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>募集要項・必要書類の詳しい解説を見る</span>
            <LucideIcon name="ArrowRight" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
