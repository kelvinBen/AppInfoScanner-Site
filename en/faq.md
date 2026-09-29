# FAQ

## 1. Too much garbage data?

```text
Method 1: Adjust rules in the workspace config.toml
Method 2: Ignore resource files (-n)
```

## 2. Error: `This application has shell, the retrieval results may not be accurate, Please remove the shell and try again!`

The app is packed/shelled. Unpack/dump it first:

```text
Android:
    Xposed module: dexdump
    frida module: FRIDA-DEXDump
    No-root unpacking: blackdex
iOS:
    frida module:
        Windows: frida-ipa-dump
        macOS: frida-ios-dump
```

See [Shell Detection & Unpacking](/en/guide/unpack) for the built-in `--unpack` flow and [fix_magic Repair](/en/guide/fix-magic) for repairing dumped files.

## 3. Error: `File download failed! Please download the file manually and try again.`

File download failed.

```text
1) Check if the URL is correct
2) Check network issues, or configure headers, data, and method in
   the workspace config.toml and re-run
```

## 4. Error: `Decompilation failed, please submit error information at https://github.com/kelvinBen/AppInfoScanner/issues`

File decompilation failed. This is the most frequent cluster in the issue tracker ([#14](https://github.com/kelvinBen/AppInfoScanner/issues/14) / [#22](https://github.com/kelvinBen/AppInfoScanner/issues/22) / [#37](https://github.com/kelvinBen/AppInfoScanner/issues/37) / [#39](https://github.com/kelvinBen/AppInfoScanner/issues/39) / [#50](https://github.com/kelvinBen/AppInfoScanner/issues/50), …). Troubleshoot in this order:

```text
1) Confirm Java 11+ (required by apktool 3.0.3; most legacy issues were Java 8 or below)
2) Since V1.0.10 a repair-retry is built in: on failure it verifies the EOCD first,
   repairs corrupted zip/dex/manifest magic (with a .bak backup) and retries once —
   most magic-corruption cases now need no manual work
3) Still failing? Repair the sample standalone first:
   python3 libs/core/fix_magic.py detect/fix <file> (see the fix_magic guide),
   then re-scan the repaired artifact
4) Otherwise submit the error screenshot and the APK at
   https://github.com/kelvinBen/AppInfoScanner/issues
```

## 5. What are the runtime requirements?

```text
Python : 3.11+ (3.14 verified), dependencies in requirements.txt
Java   : apktool 3.0.3 requires Java 11+ (the old "Java <= 1.8" note applied to legacy jars)
Tools  : Windows uses the bundled tools/; macOS/Linux auto-installs missing Java/adb/frida
```

## 6. Where are the workspace and scan results?

The default output root is `~/Documents/AppInfoScanner/` (falls back to `~/AppInfoScanner/` on minimal Linux without `~/Documents`):

```text
config.toml   user config (generated on first run)
out/          scan results (result/<sample>_<timestamp>/ with all three report formats)
download/     auto-downloaded APK/IPA/H5
history/      history (always follows the default root; -o does not change it)
logs/         run logs (only the latest 20 kept)
```

The `-o` option only changes the scan-result directory.

## 7. How is the legacy config.py migrated?

On first run the legacy workspace `config.py` is migrated to `config.toml` automatically (the original is kept as `config.py.bak`). Since V1.0.11 the config uses a 3-tier deep merge — built-in defaults → workspace `config.toml` → CLI options — with missing keys falling back to defaults and versioned auto-migration. See the [config reference](/en/guide/config).

## 8. Frida version mismatch during unpacking?

The python-side frida core and the device-side frida-server **must be the same version** (currently pinned to 17.18.0). `--unpack` pushes a version-matched frida-server automatically; if you deployed one manually, make sure the versions match. See [Packer Detection & Unpacking](/en/guide/unpack).

## 9. CentOS pip install fails with "No module named '_ctypes'" after building Python?

The system is missing the libffi development package: run `yum install libffi-devel -y`, then rebuild with `make && make install` in the Python source directory. Full steps in the [migrated article](/articles/pip-ctypes-fix).

## 10. Scan stuck at `Searching for strings that match the rules`?

See [#27](https://github.com/kelvinBen/AppInfoScanner/issues/27). Usually an oversized file dragging down the full-string scan. Since V1.0.10 there are guard limits: files over 10 MB are skipped with `[-] Skip large file`, and extracted strings are truncated at 512 characters. If it still feels slow, raise threads with `-t` or narrow rules with `-r`.

## 11. Dumped dex is empty / extraction returns nothing?

See [#42](https://github.com/kelvinBen/AppInfoScanner/issues/42) and [#44](https://github.com/kelvinBen/AppInfoScanner/issues/44). Dumped artifacts often have damaged headers (magic / file size / checksum wiped), so decompiling or scanning yields nothing. Repair with the built-in module first:

```bash
python3 libs/core/fix_magic.py detect <dumped-artifact>  # detect damage
python3 libs/core/fix_magic.py fix dex <file>            # repair dex (zip/axml likewise)
```

Then scan the existing dump directly with `--prefer-dump` — no re-unpacking needed. See the [fix_magic guide](/en/guide/fix-magic).

## 12. Errors installing requirements.txt or frida?

See [#34](https://github.com/kelvinBen/AppInfoScanner/issues/34) and [#47](https://github.com/kelvinBen/AppInfoScanner/issues/47).

```text
1) Use a CN PyPI mirror: pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
2) The frida trio is version-pinned (frida==17.18.0 / frida-tools==14.10.4 /
   frida-dexdump==2.0.1); do not mix versions, and always upgrade all three together
3) Python 3.11+ is required
```

## 13. Does it work on macOS / Linux?

Yes ([#1](https://github.com/kelvinBen/AppInfoScanner/issues/1), [#24](https://github.com/kelvinBen/AppInfoScanner/issues/24)). All three platforms are supported: Windows uses the bundled `tools/` toolchain; macOS / Linux auto-installs missing Java, adb and frida (brew / apt, …); the `strings` binary needed for iOS parsing resolves from PATH on macOS / Linux (with macOS section-aware handling) and from the bundled strings.exe on Windows. Only the Windows-only binaries under `tools/unpacker/` (adb.exe, aapt.exe, …) are Windows-specific — their capabilities have equivalents on macOS / Linux.

## 14. How to batch-scan multiple APPs or directories?

See [#16](https://github.com/kelvinBen/AppInfoScanner/issues/16) and [#10](https://github.com/kelvinBen/AppInfoScanner/issues/10). Pass a directory to `-i` for directory-level batch scanning on Android / iOS / Web alike; each sample gets its own timestamped result directory:

```bash
python app.py android -i /Work/APKs/
python app.py web -i /Work/sources/
```

## 15. `adb: no devices/emulators found` or Windows missing AdbWinApi.dll?

See [#36](https://github.com/kelvinBen/AppInfoScanner/issues/36), [#45](https://github.com/kelvinBen/AppInfoScanner/issues/45) and [#48](https://github.com/kelvinBen/AppInfoScanner/issues/48).

```text
1) Normal scanning (URL/IP/component/credential extraction) needs no device —
   this error only affects --unpack
2) Before unpacking: enable USB debugging, authorize the computer, use a data-capable
   cable, and confirm the device shows up in adb devices
3) On Windows use the bundled tools/unpacker/adb.exe (its DLL dependencies sit in the
   same directory) — do not copy adb.exe elsewhere to run it
```

## 16. Error: cannot find the Bootstrapper module?

See [#13](https://github.com/kelvinBen/AppInfoScanner/issues/13). Usually an incomplete clone or files mixed between versions. Re-clone the repo completely (or fetch a full source archive from the [download center](/en/tools/)) and run again.
