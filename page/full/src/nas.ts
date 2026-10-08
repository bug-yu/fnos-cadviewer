/**
 * 从飞牛 NAS 打开图纸 —— 本应用新增（完整版用）。
 *
 * ## 为什么走官方选择器
 *
 * 飞牛开放 API 的 `pickUserFile` **本身就是浏览器**，而且**用户选完会自动把
 * 该文件授权给本应用**，返回的是**已授权的绝对路径** ✓
 * → 应用侧不用自己实现目录浏览，也不用自己复刻一套 ACL 判定 ✓✓
 *
 * 官方文档的硬约束（照抄）：
 * > 「打开文件、文件管理器或文件详情前，应用应确保目标路径**来自授权范围**，
 * >  并按需要检查当前用户权限。**页面路由只负责打开页面，不会替应用完成
 * >  文件授权或权限判断**」
 *
 * → 所以路径**只能**来自 `pickUserFile` 的返回值（或已授权目录内的列举结果），
 *   不要自己拼路径去读 ✗
 *
 * ## 两种运行环境（官方文档 + 真机验证）
 *
 * | 环境 | 判据 | 做法 |
 * |---|---|---|
 * | 宿主内（桌面窗口 iframe） | `isStandaloneWeb === false` | 直接 `pickUserFile` |
 * | 独立浏览器标签 | `isStandaloneWeb === true` | `openAppAuth` + `redirectUri` 回调页 |
 *
 * ⚠️ 本应用的**桌面图标入口是 `type: url`** → 会开**浏览器标签** →
 *    走的是 `openAppAuth` 那条（授权页 → 回调页 → postMessage 送回本页）。
 *    （真机踩过：`redirectUri` 写相对 URL 会被解析成站点根 → 404）
 */

/** 授权回调页 postMessage 的消息类型（必须与 `full/callback.html` 里一致） */
export const AUTH_MESSAGE_TYPE = 'cadviewer-auth'

/** 授权 state 存在 sessionStorage 的键（回调页带回来时用来校验） */
const AUTH_STATE_KEY = 'cadviewer.authState'

let sdk: any = null
let sdkTried = false

/**
 * 懒加载飞牛 JS SDK。
 *
 * ⚠️ `@trimjs/web-app` 的 ESM 产物**自包含**（既无裸导入也无相对导入），
 * 所以这里的 `import()` 由打包器正常处理即可，不需要额外的 externals 配置。
 */
export async function getSdk(): Promise<any> {
  if (sdkTried) return sdk
  sdkTried = true
  try {
    const mod: any = await import('@trimjs/web-app')
    sdk = new mod.TrimApp()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[cadviewer] 飞牛 JS SDK 加载失败：', e)
    sdk = null
  }
  return sdk
}

/** 当前是不是「独立浏览器页面」（桌面图标入口会开浏览器标签 → true） */
export async function isStandaloneWeb(): Promise<boolean> {
  const s = await getSdk()
  return !!s && s.isStandaloneWeb === true
}

/**
 * 首页按钮下面那行提示。
 *
 * 顺带把**当前运行环境**显示出来 —— 排查时一眼能看出走的是哪条分支
 * （0.2.2 那次就是靠这行定位「桌面图标打开其实没有文件、不是报错」）。
 */
export async function nasHint(): Promise<string> {
  const s = await getSdk()
  if (!s) {
    return '飞牛 JS SDK 没加载成功 ——「打开 NAS 上的图纸」不可用；本地文件仍可拖进来打开 ✓'
  }
  return s.isStandaloneWeb === true
    ? '当前是独立浏览器页面 → 点击会弹出飞牛的授权页'
    : '当前在飞牛桌面窗口内 → 点击会弹出飞牛的文件选择器'
}

/** 「打开 NAS 上的图纸」的结果 */
export type NasPickResult =
  /** 已经拿到已授权的绝对路径（宿主内） */
  | { kind: 'path'; path: string }
  /** 已弹出授权页，结果稍后由回调页 postMessage 送回来（独立浏览器） */
  | { kind: 'redirect' }
  | { kind: 'error'; message: string }

/** 点「打开 NAS 上的图纸」 */
export async function pickNasFile(): Promise<NasPickResult> {
  const s = await getSdk()
  if (!s) {
    return { kind: 'error', message: '飞牛 JS SDK 没加载成功，无法打开 NAS 文件' }
  }
  try {
    if (s.isStandaloneWeb === true) {
      const state = Math.random().toString(36).slice(2)
      sessionStorage.setItem(AUTH_STATE_KEY, state)
      // ⚠️ redirectUri 必须是**绝对路径** ✗ —— 用 './callback.html' 会被解析成
      //    站点根 `/callback.html` → 404（真机踩到：跳过去是飞牛的 404 页）
      //    这里按**当前页面路径**推算：…/index.cgi/full/index.html
      //                              → …/index.cgi/full/callback.html ✓
      const base = location.pathname.replace(/[^/]*$/, '')
      await s.openAppAuth(
        'pickUserFile',
        {
          appName: 'cadviewer',
          directory: false,
          redirectUri: `${base}callback.html`,
          state
        },
        { target: '_blank', features: 'width=750,height=630' }
      )
      return { kind: 'redirect' }
    }

    const r = await s.pickUserFile({ directory: false, accept: ['.dwg', '.dxf'] })
    const p = r && r.data && r.data[0]
    if (!p) return { kind: 'error', message: '没有拿到文件路径（可能取消了选择）' }
    return { kind: 'path', path: String(p) }
  } catch (e) {
    return { kind: 'error', message: `调用飞牛文件选择器失败：${e}` }
  }
}

