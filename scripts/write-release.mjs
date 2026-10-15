// Moves the Next.js export into dist/ and writes dist/release.json.
//
// dist/ is what deploy/coolify/Dockerfile.coolify copies into Nginx and what
// the Pages workflow uploads, so the Next.js export has to land there rather
// than in Next's default out/.
//
// release.json carries the source commit plus a SHA-256 of every first-party
// file the verifier will re-fetch over HTTPS. The digest list is derived from
// the real build: Next.js names its chunks by content hash, so a hardcoded
// list would rot on the next build.
import { createHash } from "node:crypto";
import { access, cp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const root = process.cwd();
const out = resolve(root, "out");
const dist = resolve(root, "dist");

await access(out); // fail loudly if the export did not run
await rm(dist, { recursive: true, force: true });
await cp(out, dist, { recursive: true });
await rm(out, { recursive: true, force: true });

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(full)));
    else found.push(full);
  }
  return found;
}

// Verify the entry document, the crawler files, and the JS/CSS the page loads.
// Images and fonts are excluded: they are large and not integrity-critical.
const all = await walk(dist);
const files = all
  .map((file) => relative(dist, file).split("\\").join("/"))
  .filter(
    (file) =>
      file === "index.html" ||
      file === "robots.txt" ||
      file === "sitemap.xml" ||
      (file.startsWith("_next/static/") && /\.(js|css)$/.test(file)),
  )
  .sort();

if (!files.includes("index.html")) throw new Error("dist/index.html is missing");
if (!files.some((file) => file.endsWith(".js"))) throw new Error("dist/ contains no JavaScript bundle");

const assets = {};
for (const file of files) {
  assets[file] = createHash("sha256").update(await readFile(resolve(dist, file))).digest("hex");
}

const sha = process.env.RELEASE_SHA ?? process.env.SOURCE_COMMIT ?? process.env.GITHUB_SHA ?? "local";
await writeFile(
  resolve(dist, "release.json"),
  JSON.stringify({ app: "cubaresort", sha, builtAt: new Date().toISOString(), assets }, null, 2) + "\n",
);
// Pages would otherwise strip /_next/ as a Jekyll underscore directory.
await writeFile(resolve(dist, ".nojekyll"), "");
console.log(`dist/ ready for ${sha}: ${files.length} verified files`);
