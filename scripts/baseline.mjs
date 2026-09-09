import { chromium } from 'playwright'
import {mkdir,writeFile} from 'node:fs/promises'
const base='https://www.ruml-klinger.cz', results=[]
const browser=await chromium.launch()
await mkdir('output/baseline',{recursive:true})
try{
 for(const width of [1440,390]){
  const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1})
  await ctx.route('**/*',r=>/googletagmanager|google-analytics|analytics.google/.test(new URL(r.request().url()).hostname)?r.abort():r.continue())
  const page=await ctx.newPage(),requests=[],errors=[];let failed=false
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=500){failed=true;errors.push(`${r.status()} ${r.url()}`)}})
  page.on('requestfinished',async r=>{const res=await r.response();requests.push({url:r.url(),type:r.resourceType(),status:res.status(),timing:r.timing(),sizes:await r.sizes().catch(()=>null)})})
  const response=await page.goto(base,{waitUntil:'networkidle',timeout:60000})
  await writeFile(`output/baseline/home-${width}.html`,await response.text())
  await page.screenshot({path:`output/baseline/home-${width}.png`,fullPage:true})
  results.push({width,status:response.status(),requests,errors,title:await page.title()})
  await ctx.close();if(failed)throw Error('Zastaveno při 5xx; viz baseline.json')
 }
 for(const path of ['/robots.txt','/sitemap.xml']){
  const res=await fetch(base+path,{signal:AbortSignal.timeout(15000)});const body=await res.text();results.push({path,status:res.status,headers:Object.fromEntries(res.headers),body});if(res.status>=500)throw Error('Stop 5xx')
 }
}finally{await browser.close();await writeFile('output/baseline/baseline.json',JSON.stringify(results,null,2))}
