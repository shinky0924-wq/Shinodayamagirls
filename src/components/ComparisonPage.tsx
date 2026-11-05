/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { 
  SITE_COMPARISON_ROWS, 
  AREA_COMPARISON_ROWS,
  SHINODAYAMA_KEY_METRICS,
  COURSE_REWARD_SCHEDULE,
  TARGET_JOB_CATEGORIES, 
  TargetJobCategory,
  ComparisonRow,
  AreaComparisonRow 
} from '../compareData';
import { CONSULTANT_AVATAR_URL } from '../data';
import { FAQ_100_LIST, FAQ_8_CATEGORIES, FAQ100Item } from '../faq100Data';
import CompareDiagnostic from './CompareDiagnostic';

const CATEGORY_SALARY_SCHEMA: Record<string, { min: number; max: number; employmentType: string }> = {
  'inexperienced': { min: 30000, max: 65000, employmentType: 'PART_TIME' },
  'high-income': { min: 60000, max: 150000, employmentType: 'PART_TIME' },
  'weekly-1': { min: 35000, max: 80000, employmentType: 'PART_TIME' },
  'short-term': { min: 50000, max: 120000, employmentType: 'TEMPORARY' },
  'dormitory': { min: 40000, max: 90000, employmentType: 'PART_TIME' },
  'double-work': { min: 35000, max: 70000, employmentType: 'PART_TIME' },
  'age-20s': { min: 45000, max: 110000, employmentType: 'PART_TIME' },
  'age-30s': { min: 40000, max: 90000, employmentType: 'PART_TIME' }
};

const CATEGORY_IMAGES: Record<string, { image: string; tag: string }> = {
  'inexperienced': { image: '/images/hub_beginner_cast_1792485407920.jpg', tag: '未経験率約90%' },
  'high-income': { image: '/images/col_salary_yen_1792463652387.jpg', tag: '即日全額日払い' },
  'weekly-1': { image: '/images/col_daytime_clock_jp_1792476810942.jpg', tag: '完全自由出勤' },
  'short-term': { image: '/images/col_short_term_1792473989733.jpg', tag: '短期・即日体入OK' },
  'dormitory': { image: '/images/col_dorm_interior_1792463651469.jpg', tag: '家具家電付き個室寮' },
  'double-work': { image: '/images/col_double_work_jp_1792475554864.jpg', tag: '身バレ・副業対策万全' },
  'age-20s': { image: '/images/shinodayama_cast_ayaka_1792486845624.jpg', tag: '20代未経験歓迎' },
  'age-30s': { image: '/images/col_mature_beauty_jp_1792476778964.jpg', tag: '30代・40代活躍中' }
};

const COMPARE_PAGE_FAQS = [
  {
    q: '本当に自分でもできますか？未経験でも大丈夫？',
    a: '在籍しているキャスト女性の90%以上がナイトワーク完全未経験からのスタートです。難しい専門知識や営業は一切不要で、笑顔でのご挨拶ができれば問題ありません。コースは15分から60分と短時間で、仲居さんがお客様とのマッチングやタイマー時間管理・お部屋の掃除までサポートします。初日の就業前に専任の女性スタッフが丁寧にレクチャーしますので、安心してご応募ください。'
  },
  {
    q: '怖くないですか？無理なことを強要されたりしませんか？',
    a: '信太山新地は旅館直営の厳格な自主ルールと女性保護体制のもとで運営されています。組合ルールとしてゴムなし行為は禁止されており、安全面が徹底されています。嫌がるリクエストや無理な要求は断ることができ、強引な場合はサービスを中断して退室しても問題ありません。お酒に酔われている方、未成年の方、日本語での会話が難しいお客様はお断りするルールになっており、常駐する仲居さんや女性スタッフがすぐに助けてくれます。'
  },
  {
    q: '身バレが心配です。写真がネットに出たり家族にバレたりしませんか？',
    a: '信太山新地は店先での顔見せが一切なく、個室や専用スタンド待機のため通りから顔を見られる心配がありません。求人サイトやSNSへの写真掲載も100%なく、お仕事は完全源氏名（偽名）で行い、私服通勤や車・バイク通勤（専用駐車場完備）、送迎も利用できるため身バレのリスクは極めて低いです。また確定申告時の普通徴収（会社や家族に通知がいかない手続き）も丁寧にサポートしています。'
  },
  {
    q: 'お酒が全く飲めないのですが働けますか？',
    a: 'はい、全く問題ありません！信太山新地のおもてなしはお茶やジュースなどのソフトドリンクで行うため、お酒を飲む必要は一切ありません。二日酔いや体調不良の心配がなく、翌日の昼職や大学、家庭の予定にも全く支障が出ません。'
  },
  {
    q: 'いきなり応募・面接を決めなくても、まずは相談だけできますか？',
    a: 'もちろん大歓迎です！「週1日でも大丈夫？」「未経験だけど稼げる？」「寮の空き状況を知りたい」など、疑問や不安の質問だけでも親身に対応いたします。条件や環境を確認してから、自分に合うかどうかじっくりご検討いただけます。'
  },
  {
    q: '体験入店してみて、自分に合わなかったら断れますか？',
    a: 'はい、もちろん断っていただけます。当日働いた分の支給額（15分3,800円〜）はその場で全額手渡しで受け取ることができ、「合わなかった」「自分には難しそう」と感じた場合はその日のうちに終了可能です。違約金・ペナルティ・無理な引き止めは一切ありませんのでご安心ください。'
  }
];

const ONBOARDING_FLOW_STEPS = [
  {
    step: '01',
    title: '公式LINEで気軽にお問い合わせ',
    desc: '完全匿名でOK。「質問だけ」「条件の確認だけ」も大歓迎です。24時間いつでも女性スタッフが丁寧に対応します。',
    icon: 'MessageCircle'
  },
  {
    step: '02',
    title: '私服で店舗見学・カウンセリング',
    desc: '履歴書不要・手ぶらでOK。お店の雰囲気や控え室を実際に見学し、希望のシフトや不安な点をゆっくり相談できます。',
    icon: 'Coffee'
  },
  {
    step: '03',
    title: 'お試し体験入店（体入）',
    desc: '着物や衣装・ヘアメイクはすべて無料レンタル。仲居さんが隣でサポートしながら、無理のないペースでお仕事開始。',
    icon: 'Sparkles'
  },
  {
    step: '04',
    title: '稼いだ給料を即日全額現金手渡し',
    desc: 'その日のお仕事終了後、当日の給料を全額その場で現金手渡し支給。不当な引かれ物や天引きは一切ありません。',
    icon: 'Coins'
  },
  {
    step: '05',
    title: '継続または終了の自由選択',
    desc: '「自分に合っている」と思えばそのまま本入店へ。もし合わなければその日だけで終了しても違約金・ペナルティは0円です。',
    icon: 'CheckCircle2'
  }
];

const SPEC_ROWS = [
  { label: '職種', val: '旅館コンパニオン接客（洋室個室・ベッドでの短時間接客・絶対ゴム着用）※仲居スタッフ業務もあり' },
  { label: '応募資格', val: '20歳以上の健康な女性（※20歳未満不可／未経験歓迎・20代〜40代幅広く歓迎）' },
  { label: '給与システム', val: '15分短時間コース制（15分3,800円・30分7,600円・45分11,400円・60分15,200円）＋時給1万円保証・日給保証制度（想定日給 50,000円〜100,000円以上）完全即日全額現金手渡し' },
  { label: '勤務時間', val: '11:00〜24:00の間で完全自由出勤（短時間〜、昼シフト・夜シフト・終電上がりOK）' },
  { label: '勤務日数', val: '週1日〜・月数日・週末のみ・短期出稼ぎ・長期レギュラーいずれも自由（※毎月20日はエリア一斉定休日）' },
  { label: '勤務地', val: '大阪府和泉市（信太山新地 旅館街）' },
  { label: '最寄り駅', val: 'JR阪和線「信太山駅」徒歩5分 / 主要駅からの送迎サービスあり / 専用駐車場完備（マイカー・バイク通勤OK）' },
  { label: '待遇・福利厚生', val: '店先顔見せなし（個室待機）、家電付き個室マンション寮完備（出稼ぎ日額0〜2,000円）、託児所完備・託児費補助、地方からの往復交通費全額支給、衣装無料貸出、写真ネット非掲載厳守、お酒不要、ノルマ・違約金完全0円' },
  { label: '持参書類', val: '公的身分証明書（顔写真付き身分証：免許証・パスポート・マイナンバーカード等）※履歴書は不要です' }
];

interface ComparisonPageProps {
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onNavigateTopic?: (topicId: string) => void;
  onNavigateFaq?: (category?: string) => void;
  onCtaclick: () => void;
  onInjectedScroll?: (message: string) => void;
  initialCategorySlug?: string | null;
  onSelectCategorySlug?: (slug: string) => void;
}

