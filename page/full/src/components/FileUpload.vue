<template>
  <div class="file-upload-container">
    <div class="upload-panel">
      <div class="upload-main">
        <section class="upload-hero">
          <div class="upload-icon">
            <el-icon :size="20">
              <UploadFilled />
            </el-icon>
          </div>
          <div class="upload-hero-text">
            <h1 class="upload-title">打开 CAD 图纸</h1>
            <p class="upload-subtitle">
              支持 DWG / DXF：可打开飞牛 NAS 上的图纸，也可拖入本地文件
            </p>
          </div>
        </section>

        <div class="upload-actions">
          <!-- ★ 本应用新增：从飞牛 NAS 打开图纸。
               走开放 API 的 pickUserFile（宿主内）或 openAppAuth（浏览器标签里），
               选完拿到的是**已授权给本应用**的绝对路径。 -->
          <button
            type="button"
            class="new-drawing-button nas-open-button"
            @click="handleOpenNas"
          >
            打开 NAS 上的图纸
          </button>
          <p v-if="nasHintText" class="nas-hint">{{ nasHintText }}</p>

          <p class="upload-divider" aria-hidden="true">
            <span>or</span>
          </p>

          <button
            type="button"
            class="new-drawing-button"
            @click="handleNewDrawing"
          >
            新建图纸
          </button>

          <p class="upload-divider" aria-hidden="true">
            <span>or</span>
          </p>

          <el-upload
            class="upload-dropzone"
            drag
            :auto-upload="false"
            accept=".dwg,.dxf"
            :on-change="handleFileChange"
            :before-upload="beforeUpload"
          >
            <div class="dropzone-content">
              <p class="dropzone-title">
                拖入文件，或<span class="dropzone-link">点击选择</span>
              </p>
              <div class="format-tags">
                <span class="format-tag">DWG</span>
                <span class="format-tag">DXF</span>
              </div>
            </div>
          </el-upload>
        </div>
      </div>

      <section class="settings-section">
        <header class="settings-header">
          <h2 class="settings-title">打开选项</h2>
        </header>

        <div class="settings-grid">
          <div class="setting-block setting-block--full">
            <h3 class="setting-label">初始视图</h3>
            <div
              class="pill-segment"
              role="radiogroup"
              aria-label="Initial view"
            >
              <button
                v-for="option in openViewModes"
                :key="option.value"
                type="button"
                class="pill-option"
                :class="{ 'is-active': selectedOpenViewMode === option.value }"
                role="radio"
                :aria-checked="selectedOpenViewMode === option.value"
                :title="option.description"
                @click="selectedOpenViewMode = option.value"
              >
                {{ option.label }}
              </button>
            </div>
          </div>

          <div class="setting-block setting-block--full">
            <h3 class="setting-label">访问模式</h3>
            <div
              class="pill-segment"
              role="radiogroup"
              aria-label="Access mode"
            >
              <button
                v-for="mode in accessModes"
                :key="mode.value"
                type="button"
                class="pill-option"
                :class="{ 'is-active': selectedMode === mode.value }"
                role="radio"
                :aria-checked="selectedMode === mode.value"
                :title="mode.description"
                @click="selectedMode = mode.value"
              >
                {{ mode.label }}
              </button>
            </div>
          </div>

          <div class="setting-block">
            <h3 class="setting-label">文字渲染</h3>
            <div
              class="pill-segment"
              role="radiogroup"
              aria-label="Text rendering"
            >
              <button
                type="button"
                class="pill-option"
                :class="{ 'is-active': !useMainThreadDraw }"
                role="radio"
                :aria-checked="!useMainThreadDraw"
                title="更快，占用内存更多"
                @click="useMainThreadDraw = false"
              >
                工作线程
              </button>
              <button
                type="button"
                class="pill-option"
                :class="{ 'is-active': useMainThreadDraw }"
                role="radio"
                :aria-checked="useMainThreadDraw"
                title="稍慢，占用内存更少"
                @click="useMainThreadDraw = true"
              >
                主线程
              </button>
            </div>
          </div>

          <div class="setting-block">
            <h3 class="setting-label">渐进渲染</h3>
            <div
              class="pill-segment"
              role="radiogroup"
              aria-label="Progressive rendering"
            >
              <button
                type="button"
                class="pill-option"
                :class="{ 'is-active': progressiveRendering }"
                role="radio"
                :aria-checked="progressiveRendering"
                title="边转换边显示"
                @click="progressiveRendering = true"
              >
                开
              </button>
              <button
                type="button"
                class="pill-option"
                :class="{ 'is-active': !progressiveRendering }"
                role="radio"
                :aria-checked="!progressiveRendering"
                title="等完全转换完再显示"
                @click="progressiveRendering = false"
              >
                关
              </button>
            </div>
          </div>

          <div class="setting-block">
            <h3 class="setting-label">非打印图层</h3>
            <div
              class="pill-segment"
              role="radiogroup"
              aria-label="Non-plottable layers"
            >
              <button
                type="button"
                class="pill-option"
                :class="{ 'is-active': !drawNoPlotLayers }"
                role="radio"
                :aria-checked="!drawNoPlotLayers"
                title="网页查看器默认行为"
                @click="drawNoPlotLayers = false"
              >
                隐藏
              </button>
              <button
                type="button"
                class="pill-option"
                :class="{ 'is-active': drawNoPlotLayers }"
                role="radio"
                :aria-checked="drawNoPlotLayers"
                title="与 AutoCAD 编辑器一致"
                @click="drawNoPlotLayers = true"
              >
                显示
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadFile, UploadProps } from 'element-plus'
import { ElIcon, ElUpload } from 'element-plus'
import { onMounted, ref } from 'vue'

