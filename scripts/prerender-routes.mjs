import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const BASE_DOMAIN = 'https://osaka-shinodayamashinchi-recruit.com';
const DEFAULT_IMAGE = `${BASE_DOMAIN}/images/shinodayama_hero_banner_1792225964954.jpg`;

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function toAbsoluteUrl(maybePath) {
  if (!maybePath) return DEFAULT_IMAGE;
  const clean = String(maybePath).trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) return clean;
  return `${BASE_DOMAIN}${clean.startsWith('/') ? clean : `/${clean}`}`;
}

function upsertMeta(html, attrName, attrVal, content) {
  const escaped = escapeHtml(content);
  const regex = new RegExp(`<meta\\s+${attrName}="${attrVal}"\\s+content="[\\s\\S]*?"\\s*\\/?>`, 'i');
  const tag = `<meta ${attrName}="${attrVal}" content="${escaped}" />`;
  if (regex.test(html)) {
    return html.replace(regex, tag);
  }
  return html.replace('</head>', `  ${tag}\n  </head>`);
}

function buildRouteHtml(baseHtml, routeMeta) {
  let html = baseHtml;
  const title = routeMeta.title;
  const description = routeMeta.description;
  const canonicalUrl = routeMeta.canonicalUrl;
  const ogType = routeMeta.ogType || 'website';
  const imageUrl = toAbsoluteUrl(routeMeta.imagePath);

  // Title & meta description & canonical
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = upsertMeta(html, 'name', 'description', description);
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );

  // OpenGraph & Twitter Card
  html = upsertMeta(html, 'property', 'og:title', title);
  html = upsertMeta(html, 'property', 'og:description', description);
  html = upsertMeta(html, 'property', 'og:type', ogType);
  html = upsertMeta(html, 'property', 'og:url', canonicalUrl);
  html = upsertMeta(html, 'property', 'og:image', imageUrl);
  html = upsertMeta(html, 'property', 'og:image:secure_url', imageUrl);
  html = upsertMeta(html, 'property', 'og:image:alt', title);

  html = upsertMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = upsertMeta(html, 'name', 'twitter:title', title);
  html = upsertMeta(html, 'name', 'twitter:description', description);
  html = upsertMeta(html, 'name', 'twitter:image', imageUrl);
  html = upsertMeta(html, 'name', 'twitter:image:alt', title);

  // Inject route-specific BreadcrumbList JSON-LD into <head> for immediate crawler parsing
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: '信太山新地求人トップ',
      item: `${BASE_DOMAIN}/`
    }
  ];
  if (routeMeta.parentBreadcrumb) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: routeMeta.parentBreadcrumb.name,
      item: `${BASE_DOMAIN}${routeMeta.parentBreadcrumb.path}`
    });
  }
  breadcrumbItems.push({
    '@type': 'ListItem',
    position: breadcrumbItems.length + 1,
    name: routeMeta.heading || title,
    item: canonicalUrl
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems
  };
  const breadcrumbScript = `<script id="prerender-breadcrumb-schema" type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`;
  html = html.replace('</head>', `  ${breadcrumbScript}\n  </head>`);

  // Replace generic root <noscript> with route-specific semantic content so crawlers see unique page HTML
  const heading = escapeHtml(routeMeta.heading || title);
  const bodyHtml = routeMeta.noscriptBodyHtml || `<p>${escapeHtml(description)}</p>`;
  const routeNoscript = `<noscript>
      <header>
        <p><a href="${BASE_DOMAIN}/">信太山新地求人サイト「信太山ガールズ」</a></p>
      </header>
      <main>
        <article>
          <h1>${heading}</h1>
          ${bodyHtml}
          <nav aria-label="関連ページ">
            <ul>
              <li><a href="${BASE_DOMAIN}/">信太山新地求人・信太山求人 トップページ</a></li>
              <li><a href="${BASE_DOMAIN}/job">仕事内容（15分短時間・顔出しなし）</a></li>
              <li><a href="${BASE_DOMAIN}/salary">給料・日払いシステム（15分3,800円〜）</a></li>
              <li><a href="${BASE_DOMAIN}/beginner">未経験スタート安心ガイド</a></li>
              <li><a href="${BASE_DOMAIN}/workstyle">働き方・自由出勤・週1日〜</a></li>
              <li><a href="${BASE_DOMAIN}/dorm">寮・出稼ぎガイド</a></li>
              <li><a href="${BASE_DOMAIN}/safety">身バレ対策・プライバシー配慮</a></li>
              <li><a href="${BASE_DOMAIN}/compare">信太山新地 徹底比較ガイド</a></li>
              <li><a href="${BASE_DOMAIN}/types">タイプ別働き方ガイド（WORK STYLE GUIDE）</a></li>
              <li><a href="${BASE_DOMAIN}/faq">よくある質問 FAQ（66問）</a></li>
              <li><a href="${BASE_DOMAIN}/blog">お仕事コラム一覧</a></li>
            </ul>
          </nav>
        </article>
      </main>
    </noscript>`;

  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/i, routeNoscript);
  return html;
}

