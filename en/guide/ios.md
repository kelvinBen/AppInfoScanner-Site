# iOS Scanning

The `ios` type scans iOS app related file contents: local IPA / Mach-O files, directory batches, and IPA download URLs with auto-download (App Store IPAs not supported).

## Basic Usage

- Scan a local IPA file

```bash
python app.py ios -i <Your ipa file>

# Example:
python app.py ios -i "C:\Users\Administrator\Desktop\Demo.ipa"
```

- Scan a local Mach-O file

```bash
python app.py ios -i <Your Mach-O file>

# Example:
python app.py ios -i "C:\Users\Administrator\Desktop\Demo\Payload\Demo.app\Demo"
```

- Scan an IPA from a URL (wrap long URLs in double quotes)

```bash
python app.py ios -i <IPA Download Url>

# Example:
python app.py ios -i "https://127.0.0.1/Demo.ipa"
```

- Scan a local directory (batch mode)

```bash
python app.py ios -i <Your Dir>
```

## Notes

- App Store IPAs are not supported; dump (decrypt) them first.
- See [Shell Detection & Unpacking](/en/guide/unpack) for packer handling.
- On iOS targets, components / permissions / PII are matched against the full Mach-O `strings` output; the macOS `strings` section-perception issue is handled via stdin full-file scanning.
- AK/SK detection is currently skipped on the iOS path (upstream decision); PII and component detection run as usual.

For common options, see the [CLI Reference](/en/guide/cli).
