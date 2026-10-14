// Curated destination inspirations, NOT offers, inventory or verified resort listings.
// Do not add prices, hotel rankings or availability until an authorized provider supplies them.
export const destinations = [
 {id:"varadero", name:"Varadero", image:"photo-1507525428034-b723cf961d3e", text:{fr:"L'appel des grandes plages de sable blanc.",en:"The allure of long white-sand beaches.",es:"El encanto de extensas playas de arena blanca."}},
 {id:"cayo-coco", name:"Cayo Coco", image:"photo-1514282401047-d79a71a590e8", text:{fr:"Entre lagons et horizon turquoise.",en:"Lagoons and endless turquoise horizons.",es:"Lagunas y horizontes turquesas sin fin."}},
 {id:"havana", name:"La Havane / Havana", image:"photo-1500534623283-312aade485b7", text:{fr:"Une ville pleine de rythme et de couleurs.",en:"A city filled with rhythm and colour.",es:"Una ciudad llena de ritmo y color."}},
 {id:"cayo-santa-maria", name:"Cayo Santa María", image:"photo-1473116763249-2faaef81ccda", text:{fr:"Une parenthèse entre mer et tranquillité.",en:"A peaceful pause beside the sea.",es:"Una pausa tranquila junto al mar."}},
 {id:"holguin", name:"Holguín", image:"photo-1501785888041-af3ef285b470", text:{fr:"Côte, nature et découvertes.",en:"Coast, nature and discovery.",es:"Costa, naturaleza y descubrimientos."}},
 {id:"trinidad", name:"Trinidad", image:"photo-1469474968028-56623f02e42e", text:{fr:"Patrimoine, ruelles et paysages.",en:"Heritage, streets and landscapes.",es:"Patrimonio, calles y paisajes."}}
];
export const styles = ["beach","family","romance","culture","nature"];
export const experiences = [
 {id:"varadero-beach",destination:"varadero",style:"beach",image:"photo-1507525428034-b723cf961d3e",name:{fr:"La douceur de Varadero",en:"The gentle side of Varadero",es:"La calma de Varadero"},summary:{fr:"Le plaisir des grandes plages et des journées sans montre.",en:"Wide beaches and days without a clock.",es:"Grandes playas y días sin mirar el reloj."}},
 {id:"cayo-coco-family",destination:"cayo-coco",style:"family",image:"photo-1514282401047-d79a71a590e8",name:{fr:"Cayo Coco en famille",en:"Cayo Coco with family",es:"Cayo Coco en familia"},summary:{fr:"Du temps ensemble, entre sable fin et baignades.",en:"Quality time together, between sand and sea.",es:"Tiempo juntos, entre arena y mar."}},
 {id:"havana-culture",destination:"havana",style:"culture",image:"photo-1533104816931-20fa691ff6ca",name:{fr:"La Havane, passionnément",en:"Fall for Havana",es:"Enamórate de La Habana"},summary:{fr:"L'esprit des rues animées, de la musique et des rencontres.",en:"Lively streets, music and memorable encounters.",es:"Calles animadas, música y encuentros inolvidables."}},
 {id:"cayo-santa-maria-romance",destination:"cayo-santa-maria",style:"romance",image:"photo-1519046904884-53103b34b206",name:{fr:"Parenthèse à deux",en:"An escape for two",es:"Escapada para dos"},summary:{fr:"S'évader ensemble, au rythme paisible de la mer.",en:"Escape together at the peaceful pace of the sea.",es:"Escapen juntos al ritmo tranquilo del mar."}},
 {id:"holguin-nature",destination:"holguin",style:"nature",image:"photo-1501785888041-af3ef285b470",name:{fr:"Horizons de Holguín",en:"Holguín horizons",es:"Horizontes de Holguín"},summary:{fr:"La découverte d'une région entre verdure et littoral.",en:"Discover a region of lush landscapes and coastline.",es:"Descubre una región entre paisajes verdes y costa."}},
 {id:"trinidad-culture",destination:"trinidad",style:"culture",image:"photo-1469474968028-56623f02e42e",name:{fr:"Sur les traces de Trinidad",en:"Tracing Trinidad",es:"Tras las huellas de Trinidad"},summary:{fr:"Un voyage au rythme du patrimoine et des panoramas.",en:"Travel with heritage and sweeping views.",es:"Viaja entre patrimonio y grandes paisajes."}},
 {id:"varadero-romance",destination:"varadero",style:"romance",image:"photo-1473116763249-2faaef81ccda",name:{fr:"Soleil en duo",en:"Sunshine for two",es:"Sol para dos"},summary:{fr:"Une invitation à décrocher, en toute simplicité.",en:"A simple invitation to switch off together.",es:"Una invitación a desconectar en pareja."}},
 {id:"cayo-coco-beach",destination:"cayo-coco",style:"beach",image:"photo-1500375592092-40eb2168fd21",name:{fr:"À l'horizon, les cayos",en:"The cayos on the horizon",es:"Los cayos en el horizonte"},summary:{fr:"Le souffle du large et le bonheur de ralentir.",en:"Ocean breezes and the joy of slowing down.",es:"Brisa marina y el placer de ir sin prisa."}},
 {id:"holguin-family",destination:"holguin",style:"family",image:"photo-1497436072909-60f362e1d4b1",name:{fr:"Découvertes en famille",en:"Family discoveries",es:"Descubrimientos en familia"},summary:{fr:"Une aventure douce à partager entre petits et grands.",en:"A gentle adventure to share across generations.",es:"Una aventura para compartir entre generaciones."}}
];
export function imageUrl(id,width=1000){return "https://images.unsplash.com/"+id+"?auto=format&fit=crop&w="+width+"&q=80";}
export function catalogIsValid(){
 const ids=new Set(destinations.map(d=>d.id)),eids=new Set();
 return destinations.every(d=>d.id&&d.name&&d.image&&["fr","en","es"].every(l=>d.text[l]))
   && experiences.every(e=>{if(eids.has(e.id))return false;eids.add(e.id);return ids.has(e.destination)&&styles.includes(e.style)&&!!e.image&&["fr","en","es"].every(l=>e.name[l]&&e.summary[l]);});
}