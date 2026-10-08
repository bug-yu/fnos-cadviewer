<template>
  <div id="app-root">
    <!-- 没有打开图纸时的首页 -->
    <div v-if="!showViewer" class="upload-screen">
      <FileUpload
        @file-select="handleFileSelect"
        @new-drawing="handleNewDrawing"
        @open-nas="handleOpenNas"
      />
      <!-- Stay on upload UI while CAD chunks load — avoids theme background flash -->
      <div v-if="preparingViewer" class="preparing-overlay" aria-live="polite">
        <div class="preparing-spinner" />
        <p>正在准备查看器…</p>
      </div>
    </div>

    <!-- Mount only after the CAD module is ready -->
    <div v-else-if="MlCadViewer" class="viewer-screen">
      <component
        :is="MlCadViewer"
        locale="zh"
        :local-file="store.selectedFile ?? undefined"
        :mode="selectedMode"
        :use-main-thread-draw="useMainThreadDraw"
        :draw-no-plot-layers="drawNoPlotLayers"
        :progressive-rendering="progressiveRendering"
        :open-view-mode="openViewMode"
        :base-url="BASE_URL"
        :html-viewer-runtime-url="HTML_VIEWER_RUNTIME_URL"
        @create="onViewerCreate"
      />
      <!-- ★ 本应用新增：查看器已经打开后，仍然要能再开一张 NAS 图纸
           （上游示例一旦进入查看器就没有回首页的路，所以这里常驻一个小按钮） -->
      <button
        type="button"
        class="nas-fab"
        title="从飞牛 NAS 打开另一张图纸"
        @click="handleOpenNas"
      >
        打开 NAS 图纸
      </button>
    </div>

    <!-- 轻提示（上游示例没有消息通道，这里补一个最小的） -->
    <div v-if="toast" class="app-toast" :class="`is-${toastType}`">
      {{ toast }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  shallowRef,
  type Component
} from 'vue'

import FileUpload from './components/FileUpload.vue'
import {
  CAD_DATA_BASE_URL,
  HTML_VIEWER_RUNTIME_URL,
  LIBREDWG_WORKER_URL,
  fetchNasDrawing,
  isStandaloneWeb,
  listenAuthCallback,
  pathFromQuery,
  pickNasFile
} from './nas'
import { AcApOpenViewMode, AcEdOpenMode } from './openOptions'
import { store } from './store'

/**
 * ⚠️ 上游示例指向公网 CDN（字体/模板数据）—— 本应用是**内网 NAS 应用**，
 * 绝不能依赖公网：离线就废，还会把访问行为暴露出去。
 * 改成同目录的本地副本（`www/cad-data/`，构建时从 mlightcad/cad-data 放进来）。
 *
 * ⚠️ 而且**必须给绝对 URL** ✗ —— 库里的 `url` 参数内部 `new URL(url)` 不做 base 解析，
 * 传 `'../cad-data/'` 这种相对串会抛 `Failed to construct 'URL': Invalid URL`
 * （本地 headless 实测抓到过 ✓）。下面这几个都在 `nas.ts` 里按 `document.baseURI` 算好。
 */
const BASE_URL = CAD_DATA_BASE_URL

const showViewer = computed(
  () => store.selectedFile != null || store.isNewDrawing
)

const selectedMode = ref<AcEdOpenMode>(AcEdOpenMode.Write)
const useMainThreadDraw = ref(false)
const drawNoPlotLayers = ref(false)
const progressiveRendering = ref(false)
const openViewMode = ref<AcApOpenViewMode | undefined>(undefined)
const preparingViewer = ref(false)

const toast = ref('')
const toastType = ref<'info' | 'error' | 'success'>('info')
let toastTimer: ReturnType<typeof setTimeout> | undefined

const showToast = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
  toast.value = message
  toastType.value = type
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(
    () => {
      toast.value = ''
    },
    type === 'error' ? 6000 : 3000
  )
}

const app = getCurrentInstance()!.appContext.app
let i18nInstalled = false
const MlCadViewer = shallowRef<Component>()

