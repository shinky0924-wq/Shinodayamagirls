/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuerySummaryCard {
  id: string;
  queryLabel: string;
  questionHeading: string;
  directAnswer: string;
  targetPath: string;
  targetLabel: string;
  actionType: 'topic' | 'compare' | 'about';
  topicId?: string;
}

export const QUERY_SUMMARY_CARDS: QuerySummaryCard[] = [
  {
    id: 'q-recruit',
    queryLabel: '信太山新地 求人・直接募集',
    questionHeading: '信太山新地の直接求人と紹介・スカウト経由の違いは？',
    directAnswer:
      '結論：信太山ガールズは仲介業者やスカウトを通さない老舗旅館直営の「お店直接募集」窓口です。紹介料・待機料・雑費などの天引きがなく、仕事内容や報酬・待遇条件を応募前に確認できます。',
    targetPath: '/about',
    targetLabel: '運営者情報・直営店舗概要を見る',
    actionType: 'about',
  },
  {
    id: 'q-salary',
    queryLabel: '信太山新地 給料・日払い',
    questionHeading: '信太山新地の給料・報酬体系と日払いの仕組みは？',
    directAnswer:
      '結論：15分単位の明確なコース報酬（15分 3,800円〜／30分 7,600円〜／45分 11,400円〜／60分 15,200円〜）で、退勤時に全額現金手渡し日払いです。また他店（多くは完全歩合のみ）にはない当店独自の最低時給10,000円保証・待機日給保証制度（規定条件あり）も設けています。',
    targetPath: '/salary',
    targetLabel: '給料・保証条件の詳細を見る',
    actionType: 'topic',
    topicId: 'salary',
  },
  {
    id: 'q-beginner',
    queryLabel: '信太山新地 未経験・体入',
    questionHeading: '信太山新地は未経験でも始められますか？面接や体験入店は？',
    directAnswer:
      '結論：20歳以上の女性であれば未経験の方も応募でき、初めての方からのスタートが多数です。履歴書不要・私服での見学や相談のみも可能で、ご希望に応じて即日日払いの体験入店も相談できます。',
    targetPath: '/beginner',
    targetLabel: '未経験スタート安心ガイドを見る',
    actionType: 'topic',
    topicId: 'beginner',
  },
  {
    id: 'q-job',
    queryLabel: '信太山新地 仕事内容',
    questionHeading: '信太山新地の仕事内容・15分コースの流れとお酒や掃除の有無は？',
    directAnswer:
      '結論：仲居さんの案内で個室へ向かい、15分〜60分の短時間で軽い会話・スキンシップ・フェラ・避妊具（コンドーム）着用厳守での本番行為などを行います。お茶出しや飲酒、営業LINE、客室清掃はありません。',
    targetPath: '/job',
    targetLabel: '仕事内容・1日の流れを見る',
    actionType: 'topic',
    topicId: 'job',
  },
  {
    id: 'q-safety',
    queryLabel: '信太山新地 待機・身バレ対策',
    questionHeading: '店先での顔出しはありますか？待機方法と身バレ対策は？',
    directAnswer:
      '結論：信太山新地では飛田新地のように通り沿いの玄関に座って顔を見せる接客は一切なく、待機所（スタンドまたは旅館）で待機します。WebやSNSへの顔写真掲載もなく、源氏名で働けます。',
    targetPath: '/safety',
    targetLabel: '身バレ対策・安全ルールを見る',
    actionType: 'topic',
    topicId: 'safety',
  },
  {
    id: 'q-workstyle',
    queryLabel: '信太山新地 働き方・週1日',
    questionHeading: '週1日・短時間勤務や昼職とのWワーク・定休日はありますか？',
    directAnswer:
      '結論：10:00〜24:00の間で完全自由出勤制のため、週1日・1日3〜4時間の短時間勤務や土日のみ、Wワークも相談可能です。毎月20日は曜日に関わらず信太山新地エリア一斉定休日です。',
    targetPath: '/workstyle',
    targetLabel: '働き方・自由シフトの詳細を見る',
    actionType: 'topic',
    topicId: 'workstyle',
  },
  {
    id: 'q-dorm',
    queryLabel: '信太山新地 寮・出稼ぎ・送迎',
    questionHeading: '個室マンション寮や交通費支給、送迎・託児補助はありますか？',
    directAnswer:
      '結論：JR阪和線「信太山駅」周辺（駅徒歩約5分）に家具家電付きの個室マンション寮（日額0〜2,000円目安）や往復交通費規定支給、無料送迎、駐車場、託児費用補助のご相談に対応しています。',
    targetPath: '/dorm',
    targetLabel: '寮・出稼ぎ・交通費条件を見る',
    actionType: 'topic',
    topicId: 'dorm',
  },
  {
    id: 'q-compare',
    queryLabel: '信太山新地と飛田新地・他業種の違い',
    questionHeading: '信太山新地と飛田新地・メンズエステ・キャバクラの違いは？',
    directAnswer:
      '結論：一番の違いは「店先顔見せの有無（信太山新地は待機所待機で顔出しなし）」と「15分単位の短時間制」です。キャバクラのような飲酒・営業LINE・ノルマがなく、ネット顔出しもないため身バレを抑えられます。',
    targetPath: '/compare',
    targetLabel: '6業種・11項目徹底比較を見る',
    actionType: 'compare',
  },
];
