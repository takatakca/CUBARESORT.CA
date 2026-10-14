import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { destinations, experiences, styles, catalogIsValid, imageUrl } from "../assets/catalog.js";
import { hotelRegions, hotels, hotelsInRegion, searchHotels, regionLabel, hotelDirectoryIsValid } from "../assets/hotels.js";
import { copy, hasAllKeys, translation } from "../assets/i18n.js";
import { SITE_CONFIG } from "../assets/config.js";
import { formatTravelRequest } from "../assets/request.js";
import { createPreviewServer } from "../scripts/dev-server.mjs";
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
test("property directory is internally consistent and every region is translated",()=>{
 assert.equal(hotelDirectoryIsValid(),true);
 assert.equal(new Set(hotels.map(h=>h.id)).size,hotels.length);
 assert.equal(new Set(hotelRegions.map(r=>r.id)).size,hotelRegions.length);
 assert.ok(hotels.length>=148,"directory must carry at least the 148 properties recovered from the project archive");
 for(const r of hotelRegions){
  assert.equal(r.count,hotelsInRegion(r.id).length);
  for(const lang of ["fr","en","es"])assert.match(regionLabel(r.id,lang),/\S/);
 }
});
test("property directory carries no rate, availability or ranking claim",()=>{
 const banned=["price","rate","cad","usd","star","rating","review","available","rooms","promo","deal","discount"];
 for(const h of hotels){
  const fields=Object.keys(h);
  assert.deepEqual(fields.sort(),["airport","confirmed","id","name","region"],"unexpected field on "+h.id);
  for(const key of fields)assert.ok(!banned.includes(key.toLowerCase()),"banned field "+key);
 }
});
test("directory search filters by region and matches accent-insensitively",()=>{
 const varadero=hotelsInRegion("varadero");
 assert.ok(varadero.length>0);
 assert.ok(varadero.every(h=>h.region==="varadero"));
 assert.equal(hotelsInRegion("all").length,hotels.length);
 const sample=hotels.find(h=>/[áéíóúñ]/i.test(h.name))||hotels[0];
 assert.ok(searchHotels(sample.name,"all").some(h=>h.id===sample.id));
 assert.equal(searchHotels("zzzzz-no-such-hotel","all").length,0);
});
test("directory state is deep-linkable through the URL",async()=>{
 const app=await readFile(resolve(root,"assets/app.js"),"utf8");
 for(const token of ['params.get("region")','params.get("hq")','url.searchParams.set("region"','url.searchParams.set("hq"'])assert.ok(app.includes(token),token);
 // every region id must survive a round trip through a URL query string
 for(const r of hotelRegions)assert.equal(new URLSearchParams("region="+encodeURIComponent(r.id)).get("region"),r.id);
});
test("every editorial destination is also a directory region, so cards never dead-end",()=>{
 const regions=new Set(hotelRegions.map(r=>r.id));
 for(const d of destinations)assert.ok(regions.has(d.id),"no properties listed for destination "+d.id);
 // and the directory reaches regions the editorial catalogue does not cover yet
 assert.ok(hotelRegions.length>destinations.length);
});
test("no low-contrast colour from the pre-audit palette comes back",async()=>{
 const css=await readFile(resolve(root,"assets/styles.css"),"utf8");
 // Each of these failed WCAG 2 AA at the size and background it was used on.
 // Verified with axe-core in Chromium on 2026-10-14; see docs/AGENT_HANDOFF.md.
 const retired=["#b35f50","#7d8a87","#8a6a2f","#6a7c79","#79908a","#cc765f","#748380",
  "#88908b","#d46f59","#d17b64","#899693","#71807e","#66807c","#7f8a83","#788784",
  "#8f9994","#76827e","#cf725e","#e7e0c9","#71817b","#ee755e","#677b76","#a9624f",
  "#6a7875","#b05c4a","#6a736d","#697774"];
 for(const colour of retired)assert.ok(!css.toLowerCase().includes(colour),"retired low-contrast colour "+colour+" is back in styles.css");
});
test("sitemap and robots point at a single canonical production URL",async()=>{
 const sitemap=await readFile(resolve(root,"sitemap.xml"),"utf8");
 const robots=await readFile(resolve(root,"robots.txt"),"utf8");
 assert.ok(sitemap.includes("https://cubaresort.ca/"));
 assert.ok(robots.includes("https://cubaresort.ca/sitemap.xml"));
});

test("a property-specific inquiry draft preserves the exact selected property, not just its region",()=>{
 const h=hotels[0];
 const draft=formatTravelRequest({lang:"fr",destination:h.region,hotelId:h.id,travelers:2,duration:"7"});
 assert.ok(draft.includes(h.name), "the selected property name must survive in the draft");
 assert.ok(draft.includes(translation("fr","formHotel")));
 assert.ok(draft.includes(translation("fr","dialogIntro")));
 const generic=formatTravelRequest({lang:"fr",destination:h.region});
 assert.ok(!generic.includes(translation("fr","formHotel")), "generic inquiries must not retain a previous property");
 assert.equal(formatTravelRequest({lang:"fr",destination:"all",hotelId:h.id}),null);
 assert.equal(formatTravelRequest({lang:"fr",destination:h.region,hotelId:"not-a-real-hotel"}),null);
 for(const lang of ["en","es"])assert.ok(formatTravelRequest({lang,destination:h.region,hotelId:h.id}).includes(h.name));
 assert.equal(formatTravelRequest({destination:h.region,travelers:0}),null);
 assert.equal(formatTravelRequest({destination:h.region,month:"2026-99"}),null);
});

test("preview HTTP server exposes only the production static allowlist",async(t)=>{
 const server=createPreviewServer();
 await new Promise((resolve,reject)=>{
  server.once("error",reject);
  server.listen(0,"127.0.0.1",resolve);
 });
 t.after(()=>new Promise(resolve=>server.close(resolve)));
 const base="http://127.0.0.1:"+server.address().port;
 for(const path of ["/","/index.html","/assets/app.js","/assets/request.js","/assets/styles.css","/robots.txt"]){
  const response=await fetch(base+path);
  assert.equal(response.status,200,path);
 }
 for(const path of ["/.env","/.git/config","/README.md","/package.json","/docs/AGENT_HANDOFF.md","/scripts/dev-server.mjs","/assets/.env","/assets/../README.md","/tests/site.test.mjs"]){
  const response=await fetch(base+path);
  assert.equal(response.status,403,path);
 }
 const head=await fetch(base+"/assets/app.js",{method:"HEAD"});
 assert.equal(head.status,200);
 assert.equal(await head.text(),"");
 const post=await fetch(base+"/assets/app.js",{method:"POST"});
 assert.equal(post.status,405);
});

test("mobile menu can be dismissed by Escape and closes at desktop width",async()=>{
 const app=await readFile(resolve(root,"assets/app.js"),"utf8");
 assert.ok(app.includes('e.key==="Escape" && !$("#mobile-menu").hidden'));
 assert.ok(app.includes('$("#menu-toggle").focus()'));
 assert.ok(app.includes('matchMedia("(min-width: 801px)")'));
});
