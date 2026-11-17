import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const envPath = path.join(root, '.env.local');

function loadEnv() {
  if (!fs.existsSync(envPath)) return {};
  return Object.fromEntries(
    fs
      .readFileSync(envPath, 'utf8')
      .split(/\r?\n/)
      .filter((line) => line.trim() && !line.trim().startsWith('#'))
      .map((line) => {
        const index = line.indexOf('=');
        return index === -1
          ? [line.trim(), '']
          : [line.slice(0, index).trim(), line.slice(index + 1).trim()];
      })
  );
}

const env = { ...loadEnv(), ...process.env };
const apiKey = env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY || env.VITE_GOOGLE_DRIVE_API_KEY || '';
const restUrl = env.UPSTASH_REDIS_REST_URL;
const restToken = env.UPSTASH_REDIS_REST_TOKEN;

if (!apiKey) throw new Error('Missing Google Drive API key in .env.local');
if (!restUrl || !restToken) throw new Error('Missing Upstash REST credentials in .env.local');

function idsFrom(source) {
  return [...source.matchAll(/id:\s*'([^']+)'/g)].map((match) => match[1]);
}

const ids = [
  ...new Set([
    ...idsFrom(fs.readFileSync(path.join(root, 'data', 'site.ts'), 'utf8')),
    ...idsFrom(fs.readFileSync(path.join(root, 'data', 'photos.ts'), 'utf8')),
  ]),
];

const cache = {
  generatedAt: new Date().toISOString(),
  files: Object.fromEntries(
    ids.map((id) => [id, `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${apiKey}`])
  ),
};

fs.writeFileSync(path.join(root, 'data', 'media-cache.json'), `${JSON.stringify(cache, null, 2)}\n`);

const response = await fetch(restUrl, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${restToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(['SET', 'portfolio:media', JSON.stringify(cache)]),
});

if (!response.ok) {
  throw new Error(`Upstash SET failed: ${response.status} ${await response.text()}`);
}

console.log(`Cached ${Object.keys(cache.files).length} direct Drive file URLs.`);
