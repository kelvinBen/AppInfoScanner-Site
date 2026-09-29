<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  ruleCategories,
  rulesTotal,
  rulesSourceVersion,
  type RegexRuleSet,
  type KVRule,
  type ShellVendor,
  type RuleList,
} from '../../../shared/rules-data'
import { communityRules } from '../../../shared/community-rules'

const props = defineProps<{ locale: 'zh' | 'en' }>()
const zh = () => props.locale === 'zh'
const active = ref(ruleCategories[0].id)
const keyword = ref('')

const current = computed(
  () => ruleCategories.find((c) => c.id === active.value) ?? ruleCategories[0],
)

const hit = (...fields: (string | string[] | undefined)[]): boolean => {
  const kw = keyword.value.trim().toLowerCase()
  if (!kw) return true
  return fields.some((f) => f && (Array.isArray(f) ? f.join(' ') : f).toLowerCase().includes(kw))
}

const filteredSets = computed(() =>
  (current.value.data as RegexRuleSet[]).filter((r) => hit(r.name, r.patterns)),
)
const filteredKv = computed(() =>
  (current.value.data as KVRule[]).filter((r) => hit(r.key, r.value)),
)
const filteredShell = computed(() =>
  (current.value.data as ShellVendor[]).filter((r) =>
    hit(r.vendor, r.classes, r.so, r.assets),
  ),
)
const filteredLists = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return (current.value.data as RuleList[])
    .map((g) => ({ ...g, items: kw ? g.items.filter((i) => i.toLowerCase().includes(kw)) : g.items }))
    .filter((g) => g.items.length > 0)
})
const filteredDomains = computed(() =>
  (current.value.data as string[]).filter((d) => hit(d)),
)
</script>