import { nasHint } from '../nas'
import { AcApOpenViewMode, AcEdOpenMode } from '../openOptions'

const emit = defineEmits<{
  fileSelect: [
    file: File,
    mode: AcEdOpenMode,
    useMainThreadDraw: boolean,
    drawNoPlotLayers: boolean,
    progressiveRendering: boolean,
    openViewMode: AcApOpenViewMode | undefined
  ]
  newDrawing: [
    mode: AcEdOpenMode,
    useMainThreadDraw: boolean,
    drawNoPlotLayers: boolean,
    progressiveRendering: boolean,
    openViewMode: AcApOpenViewMode | undefined
  ]
  /** ★ 本应用新增：请求从飞牛 NAS 打开图纸（由 App.vue 处理授权流程） */
  openNas: []
}>()

/** 「打开 NAS 上的图纸」按钮下面那行提示（顺带显示当前运行环境） */
const nasHintText = ref('')

onMounted(() => {
  void nasHint().then((t) => {
    nasHintText.value = t
  })
})

const handleOpenNas = () => {
  emit('openNas')
}

type OpenViewModeChoice = 'auto' | AcApOpenViewMode

const selectedMode = ref<AcEdOpenMode>(AcEdOpenMode.Write)
const selectedOpenViewMode = ref<OpenViewModeChoice>('auto')
const useMainThreadDraw = ref(false)
const drawNoPlotLayers = ref(false)
const progressiveRendering = ref(false)

const openViewModes = [
  {
    value: 'auto' as const,
    label: '自动',
    description: '按访问模式决定'
  },
  {
    value: AcApOpenViewMode.Extents,
    label: '范围',
    description: '缩放到图形范围'
  },
  {
    value: AcApOpenViewMode.Saved,
    label: '保存视图',
    description: 'AutoCAD 保存的视图'
  }
] as const

const resolveOpenViewMode = (): AcApOpenViewMode | undefined =>
  selectedOpenViewMode.value === 'auto' ? undefined : selectedOpenViewMode.value

const accessModes = [
  {
    value: AcEdOpenMode.Read,
    label: '只读',
    description: '仅查看'
  },
  {
    value: AcEdOpenMode.Review,
    label: '审阅',
    description: '查看并可批注'
  },
  {
    value: AcEdOpenMode.Write,
    label: '编辑',
    description: '完整读写'
  }
] as const

const handleFileChange: UploadProps['onChange'] = (uploadFile: UploadFile) => {
  if (uploadFile.raw) {
    if (isValidFile(uploadFile.raw)) {
      emit(
        'fileSelect',
        uploadFile.raw,
        selectedMode.value,
        useMainThreadDraw.value,
        drawNoPlotLayers.value,
        progressiveRendering.value,
        resolveOpenViewMode()
      )
    }
  }
}

const handleNewDrawing = () => {
  emit(
    'newDrawing',
    selectedMode.value,
    useMainThreadDraw.value,
    drawNoPlotLayers.value,
    progressiveRendering.value,
    resolveOpenViewMode()
  )
}

