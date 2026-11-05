/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import rawFaqs from '../data/faq100Categorized.json';

export type FAQ8Category =
  | 'all'
  | 'beginner'
  | 'recruit'
  | 'leaving'
  | 'salary'
  | 'wwork'
  | 'hours'
  | 'privacy'
  | 'dorm';

export interface FAQ100Item {
  id: string;
  category: string;
  categoryLabel: string;
  question: string;
  answer: string;
  isPopular?: boolean;
  keywords?: string[];
  eightCategory: string;
  eightCategoryLabel: string;
  searchIntentCategory?: string;
}

export interface FAQCategoryDef {
  id: string;
  slug?: string;
  label: string;
  shortLabel?: string;
  icon: string;
  description: string;
}

export type SearchIntentCategoryKey = 'beginner' | 'salary' | 'privacy' | 'workstyle';

export interface SearchIntentCategoryDef {
  key: SearchIntentCategoryKey;
  label: string;
  subLabel: string;
  icon: string;
  colorClass: string;
}

export interface HighIntentFAQItem {
  id: string;
  searchIntentCategory: SearchIntentCategoryKey;
  searchIntentCategoryLabel: string;
  searchQuery: string;
  question: string;
  directConclusion: string;
  answer: string;
  badge?: string;
  highlightLabel?: string;
  keyTakeaways: string[];
}

export const FAQ_8_CATEGORIES: FAQCategoryDef[] = [
  {
    id: 'all',
    slug: 'all',
    label: 'すべて',
    shortLabel: 'すべて',
    icon: 'Layers',
    description: '全119問の質問をすべて表示します'
  },
  {
    id: 'beginner',
    slug: 'beginner',
    label: '未経験・不安解消',
    shortLabel: '未経験',
    icon: 'Sparkles',
    description: '在籍9割が初心者。店先顔見せなし・接客手順・安心の就労環境'
  },
  {
    id: 'recruit',
    slug: 'recruit',
    label: '面接・採用基準',
    shortLabel: '面接・採用',
    icon: 'Calendar',
    description: '20歳以上限定・40代歓迎・私服OK・必要書類・即日体入'
  },
  {
    id: 'salary',
    slug: 'salary',
    label: '給料・日払い',
    shortLabel: '給料・日払',
    icon: 'Coins',
    description: '15分3,800円・時給1万保証・日給5万〜10万全額即日日払い'
  },
  {
    id: 'privacy',
    slug: 'privacy',
    label: '身バレ・安全対策',
    shortLabel: '身バレ対策',
    icon: 'EyeOff',
    description: '店先顔見せ一切なし・旅館個室待機・写真ネット掲載ゼロ・確定申告普通徴収'
  },
  {
    id: 'hours',
    slug: 'hours',
    label: 'シフト・毎月20日定休',
    shortLabel: 'シフト定休',
    icon: 'Clock',
    description: '完全自由出勤制・週1日〜・毎月20日エリア一斉定休日で確実リセット'
  },
  {
    id: 'wwork',
    slug: 'wwork',
    label: 'Wワーク・副業',
    shortLabel: 'Wワーク',
    icon: 'Briefcase',
    description: 'OL・主婦・学生歓迎・お酒一切不要・会社バレ防止'
  },
  {
    id: 'dorm',
    slug: 'dorm',
    label: '寮・出稼ぎ・送迎',
    shortLabel: '寮・出稼ぎ',
    icon: 'Home',
    description: '家電付き完全個室寮・往復交通費全額支給・託児所・駐車場完備'
  },
  {
    id: 'leaving',
    slug: 'leaving',
    label: '退職・ルール・安心',
    shortLabel: '退職安心',
    icon: 'ShieldCheck',
    description: '違約金0円・即日円満退店可能・ノルマ罰金一切なし'
  }
];

