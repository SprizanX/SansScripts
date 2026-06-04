(() => {
  "use strict";

  const COPY_OK_TEXT = "Скопировано! ✅";
  const COPY_BTN_TEXT = "Скопировать";
  const RESET_MS = 1200;

  function getTextSafely(el) {
    if (!el) return "";
    return (el.textContent || "").trim();
  }

  async function copyModern(text) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) return false;
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      return false;
    }
  }

  function copyFallback(text) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;

      // минимально заметно и безопасно для мобилок
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.left = "-1000px";
      ta.style.opacity = "0";

      document.body.appendChild(ta);
      ta.focus();
      ta.select();

      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return !!ok;
    } catch (_) {
      return false;
    }
  }

  function setHint(hintEl, msg) {
    if (!hintEl) return;
    hintEl.textContent = msg || "";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("copyBtn");
    const codeEl = document.getElementById("scriptCode");
    const hint = document.getElementById("copyHint");

    if (!btn || !codeEl) return;

    let locked = false;
    let resetTimer = null;

    btn.addEventListener("click", async () => {
      if (locked) return;

      const text = getTextSafely(codeEl);
      if (!text) {
        setHint(hint, "Скрипт пустой — вставь текст в index.html");
        return;
      }

      locked = true;
      btn.disabled = true;

      const okModern = await copyModern(text);
      const ok = okModern ? true : copyFallback(text);

      if (ok) {
        btn.textContent = COPY_OK_TEXT;
        setHint(hint, "Готово: скрипт в буфере обмена.");
      } else {
        // полезно на iOS/жёстких WebView
        setHint(hint, "Не удалось скопировать. Нажми и удерживай текст → Copy.");
      }

      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        btn.textContent = COPY_BTN_TEXT;
        btn.disabled = false;
        locked = false;
      }, RESET_MS);
    });
  });
})();
