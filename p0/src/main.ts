/**
 * P0 验证页：飞牛开放 API 的 `pickUserFile` 能不能在**桌面窗口（微应用环境）**里用。
 *
 * 为什么要先验这个：整个「CAD 查看器」应用的核心就是
 * 「让用户选 NAS 上的图纸 → 拿到已授权的路径 → 交给查看器打开」。
 * 如果这个 API 在桌面窗口里不可用，方案就要换（改成自己实现浏览 + 权限判定）。
 *
 * 设计成**诊断优先**：页面一打开就自动检测环境 + 读平台配置，
 * 这样即使不点任何按钮，截一张图就能判断 SDK 通没通。
 */
import { TrimApp } from '@trimjs/web-app'

const $ = (id: string) => document.getElementById(id) as HTMLElement
const out = $('out')
const env = $('env')
const envHint = $('envHint')
const cfgEl = $('cfg')

let sdk: any = null

function stamp(): string {
  return new Date().toLocaleTimeString('zh-CN', { hour12: false })
}

/** 把结果写到「结果」卡片里 —— 出错时用户截这一块就够 */
function log(title: string, data: unknown): void {
  let body: string
  if (data === undefined) {
    body = '（undefined）'
  } else if (typeof data === 'string') {
    body = data
  } else {
    try {
      body = JSON.stringify(data, null, 2)
    } catch {
      body = String(data)
    }
  }
  out.textContent = `[${stamp()}] ${title}\n${body}`
}

function errText(e: unknown): string {
  if (e instanceof Error) {
    return `${e.name}: ${e.message}${e.stack ? '\n' + e.stack.split('\n').slice(0, 4).join('\n') : ''}`
  }
  return String(e)
}

// ── ① 环境检测（自动跑）────────────────────────────────────────────────
try {
  sdk = new TrimApp()
  const isWeb = sdk.isWeb
  const standalone = sdk.isStandaloneWeb

  env.innerHTML = `
    <b>isWeb</b><span class="${isWeb ? 'ok' : 'bad'}">${isWeb}</span>
    <b>isStandaloneWeb</b><span class="${standalone ? 'bad' : 'ok'}">${standalone}</span>
    <b>SDK 初始化</b><span class="ok">成功（@trimjs/web-app）</span>
  `
  envHint.innerHTML = standalone
    ? '<span class="warn">⚠️ 被当成「独立浏览器」页面</span> —— 这种环境下 <code>pickUserFile</code> 不可用，' +
      '要走 <code>openAppAuth</code>。多半说明**没跑在宿主里**（检查 manifest 的 <code>micro_app=true</code> 与入口 type）。'
    : '<span class="ok">✅ 跑在宿主环境里</span> —— 直接调用 <code>pickUserFile</code> 即可（这正是 P0 要验的）'
} catch (e) {
  env.innerHTML = `<b>SDK 初始化</b><span class="bad">失败</span>`
  log('❌ SDK 初始化失败', errText(e))
}

// ── ② 平台配置（自动跑；能读出来就说明 SDK 是活的）──────────────────────
if (sdk) {
  sdk
    .getPlatformConfig()
    .then((c: unknown) => {
      cfgEl.textContent = JSON.stringify(c, null, 2)
    })
    .catch((e: unknown) => {
      cfgEl.textContent = '读取失败：\n' + errText(e)
    })
}

// ── ③ 选择文件 / 目录 ──────────────────────────────────────────────────
async function pick(opts: Record<string, unknown>, label: string): Promise<void> {
  if (!sdk) {
    log('❌ 无法调用', 'SDK 没初始化成功（见上面①）')
    return
  }
  const standalone = sdk.isStandaloneWeb
  if (standalone) {
    log(
      '⚠️ 当前是独立浏览器环境',
      '这个环境下不能用 pickUserFile，需要走 openAppAuth（本页是 P0 验证，先不做）。\n' +
        '请改用「飞牛桌面窗口」打开本应用再试。'
    )
    return
  }
  log(`调用 pickUserFile（${label}）…`, JSON.stringify(opts))
  try {
    const r = await sdk.pickUserFile(opts)
    if (r === undefined || r === null) {
      log('⚠️ 返回空', '可能是用户取消了选择。再点一次试试。')
      return
    }
    log(`✅ 成功（${label}）—— 这就是已授权给本应用的路径`, r)
  } catch (e) {
    log(`❌ 报错（${label}）`, errText(e))
  }
}

$('pickFile').addEventListener('click', () =>
  pick({ directory: false, accept: ['.dwg', '.dxf'] }, '选文件 · 限 dwg/dxf')
)
$('pickDir').addEventListener('click', () => pick({ directory: true }, '选文件夹'))
$('pickAny').addEventListener('click', () => pick({ directory: false }, '选文件 · 不限扩展名'))
