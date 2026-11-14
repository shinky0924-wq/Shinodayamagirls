import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://osaka-shinodayamashinchi-recruit.com';
const today = new Date().toISOString().split('T')[0];

async function loadTsModule(relPath) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) return {};
  const tsCode = fs.readFileSync(fullPath, 'utf8');
  const { code } = transformSync(tsCode, {
    loader: 'ts',
    format: 'esm',
    target: 'es2022'
  });
  const dataUri = `data:text/javascript;base64,${Buffer.from(code, 'utf8').toString('base64')}`;
  return import(dataUri);
}

function getFileLastMod(relPaths, fallback = today) {
  let latestMs = 0;
  for (const rel of relPaths) {
    const full = path.join(rootDir, rel);
    if (fs.existsSync(full)) {
      const mtimeMs = fs.statSync(full).mtimeMs;
      if (mtimeMs > latestMs) latestMs = mtimeMs;
    }
  }
  return latestMs > 0 ? new Date(latestMs).toISOString().split('T')[0] : fallback;
}

// 1. Load blog articles & generate lightweight index (excludes heavy article bodies from initial JS bundle)
const blogArticlesPath = path.join(rootDir, 'data', 'blogArticles.json');
const blogArticlesIndexPath = path.join(rootDir, 'data', 'blogArticlesIndex.json');
let blogArticles = [];
if (fs.existsSync(blogArticlesPath)) {
  blogArticles = JSON.parse(fs.readFileSync(blogArticlesPath, 'utf8'));
  const indexOnly = blogArticles.map(({ content, ...meta }) => meta);
  fs.writeFileSync(blogArticlesIndexPath, JSON.stringify(indexOnly), 'utf8');
  console.log(`[OK] blogArticlesIndex.json generated (${indexOnly.length} entries) at ${blogArticlesIndexPath}`);
}

// 2. Load topic clusters
const topicClustersPath = path.join(rootDir, 'data', 'topicClusters.json');
let topicClusters = {};
if (fs.existsSync(topicClustersPath)) {
  topicClusters = JSON.parse(fs.readFileSync(topicClustersPath, 'utf8'));
}

const rawClusterKeys = Object.keys(topicClusters).length > 0
  ? Object.keys(topicClusters)
  : ['job', 'salary', 'beginner', 'experienced', 'requirements', 'flow', 'workstyle', 'shops', 'dorm', 'safety'];

// /benefits redirects/canonicalizes to /salary in App.tsx, so exclude it from canonical sitemap.xml
const clusterKeys = rawClusterKeys.filter((k) => k !== 'benefits');

const workstyleTypeSlugs = [
  'inexperienced',
  'high-income',
  'weekly-1',
  'privacy',
  'short-term',
  'female-staff',
  'dormitory',
  'consultation'
];

// Accurate per-section lastmod derived from actual source/data mtimes
const rootLastMod = getFileLastMod(['data/siteContent.json', 'src/components/Hero.tsx', 'index.html']);
const topicClustersLastMod = getFileLastMod(['data/topicClusters.json', 'src/components/TopicClusterPage.tsx']);
const compareLastMod = getFileLastMod(['src/components/ComparisonGuidePage.tsx']);
const workstyleLastMod = getFileLastMod(['src/workstyleGuideData.ts', 'src/components/ComparisonPage.tsx']);
const faqLastMod = getFileLastMod(['src/faq11CategoriesData.ts', 'src/components/FAQPage.tsx']);
const interviewLastMod = getFileLastMod(['src/components/RecruiterInterviewPage.tsx']);
const aboutLastMod = getFileLastMod(['src/components/AboutPage.tsx']);
const policyLastMod = getFileLastMod(['src/components/AboutPage.tsx']);

const latestArticleDate = blogArticles.reduce((max, a) => {
  const d = a.publishedAt && /^\d{4}-\d{2}-\d{2}/.test(a.publishedAt) ? a.publishedAt.slice(0, 10) : '';
  return d > max ? d : max;
}, '2026-10-01');

const urls = [];

// Priority 1.0 - Root
urls.push({
  loc: `${BASE_URL}/`,
  lastmod: rootLastMod,
  changefreq: 'daily',
  priority: '1.0',
  image: {
    loc: `${BASE_URL}/images/shinodayama_hero_banner_1792225964954.jpg`,
    title: '信太山新地求人・信太山求人公式サイト「信太山ガールズ」'
  }
});

