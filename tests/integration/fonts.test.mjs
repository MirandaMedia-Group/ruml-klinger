import test from 'node:test'
import assert from 'node:assert/strict'
import {createServer} from 'node:http'
import {readFile,mkdir,writeFile} from 'node:fs/promises'
import {chromium} from 'playwright'
test('bezeztrátové fonty: stejné pixely, metriky, váhy i CZ/SK diakritika',{timeout:30000},async()=>{
 const server=createServer(async(req,res)=>{
  const name=req.url.slice(1)
  if(!/^(Montserrat-(regular|italic)|gotham)\.(ttf|woff2)$/.test(name)){res.writeHead(404).end();return}
  res.setHeader('Access-Control-Allow-Origin','*');res.end(await readFile(new URL('../../assets/fonts/'+name,import.meta.url)))
 });await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;const browser=await chromium.launch();
 try{for(const width of [390,700]){
 const images=[],measurements=[]
 for(const variant of ['before','after']){
 const page=await browser.newPage({viewport:{width,height:1100},deviceScaleFactor:1});const ext=variant==='before'?'ttf':'woff2';const format=ext==='ttf'?'truetype':'woff2';const descriptor=variant==='before'?'font-weight:300 400 700 800;':''
 const css=`@font-face{font-family:Montserrat;src:url(${base}/Montserrat-regular.${ext}) format('${format}');font-style:normal;${descriptor}}@font-face{font-family:Montserrat;src:url(${base}/Montserrat-italic.${ext}) format('${format}');font-style:italic;${descriptor}}@font-face{font-family:Gotham;src:url(${base}/gotham.${ext}) format('${format}');font-weight:700}body{margin:0;padding:16px;font-synthesis:none;color:#232f5d;background:white}div{font-size:20px;line-height:1.4;margin-bottom:8px}`
 let html='';for(const style of ['normal','italic'])for(const weight of [300,400,700,800])html+=`<div style="font-family:Montserrat;font-style:${style};font-weight:${weight}">${style} ${weight}: Příliš žluťoučký kůň. ČĎĚŇŘŠŤŮŽ ÄĹĽÔŔ 0123456789 €</div>`
 html+='<div style="font-family:Gotham;font-weight:700">Gotham: Příliš žluťoučký kůň. ČĎĚŇŘŠŤŮŽ 0123456789 €</div>'
 await page.setContent(`<style>${css}</style>${html}`);await page.evaluate(()=>document.fonts.ready);assert.equal(await page.evaluate(()=>[...document.fonts].every(f=>f.status==='loaded')),true)
 measurements.push(await page.locator('div').evaluateAll(nodes=>nodes.map(n=>({width:n.offsetWidth,height:n.offsetHeight}))));images.push(await page.screenshot({fullPage:true}));await page.close()
 }
 assert.deepEqual(measurements[0],measurements[1]);assert.deepEqual(images[0],images[1]);await mkdir('output/playwright/fonts',{recursive:true});await writeFile(`output/playwright/fonts/proof-${width}.png`,images[1])
 }}finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r))}
})
