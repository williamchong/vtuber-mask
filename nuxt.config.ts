// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  typescript: {
    strict: true,
    typeCheck: true,
  },

  // SPA mode for game
  ssr: false,

  modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxt/ui'],

  css: ['~/assets/css/main.css'],

  devtools: { enabled: true },

  app: {
    head: {
      title: 'VTuber Mask - Protect the Stream',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'description', content: 'You\'re a VTuber going live. Hold to mask dangerous content before your viewers notice! A fast-paced reaction game for Global Game Jam 2026.' },
        { name: 'keywords', content: 'VTuber, game, Global Game Jam 2026, reaction game, streaming simulator, content moderation' },
        { name: 'author', content: 'VTuber Mask Team' },
        { name: 'theme-color', content: '#e94560' },

        // Open Graph / Facebook
        { property: 'og:site_name', content: 'VTuber Mask' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'VTuber Mask - Protect Your Stream' },
        { property: 'og:description', content: 'You\'re a VTuber going live. Hold to mask dangerous content before your viewers notice!' },
        { property: 'og:image', content: '/og-image.png' },

        // Additional SEO
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://williamchong.github.io/vtuber-mask' },
      ],
    },
    baseURL: process.env.NUXT_APP_BASE_URL || './',
  },

  vite: {
    build: {
      target: 'es2015',
      assetsDir: 'assets',
    },
  },

  runtimeConfig: {
    public: {
      debugMode: process.env.NODE_ENV !== 'production',
    },
  },
})
