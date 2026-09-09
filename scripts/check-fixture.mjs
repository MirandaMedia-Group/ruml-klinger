// Jediný lokální server a sekvenční kontrolní příkazy, bez změn v CMS.
import {spawn} from 'node:child_process'
import {writeFile} from 'node:fs/promises'
import {createFixture} from '../tests/fixtures/server.mjs'
const scripts=process.argv.slice(2);if(!scripts.length)throw Error('Specify scripts to run')
const fixture=await createFixture();fixture.state.mode='absent'
const server=spawn(process.execPath,['.output/server/index.mjs'],{env:{...process.env,PORT:'3105',HOST:'127.0.0.1',NUXT_PUBLIC_GRAPHQL_ENDPOINT:fixture.url},stdio:'ignore'})
try{
 let ready=false;for(let i=0;i<100;i++){try{await fetch('http://127.0.0.1:3105/_nuxt/builds/latest.json');ready=true;break}catch{await new Promise(r=>setTimeout(r,100))}}if(!ready)throw Error('Fixture server did not start')
 for(const script of scripts){const exit=await new Promise(resolve=>{const task=spawn(process.execPath,['scripts/'+script+'.mjs'],{stdio:'inherit',env:process.env});task.on('exit',resolve);task.on('error',error=>{console.error(error);resolve(1)})});if(exit!==0)throw Error('Failed: '+script)}
}finally{server.kill();await fixture.close()}
