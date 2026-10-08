#!/bin/bash
# CAD 查看器 —— CGI 入口：静态文件服务 + 两个 API。
#
# 官方文档：应用提供可执行的 app/ui/index.cgi，飞牛在调用前会**校验 NAS 用户登录态**，
# 请求沿用当前访问域名。
# ⚠️ 但入口配置里**不要写** protocol/port —— 实测框架会拿它拼 URL（文档说忽略，实际不忽略 ✗）。
#
# 路由：
#   /api/raw?path=<绝对路径>   读文件并输出字节（给查看器用）
#   /api/diag?path=<绝对路径>  诊断：当前身份 + 该路径的可见性/可读性
#   /<其它>                    静态文件（www/ 下）
#
# ⚠️ 基础目录从**脚本自身位置**推导，不依赖 TRIM_* 环境变量 —— 少一个出错的地方。
SELF_DIR="$(cd "$(dirname "$0")" && pwd)"
BASE_PATH="${SELF_DIR}/www"

URI_NO_QUERY="${REQUEST_URI%%\?*}"
QUERY="${REQUEST_URI#*\?}"
[ "$QUERY" = "$REQUEST_URI" ] && QUERY=""

REL_PATH="/"
case "$URI_NO_QUERY" in
  *index.cgi*) REL_PATH="${URI_NO_QUERY#*index.cgi}" ;;
esac
[ -z "$REL_PATH" ] && REL_PATH="/"

# ── URL 解码（纯 bash，不依赖 python 等）────────────────────────────────────
urldecode() {
  local s="${1//+/ }"
  printf '%b' "${s//%/\\x}"
}

# 取查询串里的某个参数（已解码）
qget() {
  local key="$1" pair val
  local IFS='&'
  for pair in $QUERY; do
    case "$pair" in
      "$key"=*) val="${pair#*=}"; urldecode "$val"; return 0 ;;
    esac
  done
  return 1
}

# 目标路径参数：**页面用的是 `filePath`**（沿用 FileView 那套页面的补丁），
# 同时接受 `path`（我们自己的诊断页/手工调用更顺手）。
# ⚠️ 0.2.0 只认 `path` → 右键预览报「缺少 path 参数」✗（真机踩到）
qget_path() {
  qget filePath || qget path
}

send_status() {
  echo "Status: $1"
  echo "Content-Type: text/plain; charset=utf-8"
  echo ""
  echo "$2"
}

# ── API: /api/diag —— 诊断（回答「后端到底能不能读别人的文件」）────────────
if [ "$REL_PATH" = "/api/diag" ]; then
  P="$(qget_path || true)"
  echo "Content-Type: text/plain; charset=utf-8"
  echo "Cache-Control: no-store"
  echo ""
  echo "== 当前身份 =="
  echo "id           : $(id 2>&1)"
  echo "whoami       : $(whoami 2>&1)"
  echo "pwd          : $(pwd 2>&1)"
  echo "SELF_DIR     : ${SELF_DIR}"
  echo "TRIM_APPDEST : ${TRIM_APPDEST:-(未设置)}"
  echo "TRIM_PKGVAR  : ${TRIM_PKGVAR:-(未设置)}"
  echo "TRIM_USERID  : ${TRIM_USERID:-(未设置)}"
  echo "TRIM_USERNAME: ${TRIM_USERNAME:-(未设置)}"
  echo
  echo "== 目标路径 =="
  echo "path         : ${P:-(未传)}"
  if [ -n "$P" ]; then
    echo "-e           : $([ -e "$P" ] && echo yes || echo no)"
    echo "-f           : $([ -f "$P" ] && echo yes || echo no)"
    echo "-r           : $([ -r "$P" ] && echo yes || echo no)"
    echo "ls -ld       : $(ls -ld "$P" 2>&1)"
    echo "stat         : $(stat -c 'mode=%a owner=%U:%G size=%s' "$P" 2>&1)"
    echo "getfacl      : $(command -v getfacl >/dev/null 2>&1 && getfacl -p "$P" 2>&1 | tr '\n' '|' || echo '(无 getfacl)')"
    echo "读前 16 字节  : $(head -c 16 "$P" 2>&1 | od -An -tx1 | head -1)"
  fi
  exit 0
fi

# ── API: /api/raw —— 读文件（给查看器）──────────────────────────────────────
if [ "$REL_PATH" = "/api/raw" ]; then
  P="$(qget_path || true)"
  if [ -z "$P" ]; then
    send_status "400 Bad Request" "缺少 path 参数"
    exit 0
  fi
  # 只允许 /vol 下的绝对路径，且不含 ..
  case "$P" in
    /vol*) ;;
    *) send_status "400 Bad Request" "路径必须是 /vol 下的绝对路径：$P"; exit 0 ;;
  esac
  case "$P" in
    *..*) send_status "400 Bad Request" "路径不能包含 .."; exit 0 ;;
  esac
  if [ ! -f "$P" ]; then
    send_status "404 Not Found" "文件不存在或不可读：$P"
    exit 0
  fi
  if [ ! -r "$P" ]; then
    send_status "403 Forbidden" "没有读取权限：$P"
    exit 0
  fi
  SIZE="$(stat -c '%s' "$P" 2>/dev/null)"
  echo "Content-Type: application/octet-stream"
  [ -n "$SIZE" ] && echo "Content-Length: $SIZE"
  echo "Cache-Control: no-store"
  echo "X-Content-Type-Options: nosniff"
  echo ""
  cat "$P"
  exit 0
fi

# ── 静态文件 ────────────────────────────────────────────────────────────────
if [ "$REL_PATH" = "/" ]; then
  REL_PATH="/index.html"
fi
case "$REL_PATH" in
  */) REL_PATH="${REL_PATH}index.html" ;;
esac

TARGET_FILE="${BASE_PATH}${REL_PATH}"

if echo "$TARGET_FILE" | grep -q '\.\.'; then
  send_status "400 Bad Request" "Bad Request"
  exit 0
fi

if [ ! -f "$TARGET_FILE" ]; then
  send_status "404 Not Found" "404 Not Found: ${REL_PATH}"
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
  # ★ WASM 的 MIME 必须对，否则 WebAssembly.instantiateStreaming 会拒绝
  wasm)     mime="application/wasm" ;;
  shx|ttf|woff|woff2|dxf|dwg) mime="application/octet-stream" ;;
  *)        mime="application/octet-stream" ;;
esac

echo "Content-Type: $mime"
echo "Cache-Control: no-cache"
echo ""
cat "$TARGET_FILE"
