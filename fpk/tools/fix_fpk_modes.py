# -*- coding: utf-8 -*-
"""把 .fpk 里该可执行的文件权限修成 0755，并重算 manifest.checksum。

## 为什么需要它

官方文档说「打包工具会在打包过程中处理可执行权限」，但——
**`fnpack.exe` 在 Windows 上读不到 Git Bash 的 `chmod +x`** ✗
（Windows 文件系统本来也不表达这个位），于是打出来的包里
`app/ui/index.cgi` 与 `cmd/*` 全是 **0666** ✗

→ CGI 入口在 NAS 上**不可执行** → 桌面图标打开就 **404** ✗
（2026-10-08 真机踩到；`cmd/*` 恰好没事，因为框架会自己处理那一层）

## 结构

```
xxx.fpk            = tar
├── manifest       ← 含 checksum = 下面 app.tgz 的 md5
├── app.tgz        = gzip(tar)   ← 里面有 app/ui/index.cgi
├── cmd/*
├── config/*
└── ICON*.PNG
```

## 用法

    python fpk/tools/fix_fpk_modes.py <fpk路径>

改完会**原地覆盖**该 fpk；md5 与 checksum 一并更新 ✓
"""
import hashlib
import io
import os
import re
import sys
import tarfile

# 这些路径（按后缀/前缀匹配）要 0755
NEED_EXEC_SUFFIX = (".cgi", ".sh")
NEED_EXEC_PREFIX = ("cmd/",)


def need_exec(name):
    n = name.replace("\\", "/").lstrip("./")
    if n.endswith(NEED_EXEC_SUFFIX):
        return True
    return n.startswith(NEED_EXEC_PREFIX)


def tail_of(raw):
    """取出 tar 之后的**附加数据**（.fpk 格式的一部分，重打包必须原样接回）。

    ⚠️ **不能用 tarfile 算偏移** ✗：`tarfile` 假设每个成员都有一个 512 字节数据块，
       而 **fnpack（Go）给目录省略了数据块** → 累加出来的偏移会**整体漂移**
       （实测：算得 60928，而文件只有 45263 字节 ✗）。

    可靠办法：**从后往前找最后一个非零的 512 块** ✓
    —— 附加数据是高熵的（压缩/签名），不会出现整块全零 ✓；
       而 tar 的结束标记正是两个全零块 ✓，所以它后面就是附加数据 ✓。
    """
    n = len(raw) // 512
    last_nz = -1
    for i in range(n):
        if raw[i * 512:(i + 1) * 512].strip(b"\x00"):
            last_nz = i
    return raw[(last_nz + 1) * 512:]


def repack_inner(app_bytes):
    """重打内层 tar.gz：只改权限，内容一字不动。返回新的字节。"""
    with tarfile.open(fileobj=io.BytesIO(app_bytes), mode="r:gz") as src:
        members = src.getmembers()
        payload = {m.name: (src.extractfile(m).read() if m.isfile() else None) for m in members}

    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w") as out:
        for m in members:
            if m.isfile():
                data = payload[m.name]
                ti = tarfile.TarInfo(m.name)
                ti.size = len(data)
                ti.mtime = m.mtime
                ti.mode = 0o755 if need_exec(m.name) else m.mode
                ti.uid, ti.gid = m.uid, m.gid
                ti.uname, ti.gname = m.uname, m.gname
                out.addfile(ti, io.BytesIO(data))
            else:
                out.addfile(m)
    raw = buf.getvalue()
    gz = io.BytesIO()
    import gzip
    with gzip.GzipFile(fileobj=gz, mode="wb", mtime=0) as f:
        f.write(raw)
    return gz.getvalue()


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    path = sys.argv[1]
    if not os.path.isfile(path):
        print("找不到 %s" % path)
        return 2

    raw = open(path, "rb").read()
    tail = tail_of(raw)
    with tarfile.open(fileobj=io.BytesIO(raw)) as t:
        members = t.getmembers()
        entries = [(m, t.extractfile(m).read() if m.isfile() else None) for m in members]
    print("① 读入 %s：%d 个条目，尾部附加数据 %d 字节"
          % (os.path.basename(path), len(entries), len(tail)))

    changed = []
    new_entries = []
    app_new = None
    for m, data in entries:
        name = m.name.replace("\\", "/").lstrip("./")
        if name == "app.tgz":
            app_new = repack_inner(data)
            # 校验内层改动
            with tarfile.open(fileobj=io.BytesIO(app_new), mode="r:gz") as t2:
                for x in t2.getmembers():
                    if x.isfile() and need_exec(x.name):
                        changed.append("%s %s→%s" % (x.name, oct(m.mode), oct(x.mode)))
            m2 = tarfile.TarInfo(m.name)
            m2.size = len(app_new)
            m2.mtime = m.mtime
            m2.mode = m.mode
            new_entries.append((m2, app_new))
        else:
            nm = tarfile.TarInfo(m.name)
            nm.size = len(data) if data is not None else 0
            nm.mtime = m.mtime
            nm.mode = 0o755 if need_exec(name) else m.mode
            nm.uid, nm.gid = m.uid, m.gid
            nm.uname, nm.gname = m.uname, m.gname
            if need_exec(name) and m.mode != 0o755:
                changed.append("%s %s→0o755" % (name, oct(m.mode)))
            new_entries.append((nm, data))

    # 重算 manifest.checksum = app.tgz 的 md5
    md5 = hashlib.md5(app_new).hexdigest()
    out_entries = []
    for m, data in new_entries:
        if m.name.replace("\\", "/").lstrip("./") == "manifest":
            s = data.decode("utf-8")
            s2 = re.sub(r"(?m)^checksum\s*=\s*\w+\s*$", "checksum              = " + md5, s)
            data = s2.encode("utf-8")
            m = tarfile.TarInfo(m.name)
            m.size = len(data)
            m.mtime = m.mtime
            m.mode = 0o666
            print("② 重算 checksum → %s" % md5)
        out_entries.append((m, data))

    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w") as out:
        for m, data in out_entries:
            if data is None:
                out.addfile(m)
            else:
                out.addfile(m, io.BytesIO(data))
    out_bytes = buf.getvalue()
    # ⚠️ `tarfile` 会按 RECORDSIZE(10240) 做记录填充，比 fnpack 的布局多出十几 KB ✗
    #    —— 而 fnpack 的 fpk 里 tar 部分**正好是"内容末尾 + 尾部数据"**（实测：
    #    最后一个非零块结束于 45056，紧接着就是那 207 字节）。
    #    为了和它能装的布局**逐字节同构**，这里裁到内容末尾（不补结束标记），再接尾部 ✓
    n = len(out_bytes) // 512
    last = -1
    for i in range(n):
        if out_bytes[i * 512:(i + 1) * 512].strip(b"\x00"):
            last = i
    out_bytes = out_bytes[:(last + 1) * 512] + tail

    tmp = path + ".tmp"
    with open(tmp, "wb") as f:
        f.write(out_bytes)
    os.replace(tmp, path)

    print("③ 改了权限的文件：")
    for c in changed:
        print("   ", c)
    print("④ 尾部附加数据原样保留 %d 字节 ✓" % len(tail))
    print("⑤ 已写回 %s（%d 字节）" % (path, os.path.getsize(path)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
