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