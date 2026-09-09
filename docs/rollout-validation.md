# Klinger — aktuální výsledek rollout validace

9. září 2026. Implementace a lokální validace dokončeny; preview a produkční validace čekají na publikaci správcem. Toto je aktuální report. [Původní inventura](frontend-optimization.md), [baseline](baseline.md) a [historie chyb testování](test-history.md) zůstávají zachovány.

Následná kontrola GitHubu po oznámení publikace větve zjistila, že vzdálená větev stále ukazuje na `393d5eebbfae3e16569600dc435df45bbf767e00` a je shodná s `main` (0 commitů navíc). Implementace je proto připravena k lokálnímu commitu; jeho push provede správce. Uživatel nově výslovně zadal vytvoření PR a testy preview, které budou následovat po zveřejnění změn. Starší údaje o necommitnutém pracovním stromu níže popisují stav při dokončení lokálních testů.

## Revize a rozsah

- Větev `codex/ruml-klinger-frontend-optimization`, základ `393d5ee`, bez upstreamu. Změny jsou v pracovním stromu, bez nových commitů. Před publikováním je nutné vlastní změny zkontrolovat a commitnout.
- Nebyl proveden push, PR, merge, deploy ani změna Netlify UI, WordPressu nebo sdíleného serveru. Reference Těsnění byla pouze čtena. Dodané zadání zůstalo beze změny.
- Node build: `42421d1e-123b-498a-b48c-686e9bac01d5`, Nitro `node-server`, 14:54:55 UTC.
- Netlify build: `4b6bce47-9a88-4fc5-80e9-6d80d91abe51`, Nitro `netlify`, `CONTEXT=deploy-preview`, 15:00:27 UTC. Jde o místní artefakt, nikoli Netlify deploy ID. Oba buildy vycházejí ze základu plus pracovních změn, ne z nového git commitu.
- Node 24.11.0, Yarn 3.5.1, Nuxt 3.21.11, Nitro 2.13.4. Přesné závislosti jsou v lockfilu. Nuxt 4 migrace neproběhla.

## Bod zadání → stav → důkaz → zbytek

| Bod | Stav | Konkrétní důkaz | Zbytek / ruční krok |
| --- | --- | --- | --- |
| 1. Rozsah a spolupráce | Splněno lokálně | Samostatná větev, zachované cizí soubory, sekvenční živé kontroly | Publikuje správce |
| 2. Inventura a reference | Ověřeno | Tabulka původních Klinger hodnot, veřejná CMS fixture; 73 CS kategorií, 57 přiřazených Klingeru; 146 sdílených produktů ve dvou stránkách | Netlify UI a vazba produkčního buildu na commit nejsou ověřeny |
| 3. Build a závislosti | Implementováno a ověřeno | Oba buildy prošly, typová kontrola prošla; stabilní moduly, lockfile, Node 24, Sass `@use` | UI build/publish/base directory potvrdit podle checklistu |
| 4. ISR, payload, jazyky, sitemap | Implementováno a ověřeno lokálně | 7 párů HTML + skutečný payload včetně `?_b=` má ISR 3000/durable bez Set-Cookie; obě hledání bez durable; sitemap CS 228 / EN 93 URL; produkční robots 200 v Node testu | Skutečný Durable hit, cold/warm stav a preview indexace na Netlify |
| 5. Dokumentová navigace a menu | Implementováno a ověřeno | Odkazy bez prefetch, lokalizace interních CMS URL; Enter/Space/Escape a skrytá navigace v integraci; SSR přepínač jazyka | Nepřeložený produkt přepíná do EN katalogu podle rozhodnutí uživatele; skutečné preview klikání |
| 6. Data, stránkování a obnova | Implementováno a ověřeno | Apollo odstraněno, sloučené dotazy, sdílená navigace; 27 unit testů včetně kurzorů/transportu; 6 scénářů chybějících payload dat; test 503 + retry; 1 request na next/previous | Dostupnost CMS při cold cache a chybách obnovy zůstává provozním rizikem |
| 7. CSS a stabilní řazení | Implementováno a ověřeno | Responzivita přes CSS, sdílené USP/companies styly; pořadí SSR/Chromium/Firefox v integraci; média na 390/1440 px bez overflow | Vizuální kontrola na reálném preview včetně mapy a videa |
| 8. Cookies a analytika | Implementováno a ověřeno lokálně | 19/19 scénářů nad sdíleným HTML; default denied, platnost volby, odvolání, jeden GTM loader, navigace; GTM/GA zachyceny | Skutečné tagy kontejneru kontroluje správce |
| 9. Startup JavaScript | Implementováno; část nerelevantní | Odstraněny Apollo, router/loading/resize a viewport větvení; vstupní JS menší; GSAP ani reCAPTCHA nebyly součástí původního řešení | Video záměrně zachováno, bez změny obchodního obsahu |
| 10. Fonty | Implementováno a ověřeno | Montserrat WOFF2 bez subsetu, pixelové/metrické testy; již existující Gotham WOFF2 porovnán; originály a licence zachovány | Žádná změna váhy nebo typu písma |
| 11. Média | Implementováno a ověřeno lokálně | Omezený Netlify image allowlist; server bez IPX/sharp; 8/8 návštěv skutečných médií přes místní IPX, 222 obrazových odpovědí; dekódování a fyzické rozlišení hero | Netlify Image CDN včetně cold variant, latencí, výřezů a request ID |
| 12. Konfigurace a formuláře | Implementováno; hodnoty potvrzeny | `.env.example`, Klinger CF7 866/865, GTM-PVPZKVF; formulářová pole a URL ověřena bez odeslání | Doručení formulářů a omezení mapového klíče kontroluje správce |
| 13. Provozní diagnostika | Dokumentováno; server mimo rozsah | Strukturované chyby dotazů, oddělená 503 / payload porucha / chyba obrázku; uchovaná historie prvních selhání | Žádné změny backendu, migrace ani automatický purge obrázků |
| 14. Měření | Částečně srovnatelné | Vlastní velikosti buildů/fontů a 6 finálních lokálních vzorků menu níže | Chybí párové produkční měření menu; úsporu času nevyvozujeme |
| 15. Testování | Lokální část prošla | 27 unit, 31 integračních, 19 cookie scénářů, 8 mediálních návštěv; dvě sitemap; Netlify handler | Preview a produkce zatím neotestovány. Aktivní Klinger kariérní detail v CMS chybí, test používá jasně označený syntetický detail |
| 16. Předání | Připraveno | Tento report + [konkrétní checklist správce](preview-checklist.md) | Commit/push správné větve, ověřit spouštěč preview, dodat jeho skutečnou adresu a revizi |

