// london.js — mit Fußball-Extras (blinkende Lichter + ⚽-Regen)
(function () {
  const sections = Array.from(document.querySelectorAll('.section'));
  const dots = document.querySelectorAll('.nav-dots .dot');
  let idx = 0;

  // ----- Styles für Effekte (einmalig injizieren)
  const style = document.createElement('style');
  style.textContent = `
    @keyframes lights {
      0%,100% { filter: brightness(1) }
      50%     { filter: brightness(1.25) saturate(1.15) }
    }
    .blink-lights { animation: lights 1.2s ease-in-out infinite }
    #ball-rain {
      position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 6;
    }
    .ball {
      position: absolute; top: -10vh; font-size: 26px;
      filter: drop-shadow(2px 2px 0 #000); opacity: .95;
      animation: fall var(--dur) linear forwards;
      transform: translateY(-10vh) rotate(0deg);
    }
    @keyframes fall {
      to { transform: translateY(115vh) rotate(360deg); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Container für ⚽-Regen
  const ballLayer = document.createElement('div');
  ballLayer.id = 'ball-rain';
  document.body.appendChild(ballLayer);

  let ballTimer = null;

  function startBallRain() {
    if (ballTimer) return;
    ballTimer = setInterval(() => {
      const b = document.createElement('div');
      b.className = 'ball';
      b.textContent = '⚽';
      const x = Math.random() * 100;
      const dur = 4 + Math.random() * 3; // 4–7s
      b.style.left = x + 'vw';
      b.style.setProperty('--dur', dur + 's');
      b.style.fontSize = (22 + Math.random() * 18) + 'px';
      ballLayer.appendChild(b);
      setTimeout(() => b.remove(), (dur + 0.5) * 1000);
    }, 180); // Rate
  }
  function stopBallRain() {
    clearInterval(ballTimer);
    ballTimer = null;
    ballLayer.innerHTML = '';
  }

  function isFootballSection(s) {
    const title = s.querySelector('h2')?.textContent?.toLowerCase() || '';
    // greift bei "Fußball", "Fussball", "Premier-League"
    return title.includes('fußball') || title.includes('fussball') || title.includes('premier');
  }

  function updateEffects() {
    const confetti = document.getElementById('confetti-canvas');
    const finale = sections[idx].dataset.finale === '1';
    if (confetti) confetti.style.display = finale ? 'block' : 'none';

    const footballNow = isFootballSection(sections[idx]) || finale;
    document.body.classList.toggle('blink-lights', footballNow);
    if (footballNow) startBallRain(); else stopBallRain();
  }

  function show(i) {
    sections[idx].classList.remove('active'); dots[idx].classList.remove('active');
    idx = Math.max(0, Math.min(sections.length - 1, i));
    sections[idx].classList.add('active'); dots[idx].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateEffects();
  }

  document.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', () => show(idx + 1)));
  document.querySelectorAll('[data-prev]').forEach(b => b.addEventListener('click', () => show(idx - 1)));

  // Erste Section aktiv + Effekte initial setzen
  sections[0].classList.add('active'); dots[0].classList.add('active');
  updateEffects();

  // ----- Musik (wie gehabt) -----
  const hash = (location.hash || '').toLowerCase();
  const music = document.getElementById('bgmusic');
  function tryPlay() {
    if (!music) return;
    music.volume = 0;
    const p = music.play();
    if (p && p.catch) { p.catch(() => {}); }
    let v = 0;
    const t = setInterval(() => {
      v += 0.05;
      if (v >= 0.9) { v = 0.9; clearInterval(t); }
      music.volume = v;
    }, 200);
  }
  if (hash.includes('autoplay=1')) {
    tryPlay();
    document.addEventListener('click', () => { if (music.paused) tryPlay(); }, { once: true });
  } else {
    document.addEventListener('click', () => { if (music.paused) tryPlay(); }, { once: true });
  }
})();
