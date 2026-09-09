import { validateContentData } from '~/utils/validate-content-data'
import { withContentPagination } from '~/utils/paginated-content-request'
import { loadContentQuery } from '~/utils/load-content-query'
import { createContentQueryRequest } from '~/utils/content-query-request'

// Klíč obsahuje operaci, jazyk a všechny proměnné včetně kurzoru a hledání.
// Getter umožňuje skutečně nový požadavek při uživatelském stránkování.
export const useRequiredAsyncQuery = async (query, variables, options = {}) => {
 const config = useRuntimeConfig()
 const route = useRoute()
 const { locale } = useI18n()
 const label = query.match(/query\s+(\w+)/)?.[1] || 'content'
 const key = computed(() => `klinger:${label}:${locale.value}:${JSON.stringify(toValue(variables))}`)
 const validate = data => validateContentData(label, data) && (!options.validate || options.validate(data))
 const request = withContentPagination(createContentQueryRequest(config.public.graphqlEndpoint))
 const nuxtApp = useNuxtApp()
 // Při výpadku samostatného payloadu Nuxt odkládá klientský fetch až před mount.
 // Povinný obsah musí být dostupný už po await, jinak setup stránky čte null.
 const recoverMissingPayload = import.meta.client && nuxtApp.isHydrating
  && nuxtApp.payload.data[key.value] == null && !nuxtApp.payload._errors[key.value]
 const result = await useAsyncData(key, () => loadContentQuery({
  request, query, variables: toValue(variables), validate,
  onFailure: (error, attempt) => console.warn('[content-query:attempt-failed]', JSON.stringify({label, route: route.path, attempt: attempt + 1, error: {name: error.name, message: error.message}})),
 }), { immediate: !recoverMissingPayload, dedupe: 'defer' })
 if (recoverMissingPayload && result.data.value == null && !result.error.value) {
  await result.execute({ dedupe: 'defer' })
 }
 if (result.error.value || !validate(result.data.value)) {
  console.error('[content-query:failed]', JSON.stringify({label, route: route.path, error: {name: result.error.value?.name || 'RequiredContentDataError', message: result.error.value?.message || 'Missing required content'}}))
  throw createError({statusCode: 503, statusMessage: 'Content temporarily unavailable'})
 }
 return result
}
