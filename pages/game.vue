<script setup lang="ts">
const gameLoop = useGameLoop()

onMounted(() => {
  gameLoop.start()
})

onUnmounted(() => {
  gameLoop.stop()
})
</script>

<template>
  <div class="flex items-center justify-center w-screen h-screen bg-[#111118]">
    <div
      class="flex flex-col w-[1280px] h-[720px] bg-[#1a1a2e] text-white rounded-lg overflow-hidden shadow-2xl shadow-black/50"
    >
      <!-- Platform header -->
      <header
        class="flex items-center justify-between h-[60px] bg-[#0f0f1e] px-6 border-b border-white/10"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-7 h-7 rounded-lg bg-[#e94560] flex items-center justify-center text-xs font-bold"
          >
            VM
          </div>
          <span class="font-bold">VTuber Mask</span>
        </div>
        <span class="text-sm text-white/50">Protect the Stream!</span>
        <div class="flex items-center gap-2 text-sm text-white/70">
          <span class="inline-block w-2 h-2 rounded-full bg-red-500" />
          <span>1,234 viewers</span>
        </div>
      </header>

      <!-- Main panels -->
      <div class="flex flex-1 min-h-0">
        <StreamPanel />
        <ChatPanel />
      </div>

      <!-- Info bar -->
      <div
        class="flex justify-between items-center h-[50px] px-6 bg-[#0f0f1e] border-t border-white/10 text-sm"
      >
        <div class="flex items-center gap-3">
          <span
            class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider"
          >
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Live
          </span>
          <span class="text-white/40">Gaming &middot; Content Moderation Simulator</span>
        </div>
        <span class="text-white/50">Click threats to mask them!</span>
      </div>
    </div>
  </div>
</template>
