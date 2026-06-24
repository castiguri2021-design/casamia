
document.addEventListener('DOMContentLoaded',()=>{
  const ov=document.createElement('div');ov.id='lb-overlay';
  ov.innerHTML='<img id="lb-img" src=""><button id="lb-close">&times;</button><button id="lb-prev">&#10094;</button><button id="lb-next">&#10095;</button>';
  document.body.appendChild(ov);
  const imgs=document.querySelectorAll('section img, .gallery img, #menu img');
  const srcs=Array.from(imgs).map(i=>i.src);let idx=0;
  imgs.forEach((img,i)=>{img.style.cursor='pointer';img.addEventListener('click',()=>{idx=i;show()})});
  function show(){document.getElementById('lb-img').src=srcs[idx];ov.style.display='flex';document.body.style.overflow='hidden'}
  function close(){ov.style.display='none';document.body.style.overflow=''}
  document.getElementById('lb-close').onclick=close;
  ov.onclick=e=>{if(e.target===ov)close()};
  document.getElementById('lb-prev').onclick=e=>{e.stopPropagation();idx=(idx-1+srcs.length)%srcs.length;show()};
  document.getElementById('lb-next').onclick=e=>{e.stopPropagation();idx=(idx+1)%srcs.length;show()};
  let tx=0;ov.addEventListener('touchstart',e=>tx=e.changedTouches[0].screenX,{passive:true});
  ov.addEventListener('touchend',e=>{const d=e.changedTouches[0].screenX-tx;if(Math.abs(d)>50){d>0?document.getElementById('lb-prev').click():document.getElementById('lb-next').click()}},{passive:true});
});
