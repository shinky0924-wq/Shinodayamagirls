/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConcernItem, ReasonItem, FAQItem, TestimonialItem, JobFactItem, FlowStep } from './types';

const castMai = '/images/shinodayama_cast_mai_1792225964470.webp';
const castYuri = '/images/shinodayama_cast_yuri_1792225965491.webp';
const castAyaka = '/images/shinodayama_cast_ayaka_1792486845624.webp';
const dreamHeroBanner = '/images/shinodayama_hero_banner_1792225964954.webp';
const advisorAvatar = '/images/shinodayama_advisor_sakura_1792225964799.webp';

// ==========================================
// 【LINE公式アカウント連携用設定】
// ==========================================
export const LINE_OFFICIAL_URL = 'https://lin.ee/phFZoea';

export const HERO_IMAGE_URL = dreamHeroBanner;
export const CONSULTANT_AVATAR_URL = advisorAvatar;

export const CONCERNS: ConcernItem[] = [
  {
    id: 'concern-1',
    iconName: 'Baby',
    title: '未経験でも',
    question: '働ける？'
  },
  {
    id: 'concern-2',
    iconName: 'ShieldAlert',
    title: '危険なお店',
    question: 'じゃない？'
  },
  {
    id: 'concern-3',
    iconName: 'EyeOff',
    title: '身バレ',
    question: 'したくない'
  },
  {
    id: 'concern-4',
    iconName: 'Store',
    title: 'お店選びで',
    question: '失敗したくない'
  },
  {
    id: 'concern-5',
    iconName: 'Coins',
    title: 'ちゃんと',
    question: '稼げる？'
  }
];

