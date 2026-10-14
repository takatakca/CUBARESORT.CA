import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { destinations, experiences, styles, catalogIsValid, imageUrl } from "../assets/catalog.js";
import { copy, hasAllKeys, translation } from "../assets/i18n.js";
import { SITE_CONFIG } from "../assets/config.js";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
test("destination IDs, translated data and experience relations are sound",()=>{
 assert.equal(catalogIsValid(),true);
 assert.equal(new Set(destinations.map(d=>d.id)).size,destinations.length);
 assert.equal(new Set(styles).size,styles.length);
 assert.ok(experiences.length>=6);
});
test("all three languages define the complete UI dictionary",()=>{
 assert.equal(hasAllKeys(),true);
 assert.deepEqual(Object.keys(copy).sort(),["en","es","fr"]);
 for(const lang of ["fr","en","es"]) {
  assert.ok(copy[lang].faq.length>=3);
  assert.equal(translation(lang,"searchTitle"),copy[lang].searchTitle);
  assert.match(copy[lang].inventoryNotice,/./);
 }
});
test("image URLs are HTTPS and only reference a known photo CDN",()=>{
 for(const d of destinations)assert.match(imageUrl(d.image),/^https:\/\/images\.unsplash\.com\/photo-/);
 for(const e of experiences)assert.match(imageUrl(e.image),/^https:\/\/images\.unsplash\.com\/photo-/);
});
test("this version must not accidentally activate a payment or booking integration",()=>{
 assert.equal(SITE_CONFIG.bookingProvider,null);
 assert.equal(SITE_CONFIG.analyticsEnabled,false);
});
test("root HTML has landmarks, accessible dialogs and no external application framework",async()=>{
 const html=await readFile(resolve(root,"index.html"),"utf8");
 for(const tag of ['<main id="main">','<nav class="desktop-nav"','<dialog id="inquiry-dialog"','<html lang="fr">','id="destination-filter"','id="experience-grid"'])assert.ok(html.includes(tag),tag);
 assert.ok(!html.includes("stripe.com"));
 assert.ok(!html.includes("book now"));
});
test("sitemap and robots point at a single canonical production URL",async()=>{
 const sitemap=await readFile(resolve(root,"sitemap.xml"),"utf8");
 const robots=await readFile(resolve(root,"robots.txt"),"utf8");
 assert.ok(sitemap.includes("https://cubaresort.ca/"));
 assert.ok(robots.includes("https://cubaresort.ca/sitemap.xml"));
});