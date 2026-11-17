import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const BASE_DOMAIN = 'https://osaka-shinodayamashinchi-recruit.com';
const DEFAULT_IMAGE = `${BASE_DOMAIN}/images/shinodayama_hero_banner_1792225964954.jpg`;
const DEFAULT_ROBOTS = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

function getFileLastMod(relPaths = [], fallback = '2026-11-15') {
  let latestMs = 0;
  for (const rel of relPaths) {
    const fp = path.join(rootDir, rel);
    if (fs.existsSync(fp)) {
      try {
        const mtime = fs.statSync(fp).mtimeMs;
        if (mtime > latestMs) latestMs = mtime;
      } catch {
        // ignore stat errors
      }
    }
  }
  if (!latestMs) return fallback;
  const jstDate = new Date(latestMs + 9 * 60 * 60 * 1000);
  return jstDate.toISOString().slice(0, 10);
}

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
  const base = String(rawDescription || fallback).replace(/\s+/g, ' ').trim();
  const normalized = base.length > 0 && base.length < 120
    ? `${base.replace(/。$/, '')}。信太山新地の老舗旅館直営公式求人「信太山ガールズ」が詳しく解説します。`
    : base;
  if (normalized.length <= 158) return normalized;
  const sliced = normalized.slice(0, 155);
  const lastPeriod = sliced.lastIndexOf('。');
  if (lastPeriod >= 118) {
    return sliced.slice(0, lastPeriod + 1);
  }
  const lastClause = Math.max(sliced.lastIndexOf('、'), sliced.lastIndexOf(' '));
  if (lastClause >= 120) {
    return `${sliced.slice(0, lastClause)}…`;
  }
  return `${normalized.slice(0, 150)}…`;
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

const CATEGORY_PILLAR_MAP = {
  job: { topic: 'job', workstyle: 'inexperienced', label: '仕事内容・1日の流れガイド' },
  salary: { topic: 'salary', workstyle: 'high-income', label: '給料・日払いシステム解説' },
  beginner: { topic: 'beginner', workstyle: 'inexperienced', label: '未経験スタート安心ガイド' },
  experienced: { topic: 'experienced', workstyle: 'high-income', label: '経験者優遇・移籍サポート' },
  workstyle: { topic: 'workstyle', workstyle: 'weekly-1', label: '働き方・週1日〜シフト解説' },
  shops: { topic: 'shops', workstyle: 'consultation', label: 'お店選び・比較ポイント' },
  dorm: { topic: 'dorm', workstyle: 'dormitory', label: '個室マンション寮・出稼ぎガイド' },
  safety: { topic: 'safety', workstyle: 'privacy', label: '身バレ対策・安全ルール解説' },
  interview: { topic: 'flow', workstyle: 'female-staff', label: '面接・見学・応募の流れ' },
  faq: { topic: 'requirements', workstyle: 'consultation', label: '応募資格・募集要項ガイド' },
  beauty: { topic: 'workstyle', workstyle: 'short-term', label: '自分に合った働き方ガイド' }
};

function computeArticleWordCount(article) {
  if (!article) return 0;
  let text = `${article.title || ''} ${article.summary || ''}`;
  const content = article.content;
  if (Array.isArray(content)) {
    for (const block of content) {
      if (!block) continue;
      if (block.text) text += ` ${block.text}`;
      if (block.question) text += ` ${block.question}`;
      if (block.answer) text += ` ${block.answer}`;
      if (Array.isArray(block.items)) text += ` ${block.items.join(' ')}`;
    }
  } else if (content && typeof content === 'object') {
    if (content.intro) text += ` ${content.intro}`;
    if (Array.isArray(content.sections)) {
      for (const sec of content.sections) {
        if (sec.heading) text += ` ${sec.heading}`;
        if (sec.body) text += ` ${sec.body}`;
        if (Array.isArray(sec.points)) text += ` ${sec.points.join(' ')}`;
      }
    }
    if (Array.isArray(content.faqs)) {
      for (const f of content.faqs) {
        text += ` ${f.question || ''} ${f.answer || ''}`;
      }
    }
  }
  const clean = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1').replace(/\s+/g, '');
  return clean.length;
}

