(function(){
  const c=document.getElementById('snow-canvas'); if(!c) return;
  const ctx=c.getContext('2d'); function rs(){c.width=innerWidth;c.height=innerHeight} addEventListener('resize',rs); rs();
  const flakes=[]; for(let i=0;i<120;i++) flakes.push({x:Math.random()*c.width,y:Math.random()*-c.height,s:.5+Math.random()*1.5});
  const glyph='❄️'; ctx.font='24px system-ui, emoji';
  (function loop(){
    ctx.clearRect(0,0,c.width,c.height);
    for(const f of flakes){ f.y+=f.s; f.x+=Math.sin(f.y*0.02); if(f.y>c.height+10){f.y=-20;f.x=Math.random()*c.width;}
      ctx.globalAlpha=.95; ctx.fillText(glyph,f.x,f.y);
    } requestAnimationFrame(loop);
  })();
})();