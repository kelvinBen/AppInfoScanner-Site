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

File decompilation failed.

```text
Please submit the error screenshot and the corresponding APK file at
https://github.com/kelvinBen/AppInfoScanner/issues
The author will handle it promptly
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

## 9. IDA Pro crashes at startup with "Fatal error before kernel init"?

Delete `ida.reg` under the `~/.idapro` directory (back it up first; on Windows check the user directory) and restart IDA. Full walkthrough in the [migrated article](/articles/ida-crash-fix).

## 10. CentOS pip install fails with "No module named '_ctypes'" after building Python?

The system is missing the libffi development package: run `yum install libffi-devel -y`, then rebuild with `make && make install` in the Python source directory. Full steps in the [migrated article](/articles/pip-ctypes-fix).
