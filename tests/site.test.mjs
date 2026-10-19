import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { destinations, experiences, styles, catalogIsValid, imageUrl } from "../assets/catalog.js";
import { hotelRegions, hotels, hotelsInRegion, searchHotels, regionLabel, hotelDirectoryIsValid } from "../assets/hotels.js";
import { copy, hasAllKeys, namedTranslation, translation } from "../assets/i18n.js";
import { SITE_CONFIG } from "../assets/config.js";
import { formatTravelRequest, selectedHotelContext } from "../assets/request.js";
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
test("repeated card actions have item-specific accessible names in every language",async()=>{
 const item="Sample Resort";
 for(const lang of ["fr","en","es"]){
  for(const key of ["favoriteFor","unfavoriteFor","inquiryFor","hotelsAskFor"]){
   const label=namedTranslation(lang,key,item);
   assert.ok(label.includes(item),`${lang}.${key} must identify its card`);
   assert.ok(!label.includes("{name}"),`${lang}.${key} placeholder must be resolved`);
  }
 }
 const app=await readFile(resolve(root,"assets/app.js"),"utf8");
 assert.ok(app.includes('namedTr(favourite?"unfavoriteFor":"favoriteFor",e.name[state.lang])'));
 assert.ok(app.includes('namedTr("inquiryFor",e.name[state.lang])'));
 assert.ok(app.includes('namedTr("hotelsAskFor",h.name)'));
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
 for(const tag of ['<main id="main" tabindex="-1">','<nav class="desktop-nav"','<dialog id="inquiry-dialog"','<html lang="fr">','id="destination-filter"','id="experience-grid"'])assert.ok(html.includes(tag),tag);
 assert.ok(!html.includes("stripe.com"));
 assert.ok(!html.includes("book now"));
});
test("skip link moves keyboard focus into main content",async()=>{
 const html=await readFile(resolve(root,"index.html"),"utf8");
 assert.match(html,/<a class="skip-link" href="#main"[^>]*>/);
 assert.match(html,/<main id="main" tabindex="-1">/);
});
test("static and container delivery enforce a strict browser security policy",async()=>{
 const [html,css,nginx]=await Promise.all([
  readFile(resolve(root,"index.html"),"utf8"),
  readFile(resolve(root,"assets/styles.css"),"utf8"),
  readFile(resolve(root,"deploy/coolify/nginx.conf"),"utf8")
 ]);
 assert.match(html,/http-equiv="Content-Security-Policy"/);
 for(const directive of ["default-src 'self'","script-src 'self'","style-src 'self'","object-src 'none'","base-uri 'self'","form-action 'self'"]){
  assert.ok(html.includes(directive),directive);
 }
 assert.ok(!html.includes("style="),"inline style attributes would require unsafe-inline");
 assert.match(css,/\.noscript-message\{padding:2rem;text-align:center\}/);
 assert.match(nginx,/add_header X-Frame-Options DENY always;/);
 assert.match(nginx,/add_header Permissions-Policy "camera=\(\), geolocation=\(\), microphone=\(\), payment=\(\)" always;/);
 assert.ok(nginx.includes("frame-ancestors 'none'"));
 assert.ok(!nginx.includes("'unsafe-inline'"));
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

test("request draft rejects past months and preserves current/future dates in every locale",()=>{
 const fixedToday=new Date(2026,9,16,12);
 for(const lang of ["fr","en","es"]){
  const opts={lang,destination:"varadero"};
  assert.equal(formatTravelRequest({...opts,month:"2026-09"},fixedToday),null);
  assert.equal(formatTravelRequest({...opts,month:"2025-12"},fixedToday),null);
  assert.ok(formatTravelRequest({...opts,month:"2026-10"},fixedToday)?.includes("2026-10"));
  assert.ok(formatTravelRequest({...opts,month:"2027-01"},fixedToday)?.includes("2027-01"));
  assert.ok(formatTravelRequest({...opts,month:""},fixedToday));
 }
 const ui=readFile(resolve(root,"assets/app.js"),"utf8");
 return ui.then(source=>{
  assert.ok(source.includes('departure.min=month'));
  assert.ok(source.includes('if(departure.value && departure.value<month)departure.value=""'));
 });
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

test("mobile menu closes without stranding keyboard focus",async()=>{
 const [app,i18n]=await Promise.all([
  readFile(resolve(root,"assets/app.js"),"utf8"),
  readFile(resolve(root,"assets/i18n.js"),"utf8")
 ]);
 assert.ok(app.includes('e.key==="Escape" && !$("#mobile-menu").hidden'));
 assert.ok(app.includes('$("#menu-toggle").focus()'));
 assert.ok(app.includes('matchMedia("(min-width: 801px)")'));
 assert.ok(app.includes('if(e.matches)closeMobileAtDesktopWidth()'));
 assert.ok(app.includes('menu.contains(active)'));
 assert.ok(app.includes('(desktopPeer||$(".brand")).focus({preventScroll:true})'));
 assert.ok(app.includes('requestAnimationFrame(()=>focusMobileNavigationTarget(link))'));
 assert.ok(app.includes('target?.querySelector("h1,h2,h3")||target'));
 assert.ok(app.includes('focusTarget.focus({preventScroll:true})'));
 assert.ok(app.includes('tr(open?"menuCloseLabel":"menuOpenLabel")'));
 assert.ok(app.includes('updateMobileMenuState(!$("#mobile-menu").hidden)'));
 assert.ok(app.includes('updateMobileMenuState($("#mobile-menu").hidden)'));
 for(const label of ["Ouvrir le menu","Fermer le menu","Open menu","Close menu","Abrir menú","Cerrar menú"]){
  assert.ok(i18n.includes(label),"missing translated mobile-menu action: "+label);
 }
});

test("required English agent continuity files exist",async()=>{
 const paths=["AGENTS.md","docs/PROJECT_STATUS.md","docs/TASK_QUEUE.md","docs/AGENT_HANDOFF.md","docs/DEPLOYMENT.md","docs/DECISIONS.md"];
 for(const path of paths){
  const content=await readFile(resolve(root,path),"utf8");
  assert.ok(content.length>250,"continuity document is empty: "+path);
 }
});

test("keyboard focus is restored after replacing region chips and favourite cards",async()=>{
 const app=await readFile(resolve(root,"assets/app.js"),"utf8");
 assert.ok(app.includes('wrap.contains(document.activeElement) ? document.activeElement.dataset.region : null'));
 assert.ok(app.includes('chip.dataset.region===focusedRegion)?.focus({preventScroll:true})'));
 assert.ok(app.includes('button.dataset.favorite===id)?.focus({preventScroll:true})'));
});

test("clearing an empty result keeps keyboard focus on a visible control",async()=>{
 const app=await readFile(resolve(root,"assets/app.js"),"utf8");
 assert.ok(app.includes('$("#empty-reset").addEventListener("click",resetFromEmptyState)'));
 assert.ok(app.includes('$("#text-search").focus({preventScroll:true})'));
 assert.ok(app.includes('$("#hotel-empty-reset").addEventListener("click",resetHotelsFromEmptyState)'));
 assert.ok(app.includes('$("#hotel-search").focus({preventScroll:true})'));
});

test("modal dialogs have accessible names and keep keyboard focus inside",async()=>{
 const [html,app]=await Promise.all([
  readFile(resolve(root,"index.html"),"utf8"),
  readFile(resolve(root,"assets/app.js"),"utf8")
 ]);
 assert.ok(html.includes('id="inquiry-dialog" class="modal" aria-labelledby="inquiry-dialog-title"'));
 assert.ok(html.includes('id="inquiry-dialog-title" data-i18n="dialogTitle"'));
 assert.ok(html.includes('id="legal-dialog" class="modal legal-modal" aria-labelledby="legal-heading"'));
 assert.ok(app.includes('function keepFocusInsideDialog(dialog,event)'));
 assert.ok(app.includes('active===first'));
 assert.ok(app.includes('active===last'));
 assert.ok(app.includes('dialog.addEventListener("keydown",event=>keepFocusInsideDialog(dialog,event))'));
});

test("explicit accessible names follow the selected language",async()=>{
 const [html,app]=await Promise.all([
  readFile(resolve(root,"index.html"),"utf8"),
  readFile(resolve(root,"assets/app.js"),"utf8")
 ]);
 const keys=["brandLabel","primaryNavLabel","mobileNavLabel","searchSectionLabel","heroImageLabel","editorialImageLabel","sortLabel","hotelsRegionLabel"];
 for(const key of keys){
  assert.ok(html.includes(`data-i18n-aria-label="${key}"`),`missing translated aria-label binding: ${key}`);
  for(const lang of ["fr","en","es"])assert.match(translation(lang,key),/\S/,`${lang}.${key}`);
 }
 assert.ok(app.includes('$$("[data-i18n-aria-label]")'));
 assert.ok(app.includes('setAttribute("aria-label",tr(node.dataset.i18nAriaLabel))'));
 assert.notEqual(copy.fr.sortLabel,copy.en.sortLabel);
 assert.notEqual(copy.fr.hotelsRegionLabel,copy.es.hotelsRegionLabel);
});

test("both destination-card and search-filter navigation respect reduced motion",async()=>{
 const app=await readFile(resolve(root,"assets/app.js"),"utf8");
 assert.match(app,/function scrollToExperiences\(\)/);
 assert.ok(app.includes('window.matchMedia("(prefers-reduced-motion: reduce)").matches'));
 assert.ok(app.includes('scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"})'));
 assert.equal(app.split(' scrollToExperiences();').length-1,2,"both navigation paths must use the preference-aware helper");
 assert.ok(!app.includes('scrollIntoView({behavior:"smooth",block:"start"})'),"unconditional smooth scrolling must not return");
});

test("keyboard focus on stay search remains visible after removing the input outline",async()=>{
 const css=await readFile(resolve(root,"assets/styles.css"),"utf8");
 assert.ok(css.includes(".text-search input{border:0;outline:0;"),"input removes its own outline");
 assert.ok(css.includes(".text-search:focus-within{outline:3px solid #a44f3f;outline-offset:3px}"),"search container must show a visible high-contrast ring when the input has focus");
});

test("selected hotel summary identifies the chosen directory property in all languages",async()=>{
 const hotel=hotels[0];
 for(const lang of ["fr","en","es"]){
  const label=selectedHotelContext(lang,hotel.id);
  assert.equal(label,translation(lang,"formHotel")+": "+hotel.name);
 }
 assert.equal(selectedHotelContext("fr","missing-hotel"),"");
 assert.equal(selectedHotelContext("unlisted",hotel.id),"");
 assert.equal(selectedHotelContext("fr",null),"");
 const [html,app,css]=await Promise.all([
  readFile(resolve(root,"index.html"),"utf8"),
  readFile(resolve(root,"assets/app.js"),"utf8"),
  readFile(resolve(root,"assets/styles.css"),"utf8")
 ]);
 assert.ok(html.includes('id="inquiry-hotel-context"'));
 assert.ok(html.includes('role="status" aria-live="polite" hidden'));
 assert.ok(app.includes("function renderSelectedHotelContext()"));
 assert.ok(app.includes("context.hidden=!text"));
 assert.ok(app.includes("renderHotels();renderFaq();renderSelectedHotelContext()"));
 assert.ok(app.includes('state.selectedHotelId=null;renderSelectedHotelContext()'));
 assert.ok(css.includes(".selected-hotel-context[hidden]{display:none}"));
});

test("unconfigured email action is absent from the interactive UI, but copy remains usable",async()=>{
 const [html,app,css]=await Promise.all([
  readFile(resolve(root,"index.html"),"utf8"),
  readFile(resolve(root,"assets/app.js"),"utf8"),
  readFile(resolve(root,"assets/styles.css"),"utf8")
 ]);
 assert.equal(SITE_CONFIG.contactEmail,"","no email recipient is authorized");
 assert.match(html,/<button[^>]*id="email-inquiry"[^>]*hidden>/);
 assert.match(html,/<button[^>]*id="copy-inquiry"/);
 assert.ok(app.includes("emailInquiryButton.hidden=!SITE_CONFIG.contactEmail"),"only a configured recipient may reveal email action");
 assert.ok(app.includes('emailInquiryButton.addEventListener("click",()=>{'),"verified recipient can use existing mailto flow");
 assert.ok(css.includes("#email-inquiry[hidden]{display:none!important}"),"flex layout must not override hidden");
});

test("unconfigured contact copy stays honest before and after JavaScript loads",async()=>{
 const html=await readFile(resolve(root,"index.html"),"utf8");
 assert.equal(SITE_CONFIG.contactEmail,"","this guard applies while no official recipient exists");
 assert.ok(html.includes(copy.fr.hotelsTitle),"initial rich directory title must match the maintained French copy");
 assert.ok(html.includes(copy.fr.hotelsIntro),"initial directory description must not claim an offer relationship");
 assert.ok(html.includes(copy.fr.benefit3Body),"initial request benefit must match the copy-only behavior");
 assert.ok(!html.includes("au complet"));
 assert.ok(!html.includes("nous pouvons vous faire une proposition"));
 for(const lang of ["fr","en","es"]){
  assert.doesNotMatch(copy[lang].benefit3Body,/messagerie|courriel|email|correo/i,`${lang} must not advertise the hidden email action`);
  assert.doesNotMatch(copy[lang].copySuccess,/envoy|send|envi/i,`${lang} copy success must not claim a send occurred`);
 }
});
