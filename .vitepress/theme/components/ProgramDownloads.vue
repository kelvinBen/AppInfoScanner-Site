<script setup lang="ts">
import {
  currentProgram,
  historyPrograms,
  masterZipUrl,
  cloneCmd,
  cloneCmdMirror,
} from '../../../shared/programs'

const props = defineProps<{ locale: 'zh' | 'en' }>()
const zh = () => props.locale === 'zh'
</script>

<template>
  <div class="program-hero">
    <div class="program-head">
      <span class="program-name">AppInfoScanner</span>
      <span class="program-version">{{ currentProgram.version }}</span>
      <span class="program-date">{{ currentProgram.date }}</span>
    </div>
    <p class="program-desc">{{ zh() ? currentProgram.zh : currentProgram.en }}</p>
    <div class="program-req">
      {{ zh() ? 'Python 3.11+（3.14 验证通过）· GPL-3.0 · 源码分发' : 'Python 3.11+ (3.14 verified) · GPL-3.0 · source distribution' }}
    </div>
    <div class="program-actions">
      <a class="tool-dl" :href="currentProgram.url" target="_blank" rel="noopener">
        {{ zh() ? '下载当前版源码包' : 'Download Current (GitHub)' }}
      </a>
      <a class="tool-mirror" :href="currentProgram.mirror" target="_blank" rel="noopener">
        {{ zh() ? '国内镜像（Gitee）' : 'CN Mirror (Gitee)' }}
      </a>
      <a class="tool-mirror" :href="masterZipUrl" target="_blank" rel="noopener">
        {{ zh() ? '最新开发版（master）' : 'Latest Dev (master)' }}
      </a>
    </div>
    <div class="program-clone">
      <div class="clone-line"><span class="clone-prompt">$</span><code>{{ cloneCmd }}</code></div>
      <div class="clone-line"><span class="clone-prompt">$</span><code>{{ cloneCmdMirror }}</code></div>
    </div>
  </div>

  <h3 class="history-title">{{ zh() ? '历史版本' : 'Historical Versions' }}</h3>
  <div class="history-table-wrap">
    <table class="history-table">
      <thead>
        <tr>
          <th>{{ zh() ? '版本' : 'Version' }}</th>
          <th>{{ zh() ? '发布日期' : 'Date' }}</th>
          <th>{{ zh() ? '要点' : 'Highlights' }}</th>
          <th>{{ zh() ? '下载' : 'Download' }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in historyPrograms" :key="p.version">
          <td>
            <code>{{ p.version }}</code>
            <span v-if="p.version === currentProgram.version" class="cur-badge">
              {{ zh() ? '最新' : 'latest' }}
            </span>
          </td>
          <td class="hist-date">{{ p.date }}</td>
          <td class="hist-desc">{{ zh() ? p.zh : p.en }}</td>
          <td class="hist-dl">
            <a :href="p.url" target="_blank" rel="noopener">GitHub</a>
            <a v-if="p.mirror" :href="p.mirror" target="_blank" rel="noopener">{{ zh() ? '镜像' : 'Mirror' }}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="history-note">
    {{ zh()
      ? '更早的 V1.0.0 ~ V1.0.4（2020 年）未打发布 tag，历史变更请见更新日志；主程序始终建议从最新版开始。'
      : 'Earlier V1.0.0 - V1.0.4 releases (2020) were not tagged; see the changelog for their history. Always start from the latest version.' }}
  </p>
</template>

<style scoped>
.program-hero {
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--vp-c-bg-soft);
}
.program-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}
.program-name {
  font-weight: 700;
  font-size: 20px;
  color: var(--vp-c-text-1);
}
.program-version {
  font-size: 14px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-2);
}
.program-date {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.program-desc {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.program-req {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.program-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.program-actions a {
  font-size: 13px;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  transition: opacity 0.2s;
}
.program-actions a:hover {
  opacity: 0.85;
}
.program-actions .tool-dl {
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}
.program-actions .tool-mirror {
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}
.program-clone {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-code-block-bg);
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-x: auto;
}
.clone-line {
  display: flex;
  gap: 8px;
  align-items: baseline;
  font-size: 13px;
}
.clone-prompt {
  color: var(--vp-c-brand-2);
  font-family: var(--vp-font-family-mono);
}
.clone-line code {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.history-title {
  margin-top: 28px;
}
.history-table-wrap {
  overflow-x: auto;
}
.history-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.history-table th,
.history-table td {
  border: 1px solid var(--vp-c-divider);
  padding: 8px 12px;
  text-align: left;
  vertical-align: top;
}
.history-table th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  white-space: nowrap;
}
.history-table td code {
  font-size: 13px;
}
.cur-badge {
  margin-left: 6px;
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-brand-soft);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.hist-date {
  white-space: nowrap;
  color: var(--vp-c-text-3);
}
.hist-desc {
  color: var(--vp-c-text-2);
  min-width: 200px;
}
.hist-dl a {
  margin-right: 8px;
  white-space: nowrap;
}
.history-note {
  font-size: 13px;
  color: var(--vp-c-text-3);
}
</style>