export default function ComparisonPage({
  onNavigateHome,
  onNavigateBlog,
  onNavigateTopic,
  onNavigateFaq,
  onCtaclick,
  onInjectedScroll,
  initialCategorySlug,
  onSelectCategorySlug
}: ComparisonPageProps) {
  const [selectedTargetSlug, setSelectedTargetSlug] = useState<string>(
    initialCategorySlug || 'all'
  );
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [showMatrixOnCategoryPage, setShowMatrixOnCategoryPage] = useState<boolean>(false);
  const [activeComparisonTab, setActiveComparisonTab] = useState<'area' | 'channel'>('area');
  const [faqCategory, setFaqCategory] = useState<string>('featured');
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [visibleFaqCount, setVisibleFaqCount] = useState<number>(8);

  const filteredFaqs = useMemo(() => {
    if (faqCategory === 'featured' && !faqSearchQuery.trim()) {
      return null;
    }

    const query = faqSearchQuery.trim().toLowerCase();
    let list: FAQ100Item[] = FAQ_100_LIST;

    if (faqCategory !== 'all' && faqCategory !== 'featured') {
      list = list.filter(item => item.eightCategory === faqCategory);
    }

    if (query) {
      list = list.filter(item => 
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        (item.keywords && item.keywords.some(k => k.toLowerCase().includes(query))) ||
        (item.categoryLabel && item.categoryLabel.toLowerCase().includes(query))
      );
    }

    return list;
  }, [faqCategory, faqSearchQuery]);

  // Sync internal state when initialCategorySlug changes from outside (URL change, back/forward)
  useEffect(() => {
    if (initialCategorySlug) {
      setSelectedTargetSlug(initialCategorySlug);
    } else {
      setSelectedTargetSlug('all');
    }
  }, [initialCategorySlug]);

  // Dynamically update document title, description and canonical URL based on selected category
  useEffect(() => {
    let title = '安心の理由＆あなたにぴったりの働き方ガイド【2026年最新】｜信太山ガールズ';
    let description = '信太山新地で安心して働ける理由（旅館直営とスカウト業者の違い）と、未経験・高収入・週1日・短期出稼ぎ・寮希望などタイプ別の働き方ガイド。店先顔見せなし・個室待機・即日全額日払い。';
    let canonicalUrl = 'https://shinodayamashinchi-recruit.com/compare';

    if (selectedTargetSlug && selectedTargetSlug !== 'all') {
      const cat = TARGET_JOB_CATEGORIES.find(c => c.slug === selectedTargetSlug);
      if (cat) {
        title = `${cat.title}｜信太山新地旅館直営公式 信太山ガールズ`;
        description = cat.summary || `${cat.title}についての求人情報・給与・勤務条件・安全対策を詳しく解説。`;
        canonicalUrl = `https://shinodayamashinchi-recruit.com/compare/${cat.slug}`;
      }
    }
    document.title = title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalLink);
    }
    // Update og:url and og:title
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
  }, [selectedTargetSlug]);

  // Inject JSON-LD Structured Data for LLM & SEO Crawlers
  useEffect(() => {
    const existingScript = document.getElementById('comparison-schema');
    if (existingScript) existingScript.remove();

    try {
      const script = document.createElement('script');
      script.id = 'comparison-schema';
      script.type = 'application/ld+json';

      const isSingle = selectedTargetSlug !== 'all';
      const singleCat = isSingle ? TARGET_JOB_CATEGORIES.find(c => c.slug === selectedTargetSlug) : null;
      const salaryConfig = (singleCat && CATEGORY_SALARY_SCHEMA[singleCat.slug]) || {
        min: 40000,
        max: 100000,
        employmentType: 'PART_TIME'
      };

      const schemaData = singleCat ? {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        '@id': `https://shinodayamashinchi-recruit.com/compare/${singleCat.slug}#jobposting`,
        'title': `信太山新地 ${singleCat.title}（旅館個室接客・即日全額日払い）`,
        'description': `信太山新地（大阪府和泉市）の老舗旅館直営求人。【${singleCat.title}】${singleCat.summary} ${singleCat.llmDirectAnswer}店先顔見せなし・完全個室待機・15分短時間コース・全額日払い手渡し・時給1万円保証・ノルマ罰金一切なし・個室マンション寮完備・託児支援・安心の女性スタッフサポート。`,
        'identifier': {
          '@type': 'PropertyValue',
          'name': '信太山ガールズ 旅館直営採用窓口',
          'value': `SHINODAYAMA-COMPARE-${singleCat.slug.toUpperCase()}`
        },
        'datePosted': '2026-10-25T00:00:00+09:00',
        'validThrough': '2027-12-31T23:59:59+09:00',
        'employmentType': salaryConfig.employmentType,
        'jobBenefits': [
          '店先顔見せなし（旅館個室待機）',
          '15分短時間コース制（15分3,800円）',
          '時給1万円保証＆待機時間に応じた日給保証',
          '毎月20日エリア一斉定休日',
          '即日全額日払い（手渡し支給）',
          '家電付き個室寮完備（出稼ぎ1日0〜2,000円）',
          '託児所の完備＆託児費用負担制度',
          '専用駐車場完備（車・バイク通勤可）＆送迎あり',
          '全国からの往復交通費全額支給',
          '衣装無料レンタル＆アメニティ完備',
          '専任女性スタッフによるサポート体制',
          'ノルマ・罰金・連絡先交換・お酒の強要一切なし'
        ],
        'hiringOrganization': {
          '@type': 'Organization',
          'name': '信太山新地 旅館直営求人（信太山ガールズ）',
          'sameAs': 'https://shinodayamashinchi-recruit.com',
          'logo': 'https://shinodayamashinchi-recruit.com/favicon.png'
        },
        'jobLocation': {
          '@type': 'Place',
          'name': '信太山新地 旅館街（直営店舗・個室待機）',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': '幸二丁目（信太山新地 旅館街）',
            'addressLocality': '和泉市',
            'addressRegion': '大阪府',
            'postalCode': '594-0003',
            'addressCountry': 'JP'
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 34.4984,
            'longitude': 135.4371
          },
          'hasMap': 'https://maps.google.com/?q=信太山駅'
        },
        'baseSalary': {
          '@type': 'MonetaryAmount',
          'currency': 'JPY',
          'value': {
            '@type': 'QuantitativeValue',
            'minValue': salaryConfig.min,
            'maxValue': salaryConfig.max,
            'unitText': 'DAY'
          }
        },
        'applicantLocationRequirements': {
          '@type': 'Country',
          'name': 'JP'
        },
        'inLanguage': 'ja-JP',
        'jobImmediateStart': true,
        'speakable': {
          '@type': 'SpeakableSpecification',
          'cssSelector': ['#llm-direct-answer-text', 'h1']
        },
        'workHours': singleCat.shiftExample || '11:00〜24:00（自由シフト制・週1日〜/短時間勤務可）',
        'qualifications': '20歳以上の女性（未経験歓迎・学歴経験不問・20代〜40代歓迎 ※20歳未満不可）',
        'directApply': true
      } : {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://shinodayamashinchi-recruit.com/compare',
        'name': '信太山新地 安心の理由＆タイプ別働き方ガイド【2026年最新】｜信太山ガールズ',
        'description': '信太山新地の旅館直営公式採用の安心の理由と、未経験・高収入・週1日・短期出稼ぎ・寮付き・Wワーク・20代・30代・40代などタイプ別の働き方ガイド。店先顔出しなし100%、未経験率92%、天引き0円、最短15分3,800円〜、時給1万円保証、即日全額日払い。',
        'url': 'https://shinodayamashinchi-recruit.com/compare',
        'about': [
          {
            '@type': 'Thing',
            'name': '信太山新地 飛田新地 松島新地 比較表',
            'description': '大阪三大新地（信太山新地・飛田新地・松島新地）および一般ナイトワークの店先顔出し、コース時間、日給相場、年齢層、未経験率、天引き、定休日の比較データ。'
          },
          {
            '@type': 'Thing',
            'name': '数字で見る信太山新地公式データ',
            'description': '未経験率92%、天引き0円、最低時給保証10,000円/h、即日日払い率100%、店先顔出し0%、平均日給68,000円〜120,000円、毎月20日エリア一斉定休日。'
          }
        ],
        'mainEntity': {
          '@type': 'ItemList',
          'name': '信太山新地 タイプ別の働き方ガイド',
          'itemListElement': TARGET_JOB_CATEGORIES.map((cat, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'name': cat.title,
            'description': cat.llmDirectAnswer
          }))
        }
      };

      script.textContent = JSON.stringify(schemaData);
      document.head.appendChild(script);
    } catch (e) {
      console.warn('Could not inject comparison schema', e);
    }

    return () => {
      const script = document.getElementById('comparison-schema');
      if (script) script.remove();
    };
  }, [selectedTargetSlug]);

  const handleCategorySelect = (slug: string) => {
    setSelectedTargetSlug(slug);
    if (onSelectCategorySlug) {
      onSelectCategorySlug(slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentCategory = useMemo(() => {
    if (selectedTargetSlug === 'all') return null;
    return TARGET_JOB_CATEGORIES.find(c => c.slug === selectedTargetSlug) || null;
  }, [selectedTargetSlug]);

  const otherCategories = useMemo(() => {
    if (!currentCategory) return [];
    return TARGET_JOB_CATEGORIES.filter(c => c.slug !== currentCategory.slug);
  }, [currentCategory]);

  const handleApplyWithCategory = (category: TargetJobCategory) => {
    const defaultMsg = `【${category.title}の相談】\n${category.title}について興味があります。シフトや日給、面接の流れについて詳しく教えていただけますでしょうか？`;
    if (onInjectedScroll) {
      onInjectedScroll(defaultMsg);
    } else {
      onCtaclick();
    }
  };

  const handleConsultSituation = (situationTitle: string, customMessage?: string) => {
    const msg = customMessage || `【働き方診断：${situationTitle}の相談】\n「${situationTitle}」について興味があります。自分に合った働き方やシフト・給与について教えていただけますでしょうか？`;
    if (onInjectedScroll) {
      onInjectedScroll(msg);
    } else {
      onCtaclick();
    }
  };

  const handleScrollToSafety = () => {
    const el = document.getElementById('section-safety') || document.getElementById('section-benefits');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderGradeBadge = (grade: ComparisonRow['ourShop']['grade']) => {
    switch (grade) {
      case 'excellent':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full">
            <span className="text-sm">◎</span> 最適・優良
          </span>
        );
      case 'good':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-800 text-xs font-bold px-2 py-0.5 rounded-full">
            <span className="text-sm">◯</span> 良好
          </span>
        );
      case 'average':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            <span className="text-sm">△</span> 普通・注意
          </span>
        );
      case 'poor':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded-full">
            <span className="text-sm">✕</span> 不利・危険
          </span>
        );
    }
  };

  return (
    <article className="min-h-screen bg-gradient-to-b from-rose-50/40 via-white to-rose-50/30 pt-24 pb-20 font-sans text-on-surface">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        
        {/* ==========================================
            Breadcrumb Navigation
           ========================================== */}
        <nav aria-label="パンくずリスト" className="mb-6">
          <ol
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            className="flex flex-wrap items-center gap-2 text-xs text-zinc-500"
          >
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-2"
            >
              <button 
                type="button" 
                onClick={onNavigateHome}
                className="hover:text-secondary transition-colors underline cursor-pointer"
              >
                <span itemProp="name">トップ（求人総合）</span>
              </button>
              <meta itemProp="position" content="1" />
              <meta itemProp="item" content="https://shinodayamashinchi-recruit.com/" />
              <span>/</span>
            </li>
            {currentCategory ? (
              <>
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('all')}
                    className="hover:text-secondary transition-colors underline cursor-pointer"
                  >
                    <span itemProp="name">安心の理由＆タイプ別の働き方</span>
                  </button>
                  <meta itemProp="position" content="2" />
                  <meta itemProp="item" content="https://shinodayamashinchi-recruit.com/compare" />
                  <span>/</span>
                </li>
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  className="text-zinc-800 font-bold"
                >
                  <span itemProp="name">{currentCategory.title}</span>
                  <meta itemProp="position" content="3" />
                  <meta itemProp="item" content={`https://shinodayamashinchi-recruit.com/compare/${currentCategory.slug}`} />
                </li>
              </>
            ) : (
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="text-zinc-800 font-bold"
              >
                <span itemProp="name">安心の理由＆タイプ別の働き方ガイド</span>
                <meta itemProp="position" content="2" />
                <meta itemProp="item" content="https://shinodayamashinchi-recruit.com/compare" />
              </li>
            )}
          </ol>
        </nav>

        {/* ==========================================
            MODE A: DEDICATED CATEGORY PAGE VIEW
           ========================================== */}
        {currentCategory ? (
          <div>
            {/* Category Dedicated Hero */}
            <header className="bg-white rounded-3xl border border-rose-100/90 shadow-md p-6 sm:p-10 mb-8 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs sm:text-sm font-black text-white bg-secondary px-3.5 py-1 rounded-full shadow-2xs">
                      {currentCategory.badge}
                    </span>
                    <span className="text-xs text-zinc-500 font-semibold bg-zinc-100 px-3 py-1 rounded-full">
                      対象: {currentCategory.targetUser}
                    </span>
                  </div>

                  <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-on-surface leading-tight mb-3">
                    {currentCategory.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-secondary font-bold tracking-wide mb-4">
                    信太山新地 旅館直営 採用・待遇完全ガイド
                  </p>

                  <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-700 leading-relaxed">
                    {currentCategory.summary}
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <div className="relative rounded-2xl overflow-hidden border border-rose-200 shadow-sm h-48 sm:h-56 group bg-rose-50">
                    <img
                      src={CATEGORY_IMAGES[currentCategory.slug]?.image || '/images/shinodayama_hero_banner_1792225964954.jpg'}
                      alt={currentCategory.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-3 text-white text-[11px] font-bold bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      {CATEGORY_IMAGES[currentCategory.slug]?.tag || currentCategory.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Answer Callout for AI Search Bots (LLMO) */}
              <section
                id="llm-direct-answer"
                aria-label={`${currentCategory.title}の安心ポイントまとめ`}
                data-entity-type="DirectAnswer"
                itemScope
                itemType="https://schema.org/Answer"
                className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-rose-50/80 via-pink-50/50 to-white rounded-2xl border border-rose-200/90"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-secondary font-black text-xs sm:text-sm">
                    <LucideIcon name="Sparkles" size={16} />
                    <span>【ここだけ読めばOK】{currentCategory.title}の安心ポイント</span>
                  </div>
                  <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">
                    旅館直営・安心公式
                  </span>
                </div>
                <p
                  id="llm-direct-answer-text"
                  itemProp="text"
                  className="text-xs sm:text-sm text-[#3c2a2e] leading-relaxed font-semibold"
                >
                  {currentCategory.llmDirectAnswer}
                </p>
              </section>

              {/* Core 4-Box Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="bg-zinc-50/90 rounded-2xl p-4 border border-zinc-200/70">
                  <div className="text-[11px] font-bold text-zinc-500 mb-1 flex items-center gap-1">
                    <LucideIcon name="Coins" size={13} className="text-secondary" />
                    想定日給モデル
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-secondary">
                    {currentCategory.dailyIncomeModel}
                  </div>
                </div>

                <div className="bg-zinc-50/90 rounded-2xl p-4 border border-zinc-200/70">
                  <div className="text-[11px] font-bold text-zinc-500 mb-1 flex items-center gap-1">
                    <LucideIcon name="TrendingUp" size={13} className="text-secondary" />
                    平均月収目安
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-zinc-800">
                    {currentCategory.monthlyIncomeModel}
                  </div>
                </div>

                <div className="bg-zinc-50/90 rounded-2xl p-4 border border-zinc-200/70">
                  <div className="text-[11px] font-bold text-zinc-500 mb-1 flex items-center gap-1">
                    <LucideIcon name="MapPin" size={13} className="text-secondary" />
                    おすすめの通り
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-zinc-800">
                    {currentCategory.recommendedStreet}
                  </div>
                </div>

                <div className="bg-zinc-50/90 rounded-2xl p-4 border border-zinc-200/70">
                  <div className="text-[11px] font-bold text-zinc-500 mb-1 flex items-center gap-1">
                    <LucideIcon name="Clock" size={13} className="text-secondary" />
                    勤務シフト例
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-zinc-800">
                    {currentCategory.shiftExample}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleApplyWithCategory(currentCategory)}
                  className="bg-[#06c755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-black px-6 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <LucideIcon name="MessageCircle" size={16} />
                  <span>信太山新地の当店へ応募！（{currentCategory.title}）LINEで相談する</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs sm:text-sm font-bold px-4 py-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LucideIcon name="Layers" size={15} />
                  <span>全8タイプの働き方一覧を見る</span>
                </button>
              </div>
            </header>

            {/* Quick Switch Pills */}
            <div className="mb-10">
              <div className="text-xs font-bold text-zinc-500 mb-2 flex items-center gap-1">
                <LucideIcon name="Filter" size={13} />
                <span>働き方タイプを切り替える</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className="flex-shrink-0 whitespace-nowrap text-xs sm:text-sm font-bold px-4 py-2 rounded-2xl transition-all cursor-pointer border bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200"
                >
                  全8タイプの働き方一覧
                </button>
                {TARGET_JOB_CATEGORIES.map(cat => {
                  const isSelected = selectedTargetSlug === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.slug)}
                      className={`flex-shrink-0 whitespace-nowrap text-xs sm:text-sm font-bold px-3.5 py-2 rounded-2xl transition-all cursor-pointer border flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-secondary text-white border-secondary shadow-sm'
                          : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200'
                      }`}
                    >
                      <span className="whitespace-nowrap">{cat.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category In-Depth Merits and Support */}
            <section className="bg-white rounded-3xl border border-rose-100/90 shadow-md p-6 sm:p-8 mb-10">
              <h2 className="font-display font-black text-xl sm:text-2xl text-on-surface mb-6 flex items-center gap-2">
                <LucideIcon name="CheckCircle2" size={22} className="text-secondary" />
                <span>{currentCategory.title}の詳しいメリット＆旅館直営サポート</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-extrabold text-zinc-900 mb-4 flex items-center gap-2 border-b border-rose-100 pb-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">✔</span>
                    <span>4大メリット</span>
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-zinc-700">
                    {currentCategory.merits.map(m => (
                      <li key={m} className="flex items-start gap-2.5">
                        <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                        <span className="leading-relaxed">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-zinc-900 mb-4 flex items-center gap-2 border-b border-rose-100 pb-2">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-secondary text-xs flex items-center justify-center font-bold">★</span>
                    <span>旅館直営ならではの手厚いサポート</span>
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-zinc-700">
                    {currentCategory.supportFeatures.map(f => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="text-secondary font-bold mt-0.5">★</span>
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Demerits or Notes if any */}
              {currentCategory.demeritsOrNotes && currentCategory.demeritsOrNotes.length > 0 && (
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 mb-8 text-xs sm:text-sm">
                  <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                    <LucideIcon name="AlertCircle" size={15} />
                    <span>ご留意事項</span>
                  </div>
                  <ul className="space-y-1 text-amber-900/90 pl-5 list-disc">
                    {currentCategory.demeritsOrNotes.map(n => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQs Accordion */}
              {currentCategory.faqs && currentCategory.faqs.length > 0 && (
                <div className="border-t border-rose-100 pt-6">
                  <h3 className="text-sm font-extrabold text-zinc-800 mb-4 flex items-center gap-1.5">
                    <LucideIcon name="HelpCircle" size={16} className="text-secondary" />
                    <span>よくある質問（{currentCategory.title}）</span>
                  </h3>
                  <div className="space-y-3">
                    {currentCategory.faqs.map((faq, fIdx) => {
                      const faqKey = `${currentCategory.id}-faq-${fIdx}`;
                      const isOpen = expandedFaqId === faqKey;
                      return (
                        <div 
                          key={faq.q}
                          className="bg-rose-50/30 rounded-xl border border-rose-100/60 overflow-hidden text-xs sm:text-sm"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedFaqId(isOpen ? null : faqKey)}
                            className="w-full text-left p-3.5 font-bold text-zinc-800 flex items-center justify-between gap-2 hover:text-secondary cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-secondary font-black">Q.</span>
                              <span>{faq.q}</span>
                            </span>
                            <LucideIcon 
                              name="ChevronDown" 
                              size={16} 
                              className={`transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-secondary' : 'text-zinc-400'}`} 
                            />
                          </button>
                          {isOpen && (
                            <div className="px-3.5 pb-3.5 pt-1 text-zinc-600 border-t border-rose-100/50 flex gap-2">
                              <span className="text-secondary font-black">A.</span>
                              <p className="leading-relaxed font-medium">{faq.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Contextual Cross-Link to Official Topic Cluster (Internal Linking Network) */}
              {onNavigateTopic && (
                <div className="mt-8 p-5 bg-gradient-to-r from-rose-100/60 via-pink-50 to-white rounded-2xl border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <LucideIcon name="Compass" size={20} />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-rose-700">公式分野別ガイド連動</div>
                      <div className="text-sm font-bold text-zinc-900">
                        {currentCategory.title}に関する公式分野別ガイドを詳しく読む
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const clusterMap: Record<string, string> = {
                        inexperienced: 'beginner',
                        'high-income': 'salary',
                        'weekly-1': 'workstyle',
                        'short-term': 'flow',
                        dormitory: 'dorm',
                        'double-work': 'safety',
                        'age-20s': 'beginner',
                        'age-30s': 'experienced'
                      };
                      const target = clusterMap[currentCategory.slug] || 'job';
                      onNavigateTopic(target);
                    }}
                    className="shrink-0 px-4 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-rose-300 font-bold text-xs shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>公式分野別ガイドを見る</span>
                    <LucideIcon name="ArrowRight" size={13} />
                  </button>
                </div>
              )}
            </section>

            {/* Other Categories Cards Grid */}
            <section className="mb-12">
              <div className="text-center max-w-xl mx-auto mb-6">
                <h3 className="font-display font-black text-lg sm:text-xl text-on-surface mb-2">
                  他の働き方タイプを探す
                </h3>
                <p className="text-xs text-zinc-500">
                  あなたの生活スタイルに合わせて他の働き方もご覧いただけます。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherCategories.map(cat => {
                  const catVisual = CATEGORY_IMAGES[cat.slug];
                  return (
                    <div
                      key={cat.id}
                      className="bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-xs hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="relative h-28 overflow-hidden bg-rose-50">
                        <img
                          src={catVisual?.image || '/images/shinodayama_hero_banner_1792225964954.jpg'}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-secondary/90 px-2 py-0.5 rounded">
                          {cat.badge}
                        </span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-zinc-900 group-hover:text-secondary mb-1.5 transition-colors">
                            {cat.title}
                          </h4>
                          <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-3">
                            {cat.summary}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-secondary">
                            {cat.dailyIncomeModel.split('（')[0]}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCategorySelect(cat.slug)}
                            className="text-xs font-bold text-secondary hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>詳細を見る</span>
                            <LucideIcon name="ChevronRight" size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Optional Collapsible Site Comparison Matrix */}
            <div className="mb-12">
              <button
                type="button"
                onClick={() => setShowMatrixOnCategoryPage(!showMatrixOnCategoryPage)}
                className="w-full bg-white hover:bg-rose-50/50 border border-rose-200 rounded-2xl p-4 text-center font-bold text-xs sm:text-sm text-zinc-700 flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-colors"
              >
                <LucideIcon name="Table" size={16} className="text-secondary" />
                <span>
                  {showMatrixOnCategoryPage 
                    ? '【閉じる】旅館直営とスカウト業者・仲介サイトの違い一覧' 
                    : '【確認する】安心の理由（旅館直営とスカウト業者・仲介サイトの違い）を開く'}
                </span>
                <LucideIcon 
                  name="ChevronDown" 
                  size={16} 
                  className={`transition-transform ${showMatrixOnCategoryPage ? 'rotate-180 text-secondary' : 'text-zinc-400'}`} 
                />
              </button>

              {showMatrixOnCategoryPage && (
                <div className="mt-4 bg-white rounded-3xl border border-rose-100 shadow-md p-4 sm:p-6 overflow-hidden">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setActiveComparisonTab('area')}
                      className={`text-xs font-black px-3.5 py-2 rounded-xl transition-all cursor-pointer border flex items-center gap-1.5 ${
                        activeComparisonTab === 'area'
                          ? 'bg-secondary text-white border-secondary shadow-xs'
                          : 'bg-zinc-50 hover:bg-rose-50 text-zinc-700 border-zinc-200'
                      }`}
                    >
                      <LucideIcon name="MapPin" size={13} />
                      <span>【エリア比較】信太山 vs 飛田 vs 松島 vs 一般風俗</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveComparisonTab('channel')}
                      className={`text-xs font-black px-3.5 py-2 rounded-xl transition-all cursor-pointer border flex items-center gap-1.5 ${
                        activeComparisonTab === 'channel'
                          ? 'bg-secondary text-white border-secondary shadow-xs'
                          : 'bg-zinc-50 hover:bg-rose-50 text-zinc-700 border-zinc-200'
                      }`}
                    >
                      <LucideIcon name="ShieldCheck" size={13} />
                      <span>【採用形態比較】旅館直営公式 vs スカウト vs 外部サイト</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto scrollbar-thin">
                    {activeComparisonTab === 'area' ? (
                      <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                          <tr className="border-b border-rose-100">
                            <th scope="col" className="p-3.5 bg-zinc-50 font-bold text-xs text-zinc-700 w-[17%] min-w-[130px] sticky left-0 z-10 border-r border-rose-100/60">
                              比較項目
                            </th>
                            <th scope="col" className="p-3.5 bg-rose-500 text-white font-black text-xs w-[27%] min-w-[210px] shadow-xs border-r border-rose-600/40">
                              <div className="flex items-center gap-1.5">
                                <LucideIcon name="Award" size={15} className="text-yellow-300 flex-shrink-0" />
                                <span>【公式】信太山新地（旅館直営）</span>
                              </div>
                            </th>
                            <th scope="col" className="p-3.5 bg-zinc-100 font-bold text-xs text-zinc-700 w-[18.66%] min-w-[170px] border-r border-zinc-200/60">
                              飛田新地
                            </th>
                            <th scope="col" className="p-3.5 bg-zinc-50 font-bold text-xs text-zinc-700 w-[18.66%] min-w-[170px] border-r border-zinc-200/60">
                              松島新地
                            </th>
                            <th scope="col" className="p-3.5 bg-zinc-100 font-bold text-xs text-zinc-700 w-[18.66%] min-w-[170px]">
                              一般風俗・キャバクラ
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-rose-50 text-xs">
                          {AREA_COMPARISON_ROWS.map((row, idx) => (
                            <tr 
                              key={row.criteria} 
                              className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30' : 'bg-zinc-50/40 hover:bg-rose-50/30'}
                            >
                              <th scope="row" className="p-3.5 font-bold text-zinc-800 bg-inherit sticky left-0 z-10 border-r border-rose-100/60 min-w-[130px] text-left">
                                {row.criteria}
                              </th>
                              <td className="p-3.5 bg-rose-50/50 border-r border-rose-200/70 font-semibold text-[#3c2a2e] min-w-[210px]">
                                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                  {renderGradeBadge(row.shinodayama.grade)}
                                  {row.shinodayama.badge && (
                                    <span className="text-[10px] font-black bg-rose-600 text-white px-1.5 py-0.5 rounded">
                                      {row.shinodayama.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="leading-snug font-medium text-xs">
                                  {row.shinodayama.text}
                                </p>
                              </td>
                              <td className="p-3.5 text-zinc-600 border-r border-zinc-200/60 min-w-[170px]">
                                <div className="mb-1">
                                  {renderGradeBadge(row.tobita.grade)}
                                </div>
                                <p className="leading-snug text-xs text-zinc-600">
                                  {row.tobita.text}
                                </p>
                              </td>
                              <td className="p-3.5 text-zinc-600 border-r border-zinc-200/60 min-w-[170px]">
                                <div className="mb-1">
                                  {renderGradeBadge(row.matsushima.grade)}
                                </div>
                                <p className="leading-snug text-xs text-zinc-600">
                                  {row.matsushima.text}
                                </p>
                              </td>
                              <td className="p-3.5 text-zinc-600 min-w-[170px]">
                                <div className="mb-1">
                                  {renderGradeBadge(row.generalNight.grade)}
                                </div>
                                <p className="leading-snug text-xs text-zinc-600">
                                  {row.generalNight.text}
                                </p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                          <tr className="border-b border-rose-100">
                            <th scope="col" className="p-3.5 bg-zinc-50 font-bold text-xs text-zinc-600 w-[16%] min-w-[130px] sticky left-0 z-10 border-r border-rose-100/60">
                              チェック項目
                            </th>
                            <th scope="col" className="p-3.5 bg-rose-500 text-white font-extrabold text-xs w-[28%] min-w-[220px] shadow-xs border-r border-rose-600/40">
                              <div className="flex items-center gap-1.5">
                                <LucideIcon name="Award" size={15} className="text-yellow-300 flex-shrink-0" />
                                <span>【公式】信太山ガールズ（旅館直営）</span>
                              </div>
                            </th>
                            <th scope="col" className="p-3.5 bg-zinc-100 font-bold text-xs text-zinc-700 w-[18.66%] min-w-[180px] border-r border-zinc-200/60">
                              SNS・街頭スカウト業者
                            </th>
                            <th scope="col" className="p-3.5 bg-zinc-50 font-bold text-xs text-zinc-700 w-[18.66%] min-w-[180px] border-r border-zinc-200/60">
                              他求人サイト（外部ポータルなど）
                            </th>
                            <th scope="col" className="p-3.5 bg-zinc-100 font-bold text-xs text-zinc-700 w-[18.66%] min-w-[180px]">
                              他業種ナイトワーク（ソープ等）
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-rose-50 text-xs">
                          {SITE_COMPARISON_ROWS.map((row, idx) => (
                            <tr 
                              key={row.criteria} 
                              className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30' : 'bg-zinc-50/40 hover:bg-rose-50/30'}
                            >
                              <th scope="row" className="p-3.5 font-bold text-zinc-800 bg-inherit sticky left-0 z-10 border-r border-rose-100/60 min-w-[130px] text-left">
                                {row.criteria}
                              </th>
                              <td className="p-3.5 bg-rose-50/40 border-r border-rose-200/60 font-semibold text-[#3c2a2e] min-w-[220px]">
                                <div className="mb-1">
                                  {renderGradeBadge(row.ourShop.grade)}
                                </div>
                                <p className="leading-snug font-medium text-xs">
                                  {row.ourShop.text}
                                </p>
                              </td>
                              <td className="p-3.5 text-zinc-600 border-r border-zinc-200/60 min-w-[180px]">
                                <div className="mb-1">
                                  {renderGradeBadge(row.scoutAgency.grade)}
                                </div>
                                <p className="leading-snug text-xs text-zinc-600">
                                  {row.scoutAgency.text}
                                </p>
                              </td>
                              <td className="p-3.5 text-zinc-600 border-r border-zinc-200/60 min-w-[180px]">
                                <div className="mb-1">
                                  {renderGradeBadge(row.generalPortal.grade)}
                                </div>
                                <p className="leading-snug text-xs text-zinc-600">
                                  {row.generalPortal.text}
                                </p>
                              </td>
                              <td className="p-3.5 text-zinc-600 min-w-[180px]">
                                <div className="mb-1">
                                  {renderGradeBadge(row.otherNightwork.grade)}
                                </div>
                                <p className="leading-snug text-xs text-zinc-600">
                                  {row.otherNightwork.text}
                                </p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Consultation Box for Category */}
            <div className="bg-gradient-to-r from-rose-100/60 via-white to-rose-100/60 border border-rose-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white rounded-full overflow-hidden border-2 border-secondary/30 shadow-md">
                <img 
                  src={CONSULTANT_AVATAR_URL} 
                  alt="女性サポート統括担当 あおい" 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = '/images/shinodayama_advisor_sakura_1792225964799.jpg';
                  }}
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-block bg-white text-secondary text-[11px] font-extrabold px-3 py-0.5 rounded-full border border-rose-200 mb-1.5 shadow-xs">
                  女性サポート統括担当 あおいより
                </div>
                <p className="font-sans text-xs sm:text-sm font-semibold text-on-surface leading-relaxed mb-3">
                  「『{currentCategory.title}』について、具体的な日給相場や勤務シフト、寮の空き状況など、どんな些細な疑問でも女性目線でお答えします。まずはLINEでお気軽にご相談くださいね。」
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <button
                    type="button"
                    onClick={() => handleApplyWithCategory(currentCategory)}
                    className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <LucideIcon name="MessageCircle" size={16} />
                    <span>【公式LINE】当店へ応募・{currentCategory.title}について相談する（24時間受付）</span>
                  </button>
                  <span className="text-[11px] text-zinc-500 font-medium">
                    ※完全匿名・秘密厳守・相談のみOK
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ==========================================
              MODE B: GENERAL SITE COMPARISON OVERVIEW
             ========================================== */
          <div>
            {/* Hero Header */}
            <header className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-rose-100 text-secondary text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-4 shadow-xs">
                <LucideIcon name="ShieldCheck" size={16} />
                <span>2026年最新版｜当店が選ばれる理由＆タイプ別働き方ガイド</span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-on-surface leading-tight mb-4">
                安心して働ける理由と、<br />
                <span className="text-secondary">あなたに最適な働き方</span>が必ず見つかる。
              </h1>

              <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-6">
                「スカウト業者や仲介サイトと何が違うの？」「未経験や週1、30代・40代でも本当に大丈夫？」といった疑問や不安を解消。
                紹介料や給料の天引きが一切ない旅館直営公式採用だからこその安心環境と、あなたの希望に合わせた8つの働き方をご紹介します。
              </p>

              {/* Key Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
                <span className="bg-white border border-rose-200 text-zinc-700 px-3 py-1 rounded-full font-bold shadow-2xs flex items-center gap-1">
                  <LucideIcon name="ShieldCheck" size={14} className="text-secondary" />
                  旅館直営・店先顔見せなし
                </span>
                <span className="bg-white border border-rose-200 text-zinc-700 px-3 py-1 rounded-full font-bold shadow-2xs flex items-center gap-1">
                  <LucideIcon name="Coins" size={14} className="text-secondary" />
                  15分高額バック＆即日日払い
                </span>
                <span className="bg-white border border-rose-200 text-zinc-700 px-3 py-1 rounded-full font-bold shadow-2xs flex items-center gap-1">
                  <LucideIcon name="EyeOff" size={14} className="text-secondary" />
                  ネット写真掲載完全ゼロ
                </span>
                <span className="bg-white border border-rose-200 text-zinc-700 px-3 py-1 rounded-full font-bold shadow-2xs flex items-center gap-1">
                  <LucideIcon name="Ban" size={14} className="text-secondary" />
                  お酒・連絡先交換一切不要
                </span>
              </div>
            </header>

            {/* SECTION 1: 数字で見る信太山新地（公式ファクトシート） */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-facts-data">
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-1.5 bg-rose-100 text-secondary text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-xs">
                  <LucideIcon name="Sparkles" size={14} />
                  <span>FACTS & DATA 2026</span>
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-on-surface mb-3">
                  数字で見る信太山新地（公式ファクトシート）
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  「どれくらい稼げるの？」「未経験や年齢層の割合は？」気になる疑問を具体的な公式データで公開。<br className="hidden sm:inline" />
                  誇大広告や曖昧な表現ではなく、LLM・AI検索も抽出する透明性の高い数値をお届けします。
                </p>
              </div>

              {/* LLM & AI Search Direct Summary Capsule */}
              <div 
                id="facts-direct-summary"
                className="mb-8 p-5 sm:p-6 bg-gradient-to-r from-rose-50/90 via-pink-50/60 to-white rounded-3xl border-2 border-rose-200/90 shadow-xs"
              >
                <div className="flex items-center gap-2 text-rose-700 font-black text-xs sm:text-sm mb-2">
                  <LucideIcon name="Award" size={17} />
                  <span>【公式データ要約】信太山新地の安心データまとめ</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-semibold">
                  信太山新地は在籍キャストの<strong className="text-secondary font-black">約92%がナイトワーク完全未経験</strong>からスタート。厚生費や衣装代・写真代などの<strong className="text-secondary font-black">引かれもの・天引きは完全0円（100%全額手取り）</strong>、<strong className="text-secondary font-black">店先での顔見せなし（完全個室待機）100%</strong>、<strong className="text-secondary font-black">即日全額日払い100%</strong>、<strong className="text-secondary font-black">時給換算10,000円保証</strong>を完備しています。平均日給は68,000円〜120,000円超、毎月20日エリア一斉定休日で体調管理も万全です。
                </p>
              </div>

              {/* 10-Item Concrete Numerical Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
                {SHINODAYAMA_KEY_METRICS.map((metric) => (
                  <div
                    key={metric.label}
                    className={`rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between ${
                      metric.highlight
                        ? 'bg-gradient-to-b from-rose-50/80 to-white border-rose-300 shadow-sm'
                        : 'bg-white border-zinc-200/80 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-zinc-500">{metric.label}</span>
                        <div className="w-7 h-7 rounded-lg bg-rose-100 text-secondary flex items-center justify-center shrink-0">
                          <LucideIcon name={metric.icon} size={15} />
                        </div>
                      </div>
                      <div className="font-display font-black text-2xl sm:text-3xl text-secondary leading-tight mb-1">
                        {metric.value}
                        {metric.unit && <span className="text-xs sm:text-sm font-bold text-zinc-700 ml-0.5">{metric.unit}</span>}
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-snug mt-2 pt-2 border-t border-zinc-100">
                      {metric.subtext}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 2: 比較表（大阪新地比較 ＆ 採用形態比較） */}
            <section className="mb-16 md:mb-24 scroll-mt-24" id="site-comparison-matrix">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                <div>
                  <div className="text-xs font-extrabold text-secondary tracking-wider mb-1 flex items-center gap-1.5">
                    <LucideIcon name="ShieldCheck" size={14} />
                    <span>COMPARISON TABLES</span>
                  </div>
                  <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface">
                    徹底比較｜他の新地・一般風俗・スカウトとの違い
                  </h2>
                </div>
                <span className="text-xs bg-rose-50 text-secondary border border-rose-200 px-3 py-1 rounded-full font-semibold self-start sm:self-auto">
                  ※表は左右にスクロールできます
                </span>
              </div>

              {/* Table Switcher Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setActiveComparisonTab('area')}
                  className={`text-xs sm:text-sm font-black px-4 sm:px-5 py-2.5 rounded-2xl transition-all cursor-pointer border flex items-center gap-2 ${
                    activeComparisonTab === 'area'
                      ? 'bg-secondary text-white border-secondary shadow-sm'
                      : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200'
                  }`}
                >
                  <LucideIcon name="MapPin" size={15} />
                  <span>【エリア比較】信太山 vs 飛田 vs 松島 vs 一般風俗</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveComparisonTab('channel')}
                  className={`text-xs sm:text-sm font-black px-4 sm:px-5 py-2.5 rounded-2xl transition-all cursor-pointer border flex items-center gap-2 ${
                    activeComparisonTab === 'channel'
                      ? 'bg-secondary text-white border-secondary shadow-sm'
                      : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200'
                  }`}
                >
                  <LucideIcon name="ShieldCheck" size={15} />
                  <span>【採用形態比較】旅館直営公式 vs スカウト業者 vs 外部サイト</span>
                </button>
              </div>

              {/* Comparison Table Container */}
              <div className="bg-white rounded-3xl border border-rose-100 shadow-md overflow-hidden mb-6">
                <div className="overflow-x-auto scrollbar-thin">
                  {activeComparisonTab === 'area' ? (
                    /* TAB 1: AREA COMPARISON (信太山 vs 飛田 vs 松島 vs 一般風俗) */
                    <table className="w-full text-left border-collapse min-w-[920px]">
                      <caption className="sr-only">
                        大阪三大新地（信太山新地・飛田新地・松島新地）と一般風俗・キャバクラの待遇・働き方比較表
                      </caption>
                      <thead>
                        <tr className="border-b border-rose-100">
                          <th scope="col" className="p-4 bg-zinc-50 font-bold text-xs sm:text-sm text-zinc-700 w-[17%] min-w-[135px] sticky left-0 z-10 border-r border-rose-100/60">
                            比較項目
                          </th>
                          <th scope="col" className="p-4 bg-rose-500 text-white font-black text-xs sm:text-sm w-[27%] min-w-[220px] shadow-xs border-r border-rose-600/40">
                            <div className="flex items-center gap-1.5">
                              <LucideIcon name="Award" size={16} className="text-yellow-300 flex-shrink-0" />
                              <span>【公式】信太山新地（旅館直営）</span>
                            </div>
                          </th>
                          <th scope="col" className="p-4 bg-zinc-100 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px] border-r border-zinc-200/60">
                            飛田新地
                          </th>
                          <th scope="col" className="p-4 bg-zinc-50 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px] border-r border-zinc-200/60">
                            松島新地
                          </th>
                          <th scope="col" className="p-4 bg-zinc-100 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px]">
                            一般風俗・キャバクラ
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rose-50 text-xs sm:text-sm">
                        {AREA_COMPARISON_ROWS.map((row, idx) => (
                          <tr 
                            key={row.criteria} 
                            className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30' : 'bg-zinc-50/40 hover:bg-rose-50/30'}
                          >
                            <th scope="row" className="p-4 font-bold text-zinc-800 bg-inherit sticky left-0 z-10 border-r border-rose-100/60 min-w-[135px] text-left">
                              {row.criteria}
                            </th>
                            <td className="p-4 bg-rose-50/50 border-r border-rose-200/70 font-semibold text-[#3c2a2e] min-w-[220px]">
                              <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                                {renderGradeBadge(row.shinodayama.grade)}
                                {row.shinodayama.badge && (
                                  <span className="text-[10px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-md">
                                    {row.shinodayama.badge}
                                  </span>
                                )}
                              </div>
                              <p className="leading-snug font-medium text-xs sm:text-sm">
                                {row.shinodayama.text}
                              </p>
                            </td>
                            <td className="p-4 text-zinc-600 border-r border-zinc-200/60 min-w-[180px]">
                              <div className="mb-1.5">
                                {renderGradeBadge(row.tobita.grade)}
                              </div>
                              <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                                {row.tobita.text}
                              </p>
                            </td>
                            <td className="p-4 text-zinc-600 border-r border-zinc-200/60 min-w-[180px]">
                              <div className="mb-1.5">
                                {renderGradeBadge(row.matsushima.grade)}
                              </div>
                              <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                                {row.matsushima.text}
                              </p>
                            </td>
                            <td className="p-4 text-zinc-600 min-w-[180px]">
                              <div className="mb-1.5">
                                {renderGradeBadge(row.generalNight.grade)}
                              </div>
                              <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                                {row.generalNight.text}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    /* TAB 2: CHANNEL COMPARISON (直営 vs スカウト vs 外部サイト) */
                    <table className="w-full text-left border-collapse min-w-[900px]">
                      <caption className="sr-only">
                        旅館直営公式採用とSNSスカウト業者・外部求人ポータルの比較表
                      </caption>
                      <thead>
                        <tr className="border-b border-rose-100">
                          <th scope="col" className="p-4 bg-zinc-50 font-bold text-xs sm:text-sm text-zinc-600 w-[16%] min-w-[130px] sticky left-0 z-10 border-r border-rose-100/60">
                            チェック項目
                          </th>
                          <th scope="col" className="p-4 bg-rose-500 text-white font-extrabold text-xs sm:text-sm w-[28%] min-w-[220px] shadow-xs border-r border-rose-600/40">
                            <div className="flex items-center gap-1.5">
                              <LucideIcon name="Award" size={16} className="text-yellow-300 flex-shrink-0" />
                              <span>【公式】信太山ガールズ（旅館直営）</span>
                            </div>
                          </th>
                          <th scope="col" className="p-4 bg-zinc-100 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px] border-r border-zinc-200/60">
                            SNS・街頭スカウト業者
                          </th>
                          <th scope="col" className="p-4 bg-zinc-50 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px] border-r border-zinc-200/60">
                            他求人サイト（外部ポータルなど）
                          </th>
                          <th scope="col" className="p-4 bg-zinc-100 font-bold text-xs sm:text-sm text-zinc-700 w-[18.66%] min-w-[180px]">
                            他業種ナイトワーク（ソープ等）
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rose-50 text-xs sm:text-sm">
                        {SITE_COMPARISON_ROWS.map((row, idx) => (
                          <tr 
                            key={row.criteria} 
                            className={idx % 2 === 0 ? 'bg-white hover:bg-rose-50/30' : 'bg-zinc-50/40 hover:bg-rose-50/30'}
                          >
                            <th scope="row" className="p-4 font-bold text-zinc-800 bg-inherit sticky left-0 z-10 border-r border-rose-100/60 min-w-[130px] text-left">
                              {row.criteria}
                            </th>
                            <td className="p-4 bg-rose-50/40 border-r border-rose-200/60 font-semibold text-[#3c2a2e] min-w-[220px]">
                              <div className="mb-1.5">
                                {renderGradeBadge(row.ourShop.grade)}
                              </div>
                              <p className="leading-snug font-medium text-xs sm:text-sm">
                                {row.ourShop.text}
                              </p>
                            </td>
                            <td className="p-4 text-zinc-600 border-r border-zinc-200/60 min-w-[180px]">
                              <div className="mb-1.5">
                                {renderGradeBadge(row.scoutAgency.grade)}
                              </div>
                              <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                                {row.scoutAgency.text}
                              </p>
                            </td>
                            <td className="p-4 text-zinc-600 border-r border-zinc-200/60 min-w-[180px]">
                              <div className="mb-1.5">
                                {renderGradeBadge(row.generalPortal.grade)}
                              </div>
                              <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                                {row.generalPortal.text}
                              </p>
                            </td>
                            <td className="p-4 text-zinc-600 min-w-[180px]">
                              <div className="mb-1.5">
                                {renderGradeBadge(row.otherNightwork.grade)}
                              </div>
                              <p className="leading-snug text-xs sm:text-sm text-zinc-600">
                                {row.otherNightwork.text}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Warning Callout Box for Scouts */}
                <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-50 to-rose-50 border-t border-rose-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs sm:text-sm">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                    <LucideIcon name="AlertTriangle" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-zinc-900 mb-1">
                      【警告】街頭やSNS裏垢（X/旧Twitter）のスカウト業者経由は絶対にNG！
                    </h3>
                    <p className="text-zinc-600 text-xs leading-relaxed">
                      スカウトを通すと、あなたの売上から毎月10〜30%が「紹介料」として永久に天引きされます。また個人情報の流出や退職時の脅迫トラブルも後を絶ちません。信太山新地は<strong className="text-secondary font-black">旅館直営公式採用（信太山ガールズ）</strong>から応募することで、仲介手数料ゼロ・高額バック即日全額手渡し・時給1万円保証・日給保証が約束されます。
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 3: 15分単位の標準報酬設定＆時給換算表（具体的数字データ） */}
              <div className="bg-white rounded-3xl border border-rose-200/80 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-secondary font-black text-xs bg-rose-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <LucideIcon name="Coins" size={13} />
                    <span>具体的数字で見る給与体系</span>
                  </span>
                </div>
                <h3 className="font-display font-black text-lg sm:text-2xl text-zinc-900 mb-2">
                  信太山新地のコース時間と支給額・時給換算データ表
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mb-6 leading-relaxed">
                  1コース最短15分からスタート。時給換算15,200円の高額還元率で、雑費や天引きは完全0円です。
                </p>

                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full text-xs sm:text-sm border-collapse min-w-[640px]">
                    <caption className="sr-only">
                      信太山新地の15分単位コース料金・キャスト支給額・時給換算表
                    </caption>
                    <thead>
                      <tr className="bg-rose-50/70 border-b border-rose-200 text-zinc-800">
                        <th scope="col" className="py-3.5 px-4 text-left font-bold w-[18%]">コース時間</th>
                        <th scope="col" className="py-3.5 px-4 text-left font-bold w-[22%]">キャスト手取り支給額</th>
                        <th scope="col" className="py-3.5 px-4 text-left font-bold w-[22%]">時給換算相当額</th>
                        <th scope="col" className="py-3.5 px-4 text-left font-bold w-[38%]">特徴・保障制度</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {COURSE_REWARD_SCHEDULE.map((item) => (
                        <tr key={item.courseTime} className="hover:bg-rose-50/30">
                          <th scope="row" className="py-3 px-4 font-bold text-zinc-900 text-left">
                            {item.courseTime}コース
                          </th>
                          <td className="py-3 px-4 font-black text-rose-600 text-base">
                            {item.reward.toLocaleString()}円
                          </td>
                          <td className="py-3 px-4 font-bold text-zinc-800">
                            時給換算 約{item.hourlyEquivalent.toLocaleString()}円
                          </td>
                          <td className="py-3 px-4 text-zinc-600 text-xs">
                            {item.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-4 border-t border-rose-100">
                  <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100">
                    <span className="font-bold text-rose-700 block mb-0.5">時給10,000円保証</span>
                    <span className="text-zinc-600 text-[11px]">客足に関係なく最低時給1万円を保証。待機損がありません。</span>
                  </div>
                  <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100">
                    <span className="font-bold text-rose-700 block mb-0.5">日給8万〜10万円保証</span>
                    <span className="text-zinc-600 text-[11px]">12時間フル待機時の日給保証制度あり。確実な手取りを確保。</span>
                  </div>
                  <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100">
                    <span className="font-bold text-rose-700 block mb-0.5">天引き完全0円</span>
                    <span className="text-zinc-600 text-[11px]">厚生費・衣装代・写真代などの中抜き一切なし、100%全額手渡し。</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                働き方診断：「結局、自分にはどれが合ってる？」
               ======================================================== */}
            <CompareDiagnostic
              onSelectCategory={handleCategorySelect}
              onConsultLine={handleConsultSituation}
              onScrollToSafety={handleScrollToSafety}
            />

            {/* ========================================================
                信太山新地の旅館直営が選ばれる3つの理由
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-reasons-direct">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-1.5 bg-rose-100 text-secondary text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-xs">
                  <LucideIcon name="ShieldCheck" size={14} />
                  <span>3 REASONS WHY GIRLS CHOOSE DIRECT</span>
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-on-surface mb-3">
                  信太山新地の旅館直営が選ばれる3つの理由
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  スカウト業者や他求人サイト、一般ナイトワークと比べて、なぜ旅館直営公式採用が圧倒的に選ばれているのか？その決定的な3つの違いをご説明します。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 理由1 */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-rose-100 shadow-sm hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-lg shadow-sm mb-4">
                      01
                    </div>
                    <div className="text-[11px] font-black text-secondary bg-rose-50 px-2.5 py-1 rounded-lg inline-block mb-2">
                      他求人サイト（外部代理店など）との違い
                    </div>
                    <h3 className="font-display font-black text-base sm:text-lg text-zinc-900 mb-3 leading-snug">
                      中間コストゼロで待遇を最大還元
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      一般的な求人サイトは広告掲載料や仲介コストが発生します。信太山ガールズは旅館直営のため中間マージン完全0円。15分短時間高額バック・時給1万円保証・即日日払いや個室寮補助、交通費全額支給など、働く女性へ最大還元しています。
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-rose-100 flex items-center justify-between text-xs font-bold text-secondary">
                    <span>仲介手数料：完全0円</span>
                    <LucideIcon name="CheckCircle2" size={16} className="text-emerald-600" />
                  </div>
                </div>

                {/* 理由2 */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-rose-100 shadow-sm hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-lg shadow-sm mb-4">
                      02
                    </div>
                    <div className="text-[11px] font-black text-secondary bg-rose-50 px-2.5 py-1 rounded-lg inline-block mb-2">
                      街頭・SNSスカウト業者との違い
                    </div>
                    <h3 className="font-display font-black text-base sm:text-lg text-zinc-900 mb-3 leading-snug">
                      お給料を引かれ続ける心配がありません
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      SNS（X/Twitter・インスタ）のスカウト業者を通すと、毎月10〜30%もの紹介料がお給料から引かれてしまいます。当店は旅館直営の直接採用ですので、不当な中抜きや個人情報トラブルの心配がなく、稼いだお給料がそのまま全額手元に残ります。
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-rose-100 flex items-center justify-between text-xs font-bold text-secondary">
                    <span>紹介料・天引き：一切なし</span>
                    <LucideIcon name="ShieldCheck" size={16} className="text-emerald-600" />
                  </div>
                </div>

                {/* 理由3 */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-rose-100 shadow-sm hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black text-lg shadow-sm mb-4">
                      03
                    </div>
                    <div className="text-[11px] font-black text-secondary bg-rose-50 px-2.5 py-1 rounded-lg inline-block mb-2">
                      一般ナイトワーク（ソープ等）との違い
                    </div>
                    <h3 className="font-display font-black text-base sm:text-lg text-zinc-900 mb-3 leading-snug">
                      顔出し不要＆お酒不要で負担最小限
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      街全体で一般人の撮影が禁止されているためネットへの写真掲載100%ナシ。お酒を飲む必要がなく、客への営業LINEや同伴も禁止。最短15分〜60分の短時間接客で心身の負担を最小限に抑えられます（常連様が多く延長も入りやすい環境です）。
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-rose-100 flex items-center justify-between text-xs font-bold text-secondary">
                    <span>写真掲載・お酒：完全不要</span>
                    <LucideIcon name="Heart" size={16} className="text-rose-500" />
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                あなたにぴったりの働き方から探す（8つのタイプ別ガイド）
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-target-categories">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-1.5 bg-rose-100 text-secondary text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-xs">
                  <LucideIcon name="Sparkles" size={14} />
                  <span>8 WORKSTYLES</span>
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-on-surface mb-3">
                  あなたにぴったりの働き方から探す（8つのタイプ別ガイド）
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  未経験、高収入、Wワーク、寮希望など、あなたの生活スタイルに合わせたお仕事スタイルです。<br className="hidden sm:inline" />
                  気になるタイプを選ぶと、詳しいメリットや給与の目安、よくある質問をご覧いただけます。
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {TARGET_JOB_CATEGORIES.map((cat, idx) => (
                  <div
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.slug)}
                    className="bg-white rounded-3xl border-2 border-rose-100 p-5 shadow-sm hover:border-secondary hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-6 h-6 rounded-full bg-rose-100 text-secondary text-xs font-black flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-[11px] font-black text-white bg-secondary px-2.5 py-0.5 rounded-full">
                          {cat.badge}
                        </span>
                      </div>
                      <h3 className="font-display font-black text-sm sm:text-base text-zinc-900 group-hover:text-secondary transition-colors mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3 mb-4">
                        {cat.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-rose-100/80 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-secondary">
                        {cat.dailyIncomeModel.split('（')[0]}
                      </span>
                      <span className="text-xs font-bold text-zinc-500 group-hover:text-secondary group-hover:translate-x-0.5 transition-all flex items-center gap-1">
                        <span>詳しく見る</span>
                        <LucideIcon name="ChevronRight" size={14} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================
                1. 仕事内容
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-job-details">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-black flex items-center justify-center shadow-xs">
                  1
                </span>
                <span className="text-secondary font-black text-xs sm:text-sm tracking-wider uppercase">
                  JOB DESCRIPTION
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                1. 仕事内容｜店先顔見せなし・洋室個室での短時間接客（15分〜60分・絶対ゴム着用）
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-3xl mb-8">
                信太山新地の旅館でのお仕事は、店先での顔見せが一切なく、個室待機からスタートします。
                仲居さんがお客様の希望に合わせてマッチングし、内線電話が入ったら清潔な洋室・ベッドのお部屋へ移動。
                1コース最短15分〜60分で、常連さんが多いため延長も入りやすく、お部屋の掃除や片付けもすべて仲居さんが行うため手伝う必要はありません。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-xs hover:border-rose-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="HeartHandshake" size={20} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm sm:text-base mb-1.5">
                    仲居さんによるマッチング
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    旅館に入られたお客様の希望や好みに合わせ、仲居さんが出勤メンバーの中から選んでマッチング。内線電話が入ったらお部屋へ移動します。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-xs hover:border-rose-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="Clock" size={20} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm sm:text-base mb-1.5">
                    1回15〜60分の短時間接客（延長あり）
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    1コースは最短15分から（30分・45分・60分なども選択可能）。当店は常連さんが多いため延長も入りやすく、効率よく高収入を得られます。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-xs hover:border-rose-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="ShieldCheck" size={20} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm sm:text-base mb-1.5">
                    絶対ゴム着用＆嫌な要求はお断り
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    組合ルールとしてゴムなし行為は禁止されており安全面が徹底されています。嫌がるリクエストは断れ、強引な場合は即座に退室OKです。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-xs hover:border-rose-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="Sparkles" size={20} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm sm:text-base mb-1.5">
                    掃除・片付け不要＆安心の入店ルール
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    お部屋の片付けや掃除は仲居さんが行うため手伝い不要。飲酒されている方、未成年の方、日本語が通じない外国人客はお断りしています。
                  </p>
                </div>
              </div>

              {/* 実際に何をするの？ 1回の接客の流れ */}
              <div className="bg-gradient-to-br from-rose-50/80 via-white to-pink-50/60 rounded-3xl p-6 sm:p-8 border-2 border-rose-200/90 shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-secondary font-black text-xs bg-rose-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <LucideIcon name="Sparkles" size={13} />
                    <span>未経験でもすぐわかる</span>
                  </span>
                </div>
                <h3 className="font-display font-black text-lg sm:text-xl text-zinc-900 mb-2">
                  「実際に何をするの？」1回の接客サービスの流れ（15分〜60分）
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                  通りに座る顔見せは一切なし。仲居さんのマッチングと時間管理による安心の5ステップです。
                </p>

                {/* Steps Flow Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                  {/* Step 1 */}
                  <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-2xs relative flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-black text-xs flex items-center justify-center mb-2.5 shadow-xs">
                        ①
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-zinc-900 mb-1">
                        仲居さんマッチング
                      </h4>
                      <p className="text-[11px] text-zinc-600 leading-relaxed">
                        お客様の希望に合わせ仲居さんが出勤メンバーからマッチング。内線電話が入ったらお部屋へ移動します。
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-2xs relative flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-black text-xs flex items-center justify-center mb-2.5 shadow-xs">
                        ②
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-zinc-900 mb-1">
                        入室・笑顔でご挨拶
                      </h4>
                      <p className="text-[11px] text-zinc-600 leading-relaxed">
                        清潔な洋室・ベッドのお部屋でお待ちのお客様（手消毒・シャワー済み）に笑顔で挨拶します。
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-2xs relative flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-black text-xs flex items-center justify-center mb-2.5 shadow-xs">
                        ③
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-zinc-900 mb-1">
                        サービス＆絶対ゴム着用
                      </h4>
                      <p className="text-[11px] text-zinc-600 leading-relaxed">
                        会話・キス・生フェラ・ゴム着用での挿入が基本。組合ルールでゴムなしは禁止、嫌な要求は即中断OKです。
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-2xs relative flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-black text-xs flex items-center justify-center mb-2.5 shadow-xs">
                        ④
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-zinc-900 mb-1">
                        内線ワンコールで終了
                      </h4>
                      <p className="text-[11px] text-zinc-600 leading-relaxed">
                        1コース15分〜60分。仲居さんがタイマー計測し終了の内線電話（ワンコール）で終了。常連さんが多く延長も入りやすいです。
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-2xs relative flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-black text-xs flex items-center justify-center mb-2.5 shadow-xs">
                        ⑤
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-zinc-900 mb-1">
                        シャワー＆お見送り
                      </h4>
                      <p className="text-[11px] text-zinc-600 leading-relaxed">
                        シャワーを浴びてお見送り。お部屋の片付けや掃除は仲居さんが行うため手伝う必要はありません。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Anxiety Reassurance Box */}
              <div className="bg-gradient-to-r from-rose-50/70 via-pink-50/40 to-white rounded-2xl p-4 sm:p-5 border border-rose-200/80">
                <div className="flex items-start gap-3">
                  <span className="text-xl">💭</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-zinc-800 mb-1">
                      「本当に自分でもできる？未経験でも大丈夫？」
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      当店に在籍する女性の<strong>90%以上がナイトワーク未経験</strong>からのスタートです。
                      初日のお仕事前に専任の女性スタッフが約30分かけてお茶の出し方や立ち居振る舞いを丁寧にお教えしますので、特別な知識やスキルは一切不要です。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                2. 給料
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-salary">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-black flex items-center justify-center shadow-xs">
                  2
                </span>
                <span className="text-secondary font-black text-xs sm:text-sm tracking-wider uppercase">
                  SALARY & EARNINGS
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                2. 給料｜15分単位の短時間高額バック・全額即日手渡し日払い
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-3xl mb-8">
                旅館直営公式採用だからこそ、スカウト業者や仲介会社のような不当な紹介料の天引きや中抜き（10〜30%）は一切ありません。
                時給1万円保証や日給保証、高額なコースバックが退勤時に全額現金手渡しされます。
              </p>

              {/* Stat Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-rose-100 shadow-xs text-center">
                  <div className="text-xs text-zinc-500 font-bold mb-1">想定日給目安</div>
                  <div className="text-xl sm:text-2xl font-black text-secondary">3万〜15万円超</div>
                  <div className="text-[11px] text-zinc-500 mt-1">平均日給 5万〜8万円</div>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-rose-100 shadow-xs text-center">
                  <div className="text-xs text-zinc-500 font-bold mb-1">給与システム</div>
                  <div className="text-xl sm:text-2xl font-black text-secondary">コース別高額支給</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">仲介料・天引き0円</div>
                </div>
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-rose-100 shadow-xs text-center">
                  <div className="text-xs text-zinc-500 font-bold mb-1">支給タイミング</div>
                  <div className="text-xl sm:text-2xl font-black text-secondary">即日全額手渡し</div>
                  <div className="text-[11px] text-zinc-500 mt-1">退勤時にその場で支給</div>
                </div>
              </div>

              {/* Monthly Income Models */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm mb-6">
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-4 flex items-center gap-2">
                  <LucideIcon name="TrendingUp" size={18} className="text-secondary" />
                  <span>働き方別の月収モデル例</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-100">
                    <div className="text-xs font-black text-secondary mb-1">マイペース週2日（Wワーク）</div>
                    <div className="text-lg sm:text-xl font-extrabold text-zinc-900 mb-2">月収 35万〜50万円</div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      日給約4.5万円 × 月8日勤務。昼職や子育て、学業と両立しながら無理なく高収入を得たい方に。
                    </p>
                  </div>
                  <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-100">
                    <div className="text-xs font-black text-secondary mb-1">しっかり週4日（レギュラー）</div>
                    <div className="text-lg sm:text-xl font-extrabold text-zinc-900 mb-2">月収 80万〜120万円</div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      日給約6万円 × 月16日勤務。毎月の安定した高収入で、奨学金返済や貯金を一気に進められます。
                    </p>
                  </div>
                  <div className="bg-rose-50/40 rounded-2xl p-4 border border-rose-100">
                    <div className="text-xs font-black text-secondary mb-1">短期集中・出稼ぎ（週5〜6日）</div>
                    <div className="text-lg sm:text-xl font-extrabold text-zinc-900 mb-2">月収 150万〜200万円超</div>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      日給約7〜8万円 × 月22日勤務。個室寮と交通費支給を活用し、1〜3ヶ月でまとまった資金を作る方に。
                    </p>
                  </div>
                </div>
              </div>

              {/* No hidden deduction guarantee */}
              <div className="bg-zinc-50 rounded-2xl p-4 sm:p-5 border border-zinc-200/80 text-xs sm:text-sm text-zinc-700">
                <span className="font-bold text-zinc-900">※不透明な天引き・雑費は一切ありません：</span>
                「日払いは5千円までで残りは月末振込」「厚生費や更衣室代の天引き」「ヘアメイク代の強制徴収」などは完全0円です。売上の半額がそのまま手取りとなります。
              </div>
            </section>

            {/* ========================================================
                3. 待遇
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-benefits">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-black flex items-center justify-center shadow-xs">
                  3
                </span>
                <span className="text-secondary font-black text-xs sm:text-sm tracking-wider uppercase">
                  BENEFITS & TREATMENT
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                3. 待遇｜家具家電付き個室寮・衣装無料・写真非掲載の徹底
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-3xl mb-8">
                初めての方や遠方からお越しの方でも、安心してプライベートを守りながら快適に働ける業界最高峰の手厚い待遇をご用意しています。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="Home" size={18} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1.5">家具家電付き個室寮完備</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    即日入居OKの清潔なワンルーム個室マンション。オートロック・Wi-Fi・家具家電完備で、敷金・礼金0円です。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="Plane" size={18} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1.5">往復交通費全額支給</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    全国どこからでも新幹線・飛行機・夜行バスのチケット代を全額負担。手ぶらで出稼ぎにお越しいただけます。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="Sparkles" size={18} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1.5">着物・衣装・ヘアメイク無料</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    清楚な着物やドレス、私服コスプレなど衣装はすべて無料レンタル。プロ仕様のヘアメイクサポートも完全無料です。
                  </p>
                </div>

                <div id="section-safety" className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs scroll-mt-28">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="EyeOff" size={18} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1.5">写真ネット非掲載100%厳守</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    街全体で撮影が完全禁止。Webサイト・SNS・求人媒体にあなたの写真を掲載することは一切なく、身バレの心配はありません。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="Ban" size={18} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1.5">お酒・連絡先交換ゼロ</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    お酒を飲む必要は一切なし。お客様とのプライベートな連絡先交換（LINE等）は組合規約で厳格に禁止されています。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-secondary flex items-center justify-center mb-3">
                    <LucideIcon name="CheckCircle2" size={18} />
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1.5">即日退店可・違約金0円</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    「体験してみて合わなければその日で終了OK」。違約金やペナルティ、無理な引き止めは一切ありません。
                  </p>
                </div>
              </div>
            </section>

            {/* ========================================================
                4. 勤務時間
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-workstyle">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-black flex items-center justify-center shadow-xs">
                  4
                </span>
                <span className="text-secondary font-black text-xs sm:text-sm tracking-wider uppercase">
                  WORKING HOURS & SHIFTS
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                4. 勤務時間｜10:00〜24:00 完全自由出勤・短時間勤務OK
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-3xl mb-8">
                あなたのライフスタイルに合わせて、無理のないシフトで自由に働けます。出勤の強制やシフトノルマは一切ありません。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs text-center sm:text-left">
                  <div className="inline-block bg-amber-100 text-amber-900 text-[11px] font-black px-2.5 py-0.5 rounded-full mb-2">
                    昼だけシフト
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1">10:00〜18:00</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    主婦・昼職OLの副業・学生に大人気。夜遅くならず、終電の心配も不要です。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs text-center sm:text-left">
                  <div className="inline-block bg-indigo-100 text-indigo-900 text-[11px] font-black px-2.5 py-0.5 rounded-full mb-2">
                    夜だけシフト
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1">17:00〜24:00</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    客足が最も多く回転率が高い時間帯。終電上がりも完全対応しています。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs text-center sm:text-left">
                  <div className="inline-block bg-rose-100 text-secondary text-[11px] font-black px-2.5 py-0.5 rounded-full mb-2">
                    短時間スキマ勤務
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1">1日3〜4時間だけ</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    「予定の合間にサクッと稼ぎたい」というスキマ時間での出勤も大歓迎です。
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs text-center sm:text-left">
                  <div className="inline-block bg-emerald-100 text-emerald-900 text-[11px] font-black px-2.5 py-0.5 rounded-full mb-2">
                    完全自由出勤
                  </div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1">週1日・月数回OK</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    月1回だけの出勤や、長期休暇・週末だけの短期バイトも自由に選べます。
                  </p>
                </div>
              </div>
            </section>

            {/* ========================================================
                5. エリア
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-area">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-black flex items-center justify-center shadow-xs">
                  5
                </span>
                <span className="text-secondary font-black text-xs sm:text-sm tracking-wider uppercase">
                  AREA & ACCESS
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                5. エリア｜大阪府和泉市・信太山新地（JR信太山駅・送迎・専用駐車場完備）
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-3xl mb-8">
                大阪府和泉市に位置する伝統ある信太山新地。料亭ではなく「旅館」営業で、店先での顔見せが一切ない安心の環境です。JR阪和線「信太山駅」から徒歩圏内、主要駅からの送迎やマイカー・バイク通勤用の専用駐車場も完備しています。
              </p>

              {/* Station Access */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm mb-6">
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 mb-4 flex items-center gap-2">
                  <LucideIcon name="MapPin" size={18} className="text-secondary" />
                  <span>アクセス＆通勤サポート</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100">
                    <div className="font-bold text-zinc-900 mb-1">JR阪和線 信太山駅</div>
                    <div className="text-secondary font-black text-base">徒歩約5分</div>
                    <p className="text-zinc-500 text-xs mt-1">天王寺・堺・和歌山方面から直通アクセス</p>
                  </div>
                  <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100">
                    <div className="font-bold text-zinc-900 mb-1">主要ターミナル送迎</div>
                    <div className="text-secondary font-black text-base">無料送迎あり</div>
                    <p className="text-zinc-500 text-xs mt-1">新大阪・なんば・天王寺・南海沿線・自宅近く</p>
                  </div>
                  <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100">
                    <div className="font-bold text-zinc-900 mb-1">マイカー・バイク通勤</div>
                    <div className="text-secondary font-black text-base">専用駐車場完備</div>
                    <p className="text-zinc-500 text-xs mt-1">人目につかず車やバイクで直行直帰OK（無料）</p>
                  </div>
                </div>
              </div>

              {/* 3 Main Environment Guide */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <span className="text-xs font-black text-white bg-secondary px-2.5 py-0.5 rounded-full">店先顔見せなし</span>
                  <h4 className="font-bold text-zinc-900 text-sm mt-3 mb-1.5">旅館個室・スタンド待機</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    通りに座る必要はなく、お仕事が入るまで個室で自由待機。身バレ・顔バレの心配が極めて低い安心の環境です。
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <span className="text-xs font-black text-white bg-rose-600 px-2.5 py-0.5 rounded-full">毎月20日一斉休業</span>
                  <h4 className="font-bold text-zinc-900 text-sm mt-3 mb-1.5">確実なリセット・体調管理</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    曜日に関わらず毎月20日はエリア全体が一斉休業日。気兼ねなく完全オフを楽しめ、無理なく続けられます。
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs">
                  <span className="text-xs font-black text-white bg-zinc-700 px-2.5 py-0.5 rounded-full">託児・出稼ぎ支援</span>
                  <h4 className="font-bold text-zinc-900 text-sm mt-3 mb-1.5">幅広い女性を温かくサポート</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    託児所完備や費用負担、家電付き個室寮（出稼ぎ1日0〜2,000円）、往復交通費支給で全国から歓迎しています。
                  </p>
                </div>
              </div>

              {/* Category Quick Pills */}
              <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 text-xs">
                <div className="font-bold text-zinc-800 mb-2 flex items-center gap-1.5">
                  <LucideIcon name="Sparkles" size={14} className="text-secondary" />
                  <span>あなたにぴったりの働き方から選ぶ（目的別詳細）</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TARGET_JOB_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.slug)}
                      className="bg-white hover:bg-rose-100 text-zinc-700 font-bold px-3 py-1.5 rounded-xl border border-rose-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
                    >
                      <span>{cat.title}</span>
                      <LucideIcon name="ChevronRight" size={12} className="text-zinc-400" />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* ========================================================
                6. FAQ
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-faq">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-black flex items-center justify-center shadow-xs">
                  6
                </span>
                <span className="text-secondary font-black text-xs sm:text-sm tracking-wider uppercase">
                  FREQUENTLY ASKED QUESTIONS
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
                <div>
                  <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface">
                    6. よくある質問 FAQ｜不安解消＆FAQ100選
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-1">
                    応募前の不安を解消する厳選Q&Aに加え、全119問のFAQデータベースから気になる疑問を直接検索・確認できます。
                  </p>
                </div>
                {onNavigateFaq && (
                  <button
                    type="button"
                    onClick={() => onNavigateFaq()}
                    className="self-start sm:self-auto bg-rose-50 hover:bg-rose-100 text-secondary border border-rose-200 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>FAQ全119問一覧へ</span>
                    <LucideIcon name="ChevronRight" size={13} />
                  </button>
                )}
              </div>

              {/* Category Filter Pills Bar */}
              <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  type="button"
                  onClick={() => { setFaqCategory('featured'); setVisibleFaqCount(8); }}
                  className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer border flex items-center gap-1 ${
                    faqCategory === 'featured'
                      ? 'bg-secondary text-white border-secondary shadow-xs'
                      : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200'
                  }`}
                >
                  <span>🔥 特に多い不安 (厳選6問)</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setFaqCategory('all'); setVisibleFaqCount(8); }}
                  className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer border flex items-center gap-1 ${
                    faqCategory === 'all'
                      ? 'bg-secondary text-white border-secondary shadow-xs'
                      : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200'
                  }`}
                >
                  <span>すべて (119問)</span>
                </button>
                {FAQ_8_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => { setFaqCategory(cat.id); setVisibleFaqCount(8); }}
                    className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer border flex items-center gap-1 ${
                      faqCategory === cat.id
                        ? 'bg-secondary text-white border-secondary shadow-xs'
                        : 'bg-white hover:bg-rose-50 text-zinc-700 border-zinc-200'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* Keyword Search & Quick Tags */}
              <div className="bg-white rounded-2xl p-4 border border-rose-100/90 shadow-2xs mb-5">
                <div className="relative mb-3">
                  <LucideIcon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={faqSearchQuery}
                    onChange={(e) => {
                      setFaqSearchQuery(e.target.value);
                      setVisibleFaqCount(8);
                      if (faqCategory === 'featured' && e.target.value.trim()) {
                        setFaqCategory('all');
                      }
                    }}
                    placeholder="気になるキーワードでFAQ100選を検索（例: お酒、身バレ、日払い、身分証、30代、ノルマ）"
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-secondary focus:bg-white rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 outline-hidden transition-all"
                  />
                  {faqSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setFaqSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-zinc-400 font-bold mr-1">よく検索される言葉:</span>
                  {[
                    { label: '#未経験', tag: '未経験' },
                    { label: '#即日日払い', tag: '日払い' },
                    { label: '#写真非掲載', tag: '写真' },
                    { label: '#週1日', tag: '週1' },
                    { label: '#お酒なし', tag: 'お酒' },
                    { label: '#個室寮', tag: '寮' },
                    { label: '#会社バレ防止', tag: '普通徴収' },
                    { label: '#違約金0円', tag: '違約金' }
                  ].map(item => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setFaqSearchQuery(item.tag);
                        setFaqCategory('all');
                        setVisibleFaqCount(8);
                      }}
                      className="bg-rose-50 hover:bg-rose-100 text-secondary px-2.5 py-0.5 rounded-lg border border-rose-200/60 font-semibold cursor-pointer transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion List */}
              <div className="space-y-3">
                {filteredFaqs === null ? (
                  // Featured 6 Questions
                  COMPARE_PAGE_FAQS.map((faq, idx) => {
                    const faqKey = `compare-faq-${idx}`;
                    const isOpen = expandedFaqId === faqKey;
                    return (
                      <div
                        key={faq.q}
                        className="bg-white rounded-2xl border border-rose-100/90 shadow-2xs overflow-hidden transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaqId(isOpen ? null : faqKey)}
                          className="w-full text-left p-4 sm:p-5 font-bold text-xs sm:text-sm text-zinc-900 flex items-center justify-between gap-3 hover:text-secondary cursor-pointer"
                        >
                          <span className="flex items-start gap-2.5">
                            <span className="text-secondary font-black text-sm sm:text-base mt-0.5">Q.</span>
                            <span>{faq.q}</span>
                          </span>
                          <LucideIcon
                            name="ChevronDown"
                            size={18}
                            className={`transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-secondary' : 'text-zinc-400'}`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-5 pt-2 text-xs sm:text-sm text-zinc-600 border-t border-rose-50 flex gap-2.5 leading-relaxed font-medium bg-rose-50/20">
                            <span className="text-secondary font-black text-sm sm:text-base">A.</span>
                            <p>{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : filteredFaqs.length > 0 ? (
                  // Filtered Questions from FAQ 100
                  filteredFaqs.slice(0, visibleFaqCount).map((item) => {
                    const faqKey = `faq100-${item.id}`;
                    const isOpen = expandedFaqId === faqKey;
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-rose-100/90 shadow-2xs overflow-hidden transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaqId(isOpen ? null : faqKey)}
                          className="w-full text-left p-4 sm:p-5 font-bold text-xs sm:text-sm text-zinc-900 flex items-center justify-between gap-3 hover:text-secondary cursor-pointer"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="text-secondary font-black text-sm sm:text-base mt-0.5">Q.</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-secondary bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                                  {item.eightCategoryLabel || item.categoryLabel}
                                </span>
                              </div>
                              <span className="text-zinc-800">{item.question}</span>
                            </div>
                          </div>
                          <LucideIcon
                            name="ChevronDown"
                            size={18}
                            className={`transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-secondary' : 'text-zinc-400'}`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-5 pt-2 text-xs sm:text-sm text-zinc-600 border-t border-rose-50 flex gap-2.5 leading-relaxed font-medium bg-rose-50/20 whitespace-pre-line">
                            <span className="text-secondary font-black text-sm sm:text-base">A.</span>
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-10 bg-white rounded-2xl border border-rose-100 p-6">
                    <p className="text-xs sm:text-sm text-zinc-600 mb-3">
                      「{faqSearchQuery}」に一致する質問が見つかりませんでした。
                    </p>
                    <button
                      type="button"
                      onClick={() => { setFaqSearchQuery(''); setFaqCategory('featured'); }}
                      className="text-xs font-bold text-secondary bg-rose-50 px-4 py-2 rounded-xl border border-rose-200 cursor-pointer"
                    >
                      条件をリセットして厳選FAQを表示
                    </button>
                  </div>
                )}
              </div>

              {/* Show more button if filteredFaqs > visibleFaqCount */}
              {filteredFaqs && filteredFaqs.length > visibleFaqCount && (
                <div className="mt-5 text-center flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setVisibleFaqCount(prev => prev + 10)}
                    className="bg-white hover:bg-rose-50 text-secondary border border-rose-200 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <LucideIcon name="ChevronDown" size={16} />
                    <span>さらに質問を表示する（残り{filteredFaqs.length - visibleFaqCount}問）</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisibleFaqCount(filteredFaqs.length)}
                    className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    すべて展開（全{filteredFaqs.length}問）
                  </button>
                </div>
              )}

              {/* Full FAQ Page Link Card */}
              <div className="mt-6 bg-gradient-to-r from-rose-50/70 via-white to-pink-50/70 rounded-2xl p-4 sm:p-5 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-secondary flex items-center justify-center border border-rose-200 shrink-0 shadow-2xs">
                    <LucideIcon name="BookOpen" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-zinc-800">
                      信太山新地求人 FAQ100選（全119問の完全データベース）
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-500">
                      応募・給料・身バレ・寮・Wワーク・退店など8大テーマ別の専用ページもご用意しています。
                    </p>
                  </div>
                </div>
                {onNavigateFaq ? (
                  <button
                    type="button"
                    onClick={() => onNavigateFaq()}
                    className="bg-secondary hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-2xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>FAQ専用ページを見る</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </button>
                ) : (
                  <a
                    href="/faq"
                    className="bg-secondary hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-2xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>FAQ専用ページを見る</span>
                    <LucideIcon name="ArrowRight" size={14} />
                  </a>
                )}
              </div>
            </section>

            {/* ========================================================
                お仕事までの流れ
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-flow">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-1.5 bg-rose-100 text-secondary text-xs font-black px-3.5 py-1 rounded-full mb-3">
                  <LucideIcon name="Sparkles" size={14} />
                  <span>ONBOARDING FLOW</span>
                </div>
                <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                  お仕事までの流れ｜応募から即日手渡し日払いまで
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600">
                  履歴書不要・手ぶらでご来店いただけます。丁寧な5ステップで初日も安心です。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
                {ONBOARDING_FLOW_STEPS.map((s, idx) => (
                  <div
                    key={s.step}
                    className="bg-white rounded-2xl p-5 border border-rose-100 shadow-xs relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black text-secondary bg-rose-50 px-2.5 py-0.5 rounded-full">
                          STEP {s.step}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-rose-50 text-secondary flex items-center justify-center">
                          <LucideIcon name={s.icon} size={16} />
                        </div>
                      </div>
                      <h3 className="font-bold text-zinc-900 text-xs sm:text-sm mb-2">
                        {s.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                    {idx < 4 && (
                      <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-rose-300">
                        ▶
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================
                募集要項
               ======================================================== */}
            <section className="mb-14 sm:mb-20 scroll-mt-24" id="section-requirements">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <div className="inline-flex items-center gap-1.5 bg-rose-100 text-secondary text-xs font-black px-3.5 py-1 rounded-full mb-3">
                  <LucideIcon name="FileText" size={14} />
                  <span>SPECIFICATIONS</span>
                </div>
                <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-on-surface mb-3">
                  採用基準・詳しいお仕事条件一覧
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600">
                  信太山新地 旅館直営公式の詳しい採用条件とお給料の詳細です。
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-rose-100 shadow-md overflow-hidden">
                <div className="divide-y divide-rose-50 text-xs sm:text-sm">
                  {SPEC_ROWS.map((row) => (
                    <div key={row.label} className="grid grid-cols-1 sm:grid-cols-4 p-4 sm:p-5 hover:bg-rose-50/20 transition-colors">
                      <div className="font-bold text-zinc-800 sm:col-span-1 mb-1 sm:mb-0 flex items-center">
                        {row.label}
                      </div>
                      <div className="text-zinc-600 sm:col-span-3 leading-relaxed">
                        {row.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ========================================================
                LINE誘導
               ======================================================== */}
            <section className="mb-12 scroll-mt-24" id="section-line-cta">
              <div className="bg-gradient-to-br from-rose-50 via-white to-pink-50 rounded-3xl p-6 sm:p-10 border border-rose-200 shadow-md">
                <div className="max-w-2xl mx-auto text-center">
                  <div className="inline-block bg-white text-secondary text-xs font-black px-4 py-1 rounded-full border border-rose-200 mb-4 shadow-2xs">
                    まずは質問・相談だけでもOK
                  </div>

                  <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-4">
                    まだ応募するか決めなくて大丈夫。
                  </h2>

                  <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-5 border border-rose-100 mb-6 text-left sm:text-center text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-2">
                    <p className="font-bold text-secondary">「週1でも大丈夫？」</p>
                    <p className="font-bold text-secondary">「未経験でもできる？」</p>
                    <p className="font-bold text-secondary">「どのくらい稼げる？」</p>
                    <p className="font-bold text-secondary">「身バレ対策について詳しく知りたい」</p>
                    <p className="text-zinc-600 pt-2 border-t border-rose-100">
                      そんな質問だけでもOKです。<br />
                      条件を聞いてから、自分に合うか考えてください。
                    </p>
                  </div>

                  {/* LINE Button */}
                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={onCtaclick}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <LucideIcon name="MessageCircle" size={22} className="text-white" />
                      <span>信太山新地の当店へLINEで応募・相談する（24時間受付）</span>
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-zinc-500 font-semibold mb-6">
                    <span className="bg-white px-3 py-1 rounded-full border border-rose-100 flex items-center gap-1">
                      <LucideIcon name="ShieldCheck" size={14} className="text-emerald-600" />
                      完全匿名で相談OK
                    </span>
                    <span className="bg-white px-3 py-1 rounded-full border border-rose-100 flex items-center gap-1">
                      <LucideIcon name="FileText" size={14} className="text-secondary" />
                      履歴書不要・手ぶらOK
                    </span>
                    <span className="bg-white px-3 py-1 rounded-full border border-rose-100 flex items-center gap-1">
                      <LucideIcon name="Clock" size={14} className="text-secondary" />
                      24時間即日返信
                    </span>
                    <span className="bg-white px-3 py-1 rounded-full border border-rose-100 flex items-center gap-1">
                      <LucideIcon name="HeartHandshake" size={14} className="text-secondary" />
                      女性スタッフが親身に対応
                    </span>
                  </div>

                  {/* Consultant Sakura message */}
                  <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-rose-100 text-left">
                    <img
                      src={CONSULTANT_AVATAR_URL}
                      alt="女性サポート統括担当 あおい"
                      className="w-12 h-12 rounded-full object-cover border border-rose-200 flex-shrink-0"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = '/images/shinodayama_advisor_sakura_1792225964799.jpg';
                      }}
                    />
                    <div className="text-xs text-zinc-600">
                      <span className="font-bold text-zinc-900 block text-xs">女性サポート統括担当 あおいより</span>
                      「無理な勧誘やしつこいご連絡は一切いたしません。あなたのペースで、気になることを何でも聞いてくださいね。」
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>
        )}

      </div>
    </article>
  );
}
