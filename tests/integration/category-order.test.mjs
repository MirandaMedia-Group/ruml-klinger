import test,{before,after} from 'node:test'
import assert from 'node:assert/strict'
import {spawn} from 'node:child_process'
import {chromium,firefox} from 'playwright'
import {createFixture} from '../fixtures/server.mjs'
let fixture,server;const base='http://127.0.0.1:3108'
before(async()=>{
 fixture=await createFixture();fixture.state.mode='absent'
 server=spawn(process.execPath,['.output/server/index.mjs'],{env:{...process.env,PORT:'3108',HOST:'127.0.0.1',NUXT_PUBLIC_GRAPHQL_ENDPOINT:fixture.url},stdio:'ignore'})
 for(let i=0;i<100;i++){try{await fetch(base+'/_nuxt/builds/latest.json');return}catch{await new Promise(resolve=>setTimeout(resolve,100))}}
 throw Error('Local fixture server did not start')
})
after(async()=>{server?.kill();await fixture?.close()})
for(const engine of [chromium,firefox])for(const path of ['/katalog-produktu','/en/katalog-produktu'])test(`${engine.name()} ${path}: stejné pořadí SSR, hydratace a reloadu`,async()=>{
 const browser=await engine.launch(engine===firefox&&process.env.TEST_FIREFOX_EXECUTABLE?{executablePath:process.env.TEST_FIREFOX_EXECUTABLE}:{}),context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage(),errors=[]
 await context.route('**/*',route=>['image','media'].includes(route.request().resourceType())||/google-analytics|googletagmanager|google.com/.test(route.request().url())?route.abort():route.continue())
 page.on('pageerror',error=>errors.push(error.message));page.on('console',m=>{if(/hydration.*mismatch/i.test(m.text()))errors.push(m.text())})
 const snapshot=()=>page.evaluate(()=>Object.fromEntries(Object.entries({catalogue:'#content .subcategories a',header:'.megamenu .menu__level-2 > li > a',sidebar:'#sidebar .menu__level-1 > li > a'}).map(([key,selector])=>[key,[...document.querySelectorAll(selector)].map(a=>a.getAttribute('href'))])))
 let release;const gate=new Promise(resolve=>release=resolve);const hold=async route=>{await gate;await route.continue()}
 await page.route('**/_nuxt/*.js',hold)
 try{
  await page.goto(base+path,{waitUntil:'commit'});await page.locator('#content .subcategories a').first().waitFor({state:'attached'})
  const ssr=await snapshot();assert.ok(ssr.catalogue.length>0); assert.deepEqual(ssr.header,ssr.catalogue);assert.deepEqual(ssr.sidebar,ssr.catalogue)
  release();await page.waitForFunction(()=>{const n=document.querySelector('#__nuxt')?.__vue_app__?.$nuxt;return n?.isHydrating===false&&!n.payload.error})
  assert.deepEqual(await snapshot(),ssr);await page.unroute('**/_nuxt/*.js',hold)
  await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>document.querySelector('#__nuxt')?.__vue_app__?.$nuxt?.isHydrating===false)
  assert.deepEqual(await snapshot(),ssr);assert.deepEqual(errors,[])
 }finally{release();await browser.close()}
})
