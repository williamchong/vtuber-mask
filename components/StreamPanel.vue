<template>
  <div class="relative w-1/2 bg-[#0e0e14] overflow-hidden">
    <!-- Scanline / grid texture -->
    <div class="absolute inset-0 stream-grid pointer-events-none" />

    <!-- Placeholder stream content -->
    <div class="flex items-center justify-center w-full h-full">
      <div class="text-center text-white/20 select-none">
        <svg
          class="w-12 h-12 mx-auto mb-2 opacity-40"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
        <span class="text-sm">Stream Feed</span>
      </div>
    </div>

    <GameHUD />
    <VTuberOverlay />
  </div>
</template>

<style scoped>
.stream-grid {
  background-image:
    linear-gradient(rgba(255 255 255 / 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255 255 255 / 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
