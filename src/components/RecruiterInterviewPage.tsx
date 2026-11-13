/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { updatePageSeo } from '../seo';
import { LINE_OFFICIAL_URL } from '../data';

interface RecruiterInterviewPageProps {
  onNavigateHome: () => void;
  onCtaclick: () => void;
  onNavigateBlog?: () => void;
  onNavigateFaq?: () => void;
}

interface QuestionItem {
  id: string;
  category: 'beginner' | 'interview' | 'daily' | 'salary' | 'safety';
  question: string;
  answer: string;
  respondent: {
    name: string;
    role: string;
    avatarEmoji: string;
    badge: string;
  };
  highlight?: string;
}

const INTERVIEW_QUESTIONS: QuestionItem[] = [
  {
    id: 'beginner-ratio',
    category: 'beginner',
    question: 'Q. 未経験の女性はどのくらいいますか？年齢層は？',
    answer: '「信太山新地では、現在在籍している女性の約90％が夜職や風俗がまったくの未経験からスタートしています。\n年齢層も20代前半〜後半はもちろん、30代の女性も大歓迎で安心して活躍されています。\n学生さん、主婦、フリーター、昼間OLさんの掛け持ちなど、ごく普通の女性たちが働いています。\n複雑な営業活動やSNS更新（写メ日記等）の義務は一切ありません。初日は先輩スタッフが横について丁寧にお教えしますので、どうぞご安心ください。」',
    respondent: {
      name: 'あおい',
      role: '女性サポートスタッフ・相談窓口',
      avatarEmoji: '🌸',
      badge: '女性目線サポート'
    },
    highlight: '在籍女性の約90%が未経験！20代大歓迎・30代も安心'
  },
  {
    id: 'first-day-anxiety',
    category: 'safety',
    question: 'Q. 「店先での顔見せがない」というのは本当ですか？身バレは？',
    answer: '「はい、本当です！信太山新地が他の新地（飛田や松島など）と一線を画す最大の特徴は【店先での顔見せがない】ことです。\n衣装を着て通りに面した店先に座る必要は一切ありません。お仕事が入るまで快適な旅館の個室や専用スタンドで待機する形式ですので、通行人に見られることがなく、身バレ・顔バレのリスクが極めて低いのが最大の魅力です。\nまた、旅館に訪れたお客様は仲居さんが案内するため、女の子自身が呼び込みや営業連絡をする必要もありません。」',
    respondent: {
      name: '松本',
      role: '採用マネージャー・法務担当',
      avatarEmoji: '👨‍💼',
      badge: '待機システム'
    },
    highlight: '店先顔見せ一切なし！個室待機で身バレ・顔バレ完全防止'
  },
  {
    id: 'interview-questions',
    category: 'interview',
    question: 'Q. 面接で何を聞かれますか？身分証は何が必要ですか？',
    answer: '「一般的な就活のような、かしこまった志望動機や自己PRは一切不要です！\n面接でお伺いするのは、希望する勤務日数や時間帯、目標とする金額などです。\n履歴書は不要で、私服のまま手ぶらでお越しいただけます（出張面接も対応）。\n※応募資格は20歳以上の女性（日本国籍）となりますので、年齢確認のため【顔写真付き身分証明書原本（運転免許証・パスポート・マイナンバーカード等）】が1点必要となります（住民票は必須ではありません）。」',
    respondent: {
      name: '松本',
      role: '採用マネージャー・面接担当',
      avatarEmoji: '👨‍💼',
      badge: '面接・必要書類'
    },
    highlight: '履歴書不要・私服手ぶら面談！顔写真付き身分証で即日OK'
  },
  {
    id: 'daily-flow',
    category: 'daily',
    question: 'Q. 1日の出勤から退勤までの流れはどんな感じですか？',
    answer: '「出勤したら、まず専用の鍵付き個室控室（冷暖房・Wi-Fi・充電器完備）へ入ります。\nメイクや衣装の準備（無料レンタルドレスあり、私服ワンピも可）を行い、待機スタート。\nお客様がご来店されると内線やお部屋への直接案内でお声がけします。\n接客は15分単位の短時間。お茶出しや歓談がメインで、仲居さんがしっかり時間管理・サポートします。\n退勤時はその日の売上バック・待機保証が計算され、全額その場で現金手渡しされます。」',
    respondent: {
      name: 'あおい',
      role: '女性サポートスタッフ・相談窓口',
      avatarEmoji: '🌸',
      badge: '1日の流れ'
    },
    highlight: '15分単位の短時間接客・快適個室待機・即日全額日払い'
  },
  {
    id: 'salary-guarantee',
    category: 'salary',
    question: 'Q. 本当に日給5万〜10万円以上稼げますか？雑費の天引きは？',
    answer: '「はい、十分可能です。信太山新地は15分3,800円〜、30分7,600円〜の高額バックに加え、未経験スタートの方向けに【時給1万円保証】や【待機日給保証】制度を設けています。\nまた、スカウト業者や仲介所を通さない【老舗旅館の直営採用】ですので、紹介料の天引きや衣装代・厚生費などの不明瞭な引かれ物は一切ありません。手取り100％を即日現金でお持ち帰りいただけます。」',
    respondent: {
      name: '松本',
      role: '採用マネージャー・給与担当',
      avatarEmoji: '👨‍💼',
      badge: '給与システム'
    },
    highlight: '天引き0円（手取り100%支給）・時給1万円保証＆日給保証'
  },
  {
    id: 'trial-experience',
    category: 'beginner',
    question: 'Q. 体験入店（体入）はできますか？合わなかったら辞められますか？',
    answer: '「もちろん大歓迎です！見学だけ、または即日2〜3時間の短時間体験入店も可能です。\n体験入店で稼いだ給与もその場で全額日払いいたします。\n『実際にやってみて自分には合わない』と感じた場合は、その日限りで終了していただいても全く問題ありません。無理な引き止めや強引な契約は絶対にいたしませんのでご安心ください。」',
    respondent: {
      name: 'あおい',
      role: '女性サポートスタッフ・相談窓口',
      avatarEmoji: '🌸',
      badge: '体験入店'
    },
    highlight: '即日体験入店OK・全額即日日払い・合わなければ終了自由'
  },
  {
    id: 'dorm-relocation',
    category: 'daily',
    question: 'Q. 遠方からの出稼ぎや即日入寮は可能ですか？',
    answer: '「遠方からのご応募も年中無休で歓迎しております！\n全国各地（北海道・東北・関東・九州・沖縄等）からの往復交通費を全額支給（規定あり）いたします。\nまた、信太山エリア近くに家具・家電・Wi-Fi付きの完全個室ワンルーム寮をご用意しており、面接当日から即日住み込みが可能です。キャリーケース1つで手ぶらでお越しいただけます。」',
    respondent: {
      name: '松本',
      role: '採用マネージャー・寮管理',
      avatarEmoji: '👨‍💼',
      badge: '個室寮・出稼ぎ'
    },
    highlight: '家具家電付き即日個室寮完備・往復交通費全額支給'
  },
  {
    id: 'double-work',
    category: 'safety',
    question: 'Q. 昼職（OL・看護師・主婦）との掛け持ち・Wワークはバレませんか？',
    answer: '「現在在籍している女性の約半数が、昼間のお仕事や学業、家庭と掛け持ちされています。\n当店では店先での顔出しがないだけでなく、源氏名（仮名）での勤務、写真のネット掲載一切禁止、街全体での路上撮影禁止など、幾重ものプライバシー保護を徹底しています。\nまた、女性専用車での主要駅・指定場所への完全無料送迎もございますので、地元の方にばったり会う心配もございません。」',
    respondent: {
      name: 'あおい',
      role: '女性サポートスタッフ・相談窓口',
      avatarEmoji: '🌸',
      badge: 'Wワーク・身バレ対策'
    },
    highlight: '完全源氏名・ネット掲載一切なし・女性専用無料送迎完備'
  },
  {
    id: 'shift-flexibility',
    category: 'daily',
    question: 'Q. 週1日や月数回、短時間のシフトでも大丈夫ですか？',
    answer: '「完全自由出勤制ですので全く問題ありません！\n『平日の昼間だけ（11:00〜16:00）』『仕事帰りの夜だけ（19:00〜23:00）』『土日どちらかだけ』など、ご自身の都合に合わせて自由にシフトを組んでいただけます。\n出勤ノルマやペナルティ、急な呼び出し等は一切ありません。テスト期間や本業の繁忙期による長期休暇も自由です。」',
    respondent: {
      name: '松本',
      role: '採用マネージャー・シフト担当',
      avatarEmoji: '👨‍💼',
      badge: 'シフト自由度'
    },
    highlight: '週1日〜・短時間・月数回OK！完全自由出勤制でノルマ0'
  },
  {
    id: 'trouble-prevention',
    category: 'safety',
    question: 'Q. お客様とのトラブルやお酒の強要はありませんか？',
    answer: '「信太山新地の老舗旅館街は、厳格な組合規約のもとで営業されており、泥酔者やマナーの悪いお客様の入店は仲居さん・フロントが入口でお断りしています。\nまた、お酒を飲む必要は一切なく、お茶やお水、ソフトドリンクでのおもてなしです。\n各お部屋には緊急連絡ボタンや女性スタッフによる巡回警備があり、女性の安全を第一に守る体制が整っています。」',
    respondent: {
      name: 'あおい',
      role: '女性サポートスタッフ・相談窓口',
      avatarEmoji: '🌸',
      badge: '安心安全・トラブル防止'
    },
    highlight: '泥酔客入店拒否・飲酒強要ゼロ・フロント常駐＆巡回警備'
  }
];

