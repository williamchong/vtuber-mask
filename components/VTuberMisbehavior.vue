<script setup lang="ts">
import type { MisbehaviorState } from '~/composables/useMisbehavior'
import angryImg from '~/assets/image/vtuber_angry.png'

const HOLD_DURATION = 100

const props = defineProps<{
  state: MisbehaviorState
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
  <!-- Angry VTuber overlay (grace + danger) -->
  <Transition name="misbehavior">
    <div
      v-if="state === 'grace' || state === 'danger'"
      class="absolute inset-0 z-[9999] cursor-pointer select-none overflow-hidden rounded-xl"
      @pointerdown.prevent="startHold"
      @pointerup="cancelHold"
      @pointerleave="cancelHold"
    >
      <!-- Angry VTuber image -->
      <img :src="angryImg" class="absolute inset-0 w-full h-full object-cover" draggable="false" />

      <!-- Pulsing red border (danger only) -->
      <div
        v-if="state === 'danger'"
        class="absolute inset-0 border-2 border-red-500 rounded-xl misbehavior-pulse pointer-events-none"
      />

      <!-- Flashing warning icon (danger only) -->
      <Transition name="warn-fade">
        <div
          v-if="state === 'danger'"
          class="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            class="warn-pulse flex flex-col items-center gap-1 px-4 py-3 rounded-2xl bg-red-500/20 backdrop-blur-sm"
          >
            <svg
              class="w-10 h-10 text-red-500 drop-shadow-lg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
            <span class="text-red-400 text-[10px] font-bold uppercase tracking-wider"
              >Misbehaving!</span
            >
          </div>
        </div>
      </Transition>

      <!-- Hold progress -->
      <div v-if="holding" class="hold-progress absolute inset-0 bg-white/20 pointer-events-none" />
    </div>
  </Transition>

  <!-- Censored blur overlay -->
  <Transition name="censor-blur-transition">
    <div
      v-if="state === 'censored'"
      class="absolute inset-0 z-[9999] pointer-events-none censor-blur rounded-xl"
    />
  </Transition>
</template>

<style scoped>
.misbehavior-enter-active {
  transition: all 0.15s ease-out;
}
.misbehavior-leave-active {
  transition: all 0.2s ease-in;
}
.misbehavior-enter-from {
  opacity: 0;
  transform: scale(1.1);
}
.misbehavior-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.misbehavior-pulse {
  animation: misbehavior-pulse 0.5s ease-in-out infinite;
}

@keyframes misbehavior-pulse {
  0%,
  100% {
    box-shadow: inset 0 0 8px rgb(239 68 68 / 0.3);
  }
  50% {
    box-shadow: inset 0 0 20px rgb(239 68 68 / 0.6);
  }
}

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
    box-shadow: 0 0 20px 6px rgb(239 68 68 / 0.3);
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

.censor-blur-transition-enter-active {
  transition: opacity 0.1s ease-out;
}
.censor-blur-transition-leave-active {
  transition: opacity 0.5s ease-out;
}
.censor-blur-transition-enter-from,
.censor-blur-transition-leave-to {
  opacity: 0;
}

.censor-blur {
  backdrop-filter: blur(20px);
  animation: blur-fade 2s ease-out forwards;
}

@keyframes blur-fade {
  0% {
    backdrop-filter: blur(20px);
    opacity: 1;
  }
  70% {
    backdrop-filter: blur(12px);
    opacity: 0.8;
  }
  100% {
    backdrop-filter: blur(0px);
    opacity: 0;
  }
}
</style>
