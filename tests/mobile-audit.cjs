// Audit real landing and funnel layouts in Chromium at phone and tablet widths.
const fs=require('fs'),path=require('path');
const source=fs.readFileSync(path.join(__dirname,'showcase.cjs'),'utf8');
const prefix=source.slice(0,source.indexOf('// Test the actual games'));
const audit=String.raw`
const pages=['index.html',...Array.from({length:10},(_,i)=>'oto'+(i+1)+'.html')];
const widths=[320,360,390,430,768];const report=[];const runtimeErrors=[];
await cdp('Runtime.enable');
for(const page of pages){
 await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await cdp('Emulation.setTouchEmulationEnabled',{enabled:true});
 await cdp('Page.navigate',{url:base+'/'+page});
 for(let i=0;i<40;i++){await wait(100);if(await evaluate('location.pathname==="/'+page+'" && document.readyState!=="loading"'))break;}
 await evaluate('Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,1200))])');
 await wait(650);
 await evaluate('document.querySelectorAll(".reveal").forEach(el=>el.classList.add("is-in"))');
 for(const width of widths){
  await cdp('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:true});await wait(250);
  const result=await evaluate('('+(()=>{
   const w=innerWidth;
   const name=el=>el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+(typeof el.className==='string'?'.'+el.className.trim().split(/\s+/).slice(0,3).join('.'):'');
   const clipped=el=>{for(let p=el.parentElement;p&&p!==document.body;p=p.parentElement){const s=getComputedStyle(p);if(/auto|scroll/.test(s.overflowX)&&p.scrollWidth>p.clientWidth)return true;}return false;};
   const outside=[...document.querySelectorAll('h1,h2,h3,p,a,button,table,iframe,canvas,ul,ol,article')].filter(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return !el.closest('.trustbar')&&r.width>0&&r.height>0&&s.visibility!=='hidden'&&(r.left< -2||r.right>w+2)&&!clipped(el);}).map(el=>({element:name(el),text:el.textContent.trim().slice(0,65),left:Math.round(el.getBoundingClientRect().left),right:Math.round(el.getBoundingClientRect().right)}));
   const smallButtons=[...document.querySelectorAll('.btn,.btn-forge,.arcade-card button')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&r.height<43;}).map(el=>({element:name(el),text:el.textContent.trim().slice(0,40),height:Math.round(el.getBoundingClientRect().height)}));
   const textOverflow=[...document.querySelectorAll('h1,h2,h3,p,.btn,.btn-forge')].filter(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return r.width>0&&r.height>0&&el.scrollWidth>el.clientWidth+3&&!el.querySelector('svg')&&s.overflowX==='visible'&&s.display!=='inline';}).map(el=>({element:name(el),text:el.textContent.trim().slice(0,55),width:el.clientWidth,scroll:el.scrollWidth}));
   return {viewport:w,documentWidth:document.documentElement.scrollWidth,outside,smallButtons,textOverflow,viewportMeta:document.querySelector('meta[name=viewport]')?.content,bodyHeight:document.body.scrollHeight};
  }).toString()+')()');
  report.push({page,width,...result});
 }
 if(page!=='index.html'){
  await cdp('Emulation.setDeviceMetricsOverride',{width:320,height:700,deviceScaleFactor:1,mobile:true});
  await evaluate('document.querySelector("[data-open-downsell], [data-decision-no], .oto-decline")?.click()');await wait(400);
  const modal=await evaluate('(()=>{const box=document.querySelector(".ds-modal__box"),close=document.querySelector(".ds-modal__close");const r=box.getBoundingClientRect();return {open:document.querySelector("#dsModal").classList.contains("is-open"),width:r.width,height:r.height,viewport:innerHeight,close:close.getBoundingClientRect().width};})()');
  assert(modal.open&&modal.width<=320&&modal.height<=modal.viewport&&modal.close>=44,page+' downsell modal does not fit: '+JSON.stringify(modal));
  await evaluate('document.querySelector(".ds-modal__close").click()');
  assert(!await evaluate('document.querySelector("#dsModal").classList.contains("is-open")'),page+' modal did not close');
 }
 console.log(page+': '+report.filter(x=>x.page===page).map(x=>x.width+'px '+(x.outside.length+x.textOverflow.length)+' issues').join(' | '));
 if(['index.html','oto1.html','oto10.html'].includes(page)){
  await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await evaluate('scrollTo(0,0)');await wait(200);await screenshot(page.replace('.html','')+'-hero-mobile.png');
  if(page==='index.html'){
   for(const [selector,file] of [['#s06','landing-primary-checkout.png'],['#offer-checkout','landing-final-checkout.png'],['#playable-games','landing-games-mobile.png']]){await evaluate('document.querySelector("'+selector+'").scrollIntoView({block:"start",behavior:"instant"})');await wait(250);await screenshot(file);}
   await evaluate('document.querySelector("#exit-offer").showModal()');await screenshot('landing-popup-mobile.png');await evaluate('document.querySelector("#exit-offer").close()');
  }
 }
}
fs.writeFileSync(path.join(profile,'mobile-report.json'),JSON.stringify(report,null,2));
console.log('REPORT: '+path.join(profile,'mobile-report.json'));
console.log('Summary: '+report.length+' viewport checks; '+report.filter(x=>x.outside.length||x.textOverflow.length||x.documentWidth>x.width+1).length+' layouts need attention.');
}finally{if(socket)socket.close();chrome.kill();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
`;
// Execute the shared CDP setup with the mobile-specific audit.
new Function('require','__dirname',prefix+audit)(require,__dirname);
