<script setup lang="ts">
import type { ChatMessage } from '~/stores/chat'

const props = defineProps<{
  message: ChatMessage
  index: number
  totalMessages: number
}>()

const chatStore = useChatStore()
const gameStore = useGameStore()

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

function handleClick() {
  const msg = props.message
  if (msg.isMasked || !gameStore.isRunning) return

  if (msg.isThreat) {
    const spawnedAt = chatStore.maskMessage(msg.id)
    if (spawnedAt) {
      chatStore.flagCorrectMask(msg.id)
      const total = props.totalMessages
      const positionRatio = total > 1 ? props.index / (total - 1) : 0
      gameStore.maskThreat(positionRatio)
    }
  }
  else {
    chatStore.maskMessage(msg.id)
    chatStore.flagFalsePositive(msg.id)
    gameStore.penalizeFalsePositive()
  }
}
</script>

<template>
  <div
    class="px-4 py-1.5 border-l-2 cursor-pointer select-none"
    :class="{
      'border-transparent hover:bg-white/[0.04]':
        !message.isMasked && !message.falsePositive && !isFlashing,
      'border-l-[#1a1a2e] bg-[#1a1a2e]': message.isMasked && !message.correctMask && !message.falsePositive,
      'border-l-green-400 bg-green-500/30': message.correctMask,
      'border-l-red-400 bg-red-500/30': message.falsePositive,
      'threat-flash': isFlashing,
    }"
    :style="
      !message.isMasked && !message.falsePositive && !isFlashing
        ? threatStyle
        : {}
    "
    @click="handleClick"
  >
    <template v-if="message.isMasked">
      <span class="text-sm font-bold text-white/40">{{ message.username }}</span>
      <span class="ml-2 text-sm text-white/30 line-through">[CENSORED]</span>
    </template>
    <template v-else>
      <span class="text-sm font-bold" :style="{ color: message.color }">{{ message.username }}</span>
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
</style>
