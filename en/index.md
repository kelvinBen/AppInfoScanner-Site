---
layout: home

hero:
  name: AppInfoScanner
  text: Mobile & Web Asset Recon CLI
  tagline: An information-gathering scanner for HW operations / red team / pentest teams — quickly extract URLs, IPs, components, AK/SK and other key assets from Android, iOS, Web/H5, with json / txt / xlsx reporting.
  image:
    src: /logo.png
    alt: AppInfoScanner
  actions:
    - theme: brand
      text: Quick Start
      link: /en/guide/quickstart
    - theme: alt
      text: Downloads
      link: /en/tools/
    - theme: alt
      text: GitHub
      link: https://github.com/kelvinBen/AppInfoScanner

features:
  - icon:
      light: /icons/platforms.svg
      dark: /icons/platforms-dark.svg
    title: Android · iOS · Web
    details: Information collection from DEX, APK, IPA, Mach-O, HTML, JS, Smali files with directory-level batch scanning; APK/IPA/H5 auto-download and one-shot scanning.
  - icon:
      light: /icons/credentials.svg
      dark: /icons/credentials-dark.svg
    title: Credential Detection · 56 Rule Sets
    details: AK/SK detection covering Aliyun / Tencent / AWS / Google / GitHub / GitLab / Slack / Stripe / JWT / private keys / URL-embedded passwords and more.
  - icon:
      light: /icons/pii.svg
      dark: /icons/pii-dark.svg
    title: PII Detection · 14 Rule Sets
    details: Phone numbers, ID cards, emails, bank cards, license plates, names, passports, VIN, IMEI, USCC and other personal / corporate sensitive data (key items checksum-validated).
  - icon:
      light: /icons/cve.svg
      dark: /icons/cve-dark.svg
    title: Components × CVE Matching
    details: 20 Android + 22 iOS CVE/RCE component detection; extracts fastjson / bcprov / log4j versions and assesses CVE impact (affected / safe).
  - icon:
      light: /icons/unpack.svg
      dark: /icons/unpack-dark.svg
    title: Packer Detection & Unpacking
    details: Unified 39-vendor packer signature library with three-signal detection; --unpack explicitly unpacks (auto-pushes a version-matched frida-server), --prefer-dump scans existing dumps.
  - icon:
      light: /icons/sniff.svg
      dark: /icons/sniff-dark.svg
    title: Authorized Network Sniffing
    details: Status code / title / Server / CDN / resolved IP sniffing; --sniffer is explicit opt-in, --scope limits sniffing to an authorized domain list; intranet and loopback are never sniffed.
  - icon:
      light: /icons/report.svg
      dark: /icons/report-dark.svg
    title: Structured Reports
    details: report.json / report.txt / report.xlsx outputs with sensitive permissions, packer vendors and [!] high-value findings summarized.
  - icon:
      light: /icons/autoupdate.svg
      dark: /icons/autoupdate-dark.svg
    title: Auto-update & Toolchain Provisioning
    details: The update subcommand checks / downloads / MD5-verifies GitHub Releases; config.toml is versioned with cross-version auto-migration; missing toolchains auto-install on macOS/Linux.
---

## Use Cases

- Daily pentest: key asset information collection from APPs (URLs, IPs, keywords, etc.)
- Large-scale attack-defense exercises: key asset information collection from APPs
- WEB source code information collection (open-source code or saved page source)
- H5 page URL, IP, keyword collection
- Targeted information gathering on a specific APP

## Screenshot

![Scan results](/result.png)

## Support the Project

Maintained by an individual developer in spare time (GPL-3.0, 3500+ stars). If it helps you, consider [becoming a sponsor](/en/sponsor/), [donating](/en/sponsor/#donate-for-individual-users), starring the main repo, or contributing a rule to the [Rule Center](/en/rules/) — all equally appreciated.

::: danger Disclaimer
Do NOT use this project's techniques or code for malicious software creation, software copyright/IP theft, or improper profit. Violations may constitute violations of the Criminal Law of the People's Republic of China (Articles 217, 286), the Cybersecurity Law, the Computer Software Protection Regulations, and other laws. The techniques mentioned in this project may only be used for private learning and testing in lawful scenarios. The project author is not responsible for any criminal or civil liability arising from improper use of these techniques.
:::