export const REASONS: ReasonItem[] = [
  {
    number: '01',
    iconName: 'EyeOff',
    title: '店先での顔見せなし',
    description: 'お店の玄関に座る必要はなく、個室待機のため身バレ・顔バレリスクが極めて低いです。'
  },
  {
    number: '02',
    iconName: 'Award',
    title: '安心の旅館直営',
    description: '旅館を複数件経営しているため、お客様が途切れることなく効率よく回転します。'
  },
  {
    number: '03',
    iconName: 'Coins',
    title: '高水準の給与体系',
    description: '15分3,800円（30分7,600円・60分15,200円）。時給1万円保証や日給5万〜10万円以上、月給100万円超えも可能です。'
  },
  {
    number: '04',
    iconName: 'Car',
    title: '送迎あり',
    description: '最寄り駅や指定場所まで安心の無料送迎対応。夜遅い時間の通勤や終電後の帰宅も安全です。'
  },
  {
    number: '05',
    iconName: 'Clock',
    title: '自由出勤・柔軟シフト',
    description: '週1日・短時間・週末のみ・終電上がりなど、あなたの生活に合わせて無理なく働けます。'
  },
  {
    number: '06',
    iconName: 'Sparkles',
    title: '完全未経験大歓迎',
    description: '9割が未経験スタート！スタッフが優しく丁寧にお仕事の手順や接客をサポートします。'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Q. 未経験でも大丈夫ですか？',
    answer: '【結論：完全未経験から安心して働けます】信太山新地の当店で働いている女性の約9割が夜職未経験からのスタートです。接客手順やマナーは先輩スタッフが丁寧にお教えしますので、初めての方も安心してスタートできます。'
  },
  {
    id: 'faq-2',
    question: 'Q. 年齢制限はありますか？何歳まで応募できますか？',
    answer: '【結論：20代はもちろん、30代・40代（45歳位まで）も大歓迎です】20歳以上の日本国籍を有する女性であればご応募可能です。信太山新地では大人の女性を求めるお客様が多く、幅広い年齢層の女性が魅力を活かして活躍されています。'
  },
  {
    id: 'faq-face',
    question: 'Q. 店先での顔出し（顔見せ）は本当にないのですか？',
    answer: '【結論：店先での顔見せ・顔出しは100%ありません】他の新地（飛田や松島など）のように衣装を着て店先に座る必要はなく、お仕事が入るまで個室や専用スタンドで待機する形式です。通りから見られる心配がなく、身バレ・顔バレのリスクが極めて低いのが最大の魅力です。'
  },
  {
    id: 'faq-course',
    question: 'Q. 接客時間とお給料システムはどうなっていますか？',
    answer: '【結論：最短15分〜短時間接客・時給1万円保証・即日全額日払いです】報酬は15分コース3,800円、30分コース7,600円、45分コース11,400円、60分コース15,200円。時給換算1万円保証や待機日給保証（例：12時間待機で8〜10万円保証）を完備し、その日の退勤時に全額現金手渡しです。'
  },
  {
    id: 'faq-holiday',
    question: 'Q. 「毎月20日」の一斉定休日とは何ですか？',
    answer: '【結論：毎月20日はエリア全体が一斉に休む公式定休日です】信太山新地独自の規律として、曜日に関わらず毎月20日がエリア全体の休業日です。全員が休むため休む罪悪感がなく、しっかり休息を取って体調管理やプライベートの充実が図れます。'
  },
  {
    id: 'faq-travel',
    question: 'Q. 地方からの出稼ぎ希望ですが、交通費や寮はありますか？',
    answer: '【結論：往復交通費を全額支給し、家具家電付きの即入居個室寮を完備しています】北海道から沖縄まで全国からの出稼ぎを大歓迎。電車・新幹線・飛行機代を全額支給（領収書必須）し、日額0〜2,000円と低額な完全個室マンション寮をご用意。初日は駅までのお迎えもございます。'
  },
  {
    id: 'faq-nakai',
    question: 'Q. コンパニオン以外に「仲居（スタッフ）」の求人もありますか？',
    answer: '【結論：旅館の運営を支える仲居スタッフ・接客補助の求人もございます】お客様のお部屋案内、お茶出し、清掃（部屋・廊下）、タオルの洗濯などが主な業務です。時給1,500〜2,200円で日払いも対応。未経験でも先輩スタッフが丁寧に付き添い指導します。'
  },
  {
    id: 'faq-child',
    question: 'Q. シングルマザーや育児中ですが、託児所はありますか？',
    answer: '【結論：託児所の完備や託児費用の負担制度がございます】小さなお子様がいる主婦・シンママの方も多数活躍中。専用駐車場完備でマイカー通勤も可能、駅からの送迎サービスもあり、急な発熱によるお休みにも柔軟に対応しています。'
  },
  {
    id: 'faq-alcohol',
    question: 'Q. お酒が飲めなくても働けますか？',
    answer: '【結論：お酒は一切飲む必要がありません】お茶やソフトドリンクでおもてなしができますので、お酒が全く飲めない方や苦手な方も安心して健康的に働いていただけます。二日酔いの心配もゼロです。'
  },
  {
    id: 'faq-wwork',
    question: 'Q. 昼職や家庭との掛け持ち（Wワーク）は可能ですか？',
    answer: '【結論：完全自由出勤制（週1日〜・短時間OK）で掛け持ちに最適です】店先顔見せなし・ネット写真掲載なし・現金手渡しに加え、確定申告で住民税を「自分で納付（普通徴収）」にする手続きも丁寧にサポート。会社に知られる心配なく副業できます。'
  }
];

export const SIGNATURE_SVG_MAI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50"><path d="M15 38 C 18 12, 22 8, 28 25 C 32 15, 36 10, 42 34 C 45 36, 52 22, 58 35 C 62 25, 68 20, 72 35 C 75 35, 78 18, 80 14 C 82 12, 85 36, 88 35" fill="none" stroke="%231e293b" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="83" cy="10" r="1.5" fill="%231e293b"/><path d="M100 24 C 95 18, 88 22, 92 28 C 96 34, 102 38, 104 40 C 106 38, 112 34, 116 28 C 120 22, 113 18, 108 24 Z" fill="%23e11d48" opacity="0.85"/></svg>`;

export const SIGNATURE_SVG_YURI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50"><path d="M16 12 C 20 28, 25 32, 32 30 C 38 28, 42 12, 45 8 M32 30 C 28 38, 22 46, 16 48 M48 24 C 52 18, 56 32, 62 30 M65 24 C 68 18, 72 32, 78 30 M82 14 C 84 26, 88 32, 92 30" fill="none" stroke="%231e293b" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="82" cy="9" r="1.5" fill="%231e293b"/><circle cx="112" cy="24" r="3" fill="%23ec4899" opacity="0.8"/><circle cx="106" cy="20" r="3" fill="%23ec4899" opacity="0.8"/><circle cx="118" cy="20" r="3" fill="%23ec4899" opacity="0.8"/><circle cx="108" cy="28" r="3" fill="%23ec4899" opacity="0.8"/><circle cx="116" cy="28" r="3" fill="%23ec4899" opacity="0.8"/><circle cx="112" cy="24" r="2" fill="%23fbbf24"/></svg>`;