export const SEARCH_INTENT_CATEGORIES: SearchIntentCategoryDef[] = [
  {
    key: 'beginner',
    label: '未経験・不安',
    subLabel: '夜職ゼロ・初心者向け',
    icon: 'Sparkles',
    colorClass: 'bg-rose-100 text-rose-800 border-rose-200'
  },
  {
    key: 'salary',
    label: '給料・稼ぎ',
    subLabel: '日給・日払い・手取り',
    icon: 'Coins',
    colorClass: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  {
    key: 'privacy',
    label: '身バレ・顔出し',
    subLabel: '顔見せなし・個室待機',
    icon: 'EyeOff',
    colorClass: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  {
    key: 'workstyle',
    label: '働き方・定休日',
    subLabel: '自由出勤・毎月20日定休',
    icon: 'Clock',
    colorClass: 'bg-sky-100 text-sky-800 border-sky-200'
  }
];

export const FAQ_100_LIST: FAQ100Item[] = (rawFaqs as any[]).map((item, index) => {
  let searchIntentCategory = 'workstyle';
  if (item.eightCategory === 'beginner' || index < 5) {
    searchIntentCategory = 'beginner';
  } else if (item.eightCategory === 'salary' || (index >= 5 && index < 10)) {
    searchIntentCategory = 'salary';
  } else if (item.eightCategory === 'privacy' || (index >= 10 && index < 15)) {
    searchIntentCategory = 'privacy';
  }
  return {
    ...item,
    searchIntentCategory
  };
});

export const HIGH_INTENT_FAQS: HighIntentFAQItem[] = [
  // beginner
  {
    id: 'hi-beg-1',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '未経験向け',
    searchQuery: '未経験でも本当に働けますか？',
    question: '接客や夜職の経験が一切ないのですが、未経験でも本当に採用されますか？',
    directConclusion: '結論：夜職未経験でも全く問題ありません。信太山新地で働く女性の約9割が完全未経験からスタートしています。',
    answer: '信太山新地の在籍女性の約9割が完全未経験からのスタートです！店先での顔見せ（顔出し）がなく、旅館の個室でお仕事が入るまで待機できるため人目を気にする必要がありません。接客手順やサービスの流れは女性スタッフや仲居さんが丁寧にお教えします。',
    badge: '在籍9割未経験',
    highlightLabel: '未経験90%在籍',
    keyTakeaways: ['夜職経験ゼロからスタートする女性が約9割', '店先での顔見せがなく旅館の個室でリラックス待機', '女性スタッフや仲居さんが優しく丁寧指導']
  },
  {
    id: 'hi-beg-2',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '初日手順',
    searchQuery: '初日は何をする？',
    question: '初日はどのような流れでお仕事が始まりますか？',
    directConclusion: '結論：初日は事前面談と丁寧なレクチャーから始まり、無理な即接客はありません。手ぶら・私服で気軽に来店いただけます。',
    answer: '初日はまず女性スタッフとのお顔合わせと面談を行い、旅館の設備や個室待機スペースをご案内します。お仕事の流れや時間配分（最短15分〜短時間接客・絶対ゴム着用ルールなど）を丁寧にレクチャーした上で、ご本人の安心と希望を確認してからのスタートとなります。',
    badge: '安心レクチャー',
    highlightLabel: '丁寧な事前説明',
    keyTakeaways: ['私服・手ぶらで来店OK', 'お仕事と接客手順のわかりやすいレクチャー', '合わなければ体入当日に即終了OK']
  },
  {
    id: 'hi-beg-3',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '飲酒不要',
    searchQuery: 'お酒が飲めなくても平気？',
    question: 'お酒が全く飲めないのですが、問題なく働けますか？',
    directConclusion: '結論：お酒は一切飲む必要がありません。お茶やジュースなどのソフトドリンクでおもてなしが可能です。',
    answer: '信太山新地のおもてなしはお茶やジュースなどのソフトドリンクで行いますので、お酒が全く飲めない方や苦手な方も安心して健康的に働いていただけます。二日酔いや体調不良の心配もありません。',
    badge: 'お酒一切不要',
    highlightLabel: 'ソフトドリンクのみ',
    keyTakeaways: ['お酒を飲む必要は完全ゼロ', '二日酔いや体調不良の心配なし', '翌日の昼職や大学にも影響なし']
  },
  {
    id: 'hi-beg-4',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '年齢層',
    searchQuery: '30代・40代でも大丈夫？',
    question: '20代だけでなく30代や40代でも採用されますか？需要はありますか？',
    directConclusion: '結論：20代はもちろん、30代・40代（45歳位まで）も大歓迎です。落ち着いた大人の女性を求めるお客様が多数いらっしゃいます。',
    answer: '信太山新地では20代はもちろん、30代・40代（45歳位まで）の採用に極めて積極的です。落ち着いた会話や聞き上手な大人の女性を求めるお客様が大変多く、安定して高収入を得られています。',
    badge: '40代前半まで歓迎',
    highlightLabel: '大人の女性需要大',
    keyTakeaways: ['20代から40代（45歳位まで）幅広く積極採用', '紳士的な常連客が多く落ち着いた接客', '主婦やシングルマザーも多数活躍']
  },
  {
    id: 'hi-beg-5',
    searchIntentCategory: 'beginner',
    searchIntentCategoryLabel: '退職自由',
    searchQuery: '辞めたいときはすぐに辞められる？',
    question: 'もし自分に合わなかった場合、すぐに辞められますか？違約金は？',
    directConclusion: '結論：合わなければ体験入店当日でも即日円満に終了できます。違約金・ペナルティは完全0円で、働いた分はその場で全額手渡しです。',
    answer: '体験入店の当日や短期間で合わないと感じた場合、即日円満に終了できます。違約金、ペナルティ、引き止めなどは一切なく、働いた分のお給料はその日のうちに全額手渡しで精算されます。',
    badge: '違約金0円',
    highlightLabel: '即日円満退店OK',
    keyTakeaways: ['退職違約金・ペナルティは完全0円', '無理な引き止めや催促連絡は一切なし', '働いた分はその場で全額手渡し精算']
  },

  // salary
  {
    id: 'hi-sal-1',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '給料相場',
    searchQuery: '日給や時給の目安はどのくらい？',
    question: '1日でどのくらい稼げますか？時給や日給の保証はありますか？',
    directConclusion: '結論：平均日給は5万〜10万円以上です。15分3,800円〜の高額バックに加え、時給1万円保証・日給保証制度があります。',
    answer: '15分コース3,800円（30分7,600円・45分11,400円・60分15,200円）を基本とし、当店（グループ直営店）では時給換算1万円保証や待機時間に応じた日給保証（例：12時間待機で8〜10万円保証）を完備しています。平均日給は5万〜10万円、月給100万円以上を稼ぐ女性が多数在籍しています。',
    badge: '時給1万保証',
    highlightLabel: '日給5万〜10万円超',
    keyTakeaways: ['15分3,800円（30分7,600円・60分15,200円）', '時給換算1万円保証＆日給保証制度完備', '月給100万円以上を達成可能']
  },
  {
    id: 'hi-sal-2',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '即日手渡し',
    searchQuery: '日払いはその日に全額もらえる？',
    question: 'お給料はその日のうちに全額現金でもらえますか？',
    directConclusion: '結論：はい、退勤時にその日の稼ぎ全額を現金手渡しでお支払いします。月末締めや振込待ち時間は一切ありません。',
    answer: '毎日稼働終了後にその日のお給料全額を現金手渡しでお受け取りいただけます。「月末締め」などの待ち時間は一切ありませんので、急な出費やすぐに現金が必要な方も安心です。',
    badge: '即日全額日払い',
    highlightLabel: '現金手渡し100%',
    keyTakeaways: ['退勤時にその日の稼ぎを全額現金手渡し', '振込待ちや月末締めは一切なし', '手元資金がすぐに作れる']
  },
  {
    id: 'hi-sal-3',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '中抜きなし',
    searchQuery: 'スカウトの天引きや中抜きはある？',
    question: '街頭スカウトのような紹介料の天引きや中抜きはありますか？',
    directConclusion: '結論：スカウト業者の中抜きや紹介料の天引きは一切ありません。旅館直営のため、稼いだ金額がそのまま手取りになります。',
    answer: '当窓口は信太山新地の旅館直営公式採用のため、スカウトや外部業者による紹介料の天引きや中抜きは一切ありません。コース料金に応じたお給料がそのまま全額ご自身の手取りとなります。',
    badge: '天引き0円',
    highlightLabel: '旅館直営・中抜きゼロ',
    keyTakeaways: ['スカウト業者によるお給料の中抜きゼロ', '働いた分のお給料がそのまま手元に残る', '店舗現場女性スタッフ直通']
  },
  {
    id: 'hi-sal-4',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '天引きなし',
    searchQuery: '雑費や厚生費は引かれる？',
    question: '厚生費やヘアメイク代などの名目で給与から引かれるものはありますか？',
    directConclusion: '結論：厚生費、雑費、ヘアメイク代、ノルマ罰金などの天引きは一切ありません。明朗会計で引かれ物ゼロです。',
    answer: '一般的なキャバクラや風俗店のような不当な雑費天引き、厚生費、ノルマ未達罰金などは一切ありません。明朗会計でクリアな給与計算をお約束します。',
    badge: '明朗会計',
    highlightLabel: '引かれ物一切なし',
    keyTakeaways: ['厚生費・雑費・衣装代・ヘアメイク代すべて0円', 'ノルマ未達成によるペナルティ罰金なし', '明朗計算で安心']
  },
  {
    id: 'hi-sal-5',
    searchIntentCategory: 'salary',
    searchIntentCategoryLabel: '日給保証',
    searchQuery: '暇な日や雨の日でも稼げる？',
    question: '客足が少ない日でも最低収入の保証はありますか？',
    directConclusion: '結論：雨の日や客足が少ない日でも安心の日給保証制度（例：12時間待機で8〜10万円保証）を完備しています。',
    answer: '待機時間に応じた日給保証制度（フル待機で8〜10万円保証など）を完備している旅館をご案内できます。客足に左右されず確実な収入を確保できます。',
    badge: '日給保証あり',
    highlightLabel: '待機時間に応じた保証',
    keyTakeaways: ['客足に左右されない日給保証制度', '12時間フル待機で8〜10万円保証例あり', '初心者でも初日から収入が計算できる']
  },

  // privacy
  {
    id: 'hi-priv-1',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '顔見せなし',
    searchQuery: '店先での顔出しは本当にない？',
    question: '他の新地のように店先に座る「顔見せ」は本当にないのですか？',
    directConclusion: '結論：店先での顔見せ（顔出し・通りに座る行為）は100%ありません。清潔な旅館の個室で待機するため身バレしません。',
    answer: '信太山新地最大の特長は、他の新地（飛田や松島など）と異なり店先での顔見せ（顔出し・通り座り）が一切ないことです。旅館の快適な個室や専用スタンドでお仕事が入るまで待機するため、通行人に見られることがなく身バレ・顔バレリスクが極小です。',
    badge: '顔見せ一切なし',
    highlightLabel: '通り座り完全ゼロ',
    keyTakeaways: ['通りに面した店先に座る必要は一切なし', '快適な旅館の個室や専用スタンドで待機', '知り合いに顔を見られる危険を根本排除']
  },
  {
    id: 'hi-priv-2',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: 'ネット写真ゼロ',
    searchQuery: 'ネットやSNSに写真が載る？',
    question: 'ホームページや求人サイト、SNSに写真が掲載されることはありますか？',
    directConclusion: '結論：ホームページやSNSへの写真掲載は一切ありません。写メ日記の更新義務もなくデジタルタトゥーの心配ゼロです。',
    answer: '信太山新地の旅館ではネット上での顔写真や体型写真の掲載、写メ日記の更新は完全ゼロです。デジタルタトゥーが残る心配が永久にありません。',
    badge: 'ネット掲載ゼロ',
    highlightLabel: '写真掲載100%なし',
    keyTakeaways: ['Webサイト・SNS・パネル写真掲載ゼロ', '写メ日記や動画配信の義務一切なし', 'デジタルタトゥーの恐怖なし']
  },
  {
    id: 'hi-priv-3',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '源氏名',
    searchQuery: '本名がバレることはある？',
    question: 'お仕事中の名前（源氏名）は自由に選べますか？本名は隠せますか？',
    directConclusion: '結論：完全源氏名制です。本名や個人情報は厳重に保護され、スタッフもお客様も源氏名のみで呼び合います。',
    answer: '完全源氏名制ですので、お好きな源氏名でお仕事ができ、店舗スタッフや仲居さん、お客様からも源氏名でのみ呼ばれます。本名や個人情報は厳重に保護されます。',
    badge: '完全源氏名制',
    highlightLabel: 'プライバシー厳重保護',
    keyTakeaways: ['お好きな源氏名（仮名）で勤務', 'スタッフもお客様も源氏名のみで呼称', '自宅への郵送物ゼロ']
  },
  {
    id: 'hi-priv-4',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '副業バレ対策',
    searchQuery: '会社や家族にバレない確定申告は？',
    question: '昼職の会社に副業が発覚しないための住民税・確定申告対策はありますか？',
    directConclusion: '結論：確定申告で住民税を「自分で納付（普通徴収）」にすることで、昼職の会社に副業が知られる心配はありません。',
    answer: '昼職の会社に副業が発覚する原因である「住民税」について、確定申告時に「自分で納付（普通徴収）」を選択する具体的な記入方法を専任スタッフが丁寧にお教えします。会社に通知がいくことはありません。',
    badge: '普通徴収対応',
    highlightLabel: '税務サポート完備',
    keyTakeaways: ['住民税「普通徴収」の確実な手続きを指南', '昼の会社に通知がいかない仕組みを確立', '銀行振込ではなく手渡し日払いのため通帳履歴も安心']
  },
  {
    id: 'hi-priv-5',
    searchIntentCategory: 'privacy',
    searchIntentCategoryLabel: '通勤プライバシー',
    searchQuery: '車通勤や人目につかない通勤は可能？',
    question: 'マイカー通勤や駅からの送迎サービスはありますか？',
    directConclusion: '結論：専用駐車場完備でマイカー・バイク通勤が可能です。また主要駅からの個別無料送迎もご利用いただけます。',
    answer: '信太山新地には専用駐車場が完備されており、マイカーやバイクでの通勤が可能です。また主要駅からの個別送迎も行っておりますので、電車利用の方も人目を避けて安全に通っていただけます。',
    badge: '専用駐車場完備',
    highlightLabel: '車・バイク通勤OK',
    keyTakeaways: ['専用駐車場完備でマイカー通勤可能', '最寄り駅や主要駅からの送迎サービス', '人目を気にせず通勤・帰宅可能']
  },

  // workstyle
  {
    id: 'hi-work-1',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: 'エリア定休日',
    searchQuery: '毎月20日の定休日とは？',
    question: '「毎月20日」の一斉定休日とはどのようなルールですか？',
    directConclusion: '結論：信太山新地では毎月20日がエリア全体の休業日です。全員が一斉に休むため、罪悪感なく確実にリフレッシュできます。',
    answer: '信太山新地エリア独自の規律・慣習として、曜日に関わらず毎月20日がエリア全体の休業日（定休日）となっています。全員が一斉に休むため「休む罪悪感」がなく、確実なリフレッシュと体調管理が可能です。',
    badge: '毎月20日定休',
    highlightLabel: '地域独自の一斉休業日',
    keyTakeaways: ['曜日に関係なく毎月20日はエリア全員休業', '休むことへの罪悪感ゼロで体調管理万全', 'プライベートや旅行の予定が立てやすい']
  },
  {
    id: 'hi-work-2',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '自由出勤',
    searchQuery: '週1日や月数回でもいい？',
    question: '週1日や月2〜3回だけでも働けますか？出勤強要はありませんか？',
    directConclusion: '結論：完全自由出勤制です。週1日だけ、月2〜3回、週末のみの出勤でも歓迎で、催促連絡や出勤強要は一切ありません。',
    answer: '完全自由出勤制ですので、週1日だけ、週末のみ、月2〜3回だけの出勤でも大歓迎です。出勤ノルマや「もっと出勤して」という催促連絡は一切ありません。',
    badge: '週1日〜自由',
    highlightLabel: '完全マイペース勤務',
    keyTakeaways: ['週1日・月数回・土日のみでも大歓迎', '出勤ノルマ・ペナルティ完全ゼロ', '催促電話やLINEの強要なし']
  },
  {
    id: 'hi-work-3',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '昼間時短',
    searchQuery: 'お昼だけの短時間勤務は可能？',
    question: '夕方までの昼間だけ、数時間の短時間で働けますか？',
    directConclusion: '結論：11:00〜16:00などお昼の短時間勤務も可能です。夕方には帰宅できるため、家庭や育児、本業と両立できます。',
    answer: '11:00〜16:00や12:00〜17:00など、お昼のスキマ時間だけの勤務も可能です。夕方には帰宅できるため、家事や育児、本業のある女性にも人気です。',
    badge: '昼間時短OK',
    highlightLabel: '11時〜16時の昼シフト',
    keyTakeaways: ['昼間の数時間だけでもしっかり稼げる', '夕方には帰宅できるため家庭と両立', '夜勤ができない女性も大歓迎']
  },
  {
    id: 'hi-work-4',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '出稼ぎ個室寮',
    searchQuery: '地方からの出稼ぎや寮は？',
    question: '地方から出稼ぎに行きたいのですが、交通費や個室寮は用意されていますか？',
    directConclusion: '結論：新幹線・飛行機代など往復交通費を全額支給します。家具家電付きの完全個室マンション寮（格安）に即入居可能です。',
    answer: '全国からの出稼ぎを大歓迎しています。新幹線や飛行機などの往復交通費を全額支給（領収書必須）し、家具・家電・エアコン付きの綺麗な個室マンション寮（1日0〜2,000円）をご用意しています。駅までのお迎えもございます。',
    badge: '交通費全額・個室寮',
    highlightLabel: 'カバン1つで即入居',
    keyTakeaways: ['新幹線・航空券等の往復交通費全額支給', '家電付き完全個室マンション寮完備', '新大阪駅や関空、信太山駅へのお迎えあり']
  },
  {
    id: 'hi-work-5',
    searchIntentCategory: 'workstyle',
    searchIntentCategoryLabel: '託児所支援',
    searchQuery: '子供がいるシングルマザーでも平気？',
    question: '子供がいるのですが、託児所や勤務時間の融通は利きますか？',
    directConclusion: '結論：託児所の完備や託児費用の負担制度があります。車通勤OKで、急なお子様の発熱によるお休みにも柔軟に対応します。',
    answer: '託児所の完備や託児費用の補助制度がある旅館をご案内できます。専用駐車場完備で車通勤もしやすく、急な子供の発熱や学校行事にも柔軟に対応しています。',
    badge: '託児支援完備',
    highlightLabel: 'ママさん応援制度',
    keyTakeaways: ['託児所完備および託児費用の補助あり', '専用駐車場完備で車通勤・送迎ラクラク', 'お子様の体調不良による当日休みもペナルティ0円']
  }
];

export function filterFAQ100(category: string, query: string): FAQ100Item[] {
  let list = FAQ_100_LIST;

  if (category && category !== 'all') {
    list = list.filter((item) => item.eightCategory === category || item.category === category);
  }

  if (query && query.trim()) {
    const q = query.trim().toLowerCase();
    list = list.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.keywords && item.keywords.some((k) => k.toLowerCase().includes(q))) ||
        (item.categoryLabel && item.categoryLabel.toLowerCase().includes(q)) ||
        (item.eightCategoryLabel && item.eightCategoryLabel.toLowerCase().includes(q))
    );
  }

  return list;
}
