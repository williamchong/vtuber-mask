<script setup lang="ts">
import { streamVideoUrl, bgmUrl, hurt1Url, hurt2Url, hurt3Url, newChatUrl } from '~/assets/urls'

const config = useRuntimeConfig()

const baseURL = computed(() => {
  return config.app.baseURL || '/'
})


const live2dLinks = computed(() => [
  { rel: 'prefetch' as const, href: `${baseURL.value}live2d/hiyori_free_t08.model3.json` },
  { rel: 'prefetch' as const, href: `${baseURL.value}live2d/hiyori_free_t08.moc3` },
  { rel: 'prefetch' as const, href: `${baseURL.value}live2d/hiyori_free_t08.2048/texture_00.png` },
])

useHead({
  title: 'VTuber Mask - Protect Your Stream',
  meta: [
    { name: 'description', content: 'You\'re a VTuber going live. Hold to mask dangerous content before your viewers notice! A fast-paced reaction game for Global Game Jam 2026.' },
    { name: 'keywords', content: 'VTuber, game, Global Game Jam 2026, reaction game, streaming simulator, content moderation' },
    { name: 'author', content: 'VTuber Mask Team' },
    { name: 'theme-color', content: '#e94560' },

    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://williamchong.github.io/vtuber-mask' },
    { property: 'og:title', content: 'VTuber Mask - Protect Your Stream' },
    { property: 'og:description', content: 'You\'re a VTuber going live. Hold to mask dangerous content before your viewers notice!' },
    { property: 'og:image', content: `${baseURL.value}og-image.png` },
  ],
  link: [
    ...live2dLinks.value,
    // Prefetch stream video (Vite-processed asset)
    { rel: 'prefetch' as const, href: streamVideoUrl },
    // Prefetch critical audio (Vite-processed assets)
    { rel: 'prefetch' as const, href: bgmUrl, as: 'audio' as const },
    { rel: 'prefetch' as const, href: hurt1Url, as: 'audio' as const },
    { rel: 'prefetch' as const, href: hurt2Url, as: 'audio' as const },
    { rel: 'prefetch' as const, href: hurt3Url, as: 'audio' as const },
    { rel: 'prefetch' as const, href: newChatUrl, as: 'audio' as const },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'VideoGame',
        name: 'VTuber Mask',
        description: 'A fast-paced reaction game where you play as a VTuber protecting your live stream. Mask dangerous content in chat and on-screen before viewers notice!',
        genre: ['Reaction Game', 'Simulation', 'Casual'],
        gamePlatform: 'Web Browser',
        applicationCategory: 'Game',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        url: 'https://williamchong.github.io/vtuber-mask',
        sameAs: ['https://github.com/williamchong/vtuber-mask'],
        event: {
          '@type': 'Event',
          name: 'Global Game Jam 2026',
          startDate: '2026-01-24',
        },
      }),
    },
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