function renderBlogArticleRelatedLinksHtml(article, allArticles = [], clusters = {}) {
  if (!article || !Array.isArray(allArticles) || allArticles.length === 0) return '';
  const mapping = CATEGORY_PILLAR_MAP[article.category] || { topic: 'job', workstyle: 'inexperienced', label: '仕事内容・条件解説' };
  const topicTitle = clusters[mapping.topic]?.title || mapping.label;
  const articleTags = new Set(Array.isArray(article.tags) ? article.tags : []);

  const seedStr = String(article.id || article.slug || '');
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  }

  const candidates = allArticles
    .filter((other) => other && other.slug && !other.noindex && other.slug !== article.slug)
    .map((other, idx) => {
      const sameCategory = other.category === article.category ? 12 : 0;
      const otherTags = Array.isArray(other.tags) ? other.tags : [];
      const sharedTags = otherTags.filter((t) => articleTags.has(t)).length;
      const rotationBonus = ((seed + idx * 7) % 11) * 0.1;
      const score = sameCategory + sharedTags * 5 + rotationBonus;
      return { other, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return String(b.other.publishedAt || '').localeCompare(String(a.other.publishedAt || ''));
    })
    .slice(0, 4)
    .map((entry) => entry.other);

  const guideLinks = [
    `<a href="${BASE_DOMAIN}/" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs border border-rose-100">信太山新地求人トップ</a>`,
    `<a href="${BASE_DOMAIN}/beginner" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs border border-rose-100">未経験ガイド</a>`,
    `<a href="${BASE_DOMAIN}/quick-guide" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs border border-rose-100">キーワード別要点まとめ</a>`,
    `<a href="${BASE_DOMAIN}/${escapeHtml(mapping.topic)}" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs border border-rose-100">${escapeHtml(topicTitle)}</a>`,
    `<a href="${BASE_DOMAIN}/types/${escapeHtml(mapping.workstyle)}" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs border border-rose-100">タイプ別働き方ガイド</a>`,
    `<a href="${BASE_DOMAIN}/compare" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs border border-rose-100">信太山新地・他業種 徹底比較</a>`,
    `<a href="${BASE_DOMAIN}/faq" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs border border-rose-100">よくある質問 FAQ（全66問）</a>`
  ].join('');

  const relatedCards = candidates
    .map(
      (rel) =>
        `<li class="p-3 bg-rose-50/40 rounded-xl border border-rose-100"><a href="${BASE_DOMAIN}/blog/${escapeHtml(rel.slug)}" class="font-bold text-rose-700 underline text-sm block mb-1">${escapeHtml(rel.title)}</a><p class="text-xs text-zinc-600 line-clamp-2">${escapeHtml(rel.summary || '')}</p></li>`
    )
    .join('');

  return `<nav aria-label="あわせて読みたい公式専門ガイド" class="mt-8 pt-6 border-t border-rose-100"><h2 class="text-base font-bold text-zinc-900 mb-3">あわせて読みたい公式専門ガイド</h2><div class="flex flex-wrap gap-2">${guideLinks}</div></nav>${
    relatedCards
      ? `<section aria-label="関連記事" class="mt-6 pt-6 border-t border-rose-100"><h2 class="text-base font-bold text-zinc-900 mb-3">関連記事・おすすめの公式コラム</h2><ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">${relatedCards}</ul></section>`
      : ''
  }`;
}

function renderBlogArticleContentHtml(article, allArticles = [], clusters = {}) {
  if (!article) return '';
  const chunks = [];
  if (article.summary) {
    chunks.push(`<section class="bg-rose-50/70 rounded-2xl p-4 sm:p-5 border border-rose-200 mb-6"><p id="llm-article-summary-text" class="text-sm text-zinc-700 leading-relaxed">${escapeHtml(article.summary)}</p></section>`);
  }
  const content = article.content;

  // Build Table of Contents (#sec-1, #sec-2...) for jump links
  const tocItems = [];
  if (Array.isArray(content)) {
    let idxCounter = 0;
    for (const block of content) {
      if (block && block.type === 'h2' && block.text) {
        idxCounter++;
        tocItems.push({ id: `sec-${idxCounter}`, title: block.text });
      }
    }
  } else if (content && typeof content === 'object' && Array.isArray(content.sections)) {
    content.sections.forEach((sec, idx) => {
      if (sec && sec.heading) {
        tocItems.push({ id: `sec-${idx + 1}`, title: sec.heading });
      }
    });
  }
  if (tocItems.length >= 2) {
    const tocList = tocItems
      .map((item, idx) => `<li><a href="#${item.id}" class="text-rose-700 hover:underline">${String(idx + 1).padStart(2, '0')}. ${escapeHtml(item.title)}</a></li>`)
      .join('');
    chunks.push(`<nav aria-label="この記事の目次" class="bg-rose-50/40 rounded-2xl p-4 border border-rose-100 mb-6"><p class="font-bold text-sm text-zinc-900 mb-2">この記事の目次</p><ol class="space-y-1 text-xs sm:text-sm">${tocList}</ol></nav>`);
  }

  let h2Counter = 0;
  if (Array.isArray(content)) {
    for (const block of content) {
      if (!block || !block.type) continue;
      if (block.type === 'h2') {
        h2Counter++;
        chunks.push(`<h2 id="sec-${h2Counter}" class="text-lg sm:text-xl font-bold text-zinc-900 mt-6 mb-3">${escapeHtml(block.text || '')}</h2>`);
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
      content.sections.forEach((sec, idx) => {
        if (sec.heading) {
          chunks.push(`<h2 id="sec-${idx + 1}" class="text-lg sm:text-xl font-bold text-zinc-900 mt-6 mb-3">${escapeHtml(sec.heading)}</h2>`);
        }
        if (sec.body) {
          chunks.push(`<p class="text-sm sm:text-base text-zinc-700 leading-relaxed mb-4">${renderBlogParagraphWithLinks(sec.body)}</p>`);
        }
        if (Array.isArray(sec.points) && sec.points.length) {
          chunks.push(`<ul class="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 mb-4">${sec.points.map((pt) => `<li>${renderBlogParagraphWithLinks(pt)}</li>`).join('')}</ul>`);
        }
      });
    }
    if (Array.isArray(content.faqs) && content.faqs.length) {
      for (const f of content.faqs) {
        chunks.push(`<div class="bg-rose-50/40 rounded-xl p-4 border border-rose-100 mb-4"><p class="font-bold text-sm text-zinc-900 mb-1">Q. ${escapeHtml(f.question || '')}</p><p class="text-sm text-zinc-700 leading-relaxed">A. ${escapeHtml(f.answer || '')}</p></div>`);
      }
    }
  }
  chunks.push(`<aside aria-label="監修・ファクト確認体制" class="mt-8 p-4 rounded-2xl bg-rose-50/60 border border-rose-100 text-xs text-zinc-700"><p class="font-bold text-zinc-900 mb-1">記事監修・ファクト確認：あおい（女性サポート責任者／信太山ガールズ）</p><p class="mb-2">信太山新地の老舗旅館直営店舗の現場情報および旅館組合ルールに基づき、女性スタッフが確認・更新しています。</p><p class="flex flex-wrap gap-3 font-bold"><a href="${BASE_DOMAIN}/interview" class="text-rose-700 underline">採用担当者の現場インタビュー</a><a href="${BASE_DOMAIN}/policy" class="text-rose-700 underline">編集方針・掲載ポリシー</a></p></aside>`);
  const relatedMesh = renderBlogArticleRelatedLinksHtml(article, allArticles, clusters);
  if (relatedMesh) {
    chunks.push(relatedMesh);
  }
  return chunks.join('');
}

function renderTopicClusterSsrHtml(data, allClusters, allArticles = []) {
  if (!data) return '';
  const parts = [];

  if (Array.isArray(data.stats) && data.stats.length) {
    parts.push(`<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">${data.stats.map((st) => `<div class="p-3 bg-rose-50/60 rounded-xl border border-rose-100"><div class="text-xs text-zinc-500 font-bold">${escapeHtml(st.label)}</div><div class="text-base font-extrabold text-rose-700">${escapeHtml(st.value)}</div><div class="text-xs text-zinc-600">${escapeHtml(st.desc || '')}</div></div>`).join('')}</div>`);
  }

  if (data.llmDirectAnswer) {
    parts.push(`<section id="llm-direct-answer" class="bg-rose-50/70 rounded-2xl p-4 sm:p-5 border border-rose-200 mb-6"><p id="llm-direct-answer-text" class="text-sm text-zinc-700 leading-relaxed">${escapeHtml(data.llmDirectAnswer)}</p></section>`);
  }

  if (Array.isArray(data.keyPoints) && data.keyPoints.length) {
    parts.push(`<section class="mb-6"><h2 class="text-lg font-bold text-zinc-900 mb-3">${escapeHtml(data.title)}のポイント</h2><ul class="list-disc pl-5 space-y-1.5 text-sm text-zinc-700">${data.keyPoints.map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}</ul></section>`);
  }

  if (Array.isArray(data.sections)) {
    for (const sec of data.sections) {
      parts.push(`<section class="mb-6">`);
      if (sec.title) {
        parts.push(`<h2 class="text-lg sm:text-xl font-bold text-zinc-900 mb-2">${escapeHtml(sec.title)}</h2>`);
      }
      if (sec.description) {
        parts.push(`<p class="text-sm text-zinc-700 leading-relaxed mb-3">${escapeHtml(sec.description)}</p>`);
      }
      if (Array.isArray(sec.points) && sec.points.length) {
        parts.push(`<ul class="list-disc pl-5 space-y-1.5 text-sm text-zinc-700 mb-3">${sec.points.map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}</ul>`);
      }
      if (sec.table && Array.isArray(sec.table.headers) && Array.isArray(sec.table.rows)) {
        parts.push(`<div class="overflow-x-auto mb-3"><table class="w-full text-xs sm:text-sm border-collapse border border-rose-100"><thead><tr class="bg-rose-50">${sec.table.headers.map((h) => `<th class="p-2 border border-rose-100 text-left font-bold">${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${sec.table.rows.map((row) => `<tr>${row.map((cell) => `<td class="p-2 border border-rose-100">${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      }
      if (sec.callout && sec.callout.text) {
        parts.push(`<div class="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-sm text-zinc-700"><strong>${escapeHtml(sec.callout.title || '')}：</strong>${escapeHtml(sec.callout.text)}</div>`);
      }
      parts.push(`</section>`);
    }
  }

  if (Array.isArray(data.faqs) && data.faqs.length) {
    parts.push(`<section class="mb-6"><h2 class="text-lg font-bold text-zinc-900 mb-3">${escapeHtml(data.title)}に関するよくある質問</h2><div class="space-y-3">${data.faqs.map((f) => `<div class="bg-rose-50/40 rounded-xl p-4 border border-rose-100"><p class="font-bold text-sm text-zinc-900 mb-1">Q. ${escapeHtml(f.q)}</p><p class="text-sm text-zinc-700 leading-relaxed">A. ${escapeHtml(f.a)}</p></div>`).join('')}</div></section>`);
  }

  const featuredSlugs = Array.isArray(data.featuredArticleSlugs) ? data.featuredArticleSlugs : [];
  if (featuredSlugs.length && Array.isArray(allArticles) && allArticles.length) {
    const featuredCards = featuredSlugs
      .map((slug) => allArticles.find((a) => a && a.slug === slug))
      .filter(Boolean)
      .map(
        (art) =>
          `<li class="p-3 bg-rose-50/40 rounded-xl border border-rose-100"><a href="${BASE_DOMAIN}/blog/${escapeHtml(art.slug)}" class="font-bold text-rose-700 underline text-sm block mb-1">${escapeHtml(art.title)}</a><p class="text-xs text-zinc-600 line-clamp-2">${escapeHtml(art.summary || '')}</p></li>`
      )
      .join('');
    if (featuredCards) {
      parts.push(`<section class="mb-6"><h2 class="text-lg font-bold text-zinc-900 mb-3">${escapeHtml(data.title)}に関連する公式解説コラム</h2><ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">${featuredCards}</ul></section>`);
    }
  }

  const relatedLinks = [];
  relatedLinks.push(`<a href="${BASE_DOMAIN}/" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs">信太山新地求人トップ</a>`);
  if (Array.isArray(data.relatedTopicIds)) {
    for (const id of data.relatedTopicIds) {
      if (id === 'faq') {
        relatedLinks.push(`<a href="${BASE_DOMAIN}/faq" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs">よくある質問 FAQ</a>`);
      } else {
        const target = allClusters[id === 'benefits' ? 'salary' : id];
        if (target) {
          relatedLinks.push(`<a href="${BASE_DOMAIN}${target.path}" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs">${escapeHtml(target.title)}</a>`);
        }
      }
    }
  }
  relatedLinks.push(`<a href="${BASE_DOMAIN}/quick-guide" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs">キーワード別要点まとめ</a>`);
  relatedLinks.push(`<a href="${BASE_DOMAIN}/compare" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs">他業種・他エリア徹底比較</a>`);
  relatedLinks.push(`<a href="${BASE_DOMAIN}/types" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold text-xs">タイプ別働き方ガイド</a>`);
  parts.push(`<nav aria-label="関連ガイド" class="pt-4 border-t border-rose-100 flex flex-wrap gap-2">${relatedLinks.join('')}</nav>`);

  return parts.join('');
}

function renderWorkstyleTypeDetailHtml(item, overviewFaqs = []) {
  const parts = [];
  if (item.lead) {
    parts.push(`<p class="text-sm sm:text-base text-zinc-700 leading-relaxed mb-5">${escapeHtml(item.lead)}</p>`);
  }
  if (Array.isArray(item.suitableFor) && item.suitableFor.length) {
    parts.push(
      `<section class="mb-6"><h2 class="text-lg font-bold text-zinc-900 mb-2">こんな方に向いています</h2><ul class="list-disc pl-5 space-y-1.5 text-sm text-zinc-700">${item.suitableFor
        .map((s) => `<li>${escapeHtml(s)}</li>`)
        .join('')}</ul></section>`
    );
  }
  if (Array.isArray(item.considerations) && item.considerations.length) {
    parts.push(
      `<section class="mb-6"><h2 class="text-lg font-bold text-zinc-900 mb-2">押さえておきたいポイント</h2><ul class="list-disc pl-5 space-y-1.5 text-sm text-zinc-700">${item.considerations
        .map((s) => `<li>${escapeHtml(s)}</li>`)
        .join('')}</ul></section>`
    );
  }
  if (Array.isArray(item.specificTopics) && item.specificTopics.length) {
    parts.push(
      `<section class="mb-6"><h2 class="text-lg font-bold text-zinc-900 mb-3">仕事・条件の詳しい確認ポイント</h2><div class="space-y-3">${item.specificTopics
        .map((t) => `<div class="p-4 rounded-xl bg-rose-50/40 border border-rose-100"><h3 class="font-bold text-sm text-zinc-900 mb-1">${escapeHtml(t.title)}</h3><p class="text-sm text-zinc-700 leading-relaxed">${escapeHtml(t.description)}</p></div>`)
        .join('')}</div></section>`
    );
  }
  if (Array.isArray(item.preCheckList) && item.preCheckList.length) {
    parts.push(
      `<section class="mb-6"><h2 class="text-lg font-bold text-zinc-900 mb-2">応募・相談前のチェックリスト</h2><ul class="list-disc pl-5 space-y-1.5 text-sm text-zinc-700">${item.preCheckList
        .map((chk) => `<li>${escapeHtml(chk)}</li>`)
        .join('')}</ul></section>`
    );
  }
  const combinedFaqs = [...(item.faqs || []), ...(overviewFaqs || [])];
  if (combinedFaqs.length) {
    parts.push(
      `<section class="mb-6"><h2 class="text-lg font-bold text-zinc-900 mb-3">よくある質問</h2><div class="space-y-3">${combinedFaqs
        .map((f) => `<div class="bg-rose-50/40 rounded-xl p-4 border border-rose-100"><p class="font-bold text-sm text-zinc-900 mb-1">Q. ${escapeHtml(f.q)}</p><p class="text-sm text-zinc-700 leading-relaxed">A. ${escapeHtml(f.a)}</p></div>`)
        .join('')}</div></section>`
    );
  }
  return parts.join('');
}

function buildSsrRootShell(routeMeta) {
  const heading = escapeHtml(routeMeta.heading || routeMeta.title);
  const lead = escapeHtml(routeMeta.leadText || routeMeta.description || '');
  const body = routeMeta.ssrBodyHtml || routeMeta.noscriptBodyHtml || '';
  return `<div id="root"><div class="min-h-screen bg-[#faf6f7] text-zinc-900 pt-20 pb-16 px-4 sm:px-6"><div class="max-w-4xl mx-auto"><header class="mb-6 pb-4 border-b border-rose-100 flex items-center justify-between flex-wrap gap-2"><a href="${BASE_DOMAIN}/" class="font-bold text-rose-600 text-base">信太山ガールズ｜信太山新地求人 公式</a><nav aria-label="主要メニュー" class="flex flex-wrap gap-3 text-xs text-zinc-600"><a href="${BASE_DOMAIN}/job">仕事内容</a><a href="${BASE_DOMAIN}/salary">給料</a><a href="${BASE_DOMAIN}/beginner">未経験</a><a href="${BASE_DOMAIN}/experienced">経験者</a><a href="${BASE_DOMAIN}/requirements">募集要項</a><a href="${BASE_DOMAIN}/flow">面接・体入</a><a href="${BASE_DOMAIN}/workstyle">働き方</a><a href="${BASE_DOMAIN}/shops">お店選び</a><a href="${BASE_DOMAIN}/dorm">寮・出稼ぎ</a><a href="${BASE_DOMAIN}/safety">身バレ対策</a><a href="${BASE_DOMAIN}/compare">徹底比較</a><a href="${BASE_DOMAIN}/types">働き方ガイド</a><a href="${BASE_DOMAIN}/quick-guide">キーワード別まとめ</a><a href="${BASE_DOMAIN}/faq">FAQ</a><a href="${BASE_DOMAIN}/blog">コラム</a></nav></header><main><article class="bg-white rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xs"><h1 class="text-2xl sm:text-3xl font-extrabold text-zinc-900 leading-snug mb-4">${heading}</h1>${routeMeta.hideLeadInSsr ? '' : `<p class="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">${lead}</p>`}${body}</article></main></div></div></div>`;
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
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${BASE_DOMAIN}/blog?q={search_term_string}`
              },
              'query-input': 'required name=search_term_string'
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
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              url: 'https://lin.ee/Z70RRKH',
              availableLanguage: ['Japanese']
            },
            sameAs: ['https://lin.ee/Z70RRKH']
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

  // Swap or strip rel="alternate" type="text/markdown" per-route
  if (routeMeta.mdPath) {
    html = html.replace(
      /<link\s+rel="alternate"\s+type="text\/markdown"[^>]*\/?>/i,
      `<link rel="alternate" type="text/markdown" title="Markdown Version" href="${escapeHtml(routeMeta.mdPath)}" />`
    );
  } else {
    html = html.replace(/<link\s+rel="alternate"\s+type="text\/markdown"[^>]*\/?>\s*/i, '');
  }

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
  const imageType = imageUrl.endsWith('.webp')
    ? 'image/webp'
    : imageUrl.endsWith('.png')
      ? 'image/png'
      : 'image/jpeg';
  html = upsertMeta(html, 'property', 'og:title', title);
  html = upsertMeta(html, 'property', 'og:description', description);
  html = upsertMeta(html, 'property', 'og:type', ogType);
  html = upsertMeta(html, 'property', 'og:url', canonicalUrl || `${BASE_DOMAIN}/`);
  html = upsertMeta(html, 'property', 'og:image', imageUrl);
  html = upsertMeta(html, 'property', 'og:image:secure_url', imageUrl);
  html = upsertMeta(html, 'property', 'og:image:type', imageType);
  html = upsertMeta(html, 'property', 'og:image:width', '1200');
  html = upsertMeta(html, 'property', 'og:image:height', '630');
  html = upsertMeta(html, 'property', 'og:image:alt', title);

  html = upsertMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = upsertMeta(html, 'name', 'twitter:url', canonicalUrl || `${BASE_DOMAIN}/`);
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
      name: routeMeta.breadcrumbName || routeMeta.heading || title,
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
              <li><a href="${BASE_DOMAIN}/quick-guide">気になるキーワード別 公式要点まとめ</a></li>
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

function buildHowToNode(key) {
  if (key === 'job') {
    return {
      '@type': 'HowTo',
      '@id': `${BASE_DOMAIN}/job#howto`,
      name: '信太山新地の1日の仕事の進め方（出勤〜退勤の流れ）',
      description: '初めての方にも分かりやすい、信太山新地の旅館直営店舗での出勤から待機・接客・日払い受取までの基本4ステップ。',
      inLanguage: 'ja-JP',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'STEP1｜出勤・お着替え',
          text: 'ご希望の出勤時刻に合わせて私服・手ぶらで出勤し、無料レンタル衣装やメイクなど身支度を整えます。'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'STEP2｜待機所（スタンドまたは旅館）で待機',
          text: '店先に立つことはなく、待機所でリラックスして過ごしながら案内を待ちます。'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'STEP3｜仲居さんの案内で接客（15分〜の個室コース）',
          text: 'お客様が先にシャワーを済ませたあと、仲居さんの呼び出しでお部屋へ向かい、軽い会話や基本接客（コンドーム着用厳守）を行います。時間管理も仲居さんが対応します。'
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'STEP4｜全額現金受取・退勤',
          text: 'シフト終了後に当日分のお給料を全額現金手渡しで受け取り、退勤します（天引きなし）。'
        }
      ]
    };
  }
  if (key === 'flow') {
    return {
      '@type': 'HowTo',
      '@id': `${BASE_DOMAIN}/flow#howto`,
      name: '信太山新地 求人応募〜面接・見学・体験入店の流れ',
      description: 'LINE相談から条件説明、環境見学、体験入店（希望者のみ）までの応募ステップをご案内します。',
      inLanguage: 'ja-JP',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'STEP01｜LINE・電話でお問い合わせ',
          text: '24時間受付の公式LINEから、仕事内容や給与、働く条件について質問・相談できます（相談のみも可）。'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'STEP02｜面接の日程・希望条件を確認',
          text: '希望する勤務時間や日数、気になる条件を調整します。履歴書不要で私服のまま手ぶらでお越しいただけます。'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'STEP03｜面接・仕事内容・条件の説明',
          text: '15分単位のコース別報酬、勤務条件、送迎や寮などの待遇を納得いただけるまで事前にお伝えします（年齢確認のため顔写真付き身分証1点が必要）。'
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'STEP04｜店舗・待機環境の見学、体験入店の相談',
          text: '希望される方は待機所や館内設備を見学でき、体験入店の条件も確認できます。見学のみでの判断も可能です。'
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'STEP05｜希望者のみ体験入店・勤務開始',
          text: '条件に納得し本人が希望する場合に体験入店または勤務を開始します。体験分の報酬も退勤時に全額日払いでお渡しします。'
        }
      ]
    };
  }
  return null;
}

