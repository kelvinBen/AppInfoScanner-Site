# Android Scanning

The `android` type scans Android app related file contents: local APK / DEX files, directory batches, and APK download URLs with auto-download.

## Basic Usage

- Scan a local APK file

```bash
python app.py android -i <Your apk file>

# Example:
python app.py android -i C:\Users\Administrator\Desktop\Demo.apk
```

- Scan a local DEX file

```bash
python app.py android -i <Your DEX file>

# Example:
python app.py android -i C:\Users\Administrator\Desktop\Demo.dex
```

- Scan an APK from a URL (wrap long URLs in double quotes)

```bash
python app.py android -i <APK Download Url>

# Example:
python app.py android -i "https://127.0.0.1/Demo.apk"
```

- Scan a local directory (batch mode)

```bash
python app.py android -i <Your Dir>

# Example:
python app.py android -i C:\Users\Administrator\Desktop\Demo
```

## Android-specific Options

| Option | Description |
| --- | --- |
| `-p, --package <name>` | Scan only the given Java package, e.g. `-p "com.baidu"` |
| `--unpack` | Explicitly unpack a hardened APK (pushes frida-server to the device). Default: report only, no device interaction. See [Shell Detection & Unpacking](/en/guide/unpack) |
| `--prefer-dump <dir>` | Scan a directory of already-dumped DEX files, no device interaction |

## Common Combinations

```bash
# Add a temporary rule: also scan for Baidu domains
python app.py android -i Demo.apk -r ".*baidu.com.*"

# Ignore all resource files to reduce noise
python app.py android -i Demo.apk -n

# Verbose output (show each match)
python app.py android -i Demo.apk -a

# Set 20 concurrent threads
python app.py android -i Demo.apk -t 20

# Specify output directory for results and cache
python app.py android -i Demo.apk -o C:\Users\Administrator\Desktop\Temp

# Filter content under the com.baidu package
python app.py android -i Demo.apk -p "com.baidu"
```

For common options (`-r` / `-n` / `-a` / `-t` / `-o` / sniffing switches), see the [CLI Reference](/en/guide/cli).