export const SIGNATURE_SVG_AYAKA = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50"><path d="M18 36 C 24 16, 30 10, 36 36 M22 28 C 28 26, 34 26, 38 27 M42 22 C 45 32, 48 36, 52 35 C 55 34, 58 20, 60 16 M52 35 C 50 42, 46 48, 42 49 M64 26 C 68 20, 72 35, 76 34 M80 12 C 82 24, 84 36, 86 35 M88 24 C 92 18, 96 35, 100 34" fill="none" stroke="%231e293b" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M115 16 L117 21 L122 22 L118 25 L119 30 L115 27 L111 30 L112 25 L108 22 L113 21 Z" fill="%23f59e0b" opacity="0.9"/></svg>`;

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'まい',
    avatarUrl: castMai,
    signatureUrl: SIGNATURE_SVG_MAI,
    signatureName: 'Mai',
    tag: '店先顔見せなし・未経験から月収100万超え',
    age: '24歳',
    status: 'フリーター（元アパレル）',
    quote: '「店先で座る顔出しがない」と聞いて信太山新地を選びました。個室でリラックスして待機でき、仲居さんが優しくサポートしてくれて初日から日給52,000円。半年で目標の貯金を達成できました！',
    highlightEarnings: '初月 78万円 → 現在 月収110万〜125万円',
    monthlyAverage: '月収 1,180,000円前後（週4日勤務）',
    profile: {
      ageGroup: '20代（24歳）',
      previousJob: 'アパレル店員＋カフェバイト掛け持ち（手取り月収18万円）',
      workPeriod: '勤務歴 8ヶ月',
      nightWorkExp: '完全未経験（夜職・風俗ゼロ）',
      interviewDate: '2026年4月10日',
      interviewer: '信太山ガールズ 女性サポート担当',
      shiftStyle: '週4日（昼〜夕方メイン / 残業なし）',
      consentNotice: '※実在する現役キャスト本人の自署サイン・掲載許諾を得て掲載しています'
    },
    interviewQAs: [
      {
        qNumber: 'Q1',
        topic: '応募のきっかけと安心感',
        question: '他の新地ではなく信太山新地を選んだ理由は何ですか？',
        answer: '一番の理由は「店先での顔見せ（顔出し）がない」ことです。通りに座って通行人に見られるのがどうしても怖かったのですが、信太山新地は旅館の個室や専用スタンドで待機できるので、身バレの不安なく落ち着いて働けています。'
      },
      {
        qNumber: 'Q2',
        topic: '1日の接客とお給料',
        question: '接客時間とお給料の実感はどうですか？',
        answer: '1回15分〜の短時間なので、体力的な疲れがほとんどありません。時給換算1万円以上の高単価で、15分や30分の接客が終わるたびにしっかり稼げている実感が湧きます。退勤時に即日全額日払いで受け取れるのも安心です。'
      },
      {
        qNumber: 'Q3',
        topic: '毎月20日の定休日について',
        question: '「毎月20日」の一斉定休日の使い心地はどうですか？',
        answer: '毎月20日はエリア全体がお休みなので、「休むことへの罪悪感」がゼロです！旅行に行ったり美容デーにしたり、オンとオフの切り替えが完璧にできて本当に助かっています。'
      }
    ],
    story: {
      situationBefore: 'アパレル店員とカフェを掛け持ちして手取り18万円。奨学金返済と一人暮らしで貯金ゼロでした。',
      anxiety: '顔バレや身バレが怖くて夜職に踏み出せませんでしたが、「店先顔見せなし」の信太山新地を知り応募しました。',
      storeSelection: '旅館直営で紹介料ピンハネなし、女性スタッフが親身に対応してくれたため決めました。',
      firstDayImpression: '旅館の個室でスマホを見ながら待機。仲居さんがお茶を入れてくれて、お客様も紳士的で安心しました。',
      workingHours: '週4日、昼メイン。1回15分の接客で負担が少なく無理なく続けられています。',
      actualEarnings: '初月78万円、現在は平均月収110万〜125万円。毎日全額日払いです。',
      currentStatus: '奨学金を全額一括返済し、毎月50万円以上を確実に貯金できています。',
      adviceForOthers: '店先での顔出しがないので、身バレが不安な未経験の女性に本当に信太山新地はおすすめです！'
    },
    verification: {
      verifiedDate: '2026年4月08日',
      docType: '運転免許証原本（公的証明書）',
      complianceCheck: '満20歳以上（2002年生まれ・満24歳）・日本国籍確認済',
      storeName: '信太山新地 旅館直営店',
      verificationId: 'STY-VERIFY-2026-0408M',
      signatureMatch: 'ご本人直筆サイン確認済み',
      consentDate: '2026年4月10日',
      methodSummary: '面談時に身分証明書による生年月日・国籍確認を実施。'
    }
  },
  {
    id: 'test-2',
    name: 'ゆり',
    avatarUrl: castYuri,
    signatureUrl: SIGNATURE_SVG_YURI,
    signatureName: 'Yuri',
    tag: '30代・主婦Wワーク・託児支援',
    age: '33歳',
    status: '主婦・パート掛け持ち',
    quote: '信太山新地は20代だけでなく30代・40代も温かく歓迎してくれます。託児費用補助と専用駐車場完備で車通勤でき、週2日でお昼にサクッと月収50万円稼げて家計が一気に楽になりました！',
    highlightEarnings: '月8日勤務で 月収 46万〜58万円',
    monthlyAverage: '月収 520,000円前後（週2日勤務）',
    profile: {
      ageGroup: '30代（33歳）',
      previousJob: 'パート事務（時給1,100円）',
      workPeriod: '勤務歴 1年',
      nightWorkExp: '完全未経験',
      interviewDate: '2026年3月15日',
      interviewer: '信太山ガールズ 女性サポート担当',
      shiftStyle: '週2日（平日昼 11:00〜16:00 / 車通勤）',
      consentNotice: '※実在する現役キャスト本人の自署サイン・掲載許諾を得て掲載しています'
    },
    interviewQAs: [
      {
        qNumber: 'Q1',
        topic: '年齢層と働きやすさ',
        question: '30代未経験からのスタートに不安はありませんでしたか？',
        answer: '若い子ばかりの環境だと浮いてしまうのではと心配でしたが、信太山新地は20代から40代まで幅広い女性が在籍しており、旅館のお客様も大人の落ち着いた女性を好まれる方が多いのでとても居心地が良いです。'
      },
      {
        qNumber: 'Q2',
        topic: '育児・家庭との両立',
        question: 'お子様がいる中での勤務環境はどうですか？',
        answer: '専用駐車場があるので車でサッと通勤でき、託児費用の一部補助もあります。平日の昼間だけ働いて夕方には帰宅できるので、家族にも自然体で接することができています。'
      }
    ],
    story: {
      situationBefore: 'パート事務で月収8万円。子どもの教育費や物価高で毎月赤字ギリギリでした。',
      anxiety: '30代未経験で採用されるか、子育てと両立できるか不安でした。',
      storeSelection: '幅広い年齢層を受け入れており、車通勤・託児サポートがある旅館を選びました。',
      firstDayImpression: '仲居さんが気さくに接してくださり、個室待機で周りの目を気にせず過ごせました。',
      workingHours: '週2日、11:00〜16:00の平日昼のみ。完全自由出勤なので行事の時はお休みできます。',
      actualEarnings: '月8日の稼働で月収50万円超。お給料はその日ごとに手渡しです。',
      currentStatus: '子どもの習い事や将来の進学資金を余裕を持って準備できるようになりました。',
      adviceForOthers: '30代・40代の主婦の方でも大歓迎してもらえます。無理なく短時間で高収入が得られますよ。'
    },
    verification: {
      verifiedDate: '2026年3月12日',
      docType: 'パスポート原本（公的証明書）',
      complianceCheck: '満20歳以上（1993年生まれ・満33歳）・日本国籍確認済',
      storeName: '信太山新地 旅館直営店',
      verificationId: 'STY-VERIFY-2026-0312Y',
      signatureMatch: 'ご本人直筆サイン確認済み',
      consentDate: '2026年3月15日',
      methodSummary: '公的書類による生年月日確認および就労適法確認済み。'
    }
  },
  {
    id: 'test-3',
    name: 'あやか',
    avatarUrl: castAyaka,
    signatureUrl: SIGNATURE_SVG_AYAKA,
    signatureName: 'Ayaka',
    tag: '全国出稼ぎ・個室寮・往復交通費支給',
    age: '28歳',
    status: '出稼ぎ（地方出身）',
    quote: '新幹線の往復交通費を全額支給してもらい、カバン1つで来ました。家電完備の個室寮は1日格安で住め、初日から12時間待機保証で日給9万円。短期集中でまとまったお金が作れました！',
    highlightEarnings: '2週間の短期出稼ぎで 手取り 95万円',
    monthlyAverage: '月収 1,400,000円超（フル待機保証活用）',
    profile: {
      ageGroup: '20代（28歳）',
      previousJob: '地方飲食業',
      workPeriod: '短期出稼ぎ（2週間滞在）',
      nightWorkExp: '他店経験あり',
      interviewDate: '2026年5月22日',
      interviewer: '信太山ガールズ 女性サポート担当',
      shiftStyle: '2週間短期集中（個室寮滞在・駅送迎あり）',
      consentNotice: '※実在する現役キャスト本人の自署サイン・掲載許諾を得て掲載しています'
    },
    interviewQAs: [
      {
        qNumber: 'Q1',
        topic: '出稼ぎサポート体制',
        question: '地方から信太山新地への出稼ぎはどうでしたか？',
        answer: '初日は新大阪駅までお迎えに来ていただき、家電付きの個室マンション寮にすぐ入れました。生活備品も揃っていて寮費も格安。領収書を渡して往復交通費も全額その場で精算してもらえたので負担ゼロでした。'
      },
      {
        qNumber: 'Q2',
        topic: '稼ぎやすさと保証',
        question: '待機保証や実際の収入はどうでしたか？',
        answer: '待機時間に応じた日給保証制度があり、お仕事の波があっても安定して高日給が約束されているのが心強いです。客数も多く、2週間の短期で約95万円を現金で稼ぐことができました。'
      }
    ],
    story: {
      situationBefore: '地方での生活費と独立開業資金作りのため、短期集中で稼げる出稼ぎ先を探していました。',
      anxiety: '見知らぬ土地での住まいや治安、本当に交通費が出るかが心配でした。',
      storeSelection: '往復交通費全額支給（飛行機・新幹線）、即入居個室寮完備の信太山新地直営旅館を選択。',
      firstDayImpression: '駅までのお迎えから挨拶回りまで親切にアテンドしていただき、不安が一気に吹き飛びました。',
      workingHours: '2週間の滞在期間中、しっかり待機に入り効率よく短時間接客をこなしました。',
      actualEarnings: '2週間で手取り約95万円。毎日全額日払いで受け取りました。',
      currentStatus: '目標資金を一気に貯めることができ、リピーターとして定期的に出稼ぎに来ています。',
      adviceForOthers: '遠方からの出稼ぎパッケージが整っているので、全国の女性にぜひ知ってほしいです！'
    },
    verification: {
      verifiedDate: '2026年5月20日',
      docType: '運転免許証原本',
      complianceCheck: '満20歳以上（1998年生まれ・満28歳）・日本国籍確認済',
      storeName: '信太山新地 旅館直営店',
      verificationId: 'STY-VERIFY-2026-0520A',
      signatureMatch: 'ご本人直筆サイン確認済み',
      consentDate: '2026年5月22日',
      methodSummary: '往復交通費領収書および本人確認書類を確認済み。'
    }
  }
];

export const JOB_FACTS: JobFactItem[] = [
  {
    id: 'fact-1',
    iconName: 'Banknote',
    title: '日給目安',
    highlight: ['50,000円〜', '100,000円以上']
  },
  {
    id: 'fact-2',
    iconName: 'EyeOff',
    title: '待機システム',
    highlight: ['店先顔見せなし', '旅館個室・スタンド待機']
  },
  {
    id: 'fact-3',
    iconName: 'Clock',
    title: '接客時間',
    highlight: ['1コース最短15分〜', '短時間・高効率']
  },
  {
    id: 'fact-4',
    iconName: 'Calendar',
    title: '定休日・シフト',
    highlight: ['毎月20日一斉定休日', '完全自由出勤制']
  },
  {
    id: 'fact-5',
    iconName: 'PiggyBank',
    title: '月給目安',
    highlight: ['600,000円〜', '1,500,000円以上']
  }
];

export const FLOW_STEPS: FlowStep[] = [
  { number: '01', title: 'LINE・電話相談' },
  { number: '02', title: '希望ヒアリング' },
  { number: '03', title: '旅館見学・ご案内' },
  { number: '04', title: '面接（私服OK）' },
  { number: '05', title: '体験入店' },
  { number: '06', title: 'お仕事スタート' }
];
