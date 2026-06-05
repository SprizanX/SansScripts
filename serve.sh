#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /sdcard/Download/SansScripts

PORT=8090

echo "[1/3] Stop old server on port $PORT (if any)..."
pkill -f "python -m http.server $PORT" 2>/dev/null || true
pkill -f "python3 -m http.server $PORT" 2>/dev/null || true

echo "[2/3] Start server..."
echo "Open in Chrome: http://127.0.0.1:$PORT/?v=1"
python -m http.server "$PORT"
