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

  devtools: { enabled: true },

  app: {
    head: {
      title: 'VTuber Mask - Protect the Stream',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A reaction game for Global Game Jam 2026' },
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
