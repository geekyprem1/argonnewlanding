// Integration checks for the playable showcase and standalone demo websites.
const fs=require('fs'),http=require('http'),path=require('path'),os=require('os'),assert=require('assert');
const {spawn}=require('child_process');
(async()=>{
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(e,data)=>{if(e){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2'})[path.extname(file)]||'application/octet-stream');res.end(data);});});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
const profile=fs.mkdtempSync(path.join(os.tmpdir(),'argon-demo-qa-'));
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{windowsHide:true,stdio:['ignore','ignore','pipe']});
let socket;
try{
const wsURL=await new Promise((resolve,reject)=>{let text='';const timer=setTimeout(()=>reject(Error('Chrome startup timeout')),15000);chrome.stderr.on('data',b=>{text+=b;const match=text.match(/DevTools listening on (ws:\/\/[^\s]+)/);if(match){clearTimeout(timer);resolve(match[1]);}});chrome.on('error',reject);});
socket=new WebSocket(wsURL);await new Promise((r,j)=>{socket.onopen=r;socket.onerror=j;});
let id=0;const pending=new Map();socket.onmessage=e=>{const data=JSON.parse(e.data);if(data.id){const p=pending.get(data.id);pending.delete(data.id);if(data.error)p.reject(Error(data.error.message));else p.resolve(data.result);}};
const send=(method,params={},sessionId)=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});socket.send(JSON.stringify({id:n,method,params,sessionId}));});
const {targetId}=await send('Target.createTarget',{url:'about:blank'});const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true});
const cdp=(method,params)=>send(method,params,sessionId);
const evaluate=async expression=>{const r=await cdp('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const navigate=async url=>{await cdp('Page.navigate',{url:base+url});for(let i=0;i<50;i++){await wait(100);if(await evaluate('document.readyState === "complete"'))return;}throw Error('Navigation timeout');};
const screenshot=async name=>{const r=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(profile,name),Buffer.from(r.data,'base64'));console.log('Screenshot: '+path.join(profile,name));};
await cdp('Page.enable');await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
// Test the actual games without loading unrelated third-party landing embeds.
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');const gameSection=html.slice(html.indexOf('<!-- PLAYABLE GAME EXAMPLES -->'),html.indexOf('<!-- ORIGINAL WEBSITE DEMOS -->'));
await cdp('Page.navigate',{url:base+'/demos/daybreak.html'});await wait(400);
await cdp('Page.setDocumentContent',{frameId:(await cdp('Page.getFrameTree')).frameTree.frame.id,html:'<html><head><link rel="stylesheet" href="/styles.css"></head><body>'+gameSection+'<script src="/demos/games.js"></script></body></html>'});await wait(600);
await evaluate('document.querySelectorAll(".reveal").forEach(e=>e.classList.add("is-in"))');
assert.equal(await evaluate('document.querySelectorAll("canvas").length'),3);
for(const game of ['flight','bricks','snake']){
await evaluate(`document.querySelector('[data-arcade="${game}"] [data-game-start]').click()`);
assert.equal(await evaluate(`document.querySelector('[data-arcade="${game}"] [data-game-status]').textContent`),'Playing');
await wait(game==='flight'?200:1150);
if(game!=='flight')assert(+await evaluate(`document.querySelector('[data-arcade="${game}"] [data-game-score]').textContent`)>0,game+' score did not increase');
await evaluate(`document.querySelector('[data-arcade="${game}"] [data-game-pause]').click()`);
assert.equal(await evaluate(`document.querySelector('[data-arcade="${game}"] [data-game-status]').textContent`),'Paused');
}
await screenshot('games-desktop.png');console.log('PASS games: all start/pause; bricks and snake score through actual game loops.');
await navigate('/demos/daybreak.html');
assert.equal(await evaluate('document.querySelectorAll("[data-category]").length'),6);
await evaluate('document.querySelector("[data-filter=coffee]").click()');assert.equal(await evaluate('[...document.querySelectorAll("[data-category]")].filter(e=>!e.hidden).length'),3);
await evaluate('document.querySelector("[data-add]").click()');assert((await evaluate('document.querySelector("[data-tray]").textContent')).includes('1 item'));
await evaluate('document.querySelector("[data-book]").click();document.querySelector("[name=name]").value="Demo Guest";document.querySelector("#booking-form").requestSubmit()');
assert((await evaluate('document.querySelector(".booking-result").textContent')).includes('Demo Guest'));await evaluate('document.querySelector("[data-close]").click()');
await screenshot('daybreak-desktop.png');console.log('PASS cafe: filter, tray total, validated reservation and demo confirmation.');
await navigate('/demos/form-audio.html');
await evaluate('document.querySelector("[data-finish=Cobalt]").click();document.querySelector("[data-add-bag]").click()');
assert.equal(await evaluate('document.querySelector("[data-total]").textContent'),'$137.00');assert((await evaluate('document.querySelector("[data-cart-items]").textContent')).includes('Cobalt'));
await evaluate('document.querySelectorAll(".audio-quantity button")[1].click()');assert.equal(await evaluate('document.querySelector("[data-total]").textContent'),'$258.00');
await evaluate('document.querySelector("[data-checkout]").click()');assert((await evaluate('document.querySelector("[data-checkout-message]").textContent')).includes('No order'));
await evaluate('document.querySelector("[data-cart-close]").click()');await screenshot('audio-desktop.png');
console.log('PASS store: variants, quantities, shipping threshold, totals and checkout preview.');
for(const width of [390,600]){await cdp('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:width===390});for(const url of ['/demos/daybreak.html','/demos/form-audio.html']){await navigate(url);assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),url+' overflows at '+width);if(width===390)await screenshot(url.includes('daybreak')?'daybreak-mobile.png':'audio-mobile.png');}}
console.log('PASS responsive: both websites fit mobile and embedded preview widths.');
}finally{if(socket)socket.close();chrome.kill();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
