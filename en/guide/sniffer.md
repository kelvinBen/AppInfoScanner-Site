# Network Sniffing

Probe extracted domains / IPs to collect **status codes, titles, Server, CDN, resolved IPs** and other basic information, helping assess asset liveness and ownership.

## Switch and Authorization

::: danger Safety by design
Sniffing is **disabled by default** and requires an explicit `--sniffer`. In red team scenarios, always pair it with `--scope` and probe only authorized domains.
:::

```bash
# Enable sniffing explicitly
python app.py android -i Demo.apk --sniffer

# With an authorized domain list (one domain or suffix per line)
python app.py android -i Demo.apk --sniffer --scope authorized_domains.txt

# Explicitly disable (default behavior)
python app.py android -i Demo.apk --no-sniffer
```

`authorized_domains.txt` example:

```
example.com
target.cn
api.target.cn
```

## Sniffing Policy

- **Intranet and reserved addresses are never sniffed**: private IPv4 (`10.` / `172.16-31.` / `192.168.`), link-local (including the `169.254.169.254` cloud metadata endpoint), loopback, and all IPv6 literals are extracted but not probed; domains are sniffed as usual.
- **Loopback is intel, not noise**: `127.0.0.1:port` / `localhost:port` results get a dedicated classification preserving the port, with an auto-generated `adb reverse tcp:PORT tcp:PORT` capture hint (a telltale of local VPN / proxy app architectures).
- Resource suffixes (images / fonts / AV and 50+ other types) can be ignored via `-n` with `sniffer_filter`.
- Sniffing results land in a dedicated section of the structured report (json / txt / xlsx).

## Custom Requests

Request headers / body / method for auto-download and sniffing can be configured via `headers` / `data` / `method` in the workspace `config.toml` — see [Configuration](/en/guide/config).
