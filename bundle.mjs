import fs from 'node:fs';
let html=fs.readFileSync(new URL('dist/index.html',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('dist/style.css',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('dist/app.js',import.meta.url),'utf8');
html=html.replace('<link rel="stylesheet" href="style.css">',`<style>${css}</style>`).replace('<script src="app.js" defer></script>',`<script>document.addEventListener('DOMContentLoaded',()=>{\n${js}\n});</script>`);
const assets=[...new Set([...html.matchAll(/(?:src|href|data-screenshot)="(assets\/[^\"]+)"/g)].map(m=>m[1]))];
for(const asset of assets){const type=asset.endsWith('.webp')?'image/webp':'image/jpeg';const data=`data:${type};base64,${fs.readFileSync(new URL('dist/'+asset,import.meta.url)).toString('base64')}`;html=html.replaceAll(`"${asset}"`,`"${data}"`);}
fs.writeFileSync(new URL('../showroom.html',import.meta.url),html);
console.log('Standalone showroom.html generated with embedded images.');
