<template>
  <span class="tech-badge" :style="{ '--color': color, '--bg': color + '15', '--border': color + '30' }">
    <span v-if="icon" class="badge-icon" v-html="icon" />
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  color?: string
  icon?: string
}>()
</script>

<style scoped>
.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--bg, rgba(0,212,255,0.1));
  border: 1px solid var(--border, rgba(0,212,255,0.2));
  color: var(--color, #00d4ff);
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  font-family: var(--font-mono);
  transition: all 0.2s ease;
}
.tech-badge:hover {
  box-shadow: 0 0 10px color-mix(in srgb, var(--color) 30%, transparent);
}
.badge-icon {
  display: flex;
  align-items: center;
}
</style>
