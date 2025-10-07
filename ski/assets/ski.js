document.addEventListener('DOMContentLoaded', () => {
  const sections = [...document.querySelectorAll('.section')];
  const dots     = document.querySelectorAll('.nav-dots .dot');
  const confetti = document.getElementById('confetti-canvas');
  const snow     = document.getElementById('snow-canvas');
  const bg       = document.getElementById('bgmusic');

  // ---------- Musik-Setup (muted autoplay + Unmute bei erster Geste)
  const tryPlay = () => { try { const p = bg.play(); if (p && p.catch) p.catch(()=>{}); } catch {} };
  const unmute  = () => { try { bg.muted = false; bg.volume = 0.9; tryPlay(); } catch {} };

  if (bg) {
    bg.loop = true;
    bg.muted = true;     // erlaubt Autoplay
    bg.volume = 0.0;
    tryPlay();

    // Unmute bei erstem User-Impuls
    ['click','touchstart','pointerdown','keydown'].forEach(ev => {
      window.addEventListener(ev, function once() { unmute(); window.removeEventListener(ev, once, {capture:false}); }, { once:true, passive:true });
    });

    // Wenn vom Glücksrad mit #autoplay=1 gekommen → sofort entmuten
    if (location.hash.toLowerCase().includes('autoplay=1')) {
      setTimeout(unmute, 150);
    }

    // Falls Tab zurückkommt
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !bg.paused) tryPlay();
    });
  }
  // ---------- Schnitzeljagd-Logik
  let i = 0;
  function show(n){
    sections[i].classList.remove('active'); dots[i].classList.remove('active');
    i = Math.max(0, Math.min(sections.length - 1, n));
    sections[i].classList.add('active'); dots[i].classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
    const finale = sections[i].dataset.finale === '1';
    confetti.style.display = finale ? 'block' : 'none';
    snow.style.display     = finale ? 'block' : 'none';
    if (finale && bg) unmute(); // auf der Final-Seite Musik sicher an
  }

  document.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', () => show(i+1)));
  document.querySelectorAll('[data-prev]').forEach(b => b.addEventListener('click', () => show(i-1)));

  // Start
  sections[0]?.classList.add('active');
  dots[0]?.classList.add('active');

  // Fallback-Button, falls nach 2s noch stumm
  setTimeout(() => {
    if (bg && (bg.paused || bg.muted)) {
      const btn = document.createElement('button');
      btn.textContent = '🔊 Musik an';
      btn.style.cssText = 'position:fixed;right:14px;bottom:14px;z-index:9999;padding:.55rem .8rem;border-radius:12px;border:2px solid #000;background:#fff;box-shadow:2px 2px 0 #000;font-weight:700;cursor:pointer';
      btn.addEventListener('click', () => { unmute(); btn.remove(); });
      document.body.appendChild(btn);
    }
  }, 2000);
});