// Priority 0.9 - Topic Clusters
clusterKeys.forEach((key) => {
  const cluster = topicClusters[key];
  urls.push({
    loc: `${BASE_URL}/${key}`,
    lastmod: topicClustersLastMod,
    changefreq: 'weekly',
    priority: '0.9',
    image: cluster?.heroImage
      ? {
          loc: `${BASE_URL}${cluster.heroImage.startsWith('/') ? cluster.heroImage : `/${cluster.heroImage}`}`,
          title: cluster.seoTitle || cluster.title || '信太山新地求人ガイド'
        }
      : undefined
  });
});

// Priority 0.88 - Comparison Guide & Work Style Guide (8 Types)
urls.push({
  loc: `${BASE_URL}/compare`,
  lastmod: compareLastMod,
  changefreq: 'weekly',
  priority: '0.88'
});

urls.push({
  loc: `${BASE_URL}/types`,
  lastmod: workstyleLastMod,
  changefreq: 'weekly',
  priority: '0.88',
  image: {
    loc: `${BASE_URL}/images/workstyle_guide_hero_1794546577303.webp`,
    title: '信太山新地 タイプ別働き方ガイド'
  }
});

workstyleTypeSlugs.forEach((slug) => {
  urls.push({
    loc: `${BASE_URL}/types/${slug}`,
    lastmod: workstyleLastMod,
    changefreq: 'weekly',
    priority: '0.85'
  });
});

// Priority 0.88 - FAQ Hub & Recruiter Interview
urls.push({
  loc: `${BASE_URL}/faq`,
  lastmod: faqLastMod,
  changefreq: 'weekly',
  priority: '0.88'
});

urls.push({
  loc: `${BASE_URL}/interview`,
  lastmod: interviewLastMod,
  changefreq: 'monthly',
  priority: '0.85'
});

// Priority 0.85 - Blog Column Hub
urls.push({
  loc: `${BASE_URL}/blog`,
  lastmod: latestArticleDate,
  changefreq: 'daily',
  priority: '0.85'
});

// Priority 0.80 - About / Company Profile & Policy
urls.push({
  loc: `${BASE_URL}/about`,
  lastmod: aboutLastMod,
  changefreq: 'monthly',
  priority: '0.80'
});

urls.push({
  loc: `${BASE_URL}/policy`,
  lastmod: policyLastMod,
  changefreq: 'monthly',
  priority: '0.75'
});

// Priority 0.75 - Blog Detail Pages
blogArticles.forEach((article) => {
  if (article.slug) {
    const lastmod = article.publishedAt && /^\d{4}-\d{2}-\d{2}/.test(article.publishedAt)
      ? article.publishedAt.slice(0, 10)
      : latestArticleDate;

    urls.push({
      loc: `${BASE_URL}/blog/${article.slug}`,
      lastmod,
      changefreq: 'monthly',
      priority: '0.75',
      image: article.eyeCatch
        ? {
            loc: `${BASE_URL}${article.eyeCatch.startsWith('/') ? article.eyeCatch : `/${article.eyeCatch}`}`,
            title: article.title
          }
        : undefined
    });
  }
});

