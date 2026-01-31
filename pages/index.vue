<script setup lang="ts">
useHead({
  link: [
    // Prefetch Live2D model assets
    { rel: 'prefetch', href: '/live2d/hiyori_free_t08.model3.json' },
    { rel: 'prefetch', href: '/live2d/hiyori_free_t08.moc3' },
    { rel: 'prefetch', href: '/live2d/hiyori_free_t08.2048/texture_00.png' },
    // Prefetch stream video
    { rel: 'prefetch', href: '/assets/video/stream_normal.mp4' },
    // Prefetch critical audio
    { rel: 'prefetch', href: '/assets/audio/bgm.mp3', as: 'audio' },
    { rel: 'prefetch', href: '/assets/audio/hurt_1.mp3', as: 'audio' },
    { rel: 'prefetch', href: '/assets/audio/hurt_2.mp3', as: 'audio' },
    { rel: 'prefetch', href: '/assets/audio/hurt_3.mp3', as: 'audio' },
    { rel: 'prefetch', href: '/assets/audio/new_chat.mp3', as: 'audio' },
  ],
})
</script>

<template>
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
    <p class="text-lg text-white/50 mb-10">Protect Your Stream</p>

    <UButton size="xl" color="primary" to="/game" class="px-10 mb-6"> Go Live </UButton>

    <p class="text-sm text-white/30 max-w-xs text-center leading-relaxed">
      You're a VTuber going live. Hold to mask dangerous content before your viewers notice!
    </p>
  </div>
</template>

<style scoped>
.menu-bg {
  background:
    radial-gradient(ellipse at 50% 40%, rgba(233 69 96 / 0.08) 0%, transparent 60%), #1a1a2e;
}
</style>