## Měření před / po

Velikosti kB/MB odpovídají výpisům buildu; u fontů jde o přesné byty souborů. Srovnání buildů je lokální na stejném Node/Yarn. Není to měření produkčního waterfallu ani součet všeho JS načteného návštěvníkem.

| Metrika | Před | Po | Podmínky a interpretace |
| --- | ---: | ---: | --- |
| Největší klientský JS chunk | 526,93 kB; gzip 173,72 kB | 342,68 kB; gzip 122,18 kB | Node build log, zmenšení přibližně 35 % / 30 % gzip |
| Node serverový výstup | 21,6 MB; gzip 8,89 MB | 24,5 MB; gzip 9,51 MB | Výstup se zvětšil; lokální IPX zahrnuje nativní závislosti |
| Nový Netlify serverový výstup | Neměřeno stejným adaptérem | 4,09 MB; gzip 1,05 MB | Jiný preset, bez IPX/sharp; nejde o přímo srovnatelnou úsporu proti Node |
| Montserrat regular | 394 140 B TTF | 124 452 B WOFF2 | Stejný obsah fontu, bez subsetu |
| Montserrat italic | 404 112 B TTF | 128 820 B WOFF2 | Stejný obsah fontu, bez subsetu |
| Gotham | 47 804 B TTF | 10 012 B WOFF2 | Již dodaná ekvivalentní varianta |
| Klientský GraphQL při zdravé hydrataci homepage | 1 v každé ze 2 produkčních návštěv | 0 v každém ze 6 lokálních vzorků | Odlišná prostředí; lokální integrace navíc ověřuje obsah i absenci refetchů |
| Vlastní payload při startupu | Srovnatelná metrika nezachycena | 1 v každém ze 6 vzorků | Legitimní hydration payload, nikoli prefetch |
| Média | Produkční waterfall a snímky uložené | 8/8 lokálních návštěv, 222 odpovědí obrázků | Rozdílný provider a rozsah; neuvádíme procentní úsporu přenosu |
| Čas do funkčního menu | Chybí párové 3+3 měření | CS medián 5375,5 ms; EN 4613,4 ms | Diagnostika s blokovanými médii, nikoli produkční čas ani před/po zrychlení |

Finální lokální menu: Chromium, 390×844, DPR1, CPU 4×, latence 150 ms, download 200 000 B/s, upload 93 750 B/s, cookies zamítnuty, browser cache vypnuta routingem, obrázky/video blokovány. Tap od viditelného tlačítka po 150 ms, potvrzené otevření a ukončení hydratace bez chyby. CS vzorky 5368,2 / 5375,5 / 5424,6 ms; EN 4613,4 / 4623,7 / 4611,8 ms. Nepředstíráme splnění produkčního měření s médii; zopakuje se na preview.

## Důkazy a omezení

Reprodukovatelné testy a veřejné fixture jsou v `tests/` a `scripts/`. Rozsáhlé logy, snímky a waterfall jsou lokální ignorované artefakty `output/`, nebudou automaticky součástí push:

- `baseline/`: původní build, HTTP sondy a snímky.
- `build-node-final.log`, `node-build-proof-final.json`, `typecheck-final.log`, `test-unit-final.log`, `test-integration-release.log`.
- `test-fixture-release.log`, `playwright/startup-fixture-final.json`, `playwright/local/results.json` a snímky skutečných médií.
- `build-netlify.log`, `netlify-build-proof-final.json`, `test-netlify-images.log`, `test-netlify-runtime.log`, `test-netlify-robots.log` (lokální preview robots HTTP 200 a `Disallow: /`).

Původní macOS problém s esbuild vyřešila čistá instalace; ochrana systému nebyla vypnuta. Node build stále vypisuje varování Nuxt Image o darwin-arm64 sharp, přestože skutečné lokální IPX průchody prošly. Netlify build sharp nepotřebuje. Oba buildy uvádějí zastaralá data caniuse-lite; varování nebyla potlačena. Jde o evidované limity, nikoli selhání těchto buildů.

TTL 3000 s negarantuje přesnou čerstvost. Při chybě obnovy může zůstat starý obsah; nepovinná hláška může být prázdná do úspěšné obnovy cache. Timeout povinných dat má dva pokusy po nejvýše 8 s s 200 ms pauzou; nedostupný backend tím neopravujeme. Skutečný kontejner GTM a doručování CF7 testy záměrně nespouštějí. CDN, Google Maps, identita produkčního buildu a Netlify UI vyžadují následnou kontrolu podle checklistu.
