# CLI Reference

## Basic Command Format

```bash
python app.py [TYPE] [OPTIONS] <the file or directory or URL to scan>
```

## Symbols

| Symbol | Meaning |
| --- | --- |
| `<>` | The file, directory, or URL to scan |
| `\|` | OR relationship, choose only one |
| `[]` | Parameter to input |

## TYPE

Corresponds to `[TYPE]` in the basic command format. Currently supports `android` / `ios` / `web`; one must be specified.

| TYPE | Purpose |
| --- | --- |
| `android` | Scan Android app related file contents |
| `ios` | Scan iOS app related file contents |
| `web` | Scan WEB site or H5 related file contents |

Auto-correction by file suffix: even if you input `ios`, if the `-i` file is `XXX.apk`, android scanning will be executed.

## OPTIONS

Multiple options can be combined.

| Option | Description |
| --- | --- |
| `-i, --inputs` | File, directory, or URL to scan (or auto-download). Wrap long paths in double quotes. **Required** |
| `-r, --rules` | Temporary scan rules for file content |
| `--sniffer / --no-sniffer` | Enable / disable network sniffing. Default: **disabled**. Use with `--scope` in red team scenarios |
| `--scope` | Authorized domain list file path (one domain or suffix per line); only listed domains are sniffed |
| `--unpack` | Explicitly unpack a hardened APK (pushes frida-server to the device). Default: report only. Android only |
| `--prefer-dump` | Directory of already-dumped DEX files to scan directly, no device interaction. Android only |
| `-n, --no-resource` | Ignore all resource files including sniffing resources (configure `sniffer_filter` in workspace config.toml first). Default: do not ignore |
| `-a, --all` | Output each matching string (verbose mode). Default: summary only |
| `-t, --threads` | Concurrent thread count. Default: 10 |
| `-o, --output` | Output directory for results and temporary files. Default: AppInfoScanner under user documents; log files follow this directory |
| `-p, --package` | Java package name to scan within APK/DEX. Android only |

## update Subcommand

```bash
python app.py update --check    # Check for updates only, show current/latest version
python app.py update            # Perform update (GitHub Release download / MD5 verify / auto-replace)
python app.py update --tools    # Check tool versions (apktool/baksmali)
```
