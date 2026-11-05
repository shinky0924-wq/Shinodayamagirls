/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LucideIcon from './LucideIcon';

interface CompareDiagnosticProps {
  onSelectCategory: (slug: string) => void;
  onConsultLine: (situationText: string) => void;
  onScrollToSafety?: () => void;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    icon: string;
    matchedSlug: string;
    consultMessage: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Q1. あなたの「現在の状況」に一番近いものはどれですか？',
    subtitle: 'ご自身が最も大切にしたい条件をお選びください',
    options: [
      {
        label: 'ナイトワークや接客の経験が一度もない',
        description: '夜職が完全初めてで、店先での顔見せがない環境で安心して始めたい',
        icon: 'Sparkles',
        matchedSlug: 'inexperienced',
        consultMessage: '【診断結果：未経験向け求人】夜職未経験でも安心して働ける旅館について相談したいです。'
      },
      {
        label: '昼間の会社員（OL）や主婦で、秘密で副業したい',
        description: '会社や知人、家族に絶対にバレず、週1日やお昼・夜の短時間で稼ぎたい',
        icon: 'Briefcase',
        matchedSlug: 'double-work',
        consultMessage: '【診断結果：Wワーク副業向け】会社バレ・身バレ防止や住民税普通徴収について詳しく聞きたいです。'
      },
      {
        label: '短期間でまとまった貯金を一気に作りたい',
        description: '目標金額があり、日給8万〜10万円超の高額日払いで効率よく稼ぎたい',
        icon: 'Coins',
        matchedSlug: 'high-income',
        consultMessage: '【診断結果：高収入求人】日給保証や短期集中で高収入を稼ぐシフトについて相談したいです。'
      },
      {
        label: '地方から大阪へ出稼ぎに行きたい・住まいも欲しい',
        description: '往復交通費を支給してもらい、家具家電付きの綺麗な個室寮にすぐ住みたい',
        icon: 'Home',
        matchedSlug: 'dormitory',
        consultMessage: '【診断結果：個室寮・出稼ぎ求人】即日入居できる寮の空き状況と交通費支給について相談したいです。'
      }
    ]
  },
  {
    id: 2,
    title: 'Q2. 希望する「出勤ペース」はどのくらいですか？',
    subtitle: 'ご自身のライフスタイルに合わせてお選びください',
    options: [
      {
        label: '月数回〜週1日だけ、無理のないペースで',
        description: 'プライベート最優先。空いた土日やお昼のスキマ時間だけで月15万〜30万円',
        icon: 'Clock',
        matchedSlug: 'weekly-1',
        consultMessage: '【診断結果：週1マイペース求人】週1日や月数回出勤の条件について相談したいです。'
      },
      {
        label: '1週間〜1ヶ月程度の「超短期集中」で出稼ぎ',
        description: 'まとまった期間だけ遠方から出稼ぎに来て、全額現金日払いで持ち帰りたい',
        icon: 'Plane',
        matchedSlug: 'short-term',
        consultMessage: '【診断結果：短期出稼ぎ求人】1〜2週間の短期出稼ぎ受け入れについて相談したいです。'
      },
      {
        label: '週2〜4日、日中メインで家庭や本業と両立',
        description: '託児所支援やマイカー通勤を利用し、夕方には帰宅して家庭と両立したい',
        icon: 'Car',
        matchedSlug: 'age-30s',
        consultMessage: '【診断結果：30代40代オトナ女子向け】託児所支援や車通勤、日中シフトについて相談したいです。'
      },
      {
        label: '週4〜5日レギュラーで月収100万〜150万円以上',
        description: 'フル待機保証を活用し、人生を変えるレベルの貯蓄を一気に作りたい',
        icon: 'Award',
        matchedSlug: 'high-income',
        consultMessage: '【診断結果：高収入レギュラー】月収100万円超えを目指すレギュラー勤務について相談したいです。'
      }
    ]
  }
];

