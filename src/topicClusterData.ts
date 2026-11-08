/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import rawClusters from '../data/topicClusters.json';

export interface TopicClusterStat {
  label: string;
  value: string;
  desc: string;
}

export interface TopicClusterCallout {
  title: string;
  text: string;
}

export interface TopicClusterTable {
  headers: string[];
  rows: string[][];
}

export interface TopicClusterSection {
  title: string;
  description: string;
  points?: string[];
  callout?: TopicClusterCallout;
  table?: TopicClusterTable;
}

export interface TopicClusterFAQ {
  q: string;
  a: string;
}

export interface TopicClusterData {
  id: string;
  path: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  emoji: string;
  icon: string;
  badge: string;
  badgeColor: string;
  heroImage: string;
  tagline: string;
  llmDirectAnswer: string;
  stats: TopicClusterStat[];
  keyPoints: string[];
  overview: string;
  sections?: TopicClusterSection[];
  table?: TopicClusterTable;
  faqs?: TopicClusterFAQ[];
  featuredArticleSlugs?: string[];
  recommendedKeywords?: string[];
}

export interface ClusterNode {
  id: string;
  emoji: string;
  title: string;
  path?: string;
}

export const TOPIC_CLUSTERS: Record<string, TopicClusterData> = rawClusters as unknown as Record<string, TopicClusterData>;

export const ALL_CLUSTER_NODES: ClusterNode[] = [
  { id: 'recruit', emoji: '🏢', title: '求人トップ', path: '/' },
  { id: 'job', emoji: '🍵', title: 'お仕事内容', path: '/job' },
  { id: 'salary', emoji: '💰', title: '給料・待遇', path: '/salary' },
  { id: 'beginner', emoji: '✨', title: '未経験ガイド', path: '/beginner' },
  { id: 'experienced', emoji: '👑', title: '経験者・移籍', path: '/experienced' },
  { id: 'requirements', emoji: '📋', title: '募集要項', path: '/requirements' },
  { id: 'flow', emoji: '📅', title: '面接・体入の流れ', path: '/flow' },
  { id: 'workstyle', emoji: '⏰', title: '働き方・定休日', path: '/workstyle' },
  { id: 'shops', emoji: '🏮', title: 'お店選び', path: '/shops' },
  { id: 'dorm', emoji: '🏠', title: '個室寮・出稼ぎ', path: '/dorm' },
  { id: 'safety', emoji: '🔒', title: '身バレ・安全規約', path: '/safety' },
  { id: 'faq', emoji: '❓', title: 'よくある質問FAQ', path: '/faq' },
  { id: 'blog', emoji: '📝', title: 'お仕事コラム', path: '/blog' }
];
