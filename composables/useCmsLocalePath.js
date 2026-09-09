export const useCmsLocalePath = () => {
 const localePath = useLocalePath()
 const siteUrl = useRuntimeConfig().public.siteUrl
 return (value) => {
  if (!value || /^(#|mailto:|tel:)/i.test(value)) return value
  try {
   const url = new URL(value, siteUrl)
   if (url.origin !== new URL(siteUrl).origin || /\.[a-z0-9]+$/i.test(url.pathname)) return value
   return localePath(url.pathname.replace(/^\/en(?=\/|$)/, '') || '/') + url.search + url.hash
  } catch { return value }
 }
}
