import { destinations, experiences, styles, imageUrl } from "./catalog.js";
import { hotelRegions, hotels, searchHotels, regionLabel } from "./hotels.js";
import { copy, translation } from "./i18n.js";
import { SITE_CONFIG } from "./config.js";

// Static discovery application. No reservations, payments, API calls or collection of PII.
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const DEST_IDS = new Set(destinations.map((d) => d.id));
const STYLE_IDS = new Set(styles);
const EXPERIENCE_IDS = new Set(experiences.map((e) => e.id));
const REGION_IDS = new Set(hotelRegions.map((r) => r.id));
const localeTag = {fr:"fr-CA",en:"en-CA",es:"es-ES"};
const storageKey = "cubaresort.preferences.v1";
const params = new URLSearchParams(window.location.search);

function readStored(){
  try {
    const val = JSON.parse(localStorage.getItem(storageKey) || "{}");
    return val && typeof val === "object" ? val : {};
  } catch {return {};}
}
const stored = readStored();
const language = params.get("lang") || stored.lang || navigator.language.slice(0,2);
const state = {
  lang: Object.hasOwn(copy,language) ? language : "fr",
  destination: DEST_IDS.has(params.get("destination")) ? params.get("destination") : "all",
  style: STYLE_IDS.has(params.get("style")) ? params.get("style") : "all",
  q: (params.get("q") || "").slice(0,100),
  sort:"featured",
  hotelRegion: REGION_IDS.has(params.get("region")) ? params.get("region") : "all",
  hotelQuery: (params.get("hq") || "").slice(0,100),
  favorites:new Set(Array.isArray(stored.favorites) ? stored.favorites.filter(id => EXPERIENCE_IDS.has(id)) : [])
};
function tr(key){return translation(state.lang,key);}
function persist(){
 try {localStorage.setItem(storageKey,JSON.stringify({lang:state.lang,favorites:[...state.favorites]}));} catch {/* private mode or full storage */}
}
function destName(id){return destinations.find(d=>d.id===id)?.name || "";}
function normalize(str){return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase();}
function escapedAttr(str){return String(str).replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;");}
const richKeys = new Set(["heroTitle","destTitle","staysTitle","editorialTitle","approachTitle","ctaBandTitle","faqTitle"]);

function setStaticTranslations(){
 document.documentElement.lang = state.lang;
 $$("[data-i18n]").forEach(node=>{
   const key=node.dataset.i18n;
   if(!Object.hasOwn(copy[state.lang],key))return;
   if(richKeys.has(key))node.innerHTML=tr(key); // trusted developer-authored markup only
   else node.textContent=tr(key);
 });
 $$("[data-i18n-placeholder]").forEach(node=>{node.placeholder=tr(node.dataset.i18nPlaceholder);});
 $$("[data-lang]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.lang===state.lang)));
 $("#menu-toggle").setAttribute("aria-label",state.lang==="en"?"Open menu":state.lang==="es"?"Abrir menú":"Ouvrir le menu");
 $("#inquiry-close").setAttribute("aria-label",state.lang==="en"?"Close":state.lang==="es"?"Cerrar":"Fermer");
 $("#legal-close").setAttribute("aria-label",state.lang==="en"?"Close":state.lang==="es"?"Cerrar":"Fermer");
 document.title = state.lang === "en" ? "CUBARESORT.CA — Cuba, your way" : state.lang === "es" ? "CUBARESORT.CA — Cuba a tu manera" : "CUBARESORT.CA — Cuba, à votre façon";
}

function updateSelects(){
 const filter=$("#destination-filter");
 const inquiry=$("#inquiry-destination");
 filter.replaceChildren(new Option(tr("allDestinations"),"all"));
 inquiry.replaceChildren(new Option(tr("allInquiryDestinations"),"all"));
 for(const d of destinations) {
   filter.add(new Option(d.name,d.id));
   inquiry.add(new Option(d.name,d.id));
 }
 filter.value=state.destination;
 const style=$("#style-filter");
 style.replaceChildren(new Option(tr("allStyles"),"all"));
 styles.forEach(s=>style.add(new Option(tr("style"+s.charAt(0).toUpperCase()+s.slice(1)),s)));
 style.value=state.style;
 $("#text-search").value=state.q;
 $("#sort-select").value=state.sort;
}

function renderDestinations(){
 const grid=$("#destination-grid");
 grid.replaceChildren();
 destinations.slice(0,3).forEach(d=>{
  const button=document.createElement("a");
  button.href="#experiences";
  button.className="destination-card";
  button.dataset.destination=d.id;
  button.setAttribute("aria-label",d.name+" — "+tr("ctaExplore"));
  button.innerHTML = '<img class="destination-photo" alt="'+escapedAttr(tr("destinationPhotoAlt"))+'" src="'+escapedAttr(imageUrl(d.image,1000))+'" loading="lazy" decoding="async"><div class="destination-content"><div><p>'+escapedAttr(d.text[state.lang])+'</p><h3>'+escapedAttr(d.name)+'</h3></div><span class="destination-arrow" aria-hidden="true">↗</span></div>';
  // button has a full-width decorative card and forwards to the catalogue
  grid.append(button);
 });
}

function visibleExperiences(){
 const q=normalize(state.q.trim());
 const filtered=experiences.filter(e=>{
   if(state.destination!=="all" && e.destination!==state.destination)return false;
   if(state.style!=="all" && e.style!==state.style)return false;
   if(!q)return true;
   return normalize([e.name[state.lang],e.summary[state.lang],destName(e.destination),tr("style"+e.style.charAt(0).toUpperCase()+e.style.slice(1))].join(" ")).includes(q);
 });
 if(state.sort==="az")filtered.sort((a,b)=>a.name[state.lang].localeCompare(b.name[state.lang],localeTag[state.lang]));
 return filtered;
}

function renderExperiences(){
 const grid=$("#experience-grid");
 grid.replaceChildren();
 const filtered=visibleExperiences();
 $("#results-count").textContent=filtered.length+" "+tr(filtered.length===1?"result":"results");
 $("#empty-state").hidden=filtered.length>0;
 for(const e of filtered){
   const favourite=state.favorites.has(e.id);
   const article=document.createElement("article");
   article.className="experience-card";
   article.innerHTML='<div class="experience-photo-wrap"><img class="experience-photo" src="'+escapedAttr(imageUrl(e.image,900))+'" loading="lazy" decoding="async" alt="'+escapedAttr(tr("photoAlt"))+'"><span class="card-tag">'+escapedAttr(tr("style"+e.style.charAt(0).toUpperCase()+e.style.slice(1)))+'</span><button type="button" class="favorite-button" data-favorite="'+escapedAttr(e.id)+'" aria-pressed="'+String(favourite)+'" aria-label="'+escapedAttr(tr(favourite?"unfavorite":"favorite"))+'">'+(favourite?"♥":"♡")+'</button></div><div class="experience-body"><p class="experience-location">'+escapedAttr(destName(e.destination))+'</p><h3>'+escapedAttr(e.name[state.lang])+'</h3><p>'+escapedAttr(e.summary[state.lang])+'</p></div><div class="card-footer"><span>'+escapedAttr(tr("inspiration"))+'</span><button type="button" data-inquire="'+escapedAttr(e.destination)+'">'+escapedAttr(tr("inquiry"))+'</button></div>';
   grid.append(article);
 }
}
function updateHotelSelect(){
 const select=$("#hotel-region");
 select.replaceChildren(new Option(tr("hotelsAllRegions")+" ("+hotels.length+")","all"));
 for(const r of hotelRegions)select.add(new Option(r.label[state.lang]+" ("+r.count+")",r.id));
 select.value=state.hotelRegion;
 $("#hotel-search").value=state.hotelQuery;
}

function renderRegionChips(){
 const wrap=$("#region-chips");
 wrap.replaceChildren();
 const makeChip=(id,label,count)=>{
  const b=document.createElement("button");
  b.type="button";
  b.className="region-chip";
  b.dataset.region=id;
  b.setAttribute("aria-pressed",String(state.hotelRegion===id));
  b.textContent=label+" ("+count+")";
  return b;
 };
 wrap.append(makeChip("all",tr("hotelsAllRegions"),hotels.length));
 for(const r of hotelRegions)wrap.append(makeChip(r.id,r.label[state.lang],r.count));
}

function renderHotels(){
 const grid=$("#hotel-grid");
 grid.replaceChildren();
 const list=searchHotels(state.hotelQuery,state.hotelRegion);
 $("#hotel-count").textContent=list.length+" "+tr(list.length===1?"hotelsCountOne":"hotelsCount");
 $("#hotel-empty").hidden=list.length>0;
 for(const h of list){
  const li=document.createElement("li");
  li.className="hotel-card"+(h.confirmed?"":" hotel-card-pending");
  const badge=h.confirmed?tr("hotelsConfirmed"):tr("hotelsPending");
  li.innerHTML='<div class="hotel-main"><h3>'+escapedAttr(h.name)+'</h3>'
   +'<p class="hotel-meta"><span class="hotel-region">'+escapedAttr(regionLabel(h.region,state.lang))+'</span>'
   +'<span class="hotel-airport">'+escapedAttr(tr("hotelsAirport"))+' '+escapedAttr(h.airport)+'</span></p></div>'
   +'<div class="hotel-foot"><span class="hotel-badge'+(h.confirmed?"":" hotel-badge-pending")+'">'+escapedAttr(badge)+'</span>'
   +'<button type="button" data-hotel-inquire="'+escapedAttr(h.region)+'">'+escapedAttr(tr("hotelsAsk"))+'</button></div>';
  grid.append(li);
 }
}

function resetHotels(){
 state.hotelRegion="all";state.hotelQuery="";
 updateHotelSelect();renderRegionChips();renderHotels();syncUrl();
}

function renderFaq(){
 const list=$("#faq-list");
 list.replaceChildren();
 tr("faq").forEach(([question,answer])=>{
   const details=document.createElement("details");
   const summary=document.createElement("summary");
   const p=document.createElement("p");
   summary.textContent=question;p.textContent=answer;
   details.append(summary,p);list.append(details);
 });
}
function render(){
 setStaticTranslations();updateSelects();renderDestinations();renderExperiences();
 updateHotelSelect();renderRegionChips();renderHotels();renderFaq();
}
function syncUrl(){
 const url=new URL(window.location.href);
 for(const key of ["destination","style","q","lang","region","hq"])url.searchParams.delete(key);
 if(state.destination!=="all")url.searchParams.set("destination",state.destination);
 if(state.style!=="all")url.searchParams.set("style",state.style);
 if(state.q.trim())url.searchParams.set("q",state.q.trim());
 if(state.hotelRegion!=="all")url.searchParams.set("region",state.hotelRegion);
 if(state.hotelQuery.trim())url.searchParams.set("hq",state.hotelQuery.trim());
 if(state.lang!=="fr")url.searchParams.set("lang",state.lang);
 window.history.replaceState(null,"",url.pathname+url.search+url.hash);
}
function reset(){
 state.destination="all";state.style="all";state.q="";state.sort="featured";
 updateSelects();renderExperiences();syncUrl();
}
function openInquiry(dest="all"){
 const dialog=$("#inquiry-dialog");
 $("#inquiry-destination").value=DEST_IDS.has(dest) ? dest : "all";
 $("#inquiry-status").textContent="";
 const now=new Date(),month=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0");
 $("#inquiry-date").min=month;
 if(!dialog.open)dialog.showModal();
}
function formatRequest(){
 const destination=$("#inquiry-destination").value;
 const travelers=Number($("#inquiry-travelers").value);
 if(!["all",...DEST_IDS].includes(destination)||!Number.isInteger(travelers)||travelers<1||travelers>30)return null;
 const duration=$("#inquiry-duration").value;
 const month=$("#inquiry-date").value || "-";
 const notes=$("#inquiry-notes").value.trim().slice(0,1000) || "-";
 // Text is kept in the browser until the visitor explicitly copies or opens their own email client.
 return [
  "CUBARESORT.CA — "+tr("dialogTitle"),
  tr("formDestination")+": "+(destination==="all"?tr("allInquiryDestinations"):destName(destination)),
  tr("formMonth")+": "+month,
  tr("formTravelers")+": "+travelers,
  tr("formDuration")+": "+(duration==="flexible"?tr("durationFlexible"):duration+" "+(state.lang==="en"?"nights":state.lang==="es"?"noches":"nuits")),
  tr("formNotes")+": "+notes,
  "",
  tr("dialogIntro")
 ].join("\n");
}
function showStatus(message){$("#inquiry-status").textContent=message;}
function openLegal(kind){
 const dialog=$("#legal-dialog");
 $("#legal-heading").textContent=tr(kind+"Title");
 $("#legal-copy").innerHTML=tr(kind+"Html"); // content controlled in i18n.js only
 if(!dialog.open)dialog.showModal();
}
function closeMobile(){
 $("#mobile-menu").hidden=true;
 $("#menu-toggle").setAttribute("aria-expanded","false");
}

$$("[data-lang]").forEach(button=>button.addEventListener("click",()=>{
 state.lang=button.dataset.lang;
 persist();render();syncUrl();
}));
$("#search-form").addEventListener("submit",e=>{
 e.preventDefault();
 state.destination=$("#destination-filter").value;
 state.style=$("#style-filter").value;
 renderExperiences();syncUrl();
 $("#experiences").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
});
$("#text-search").addEventListener("input",e=>{
 state.q=e.target.value.slice(0,100);
 renderExperiences();syncUrl();
});
$("#sort-select").addEventListener("change",e=>{state.sort=e.target.value;renderExperiences();});
$("#reset-filters").addEventListener("click",reset);
$("#empty-reset").addEventListener("click",reset);
$("#destination-grid").addEventListener("click",e=>{
 const card=e.target.closest("[data-destination]");
 if(!card)return;
 e.preventDefault();
 state.destination=card.dataset.destination;state.style="all";state.q="";
 updateSelects();renderExperiences();syncUrl();
 $("#experiences").scrollIntoView({behavior:"smooth",block:"start"});
});
$("#experience-grid").addEventListener("click",e=>{
 const favourite=e.target.closest("[data-favorite]");
 if(favourite){
  const id=favourite.dataset.favorite;
  if(!EXPERIENCE_IDS.has(id))return;
  if(state.favorites.has(id))state.favorites.delete(id);else state.favorites.add(id);
  persist();renderExperiences();return;
 }
 const inquire=e.target.closest("[data-inquire]");
 if(inquire)openInquiry(inquire.dataset.inquire);
});
$("#hotel-region").addEventListener("change",e=>{
 state.hotelRegion=e.target.value;renderRegionChips();renderHotels();syncUrl();
});
$("#hotel-search").addEventListener("input",e=>{
 state.hotelQuery=e.target.value.slice(0,100);renderHotels();syncUrl();
});
$("#hotel-reset").addEventListener("click",resetHotels);
$("#hotel-empty-reset").addEventListener("click",resetHotels);
$("#region-chips").addEventListener("click",e=>{
 const chip=e.target.closest("[data-region]");
 if(!chip)return;
 state.hotelRegion=chip.dataset.region;
 updateHotelSelect();renderRegionChips();renderHotels();syncUrl();
});
$("#hotel-grid").addEventListener("click",e=>{
 const ask=e.target.closest("[data-hotel-inquire]");
 if(!ask)return;
 const region=ask.dataset.hotelInquire;
 openInquiry(DEST_IDS.has(region)?region:"all");
});
for(const id of ["header-inquiry","mobile-inquiry","band-inquiry","footer-inquiry"]){
 $("#"+id).addEventListener("click",()=>{closeMobile();openInquiry(state.destination);});
}
$("#menu-toggle").addEventListener("click",()=>{
 const menu=$("#mobile-menu");menu.hidden=!menu.hidden;
 $("#menu-toggle").setAttribute("aria-expanded",String(!menu.hidden));
});
$$("#mobile-menu a").forEach(a=>a.addEventListener("click",closeMobile));
$("#inquiry-close").addEventListener("click",()=>$("#inquiry-dialog").close());
$("#inquiry-form").addEventListener("submit",e=>e.preventDefault());
$("#copy-inquiry").addEventListener("click",async()=>{
 const request=formatRequest();
 if(!request){showStatus(tr("invalidForm"));return;}
 try{
  if(!navigator.clipboard?.writeText)throw new Error("Clipboard unavailable");
  await navigator.clipboard.writeText(request);
  showStatus(tr("copySuccess"));
 }catch{
  showStatus(tr("copyError")+"\n"+request);
 }
});
$("#email-inquiry").addEventListener("click",()=>{
 const request=formatRequest();
 if(!request){showStatus(tr("invalidForm"));return;}
 if(!SITE_CONFIG.contactEmail){showStatus(tr("emailUnconfigured"));return;}
 const subject=encodeURIComponent("CUBARESORT.CA — "+tr("dialogTitle"));
 const body=encodeURIComponent(request);
 const href="mailto:"+encodeURIComponent(SITE_CONFIG.contactEmail)+"?subject="+subject+"&body="+body;
 showStatus(tr("emailReady"));
 window.location.href=href;
});
$("#footer-privacy").addEventListener("click",()=>openLegal("privacy"));
$("#footer-terms").addEventListener("click",()=>openLegal("terms"));
$("#legal-close").addEventListener("click",()=>$("#legal-dialog").close());
$("#year").textContent=String(new Date().getFullYear());
render();