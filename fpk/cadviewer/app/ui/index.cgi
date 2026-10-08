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

# ── 权限判定：某 uid 对某路径是否可读（模仿内核的判定顺序）─────────────────
# 为什么需要：真机实测**应用进程能读到不属于它的文件**（详情见技能），
# 而「桌面访问」设置**不保护 URL** ✗ —— 所以后端要自己判。
# 返回：0 可读 / 1 不可读 / 2 无法判定
can_read_as() {
  local uid="$1" path="$2"
  [ -n "$uid" ] || return 2
  local owner grp
  owner=$(stat -c '%u' "$path" 2>/dev/null) || return 2
  grp=$(stat -c '%g' "$path" 2>/dev/null) || return 2

  # ① 先用权限位算基线（owner / group / other）
  #    用 %A 的符号形式（-rwx--x--x），比 %a 好解析，也不用管 setuid 那一位
  local sym
  sym=$(stat -c '%A' "$path" 2>/dev/null) || return 2
  local m_owner="${sym:1:3}" m_group="${sym:4:3}" m_other="${sym:7:3}"

  # ② 有扩展 ACL 就用 ACL 覆盖（命名条目优先）
  local acl=""
  acl=$(getfacl -c "$path" 2>/dev/null) || acl=""
  local a_user="" a_group="" a_other="" a_mask="" a_named_user="" a_named_group=""
  if [ -n "$acl" ]; then
    a_user=$(printf '%s\n' "$acl" | awk -F: '$1=="user"&&$2==""{print $3; exit}')
    a_group=$(printf '%s\n' "$acl" | awk -F: '$1=="group"&&$2==""{print $3; exit}')
    a_other=$(printf '%s\n' "$acl" | awk -F: '$1=="other"{print $3; exit}')
    a_mask=$(printf '%s\n' "$acl" | awk -F: '$1=="mask"{print $3; exit}')
    a_named_user=$(printf '%s\n' "$acl" | awk -F: -v u="$uid" '$1=="user"&&$2==u{print $3; exit}')
  fi

  local perm=""
  if [ "$uid" = "$owner" ]; then
    perm="${a_user:-$m_owner}"
  elif [ -n "$a_named_user" ]; then
    perm="$a_named_user"
  else
    local gs g
    gs=" $(id -G "$uid" 2>/dev/null | tr '\n' ' ') "
    if [ -n "$acl" ]; then
      for g in $gs; do
        a_named_group=$(printf '%s\n' "$acl" | awk -F: -v g="$g" '$1=="group"&&$2==g{print $3; exit}')
        [ -n "$a_named_group" ] && break
      done
    fi
    if [ -n "$a_named_group" ]; then
      perm="$a_named_group"
    elif printf '%s' "$gs" | grep -q " $grp "; then
      perm="${a_group:-$m_group}"
    else
      perm="${a_other:-$m_other}"
    fi
  fi

  [ -n "$perm" ] || return 2
  case "$perm" in *r*) ;; *) return 1 ;; esac
  # 非 owner 且存在 mask 时，还要过 mask
  if [ -n "$a_mask" ] && [ "$uid" != "$owner" ]; then
    case "$a_mask" in *r*) ;; *) return 1 ;; esac
  fi
  return 0
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
    echo "读前 16 字节  : $(head -c 16 "$P" 2>&1 | od -An -tx1 | head -1)"
    echo
    echo "-- getfacl（完整，一行一条）--"
    if command -v getfacl >/dev/null 2>&1; then
      getfacl -p "$P" 2>&1 | sed 's/^/   /'
    else
      echo "   (无 getfacl)"
    fi
    echo
    echo "-- 权限判定（按**请求者 uid** 算，模仿内核顺序）--"
    RUID="${HTTP_X_TRIM_USERID:-}"
    echo "   请求者 uid    : ${RUID:-(拿不到)}"
    echo "   请求者用户名  : ${HTTP_X_TRIM_USERNAME:-(未设置)}"
    echo "   该用户的组    : $([ -n "$RUID" ] && id -G "$RUID" 2>&1 || echo '-')"
    echo "   文件 owner/组 : $(stat -c 'uid=%u gid=%g' "$P" 2>&1)"
    can_read_as "$RUID" "$P"
    case $? in
      0) echo "   ★ 判定结果    : **可读** ✓（应放行）" ;;
      1) echo "   ★ 判定结果    : **不可读** ✗（应拒绝 403）" ;;
      *) echo "   ★ 判定结果    : **无法判定**（按策略应拒绝）" ;;
    esac
  fi
  echo
  # ⚠️ 关键：框架到底有没有告诉 CGI「当前是哪个用户」？
  #    TRIM_* 是空的（真机实测），所以身份可能走 CGI 标准变量或某个头。
  #    这段是给"要不要自己做权限判定"提供依据的 ✓
  echo "== CGI 标准变量 / 身份相关 =="
  for v in REMOTE_USER REMOTE_ADDR AUTH_TYPE REQUEST_METHOD REQUEST_URI QUERY_STRING \
           CONTENT_TYPE SERVER_PROTOCOL GATEWAY_INTERFACE SCRIPT_NAME PATH_INFO \
           HTTP_X_TRIM_USERID HTTP_X_TRIM_USERNAME HTTP_X_FORWARDED_USER HTTP_X_USERID; do
    eval "val=\$$v"
    echo "  ${v} = ${val:-(未设置)}"
  done
  echo
  echo "== 环境里与 trim/user/uid 相关的 =="
  env | grep -iE "trim|user|uid|acl" | sort | head -30
  echo
  echo "== 能力集（看有没有绕过文件权限的 capability）=="
  echo "  capsh    : $(command -v capsh >/dev/null 2>&1 && capsh --print 2>&1 | grep -iE 'current|bounding' | head -3 || echo '(无 capsh)')"
  echo "  status   : $(grep -E 'CapEff|CapBnd' /proc/self/status 2>/dev/null | tr '\n' ' ' || echo '(读不到 /proc)')"
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
