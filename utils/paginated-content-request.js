import { contentPagination } from './content-pagination.js'

const assertConnection = (connection, label) => {
 if (!Array.isArray(connection?.nodes) || typeof connection.pageInfo?.hasNextPage !== 'boolean') throw new Error(`Invalid connection: ${label}`)
}

// Úplné kolekce i vnořené vazby produktů se načítají sekvenčně.
export const withContentPagination = request => async input => {
 const name = input.query.match(/query\s+(\w+)/)?.[1]
 const connections = contentPagination[name] || []
 const data = await request(input)
 if (!data) return data
 const result = structuredClone(data)
 for (const { root, cursor } of connections) {
  assertConnection(result[root], root)
  const seen = new Set()
  while (result[root].pageInfo.hasNextPage) {
   const after = result[root].pageInfo.endCursor
   if (!after || seen.has(after)) throw new Error(`Invalid pagination cursor: ${root}`)
   seen.add(after)
   const next = await request({ ...input, variables: { ...input.variables, [cursor]: after } })
   assertConnection(next?.[root], root)
   result[root].nodes.push(...next[root].nodes)
   result[root].pageInfo = next[root].pageInfo
  }
 }
 // Produkt může patřit do více kategorií než je limit první stránky.
 for (const connection of Object.values(result)) {
  for (const product of connection?.nodes || []) {
   if (!product.productCategories) continue
   assertConnection(product.productCategories, 'productCategories')
   const seen = new Set()
   while (product.productCategories.pageInfo.hasNextPage) {
    const after = product.productCategories.pageInfo.endCursor
    if (!product.id || !after || seen.has(after)) throw new Error('Invalid product category cursor')
    seen.add(after)
    const next = await request({ ...input, query: `query KlingerProductCategoriesPage($id: ID!, $after: String) {
     product(id: $id) { productCategories(first:100, after:$after) { nodes { slug } pageInfo { hasNextPage endCursor } } }
    }`, variables: { id: product.id, after } })
    assertConnection(next?.product?.productCategories, 'productCategories')
    product.productCategories.nodes.push(...next.product.productCategories.nodes)
    product.productCategories.pageInfo = next.product.productCategories.pageInfo
   }
  }
 }
 return result
}
