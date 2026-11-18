/* CutVault mascot: new Mascot(hostElement,{base:"mascot/"}) -> .work(bool), .cheer(), .burst(n), .blink(), .look(dx,dy), .twitch()
   Obrázok sa nemení: základ je pôvodné PNG, oči/žmurkanie/tykadlá sú vrstvy z jeho pixelov a efekty nad ním. */
(function(){
const SVG='<svg width="0" height="0" style="position:absolute"><defs><clipPath id="mcBase" clipPathUnits="objectBoundingBox"><path clip-rule="evenodd" d="M0 0H1V1H0Z M0.2188 0.1688 L0.3375 0.1688 L0.3656 0.2500 L0.3594 0.2750 L0.3406 0.2888 L0.3125 0.2938 L0.2906 0.2750 L0.2500 0.2625 L0.2188 0.2375Z M0.5625 0.1437 L0.6687 0.1437 L0.6719 0.2062 L0.6312 0.2313 L0.6000 0.2500 L0.5875 0.2687 L0.5594 0.2700 L0.5469 0.2531 L0.5594 0.2375 L0.5625 0.1875Z"/></clipPath></defs></svg>';
const GEO={"L": {"S": 202, "pc": [27.006821497790497, 4.203125944697945], "pr": 68.53078642280536, "rin": 97.6}, "R": {"S": 174, "pc": [8.70016273217334, 12.689360192289087], "pr": 65.32547054340536, "rin": 84.0}};
const FLOW=[[.83,.76],[.85,.69],[.79,.62],[.70,.56],[.60,.53],[.55,.515]];
const GL='<svg class="mc-gl" viewBox="0 0 1600 1600" aria-hidden="true"><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M476 664L398 646M1056 598L1118 582" stroke="#1B0C33" stroke-width="38"/><path d="M476 664L398 646M1056 598L1118 582" stroke="#8B4DFF" stroke-width="22"/><path d="M752 646Q776 616 800 620" stroke="#1B0C33" stroke-width="40"/><path d="M752 646Q776 616 800 620" stroke="#8B4DFF" stroke-width="24"/><g transform="rotate(-6 612 667)"><rect x="470" y="572" width="284" height="190" rx="38" stroke="#1B0C33" stroke-width="40" fill="#0B0813"/><rect x="470" y="572" width="284" height="190" rx="38" stroke="#8B4DFF" stroke-width="22" fill="#0B0813"/><g class="gl" fill="#fff" stroke="none"><path d="M520 610L610 600L520 700Z" opacity=".9"/><path d="M640 598L690 594L560 735L526 735Z" opacity=".55"/></g></g><g transform="rotate(-6 927 618)"><rect x="796" y="533" width="262" height="170" rx="36" stroke="#1B0C33" stroke-width="40" fill="#0B0813"/><rect x="796" y="533" width="262" height="170" rx="36" stroke="#8B4DFF" stroke-width="22" fill="#0B0813"/><g class="gl gl2" fill="#fff" stroke="none"><path d="M846 568L930 560L846 650Z" opacity=".9"/><path d="M952 558L996 554L880 688L846 688Z" opacity=".55"/></g></g></g></svg>';
const rnd=(a,b)=>a+Math.random()*(b-a);
window.Mascot=function(host,opt){
  opt=opt||{};const A=n=>(window.MC_ASSETS&&window.MC_ASSETS[n])||(opt.base||"")+n;
  if(!document.getElementById("mcBase"))document.body.insertAdjacentHTML("afterbegin",SVG);
  host.classList.add("mc-host");
  const eye=t=>`<div class="mc-e${t}"><img class="mc-sc" src="${A("sclera"+t+".png")}" alt=""><div class="mc-gz"><img class="mc-pu" src="${A("pupil"+t+".png")}" alt=""></div></div>`;
  const lid=t=>`<div class="mc-d${t}"><div class="mc-lf"></div><div class="mc-ll"></div></div>`;
  const lip=t=>`<img class="mc-lip mc-p${t}" src="${A("lip"+t+".png")}" alt="">`;
  host.innerHTML=`<div class="mc" style="--mc-img:url('${new URL(A("mascot.png"),document.baseURI).href}');--mc-shirt:url('${new URL(A("shirt.png"),document.baseURI).href}')"><div class="mc-shadow"></div><div class="mc-pop"><div class="mc-bob"><div class="mc-munch"><div class="mc-l mc-base"></div><div class="mc-ant mc-aL"><div class="mc-l"></div></div><div class="mc-ant mc-aR"><div class="mc-l"></div></div><div class="mc-l mc-shirt"></div>${eye("L")}${eye("R")}${lid("L")}${lid("R")}${lip("L")}${lip("R")}${GL}<div class="mc-flow"></div><div class="mc-shine"></div></div></div></div><div class="mc-fx"></div></div>`;
  const root=host.firstChild,fx=root.querySelector(".mc-fx"),pop=root.querySelector(".mc-pop"),still=matchMedia("(prefers-reduced-motion:reduce)").matches;
  const gz={L:root.querySelector(".mc-eL .mc-gz"),R:root.querySelector(".mc-eR .mc-gz")},lids=["L","R"].map(t=>[root.querySelector(".mc-d"+t+" .mc-lf"),root.querySelector(".mc-d"+t+" .mc-ll")]);
  const ants=[root.querySelector(".mc-aL .mc-l"),root.querySelector(".mc-aR .mc-l")];
  let timer=0,working=false,lastMove=0,dead=false;
  const ok=()=>!dead&&!document.hidden&&host.offsetParent!==null&&!document.querySelector("#ed.on");
  function el(cls,txt){const e=document.createElement("span");e.className="mc-p "+cls;e.textContent=txt||"";fx.appendChild(e);return e}
  function fly(e,frames,ms,ease){const a=e.animate(frames,{duration:ms,easing:ease||"ease-in",fill:"forwards"});a.onfinish=()=>e.remove()}
  /* oči: pohľad (px v pôvodnom obrázku 1600), každá zrenička zostane v oku */
  this.look=function(dx,dy){["L","R"].forEach(t=>{const g=GEO[t],lim=g.rin-g.pr+10;let x=g.pc[0]+dx,y=g.pc[1]+dy;const d=Math.hypot(x,y);if(d>lim){x*=lim/d;y*=lim/d}
    gz[t].style.transform=`translate(${(x-g.pc[0])/g.S*100}%,${(y-g.pc[1])/g.S*100}%)`})};
  /* žmurkanie: viečko sa zatvorí a otvorí (dvojité žmurknutie občas) */
  this.blink=function(){if(still)return;lids.forEach(([f,l])=>{f.animate([{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 5% 0)",offset:.4},{clipPath:"inset(0 0 5% 0)",offset:.55},{clipPath:"inset(0 0 100% 0)"}],{duration:240,easing:"ease-in-out"});
    l.animate([{top:"-9%"},{top:"86%",offset:.4},{top:"86%",offset:.55},{top:"-9%"}],{duration:240,easing:"ease-in-out"})})};
  /* tykadlá: rýchle zakmitnutie navyše k plynulému hojdaniu */
  this.twitch=function(which,big){if(still)return;const k=big?1.6:1,s=(which==null?Math.random()<.5?0:1:which)?-1:1;
    ants[which==null?(s<0?1:0):which].animate([{transform:"rotate(0)"},{transform:`rotate(${-16*k*s}deg)`,offset:.22},{transform:`rotate(${11*k*s}deg)`,offset:.5},{transform:`rotate(${-6*k*s}deg)`,offset:.75},{transform:"rotate(0)"}],{duration:big?800:620,easing:"ease-out"})};
  function feed(){if(!ok()||still)return;const w=host.clientWidth,e=el(Math.random()<.55?"mc-yt":Math.random()<.5?"mc-dot":"mc-st",Math.random()<.55?"\u25B6":Math.random()<.5?"":"\u2726");
    const f=FLOW.map((p,i)=>({transform:`translate(${p[0]*w}px,${p[1]*w}px) scale(${1-i*.13})`,opacity:i==0?0:1,offset:i/(FLOW.length-1)}));f[f.length-1].opacity=0;fly(e,f,working?1100:1900,"ease-in-out")}
  function twinkle(){if(!ok()||still)return;const w=host.clientWidth,a=rnd(0,6.28),x=w*(.5+Math.cos(a)*rnd(.34,.5)),y=w*(.5+Math.sin(a)*rnd(.3,.46)),e=el("mc-st","\u2726");
    fly(e,[{transform:`translate(${x}px,${y}px) scale(0) rotate(0)`,opacity:0},{transform:`translate(${x}px,${y}px) scale(1.2) rotate(90deg)`,opacity:1,offset:.5},{transform:`translate(${x}px,${y}px) scale(0) rotate(180deg)`,opacity:0}],1100,"ease-in-out")}
  function loop(){clearInterval(timer);let n=0;timer=setInterval(()=>{feed();if(++n%3==0)twinkle()},working?380:1500)}
  this.burst=function(n){if(!ok()||still)return;const w=host.clientWidth;for(let i=0;i<(n||12);i++){const e=el(i%3?"mc-st":"mc-dot",i%3?"\u2726":""),a=rnd(0,6.28),r=rnd(.25,.55)*w,cx=w*.5,cy=w*.5;
    fly(e,[{transform:`translate(${cx}px,${cy}px) scale(.4)`,opacity:1},{transform:`translate(${cx+Math.cos(a)*r}px,${cy+Math.sin(a)*r-w*.08}px) scale(1.3)`,opacity:1,offset:.5},{transform:`translate(${cx+Math.cos(a)*r*1.15}px,${cy+Math.sin(a)*r+w*.12}px) scale(.6)`,opacity:0}],rnd(700,1000),"ease-out")}};
  this.cheer=function(){if(!still)pop.animate([{transform:"none"},{transform:"translateY(-7%) scale(.96,1.07)",offset:.3},{transform:"translateY(0) scale(1.07,.93)",offset:.55},{transform:"translateY(-2%) scale(.99,1.02)",offset:.75},{transform:"none"}],{duration:720,easing:"ease-out"});
    this.burst(14);this.blink();this.twitch(0,true);this.twitch(1,true);this.look(-10,-14);setTimeout(()=>this.look(0,0),900)};
  this.work=function(on){working=!!on;root.classList.toggle("work",working);loop()};
  root.addEventListener("click",()=>this.cheer());
  /* samé od seba: žmurká, pozerá sa okolo, kmitá tykadlami; ak hýbeš myšou, oči ju sledujú */
  const self=this;
  (function bl(){if(dead)return;setTimeout(()=>{if(ok()){self.blink();if(Math.random()<.25)setTimeout(()=>self.blink(),330)}bl()},rnd(2200,5500))})();
  (function wander(){if(dead)return;setTimeout(()=>{if(ok()&&Date.now()-lastMove>2500){if(Math.random()<.3)self.look(0,0);else{const a=rnd(0,6.28),m=rnd(14,40);self.look(Math.cos(a)*m,Math.sin(a)*m)}}wander()},rnd(1300,3200))})();
  (function tw(){if(dead)return;setTimeout(()=>{if(ok())self.twitch();tw()},rnd(1800,4200))})();
  let thr=0;const onMove=e=>{if(dead||window.__busy)return;const n=Date.now();if(n-thr<50||!ok())return;thr=n;lastMove=n;const r=root.getBoundingClientRect(),dx=e.clientX-(r.left+r.width*.45),dy=e.clientY-(r.top+r.height*.4),d=Math.hypot(dx,dy)||1,k=Math.min(1,d/260);self.look(dx/d*40*k,dy/d*40*k)};document.addEventListener("pointermove",onMove);
  this.destroy=function(){dead=true;clearInterval(timer);document.removeEventListener("pointermove",onMove)};
  loop();
};
})();
