(() => {
  const $ = selector => document.querySelector(selector);
  const cards = [...document.querySelectorAll('.project')];
  const search = $('#search'), sort = $('#sort'), filters = [...document.querySelectorAll('.filter')];
  let category = 'Tutti';
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('it');
  function render() {
    const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    const ordered = [...cards].sort((a,b) => sort.value === 'name' ? a.dataset.name.localeCompare(b.dataset.name,'it') : sort.value === 'recent' ? b.dataset.date.localeCompare(a.dataset.date) : cards.indexOf(a)-cards.indexOf(b));
    let count=0;
    for(const card of ordered){card.hidden = !(category==='Tutti'||card.dataset.category===category) || !terms.every(t=>normalize(card.dataset.search).includes(t)); if(!card.hidden)count++; $('.project-grid').append(card);}
    $('#result-count').textContent=`${count} ${count===1?'progetto':'progetti'} su ${cards.length}`;
    $('.empty').hidden=count>0;
    filters.forEach(button=>{const active=button.dataset.filter===category;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
    return ordered.filter(card=>!card.hidden).map(card=>({name:card.dataset.name,category:card.dataset.category}));
  }
  search.addEventListener('input',render);sort.addEventListener('change',render);
  filters.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;render();}));
  $('#reset').addEventListener('click',()=>{category='Tutti';search.value='';sort.value='curated';render();search.focus();});
  document.addEventListener('keydown',event=>{if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(event.target.tagName)&&!event.target.isContentEditable){event.preventDefault();search.focus();}});
  // Deep links to projects also work after a filter has hidden the target.
  function revealHash(){if(!location.hash)return;const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target?.classList.contains('project')&&target.hidden){category='Tutti';search.value='';render();target.scrollIntoView();}}
  window.addEventListener('hashchange',revealHash);
  $('.controls').hidden=false;$('.filters').hidden=false;
  const dialog=$('#screenshot-dialog');
  let screenshotTrigger=null;
  document.querySelectorAll('[data-screenshot]').forEach(link=>link.addEventListener('click',event=>{
    if(typeof dialog.showModal!=='function')return;
    event.preventDefault();screenshotTrigger=link;
    $('#screenshot-title').textContent=link.dataset.title;
    $('#screenshot-caption').textContent=link.dataset.caption;
    $('#screenshot-full').src=link.dataset.screenshot;
    $('#screenshot-full').alt=`Screenshot di ${link.dataset.title}`;
    dialog.showModal();document.body.classList.add('modal-open');
  }));
  $('#close-screenshot').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');screenshotTrigger?.focus();});
  const context=document.modelContext;
  if(context?.registerTool){const lifecycle=new AbortController();window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});try{Promise.resolve(context.registerTool({name:'filter_projects',title:'Filtra i progetti',description:'Filtra il catalogo visibile per testo e categoria, restituendo i progetti corrispondenti.',inputSchema:{type:'object',properties:{query:{type:'string'},category:{type:'string',enum:filters.map(b=>b.dataset.filter)}},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['query','category'].includes(k))||(input.query!==undefined&&typeof input.query!=='string')||(input.category!==undefined&&!filters.some(b=>b.dataset.filter===input.category)))throw new Error('Filtro non valido');search.value=input.query??'';category=input.category??'Tutti';return {projects:render()};}},{signal:lifecycle.signal})).catch(()=>{});}catch{}}
})();
