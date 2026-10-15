import { cp, copyFile, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";

const root=resolve(import.meta.dirname,"..");
const output=join(root,"dist");
const sha=(process.env.GITHUB_SHA || execFileSync("git",["rev-parse","HEAD"],{cwd:root,encoding:"utf8"})).trim();
if(!/^[0-9a-f]{40}$/i.test(sha))throw new Error("A full source commit is required to build a release");
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
await writeFile(join(output,"release.json"),JSON.stringify({app:"cubaresort",sha,builtAt:new Date().toISOString()})+"\n");
const assetStat=await stat(join(output,"assets/app.js"));
if(assetStat.size===0)throw new Error("Empty application bundle");
console.log("CUBARESORT.CA static website prepared in dist/");
