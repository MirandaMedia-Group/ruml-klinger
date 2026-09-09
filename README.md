# RUML Klinger frontend

Nuxt 3 SSR katalog pro [ruml-klinger.cz](https://www.ruml-klinger.cz), čeština a angličtina. Veřejný obsah pochází z WordPress GraphQL; [aktuální validační report](docs/rollout-validation.md) shrnuje změny, měření a zbývající kontroly. Projektové hodnoty jsou v [původní inventuře](docs/frontend-optimization.md).

## Lokální spuštění

Node 24 (`.nvmrc`), Yarn **3.5.1** (přiložená distribuce v `.yarn/releases`).

```sh
yarn install --immutable
cp .env.example .env
yarn dev
```

Existující `.env` nepřepisujte. Veřejné runtime proměnné nejsou úložiště tajemství. Mapový klíč omezte na povolené domény v jeho administraci. Hodnoty CF7 a GTM v `.env.example` byly uživatelem potvrzené podle původního Klinger kódu.

## Build a testy

```sh
NETLIFY=false NITRO_PRESET=node-server yarn build
yarn typecheck
yarn test:unit
yarn playwright install chromium firefox
yarn test:content
```

Integrační sada používá místní fixture veřejného Klinger obsahu v `tests/fixtures`, žádný živý CMS. Obsahuje i poruchy transportu/payloadu, řazení ve dvou enginech, nulové refetche zdravé hydratace, formuláře bez odeslání, hero rozlišení, fontové pixely a stránkování. Spouští se sekvenčně. Výchozí lokální porty testů jsou 3106 a 3108.

Další sekvenční kontroly včetně automatického spuštění a ukončení místního serveru:

```sh
BLOCK_MEDIA=1 node scripts/check-fixture.mjs check-cookie-consent check-sitemap measure-startup
```

`check-local-pages.mjs` čte reálná média z CMS přes lokální IPX a při chybě skončí neúspěšně. Spouštějte samostatně, žádnou další živou sadu ani build s CMS současně. Produkční formuláře neodesílat; testy zachycují GTM/GA. Ignorované důkazy a logy jsou v `output/`.

Pro Netlify adaptér:

```sh
NETLIFY=true CONTEXT=deploy-preview NITRO_PRESET=netlify yarn build
node scripts/check-netlify-image-config.mjs
node scripts/check-netlify-runtime.mjs
```

Build vytvoří vlastní Nitro SSR handler a `.netlify/deploy/v1/config.json`. Nedoplňovat ručně náhradní serverovou funkci. Po Netlify buildu obnovte Node build před běžnými integračními testy. Ověření handleru je lokální a nedokazuje distribuovaný Durable cache hit.

## Publikování

`netlify.toml`: `yarn build`, publish `dist`, Node 24, preset `netlify`. Produkce využívá ISR 3000 s pro veřejné CS/EN obsahové routy, hledání se necachuje. Sitemap načítá všechny kurzory a zahrnuje projektové kategorie, produkty, kariéru, služby, partnery a výrobce. Produkční robots povoluje indexaci; Netlify preview ji zakazuje (`CONTEXT`).

Push, merge a deploy provádí správce. Před publikováním ověřte nastavení cílového Netlify projektu a env proti `.env.example`. Poté je potřeba kontrola skutečné preview adresy, nové revize/build ID, HTML a payloadu s query a reálného Image CDN. URL preview se neodvozuje odhadem.

## Příprava fontů

Montserrat WOFF2 vzniká z existujících TTF bez subsetu. Příprava vyžaduje fontTools/Brotli pouze lokálně; běžný build je nepotřebuje.

```sh
python3 scripts/prepare-fonts.py --check
```

Gotham se nekonvertuje: používá se již dodaná a porovnaná WOFF2 varianta. Originální soubory a licence Montserratu zůstávají v `assets/fonts`.
