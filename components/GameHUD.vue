<script setup lang="ts">
const gameStore = useGameStore()
</script>

<template>
  <div
    class="absolute top-4 left-4 z-[100] min-w-[180px] rounded-xl bg-black/70 backdrop-blur-[10px] border border-white/10 p-4 space-y-2"
  >
    <div class="text-xs text-white/50 uppercase tracking-wider mb-1">Moderator HUD</div>

    <div class="flex items-baseline justify-between">
      <span class="text-xs text-white/60">Score</span>
      <span class="text-lg font-bold tabular-nums">{{ gameStore.score.toLocaleString() }}</span>
    </div>

    <div class="flex items-baseline justify-between">
      <span class="text-xs text-white/60">Combo</span>
      <span class="text-lg font-bold text-[#00ff88] tabular-nums">0x</span>
    </div>

    <div class="flex items-center justify-between">
      <span class="text-xs text-white/60">Health</span>
      <div class="flex gap-1">
        <span v-for="i in 3" :key="i" class="text-[#e94560]">&#9829;</span>
      </div>
    </div>
  </div>
</template>
