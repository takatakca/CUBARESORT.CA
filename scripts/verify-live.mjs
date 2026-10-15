import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { releaseFilesFrom } from "./release-assets.mjs";

export async function verifyLive({url,sha,fetchImpl=fetch}){
 const base=new URL(url);
 if(base.protocol!=="https:" || base.username || base.password || base.search || base.hash)
  throw new Error("The live URL must use HTTPS without credentials, query or fragment");
 if(!/^[0-9a-f]{40}$/i.test(sha || ""))throw new Error("Expected SHA must be a full 40-character commit");
 if(!base.pathname.endsWith("/"))base.pathname+="/";
 async function read(path){
  const target=new URL(path,base);
  target.searchParams.set("release",sha);
  const response=await fetchImpl(target,{redirect:"manual",signal:AbortSignal.timeout(15000)});
  if(response.status!==200)throw new Error(`${path}: HTTP ${response.status}, expected 200`);
  return response;
 }
 const release=await (await read("release.json")).json();
 if(release.app!=="cubaresort" || release.sha!==sha)throw new Error("Public release does not match the expected commit");
 // A matching SHA in release.json alone does not prove the application files
 // belong to the same release. Check an allowlisted, complete manifest.
 const files=releaseFilesFrom(release.assets);
 for(const path of files){
  const response=await read(path==="index.html"?"./":path);
  const bytes=Buffer.from(await response.arrayBuffer());
  if(createHash("sha256").update(bytes).digest("hex")!==release.assets[path])
   throw new Error(`${path}: deployed content does not match release SHA-256`);
  if(path==="index.html"){
   const html=bytes.toString("utf8");
   if(!html.includes("CUBARESORT.CA"))
    throw new Error("The public homepage is not the CUBARESORT application");
   if(!html.includes("/_next/static/"))
    throw new Error("The homepage is missing its Next.js bundle");
   if(!html.includes("region-chip") || !html.includes("hotel-grid") || !html.includes("Varadero"))
    throw new Error("The public homepage is missing the rendered property directory");
  }
 }
 return {url:base.href,sha,checks:["exact commit","homepage","Next.js bundle","rendered property directory",`SHA-256 integrity for ${files.length} release files`]};
}

if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  const args=process.argv.slice(2);
  const options={};
  for(let i=0;i<args.length;i+=2){
   if(!["--url","--sha"].includes(args[i]) || !args[i+1])throw new Error("Usage: verify:live -- --url HTTPS_URL --sha SHA40");
   options[args[i].slice(2)]=args[i+1];
  }
  const result=await verifyLive(options);
  console.log(`PASS ${result.url} at ${result.sha}: ${result.checks.join(", ")}`);
 }catch(error){console.error(`FAIL CUBARESORT live verification: ${error.message}`);process.exitCode=1;}
}
