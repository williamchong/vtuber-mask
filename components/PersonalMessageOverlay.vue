<script setup lang="ts">
import type { PersonalMessageState } from '~/composables/usePersonalMessage'
import discordMsgImg from '~/assets/image/discord_msg.png'

const HOLD_DURATION = 100

const props = defineProps<{
  state: PersonalMessageState
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
  <!-- Discord message notification (bottom-left corner) -->
  <div
    v-if="state === 'grace' || state === 'danger'"
    class="absolute bottom-4 left-4 max-w-[320px] max-h-[180px] z-[85] cursor-pointer select-none rounded-lg overflow-visible"
    :class="{ 'danger-glow': state === 'danger' }"
    @pointerdown.prevent="startHold"
    @pointerup="cancelHold"
    @pointerleave="cancelHold"
  >
    <img
      :src="discordMsgImg"
      class="max-w-[320px] max-h-[180px] object-contain rounded-lg"
      draggable="false"
    />

    <!-- Hold progress bar -->
    <div
      v-if="holding"
      class="hold-progress absolute inset-0 bg-white/20 pointer-events-none rounded-lg"
    />
  </div>

  <!-- Censored blur overlay (over the notification area only) -->
  <div
    v-if="state === 'censored'"
    class="absolute bottom-4 left-4 max-w-[320px] max-h-[180px] z-[85] pointer-events-none censor-blur rounded-lg"
  />
</template>

<style scoped>
.danger-glow {
  animation: danger-pulse 0.8s ease-in-out infinite;
}

@keyframes danger-pulse {
  0%,
  100% {
    box-shadow: 0 0 20px 5px rgb(255 0 0 / 0.5);
  }
  50% {
    box-shadow: 0 0 40px 15px rgb(255 0 0 / 0.8);
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
