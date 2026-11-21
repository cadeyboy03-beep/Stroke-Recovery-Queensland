(function(){
var d=document,h=d.documentElement;
function $(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))}
var K="vivo-a11y",S={size:"",ul:"0",still:"0",hc:"0",rf:"0"},stored=false;
try{var j=JSON.parse(localStorage.getItem(K)||"null");if(j){stored=true;["size","ul","still","hc","rf"].forEach(function(k){if(j[k]!==undefined)S[k]=j[k]})}}catch(e){}
try{if(!stored&&window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)S.still="1"}catch(e){}
function save(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
function ap(){
 h.classList.remove("big","bigger");if(S.size)h.classList.add(S.size);
 h.classList.toggle("ul",S.ul==="1");h.classList.toggle("still",S.still==="1");h.classList.toggle("hc",S.hc==="1");h.classList.toggle("rf",S.rf==="1");
 $("[data-v]").forEach(function(x){x.classList.toggle("on",x.getAttribute("data-v")===S.size)});
 $("[data-tog]").forEach(function(x){var v=S[x.getAttribute("data-tog")]==="1";x.classList.toggle("on",v);x.setAttribute("aria-checked",v)});
}
ap();
function setTab(rp,t){if(!rp)return;$(".pane",rp).forEach(function(p){p.classList.toggle("on",p.getAttribute("data-pane")===t)});$(".tabs button",rp).forEach(function(b){b.classList.toggle("on",b.getAttribute("data-t")===t)})}
function openM(id,tab){var m=d.getElementById(id);m.classList.add("open");h.style.overflow="hidden";if(tab)setTab(m.querySelector(".rp"),tab);var f=m.querySelector("input,button.x");if(f)f.focus()}
function closeM(m){m.classList.remove("open");h.style.overflow=""}
d.addEventListener("click",function(e){
 var c=e.target.closest(".chev");
 if(c){var o=c.parentNode.classList.toggle("open");c.setAttribute("aria-expanded",o);return}
 if(e.target.classList&&e.target.classList.contains("modal")){closeM(e.target);return}
 var t=e.target.closest("[data-ref],[data-a11y],[data-x],[data-t],[data-v],[data-tog]");if(!t)return;
 if(t.hasAttribute("data-ref")){openM("rm",t.getAttribute("data-tab")||"refer")}
 else if(t.hasAttribute("data-a11y")){openM("am")}
 else if(t.hasAttribute("data-x")){closeM(t.closest(".modal"))}
 else if(t.hasAttribute("data-t")){setTab(t.closest(".rp"),t.getAttribute("data-t"))}
 else if(t.hasAttribute("data-v")){S.size=t.getAttribute("data-v");save();ap()}
 else if(t.hasAttribute("data-tog")){var k=t.getAttribute("data-tog");S[k]=S[k]==="1"?"0":"1";save();ap()}
});
d.addEventListener("keydown",function(e){if(e.key==="Escape")$(".modal.open").forEach(closeM)});
$("form[data-f]").forEach(function(f){f.addEventListener("submit",function(e){e.preventDefault();
 var l=[],o={};
 $("input,select,textarea",f).forEach(function(x){if(!x.name)return;if(x.type==="checkbox"){if(x.checked){l.push(x.name+": Yes");o[x.name]="Yes"}return}if(x.value){l.push(x.name+": "+x.value);o[x.name]=x.value}});
 var subj=f.getAttribute("data-f")+" - Stroke Recovery Queensland",key="dbbdd427-44d3-48e0-b4aa-f4881a134ef8";
 function viaMail(){location.href="mailto:referrals@strokerecoveryqld.com.au?subject="+encodeURIComponent(subj)+"&body="+encodeURIComponent(l.join("\n"))}
 if(!window.fetch||key.indexOf("__")===0){viaMail();return}
 var btn=f.querySelector("button[type=submit],input[type=submit]"),old=btn?btn.textContent:"";
 if(btn){btn.disabled=true;btn.textContent="Sending..."}
 var data={access_key:key,subject:subj,from_name:"Stroke Recovery Queensland website",message:l.join("\n")};
 for(var k in o){data[k]=o[k]}
 if(o["Your email"])data.email=o["Your email"];else if(o["Email"])data.email=o["Email"];
 fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(data)})
 .then(function(r){return r.json()})
 .then(function(j){if(!j.success)throw 0;
  var m=d.createElement("div");m.className="fok";m.setAttribute("role","status");
  m.innerHTML="<b>Thank you, we have your "+(f.getAttribute("data-f")==="Referral"?"referral":"message")+".</b><span>Cade will reply within 24 hours. If it is urgent, please call 0450 521 274.</span>";
  f.style.display="none";f.parentNode.insertBefore(m,f);m.scrollIntoView({block:"center"})})
 .catch(function(){if(btn){btn.disabled=false;btn.textContent=old}
  var m=f.querySelector(".ferr");if(!m){m=d.createElement("p");m.className="ferr";m.setAttribute("role","alert");f.appendChild(m)}
  m.innerHTML="Sorry, that did not send. Please call 0450 521 274 or <a href='mailto:referrals@strokerecoveryqld.com.au'>email referrals@strokerecoveryqld.com.au</a>."})
})});

