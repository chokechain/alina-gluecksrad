
(function(){
  const sections = Array.from(document.querySelectorAll('.section'));
  const dots = document.querySelectorAll('.nav-dots .dot');
  let idx = 0;
  function show(i){
    sections[idx].classList.remove('active'); dots[idx].classList.remove('active');
    idx = Math.max(0, Math.min(sections.length-1, i));
    sections[idx].classList.add('active'); dots[idx].classList.add('active');
    window.scrollTo({top:0,behavior:'smooth'});
    if(sections[idx].dataset.finale === '1'){
      document.getElementById('confetti-canvas').style.display='block';
    } else {
      document.getElementById('confetti-canvas').style.display='none';
    }
  }
  document.querySelectorAll('[data-next]').forEach(b=> b.addEventListener('click',()=>show(idx+1)));
  document.querySelectorAll('[data-prev]').forEach(b=> b.addEventListener('click',()=>show(idx-1)));
  sections[0].classList.add('active'); dots[0].classList.add('active');

  const hash = (location.hash||'').toLowerCase();
  const music = document.getElementById('bgmusic');
  function tryPlay(){
    if(!music) return;
    music.volume = 0;
    const p = music.play();
    if(p && p.catch){ p.catch(()=>{}); }
    let v = 0; const t = setInterval(()=>{ v += 0.05; if(v>=0.9){ v=0.9; clearInterval(t);} music.volume = v; }, 200);
  }
  if(hash.includes('autoplay=1')){
    tryPlay();
    document.addEventListener('click', ()=>{ if(music.paused) tryPlay(); }, { once:true });
  } else {
    document.addEventListener('click', ()=>{ if(music.paused) tryPlay(); }, { once:true });
  }
})();
