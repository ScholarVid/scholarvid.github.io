document.addEventListener('DOMContentLoaded',()=>{
  const $=s=>document.querySelector(s),root=document.documentElement;
  const tg=$('#themeToggle'),ic=tg&&tg.querySelector('i');
  const sync=()=>{if(ic)ic.className=root.getAttribute('data-theme')==='dark'?'fas fa-sun':'fas fa-moon'};sync();
  tg&&tg.addEventListener('click',()=>{const d=root.getAttribute('data-theme')==='dark';d?root.removeAttribute('data-theme'):root.setAttribute('data-theme','dark');try{localStorage.setItem('scholarvid-theme',d?'light':'dark')}catch(e){}sync()});
  const mb=$('.mobile-menu-btn'),mm=$('.mobile-menu');
  mb&&mm&&(mb.addEventListener('click',()=>{const o=mm.classList.toggle('active');mb.querySelector('i').className=o?'fas fa-times':'fas fa-bars'}),
    mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mm.classList.remove('active');mb.querySelector('i').className='fas fa-bars'})));
  const h=$('#header'),b=$('#backToTop');
  addEventListener('scroll',()=>{b&&b.classList.toggle('visible',scrollY>400)},{passive:true});
  b&&b.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
  const n=$('.stat-number');
  if(n&&'IntersectionObserver'in window){const f=+n.dataset.count||0;new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){let c=0;const t=setInterval(()=>{c=Math.min(f,c+1);n.textContent=c+'+';c>=f&&clearInterval(t)},150);o.disconnect()}},{threshold:.5}).observe(n)}
});
