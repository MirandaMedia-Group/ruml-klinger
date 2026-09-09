export default defineEventHandler(event => {
 const config = useRuntimeConfig(event)
 setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
 return config.indexable
  ? `User-agent: *\nAllow: /\nSitemap: ${config.public.siteUrl.replace(/\/+$/, '')}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n'
})
