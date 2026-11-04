// Single-process durable prototype store, outside the published static tree.
// Use a transactional DB + distributed locks before multi-replica deployment.
import {mkdir,readFile,writeFile,rename} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {randomUUID} from 'node:crypto';
export function createFileStore(directory){const dir=resolve(directory),locks=new Map();const path=id=>{if(!/^[a-f0-9-]{36}$/.test(id))throw new Error('invalid_id');return join(dir,id+'.json');};
 const save=async record=>{await mkdir(dir,{recursive:true,mode:0o700});const target=path(record.id),tmp=target+'.'+randomUUID()+'.tmp';await writeFile(tmp,JSON.stringify(record),{mode:0o600});await rename(tmp,target);};
 return {async get(id){try{return JSON.parse(await readFile(path(id),'utf8'));}catch(e){if(e.code==='ENOENT')return null;throw e;}},async insert(r){await mkdir(dir,{recursive:true,mode:0o700});await writeFile(path(r.id),JSON.stringify(r),{flag:'wx',mode:0o600});},replace:save,async withLock(id,fn){const previous=locks.get(id)||Promise.resolve();let release;const current=new Promise(r=>release=r);const tail=previous.then(()=>current);locks.set(id,tail);await previous;try{return await fn();}finally{release();if(locks.get(id)===tail)locks.delete(id);}}};
}
