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
  <div class="flex flex-col w-[1280px] h-[720px] mx-auto bg-[#1a1a2e] text-white">
    <header
      class="flex items-center justify-between h-[60px] bg-[#0f0f1e] px-6 border-b border-white/10"
    >
      <span class="font-bold">VTuber Mask</span>
      <span class="text-sm">Protect the Stream!</span>
      <span class="text-sm text-white/70">1,234 viewers</span>
    </header>

    <div class="flex flex-1 min-h-0">
      <!-- Stream Panel (50%) -->
      <div class="relative w-1/2 bg-[#0e0e14]">
        <div
          class="absolute top-4 left-4 z-[100] min-w-[180px] p-3 rounded-xl bg-black/70 backdrop-blur-[10px] text-sm"
        >
          <div class="font-semibold">Score: 0</div>
          <div class="font-semibold mt-1">Combo: 0x</div>
          <div class="mt-1">Health: 100%</div>
        </div>
        <div class="flex items-center justify-center w-full h-full text-white/30">Stream Panel</div>
      </div>

      <!-- Chat Panel (50%) -->
      <ChatPanel />
    </div>

    <div
      class="flex justify-between items-center h-[50px] px-6 bg-black/80 border-t border-white/10 text-sm text-white/70"
    >
      <span class="text-red-500 font-bold animate-pulse">LIVE</span>
      <span>Click threats to mask them!</span>
    </div>
  </div>
</template>
