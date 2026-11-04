// Composable API handler. No listening socket, auth bypass or live provider enabled by default.
import {ReservationError} from './reservations.mjs';
export function createApiHandler({service,authenticate,origin}){
 return async(req,res)=>{
  const send=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));};
  try{
   const url=new URL(req.url,'https://cubaresort.ca');
   if(url.pathname==='/api/cubaresort/capabilities'&&req.method==='GET')return send(200,{version:1,reservations:'requires_server_configuration',payments:false,ai:false});
   if(!url.pathname.startsWith('/api/cubaresort/reservations'))return send(404,{error:'not_found'});
   if(!service||!authenticate)return send(503,{error:'integration_unconfigured'});
   if(req.method!=='GET'&&req.headers.origin!==origin)return send(403,{error:'origin_rejected'});
   const actor=await authenticate(req);if(!actor)return send(401,{error:'unauthorized'});
   let body={};if(req.method!=='GET'){
    if(req.headers['content-type']?.split(';')[0]!=='application/json')return send(415,{error:'json_required'});
    let size=0;const chunks=[];for await(const chunk of req){size+=chunk.length;if(size>16384)return send(413,{error:'too_large'});chunks.push(chunk);}try{body=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{return send(400,{error:'invalid_json'});}
   }
   const match=url.pathname.match(/^\/api\/cubaresort\/reservations\/([a-f0-9-]{36})(?:\/(quote|confirm))?$/);
   if(req.method==='POST'&&url.pathname==='/api/cubaresort/reservations'){if(Object.keys(body).some(k=>k!=='items'))return send(400,{error:'invalid_fields'});return send(201,await service.create(actor,body));}
   if(!match)return send(404,{error:'not_found'});
   if(req.method==='GET'&&!match[2])return send(200,await service.get(actor,match[1]));
   if(req.method==='POST'&&match[2]==='quote')return send(200,await service.quote(actor,match[1]));
   if(req.method==='POST'&&match[2]==='confirm'){if(Object.keys(body).some(k=>!['quoteDigest'].includes(k)))return send(400,{error:'invalid_fields'});return send(200,await service.confirm(actor,match[1],{quoteDigest:body.quoteDigest,idempotencyKey:req.headers['idempotency-key']}));}
   return send(405,{error:'method_not_allowed'});
  }catch(e){return send(e instanceof ReservationError?e.status:500,{error:e instanceof ReservationError?e.code:'internal_error'});}
 };
}
