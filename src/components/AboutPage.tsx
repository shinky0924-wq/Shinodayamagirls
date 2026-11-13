import React, { useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { getStoredSiteContent, getEffectiveLastUpdated } from '../siteContent';
import { updatePageSeo } from '../seo';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onCtaclick: () => void;
  mode?: 'about' | 'policy';
}

export default function AboutPage({ onNavigateHome, onNavigateBlog, onCtaclick, mode = 'about' }: AboutPageProps) {
  const siteContent = getStoredSiteContent();
  const lastUpdated = getEffectiveLastUpdated(siteContent.lastUpdated);
  const isPolicy = mode === 'policy';

  useEffect(() => {
    updatePageSeo(
      isPolicy
        ? {
            title: '求人情報掲載ポリシー・安全規約・個人情報保護｜信太山ガールズ公式',
            description: '信太山新地の老舗旅館直営「信太山ガールズ」の求人情報掲載ポリシー、コンプライアンス＆就労安全憲章、身バレ防止・個人情報保護方針（プライバシーポリシー）をご案内します。',
            canonicalUrl: 'https://osaka-shinodayamashinchi-recruit.com/policy',
            ogType: 'website',
            jsonLd: {
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              'name': '求人情報掲載ポリシー・安全規約・個人情報保護方針',
              'description': '信太山ガールズの求人掲載基準、コンプライアンス就労憲章、個人情報保護方針',
              'url': 'https://osaka-shinodayamashinchi-recruit.com/policy'
            }
          }
        : {
            title: '運営者情報・店舗概要｜信太山ガールズ（信太山新地 旅館直営公式採用窓口）',
            description: '信太山新地の旅館直営公式求人「信太山ガールズ」の運営者情報、グループ店舗概要、所在地、採用責任者、所属団体（信太山新地旅館組合）、事業内容、コンプライアンス就労憲章、個人情報保護規程を明示しています。',
            canonicalUrl: 'https://osaka-shinodayamashinchi-recruit.com/about',
            ogType: 'website',
            jsonLd: {
              '@context': 'https://schema.org',
              '@type': 'AboutPage',
              'name': '運営者情報・店舗概要',
              'description': '信太山新地の旅館直営公式求人「信太山ガールズ」の運営者情報・店舗概要',
              'url': 'https://osaka-shinodayamashinchi-recruit.com/about'
            }
          }
    );
  }, [isPolicy]);

  return (
    <div className="min-h-screen bg-surface py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-zinc-500">
          <ol className="flex items-center gap-2">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <LucideIcon name="Home" size={13} />
                <span>ホーム</span>
              </a>
            </li>
            <li>/</li>
            <li className="text-zinc-800 font-bold">
              {isPolicy ? '掲載ポリシー・安全規約・個人情報保護' : '運営者情報・店舗概要'}
            </li>
          </ol>
        </nav>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-xs font-bold px-3.5 py-1.5 rounded-full">
              <LucideIcon name="ShieldCheck" size={14} className="text-rose-600" />
              <span>信太山新地旅館組合正規加盟 旅館直営公式窓口</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-600 text-xs font-mono px-3 py-1.5 rounded-full">
              <LucideIcon name="CalendarCheck" size={13} className="text-rose-600" />
              <span>サイト最終更新日：{lastUpdated}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 leading-tight mb-4 font-display">
            {isPolicy ? '求人情報掲載ポリシー・安全規約・個人情報保護方針' : '運営者情報・グループ店舗概要'}
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
            当サイト「信太山ガールズ」は、大阪府和泉市の信太山新地にて昭和期より旅館を営む直営グループが、女性の安心・安全とプライバシー保護を最優先に運営する公式採用窓口です。
            外部スカウト業者や仲介所を一切介さない直営採用のため、紹介料の天引きや不透明な中抜きは一切ありません。
            法令遵守（コンプライアンス）のもと、店先での顔見せがない個室待機環境と高水準の報酬制度をお約束いたします。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-rose-100">
            <div className="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100/60">
              <div className="text-[11px] text-zinc-500 font-bold mb-0.5">採用形態</div>
              <div className="text-lg font-black text-rose-600">旅館直営・直契約</div>
              <div className="text-[11px] text-zinc-600 mt-0.5">紹介料・天引き完全0円</div>
            </div>
            <div className="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100/60">
              <div className="text-[11px] text-zinc-500 font-bold mb-0.5">待機スタイル</div>
              <div className="text-lg font-black text-rose-600">店先顔出しなし</div>
              <div className="text-[11px] text-zinc-600 mt-0.5">旅館個室・スタンド待機</div>
            </div>
            <div className="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100/60">
              <div className="text-[11px] text-zinc-500 font-bold mb-0.5">給与支払規定</div>
              <div className="text-lg font-black text-rose-600">即日全額日払い</div>
              <div className="text-[11px] text-zinc-600 mt-0.5">現金手渡し・天引き0円</div>
            </div>
          </div>
        </div>

        {/* 1. 公式運営者情報 テーブル */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <LucideIcon name="Building2" size={20} />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                公式運営者概要
              </h2>
              <p className="text-xs text-zinc-500">
                信太山新地 旅館直営グループの基本情報
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-200 text-xs sm:text-sm">
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-zinc-200">
                <tr className="bg-zinc-50/70">
                  <th className="py-3.5 px-4 text-left font-bold text-zinc-700 w-1/3 sm:w-1/4 align-top">
                    屋号 / 窓口名称
                  </th>
                  <td className="py-3.5 px-4 text-zinc-900 font-semibold">
                    信太山ガールズ 公式採用窓口（信太山新地 旅館直営グループ）
                  </td>
                </tr>
                <tr>
                  <th className="py-3.5 px-4 text-left font-bold text-zinc-700 align-top">
                    運営事業形態
                  </th>
                  <td className="py-3.5 px-4 text-zinc-800 leading-relaxed">
                    信太山新地旅館組合 正規加盟店（旅館営業・コンパニオン及び仲居スタッフ直営採用・労務管理）
                  </td>
                </tr>
                <tr className="bg-zinc-50/70">
                  <th className="py-3.5 px-4 text-left font-bold text-zinc-700 align-top">
                    運営所在地
                  </th>
                  <td className="py-3.5 px-4 text-zinc-800 leading-relaxed">
                    大阪府和泉市（JR阪和線「信太山駅」徒歩約5分）<br />
                    <span className="text-[11px] text-zinc-500 block mt-1">
                      ※防犯管理および女性キャストのプライバシー保護徹底のため、直営旅館の正確な番地や見学ルートは面談・見学確定時に個別にご案内しております。
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="py-3.5 px-4 text-left font-bold text-zinc-700 align-top">
                    所属団体
                  </th>
                  <td className="py-3.5 px-4 text-zinc-800 font-semibold">
                    信太山新地旅館組合（正規加盟・健全就労規約遵守店舗）
                  </td>
                </tr>
                <tr className="bg-zinc-50/70">
                  <th className="py-3.5 px-4 text-left font-bold text-zinc-700 align-top">
                    採用・運営統括責任者
                  </th>
                  <td className="py-3.5 px-4 text-zinc-800 leading-relaxed">
                    <p className="font-semibold text-zinc-900">採用・労務マネージャー：松本 健二</p>
                    <p className="text-zinc-600 mt-0.5">女性相談・就労サポート責任者：あおい（女性相談員歴8年）</p>
                  </td>
                </tr>
                <tr>
                  <th className="py-3.5 px-4 text-left font-bold text-zinc-700 align-top">
                    事業内容
                  </th>
                  <td className="py-3.5 px-4 text-zinc-800 leading-relaxed space-y-1">
                    <p>1. 信太山新地直営旅館におけるコンパニオン（接客業務）の募集・面談・研修・労務管理</p>
                    <p>2. 仲居スタッフ（受付・お客様案内・客室清掃）の採用・育成</p>
                    <p>3. 完全個室マンション寮（家具家電完備）の保有・維持管理・提供</p>
                    <p>4. 女性キャストの身バレ防止・プライバシー保護管理・アリバイ支援（勤務・在籍証明等）</p>
                    <p>5. 24時間女性専用LINE無料相談窓口の運営・事前カウンセリング</p>
                  </td>
                </tr>
                <tr className="bg-zinc-50/70">
                  <th className="py-3.5 px-4 text-left font-bold text-zinc-700 align-top">
                    沿革・営業実績
                  </th>
                  <td className="py-3.5 px-4 text-zinc-800 leading-relaxed">
                    昭和期より信太山新地エリアにて旅館業を継続。自社保有物件を含む複数棟の直営旅館を展開し、長年にわたり健全かつ安定した店舗運営を維持しています。
                  </td>
                </tr>
                <tr>
                  <th className="py-3.5 px-4 text-left font-bold text-zinc-700 align-top">
                    連絡先・相談窓口
                  </th>
                  <td className="py-3.5 px-4 text-zinc-800 leading-relaxed">
                    <p className="font-bold text-rose-600">公式LINE相談窓口（女性スタッフ直通・24時間受付）</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">※お電話・メール・LINEでの事前相談、出張面接のご要望にも柔軟に対応いたします。</p>
                  </td>
                </tr>
                <tr className="bg-zinc-50/70">
                  <th className="py-3.5 px-4 text-left font-bold text-zinc-700 align-top">
                    受付時間・定休日
                  </th>
                  <td className="py-3.5 px-4 text-zinc-800 leading-relaxed">
                    24時間・365日受付中<br />
                    <span className="text-[11px] text-zinc-500">
                      ※店舗の営業は信太山新地エリア一斉定休日（毎月20日）に休業となりますが、LINE相談や事前見学・面談予約は年中無休で受付しております。
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="py-3.5 px-4 text-left font-bold text-zinc-700 align-top">
                    応募資格・採用基準
                  </th>
                  <td className="py-3.5 px-4 text-zinc-800 leading-relaxed">
                    <p className="font-bold text-zinc-900">満20歳以上の日本国籍を有する女性（20代〜40代まで幅広く歓迎）</p>
                    <p className="text-[11px] text-zinc-600 mt-1">
                      ※信太山新地旅館組合規約および法令コンプライアンス遵守のため、18歳・19歳を含む20歳未満は一切就業できません。<br />
                      ※年齢・身元確認のため、面接時に顔写真付き公的身分証明書（運転免許証・マイナンバーカード・パスポート等）の原本確認を行っております（住民票は必須ではありません）。手ぶらでお気軽にお越しいただけます。
                    </p>
                  </td>
                </tr>
                <tr className="bg-zinc-50/70">
                  <th className="py-3.5 px-4 text-left font-bold text-zinc-700 align-top">
                    給与規定・日払い
                  </th>
                  <td className="py-3.5 px-4 text-zinc-800 leading-relaxed">
                    <p className="font-bold text-rose-600">
                      15分3,800円 / 30分7,600円 / 45分11,400円 / 60分15,200円
                    </p>
                    <p className="text-[11px] text-zinc-600 mt-1">
                      時給1万円保証、待機時間に応じた日給保証（例：12時間待機で8〜10万円保証）完備。<br />
                      全額即日現金手渡し支給。衣装代・雑費・厚生費・講習費などの名目の天引きは一切ありません（天引き0円）。
                    </p>
                  </td>
                </tr>
                <tr className="bg-zinc-50/70">
                  <th className="py-3.5 px-4 text-left font-bold text-zinc-700 align-top">
                    最終更新・確認日
                  </th>
                  <td className="py-3.5 px-4 text-zinc-800 leading-relaxed">
                    <span className="font-bold text-rose-600">{lastUpdated}</span>
                    <span className="text-[11px] text-zinc-500 ml-2">（最新就労規程・募集単価確認済み）</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. 運営責任者からのメッセージ */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs mb-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <LucideIcon name="HeartHandshake" size={20} />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                運営責任者からのご挨拶
              </h2>
              <p className="text-xs text-zinc-500">
                働く女性の不安をゼロにする直営店のサポート体制
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 女性サポート あおい */}
            <div className="p-5 bg-gradient-to-br from-rose-50/60 to-pink-50/40 rounded-2xl border border-rose-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-rose-200/70 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                    🌸
                  </div>
                  <div>
                    <div className="text-[11px] text-rose-600 font-bold">女性相談・就労サポート責任者</div>
                    <div className="text-base font-black text-zinc-900">あおい（元キャスト歴8年）</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  「夜のお仕事が初めての方や、これまでの人間関係・お店選びで嫌な思いをされた方へ。
                  当グループは、街頭スカウトや紹介会社ではなく、信太山新地の現場旅館が直接運営する公式窓口です。
                  信太山新地最大の特長は【店先での顔見せが一切ない】こと。通りに座らされることなく個室でリラックスして過ごせます。
                  面接から体験入店、初日の接客まで同じ女性スタッフが付き添いますので、どんな些細なことでも気軽にご相談くださいね。」
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-200/50 text-[11px] text-rose-700 font-bold flex items-center gap-1">
                <LucideIcon name="CheckCircle2" size={13} />
                <span>女性スタッフが24時間LINEで親身に対応いたします</span>
              </div>
            </div>

            {/* 採用マネージャー 松本 */}
            <div className="p-5 bg-gradient-to-br from-zinc-50 to-slate-50/60 rounded-2xl border border-zinc-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                    👨‍💼
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-500 font-bold">採用・労務マネージャー</div>
                    <div className="text-base font-black text-zinc-900">松本 健二（法務・労務担当）</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  「当グループは昭和期より信太山新地で旅館を経営し、信太山新地旅館組合の厳格なコンプライアンス規約のもとで健全な労務管理を徹底してまいりました。
                  給与の不当な天引きや中抜きマージン、出勤強要・罰金・ノルマは1円たりとも存在しません。
                  また、仲居が玄関・受付でお客様を事前確認するため、泥酔者やマナーの悪い客は入店前にお断りしています。
                  あなたが安全に、心置きなく高収入を得られる環境をお約束します。」
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200 text-[11px] text-zinc-600 font-bold flex items-center gap-1">
                <LucideIcon name="ShieldCheck" size={13} className="text-emerald-600" />
                <span>信太山新地旅館組合加盟・法令コンプライアンス徹底遵守</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. コンプライアンス就労安全憲章（5つの約束） */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs mb-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <LucideIcon name="Shield" size={20} />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                コンプライアンス＆就労安全憲章（5つの約束）
              </h2>
              <p className="text-xs text-zinc-500">
                直営店だからこそ実現できる絶対的な安全基準
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-zinc-50/60 rounded-2xl border border-zinc-200/70 flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1">
                  店先での顔見せ（顔出し・通り座り）一切なし
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  衣装を着て通りに面した店先に座る必要は一切ありません。お仕事が入るまで冷暖房完備の快適な個室や専用スタンドで過ごせます。
                  WebサイトやSNSへの写真掲載も行わず、完全源氏名での勤務を徹底。身バレ・顔バレのリスクを完全シャットアウトします。
                </p>
              </div>
            </div>

            <div className="p-4 bg-zinc-50/60 rounded-2xl border border-zinc-200/70 flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1">
                  即日全額現金日払い手渡し＆天引き0円の徹底
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  15分3,800円〜の高水準バックを基本とし、稼いだ報酬はその日の営業終了後に全額現金で手渡しします。
                  外部スカウトへの紹介料・中抜きマージン、衣装代・光熱費・雑費・ペナルティ等の引かれ物は一切ありません。
                </p>
              </div>
            </div>

            <div className="p-4 bg-zinc-50/60 rounded-2xl border border-zinc-200/70 flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1">
                  客層スクリーニングと女性最優先の防犯警備体制
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  玄関・受付でお客様をお迎えするのはベテランの仲居さんです。泥酔者、態度が横柄な方、マナー不良者は入店前にお断りします。
                  お部屋には非常用ブザーを完備し、仲居やスタッフが常駐。万が一の際も即座に退店させる鉄壁のセキュリティを敷いています。
                </p>
              </div>
            </div>

            <div className="p-4 bg-zinc-50/60 rounded-2xl border border-zinc-200/70 flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1">
                  出勤強要・催促連絡の完全禁止＆毎月20日一斉定休日
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  週1日、月数回、短時間、週末のみなど、ご自身のプライベートや本業に合わせた自由出勤制です。
                  休日の出勤催促LINEやノルマは一切なし。毎月20日のエリア一斉休業日により、気兼ねなく心身をリフレッシュできます。
                </p>
              </div>
            </div>

            <div className="p-4 bg-zinc-50/60 rounded-2xl border border-zinc-200/70 flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                5
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-1">
                  20歳未満の就労完全禁止と厳格な身元確認
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  法令および信太山新地旅館組合規約に基づき、20歳未満（18歳・19歳を含む）の就労を厳格に禁止しています。
                  公的身分証明書原本による厳正な本人確認・年齢確認を行うことで、違法就労やトラブルを未然に排除し、健全な環境を保持しています。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. 個人情報保護方針（プライバシーポリシー） */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <LucideIcon name="Lock" size={20} />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                個人情報保護方針（プライバシーポリシー）
              </h2>
              <p className="text-xs text-zinc-500">
                ご応募・お問い合わせ情報の安全管理規程
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-zinc-600 space-y-3 leading-relaxed bg-zinc-50/70 p-5 rounded-2xl border border-zinc-200/60">
            <p>
              <strong>1. 個人情報の利用目的：</strong><br />
              応募者および在籍者から提供された個人情報（氏名、生年月日、連絡先、身分証コピー等）は、求人選考、労務管理、安全確認、緊急時の連絡以外の目的で使用することはありません。
            </p>
            <p>
              <strong>2. 第三者提供の完全禁止：</strong><br />
              法令に基づく公的機関からの開示要請がある場合を除き、事前の本人の同意なく個人情報を外部の第三者（スカウト業者、外部紹介所、提携外組織）へ提供・開示・売却することは一切ありません。
            </p>
            <p>
              <strong>3. 身バレ防止と安全管理：</strong><br />
              業務上はすべて「お仕事用のお名前（源氏名）」にて管理され、本名や個人を特定できる情報が他者やお客様に開示されることはありません。また、退職時・不採用時には所定のセキュリティ規程に基づき情報を速やかに抹消いたします。
            </p>
            <p>
              <strong>4. アリバイ・在籍確認支援：</strong><br />
              賃貸契約やクレジットカード申請等の際、ご本人のプライバシーを守るための正規のアリバイ対策・勤務在籍証明の相談にも法令遵守の範囲で柔軟に対応いたします。
            </p>
          </div>
        </div>

        {/* 5. アクセス＆通勤・出稼ぎサポート */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <LucideIcon name="MapPin" size={20} />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900">
                アクセス＆通勤・出稼ぎサポート
              </h2>
              <p className="text-xs text-zinc-500">
                通いやすさと全国からの快適なアクセス環境
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/60">
              <div className="font-bold text-zinc-900 mb-1 flex items-center gap-1.5">
                <LucideIcon name="Train" size={16} className="text-rose-600" />
                <span>電車アクセス</span>
              </div>
              <ul className="text-zinc-600 space-y-1 text-xs">
                <li>・JR阪和線「信太山駅」より徒歩約5分</li>
                <li>・JR「天王寺駅」より快速で約20分</li>
                <li>・Osaka Metro「なんば駅」より電車で約35分</li>
                <li>・JR「大阪駅（梅田）」より電車で約40分</li>
                <li>※信太山駅や周辺主要駅からの無料送迎も随時対応</li>
              </ul>
            </div>

            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/60">
              <div className="font-bold text-zinc-900 mb-1 flex items-center gap-1.5">
                <LucideIcon name="Car" size={16} className="text-rose-600" />
                <span>マイカー・バイク通勤</span>
              </div>
              <ul className="text-zinc-600 space-y-1 text-xs">
                <li>・グループ専用の無料駐車場を完備（車・バイクOK）</li>
                <li>・ガソリン代・高速代の交通費支給規定あり</li>
                <li>・人目に触れずに直接入館・退館できる安心ルート</li>
                <li>・終電を気にせず自分のペースで通勤可能</li>
              </ul>
            </div>

            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/60">
              <div className="font-bold text-zinc-900 mb-1 flex items-center gap-1.5">
                <LucideIcon name="Home" size={16} className="text-rose-600" />
                <span>個室マンション寮（即入居可）</span>
              </div>
              <ul className="text-zinc-600 space-y-1 text-xs">
                <li>・家具家電付き（エアコン・TV・冷蔵庫・洗濯機等）</li>
                <li>・出稼ぎキャストは格安（1日0〜2,000円）で即入居可能</li>
                <li>・敷金・礼金・初期費用0円・手ぶらで上京・入居OK</li>
              </ul>
            </div>

            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/60">
              <div className="font-bold text-zinc-900 mb-1 flex items-center gap-1.5">
                <LucideIcon name="Plane" size={16} className="text-rose-600" />
                <span>全国往復交通費支給</span>
              </div>
              <ul className="text-zinc-600 space-y-1 text-xs">
                <li>・新幹線・飛行機・高速バス等の往復交通費を全額支給</li>
                <li>・関西空港・新大阪駅等へのお迎えサービスあり</li>
                <li>・領収書原本をご持参いただければ初日に即日精算</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 rounded-3xl p-6 sm:p-10 text-white text-center shadow-lg">
          <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-xs text-white text-xs font-bold px-3.5 py-1 rounded-full mb-3">
            <LucideIcon name="Sparkles" size={13} />
            <span>見学・面談は私服手ぶらで大歓迎</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 font-display">
            信太山新地の当店へ応募！まずは女性スタッフに気軽に相談してみませんか？
          </h3>
          <p className="text-xs sm:text-sm text-rose-100 mb-6 max-w-xl mx-auto leading-relaxed">
            「話だけ聞いてみたい」「旅館や個室の待機部屋を見てみたい」という方も大歓迎です。
            履歴書不要・無理な勧誘は一切ありません。信太山新地の当店専任スタッフが24時間公式LINEで親身にお応えします。
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <button
              onClick={onCtaclick}
              className="w-full sm:w-auto bg-white text-rose-600 hover:bg-rose-50 font-bold px-7 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <LucideIcon name="MessageCircle" size={18} />
              <span>信太山新地の当店へLINEで無料相談・見学予約</span>
            </button>
            <button
              onClick={onNavigateBlog}
              className="w-full sm:w-auto bg-rose-700/70 hover:bg-rose-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm border border-rose-400/40"
            >
              <LucideIcon name="BookOpen" size={16} />
              <span>お仕事コラム一覧を見る</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
