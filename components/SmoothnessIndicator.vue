<script setup lang="ts">
const gameStore = useGameStore()

const configs = {
  smooth: { label: 'SMOOTH', dotClass: 'bg-green-400', textClass: 'text-green-400', bgClass: 'bg-green-400/15' },
  normal: { label: 'NORMAL', dotClass: 'bg-yellow-400', textClass: 'text-yellow-400', bgClass: 'bg-yellow-400/15' },
  laggy: { label: 'LAGGY', dotClass: 'bg-red-400', textClass: 'text-red-400', bgClass: 'bg-red-400/15' },
} as const

const config = computed(() => configs[gameStore.smoothness])
</script>

<template>
  <div
    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300"
    :class="[config.bgClass, config.textClass]"
  >
    <span class="inline-block w-1.5 h-1.5 rounded-full transition-colors duration-300" :class="config.dotClass" />
    {{ config.label }}
  </div>
</template>
