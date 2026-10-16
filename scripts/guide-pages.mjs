// Editorial Cuba guide generator — sourced travel context, not a booking engine.
// Every public locale has a static crawlable page; no API keys, accounts or pricing.
export const GUIDE_PATHS=Object.freeze({
 fr:"guides/fr/cuba.html",
 en:"guides/en/cuba.html",
 es:"guides/es/cuba.html"
});
const official=Object.freeze({
 canada:"https://travel.gc.ca/destinations/cuba",
 visa:"https://evisacuba.cu/fr/inicio",
 havana:"https://whc.unesco.org/en/list/204/",
 trinidad:"https://whc.unesco.org/en/list/460/",
 vinales:"https://whc.unesco.org/en/list/840/"
});
const L=(fr,en,es)=>({fr,en,es});
export const guideTopics=Object.freeze([
 {id:"havana-walk",type:"free",photo:"photo-1533104816931-20fa691ff6ca",place:"La Havane / Havana",
  title:L("La Vieille Havane, à pied","Old Havana, on foot","La Habana Vieja, a pie"),
  intro:L("Places et architecture du centre historique. Marcher dans l'espace public ne nécessite pas de réserver une excursion; l'accès à certains sites peut être payant.","Explore the historic streets and plazas. You can walk public spaces without booking a tour; some museums and attractions charge admission.","Pasea por calles y plazas históricas. Recorrer espacios públicos no requiere excursión; algunos museos y sitios cobran entrada."),
  tip:L("Privilégiez les heures fraîches, respectez les lieux habités et vérifiez la situation locale.","Visit in cooler hours, respect residents and check local conditions.","Ve en horas más frescas, respeta a los residentes y consulta las condiciones locales."),source:official.havana},
 {id:"trinidad",type:"free",photo:"photo-1469474968028-56623f02e42e",place:"Trinidad",
  title:L("Trinidad sans programme","Trinidad without a schedule","Trinidad sin itinerario"),
  intro:L("Explorer les rues et places publiques d'un centre historique inscrit au patrimoine mondial. Les musées, visites guidées et transports ne sont pas forcément gratuits.","Discover public streets and plazas in a World Heritage historic centre. Museums, guided visits and transport may have fees.","Descubre calles y plazas públicas de un centro histórico Patrimonio Mundial. Museos, guías y transporte pueden tener costo."),
  tip:L("Portez des chaussures adaptées aux rues pavées et gardez du temps pour les découvertes spontanées.","Wear comfortable shoes for cobbled streets and leave time for unplanned discoveries.","Lleva calzado cómodo para los adoquines y deja espacio a los descubrimientos."),source:official.trinidad},
 {id:"vinales",type:"nature",photo:"photo-1501785888041-af3ef285b470",place:"Viñales",
  title:L("La vallée de Viñales","The Viñales Valley","El Valle de Viñales"),
  intro:L("Paysages de mogotes et culture rurale dans un site inscrit par l'UNESCO. Accès aux sentiers, accompagnement et conditions d'entrée à vérifier localement.","Mogote landscapes and rural culture in a UNESCO-listed area. Verify trail access, local guiding and entry conditions.","Paisajes de mogotes y cultura rural en un sitio UNESCO. Confirma el acceso a senderos, las guías y las condiciones."),
  tip:L("Ne présumez pas que les sentiers sont libres d'accès; convenez des conditions avant toute visite accompagnée.","Do not assume every trail is freely accessible; agree on terms before any guided visit.","No supongas que todos los senderos son de acceso libre; confirma las condiciones antes de ir."),source:official.vinales},
 {id:"ingenios",type:"excursion",photo:"photo-1500534623283-312aade485b7",place:"Trinidad",
  title:L("Vallée de los Ingenios","Valle de los Ingenios","Valle de los Ingenios"),
  intro:L("Une excursion patrimoniale autour de l'histoire sucrière cubaine. Transport, guide et entrée éventuelle doivent être confirmés auprès d'un opérateur autorisé.","A heritage excursion exploring Cuba's sugar-industry history. Transport, guide and any entry fees require confirmation with an authorized operator.","Excursión patrimonial sobre la historia azucarera de Cuba. Transporte, guía y entradas deben confirmarse con un operador autorizado."),
  tip:L("Approchez le patrimoine et son histoire humaine avec respect; la proposition n'est pas une offre vendue ici.","Approach the history and its human context with care. This is not a bookable offer on this site.","Acércate a la historia y su contexto humano con respeto. No es una oferta reservable en este sitio."),source:official.trinidad},
 {id:"varadero",type:"nature",photo:"photo-1507525428034-b723cf961d3e",place:"Varadero",
  title:L("Varadero, au-delà de l'hôtel","Varadero beyond the resort","Varadero más allá del hotel"),
  intro:L("Une idée de journée pour découvrir les espaces publics du littoral et mieux comprendre la destination. L'accès aux plages et aux services varie selon les lieux.","An idea for exploring public coastal spaces beyond your hotel. Beach access and facilities vary by location.","Una idea para explorar espacios públicos de la costa fuera del hotel. El acceso a playas y servicios varía según el lugar."),
  tip:L("Vérifiez les transports, les conditions de baignade et les zones effectivement accessibles.","Check transport, swimming conditions and which areas are actually open to visitors.","Consulta transporte, condiciones del mar y zonas abiertas al público."),source:official.canada},
 {id:"local-guide",type:"excursion",photo:"photo-1514282401047-d79a71a590e8",place:"Cuba",
  title:L("Une excursion conçue avec un guide local","An excursion with a local guide","Una excursión con guía local"),
  intro:L("Notre futur espace partenaires permettra à des prestataires vérifiés de présenter des sorties avec conditions, prix et disponibilités documentés. Aucun partenaire n'est actuellement réservable ici.","A future partner portal will let vetted providers describe trips with documented conditions, prices and availability. No partner activity can currently be booked here.","El futuro portal permitirá a proveedores verificados publicar excursiones con condiciones, precios y disponibilidad. Hoy no se pueden reservar aquí."),
  tip:L("Avant de payer : exigez identité du prestataire, modalités d'annulation, prestations exactes et preuve de conformité.","Before paying: verify the provider's identity, cancellation terms, inclusions and legal standing.","Antes de pagar: verifica identidad, cancelación, inclusiones y autorización del proveedor."),source:official.canada}
]);
const language={
 fr:{
  language:"Français",html:"fr",title:"Guide de Cuba : excursions, activités gratuites, nature et conseils | CUBARESORT.CA",
  description:"Explorez Cuba avec un guide pratique : La Havane, Trinidad, Viñales, idées de plein air, activités gratuites, visa et conseils aux voyageurs. Sources et vérifications.",
  eyebrow:"LE GUIDE CUBA · ÉDITION 2026",headline:"Cuba, plus loin que les cartes postales.",lede:"Des rues de La Havane aux paysages de Viñales : des idées à explorer, des conseils à vérifier et des rencontres à organiser avec des partenaires identifiés.",
  cue:"ÉDITORIAL INDÉPENDANT",heroCredit:"Photographie d'ambiance, non représentative d'un lieu ou d'un hôtel précis.",
  back:"Retour à CUBARESORT",explore:"Explorer les idées",advice:"Préparer son départ",partners:"Partenaires à Cuba",
  kicker:"CHOISIR SON RYTHME",sectionTitle:"Un Cuba. Mille façons d'y aller.",sectionLead:"Culture, plein air, expériences accompagnées et moments sans billet d'entrée. Nous distinguons les suggestions des prestations réellement réservables.",
  filters:{all:"Tout voir",free:"À découvrir gratuitement",nature:"Nature & plein air",excursion:"Excursions à organiser"},
  more:"Voir les détails",count:"idées à découvrir",freeTag:"Activité libre (hors frais éventuels)",natureTag:"Plein air",excursionTag:"Excursion à organiser",
  modalTitle:"Le détail de l'idée",modalWarning:"Information éditoriale uniquement : aucune réservation ni prix en direct.",modalTip:"Conseil pratique",source:"Consulter la source",close:"Fermer",
  practicalEyebrow:"AVANT LE DÉPART",practicalTitle:"De bonnes décisions commencent avec de bonnes sources.",
  visaTitle:"Visa et formalités",visaText:"Les règles dépendent de votre nationalité, de l'itinéraire et du transporteur. Vérifiez le visa électronique auprès du gouvernement cubain et ne présumez pas qu'il est inclus.",
  cautionTitle:"Avis aux voyageurs",cautionText:"Le gouvernement du Canada conseille actuellement d'éviter les voyages non essentiels à Cuba en raison de pénuries pouvant affecter les services et les transports. Consultez toujours l'avis officiel le jour du départ.",
  careTitle:"Santé, argent et logistique",careText:"Vérifiez assurance médicale, capacité de paiement, transports, hébergement, électricité et documents d'entrée. Certaines ressources peuvent être limitées ou changer rapidement.",
  visaLink:"Site officiel du visa électronique",cautionLink:"Conseils officiels du Canada",careLink:"Vérifier les exigences actuelles",
  partnerEyebrow:"DES RENCONTRES QUI COMPTENT",partnerTitle:"Vous proposez des expériences à Cuba ?",partnerText:"Un espace professionnel permettra aux partenaires approuvés de gérer leurs fiches, propositions tarifaires et conditions. L'accès sera protégé par l'identité centrale TAKATAK et une validation humaine avant publication.",
  partnerButton:"Comment fonctionnera l'espace partenaire",partnerDialogTitle:"L'espace partenaires arrive par étapes",partnerDialogText:"L'inscription, la connexion TAKATAK, l'édition de fiches et les prix ne sont pas encore activés. Aucun formulaire personnel ou paiement n'est collecté ici. Les opérateurs devront être vérifiés et les tarifs approuvés avant publication.",
  honesty:"Pas de fausses disponibilités · Pas de prix inventés · Les conditions évoluent",updated:"Sources consultées le 16 octobre 2026",
  navExplore:"Expériences",navPractical:"Formalités",navPartner:"Professionnels",brandLine:"Guide spécialisé Cuba · Informations à confirmer",
  galleryAlt:"Image d'ambiance illustrative, sans garantie sur le lieu réel",tabTitle:"Filtrer les expériences"
 },
 en:{
  language:"English",html:"en",title:"Cuba travel guide: excursions, free things to do, nature and visas | CUBARESORT.CA",
  description:"A practical guide to Cuba: Havana, Trinidad, Viñales, outdoor activities, free ideas, visas and official travel advice. Clearly sourced, never fake inventory.",
  eyebrow:"THE CUBA EDIT · 2026",headline:"Cuba, beyond the postcard.",lede:"From Havana streets to Viñales landscapes: thoughtful ideas, official travel guidance and future experiences with vetted local partners.",
  cue:"INDEPENDENT EDITORIAL",heroCredit:"Atmospheric illustration; not a photograph of a specific venue or hotel.",
  back:"Back to CUBARESORT",explore:"Explore ideas",advice:"Plan your trip",partners:"Local partners",
  kicker:"FIND YOUR PACE",sectionTitle:"One Cuba. So many ways to explore.",sectionLead:"Culture, outdoor experiences, guided-trip ideas and moments without an admission ticket. Ideas are not current bookable offers.",
  filters:{all:"All ideas",free:"Free-to-explore ideas",nature:"Nature & outdoors",excursion:"Excursion concepts"},
  more:"Explore details",count:"ideas to explore",freeTag:"Free exploration (possible extra fees)",natureTag:"Outdoors",excursionTag:"Excursion concept",
  modalTitle:"Experience details",modalWarning:"Editorial information only: no bookings or live prices.",modalTip:"Practical tip",source:"View the original source",close:"Close",
  practicalEyebrow:"BEFORE YOU GO",practicalTitle:"Great journeys begin with reliable information.",
  visaTitle:"Visa and entry",visaText:"Rules depend on nationality, itinerary and airline. Check Cuba's official electronic visa portal; do not assume your visa is included.",
  cautionTitle:"Travel advisories",cautionText:"Canada currently advises avoiding non-essential travel to Cuba because shortages can affect facilities and transportation. Recheck the official advisory before travelling.",
  careTitle:"Health, money and logistics",careText:"Verify medical insurance, payment options, transport, accommodation, power supply and immigration documents. Local availability of essential services may change.",
  visaLink:"Official Cuba electronic visa",cautionLink:"Government of Canada travel advice",careLink:"Check current entry rules",
  partnerEyebrow:"REAL PEOPLE, LOCAL EXPERTISE",partnerTitle:"Do you offer experiences in Cuba?",partnerText:"The upcoming professional workspace will let approved partners manage listings, proposed prices and service conditions. Identity comes from TAKATAK, with human approval before publication.",
  partnerButton:"How the partner workspace will work",partnerDialogTitle:"Partner workspace in preparation",partnerDialogText:"Partner registration, TAKATAK sign-in, listing updates and pricing are not enabled yet. We do not collect personal information or payments here. Operators and rates need verification and approval first.",
  honesty:"No invented prices · No false availability · Terms may change",updated:"Sources checked October 16, 2026",
  navExplore:"Experiences",navPractical:"Entry & advice",navPartner:"Partners",brandLine:"Cuba travel discovery · Information subject to verification",
  galleryAlt:"Illustrative travel image; not presented as a photograph of a specific venue",tabTitle:"Filter experiences"
 },
 es:{
  language:"Español",html:"es",title:"Guía de Cuba: excursiones, actividades gratis, naturaleza y visados | CUBARESORT.CA",
  description:"Descubre Cuba: La Habana, Trinidad, Viñales, actividades al aire libre, ideas gratuitas, visado y consejos de viaje con fuentes oficiales.",
  eyebrow:"GUÍA CUBA · EDICIÓN 2026",headline:"Cuba, más allá de las postales.",lede:"Desde La Habana hasta Viñales: propuestas para descubrir, orientación de fuentes oficiales y futuras experiencias con colaboradores locales verificados.",
  cue:"CONTENIDO EDITORIAL",heroCredit:"Fotografía de ambiente ilustrativa; no corresponde a un hotel o lugar específico.",
  back:"Volver a CUBARESORT",explore:"Explorar ideas",advice:"Preparar el viaje",partners:"Colaboradores en Cuba",
  kicker:"A TU RITMO",sectionTitle:"Una Cuba. Muchas formas de descubrirla.",sectionLead:"Cultura, naturaleza, ideas con guías y paseos sin entrada. Una propuesta editorial no es una reserva disponible.",
  filters:{all:"Todas",free:"Ideas gratuitas",nature:"Naturaleza y aire libre",excursion:"Excursiones por organizar"},
  more:"Ver detalles",count:"ideas para explorar",freeTag:"Paseo libre (posibles gastos)",natureTag:"Al aire libre",excursionTag:"Idea de excursión",
  modalTitle:"Detalles de la propuesta",modalWarning:"Contenido informativo, sin reservas ni precios en directo.",modalTip:"Consejo práctico",source:"Consultar fuente original",close:"Cerrar",
  practicalEyebrow:"ANTES DE VIAJAR",practicalTitle:"Un buen viaje empieza con información fiable.",
  visaTitle:"Visado y entrada",visaText:"Las normas dependen de nacionalidad, ruta y compañía aérea. Consulta el portal oficial de visado electrónico de Cuba; no presupongas que está incluido.",
  cautionTitle:"Avisos de viaje",cautionText:"Canadá aconseja actualmente evitar viajes no esenciales a Cuba por escasez que puede afectar servicios y transporte. Consulta siempre los avisos oficiales antes de viajar.",
  careTitle:"Salud, dinero y logística",careText:"Confirma seguro médico, medios de pago, transporte, alojamiento, electricidad y documentos de entrada. Los servicios esenciales pueden cambiar rápidamente.",
  visaLink:"Portal oficial de visado electrónico",cautionLink:"Avisos de viaje de Canadá",careLink:"Ver requisitos actualizados",
  partnerEyebrow:"PERSONAS Y EXPERIENCIAS REALES",partnerTitle:"¿Ofreces experiencias en Cuba?",partnerText:"Un futuro espacio profesional permitirá a colaboradores aprobados gestionar sus fichas, precios propuestos y condiciones. Identidad de TAKATAK y revisión humana antes de publicar.",
  partnerButton:"Conocer el futuro portal de colaboradores",partnerDialogTitle:"Portal de colaboradores en preparación",partnerDialogText:"Aún no están activos el registro, la conexión TAKATAK, la edición de ofertas ni los precios. No recopilamos datos personales ni pagos aquí. Proveedores y tarifas deberán verificarse y aprobarse.",
  honesty:"Sin precios inventados · Sin falsa disponibilidad · Condiciones variables",updated:"Fuentes consultadas el 16 de octubre de 2026",
  navExplore:"Experiencias",navPractical:"Visados y consejos",navPartner:"Colaboradores",brandLine:"Guía especializada de Cuba · Datos sujetos a confirmación",
  galleryAlt:"Foto de ambiente ilustrativa; no identifica un lugar específico",tabTitle:"Filtrar experiencias"
 }
};
function esc(value){return String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");}
function link(url,label){return '<a href="'+esc(url)+'" rel="noopener noreferrer" target="_blank">'+esc(label)+' <span aria-hidden="true">↗</span></a>';}
export function renderGuidePage(lang){
 const t=language[lang];if(!t)throw new Error("Unknown guide language");
 const absolute="https://cubaresort.ca/"+GUIDE_PATHS[lang];
 const topics=guideTopics.map((item,index)=>{
  const name=item.title[lang],kind=t.filters[item.type],summary=item.intro[lang];
  const bg="https://images.unsplash.com/"+item.photo+"?auto=format&fit=crop&w=1000&q=78";
  return '<article class="guide-card" data-kind="'+item.type+'"><div class="guide-photo"><img src="'+esc(bg)+'" loading="lazy" decoding="async" alt="'+esc(t.galleryAlt)+'"><span class="guide-photo-note">'+esc(t.cue)+'</span></div><div class="guide-card-content"><div class="guide-card-meta"><span>'+esc(item.place)+'</span><span>'+esc(kind)+'</span></div><h3>'+esc(name)+'</h3><p>'+esc(summary)+'</p><button type="button" class="guide-card-more" data-guide-open="'+esc(item.id)+'" aria-label="'+esc(t.more+": "+name)+'">'+esc(t.more)+' <span aria-hidden="true">↗</span></button></div></article>';
 }).join("");
 const options=Object.entries(t.filters).map(([kind,label])=>'<button type="button" data-guide-filter="'+kind+'" aria-pressed="'+(kind==="all")+'">'+esc(label)+'</button>').join("");
 const languages=Object.keys(GUIDE_PATHS).map(code=>'<a href="../../'+GUIDE_PATHS[code]+'" hreflang="'+code+'" lang="'+code+'" aria-current="'+(code===lang?'page':'false')+'">'+code.toUpperCase()+'</a>').join("");
 const alternates=Object.entries(GUIDE_PATHS).map(([code,path])=>'<link rel="alternate" hreflang="'+code+'" href="https://cubaresort.ca/'+path+'">').join("");
 const meta=JSON.stringify({"@context":"https://schema.org","@type":"WebPage",inLanguage:lang,name:t.title,description:t.description,url:absolute,isPartOf:{"@type":"WebSite",name:"CUBARESORT.CA",url:"https://cubaresort.ca/"},dateModified:"2026-10-16"});
 const data=JSON.stringify(guideTopics.map(({id,title,intro,tip,source})=>({id,title:title[lang],intro:intro[lang],tip:tip[lang],source}))).replaceAll("<","\\u003c");
 return '<!doctype html>\n<html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><meta name="theme-color" content="#142e31"><title>'+esc(t.title)+'</title><meta name="description" content="'+esc(t.description)+'"><link rel="canonical" href="'+absolute+'">'+alternates+'<meta property="og:type" content="article"><meta property="og:title" content="'+esc(t.title)+'"><meta property="og:description" content="'+esc(t.description)+'"><meta property="og:url" content="'+absolute+'"><link rel="icon" type="image/svg+xml" href="../../assets/favicon.svg"><link rel="stylesheet" href="../../assets/guide.css"><script type="application/ld+json">'+meta+'</script><script type="module" src="../../assets/guide.js"></script></head><body>\n'
  +'<a class="guide-skip" href="#guide-main">'+esc(t.explore)+'</a><div class="guide-topline"><div class="guide-shell"><span>CUBA / DESTINATIONS / CULTURE / NATURE</span><span>'+esc(t.brandLine)+'</span></div></div>'
  +'<header class="guide-header"><div class="guide-shell guide-header-inner"><a class="guide-logo" href="../../" aria-label="CUBARESORT.CA">CUBA<span>RESORT</span><small>.CA</small></a><nav aria-label="'+esc(t.language)+'"><a href="#discover">'+esc(t.navExplore)+'</a><a href="#prepare">'+esc(t.navPractical)+'</a><a href="#partners">'+esc(t.navPartner)+'</a></nav><div class="guide-lang" aria-label="Langue / Language / Idioma">'+languages+'</div></div></header>'
  +'<main id="guide-main"><section class="guide-hero"><div class="guide-hero-photo" role="img" aria-label="'+esc(t.galleryAlt)+'"></div><div class="guide-hero-shade"></div><div class="guide-shell guide-hero-inner"><p class="guide-overline">'+esc(t.eyebrow)+'</p><h1>'+esc(t.headline)+'</h1><p class="guide-hero-lede">'+esc(t.lede)+'</p><div class="guide-hero-actions"><a class="guide-cta" href="#discover">'+esc(t.explore)+' <span aria-hidden="true">↗</span></a><a class="guide-link-light" href="#prepare">'+esc(t.advice)+' →</a></div></div><p class="guide-image-caption">'+esc(t.heroCredit)+'</p></section>'
  +'<div class="guide-proof"><div class="guide-shell"><span>01 — '+esc(t.navExplore)+'</span><span>02 — '+esc(t.navPractical)+'</span><span>03 — '+esc(t.navPartner)+'</span></div></div>'
  +'<section class="guide-section guide-discover" id="discover" aria-labelledby="discover-title"><div class="guide-shell"><div class="guide-section-head"><div><p class="guide-eyebrow">'+esc(t.kicker)+'</p><h2 id="discover-title">'+esc(t.sectionTitle)+'</h2></div><p>'+esc(t.sectionLead)+'</p></div><div class="guide-filters" role="group" aria-label="'+esc(t.tabTitle)+'">'+options+'</div><p class="guide-count" id="guide-count" role="status" aria-live="polite"></p><div class="guide-cards" id="guide-cards">'+topics+'</div></div></section>'
  +'<section class="guide-section guide-prepare" id="prepare" aria-labelledby="prepare-title"><div class="guide-shell"><p class="guide-eyebrow">'+esc(t.practicalEyebrow)+'</p><h2 id="prepare-title">'+esc(t.practicalTitle)+'</h2><div class="guide-advice-grid"><article><div class="guide-advice-num">01 / DOCUMENTS</div><h3>'+esc(t.visaTitle)+'</h3><p>'+esc(t.visaText)+'</p>'+link(official.visa,t.visaLink)+'</article><article class="guide-advice-urgent"><div class="guide-advice-num">02 / TRAVEL ADVICE</div><h3>'+esc(t.cautionTitle)+'</h3><p>'+esc(t.cautionText)+'</p>'+link(official.canada,t.cautionLink)+'</article><article><div class="guide-advice-num">03 / ESSENTIALS</div><h3>'+esc(t.careTitle)+'</h3><p>'+esc(t.careText)+'</p>'+link(official.canada,t.careLink)+'</article></div></div></section>'
  +'<section class="guide-partners" id="partners" aria-labelledby="partners-title"><div class="guide-shell guide-partners-layout"><div><p class="guide-eyebrow">'+esc(t.partnerEyebrow)+'</p><h2 id="partners-title">'+esc(t.partnerTitle)+'</h2><p>'+esc(t.partnerText)+'</p><button type="button" id="partner-info" class="guide-cta guide-cta-light">'+esc(t.partnerButton)+' <span aria-hidden="true">↗</span></button></div><div class="guide-partner-decoration" aria-hidden="true"><span>LOCAL</span><span>PEOPLE</span><span>REAL STORIES</span></div></div></section></main>'
  +'<footer class="guide-footer"><div class="guide-shell guide-footer-top"><a class="guide-logo" href="../../">CUBA<span>RESORT</span><small>.CA</small></a><a href="../../">'+esc(t.back)+' ↑</a></div><div class="guide-shell guide-footer-bottom"><p>'+esc(t.honesty)+'</p><p>'+esc(t.updated)+'</p></div></footer>'
  +'<dialog id="guide-dialog" aria-labelledby="guide-dialog-title" class="guide-dialog"><div class="guide-dialog-shell"><div class="guide-dialog-top"><p class="guide-eyebrow">'+esc(t.modalTitle)+'</p><button type="button" data-dialog-close aria-label="'+esc(t.close)+'">×</button></div><h2 id="guide-dialog-title"></h2><p id="guide-dialog-intro"></p><h3>'+esc(t.modalTip)+'</h3><p id="guide-dialog-tip"></p><a id="guide-dialog-source" rel="noopener noreferrer" target="_blank" href="'+official.canada+'">'+esc(t.source)+' ↗</a><p class="guide-modal-note">'+esc(t.modalWarning)+'</p></div></dialog>'
  +'<dialog id="partner-dialog" aria-labelledby="partner-dialog-title" class="guide-dialog"><div class="guide-dialog-shell"><div class="guide-dialog-top"><p class="guide-eyebrow">'+esc(t.navPartner)+'</p><button type="button" data-dialog-close aria-label="'+esc(t.close)+'">×</button></div><h2 id="partner-dialog-title">'+esc(t.partnerDialogTitle)+'</h2><p>'+esc(t.partnerDialogText)+'</p></div></dialog>'
  +'<script type="application/json" id="guide-topic-data">'+data+'</script><script type="application/json" id="guide-label-data">'+JSON.stringify({count:t.count,source:t.source}).replaceAll("<","\\u003c")+'</script></body></html>';
}
