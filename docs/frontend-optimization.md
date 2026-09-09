# Klinger — rollout optimalizace, 9. září 2026

Aktuální výsledek: [implementace, validace a předání](rollout-validation.md). Následující tabulka zachovává stav při zahájení, nikoli seznam dosud nepotvrzených hodnot.

## Výchozí stav před implementací

Základ: `393d5ee`, lokální `main` shodný s lokálním `origin/main` (bez tvrzení o aktuálnosti vzdáleného serveru). Pracovní větev `codex/ruml-klinger-frontend-optimization` nemá upstream. Zadání `RUML-ROLLOUT-OPTIMIZATION-PROMPT.md` bylo při zahájení untracked; zůstává zachováno. Nebyly nalezeny další diskové AGENTS.md v projektu ani nadřazených adresářích; platí pokyny dodané v konverzaci.

| Hodnota | Repozitář / zdroj | Runtime / administrace před ověřením |
| --- | --- | --- |
| Web | https://www.ruml-klinger.cz, nuxt.config.ts | bude ověřen HTTP; Netlify UI neověřeno |
| CMS | https://ruml-api.mirandamedia.cz/graphql, nuxt.config.ts | vazby v administraci neověřeny |
| Jazyky | cs (default), en; detekce jazyka již vypnuta | nutná kontrola obou jazyků |
| Kategorie / kariéra | target / company `klinger`, stávající komponenty | nutná kontrola skutečných dat |
| Homepage CS / EN | 592 / 3837, pages/index.vue | historické přiřazení zachovat |
| O nás CS / EN | 602 / 3842, pages/o-nas.vue | historické přiřazení zachovat |
| Kontakty CS / EN | 604 / 3840, pages/kontakty.vue | historické přiřazení zachovat |
| Služby CS / EN | 598 / 3847, pages/sluzby/index.vue | služby mají vlastní detailovou routu |
| PF CS / EN | 4310 / 4312 | pages/pf.vue |
| Kalendáře CS / EN | 4314 / 4316 | pages/kalendare.vue |
| Hláška CS / EN | 4495 / 4496 | components/SiteMessage.vue |
| CF7 kontakt / kariéra | 866 / 865, příslušné formuláře | správce musí potvrdit vazbu na Klinger; neodesílat |
| GTM | GTM-PVPZKVF, nuxt.config.ts | kontejner/tagy v administraci neověřeny |
| Cookies | ncc_c / ncc_e, 30 dní, necessary + google-analytics | zachovat |
| Mapy | GOOGLE_MAPS_API | hodnota klíče se nezveřejňuje; omezení v administraci neověřena |
| Framework | nainstalovaný Nuxt 3.13.1; Yarn 3.5.1; Node 24.11.0 | žádný netlify.toml v projektu |
| ISR | 3600 s pouze CS routy; chybí EN, PF a kalendáře | nový adapter a payload nutno ověřit |
| Katalog | 15 produktů na stránku; služby, partneři i výrobci mají detail | rozhodnutí o omezení hledání z Těsnění neplatí |

Reference `../ruml-tesneni` na revizi `881d61b` je čtena pouze jako implementační vzor. Obsahuje cizí rozpracované reporty; nebudou upravovány ani vydávány za měření Klingeru. Bez push, PR, merge a deploye.

## Upřesnění po inventuře

Uživatel v této spolupráci potvrdil hodnoty formulářů 866/865 a GTM-PVPZKVF podle aktuálního kódu. Jejich změna není potřeba. Doručení formulářů se netestuje odesláním a chování skutečných GTM tagů zůstává oddělené od kontroly loaderu. [Výchozí měření a původní chyby](baseline.md).

## Provozní kompromisy

Povinné dotazy: 8 s na pokus, nejvýše jeden další pokus po 200 ms (až přibližně 16,2 s). Nepovinná hláška: 2 s na pokus, jeden retry, pak pravdivý payload `{siteMessage:null}`. Fallback se může držet v ISR cache do další úspěšné obnovy. TTL 3000 s je stale-while-revalidate, nikoli záruka aktualizace přesně v 50. minutě.

Cookie UI se vykreslí až po klientské hydrataci. Sdílené HTML obsahuje pouze jeho globální CSS; není v něm osobní rozhodnutí ani Set-Cookie. GTM se načte jednou jen při současně platném markeru souhlasu a povoleném `google-analytics`. Změna souhlasu už stažený GTM neodinstaluje; skutečné tagy se řídí kontejnerem.

Robots: doplněný runtime endpoint povoluje indexaci produkce a publikuje odkaz na sitemap. V Netlify buildu je indexace povolena pouze pro `CONTEXT=production`; deploy-preview/branch prostředí jsou zakázaná. Lokální build indexaci povoluje. Privátní `NUXT_INDEXABLE` může runtime hodnotu přepsat, proto tento override v preview nepovolovat omylem. Nastavení Netlify UI se tímto nezměnilo.

Image allowlist vzniká při buildu z API originu a povoluje jen `/wp-content/uploads/`. Runtime změna originu proto potřebuje nový build. Lokální IPX a Netlify Image CDN jsou odlišné implementace; lokální zelený test nedokazuje CDN latenci ani dostupnost. Originální média v CMS zůstávají beze změny; automatický purge po změně obsahu pod stejnou URL není zaveden.

## Přepínání jazyka detailů

Audit CMS potvrdil, že např. `klinger-folie-h` má slovenský, ale nemá anglický překlad. Uživatel výslovně zvolil přechod na anglický katalog, pokud překlad produktu chybí. Existující překlady partnerů/produktů/služeb a celé hierarchie kategorií se skládají z CMS slugů, nikdy překladem textu ani odhadem. Metadata překladů jsou součást stejného sdíleného navigačního dotazu (podmíněné aliasy jen na relevantním detailu); nevzniká další HTTP request. Datový klíč proto kromě projektu/jazyka zahrnuje i parametry výsledku. Stejná data stále sdílí header, sidebar i přehled jednoho dokumentu.
