import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, relative, sep } from "node:path";
const root=resolve(import.meta.dirname,"..");
const port=Number(process.env.PORT || 4173);
const types={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".svg":"image/svg+xml",".xml":"application/xml; charset=utf-8",".txt":"text/plain; charset=utf-8"};
createServer(async(req,res)=>{
 try{
  if(req.method!=="GET"&&req.method!=="HEAD"){res.writeHead(405);res.end();return;}
  const uri=new URL(req.url,"http://localhost");
  const pathname=decodeURIComponent(uri.pathname);
  const file=resolve(root,"."+pathname,(pathname.endsWith("/")?"index.html":""));
  const rel=relative(root,file);
  if(rel===".."||rel.startsWith(".."+sep)||file===root||rel.startsWith(".git"+sep)||rel.startsWith("scripts"+sep)||rel.startsWith("tests"+sep)||rel.startsWith("docs"+sep)||rel==="package.json"){
    res.writeHead(403);res.end("Forbidden");return;
  }
  const metadata=await stat(file);
  if(!metadata.isFile()){res.writeHead(404);res.end("Not found");return;}
  res.writeHead(200,{"Content-Type":types[extname(file)]||"application/octet-stream","Cache-Control":"no-cache","X-Content-Type-Options":"nosniff"});
  if(req.method==="HEAD"){res.end();return;}
  res.end(await readFile(file));
 }catch{res.writeHead(404);res.end("Not found");}
}).listen(port,"127.0.0.1",()=>console.log("CUBARESORT.CA preview: http://127.0.0.1:"+port));