# Historie validačních kroků

Aktuální výsledek je v [závěrečném validačním reportu](rollout-validation.md).

Prvotní chyby se nepřepisují následným zeleným výsledkem. Podrobné výstupy jsou v ignorovaném `output/`.

| Krok | Původní výsledek | Oprava / navazující kontrola |
| --- | --- | --- |
| Výchozí build | Chybějící nativní Rollup; esbuild zablokovaný karanténou macOS | Čistá instalace dle původního lockfilu; baseline build prošel |
| Prohlížeč baseline | Sandbox zabránil startu | Běh se schváleným spuštěním prohlížeče dokončil dvě návštěvy |
| HTTP doplněk baseline | Chyba sondy `res.status()` u nativního fetch; následně DNS blokované sandboxem | Jen robots/sitemap zopakovány se správným API a povolenou sítí |
| Aktualizace balíčků | Síťový sandbox; následně vynucený immutable lockfile | Explicitní síťová instalace s povoleným zápisem nového lockfilu |
| První upravený build | Osamocené `v-else` po převodu responzivní varianty | Mobilní větev dostala CSS třídu; build prošel |
| První integrace | 21/23; Služby HTTP 500 kvůli chybějícím props banneru | Banner sloučen do dotazu služeb a předán props |
| Druhá integrace | 27/30; chyběl Firefox, sonda loga vybrala i odkaz v patičce | Nainstalován testovací Firefox, selektor omezen na header |
| Třetí integrace | 30/30 | Oba enginy, skutečné statické/dynamické routy fixture, payload poruchy, menu, hero, fonty, stránkování |
| Cookies | 17 scénářů prošlo, 2 navigační scénáře nedokončené kvůli timeoutu sondy | Explicitní desktop 1440×900; pouze dva nedokončené scénáře opakovány a prošly. Původní log uchován |
| Skutečná média na localhostu | 8/8 průchodů, 222 obrazových odpovědí, bez 5xx/pageerror | Zdroj veřejný CMS přes místní IPX. Nejde o Netlify CDN. Hero navíc dekódován na fyzické rozměry bitmapy |
| Finální regrese po jazykovém přepínači | 27/27 unit, 31/31 integračních, 19/19 cookie scénářů | Dvě jazykové sitemap a šest startup vzorků také prošly; výstupy `*-release.log` |
| Netlify sestavení a handler | Build prošel, image allowlist prošel, HTML/payload ISR, hledání, 404 a řízená 503 prošly | Lokální adaptér; skutečný deploy ani distribuovaná cache nebyly testovány |

Fixture obsahuje veřejný snímek cílového CMS, ne obsah jiného RUML webu. Poruchy s úmyslnou 503 se testují jen lokálně. Chybějící produkční kariérní nabídku zastupuje syntetický detail; není vydáván za existující nabídku.
