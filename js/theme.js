(() => {
  "use strict";

  const STORAGE_KEY = "theme"; // dark | light | system

  const qs = (sel) => document.querySelector(sel);
  const qsa = (sel) => Array.from(document.querySelectorAll(sel));

  function normalizeTheme(v) {
    if (v === "dark" || v === "light" || v === "system") return v;
    return "system";
  }

  function applyTheme(theme) {
    const t = normalizeTheme(theme);
    const root = document.documentElement;

    if (t === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", t);
    }
  }

  function setActiveButton(theme) {
    const t = normalizeTheme(theme);
    const buttons = qsa(".segBtn");
    buttons.forEach((b) => b.classList.remove("isActive"));

    const active = buttons.find((b) => (b.dataset.theme || "") === t);
    if (active) active.classList.add("isActive");
  }

  function loadTheme() {
    try {
      return normalizeTheme(localStorage.getItem(STORAGE_KEY));
    } catch (_) {
      return "system";
    }
  }

  function saveTheme(theme) {
    const t = normalizeTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch (_) {
      // ignore
    }
    return t;
  }

  function openPanel(btn, panel, overlay) {
    panel.style.display = "block";
    overlay.style.display = "block";
    panel.setAttribute("aria-hidden", "false");
    overlay.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
  }

  function closePanel(btn, panel, overlay) {
    panel.style.display = "none";
    overlay.style.display = "none";
    panel.setAttribute("aria-hidden", "true");
    overlay.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
  }

  function isOpen(panel) {
    return panel.style.display === "block";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const btn = qs("#themeBtn");
    const panel = qs("#themePanel");
    const overlay = qs("#themeOverlay");
    if (!btn || !panel || !overlay) return;

    // init theme
    const current = loadTheme();
    applyTheme(current);
    setActiveButton(current);

    // open/close by button
    btn.addEventListener("click", () => {
      if (isOpen(panel)) {
        closePanel(btn, panel, overlay);
      } else {
        openPanel(btn, panel, overlay);
      }
    });

    // close by tapping outside
    overlay.addEventListener("click", () => closePanel(btn, panel, overlay));

    // close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen(panel)) closePanel(btn, panel, overlay);
    });

    // theme selection
    qsa(".segBtn").forEach((b) => {
      b.addEventListener("click", () => {
        const next = saveTheme(b.dataset.theme);
        applyTheme(next);
        setActiveButton(next);
        closePanel(btn, panel, overlay);
      });
    });
  });
})();