export default function CompareDiagnostic({
  onSelectCategory,
  onConsultLine,
  onScrollToSafety
}: CompareDiagnosticProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [finalSlug, setFinalSlug] = useState<string | null>(null);
  const [consultMsg, setConsultMsg] = useState<string>('');

  const handleSelectOption = (slug: string, message: string) => {
    const nextAnswers = [...selectedAnswers, slug];
    setSelectedAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished
      setFinalSlug(slug);
      setConsultMsg(message);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setFinalSlug(null);
    setConsultMsg('');
  };

  const currentQ = QUESTIONS[currentStep];

  return (
    <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-diagnostic">
      <div className="bg-gradient-to-br from-rose-50/70 via-white to-pink-50/50 rounded-3xl p-5 sm:p-8 border border-rose-200/80 shadow-md">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 bg-rose-100 text-secondary text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <LucideIcon name="Compass" size={14} />
            <span>30 SECONDS WORKSTYLE CHECK</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-zinc-900 mb-2">
            1分でわかる！あなたに最適な信太山新地の働き方診断
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            2つの質問に答えるだけで、あなたの希望条件にぴったりの旅館直営求人が見つかります。
          </p>
        </div>

        {/* Diagnostic Body */}
        <AnimatePresence mode="wait">
          {!finalSlug ? (
            <motion.div
              key={`question-${currentQ.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs font-bold text-zinc-500 mb-2">
                <span>QUESTION {currentStep + 1} / {QUESTIONS.length}</span>
                <span>進捗 {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full bg-rose-100 h-2 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-secondary h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              <div className="mb-6 text-center">
                <h3 className="font-black text-base sm:text-lg text-zinc-900 mb-1">
                  {currentQ.title}
                </h3>
                <p className="text-xs text-zinc-500">{currentQ.subtitle}</p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(opt.matchedSlug, opt.consultMessage)}
                    className="w-full text-left p-4 rounded-2xl bg-white hover:bg-rose-50/50 border border-zinc-200/80 hover:border-secondary transition-all cursor-pointer flex items-start gap-3.5 group shadow-2xs hover:shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-50 group-hover:bg-secondary group-hover:text-white text-secondary flex items-center justify-center shrink-0 transition-colors">
                      <LucideIcon name={opt.icon} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-zinc-900 group-hover:text-secondary transition-colors mb-0.5">
                        {opt.label}
                      </div>
                      <div className="text-xs text-zinc-500 leading-relaxed">
                        {opt.description}
                      </div>
                    </div>
                    <div className="text-zinc-300 group-hover:text-secondary group-hover:translate-x-1 transition-all shrink-0 self-center">
                      <LucideIcon name="ChevronRight" size={18} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-secondary/40 shadow-sm text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-rose-100 text-secondary mx-auto flex items-center justify-center mb-4">
                <LucideIcon name="Sparkles" size={32} />
              </div>

              <div className="inline-block bg-rose-50 text-secondary font-black text-xs px-3.5 py-1 rounded-full border border-rose-200 mb-2">
                診断結果
              </div>
              <h3 className="font-black text-xl sm:text-2xl text-zinc-900 mb-3">
                あなたにぴったりなのは【信太山新地 旅館直営求人】です！
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6 max-w-lg mx-auto">
                店先での顔見せが一切なく、快適な旅館の個室でリラックスして待機できるため、身バレの心配なくご自身の希望に合わせたペースで高日給（日払い）を稼ぐことができます。
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                <button
                  type="button"
                  onClick={() => onSelectCategory(finalSlug)}
                  className="px-6 py-3.5 rounded-2xl bg-secondary hover:bg-secondary-hover text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LucideIcon name="FileText" size={16} />
                  <span>この求人の詳しい条件を見る</span>
                </button>
                <button
                  type="button"
                  onClick={() => onConsultLine(consultMsg)}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LucideIcon name="MessageCircle" size={16} />
                  <span>LINEでこの条件を無料相談する</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-zinc-400 hover:text-zinc-600 font-bold underline transition-colors cursor-pointer"
              >
                もう一度最初から診断する
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
