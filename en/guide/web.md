# Web / H5 Scanning

The `web` type scans WEB site or H5 related file contents: open-source code, saved page source, directory batches, and site URLs with auto-caching.

## Basic Usage

- Scan a local WEB site file

```bash
python app.py web -i <Your web file>

# Example:
python app.py web -i "C:\Users\Administrator\Desktop\Demo.html"
```

- Scan a WEB file from a URL

```bash
python app.py web -i <Web Download Url>

# Example:
python app.py web -i "https://127.0.0.1/Demo.html"
```

- Scan a local directory (batch mode)

```bash
python app.py web -i <Your Dir>
```

## Scan Scope

Web scanning covers the following suffixes by default (case-insensitive; customize via `web_file_suffix` in the workspace `config.toml`):

- Pages and scripts: `html` / `js` / `ts` / `vue` / source map / `css`
- Server templates and configs: `json` / `yaml` / `env` and other config files
- Mini-program files: `wxml` / `wxss`

For common options, see the [CLI Reference](/en/guide/cli).
