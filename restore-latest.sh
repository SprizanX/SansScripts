#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /sdcard/Download/SansScripts

BK=$(ls -dt backups/bk_* | head -n 1)
echo "RESTORE FROM: $BK"

cp "$BK/index.html" ./ 2>/dev/null || true
cp -r "$BK/css" ./ 2>/dev/null || true
cp -r "$BK/js" ./ 2>/dev/null || true
cp -r "$BK/assets" ./ 2>/dev/null || true

echo "DONE. Test locally:"
echo "  python -m http.server 8090"
echo "  http://127.0.0.1:8090/?v=1"
