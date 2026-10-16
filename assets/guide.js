// Progressive enhancement for the editorial guide. No third-party calls or personal data.
const topicsEl=document.getElementById("guide-topic-data");
const labelsEl=document.getElementById("guide-label-data");
const topics=JSON.parse(topicsEl?.textContent||"[]");
const labels=JSON.parse(labelsEl?.textContent||"{}");
const byId=new Map(topics.map(topic=>[topic.id,topic]));
const cards=Array.from(document.querySelectorAll(".guide-card[data-kind]"));
const count=document.getElementById("guide-count");
const modal=document.getElementById("guide-dialog");
const partnerModal=document.getElementById("partner-dialog");
function applyFilter(filter){
 const matches=cards.filter(card=>filter==="all"||card.dataset.kind===filter);
 for(const card of cards)card.hidden=!matches.includes(card);
 for(const button of document.querySelectorAll("[data-guide-filter]")){
  button.setAttribute("aria-pressed",String(button.dataset.guideFilter===filter));
 }
 if(count)count.textContent=matches.length+" "+(labels.count||"");
}
for(const button of document.querySelectorAll("[data-guide-filter]")){
 button.addEventListener("click",()=>applyFilter(button.dataset.guideFilter));
}
for(const button of document.querySelectorAll("[data-guide-open]")){
 button.addEventListener("click",()=>{
  const item=byId.get(button.dataset.guideOpen);
  if(!item||!modal)return;
  document.getElementById("guide-dialog-title").textContent=item.title;
  document.getElementById("guide-dialog-intro").textContent=item.intro;
  document.getElementById("guide-dialog-tip").textContent=item.tip;
  const source=document.getElementById("guide-dialog-source");
  // An original editorial idea is not evidence of a currently bookable product.
  source.hidden=!item.source;
  if(item.source){
   const url=new URL(item.source);
   if(url.protocol!=="https:"||url.username||url.password)return;
   source.href=url.href;
  }
  modal.showModal();
 });
}
document.getElementById("partner-info")?.addEventListener("click",()=>partnerModal?.showModal());
for(const dialog of document.querySelectorAll("dialog.guide-dialog")){
 dialog.addEventListener("click",event=>{
  if(event.target===dialog)dialog.close();
 });
 dialog.querySelector("[data-dialog-close]")?.addEventListener("click",()=>dialog.close());
}
applyFilter("all");
