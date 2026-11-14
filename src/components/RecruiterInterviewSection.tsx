import React, { useState } from 'react';
import LucideIcon from './LucideIcon';

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
    answer: '「信太山新地では、現在在籍している女性の約90％が夜職や風俗がまったくの未経験からスタートしています。\n年齢層も20代前半〜後半はもちろん、30代、そして40代（45歳位まで）の女性も大歓迎で積極的に採用しています。\n学生さん、主婦、フリーター、昼間OLさんの掛け持ちなど、ごく普通の女性たちが活躍されています。\n複雑な営業活動やSNS更新（写メ日記等）の義務は一切ありません。初日は先輩スタッフが横について丁寧にお教えしますので、どうぞご安心ください。」',
    respondent: {
      name: 'あおい',
      role: '女性サポートスタッフ・相談窓口',
      avatarEmoji: '🌸',
      badge: '女性目線サポート'
    },
    highlight: '在籍女性の約90%が未経験！20代〜40代幅広く歓迎'
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
    question: 'Q. 旅館コンパニオンの1日の仕事の流れは？',
    answer: '「大まかな1日の流れは以下の通りです：\n① 出勤：更衣室で衣装に着替え（衣装無料貸出・メイク道具完備）\n② 待機所（スタンドまたは旅館）で待機：お仕事が入るまでスマホを見たり本を読んだり自由にリラックス待機\n③ 仲居さんの呼び出しでお部屋へ：お客様を仲居さんが受付・客室へご案内（お客様が先にシャワーを済ませます）。電話・内線で呼び出しが入ったら客室へ移動\n④ 15分〜短時間接客：1コース最短15分から。スキンシップやフェラ・ゴム着用厳守での本番行為など1対1のサービス接客（お茶出しや飲酒は一切ありません）\n⑤ 終了＆清掃不要：終了時間に仲居さんから内線でお知らせ。シャワー後お見送りし、お部屋の片付けや清掃は仲居さんが担当\n⑥ 全額日払い手渡し：その日の稼ぎを退勤時に全額現金手渡し。そのまま帰宅または寮へ！\n\n短時間接客の繰り返しで、お風呂掃除等の重労働もないため体力的な負担が非常に少ないです。」',
    respondent: {
      name: 'あおい',
      role: '女性サポートスタッフ・相談窓口',
      avatarEmoji: '🌸',
      badge: '1日の流れ'
    },
    highlight: '待機→呼び出し→最短15分接客→仲居さんが清掃→全額日払い'
  },
  {
    id: 'salary-calculation',
    category: 'salary',
    question: 'Q. 給料システムとコース料金はどうなっていますか？保証はありますか？',
    answer: '「当店（グループ直営旅館）は15分単位の明確な給料体系です：\n\n▼コース別の報酬（手取り）：\n・15分コース：3,800円\n・30分コース：7,600円\n・45分コース：11,400円\n・60分コース：15,200円（以降15分ごと加算）\n\nさらに当店（グループ直営店）では【時給1万円保証】や【待機時間に応じた日給保証（例：12時間待機で8〜10万円保証）】を完備しており、日給5万〜10万円以上、月給100万円以上を稼ぐ女性が多数在籍しています。\nノルマ・罰金・雑費引き・講習などは一切なく、働いた分はその日に全額即日日払いです。」',
    respondent: {
      name: '松本',
      role: '採用マネージャー・給与管理担当',
      avatarEmoji: '👨‍💼',
      badge: '給与システム'
    },
    highlight: '15分3,800円！時給1万保証・日給8〜10万保証あり'
  },
  {
    id: 'monthly-20-holiday',
    category: 'daily',
    question: 'Q. 「毎月20日」の一斉定休日とは何ですか？',
    answer: '「信太山新地エリア特有の規律・慣習として、曜日に関わらず毎月20日がエリア全体の休業日（一斉定休日）となっています。\n『休むとお店に申し訳ない』というプレッシャーを感じることなく、強制的なリセット日として確実に休養を取ることができます。\n旅行やエステ、お買い物などプライベートを充実させ、心身のオン・オフを切り替えられるためキャストからも大好評の制度です。」',
    respondent: {
      name: 'あおい',
      role: '女性サポートスタッフ・相談窓口',
      avatarEmoji: '🌸',
      badge: 'エリア独自文化'
    },
    highlight: '曜日問わず毎月20日はエリア全体一斉休業！確実な休養日'
  },
  {
    id: 'out-of-town-support',
    category: 'interview',
    question: 'Q. 遠方からの出稼ぎや寮、交通費の支給はありますか？',
    answer: '「全国（北海道から沖縄まで）からの出稼ぎ希望者を歓迎する出稼ぎパッケージを完備しています：\n・往復交通費支給：新幹線、飛行機、特急電車等の交通費を支給（領収書必須）\n・生活家電完備の個室マンション寮：テレビ・冷蔵庫・Wi-Fi・エアコン完備、1日0〜2,000円と低額\n・到着時のお迎え：初日は駅や指定場所までお迎えに伺い、備品貸与や旅館への挨拶回りまで手厚く同行サポートします。\n安定した客数と高い保証金額により、リピーターとなる出稼ぎ女性が多数いらっしゃいます。」',
    respondent: {
      name: '松本',
      role: '採用マネージャー・出稼ぎ支援担当',
      avatarEmoji: '👨‍💼',
      badge: '出稼ぎ支援'
    },
    highlight: '全国往復交通費全額支給！家電付き格安個室寮＆駅送迎完備'
  },
  {
    id: 'nakai-support',
    category: 'daily',
    question: 'Q. コンパニオン以外に「仲居（スタッフ）」の求人もありますか？',
    answer: '「はい！旅館の運営を支える仲居スタッフの求人も募集しています。\n主な業務は、お客様の呼び込み、旅館へのご案内、お部屋・廊下・トイレの清掃、タオル等の洗濯などです。\n先輩仲居スタッフがマンツーマンで付き添い指導を行うため難易度は高くなく、未経験からでも安心して就労していただけます。」',
    respondent: {
      name: 'あおい',
      role: '女性サポートスタッフ・相談窓口',
      avatarEmoji: '🌸',
      badge: '仲居求人'
    },
    highlight: '旅館運営を支える仲居業務。呼び込み・案内・清掃・洗濯'
  },
  {
    id: 'safety-rule',
    category: 'safety',
    question: 'Q. 安全面・衛生面のルールはどうなっていますか？',
    answer: '「信太山新地では、組合全体で女性保護のための厳格な自主ルールが徹底されています：\n・全室シャワー完備・コンドーム（ゴム）着用の完全徹底（生本番禁止）\n・泥酔者やマナーの悪いお客様の入店拒否ルールの徹底\n・嫌なお客様や無理な要求に対するお断り権利\n・キャバクラのような飲酒接客なし（アルコール強要ゼロ）\n女性の安全・尊厳が最優先で守られており、一般的な風俗店よりも圧倒的に安心して働ける環境です。」',
    respondent: {
      name: '松本',
      role: '採用マネージャー・法務担当',
      avatarEmoji: '👨‍💼',
      badge: '安全・衛生管理'
    },
    highlight: '全室シャワー・ゴム着用徹底・泥酔客入店拒否・飲酒強要ゼロ'
  }
];

