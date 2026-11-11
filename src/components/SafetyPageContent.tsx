/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LucideIcon from './LucideIcon';
import { LINE_OFFICIAL_URL } from '../data';

interface SafetyPageContentProps {
  onCtaclick: () => void;
  onNavigateTopic: (topicId: string) => void;
  onNavigateBlog?: (slug?: string) => void;
  onNavigateFaq?: () => void;
  onInjectedScroll?: (msg: string) => void;
  onNavigateCompare?: () => void;
}

export default function SafetyPageContent({
  onCtaclick,
  onNavigateTopic,
  onNavigateBlog,
  onNavigateFaq,
  onInjectedScroll,
}: SafetyPageContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [checkedList, setCheckedList] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedList(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleLineClick = (e: React.MouseEvent) => {
    const msg = '【信太山新地の当店へ応募・相談】身バレ対策（写真掲載の有無や個人情報管理、通勤方法など）について詳しく相談してみたいです。';
    if (onInjectedScroll) {
      e.preventDefault();
      onInjectedScroll(msg);
    } else if (onCtaclick) {
      e.preventDefault();
      onCtaclick();
    }
  };

  // 10. よくある質問
  const safetyFaqs = [
    {
      q: '知人や家族に会うのが心配ですが、対策はありますか？',
      a: '完全に知られないことを保証することはできませんが、普段の生活圏と重ならない通勤ルートの検討、車通勤や送迎の利用、勤務時間帯の調整など、身近な人に遭遇する可能性を減らすための具体的な工夫を事前にご相談いただけます。'
    },
    {
      q: '顔写真やプロフィールがネットに掲載されることはありますか？',
      a: '当店では、ご本人の同意のない写真掲載や顔出しの強要は行っておりません。Web上の写真掲載の有無や公開範囲については、面接・相談時に実際の募集条件と合わせて丁寧にご説明します。'
    },
    {
      q: '本名や住所などの個人情報はどのように管理されていますか？',
      a: '採用手続きや法定の管理に必要な最小限の情報のみをお預かりし、厳重に保管しています。店舗内では源氏名（ニックネーム）を使用し、お客様はもちろん他のスタッフにも本名が漏れないよう配慮しています。'
    },
    {
      q: 'お客様から連絡先を聞かれたらどうすればいいですか？',
      a: '信太山新地の当店では個人的な連絡先交換を原則禁止としています。「お店のルールでお教えできません」とお断りして問題ありません。困った場合は専任のスタッフや仲居が間に入って対応します。'
    },
    {
      q: 'お客様との間でトラブルが起きたときはどう対応してもらえますか？',
      a: '接客中にお客様がルール違反や無理な要求をされた場合は、我慢せず内線等ですぐにスタッフをお呼びください。女性スタッフ・仲居が即座にお部屋に入り、お客様への注意や交代・退室対応を行います。'
    },
    {
      q: '退店した後に個人情報が残ったり連絡が来たりすることはありますか？',
      a: '退店後に店舗から不要な連絡をお送りすることは一切ありません。お預かりした個人情報は規定に基づき適切に取り扱われます。退店時の手続きについても事前にご確認いただけます。'
    }
  ];

  // 6. 身バレ・安全対策チェックリスト
  const checklistItems = [
    '顔写真の掲載は必須なのか',
    '顔出しを避けて働けるのか',
    '写真や宣伝素材はどこに掲載されるのか',
    'SNSへの写真掲載ルールはどうなっているのか',
    '個人情報はどのように管理されているのか',
    '本名や住所などの情報は誰が確認するのか',
    'お客様との連絡先交換についてルールはあるのか',
    '知人に会うことが心配な場合に相談できるのか',
    'トラブルが起きた際の相談先はあるのか',
    '退店後の個人情報や写真の取り扱いはどうなるのか'
  ];

  // 9. 関連記事
  const relatedArticles = [
    {
      title: '信太山新地で働くと身バレする？事前に知っておきたい注意点',
      summary: '生活圏との距離、通勤時のポイント、知り合いに会う可能性を減らすための実践的な対策を解説します。',
      slug: 'shinodayamashinchi-privacy-guide',
      tag: '身バレ対策'
    },
    {
      title: '顔写真やSNSの取り扱いについて知っておきたいこと',
      summary: '求人写真やネット掲載のルール、本人の同意確認など、写真に関する不安を解消するためのポイント。',
      slug: 'shinodayamashinchi-safety-and-security',
      tag: '写真・SNS'
    },
    {
      title: '初めて働く女性が確認したい安全面のポイント',
      summary: '接客ルール、禁止事項、困ったときの相談体制など、安心して働くための事前チェック項目。',
      slug: 'shinodayamashinchi-beginner-friendly-environment',
      tag: '安全基準'
    },
    {
      title: '寮生活・通勤環境について事前に確認したいこと',
      summary: '信太山駅近辺の寮や通勤方法など、生活環境を整えてプライバシーを守るための工夫をご案内します。',
      slug: 'shinodayamashinchi-housing-support',
      tag: '住まい・通勤'
    }
  ];

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

      {/* 1. ファーストビューを全面変更 */}
      <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* 左側：見出し・説明文・安心ポイント */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] sm:text-xs font-bold tracking-widest text-[#D8175D] uppercase mb-2">
              PRIVACY & SAFETY GUIDE
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#1F2432] leading-tight mb-3 tracking-tight">
              <span className="text-[#D8175D]">身バレ</span>が心配な方へ。<br />
              <span className="text-[#D8175D]">プライバシー</span>に配慮した働き方をご案内します
            </h1>

            <p className="font-bold text-sm sm:text-base text-[#1F2432] mb-3">
              顔写真・個人情報・知人への知られやすさ。<br className="hidden sm:inline" />
              働く前に知っておきたい身バレ対策と安全面について、分かりやすく解説します。
            </p>

            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
              「家族や友人に知られたくない」「知り合いに会ったらどうしよう」「個人情報はきちんと管理される？」など、不安を感じる方もいらっしゃいます。<br className="hidden sm:inline" />
              当ページでは、身バレにつながる可能性がある場面や、入店前に確認しておきたいプライバシー対策についてご紹介します。
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#1F2432]">
              <span className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#D8175D] px-3 py-1 rounded-full border border-[#F0DDE4]">
                <LucideIcon name="ShieldCheck" size={13} />
                完全個室待機・店先顔見せなし
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#D8175D] px-3 py-1 rounded-full border border-[#F0DDE4]">
                <LucideIcon name="UserCheck" size={13} />
                源氏名管理・本名非公開
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FFF1F5] text-[#D8175D] px-3 py-1 rounded-full border border-[#F0DDE4]">
                <LucideIcon name="MessageCircleHeart" size={13} />
                女性専任スタッフ相談窓口
              </span>
            </div>
          </div>

          {/* 右側：落ち着いた和風の個室・清潔感のある室内写真 */}
          <div className="w-full md:w-[420px] shrink-0">
            <div className="relative rounded-[20px] overflow-hidden border border-[#F0DDE4] shadow-sm bg-[#FFF5F8]/40 aspect-[4/3]">
              <img
                src="/images/privacy_ryokan_room_1794375281070.jpg"
                alt="落ち着いた和風旅館の個室空間（通りから見られない完全個室待機環境）"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 rounded-lg font-medium text-center">
                落ち着いた和風の個室｜通りからの視線を遮る静かな待機環境
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 女性が心配する6つのポイント (ファーストビュー直後に配置、3列×2段) */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
            CONCERNS & CHECKPOINTS
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
            働く前に知っておきたい6つの身バレ・安全対策
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            初めて働く方も、経験がある方も、気になることを事前に確認しておくことが大切です。
          </p>
        </div>

        {/* 6つのカード（3列×2段） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            {
              num: '01',
              title: '顔写真・身元が知られる不安',
              desc: '顔写真の掲載が必要なのか、顔出しを避けて働けるのかなど、写真の取り扱いについて事前に確認しましょう。',
              icon: 'Camera'
            },
            {
              num: '02',
              title: '家族・友人・知人への身バレ',
              desc: '生活圏や知人との接点など、身近な人に知られる可能性が気になる方は、通勤方法や勤務時間についても相談しておきましょう。',
              icon: 'Users'
            },
            {
              num: '03',
              title: '個人情報の管理',
              desc: '本名・住所・電話番号などの個人情報がどのように取り扱われるのか、保管方法や利用目的について確認しましょう。',
              icon: 'FileText'
            },
            {
              num: '04',
              title: 'SNS・インターネットへの掲載',
              desc: '写真や個人情報がSNSなどに掲載されることがないか、掲載する場合のルールや本人の同意について確認しましょう。',
              icon: 'Globe'
            },
            {
              num: '05',
              title: 'お客様との接触・プライバシー',
              desc: '接客時に個人的な連絡先やプライベートな情報を伝える必要があるのかなど、接客上のルールを確認しましょう。',
              icon: 'PhoneOff'
            },
            {
              num: '06',
              title: '困ったときの相談・対応',
              desc: 'お客様とのトラブルや身バレが心配になった場合に、誰に相談できるのか、どのように対応してもらえるのかを確認しましょう。',
              icon: 'HeartHandshake'
            }
          ].map((c, i) => (
            <div
              key={i}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs hover:border-[#D8175D]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-2.5 py-0.5 rounded border border-[#F0DDE4]">
                    {c.num}
                  </span>
                  <LucideIcon name={c.icon} size={17} className="text-[#D8175D]" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-2 leading-snug">
                  {c.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 当店のプライバシーへの配慮 (6項目) */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
            OUR PRIVACY MEASURES
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
            安心して働くために。プライバシーへの配慮について
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            働くうえで、個人情報やプライベートを大切にしたいと考えるのは自然なことです。<br />
            当店では、入店前の相談時に不安や希望をお聞きし、実際の対応方法やルールについてご説明します。
          </p>
        </div>

        {/* 6項目カード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            {
              num: '01',
              title: '個人情報の取り扱い',
              desc: '応募時や面接時に必要な個人情報の利用目的や管理方法についてご説明します。業務外の利用や第三者への漏洩はありません。',
              icon: 'Lock'
            },
            {
              num: '02',
              title: '顔写真・写真掲載の確認',
              desc: '求人写真や宣伝素材への写真掲載について、掲載の有無や取り扱いルールを事前に確認できるようにしています。',
              icon: 'EyeOff'
            },
            {
              num: '03',
              title: 'SNS・ネット掲載のルール',
              desc: '写真や個人情報のインターネット掲載について、店舗のルールを明確に説明し、無断でのアップロードを厳禁としています。',
              icon: 'ShieldCheck'
            },
            {
              num: '04',
              title: '通勤・出勤方法の相談',
              desc: '生活圏と重ならない通勤ルートや車通勤、送迎の利用など、生活スタイルに合わせた相談が可能です。',
              icon: 'Car'
            },
            {
              num: '05',
              title: '接客時のプライバシー',
              desc: '個人的な連絡先やプライベート情報の取り扱いについて、店舗のルール（店外連絡禁止等）を定めてキャストを守ります。',
              icon: 'UserX'
            },
            {
              num: '06',
              title: '女性スタッフへの相談',
              desc: '身バレやプライバシーに関する不安をいつでも相談できるよう、専任の女性スタッフが親身に対応する窓口を設けています。',
              icon: 'Sparkles'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs hover:border-[#D8175D]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] font-mono font-bold text-xs shrink-0 shadow-2xs">
                    {item.num}
                  </span>
                  <LucideIcon name={item.icon} size={15} className="text-[#D8175D]" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 身バレにつながりやすい場面と注意点 (特に重要なセクション) */}
      <section className="bg-gradient-to-b from-[#FFFDF5] to-[#FFF5F8] rounded-[24px] p-6 sm:p-9 border border-amber-200/90 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="flex-1">
              <div className="inline-block bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 mb-2">
                入店前に知っておきたい実践的知識
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-3">
                こんな場面に注意。身バレにつながる可能性があること
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                身バレは、お店の中だけでなく、通勤時やインターネット上など、さまざまな場面で起こる可能性があります。<br />
                事前に注意点を知っておくことで、プライバシーを守るための対策を考えやすくなります。
              </p>
            </div>
            <div className="w-full md:w-[260px] shrink-0">
              <div className="rounded-[18px] overflow-hidden border border-[#F0DDE4] shadow-xs aspect-[4/3] bg-white">
                <img
                  src="/images/privacy_phone_discreet_1794375281535.jpg"
                  alt="スマートフォンのプライバシー管理や相談の様子"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* 5つの注意ポイント */}
          <div className="space-y-3.5">
            {[
              {
                num: '01',
                title: 'SNSへの写真掲載',
                desc: '顔や特徴が分かる写真、背景に写り込んだ場所や小物などから個人が特定される可能性があります。個人のSNS投稿には十分配慮しましょう。',
                icon: 'Camera'
              },
              {
                num: '02',
                title: '通勤時の知人との遭遇',
                desc: '普段の生活圏や職場の最寄り駅と勤務先周辺が重なる場合、知人に会う可能性も考えておきましょう。路線や出勤ルートの工夫が効果的です。',
                icon: 'MapPin'
              },
              {
                num: '03',
                title: 'スマートフォンの情報管理',
                desc: '写真のクラウド同期、位置情報共有、SNSの「連絡先同期」や公開範囲など、スマートフォンのプライバシー設定も事前に確認しておきましょう。',
                icon: 'Smartphone'
              },
              {
                num: '04',
                title: 'お客様との個人的なやり取り',
                desc: '本名・居住地域・個人のSNSアカウントなど、プライベートな情報を安易に伝えないよう注意しましょう。店舗ルールを守ることが最大の防御になります。',
                icon: 'AlertCircle'
              },
              {
                num: '05',
                title: '写真や情報の無断利用',
                desc: '写真や個人情報が本人の知らないところで利用されないよう、掲載ルールや相談先を入店前に確認しておきましょう。',
                icon: 'ShieldAlert'
              }
            ].map((point, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[16px] p-4 sm:p-5 border border-amber-200/80 shadow-2xs flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-mono font-bold text-xs shrink-0 mt-0.5">
                  {point.num}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm sm:text-base text-[#1F2432] mb-1">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 安全に働くために確認したいこと */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
            SAFETY GUIDELINES
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
            入店前に確認したい安全面のポイント
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            安心して働くためには、お店の説明を聞くだけでなく、具体的なルールや対応方法を確認しておくことが大切です。
          </p>
        </div>

        {/* 短く分かりやすい説明リスト */}
        <div className="bg-[#FFFAFC] rounded-[20px] p-5 sm:p-7 border border-[#F0DDE4] max-w-3xl mx-auto shadow-2xs">
          <div className="space-y-3.5">
            {[
              {
                title: 'お客様とのトラブルが発生した際の対応',
                desc: '無理な要求や迷惑行為があった場合は即座に接客を中断できます。女性スタッフ・仲居がすぐに対応に入ります。',
                icon: 'AlertTriangle'
              },
              {
                title: '困ったときに相談できるスタッフの有無',
                desc: 'いつでも相談できる女性専任スタッフが在籍しています。接客中の悩みやプライベートな相談も安心です。',
                icon: 'HeartHandshake'
              },
              {
                title: '個人的な連絡先を交換する必要があるのか',
                desc: '個人的な連絡先交換（LINE・電話番号等）は原則禁止です。店外での連絡や呼び出しの心配はありません。',
                icon: 'PhoneOff'
              },
              {
                title: '接客内容や禁止事項の説明',
                desc: '当店で定めているサービス内容や、女性の安全を守るための禁止事項を入店前に丁寧にご説明します。',
                icon: 'FileCheck'
              },
              {
                title: '個人情報の管理方法',
                desc: '採用に必要な書類は厳重に保管され、源氏名を使用するため店内外で本名が知られることはありません。',
                icon: 'Lock'
              },
              {
                title: '写真や宣伝素材の掲載ルール',
                desc: '本人の同意のない写真掲載や顔出しの強要はありません。掲載条件は面接時に詳しく確認できます。',
                icon: 'CameraOff'
              },
              {
                title: '退店後の個人情報や写真の取り扱い',
                desc: '退店後に店舗から連絡をすることはなく、管理していた個人情報も規定に従って適切に取り扱われます。',
                icon: 'UserMinus'
              }
            ].map((rule, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[14px] p-4 border border-[#F0DDE4]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div className="flex items-center gap-2.5 font-bold text-xs sm:text-sm text-[#1F2432] shrink-0 sm:w-64">
                  <span className="w-6 h-6 rounded-full bg-[#FFF1F5] text-[#D8175D] flex items-center justify-center shrink-0">
                    <LucideIcon name={rule.icon} size={13} />
                  </span>
                  <span>{rule.title}</span>
                </div>
                <div className="text-xs sm:text-sm text-[#555555] sm:text-right flex-1 leading-relaxed">
                  {rule.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 身バレ・安全対策チェックリスト (白背景カード、スマートフォン対応) */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
            PRE-INTERVIEW CHECKLIST
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
            面接・見学の前に確認しておきたいこと
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            気になることは、入店を決める前に確認しておきましょう。<br className="hidden sm:inline" />
            タップして確認状況をチェックできます。
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-[#FFFAFC] rounded-[20px] p-5 sm:p-7 border border-[#F0DDE4] shadow-2xs">
          <div className="space-y-2.5">
            {checklistItems.map((item, idx) => {
              const isChecked = !!checkedList[idx];
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleCheck(idx)}
                  className={`w-full text-left p-3.5 rounded-[12px] border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isChecked
                      ? 'bg-[#E6F4EA] border-emerald-300 text-emerald-900'
                      : 'bg-white border-[#F0DDE4] text-[#333333] hover:border-[#D8175D]/40'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-medium flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 text-white'
                          : 'border border-[#CCCCCC] bg-white'
                      }`}
                    >
                      {isChecked && <LucideIcon name="Check" size={13} />}
                    </span>
                    <span>{item}</span>
                  </span>
                  <span className="text-[11px] text-[#777777] shrink-0 font-medium">
                    {isChecked ? '確認済み' : 'タップで確認'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-[#F0DDE4] flex items-center justify-between text-xs text-[#555555]">
            <span>
              確認状況: <strong className="text-[#D8175D] font-bold">{Object.values(checkedList).filter(Boolean).length}</strong> / {checklistItems.length}
            </span>
            <button
              type="button"
              onClick={() => {
                const all: Record<number, boolean> = {};
                checklistItems.forEach((_, i) => (all[i] = true));
                setCheckedList(all);
              }}
              className="text-xs text-[#D8175D] hover:underline font-bold cursor-pointer"
            >
              すべてチェックする
            </button>
          </div>
        </div>
      </section>

      {/* 7. 当店の寮・通勤環境について (信太山駅周辺の寮・実際の寮の室内写真を優先) */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 mb-8">
            <div className="flex-1">
              <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
                HOUSING & COMMUTE
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#1F2432] mb-3">
                通勤や生活環境についても事前にご相談ください
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-4">
                勤務先だけでなく、通勤方法や生活環境についても気になることがあると思います。<br />
                当店では、信太山駅周辺の寮について、場所・設備・利用条件などを事前にご案内します。
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#1F2432]">
                <span className="bg-[#FFF1F5] text-[#D8175D] px-3 py-1 rounded-full border border-[#F0DDE4]">
                  信太山駅周辺の寮
                </span>
                <span className="bg-[#FFF1F5] text-[#D8175D] px-3 py-1 rounded-full border border-[#F0DDE4]">
                  生活圏と分けた安心環境
                </span>
              </div>
            </div>
            <div className="w-full md:w-[320px] shrink-0">
              <div className="rounded-[18px] overflow-hidden border border-[#F0DDE4] shadow-xs aspect-[4/3] bg-rose-50">
                <img
                  src="/images/dorm_main_studio_1794374510330.jpg"
                  alt="信太山駅近辺の寮の室内環境（生活に必要なベッド・テーブル・収納を備えた個室）"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-[11px] text-[#777777] text-center mt-2">
                信太山駅近辺の寮｜清潔で落ち着いた実際の生活環境
              </p>
            </div>
          </div>

          {/* 掲載する内容のグリッド */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              {
                title: '寮の所在地・勤務先までの距離',
                desc: '信太山駅近辺に位置し、通勤ルートや距離についても事前に詳しく確認できます。',
                icon: 'MapPin'
              },
              {
                title: '室内設備・生活環境',
                desc: 'ベッド・収納・冷暖房・家具家電など、実際に利用できる設備をご案内します。',
                icon: 'Home'
              },
              {
                title: '寮の利用条件',
                desc: '利用可能な期間や入寮タイミングなど、希望に合わせた条件をご確認いただけます。',
                icon: 'CalendarCheck'
              },
              {
                title: '寮費・光熱費などの費用',
                desc: '毎月必要な費用について曖昧にせず、事前に明確な条件をご説明します。',
                icon: 'Coins'
              },
              {
                title: '入居可能な時期',
                desc: '空き状況や手続きの流れを確認し、希望する入寮時期に合わせてご案内します。',
                icon: 'Clock'
              },
              {
                title: '通勤方法や周辺環境',
                desc: '店舗までの移動方法や駅周辺の治安・生活環境など、気になる点をご確認いただけます。',
                icon: 'Navigation'
              }
            ].map((box, i) => (
              <div
                key={i}
                className="bg-[#FFFAFC] rounded-[16px] p-4 border border-[#F0DDE4] shadow-2xs"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <LucideIcon name={box.icon} size={15} className="text-[#D8175D]" />
                  <h3 className="font-bold text-xs sm:text-sm text-[#1F2432]">
                    {box.title}
                  </h3>
                </div>
                <p className="text-[11px] sm:text-xs text-[#555555] leading-relaxed">
                  {box.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. お店選びでよくある不安 (4つのカード) */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
            ANXIETIES & ANSWERS
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
            身バレ・安全についてよくある不安
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            応募前に女性から多く寄せられる不安と、当店の考え方や対応方針をお伝えします。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            {
              num: '01',
              title: '家族や友人に知られずに働けますか？',
              answer: '完全に知られないことを保証することはできませんが、写真の取り扱いや通勤方法など、身バレにつながる可能性を減らすための対策について相談できます。生活圏と重ならない働き方を一緒に考えます。'
            },
            {
              num: '02',
              title: '顔写真を出さずに働けますか？',
              answer: '写真掲載の有無や顔出しの条件については、実際の募集条件をご確認ください。当店では無理な顔出しを強要することは一切ありませんので、希望がある場合は応募前にご相談ください。'
            },
            {
              num: '03',
              title: '個人情報が外部に漏れることはありませんか？',
              answer: '個人情報の利用目的や管理方法について、入店前に確認できるようにしています。お預かりした情報は法令に基づき適切に管理し、店内では源氏名で業務を行います。'
            },
            {
              num: '04',
              title: 'お客様とのトラブルが心配です。',
              answer: '接客上のルールやトラブル発生時の対応、相談できるスタッフについて事前に確認しましょう。当店では無理な接客を強制せず、女性スタッフや仲居がいつでも対応できる体制を整えています。'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFAFC] rounded-[18px] p-5 border border-[#F0DDE4] shadow-2xs flex flex-col justify-between hover:border-[#D8175D]/40 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-2.5 py-0.5 rounded border border-[#F0DDE4]">
                    {item.num}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-[#1F2432]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. 関連記事 */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1 block">
              RELATED ARTICLES
            </span>
            <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl text-[#1F2432]">
              身バレ・安全に関するおすすめ記事
            </h2>
          </div>
          {onNavigateBlog && (
            <button
              type="button"
              onClick={() => onNavigateBlog()}
              className="text-xs font-bold text-[#D8175D] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>コラム一覧へ</span>
              <LucideIcon name="ArrowRight" size={14} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedArticles.map((art, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateBlog && onNavigateBlog(art.slug)}
              className="bg-[#FFFAFC] rounded-[16px] border border-[#F0DDE4] p-4 flex flex-col justify-between hover:border-[#D8175D]/40 transition-colors shadow-2xs cursor-pointer group"
            >
              <div>
                <span className="inline-block bg-[#FFF1F5] text-[#D8175D] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#F0DDE4] mb-2">
                  {art.tag}
                </span>
                <h3 className="font-bold text-xs sm:text-sm text-[#1F2432] group-hover:text-[#D8175D] transition-colors leading-snug mb-1.5">
                  {art.title}
                </h3>
                <p className="text-[11px] text-[#666666] leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#F0DDE4]/60 text-[11px] text-[#D8175D] font-bold flex items-center justify-end gap-1">
                <span>詳しく読む</span>
                <LucideIcon name="ChevronRight" size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. よくある質問 (既存FAQを整理してアコーディオンで活用) */}
      <section className="bg-white rounded-[24px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.04)]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-[11px] font-bold tracking-widest text-[#D8175D] uppercase mb-1.5 block">
            FAQ
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-[#1F2432] mb-3">
            身バレ・安全に関するよくある質問
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            プライバシー保護やトラブル対応に関して、女性から多くいただく質問にお答えします。
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {safetyFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-[16px] border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-[#D8175D]/40 bg-[#FFF5F8]/40 ring-1 ring-[#D8175D]/20'
                    : 'border-[#F0DDE4] bg-[#FFFAFC] hover:border-[#D8175D]/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span className="font-bold text-xs sm:text-sm text-[#1F2432] flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#D8175D] text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      Q
                    </span>
                    <span className="leading-snug">{faq.q}</span>
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white border border-[#F0DDE4] flex items-center justify-center text-[#D8175D] shrink-0">
                    <LucideIcon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={14} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-[#555555] leading-relaxed border-t border-[#F0DDE4]/60 bg-white">
                    <div className="flex items-start gap-2.5 pt-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        A
                      </span>
                      <p className="leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. 最後のLINE相談エリア */}
      <section className="bg-white rounded-[22px] p-6 sm:p-9 border border-[#F0DDE4] shadow-[0_4px_25px_-5px_rgba(216,23,93,0.06)] text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D8175D] bg-[#FFF1F5] px-3 py-1 rounded-full border border-[#F0DDE4] mb-3">
          <LucideIcon name="MessageCircle" size={13} />
          <span>24時間受付中</span>
        </div>

        <h2 className="font-display font-extrabold text-lg sm:text-xl md:text-[22px] text-[#1F2432] mb-2">
          身バレや安全面が心配な方も、お気軽にご相談ください
        </h2>

        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 max-w-lg mx-auto">
          「家族に知られたくない」「顔写真を出したくない」「個人情報の管理が気になる」など、応募前の不安もお気軽にご相談ください。<br className="hidden sm:inline" />
          気になることを一つずつ確認し、納得したうえで働き方を検討していただけるようご案内します。
        </p>

        <div className="flex flex-col items-center">
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLineClick}
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-[#06C755] hover:bg-[#05b34c] active:bg-[#049b42] text-white py-3.5 px-8 rounded-full font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-[#06C755]/25 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            id="safety-page-final-line-btn"
          >
            <LucideIcon name="MessageCircle" size={18} className="fill-white shrink-0" />
            <span>LINEで身バレ・安全について相談する</span>
          </a>

          <span className="text-xs text-[#777777] font-medium mt-2.5">
            質問だけでも大歓迎｜女性スタッフが丁寧にお答えします。
          </span>
        </div>
      </section>

    </div>
  );
}