<template>
  <p class="rc-summary">
    {{ zh() ? `共收录 ${ruleCategories.length} 类 ${rulesTotal} 条规则，与主程序内置配置同步（配置版本 ${rulesSourceVersion}）。` : `${ruleCategories.length} categories / ${rulesTotal} rules in total, synced from the built-in config (config version ${rulesSourceVersion}).` }}
  </p>

  <div class="rc-tabs">
    <button
      v-for="c in ruleCategories"
      :key="c.id"
      class="rc-tab"
      :class="{ active: c.id === active }"
      @click="active = c.id"
    >
      {{ zh() ? c.nameZh : c.nameEn }}
      <span class="rc-count">{{ c.count }}</span>
    </button>
  </div>

  <p class="rc-desc">{{ zh() ? current.descZh : current.descEn }}</p>

  <input
    v-model="keyword"
    class="rc-search"
    type="search"
    :placeholder="zh() ? '搜索当前分类（名称 / 内容）…' : 'Search current category (name / content)…'"
  />

  <!-- 凭据 / PII：规则集 → 正则数组 -->
  <div v-if="current.kind === 'regexsets'" class="rc-sets">
    <div v-for="r in filteredSets" :key="r.name" class="rc-set">
      <div class="rc-set-head">
        <span class="rc-set-name">{{ r.name }}</span>
        <span class="rc-set-n">{{ r.patterns.length }} regex</span>
      </div>
      <code v-for="(p, i) in r.patterns" :key="i" class="rc-pattern">{{ p }}</code>
    </div>
    <p v-if="!filteredSets.length" class="rc-empty">{{ zh() ? '无匹配规则' : 'No matching rules' }}</p>
  </div>

  <!-- 组件 / 权限：键 → 说明 -->
  <div v-else-if="current.kind === 'kv'" class="rc-table-wrap">
    <table class="rc-table">
      <thead>
        <tr>
          <th>{{ zh() ? '标识' : 'Identifier' }}</th>
          <th>{{ zh() ? '组件 / 风险说明' : 'Component / Risk' }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in filteredKv" :key="r.key">
          <td><code>{{ r.key }}</code></td>
          <td>{{ r.value }}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="!filteredKv.length" class="rc-empty">{{ zh() ? '无匹配规则' : 'No matching rules' }}</p>
  </div>

  <!-- 加固特征 -->
  <div v-else-if="current.kind === 'shell'" class="rc-table-wrap">
    <table class="rc-table">
      <thead>
        <tr>
          <th>{{ zh() ? '厂商' : 'Vendor' }}</th>
          <th>{{ zh() ? '检测特征（application 类名 / so / assets）' : 'Signatures (classes / so / assets)' }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in filteredShell" :key="r.vendor">
          <td>{{ r.vendor }}</td>
          <td>
            <div class="rc-feats">
              <code v-for="f in [...r.classes, ...r.so, ...r.assets]" :key="f">{{ f }}</code>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="!filteredShell.length" class="rc-empty">{{ zh() ? '无匹配规则' : 'No matching rules' }}</p>
  </div>

  <!-- 提取 / 忽略正则 -->
  <div v-else-if="current.kind === 'lists'" class="rc-sets">
    <div v-for="g in filteredLists" :key="g.group" class="rc-set">
      <div class="rc-set-head">
        <span class="rc-set-name">{{ g.group }}</span>
        <span class="rc-set-n">{{ g.items.length }}</span>
      </div>
      <code v-for="(p, i) in g.items" :key="i" class="rc-pattern">{{ p }}</code>
    </div>
    <p v-if="!filteredLists.length" class="rc-empty">{{ zh() ? '无匹配规则' : 'No matching rules' }}</p>
  </div>

  <!-- 公共域名后缀：标签云 -->
  <div v-else class="rc-domains">
    <code v-for="d in filteredDomains" :key="d" class="rc-domain">{{ d }}</code>
    <p v-if="!filteredDomains.length" class="rc-empty">{{ zh() ? '无匹配规则' : 'No matching rules' }}</p>
  </div>

  <!-- 社区规则 -->
  <div v-if="communityRules.length" class="rc-community">
    <h3>{{ zh() ? '社区补充规则' : 'Community Rules' }}</h3>
    <div v-for="r in communityRules" :key="r.name" class="rc-set">
      <div class="rc-set-head">
        <span class="rc-set-name">{{ r.name }}</span>
        <span class="rc-set-n">@{{ r.author }}</span>
      </div>
      <code v-for="(p, i) in r.patterns" :key="i" class="rc-pattern">{{ p }}</code>
      <p class="rc-note">{{ r.note }}</p>
    </div>
  </div>
</template>

<style scoped>
.rc-summary {
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.rc-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 8px;
}
.rc-tab {
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  padding: 4px 12px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.rc-tab:hover {
  border-color: var(--vp-c-brand-2);
}
.rc-tab.active {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.rc-count {
  margin-left: 4px;
  font-size: 11px;
  font-family: var(--vp-font-family-mono);
  opacity: 0.75;
}
.rc-desc {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 4px 0 10px;
}
.rc-search {
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  padding: 7px 12px;
  margin-bottom: 16px;
}
.rc-search:focus {
  outline: none;
  border-color: var(--vp-c-brand-2);
}
.rc-sets {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 12px;
}
.rc-set {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px 14px;
  background: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.rc-set-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
}
.rc-set-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  word-break: break-all;
}
.rc-set-n {
  flex-shrink: 0;
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.rc-pattern {
  display: block;
  font-size: 12px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  background: var(--vp-code-block-bg);
  border-radius: 6px;
  padding: 6px 10px;
  word-break: break-all;
  white-space: pre-wrap;
}
.rc-note {
  margin: 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.rc-table-wrap {
  overflow-x: auto;
}
.rc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.rc-table th,
.rc-table td {
  border: 1px solid var(--vp-c-divider);
  padding: 8px 12px;
  text-align: left;
  vertical-align: top;
}
.rc-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  white-space: nowrap;
}
.rc-table td code {
  font-size: 12px;
  word-break: break-all;
}
.rc-feats {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.rc-feats code,
.rc-domain {
  font-size: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 2px 7px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}
.rc-domains {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.rc-empty {
  color: var(--vp-c-text-3);
  font-size: 13px;
  padding: 16px 0;
}
.rc-community {
  margin-top: 32px;
}
@media (max-width: 640px) {
  .rc-sets {
    grid-template-columns: 1fr;
  }
}
</style>
