import { createServer } from "node:http";
import { readFile, realpath, stat } from "node:fs/promises";
import { extname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { GUIDE_PATHS, renderGuidePage } from "./guide-pages.mjs";

const root=resolve(import.meta.dirname,"..");
const rootReal=await realpath(root);
const port=Number(process.env.PORT || 4173);
const types={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".xml":"application/xml; charset=utf-8",".txt":"text/plain; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".woff":"font/woff",".woff2":"font/woff2"};

// The preview server must never expose local .env, repository files or build scripts.
// Serve only the same static files that the production build makes public.
export function publicAssetPath(pathname){
 if(pathname==="/" || pathname==="/index.html")return "index.html";
 if(pathname==="/robots.txt")return "robots.txt";
 if(pathname==="/sitemap.xml")return "sitemap.xml";
 if(/^\/assets\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:js|css|svg|png|jpe?g|webp|woff2?)$/.test(pathname))return pathname.slice(1);
 return null;
}

export function createPreviewServer(){
 return createServer(async(req,res)=>{
  try{
   if(req.method!=="GET"&&req.method!=="HEAD"){res.writeHead(405);res.end();return;}
   const pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
   const guide=Object.entries(GUIDE_PATHS).find(([,route])=>"/"+route===pathname);
   if(guide){
    const content=renderGuidePage(guide[0]);
    res.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-cache","X-Content-Type-Options":"nosniff"});
    res.end(req.method==="HEAD"?"":content);
    return;
   }
   const rel=publicAssetPath(pathname);
   if(!rel){res.writeHead(403);res.end("Forbidden");return;}
   const file=resolve(root,rel);
   const actual=await realpath(file);
   const actualRel=relative(rootReal,actual).split(sep).join("/");
   // Reject symlink aliases even when their target remains under the repository.
   if(actualRel!==rel){res.writeHead(403);res.end("Forbidden");return;}
   const metadata=await stat(actual);
   if(!metadata.isFile()){res.writeHead(404);res.end("Not found");return;}
   res.writeHead(200,{"Content-Type":types[extname(actual)]||"application/octet-stream","Cache-Control":"no-cache","X-Content-Type-Options":"nosniff"});
   if(req.method==="HEAD"){res.end();return;}
   res.end(await readFile(actual));
  }catch{res.writeHead(404);res.end("Not found");}
 });
}

if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 createPreviewServer().listen(port,"127.0.0.1",()=>console.log("CUBARESORT.CA preview: http://127.0.0.1:"+port));
}