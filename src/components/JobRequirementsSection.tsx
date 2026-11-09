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
      value: '旅館接客キャスト（短時間接客・旅館個室待機）',
      note: '※店先での顔出し（顔見せ）は一切ありません。清潔な旅館の個室でスマホを見ながら自由待機。'
    },
    {
      label: '応募資格',
      value: '20歳以上の女性（20代大歓迎、30代でも大丈夫です。）',
      note: '※法令および旅館組合規約に基づき20歳以上限定。高校生・未成年不可。在籍の約90%が夜職未経験スタートです。'
    },
    {
      label: '給与システム',
      value: '15分3,800円〜・日給50,000円〜120,000円以上（時給1万円保証＆日給8万〜10万円保証完備）',
      note: '※退勤時にその場で全額現金手渡し（即日日払い）。待機料・厚生費・雑費の天引きは完全ゼロ（手取り100%支給）。'
    },
    {
      label: '勤務時間',
      value: '10:00〜24:00（完全自由出勤制・昼シフト / 夜シフト / 短時間勤務OK）',
      note: '※「お昼だけ」「終電まで」「土日のみ」など、生活スタイルに合わせて1時間単位で自由に設定可能。'
    },
    {
      label: '出勤日数',
      value: '週1日〜・月数回・週末のみ・短期集中・即日体験入店OK',
      note: '※出勤ノルマ・ペナルティ・罰金・出勤強要は一切ありません。学生さんのテスト期間やOLさんの繁忙期の長期休暇も自由。'
    },
    {
      label: '待遇・福利厚生',
      value: '雑費天引き0円・家具家電付き完全個室寮完備・往復交通費全額支給・無料送迎・託児所補助',
      note: '※新幹線・飛行機代を全額支給。即日入居可能なワンルーム個室寮完備。提携託児所費用補助あり。'
    },
    {
      label: '勤務地',
      value: '大阪府和泉市（信太山新地内 老舗直営旅館）',
      note: '※紹介所や仲介ではなく、現場の老舗旅館が直接経営する正規直営求人です。'
    },
    {
      label: '最寄り駅・交通',
      value: 'JR阪和線「信太山駅」徒歩5分（主要駅・指定場所からの無料送迎あり / マイカー通勤・無料駐車場完備）',
      note: '※天王寺駅からJR直通約20分、なんば方面からもアクセス至便。女性専用送迎車を常時運行。'
    },
    {
      label: 'エリア定休日',
      value: '毎月20日（信太山新地エリア一斉定休日）',
      note: '※毎月20日は信太山新地全店が一斉休業のため、出勤催促のない確実な休養日です。'
    },
    {
      label: '面接時の持ち物',
      value: '顔写真付き公的身分証明書（運転免許証・マイナンバーカード・パスポート等）1点のみ',
      note: '※履歴書は一切不要！住民票も不要です。私服のまま手ぶらでお気軽にお越しいただけます。'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden" id="jobs">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-2xs border border-rose-200/80">
            <LucideIcon name="ClipboardList" size={14} className="text-rose-600" />
            <span>信太山新地 老舗旅館直営【公式募集要項】</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4 tracking-tight">
            信太山新地 当店の募集要項
            <span className="block text-base sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mt-1.5 font-sans">
              店先顔見せなし・完全個室待機・日給5万〜12万円即日全額日払い
            </span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            信太山新地の当店における詳しいお仕事条件・採用基準をすべて明示しています。外部スカウトを挟まない旅館直営店だからこそ、引かれ物一切ゼロの手取り100%支給をお約束します。
          </p>
        </div>

        {/* Requirements Table Card */}
        <div className="bg-white rounded-3xl border-2 border-rose-100 shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm shadow-xs">
                📋
              </span>
              <div>
                <h3 className="font-display font-black text-base sm:text-lg">
                  採用条件・募集詳細一覧
                </h3>
                <p className="text-xs text-rose-100">
                  20歳以上の女性限定 / 履歴書不要・私服手ぶら面談OK
                </p>
              </div>
            </div>
            <span className="text-xs font-bold bg-white text-rose-700 px-3 py-1 rounded-full shadow-xs">
              ✓ 法令・規約厳守
            </span>
          </div>

          <div className="divide-y divide-rose-100/70">
            {requirementsData.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 hover:bg-rose-50/20 transition-colors gap-2 md:gap-4 items-baseline"
              >
                <div className="md:col-span-3 font-display font-black text-xs sm:text-sm text-zinc-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span>{item.label}</span>
                </div>
                <div className="md:col-span-9">
                  <p className="font-bold text-xs sm:text-sm text-zinc-900 leading-relaxed">
                    {item.value}
                  </p>
                  {item.note && (
                    <p className="text-[11px] sm:text-xs text-zinc-500 mt-1 leading-relaxed">
                      {item.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onCtaclick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#06c755] hover:bg-[#05b34c] text-white font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            id="job-requirements-line-cta"
          >
            <LucideIcon name="MessageCircle" size={19} className="fill-white" />
            <span>【公式LINE】募集要項について質問・即日応募する</span>
          </button>
          <button
            type="button"
            onClick={onNavigateDetail}
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-rose-50 text-rose-700 font-bold text-xs sm:text-sm border-2 border-rose-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            id="job-requirements-detail-btn"
          >
            <LucideIcon name="FileText" size={16} />
            <span>募集要項・採用基準の詳しい解説を見る</span>
            <LucideIcon name="ArrowRight" size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
