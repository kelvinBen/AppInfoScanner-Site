#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# 规则中心数据同步: 从主仓库 default_config.py 提取 DEFAULTS 规则组,
# 生成站点 shared/rules-data.ts。主仓库规则更新后重跑本脚本即可。
# 用法: python3 scripts/sync-rules.py [主仓库路径, 默认 ../AppInfoScanner]
import json
import importlib.util
import sys
import os
from datetime import date

MAIN = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', '..', 'AppInfoScanner')
SRC = os.path.join(MAIN, 'libs', 'core', 'default_config.py')
OUT = os.path.join(os.path.dirname(__file__), '..', 'shared', 'rules-data.ts')

spec = importlib.util.spec_from_file_location('dc', SRC)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
D = mod.DEFAULTS

def as_list(v):
    return v if isinstance(v, list) else [v]

# Android 组件行内联 CVE 版本对照(仅 3 个组件有)
ver = D.get('component_versions', {})
def comp_value(k, v):
    cv = ver.get(k)
    if not cv:
        return v
    extra = []
    if cv.get('safe_above'):
        extra.append(f"安全版本>={cv['safe_above']}")
    if cv.get('cve'):
        extra.append(cv['cve'])
    return v + '；' + '，'.join(extra) if extra else v

ak = [{'name': k, 'patterns': as_list(v)} for k, v in D['filter_ak_map'].items()]
pii = [{'name': k, 'patterns': as_list(v)} for k, v in D['filter_pii_map'].items()]
acomp = [{'key': k, 'value': comp_value(k, v)} for k, v in D['filter_components'].items()]
icomp = [{'key': k, 'value': v} for k, v in D['ios_components'].items()]
shell = []
for vendor, feats in D['shell_vendors'].items():
    shell.append({
        'vendor': vendor,
        'classes': as_list(feats.get('classes', [])),
        'so': as_list(feats.get('so', [])),
        'assets': as_list(feats.get('assets', [])),
    })
aperm = [{'key': k, 'value': v} for k, v in D['apk_permissions'].items()]
iperm = [{'key': k, 'value': v} for k, v in D['ios_permissions'].items()]
extracts = [{'group': 'filter_strs 提取正则', 'items': D['filter_strs']},
            {'group': 'filter_no 忽略正则', 'items': D['filter_no']}]
domains = D['filter_no_domains']

cats = [
    dict(id='ak', nameZh='凭据检测', nameEn='Credentials (AK/SK)', kind='regexsets', data=ak,
         descZh='云厂商与平台的密钥 / 令牌、JWT / 私钥 / 通用凭据形态（filter_ak_map）',
         descEn='Cloud keys/tokens, JWT, private keys and generic credentials (filter_ak_map)'),
    dict(id='pii', nameZh='PII 检测', nameEn='PII Detection', kind='regexsets', data=pii,
         descZh='个人 / 企业敏感信息规则集（filter_pii_map，关键项带校验位验证）',
         descEn='Personal / corporate sensitive data (filter_pii_map, checksum-validated)'),
    dict(id='android-comp', nameZh='Android 组件', nameEn='Android Components', kind='kv', data=acomp,
         descZh='组件识别规则（filter_components，按 smali 路径匹配；含 CVE 版本对照内联）',
         descEn='Component rules (filter_components, matched by smali path; CVE notes inlined)'),
    dict(id='ios-comp', nameZh='iOS 组件', nameEn='iOS Components', kind='kv', data=icomp,
         descZh='组件识别规则（ios_components，按二进制 strings 内容匹配）',
         descEn='Component rules (ios_components, matched against binary strings)'),
    dict(id='shell', nameZh='加固特征', nameEn='Packer Signatures', kind='shell', data=shell,
         descZh='Android 加固厂商特征库（shell_vendors：application 类名 / so / assets 三路检测）',
         descEn='Android packer vendor library (shell_vendors: classes / so / assets)'),
    dict(id='apk-perm', nameZh='Android 敏感权限', nameEn='Android Permissions', kind='kv', data=aperm,
         descZh='需要关注的 Android 敏感权限（apk_permissions）',
         descEn='Notable Android permissions (apk_permissions)'),
    dict(id='ios-perm', nameZh='iOS 敏感权限', nameEn='iOS Permissions', kind='kv', data=iperm,
         descZh='需要关注的 iOS 隐私权限（ios_permissions）',
         descEn='Notable iOS privacy permissions (ios_permissions)'),
    dict(id='extract', nameZh='提取与忽略', nameEn='Extract / Ignore', kind='lists', data=extracts,
         descZh='内容提取与忽略正则（filter_strs / filter_no）',
         descEn='Extraction and ignore regexes (filter_strs / filter_no)'),
    dict(id='domains', nameZh='公共域名后缀', nameEn='Public Domain Suffixes', kind='domains', data=domains,
         descZh='公共域名后缀表（filter_no_domains，命中 host 或任意父域后缀即丢弃）',
         descEn='Public domain suffix table (filter_no_domains)'),
]
for c in cats:
    if c['kind'] == 'regexsets':
        c['count'] = sum(len(r['patterns']) for r in c['data'])
    elif c['kind'] == 'lists':
        c['count'] = sum(len(g['items']) for g in c['data'])
    else:
        c['count'] = len(c['data'])

header = f'''// 规则中心数据源 —— 由 scripts/sync-rules.py 从主仓库 libs/core/default_config.py 自动生成, 勿手改。
// 同步时间: {date.today().isoformat()} · 配置版本: {D.get("config_version", "?")}

export interface RegexRuleSet {{ name: string; patterns: string[] }}
export interface KVRule {{ key: string; value: string }}
export interface ShellVendor {{ vendor: string; classes: string[]; so: string[]; assets: string[] }}
export interface RuleList {{ group: string; items: string[] }}

export interface RuleCategory {{
  id: string
  nameZh: string
  nameEn: string
  descZh: string
  descEn: string
  kind: 'regexsets' | 'kv' | 'shell' | 'lists' | 'domains'
  count: number
  data: RegexRuleSet[] | KVRule[] | ShellVendor[] | RuleList[] | string[]
}}

'''
body = 'export const ruleCategories: RuleCategory[] = ' + json.dumps(cats, ensure_ascii=False, indent=2) + '\n'
total = sum(c['count'] for c in cats)
body += f"\nexport const rulesTotal = {total}\nexport const rulesSourceVersion = '{D.get('config_version', '?')}'\n"
open(OUT, 'w').write(header + body)
print(f'OK: {OUT}')
for c in cats:
    print(f"  {c['id']}: {c['count']}")
print(f'  合计: {total}')
