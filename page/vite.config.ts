import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type PluginOption } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteStaticCopy } from 'vite-plugin-static-copy'

/** Mirror naming helpers from `@mlightcad/cad-simple-viewer` (not shipped there). */
const LIBREDWG_CONVERTER_PACKAGE = '@mlightcad/libredwg-converter'
const LIBREDWG_PARSER_WORKER_FILE = 'libredwg-parser-worker.js'
const LIBREDWG_PARSER_WASM_FILE = 'libredwg-web.wasm'
const MTEXT_RENDERER_WORKER_FILE = 'mtext-renderer-worker.js'

/**
 * Split heavy peer deps into their own chunks so `cad-simple-viewer-*.js` stays
 * smaller and each package can be cached independently.
 *
 * Keep `data-model` with `geometry-engine` / `graphic-interface` / `common`
 * (tight class hierarchy). Keep `mtext-*` / `shx-parser` with `three-renderer`
 * so they are not absorbed into `cad-simple-viewer` and create a circular chunk
 * edge. `three` includes `three/examples/jsm/*`.
 *
 * Keep Vite's `__vitePreload` helper out of the viewer chunk. Otherwise Rollup
 * places it inside `cad-simple-viewer`, and the tiny app entry must statically
 * import that whole chunk (plus three / data-model) just to call dynamic import.
 */
function viewerManualChunk(id: string): string | undefined {
  const path = id.replace(/\\/g, '/')
  if (
    path.includes('vite/preload-helper') ||
    path.includes('vite/modulepreload-polyfill')
  ) {
    return 'vite-preload'
  }
  if (
    path.includes('/node_modules/three/') ||
    path.includes('/node_modules/.pnpm/three@')
  ) {
    return 'three'
  }
  if (
    path.includes('/@mlightcad/three-renderer/') ||
    path.includes('/@mlightcad/mtext-renderer/') ||
    path.includes('/@mlightcad/mtext-parser/') ||
    path.includes('/@mlightcad/shx-parser/')
  ) {
    return 'three-renderer'
  }
  if (
    path.includes('/@mlightcad/data-model/') ||
    path.includes('/@mlightcad/geometry-engine/') ||
    path.includes('/@mlightcad/graphic-interface/') ||
    path.includes('/@mlightcad/common/')
  ) {
    return 'data-model'
  }
  if (path.includes('/@mlightcad/cad-simple-viewer/')) {
    return 'cad-simple-viewer'
  }
  // ── 完整版（桌面图标入口）用的 Vue 那一套 ────────────────────────────────
  // 单独切块，别把 element-plus（体积最大）塞进任何 CAD chunk 里。
  if (path.includes('/node_modules/element-plus/') || path.includes('/node_modules/.pnpm/element-plus@')) {
    return 'element-plus'
  }
  if (
    path.includes('/node_modules/vue/') ||
    path.includes('/node_modules/@vue/') ||
    path.includes('/node_modules/.pnpm/vue@') ||
    path.includes('/node_modules/.pnpm/@vue+') ||
    path.includes('/vue-i18n/') ||
    path.includes('/@vueuse/') ||
    path.includes('/node_modules/lodash-es/')
  ) {
    return 'vue-vendor'
  }
}

const viewerRuntimeSrc = resolve(
  __dirname,
  'node_modules/@mlightcad/cad-html-plugin/dist/viewer-runtime.iife.js'
)
const hasViewerRuntime = existsSync(viewerRuntimeSrc)

const libredwgDist = `./node_modules/${LIBREDWG_CONVERTER_PACKAGE}/dist`

const libredwgWasmSrc = resolve(
  __dirname,
  'node_modules',
  LIBREDWG_CONVERTER_PACKAGE,
  'dist',
  LIBREDWG_PARSER_WASM_FILE
)

if (!hasViewerRuntime) {
  console.warn(
    '[cad-simple-viewer-example] viewer-runtime.iife.js not found — HTML export (chtml) unavailable. ' +
      'Opening DXF/DWG does not require @mlightcad/cad-html-plugin.'
  )
}

export default defineConfig(({ mode }) => ({
  base: './',
  build: {
    modulePreload: false,
    rollupOptions: {
      input: {
        // 简易版 —— 文件管理器右键预览用（桌面窗口 iframe 里）
        main: resolve(__dirname, 'index.html'),
        // 完整版 —— 桌面图标用（Vue 3 + 菜单/功能区/命令行/状态栏）
        full: resolve(__dirname, 'full/index.html'),
        // 完整版的 openAppAuth 回调页（必须与 full/index.html 同目录：
        // redirectUri 是按当前页面路径推算的绝对路径，见 full/src/nas.ts）
        fullCallback: resolve(__dirname, 'full/callback.html'),
        // 飞牛 openAppAuth 的授权回调页（独立浏览器环境用）
        callback: resolve(__dirname, 'callback.html')
      },
      output: {
        manualChunks: viewerManualChunk
      }
    }
  },
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: `./node_modules/@mlightcad/cad-simple-viewer/dist/${MTEXT_RENDERER_WORKER_FILE}`,
          dest: 'assets',
          rename: { stripBase: true }
        },
        {
          src: `${libredwgDist}/${LIBREDWG_PARSER_WORKER_FILE}`,
          dest: 'assets',
          rename: { stripBase: true }
        },
        ...(existsSync(libredwgWasmSrc)
          ? [
              {
                src: `${libredwgDist}/${LIBREDWG_PARSER_WASM_FILE}`,
                dest: 'assets',
                rename: { stripBase: true }
              }
            ]
          : []),
        ...(hasViewerRuntime
          ? [
              {
                src: './node_modules/@mlightcad/cad-html-plugin/dist/viewer-runtime.iife.js',
                dest: 'assets',
                rename: { stripBase: true }
              }
            ]
          : []),
        // ── cad-data（字体/数据/模板）**不在这里拷** ───────────────────────
        // 理由：这 54 MB 的字体在仓库里是**预置**的（`app/ui/www/cad-data/`），
        // 每次构建都重新拷一遍纯属浪费时间 ✗。
        // 页面里 `baseUrl: './cad-data/'` 指向的就是那份 ✓
        // （上游数据来源：mlightcad/cad-data，见 README）
      ]
    }),
    mode === 'analyze' &&
      visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true })
  ].filter(Boolean) as PluginOption[]
}))
