# 飞牛 CAD 查看器（fnOS CAD Viewer）

把 [mlightcad/cad-viewer](https://github.com/mlightcad/cad-viewer)（MIT）打包成飞牛 fnOS 的
原生 `.fpk` 应用：**一个应用、两个入口**

| 入口 | 触发方式 | 页面 | 界面 |
|---|---|---|---|
| `cadviewer.Application` | **桌面图标** / 应用中心卡片 | `/cgi/ThirdParty/cadviewer/index.cgi/full/index.html` | **完整版**（Vue 3：菜单 / 功能区 / 命令行 / 状态栏） |
| `cadviewer.view` | 文件管理器**右键**「用 CAD 查看器打开」 | `/cgi/ThirdParty/cadviewer/index.cgi/index.html` | **简易版**（`cad-simple-viewer` + `cad-simple-ui-plugin`） |

两种方式都能打开**飞牛 NAS 上自己有权限的图纸**，也都能打开**本地文件**（拖拽 / 选择）。

> 引擎（DWG 解析）用 **LibreDWG**（GPL-3.0）+ 打包 **101 个字体文件**（`mlightcad/cad-data`）
> —— 这样多重引线、面域边框、字体都能正常还原。
> DXF 用内置解析器（`AcDbNativeDxfConverter`），**不需要** worker/wasm。

## 支持哪些格式

| 格式 | 支持 | 说明 |
|---|---|---|
| **DWG** | ✅ | LibreDWG（WASM，worker 里跑） |
| **DXF** | ✅ | 内置解析器 |
| **DWF / DWFx / XPS** | ❌ **不支持** | 见下 |

**为什么没有 DWF**：`@mlightcad/data-model` 的 `AcDbFileType` 枚举**只有 `DXF` / `DWG`**，
整个栈里没有 DWF 解析器；LibreDWG 本身也只管 DWG/DXF。

要用 DWF 的话只有换/加引擎 —— 可选项是
[`dwf-viewer`](https://www.npmjs.com/package/dwf-viewer) 或
[`@flyfish-dev/cad-viewer`](https://www.npmjs.com/package/@flyfish-dev/cad-viewer)
（DWF/DWFx/XPS，纯前端），
⚠️ 但**两者都是 `AGPL-3.0-only`** —— 一旦引入，整个组合作品的许可会变成 AGPL-3.0
（AGPL 把「通过网络提供服务」也算分发），**需要先确认接受**。

务实做法：DWF 本质是 Autodesk 的「发布/打印」格式，多数场景转成 **PDF 或 DXF** 即可
（FileView 已有 PDF 预览）。

## 界面语言

两个入口都是**中文**：

- 完整版 —— 由 `MlCadViewer` 的 `locale="zh"` 控制
- 简易版 —— 由 `page/src/i8n/index.ts` 里的 **`AcApI18n.setCurrentLocale('zh')`** 控制
  ⚠️ 只 `mergeLocaleMessage`（注册文案）**不会**切换语言，库的默认是 `en` ✗
  → **两个入口要分别处理**

---

## 体积怎么控制的（**一个应用**的根本原因）

字体（54 MB）与 LibreDWG WASM（9.5 MB）**只打一份** ✓：

```
www/
├── index.html + callback.html      ← 简易版（右键预览）
├── assets/                         ← **两个页面共用**（同一次 vite 构建，chunk 带哈希不会撞）
│   ├── libredwg-parser-worker.js + libredwg-web.wasm   ← 只此一份 ✓（省 9.5 MB）
│   ├── mtext-renderer-worker.js
│   └── viewer-runtime.iife.js      ← 「导出为 HTML」的离线运行时
├── cad-data/                       ← 字体/模板/data（54 MB，只此一份）
└── full/
    ├── index.html + callback.html  ← 完整版（桌面图标）
    └── assets/
        └── mtext-renderer-worker.js  ← ⚠️ 只有这一个必须复制一份
```

**为什么只有 MTEXT worker 要复制**：`@mlightcad/cad-viewer` **没有** `webworkerFileUrls`
这个 prop ✗ → MTEXT worker 的地址走 `cad-simple-viewer` 的默认值
`./assets/mtext-renderer-worker.js`（**相对页面**）→ 完整版页面在 `full/` 下，
默认就指到 `full/assets/` ✓。
其余两个（LibreDWG worker、HTML 导出运行时）我们**能**显式传 URL，
所以在 `page/full/src/nas.ts` 里按 `document.baseURI` 算成**绝对地址**指向共享的 `../assets/` ✓

---

## 目录结构

| 路径 | 说明 |
|---|---|
| `fpk/cadviewer/` | 应用源码（`fnpack create` 生成后改造） |
| `fpk/cadviewer/manifest` | 应用配置（含 `micro_app=true` ← **JS SDK 必需**） |
| `fpk/cadviewer/config/resource` | 开放 API 声明：`trim.file.userAccess` / `trim.file.userAcl` |
| `fpk/cadviewer/app/ui/config` | **两个入口**（桌面图标 → `/full/`，右键 → 简易版） |
| `fpk/cadviewer/app/ui/index.cgi` | CGI：静态服务 + `/api/raw`（读图纸）+ `/api/diag`（诊断）+ `/api/acl` |
| `page/` | 前端源码（**一次构建出两个页面**，共用一份 `pnpm-lock.yaml`） |
| `page/index.html` + `page/src/` | 简易版（上游 `cad-simple-viewer-example` 改造） |
| `page/full/` | 完整版（上游 `cad-viewer-example` 改造，MIT，见 `page/full/LICENSE`） |
| `tools/localtest.py` | **本地端到端测试服务器**（真的跑 `index.cgi`） |
| `tools/headless_check.py` | 用 CDP 真实时间驱动 headless Chrome：截图 + 抓控制台 |
| `fpk/tools/fnpack.exe` | 官方打包工具 |
| `fpk/build.py` / `page/build.py` / `fpk/tools/release.py` | 打包 / 前端构建同步 / 发版 |
| `p0/` | P0 验证页面（历史，已不再使用） |

---

## 构建

```bash
# 1. 前端（构建 + 同步进 www/）
cd page && pnpm install          # 只在依赖变动时跑一次
cd .. && python page/build.py

# 2. 打包 .fpk（含自检）
python fpk/build.py

# 3. 发版（建 tag + Release + 传资产）
python fpk/tools/release.py 0.4.0
```

---

## 本地测试（**改完先在本地跑**）

```bash
python tools/localtest.py --prepare-sample   # 在 Git Bash 根下造一张 /vol1 下的示例图纸
python tools/localtest.py --port 8899        # 起服务器（静态 + 真的跑 index.cgi）
# 浏览器打开：
#   http://127.0.0.1:8899/cgi/ThirdParty/cadviewer/index.cgi/full/index.html
#   http://127.0.0.1:8899/cgi/ThirdParty/cadviewer/index.cgi/index.html

# 无人值守：截图 + 抓控制台（CDP，真实时间）
pip install websocket-client
python tools/headless_check.py \
  --url "http://127.0.0.1:8899/cgi/ThirdParty/cadviewer/index.cgi/full/index.html?path=/vol1/1000/ssd/test/block-color.dxf" \
  --wait 120 --shot out.png
```

> ⚠️ **不要用 `--virtual-time-budget`** ✗ —— 虚拟时钟飞快前进，会让库里的
> 「解析超时」在真实工作还没做完时就触发，于是报「无法打开…超时」，
> 而其实根本没超时（已验证可用的简易版在同样参数下也会「失败」）。
> 判断测法是否可信的办法：**拿一个已知能用的东西做对照组** ✓
>
> ⚠️ 本地跑得**慢**（CGI 每个请求都要起一个 bash 进程）→ 等 100~120 秒再看结果，
> 30 秒往往会误判成「打不开」。

**本地验不了的部分**：飞牛 JS SDK（`pickUserFile` / `openAppAuth`）—— 只能在真机上验 ✓

---

## 权限怎么保证

**不自己实现目录浏览**：路径只能来自官方 `pickUserFile` 的返回值（选完系统会自动把该文件
授权给本应用）✓。官方文档也注明：「页面路由只负责打开页面，**不会替应用完成文件授权或
权限判断**」。

已知的边界（详见 `fpk/cadviewer/app/ui/index.cgi` 里的注释与技能文档）：

- 框架的文件授权是给文件加一条 **`group:<应用组>:r--`** ACL（给**应用**的，不是给具体用户的）
- 「桌面访问 = 仅管理员」**只控制桌面图标给谁看**，**不是 URL 的访问控制** ✗
- ⚠️ **飞牛不用 mode/ACL 判权限** ✗ —— 用它们判必然判错，所以 `index.cgi` 里那个
  `can_read_as` **保持 `log` 模式、不要启用 `enforce`**
- 正规做法是后端 API `trim.file.checkUserACL`，但它需要 `TRIM_API_TOKEN`，
  而**CGI 拿不到**（实测：token 只注入给 `cmd/main` 这类应用脚本；Unix Socket 也是 root `rw----`）
  → 要做只能加一个 `cmd/main` 服务（架构级改动），见 `0.3.0` 的结论