export default function RecruiterInterviewSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openQuestionIds, setOpenQuestionIds] = useState<Record<string, boolean>>({
    'beginner-ratio': true,
    'first-day-anxiety': true,
    'interview-questions': true,
    'salary-calculation': true
  });

  const categories = [
    { id: 'all', label: 'すべて表示', count: INTERVIEW_QUESTIONS.length },
    { id: 'beginner', label: '🔰 初心者・未経験', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'beginner').length },
    { id: 'safety', label: '🔒 顔見せなし・安全', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'safety').length },
    { id: 'salary', label: '💰 給与・保証', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'salary').length },
    { id: 'daily', label: '🍵 仕事内容・定休日', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'daily').length },
    { id: 'interview', label: '🤝 面接・出稼ぎ', count: INTERVIEW_QUESTIONS.filter(q => q.category === 'interview').length }
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

  return (
    <section className="my-10 rounded-3xl border-2 border-rose-200 bg-white p-6 sm:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80 mb-2">
            <LucideIcon name="MessageSquareText" size={14} className="text-rose-600" />
            <span>信太山新地 旅館直撃ヒアリング・生の声</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
            旅館の求人・採用担当者へのインタビュー
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">
            面接・給与担当の松本マネージャーと、女性相談窓口のあおいスタッフが信太山新地のリアルな現場実態に本音で回答しました。
          </p>
        </div>

        {/* Staff Mini Profiles */}
        <div className="flex items-center gap-3 bg-rose-50/60 p-2.5 rounded-2xl border border-rose-100/80 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-base">
              👨‍💼
            </div>
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-zinc-900 block">松本MG</span>
              <span className="text-zinc-500 text-[10px]">採用担当12年</span>
            </div>
          </div>
          <div className="w-px h-6 bg-rose-200" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center text-base">
              🌸
            </div>
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-zinc-900 block">あおい</span>
              <span className="text-zinc-500 text-[10px]">女性相談8年</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-4 border-b border-rose-50">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
              selectedCategory === cat.id
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            <span>{cat.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedCategory === cat.id ? 'bg-white/30 text-white' : 'bg-zinc-200 text-zinc-600'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Q&A Accordion List */}
      <div className="mt-5 space-y-3">
        {filteredQuestions.map(item => {
          const isOpen = !!openQuestionIds[item.id];
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-rose-300 bg-rose-50/20 shadow-xs'
                  : 'border-zinc-200/80 bg-white hover:border-rose-200'
              }`}
            >
              {/* Question Header */}
              <button
                type="button"
                onClick={() => toggleQuestion(item.id)}
                className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black shrink-0 mt-0.5 shadow-2xs">
                    Q
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-zinc-900 leading-snug">
                      {item.question}
                    </h4>
                    {item.highlight && (
                      <span className="inline-block mt-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                        {item.highlight}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 text-zinc-400 mt-1">
                  <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
                    <LucideIcon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  </div>
                </div>
              </button>

              {/* Answer Body */}
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-rose-100/60">
                  <div className="bg-white rounded-xl p-4 border border-rose-100 shadow-2xs">
                    {/* Respondent Badge */}
                    <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-zinc-100 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.respondent.avatarEmoji}</span>
                        <span className="font-bold text-zinc-900">
                          回答者：{item.respondent.name}
                        </span>
                        <span className="text-[11px] text-zinc-500 hidden sm:inline">
                          （{item.respondent.role}）
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        {item.respondent.badge}
                      </span>
                    </div>

                    {/* Answer Text */}
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

      {/* Trust Footer Notice */}
      <div className="mt-6 pt-5 border-t border-rose-100 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 font-bold text-rose-700">
          <LucideIcon name="ShieldCheck" size={14} />
          旅館現場ヒアリング実施済み・最新実態掲載
        </span>
        <span className="hidden sm:inline text-zinc-300">|</span>
        <span>ご不明な点や個別のご相談は、公式LINEよりいつでも匿名でお問い合わせいただけます。</span>
      </div>
    </section>
  );
}
