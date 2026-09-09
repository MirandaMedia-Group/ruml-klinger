const categoryOrder = category => {
 const order = category.productCategoriesAfc?.order
 return typeof order === 'number' && Number.isFinite(order) ? order : Infinity
}

export const compareProductCategoryOrder = (a, b) => {
 const first = categoryOrder(a), second = categoryOrder(b)
 // Shodné i chybějící pořadí musí vracet 0; jinak se výsledky liší mezi JS enginy.
 return first === second ? 0 : first < second ? -1 : 1
}

// Při shodě zachováme pořadí z CMS a neměníme sdílenou kolekci.
export const sortProductCategories = categories => [...categories].sort(compareProductCategoryOrder)
