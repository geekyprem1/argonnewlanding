(() => {
  'use strict';
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const cart=new Map();let finish='Midnight';
  const dialog=$('#cart');
  const render=()=>{
    const target=$('[data-cart-items]');target.replaceChildren();let quantity=0;
    for(const [name,qty] of cart){
      quantity+=qty;const row=document.createElement('article');row.className='audio-cart-item';
      const image=document.createElement('img');image.src='../assets/gallery/luxury-headphones-on-a-golden-pedestal.jpg';image.alt='F / 01 headphones';
      const info=document.createElement('div'),title=document.createElement('h3'),description=document.createElement('p');title.textContent='F / 01 Headphones';description.textContent=name+' / $129 each';
      const controls=document.createElement('div');controls.className='audio-quantity';
      for(const [label,delta] of [['−',-1],['+',1]]){const button=document.createElement('button');button.type='button';button.textContent=label;button.setAttribute('aria-label',(delta>0?'Add one ':'Remove one ')+name+' headphone');button.addEventListener('click',()=>{const n=cart.get(name)+delta;if(n>0)cart.set(name,n);else cart.delete(name);render();});controls.appendChild(button);if(delta<0){const count=document.createElement('span');count.textContent=qty;controls.appendChild(count);}}
      const remove=document.createElement('button');remove.type='button';remove.className='audio-remove';remove.textContent='Remove';remove.addEventListener('click',()=>{cart.delete(name);render();});
      info.append(title,description,controls,remove);row.append(image,info);target.appendChild(row);
    }
    if(!quantity){const empty=document.createElement('p');empty.className='audio-empty';empty.textContent='A little quiet in here. Add your first pair.';target.appendChild(empty);}
    const subtotal=quantity*129,shipping=quantity&&subtotal<200?8:0;
    $('[data-cart-count]').textContent=quantity;
    $('[data-subtotal]').textContent='$'+subtotal.toFixed(2);$('[data-shipping]').textContent=quantity&&shipping===0?'Free':'$'+shipping.toFixed(2);$('[data-total]').textContent='$'+(subtotal+shipping).toFixed(2);$('[data-checkout]').disabled=!quantity;$('[data-checkout-message]').textContent='';
  };
  $$('[data-finish]').forEach(button=>button.addEventListener('click',()=>{finish=button.dataset.finish;$('[data-finish-label]').textContent=finish;$$('[data-finish]').forEach(b=>{b.classList.toggle('chosen',b===button);b.setAttribute('aria-pressed',String(b===button));});}));
  $('[data-add-bag]').addEventListener('click',()=>{cart.set(finish,(cart.get(finish)||0)+1);render();dialog.showModal();});
  $('[data-cart-open]').addEventListener('click',()=>{render();dialog.showModal();});
  $('[data-cart-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  $('[data-checkout]').addEventListener('click',()=>{$('[data-checkout-message]').textContent='Checkout preview complete. Your demo total is '+$('[data-total]').textContent+'. No order was placed and no payment was taken.';});render();
})();
