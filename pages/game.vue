<script setup lang="ts">
import { GAME_CONFIG } from '~/data/config'

const gameStore = useGameStore()
const chatStore = useChatStore()
const infoLeak = useInfoLeak()
const misbehavior = useMisbehavior()
const externalDanger = computed(
  () => infoLeak.leakState.value === 'danger' || misbehavior.state.value === 'danger'
)
const gameLoop = useGameLoop(externalDanger)
const audio = useAudio()
const router = useRouter()
const missFlash = ref(false)
const viewerDeltaDisplay = ref<number | null>(null)
let deltaTimeout: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  gameLoop.start()
  infoLeak.start()
  misbehavior.start()
  audio.startBgm()
})

onUnmounted(() => {
  gameLoop.stop()
  infoLeak.stop()
  misbehavior.stop()
  audio.stopBgm()
})

watch(
  () => gameStore.state,
  s => {
    if (s === 'gameover') {
      gameLoop.stop()
      infoLeak.stop()
      misbehavior.stop()
      audio.stopBgm()
      audio.playGameOver()
      router.push('/gameover')
    }
  }
)

// Flash red and play hurt sound when a threat is missed
watch(
  () => gameStore.threatsExpired,
  (newVal, oldVal) => {
    if (newVal > oldVal) {
      missFlash.value = true
      audio.playHurt()
      setTimeout(() => {
        missFlash.value = false
      }, 400)
    }
  }
)

// Play sound when new chat message appears
watch(
  () => chatStore.messages.length,
  (newLen, oldLen) => {
    if (newLen > oldLen) {
      audio.playNewChat()
    }
  }
)

// Show viewer delta when it changes from player action
watch(
  () => gameStore.viewerDeltaSeq,
  () => {
    const delta = gameStore.viewerDelta
    if (delta === 0) return
    viewerDeltaDisplay.value = delta
    if (deltaTimeout) clearTimeout(deltaTimeout)
    deltaTimeout = setTimeout(() => {
      viewerDeltaDisplay.value = null
    }, 1200)
  }
)

const smoothnessDotColors = {
  smooth: 'bg-green-400',
  normal: 'bg-yellow-400',
  laggy: 'bg-red-400',
} as const

const smoothnessDotColor = computed(() => smoothnessDotColors[gameStore.smoothness])

const emotionalPercent = computed(() =>
  Math.max(0, Math.min(100, (gameStore.emotionalValue / GAME_CONFIG.EMOTIONAL_VALUE_MAX) * 100))
)

const emotionalBarColor = computed(() => {
  const p = emotionalPercent.value
  if (p > 60) return 'bg-green-500'
  if (p > 30) return 'bg-yellow-500'
  return 'bg-red-500'
})

const emotionalEmoji = computed(() => {
  const p = emotionalPercent.value
  if (p > 70) return '\u{1F60A}' // smiling face
  if (p > 40) return '\u{1F610}' // neutral face
  return '\u{1F622}' // crying face
})
</script>

<template>
  <div class="flex items-center justify-center w-screen h-screen bg-[#111118]">
    <div
      class="flex flex-col w-[1280px] h-[720px] bg-[#1a1a2e] text-white rounded-lg overflow-hidden shadow-2xl shadow-black/50 relative"
      :class="{ 'miss-shake': missFlash }"
    >
      <!-- Miss flash overlay -->
      <Transition name="miss-flash">
        <div
          v-if="missFlash"
          class="absolute inset-0 z-[200] pointer-events-none border-4 border-red-500/60 rounded-lg"
        />
      </Transition>

      <!-- Emotional Value Bar -->
      <div class="flex items-center h-6 bg-[#0a0a16] px-2 gap-2">
        <span class="text-sm leading-none">{{ emotionalEmoji }}</span>
        <div class="flex-1 h-1.5 bg-white/10 rounded-full relative overflow-hidden">
          <div
            class="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
            :class="emotionalBarColor"
            :style="{ width: `${emotionalPercent}%` }"
          />
        </div>
      </div>

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
        <div class="flex items-center gap-2 text-sm text-white/70">
          <span
            class="inline-block w-2 h-2 rounded-full transition-colors duration-300"
            :class="smoothnessDotColor"
          />
          <span>{{ Math.floor(gameStore.viewers).toLocaleString() }} viewers</span>
          <Transition name="delta-pop">
            <span
              v-if="viewerDeltaDisplay !== null"
              :key="viewerDeltaDisplay"
              class="text-xs font-bold tabular-nums"
              :class="viewerDeltaDisplay < 0 ? 'text-red-400' : 'text-green-400'"
            >
              {{ viewerDeltaDisplay < 0 ? '' : '+' }}{{ viewerDeltaDisplay }}
            </span>
          </Transition>
        </div>
      </header>

      <!-- Main panels -->
      <div class="flex flex-1 min-h-0">
        <StreamPanel
          :info-leak-state="infoLeak.leakState.value"
          :misbehavior-state="misbehavior.state.value"
          @censor-leak="infoLeak.censor()"
          @censor-misbehavior="misbehavior.censor()"
        />
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
        <span class="text-white/50">Hold to censor inappropriate content!</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.miss-shake {
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-4px);
  }
  40% {
    transform: translateX(4px);
  }
  60% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(2px);
  }
}

.miss-flash-enter-active {
  transition: opacity 0.05s ease-in;
}
.miss-flash-leave-active {
  transition: opacity 0.35s ease-out;
}
.miss-flash-enter-from,
.miss-flash-leave-to {
  opacity: 0;
}

.delta-pop-enter-active {
  animation: delta-in 0.25s ease-out;
}
.delta-pop-leave-active {
  animation: delta-out 0.4s ease-in;
}

@keyframes delta-in {
  0% {
    opacity: 0;
    transform: translateY(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes delta-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-6px);
  }
}
</style>
