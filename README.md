# Mediaera Srl — App Showroom

Vetrina delle applicazioni promosse da **Mediaera Srl**, sviluppate da Andrea Battellocchi.

**Sito:** https://showroom.pubblica.app

30 progetti, descrizioni estese, caratteristiche, link e 28 screenshot ingrandibili. Ricerca testuale, filtri per settore e ordinamento per nome o aggiornamento; layout responsive e catalogo leggibile anche senza JavaScript.

## Sviluppo

Il sito è statico e non richiede dipendenze npm, database o chiavi API.

```sh
node build.mjs
```

Aprire `dist/index.html` nel browser oppure servire `dist/` con un server statico. I testi sono in `projects.mjs`; `inventory.json` contiene i metadati dei progetti presentati, `screenshots.json` documenta le immagini. `dist/style.css` e `dist/app.js` gestiscono presentazione e interazioni.

`node bundle.mjs` produce una copia HTML autonoma nella cartella superiore, incorporando CSS, JavaScript e immagini.

## Distribuzione

Il Dockerfile serve esclusivamente `dist/` con Nginx sulla porta interna 80. Endpoint di controllo: `/health`. Su Coolify usare repository pubblico, branch `main`, build Dockerfile e dominio HTTPS; non servono variabili d’ambiente. Avviare il deploy dal pannello dopo il push.

## Fonti

Raccolta aggiornata al **18 ottobre 2026**, basata sui repository GitHub, sulla documentazione e sulle pagine dei prodotti. Le date indicano i commit rilevati oppure la verifica del progetto, non necessariamente il lancio. I collegamenti ai repository delle singole app possono richiedere autorizzazione. I progetti senza repository documentato non mostrano collegamenti GitHub.

Gli screenshot sono stati acquisiti il 3 e il 18 ottobre 2026 da pagine pubbliche, comprese alcune schermate di accesso, e dalle anteprime locali dei quattro moduli reCoding, esplicitamente indicate nelle didascalie. I siti promozionali delle app Android non sono screenshot dell’app installata. Nessun dato di aree riservate è incluso. OpenBWR e reCoding OS hanno una scheda senza screenshot.

Le aggiunte del 18 ottobre sono Studia, IAnt, DROVE, RoboSoccer, OpenBWR, Algoritmi, ASM 8086 IDE, Electronic Workbench e SortLab. Gli ultimi quattro hanno schede dedicate e collegamenti alle rispettive route di reCoding, che richiedono accesso alla piattaforma. BrosAI resta esclusa, come Yalper LiveReplay, Yalper Pro, Gixel e aiSisto.

La pubblicazione di questa vetrina non modifica la visibilità dei repository delle applicazioni presentate.

## Identità visiva

Tema coordinato con [mediaera.it](https://www.mediaera.it/): logo ufficiale su fondo antracite `#1c1c1c`, superfici bianche, accento oro `#d3a907`, titoli Roboto Slab e testo Roboto. Il colore `#806600` mantiene leggibili i testi color oro su fondo chiaro. Screenshot a colori, progetti numerati e layout responsive. Le animazioni rispettano `prefers-reduced-motion`.

Logo e icona originali sono conservati in `dist/assets/brand/`; provenienza in `dist/assets/brand/sources.json`. Font ospitati localmente con le rispettive licenze OFL (Roboto) e Apache 2.0 (Roboto Slab) in `dist/assets/fonts/`. Anche la copia autonoma incorpora loghi, icona e font: non richiede il sito Mediaera o Google Fonts per visualizzarli.

