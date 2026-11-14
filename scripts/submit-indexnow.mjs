import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const HOST = 'osaka-shinodayamashinchi-recruit.com';
const INDEXNOW_KEY = '8f3c9a2e4b1d7065c8e2a1f49d3b7e62';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const SITEMAP_PATH = path.join(rootDir, 'public', 'sitemap.xml');

async function main() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error('[indexnow] public/sitemap.xml not found. Run generate-sitemap first.');
    process.exit(1);
  }

  const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const urlMatches = [...xml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map((m) => m[1]);
  const uniqueUrls = [...new Set(urlMatches)];

  if (uniqueUrls.length === 0) {
    console.error('[indexnow] No URLs found in sitemap.xml.');
    process.exit(1);
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: uniqueUrls
  };

  console.log(`[indexnow] Submitting ${uniqueUrls.length} URLs to IndexNow...`);

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  });

  const bodyText = await response.text().catch(() => '');
  console.log(`[indexnow] Response status: ${response.status} ${response.statusText}${bodyText ? ` | Body: ${bodyText}` : ''}`);
  if (!response.ok) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('[indexnow] Failed:', err);
  process.exit(1);
});
