<script setup lang="ts">
import { withBase } from 'vitepress'
import type { ToolItem } from '../../../shared/tools'

const props = defineProps<{ tool: ToolItem; locale: 'zh' | 'en' }>()
const desc = () => (props.locale === 'zh' ? props.tool.zh : props.tool.en)
</script>

<template>
  <div class="tool-card">
    <div class="tool-head">
      <span class="tool-name">{{ tool.name }}</span>
      <span class="tool-version">v{{ tool.version }}</span>
    </div>
    <div class="tool-meta">
      <span class="tool-badge">{{ tool.platform }}</span>
      <span class="tool-size">{{ tool.size }}</span>
    </div>
    <p class="tool-desc">{{ desc() }}</p>
    <div class="tool-actions">
      <a class="tool-dl" :href="tool.url" target="_blank" rel="noopener">
        {{ locale === 'zh' ? '下载（GitHub）' : 'Download (GitHub)' }}
      </a>
      <a v-if="tool.mirror" class="tool-mirror" :href="tool.mirror" target="_blank" rel="noopener">
        {{ locale === 'zh' ? '国内镜像' : 'CN Mirror' }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.tool-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.25s, transform 0.25s;
}
.tool-card:hover {
  border-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
}
.tool-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.tool-name {
  font-weight: 600;
  font-size: 16px;
  color: var(--vp-c-text-1);
  word-break: break-all;
}
.tool-version {
  flex-shrink: 0;
  font-size: 12px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-2);
}
.tool-meta {
  display: flex;
  gap: 8px;
  align-items: center;
}
.tool-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-brand-soft);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.tool-size {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.tool-desc {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  flex: 1;
}
.tool-actions {
  display: flex;
  gap: 10px;
}
.tool-dl,
.tool-mirror {
  font-size: 13px;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  transition: opacity 0.2s;
}
.tool-dl {
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}
.tool-mirror {
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}
.tool-dl:hover,
.tool-mirror:hover {
  opacity: 0.85;
}
</style>
