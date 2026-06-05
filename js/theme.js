(() => {
  "use strict";

  const THEME_KEY = "theme"; // dark | light | system
  const LITE_KEY = "lite";   // "1" | "0"

  const qs = (sel) => document.querySelector(sel);
  const qsa = (sel) => Array.from(document.querySelectorAll(sel));

  function normTheme(v){
    if (v === "dark" || v === "light" || v === "system") return v;
    return "system";
  }

  function normLite(v){
    return v === "1" ? "1" : "0";
  }

  function applyTheme(theme){
    const t = normTheme(theme);
    const root = document.documentElement;
    if (t === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", t);
  }

  function applyLite(lite){
    const v = normLite(lite);
    const root = document.documentElement;
    if (v === "1") root.setAttribute("data-lite", "1");
    else root.removeAttribute("data-lite");
  }

  function setActiveThemeBtn(theme){
    const t = normTheme(theme);
    const buttons = qsa(".segBtn[data-theme]");
    buttons.forEach(b => b.classList.remove("isActive"));
    const active = buttons.find(b => (b.dataset.theme || "") === t);
    if (active) active.classList.add("isActive");
  }

  function setActiveLiteBtn(lite){
    const v = normLite(lite);
    const buttons = qsa(".segBtn[data-lite]");
    buttons.forEach(b => b.classList.remove("isActive"));
    const active = buttons.find(b => (b.dataset.lite || "") === v);
    if (active) active.classList.add("isActive");
  }

  function loadTheme(){
    try { return normTheme(localStorage.getItem(THEME_KEY)); }
    catch (_) { return "system"; }
  }

  function loadLite(){
    try { return normLite(localStorage.getItem(LITE_KEY)); }
    catch (_) { return "0"; }
  }

  function saveTheme(theme){
    const t = normTheme(theme);
    try { localStorage.setItem(THEME_KEY, t); } catch (_) {}
    return t;
  }

  function saveLite(lite){
    const v = normLite(lite);
    try { localStorage.setItem(LITE_KEY, v); } catch (_) {}
    return v;
  }

  function openPanel(btn, panel, overlay){
    panel.style.display = "block";
    overlay.style.display = "block";
    panel.setAttribute("aria-hidden","false");
    overlay.setAttribute("aria-hidden","false");
    btn.setAttribute("aria-expanded","true");
  }

  function closePanel(btn, panel, overlay){
    panel.style.display = "none";
    overlay.style.display = "none";
    panel.setAttribute("aria-hidden","true");
    overlay.setAttribute("aria-hidden","true");
    btn.setAttribute("aria-expanded","false");
  }

  function isOpen(panel){
    return panel.style.display === "block";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const btn = qs("#themeBtn");
    const panel = qs("#themePanel");
    const overlay = qs("#themeOverlay");
    if (!btn || !panel || !overlay) return;

    const t = loadTheme();
    const l = loadLite();

    applyTheme(t);
    setActiveThemeBtn(t);

    applyLite(l);
    setActiveLiteBtn(l);

    btn.addEventListener("click", () => {
      if (isOpen(panel)) closePanel(btn, panel, overlay);
      else openPanel(btn, panel, overlay);
    });

    overlay.addEventListener("click", () => closePanel(btn, panel, overlay));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen(panel)) closePanel(btn, panel, overlay);
    });

    qsa(".segBtn[data-theme]").forEach((b) => {
      b.addEventListener("click", () => {
        const next = saveTheme(b.dataset.theme);
        applyTheme(next);
        setActiveThemeBtn(next);
        closePanel(btn, panel, overlay);
      });
    });

    qsa(".segBtn[data-lite]").forEach((b) => {
      b.addEventListener("click", () => {
        const next = saveLite(b.dataset.lite);
        applyLite(next);
        setActiveLiteBtn(next);
        closePanel(btn, panel, overlay);
      });
    });
  });
})();
