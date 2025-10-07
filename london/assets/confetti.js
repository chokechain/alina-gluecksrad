
(function(){
  const canvas = document.getElementById('confetti-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width=innerWidth; canvas.height=innerHeight; }
  addEventListener('resize', resize); resize();
  const parts = Array.from({length:140}).map(()=>({x:Math.random()*canvas.width,y:-20-Math.random()*canvas.height,s:5+Math.random()*8,r:Math.random()*Math.PI,v:1+Math.random()*3}));
  const colors=['#ff1744','#00e5ff','#ffea00','#00e676','#ff6ec7','#651fff'];
  (function loop(){ ctx.clearRect(0,0,canvas.width,canvas.height);
    for(const p of parts){ p.y+=p.v; p.r+=0.05; if(p.y>canvas.height+20){p.y=-20;p.x=Math.random()*canvas.width;}
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r);
      ctx.fillStyle = colors[(Math.random()*colors.length)|0];
      ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s); ctx.restore();
    } requestAnimationFrame(loop);
  })();
})();
