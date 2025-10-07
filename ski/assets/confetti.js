(function(){
  const c=document.getElementById('confetti-canvas'); if(!c) return;
  const x=c.getContext('2d');
  function rs(){c.width=innerWidth;c.height=innerHeight} addEventListener('resize',rs); rs();
  const p=Array.from({length:140}).map(()=>({x:Math.random()*c.width,y:-20-Math.random()*c.height,s:5+Math.random()*8,r:Math.random()*Math.PI,v:1+Math.random()*3}));
  const col=['#ff1744','#00e5ff','#ffea00','#00e676','#ff6ec7','#651fff'];
  (function loop(){ x.clearRect(0,0,c.width,c.height);
    for(const a of p){ a.y+=a.v; a.r+=0.05; if(a.y>c.height+20){a.y=-20;a.x=Math.random()*c.width;}
      x.save(); x.translate(a.x,a.y); x.rotate(a.r); x.fillStyle=col[(Math.random()*col.length)|0]; x.fillRect(-a.s/2,-a.s/2,a.s,a.s); x.restore();
    } requestAnimationFrame(loop);
  })();
})();