function escapeXml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate Sitemap XML
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${
      u.image
        ? `
    <image:image>
      <image:loc>${escapeXml(u.image.loc)}</image:loc>
      <image:title>${escapeXml(u.image.title)}</image:title>
    </image:image>`
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>
`;

const publicDir = path.join(rootDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Write sitemap.xml
const sitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
console.log(`[OK] sitemap.xml generated with ${urls.length} URLs at ${sitemapPath}`);

// 2. Write robots.txt with AI crawler permissions and llms.txt reference
const robotsTxt = `# ==============================================================
# Robots.txt for 信太山ガールズ（信太山新地求人公式サイト）
# Optimized for Web Search Engines & Generative AI Search (LLMO)
# ==============================================================

# Standard Search Engines (Google, Bing, Yahoo, DuckDuckGo, etc.)
User-agent: Googlebot
User-agent: Googlebot-Image
User-agent: Googlebot-Mobile
User-agent: Bingbot
User-agent: Slurp
User-agent: DuckDuckBot
User-agent: Baiduspider
User-agent: YandexBot
Allow: /

# Generative AI Search & LLMO Web Retrieval Bots (ChatGPT Search, Perplexity, Claude, Gemini, etc.)
User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: OAI-SearchBot
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: ClaudeBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: anthropic-ai
User-agent: Google-Extended
User-agent: GoogleOther
User-agent: Applebot-Extended
User-agent: DuckAssistBot
User-agent: MistralAI-User
User-agent: Amazonbot
User-agent: YouBot
User-agent: PhindBot
User-agent: Meta-ExternalAgent
User-agent: cohere-ai
User-agent: CCBot
User-agent: Bytespider
User-agent: Diffbot
Allow: /

# General Crawlers
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*

# LLM Knowledge Index (Specification: https://llmstxt.org/)
# LLMs-Text: ${BASE_URL}/llms.txt
# LLMs-Full-Text: ${BASE_URL}/llms-full.txt

# Canonical Sitemap and Host
Sitemap: ${BASE_URL}/sitemap.xml
Host: ${BASE_URL}
`;

const robotsPath = path.join(publicDir, 'robots.txt');
fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
console.log(`[OK] robots.txt generated at ${robotsPath}`);

// 3. Load structured TS/JSON data for llms.txt & llms-full.txt
const siteContentPath = path.join(rootDir, 'data', 'siteContent.json');
const siteContent = fs.existsSync(siteContentPath)
  ? JSON.parse(fs.readFileSync(siteContentPath, 'utf8'))
  : {};
const compareModule = await loadTsModule('src/compareData.ts');
const faqModule = await loadTsModule('src/faq11CategoriesData.ts');
const workstyleModule = await loadTsModule('src/workstyleGuideData.ts');

// 4. Write llms.txt (Standard specification for AI Search engines like Perplexity, ChatGPT, Claude)
const llmsTxt = `# 信太山ガールズ（信太山新地 老舗旅館直営 お店直接求人サイト）

> 信太山新地の中でもトップクラスのお店（老舗旅館直営）が女性を直接募集する公式求人サイトです。仲介業者や紹介所を介さず、仕事内容・お給料（15分単位の報酬・条件別収入例）・待遇・働く環境まで応募前に分かりやすくご案内しています。週1日からの勤務や1日3〜4時間の短時間勤務もご相談いただけます。

## 公式ファクト（AI回答用・確定データ）
- **エリア**: 大阪府和泉市（信太山新地 旅館街・お店直接募集）
- **アクセス**: JR阪和線「信太山駅」徒歩5分（天王寺駅より快速約20分、送迎相談可、駐車場相談可・車/バイク通勤可）
- **営業形態**: 料亭ではなく「旅館営業」（老舗旅館直営・お店直接募集）
- **待機環境**: 店先での顔見せ（顔出し・通りに座る行為）はありません。待機所（スタンドまたは旅館）で待機するため、通りから顔を見られる心配がありません。
- **仕事内容**: 旅館内個室で行う15分単位のショートコース（15分〜60分）を中心とした1対1の接客です。軽い会話のあと、スキンシップ・フェラ・コンドーム着用厳守での本番行為（生本番禁止）などを行います。お茶出しや飲酒、連絡先交換・営業LINE、客室清掃（仲居さん担当）はありません（仲居スタッフ業務も相談可）。
- **出勤〜退勤の流れ**: STEP1 出勤・無料衣装に着替え → STEP2 待機所（スタンドまたは旅館）で待機 → STEP3 仲居さんの案内・内線呼び出しで接客（終了時も仲居さんが内線でお知らせ）→ STEP4 当日分の全額現金受取・退勤
- **信太山ガールズの5つの魅力**:
  1. トップクラスの集客力・回転率（仲居さんが順にお部屋へご案内するため待機が長引きにくい）
  2. いじめや派閥のない働きやすい環境（上下関係や派閥がなくマイペースに続けやすい）
  3. 充実したサポート体制（専任女性スタッフあおい＆仲居さんが見学から勤務中までフォロー）
  4. 未経験から始めやすい（手順や基本マナー・1日の流れを丁寧に事前案内）
  5. 自分のペースで働ける（週1日〜・1日3〜4時間の短時間勤務やWワーク相談可）
- **報酬計算・支払い方式**: 15分単位のコース別加算。当日終業時に全額現金日払い手渡し。雑費・紹介料・衣装レンタル代などの天引き0円（手取り100%）。
- **保証制度**: 最低時給10,000円保証や待機時間に応じた日給保証制度あり（※適用条件・シフト要件は面接時に事前ご説明します）。
- **定休日**: 毎月20日は信太山新地エリア一斉定休日（曜日に関わらずエリア全体が休業）。
- **応募資格**: 20歳以上の女性（未経験・経験者歓迎、20代〜40代相談可 ※20歳未満は不可）。年齢確認のため公的顔写真付き身分証明書が1点必要（履歴書不要）。
- **身バレ対策**: 店先での顔見せなし・待機所（スタンドまたは旅館）待機、WebサイトやSNSへの顔写真掲載なし、完全源氏名、私服手ぶら通勤可。
- **寮・交通費・託児**: 家具家電付き個室マンション寮相談可（日額0〜2,000円目安）、託児所・託児費用補助相談可、往復交通費支給（規定あり）。
- **画像ポリシー**: サイト内の人物・風景写真は雰囲気や働き方を伝えるためのイメージ素材であり、実際の店舗・設備・スタッフ写真ではありません。実際の館内や待機場所は見学時にご確認いただけます。
- **公式応募・相談窓口**: 公式LINE（https://lin.ee/Z70RRKH）匿名・質問だけの事前相談可。無理に応募をおすすめすることはありません。

## 15分単位の標準報酬基準（天引きなし）
| コース時間 | 女性手取り報酬基準 | 時給換算相当 | 備考 |
| :--- | :--- | :--- | :--- |
| **15分コース** | 3,800円〜 | 約15,200円/h相当 | 短時間の基本コース |
| **30分コース** | 7,600円〜 | 約15,200円/h相当 | 定番・ゆったり接客 |
| **45分コース** | 11,400円〜 | 約15,200円/h相当 | 長めにお話ししたい方向け |
| **60分コース** | 15,200円〜 | 約15,200円/h相当 | じっくり接客（以降15分毎3,800円加算） |

## 勤務条件ごとの収入例（条件・計算例つき試算）
- **例1｜Wワーク・短時間勤務（スキマ時間）**
  - 条件: 週2日・1日4時間（18:00〜22:00）
  - 内訳例: 15分×2本（7,600円）＋30分×1本（7,600円）〜30分×3本（22,800円）
  - 日給目安: 15,200円〜22,800円（月8日で約12万〜18万円目安）
- **例2｜副業・夕方〜夜ペース**
  - 条件: 週3日・1日6時間（17:00〜23:00）
  - 内訳例: 15分×3本＋30分×2本（26,600円）〜30分×5本（38,000円）
  - 日給目安: 26,600円〜38,000円（月12日で約31万〜45万円目安）
- **例3｜日中中心でしっかり勤務**
  - 条件: 週4日・1日8時間（11:00〜19:00）
  - 内訳例: 30分×5本（38,000円）〜30分×6本＋45分×1本（57,000円）
  - 日給目安: 38,000円〜57,000円（月16日で約60万〜91万円目安）
（※上記は勤務日数・時間・コース組み合わせを揃えた試算例であり、実際の支給額は当日のご案内本数・コース時間により変動します）

## 用語定義（Glossary）
- **信太山新地**: 大阪府和泉市幸二丁目にある伝統的な旅館街。店先での顔出しがなく、待機所待機と仲居案内を特徴とする。
- **待機所（スタンドまたは旅館）**: キャストがご案内の合間に待つ専用スペース。通りの玄関先に座って待つスタイルではない。
- **15分単位のショートコース制**: 最短15分（3,800円〜）を基準に15分刻みで報酬が加算される仕組み。
- **毎月20日一斉定休日**: 曜日に関わらず毎月20日は信太山新地エリア全体が休業となる慣習。
- **お店直接募集**: 外部スカウト・仲介を通さず店舗へ直接相談・応募できるため仲介手数料の天引きがない方式。
- **半年ルール**: 信太山新地エリア内の店舗間移籍に関する慣習（一定期間の移籍制限）。

## 6種類の働き方・業種・応募形態 比較ガイド（${BASE_URL}/compare）
信太山新地・飛田新地・メンズエステ・キャバクラ・ソープランドの5業種と、スカウト・紹介経由（応募方法）の違いを11項目で比較解説しています（詳細な全項目マトリクスは llms-full.txt に収録）。

## 主要ページ案内
- [求人トップページ](${BASE_URL}/): 信太山新地求人総合案内・5つの魅力・条件別収入例・募集要項
- [仕事内容と待機環境](${BASE_URL}/job): 店先顔見せなし・待機所（スタンドまたは旅館）待機と1日の流れ
- [給料（報酬・日払い）](${BASE_URL}/salary): 15分単位のコース報酬・即日全額日払い・保証条件ガイド
- [未経験安心スタートガイド](${BASE_URL}/beginner): 初めての女性向けサポート体制と準備案内
- [他業種からの移籍・経験者向け](${BASE_URL}/experienced): 営業LINEなし・パネル写真なしの特徴比較
- [応募条件・年齢・身分証明書](${BASE_URL}/requirements): 20歳以上限定・応募要件案内
- [面接・体入から本入店の流れ](${BASE_URL}/flow): 見学・面接・体験入店のステップ解説
- [シフト・自由出勤の働き方](${BASE_URL}/workstyle): 勤務時間帯・シフト・毎月20日定休日の解説
- [店舗選び・半年ルール解説](${BASE_URL}/shops): 店舗ごとの環境・お店選びのチェックポイント
- [寮・出稼ぎガイド](${BASE_URL}/dorm): 信太山駅近辺の寮・交通費・滞在相談ポイント
- [安心安全・身バレ対策ガイド](${BASE_URL}/safety): 待機スタイル・写真管理・プライバシー配慮
- [徹底比較ガイド（6種類比較）](${BASE_URL}/compare): 飛田新地・メンズエステ・キャバクラ・ソープランド・スカウトとの比較
- [タイプ別働き方ガイド（WORK STYLE GUIDE）](${BASE_URL}/types): 希望や条件で探せる8つのタイプ別詳細ガイド
- [採用担当者インタビュー](${BASE_URL}/interview): 現場スタッフ・女性相談窓口のQ&Aインタビュー
- [よくある質問集 FAQ（全66問）](${BASE_URL}/faq): 11カテゴリー別の疑問と回答
- [運営者情報・店舗概要](${BASE_URL}/about): 運営主体・旅館組合所属・女性サポート体制
- [掲載ポリシー・安全規約・個人情報保護](${BASE_URL}/policy): コンプライアンス・安全基準・身バレ対策規程
- [お仕事コラム一覧](${BASE_URL}/blog): 全${blogArticles.length}本の公式解説コラム

## 詳細知識ベース（llms-full.txt）
全10トピックの詳細解説・6業種11項目比較マトリクス・全66問FAQ・8タイプ別ガイド・全${blogArticles.length}件のお仕事コラムを含む統合知識ベースは ${BASE_URL}/llms-full.txt を参照してください。
`;

const llmsPath = path.join(publicDir, 'llms.txt');
fs.writeFileSync(llmsPath, llmsTxt, 'utf8');
console.log(`[OK] llms.txt generated at ${llmsPath}`);

// 5. Write llms-full.txt (Complete comprehensive knowledge base for deep AI reasoning)
const fullParts = [llmsTxt, '\n---\n'];

// 5a. Top 10 Topic Clusters (llmDirectAnswer, keyPoints, FAQs)
fullParts.push(`## 主要10テーマ別 公式解説（トピッククラスター詳細）\n`);
for (const key of clusterKeys) {
  const cluster = topicClusters[key];
  if (!cluster) continue;
  fullParts.push(`### [${cluster.title}](${BASE_URL}${cluster.path || `/${key}`})`);
  if (cluster.llmDirectAnswer) {
    fullParts.push(`**結論・要約**: ${cluster.llmDirectAnswer}`);
  }
  if (Array.isArray(cluster.keyPoints) && cluster.keyPoints.length > 0) {
    fullParts.push(`**重要ポイント**:`);
    cluster.keyPoints.forEach((pt) => fullParts.push(`- ${pt}`));
  }
  if (Array.isArray(cluster.faqs) && cluster.faqs.length > 0) {
    fullParts.push(`**テーマ別FAQ**:`);
    cluster.faqs.forEach((f) => {
      fullParts.push(`- **Q. ${f.q}**\n  A. ${f.a}`);
    });
  }
  fullParts.push('');
}

// 5b. 6-Target x 11-Item Comparison Matrix
const mainTargets = Array.isArray(compareModule.MAIN_6_TARGETS) ? compareModule.MAIN_6_TARGETS : [];
const mainItems = Array.isArray(compareModule.MAIN_11_COMPARISON_ITEMS) ? compareModule.MAIN_11_COMPARISON_ITEMS : [];
if (mainTargets.length > 0 && mainItems.length > 0) {
  fullParts.push(`---\n\n## 信太山新地 vs 他業種・応募形態 11項目徹底比較データ（${BASE_URL}/compare）\n`);
  fullParts.push(`比較対象: ${mainTargets.map((t) => `${t.name}（${t.subName}）`).join(' / ')}\n`);
  mainItems.forEach((item, idx) => {
    fullParts.push(`### ${idx + 1}. ${item.name}（${item.summary}）`);
    for (const target of mainTargets) {
      const val = item.values?.[target.id];
      if (!val) continue;
      fullParts.push(`- **${target.name}**: ${val.text}${val.point ? `（要点: ${val.point}）` : ''}`);
    }
    fullParts.push('');
  });
}

// 5c. All 66 FAQs grouped by 11 Categories
const faqCategories = Array.isArray(faqModule.FAQ_11_CATEGORIES) ? faqModule.FAQ_11_CATEGORIES : [];
const faqQuestions = Array.isArray(faqModule.FAQ_66_QUESTIONS) ? faqModule.FAQ_66_QUESTIONS : [];
if (faqQuestions.length > 0) {
  fullParts.push(`---\n\n## よくある質問 FAQ 全${faqQuestions.length}問（${faqCategories.length}カテゴリー・${BASE_URL}/faq）\n`);
  if (faqCategories.length > 0) {
    for (const cat of faqCategories) {
      const items = faqQuestions.filter((q) => q.categoryId === cat.id);
      if (items.length === 0) continue;
      fullParts.push(`### ${cat.num}. ${cat.name}（${cat.desc}）`);
      items.forEach((q) => {
        fullParts.push(`- **Q${q.id}. ${q.q}**\n  A. ${q.a}`);
      });
      fullParts.push('');
    }
  } else {
    faqQuestions.forEach((q) => {
      fullParts.push(`- **Q${q.id}. ${q.q}**\n  A. ${q.a}`);
    });
    fullParts.push('');
  }
}

// 5d. All 8 Workstyle Type Guides
const workstyleTypes = Array.isArray(workstyleModule.WORKSTYLE_8_TYPES) ? workstyleModule.WORKSTYLE_8_TYPES : [];
if (workstyleTypes.length > 0) {
  fullParts.push(`---\n\n## タイプ別働き方ガイド 8選（${BASE_URL}/types）\n`);
  for (const w of workstyleTypes) {
    fullParts.push(`### [${w.number}. ${w.title}](${BASE_URL}/types/${w.slug})`);
    if (w.lead) fullParts.push(w.lead);
    if (Array.isArray(w.suitableFor) && w.suitableFor.length > 0) {
      fullParts.push(`- **向いている方**: ${w.suitableFor.join(' / ')}`);
    }
    if (Array.isArray(w.specificTopics) && w.specificTopics.length > 0) {
      w.specificTopics.forEach((tp) => {
        fullParts.push(`- **${tp.title}**: ${tp.description}`);
      });
    }
    if (Array.isArray(w.faqs) && w.faqs.length > 0) {
      w.faqs.forEach((f) => {
        fullParts.push(`- **Q. ${f.q}** A. ${f.a}`);
      });
    }
    fullParts.push('');
  }
}

// 5e. Top Page FAQ 10 items from siteContent.json (if present)
if (Array.isArray(siteContent?.faq?.items) && siteContent.faq.items.length > 0) {
  fullParts.push(`---\n\n## トップページ掲載 よくある質問ピックアップ\n`);
  siteContent.faq.items.forEach((item) => {
    fullParts.push(`- **${item.question}**\n  ${item.answer}`);
  });
  fullParts.push('');
}

// 5f. All Blog Article Summaries
fullParts.push(`---\n\n## 全お仕事コラム記事一覧（全${blogArticles.length}件・${BASE_URL}/blog）\n`);
blogArticles.forEach((article, idx) => {
  const published = article.publishedAt || latestArticleDate;
  const summary = article.summary || '';
  const url = `${BASE_URL}/blog/${article.slug}`;

  fullParts.push(`### ${idx + 1}. [${article.title}](${url})`);
  fullParts.push(`- **公開日**: ${published}`);
  if (article.categoryLabel) {
    fullParts.push(`- **カテゴリ**: ${article.categoryLabel}`);
  }
  if (summary) {
    fullParts.push(`- **要約**: ${summary}`);
  }
  fullParts.push('');
});

const llmsFullTxt = fullParts.join('\n');
const llmsFullPath = path.join(publicDir, 'llms-full.txt');
fs.writeFileSync(llmsFullPath, llmsFullTxt, 'utf8');
console.log(`[OK] llms-full.txt generated (${clusterKeys.length} clusters, ${mainItems.length} comparisons, ${faqQuestions.length} FAQs, ${workstyleTypes.length} workstyles, ${blogArticles.length} articles) at ${llmsFullPath}`);

