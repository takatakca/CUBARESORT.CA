// Source-attributed editorial profiles. No supplier inventory, prices, ratings or booking data.
// Generic pages for other directory entries must show unknowns, not inferred amenities.
import { hotels } from "./hotels.js";

export const profileCopy=Object.freeze({
 fr:{
  directory:"← Retour au répertoire", eyebrow:"FICHE ÉTABLISSEMENT", region:"Région", airport:"Aéroport de référence",
  scope:"Fiche de découverte, non une offre de réservation. Les services et conditions peuvent changer.",
  availability:"Aucun tarif ou inventaire en temps réel", snapshot:"Ce que disent les sources",
  pending:"Fiche en cours de documentation. Aucune prestation propre à cet hôtel n'est confirmée.",
  beach:"Plage et accès à la mer", beachUnknown:"Longueur du front de plage : non vérifiée. Ne pas confondre avec la longueur de la plage régionale.",
  season:"Saison et ouverture", seasonUnknown:"Période d'ouverture propre à cet établissement : non vérifiée.",
  inclusions:"Formule et prestations documentées", inclusionsUnknown:"Les prestations incluses dépendent de la formule et du fournisseur. Non vérifiées pour cette fiche.",
  reviews:"Avis et photos", reviewsUnknown:"Consulter les galeries et avis à la source. Aucune photo ou critique tierce reproduite ici.",
  sources:"Sources et vérification", reviewed:"Documentation consultée", sourceNote:"Les descriptions sont attribuées aux éditeurs cités, non garanties par CUBARESORT.CA.",
  evidence:"Source", details:"Consulter la fiche", request:"Préparer un brouillon de demande", unverified:"À documenter",
  nameLabel:"Établissement", provenance:"Présence dans le répertoire ≠ réservation disponible"
 },
 en:{
  directory:"← Back to the directory", eyebrow:"RESORT PROFILE", region:"Region", airport:"Reference airport",
  scope:"Discovery profile, not a booking offer. Amenities and terms may change.",
  availability:"No live prices or room inventory", snapshot:"What the sources say",
  pending:"Research in progress. No property-specific amenities are confirmed for this listing.",
  beach:"Beach and waterfront", beachUnknown:"Resort beachfront length: not verified. Do not confuse with the length of the regional beach.",
  season:"Season and opening", seasonUnknown:"Property-specific operating season: not verified.",
  inclusions:"Documented plans and facilities", inclusionsUnknown:"Included services depend on package and provider. Not verified for this listing.",
  reviews:"Reviews and photos", reviewsUnknown:"Explore original galleries and review pages. No third-party photos or reviews are reproduced here.",
  sources:"Sources and verification", reviewed:"Sources checked", sourceNote:"Descriptions are attributed to the cited publishers and are not guaranteed by CUBARESORT.CA.",
  evidence:"Source", details:"Explore profile", request:"Prepare an inquiry draft", unverified:"Research pending",
  nameLabel:"Property", provenance:"Directory listing ≠ bookable inventory"
 },
 es:{
  directory:"← Volver al directorio", eyebrow:"FICHA DEL HOTEL", region:"Región", airport:"Aeropuerto de referencia",
  scope:"Ficha informativa, no una oferta de reserva. Los servicios y condiciones pueden cambiar.",
  availability:"Sin precios ni habitaciones en tiempo real", snapshot:"Información de las fuentes",
  pending:"Investigación en curso. No se han confirmado servicios específicos de este hotel.",
  beach:"Playa y acceso al mar", beachUnknown:"Longitud del frente de playa del hotel: sin verificar. No confundir con la longitud de la playa regional.",
  season:"Temporada y apertura", seasonUnknown:"Temporada de apertura específica del hotel: sin verificar.",
  inclusions:"Planes y servicios documentados", inclusionsUnknown:"Los servicios incluidos dependen del paquete y proveedor. No verificados para esta ficha.",
  reviews:"Opiniones y fotos", reviewsUnknown:"Consulta las galerías y opiniones originales. No reproducimos fotos ni reseñas de terceros.",
  sources:"Fuentes y verificación", reviewed:"Fuentes consultadas", sourceNote:"Las descripciones se atribuyen a los editores citados y CUBARESORT.CA no las garantiza.",
  evidence:"Fuente", details:"Ver ficha", request:"Preparar borrador de consulta", unverified:"Investigación pendiente",
  nameLabel:"Establecimiento", provenance:"Estar en el directorio no implica disponibilidad"
 }
});
const L=(fr,en,es)=>Object.freeze({fr,en,es});
const checked="2026-10-16";
export const resortProfiles=Object.freeze({
 "iberostar-selection-varadero-varadero":{
  checked,
  beachfrontMeters:null,
  seasonalOperation:null,
  facts:[
   {text:L("Formule tout compris : repas, collations et boissons selon la fiche du voyagiste.","All-inclusive meals, snacks and beverages, as described by the travel distributor.","Todo incluido: comidas, aperitivos y bebidas, según la ficha del distribuidor."),source:0},
   {text:L("Activités nautiques non motorisées, animations en soirée et installations pour enfants répertoriées par le voyagiste.","Non-motorized watersports, evening activities and children's facilities listed by the distributor.","Deportes acuáticos no motorizados, espectáculos nocturnos e instalaciones infantiles indicados por el distribuidor."),source:0},
   {text:L("Le voyagiste répertorie 386 chambres et deux piscines d'eau douce; ces détails peuvent évoluer.","Distributor lists 386 rooms and two freshwater pools; these details may change.","El distribuidor indica 386 habitaciones y dos piscinas de agua dulce; los datos pueden cambiar."),source:0}
  ],
  sources:[
   {title:"WestJet Vacations — Iberostar Selection Varadero",url:"https://www.westjet.com/en-ca/hotels/varadero/vraivu/iberostar-selection-varadero",kind:"distributor"},
   {title:"WestJet Vacations — guest reviews (external)",url:"https://www.westjet.com/en-ca/hotels/varadero/vraivu/iberostar-selection-varadero/reviews",kind:"reviews"}
  ]
 },
 "melia-las-americas-varadero":{
  checked,
  beachfrontMeters:null,
  seasonalOperation:L("La fiche technique officielle datée de juillet 2025 indique une ouverture toute l'année; vérifier avant de voyager.","Official July 2025 fact sheet lists year-round operation; recheck before travelling.","La ficha técnica oficial de julio de 2025 indica apertura todo el año; compruébalo antes de viajar."),
  facts:[
   {text:L("Hôtel en bord de plage, réservé aux personnes de 18 ans et plus, avec formule tout compris.","All-inclusive beachfront hotel for guests aged 18 and older.","Hotel todo incluido frente a la playa para mayores de 18 años."),source:0},
   {text:L("Accès direct au Varadero Golf Club; avantages The Level selon catégorie et conditions.","Direct access to Varadero Golf Club; The Level benefits depend on category and terms.","Acceso directo a Varadero Golf Club; ventajas The Level según categoría y condiciones."),source:0},
   {text:L("La fiche technique officielle de juillet 2025 mentionne 340 chambres; les données peuvent changer.","The July 2025 official fact sheet lists 340 rooms; details may change.","La ficha técnica oficial de julio de 2025 indica 340 habitaciones; los datos pueden cambiar."),source:1}
  ],
  sources:[
   {title:"Meliá Cuba — Meliá Las Américas (official hotel and photo gallery)",url:"https://www.meliacuba.com/en/destinations/varadero/hotels/melia-lasamericas",kind:"official"},
   {title:"Meliá Cuba — official technical fact sheet (July 2025)",url:"https://media.meliacuba.com/fact-sheets/GDS-melia-lasamericas-en-1908.pdf",kind:"official"}
  ]
 }
});
const knownIds=new Set(hotels.map(h=>h.id));
export function resortProfileFor(id){return knownIds.has(id)?resortProfiles[id]||null:null;}
export function profileDataIsValid(){
 if(Object.keys(profileCopy).sort().join(",")!=="en,es,fr")return false;
 const keys=Object.keys(profileCopy.fr);
 if(["en","es"].some(lang=>keys.some(key=>!profileCopy[lang][key])))return false;
 return Object.entries(resortProfiles).every(([id,p])=>
  knownIds.has(id) && /^\\d{4}-\\d{2}-\\d{2}$/.test(p.checked) &&
  (p.beachfrontMeters===null || Number.isFinite(p.beachfrontMeters) && p.beachfrontMeters>0) &&
  (p.seasonalOperation===null || ["fr","en","es"].every(lang=>p.seasonalOperation[lang])) &&
  p.sources.length>0 && p.sources.every(s=>s.url.startsWith("https://") && !new URL(s.url).username && !new URL(s.url).password) &&
  p.facts.length>0 && p.facts.every(f=>Number.isInteger(f.source) && !!p.sources[f.source] && ["fr","en","es"].every(lang=>f.text[lang]))
 );
}
