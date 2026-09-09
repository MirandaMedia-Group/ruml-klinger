import { createContentQueryRequest } from '../../utils/content-query-request.js'
import { loadContentQuery } from '../../utils/load-content-query.js'
import { getSitemapUrls } from '../../utils/sitemap-content.js'
export default defineCachedEventHandler(async event => {
 const transport=createContentQueryRequest(useRuntimeConfig(event).public.graphqlEndpoint)
 try {
  return await getSitemapUrls(input=>loadContentQuery({request:transport,...input,validate:data=>!!data}))
 } catch {
  throw createError({statusCode:503,statusMessage:'Sitemap content unavailable'})
 }
}, {maxAge:3000, name:'klinger-sitemap'})
