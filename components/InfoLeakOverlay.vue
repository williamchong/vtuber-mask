<script setup lang="ts">
import type { InfoLeakState } from '~/composables/useInfoLeak'
import gmailImg from '~/assets/image/gmail.png'

const HOLD_DURATION = 100

const props = defineProps<{
  state: InfoLeakState
}>()

const emit = defineEmits<{
  censor: []
}>()

const audio = useAudio()
let holdTimer: ReturnType<typeof setTimeout> | null = null
const holding = ref(false)

function startHold() {
  if (props.state !== 'grace' && props.state !== 'danger') return
  holding.value = true
  holdTimer = setTimeout(() => {
    holding.value = false
    audio.playClick()
    audio.playCorrect()
    emit('censor')
  }, HOLD_DURATION)
}

function cancelHold() {
  holding.value = false
  if (holdTimer) {
    clearTimeout(holdTimer)
    holdTimer = null
  }
}
</script>

<template>
  <!-- Gmail screen -->
  <div
    v-if="state === 'grace' || state === 'danger'"
    class="absolute inset-0 z-[80] cursor-pointer select-none"
    @pointerdown.prevent="startHold"
    @pointerup="cancelHold"
    @pointerleave="cancelHold"
  >
    <img :src="gmailImg" class="absolute inset-0 w-full h-full object-cover" draggable="false" >

    <!-- Danger warning icon -->
    <Transition name="warn-fade">
      <div
        v-if="state === 'danger'"
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          class="warn-pulse flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-red-500/20 backdrop-blur-sm"
        >
          <svg
            class="w-16 h-16 text-red-500 drop-shadow-lg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
          </svg>
          <span class="text-red-400 text-sm font-bold uppercase tracking-wider"
            >Personal Info Exposed!</span
          >
        </div>
      </div>
    </Transition>

    <!-- Hold progress bar -->
    <div v-if="holding" class="hold-progress absolute inset-0 bg-white/20 pointer-events-none" />
  </div>

  <!-- Censored blur overlay -->
  <div
    v-if="state === 'censored'"
    class="absolute inset-0 z-[80] pointer-events-none censor-blur"
  />
</template>

<style scoped>
.warn-fade-enter-active {
  transition: opacity 0.2s ease-out;
}
.warn-fade-enter-from {
  opacity: 0;
}

.warn-pulse {
  animation: warn-pulse 0.6s ease-in-out infinite;
}

@keyframes warn-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgb(239 68 68 / 0.4);
  }
  50% {
    box-shadow: 0 0 30px 10px rgb(239 68 68 / 0.3);
  }
}

.hold-progress {
  transform-origin: left;
  animation: hold-fill 100ms linear forwards;
}

@keyframes hold-fill {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.censor-blur {
  backdrop-filter: blur(30px);
  animation: blur-fade 1s ease-out forwards;
}

@keyframes blur-fade {
  0% {
    backdrop-filter: blur(30px);
    opacity: 1;
  }
  70% {
    backdrop-filter: blur(20px);
    opacity: 0.8;
  }
  100% {
    backdrop-filter: blur(0px);
    opacity: 0;
  }
}
</style>
