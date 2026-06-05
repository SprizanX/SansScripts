# RESTORE (Откат проекта за 30 секунд)

## 1) Перейти в проект
cd /sdcard/Download/SansScripts

## 2) Найти самый свежий бэкап
ls -dt backups/bk_* | head -n 5

## 3) Восстановить из самого свежего бэкапа (перезапишет файлы проекта)
BK=$(ls -dt backups/bk_* | head -n 1) && echo "USE: $BK"

cp "$BK/index.html" ./ 2>/dev/null || true
cp -r "$BK/css" ./ 2>/dev/null || true
cp -r "$BK/js" ./ 2>/dev/null || true
cp -r "$BK/assets" ./ 2>/dev/null || true

## 4) Проверка локально (выбери свободный порт)
python -m http.server 8090

Открыть в браузере:
http://127.0.0.1:8090/?v=1

Остановить сервер:
Ctrl + C

## 5) Если нужно обновить GitHub Pages (после того как локально всё ок)
git add . && git commit -m "restore from backup" && git push origin main