/* mobile-only: stepped referral form + foldable lists */
var mq=window.matchMedia?matchMedia("(max-width:860px)"):{matches:false};
$("form[data-f='Referral']").forEach(function(f){
 var steps=$(".fs",f),cur=0,bar=f.querySelector(".pbar i"),lab=f.querySelector(".flab");
 function show(i){cur=i;steps.forEach(function(s,k){s.classList.toggle("cur",k===i)});
  f.classList.toggle("first",i===0);f.classList.toggle("last",i===steps.length-1);
  if(bar)bar.style.width=((i+1)/steps.length*100)+"%";
  if(lab)lab.textContent="Step "+(i+1)+" of "+steps.length+": "+steps[i].querySelector(".fh").textContent}
 function setup(){f.classList.toggle("stepped",mq.matches);if(mq.matches)show(Math.min(cur,steps.length-1))}
 function top(){var r=f.closest(".rp")||f;r.scrollIntoView({block:"start"})}
 f.querySelector(".fnext").addEventListener("click",function(){
  var bad=null;$("input,select,textarea",steps[cur]).forEach(function(x){if(!bad&&!x.checkValidity())bad=x});
  if(bad){bad.reportValidity();return}
  if(cur<steps.length-1){show(cur+1);top()}});
 f.querySelector(".fback").addEventListener("click",function(){if(cur>0){show(cur-1);top()}});
 if(mq.addEventListener)mq.addEventListener("change",setup);setup()});
$(".card[id] > .bl").forEach(function(b){var t=b.querySelector(".blt");
 function setup(){var on=mq.matches;b.classList.toggle("fold",on);if(on){t.setAttribute("role","button");t.setAttribute("tabindex","0");t.setAttribute("aria-expanded",b.classList.contains("open"))}else{t.removeAttribute("role");t.removeAttribute("tabindex");t.removeAttribute("aria-expanded");b.classList.remove("open")}}
 function tog(){if(!b.classList.contains("fold"))return;var o=b.classList.toggle("open");t.setAttribute("aria-expanded",o)}
 t.addEventListener("click",tog);t.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();tog()}});
 if(mq.addEventListener)mq.addEventListener("change",setup);setup()});
var m=d.querySelector(".menu"),n=d.querySelector("nav");
m.addEventListener("click",function(){var o=n.classList.toggle("open");m.setAttribute("aria-expanded",o)});
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.1});
 $(".card,.step,.stat").forEach(function(el){el.classList.add("rv");io.observe(el)})}
})();

try{if("scrollRestoration" in history)history.scrollRestoration="manual";if(!location.hash){window.scrollTo(0,0);addEventListener("pageshow",function(e){if(!location.hash)window.scrollTo(0,0)})}}catch(e){}

(function(){var els=document.querySelectorAll('[data-count]');if(!els.length)return;
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce||!('IntersectionObserver' in window))return;
function run(el){var end=+el.getAttribute('data-count'),suf=el.getAttribute('data-suffix')||'',t0=null,d=1600;
function step(t){if(t0===null)t0=t;var p=Math.min((t-t0)/d,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(end*e).toLocaleString('en-AU')+suf;if(p<1)requestAnimationFrame(step);}
requestAnimationFrame(step);}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){io.unobserve(e.target);run(e.target);}});},{threshold:.4});
els.forEach(function(el){el.textContent='0'+(el.getAttribute('data-suffix')||'');io.observe(el);});})();

;(function(){var R=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.chips a,.chips2 a,.btn,.pill').forEach(function(a){a.addEventListener('click',function(e){
 var r=a.getBoundingClientRect(),s=document.createElement('span'),d=Math.max(r.width,r.height);s.className='rip';
 s.style.width=s.style.height=d+'px';s.style.left=(e.clientX-r.left-d/2)+'px';s.style.top=(e.clientY-r.top-d/2)+'px';a.appendChild(s);setTimeout(function(){s.remove()},650);
 });});})();

;(function(){var mq=window.matchMedia&&matchMedia('(max-width:860px)');
document.querySelectorAll('footer .fg>div h4').forEach(function(h){h.setAttribute('role','button');h.setAttribute('tabindex','0');
 function t(){if(mq&&mq.matches){var o=h.parentNode.classList.toggle('open');h.setAttribute('aria-expanded',o)}}
 h.addEventListener('click',t);h.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}})});
document.querySelectorAll('.grid.g3,.grid.g4,.grid.g2,.tiles,.why5').forEach(function(g){if(g.children.length>1&&!(g.previousElementSibling&&g.previousElementSibling.classList.contains('swipe-hint'))){var s=document.createElement('div');s.className='swipe-hint';s.textContent='Swipe to see more';g.parentNode.insertBefore(s,g)}});
})();
