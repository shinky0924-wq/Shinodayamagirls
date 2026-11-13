import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const BASE_DOMAIN = 'https://osaka-shinodayamashinchi-recruit.com';
const DEFAULT_IMAGE = `${BASE_DOMAIN}/images/shinodayama_hero_banner_1792225964954.jpg`;
const DEFAULT_ROBOTS = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

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

function extractFaqQuestionsFromTs(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const src = fs.readFileSync(filePath, 'utf8');
  const results = [];
  const itemRegex = /q:\s*(['"])((?:\\.|(?!\1).)*)\1\s*,\s*a:\s*(['"])((?:\\.|(?!\3).)*)\3/gs;
  let m;
  while ((m = itemRegex.exec(src)) !== null) {
    results.push({ q: m[2], a: m[4] });
  }
  return results;
}

function extractWorkstyleDetailsFromTs(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const src = fs.readFileSync(filePath, 'utf8');
  const map = {};
  const slugBlocks = src.split(/slug:\s*['"]([a-z0-9-]+)['"]/).slice(1);
  for (let i = 0; i < slugBlocks.length; i += 2) {
    const slug = slugBlocks[i];
    const block = slugBlocks[i + 1] || '';
    const leadMatch = block.match(/lead:\s*['"]([\s\S]*?)['"]/);
    const suitableMatches = [...block.matchAll(/suitableFor:\s*\[([\s\S]*?)\]/g)]
      .flatMap((m) => [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]))
      .slice(0, 4);
    const topicMatches = [...block.matchAll(/title:\s*['"]([^'"]+)['"]\s*,\s*description:\s*['"]([^'"]+)['"]/g)]
      .map((m) => ({ title: m[1], description: m[2] }))
      .slice(0, 5);
    map[slug] = {
      lead: leadMatch ? leadMatch[1] : '',
      suitableFor: suitableMatches,
      topics: topicMatches
    };
  }
  return map;
}

function formatBlogSeoTitle(articleTitle = '') {
  const cleanTitle = String(articleTitle).trim();
  const suffix = '｜信太山ガールズ';
  if (`${cleanTitle}${suffix}`.length <= 60) {
    return `${cleanTitle}${suffix}`;
  }
  if (cleanTitle.length <= 60) {
    return cleanTitle;
  }
  return `${cleanTitle.slice(0, 58)}…`;
}

function formatMetaDescription(rawDescription = '', fallback = '') {
  const normalized = String(rawDescription || fallback).replace(/\s+/g, ' ').trim();
  if (normalized.length <= 155) return normalized;
  const sliced = normalized.slice(0, 140);
  const lastPeriod = Math.max(sliced.lastIndexOf('。'), sliced.lastIndexOf('、'), sliced.lastIndexOf(' '));
  if (lastPeriod >= 90) {
    const candidate = sliced.slice(0, lastPeriod + (sliced[lastPeriod] === '。' ? 1 : 0));
    return candidate.endsWith('。') ? candidate : `${candidate}…`;
  }
  return `${sliced}…`;
}

function renderBlogParagraphWithLinks(text = '') {
  const parts = String(text).split(/(\[[^\]]+\]\(\/[^\)]+\))/g);
  return parts
    .map((part) => {
      const m = part.match(/^\[([^\]]+)\]\((\/[^\)]+)\)$/);
      if (!m) return escapeHtml(part);
      const label = escapeHtml(m[1]);
      const href = escapeHtml(`${BASE_DOMAIN}${m[2]}`);
      return `<a href="${href}" class="text-rose-600 font-bold underline">${label}</a>`;
    })
    .join('');
}

function renderBlogArticleContentHtml(article) {
  if (!article) return '';
  const chunks = [];
  if (article.summary) {
    chunks.push(`<section class="bg-rose-50/70 rounded-2xl p-4 sm:p-5 border border-rose-200 mb-6"><p id="llm-article-summary-text" class="text-sm text-zinc-700 leading-relaxed">${escapeHtml(article.summary)}</p></section>`);
  }
  const content = article.content;
  if (Array.isArray(content)) {
    for (const block of content) {
      if (!block || !block.type) continue;
      if (block.type === 'h2') {
        chunks.push(`<h2 class="text-lg sm:text-xl font-bold text-zinc-900 mt-6 mb-3">${escapeHtml(block.text || '')}</h2>`);
      } else if (block.type === 'h3') {
        chunks.push(`<h3 class="text-base font-bold text-zinc-800 mt-5 mb-2">${escapeHtml(block.text || '')}</h3>`);
      } else if (block.type === 'p') {
        chunks.push(`<p class="text-sm sm:text-base text-zinc-700 leading-relaxed mb-4">${renderBlogParagraphWithLinks(block.text || '')}</p>`);
      } else if (block.type === 'list' && Array.isArray(block.items)) {
        const lis = block.items.map((item) => `<li>${renderBlogParagraphWithLinks(item)}</li>`).join('');
        chunks.push(`<ul class="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 mb-4">${lis}</ul>`);
      } else if (block.type === 'qna') {
        chunks.push(`<div class="bg-rose-50/40 rounded-xl p-4 border border-rose-100 mb-4"><p class="font-bold text-sm text-zinc-900 mb-1">Q. ${escapeHtml(block.question || '')}</p><p class="text-sm text-zinc-700 leading-relaxed">A. ${renderBlogParagraphWithLinks(block.answer || block.text || '')}</p></div>`);
      }
    }
  } else if (content && typeof content === 'object') {
    if (content.intro) {
      chunks.push(`<p class="text-sm sm:text-base text-zinc-700 leading-relaxed mb-4">${renderBlogParagraphWithLinks(content.intro)}</p>`);
    }
    if (Array.isArray(content.sections)) {
      for (const sec of content.sections) {
        if (sec.heading) {
          chunks.push(`<h2 class="text-lg sm:text-xl font-bold text-zinc-900 mt-6 mb-3">${escapeHtml(sec.heading)}</h2>`);
        }
        if (sec.body) {
          chunks.push(`<p class="text-sm sm:text-base text-zinc-700 leading-relaxed mb-4">${renderBlogParagraphWithLinks(sec.body)}</p>`);
        }
        if (Array.isArray(sec.points) && sec.points.length) {
          chunks.push(`<ul class="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 mb-4">${sec.points.map((pt) => `<li>${renderBlogParagraphWithLinks(pt)}</li>`).join('')}</ul>`);
        }
      }
    }
    if (Array.isArray(content.faqs) && content.faqs.length) {
      for (const f of content.faqs) {
        chunks.push(`<div class="bg-rose-50/40 rounded-xl p-4 border border-rose-100 mb-4"><p class="font-bold text-sm text-zinc-900 mb-1">Q. ${escapeHtml(f.question || '')}</p><p class="text-sm text-zinc-700 leading-relaxed">A. ${escapeHtml(f.answer || '')}</p></div>`);
      }
    }
  }
  return chunks.join('');
}

function buildSsrRootShell(routeMeta) {
  const heading = escapeHtml(routeMeta.heading || routeMeta.title);
  const lead = escapeHtml(routeMeta.leadText || routeMeta.description || '');
  const body = routeMeta.ssrBodyHtml || routeMeta.noscriptBodyHtml || '';
  return `<div id="root"><div class="min-h-screen bg-[#faf6f7] text-zinc-900 pt-20 pb-16 px-4 sm:px-6"><div class="max-w-4xl mx-auto"><header class="mb-6 pb-4 border-b border-rose-100 flex items-center justify-between"><a href="${BASE_DOMAIN}/" class="font-bold text-rose-600 text-base">信太山ガールズ｜信太山新地求人 公式</a><nav aria-label="主要メニュー" class="flex flex-wrap gap-3 text-xs text-zinc-600"><a href="${BASE_DOMAIN}/job">仕事内容</a><a href="${BASE_DOMAIN}/salary">給料</a><a href="${BASE_DOMAIN}/beginner">未経験</a><a href="${BASE_DOMAIN}/compare">徹底比較</a><a href="${BASE_DOMAIN}/types">働き方ガイド</a><a href="${BASE_DOMAIN}/faq">FAQ</a><a href="${BASE_DOMAIN}/blog">コラム</a></nav></header><main><article class="bg-white rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xs"><h1 class="text-2xl sm:text-3xl font-extrabold text-zinc-900 leading-snug mb-4">${heading}</h1>${routeMeta.hideLeadInSsr ? '' : `<p class="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">${lead}</p>`}${body}</article></main></div></div></div>`;
}

function stripRootOnlyStructuredData(html) {
  return html.replace(
    /<script\s+id="root-structured-data"\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    () => {
      const subpageBaseGraph = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${BASE_DOMAIN}/#website`,
            url: `${BASE_DOMAIN}/`,
            name: '信太山ガールズ（信太山新地求人公式サイト）',
            inLanguage: 'ja-JP',
            publisher: {
              '@id': `${BASE_DOMAIN}/#organization`
            }
          },
          {
            '@type': 'Organization',
            '@id': `${BASE_DOMAIN}/#organization`,
            name: '信太山ガールズ（旅館直営求人・女性採用サポート）',
            url: `${BASE_DOMAIN}/`,
            logo: {
              '@type': 'ImageObject',
              url: `${BASE_DOMAIN}/favicon.png`
            }
          }
        ]
      };
      return `<script id="subpage-base-schema" type="application/ld+json">${JSON.stringify(subpageBaseGraph)}</script>`;
    }
  );
}

