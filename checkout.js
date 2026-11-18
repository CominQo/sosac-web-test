/* Own checkout: e-mail -> Revolut hosted checkout (card / Revolut Pay QR) -> automatic download button. Active only when API_BASE is set. */
(function(){"use strict";
var C=window.SOSAC_CONFIG||{},API=(C.API_BASE||"").replace(/\/$/,""),$=function(s){return document.querySelector(s)},tr=function(k){return window.t?window.t(k):k},KEY="sosac_order";
if(!API)return;
var DEMO=API==="demo";function base(){return location.href.split(/[?#]/)[0]}
function load(){try{return JSON.parse(localStorage.getItem(KEY)||"null")}catch(e){return null}}
function save(o){try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}}
function dl(o){return DEMO?"assets/demo-download.txt":API+"/download?o="+encodeURIComponent(o.id)+"&t="+encodeURIComponent(o.t)}
function postOrder(v){if(DEMO){var id="demo"+Math.random().toString(36).slice(2,8);return Promise.resolve({id:id,token:"demo",checkout_url:base()+"?demo_pay="+id})}
 return fetch(API+"/order",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email:v,lang:window.I18N&&window.I18N.lang||"en"})}).then(function(r){return r.json().then(function(j){if(!r.ok)throw j;return j})})}
function getStatus(o){if(DEMO){var p=false;try{p=localStorage.getItem("sosac_demo_"+o.id)==="1"}catch(e){}return Promise.resolve({status:p?"paid":"pending"})}
 return fetch(API+"/status?o="+encodeURIComponent(o.id)+"&t="+encodeURIComponent(o.t)).then(function(r){return r.json()})}
var overlay=null;
function close(){if(overlay){overlay.remove();overlay=null}}
function open(html){close();overlay=document.createElement("div");overlay.className="co";overlay.innerHTML='<div class="co-card" role="dialog" aria-modal="true"><button class="co-x" type="button" aria-label="Close">✕</button>'+html+'</div>';
 overlay.addEventListener("click",function(e){if(e.target===overlay||e.target.closest(".co-x"))close()});document.body.appendChild(overlay);window.I18N&&window.I18N.apply();return overlay}
document.addEventListener("keydown",function(e){if(e.key==="Escape")close()});
function buyModal(){
 var el=open('<h3 data-i18n="co_title"></h3><p class="co-price">'+(C.PRICE_LABEL||"10 €")+'</p><label class="co-l"><span data-i18n="co_email"></span><input id="coMail" type="email" autocomplete="email" inputmode="email" placeholder="name@example.com"></label><label class="co-ck"><input id="coAgree" type="checkbox"><span data-i18n="co_agree"></span></label><button class="co-btn" id="coPay" type="button"><span data-i18n="co_pay"></span></button><p class="co-err" id="coErr" role="alert"></p><p class="co-note" data-i18n="co_note"></p>');
 var mail=el.querySelector("#coMail"),pay=el.querySelector("#coPay"),err=el.querySelector("#coErr");mail.focus();
 function go(){var v=mail.value.trim();err.textContent="";
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)||!el.querySelector("#coAgree").checked){err.textContent=tr("co_bad");return}
  pay.disabled=true;pay.classList.add("busy");
  postOrder(v).then(function(j){save({id:j.id,t:j.token,email:v,paid:false});location.href=j.checkout_url}).catch(function(){pay.disabled=false;pay.classList.remove("busy");err.textContent=tr("co_err")})}
 pay.addEventListener("click",go);mail.addEventListener("keydown",function(e){if(e.key==="Enter")go()})}
function paidView(o){open('<div class="co-ok">✓</div><h3 data-i18n="co_ok"></h3><p data-i18n="'+(DEMO?"co_mail_demo":"co_mail")+'"></p><a class="co-btn" href="'+dl(o)+'"><span data-i18n="dl_btn"></span></a>')}
function thanks(o){
 var el=open('<div class="co-spin" aria-hidden="true"></div><h3 data-i18n="co_wait"></h3><p class="co-note" data-i18n="co_slow"></p>'),n=0;
 (function tick(){getStatus(o).then(function(s){
   if(s.status==="paid"){o.paid=true;save(o);paidView(o);unlock(o);if(window.__mc)window.__mc.cheer();return}
   if(s.status==="failed"||s.status==="unknown"){open('<h3 data-i18n="co_fail"></h3><button class="co-btn" id="coRetry" type="button"><span data-i18n="co_retry"></span></button>');$("#coRetry").onclick=buyModal;return}
   if(++n<150)setTimeout(tick,4000)}).catch(function(){if(++n<150)setTimeout(tick,5000)})})()}
function triggers(){return [].slice.call(document.querySelectorAll("#buyBtn,.cta-bnr"))}
function unlock(o){triggers().forEach(function(a){a.href=dl(o);a.removeAttribute("target");a.setAttribute("data-owned","1");var s=a.querySelector("[data-i18n=b_btn]");if(s){s.setAttribute("data-i18n","dl_btn");s.textContent=tr("dl_btn")}})}
triggers().forEach(function(a){a.addEventListener("click",function(e){if(a.getAttribute("data-owned"))return;e.preventDefault();buyModal()})});
function demoPay(id){var el=open('<p class="co-demo">DEMO</p><h3 data-i18n="co_demo_t"></h3><p class="co-price">'+(C.PRICE_LABEL||"10 €")+'</p><p class="co-note" data-i18n="co_demo_note"></p><button class="co-btn" id="coDemoPay" type="button"><span data-i18n="co_demo_pay"></span></button>');
 el.querySelector("#coDemoPay").onclick=function(){try{localStorage.setItem("sosac_demo_"+id,"1")}catch(e){}location.href=base()+"?o="+id+"&t=demo"}}
if(DEMO){var rb=document.createElement("div");rb.className="test-rb";rb.textContent="TEST · no real payments";document.body.appendChild(rb)}
var q=new URLSearchParams(location.search),o=load();
if(DEMO&&q.get("demo_pay")){demoPay(q.get("demo_pay"));return}
if(q.get("o")&&q.get("t")){o={id:q.get("o"),t:q.get("t"),paid:false};save(o);history.replaceState(null,"",location.pathname+location.hash);thanks(o)}
else if(o&&o.paid)unlock(o);
})();
