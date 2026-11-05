/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import LucideIcon from './LucideIcon';

export interface ArticleCardImageProps {
  src?: string;
  alt?: string;
  title?: string;
  articleId?: string;
  slug?: string;
  category?: string;
  categoryLabel?: string;
  className?: string;
  compact?: boolean;
}

interface ContentTopicConfig {
  gradient: string;
  icon: string;
  tag: string;
  subtext: string;
}

// Simple hash generator for consistent deterministic styling per article
function getArticleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Intelligent content-matched topic detection based on article title keywords
function detectTopicFromContent(title: string, category: string, catLabel?: string): ContentTopicConfig {
  const t = title.toLowerCase();

  if (t.includes('税金') || t.includes('確定申告') || t.includes('住民税') || t.includes('副業') || t.includes('会社にバレ')) {
    return {
      gradient: 'from-emerald-800 via-teal-700 to-slate-900',
      icon: 'Calculator',
      tag: '税金・確定申告対策',
      subtext: '会社バレ防止・普通徴収と申告の全知識'
    };
  }

  if (t.includes('ノンアル') || t.includes('お酒') || t.includes('飲めない')) {
    return {
      gradient: 'from-teal-700 via-emerald-600 to-rose-700',
      icon: 'Coffee',
      tag: 'ノンアル・お酒不要',
      subtext: 'ソフトドリンクOK・お茶接客で高収入'
    };
  }

  if (t.includes('和装') || t.includes('着物') || t.includes('浴衣') || t.includes('メイク') || t.includes('ヘア') || t.includes('容姿')) {
    return {
      gradient: 'from-rose-600 via-pink-600 to-amber-500',
      icon: 'Sparkles',
      tag: '和装・衣装・ヘアメイク',
      subtext: '無料レンタル浴衣＆お仕事メイク術'
    };
  }

  if (t.includes('寮') || t.includes('一人暮らし') || t.includes('出稼ぎ') || t.includes('地方') || t.includes('引越')) {
    return {
      gradient: 'from-cyan-800 via-teal-700 to-rose-700',
      icon: 'Home',
      tag: '家具家電付き個室寮',
      subtext: '即日入居・新幹線往復交通費支給'
    };
  }

  if (t.includes('給料') || t.includes('稼げる') || t.includes('時給') || t.includes('日給') || t.includes('手取り') || t.includes('貯金') || t.includes('月収') || t.includes('高収入')) {
    return {
      gradient: 'from-amber-600 via-rose-600 to-pink-700',
      icon: 'Coins',
      tag: '給与システム・全額日払い',
      subtext: '15分3,800円〜・日給5万〜10万円即日払い'
    };
  }

  if (t.includes('身バレ') || t.includes('プライバシー') || t.includes('秘密') || t.includes('顔見せなし') || t.includes('顔出しなし')) {
    return {
      gradient: 'from-purple-900 via-indigo-800 to-rose-700',
      icon: 'ShieldCheck',
      tag: '店先顔見せなし・秘密厳守',
      subtext: '旅館個室待機・写真ネット掲載なし'
    };
  }

  if (t.includes('20日') || t.includes('定休日') || t.includes('休日') || t.includes('シフト') || t.includes('自由出勤')) {
    return {
      gradient: 'from-sky-700 via-indigo-700 to-rose-600',
      icon: 'Calendar',
      tag: '毎月20日エリア一斉定休',
      subtext: '確実なリフレッシュ・完全自由出勤制'
    };
  }

  if (t.includes('30代') || t.includes('40代') || t.includes('年齢') || t.includes('主婦') || t.includes('ｗワーク') || t.includes('掛け持ち')) {
    return {
      gradient: 'from-rose-700 via-purple-700 to-amber-600',
      icon: 'HeartHandshake',
      tag: '20代〜40代幅広く活躍',
      subtext: '落ち着いた大人の魅力・主婦副業歓迎'
    };
  }

  if (t.includes('面接') || t.includes('体入') || t.includes('体験入店') || t.includes('持ち物') || t.includes('書類') || t.includes('応募')) {
    return {
      gradient: 'from-pink-600 via-rose-600 to-amber-600',
      icon: 'FileText',
      tag: '手ぶら面談・即日体入OK',
      subtext: '履歴書不要・合わなければ即日終了OK'
    };
  }

  if (t.includes('短時間') || t.includes('15分') || t.includes('時間')) {
    return {
      gradient: 'from-indigo-800 via-rose-600 to-pink-600',
      icon: 'Clock',
      tag: '15分短時間コース',
      subtext: '高回転・体力負担最小限の効率ワーク'
    };
  }

  if (t.includes('旅館') || t.includes('料亭') || t.includes('仲居') || t.includes('お店選び') || t.includes('客層')) {
    return {
      gradient: 'from-red-800 via-rose-700 to-amber-700',
      icon: 'Store',
      tag: '旅館営業・仲居案内',
      subtext: '料亭ではなく旅館営業・安心の客層'
    };
  }

  // Category fallback
  const cat = category.toLowerCase();
  if (cat === 'salary' || cat === 'money') {
    return {
      gradient: 'from-amber-600 via-rose-600 to-pink-700',
      icon: 'Coins',
      tag: catLabel || '給料・待遇',
      subtext: '15分3,800円〜 / 即日全額日払い'
    };
  }
  if (cat === 'beginner') {
    return {
      gradient: 'from-rose-600 via-pink-500 to-rose-400',
      icon: 'Sparkles',
      tag: catLabel || '未経験歓迎',
      subtext: '在籍の約90%が夜職ゼロから活躍'
    };
  }
  if (cat === 'safety' || cat === 'privacy') {
    return {
      gradient: 'from-purple-800 via-indigo-900 to-rose-700',
      icon: 'ShieldCheck',
      tag: catLabel || '身バレ・安全',
      subtext: '店先顔見せなし・旅館個室待機'
    };
  }
  if (cat === 'dorm' || cat === 'housing') {
    return {
      gradient: 'from-teal-700 via-emerald-700 to-rose-600',
      icon: 'Home',
      tag: catLabel || '個室寮・出稼ぎ',
      subtext: '家具家電付き・新幹線交通費支給'
    };
  }

  return {
    gradient: 'from-rose-700 via-pink-600 to-purple-800',
    icon: 'BookOpen',
    tag: catLabel || '信太山新地 公式コラム',
    subtext: '店先顔見せなし・安心の旅館直営'
  };
}

