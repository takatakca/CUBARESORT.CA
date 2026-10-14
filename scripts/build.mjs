import { cp, copyFile, mkdir, readFile, rm, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root=resolve(import.meta.dirname,"..");
const output=join(root,"dist");
const entryFiles=["index.html","robots.txt","sitemap.xml",".nojekyll"];
const text=await readFile(join(root,"index.html"),"utf8");
for(const asset of ["./assets/app.js","./assets/styles.css","./assets/favicon.svg"]){
 if(!text.includes(asset))throw new Error("Missing document reference: "+asset);
}
if(!text.includes('<html lang="fr">'))throw new Error("Root document language is missing");
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
for(const name of entryFiles)await copyFile(join(root,name),join(output,name));
await cp(join(root,"assets"),join(output,"assets"),{recursive:true});
const assetStat=await stat(join(output,"assets/app.js"));
if(assetStat.size===0)throw new Error("Empty application bundle");
console.log("CUBARESORT.CA static website prepared in dist/");