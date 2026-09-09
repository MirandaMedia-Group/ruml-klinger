import assert from 'node:assert/strict'
import {createFixture} from '../tests/fixtures/server.mjs'
const fixture=await createFixture();process.env.NUXT_PUBLIC_GRAPHQL_ENDPOINT=fixture.url;fixture.state.mode='absent'
try{
 const {default:handler}=await import('../.netlify/functions-internal/server/main.mjs')
 for(const path of ['/','/en','/pf','/en/pf','/katalog-produktu','/en/katalog-produktu','/katalog-produktu/product/'+fixture.routes.cs.product]){
  const response=await handler(new Request('https://klinger.test'+path));assert.equal(response.status,200,path)
  assert.match(response.headers.get('Netlify-CDN-Cache-Control'),/public, max-age=3000,.*durable/);assert.equal(response.headers.get('set-cookie'),null)
  const html=await response.text();assert.ok(!/class="[^"]*cookieControl/.test(html));assert.ok(!html.includes('_apollo:'))
  const payload=html.match(/(?:href|data-src)="([^"]*\/_payload\.json[^\"]*)"/)?.[1]
  assert.ok(payload,`Missing actual payload URL: ${path}`)
  const pr=await handler(new Request(new URL(payload.replaceAll('&amp;','&'),'https://klinger.test')))
  assert.equal(pr.status,200);assert.match(pr.headers.get('Netlify-CDN-Cache-Control'),/public, max-age=3000,.*durable/);assert.ok(Array.isArray(JSON.parse(await pr.text())));assert.equal(pr.headers.get('set-cookie'),null)
  console.log('PASS HTML + actual payload ISR',path,payload)
 }
 for(const path of ['/vyhledavani?search=klinger','/en/vyhledavani?search=klinger']){
  const response=await handler(new Request('https://klinger.test'+path));assert.equal(response.status,200);assert.ok(!/durable/.test(response.headers.get('Netlify-CDN-Cache-Control')||''));console.log('PASS uncached search',path)
 }
 for(const path of ['/kariera/fixture-missing','/katalog-produktu/product/fixture-missing','/katalog-produktu/fixture-missing']){assert.equal((await handler(new Request('https://klinger.test'+path))).status,404);console.log('PASS 404',path)}
 fixture.state.mode='content-error';fixture.state.requests=[];const fail=await handler(new Request('https://klinger.test/pf'));assert.equal(fail.status,503);assert.equal(fixture.state.requests.filter(r=>r.operation==='getKlingerPF').length,2);console.log('PASS 503 + retry')
}finally{await fixture.close()}