export function ArticleCardImage({
  src,
  alt = '',
  title = '',
  articleId = '',
  slug = '',
  category = 'other',
  categoryLabel,
  className = '',
  compact = false
}: ArticleCardImageProps) {
  const [hasError, setHasError] = useState(false);

  // Compute unique hash based on article identifiers
  const seedString = articleId || slug || title || alt || category;
  const hash = getArticleHash(seedString);
  const patternType = hash % 6;

  // Detect matching content topic based on article title keywords
  const topic = detectTopicFromContent(title || alt, category, categoryLabel);

  // Clean title for display: remove brackets like 【...】 to focus on the core title message
  const rawTitle = title || alt;
  const cleanedTitle = rawTitle.replace(/^[【［\[][^】］\]]+[】］\]]\s*/, '').trim() || rawTitle;

  // Format issue number
  const issueNum = String((hash % 139) + 1).padStart(3, '0');

  // Fallback Japanese photo pool in case an asset fails or is not provided
  const FALLBACK_JAPANESE_PHOTOS = [
    '/images/shinodayama_hero_banner_1792225964954.jpg',
    '/images/col_secure_ryotei_1792475628730.jpg',
    '/images/col_ryokan_manner_1792465891118.jpg',
    '/images/col_privacy_safe_1792463653857.jpg',
    '/images/col_kimono_fabrics_1792474118565.jpg',
    '/images/col_beauty_kimono_1792463653258.jpg',
    '/images/col_luxury_beauty_1792474257173.jpg',
    '/images/col_dorm_interior_1792463651469.jpg'
  ];

  const fallbackPhoto = FALLBACK_JAPANESE_PHOTOS[hash % FALLBACK_JAPANESE_PHOTOS.length];
  const effectiveSrc = (!hasError && src && src.length > 0) ? src : fallbackPhoto;

  // 1. Compact Thumbnail Mode (used in Hero 5-pickup lists)
  if (compact) {
    return (
      <div className={`w-full h-full relative overflow-hidden bg-rose-50 select-none ${className}`}>
        <img
          src={effectiveSrc}
          alt={alt || title}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        <span className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-bold text-white drop-shadow line-clamp-1">
          {categoryLabel || topic.tag}
        </span>
      </div>
    );
  }

  // 2. Full photographic rendering (used for all article cards - NO SVG graphic fallbacks)
  return (
    <div className={`relative overflow-hidden bg-rose-50 select-none ${className}`}>
      <img
        src={effectiveSrc}
        alt={alt || title}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
      
      {/* Top-left Content Badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black text-white border border-white/20 shadow-sm">
          <LucideIcon name={topic.icon} size={11} className="text-rose-300" />
          <span>{categoryLabel || topic.tag}</span>
        </span>
      </div>

      {/* Bottom Title Watermark */}
      <div className="absolute bottom-3 left-3 right-3 z-10 text-white pointer-events-none">
        <span className="text-[9px] font-mono tracking-widest text-white/70 block mb-0.5">
          SHINODAYAMA SPECIAL PHOTO #{issueNum}
        </span>
        <p className="text-xs font-bold line-clamp-1 drop-shadow-md text-white/95">
          {topic.subtext}
        </p>
      </div>
    </div>
  );
}

export default ArticleCardImage;

