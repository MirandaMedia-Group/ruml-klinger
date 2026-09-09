import { categoryPath } from './catalogue-paths.js'
import { withContentPagination } from './paginated-content-request.js'
export async function collectConnection(request, query, variables, field) {
 const nodes = [], seen = new Set()
 let after = null
 while (true) {
  const data = await request({query,variables:{...variables,after}}), connection = data?.[field]
  if (!Array.isArray(connection?.nodes) || typeof connection.pageInfo?.hasNextPage !== 'boolean') throw new Error(`Invalid sitemap connection: ${field}`)
  nodes.push(...connection.nodes)
  if (!connection.pageInfo.hasNextPage) return nodes
  after = connection.pageInfo.endCursor
  if (!after || seen.has(after)) throw new Error('Invalid sitemap cursor')
  seen.add(after)
 }
}
export const sitemapQueries = {
 categories: `query KlingerSitemapCategories($language:LanguageCodeFilterEnum!, $after:String) { productCategories(first:100,after:$after,where:{language:$language}) { nodes { slug parent { node { slug } } productCategoriesAfc { target } } pageInfo { hasNextPage endCursor } } }`,
 products: `query KlingerSitemapProducts($language:LanguageCodeFilterEnum!, $after:String) { products(first:100,after:$after,where:{language:$language}) { nodes { id slug productCategories(first:100) { nodes { slug } pageInfo { hasNextPage endCursor } } } pageInfo { hasNextPage endCursor } } }`,
 careers: `query KlingerSitemapCareers($language:LanguageCodeFilterEnum!, $after:String) { careers(first:100,after:$after,where:{language:$language}) { nodes { slug careerAcf { company } } pageInfo { hasNextPage endCursor } } }`,
 partners: `query KlingerSitemapPartners($language:LanguageCodeFilterEnum!, $after:String) { partners(first:100,after:$after,where:{language:$language}) { nodes { slug } pageInfo { hasNextPage endCursor } } }`,
 services: `query KlingerSitemapServices($language:LanguageCodeFilterEnum!, $parent:ID!, $after:String) { pages(first:100,after:$after,where:{language:$language,parent:$parent}) { nodes { slug } pageInfo { hasNextPage endCursor } } }`,
}
export async function getSitemapUrls(request) {
 const urls = []
 for (const language of ['CS','EN']) {
  const prefix = language === 'EN' ? '/en' : ''
  const categories = await collectConnection(request,sitemapQueries.categories,{language},'productCategories')
  const selected = new Set(categories.filter(c=>c.productCategoriesAfc?.target?.includes('klinger')).map(c=>c.slug))
  for (const slug of selected) urls.push({loc:prefix+categoryPath(categories,slug)})
  const products = await collectConnection(withContentPagination(request),sitemapQueries.products,{language},'products')
  for (const product of products) if(product.productCategories.nodes.some(c=>selected.has(c.slug))) urls.push({loc:`${prefix}/katalog-produktu/product/${product.slug}`})
  const careers = await collectConnection(request,sitemapQueries.careers,{language},'careers')
  for (const career of careers) if(career.careerAcf?.company==='klinger') urls.push({loc:`${prefix}/kariera/${career.slug}`})
  const partners = await collectConnection(request,sitemapQueries.partners,{language},'partners')
  for (const partner of partners) for(const route of ['/partneri/','/katalog-produktu/vyrobce/']) urls.push({loc:prefix+route+partner.slug})
  const services = await collectConnection(request,sitemapQueries.services,{language,parent:language==='EN'?'cG9zdDozODQ3':'cG9zdDo1OTg='},'pages')
  for(const service of services) urls.push({loc:`${prefix}/sluzby/${service.slug}`})
 }
 return urls
}
