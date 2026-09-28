# fix_magic Repair

Dumped / decrypted files often have corrupted dex / zip / AndroidManifest headers (erased magic numbers, wrong file_size, failing adler32 / sha1 checksums), which make decompilers bail out. `fix_magic` is the bundled standalone repair module that detects and fixes such corruption.

## Standalone Usage

```bash
# Detect corruption (no modification)
python3 libs/core/fix_magic.py detect <file>

# Repair a dex
python3 libs/core/fix_magic.py fix dex <file>

# Repair a zip (APK)
python3 libs/core/fix_magic.py fix zip <file>

# Repair AndroidManifest (axml; xml is an alias for axml)
python3 libs/core/fix_magic.py fix axml <file>
```

## Typical Scenarios

1. When `__decode_apk__` decompilation fails, the built-in flow retries with repair: `__repair_apk__` validates EOCD first (only fixes zip magic on real zips, to avoid corrupting arbitrary files); damaged inner dex / manifest files are extracted, repaired, and rewritten into the package with a `.bak` backup — one retry only.
2. When external dump outputs (FRIDA-DEXDump / blackdex, etc.) fail to decompile, run `detect` then `fix dex`, and feed the results back through `--prefer-dump`.

## Format Details

The module header comment documents the offset semantics for each format: dex magic / file_size / adler32 checksum / sha1 signature offsets, zip EOCD location logic, and axml magic and size fields. In practice apktool 3.0.3 tolerates erased magic (locates via EOCD), so magic-number corruption often succeeds even without repair; follow the detection verdict.
