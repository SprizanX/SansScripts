# SansScripts (Termux Landing)

## Быстрые правки (самое важное)

### 1) Ссылки (Telegram / TikTok / YouTube)
Файл: `index.html`

Ищи блок:
- Telegram кнопка: `href="https://t.me/FluxusDeltascripts"`
- TikTok кнопка: `href="https://www.tiktok.com/..."`
- YouTube кнопка: `href="https://youtube.com/@..."`

Меняешь `href` на свои ссылки — готово.

### 2) Скрипт в блоке “Скопировать”
Файл: `index.html`

Ищи строку:
`loadstring(game:HttpGet("ВСТАВЬ_ССЫЛКУ_НА_СКРИПТ"))()`

Вставь свой URL вместо `ВСТАВЬ_ССЫЛКУ_НА_СКРИПТ`.

### 3) OG-картинка (превью Telegram)
Файлы:
- Картинка: `assets/og.png`
- Метатеги: `index.html` (og:url / og:image)

Публичные ссылки (GitHub Pages):
- Site: https://sprizanx.github.io/SansScripts/
- OG image: https://sprizanx.github.io/SansScripts/assets/og.png

Если Telegram показывает старое превью — отправь ссылку с параметром: `?v=2`, `?v=3`, и т.д.

---

## Локальный просмотр (на телефоне)
Из Termux:

1) `cd /sdcard/Download/SansScripts`
2) `python -m http.server 8080`
3) Открыть в браузере: `http://127.0.0.1:8080`

Остановить сервер: `Ctrl + C`

---

## Деплой (GitHub Pages)
После любых изменений:

`git add . && git commit -m "update" && git push origin main`

GitHub Pages уже должен быть включён: Settings → Pages → main / (root).
