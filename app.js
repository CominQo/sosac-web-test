(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); };
  if ($("#yr")) $("#yr").textContent = new Date().getFullYear();
  try { if (!localStorage.getItem("sosac_lang")) { var n = (navigator.language || "").slice(0, 2); if (n === "sk" || n === "cs") window.I18N.set(n); } } catch (e) {}
  var b = $("#buyBtn"); if (b) b.addEventListener("click", function () { if (window.__mc) window.__mc.cheer(); });
  window.I18N.apply();
})();
