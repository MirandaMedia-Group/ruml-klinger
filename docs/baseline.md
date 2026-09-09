# Výchozí kontrola Klingeru

9. 9. 2026, git `393d5ee`, lokální Node 24.11.0 / Yarn 3.5.1, instalovaný Nuxt 3.13.1.

- Původní instalace neobsahovala správný nativní Rollup a esbuild blokoval macOS kvůli `com.apple.quarantine` (`sharingd`). Čistá reinstalace podle původního lockfilu prošla. Ochrana macOS nebyla vypnuta; původní node_modules byly odloženy do `/private/tmp/ruml-klinger-node-modules-before-rollout-20260909`.
- Původní Node build prošel; serverový výstup 21,6 MB / 8,89 MB gzip podle Nuxt logu. První neúspěšné logy jsou zachovány v ignorovaném `output/baseline` a `/private/tmp/ruml-klinger-baseline-build.log`.
- Dvě sekvenční návštěvy produkční homepage: desktop 1440×900 / DPR1 a mobil 390×900 / DPR2, Chromium, bez umělého zpomalení, média povolena, GTM/GA zachyceny před načtením, browser cache vypnuta routingem. HTTP 200, 94 dokončených requestů v každé návštěvě, 1 klientský GraphQL, žádné zachycené 5xx ani pageerror. Celostránkové snímky a waterfall v `output/baseline`.
- První spuštění prohlížeče odmítl sandbox. Po povolení se skutečné dvě návštěvy dokončily; následnou část sondy robots/sitemap přerušila chyba sondy (záměna fetch `status` a Playwright `status()`). Opravená část se spustila samostatně, bez opakování prohlížečových návštěv.
- `/robots.txt`: historická HTTP 404. `/sitemap.xml`: HTTP 200, index odkazuje na CS a EN jazykový soubor. Samotný index nedokládá úplnost dynamických URL.
- Veřejné CMS: kategorie CS 73 celkem, Klinger má 57 přiřazených uzlů; pořadí je number/null. Sdílený CS seznam produktů má 146 položek ve dvou stránkách 100 + 46; filtrování Klingeru se provádí až nad kompletními vazbami. Úplnost neodvozujeme z limitu první stovky. V CMS nebyla nalezena aktivní kariérní položka `company: klinger`; devět sdílených CS nabídek patřilo Service. Služby a partneři mají skutečné samostatné detaily.

Čísla nejsou produkční SLA ani důkaz cold CDN. Netlify administrace, nasazená git revize a případné UI overrides nebyly předstírány jako ověřené. CF7 866/865 a GTM-PVPZKVF následně uživatel potvrdil jako správné podle současného kódu.
