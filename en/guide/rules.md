# Custom Rules

## Temporary Rules (CLI)

The `-r` option appends a temporary rule / keyword for a single scan without touching the config:

```bash
python app.py android -i Demo.apk -r ".*baidu.com.*"
```

## Persistent Rules (config.toml)

The workspace `config.toml` is the persistent entry point for rules; edits take effect on the next run:

- `filter_strs`: extraction rules (regex)
- `filter_no` / `filter_no_domains`: ignore rules (regex / public domain suffix table)
- `filter_components` / `ios_components`: component detection maps
- `apk_permissions` / `ios_permissions`: sensitive permission maps
- `shell_vendors`: packer signature library

See [Configuration](/en/guide/config) for semantics and syntax.

## Community Rule Submission

Custom rules can be submitted to the author for inclusion in the built-in library:

[Add a custom rule (GitHub issues #7)](https://github.com/kelvinBen/AppInfoScanner/issues/7)

Submission format:

```text
1. APP component addition
   Example: fastjson rule
   APP component: fastjson com.alibaba.fastjson

2. String to search
   Example: Aliyun AK rule
   String: Aliyun AK .*accessKeyId.*".*"

3. Web file suffix to search
   Example: jsp rule
   Site: java jsp

4. Android shell rule
   Example: a certain digital company's shell rule
   Shell: DigitalCompany com.stub.StubApp
```

> Want to browse all built-in rules first? See the [Rule Center](/en/rules/). Want to contribute new rules? See [Contributing Rules](/en/rules/#contributing-rules).
