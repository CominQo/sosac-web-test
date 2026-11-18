(function(){"use strict";var $=function(s){return document.querySelector(s)},rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
var h=$("#mcHost");if(h&&window.Mascot){try{window.__mc=new window.Mascot(h,{base:"mascot/"});window.__mc.work(true)}catch(e){}}
function lg(){document.querySelectorAll(".isl-lg [data-lang]").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-lang")===window.I18N.lang)})}
document.querySelectorAll(".isl-lg [data-lang]").forEach(function(b){b.onclick=function(){window.I18N.set(b.getAttribute("data-lang"))}});document.addEventListener("langchange",lg);lg();
var cp=$("#abCp");if(cp)cp.onclick=function(){var m=$("#abMail").textContent;(navigator.clipboard?navigator.clipboard.writeText(m):Promise.reject()).catch(function(){}).then(function(){cp.textContent=window.t("ab_ok");setTimeout(function(){cp.textContent=window.t("ab_cp")},1600)})};
/* scroll bar + parallax blobs */
var sb=$("#sbar"),bl=document.querySelectorAll(".blob,.fi");
function sc(){var y=scrollY,m=document.documentElement.scrollHeight-innerHeight;if(sb)sb.style.transform="scaleX("+(m>0?y/m:0)+")";if(!rm)bl.forEach(function(b,i){b.style.transform="translateY("+(y*(.08+i*.05))+"px)"})}
addEventListener("scroll",sc,{passive:true});sc();
/* big video stage: playlist, loops through all 5 */
var VN=["Home","Downloader","Sosogram","Sosify","Editor"],vm=$("#vmain"),tb=document.querySelectorAll(".vt"),cur=0,vis=false;
function sel(i){cur=i;tb.forEach(function(t,k){t.classList.toggle("on",k===i);t.style.setProperty("--p",0)});$("#vtitle").textContent=VN[i];$("#vnum").textContent=(i+1)+" / 5";vm.poster="assets/vid/"+(i+1)+".jpg";vm.src="assets/vid/"+(i+1)+".mp4";if(vis&&!rm)vm.play().catch(function(){})}
if(vm){tb.forEach(function(t,k){t.onclick=function(){sel(k);vm.play().catch(function(){})}});
vm.addEventListener("ended",function(){sel((cur+1)%5)});
vm.addEventListener("timeupdate",function(){if(vm.duration)tb[cur].style.setProperty("--p",vm.currentTime/vm.duration)});
$("#vframe").addEventListener("click",function(){var f=$("#vframe");if(document.fullscreenElement)document.exitFullscreen();else if(f.requestFullscreen)f.requestFullscreen()});
new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis&&!rm)vm.play().catch(function(){});else vm.pause()},{threshold:.3}).observe($("#vframe"));sel(0)}
/* Sosáč silhouette zoom reveal: smoothed (lerp) + eased, metrics cached */
var lz=$("#lips");
if(lz){var st=lz.querySelector(".lipz-st"),lv=lz.querySelector("video"),tt=lz.querySelector(".lipz-t"),lin=lz.querySelector(".lipz-in"),cs=[].slice.call(lz.querySelectorAll(".lipz-chips em")),cxp=+st.getAttribute("data-cx"),cyp=+st.getAttribute("data-cy"),rr=+st.getAttribute("data-r"),M={},lc=0,lt=0,raf=0;
function meas(){M.h=lz.offsetHeight;M.vh=lin.offsetHeight||innerHeight;M.vw=innerWidth;M.W=st.offsetWidth;M.s1=Math.hypot(M.vw/2,M.vh*.58)/(rr*M.W)*1.05;M.R=Math.min(M.vw*.46,640)}
function ez(t){return .5-.5*Math.cos(Math.PI*t)}
function draw(p){var z=Math.min(1,p/.7),s=Math.pow(M.s1,ez(z));st.style.transform="translate(-"+cxp*100+"%,-"+cyp*100+"%) scale("+s+")";tt.style.opacity=Math.max(0,1-z*3.5);tt.style.transform="translateY("+(-z*90)+"px)";lin.style.opacity=1-ez(Math.min(1,Math.max(0,(p-.82)/.18)));var q=ez(Math.min(1,z*2.2));cs.forEach(function(c){var a=c.getAttribute("data-a")*Math.PI/180,r=+c.getAttribute("data-r")*M.R*(1-q);c.style.transform="translate(-50%,-50%) translate("+Math.cos(a)*r+"px,"+Math.sin(a)*r*.62+"px) rotate("+(q*220)+"deg) scale("+(1-q*.85)+")";c.style.opacity=1-q*q*q})}
function want(){return rm?0:Math.min(1,Math.max(0,-lz.getBoundingClientRect().top/Math.max(1,M.h-M.vh)))}
function loop(){raf=0;var d=lt-lc;if(Math.abs(d)<.0005){lc=lt;draw(lc);return}lc+=d*.16;draw(lc);raf=requestAnimationFrame(loop)}
function kick(){lt=want();if(!raf)raf=requestAnimationFrame(loop)}
addEventListener("scroll",kick,{passive:true});addEventListener("resize",function(){meas();kick()});addEventListener("load",function(){meas();kick()});
meas();lc=lt=want();draw(lc);
function vload(){if(!lv.src){lv.preload="auto";lv.src=lv.getAttribute("data-src")}}
if(document.readyState==="complete")setTimeout(vload,300);else addEventListener("load",function(){setTimeout(vload,300)});
new IntersectionObserver(function(es){var on=es[0].isIntersecting;if(on){vload();if(!rm)lv.play().catch(function(){})}else lv.pause()},{threshold:0}).observe(lz)}
document.addEventListener("mousedown",function(){document.documentElement.classList.add("cur-d")},true);addEventListener("mouseup",function(){document.documentElement.classList.remove("cur-d")});addEventListener("blur",function(){document.documentElement.classList.remove("cur-d")});
if(rm)return;
/* reveal on scroll */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add("in");io.unobserve(t);setTimeout(function(){t.classList.add("done");t.style.transitionDelay=""},900)}})},{threshold:.12});
document.querySelectorAll(".sec-h,.sec-s,.card").forEach(function(e,i){e.classList.add("rv");e.style.transitionDelay=(i%4)*70+"ms";io.observe(e)});
/* card tilt */
document.querySelectorAll(".card").forEach(function(c){c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform="perspective(700px) rotateX("+(-y*8)+"deg) rotateY("+(x*8)+"deg) translateY(-4px)"});c.addEventListener("pointerleave",function(){c.style.transform=""})});
/* sparkle trail */
var last=0,cols=["#FFC53D","#FF6B9A","#9B8CFF","#36D6C3"];
addEventListener("pointermove",function(e){var n=Date.now();if(n-last<70)return;last=n;var s=document.createElement("span");s.className="spk";s.textContent="✦";s.style.cssText="left:"+e.clientX+"px;top:"+e.clientY+"px;color:"+cols[n%4];document.body.appendChild(s);setTimeout(function(){s.remove()},800)});
/* click on a big letter = hop + cheer */
document.querySelectorAll(".mega .L").forEach(function(l){l.addEventListener("click",function(){if(window.__mc)window.__mc.cheer()})});
})();
