// Internal food/ride fulfilment transitions. Trusted actor claims must come from V1,
// never from submitted JSON. Operational prototype; no live dispatch is enabled.
import {ReservationError} from './reservations.mjs';
const modes=new Set(['taxi','classic','van','cocotaxi','bicitaxi','horse','shared','bus','boat']);
export function validateTransportRequest({mode,seats,shared}){return modes.has(mode)&&Number.isInteger(seats)&&seats>=1&&seats<=60&&typeof shared==='boolean';}
const steps={accept:{from:['requested'],to:'accepted',role:'merchant'},assign:{from:['accepted'],to:'assigned',role:'dispatcher'},pickup:{from:['assigned'],to:'picked_up',role:'driver'},deliver:{from:['picked_up'],to:'delivered',role:'driver'},cancel:{from:['requested','accepted','assigned'],to:'cancelled',role:'dispatcher'}};
export async function transitionFulfilment({record,actor,action,driverId,evidenceRef,store}){
 const fail=(code,status=409)=>{throw new ReservationError(code,status);};
 if(!actor?.active||actor.source!=='cubaresort'||actor.tenantId!==record.tenantId)fail('not_found',404);
 const step=steps[action];if(!step||!step.from.includes(record.status))fail('invalid_transition');
 if(!actor.roles?.includes(step.role))fail('forbidden',403);
 if(step.role==='merchant'&&actor.merchantId!==record.merchantId)fail('forbidden',403);
 if(step.role==='driver'&&actor.identityId!==record.driverId)fail('forbidden',403);
 if(action==='assign'&&(!driverId||!await store.isApprovedDriver(record.tenantId,driverId)))fail('driver_unverified',403);
 if(['pickup','deliver'].includes(action)&&(!evidenceRef||!await store.isOwnedEvidence(record.id,actor.identityId,evidenceRef)))fail('evidence_required',400);
 const next={...record,status:step.to,version:record.version+1};if(action==='assign')next.driverId=driverId;
 // The production adapter must atomically compare version and append audit/event outbox.
 const changed=await store.compareAndSet(record.id,record.version,next,{actorId:actor.identityId,action,evidenceRef:evidenceRef||null});if(!changed)fail('version_conflict');return next;
}
