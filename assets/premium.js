import {premiumCopy} from './premium-copy.js';
import {premiumResorts,photos,savingsRange,validEvidence} from './premium-data.js';
import {renderPremium,renderFood,renderMarketplace,esc,profileBody} from './premium-render.js';
import {marketplace,marketplaceCopy} from './marketplace-data.js';
import {hotels,regionLabel} from './hotels.js';
let lang='fr',filter='all',query='',food='',amount='',evidence=null;
const chosen=new Set(),items=new Set();
const $=s=>document.querySelector(s);
const t=()=>({...premiumCopy[lang],...marketplaceCopy[lang]});
export function notebookText(){
 const labels=t();return ['CUBARESORT.CA — '+labels.plannerTitle,'',...Array.from(chosen).map(k=>'□ '+labels[k+'Label']),...Array.from(items).map(id=>{const x=marketplace.find(x=>x.id===id);return x?'□ '+x.name+' — '+x.place:'';}),food?'\n'+labels.foodLabel+':\n'+food:'','',labels.plannerText].filter(x=>x!==undefined).join('\n');
}
function updateNotebook(){
 $('#notebook-preview').textContent=notebookText();
 for(const b of document.querySelectorAll('[data-add-service]')){const yes=items.has(b.dataset.addService);b.textContent=yes?t().added:t().add;b.setAttribute('aria-pressed',String(yes));}
}
function marketFilter(){
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();let count=0;
 for(const card of document.querySelectorAll('[data-market-id]')){const x=marketplace.find(x=>x.id===card.dataset.marketId);const visible=(filter==='all'||x.type===filter)&&normalize(x.name+' '+x.place+' '+x.text[lang]).includes(normalize(query));card.hidden=!visible;if(visible)count++;}
 $('#market-count').textContent=count+' '+marketplaceCopy[lang].count;$('#market-empty').hidden=count>0;
 for(const b of document.querySelectorAll('[data-market-filter]'))b.setAttribute('aria-pressed',String(b.dataset.marketFilter===filter));
}
export function renderPremiumInterface(nextLang){
 lang=nextLang;
 const premium=$('#premium-root'),market=$('#marketplace-root'),foodRoot=$('#food-root');if(!premium||!market||!foodRoot)return;
 premium.innerHTML=renderPremium(lang);market.innerHTML=renderMarketplace(lang);foodRoot.innerHTML=renderFood(lang);
 for(const [k,v] of Object.entries(marketplaceCopy[lang]))if(k.endsWith('Label')){const el=premium.querySelector(`input[value="${k.slice(0,-5)}"]`);if(el)el.parentNode.lastChild.textContent=' '+v;}
 for(const input of document.querySelectorAll('#notebook-form input'))input.checked=chosen.has(input.value);
 $('#market-list').value=food;$('#comparison-amount').value=amount;
 // A language change clears file input state; release the in-memory file too.
 evidence=null;
 updateNotebook();marketFilter();
 for(const link of document.querySelectorAll('[data-premium-nav]')){link.textContent=t().nav;link.href='./guides/'+lang+'/cuba.html';}
}
function dialog(){return $('#premium-dialog');}
export function openProfile(id){
 const r=premiumResorts.find(x=>x.id===id),h=hotels.find(x=>x.id===id);if(!r&&!h)return;
 const body=$('#premium-dialog-body');
 body.innerHTML=r?profileBody(r,lang).replace('<h1>','<h2 id="premium-dialog-title">').replace('</h1>','</h2>'):`<p class="eyebrow">${esc(regionLabel(h.region,lang))} / ${esc(h.airport)}</p><h2 id="premium-dialog-title">${esc(h.name)}</h2><p>${t().pending}</p><a class="premium-link" href="#hotels" data-profile-close>${t().close}</a>`;
 if(h){const ask=document.createElement('button');ask.type='button';ask.className='button button-dark';ask.textContent=t().draft;ask.dataset.profileInquiry=h.id;body.append(ask);}
 $('#premium-dialog-close').textContent=t().close;
 if(!dialog().open)dialog().showModal();
 const url=new URL(location.href);url.searchParams.set('hotel',id);history.replaceState(null,'',url.pathname+url.search+url.hash);
}
export function initializePremium(){
 document.addEventListener('click',e=>{
  const profile=e.target.closest('[data-profile-id]');if(profile){e.preventDefault();openProfile(profile.dataset.profileId);return;}
  if(e.target.closest('#premium-dialog-close,[data-profile-close]')){e.preventDefault();dialog().close();return;}
  const ask=e.target.closest('[data-profile-inquiry]');if(ask){dialog().close();document.dispatchEvent(new CustomEvent('premium-inquiry',{detail:{id:ask.dataset.profileInquiry}}));return;}
  const f=e.target.closest('[data-market-filter]');if(f){filter=f.dataset.marketFilter;marketFilter();return;}
  const add=e.target.closest('[data-add-service]');if(add){const id=add.dataset.addService;if(items.has(id))items.delete(id);else items.add(id);updateNotebook();return;}
  if(e.target.closest('#clear-evidence')){evidence=null;$('#comparison-file').value='';$('#evidence-status').textContent='';$('#clear-evidence').hidden=true;}
  if(e.target.closest('#notebook-reset')){chosen.clear();items.clear();food='';$('#market-list').value='';for(const x of document.querySelectorAll('#notebook-form input'))x.checked=false;updateNotebook();}
 });
 document.addEventListener('input',e=>{if(e.target.id==='market-search'){query=e.target.value;marketFilter();}if(e.target.id==='comparison-amount')amount=e.target.value;if(e.target.id==='market-list')food=e.target.value;});
 document.addEventListener('change',e=>{
  if(e.target.matches('#notebook-form input')){if(e.target.checked)chosen.add(e.target.value);else chosen.delete(e.target.value);updateNotebook();}
  if(e.target.id==='comparison-file'){const file=e.target.files[0];evidence=validEvidence(file)?file:null;$('#evidence-status').textContent=evidence?t().fileGood:t().fileBad;$('#clear-evidence').hidden=!evidence;if(!evidence)e.target.value='';}
 });
 document.addEventListener('submit',async e=>{
  if(e.target.id==='price-match-form'){e.preventDefault();const range=savingsRange($('#comparison-amount').value);const fmt=n=>new Intl.NumberFormat(lang,{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);$('#comparison-output').textContent=range?t().estimate.replace('{saving}',fmt(range.maximum)).replace('{total}',fmt(range.minimum)):t().invalid;}
  if(e.target.id==='market-form'){e.preventDefault();food=$('#market-list').value.trim();if(food){chosen.add('food');const checkbox=$('#notebook-form input[value="food"]');checkbox.checked=true;updateNotebook();$('#market-status').textContent=t().foodAdded;}}
  if(e.target.id==='notebook-form'){e.preventDefault();if(!chosen.size&&!items.size&&!food){$('#notebook-status').textContent=t().noSelection;return;}try{await navigator.clipboard.writeText(notebookText());$('#notebook-status').textContent=t().copied;}catch{$('#notebook-status').textContent=t().copyFail;$('#notebook-preview').focus();}}
 });
 dialog().addEventListener('close',()=>{const url=new URL(location.href);url.searchParams.delete('hotel');history.replaceState(null,'',url.pathname+url.search+url.hash);});
 dialog().addEventListener('keydown',e=>{if(e.key!=='Tab')return;const list=Array.from(dialog().querySelectorAll('button,a[href]')).filter(el=>el.getClientRects().length);if(e.shiftKey&&document.activeElement===list[0]){e.preventDefault();list.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===list.at(-1)){e.preventDefault();list[0].focus();}});
 const selected=new URL(location.href).searchParams.get('hotel');if(selected)openProfile(selected);
}