/** 监听授权回调页送回的结果（同源校验 + state 校验） */
export function listenAuthCallback(
  onPath: (path: string) => void,
  onError: (message: string) => void
): void {
  window.addEventListener('message', (ev: MessageEvent) => {
    if (ev.origin !== window.location.origin) return
    const d: any = ev.data
    if (!d || d.type !== AUTH_MESSAGE_TYPE) return
    const expect = sessionStorage.getItem(AUTH_STATE_KEY)
    if (d.state && expect && d.state !== expect) return
    if (d.path) onPath(String(d.path))
    else onError(`没有拿到文件路径：${(d.raw && d.raw.msg) || '（未知原因）'}`)
  })
}

/**
 * 应用根（`<root>/`）—— 完整版页面在 `<root>/full/index.html`，
 * 所以 `../` 就是根。用 `document.baseURI` 推算 → **部署到任何前缀下都对** ✓
 * （0.2.3 踩过：`redirectUri` 写相对 URL 被解析成站点根 → 404）
 *
 * ⚠️ 之所以不写死 `'../cad-data/'` 这种相对串：库里的 `url` 参数**不做 base 解析** ✗
 */
export const APP_ROOT = new URL("../", document.baseURI).href

/** 内置资源（字体/模板/data）—— 与简易版**共用**同一份，见 page/build.py */
export const CAD_DATA_BASE_URL = new URL("cad-data/", APP_ROOT).href

/** LibreDWG 的解析 worker（同目录放着 9.5 MB 的 `libredwg-web.wasm`，共享一份） */
export const LIBREDWG_WORKER_URL = new URL(
  "assets/libredwg-parser-worker.js",
  APP_ROOT
).href

/** 「导出为 HTML」用的离线查看器运行时 */
export const HTML_VIEWER_RUNTIME_URL = new URL(
  "assets/viewer-runtime.iife.js",
  APP_ROOT
).href

/**
 * 图纸的读取地址：走**同源**的 `api/raw`（我们自己的 CGI）。
 *
 * ⚠️ 为什么不让查看器直接读 `/vol1/…` 那个绝对路径：
 * 页面是浏览器里的静态资源，**没有**文件系统权限；而 `api/raw` 挂在网关后面，
 * 由后端按**请求者 uid** 决定给不给 ✓
 *
 * ⚠️⚠️ **必须是绝对 URL** ✗ —— 库里的 `url` 参数内部会 `new URL(url)`（不带 base），
 * 传 `../api/raw?…` 这种相对地址会直接抛 `Failed to construct 'URL': Invalid URL`
 * （本地 headless 实测抓到过 ✓）
 */
export function rawFileUrl(path: string): string {
  return new URL(`api/raw?filePath=${encodeURIComponent(path)}`, APP_ROOT).href
}

/**
 * 把 NAS 上的图纸读成 `File`（文件名保留**真实扩展名**）。
 *
 * ⚠️ 为什么不直接把 URL 交给查看器：`MlCadViewer` 的 `url` prop 会按
 * **URL 路径的扩展名**判文件类型，而我们的路径是 `/api/raw`（无扩展名）
 * → 判不出 DWG/DXF → 文档打不开（本地 headless 实测：标题停在 "Untitled"、画布空白）✗
 * 自己造 `File` 就没这个问题 ✓ —— 这也是**简易版真机已验证**的做法 ✓
 *
 * @throws Error 带**服务端返回的原因**（否则界面上只有个状态码，没法定位 ——
 *         0.2.1 真机就只看到「HTTP 400」，还得回来翻代码才知道是参数名对不上 ✗）
 */
export async function fetchNasDrawing(path: string): Promise<File> {
  const res = await fetch(rawFileUrl(path), { credentials: 'same-origin' })
  if (!res.ok) {
    let detail = ''
    try {
      detail = (await res.text()).trim().slice(0, 200)
    } catch {
      /* 拿不到就算了 */
    }
    const tail = detail ? `：${detail}` : ''
    throw new Error(
      res.status === 403
        ? `没有权限读取这个文件${tail}`
        : `读取文件失败（HTTP ${res.status}）${tail}`
    )
  }
  const buf = await res.arrayBuffer()
  // 文件名必须带扩展名（类型判定靠它）
  const name = decodeURIComponent(path).split('/').pop() || 'drawing.dwg'
  return new File([buf], name)
}

/**
 * 从当前 URL 查询串里取要打开的图纸路径。
 *
 * 飞牛在「用本应用打开」时会把文件**绝对路径**追加为 `path` 查询参数。
 * 这里再兜几个常见写法（`filePath` / `file`），免得因为参数名不一致白排查
 * —— 0.2.1 真机就踩过「页面发 filePath、后端读 path」的参数名不一致 ✓
 */
export function pathFromQuery(): string {
  const q = new URLSearchParams(location.search)
  let path = q.get('path') || q.get('filePath') || q.get('file') || ''
  if (path.startsWith('file://')) {
    path = decodeURIComponent(path.slice('file://'.length))
  }
  return path
}
