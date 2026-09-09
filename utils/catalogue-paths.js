export const categoryBreadcrumbs = (category) => {
 const chain=[],seen=new Set()
 while(category && !seen.has(category.slug)) {
  seen.add(category.slug);chain.unshift(category);category=category.parent?.node
 }
 return chain.map((item,index)=>({name:item.name,url:'/katalog-produktu/'+chain.slice(0,index+1).map(item=>item.slug).join('/')}))
}

export const categoryPath = (categories, slug) => {
 const map = new Map(categories.map(category => [category.slug, category]))
 const parts = [], seen = new Set()
 let item = map.get(slug)
 while (item) {
  if (seen.has(item.slug)) throw new Error('Category cycle')
  seen.add(item.slug); parts.unshift(item.slug)
  const parent = item.parent?.node?.slug
  if (parent && !map.has(parent)) throw new Error('Missing category parent')
  item = map.get(parent)
 }
 return '/katalog-produktu/' + parts.join('/')
}
