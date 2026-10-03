# Mediaera Srl — App Showroom

Vetrina delle applicazioni promosse da **Mediaera Srl**, sviluppate da Andrea Battellocchi.

**Sito:** https://showroom.pubblica.app

21 progetti, descrizioni estese, caratteristiche, link e 20 screenshot ingrandibili. Ricerca testuale, filtri per settore e ordinamento per nome o aggiornamento; layout responsive e catalogo leggibile anche senza JavaScript.

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

Raccolta riferita al periodo **20 maggio–3 ottobre 2026**, basata sui repository GitHub e sulla documentazione dei prodotti. Le date indicano l’attività di sviluppo, non necessariamente il lancio. I collegamenti ai repository delle singole app possono richiedere autorizzazione.

Gli screenshot sono stati acquisiti il 3 ottobre 2026 da pagine pubbliche, comprese alcune schermate di accesso. I siti promozionali delle app Android non sono screenshot dell’app installata. Nessun dato di aree riservate è incluso.

La pubblicazione di questa vetrina non modifica la visibilità dei repository delle applicazioni presentate.