const loadCadViewer = async () => {
  if (MlCadViewer.value) return
  const [, { registerLibreDwgConverter }, { MlCadViewer: Viewer, i18n }] =
    await Promise.all([
      import('@mlightcad/cad-simple-viewer'),
      import('./registerLibreDwg'),
      import('@mlightcad/cad-viewer')
    ])
  // Opt into GPL DWG support before the viewer mounts (1.6.0+).
  // ⚠️ 显式给出 worker 地址（默认是 `./assets/…`，那是相对**页面**的 →
  //    完整版页面在 `full/` 下，默认路径会指到 `full/assets/` ✗）
  registerLibreDwgConverter(LIBREDWG_WORKER_URL)
  if (!i18nInstalled) {
    app.use(i18n)
    i18nInstalled = true
  }
  MlCadViewer.value = Viewer as Component
}

/** Warm CAD chunks after first paint so opening a file is faster. */
const prefetchCadStack = () => {
  void Promise.all([
    loadCadViewer(),
    import('@mlightcad/cad-simple-viewer'),
    import('./locale'),
    import('./commands')
  ])
}

/**
 * 打开一张 NAS 上的图纸。
 *
 * ⚠️⚠️ **不要用 MlCadViewer 的 `url` prop** ✗ —— 实测（本地 headless）：
 * 传 `api/raw?filePath=…` 时查看器会去 fetch（请求确实发出去了 ✓），
 * 但它按 **URL 路径的扩展名**判文件类型，而我们的路径是 `/api/raw`（没有扩展名）
 * → 判不出 DWG/DXF → 文档根本打不开（标题停在 "Untitled"，画布空白）✗
 *
 * 所以走**和简易版一模一样**的、真机已验证的方式 ✓：
 *   自己 fetch 字节 → `new File([bytes], '真实文件名.dwg')` → 交给 `localFile`
 * （文件名带扩展名，类型判定就没问题 ✓；错误也能自己带上服务端返回的原因 ✓）
 */
const openNasPath = async (path: string) => {
  if (!path) return
  if (preparingViewer.value) return
  preparingViewer.value = true
  try {
    await loadCadViewer()
    showToast('正在读取图纸…', 'info')
    const file = await fetchNasDrawing(path)
    store.isNewDrawing = false
    // 每次都是新的 File 对象 → MlCadViewer 的 localFile watcher 一定会触发 ✓
    // （连开同一张图纸也没问题 —— 字符串没变导致 watcher 不触发那个坑不存在）
    store.selectedFile = file
  } catch (error) {
    console.error('Failed to open drawing', error)
    showToast(String(error instanceof Error ? error.message : error), 'error')
  } finally {
    preparingViewer.value = false
  }
}

/** 点「打开 NAS 上的图纸」 */
const handleOpenNas = async () => {
  const r = await pickNasFile()
  if (r.kind === 'path') {
    await openNasPath(r.path)
    return
  }
  if (r.kind === 'redirect') {
    showToast('请在弹出的窗口里选择图纸…', 'info')
    return
  }
  showToast(r.message, 'error')
}

onMounted(() => {
  // 授权回调页会把结果 postMessage 回来（同源 + state 校验）
  listenAuthCallback(
    (path) => void openNasPath(path),
    (message) => showToast(message, 'error')
  )

  // 飞牛「用本应用打开」时会把绝对路径追加成 `path` 查询参数
  const fromQuery = pathFromQuery()
  if (fromQuery) {
    void openNasPath(fromQuery)
    return
  }

  const startPrefetch = () => {
    if (showViewer.value || preparingViewer.value) return
    prefetchCadStack()
    // 首页把运行环境显示出来（排查用）
    void isStandaloneWeb()
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(startPrefetch, { timeout: 3000 })
  } else {
    window.setTimeout(startPrefetch, 500)
  }
})

const initialize = async () => {
  const { AcApDocManager, AcEdCommandStack } = await import(
    '@mlightcad/cad-simple-viewer'
  )
  const { initializeLocale } = await import('./locale')
  const { AcApQuitCmd } = await import('./commands')

  initializeLocale()
  if (import.meta.env.DEV) {
    ;(
      window as Window & { AcApDocManager?: typeof AcApDocManager }
    ).AcApDocManager = AcApDocManager
  }
  const register = AcApDocManager.instance.commandManager
  register.addCommand(
    AcEdCommandStack.SYSTEMT_COMMAND_GROUP_NAME,
    'quit',
    'quit',
    new AcApQuitCmd()
  )
  register.addCommand(
    AcEdCommandStack.SYSTEMT_COMMAND_GROUP_NAME,
    'exit',
    'exit',
    new AcApQuitCmd()
  )
}

