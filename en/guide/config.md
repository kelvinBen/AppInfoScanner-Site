# Configuration

Built-in rules are limited; not all inputs yield ideal results. Adjust rules in `config.toml` as needed — proper rule configuration significantly improves retrieval quality.

## Workspace Mechanism

- Config is in TOML format, auto-deployed to `~/Documents/AppInfoScanner/config.toml` on first run, with comments. Edit directly; takes effect on the next run. Delete the file and re-run to restore defaults.
- Legacy `config.py` is automatically migrated to `config.toml` on first run after upgrade; the original is preserved as `config.py.bak`.
- The config carries a `config_version` field with cross-version auto-migration; rule merging is a **deep merge** — new built-in rules from upgrades are auto-preserved, and your customizations take priority.

## Regex Syntax in TOML

Single-quoted literal strings preserve backslashes verbatim — ideal for regex rules like `'.*accessKeyId.*".*?"'`. Use double-quoted strings with doubled backslashes only when the rule itself contains single quotes.

## Configuration Items

| Item | Description |
| --- | --- |
| `apk_permissions` | Android sensitive permission map (manifest declaration → risk note) |
| `ios_permissions` | iOS privacy permission map (Info.plist key → risk note), auto-parsed from `.app/Info.plist` |
| `filter_components` | Android component map (package prefix → component and risk note), focused on RCE/CVE components: fastjson, Log4j (Log4Shell), Shiro, XStream, CommonsCollections gadget chains, Struts2, SnakeYAML, XXE, BouncyCastle, Netty, etc. |
| `ios_components` | iOS component map (marker string → component and risk note), including SSZipArchive (Zip-Slip), OpenSSL, libxml, AFNetworking / WeChat / JPush SDKs and the FLEX debug tool, matched via binary strings |
| `filter_strs` | Extraction rules (regex), covering common protocols, IPv4/IPv6, and loopback services |
| `filter_no` | Ignore rules (regex), defaults include reserved address blocks only |
| `filter_no_domains` | Public domain suffix table; bare domains, no `.*` prefix needed. Matching a host or any parent suffix ignores it (e.g. `w3.org` covers `www.w3.org`) |
| `shell_vendors` | Android packer unified signature library (vendor → `{classes, so, assets}`) for three-signal shell detection |
| `web_file_suffix` | Web scan file suffixes (case-insensitive), including html/js/ts/vue/source map/css, server templates and configs (json/yaml/env), and mini-program files (wxml/wxss) |
| `sniffer_filter` | Sniffing-ignored suffixes (static/binary resources: images/fonts/AV/documents/archives/installers, 50+ types; effective with `-n`) |
| `headers` | Request headers for auto-download |
| `data` | Request body for auto-download |
| `method` | Request method for auto-download |

## Example: Append an Extraction Rule

```toml
# Append an element to filter_strs in the workspace config.toml
filter_strs = [
    # ...keep built-in rules untouched...
    '.*accessKeyId.*".*?"',
]
```

For rule submission and sharing, see [Custom Rules](/en/guide/rules).
