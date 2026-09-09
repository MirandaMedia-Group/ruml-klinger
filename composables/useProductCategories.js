export const useProductCategories = () => {
 const { locale } = useI18n()
 const route = useRoute()
 const path = route.path.replace(/^\/en(?=\/|$)/, '')
 const detailSlug = typeof route.params.slug === 'string' ? route.params.slug : ''
 const query = `query getKlingerNavigation($language: LanguageCodeFilterEnum!, $_cursor_productCategories: String, $detailSlug: String!, $product: Boolean!, $partner: Boolean!, $service: Boolean!, $career: Boolean!) {
  productCategories(
    where: {language: $language}
    first: 100
    after: $_cursor_productCategories
  ) {
    nodes {
      name
      slug
      parent {
        node {
          slug
        }
      }
      productCategoriesAfc {
        target
        order
        menuImage {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      translations {
        slug
        language {
          code
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  currentProduct: products(first: 1, where: {name: $detailSlug}) @include(if: $product) {
    nodes {
      slug
      translations {
        slug
        language {
          code
        }
      }
    }
  }
  currentPartner: partners(first: 1, where: {name: $detailSlug}) @include(if: $partner) {
    nodes {
      slug
      translations {
        slug
        language {
          code
        }
      }
    }
  }
  currentService: pages(first: 1, where: {name: $detailSlug}) @include(if: $service) {
    nodes {
      slug
      translations {
        slug
        language {
          code
        }
      }
    }
  }
  currentCareer: careers(first: 1, where: {name: $detailSlug}) @include(if: $career) {
    nodes {
      slug
      translations {
        slug
        language {
          code
        }
      }
    }
  }
}`
 return useRequiredAsyncQuery(query, { language: locale.value.toUpperCase(), detailSlug, product: path.startsWith('/katalog-produktu/product/'), partner: path.startsWith('/partneri/') || path.startsWith('/katalog-produktu/vyrobce/'), service: path.startsWith('/sluzby/'), career: path.startsWith('/kariera/') })
}

export const useCategoryTree = (data) => computed(() => {
 const nodes = (data.value?.productCategories.nodes || []).map(item => ({ ...item, children: { nodes: [] } }))
 const bySlug = new Map(nodes.map(item => [item.slug, item]))
 const roots = []
 for (const node of nodes) {
  const parent = bySlug.get(node.parent?.node.slug)
  if (parent) parent.children.nodes.push(node)
  else roots.push(node)
 }
 return { productCategories: { nodes: roots } }
})
