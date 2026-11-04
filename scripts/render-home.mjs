import {readFile,writeFile} from 'node:fs/promises';
import {renderPremium,renderMarketplace,renderFood} from '../assets/premium-render.js';
const path=new URL('../index.html',import.meta.url);let html=await readFile(path,'utf8');
for(const [id,render] of [['premium',renderPremium],['marketplace',renderMarketplace],['food',renderFood]]){
 const start=`<div id="${id}-root">`,end=`<!-- END_${id.toUpperCase()} --></div>`;
 const from=html.indexOf(start),oldEnd=html.indexOf(end,from);
 if(from<0)throw new Error('Missing '+id);
 const finish=oldEnd>=0?oldEnd+end.length:html.indexOf('</div>',from)+6;
 html=html.slice(0,from)+start+render('fr')+end+html.slice(finish);
}
await writeFile(path,html);
