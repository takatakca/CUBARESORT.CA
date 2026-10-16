import { hotelRegions, hotels } from "./hotels.js";
import { translation } from "./i18n.js";

const regions=new Map(hotelRegions.map(r=>[r.id,r]));
const properties=new Map(hotels.map(h=>[h.id,h]));
const languages=new Set(["fr","en","es"]);
const durations=new Set(["flexible","7","10","14"]);

// Pure function: produces a visitor-controlled draft only. Never sends or saves PII.
export function formatTravelRequest({lang="fr",destination="all",hotelId=null,month="",travelers=2,duration="flexible",notes=""}={}, today=new Date()){
 if(!languages.has(lang))return null;
 if(destination!=="all"&&!regions.has(destination))return null;
 const count=Number(travelers);
 if(!Number.isInteger(count)||count<1||count>30)return null;
 if(month && !/^\d{4}-(0[1-9]|1[0-2])$/.test(month))return null;
 // The browser month input's min is advisory; validate drafts too.
 // Comparing normalized YYYY-MM values is safe even across year boundaries.
 const earliest=today.getFullYear()+"-"+String(today.getMonth()+1).padStart(2,"0");
 if(month && month<earliest)return null;
 const length=String(duration);
 if(!durations.has(length))return null;
 const property=hotelId?properties.get(hotelId):null;
 if(hotelId && (!property||property.region!==destination))return null;
 const t=key=>translation(lang,key);
 const region=regions.get(destination);
 const destinationName=region?region.label[lang]:t("allInquiryDestinations");
 return [
  "CUBARESORT.CA — "+t("dialogTitle"),
  t("formDestination")+": "+destinationName,
  ...(property?[t("formHotel")+": "+property.name]:[]),
  t("formMonth")+": "+(month||"-"),
  t("formTravelers")+": "+count,
  t("formDuration")+": "+(length==="flexible"?t("durationFlexible"):t("duration"+length)),
  t("formNotes")+": "+(String(notes).trim().slice(0,1000).replace(/\r/g,"") || "-"),
  "",
  t("dialogIntro")
 ].join("\n");
}

// An optional visible summary for a draft opened from a property card.
// The value is derived from the trusted local directory and never transmitted.
export function selectedHotelContext(lang,hotelId){
 const property=properties.get(hotelId);
 if(!property || !languages.has(lang))return "";
 return translation(lang,"formHotel")+": "+property.name;
}
