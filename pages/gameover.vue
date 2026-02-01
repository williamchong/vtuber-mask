<script setup lang="ts">
const gameStore = useGameStore()

useHead({
  title: 'Stream Ended - VTuber Mask',
  meta: [
    {
      name: 'description',
      content:
        'Your stream has ended! See your stats, grade, and how long you survived in VTuber Mask.',
    },
    { name: 'robots', content: 'noindex, nofollow' }, // Don't index game over pages
    { name: 'theme-color', content: '#e94560' },
  ],
})

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-[1280px] h-[720px] bg-[#1a1a2e] text-white rounded-lg overflow-hidden shadow-2xl shadow-black/50"
  >
    <h1 class="text-4xl font-black tracking-tight mb-1">Stream Ended</h1>
    <p class="text-white/40 mb-8">Your stream is over. Here's how it went.</p>

    <!-- Stats card -->
    <div class="w-[360px] rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm p-6 mb-8">
      <!-- Grade -->
      <div class="text-center mb-5">
        <span class="text-6xl font-black text-[#e94560]">{{ gameStore.grade }}</span>
        <p class="text-xs text-white/40 mt-1 uppercase tracking-wider">Performance Grade</p>
      </div>

      <div class="h-px bg-white/10 mb-4" />

      <!-- Stats rows -->
      <div class="space-y-3 text-sm">
        <div class="flex justify-between">
          <span class="text-white/50">Peak Viewers</span>
          <span class="font-bold tabular-nums">{{ gameStore.peakViewers.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-white/50">Threats Masked</span>
          <span class="font-bold tabular-nums">{{ gameStore.threatsMasked }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-white/50">Accuracy</span>
          <span class="font-bold tabular-nums">{{ gameStore.accuracy }}%</span>
        </div>
        <div class="flex justify-between">
          <span class="text-white/50">Time Survived</span>
          <span class="font-bold tabular-nums">{{ formatTime(gameStore.survivalTime) }}</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-4">
      <UButton size="lg" color="primary" to="/game">Play Again</UButton>
      <UButton size="lg" color="neutral" variant="ghost" to="/">Main Menu</UButton>
    </div>
  </div>
</template>
