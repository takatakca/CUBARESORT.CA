import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

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
 const html=await (await read("./")).text();
 if(!html.includes("CUBARESORT.CA"))throw new Error("The public homepage is not the CUBARESORT application");
 // Next.js export markers: the framework bundle and the prerendered directory.
 if(!html.includes("/_next/static/"))throw new Error("The homepage is missing its Next.js bundle");
 if(!html.includes("region-chip") || !html.includes("hotel-grid"))throw new Error("The public homepage is missing the property directory");
 // A property name that must survive any build, proving real data shipped.
 if(!html.includes("Varadero"))throw new Error("The property directory rendered no regions");
 return {url:base.href,sha,checks:["exact commit","homepage","Next.js bundle","property directory","real data"]};
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
