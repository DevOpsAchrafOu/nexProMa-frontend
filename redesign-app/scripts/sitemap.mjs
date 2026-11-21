// Writes ../docs/redesign/sitemap.xml after `ng build`: every page in EN and FR, with hreflang links.
// Submit https://…/redesign/sitemap.xml in Google Search Console.
import { readFileSync, writeFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../src/app/data/site-data.json', import.meta.url), 'utf8'));
const ts = readFileSync(new URL('../src/app/data/site-data.ts', import.meta.url), 'utf8');
const SITE = ts.match(/SITE_URL = '([^']+)'/)[1];

const info = readFileSync(new URL('../src/app/data/info-pages.ts', import.meta.url), 'utf8');
const INFO_KEYS = JSON.parse(info.match(/INFO_KEYS: InfoKey\[\] = (\[[^\]]+\])/)[1].replace(/'/g, '"'));

const url = (lang, path) => SITE + (lang === 'fr' ? 'fr/' : '') + path;
// The favorites page is personal (noindex), so it is not listed.
const paths = ['', ...data.products.map((p) => `p/${p.slug}/`), ...INFO_KEYS.map((k) => `info/${k}/`)];
const today = new Date().toISOString().slice(0, 10);

const entries = paths.flatMap((path) =>
  ['en', 'fr'].map((lang) => `  <url>
    <loc>${url(lang, path)}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${url('en', path)}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${url('fr', path)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', path)}"/>
  </url>`),
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
writeFileSync(new URL('../../docs/redesign/sitemap.xml', import.meta.url), xml);
console.log(`sitemap.xml: ${entries.length} URLs`);
