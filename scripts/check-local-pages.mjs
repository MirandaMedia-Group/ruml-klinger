import assert from 'node:assert/strict'
import{chromium}from'playwright'
import{mkdir,writeFile,readFile}from'node:fs/promises'
const base='http://127.0.0.1:3105',browser=await chromium.launch(),results=[];await mkdir('output/playwright/local',{recursive:true})
try{for(const width of[390,1440])for(const path of['/','/en','/o-nas','/kontakty']){
 const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await ctx.route('**/*',r=>/googletagmanager|google-analytics|analytics.google/.test(new URL(r.request().url()).hostname)?r.abort():r.continue())
 const page=await ctx.newPage(),errors=[],images=[],jobs=[];let incident=false
 page.on('pageerror',e=>errors.push(e.message));page.on('response',res=>{if(res.status()>=500){incident=true;errors.push(`${res.status()} ${res.url()}`)}if(res.request().resourceType()==='image')jobs.push((async()=>{const body=await res.body().catch(()=>null);images.push({url:res.url(),status:res.status(),type:res.headers()['content-type'],bytes:body?.length,requestId:res.headers()['x-nf-request-id']||null})})())})
 try{const res=await page.goto(base+path,{waitUntil:'networkidle',timeout:60000});assert.equal(res.status(),200);await page.waitForFunction(()=>{const n=document.querySelector('#__nuxt')?.__vue_app__?.$nuxt;return n?.isHydrating===false&&!n.payload.error});if(incident)throw Error(errors.join('\n'))
 await page.locator('.cookieControl__Bar').getByRole('button',{name:path==='/en'?'Decline':'Zamítnout',exact:true}).click()
 for(const img of await page.locator('img').all()){if(await img.isVisible()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());if(incident)throw Error(errors.join('\n'))}}
 await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`output/playwright/local/${width}-${path.replace(/\W/g,'_')}.png`,fullPage:true});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
 const hero=await page.locator('.hero picture img').evaluateAll(imgs=>imgs.map(img=>({src:img.currentSrc,width:Number(img.getAttribute('width')),height:Number(img.getAttribute('height')),rectWidth:img.getBoundingClientRect().width})))
 for(const h of hero){const bitmap=await page.evaluate(async src=>{const response=await fetch(src),blob=await response.blob(),bitmap=await createImageBitmap(blob);return{width:bitmap.width,height:bitmap.height}},h.src);assert.ok(bitmap.width>=Math.min(h.width,h.rectWidth*(width===390?2:1)),JSON.stringify({h,bitmap}));h.bitmap=bitmap}
 await Promise.all(jobs);assert.deepEqual(errors,[]);results.push({path,width,images,hero,errors});console.log('PASS',width,path,images.length)
 }catch(error){results.push({path,width,images,errors,error:error.message});await page.screenshot({path:'output/playwright/local/failure.png',fullPage:true}).catch(()=>{});throw error}finally{await ctx.close()}
}}finally{await browser.close();await writeFile('output/playwright/local/results.json',JSON.stringify(results,null,2))}