function writeRouteFiles(routePath, htmlContent) {
  const cleanRoute = routePath.replace(/^\/+|\/+$/g, '');
  if (!cleanRoute) return;

  // 1. Write dist/<route>.html (serves extensionless URLs on GitHub Pages with HTTP 200)
  const flatFile = path.join(distDir, `${cleanRoute}.html`);
  fs.mkdirSync(path.dirname(flatFile), { recursive: true });
  fs.writeFileSync(flatFile, htmlContent, 'utf8');

  // 2. Write dist/<route>/index.html (serves trailing-slash URLs with HTTP 200)
  const dirIndexFile = path.join(distDir, cleanRoute, 'index.html');
  fs.mkdirSync(path.dirname(dirIndexFile), { recursive: true });
  fs.writeFileSync(dirIndexFile, htmlContent, 'utf8');
}

function main() {
  if (!fs.existsSync(distDir)) {
    console.error('[prerender] dist directory not found. Run vite build first.');
    process.exit(1);
  }

  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('[prerender] dist/index.html not found.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf8');

  // Copy SPA 404.html fallback & .htaccess before mutating subroutes
  fs.writeFileSync(path.join(distDir, '404.html'), baseHtml, 'utf8');
  const htaccessSrc = path.join(rootDir, '.htaccess');
  if (fs.existsSync(htaccessSrc)) {
    fs.copyFileSync(htaccessSrc, path.join(distDir, '.htaccess'));
  }

  const routes = [];

  // 1. Core static routes
  routes.push({
    route: 'compare',
    title: '信太山新地・他業種 徹底比較｜飛田新地・メンエス・キャバクラとの違い',
    description:
      '信太山新地と飛田新地・メンズエステ・キャバクラ・ソープランド、スカウト経由との違いを11項目で比較。仕事内容、接客スタイル、給料の仕組み、勤務時間、身バレ対策まで詳しく解説します。',
    canonicalUrl: `${BASE_DOMAIN}/compare`,
    heading: '信太山新地 徹底比較ガイド（6種類の違いを11項目で比較）',
    noscriptBodyHtml:
      '<p>信太山新地・飛田新地・メンズエステ・キャバクラ・ソープランドの5業種と、スカウト・紹介経由（応募方法）の違いを11項目（仕事内容・接客スタイル・お給料の仕組み・勤務時間・出勤の自由度・未経験からの始めやすさ・集客方法・ノルマ罰金・身バレ対策・応募採用方法・働く前の確認事項）で比較解説しています。</p>'
  });

  routes.push({
    route: 'types',
    title: '信太山新地 タイプ別働き方ガイド｜未経験・週1日・顔出しなし【公式】',
    description:
      '未経験から始めたい方、収入を重視したい方、勤務日数やプライバシーが気になる方まで。あなたの希望やライフスタイルに合わせて、知りたい情報を8つのタイプ別にご紹介します。',
    canonicalUrl: `${BASE_DOMAIN}/types`,
    imagePath: '/images/workstyle_guide_hero_1794546577303.jpg',
    heading: 'あなたに合った働き方を見つけよう。（信太山新地 タイプ別ガイド）',
    noscriptBodyHtml:
      '<p>未経験から始めたい、高収入を目指したい、週1日から働きたい、顔出しなし・身バレ対策、短時間・短期で働きたい、女性スタッフに相談したい、出稼ぎ・寮付き希望、まずは話を聞きたいの8タイプ別に条件や確認ポイントをご案内します。</p>'
  });

  // 2. 8 Workstyle Types + Legacy Aliases
  const workstyleMetaList = [
    {
      slug: 'inexperienced',
      title: '未経験から始めたい｜信太山新地・信太山求人 働き方ガイド',
      description:
        '初めてのお仕事で不安がある方へ。仕事内容や接客の流れ、応募から面接までの流れ、事前に確認したいことをご紹介します。'
    },
    {
      slug: 'high-income',
      title: '高収入を目指したい｜信太山新地・信太山求人 働き方ガイド',
      description:
        '報酬の仕組みやコース料金、収入に関係する条件について知りたい方へ。実際の報酬や控除、収入に影響するポイントを解説します。'
    },
    {
      slug: 'weekly-1',
      title: '週1日から働きたい｜信太山新地・信太山求人 働き方ガイド',
      description:
        '毎日出勤するのは難しい方や、自分の予定に合わせて働きたい方へ。出勤日数やシフト、勤務条件の確認ポイントをご紹介します。'
    },
    {
      slug: 'privacy',
      title: '顔出しなし・身バレ対策｜信太山新地・信太山求人 働き方ガイド',
      description:
        '知人や家族に知られたくない、プライバシーが気になる方へ。写真掲載・個人情報・SNSなど、応募前に確認しておきたいポイントをご紹介します。'
    },
    {
      slug: 'short-term',
      title: '短時間・短期で働きたい｜信太山新地・信太山求人 働き方ガイド',
      description:
        '長時間の勤務が難しい方や、働ける期間が限られている方へ。勤務時間・短時間勤務・期間などの相談ポイントを解説します。'
    },
    {
      slug: 'female-staff',
      title: '女性スタッフに相談したい｜信太山新地・信太山求人 働き方ガイド',
      description:
        '男性には相談しにくいことや、女性目線で聞いてみたいことがある方へ。応募前の疑問や不安を相談する方法をご案内します。'
    },
    {
      slug: 'dormitory',
      title: '出稼ぎ・寮付き希望｜信太山新地・信太山求人 働き方ガイド',
      description:
        '遠方から働くことを検討している方へ。寮の有無・利用条件・交通費・滞在期間など、事前に確認したい内容をご紹介します。'
    },
    {
      slug: 'consultation',
      title: 'まずは話を聞きたい｜信太山新地・信太山求人 働き方ガイド',
      description:
        'まだ応募するか決めていない方や、まずは情報収集から始めたい方へ。仕事内容や待遇、お店選びなど、気になることを相談する方法をご案内します。'
    }
  ];

  workstyleMetaList.forEach((item) => {
    const parentBreadcrumb = { name: 'タイプ別働き方ガイド', path: '/types' };
    routes.push({
      route: `types/${item.slug}`,
      title: item.title,
      description: item.description,
      canonicalUrl: `${BASE_DOMAIN}/types/${item.slug}`,
      imagePath: '/images/workstyle_guide_hero_1794546577303.jpg',
      heading: item.title.split('｜')[0],
      parentBreadcrumb
    });
    routes.push({
      route: `compare/${item.slug}`,
      title: item.title,
      description: item.description,
      canonicalUrl: `${BASE_DOMAIN}/types/${item.slug}`,
      imagePath: '/images/workstyle_guide_hero_1794546577303.jpg',
      heading: item.title.split('｜')[0],
      parentBreadcrumb
    });
  });

  // Legacy type aliases
  const legacyTypeAliases = [
    { from: 'double-work', to: 'privacy' },
    { from: 'age-20s', to: 'consultation' },
    { from: 'age-30s', to: 'consultation' }
  ];
  legacyTypeAliases.forEach(({ from, to }) => {
    const target = workstyleMetaList.find((m) => m.slug === to);
    if (!target) return;
    [`types/${from}`, `compare/${from}`].forEach((route) => {
      routes.push({
        route,
        title: target.title,
        description: target.description,
        canonicalUrl: `${BASE_DOMAIN}/types/${to}`,
        imagePath: '/images/workstyle_guide_hero_1794546577303.jpg',
        heading: target.title.split('｜')[0],
        parentBreadcrumb: { name: 'タイプ別働き方ガイド', path: '/types' }
      });
    });
  });

  // 3. FAQ, Interview, About
  routes.push({
    route: 'faq',
    title: '信太山新地・信太山求人のよくある質問 FAQ（66問）【公式】',
    description:
      '信太山新地求人・信太山求人のよくある質問全66問を11カテゴリーで整理。未経験の面接・顔出しなし・日払い給料・寮・身バレ対策・シフト・半年ルールなど働く前の疑問にお答えします。',
    canonicalUrl: `${BASE_DOMAIN}/faq`,
    heading: 'よくある質問 FAQ（全66問・11カテゴリー）',
    noscriptBodyHtml:
      '<p>未経験からの始め方、仕事内容、給与・日払い、シフト・働き方、身バレ対策・プライバシー、寮・出稼ぎ、面接・体験入店、店舗選び・半年ルールなど全66問のQ&Aを掲載しています。</p>'
  });

  routes.push({
    route: 'interview',
    title: '旅館の求人・採用担当者インタビュー｜信太山新地 旅館直営公式採用',
    description:
      '信太山新地の老舗旅館直営採用。面接・給与担当と女性相談窓口スタッフが信太山新地の現場実態に回答。待機スタイル、未経験スタート、給与、面接内容まで詳しく解説。',
    canonicalUrl: `${BASE_DOMAIN}/interview`,
    ogType: 'article',
    heading: '旅館の求人・採用担当者インタビュー'
  });

  routes.push({
    route: 'about',
    title: '運営者情報・店舗概要｜信太山ガールズ（信太山新地 旅館直営公式採用窓口）',
    description:
      '信太山新地の旅館直営公式求人「信太山ガールズ」の運営者情報、店舗概要、所在地（大阪府和泉市）、サポート体制、コンプライアンス方針、個人情報保護規程を明示しています。',
    canonicalUrl: `${BASE_DOMAIN}/about`,
    heading: '運営者情報・店舗概要（信太山ガールズ）'
  });

  // 4. Topic Clusters from data/topicClusters.json
  const topicClustersPath = path.join(rootDir, 'data', 'topicClusters.json');
  if (fs.existsSync(topicClustersPath)) {
    const clusters = JSON.parse(fs.readFileSync(topicClustersPath, 'utf8'));
    Object.entries(clusters).forEach(([key, data]) => {
      const canonicalPath = key === 'benefits' ? '/salary' : data.path || `/${key}`;
      routes.push({
        route: key,
        title: data.seoTitle || `${data.title}｜信太山新地求人 公式ガイド`,
        description: data.metaDescription || data.overview || data.tagline || '',
        canonicalUrl: `${BASE_DOMAIN}${canonicalPath}`,
        ogType: 'article',
        imagePath: data.heroImage,
        heading: data.title,
        noscriptBodyHtml: `<p>${escapeHtml(data.overview || data.metaDescription || '')}</p>`
      });
    });
  }

  // 5. Blog Listing & All Articles
  routes.push({
    route: 'blog',
    title: '信太山新地求人・信太山求人 お仕事コラム一覧｜信太山ガールズ公式',
    description:
      '信太山新地の仕事内容、給料システム、旅館個室待機、顔出しなしルール、未経験向けガイドなど働く前に役立つ公式解説コラム一覧。',
    canonicalUrl: `${BASE_DOMAIN}/blog`,
    heading: '信太山新地求人 お仕事コラム一覧'
  });

  const articlesPath = path.join(rootDir, 'data', 'blogArticles.json');
  if (fs.existsSync(articlesPath)) {
    const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    articles.forEach((article) => {
      if (!article.slug) return;
      routes.push({
        route: `blog/${article.slug}`,
        title: `${article.title}｜信太山新地お仕事コラム【信太山ガールズ公式】`,
        description:
          article.summary || `${article.title}についての信太山新地公式解説記事です。`,
        canonicalUrl: `${BASE_DOMAIN}/blog/${article.slug}`,
        ogType: 'article',
        imagePath: article.eyeCatch,
        heading: article.title,
        parentBreadcrumb: { name: 'お仕事コラム一覧', path: '/blog' },
        noscriptBodyHtml: `<p>${escapeHtml(article.summary || '')}</p>`
      });
    });
  }

  // Render all routes
  routes.forEach((meta) => {
    const html = buildRouteHtml(baseHtml, meta);
    writeRouteFiles(meta.route, html);
  });

  console.log(`[prerender] Successfully generated static HTTP-200 HTML for ${routes.length} routes in dist/`);
}

main();
