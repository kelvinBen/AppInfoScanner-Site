<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { ads, type AdPlacement } from '../../../shared/ads'

const props = defineProps<{ placement: AdPlacement }>()
const items = computed(() => ads.filter((a) => a.enabled && a.placement === props.placement))
</script>

<template>
  <div v-if="items.length" class="ad-slot">
    <a
      v-for="ad in items"
      :key="ad.id"
      :href="ad.link"
      target="_blank"
      rel="noopener sponsored"
      class="ad-card"
    >
      <img :src="withBase(ad.image)" :alt="ad.title || '广告'" loading="lazy" />
    </a>
    <div class="ad-label">广告 · Advertisement</div>
  </div>
</template>
