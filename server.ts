/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import firebaseConfig from './firebase-applet-config.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Project-wide isolated configurations
export const FIRESTORE_DATABASE_ID = 'shinodayamashinchi';
export const GITHUB_REPO_URL = 'https://github.com/shinodayamashinchi/shinodayamashinchi-recruit.git';
export const GITHUB_REPO_WEB = 'https://github.com/shinodayamashinchi/shinodayamashinchi-recruit';

app.use(express.json());

// API: System Configuration & Isolation Status
app.get('/api/config', (_req, res) => {
  res.json({
    status: 'ok',
    siteName: '信太山新地求人ガイド',
    targetRegion: '大阪府和泉市（信太山新地）',
    databaseId: FIRESTORE_DATABASE_ID,
    githubRepoUrl: GITHUB_REPO_URL,
    features: {
      noStorefrontDisplay: true, // 店先顔見せなし
      businessType: '旅館', // 料亭ではなく旅館営業
      monthly20Holiday: true, // 毎月20日一斉定休日
      shortSessions: true // 最短15分短時間接客
    }
  });
});

// API: AI Column Generator specialized for 信太山新地
app.post('/api/generate-column', async (req, res) => {
  try {
    const { topic = '店先顔見せなしの安心ルール', category = 'safety' } = req.body;

    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        content: `【信太山新地求人公式解説】${topic}\n\n大阪府和泉市の信太山新地は、伝統ある旅館直営の営業形態です。\n他の新地と異なり、衣装を着て店先に座る必要は一切なく、旅館の個室や専用スタンドで落ち着いて待機できます。\n1回最短15分の短時間接客、お酒不要、毎月20日の一斉定休など、女性スタッフが安心の就労環境を完全サポートしています。`
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `あなたは「信太山新地求人公式サイト（信太山ガールズ）」の専任女性採用担当ライターです。
以下の前提条件とレギュレーションを【絶対遵守】して、求職中の女性（20代〜40代、未経験者多数）が安心して読めるコラム記事を作成してください。

【厳格なレギュレーション】
1. 対象地域：大阪府和泉市「信太山新地（しのだやま）」
2. 営業形態：料亭ではなく【旅館】営業です。
3. 最大の特徴：【店先での顔見せ（顔出し・上がり框に座る行為）は一切ありません】。個室や専用スタンド待機です。
4. 過去の他新地（飛田新地、松島新地、滝井新地等）の店舗名や独自ルール（料亭組合、青春通り、おばちゃん呼び込みなど）は絶対に出さず、信太山新地の正確な一次情報（仲居さんの客案内、全室シャワー完備、ゴム着用徹底、泥酔客拒否）で執筆してください。
5. 待遇：15分単位の明確な給料（15分3,800円〜）、時給1万円保証・日給保証、即日全額日払い現金手渡し。毎月20日の一斉定休日。

【記事テーマ】: ${topic}
【カテゴリ】: ${category}

【出力フォーマット】
- 魅力的なタイトル（35文字前後）
- 導入リード文
- 3つの見出し（H2）と解説
- まとめと公式LINE無料相談への誘導`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    const text = response.text || '';
    return res.json({ content: text });
  } catch (err: any) {
    console.error('Column generation error:', err);
    return res.status(500).json({ error: 'AI generation failed', message: err.message });
  }
});

// Setup Vite middlewares in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[Shinodayama Server] running on http://localhost:${PORT}`);
    console.log(`[Firestore Database] set to: ${FIRESTORE_DATABASE_ID}`);
    console.log(`[GitHub Sync Target] set to: ${GITHUB_REPO_URL}`);
  });
}

startServer();
