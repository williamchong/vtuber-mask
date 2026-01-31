<template>
  <div class="flex items-center justify-center w-screen h-screen bg-[#111118]">
    <div
      class="flex flex-col items-center justify-center w-[1280px] h-[720px] bg-[#1a1a2e] text-white rounded-lg overflow-hidden shadow-2xl shadow-black/50 menu-bg"
    >
      <!-- Logo mark -->
      <div
        class="w-16 h-16 rounded-2xl bg-[#e94560] flex items-center justify-center text-2xl font-black mb-6"
      >
        VM
      </div>

      <h1 class="text-5xl font-black tracking-tight mb-2">
        VTuber <span class="text-[#e94560]">Mask</span>
      </h1>
      <p class="text-lg text-white/50 mb-10">Content Moderation Simulator</p>

      <UButton size="xl" color="primary" to="/game" class="px-10 mb-6"> Start Stream </UButton>

      <p class="text-sm text-white/30 max-w-xs text-center leading-relaxed">
        Click to mask inappropriate content before viewers notice. Protect the streamer!
      </p>
    </div>
  </div>
</template>

<style scoped>
.menu-bg {
  background:
    radial-gradient(ellipse at 50% 40%, rgba(233 69 96 / 0.08) 0%, transparent 60%), #1a1a2e;
}
</style>
