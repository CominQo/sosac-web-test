/* Pencil lines (title bar, section dividers, footer edge): thin paths that keep gently waving, like the app's pencil line. */
(function(){"use strict";
var rm=matchMedia("(prefers-reduced-motion:reduce)").matches,last=0,items=[].slice.call(document.querySelectorAll("svg.pencil")).map(function(svg,i){return{svg:svg,host:svg.parentElement,pb:svg.querySelector(".pc-b"),pa:svg.querySelector(".pc-a"),P:[],ph:i*1.9}});
if(!items.length)return;
function layout(it){var W=it.host.offsetWidth||innerWidth,L=[],s=0,x;it.svg.setAttribute("viewBox","0 0 "+W+" 18");for(x=-24;x<=W+24;x+=46){L.push({x:x,y:9,s:s});s+=46}it.P=L}
function dOf(p){var f=function(v){return v.toFixed(1)},d="M"+f(p[0][0])+" "+f(p[0][1]),i,m,e=p[p.length-1];
 for(i=1;i<p.length-1;i++){m=[(p[i][0]+p[i+1][0])/2,(p[i][1]+p[i+1][1])/2];d+=" Q"+f(p[i][0])+" "+f(p[i][1])+" "+f(m[0])+" "+f(m[1])}
 return d+" L"+f(e[0])+" "+f(e[1])}
function shape(it,t,k,ph){var e=.9+.1*Math.sin(t*.37);return it.P.map(function(p){var w=Math.sin(p.s*.026+t*1.9+ph+it.ph)*.55+Math.sin(p.s*.0093-t*1.25+(ph+it.ph)*1.7)*.45;return [p.x,p.y+(.5+k*e)*w]})}
function draw(t){items.forEach(function(it){it.pb.setAttribute("d",dOf(shape(it,t,3.4,0)));it.pa.setAttribute("d",dOf(shape(it,t,1.7,1.3)))})}
function all(){items.forEach(layout);draw(performance.now()/1000)}
function frame(now){requestAnimationFrame(frame);if(document.hidden||now-last<32)return;last=now;draw(now/1000)}
all();if(!rm)requestAnimationFrame(frame);addEventListener("resize",all);addEventListener("load",all);
})();
