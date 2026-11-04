// Server-only reservation orchestration. Never import this module into browser assets.
import {randomUUID,createHash} from 'node:crypto';
export class ReservationError extends Error{constructor(code,status=400){super(code);this.code=code;this.status=status;}}
const fail=(code,status)=>{throw new ReservationError(code,status);};
const kinds=new Set(['stay','car','bus','taxi','shared','activity','sim','esim','restaurant','grocery']);
export function validateItems(items){if(!Array.isArray(items)||!items.length||items.length>20)fail('invalid_items',400);return items.map(x=>{if(!x||!kinds.has(x.kind)||typeof x.productId!=='string'||!/^[a-zA-Z0-9._:-]{1,160}$/.test(x.productId)||!Number.isInteger(x.quantity)||x.quantity<1||x.quantity>20||Object.keys(x).some(k=>!['kind','productId','quantity'].includes(k)))fail('invalid_item',400);return {kind:x.kind,productId:x.productId,quantity:x.quantity};});}
export function assertActor(actor){if(!actor?.identityId||!actor?.tenantId||actor.source!=='cubaresort'||actor.active!==true||!actor.entitlements?.includes('cubaresort_customer'))fail('unauthorized',401);}
export function createReservationService({store,providers={},now=()=>Date.now()}){
 const own=async(actor,id)=>{assertActor(actor);const record=await store.get(id);if(!record||record.tenantId!==actor.tenantId||record.identityId!==actor.identityId)fail('not_found',404);return record;};
 return {
  async create(actor,input){assertActor(actor);const items=validateItems(input.items);const record={id:randomUUID(),tenantId:actor.tenantId,identityId:actor.identityId,items,status:'draft',createdAt:new Date(now()).toISOString(),version:1};await store.insert(record);return record;},
  get:own,
  async quote(actor,id){return store.withLock(id,async()=>{const record=await own(actor,id);if(!['draft','quoted'].includes(record.status))fail('invalid_state',409);
   // Resolve every provider before calls: unavailable services cannot produce fake quotes.
   for(const item of record.items)if(!providers[item.kind]?.quote)fail('provider_unconfigured',503);
   const quotes=[];for(const item of record.items){const q=await providers[item.kind].quote({...item,actor});if(!q||typeof q.id!=='string'||!Number.isSafeInteger(q.totalMinor)||q.totalMinor<0||!(/^[A-Z]{3}$/.test(q.currency))||!Number.isFinite(Date.parse(q.expiresAt))||Date.parse(q.expiresAt)<=now()||!q.cancellationTerms)fail('invalid_provider_quote',502);quotes.push({kind:item.kind,productId:item.productId,quantity:item.quantity,id:q.id,totalMinor:q.totalMinor,currency:q.currency,expiresAt:q.expiresAt,cancellationTerms:q.cancellationTerms});}
   if(new Set(quotes.map(q=>q.currency)).size!==1)fail('mixed_currency',409);
   const next={...record,status:'quoted',quotes,totalMinor:quotes.reduce((s,q)=>s+q.totalMinor,0),currency:quotes[0].currency,expiresAt:new Date(Math.min(...quotes.map(q=>Date.parse(q.expiresAt)))).toISOString(),version:record.version+1};next.quoteDigest=createHash('sha256').update(JSON.stringify({quotes,totalMinor:next.totalMinor,currency:next.currency})).digest('hex');await store.replace(next);return next;
  });},
  async confirm(actor,id,{quoteDigest,idempotencyKey}){if(typeof idempotencyKey!=='string'||!/^[a-zA-Z0-9_-]{16,128}$/.test(idempotencyKey))fail('invalid_idempotency_key',400);
   return store.withLock(id,async()=>{const r=await own(actor,id);if(r.idempotencyKey===idempotencyKey&&r.status==='confirmed'){if(r.quoteDigest!==quoteDigest)fail('idempotency_conflict',409);return r;}
    if(r.status!=='quoted'||r.quoteDigest!==quoteDigest)fail('quote_not_accepted',409);if(Date.parse(r.expiresAt)<=now())fail('quote_expired',409);
    for(const q of r.quotes)if(!providers[q.kind]?.reserve||!providers[q.kind]?.cancel)fail('provider_unconfigured',503);
    // Persist intent before side effects. A crash stays reconciling; never blindly retry a charge/booking.
    let next={...r,status:'reconciling',idempotencyKey,receipts:[],version:r.version+1};await store.replace(next);
    try{for(let i=0;i<r.quotes.length;i++){const q=r.quotes[i];const receipt=await providers[q.kind].reserve({quote:q,actor,idempotencyKey:idempotencyKey+'_'+i});if(receipt?.status!=='confirmed'||typeof receipt.reference!=='string'||!receipt.reference)fail('provider_not_confirmed',502);next.receipts.push({kind:q.kind,reference:receipt.reference});await store.replace(next);}
     next={...next,status:'confirmed',confirmedAt:new Date(now()).toISOString(),version:next.version+1};await store.replace(next);return next;
    }catch{let compensated=true;for(const receipt of [...next.receipts].reverse()){try{const result=await providers[receipt.kind].cancel({reference:receipt.reference,actor,idempotencyKey:idempotencyKey+'_cancel_'+receipt.reference});if(result?.status!=='cancelled')compensated=false;}catch{compensated=false;}}
     // Failed provider requests may have succeeded remotely. Always require reconciliation after uncertainty.
     next={...next,status:'reconciliation_required',compensationAttempted:true,knownReceiptsCompensated:compensated,version:next.version+1};await store.replace(next);fail('reconciliation_required',502);
    }
   });
  }
 };
}