const createNewDrawing = async () => {
  const { AcApDocManager } = await import('@mlightcad/cad-simple-viewer')
  const success = await AcApDocManager.instance.newDocument({
    mode: selectedMode.value,
    drawNoPlotLayers: drawNoPlotLayers.value,
    progressiveRendering: progressiveRendering.value,
    ...(openViewMode.value != null ? { openViewMode: openViewMode.value } : {})
  })
  if (!success) {
    console.error('Failed to create new drawing')
  }
}

const onViewerCreate = async () => {
  await initialize()
  if (store.isNewDrawing) {
    await nextTick()
    await createNewDrawing()
  }
}

const applyOpenOptions = (
  mode: AcEdOpenMode,
  mainThreadDraw: boolean,
  showNoPlotLayers: boolean,
  enableProgressiveRendering: boolean,
  viewMode: AcApOpenViewMode | undefined
) => {
  selectedMode.value = mode
  useMainThreadDraw.value = mainThreadDraw
  drawNoPlotLayers.value = showNoPlotLayers
  progressiveRendering.value = enableProgressiveRendering
  openViewMode.value = viewMode
}

/** Ensure CAD module is ready before leaving the upload screen. */
const prepareThenOpen = async (open: () => void) => {
  if (preparingViewer.value) return
  preparingViewer.value = true
  try {
    await loadCadViewer()
    open()
  } catch (error) {
    console.error('Failed to load CAD viewer', error)
    showToast(`加载查看器失败：${error}`, 'error')
  } finally {
    preparingViewer.value = false
  }
}

const handleFileSelect = (
  file: File,
  mode: AcEdOpenMode,
  mainThreadDraw: boolean,
  showNoPlotLayers: boolean,
  enableProgressiveRendering: boolean,
  viewMode: AcApOpenViewMode | undefined
) => {
  void prepareThenOpen(() => {
    store.isNewDrawing = false
    applyOpenOptions(
      mode,
      mainThreadDraw,
      showNoPlotLayers,
      enableProgressiveRendering,
      viewMode
    )
    store.selectedFile = file
  })
}

const handleNewDrawing = (
  mode: AcEdOpenMode,
  mainThreadDraw: boolean,
  showNoPlotLayers: boolean,
  enableProgressiveRendering: boolean,
  viewMode: AcApOpenViewMode | undefined
) => {
  void prepareThenOpen(() => {
    store.selectedFile = null
    applyOpenOptions(
      mode,
      mainThreadDraw,
      showNoPlotLayers,
      enableProgressiveRendering,
      viewMode
    )
    store.isNewDrawing = true
  })
}
</script>

<style scoped>
#app-root {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}

.upload-screen {
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: safe center;
  overflow-y: auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0;
  padding: 16px;
  box-sizing: border-box;
  position: absolute;
  z-index: 1000;
  pointer-events: auto;
}

.preparing-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(15, 23, 42, 0.28);
  color: #fff;
  font-family: system-ui, sans-serif;
  font-size: 14px;
  z-index: 2;
}

.preparing-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: preparing-spin 0.8s linear infinite;
}

@keyframes preparing-spin {
  to {
    transform: rotate(360deg);
  }
}

.viewer-screen {
  width: 100%;
  height: 100%;
}

/* 常驻的「打开 NAS 图纸」小按钮 —— 放在画布右下角（避开顶部功能区和底部状态栏） */
.nas-fab {
  position: fixed;
  right: 18px;
  bottom: 54px;
  z-index: 2000;
  padding: 8px 14px;
  border: 1px solid rgba(37, 99, 235, 0.45);
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.92);
  color: #fff;
  font: 500 13px/1 system-ui, "Microsoft YaHei", sans-serif;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.28);
  opacity: 0.85;
  transition: opacity 0.15s ease;
}

.nas-fab:hover {
  opacity: 1;
}

.app-toast {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
  max-width: 80vw;
  padding: 10px 20px;
  border-radius: 8px;
  font: 14px/1.5 system-ui, "Microsoft YaHei", sans-serif;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);
  pointer-events: none;
}

.app-toast.is-info {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}

.app-toast.is-success {
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
}

.app-toast.is-error {
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}
</style>