async function main() {
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

  // Load live TypeScript data modules cleanly via esbuild
  const compareModule = await loadTsModule('src/compareData.ts');
  const faqModule = await loadTsModule('src/faq11CategoriesData.ts');
  const workstyleModule = await loadTsModule('src/workstyleGuideData.ts');
  const quickGuideModule = await loadTsModule('src/quickGuideData.ts');

  const mainTargets = Array.isArray(compareModule.MAIN_6_TARGETS) ? compareModule.MAIN_6_TARGETS : [];
  const mainItems = Array.isArray(compareModule.MAIN_11_COMPARISON_ITEMS) ? compareModule.MAIN_11_COMPARISON_ITEMS : [];
  const courseSchedule = Array.isArray(compareModule.COURSE_REWARD_SCHEDULE) ? compareModule.COURSE_REWARD_SCHEDULE : [];
  const areaRows = Array.isArray(compareModule.AREA_COMPARISON_ROWS) ? compareModule.AREA_COMPARISON_ROWS : [];

  const faqCategories = Array.isArray(faqModule.FAQ_11_CATEGORIES) ? faqModule.FAQ_11_CATEGORIES : [];
  const faqQuestions = Array.isArray(faqModule.FAQ_66_QUESTIONS) ? faqModule.FAQ_66_QUESTIONS : [];

  const workstyleTypes = Array.isArray(workstyleModule.WORKSTYLE_8_TYPES) ? workstyleModule.WORKSTYLE_8_TYPES : [];
  const workstyleOverviewFaqs = Array.isArray(workstyleModule.WORKSTYLE_OVERVIEW_FAQS) ? workstyleModule.WORKSTYLE_OVERVIEW_FAQS : [];
  const quickGuideCards = Array.isArray(quickGuideModule.QUERY_SUMMARY_CARDS) ? quickGuideModule.QUERY_SUMMARY_CARDS : [];

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

  const rootLastMod = getFileLastMod(['index.html', 'data/siteContent.json', 'src/App.tsx']);
  const compareLastMod = getFileLastMod(['src/compareData.ts', 'src/components/ComparisonGuidePage.tsx']);
  const workstyleLastMod = getFileLastMod(['src/workstyleGuideData.ts', 'src/components/WorkstyleGuidePage.tsx']);
  const faqLastMod = getFileLastMod(['src/faq11CategoriesData.ts', 'src/components/FAQPage.tsx']);
  const interviewLastMod = getFileLastMod(['src/components/RecruiterInterviewPage.tsx']);
  const aboutLastMod = getFileLastMod(['src/components/AboutPage.tsx']);
  const policyLastMod = getFileLastMod(['src/components/AboutPage.tsx']);
  const quickGuideLastMod = getFileLastMod(['src/quickGuideData.ts', 'src/components/AiSearchQueryGuideSection.tsx']);
  const topicLastMod = getFileLastMod(['data/topicClusters.json', 'src/components/TopicClusterPage.tsx']);

  const routes = [];

  // 1. /compare (Full 6-Target x 11-Item matrix, course schedule, area table, 5 FAQs)
  const COMPARISON_FAQS = [
    {
      q: '飛田新地との一番大きな違いは何ですか？',
      a: '最も大きな違いは「店先での顔見せ（顔出し）が一切ないこと」です。飛田新地では通りに面した玄関先（上がり框）に座って通行人にお顔を見せるスタイルですが、信太山新地は待機所（スタンドまたは旅館）で待機します。通りから顔を見られることが一切ないため、知り合いや通行人にバレるリスクを抑えられます。'
    },
    {
      q: 'スカウト業者や仲介サイトから応募するのと何が違いますか？',
      a: '信太山ガールズは旅館直営の公式採用窓口です。スカウト業者や外部の仲介者を挟まないため、毎月の給料から紹介料（10〜30%）が天引きされることは絶対にありません。100%全額があなたの手取りになり、条件に応じた時給保証や日給保証、寮相談、往復交通費支給などの待遇がそのまま適用されます。'
    },
    {
      q: 'メンズエステやキャバクラ、ソープランドと比べて稼ぎやすさはどうですか？',
      a: '信太山新地は15分単位（15分3,800円〜）の短時間コース設定のため、1回あたりの身体的負担が少なく効率よく回転してお給料を積み上げられます。また信太山新地独自の「時給10,000円保証」や待機時間に応じた「日給保証制度（適用条件は事前ご説明）」もあるため、待機損の心配を抑えて働けます。キャバクラのような売上ノルマ・営業連絡やお酒の強要も一切不要です。'
    },
    {
      q: 'ネットやSNSに写真が載ることはありますか？',
      a: '一切ありません。メンズエステやソープランドのようにパネル写真・顔写真・写メ日記などをネット上に掲載することはありません。完全源氏名でお仕事ができるため、プライバシーが守られます。'
    },
    {
      q: 'お酒を飲む必要はありますか？',
      a: 'お酒は一切不要です。キャバクラやガールズバーのように飲酒を伴う接客ではないため、お酒が苦手な方でも体調を崩したり二日酔いになったりする心配がありません。翌日の昼職や家事、学校への影響もゼロです。'
    }
  ];

  const compareSsrParts = [];
  if (mainTargets.length && mainItems.length) {
    compareSsrParts.push(
      `<section class="mb-8"><h2 class="text-lg sm:text-xl font-bold text-zinc-900 mb-3">信太山新地 vs 他業種・応募形態 11項目比較表</h2><div class="overflow-x-auto"><table class="w-full text-xs border-collapse border border-rose-100"><thead><tr class="bg-rose-50"><th class="p-2 border border-rose-100 text-left font-bold">比較項目</th>${mainTargets
        .map((t) => `<th class="p-2 border border-rose-100 text-left font-bold">${escapeHtml(t.name)}<br /><span class="font-normal text-[11px] text-zinc-500">${escapeHtml(t.subName)}</span></th>`)
        .join('')}</tr></thead><tbody>${mainItems
        .map(
          (item) =>
            `<tr><th class="p-2 border border-rose-100 text-left font-bold bg-rose-50/30">${escapeHtml(item.name)}</th>${mainTargets
              .map((t) => {
                const v = item.values?.[t.id];
                return `<td class="p-2 border border-rose-100 align-top">${escapeHtml(v?.text || '')}${v?.point ? `<div class="mt-1 font-bold text-rose-700">${escapeHtml(v.point)}</div>` : ''}</td>`;
              })
              .join('')}</tr>`
        )
        .join('')}</tbody></table></div></section>`
    );
  }
  if (courseSchedule.length) {
    compareSsrParts.push(
      `<section class="mb-8"><h2 class="text-lg font-bold text-zinc-900 mb-3">15分単位のコース報酬・時給換算</h2><div class="overflow-x-auto"><table class="w-full text-xs sm:text-sm border-collapse border border-rose-100"><thead><tr class="bg-rose-50"><th class="p-2 border border-rose-100 text-left">コース時間</th><th class="p-2 border border-rose-100 text-left">キャスト手取り報酬</th><th class="p-2 border border-rose-100 text-left">時給換算相当</th><th class="p-2 border border-rose-100 text-left">特徴</th></tr></thead><tbody>${courseSchedule
        .map((r) => `<tr><td class="p-2 border border-rose-100 font-bold">${escapeHtml(r.courseTime)}</td><td class="p-2 border border-rose-100">${Number(r.reward).toLocaleString()}円</td><td class="p-2 border border-rose-100">約${Number(r.hourlyEquivalent).toLocaleString()}円/h</td><td class="p-2 border border-rose-100">${escapeHtml(r.note)}</td></tr>`)
        .join('')}</tbody></table></div></section>`
    );
  }
  if (areaRows.length) {
    compareSsrParts.push(
      `<section class="mb-8"><h2 class="text-lg font-bold text-zinc-900 mb-3">大阪五大新地・他業種との違い比較</h2><div class="overflow-x-auto"><table class="w-full text-xs sm:text-sm border-collapse border border-rose-100"><thead><tr class="bg-rose-50"><th class="p-2 border border-rose-100 text-left">比較項目</th><th class="p-2 border border-rose-100 text-left">信太山新地（当店）</th><th class="p-2 border border-rose-100 text-left">飛田新地</th><th class="p-2 border border-rose-100 text-left">松島新地</th><th class="p-2 border border-rose-100 text-left">一般夜職・風俗</th></tr></thead><tbody>${areaRows
        .map((r) => `<tr><th class="p-2 border border-rose-100 text-left font-bold bg-rose-50/30">${escapeHtml(r.criteria)}</th><td class="p-2 border border-rose-100">${escapeHtml(r.shinodayama?.text || '')}</td><td class="p-2 border border-rose-100">${escapeHtml(r.tobita?.text || '')}</td><td class="p-2 border border-rose-100">${escapeHtml(r.matsushima?.text || '')}</td><td class="p-2 border border-rose-100">${escapeHtml(r.generalNight?.text || '')}</td></tr>`)
        .join('')}</tbody></table></div></section>`
    );
  }
  compareSsrParts.push(
    `<section><h2 class="text-lg font-bold text-zinc-900 mb-3">他業種との比較に関するよくある質問</h2><div class="space-y-3">${COMPARISON_FAQS.map(
      (f) => `<div class="bg-rose-50/40 rounded-xl p-4 border border-rose-100"><p class="font-bold text-sm text-zinc-900 mb-1">Q. ${escapeHtml(f.q)}</p><p class="text-sm text-zinc-700 leading-relaxed">A. ${escapeHtml(f.a)}</p></div>`
    ).join('')}</div></section>`
  );

  routes.push({
    route: 'compare',
    mdPath: '/compare.md',
    title: '信太山新地・他業種 徹底比較｜飛田新地・メンエス・キャバクラとの違い',
    description:
      '信太山新地と飛田新地・メンズエステ・キャバクラ・ソープランド、スカウト経由との違いを全11項目で比較。仕事内容、待機環境、給料の仕組み、勤務時間、身バレ対策、仲介なし直営店の応募条件や未経験での働きやすさまで詳しく解説します。LINE相談歓迎。',
    canonicalUrl: `${BASE_DOMAIN}/compare`,
    imagePath: '/images/col_ryokan_manner_1792465891118.webp',
    heading: '信太山新地 徹底比較ガイド（6種類の違いを11項目で比較）',
    ssrBodyHtml: compareSsrParts.join(''),
    noscriptBodyHtml:
      '<p>信太山新地・飛田新地・メンズエステ・キャバクラ・ソープランドの5業種と、スカウト・紹介経由（応募方法）の違いを11項目で比較解説しています。</p>',
    extraJsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${BASE_DOMAIN}/compare#webpage`,
          name: '信太山新地・他業種 徹底比較ガイド',
          description: '信太山新地と飛田新地・メンズエステ・キャバクラ・ソープランド・スカウト経由との違いを11項目で比較解説。',
          url: `${BASE_DOMAIN}/compare`,
          dateModified: compareLastMod,
          inLanguage: 'ja-JP',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'h2']
          },
          mainEntity: {
            '@type': 'ItemList',
            name: '信太山新地・他業種・応募形態 6比較対象',
            itemListElement: mainTargets.map((target, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: `${target.name}（${target.subName}）`
            }))
          }
        },
        {
          '@type': 'FAQPage',
          '@id': `${BASE_DOMAIN}/compare#faq`,
          mainEntity: COMPARISON_FAQS.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a
            }
          }))
        }
      ]
    }
  });

  // 2. 8 Workstyle Types (/types and /types/:slug) + Legacy Aliases (noindex, follow)
  const workstyleTitleSuffix = '｜信太山新地・信太山求人 働き方ガイド';
  routes.push({
    route: 'types',
    mdPath: '/types.md',
    title: '信太山新地 タイプ別働き方ガイド｜未経験・週1日・顔出しなし【公式】',
    description:
      '未経験から始めたい方、お給料・収入を重視したい方、週1日や短時間勤務・身バレ対策が気になる方まで。大阪・信太山新地で働く女性の希望やライフスタイルに合わせて、知りたい信太山新地の求人情報を8つのタイプ別に詳しくご案内します。LINE相談歓迎。',
    canonicalUrl: `${BASE_DOMAIN}/types`,
    imagePath: '/images/workstyle_guide_hero_1794546577303.webp',
    heading: '信太山新地求人 タイプ別働き方ガイド',
    ssrBodyHtml: `<section class="mb-8"><h2 class="text-lg font-bold text-zinc-900 mb-3">8つの働き方ガイド</h2><ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">${workstyleTypes
      .map(
        (w) =>
          `<li class="p-3 bg-rose-50/50 rounded-xl border border-rose-100"><a href="${BASE_DOMAIN}/types/${escapeHtml(w.slug)}" class="font-bold text-rose-700 underline block mb-1">${escapeHtml(w.number)}. ${escapeHtml(w.title)}</a><p class="text-xs text-zinc-600">${escapeHtml(w.cardDescription || w.lead || '')}</p></li>`
      )
      .join('')}</ul></section>${
      workstyleOverviewFaqs.length
        ? `<section><h2 class="text-lg font-bold text-zinc-900 mb-3">働き方に関するよくある質問</h2><div class="space-y-3">${workstyleOverviewFaqs
            .map((f) => `<div class="bg-rose-50/40 rounded-xl p-4 border border-rose-100"><p class="font-bold text-sm text-zinc-900 mb-1">Q. ${escapeHtml(f.q)}</p><p class="text-sm text-zinc-700 leading-relaxed">A. ${escapeHtml(f.a)}</p></div>`)
            .join('')}</div></section>`
        : ''
    }`,
    noscriptBodyHtml:
      '<p>未経験から始めたい、高収入を目指したい、週1日から働きたい、顔出しなし・身バレ対策、短時間・短期で働きたい、女性スタッフに相談したい、出稼ぎ・寮付き希望、まずは話を聞きたいの8タイプ別に条件や確認ポイントをご案内します。</p>',
    extraJsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${BASE_DOMAIN}/types#webpage`,
          name: '信太山新地 タイプ別働き方ガイド',
          description:
            '未経験から始めたい方、お給料・収入を重視したい方、週1日や短時間勤務・身バレ対策が気になる方まで。大阪・信太山新地で働く女性の希望やライフスタイルに合わせて、知りたい信太山新地の求人情報を8つのタイプ別に詳しくご案内します。LINE相談歓迎。',
          url: `${BASE_DOMAIN}/types`,
          dateModified: workstyleLastMod,
          inLanguage: 'ja-JP',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'h2']
          },
          mainEntity: {
            '@type': 'ItemList',
            name: '信太山新地 タイプ別働き方ガイド 8選',
            itemListElement: workstyleTypes.map((w, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: `${w.number}. ${w.title}`,
              url: `${BASE_DOMAIN}/types/${w.slug}`
            }))
          }
        },
        ...(workstyleOverviewFaqs.length
          ? [
              {
                '@type': 'FAQPage',
                '@id': `${BASE_DOMAIN}/types#faq`,
                mainEntity: workstyleOverviewFaqs.map((item) => ({
                  '@type': 'Question',
                  name: item.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.a
                  }
                }))
              }
            ]
          : [])
      ]
    }
  });

  workstyleTypes.forEach((item) => {
    const parentBreadcrumb = { name: 'タイプ別働き方ガイド', path: '/types' };
    const fullTitle = `${item.title}${workstyleTitleSuffix}`;
    const fullDescription = formatMetaDescription(
      `${item.cardDescription} 信太山新地の老舗旅館直営店が、対象となる女性の働き方や待機環境・日払い・応募前の確認ポイントを分かりやすくご案内します。`
    );
    const richBody = renderWorkstyleTypeDetailHtml(item, workstyleOverviewFaqs);
    const combinedFaqs = [...workstyleOverviewFaqs, ...(item.faqs || [])];

    const detailJsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${BASE_DOMAIN}/types/${item.slug}#webpage`,
          name: fullTitle,
          description: fullDescription,
          url: `${BASE_DOMAIN}/types/${item.slug}`,
          dateModified: workstyleLastMod,
          inLanguage: 'ja-JP',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'h2']
          },
          mainEntity: {
            '@type': 'ItemList',
            name: '信太山新地 タイプ別働き方ガイド 8選',
            itemListElement: workstyleTypes.map((w, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: `${w.number}. ${w.title}`,
              url: `${BASE_DOMAIN}/types/${w.slug}`
            }))
          }
        },
        ...(combinedFaqs.length
          ? [
              {
                '@type': 'FAQPage',
                '@id': `${BASE_DOMAIN}/types/${item.slug}#faq`,
                mainEntity: combinedFaqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: f.a
                  }
                }))
              }
            ]
          : [])
      ]
    };

    const typeHeading = `${item.title}｜信太山新地求人 働き方ガイド`;
    routes.push({
      route: `types/${item.slug}`,
      mdPath: `/types/${item.slug}.md`,
      title: fullTitle,
      description: fullDescription,
      canonicalUrl: `${BASE_DOMAIN}/types/${item.slug}`,
      imagePath: '/images/workstyle_guide_hero_1794546577303.webp',
      heading: typeHeading,
      breadcrumbName: item.title,
      parentBreadcrumb,
      ssrBodyHtml: richBody,
      noscriptBodyHtml: richBody,
      extraJsonLd: detailJsonLd
    });

    routes.push({
      route: `compare/${item.slug}`,
      title: fullTitle,
      description: fullDescription,
      canonicalUrl: `${BASE_DOMAIN}/types/${item.slug}`,
      robots: 'noindex, follow',
      imagePath: '/images/workstyle_guide_hero_1794546577303.webp',
      heading: typeHeading,
      breadcrumbName: item.title,
      parentBreadcrumb,
      ssrBodyHtml: richBody,
      noscriptBodyHtml: richBody
    });
  });

  // Legacy type aliases -> noindex, follow pointing canonical to /types/<to>
  const legacyTypeAliases = [
    { from: 'double-work', to: 'privacy' },
    { from: 'age-20s', to: 'consultation' },
    { from: 'age-30s', to: 'consultation' }
  ];
  legacyTypeAliases.forEach(({ from, to }) => {
    const target = workstyleTypes.find((m) => m.slug === to);
    if (!target) return;
    const fullTitle = `${target.title}${workstyleTitleSuffix}`;
    const fullDescription = formatMetaDescription(
      `${target.cardDescription} 信太山新地の老舗旅館直営店が、対象となる女性の働き方や待機環境・日払い・応募前の確認ポイントを分かりやすくご案内します。`
    );
    const richBody = renderWorkstyleTypeDetailHtml(target, workstyleOverviewFaqs);
    const typeHeading = `${target.title}｜信太山新地求人 働き方ガイド`;
    [`types/${from}`, `compare/${from}`].forEach((route) => {
      routes.push({
        route,
        title: fullTitle,
        description: fullDescription,
        canonicalUrl: `${BASE_DOMAIN}/types/${to}`,
        robots: 'noindex, follow',
        imagePath: '/images/workstyle_guide_hero_1794546577303.webp',
        heading: typeHeading,
        breadcrumbName: target.title,
        parentBreadcrumb: { name: 'タイプ別働き方ガイド', path: '/types' },
        ssrBodyHtml: richBody,
        noscriptBodyHtml: richBody
      });
    });
  });

  // 3. /faq (All 66 FAQs grouped by 11 categories in SSR HTML + all 66 Question nodes in JSON-LD + WebPage Speakable)
  const faqSsrSections = faqCategories
    .map((cat) => {
      const items = faqQuestions.filter((q) => q.categoryId === cat.id);
      if (!items.length) return '';
      return `<section class="mb-8"><h2 class="text-lg font-bold text-zinc-900 mb-3">${escapeHtml(cat.num)}. ${escapeHtml(cat.name)}（${escapeHtml(cat.desc)}）</h2><div class="space-y-3">${items
        .map(
          (item) =>
            `<div class="bg-rose-50/40 rounded-xl p-4 border border-rose-100"><p class="font-bold text-sm text-zinc-900 mb-1">Q${item.id}. ${escapeHtml(item.q)}</p><p class="text-sm text-zinc-700 leading-relaxed">A. ${escapeHtml(item.a)}</p></div>`
        )
        .join('')}</div></section>`;
    })
    .filter(Boolean)
    .join('');

  routes.push({
    route: 'faq',
    mdPath: '/faq.md',
    title: '信太山新地・信太山求人のよくある質問 FAQ（66問）【公式】',
    description:
      '信太山新地求人のよくある質問全66問を11カテゴリーで分かりやすく整理。未経験の面接や体験入店・店先顔出しなしの待機環境・15分単位の日払い給料・個室寮・身バレ対策・週1日シフト・半年ルールまで働く前の疑問に公式がお答えします。LINE相談も歓迎。',
    canonicalUrl: `${BASE_DOMAIN}/faq`,
    imagePath: '/images/col_interview_counseling_jp_1792475575633.webp',
    heading: `信太山新地求人 よくある質問 FAQ（全${faqQuestions.length}問・${faqCategories.length}カテゴリー）`,
    ssrBodyHtml: faqSsrSections || '<p>全66問のQ&Aを掲載しています。</p>',
    noscriptBodyHtml:
      '<p>未経験からの始め方、仕事内容、給与・日払い、シフト・働き方、身バレ対策・プライバシー、寮・出稼ぎ、面接・体験入店、店舗選び・半年ルールなど全66問のQ&Aを掲載しています。</p>',
    extraJsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${BASE_DOMAIN}/faq#webpage`,
          name: `信太山新地・信太山求人のよくある質問 FAQ（全${faqQuestions.length}問）`,
          description:
            '信太山新地求人・信太山求人のよくある質問全66問を11カテゴリーで分かりやすく整理。仕事内容、給料、働き方、未経験の疑問に公式がお答えします。',
          url: `${BASE_DOMAIN}/faq`,
          dateModified: faqLastMod,
          inLanguage: 'ja-JP',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'h2']
          }
        },
        ...(faqQuestions.length > 0
          ? [
              {
                '@type': 'FAQPage',
                '@id': `${BASE_DOMAIN}/faq#faqpage`,
                mainEntity: faqQuestions.map((item) => ({
                  '@type': 'Question',
                  name: item.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.a
                  }
                }))
              }
            ]
          : [])
      ]
    }
  });

  // 4. /interview (Person authors, SpeakableSpecification, full Q&A SSR HTML + FAQPage)
  const interviewSrcPath = path.join(rootDir, 'src', 'components', 'RecruiterInterviewPage.tsx');
  const interviewSrc = fs.existsSync(interviewSrcPath) ? fs.readFileSync(interviewSrcPath, 'utf8') : '';
  const interviewQnas = [...interviewSrc.matchAll(/question:\s*'([^']+)',\s*answer:\s*'([^']+)'/g)].map((m) => ({
    q: m[1].replace(/\\n/g, ' '),
    a: m[2].replace(/\\n/g, '\n')
  }));

  const interviewSsrHtml = `<div class="space-y-4 text-sm text-zinc-700 leading-relaxed"><p>面接・給与担当の松本マネージャー（採用・面接担当12年）と女性相談窓口のあおいスタッフ（相談員歴8年）が、未経験スタートが多数活躍する安心の理由、待機所（スタンドまたは旅館）での過ごし方、15分単位のコース給料や最低保証制度、週1日・短時間シフト、コンドーム着用厳守や泥酔客お断りなどの安全ルールについて詳しく回答しています。</p>${
    interviewQnas.length
      ? `<section class="mt-6 space-y-3"><h2 class="text-lg font-bold text-zinc-900">採用担当者Q&amp;A一覧</h2>${interviewQnas
          .map(
            (qna) =>
              `<div class="bg-rose-50/40 rounded-xl p-4 border border-rose-100"><h3 class="font-bold text-sm text-zinc-900 mb-1">${escapeHtml(qna.q)}</h3><p class="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">${escapeHtml(qna.a)}</p></div>`
          )
          .join('')}</section>`
      : ''
  }</div>`;

  routes.push({
    route: 'interview',
    mdPath: '/interview.md',
    title: '旅館の求人・採用担当者インタビュー｜信太山新地 旅館直営公式採用',
    description:
      '信太山新地の老舗旅館直営採用。面接・給与担当の松本マネージャーと、女性相談窓口のあおいスタッフが信太山新地のリアルな現場実態に本音で回答。店先顔見せなし・未経験スタート多数の安心理由・15分単位の給与や日払い・面接内容まで詳しく解説します。事前LINE相談歓迎。',
    canonicalUrl: `${BASE_DOMAIN}/interview`,
    ogType: 'article',
    imagePath: '/images/shinodayama_advisor_sakura_1792225964799.webp',
    heading: '旅館の求人・採用担当者インタビュー',
    ssrBodyHtml: interviewSsrHtml,
    extraJsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${BASE_DOMAIN}/interview#article`,
          headline: '旅館の求人・採用担当者へのインタビュー',
          description: '面接・給与担当の松本マネージャーと女性相談窓口のあおいスタッフが信太山新地の現場実態に本音で回答。',
          datePublished: '2026-10-01T00:00:00+09:00',
          dateModified: `${interviewLastMod}T00:00:00+09:00`,
          inLanguage: 'ja-JP',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'h2', 'h3']
          },
          author: [
            {
              '@type': 'Person',
              name: 'あおい',
              jobTitle: '女性相談・就労サポート責任者（相談員歴8年）',
              worksFor: {
                '@type': 'Organization',
                name: '信太山ガールズ（信太山新地 老舗旅館直営公式採用窓口）'
              }
            },
            {
              '@type': 'Person',
              name: '松本 健二',
              jobTitle: '採用・労務マネージャー（採用・面接担当12年）',
              worksFor: {
                '@type': 'Organization',
                name: '信太山ガールズ（信太山新地 老舗旅館直営公式採用窓口）'
              }
            }
          ],
          publisher: {
            '@type': 'Organization',
            name: '信太山ガールズ',
            url: `${BASE_DOMAIN}/`,
            logo: {
              '@type': 'ImageObject',
              url: `${BASE_DOMAIN}/favicon.png`
            }
          }
        },
        ...(interviewQnas.length
          ? [
              {
                '@type': 'FAQPage',
                '@id': `${BASE_DOMAIN}/interview#faq`,
                mainEntity: interviewQnas.map((item) => ({
                  '@type': 'Question',
                  name: item.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.a
                  }
                }))
              }
            ]
          : [])
      ]
    }
  });

  // 5. /about & /policy & /admin
  const aboutSsrHtml = `
    <div class="space-y-6 text-sm text-zinc-700 leading-relaxed">
      <p>当サイト「信太山ガールズ」は、大阪府和泉市幸二丁目（信太山新地 旅館街／JR阪和線「信太山駅」徒歩約5分）にて昭和期より旅館を営む直営グループが、女性の安心・安全とプライバシー保護を最優先に運営する公式採用窓口です。外部スカウト業者や仲介所を一切介さない直営採用のため、紹介料や雑費の天引きは0円です。</p>
      <section>
        <h2 class="text-lg font-bold text-zinc-900 mb-3">公式運営者概要（基本データ）</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-xs sm:text-sm border-collapse border border-rose-100">
            <tbody>
              <tr><th class="p-2.5 border border-rose-100 bg-rose-50/50 text-left w-1/3">屋号 / 窓口名称</th><td class="p-2.5 border border-rose-100">信太山ガールズ 公式採用窓口（信太山新地 旅館直営グループ）</td></tr>
              <tr><th class="p-2.5 border border-rose-100 bg-rose-50/50 text-left">運営事業形態</th><td class="p-2.5 border border-rose-100">信太山新地旅館組合 正規加盟店（旅館営業・コンパニオン及び仲居スタッフ直営採用・労務管理）</td></tr>
              <tr><th class="p-2.5 border border-rose-100 bg-rose-50/50 text-left">運営所在地</th><td class="p-2.5 border border-rose-100">大阪府和泉市幸二丁目（JR阪和線「信太山駅」徒歩約5分／天王寺駅より快速約20分）</td></tr>
              <tr><th class="p-2.5 border border-rose-100 bg-rose-50/50 text-left">採用・運営統括責任者</th><td class="p-2.5 border border-rose-100">採用・労務マネージャー：松本 健二 ／ 女性相談・就労サポート責任者：あおい（元キャスト歴8年）</td></tr>
              <tr><th class="p-2.5 border border-rose-100 bg-rose-50/50 text-left">待機スタイル</th><td class="p-2.5 border border-rose-100">店先での顔見せ（顔出し・通り座り）一切なし／待機所（スタンドまたは旅館）待機</td></tr>
              <tr><th class="p-2.5 border border-rose-100 bg-rose-50/50 text-left">給与規定・日払い</th><td class="p-2.5 border border-rose-100">15分3,800円〜 / 30分7,600円〜 / 45分11,400円〜 / 60分15,200円〜（即日全額現金手渡し・天引き0円・条件に応じた最低時給10,000円保証・待機日給保証あり）</td></tr>
              <tr><th class="p-2.5 border border-rose-100 bg-rose-50/50 text-left">受付時間・定休日</th><td class="p-2.5 border border-rose-100">LINE相談24時間・365日受付中（店舗営業は毎月20日の信太山新地エリア一斉定休日に休業）</td></tr>
              <tr><th class="p-2.5 border border-rose-100 bg-rose-50/50 text-left">応募資格・本人確認</th><td class="p-2.5 border border-rose-100">満20歳以上の日本国籍を有する女性（20歳未満は就業不可・顔写真付き公的身分証明書原本確認あり）</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 class="text-lg font-bold text-zinc-900 mb-3">運営責任者からのご挨拶</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-rose-50/40 border border-rose-100">
            <h3 class="font-bold text-zinc-900 mb-1">女性相談・就労サポート責任者：あおい（元キャスト歴8年）</h3>
            <p class="text-xs sm:text-sm text-zinc-700">当グループは街頭スカウトや紹介会社ではなく現場旅館の公式窓口です。店先での顔見せがなく待機所（スタンドまたは旅館）で過ごせるため、プライバシーを守りながら働けます。見学から初日まで同じ女性スタッフが付き添います。</p>
          </div>
          <div class="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
            <h3 class="font-bold text-zinc-900 mb-1">採用・労務マネージャー：松本 健二</h3>
            <p class="text-xs sm:text-sm text-zinc-700">信太山新地旅館組合の健全就労規約のもと、不当な天引きや出勤強要・ノルマ・罰金は一切ありません。仲居さんが受付でお客様を事前確認するため、泥酔者やマナー不良者はお断りしています。</p>
          </div>
        </div>
      </section>
      <section>
        <h2 class="text-lg font-bold text-zinc-900 mb-3">アクセス・通勤・出稼ぎサポート</h2>
        <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li><strong>電車アクセス：</strong>JR阪和線「信太山駅」徒歩約5分（天王寺駅から快速約20分・なんば約35分・無料送迎随時対応）</li>
          <li><strong>車・バイク通勤：</strong>グループ専用無料駐車場完備・交通費規定支給</li>
          <li><strong>個室マンション寮：</strong>家具家電付き・敷金礼金0円・出稼ぎ日額0〜2,000円目安</li>
          <li><strong>往復交通費支給：</strong>領収書ご持参で規定支給（関空・新大阪等への送迎相談可）</li>
        </ul>
      </section>
      <nav aria-label="関連ページ" class="pt-4 border-t border-rose-100 flex flex-wrap gap-2 text-xs font-bold">
        <a href="${BASE_DOMAIN}/" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 underline">信太山新地求人トップ</a>
        <a href="${BASE_DOMAIN}/policy" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 underline">掲載ポリシー・安全規約</a>
        <a href="${BASE_DOMAIN}/interview" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 underline">採用担当者インタビュー</a>
        <a href="${BASE_DOMAIN}/faq" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 underline">よくある質問 FAQ</a>
        <a href="https://lin.ee/Z70RRKH" class="px-3 py-1.5 rounded-lg bg-[#06C755] text-white">公式LINEで無料相談</a>
      </nav>
    </div>`;

  const policySsrHtml = `
    <div class="space-y-6 text-sm text-zinc-700 leading-relaxed">
      <p>信太山ガールズ（信太山新地 老舗旅館直営公式採用窓口）は、ご応募・ご相談いただく女性の安全、報酬の透明性、身バレ防止・個人情報保護を徹底するため、コンプライアンス＆就労安全憲章と個人情報保護方針を公開しています。</p>
      <section>
        <h2 class="text-lg font-bold text-zinc-900 mb-3">コンプライアンス＆就労安全憲章（5つの約束）</h2>
        <ol class="list-decimal pl-5 space-y-2.5 text-xs sm:text-sm">
          <li><strong>店先での顔見せ（顔出し・通り座り）一切なし：</strong>通りに面した玄関先に座ることはなく、待機所（スタンドまたは旅館）で待機します。Web・SNSへの顔写真掲載も一切行わず、完全源氏名で勤務します。</li>
          <li><strong>即日全額現金日払い手渡し＆天引き0円の徹底：</strong>15分3,800円〜の報酬を退勤時に全額現金で手渡しします。外部スカウトへの紹介料や雑費・衣装代・罰金などの天引きはありません。</li>
          <li><strong>客層スクリーニングと女性最優先の防犯警備体制：</strong>受付でベテラン仲居さんがお客様を確認し、泥酔者やマナー不良者はお断りしています。客室には非常用ブザーを備えスタッフが常駐しています。</li>
          <li><strong>出勤強要・催促連絡の完全禁止＆毎月20日一斉定休日：</strong>週1日や短時間など完全自由出勤制で、休日への出勤催促はありません。毎月20日はエリア一斉休業日です。</li>
          <li><strong>20歳未満の就労完全禁止と厳格な身元確認：</strong>法令および信太山新地旅館組合規約に基づき、20歳未満（18歳・19歳含む）の就労を禁止し、公的身分証明書原本による本人・年齢確認を厳守しています。</li>
        </ol>
      </section>
      <section>
        <h2 class="text-lg font-bold text-zinc-900 mb-3">個人情報保護方針（プライバシーポリシー）</h2>
        <div class="space-y-2 text-xs sm:text-sm bg-rose-50/40 p-4 rounded-xl border border-rose-100">
          <p><strong>1. 個人情報の利用目的：</strong>応募者および在籍者の個人情報は、求人選考・労務管理・安全確認・緊急時の連絡以外の目的で使用しません。</p>
          <p><strong>2. 第三者提供の完全禁止：</strong>法令に基づく開示要請がある場合を除き、ご本人の同意なく外部の第三者（スカウト業者・外部紹介所等）へ情報を提供・開示・売却することは一切ありません。</p>
          <p><strong>3. 身バレ防止と情報抹消：</strong>業務上は源氏名で管理し本名をお客様へ開示しません。退職・不採用時は規程に基づき速やかに情報を抹消します。</p>
          <p><strong>4. 誇大広告・虚偽条件の排除：</strong>実際のコース単価・最低保証適用条件・寮条件・費用を面接前に正確にお伝えします。</p>
        </div>
      </section>
      <nav aria-label="関連ページ" class="pt-4 border-t border-rose-100 flex flex-wrap gap-2 text-xs font-bold">
        <a href="${BASE_DOMAIN}/" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 underline">信太山新地求人トップ</a>
        <a href="${BASE_DOMAIN}/about" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 underline">運営者情報・店舗概要</a>
        <a href="${BASE_DOMAIN}/safety" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 underline">身バレ・安全対策ガイド</a>
        <a href="${BASE_DOMAIN}/faq" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 underline">よくある質問 FAQ</a>
        <a href="https://lin.ee/Z70RRKH" class="px-3 py-1.5 rounded-lg bg-[#06C755] text-white">公式LINEで事前確認する</a>
      </nav>
    </div>`;

  routes.push({
    route: 'about',
    mdPath: '/about.md',
    title: '運営者情報・店舗概要｜信太山ガールズ（信太山新地 旅館直営公式採用窓口）',
    description:
      '信太山新地の老舗旅館直営公式求人「信太山ガールズ」の運営者情報・店舗概要ページ。大阪府和泉市の勤務地アクセス、女性専任サポート体制、信太山新地旅館組合への加盟状況、コンプライアンス就労憲章、個人情報保護規程を詳しく明示しています。事前相談はお気軽にLINEへ。',
    canonicalUrl: `${BASE_DOMAIN}/about`,
    imagePath: '/images/col_secure_ryotei_1792475628730.webp',
    heading: '運営者情報・店舗概要（信太山ガールズ）',
    ssrBodyHtml: aboutSsrHtml,
    extraJsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${BASE_DOMAIN}/about#aboutpage`,
      name: '運営者情報・店舗概要',
      description: '信太山新地の旅館直営公式求人「信太山ガールズ」の運営者情報・店舗概要',
      url: `${BASE_DOMAIN}/about`,
      dateModified: aboutLastMod,
      inLanguage: 'ja-JP',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2']
      },
      mainEntity: {
        '@type': 'LodgingBusiness',
        '@id': `${BASE_DOMAIN}/#localbusiness`,
        name: '信太山ガールズ 公式採用窓口（信太山新地 旅館直営グループ）',
        url: `${BASE_DOMAIN}/`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '幸二丁目（信太山新地 旅館街）',
          addressLocality: '和泉市',
          addressRegion: '大阪府',
          postalCode: '594-0003',
          addressCountry: 'JP'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          url: 'https://lin.ee/Z70RRKH',
          availableLanguage: ['Japanese']
        },
        knowsAbout: [
          '信太山新地 旅館直営公式求人',
          '待機所（スタンドまたは旅館）での待機',
          '15分単位のコース別報酬制度',
          '即日全額現金日払い',
          '毎月20日エリア一斉定休日'
        ],
        employee: [
          {
            '@type': 'Person',
            name: '松本 健二',
            jobTitle: '採用・労務マネージャー',
            url: `${BASE_DOMAIN}/interview`
          },
          {
            '@type': 'Person',
            name: 'あおい',
            jobTitle: '女性相談・就労サポート責任者',
            url: `${BASE_DOMAIN}/interview`
          }
        ]
      }
    }
  });

  routes.push({
    route: 'policy',
    mdPath: '/policy.md',
    title: '求人情報掲載ポリシー・安全規約・個人情報保護｜信太山ガールズ公式',
    description:
      '信太山新地の老舗旅館直営「信太山ガールズ」の求人情報掲載ポリシー、コンプライアンス＆就労安全憲章、身バレ防止・個人情報保護方針（プライバシーポリシー）をご案内。満20歳以上の厳格な本人確認や個人情報の秘密厳守、天引き0円規程を徹底しています。疑問はLINEへ。',
    canonicalUrl: `${BASE_DOMAIN}/policy`,
    imagePath: '/images/col_official_documents_1792465890547.webp',
    heading: '求人情報掲載ポリシー・安全規約・個人情報保護方針',
    ssrBodyHtml: policySsrHtml,
    noscriptBodyHtml:
      '<p>満20歳以上の厳格な本人確認、虚偽・誇大表現の排除、ノルマ・天引き0円規程、身バレ防止・第三者提供禁止の個人情報保護方針を公開しています。</p>',
    extraJsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${BASE_DOMAIN}/policy#webpage`,
      name: '求人情報掲載ポリシー・安全規約・個人情報保護方針',
      description: '信太山ガールズの求人掲載基準、コンプライアンス就労憲章、個人情報保護方針',
      url: `${BASE_DOMAIN}/policy`,
      dateModified: policyLastMod,
      inLanguage: 'ja-JP',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2']
      }
    }
  });

  // Dedicated Quick Guide Route (/quick-guide)
  const quickGuideSsrHtml = `<section id="ai-query-summary" class="mb-8"><p class="text-sm text-zinc-700 leading-relaxed mb-6">「給料」「未経験」「仕事内容」「待機方法・身バレ対策」「寮・出稼ぎ」など、応募前によく調べられるポイントを結論からお伝えします。</p><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">${quickGuideCards
    .map(
      (card) =>
        `<article class="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 flex flex-col justify-between"><div><p class="font-bold text-rose-700 mb-1">${escapeHtml(card.queryLabel)}</p><h2 class="font-bold text-base text-zinc-900 mb-2">${escapeHtml(card.questionHeading)}</h2><p class="ai-direct-answer text-zinc-700 leading-relaxed mb-3">${escapeHtml(card.directAnswer)}</p></div><a href="${BASE_DOMAIN}${escapeHtml(card.targetPath)}" class="text-rose-700 font-bold underline">${escapeHtml(card.targetLabel)}</a></article>`
    )
    .join('')}</div></section><div class="p-4 rounded-2xl bg-rose-50/70 border border-rose-200"><p class="font-bold text-sm text-zinc-900 mb-2">さらに詳しく確認したい・個別に質問したい方へ</p><p class="text-xs sm:text-sm text-zinc-700 mb-3">詳しい全66問のQ&amp;Aページをご覧いただくか、当店公式LINEで女性スタッフへ直接ご質問いただけます。</p><p><a href="https://lin.ee/Z70RRKH" class="inline-block px-4 py-2 rounded-xl bg-[#06C755] text-white font-bold text-xs">LINEで直接質問してみる</a>｜<a href="${BASE_DOMAIN}/faq" class="text-rose-700 font-bold underline text-xs">よくある質問（66問）を見る</a>｜<a href="${BASE_DOMAIN}/" class="text-rose-700 font-bold underline text-xs">トップページへ戻る</a></p></div>`;

  routes.push({
    route: 'quick-guide',
    mdPath: '/quick-guide.md',
    title: '信太山新地求人 キーワード別公式要点まとめ｜給料・未経験・仕事内容【公式】',
    description:
      '信太山新地の求人・お店直接募集・給料・日払い・未経験・仕事内容・待機方法（顔出しなし）・週1日シフト・個室寮や出稼ぎ・飛田新地との違いなど、応募前によく検索されるキーワード別に結論をわかりやすくまとめました。公式LINEでの無料事前相談も随時受付中です。',
    canonicalUrl: `${BASE_DOMAIN}/quick-guide`,
    imagePath: '/images/col_search_phone_jp_1792475574840.webp',
    heading: '信太山新地求人 気になるキーワード別｜公式要点まとめ',
    hideLeadInSsr: true,
    ssrBodyHtml: quickGuideSsrHtml,
    noscriptBodyHtml: `<ul>${quickGuideCards
      .map(
        (card) =>
          `<li><strong>${escapeHtml(card.queryLabel)}</strong>：${escapeHtml(card.directAnswer)}（<a href="${BASE_DOMAIN}${escapeHtml(card.targetPath)}">${escapeHtml(card.targetLabel)}</a>）</li>`
      )
      .join('')}</ul>`,
    extraJsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${BASE_DOMAIN}/quick-guide#webpage`,
          name: '気になるキーワード別にすぐ分かる｜信太山新地求人 公式要点まとめ',
          description:
            '信太山新地の求人・給料・未経験・仕事内容・待機方法・働き方・寮出稼ぎ・他業種比較について公式結論をまとめたページ',
          url: `${BASE_DOMAIN}/quick-guide`,
          dateModified: `${quickGuideLastMod}T00:00:00+09:00`,
          inLanguage: 'ja-JP',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'h2', '.ai-direct-answer']
          }
        },
        {
          '@type': 'FAQPage',
          '@id': `${BASE_DOMAIN}/quick-guide#faq`,
          mainEntity: quickGuideCards.map((card) => ({
            '@type': 'Question',
            name: card.questionHeading,
            acceptedAnswer: {
              '@type': 'Answer',
              text: card.directAnswer
            }
          }))
        }
      ]
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

  // 6. Topic Clusters from data/topicClusters.json (+ Article dateModified/Speakable + HowTo for /job and /flow)
  const articlesPath = path.join(rootDir, 'data', 'blogArticles.json');
  const rawArticles = fs.existsSync(articlesPath)
    ? JSON.parse(fs.readFileSync(articlesPath, 'utf8'))
    : [];
  const sortedArticles = [...rawArticles].sort((a, b) =>
    String(b.publishedAt || '').localeCompare(String(a.publishedAt || ''))
  );

  const topicClustersPath = path.join(rootDir, 'data', 'topicClusters.json');
  const clusters = fs.existsSync(topicClustersPath)
    ? JSON.parse(fs.readFileSync(topicClustersPath, 'utf8'))
    : {};
  if (Object.keys(clusters).length > 0) {
    Object.entries(clusters).forEach(([key, data]) => {
      const isBenefitsAlias = key === 'benefits';
      const canonicalPath = isBenefitsAlias ? '/salary' : data.path || `/${key}`;
      const howToNode = !isBenefitsAlias ? buildHowToNode(key) : null;

      const graphNodes = [
        {
          '@type': 'Article',
          '@id': `${BASE_DOMAIN}${canonicalPath}#article`,
          headline: data.title,
          description: data.metaDescription || data.overview || data.tagline || '',
          image: data.heroImage ? toAbsoluteUrl(data.heroImage) : DEFAULT_IMAGE,
          datePublished: '2026-10-01T00:00:00+09:00',
          dateModified: `${topicLastMod}T00:00:00+09:00`,
          inLanguage: 'ja-JP',
          author: {
            '@type': 'Organization',
            name: '信太山ガールズ（信太山新地 旅館直営公式採用窓口）'
          },
          publisher: {
            '@type': 'Organization',
            name: '信太山ガールズ',
            logo: {
              '@type': 'ImageObject',
              url: `${BASE_DOMAIN}/favicon.png`
            }
          },
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'h2', '#llm-direct-answer-text']
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${BASE_DOMAIN}${canonicalPath}`
          },
          about: [
            {
              '@type': 'Thing',
              name: `信太山新地 ${data.title}`
            },
            {
              '@type': 'Thing',
              name: '信太山新地求人・旅館直営・即日全額日払い'
            }
          ]
        }
      ];

      if (howToNode) {
        graphNodes.push(howToNode);
      }

      if (Array.isArray(data.faqs) && data.faqs.length > 0) {
        graphNodes.push({
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
        });
      }

      routes.push({
        route: key,
        mdPath: isBenefitsAlias ? undefined : `/${key}.md`,
        title: data.seoTitle || `${data.title}｜信太山新地求人 公式ガイド`,
        description: data.metaDescription || data.overview || data.tagline || '',
        canonicalUrl: `${BASE_DOMAIN}${canonicalPath}`,
        robots: isBenefitsAlias ? 'noindex, follow' : undefined,
        ogType: 'article',
        imagePath: data.heroImage,
        heading: data.h1Title || data.title,
        breadcrumbName: data.title,
        ssrBodyHtml: renderTopicClusterSsrHtml(data, clusters, sortedArticles),
        noscriptBodyHtml: `<p>${escapeHtml(data.overview || data.metaDescription || '')}</p>`,
        extraJsonLd: {
          '@context': 'https://schema.org',
          '@graph': graphNodes
        }
      });
    });
  }

  // 7. Blog Listing, Category Archives (/blog/category/:cat), & All Articles
  const indexableSortedArticles = sortedArticles.filter((a) => !a.noindex);
  const latestArticleDate = indexableSortedArticles.reduce((max, a) => {
    const raw = a.updatedAt || a.publishedAt || '';
    const d = /^\d{4}-\d{2}-\d{2}/.test(raw) ? raw.slice(0, 10) : '';
    return d > max ? d : max;
  }, getFileLastMod(['data/blogArticles.json']));

  const blogCategories = [];
  const blogCatSeen = new Map();
  for (const a of indexableSortedArticles) {
    if (!a.category) continue;
    if (!blogCatSeen.has(a.category)) {
      const obj = { id: a.category, label: a.categoryLabel || a.category, articles: [] };
      blogCatSeen.set(a.category, obj);
      blogCategories.push(obj);
    }
    blogCatSeen.get(a.category).articles.push(a);
  }

  const blogCategoryNavHtml = blogCategories.length > 0
    ? `<nav aria-label="コラムカテゴリー" class="mb-6 flex flex-wrap gap-2 text-xs font-bold"><a href="${BASE_DOMAIN}/blog" class="px-3 py-1.5 rounded-lg bg-rose-600 text-white">すべて（${indexableSortedArticles.length}件）</a>${blogCategories
        .map(
          (c) =>
            `<a href="${BASE_DOMAIN}/blog/category/${escapeHtml(c.id)}" class="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-100 underline">${escapeHtml(c.label)}（${c.articles.length}）</a>`
        )
        .join('')}</nav>`
    : '';

  const blogListingSsrHtml = indexableSortedArticles.length > 0
    ? `${blogCategoryNavHtml}<ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">${indexableSortedArticles.filter((a) => a.slug).map((a) => `<li class="p-3 bg-rose-50/40 rounded-xl border border-rose-100"><a href="${BASE_DOMAIN}/blog/${escapeHtml(a.slug)}" class="font-bold text-rose-700 underline block mb-1">${escapeHtml(a.title)}</a><p class="text-xs text-zinc-600 line-clamp-2">${escapeHtml(a.summary || '')}</p></li>`).join('')}</ul>`
    : '<p>信太山新地の公式解説コラム一覧です。</p>';

  routes.push({
    route: 'blog',
    mdPath: '/blog.md',
    title: '信太山新地求人・信太山求人 お仕事コラム一覧｜信太山ガールズ公式',
    description:
      '信太山新地の仕事内容、15分単位の給料システム、待機所（スタンドまたは旅館）での待機や顔出しなしルール、未経験向けガイド、週1日勤務、個室寮・出稼ぎ情報、身バレ対策など、働く前に役立つ公式解説コラム一覧を掲載しています。気になる点はLINEでお気軽にご質問ください。',
    canonicalUrl: `${BASE_DOMAIN}/blog`,
    imagePath: '/images/col_search_phone_jp_1792475574840.webp',
    heading: '信太山新地求人 お仕事コラム一覧',
    ssrBodyHtml: blogListingSsrHtml,
    extraJsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${BASE_DOMAIN}/blog#collection`,
      name: '信太山新地求人 お仕事コラム一覧',
      description:
        '信太山新地の仕事内容、給料システム、未経験向けガイド、安全・身バレ対策、寮・出稼ぎなど女性向け公式解説コラム一覧',
      url: `${BASE_DOMAIN}/blog`,
      dateModified: latestArticleDate,
      inLanguage: 'ja-JP',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2']
      },
      mainEntity: {
        '@type': 'ItemList',
        name: '信太山新地求人 お仕事コラム一覧',
        numberOfItems: indexableSortedArticles.length,
        itemListElement: indexableSortedArticles.slice(0, 30).map((art, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: art.title,
          url: `${BASE_DOMAIN}/blog/${art.slug}`
        }))
      }
    }
  });

  // Pre-rendered Blog Category Archives (/blog/category/:cat)
  blogCategories.forEach((cat) => {
    const pillarInfo = CATEGORY_PILLAR_MAP[cat.id] || { topic: 'job', workstyle: 'inexperienced', label: cat.label };
    const catUrl = `${BASE_DOMAIN}/blog/category/${cat.id}`;
    const catDesc = formatMetaDescription(
      `信太山新地求人「${cat.label}」カテゴリの公式解説コラム一覧（全${cat.articles.length}件）。店先顔出しなしの待機環境、15分3,800円〜の日払い報酬、未経験安心サポートなど応募前に知りたい要点を詳しくご案内しています。LINE相談歓迎。`
    );
    const catSsrHtml = `
      <div class="mb-6 p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs sm:text-sm">
        <p class="font-bold text-zinc-900 mb-2">関連する公式詳細ガイド</p>
        <div class="flex flex-wrap gap-2 font-bold">
          <a href="${BASE_DOMAIN}/${escapeHtml(pillarInfo.topic)}" class="px-3 py-1.5 rounded-lg bg-white text-rose-700 border border-rose-100 underline">${escapeHtml(clusters[pillarInfo.topic]?.title || pillarInfo.label)}</a>
          <a href="${BASE_DOMAIN}/types/${escapeHtml(pillarInfo.workstyle)}" class="px-3 py-1.5 rounded-lg bg-white text-rose-700 border border-rose-100 underline">タイプ別働き方ガイド</a>
          <a href="${BASE_DOMAIN}/blog" class="px-3 py-1.5 rounded-lg bg-white text-zinc-700 border border-rose-100 underline">全コラム一覧（${indexableSortedArticles.length}件）へ戻る</a>
        </div>
      </div>
      <nav aria-label="コラムカテゴリー" class="mb-6 flex flex-wrap gap-2 text-xs font-bold">${blogCategories
        .map(
          (other) =>
            `<a href="${BASE_DOMAIN}/blog/category/${escapeHtml(other.id)}" class="px-3 py-1.5 rounded-lg ${other.id === cat.id ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 border border-rose-100 underline'}">${escapeHtml(other.label)}（${other.articles.length}）</a>`
        )
        .join('')}</nav>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">${cat.articles
        .filter((a) => a.slug)
        .map(
          (a) =>
            `<li class="p-3 bg-rose-50/40 rounded-xl border border-rose-100"><a href="${BASE_DOMAIN}/blog/${escapeHtml(a.slug)}" class="font-bold text-rose-700 underline block mb-1">${escapeHtml(a.title)}</a><p class="text-xs text-zinc-600 line-clamp-2">${escapeHtml(a.summary || '')}</p></li>`
        )
        .join('')}</ul>`;

    routes.push({
      route: `blog/category/${cat.id}`,
      mdPath: `/blog/category/${cat.id}.md`,
      title: `信太山新地「${cat.label}」コラム一覧｜信太山ガールズ公式`,
      description: catDesc,
      canonicalUrl: catUrl,
      imagePath: '/images/col_search_phone_jp_1792475574840.webp',
      heading: `${cat.label}｜信太山新地求人 お仕事コラム一覧`,
      breadcrumbName: cat.label,
      parentBreadcrumb: { name: 'お仕事コラム一覧', path: '/blog' },
      ssrBodyHtml: catSsrHtml,
      extraJsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${catUrl}#collection`,
        name: `${cat.label}｜信太山新地求人 お仕事コラム一覧`,
        description: catDesc,
        url: catUrl,
        dateModified: latestArticleDate,
        inLanguage: 'ja-JP',
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2']
        },
        mainEntity: {
          '@type': 'ItemList',
          name: `信太山新地「${cat.label}」コラム一覧`,
          numberOfItems: cat.articles.length,
          itemListElement: cat.articles.slice(0, 30).map((art, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: art.title,
            url: `${BASE_DOMAIN}/blog/${art.slug}`
          }))
        }
      }
    });
  });

  sortedArticles.forEach((article) => {
    if (!article.slug) return;
    const articleUrl = `${BASE_DOMAIN}/blog/${article.slug}`;
    const seoTitle = formatBlogSeoTitle(article.title);
    const seoDescription = formatMetaDescription(
      article.summary,
      `${article.title}についての信太山新地公式解説記事です。未経験女性が知りたい仕事内容・給料・待機環境・安全ルールまで詳しくお届けします。`
    );
    const fullArticleHtml = renderBlogArticleContentHtml(article, sortedArticles, clusters);
    const wordCount = computeArticleWordCount(article);
    const modifiedDate = article.updatedAt || article.publishedAt || latestArticleDate;
    routes.push({
      route: `blog/${article.slug}`,
      title: seoTitle,
      description: seoDescription,
      canonicalUrl: articleUrl,
      robots: article.noindex ? 'noindex, follow' : undefined,
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
        articleSection: article.categoryLabel || article.category || '解説コラム',
        wordCount,
        datePublished: article.publishedAt,
        dateModified: modifiedDate,
        inLanguage: 'ja-JP',
        isAccessibleForFree: true,
        keywords: Array.isArray(article.tags) ? article.tags.join(', ') : '信太山新地, 信太山求人, 未経験, 待機所',
        image: article.eyeCatch ? toAbsoluteUrl(article.eyeCatch) : DEFAULT_IMAGE,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '#llm-article-summary-text']
        },
        author: {
          '@type': 'Person',
          name: article.author?.name || 'あおい（信太山新地女性専任アドバイザー）',
          jobTitle: '女性採用アドバイザー・現場サポート責任者',
          url: `${BASE_DOMAIN}/interview`,
          sameAs: [`${BASE_DOMAIN}/about`],
          worksFor: {
            '@type': 'Organization',
            name: '信太山新地 老舗旅館直営グループ（信太山ガールズ）',
            url: `${BASE_DOMAIN}/about`
          }
        },
        reviewedBy: {
          '@type': 'Organization',
          name: '信太山ガールズ編集部・旅館組合情報確認窓口',
          url: `${BASE_DOMAIN}/policy`
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

  // Also inject comprehensive semantic SSR HTML into root dist/index.html for JS-less AI bots & instant first paint
  const siteContentPath = path.join(rootDir, 'data', 'siteContent.json');
  const siteContent = fs.existsSync(siteContentPath)
    ? JSON.parse(fs.readFileSync(siteContentPath, 'utf8'))
    : {};
  const reasonsHtml = Array.isArray(siteContent?.reasons?.items)
    ? `<section class="mb-8"><h2 class="text-xl font-bold text-zinc-900 mb-3">${escapeHtml(siteContent.reasons.title || '信太山ガールズの5つの魅力')}</h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${siteContent.reasons.items.map((r) => `<div class="p-4 rounded-2xl bg-rose-50/50 border border-rose-100"><p class="text-xs font-bold text-rose-700">${escapeHtml(r.number)}</p><h3 class="font-bold text-base text-zinc-900 mb-1">${escapeHtml(r.title)}</h3><p class="text-xs sm:text-sm text-zinc-700 leading-relaxed">${escapeHtml(r.description)}</p></div>`).join('')}</div></section>`
    : '';
  const faqsHtml = Array.isArray(siteContent?.faq?.items)
    ? `<section class="mb-8"><h2 class="text-xl font-bold text-zinc-900 mb-3">よくある質問</h2><div class="space-y-3">${siteContent.faq.items.map((f) => `<div class="p-4 rounded-xl bg-rose-50/40 border border-rose-100"><p class="font-bold text-sm text-zinc-900 mb-1">${escapeHtml(f.question)}</p><p class="text-sm text-zinc-700 leading-relaxed">${escapeHtml(f.answer)}</p></div>`).join('')}</div></section>`
    : '';
  const topPageBodyHtml = `
    <section class="mb-8 p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
      <p id="hero-tagline" class="text-xs font-bold text-rose-700 mb-2">${escapeHtml(siteContent?.hero?.tagline || '信太山新地 お店直接求人｜信太山ガールズ【公式】')}</p>
      <div id="hero-description" class="space-y-2 text-sm text-zinc-700 leading-relaxed">
        <p>${escapeHtml(siteContent?.hero?.descriptionLine1 || '信太山新地の中でもトップクラスのお店です。')}</p>
        <p>${escapeHtml(siteContent?.hero?.descriptionLine2 || '当店では未経験の方も、経験のある方も歓迎。仕事内容・お給料・待遇・働く環境まで、当店の条件を応募前に分かりやすくご案内します。')}</p>
        <p>${escapeHtml(siteContent?.hero?.descriptionLine3 || '週1日からの勤務や1日3〜4時間の短時間勤務など、ご希望の働き方もお気軽にご相談ください。')}</p>
      </div>
      <p class="mt-3 text-xs text-zinc-600">${escapeHtml(siteContent?.hero?.badgeText || '')}</p>
      <p class="mt-3"><a href="https://lin.ee/Z70RRKH" class="inline-block px-5 py-2.5 rounded-xl bg-[#06C755] text-white font-bold text-sm">LINEで気軽に相談する</a></p>
      <p class="mt-2 text-xs text-zinc-500">※掲載画像は雰囲気をお伝えするためのイメージ素材であり、実際の店舗写真・在籍スタッフ写真ではありません。</p>
    </section>
    ${reasonsHtml}
    <section class="mb-8">
      <h2 class="text-xl font-bold text-zinc-900 mb-3">初めての方にも分かる、お仕事内容（1日の流れ）</h2>
      <ol class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs sm:text-sm">
        <li class="p-3 rounded-xl bg-rose-50/40 border border-rose-100"><strong>STEP 1：出勤・無料衣装に着替え</strong><br />手ぶら出勤OK・身支度</li>
        <li class="p-3 rounded-xl bg-rose-50/40 border border-rose-100"><strong>STEP 2：待機所（スタンドまたは旅館）で待機</strong><br />店先顔出しなし・自由時間</li>
        <li class="p-3 rounded-xl bg-rose-50/40 border border-rose-100"><strong>STEP 3：仲居さんの案内で接客</strong><br />15分〜の個室コース対応</li>
        <li class="p-3 rounded-xl bg-rose-50/40 border border-rose-100"><strong>STEP 4：全額現金受取・退勤</strong><br />その日の報酬を当日手渡し</li>
      </ol>
      <p class="text-sm text-zinc-700 leading-relaxed">旅館内個室で行う15分単位のショートコース（15分〜60分）を中心とした1対1の接客です。軽い会話のあと、スキンシップ・フェラ・コンドーム着用厳守での本番行為（生本番禁止）などを行います。お茶出しや飲酒、連絡先交換・営業LINE、客室清掃はありません。仲居さんが受付・お部屋案内・時間管理・片付けを担当するため初めての方も安心です。</p>
    </section>
    <section class="mb-8">
      <h2 class="text-xl font-bold text-zinc-900 mb-3">気になるお給料について、分かりやすくご説明します</h2>
      <table class="w-full text-xs sm:text-sm border-collapse border border-rose-100 mb-4">
        <thead><tr class="bg-rose-50"><th class="p-2 border border-rose-100 text-left">コース時間</th><th class="p-2 border border-rose-100 text-left">手取り報酬基準</th><th class="p-2 border border-rose-100 text-left">補足</th></tr></thead>
        <tbody>
          <tr><td class="p-2 border border-rose-100">15分コース</td><td class="p-2 border border-rose-100">3,800円〜</td><td class="p-2 border border-rose-100">短時間の基本コース</td></tr>
          <tr><td class="p-2 border border-rose-100">30分コース</td><td class="p-2 border border-rose-100">7,600円〜</td><td class="p-2 border border-rose-100">定番・ゆったり接客</td></tr>
          <tr><td class="p-2 border border-rose-100">45分コース</td><td class="p-2 border border-rose-100">11,400円〜</td><td class="p-2 border border-rose-100">長めにお話ししたい方向け</td></tr>
          <tr><td class="p-2 border border-rose-100">60分コース</td><td class="p-2 border border-rose-100">15,200円〜</td><td class="p-2 border border-rose-100">じっくり接客（以降15分毎加算）</td></tr>
        </tbody>
      </table>
      <ul class="space-y-2 text-xs sm:text-sm text-zinc-700">
        <li><strong>例1｜Wワーク・短時間勤務（週2日・1日4時間 18:00〜22:00）</strong>：日給目安 15,200円〜22,800円（月8日で約12万〜18万円目安／15分×2＋30分×1〜30分×3）</li>
        <li><strong>例2｜副業・夕方〜夜ペース（週3日・1日6時間 17:00〜23:00）</strong>：日給目安 26,600円〜38,000円（月12日で約31万〜45万円目安／15分×3＋30分×2〜30分×5）</li>
        <li><strong>例3｜日中中心でしっかり勤務（週4日・1日8時間 11:00〜19:00）</strong>：日給目安 38,000円〜57,000円（月16日で約60万〜91万円目安／30分×5〜30分×6＋45分×1）</li>
      </ul>
      <p class="mt-2 text-xs text-zinc-600">※退勤時に即日全額現金日払い、雑費・紹介料などの天引き0円。最低時給10,000円保証・待機日給保証制度あり（適用条件は面接時に事前ご説明します）。</p>
    </section>
    <section class="mb-8">
      <h2 class="text-xl font-bold text-zinc-900 mb-3">募集要項・勤務条件</h2>
      <ul class="space-y-1.5 text-xs sm:text-sm text-zinc-700">
        <li><strong>応募資格：</strong>20歳以上の女性（未経験・経験者歓迎 ※20歳未満不可）</li>
        <li><strong>勤務地：</strong>大阪府和泉市幸二丁目（信太山新地／JR阪和線「信太山駅」徒歩約5分）</li>
        <li><strong>待機方法：</strong>店先での顔見せなし／待機所（スタンドまたは旅館）での待機</li>
        <li><strong>勤務時間・シフト：</strong>10:00〜24:00（完全自由出勤制・週1日〜・1日3〜4時間の短時間相談可）</li>
        <li><strong>定休日：</strong>毎月20日（信太山新地エリア一斉定休日）</li>
        <li><strong>寮・送迎・託児：</strong>個室マンション寮（日額0〜2,000円目安）、駅送迎・駐車場相談可、託児費用補助相談可</li>
      </ul>
    </section>
    ${faqsHtml}
    <section id="consultation" class="mb-8 p-5 rounded-2xl bg-rose-50/70 border border-rose-200">
      <h2 class="text-lg font-bold text-zinc-900 mb-2">${escapeHtml(siteContent?.consultation?.title || '応募するか迷っている方も、まずはお気軽にご相談ください。')}</h2>
      <p class="text-sm text-zinc-700 leading-relaxed mb-3">${escapeHtml(siteContent?.consultation?.description || '仕事内容・お給料・働き方など、気になることをLINEでご質問いただけます。無理に応募をおすすめすることはありません。まずは疑問や不安を解消するところから始めてみませんか？')}</p>
      <p><a href="https://lin.ee/Z70RRKH" class="inline-block px-5 py-2.5 rounded-xl bg-[#06C755] text-white font-bold text-sm">LINEで気軽に相談する（https://lin.ee/Z70RRKH）</a></p>
    </section>
    <section id="recruit-hub" class="mb-8">
      <h2 class="text-xl font-bold text-zinc-900 mb-2">応募前に知っておきたい情報（RECRUIT GUIDE）</h2>
      <p class="text-sm text-zinc-700 leading-relaxed mb-4">気になるテーマから当店の募集情報を詳しく確認できます。分からないことはLINEでも当店スタッフが直接お答えします。</p>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm font-bold mb-3">
        <a href="${BASE_DOMAIN}/job" class="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-rose-700 underline">仕事内容・1日の流れ</a>
        <a href="${BASE_DOMAIN}/salary" class="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-rose-700 underline">お給料・日払い条件</a>
        <a href="${BASE_DOMAIN}/beginner" class="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-rose-700 underline">未経験ガイド</a>
        <a href="${BASE_DOMAIN}/experienced" class="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-rose-700 underline">経験者優遇・移籍</a>
        <a href="${BASE_DOMAIN}/requirements" class="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-rose-700 underline">募集要項・応募条件</a>
        <a href="${BASE_DOMAIN}/flow" class="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-rose-700 underline">面接・体験入店の流れ</a>
        <a href="${BASE_DOMAIN}/workstyle" class="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-rose-700 underline">自由出勤・働き方</a>
        <a href="${BASE_DOMAIN}/shops" class="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-rose-700 underline">お店選び・半年ルール</a>
        <a href="${BASE_DOMAIN}/dorm" class="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-rose-700 underline">個室寮・出稼ぎ</a>
        <a href="${BASE_DOMAIN}/safety" class="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-rose-700 underline">身バレ・安全対策</a>
        <a href="${BASE_DOMAIN}/compare" class="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-rose-700 underline">6業種・徹底比較</a>
        <a href="${BASE_DOMAIN}/quick-guide" class="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-rose-700 underline">キーワード別要点まとめ</a>
      </div>
      <p class="text-xs text-zinc-500">※各カードの画像は各テーマの雰囲気をお伝えするためのイメージ素材です。</p>
    </section>
  `;

  const rootSsrShell = buildSsrRootShell({
    heading: `${siteContent?.hero?.titleLine1 || '信太山新地でお仕事を探す女性へ。'}${siteContent?.hero?.titleLine2 || '自分に合った働き方を、信太山ガールズで見つけませんか？'}`,
    hideLeadInSsr: true,
    ssrBodyHtml: topPageBodyHtml
  });
  let updatedRootHtml = baseHtml.replace(/<div\s+id="root"><\/div>/i, rootSsrShell);
  updatedRootHtml = updatedRootHtml
    .replace(/"(dateModified|datePosted)":\s*"2026-11-14T00:00:00\+09:00"/g, `"$1": "${rootLastMod}T00:00:00+09:00"`)
    .replace(/2026年11月14日（旅館直営・最新採用情報）/g, `${rootLastMod.replace(/^(\d{4})-0?(\d+)-0?(\d+)$/, '$1年$2月$3日')}（旅館直営・最新採用情報）`);
  fs.writeFileSync(indexPath, updatedRootHtml, 'utf8');

  // Render all routes
  routes.forEach((meta) => {
    const html = buildRouteHtml(baseHtml, meta);
    writeRouteFiles(meta.route, html);
  });

  console.log(`[prerender] Successfully generated static HTML for ${routes.length} routes + 404.html + root SSR shell in dist/`);
}

main().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});
