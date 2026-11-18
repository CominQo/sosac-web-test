/* Hand-drawn banner buttons: every .plate / .bnr gets its own wobbly SVG outline, stripes and a painted shadow band. */
(function(){"use strict";
var NS="http://www.w3.org/2000/svg",uid=0;
function rnd(s){s=s>>>0||1;return function(){s=(s*1664525+1013904223)>>>0;return s/4294967296}}
function outline(w,h,seed,amp){
 var R=rnd(seed),r=Math.min(14,h/2.4),pts=[],step=30,i,k,p=[R()*6,R()*6,R()*6];
 function side(x1,y1,x2,y2){var n=Math.max(2,Math.round(Math.hypot(x2-x1,y2-y1)/step));for(i=0;i<n;i++)pts.push([x1+(x2-x1)*i/n,y1+(y2-y1)*i/n])}
 function arc(cx,cy,a0,a1){for(i=0;i<4;i++){var a=a0+(a1-a0)*i/4;pts.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r])}}
 side(r,0,w-r,0);arc(w-r,r,-Math.PI/2,0);side(w,r,w,h-r);arc(w-r,h-r,0,Math.PI/2);side(w-r,h,r,h);arc(r,h-r,Math.PI/2,Math.PI);side(0,h-r,0,r);arc(r,r,Math.PI,1.5*Math.PI);
 var cx=w/2,cy=h/2,n=pts.length;
 pts=pts.map(function(q,j){var nx=(q[0]-cx)/(w/2),ny=(q[1]-cy)/(h/2),l=Math.hypot(nx,ny)||1,o=amp*(Math.sin(j*.5+p[0])+.6*Math.sin(j*1.25+p[1])+.3*Math.sin(j*2.4+p[2]));return [q[0]+nx/l*o,q[1]+ny/l*o]});
 var d="M"+pts[0][0].toFixed(1)+" "+pts[0][1].toFixed(1);
 for(k=0;k<n;k++){var a=pts[(k-1+n)%n],b=pts[k],c=pts[(k+1)%n],e=pts[(k+2)%n];
  d+="C"+(b[0]+(c[0]-a[0])/6).toFixed(1)+" "+(b[1]+(c[1]-a[1])/6).toFixed(1)+","+(c[0]-(e[0]-b[0])/6).toFixed(1)+" "+(c[1]-(e[1]-b[1])/6).toFixed(1)+","+c[0].toFixed(1)+" "+c[1].toFixed(1)}
 return d+"Z"}
function el(n,a){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);return e}
function build(host,idx){
 var w=host.offsetWidth,h=host.offsetHeight;if(!w||!h)return;
 var c=(host.getAttribute("data-bn")||"#FFC93F,#F4B93A").split(","),id="bnp"+(++uid),seed=idx*977+13;
 var svg=host.querySelector(":scope>.bn-svg");if(svg)svg.remove();
 svg=el("svg",{"class":"bn-svg",width:w,height:h,viewBox:"0 0 "+w+" "+h,"aria-hidden":"true"});
 var defs=el("defs",{}),pat=el("pattern",{id:id,width:30,height:30,patternUnits:"userSpaceOnUse",patternTransform:"rotate(-58)"});
 pat.appendChild(el("rect",{width:30,height:30,fill:c[0]}));pat.appendChild(el("rect",{width:15,height:30,fill:c[1]}));
 if(host.hasAttribute("data-move"))pat.appendChild(el("animate",{attributeName:"x",from:0,to:30,dur:"3.2s",repeatCount:"indefinite"}));
 defs.appendChild(pat);svg.appendChild(defs);
 var d1=outline(w,h,seed,1.7),d2=outline(w,h,seed+5,2.1);
 svg.appendChild(el("path",{d:d1,transform:"translate(3 11)",fill:"#2A2147"}));
 var R=rnd(seed+9);for(var i=0;i<4;i++){var x=w*(.08+.2*i+R()*.1),len=w*(.05+R()*.08);svg.appendChild(el("path",{d:"M"+x+" "+(h+4+R()*3)+"q"+len/2+" -1.5 "+len+" 0",stroke:"#5B4D8E","stroke-width":1.6,"stroke-linecap":"round",fill:"none",opacity:.65}))}
 svg.appendChild(el("path",{d:d1,fill:"url(#"+id+")",stroke:"#1A1530","stroke-width":3,"stroke-linejoin":"round"}));
 svg.appendChild(el("path",{d:d2,fill:"none",stroke:"#1A1530","stroke-width":1.5,"stroke-linejoin":"round",opacity:.75}));
 host.insertBefore(svg,host.firstChild)}
var hosts=[].slice.call(document.querySelectorAll(".plate,.bnr,#features .sec-h,#demo .sec-h"));
hosts.forEach(function(h){h.classList.add("bnr")});
var q=0;function all(){q=0;hosts.forEach(build)}
function soon(){if(!q)q=requestAnimationFrame(all)}
all();if(window.ResizeObserver){var ro=new ResizeObserver(soon);hosts.forEach(function(h){ro.observe(h)})}
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(soon);
document.addEventListener("langchange",function(){setTimeout(soon,30)});
})();
