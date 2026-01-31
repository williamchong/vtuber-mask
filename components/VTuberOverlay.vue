<template>
  <div
    class="absolute bottom-4 right-4 z-50 w-[220px] h-[180px] rounded-xl border-2 border-white/20 bg-gradient-to-t from-[#0e0e14] to-[#1a1a2e]/90 backdrop-blur-sm overflow-hidden"
  >
    <!-- Avatar placeholder -->
    <div class="flex items-center justify-center w-full h-[130px] vtuber-idle">
      <svg
        class="w-16 h-16 text-white/20"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
        />
      </svg>
    </div>

    <!-- Name bar -->
    <div
      class="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-3 py-2 bg-black/60 text-xs"
    >
      <span class="relative flex h-2 w-2">
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"
        />
        <span class="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      <span class="font-semibold text-white/90 truncate">MaskChan_TV</span>
    </div>
  </div>
</template>

<style scoped>
.vtuber-idle {
  animation: vtuber-breathe 3s ease-in-out infinite;
}

@keyframes vtuber-breathe {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}
</style>
