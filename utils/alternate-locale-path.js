// Překlady pocházejí ze sdíleného navigačního dotazu, nevzniká další HTTP request.
export const alternateLocalePath = (path, language, data, defaultPath) => {
 const prefix = language === 'en' ? '/en' : ''
 const localPath = path.replace(/^\/en(?=\/|$)/, '')
 const translatedSlug = node => node?.translations?.find(t => t.language?.code?.toLowerCase() === language)?.slug
 const details = [
  ['/katalog-produktu/product/', 'currentProduct', '/katalog-produktu'],
  ['/katalog-produktu/vyrobce/', 'currentPartner', '/partneri'],
  ['/partneri/', 'currentPartner', '/partneri'],
  ['/sluzby/', 'currentService', '/sluzby'],
  ['/kariera/', 'currentCareer', '/kariera'],
 ]
 for (const [route, field, fallback] of details) {
  if (!localPath.startsWith(route)) continue
  const slug = translatedSlug(data[field]?.nodes[0])
  return slug ? prefix + route + slug : prefix + fallback
 }
 if (localPath.startsWith('/katalog-produktu/')) {
  const parts = localPath.slice('/katalog-produktu/'.length).split('/').filter(Boolean)
  const translated = parts.map(slug => translatedSlug(data.productCategories.nodes.find(c => c.slug === slug)))
  return prefix + '/katalog-produktu' + (translated.every(Boolean) ? '/' + translated.join('/') : '')
 }
 return defaultPath
}
