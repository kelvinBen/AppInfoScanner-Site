# Shell Detection & Unpacking

## Packer Detection

Android packer detection uses the unified `shell_vendors` signature library (39 vendors) with three signals:

1. **Manifest application class gating**: on a vendor hit, confirm via that vendor's file signatures (dex classes, so files, assets files);
2. **Heuristic**: the app package missing from the dex package structure suggests packing (business dex encrypted by the shell), triggering a cross-vendor signature scan;
3. **Confirmed signature** raises the unpack prompt.

iOS also has shell identification (scanning stops with a prompt when a shell is detected).

## --unpack Explicit Unpacking

::: danger Safety by design
Unpacking is **report-only by default** — no device interaction, to avoid compromising the engagement scene. Real unpacking requires an explicit `--unpack`.
:::

```bash
python app.py android -i Demo.apk --unpack
```

- On a confirmed packer, a frida-server matching the python-side frida version is pushed to the device and unpacking runs.
- **Frida version consistency**: the python-side frida core (17.18.0) and the device-side frida-server must match; the toolchain auto-downloads a matching server (the bundled `tools/unpacker/hexl-server-*` is used when versions match).
- A 120-second per-stage timeout guards against anti-debug hangs; failures fall back to static scanning of the shell payload.
- adb is resolved via `ensure_adb()`; missing toolchains (Java / adb / frida) auto-install on macOS/Linux.

## --prefer-dump: Scan Existing Dumps

If you have already unpacked / dumped externally, point `--prefer-dump` at the dump directory — no device interaction at all:

```bash
python app.py android -i ignored --prefer-dump <dump directory>
```

## External Unpacking Tools

On the shell error (`This application has shell...`), unpack first with:

| Platform | Tools |
| --- | --- |
| Android | Xposed module: dexdump; frida module: FRIDA-DEXDump; no-root: blackdex |
| iOS (Windows) | frida-ipa-dump |
| iOS (macOS) | frida-ios-dump |

## fix_magic: Repairing Dumped Files

Dumped files often have corrupted magic numbers / sizes / checksums. Repair them first with the bundled standalone module — see [fix_magic Repair](/en/guide/fix-magic).