const beforeUpload: UploadProps['beforeUpload'] = (rawFile: File) => {
  if (!isValidFile(rawFile)) {
    console.warn('Invalid file type. Please upload DWG or DXF files.')
    return false
  }
  return true
}

const isValidFile = (file: File): boolean => {
  const validExtensions = ['.dwg', '.dxf']
  const fileName = file.name.toLowerCase()
  return validExtensions.some(ext => fileName.endsWith(ext))
}
</script>

<style scoped>
.file-upload-container {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 820px;
  padding: 12px 16px;
  box-sizing: border-box;
}

.upload-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: auto;
  width: 100%;
  border-radius: 14px;
  background: #ffffff;
  box-shadow:
    0 20px 40px rgba(15, 23, 42, 0.16),
    0 0 0 1px rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.upload-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18px 20px;
}

.upload-hero {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.upload-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #5b6fd6 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.28);
}

.upload-hero-text {
  min-width: 0;
}

.upload-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0f172a;
  line-height: 1.25;
}

.upload-subtitle {
  margin: 2px 0 0;
  font-size: 12px;
  color: #64748b;
  line-height: 1.35;
}

.upload-actions {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.new-drawing-button {
  display: block;
  width: 100%;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #5b6fd6 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(102, 126, 234, 0.26);
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;
}

.new-drawing-button:hover {
  filter: brightness(1.03);
  box-shadow: 0 8px 18px rgba(102, 126, 234, 0.32);
}

.new-drawing-button:active {
  transform: translateY(1px);
}

/* ★ 本应用新增：「打开 NAS 上的图纸」—— 主入口，颜色和别的按钮区分开 */
.nas-open-button {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.3);
}

.nas-open-button:hover {
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.36);
}

.nas-hint {
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.5;
  color: #64748b;
}

.upload-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.upload-divider::before,
.upload-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.upload-dropzone {
  width: 100%;
  box-sizing: border-box;
}

.upload-dropzone :deep(.el-upload) {
  display: block;
  width: 100%;
}

.upload-dropzone :deep(.el-upload-dragger) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 14px 12px;
  border: 1.5px dashed #c7d2fe;
  border-radius: 10px;
  background: #f8faff;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.upload-dropzone :deep(.el-upload-dragger:hover) {
  border-color: #667eea;
  background: #f1f5ff;
  box-shadow: inset 0 0 0 1px rgba(102, 126, 234, 0.08);
}

.dropzone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.dropzone-title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}

.dropzone-link {
  color: #667eea;
  font-weight: 600;
}

.format-tags {
  display: flex;
  gap: 6px;
}

.format-tag {
  padding: 1px 7px;
  border-radius: 999px;
  background: #e8edff;
  color: #4f5fd0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.settings-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18px 20px;
  background: #f8fafc;
  border-left: 1px solid #e8edf5;
}

.settings-header {
  margin-bottom: 10px;
}

.settings-title {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: #334155;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px 12px;
}

.setting-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.setting-block--full {
  grid-column: 1 / -1;
}

.setting-label {
  margin: 0;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #94a3b8;
}

.pill-segment {
  display: flex;
  gap: 0;
  border: 1.5px solid #e2e8f0;
  border-radius: 7px;
  background: #ffffff;
  overflow: hidden;
}

.pill-option {
  flex: 1;
  padding: 6px 8px;
  border: none;
  background: transparent;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.pill-option:not(:last-child) {
  border-right: 1px solid #e2e8f0;
}

.pill-option:hover:not(.is-active) {
  background: #f8fafc;
  color: #475569;
}

.pill-option.is-active {
  background: #f1f5ff;
  color: #4f5fd0;
}

/* Narrow viewports: stack upload + settings as two vertical rows */
@media (max-width: 768px) {
  .file-upload-container {
    max-width: 100%;
    padding: 12px;
  }

  .upload-panel {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }

  .settings-section {
    border-left: none;
    border-top: 1px solid #e8edf5;
  }

  .settings-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .setting-block--full {
    grid-column: 1 / -1;
  }
}

@media (max-width: 400px) {
  .upload-main,
  .settings-section {
    padding-left: 14px;
    padding-right: 14px;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }

  .setting-block--full {
    grid-column: auto;
  }
}
</style>
