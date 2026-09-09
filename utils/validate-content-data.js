// Konkrétní struktury jednotlivých operací doplňuje registr níže.
export const requiredStructures = {
 "KlingerServices": ["page.rumlKlingerHomepage.bannerTop"],
  "KlingerPagesIndexVue": [
    "homepageData_page.rumlKlingerHomepage.hero",
    "homepageData_page.rumlKlingerHomepage.aboutUs",
    "homepageData_page.rumlKlingerHomepage.career",
    "hpBannerTop_page.rumlKlingerHomepage.bannerTop"
  ],
  "KlingerPagesONasVue": [
    "onas_page.rumlKlingerOnas.hero",
    "onas_page.rumlKlingerOnas.owners",
    "usp_page.rumlKlingerOnas.secondBlock",
    "careerBanner_page.rumlKlingerHomepage.career",
    "pfData_page.pfCustom",
    "calendarData_page.pfCustom"
  ],
  "KlingerPagesKarieraIndexVue": [
    "usp_page.rumlKlingerOnas.secondBlock",
    "aboutUsBanner_page.rumlKlingerHomepage.aboutUs"
  ],
  "KlingerPagesKontaktyVue": [
    "kontakty_page.rumlKlingerKontakty",
    "certificates_page.rumlKlingerOnas"
  ],
  "getKlingerPF": [
    "page.pfCustom"
  ],
  "getKlingerCalendar": [
    "page.pfCustom"
  ]
}
export const validateContentData = (label, data) => {
 if (!data || !Object.keys(data).length || Object.values(data).some(value => !value || typeof value !== 'object' || ('nodes' in value && !Array.isArray(value.nodes)))) return false
 if (label === 'getProduct' && !data.products.nodes.every(node => node.productAcf?.baseParameters && node.productAcf?.customTable && Array.isArray(node.productCategories?.nodes))) return false
 return (requiredStructures[label] || []).every(path => path.split('.').reduce((value, field) => value?.[field], data) != null)
}
