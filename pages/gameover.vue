<template>
  <div class="flex items-center justify-center w-screen h-screen bg-[#111118]">
    <div
      class="flex flex-col items-center justify-center w-[1280px] h-[720px] bg-[#1a1a2e] text-white rounded-lg overflow-hidden shadow-2xl shadow-black/50"
    >
      <h1 class="text-4xl font-black tracking-tight mb-1">Stream Ended</h1>
      <p class="text-white/40 mb-8">Your moderation shift is over.</p>

      <!-- Stats card -->
      <div
        class="w-[360px] rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm p-6 mb-8"
      >
        <!-- Grade -->
        <div class="text-center mb-5">
          <span class="text-6xl font-black text-[#e94560]">B</span>
          <p class="text-xs text-white/40 mt-1 uppercase tracking-wider">Performance Grade</p>
        </div>

        <div class="h-px bg-white/10 mb-4" />

        <!-- Stats rows -->
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-white/50">Score</span>
            <span class="font-bold tabular-nums">0</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/50">Threats Masked</span>
            <span class="font-bold tabular-nums">0</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/50">Accuracy</span>
            <span class="font-bold tabular-nums">0%</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/50">Best Combo</span>
            <span class="font-bold text-[#00ff88] tabular-nums">0x</span>
          </div>
          <div class="flex justify-between">
            <span class="text-white/50">Time Survived</span>
            <span class="font-bold tabular-nums">0:00</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-4">
        <UButton size="lg" color="primary" to="/game">Play Again</UButton>
        <UButton size="lg" color="neutral" variant="ghost" to="/">Main Menu</UButton>
      </div>
    </div>
  </div>
</template>
