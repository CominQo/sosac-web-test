(function () {
  var D = {
    en: {
      nav_features: "Features", nav_buy: "Buy", nav_download: "Download", login: "Log in", account: "My account",
      pill: "Sosáč 3.0 · for Windows",
      lead: "Videos, music, whole channels, GIFs and MP3s. Editing, converter and library in one app, with a mascot that never gets stuck.",
      cta_buy: "Buy Sosáč", cta_dl: "Download", cta_dl_locked: "Download (after purchase)", cta_note: "Pay once, updates included.",
      f_h: "What Sosáč can do", f_s: "Everything around downloading you need, without juggling five apps.",
      f1_t: "Download", f1_d: "Paste a link, pick the quality and Sosáč sucks up the video, audio or photo.",
      f2_t: "Channel Sucker", f2_d: "A whole channel or the last X videos at once, in the format you want.",
      f3_t: "Sosogram", f3_d: "Profiles and stories in one place, clean and fast.",
      f4_t: "Sosify", f4_d: "Music from YouTube and SoundCloud, favorites and a player in the title bar.",
      f5_t: "Editor & MP3 cutter", f5_d: "Cut, add text, transitions and social ratios like 9:16. Export in one click.",
      f6_t: "Converter", f6_d: "GIF, MP3 and video with quality from small to highest.",
      b_h: "One price. Yours forever.", b_s: "Buy once, you create your account at checkout. Every new update you download after logging in.",
      b_tag: "Full version", b_li1: "All features, no limits", b_li2: "Free updates", b_li3: "Download any time after logging in",
      b_btn: "Buy for €10", b_owned: "You own Sosáč ✓",
      d_h: "Download", d_s: "Downloads are for customers only. Log in with the account you bought with.",
      d_locked_h: "Download is locked 🔒", d_locked_p: "Log in with the account you bought Sosáč with.", d_login: "Log in", d_nothave: "I don't own it yet, buy",
      d_hi: "Hi 👋", d_nolic: "This account has no license yet:", d_pay_note: "Payment goes through Stripe and the license is added automatically, usually within seconds. If you just paid,", d_refresh: "refresh status",
      d_bought: "Bought ✓", d_latest: "Latest version for Windows", d_btn: "Download Sosáč", d_new: "What's new:", d_none_h: "No version uploaded yet", d_none_p: "Check back in a moment.",
      cfg_missing: "The site is not connected to Supabase yet. Fill in config.js following SETUP.md.", cfg_toast: "Fill in config.js first (see SETUP.md)",
      m_close: "Close", m_login_h: "Log in", m_reg_h: "Create account", m_login_s: "Welcome back. Log in and download Sosáč.", m_reg_s: "You need an account to buy, it's how Sosáč recognises a customer.",
      m_tab_login: "Log in", m_tab_reg: "Sign up", m_email: "E-mail", m_pw: "Password", m_pw_ph: "at least 8 characters", m_do_reg: "Create account", m_do_login: "Log in", m_forgot: "Forgot password",
      m_logging: "Logging in…", m_bad: "Wrong e-mail or password.", m_short: "Password must be at least 8 characters.", m_creating: "Creating account…",
      m_confirm: "We sent you a confirmation e-mail. Confirm it, then log in.", m_need_email: "Enter your e-mail above.", m_reset_sent: "We sent a password reset link.",
      t_welcome: "Welcome back! 👋", t_created: "Account created 🎉", t_out: "Logged out", t_found: "License found ✓", t_nothing: "Nothing yet, try again in a moment",
      t_have: "You already own Sosáč ✓", t_paid: "Payment received, checking license…", t_done: "All set, you can download 🎉", t_pw: "Password changed ✓",
      buy_need_acc: "First create an account, then we'll send you to payment.",
      p_h: "My account", p_full: "Full version ✓", p_none: "No license", p_go: "Go to download", p_out: "Log out",
      rec_h: "New password", rec_s: "Enter your new password.", rec_save: "Save", rec_min: "At least 8 characters.",
      dl_prep: "Preparing link…", dl_fail: "Download failed: ", dl_start: "Download started ✓",
      toc_h: "CONTENTS", toc_default: "Contents", foot: "Made with love and a hose", lang: "Language"
    },
    sk: {
      nav_features: "Funkcie", nav_buy: "Kúpiť", nav_download: "Stiahnuť", login: "Prihlásiť sa", account: "Môj účet",
      pill: "Sosáč 3.0 · pre Windows",
      lead: "Videá, hudba, celé kanály, GIFy a MP3. Strih, konvertor a knižnica v jednej appke s maskotom, ktorý sa nikdy nezasekne.",
      cta_buy: "Kúpiť Sosáča", cta_dl: "Stiahnuť", cta_dl_locked: "Stiahnuť (po kúpe)", cta_note: "Raz zaplatíš, updaty máš v cene.",
      f_h: "Čo Sosáč vie", f_s: "Všetko okolo sťahovania, čo potrebuješ, bez prepínania medzi piatimi appkami.",
      f1_t: "Stiahnuť", f1_d: "Vlož odkaz, vyber kvalitu a Sosáč nasaje video, zvuk alebo fotku.",
      f2_t: "Vysávač kanálov", f2_d: "Celý kanál alebo posledných X videí naraz, vo formáte, aký chceš.",
      f3_t: "Sosogram", f3_d: "Profily a príbehy na jednom mieste, prehľadne a rýchlo.",
      f4_t: "Sosify", f4_d: "Hudba z YouTube a SoundCloudu, obľúbené a prehrávač v title bare.",
      f5_t: "Editor a MP3 strih", f5_d: "Strih, text, prechody a sociálne pomery ako 9:16. Export jedným klikom.",
      f6_t: "Konvertor", f6_d: "GIF, MP3 aj video s kvalitou od malej po najvyššiu.",
      b_h: "Jedna cena. Navždy tvoj.", b_s: "Kúp raz, účet si vytvoríš pri nákupe. Každý nový update si potom stiahneš po prihlásení.",
      b_tag: "Plná verzia", b_li1: "Všetky funkcie bez limitov", b_li2: "Updaty zadarmo", b_li3: "Stiahnutie kedykoľvek po prihlásení",
      b_btn: "Kúpiť za 10 €", b_owned: "Už vlastníš Sosáča ✓",
      d_h: "Stiahnuť", d_s: "Sťahovanie je len pre zákazníkov. Prihlás sa účtom, s ktorým si kupoval.",
      d_locked_h: "Stiahnutie je zamknuté 🔒", d_locked_p: "Prihlás sa účtom, s ktorým si kúpil Sosáča.", d_login: "Prihlásiť sa", d_nothave: "Ešte nemám, kúpim",
      d_hi: "Ahoj 👋", d_nolic: "Tento účet zatiaľ nemá kúpenú licenciu:", d_pay_note: "Platba ide cez Stripe a licencia sa pripíše automaticky, zvyčajne do pár sekúnd. Ak si práve zaplatil,", d_refresh: "obnov stav",
      d_bought: "Kúpené ✓", d_latest: "Najnovšia verzia pre Windows", d_btn: "Stiahnuť Sosáča", d_new: "Čo je nové:", d_none_h: "Zatiaľ nie je nahraná žiadna verzia", d_none_p: "Pozri sa sem o chvíľu.",
      cfg_missing: "Stránka ešte nie je prepojená so Supabase. Vyplň config.js podľa SETUP.md.", cfg_toast: "Najprv vyplň config.js (pozri SETUP.md)",
      m_close: "Zavrieť", m_login_h: "Prihlásenie", m_reg_h: "Vytvor účet", m_login_s: "Vitaj späť. Prihlás sa a stiahni Sosáča.", m_reg_s: "Účet potrebuješ na nákup, podľa neho Sosáč pozná zákazníka.",
      m_tab_login: "Prihlásiť", m_tab_reg: "Registrovať", m_email: "E-mail", m_pw: "Heslo", m_pw_ph: "aspoň 8 znakov", m_do_reg: "Vytvoriť účet", m_do_login: "Prihlásiť sa", m_forgot: "Zabudnuté heslo",
      m_logging: "Prihlasujem…", m_bad: "Zlý e-mail alebo heslo.", m_short: "Heslo musí mať aspoň 8 znakov.", m_creating: "Vytváram účet…",
      m_confirm: "Poslali sme ti potvrdzovací e-mail. Potvrď ho a prihlás sa.", m_need_email: "Napíš e-mail hore.", m_reset_sent: "Poslali sme odkaz na obnovu hesla.",
      t_welcome: "Vitaj späť! 👋", t_created: "Účet vytvorený 🎉", t_out: "Odhlásený", t_found: "Licencia nájdená ✓", t_nothing: "Zatiaľ nič, skús o chvíľu",
      t_have: "Sosáča už máš kúpeného ✓", t_paid: "Platba prijatá, overujem licenciu…", t_done: "Hotovo, môžeš sťahovať 🎉", t_pw: "Heslo zmenené ✓",
      buy_need_acc: "Najprv si vytvor účet, potom ťa pošleme na platbu.",
      p_h: "Môj účet", p_full: "Plná verzia ✓", p_none: "Bez licencie", p_go: "Prejsť na stiahnutie", p_out: "Odhlásiť sa",
      rec_h: "Nové heslo", rec_s: "Zadaj si nové heslo.", rec_save: "Uložiť", rec_min: "Aspoň 8 znakov.",
      dl_prep: "Pripravujem odkaz…", dl_fail: "Sťahovanie zlyhalo: ", dl_start: "Sťahovanie začalo ✓",
      toc_h: "OBSAH", toc_default: "Obsah", foot: "Vyrobené s láskou a hadicou", lang: "Jazyk"
    },
    cs: {
      nav_features: "Funkce", nav_buy: "Koupit", nav_download: "Stáhnout", login: "Přihlásit se", account: "Můj účet",
      pill: "Sosáč 3.0 · pro Windows",
      lead: "Videa, hudba, celé kanály, GIFy a MP3. Střih, konvertor a knihovna v jedné appce s maskotem, který se nikdy nezasekne.",
      cta_buy: "Koupit Sosáče", cta_dl: "Stáhnout", cta_dl_locked: "Stáhnout (po koupi)", cta_note: "Jednou zaplatíš, updaty jsou v ceně.",
      f_h: "Co Sosáč umí", f_s: "Vše kolem stahování, co potřebuješ, bez přepínání mezi pěti appkami.",
      f1_t: "Stáhnout", f1_d: "Vlož odkaz, vyber kvalitu a Sosáč nasaje video, zvuk nebo fotku.",
      f2_t: "Vysavač kanálů", f2_d: "Celý kanál nebo posledních X videí najednou, ve formátu, jaký chceš.",
      f3_t: "Sosogram", f3_d: "Profily a příběhy na jednom místě, přehledně a rychle.",
      f4_t: "Sosify", f4_d: "Hudba z YouTube a SoundCloudu, oblíbené a přehrávač v title baru.",
      f5_t: "Editor a MP3 střih", f5_d: "Střih, text, přechody a sociální poměry jako 9:16. Export jedním klikem.",
      f6_t: "Konvertor", f6_d: "GIF, MP3 i video s kvalitou od malé po nejvyšší.",
      b_h: "Jedna cena. Navždy tvůj.", b_s: "Kup jednou, účet si vytvoříš při nákupu. Každý nový update si pak stáhneš po přihlášení.",
      b_tag: "Plná verze", b_li1: "Všechny funkce bez limitů", b_li2: "Updaty zdarma", b_li3: "Stažení kdykoli po přihlášení",
      b_btn: "Koupit za 10 €", b_owned: "Už vlastníš Sosáče ✓",
      d_h: "Stáhnout", d_s: "Stahování je jen pro zákazníky. Přihlas se účtem, se kterým jsi nakupoval.",
      d_locked_h: "Stažení je zamčené 🔒", d_locked_p: "Přihlas se účtem, se kterým jsi koupil Sosáče.", d_login: "Přihlásit se", d_nothave: "Ještě nemám, koupím",
      d_hi: "Ahoj 👋", d_nolic: "Tento účet zatím nemá zakoupenou licenci:", d_pay_note: "Platba jde přes Stripe a licence se připíše automaticky, obvykle do pár sekund. Pokud jsi právě zaplatil,", d_refresh: "obnov stav",
      d_bought: "Koupeno ✓", d_latest: "Nejnovější verze pro Windows", d_btn: "Stáhnout Sosáče", d_new: "Co je nového:", d_none_h: "Zatím není nahrána žádná verze", d_none_p: "Podívej se sem za chvíli.",
      cfg_missing: "Stránka ještě není propojena se Supabase. Vyplň config.js podle SETUP.md.", cfg_toast: "Nejprve vyplň config.js (viz SETUP.md)",
      m_close: "Zavřít", m_login_h: "Přihlášení", m_reg_h: "Vytvoř účet", m_login_s: "Vítej zpět. Přihlas se a stáhni Sosáče.", m_reg_s: "Účet potřebuješ k nákupu, podle něj Sosáč pozná zákazníka.",
      m_tab_login: "Přihlásit", m_tab_reg: "Registrovat", m_email: "E-mail", m_pw: "Heslo", m_pw_ph: "alespoň 8 znaků", m_do_reg: "Vytvořit účet", m_do_login: "Přihlásit se", m_forgot: "Zapomenuté heslo",
      m_logging: "Přihlašuji…", m_bad: "Špatný e-mail nebo heslo.", m_short: "Heslo musí mít alespoň 8 znaků.", m_creating: "Vytvářím účet…",
      m_confirm: "Poslali jsme ti potvrzovací e-mail. Potvrď ho a přihlas se.", m_need_email: "Napiš e-mail nahoře.", m_reset_sent: "Poslali jsme odkaz na obnovu hesla.",
      t_welcome: "Vítej zpět! 👋", t_created: "Účet vytvořen 🎉", t_out: "Odhlášen", t_found: "Licence nalezena ✓", t_nothing: "Zatím nic, zkus to za chvíli",
      t_have: "Sosáče už máš koupeného ✓", t_paid: "Platba přijata, ověřuji licenci…", t_done: "Hotovo, můžeš stahovat 🎉", t_pw: "Heslo změněno ✓",
      buy_need_acc: "Nejdřív si vytvoř účet, pak tě pošleme na platbu.",
      p_h: "Můj účet", p_full: "Plná verze ✓", p_none: "Bez licence", p_go: "Přejít na stažení", p_out: "Odhlásit se",
      rec_h: "Nové heslo", rec_s: "Zadej nové heslo.", rec_save: "Uložit", rec_min: "Alespoň 8 znaků.",
      dl_prep: "Připravuji odkaz…", dl_fail: "Stahování selhalo: ", dl_start: "Stahování začalo ✓",
      toc_h: "OBSAH", toc_default: "Obsah", foot: "Vyrobeno s láskou a hadicí", lang: "Jazyk"
    }
  };
  var NAMES = { en: "English", sk: "Slovenčina", cs: "Čeština" };
  var lang = "en";
  try { var s = localStorage.getItem("sosac_lang"); if (s && D[s]) lang = s; } catch (e) {}

  window.I18N = {
    names: NAMES,
    add: function (l, o) { Object.assign(D[l], o); },
    get lang() { return lang; },
    t: function (k) { return (D[lang] && D[lang][k]) || D.en[k] || k; },
    set: function (l) {
      if (!D[l]) return;
      lang = l;
      try { localStorage.setItem("sosac_lang", l); } catch (e) {}
      this.apply();
      document.dispatchEvent(new CustomEvent("langchange", { detail: l }));
    },
    apply: function () {
      document.documentElement.lang = lang;
      var T = this.t;
      document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = T(el.getAttribute("data-i18n")); });
      document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.setAttribute("placeholder", T(el.getAttribute("data-i18n-ph"))); });
      var lb = document.getElementById("langLb"); if (lb) lb.textContent = lang.toUpperCase();
      document.querySelectorAll("#langMenu [data-lang]").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-lang") === lang); });
    }
  };
  window.t = function (k) { return window.I18N.t(k); };
})();