export default function RecruiterInterviewPage({
  onNavigateHome,
  onCtaclick,
  onNavigateBlog,
  onNavigateFaq
}: RecruiterInterviewPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openQuestionIds, setOpenQuestionIds] = useState<Record<string, boolean>>({
    'beginner-ratio': true,
    'first-day-anxiety': true,
    'salary-guarantee': true
  });

  useEffect(() => {
    updatePageSeo({
      title: '旅館の求人・採用担当者インタビュー｜信太山新地 旅館直営公式採用',
      description: '信太山新地の老舗旅館直営採用。面接・給与担当の松本マネージャーと、女性相談窓口のあおいスタッフが信太山新地のリアルな現場実態に本音で回答しました。店先顔見せなし、未経験率90%、給与・日払い、面接内容まで詳しく解説。',
      canonicalUrl: 'https://osaka-shinodayamashinchi-recruit.com/interview',
      ogType: 'article'
    });
  }, []);

  const categories = [
    { id: 'all', label: '全質問を見る', count: INTERVIEW_QUESTIONS.length },
    { id: 'beginner', label: '未経験・体入', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'beginner').length },
    { id: 'safety', label: '安心・身バレ対策', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'safety').length },
    { id: 'interview', label: '面接・持ち物', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'interview').length },
    { id: 'salary', label: '給与・手当', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'salary').length },
    { id: 'daily', label: '働き方・寮', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'daily').length },
  ];

  const filteredQuestions = selectedCategory === 'all'
    ? INTERVIEW_QUESTIONS
    : INTERVIEW_QUESTIONS.filter(q => q.category === selectedCategory);

  const toggleQuestion = (id: string) => {
    setOpenQuestionIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleLineClick = (e: React.MouseEvent) => {
    if (onCtaclick) {
      e.preventDefault();
      onCtaclick();
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFAFC] py-8 sm:py-14">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">

        {/* パンくずリスト */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="hover:text-[#D8175D] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <LucideIcon name="Home" size={13} />
            <span>ホーム</span>
          </a>
          <span>/</span>
          <span className="text-zinc-800 font-bold">採用担当者・女性相談員インタビュー</span>
        </div>

        {/* ヒーローヘッダー */}
        <div className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.05)] mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#F0DDE4]">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3.5 py-1.5 rounded-full border border-[#F0DDE4] mb-3">
                <LucideIcon name="MessageSquareText" size={14} className="text-[#D8175D]" />
                <span>信太山新地 旅館直撃ヒアリング・生の声</span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-[#1F2432] tracking-tight leading-tight mb-2.5">
                旅館の求人・採用担当者へのインタビュー
              </h1>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                面接・給与担当の松本マネージャーと、女性相談窓口のあおいスタッフが信太山新地のリアルな現場実態に本音で回答しました。
              </p>
            </div>

            {/* スタッフ紹介バッジ */}
            <div className="flex items-center gap-3 bg-[#FFF1F5] p-3 rounded-[16px] border border-[#F0DDE4] shrink-0 self-start md:self-auto">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-lg shadow-2xs">
                  👨‍💼
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-zinc-900 block">松本マネージャー</span>
                  <span className="text-zinc-500 text-[10px]">採用・面接担当12年</span>
                </div>
              </div>
              <div className="w-px h-7 bg-[#F0DDE4]" />
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center text-lg shadow-2xs">
                  🌸
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-zinc-900 block">あおい</span>
                  <span className="text-[#D8175D] text-[10px] font-bold">女性相談窓口8年</span>
                </div>
              </div>
            </div>
          </div>

          {/* イントロダクション補足 */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#FFFCFC] p-3.5 rounded-[14px] border border-[#F0DDE4] text-center">
              <span className="text-[11px] text-zinc-500 block mb-0.5">プライバシー配慮</span>
              <span className="text-xs font-bold text-[#D8175D]">店先顔出し一切なし（個室待機）</span>
            </div>
            <div className="bg-[#FFFCFC] p-3.5 rounded-[14px] border border-[#F0DDE4] text-center">
              <span className="text-[11px] text-zinc-500 block mb-0.5">未経験スタート率</span>
              <span className="text-xs font-bold text-[#D8175D]">約90%が夜職初心者</span>
            </div>
            <div className="bg-[#FFFCFC] p-3.5 rounded-[14px] border border-[#F0DDE4] text-center">
              <span className="text-[11px] text-zinc-500 block mb-0.5">給与システム</span>
              <span className="text-xs font-bold text-[#D8175D]">引かれ物0円・即日全額日払い</span>
            </div>
          </div>
        </div>

        {/* カテゴリー切り替えタブ */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                selectedCategory === cat.id
                  ? 'bg-[#D8175D] text-white shadow-sm'
                  : 'bg-white text-zinc-700 hover:bg-[#FFF1F5] border border-[#F0DDE4]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                selectedCategory === cat.id ? 'bg-white/25 text-white' : 'bg-zinc-100 text-zinc-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Q&A アコーディオンリスト */}
        <div className="space-y-3.5 mb-10">
          {filteredQuestions.map(item => {
            const isOpen = !!openQuestionIds[item.id];
            return (
              <div
                key={item.id}
                className={`rounded-[18px] border transition-all duration-200 overflow-hidden bg-white shadow-2xs ${
                  isOpen
                    ? 'border-[#D8175D]/40 ring-1 ring-[#D8175D]/20'
                    : 'border-[#F0DDE4] hover:border-[#D8175D]/40'
                }`}
              >
                {/* 質問ヘッダー */}
                <button
                  type="button"
                  onClick={() => toggleQuestion(item.id)}
                  className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#D8175D] text-white text-xs font-black shrink-0 mt-0.5 shadow-2xs">
                      Q
                    </span>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-[#1F2432] leading-snug">
                        {item.question}
                      </h3>
                      {item.highlight && (
                        <span className="inline-block mt-1 text-[11px] font-bold text-[#D8175D] bg-[#FFF1F5] px-2.5 py-0.5 rounded-md border border-[#F0DDE4]">
                          {item.highlight}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-[#FFF1F5] flex items-center justify-center text-[#D8175D] shrink-0 mt-1">
                    <LucideIcon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={15} />
                  </div>
                </button>

                {/* 回答本文 */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[#F0DDE4]/60">
                    <div className="bg-[#FFFAFC] rounded-[14px] p-4 sm:p-5 border border-[#F0DDE4]">
                      {/* 回答者情報 */}
                      <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#F0DDE4] text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{item.respondent.avatarEmoji}</span>
                          <span className="font-bold text-[#1F2432]">
                            回答者：{item.respondent.name}
                          </span>
                          <span className="text-[11px] text-zinc-500 hidden sm:inline">
                            （{item.respondent.role}）
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-[#D8175D] bg-white px-2.5 py-0.5 rounded-full border border-[#F0DDE4]">
                          {item.respondent.badge}
                        </span>
                      </div>

                      {/* 本文 */}
                      <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed whitespace-pre-line font-medium">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 安心の約束 ＆ LINE相談統合エリア */}
        <div className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center max-w-2xl mx-auto mb-10">
          <div className="bg-[#FFF5F8] border border-[#F0DDE4] rounded-[16px] p-4 sm:p-5 mb-6 text-center">
            <div className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#D8175D] mb-1.5">
              <LucideIcon name="ShieldCheck" size={16} />
              <span>安心の約束</span>
            </div>
            <h3 className="font-bold text-base sm:text-lg text-[#1F2432] mb-1">
              応募したからといって、働くことを強制されません。
            </h3>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              見学・面接・体験を通して、お店や条件に納得してから決めてください。無理な勧誘は行いません。
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-3">
            <LucideIcon name="MessageCircle" size={13} />
            <span>24時間いつでも受付中</span>
          </div>

          <h3 className="font-display font-extrabold text-lg sm:text-xl md:text-[22px] text-[#1F2432] mb-2">
            まずは話を聞いてみるだけでも大丈夫。
          </h3>

          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-lg mx-auto">
            面接・給与担当の松本や、女性相談窓口のあおいスタッフが丁寧にご案内します。気になることは何でもお気軽にご相談ください。
          </p>

          <div className="flex flex-col items-center">
            <a
              href={LINE_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLineClick}
              className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#06C755]/25 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
              id="interview-line-cta-btn"
            >
              <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
              <span>LINEで気軽に相談する</span>
            </a>

            <span className="text-xs text-[#777777] font-medium mt-2.5">
              相談だけでも大歓迎です。
            </span>
          </div>
        </div>

        {/* 関連リンクナビゲーション */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-[#F0DDE4]">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-rose-50 text-zinc-700 hover:text-[#D8175D] font-bold text-xs border border-[#F0DDE4] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LucideIcon name="Home" size={14} />
            <span>求人トップページへ戻る</span>
          </a>
          {onNavigateFaq && (
            <a
              href="/faq"
              onClick={(e) => {
                e.preventDefault();
                onNavigateFaq();
              }}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-rose-50 text-zinc-700 hover:text-[#D8175D] font-bold text-xs border border-[#F0DDE4] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LucideIcon name="HelpCircle" size={14} />
              <span>よくある質問（FAQ 66問）を見る</span>
            </a>
          )}
          {onNavigateBlog && (
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                onNavigateBlog();
              }}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-rose-50 text-zinc-700 hover:text-[#D8175D] font-bold text-xs border border-[#F0DDE4] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LucideIcon name="BookOpen" size={14} />
              <span>お仕事コラム一覧を見る</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
