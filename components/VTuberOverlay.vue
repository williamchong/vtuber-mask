<script setup lang="ts">
import { loadOml2d } from 'oh-my-live2d'

const gameStore = useGameStore()
const containerRef = ref<HTMLElement | null>(null)

const smoothnessColors = {
  smooth: { dot: 'bg-green-500', ping: 'bg-green-400' },
  normal: { dot: 'bg-yellow-500', ping: 'bg-yellow-400' },
  laggy: { dot: 'bg-red-500', ping: 'bg-red-400' },
} as const

const dotColor = computed(() => smoothnessColors[gameStore.smoothness])
const baseURL = useRuntimeConfig().app.baseURL || '/'

onMounted(() => {
  if (!containerRef.value) return

  loadOml2d({
    parentElement: containerRef.value,
    dockedPosition: 'right',
    sayHello: false,
    transitionTime: 0,
    primaryColor: '#e94560',
    stageStyle: {
      width: 220,
      height: 150,
    },
    statusBar: {
      disable: true,
    },
    tips: {
      style: {
        display: 'none',
      },
    },
    menus: {
      style: {
        display: 'none',
      },
    },
    models: [
      {
        path: `${baseURL}live2d/hiyori_free_t08.model3.json`,
        position: [-110, -40],
        scale: 0.15,
        stageStyle: {
          width: 220,
          height: 150,
        },
      },
    ],
  })
})
</script>

<template>
  <div
    class="absolute bottom-4 right-4 z-50 w-[220px] h-[180px] rounded-xl border-2 border-white/20 bg-gradient-to-t from-[#0e0e14] to-[#1a1a2e]/90 backdrop-blur-sm overflow-hidden"
  >
    <!-- Live2D container -->
    <div ref="containerRef" class="w-full h-[150px]" />

    <!-- Name bar -->
    <div
      class="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-3 py-2 bg-black/60 text-xs z-[9999]"
    >
      <span class="relative flex h-2 w-2">
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 transition-colors duration-300"
          :class="dotColor.ping"
        />
        <span class="relative inline-flex h-2 w-2 rounded-full transition-colors duration-300" :class="dotColor.dot" />
      </span>
      <span class="font-semibold text-white/90 truncate">MaskChan_TV</span>
    </div>
  </div>
</template>