function buildRouteHtml(baseHtml, routeMeta) {
  let html = baseHtml;
  const title = routeMeta.title;
  const description = routeMeta.description;
  const canonicalUrl = routeMeta.canonicalUrl;
  const ogType = routeMeta.ogType || 'website';
  const imageUrl = toAbsoluteUrl(routeMeta.imagePath);
  const robotsDirective = routeMeta.robots || DEFAULT_ROBOTS;

  // Strip root-only JobPosting / root BreadcrumbList / root FAQPage to avoid duplicate JSON-LD on subpages
  html = stripRootOnlyStructuredData(html);

  // Avoid preloading the homepage hero banner on subpages that do not immediately display it
  html = html.replace(/<link\s+rel="preload"\s+as="image"\s+href="\/images\/shinodayama_hero_banner_1792225964954\.webp"[^>]*\/?>\s*/i, '');

  // Title, robots, meta description, canonical
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = upsertMeta(html, 'name', 'description', description);
  html = upsertMeta(html, 'name', 'robots', robotsDirective);

  if (canonicalUrl) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
    );
  } else {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>\s*/i, '');
  }

  const isNoIndex = robotsDirective.includes('noindex') || !canonicalUrl;
  if (isNoIndex) {
    html = html.replace(/<link\s+rel="alternate"\s+hreflang="(?:ja|x-default)"\s+href="[^"]*"\s*\/?>\s*/gi, '');
  } else {
    html = html
      .replace(
        /<link\s+rel="alternate"\s+hreflang="ja"\s+href="[^"]*"\s*\/?>/i,
        `<link rel="alternate" hreflang="ja" href="${escapeHtml(canonicalUrl)}" />`
      )
      .replace(
        /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/i,
        `<link rel="alternate" hreflang="x-default" href="${escapeHtml(canonicalUrl)}" />`
      );
  }

  // OpenGraph & Twitter Card
  html = upsertMeta(html, 'property', 'og:title', title);
  html = upsertMeta(html, 'property', 'og:description', description);
  html = upsertMeta(html, 'property', 'og:type', ogType);
  html = upsertMeta(html, 'property', 'og:url', canonicalUrl || `${BASE_DOMAIN}/`);
  html = upsertMeta(html, 'property', 'og:image', imageUrl);
  html = upsertMeta(html, 'property', 'og:image:secure_url', imageUrl);
  html = upsertMeta(html, 'property', 'og:image:width', '1200');
  html = upsertMeta(html, 'property', 'og:image:height', '630');
  html = upsertMeta(html, 'property', 'og:image:alt', title);

  html = upsertMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = upsertMeta(html, 'name', 'twitter:title', title);
  html = upsertMeta(html, 'name', 'twitter:description', description);
  html = upsertMeta(html, 'name', 'twitter:image', imageUrl);
  html = upsertMeta(html, 'name', 'twitter:image:alt', title);

  // Inject route-specific BreadcrumbList JSON-LD (unless disabled for 404/admin)
  let headScripts = '';
  if (!routeMeta.skipBreadcrumb && canonicalUrl) {
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
    headScripts += `  <script id="prerender-breadcrumb-schema" type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
  }

  if (routeMeta.extraJsonLd) {
    headScripts += `  <script id="prerender-entity-schema" type="application/ld+json">${JSON.stringify(routeMeta.extraJsonLd)}</script>\n`;
  }

  if (headScripts) {
    html = html.replace('</head>', `${headScripts}  </head>`);
  }

  // Populate <div id="root"> with styled SSR shell (createRoot cleanly replaces on client hydration/mount)
  html = html.replace(/<div\s+id="root"><\/div>/i, buildSsrRootShell(routeMeta));

  // Replace ONLY body <noscript> fallback (leaving <head> font <noscript> untouched) and avoid duplicate <h1>
  const heading = escapeHtml(routeMeta.heading || title);
  const bodyHtml = routeMeta.noscriptBodyHtml || `<p>${escapeHtml(description)}</p>`;
  const routeNoscript = `<!-- BODY_NOSCRIPT_START -->
    <noscript>
      <header>
        <p><a href="${BASE_DOMAIN}/">信太山新地求人サイト「信太山ガールズ」</a></p>
      </header>
      <main>
        <article>
          <p><strong>${heading}</strong></p>
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
              <li><a href="${BASE_DOMAIN}/about">運営者情報・店舗概要</a></li>
              <li><a href="${BASE_DOMAIN}/policy">掲載ポリシー・安全規約・個人情報保護</a></li>
              <li><a href="${BASE_DOMAIN}/blog">お仕事コラム一覧</a></li>
            </ul>
          </nav>
        </article>
      </main>
    </noscript>
    <!-- BODY_NOSCRIPT_END -->`;

  html = html.replace(/<!--\s*BODY_NOSCRIPT_START\s*-->[\s\S]*?<!--\s*BODY_NOSCRIPT_END\s*-->/i, routeNoscript);
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

  // Build clean noindex, nofollow 404.html (prevents Soft-404 duplication against '/')
  const notFoundHtml = buildRouteHtml(baseHtml, {
    title: 'ページが見つかりません（404）｜信太山ガールズ',
    description: 'お探しのページは移動または削除された可能性があります。信太山新地求人公式サイトの主要ガイドからご覧ください。',
    canonicalUrl: '',
    robots: 'noindex, nofollow',
    skipBreadcrumb: true,
    heading: 'お探しのページが見つかりません（404）',
    noscriptBodyHtml:
      '<p class="text-sm text-zinc-600 mb-4">指定されたURLのページは見つかりませんでした。トップページや各種公式ガイドからお探しの情報をご覧ください。</p>'
  });
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf8');

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
    imagePath: '/images/workstyle_guide_hero_1794546577303.webp',
    heading: 'あなたに合った働き方を見つけよう。（信太山新地 タイプ別ガイド）',
    noscriptBodyHtml:
      '<p>未経験から始めたい、高収入を目指したい、週1日から働きたい、顔出しなし・身バレ対策、短時間・短期で働きたい、女性スタッフに相談したい、出稼ぎ・寮付き希望、まずは話を聞きたいの8タイプ別に条件や確認ポイントをご案内します。</p>'
  });

  // 2. 8 Workstyle Types (with rich SSR bullets) + Legacy Aliases (noindex, follow)
  const workstyleDetails = extractWorkstyleDetailsFromTs(path.join(rootDir, 'src', 'workstyleGuideData.ts'));
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
    const detail = workstyleDetails[item.slug];
    const detailHtmlParts = [];
    if (detail?.lead) {
      detailHtmlParts.push(`<p class="text-sm text-zinc-700 mb-4">${escapeHtml(detail.lead)}</p>`);
    }
    if (detail?.suitableFor?.length) {
      detailHtmlParts.push(
        `<h2 class="text-base font-bold text-zinc-900 mt-4 mb-2">こんな方に向いています</h2><ul class="list-disc pl-5 space-y-1 text-xs sm:text-sm text-zinc-700 mb-4">${detail.suitableFor
          .map((s) => `<li>${escapeHtml(s)}</li>`)
          .join('')}</ul>`
      );
    }
    if (detail?.topics?.length) {
      detailHtmlParts.push(
        `<h2 class="text-base font-bold text-zinc-900 mt-4 mb-2">主な確認テーマ</h2><ul class="space-y-2 text-xs sm:text-sm text-zinc-700">${detail.topics
          .map((t) => `<li><strong>${escapeHtml(t.title)}：</strong>${escapeHtml(t.description)}</li>`)
          .join('')}</ul>`
      );
    }
    const richBody = detailHtmlParts.join('');

    routes.push({
      route: `types/${item.slug}`,
      title: item.title,
      description: item.description,
      canonicalUrl: `${BASE_DOMAIN}/types/${item.slug}`,
      imagePath: '/images/workstyle_guide_hero_1794546577303.webp',
      heading: item.title.split('｜')[0],
      parentBreadcrumb,
      noscriptBodyHtml: richBody
    });
    routes.push({
      route: `compare/${item.slug}`,
      title: item.title,
      description: item.description,
      canonicalUrl: `${BASE_DOMAIN}/types/${item.slug}`,
      robots: 'noindex, follow',
      imagePath: '/images/workstyle_guide_hero_1794546577303.webp',
      heading: item.title.split('｜')[0],
      parentBreadcrumb,
      noscriptBodyHtml: richBody
    });
  });

  // Legacy type aliases -> noindex, follow pointing canonical to canonical /types/<to>
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
        robots: 'noindex, follow',
        imagePath: '/images/workstyle_guide_hero_1794546577303.webp',
        heading: target.title.split('｜')[0],
        parentBreadcrumb: { name: 'タイプ別働き方ガイド', path: '/types' }
      });
    });
  });

  // 3. FAQ, Interview, About, Policy, Admin
  const faqEntries = extractFaqQuestionsFromTs(path.join(rootDir, 'src', 'faq11CategoriesData.ts'));
  routes.push({
    route: 'faq',
    title: '信太山新地・信太山求人のよくある質問 FAQ（66問）【公式】',
    description:
      '信太山新地求人・信太山求人のよくある質問全66問を11カテゴリーで整理。未経験の面接・顔出しなし・日払い給料・寮・身バレ対策・シフト・半年ルールなど働く前の疑問にお答えします。',
    canonicalUrl: `${BASE_DOMAIN}/faq`,
    heading: 'よくある質問 FAQ（全66問・11カテゴリー）',
    noscriptBodyHtml:
      '<p>未経験からの始め方、仕事内容、給与・日払い、シフト・働き方、身バレ対策・プライバシー、寮・出稼ぎ、面接・体験入店、店舗選び・半年ルールなど全66問のQ&Aを掲載しています。</p>',
    extraJsonLd: faqEntries.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${BASE_DOMAIN}/faq#faqpage`,
          mainEntity: faqEntries.slice(0, 20).map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a
            }
          }))
        }
      : undefined
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
    heading: '運営者情報・店舗概要（信太山ガールズ）',
    extraJsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: '運営者情報・店舗概要',
      url: `${BASE_DOMAIN}/about`
    }
  });

  routes.push({
    route: 'policy',
    title: '求人情報掲載ポリシー・安全規約・個人情報保護｜信太山ガールズ公式',
    description:
      '信太山新地の老舗旅館直営「信太山ガールズ」の求人情報掲載ポリシー、コンプライアンス＆就労安全憲章、身バレ防止・個人情報保護方針（プライバシーポリシー）をご案内します。',
    canonicalUrl: `${BASE_DOMAIN}/policy`,
    heading: '求人情報掲載ポリシー・安全規約・個人情報保護方針',
    noscriptBodyHtml:
      '<p>満20歳以上の厳格な本人確認、虚偽・誇大表現の排除、ノルマ・天引き0円規程、身バレ防止・第三者提供禁止の個人情報保護方針を公開しています。</p>',
    extraJsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: '求人情報掲載ポリシー・安全規約・個人情報保護方針',
      url: `${BASE_DOMAIN}/policy`
    }
  });

  routes.push({
    route: 'admin',
    title: '管理者画面｜信太山ガールズ',
    description: '信太山ガールズ管理用ページ',
    canonicalUrl: `${BASE_DOMAIN}/admin`,
    robots: 'noindex, nofollow',
    skipBreadcrumb: true,
    heading: '管理者画面'
  });

  // 4. Topic Clusters from data/topicClusters.json
  const topicClustersPath = path.join(rootDir, 'data', 'topicClusters.json');
  if (fs.existsSync(topicClustersPath)) {
    const clusters = JSON.parse(fs.readFileSync(topicClustersPath, 'utf8'));
    Object.entries(clusters).forEach(([key, data]) => {
      const isBenefitsAlias = key === 'benefits';
      const canonicalPath = isBenefitsAlias ? '/salary' : data.path || `/${key}`;
      const topicFaqs = Array.isArray(data.faqs) && data.faqs.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${BASE_DOMAIN}${canonicalPath}#faq`,
            mainEntity: data.faqs.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a
              }
            }))
          }
        : undefined;
      routes.push({
        route: key,
        title: data.seoTitle || `${data.title}｜信太山新地求人 公式ガイド`,
        description: data.metaDescription || data.overview || data.tagline || '',
        canonicalUrl: `${BASE_DOMAIN}${canonicalPath}`,
        robots: isBenefitsAlias ? 'noindex, follow' : undefined,
        ogType: 'article',
        imagePath: data.heroImage,
        heading: data.title,
        noscriptBodyHtml: `<p>${escapeHtml(data.overview || data.metaDescription || '')}</p>`,
        extraJsonLd: topicFaqs
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
      const articleUrl = `${BASE_DOMAIN}/blog/${article.slug}`;
      const seoTitle = formatBlogSeoTitle(article.title);
      const seoDescription = formatMetaDescription(
        article.summary,
        `${article.title}についての信太山新地公式解説記事です。`
      );
      const fullArticleHtml = renderBlogArticleContentHtml(article);
      routes.push({
        route: `blog/${article.slug}`,
        title: seoTitle,
        description: seoDescription,
        canonicalUrl: articleUrl,
        ogType: 'article',
        imagePath: article.eyeCatch,
        heading: article.title,
        hideLeadInSsr: true,
        parentBreadcrumb: { name: 'お仕事コラム一覧', path: '/blog' },
        ssrBodyHtml: fullArticleHtml,
        noscriptBodyHtml: `<p>${escapeHtml(article.summary || '')}</p>`,
        extraJsonLd: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.summary || `${article.title}についての信太山新地公式解説記事です。`,
          datePublished: article.publishedAt,
          dateModified: article.publishedAt,
          inLanguage: 'ja-JP',
          isAccessibleForFree: true,
          keywords: Array.isArray(article.tags) ? article.tags.join(', ') : '信太山新地, 信太山求人, 未経験, 個室待機',
          image: article.eyeCatch ? toAbsoluteUrl(article.eyeCatch) : DEFAULT_IMAGE,
          author: {
            '@type': 'Person',
            name: article.author?.name || 'あおい（信太山新地女性専任アドバイザー）',
            jobTitle: '女性採用アドバイザー・現場サポート責任者'
          },
          publisher: {
            '@type': 'Organization',
            name: '信太山ガールズ（旅館直営求人・女性採用サポート）',
            url: `${BASE_DOMAIN}/`,
            logo: {
              '@type': 'ImageObject',
              url: `${BASE_DOMAIN}/favicon.png`
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl
          }
        }
      });
    });
  }

  // Also inject styled SSR shell into root dist/index.html for instant first paint & initial HTML content
  const rootSsrShell = buildSsrRootShell({
    heading: '信太山新地でお仕事を探す女性へ。自分に合った働き方を、信太山ガールズで見つけませんか？',
    description:
      '未経験の方も、経験のある方も歓迎。仕事内容・お給料・待遇・働く環境まで、応募前に分かりやすくご案内します。週1日からの勤務や短時間勤務など、希望の働き方もお気軽にご相談ください。',
    noscriptBodyHtml:
      '<p>未経験の方も相談OK・週1日から相談OK・働き方の相談OK・LINEで事前相談OK。仕事内容・報酬・募集条件・応募の流れを分かりやすくご案内しています。</p>'
  });
  const updatedRootHtml = baseHtml.replace(/<div\s+id="root"><\/div>/i, rootSsrShell);
  fs.writeFileSync(indexPath, updatedRootHtml, 'utf8');

  // Render all routes
  routes.forEach((meta) => {
    const html = buildRouteHtml(baseHtml, meta);
    writeRouteFiles(meta.route, html);
  });

  console.log(`[prerender] Successfully generated static HTML for ${routes.length} routes + 404.html + root SSR shell in dist/`);
}

main();
