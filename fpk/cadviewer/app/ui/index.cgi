#!/bin/bash
# CAD 查看器 —— CGI 轻量入口（纯静态服务）。
#
# 官方文档：应用提供可执行的 app/ui/index.cgi，飞牛在调用前会**校验 NAS 用户登录态**，
# 请求沿用当前访问域名、忽略 protocol/port。
#
# ⚠️ 基础目录从**脚本自身位置**推导，不依赖 TRIM_* 环境变量 —— 少一个出错的地方。
SELF_DIR="$(cd "$(dirname "$0")" && pwd)"
BASE_PATH="${SELF_DIR}/www"

URI_NO_QUERY="${REQUEST_URI%%\?*}"
REL_PATH="/"

case "$URI_NO_QUERY" in
  *index.cgi*)
    REL_PATH="${URI_NO_QUERY#*index.cgi}"
    ;;
esac

if [ -z "$REL_PATH" ] || [ "$REL_PATH" = "/" ]; then
  REL_PATH="/index.html"
fi

# 目录请求 → 补 index.html
case "$REL_PATH" in
  */) REL_PATH="${REL_PATH}index.html" ;;
esac

TARGET_FILE="${BASE_PATH}${REL_PATH}"

# 防路径穿越
if echo "$TARGET_FILE" | grep -q '\.\.'; then
  echo "Status: 400 Bad Request"
  echo "Content-Type: text/plain; charset=utf-8"
  echo ""
  echo "Bad Request"
  exit 0
fi

if [ ! -f "$TARGET_FILE" ]; then
  echo "Status: 404 Not Found"
  echo "Content-Type: text/plain; charset=utf-8"
  echo ""
  echo "404 Not Found: ${REL_PATH}"
  exit 0
fi

case "${TARGET_FILE##*.}" in
  html|htm) mime="text/html; charset=utf-8" ;;
  css)      mime="text/css; charset=utf-8" ;;
  js|mjs)   mime="application/javascript; charset=utf-8" ;;
  json)     mime="application/json; charset=utf-8" ;;
  png)      mime="image/png" ;;
  jpg|jpeg) mime="image/jpeg" ;;
  gif)      mime="image/gif" ;;
  svg)      mime="image/svg+xml" ;;
  ico)      mime="image/x-icon" ;;
  # 后续 CAD 页面要用到（WASM 的 MIME 必须对，否则 instantiateStreaming 会拒绝）
  wasm)     mime="application/wasm" ;;
  shx|ttf|woff|woff2|dxf|dwg) mime="application/octet-stream" ;;
  *)        mime="application/octet-stream" ;;
esac

echo "Content-Type: $mime"
echo "Cache-Control: no-cache"
echo ""
cat "$TARGET_FILE"
