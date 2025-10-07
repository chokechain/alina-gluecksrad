
(function(){
  const sections = Array.from(document.querySelectorAll('.section'));
  const dots = document.querySelectorAll('.nav-dots .dot');
  let idx = 0;
  function show(i){
    sections[idx].classList.remove('active'); dots[idx].classList.remove('active');
    idx = Math.max(0, Math.min(sections.length-1, i));
    sections[idx].classList.add('active'); dots[idx].classList.add('active');
    window.scrollTo({top:0,behavior:'smooth'});
  }
  document.querySelectorAll('[data-next]').forEach(b=> b.addEventListener('click',()=>show(idx+1)));
  document.querySelectorAll('[data-prev]').forEach(b=> b.addEventListener('click',()=>show(idx-1)));
  sections[0].classList.add('active'); dots[0].classList.add('active');
})();
