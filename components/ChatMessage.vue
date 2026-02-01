<script setup lang="ts">
import type { ChatMessage } from '~/stores/chat'

const HOLD_DURATION = 100 // ms

const props = defineProps<{
  message: ChatMessage
  index: number
  totalMessages: number
}>()

const chatStore = useChatStore()
const gameStore = useGameStore()
const audio = useAudio()

let holdTimer: ReturnType<typeof setTimeout> | null = null
let hintTimer: ReturnType<typeof setTimeout> | null = null
const holding = ref(false)
const showHoldHint = ref(false)

function getDanger(): number {
  if (!props.message.isThreat || props.message.isMasked) return 0
  const total = props.totalMessages
  if (total <= 1) return 0
  const position = props.index / (total - 1)
  if (position >= 0.5) return 0
  const t = 1 - position / 0.5
  return t * t * t
}

const isFlashing = computed(() => {
  if (!props.message.isThreat || props.message.isMasked) return false
  if (props.totalMessages <= 1) return false
  return props.index < props.totalMessages * 0.15
})

const danger = computed(() => getDanger())

const threatStyle = computed(() => {
  if (danger.value === 0) return {}
  const bgOpacity = 0.05 + danger.value * 0.4
  return {
    backgroundColor: `rgb(239 68 68 / ${bgOpacity})`,
    borderLeftColor: `rgb(239 68 68 / ${0.2 + danger.value * 0.8})`,
  }
})

function maskMessage() {
  const msg = props.message
  if (msg.isMasked || !gameStore.isRunning) return

  audio.playClick()

  if (msg.isThreat) {
    const spawnedAt = chatStore.maskMessage(msg.id)
    if (spawnedAt) {
      chatStore.flagCorrectMask(msg.id)
      const total = props.totalMessages
      const positionRatio = total > 1 ? props.index / (total - 1) : 0
      gameStore.maskThreat(positionRatio)
      audio.playCorrect()
    }
  } else {
    chatStore.maskMessage(msg.id)
    chatStore.flagFalsePositive(msg.id)
    gameStore.penalizeFalsePositive()
    audio.playIncorrect()
  }
}

function startHold() {
  if (props.message.isMasked || !gameStore.isRunning) return
  holding.value = true
  holdTimer = setTimeout(() => {
    holding.value = false
    maskMessage()
  }, HOLD_DURATION)
}

function cancelHold() {
  const wasHolding = holding.value
  holding.value = false
  if (holdTimer) {
    clearTimeout(holdTimer)
    holdTimer = null
  }

  // Show hint if user tapped but didn't hold long enough (only first time globally)
  if (wasHolding && !gameStore.holdHintShown) {
    gameStore.markHoldHintShown()
    showHoldHint.value = true
    if (hintTimer) clearTimeout(hintTimer)
    hintTimer = setTimeout(() => {
      showHoldHint.value = false
      hintTimer = null
    }, 2000)
  }
}
</script>

<template>
  <div
    class="relative px-4 py-1.5 border-l-2 cursor-pointer select-none overflow-visible"
    :class="{
      'border-transparent hover:bg-white/[0.04]':
        !message.isMasked && !message.falsePositive && !isFlashing,
      'border-l-[#1a1a2e] bg-[#1a1a2e]':
        message.isMasked && !message.correctMask && !message.falsePositive,
      'border-l-green-400 bg-green-500/30': message.correctMask,
      'border-l-red-400 bg-red-500/30': message.falsePositive,
      'threat-flash': isFlashing,
    }"
    :style="!message.isMasked && !message.falsePositive && !isFlashing ? threatStyle : {}"
    @pointerdown.prevent="startHold"
    @pointerup="cancelHold"
    @pointerleave="cancelHold"
  >
    <!-- Hold progress bar -->
    <div v-if="holding" class="hold-progress absolute inset-0 bg-white/15 pointer-events-none" />

    <!-- Hold hint (shows once after first failed tap) -->
    <Transition name="hint-fade">
      <div
        v-if="showHoldHint && !message.isMasked"
        class="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 bg-black/90 text-white text-sm rounded-lg pointer-events-none"
      >
        Hold to censor!
      </div>
    </Transition>

    <template v-if="message.isMasked">
      <span class="text-sm font-bold text-white/40">{{ message.username }}</span>
      <span class="ml-2 text-sm text-white/30 line-through">[CENSORED]</span>
    </template>
    <template v-else>
      <span class="text-sm font-bold" :style="{ color: message.color }">{{
        message.username
      }}</span>
      <span class="ml-2 text-sm text-white/80">{{ message.text }}</span>
    </template>
  </div>
</template>

<style scoped>
.threat-flash {
  animation: threat-flash 0.5s ease-in-out infinite;
  border-left-color: rgb(239 68 68) !important;
}

@keyframes threat-flash {
  0%,
  100% {
    background-color: rgb(239 68 68 / 0.25);
  }
  50% {
    background-color: rgb(239 68 68 / 0.55);
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

.hint-fade-enter-active,
.hint-fade-leave-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}

.hint-fade-enter-from,
.hint-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(4px);
}
</style>
