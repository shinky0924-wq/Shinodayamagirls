/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LucideIcon from './LucideIcon';

interface BenefitsPageContentProps {
  onCtaclickWithData: (data: string) => void;
  onNavigateCompare?: () => void;
}

export default function BenefitsPageContent({
  onCtaclickWithData,
  onNavigateCompare
}: BenefitsPageContentProps) {
  return (
    <div className="space-y-8">
      {/* 1. 9大安心待遇カードグリッド */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-200/90 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-rose-500 rounded-full inline-block" />
            <h2 className="font-display font-black text-lg sm:text-xl text-zinc-900">
              信太山新地 当店（老舗旅館直営）の9大安心待遇
            </h2>
          </div>
          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            引かれ物ゼロ・女性目線サポート
          </span>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 mb-6 leading-relaxed">
          信太山新地の当店は料亭ではなく、安心の老舗旅館直営店です。外部のスカウトや仲介業者を挟まない公式直営店だからこそ、理不尽な天引きや紹介料は一切なく、手取り100%支給と女性目線の最高水準の待遇を完備。安心してお仕事ができる信太山新地の当店へぜひご応募ください。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* 1. 雑費0円 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 border border-rose-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-xs">
              <LucideIcon name="Coins" size={18} />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1.5">
              雑費・天引き「完全0円」
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              待機料、厚生費、部屋代、ロッカー代などの名目天引きは一切ゼロ。稼いだ報酬の手取り100%をお渡しします。
            </p>
          </div>

          {/* 2. 個室寮 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 border border-rose-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-xs">
              <LucideIcon name="Home" size={18} />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1.5">
              家具家電付き完全個室寮
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              テレビ・エアコン・冷蔵庫・洗濯機・Wi-Fi完備のワンルームマンション寮。敷金礼金0円・即日入居OK（日額0〜2,000円）。
            </p>
          </div>

          {/* 3. 交通費支給 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 border border-rose-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-xs">
              <LucideIcon name="Train" size={18} />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1.5">
              往復交通費を全額支給
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              全国（北海道〜沖縄）からの新幹線・飛行機・特急代などの往復交通費を全額支給。領収書持参で面接時に即日現金支給。
            </p>
          </div>

          {/* 4. 無料送迎 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 border border-rose-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-xs">
              <LucideIcon name="Car" size={18} />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1.5">
              安心の無料送迎サポート
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              JR信太山駅、泉大津駅、和泉府中駅や主要駅、近隣自宅付近まで専用車で無料送迎。マイカー通勤（駐車場完備）もOK。
            </p>
          </div>

          {/* 5. 託児所補助 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 border border-rose-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-xs">
              <LucideIcon name="Baby" size={18} />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1.5">
              提携託児所完備＆費用補助
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              小さなお子様がいるシングルマザーや主婦の方を応援。提携託児所をご用意し、託児費用の補助手当も支給して出費をサポート。
            </p>
          </div>

          {/* 6. 衣装無料レンタル */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 border border-rose-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-xs">
              <LucideIcon name="Sparkles" size={18} />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1.5">
              衣装・着物・道具一式無料貸出
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              着物や浴衣、ドレス、ヘアアイロンやアメニティもすべて無料で完備。手ぶらで私服通勤でき、衣装代の自己負担は一切ありません。
            </p>
          </div>

          {/* 7. 身バレ防止 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 border border-rose-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-xs">
              <LucideIcon name="EyeOff" size={18} />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1.5">
              店先顔出しゼロ・完全個室待機
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              飛田のような通りでの顔見せは一切なし。Web写真掲載も完全ゼロ。完全源氏名、住民税普通徴収手続きまで家族・会社バレを徹底防止。
            </p>
          </div>

          {/* 8. 毎月20日一斉定休 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 border border-rose-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-xs">
              <LucideIcon name="CalendarCheck" size={18} />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1.5">
              毎月20日エリア一斉定休日
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              信太山新地全体の公式ルールとして、毎月20日はエリア全体が一斉休業。休日出勤催促LINEもなく、全員が気兼ねなく体を休められます。
            </p>
          </div>

          {/* 9. お酒・営業連絡一切不要 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 border border-rose-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-xs">
              <LucideIcon name="WineOff" size={18} />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1.5">
              お酒完全不要＆営業連絡禁止
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              ソフトドリンク（お茶・水）でおもてなしするため飲酒は不要。客との連絡先交換・営業LINEも禁止でプライベートを守ります。
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => onCtaclickWithData('【信太山新地の当店へ応募】寮や交通費、身バレ防止などの待遇について詳しく相談したいです')}
            className="w-full sm:w-auto bg-[#06c755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LucideIcon name="MessageCircle" size={16} className="fill-white" />
            <span>信太山新地の当店へ応募！待遇・個室寮・交通費をLINEで相談する</span>
          </button>
        </div>
      </div>

      {/* 2. 大阪三大新地＆他業種 待遇比較表 */}
      <div className="bg-gradient-to-br from-rose-50/60 via-white to-pink-50/30 rounded-3xl p-6 sm:p-8 border-2 border-rose-200/80 shadow-sm" id="area-comparison-table">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-1">
              <LucideIcon name="MapPin" size={14} />
              <span>他エリア・他業種との待遇の違い</span>
            </div>
            <h3 className="font-display font-black text-lg sm:text-2xl text-zinc-900">
              信太山新地（当店） vs 飛田新地 vs 松島新地 待遇比較表
            </h3>
          </div>
          {onNavigateCompare && (
            <a
              href="/compare"
              onClick={(e) => {
                e.preventDefault();
                onNavigateCompare();
              }}
              className="self-start sm:self-auto text-xs font-bold text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <span>全10項目の詳細比較表を見る</span>
              <LucideIcon name="ChevronRight" size={13} />
            </a>
          )}
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 mb-5 leading-relaxed">
          「他の新地や風俗と待遇はどう違うの？」信太山新地 老舗旅館直営である当店の最大の特徴は<strong className="text-rose-700 font-bold">「店先での顔見せが一切ない完全個室待機」</strong>と、<strong className="text-rose-700 font-bold">「天引き・引かれ物が完全0円」</strong>な点です。他店・他エリアで後悔した経験がある方も、ぜひ安心の信太山新地 当店へご応募ください。
        </p>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-xs sm:text-sm border-collapse min-w-[650px]">
            <caption className="sr-only">信太山新地・飛田新地・松島新地・一般風俗の待遇比較表</caption>
            <thead>
              <tr className="bg-rose-100/70 border-b border-rose-200 text-rose-950">
                <th scope="col" className="py-2.5 px-3.5 text-left font-bold w-[18%]">待遇項目</th>
                <th scope="col" className="py-2.5 px-3.5 text-left font-black text-rose-800 bg-rose-100 w-[26%]">
                  【信太山新地 老舗旅館直営の当店】
                </th>
                <th scope="col" className="py-2.5 px-3.5 text-left font-bold text-zinc-700 w-[18%]">飛田新地</th>
                <th scope="col" className="py-2.5 px-3.5 text-left font-bold text-zinc-700 w-[18%]">松島新地</th>
                <th scope="col" className="py-2.5 px-3.5 text-left font-bold text-zinc-700 w-[20%]">一般風俗・キャバクラ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 bg-white">
              <tr className="hover:bg-rose-50/30">
                <th scope="row" className="py-2.5 px-3.5 font-bold text-zinc-900 text-left">店先顔見せ</th>
                <td className="py-2.5 px-3.5 font-bold text-emerald-700 bg-rose-50/20">
                  ◎ 一切なし（完全個室待機100%）
                </td>
                <td className="py-2.5 px-3.5 text-zinc-600">✕ 上がり框で顔出し座り必須</td>
                <td className="py-2.5 px-3.5 text-zinc-600">△ 店頭座り・顔出しあり</td>
                <td className="py-2.5 px-3.5 text-zinc-600">✕ ネット写真掲載が必須</td>
              </tr>
              <tr className="hover:bg-rose-50/30">
                <th scope="row" className="py-2.5 px-3.5 font-bold text-zinc-900 text-left">1コース時間</th>
                <td className="py-2.5 px-3.5 font-bold text-rose-700 bg-rose-50/20">
                  ◎ 最短15分〜（時給1万円保証）
                </td>
                <td className="py-2.5 px-3.5 text-zinc-600">◯ 最短15分〜20分</td>
                <td className="py-2.5 px-3.5 text-zinc-600">◯ 最短20分〜30分</td>
                <td className="py-2.5 px-3.5 text-zinc-600">△ 60分〜120分の拘束</td>
              </tr>
              <tr className="hover:bg-rose-50/30">
                <th scope="row" className="py-2.5 px-3.5 font-bold text-zinc-900 text-left">想定日給</th>
                <td className="py-2.5 px-3.5 font-bold text-rose-700 bg-rose-50/20">
                  ◎ 日給5万〜12万円超（全額即日手渡し）
                </td>
                <td className="py-2.5 px-3.5 text-zinc-600">◯ 日給4万〜10万円</td>
                <td className="py-2.5 px-3.5 text-zinc-600">◯ 日給3万〜8万円</td>
                <td className="py-2.5 px-3.5 text-zinc-600">△ 日給3万〜7万円（月締め）</td>
              </tr>
              <tr className="hover:bg-rose-50/30">
                <th scope="row" className="py-2.5 px-3.5 font-bold text-zinc-900 text-left">天引き・雑費</th>
                <td className="py-2.5 px-3.5 font-bold text-emerald-700 bg-rose-50/20">
                  ◎ 完全0円（引かれもの一切なし）
                </td>
                <td className="py-2.5 px-3.5 text-zinc-600">△ 厚生費・衣装代天引きあり</td>
                <td className="py-2.5 px-3.5 text-zinc-600">△ 一部天引き店舗あり</td>
                <td className="py-2.5 px-3.5 text-zinc-600">✕ 厚生費・ヘアメイク代等多数</td>
              </tr>
              <tr className="hover:bg-rose-50/30">
                <th scope="row" className="py-2.5 px-3.5 font-bold text-zinc-900 text-left">定休日</th>
                <td className="py-2.5 px-3.5 font-bold text-rose-700 bg-rose-50/20">
                  ◎ 毎月20日エリア一斉定休日
                </td>
                <td className="py-2.5 px-3.5 text-zinc-600">◯ 店舗ごとの不定休</td>
                <td className="py-2.5 px-3.5 text-zinc-600">◯ 店舗ごとのシフト制</td>
                <td className="py-2.5 px-3.5 text-zinc-600">✕ 年中無休（出勤催促あり）</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
