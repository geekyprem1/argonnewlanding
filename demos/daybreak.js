(() => {
  'use strict';
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  let count = 0, total = 0;
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => {
    $$('[data-filter]').forEach(b => {const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
    $$('[data-category]').forEach(item=>{item.hidden=button.dataset.filter!=='all'&&item.dataset.category!==button.dataset.filter;});
  }));
  $$('[data-add]').forEach(button=>button.addEventListener('click',()=>{
    count++;total+=Number(button.dataset.add);
    $('[data-tray]').textContent=`Your tray: ${count} ${count===1?'item':'items'}`;
    $('[data-tray-detail]').textContent=`A lovely choice. Your demo tray totals $${total.toFixed(2)}. No order has been placed.`;
    $('[data-reset-tray]').hidden=false;
  }));
  $('[data-reset-tray]').addEventListener('click',()=>{count=0;total=0;$('[data-tray]').textContent='Your tray: 0 items';$('[data-tray-detail]').textContent='Fresh start. What looks good?';$('[data-reset-tray]').hidden=true;});
  const dialog=$('#booking'), form=$('#booking-form'), result=$('.booking-result');
  const now=new Date(),today=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10);
  form.elements.date.min=today;form.elements.date.value=today;
  $$('[data-book]').forEach(button=>button.addEventListener('click',()=>{form.hidden=false;result.hidden=true;dialog.showModal();}));
  $('[data-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);result.textContent=`Looking forward to a good morning, ${String(data.get('name')).trim()}. Your demo reservation is for ${data.get('guests')} on ${data.get('date')} at ${data.get('time')}. This is a preview; no table has been booked.`;form.hidden=true;result.hidden=false;});
})();
