import { AcApI18n } from '@mlightcad/cad-simple-viewer'

import en from './en'
import zh from './zh'

export const initializeLocale = () => {
  AcApI18n.mergeLocaleMessage('en', en)
  AcApI18n.mergeLocaleMessage('zh', zh)
  // ★ 本应用面向中文用户：**默认切到中文** ✓
  //   ⚠️ 只 merge 不 set 的话，库会用它自己的默认值 `en` ✗ ——
  //   于是工具栏/图层/命令行的提示全是英文（真机反馈「简易版打开默认是英文」）
  AcApI18n.setCurrentLocale('zh')
}
