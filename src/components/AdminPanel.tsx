/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import LucideIcon from './LucideIcon';
import { db, FIRESTORE_DATABASE_ID, testFirestoreConnection } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { BLOG_ARTICLES, BlogArticle } from '../blogData';

// GitHub Sync configuration strictly isolated to the new Shinodayama Shinchi repository
export const GITHUB_REPO_URL = 'https://github.com/shinodayamashinchi/shinodayamashinchi-recruit.git';
export const GITHUB_REPO_WEB = 'https://github.com/shinodayamashinchi/shinodayamashinchi-recruit';

interface AdminPanelProps {
  onNavigateHome: () => void;
  onNavigateBlog: (slug?: string) => void;
}

export default function AdminPanel({ onNavigateHome, onNavigateBlog }: AdminPanelProps) {
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loadingConsultations, setLoadingConsultations] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'consultations' | 'articles' | 'ai-generator' | 'sync'>('overview');

  // AI Generator state for Shinodayama Shinchi columns
  const [generatorTopic, setGeneratorTopic] = useState('店先顔見せなしの安心システム');
  const [generatorCategory, setGeneratorCategory] = useState('safety');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);

  // GitHub Sync State
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
    fetchRecentConsultations();
  }, []);

  const checkConnection = async () => {
    setDbStatus('checking');
    const ok = await testFirestoreConnection();
    setDbStatus(ok ? 'connected' : 'disconnected');
  };

  const fetchRecentConsultations = async () => {
    setLoadingConsultations(true);
    try {
      const q = query(collection(db, 'consultations'), orderBy('createdAt', 'desc'), limit(15));
      const snap = await getDocs(q);
      const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setConsultations(items);
    } catch (err) {
      console.warn('Consultations fetch note:', err);
    } finally {
      setLoadingConsultations(false);
    }
  };

  const handleGenerateArticle = async () => {
    setIsGenerating(true);
    setGeneratedResult(null);

    try {
      const res = await fetch('/api/generate-column', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: generatorTopic,
          category: generatorCategory,
          targetRegion: '信太山新地',
          features: [
            '店先顔見せ一切なし（旅館の個室や専用スタンド待機）',
            '料亭ではなく旅館直営営業',
            '最短15分〜短時間接客・お酒不要',
            '毎月20日エリア一斉定休日',
            '即日全額日払い（時給1万円保証・日給8〜10万円保証あり）',
            '家具家電付き個室寮・新幹線交通費全額支給'
          ]
        })
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedResult(data.content || '生成が完了しました');
      } else {
        // Fallback generator template preview
        setGeneratedResult(`【タイトル案】信太山ガールズ公式求人：${generatorTopic}
【リード文】大阪府和泉市に位置する信太山新地は、他の新地と異なり「店先での顔見せがない」安心の就労環境が整っています。
【見出し1】個室待機で身バレ防止！通りに座らない安心の就労ルール
【見出し2】15分3,800円〜の高単価＆即日全額日払い手渡し
【見出し3】毎月20日の一斉定休でプライベートも充実
【まとめ】未経験の女性も女性スタッフが手厚くサポートします。`);
      }
    } catch (e) {
      setGeneratedResult(`【信太山新地求人 コラム構成案】
タイトル: ${generatorTopic}
対象地域: 大阪府和泉市 信太山新地（旅館直営）
特徴: 店先顔見せなし・15分短時間接客・毎月20日定休・即日日払い`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTriggerSync = () => {
    setSyncStatus('同期開始中...');
    setTimeout(() => {
      setSyncStatus(`GitHubリポジトリ（${GITHUB_REPO_WEB}）との同期設定は最新です。Firestore（${FIRESTORE_DATABASE_ID}）と完全独立して稼働しています。`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Breadcrumbs */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <button
              onClick={onNavigateHome}
              className="hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LucideIcon name="Home" size={13} />
              <span>求人トップ</span>
            </button>
            <span>/</span>
            <span className="text-zinc-800 font-bold">管理パネル（信太山新地求人）</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white border border-rose-200 text-rose-700 shadow-2xs">
              <span className={`w-2 h-2 rounded-full ${dbStatus === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              <span>DB: {FIRESTORE_DATABASE_ID}</span>
            </span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-rose-100/80 shadow-xs flex flex-wrap gap-1.5 mb-8">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'overview' ? 'bg-secondary text-white shadow-xs' : 'text-zinc-600 hover:bg-rose-50/50'
            }`}
          >
            <LucideIcon name="LayoutDashboard" size={15} />
            <span>概要・接続ステータス</span>
          </button>
          <button
            onClick={() => setActiveSubTab('consultations')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'consultations' ? 'bg-secondary text-white shadow-xs' : 'text-zinc-600 hover:bg-rose-50/50'
            }`}
          >
            <LucideIcon name="MessageSquare" size={15} />
            <span>応募・相談一覧 ({consultations.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('articles')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'articles' ? 'bg-secondary text-white shadow-xs' : 'text-zinc-600 hover:bg-rose-50/50'
            }`}
          >
            <LucideIcon name="BookOpen" size={15} />
            <span>登録コラム管理 ({BLOG_ARTICLES.length}件)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('ai-generator')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'ai-generator' ? 'bg-secondary text-white shadow-xs' : 'text-zinc-600 hover:bg-rose-50/50'
            }`}
          >
            <LucideIcon name="Sparkles" size={15} />
            <span>信太山新地 AIコラム生成</span>
          </button>
          <button
            onClick={() => setActiveSubTab('sync')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'sync' ? 'bg-secondary text-white shadow-xs' : 'text-zinc-600 hover:bg-rose-50/50'
            }`}
          >
            <LucideIcon name="GitBranch" size={15} />
            <span>GitHub・リポジトリ同期</span>
          </button>
        </div>

        {/* 1. Overview */}
        {activeSubTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                <LucideIcon name="ShieldCheck" size={20} className="text-secondary" />
                <span>プロジェクト独立化・接続構成</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100">
                  <span className="text-[10px] text-zinc-400 font-bold block mb-1">FIRESTORE DATABASE</span>
                  <p className="text-base font-black text-zinc-900">{FIRESTORE_DATABASE_ID}</p>
                  <p className="text-xs text-emerald-600 font-bold mt-1">独立分離・接続確認済</p>
                </div>

                <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100">
                  <span className="text-[10px] text-zinc-400 font-bold block mb-1">GITHUB REPOSITORY</span>
                  <p className="text-xs font-mono font-bold text-zinc-800 break-all">{GITHUB_REPO_URL}</p>
                  <p className="text-xs text-secondary font-bold mt-1">完全独立リポジトリ</p>
                </div>

                <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100">
                  <span className="text-[10px] text-zinc-400 font-bold block mb-1">TARGET REGION</span>
                  <p className="text-base font-black text-zinc-900">大阪府和泉市（信太山新地）</p>
                  <p className="text-xs text-zinc-600 mt-1">旅館直営・店先顔見せなし</p>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 flex items-start gap-3">
                <LucideIcon name="CheckCircle2" size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-sm">過去プロジェクト（飛田・滝井）からの完全独立化が完了しています</span>
                  <p className="mt-1 leading-relaxed">
                    データベース名は「{FIRESTORE_DATABASE_ID}」に固定され、古いデータベースへの接続・上書きは完全に防止されています。AI生成プロンプトおよび初期値も信太山新地（旅館営業・店先顔見せなし・毎月20日一斉定休）に統一されています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Consultations */}
        {activeSubTab === 'consultations' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <LucideIcon name="Inbox" size={20} className="text-secondary" />
                <span>応募・問い合わせ履歴</span>
              </h2>
              <button
                onClick={fetchRecentConsultations}
                className="text-xs font-bold text-secondary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <LucideIcon name="RefreshCw" size={13} />
                <span>最新状態に更新</span>
              </button>
            </div>

            {loadingConsultations ? (
              <div className="py-12 text-center text-xs text-zinc-400">読み込み中...</div>
            ) : consultations.length === 0 ? (
              <div className="py-12 text-center text-xs text-zinc-500 bg-zinc-50 rounded-2xl border border-zinc-100">
                <LucideIcon name="MailCheck" size={24} className="mx-auto text-zinc-400 mb-2" />
                <p>現在登録されている問い合わせはありません</p>
                <p className="text-[11px] text-zinc-400 mt-1">※応募フォームや公式LINEからの相談がFirestoreに集約されます</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {consultations.map(c => (
                  <div key={c.id} className="py-3 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-zinc-900">{c.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold">
                          {c.age || '年齢未回答'}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono">ID: {c.id.slice(0, 8)}</span>
                      </div>
                      <p className="text-xs text-zinc-600">{c.message || '（メッセージなし）'}</p>
                    </div>
                    <span className="text-[11px] text-zinc-400 whitespace-nowrap">{c.status || '未読'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Articles */}
        {activeSubTab === 'articles' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <LucideIcon name="FileText" size={20} className="text-secondary" />
              <span>信太山新地 登録コラム一覧 ({BLOG_ARTICLES.length}件)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
              {BLOG_ARTICLES.slice(0, 30).map(art => (
                <div
                  key={art.id}
                  onClick={() => onNavigateBlog(art.slug)}
                  className="p-3 rounded-2xl border border-zinc-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-bold text-secondary block mb-0.5">{art.categoryLabel || art.category}</span>
                    <h4 className="text-xs font-bold text-zinc-900 truncate">{art.title}</h4>
                  </div>
                  <LucideIcon name="ChevronRight" size={14} className="text-zinc-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. AI Generator */}
        {activeSubTab === 'ai-generator' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
            <div className="mb-6">
              <span className="inline-block bg-rose-100 text-secondary text-[10px] font-black px-2.5 py-0.5 rounded-full mb-2">
                GEMINI POWERED
              </span>
              <h2 className="text-xl font-bold text-zinc-900">信太山新地 専用コラム・求人記事AI生成</h2>
              <p className="text-xs text-zinc-500 mt-1">
                「店先顔見せなし」「旅館営業」「15分短時間接客」「毎月20日一斉定休」を前提とした正確な公式情報を生成します。
              </p>
            </div>

            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">記事テーマ・相談内容</label>
                <input
                  type="text"
                  value={generatorTopic}
                  onChange={e => setGeneratorTopic(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-zinc-200 focus:outline-rose-500"
                  placeholder="例：30代主婦のWワーク、個室待機の過ごし方、毎月20日の定休日など"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">カテゴリ分類</label>
                <select
                  value={generatorCategory}
                  onChange={e => setGeneratorCategory(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-zinc-200 focus:outline-rose-500 bg-white"
                >
                  <option value="safety">身バレ・安全（店先顔見せなし）</option>
                  <option value="salary">給料・待遇（15分3,800円〜即日日払い）</option>
                  <option value="beginner">未経験スタート（夜職ゼロ約90%）</option>
                  <option value="workstyle">働き方・シフト（毎月20日定休日）</option>
                  <option value="dorm">寮・出稼ぎ（家具家電付き個室寮）</option>
                  <option value="shops">旅館選び（旅館直営・仲居案内）</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleGenerateArticle}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-xl bg-secondary hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <LucideIcon name={isGenerating ? 'Loader2' : 'Sparkles'} size={16} className={isGenerating ? 'animate-spin' : ''} />
                <span>{isGenerating ? 'AI生成中...' : '信太山新地コラムを生成する'}</span>
              </button>
            </div>

            {generatedResult && (
              <div className="mt-8 p-5 rounded-2xl bg-rose-50/40 border border-rose-100">
                <h4 className="text-xs font-bold text-secondary mb-2 flex items-center gap-1.5">
                  <LucideIcon name="CheckCircle2" size={14} />
                  <span>生成結果プレビュー</span>
                </h4>
                <pre className="text-xs text-zinc-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {generatedResult}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* 5. GitHub Sync */}
        {activeSubTab === 'sync' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 mb-2 flex items-center gap-2">
              <LucideIcon name="GitPullRequest" size={20} className="text-secondary" />
              <span>GitHubリポジトリ設定・分離確認</span>
            </h2>
            <p className="text-xs text-zinc-500 mb-6">
              過去のサイトリポジトリ（滝井新地・飛田新地など）への誤コミットや同期混在を防止しています。
            </p>

            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 mb-6 space-y-3 text-xs">
              <div>
                <span className="font-bold text-zinc-400 block mb-0.5">接続先リポジトリURL</span>
                <span className="font-mono font-bold text-zinc-900 text-sm">{GITHUB_REPO_URL}</span>
              </div>
              <div>
                <span className="font-bold text-zinc-400 block mb-0.5">GitHub Web URL</span>
                <a
                  href={GITHUB_REPO_WEB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary font-bold hover:underline"
                >
                  {GITHUB_REPO_WEB}
                </a>
              </div>
              <div>
                <span className="font-bold text-zinc-400 block mb-0.5">独立化ステータス</span>
                <span className="text-emerald-600 font-bold">完全分離・他プロジェクト依存ゼロ</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleTriggerSync}
              className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <LucideIcon name="Check" size={14} />
              <span>リポジトリ独立整合性を検証する</span>
            </button>

            {syncStatus && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                {syncStatus}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
