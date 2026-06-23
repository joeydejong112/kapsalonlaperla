/**
 * One-shot scraper: downloads placeholder photos from a demo source URL.
 * site into public/images/ and writes lib/salon-images.json as a manifest.
 *
 * Usage: node scripts/fetch-images.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://example.com/";
const OUT_DIR = path.join(process.cwd(), "public", "images");
const MANIFEST_PATH = path.join(process.cwd(), "lib", "salon-images.json");
const MAX_PAGES = 12;
const FETCH_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
};
const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|gif|avif)(\?|$)/i;

async function getHtml(url) {
  try {
    const res = await fetch(url, { headers: FETCH_HEADERS, redirect: "follow" });
    if (!res.ok) return null;
    const type = res.headers.get("content-type") ?? "";
    if (!type.includes("text/html")) return null;
    return await res.text();
  } catch (error) {
    console.warn(`! Failed to fetch page ${url}: ${error.message}`);
    return null;
  }
}

function extractImageUrls(html, pageUrl) {
  const urls = new Set();
  const patterns = [
    /<img[^>]+src=["']([^"']+)["']/gi,
    /<img[^>]+data-src=["']([^"']+)["']/gi,
    /srcset=["']([^"']+)["']/gi,
    /background(?:-image)?\s*:\s*url\(["']?([^"')]+)["']?\)/gi,
  ];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      // srcset can contain multiple candidates — take each URL part
      const candidates = match[1].split(",").map((part) => part.trim().split(/\s+/)[0]);
      for (const candidate of candidates) {
        try {
          const absolute = new URL(candidate, pageUrl).href;
          if (IMAGE_EXTENSIONS.test(absolute)) urls.add(absolute);
        } catch {
          /* ignore malformed URLs */
        }
      }
    }
  }
  return urls;
}

function extractInternalLinks(html, pageUrl) {
  const links = new Set();
  for (const match of html.matchAll(/<a[^>]+href=["']([^"'#]+)["']/gi)) {
    try {
      const absolute = new URL(match[1], pageUrl);
      if (absolute.origin === new URL(BASE_URL).origin) {
        absolute.search = "";
        links.add(absolute.href);
      }
    } catch {
      /* ignore malformed URLs */
    }
  }
  return links;
}

function fileNameFor(url, index) {
  const pathname = new URL(url).pathname;
  const base = path.basename(pathname).replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
  return `${String(index + 1).padStart(2, "0")}-${base}`;
}

async function main() {
  console.log(`Scraping ${BASE_URL} ...`);
  const visited = new Set();
  const queue = [BASE_URL];
  const imageUrls = new Set();

  while (queue.length > 0 && visited.size < MAX_PAGES) {
    const pageUrl = queue.shift();
    if (visited.has(pageUrl)) continue;
    visited.add(pageUrl);

    const html = await getHtml(pageUrl);
    if (!html) continue;
    console.log(`  page: ${pageUrl}`);

    for (const url of extractImageUrls(html, pageUrl)) imageUrls.add(url);
    for (const link of extractInternalLinks(html, pageUrl)) {
      if (!visited.has(link)) queue.push(link);
    }
  }

  if (imageUrls.size === 0) {
    console.error("No images found — the site structure may have changed.");
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const manifest = [];
  let index = 0;

  for (const url of imageUrls) {
    try {
      const res = await fetch(url, { headers: FETCH_HEADERS });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.length < 4096) continue; // skip tracking pixels / tiny icons

      const file = fileNameFor(url, index);
      await writeFile(path.join(OUT_DIR, file), buffer);
      manifest.push({ file: `/images/${file}`, sourceUrl: url, bytes: buffer.length });
      console.log(`  saved: ${file} (${Math.round(buffer.length / 1024)} kB)`);
      index += 1;
    } catch (error) {
      console.warn(`! Failed to download ${url}: ${error.message}`);
    }
  }

  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\nDone: ${manifest.length} images in public/images, manifest in lib/salon-images.json`);
}

await main();
