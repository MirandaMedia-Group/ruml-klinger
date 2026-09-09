import {createServer} from 'node:http'
import {readFile} from 'node:fs/promises'
export async function createFixture() {
 const records=JSON.parse(await readFile(new URL('./content.json',import.meta.url),'utf8'))
 const routes=JSON.parse(await readFile(new URL('./routes.json',import.meta.url),'utf8'))
 const state={mode:'success',requests:[],unknown:[]}
 const find=(operation,variables)=>records.findLast(r=>r.query.match(/query\s+(\w+)/)?.[1]===operation && Object.entries(r.variables||{}).every(([k,v])=>JSON.stringify(v)===JSON.stringify(variables[k])) && Object.entries(variables).filter(([k])=>k.startsWith('_cursor_')).every(([k,v])=>JSON.stringify(v)===JSON.stringify(r.variables[k])))
 const api=createServer(async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Headers','content-type');res.setHeader('Content-Type','application/json')
  if(req.method==='OPTIONS'){res.end();return}
  if(req.url==='/health'){res.end('{}');return}
  let body='';for await(const part of req)body+=part
  let input;try{input=JSON.parse(body)}catch{res.writeHead(400).end();return}
  const {query,variables={}}=input,operation=query.match(/query\s+(\w+)/)?.[1];state.requests.push({operation,variables})
  const send=data=>res.end(JSON.stringify({data})),fail=message=>res.end(JSON.stringify({errors:[{message}]}))
  if(operation==='getKlingerMessage'){
   if(state.mode==='timeout')return
   if(state.mode==='message-error')return fail('Fixture message unavailable')
   return send({siteMessage:state.mode==='absent'?null:{siteMessageAcf:state.mode==='empty-acf'?null:{text:variables.localeID==='cG9zdDo0NDk2'?'English notice':'Česká hláška',bgColor:'#fff',textColor:'#232f5d'}}})
  }
  if(state.mode==='content-error')return fail('Fixture content unavailable')
  if(state.mode==='null'&&operation!=='getKlingerNavigation')return send({page:null})
  if(operation==='getCareerDetail'&&variables.slug==='fixture-job')return send({careers:{nodes:[{title:'Testovací pozice',slug:'fixture-job',content:'<p>Testovací pozice.</p>',excerpt:'Test',featuredImage:{node:null},careerAcf:{company:'klinger'}}]}})
  const language=variables.language==='EN'?'en':'cs'
  if(operation==='KlingerSearch'){
   const result={}
   for(const [alias,op,root]of [['rawProducts_products','searchProducts','products'],['rawCategories_productCategories','searchCategories','productCategories'],['searchServices_pages','searchServices','pages'],['searchPartners_partners','searchPartners','partners']]){
    const record=find(op,{language:variables.language,search:'klinger',...(op==='searchServices'?{localeID:variables.localeID}:{})})
    if(!record)return fail('Unknown search fixture '+op)
    result[alias]=structuredClone(record.body.data[root]);if(variables.search==='fixture-empty')result[alias].nodes=[]
   }
   return send(result)
  }
  if(operation.startsWith('KlingerSitemap')){
   const field={Categories:'productCategories',Products:'products',Careers:'careers',Partners:'partners',Services:'pages'}[operation.replace('KlingerSitemap','')]
   let nodes=[]
   if(field==='productCategories')nodes=find('getKlingerNavigation',{language:variables.language}).body.data.productCategories.nodes
   if(field==='products')nodes=records.filter(r=>r.query.includes('getProductByManufaturer')&&r.language===language).flatMap(r=>r.body.data.products.nodes)
   if(field==='partners')nodes=find('getPartnersKlinger',{language:variables.language}).body.data.partners.nodes
   if(field==='pages')nodes=find('getAllServicesKlinger',{localeID:variables.parent}).body.data.pages.nodes
   if(field==='careers')nodes=records.findLast(r=>r.language===language&&r.query.includes('KlingerPagesKarieraIndexVue')).body.data.careerList_careers.nodes
   return send({[field]:{nodes:[...new Map(nodes.map(n=>[n.slug,n])).values()],pageInfo:{hasNextPage:false,endCursor:null}}})
  }
  if(operation==='KlingerServices'){
   const services=find('getAllServicesKlinger',{localeID:variables.localeID})
   const home=records.findLast(r=>r.query.includes('KlingerPagesIndexVue')&&r.variables.hpBannerTop_localeID===variables.hpBannerTop_localeID)
   return send({...services.body.data,page:home.body.data.hpBannerTop_page})
  }
  const record=operation==='getProducts'&&state.mode==='pagination' ? records.findLast(r=>r.query.includes('query getProducts(')&&r.variables.slug?.[0]===variables.slug?.[0]&&r.body.data.productCategories.nodes.length) : find(operation,variables)
  if(!record){state.unknown.push(input);res.statusCode=500;return fail('Unknown fixture '+operation+' '+JSON.stringify(variables))}
  const data=structuredClone(record.body.data)
  if(operation==='getProducts'&&state.mode==='pagination'){
   const connection=data.productCategories.nodes[0].contentNodes
   const example=connection.nodes[0]
   connection.nodes=Array.from({length:variables.after?1:15},(_,i)=>({...example,title:variables.after?'Druhá strana':i?'Produkt '+i:'První strana'}))
   connection.pageInfo={hasNextPage:!variables.after,hasPreviousPage:!!variables.after,startCursor:'start',endCursor:'next'}
  }
  return send(data)
 })
 await new Promise(resolve=>api.listen(0,'127.0.0.1',resolve))
 return{state,routes,url:`http://127.0.0.1:${api.address().port}/graphql`,close:async()=>{api.closeAllConnections();await new Promise(resolve=>api.close(resolve))}}
}
