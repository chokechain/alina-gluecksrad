(function(){
  const sections=[...document.querySelectorAll('.section')];
  const dots=document.querySelectorAll('.nav-dots .dot');
  const confetti=document.getElementById('confetti-canvas');
  const snow=document.getElementById('snow-canvas');
  const music=document.getElementById('bgmusic');
  let i=0;

  function show(n){
    sections[i].classList.remove('active'); dots[i].classList.remove('active');
    i=Math.max(0,Math.min(sections.length-1,n));
    sections[i].classList.add('active'); dots[i].classList.add('active');
    window.scrollTo({top:0,behavior:'smooth'});
    const finale=sections[i].dataset.finale==='1';
    confetti.style.display=finale?'block':'none';
    snow.style.display=finale?'block':'none';
    if(finale) startMusic();
  }

  function startMusic(){
    if(!music || music.dataset.started==='1') return;
    music.dataset.started='1';
    music.volume=0;
    const p=music.play(); if(p&&p.catch) p.catch(()=>{});
    let v=0; const t=setInterval(()=>{ v+=0.06; if(v>=0.9){v=0.9;clearInterval(t);} music.volume=v; },180);
  }

  document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(i+1)));
  document.querySelectorAll('[data-prev]').forEach(b=>b.addEventListener('click',()=>show(i-1)));
  document.addEventListener('click',()=>startMusic(),{once:true});
  sections[0].classList.add('active'); dots[0].classList.add('active');
  if((location.hash||'').toLowerCase().includes('autoplay=1')) startMusic();
})();
document.addEventListener('DOMContentLoaded', () => {
  const bg = document.getElementById('bgmusic');
  if (!bg) return;

  const tryPlay = () => {
    try {
      bg.loop = true;
      bg.volume = 0.9;
      const p = bg.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) {}
  };

  // a) Sofort versuchen, wenn von der Startseite mit #autoplay=1 gekommen
  if (location.hash.includes('autoplay')) {
    setTimeout(tryPlay, 300);
  }

  // b) Sicher bei erstem Nutzer-Impuls starten (iOS/Chrome-Policy)
  ['click','touchstart','pointerdown','keydown'].forEach(ev => {
    window.addEventListener(ev, function onFirst() {
      tryPlay();
      window.removeEventListener(ev, onFirst, {capture:false});
    }, { once:true, passive:true });
  });

  // c) Extra-Fallback: wenn Tab wieder sichtbar wird
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && location.hash.includes('autoplay')) {
      tryPlay();
    }
  });

  // d) UI-Fallback: kleiner "Musik an"-Button, falls nach 2s noch pausiert
  setTimeout(() => {
    if (bg.paused) {
      const btn = document.createElement('button');
      btn.textContent = '🔊 Musik an';
      btn.style.cssText =
        'position:fixed;right:14px;bottom:14px;z-index:9999;padding:.55rem .8rem;' +
        'border-radius:12px;border:2px solid #000;background:#fff;box-shadow:2px 2px 0 #000;' +
        'font-weight:700;cursor:pointer';
      btn.addEventListener('click', () => { tryPlay(); btn.remove(); });
      document.body.appendChild(btn);
    }
  }, 2000);
});
