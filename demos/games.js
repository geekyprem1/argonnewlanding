(() => {
  'use strict';
  const W = 360, H = 420;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  document.querySelectorAll('[data-arcade]').forEach((card) => {
    const type = card.dataset.arcade, canvas = card.querySelector('canvas'), ctx = canvas.getContext('2d');
    const start = card.querySelector('[data-game-start]'), pause = card.querySelector('[data-game-pause]');
    const status = card.querySelector('[data-game-status]'), scoreLabel = card.querySelector('[data-game-score]');
    let state, running = false, frame = 0, previous = 0, score = 0, ended = false, initialized = false;
    const scoreTo = n => { score = n; scoreLabel.textContent = String(n); };
    const stop = message => { running = false; cancelAnimationFrame(frame); pause.disabled = true; start.textContent = 'Play again'; status.textContent = message; ended = true; draw(); };
    const reset = () => {
      scoreTo(0); ended = false; initialized = true;
      if (type === 'flight') state = { y: 180, vy: 0, pipes: [], spawn: .7, time: 0 };
      if (type === 'bricks') state = { x: 180, y: 325, vx: 130, vy: -210, paddle: 180, bricks: Array.from({length: 30}, (_, i) => ({x: 17 + i % 6 * 55, y: 65 + Math.floor(i / 6) * 25, on: true})), left: false, right: false };
      if (type === 'snake') state = { body: [{x: 8,y: 10},{x:7,y:10},{x:6,y:10}], dir: {x:1,y:0}, next: {x:1,y:0}, elapsed: 0, turned: false, food: {x:13,y:10} };
    };
    const bg = () => {
      const g = ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,type === 'flight' ? '#153b63':'#0b1730'); g.addColorStop(1,'#071322'); ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
      ctx.strokeStyle = '#ffffff08'; ctx.lineWidth = 1;
      for (let x=0;x<W;x+=20) {ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for (let y=0;y<H;y+=20) {ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    };
    const draw = () => {
      bg();
      if (type === 'flight') {
        ctx.fillStyle = '#1ba693';
        for (const p of state.pipes) {ctx.fillRect(p.x,0,52,p.gap-75);ctx.fillRect(p.x,p.gap+75,52,H-p.gap-75);ctx.fillStyle='#63e3bc';ctx.fillRect(p.x-3,p.gap-83,58,8);ctx.fillRect(p.x-3,p.gap+75,58,8);ctx.fillStyle='#1ba693';}
        ctx.save();ctx.translate(86,state.y);ctx.rotate(clamp(state.vy / 650,-.45,.7));ctx.fillStyle='#ffcb45';ctx.beginPath();ctx.ellipse(0,0,16,13,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ff9c32';ctx.beginPath();ctx.ellipse(-7,4,9,5,-.3,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(7,-4,5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#10203b';ctx.beginPath();ctx.arc(9,-4,2,0,Math.PI*2);ctx.fill();ctx.fillStyle='#ff764c';ctx.beginPath();ctx.moveTo(14,0);ctx.lineTo(24,4);ctx.lineTo(14,7);ctx.fill();ctx.restore();
      } else if (type === 'bricks') {
        const colors=['#ff716e','#ffac5c','#ffdc6c','#67d8b9','#5ca8ff'];
        state.bricks.forEach((b,i)=>{if(!b.on)return;ctx.fillStyle=colors[Math.floor(i/6)];ctx.fillRect(b.x,b.y,49,17);});
        ctx.fillStyle='#d7f3ff';ctx.fillRect(state.paddle-37,385,74,9);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(state.x,state.y,7,0,Math.PI*2);ctx.fill();
      } else {
        ctx.fillStyle='#ff7379';ctx.beginPath();ctx.arc(state.food.x*20+10,state.food.y*20+10,7,0,Math.PI*2);ctx.fill();
        state.body.forEach((p,i)=>{ctx.fillStyle=i===0?'#d2ff7a':'#77b94b';ctx.fillRect(p.x*20+2,p.y*20+2,16,16);});
      }
      if (!running) {
        ctx.fillStyle='#06101cb5';ctx.fillRect(0,0,W,H);ctx.textAlign='center';ctx.fillStyle='#fff';ctx.font='700 23px Arial';ctx.fillText(ended?'Nice run!':initialized?'Paused':'Let\'s play',180,190);ctx.font='14px Arial';ctx.fillStyle='#c6d9ed';ctx.fillText(ended?'Press Play again for another round':initialized?'Press Resume to keep going':'Press Play to jump in',180,220);
      }
    };
    const update = dt => {
      if(type==='flight') {
        state.time+=dt;state.vy+=760*dt;state.y+=state.vy*dt;state.spawn-=dt;
        if(state.spawn<=0){state.pipes.push({x:W+10,gap:115+Math.random()*180,passed:false});state.spawn=1.65;}
        for(const p of state.pipes){p.x-=(140+Math.min(score*2,40))*dt;if(!p.passed&&p.x+52<70){p.passed=true;scoreTo(score+1);}if(102>p.x&&70<p.x+52&&(state.y-11<p.gap-75||state.y+11>p.gap+75)){stop('Game over. Score: '+score);return;}}
        state.pipes=state.pipes.filter(p=>p.x>-60);if(state.y<13||state.y>H-13)stop('Game over. Score: '+score);
      } else if(type==='bricks') {
        if(state.left)state.paddle-=320*dt;if(state.right)state.paddle+=320*dt;state.paddle=clamp(state.paddle,38,W-38);
        state.x+=state.vx*dt;state.y+=state.vy*dt;
        if(state.x<7){state.x=7;state.vx=Math.abs(state.vx);}if(state.x>W-7){state.x=W-7;state.vx=-Math.abs(state.vx);}if(state.y<7){state.y=7;state.vy=Math.abs(state.vy);}
        if(state.vy>0&&state.y+7>=385&&state.y-7<=394&&Math.abs(state.x-state.paddle)<43){state.y=377;state.vx=(state.x-state.paddle)*6;state.vy=-Math.sqrt(Math.max(20000,75000-state.vx*state.vx));}
        for(const b of state.bricks){if(b.on&&state.x+7>b.x&&state.x-7<b.x+49&&state.y+7>b.y&&state.y-7<b.y+17){b.on=false;state.vy*=-1;scoreTo(score+10);break;}}
        if(state.y>H+7)stop('Round over. Score: '+score);else if(state.bricks.every(b=>!b.on))stop('You cleared every brick! Score: '+score);
      } else {
        state.elapsed+=dt;if(state.elapsed<Math.max(.075,.16-score*.003))return;state.elapsed=0;state.dir=state.next;state.turned=false;
        const head={x:state.body[0].x+state.dir.x,y:state.body[0].y+state.dir.y};const eating=head.x===state.food.x&&head.y===state.food.y;
        const collisionBody=eating?state.body:state.body.slice(0,-1);
        if(head.x<0||head.x>=18||head.y<0||head.y>=21||collisionBody.some(p=>p.x===head.x&&p.y===head.y)){stop('Game over. Score: '+score);return;}
        state.body.unshift(head);if(!eating)state.body.pop();else{scoreTo(score+1);const free=[];for(let y=0;y<21;y++)for(let x=0;x<18;x++)if(!state.body.some(p=>p.x===x&&p.y===y))free.push({x,y});if(!free.length){stop('Perfect game!');return;}state.food=free[Math.floor(Math.random()*free.length)];}
      }
    };
    const loop = now => {if(!running)return;const dt=Math.min((now-previous)/1000,.025);previous=now;update(dt);if(running){draw();frame=requestAnimationFrame(loop);}};
    const begin = () => {if(running)return;if(!initialized||ended)reset();running=true;previous=performance.now();start.textContent='Restart';pause.disabled=false;status.textContent='Playing';canvas.focus({preventScroll:true});frame=requestAnimationFrame(loop);};
    const pauseGame = () => {if(!running)return;running=false;cancelAnimationFrame(frame);start.textContent='Resume';pause.disabled=true;state.left=false;state.right=false;status.textContent='Paused';draw();};
    const action = key => {
      if(!running)return;
      if(type==='flight'&&(key===' '||key==='ArrowUp'||key==='flap'))state.vy=-285;
      if(type==='snake') {const dirs={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}};const d=dirs[key];if(d&&!state.turned&&(d.x!==-state.dir.x||d.y!==-state.dir.y)){state.next=d;state.turned=true;}}
    };
    start.addEventListener('click',()=>{if(running){cancelAnimationFrame(frame);running=false;reset();}begin();});pause.addEventListener('click',pauseGame);
    canvas.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)){e.preventDefault();action(e.key);if(type==='bricks'){if(e.key==='ArrowLeft')state.left=true;if(e.key==='ArrowRight')state.right=true;}}if(e.key==='Escape')pauseGame();});
    canvas.addEventListener('keyup',e=>{if(e.key==='ArrowLeft')state.left=false;if(e.key==='ArrowRight')state.right=false;});canvas.addEventListener('blur',e=>{state.left=false;state.right=false;if(!card.contains(e.relatedTarget))pauseGame();});
    canvas.addEventListener('pointerdown',e=>{if(!running)return;canvas.focus({preventScroll:true});if(type==='flight')action('flap');if(type==='bricks'){canvas.setPointerCapture(e.pointerId);state.paddle=clamp((e.clientX-canvas.getBoundingClientRect().left)*W/canvas.getBoundingClientRect().width,38,W-38);}});
    canvas.addEventListener('pointermove',e=>{if(type==='bricks'&&running)state.paddle=clamp((e.clientX-canvas.getBoundingClientRect().left)*W/canvas.getBoundingClientRect().width,38,W-38);});
    card.querySelectorAll('[data-game-key]').forEach(button=>button.addEventListener('pointerdown',e=>{e.preventDefault();action(button.dataset.gameKey);}));
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseGame();});
    if('IntersectionObserver' in window)new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)pauseGame();},{threshold:.1}).observe(card);
    reset();initialized=false;draw();
  });
})();
