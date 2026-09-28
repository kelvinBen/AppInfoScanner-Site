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
