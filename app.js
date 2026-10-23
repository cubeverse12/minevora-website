(() => {
 'use strict';
 const pages=['home','download','features','pvp','news','guide','pvpguide','help'];
 const titles={home:'ODKRYWAJ',download:'POBIERANIE',features:'FUNKCJE',pvp:'PVP HUD',news:'NOWOŚCI',guide:'PORADNIK',pvpguide:'PORADNIK PVP',help:'POMOC'};
 function openPage(page){
  if(!pages.includes(page))page='home';
  for(const id of pages){document.getElementById(id+'Screen').hidden=id!==page;}
  document.querySelectorAll('[data-link]').forEach(link=>{
   const active=link.dataset.link===page;link.classList.toggle('active',active);
   if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
  });
  document.getElementById('locationLabel').textContent=titles[page];
  document.getElementById('webStatus').textContent=page==='download'?'Pobieranie MINEVORA 18.3.2':page==='home'?'Strona gotowa do przeglądania':titles[page];
  window.scrollTo({top:0,behavior:'auto'});
 }
 document.addEventListener('click',event=>{
  const jump=event.target.closest('[data-guide-step]');
  if(!jump)return;
  event.preventDefault();
  const target=document.getElementById(jump.dataset.guideStep);
  if(!target)return;
  if(location.hash!=='#guide')location.hash='guide';
  openPage('guide');
  // Set scroll after the guide becomes visible.
  requestAnimationFrame(()=>target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}));
 });
 document.addEventListener('click',event=>{const jump=event.target.closest('[data-pvp-step]');if(!jump)return;event.preventDefault();const target=document.getElementById(jump.dataset.pvpStep);if(!target)return;if(location.hash!=='#pvpguide')location.hash='pvpguide';openPage('pvpguide');requestAnimationFrame(()=>target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}));});
 window.addEventListener('hashchange',()=>openPage(location.hash.slice(1)));
 openPage(location.hash.slice(1));
 document.getElementById('copyHash').addEventListener('click',async e=>{
  const hash=document.getElementById('releaseHash').textContent.trim();
  try{await navigator.clipboard.writeText(hash);e.currentTarget.textContent='Skopiowano!'}
  catch(err){e.currentTarget.textContent='Zaznacz kod powyżej';}
 });
})();
