/* Dynamic Island obsah stránky: vanilla JS port komponentu dynamic-island-toc (React/motion),
   aby bežal na statickom GitHub Pages bez build kroku. Rovnaké správanie:
   scroll spy, kruhový progress, rozbaliteľné menu, data-toc / data-toc-title / data-toc-depth / data-toc-ignore. */
(function () {
  "use strict";
  var SEL = "main h1, main h2, #features h3, [data-toc]";
  var CIRC = 2 * Math.PI * ((24 - 2.5) / 2);
  var headings = [], activeId = null, open = false, lastTitle = null;

  var wrap = document.createElement("div");
  wrap.className = "island-wrap";
  wrap.hidden = true;
  wrap.innerHTML =
    '<div class="isl" role="navigation">' +
      '<div class="isl-pill"><span class="isl-dot"></span><div class="isl-t"></div>' +
        '<svg class="isl-pr" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round">' +
        '<circle class="trk" cx="12" cy="12" r="' + ((24 - 2.5) / 2) + '"/>' +
        '<circle class="bar" cx="12" cy="12" r="' + ((24 - 2.5) / 2) + '" stroke-dasharray="' + CIRC + '" stroke-dashoffset="' + CIRC + '"/></svg></div>' +
      '<div class="isl-menu"><div class="isl-head"><b id="islH"></b><button type="button" class="isl-x" aria-label="Close">✕</button></div><div class="isl-list" data-lenis-prevent="true"></div><div class="isl-ft"><div class="isl-lg"><button type="button" data-lang="en">EN</button><button type="button" data-lang="sk">SK</button><button type="button" data-lang="cs">CS</button></div><a class="isl-ig" href="https://www.instagram.com/sosac.app/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></svg></a><a class="isl-ig isl-dc" href="https://discord.gg/E8NTnHfRht" target="_blank" rel="noopener" aria-label="Discord"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5.2 6.6c2-1.3 4-1.8 4-1.8l.6 1.2a14 14 0 0 1 4.4 0l.6-1.2s2 .5 4 1.8c2 3.3 2.9 7 2.6 11-1.8 1.4-3.4 2-3.4 2l-1-1.7c.6-.2 1.1-.5 1.6-.8-2.9 1.4-8.3 1.4-11.2 0 .5.3 1 .6 1.6.8l-1 1.7s-1.6-.6-3.4-2C2.3 13.6 3.2 9.9 5.2 6.6z"/><circle cx="9" cy="13" r="1.4" fill="currentColor"/><circle cx="15" cy="13" r="1.4" fill="currentColor"/></svg></a><a class="isl-ig isl-ml" href="mailto:comor.design@gmail.com" aria-label="Gmail"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3.8 7.6l8.2 6 8.2-6"/></svg></a></div></div>' +
    '</div>';
  var back = document.createElement("div");
back.className = "isl-back";
document.body.appendChild(back);
document.body.appendChild(wrap);

  var isl = wrap.querySelector(".isl"), tBox = wrap.querySelector(".isl-t"), bar = wrap.querySelector(".bar"),
      list = wrap.querySelector(".isl-list"), head = wrap.querySelector("#islH");

  function setOpen(v) {
    open = v; wrap.classList.toggle("open", v); back.classList.toggle("on", v);
    if (v) setTimeout(function () { var a = list.querySelector(".act"); if (a) list.scrollTop = Math.max(0, a.offsetTop - list.clientHeight / 2 + a.offsetHeight / 2); }, 60);
  }
  isl.addEventListener("click", function () { if (!open) setOpen(true); });
  back.addEventListener("click", function () { setOpen(false); });
  wrap.querySelector(".isl-x").addEventListener("click", function (e) { e.stopPropagation(); setOpen(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });

  function scan() {
    var n = 0;
    headings = Array.prototype.slice.call(document.querySelectorAll(SEL))
      .filter(function (el) { return !el.hasAttribute("data-toc-ignore"); })
      .map(function (el) {
        if (!el.id) el.id = "toc-" + (n++);
        var d = el.getAttribute("data-toc-depth"), level = 2;
        if (d) level = parseInt(d, 10);
        else if (/^H[1-6]$/i.test(el.tagName)) level = parseInt(el.tagName[1], 10);
        var text = (el.getAttribute("data-toc-title") || el.textContent || "Section").replace(/\s+/g, " ").trim();
        return { id: el.id, text: text, level: level, el: el };
      });
    wrap.hidden = headings.length === 0; if (wrap.hidden) setOpen(false);
    head.textContent = window.t("toc_h");
    var min = headings.length ? Math.min.apply(null, headings.map(function (h) { return h.level; })) : 1;
    list.innerHTML = "";
    headings.forEach(function (h) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "isl-it"; b.dataset.id = h.id;
      b.style.paddingLeft = (Math.max(0, h.level - min) * 14 + 12) + "px";
      b.innerHTML = "<span></span><i></i>";
      b.firstChild.textContent = h.text;
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        var y = h.el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
        setOpen(false);
      });
      list.appendChild(b);
    });
    lastTitle = null; spy();
  }

  function setTitle(txt) {
    if (txt === lastTitle) return;
    lastTitle = txt;
    var old = tBox.querySelector("span:not(.out)");
    if (old) { old.classList.add("out"); setTimeout(function () { old.remove(); }, 360); }
    var s = document.createElement("span"); s.textContent = txt; tBox.appendChild(s);
  }

  function spy() {
    var cur = null;
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].el.getBoundingClientRect().top <= 120) cur = headings[i].id; else break;
    }
    if (!cur && headings.length) cur = headings[0].id;
    if (cur !== activeId) {
      activeId = cur;
      Array.prototype.forEach.call(list.children, function (b) { b.classList.toggle("act", b.dataset.id === cur); });
    }
    var a = headings.filter(function (h) { return h.id === cur; })[0];
    setTitle(a ? a.text : window.t("toc_default"));
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var pct = total > 0 ? Math.min(100, Math.max(0, window.scrollY / total * 100)) : 0;
    bar.style.strokeDashoffset = CIRC - pct / 100 * CIRC;
  }

  window.addEventListener("scroll", spy, { passive: true });
  window.addEventListener("resize", spy);
  document.addEventListener("langchange", function () { setTimeout(scan, 0); });
  setTimeout(scan, 100);

  /* ---------- očká v písmene O ---------- */
  var o = document.getElementById("bigO");
  if (o) {
    var eyes = o.querySelectorAll(".eye");
    var tx = 0, ty = 0, raf = 0;
    function look() {
      raf = 0;
      var r = o.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      var dx = tx - cx, dy = ty - cy, d = Math.hypot(dx, dy) || 1, m = Math.min(r.width * 0.05, d);
      var x = dx / d * m, y = dy / d * m;
      Array.prototype.forEach.call(eyes, function (e) { e.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)"; });
    }
    window.addEventListener("pointermove", function (e) { tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(look); }, { passive: true });
  }
})();
