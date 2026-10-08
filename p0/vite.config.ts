import { defineConfig } from 'vite'
import { resolve } from 'node:path'

/**
 * P0 验证页的构建。
 *
 * ⚠️ `base: './'` 必须：页面是通过 CGI 在
 *   `/cgi/ThirdParty/cadviewer/index.cgi/` 这种带子路径的地址下打开的，
 *   用绝对路径（默认 `/assets/...`）会 404 ✗
 *
 * 产物直接落到 fpk 的 `app/ui/www/`，由 `app/ui/index.cgi` 静态供出。
 */
export default defineConfig({
  base: './',
  build: {
    outDir: resolve(__dirname, '../fpk/cadviewer/app/ui/www'),
    emptyOutDir: true,
    target: 'es2020',
    // 单页应用，不需要 chunk 拆分（P0 页面很小）
    chunkSizeWarningLimit: 2048
  }
})
