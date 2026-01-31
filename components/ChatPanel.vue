<script setup lang="ts">
const chatStore = useChatStore()
const gameStore = useGameStore()

function getDanger(msg: (typeof chatStore.messages)[number], index: number): number {
  if (!msg.isThreat || msg.isMasked) return 0
  const total = chatStore.messages.length
  if (total <= 1) return 0
  // position: 0 = top (oldest), 1 = bottom (newest)
  const position = index / (total - 1)
  // No danger in the bottom half — threat just appeared, looks normal
  if (position >= 0.5) return 0
  // Remap top half: position 0.5→0 maps to 0→1 danger
  const t = 1 - position / 0.5
  // Cubic ease-in: subtle at midway, intense near the top
  return t * t * t
}

function isFlashing(msg: (typeof chatStore.messages)[number], index: number): boolean {
  if (!msg.isThreat || msg.isMasked) return false
  const total = chatStore.messages.length
  if (total <= 1) return false
  // Flash when in the top ~15% of the chat (about to be pushed off)
  return index < total * 0.15
}

function threatStyle(msg: (typeof chatStore.messages)[number], index: number) {
  const danger = getDanger(msg, index)
  if (danger === 0) return {}
  // Ramp from barely visible to strong red
  const bgOpacity = 0.05 + danger * 0.4
  return {
    backgroundColor: `rgb(239 68 68 / ${bgOpacity})`,
    borderLeftColor: `rgb(239 68 68 / ${0.2 + danger * 0.8})`,
  }
}

function handleClick(msg: (typeof chatStore.messages)[number], index: number) {
  if (msg.isMasked || !gameStore.isRunning) return

  if (msg.isThreat) {
    const spawnedAt = chatStore.maskMessage(msg.id)
    if (spawnedAt) {
      chatStore.flagCorrectMask(msg.id)
      const total = chatStore.messages.length
      const positionRatio = total > 1 ? index / (total - 1) : 0
      gameStore.maskThreat(positionRatio)
    }
  } else {
    chatStore.maskMessage(msg.id)
    chatStore.flagFalsePositive(msg.id)
    gameStore.penalizeFalsePositive()
  }
}
</script>

<template>
  <div class="w-1/2 flex flex-col bg-[#1f1f23] border-l border-white/10">
    <div
      class="flex justify-between items-center px-4 py-3.5 bg-[#18181b] border-b border-white/10 font-semibold text-sm"
    >
      <span>STREAM CHAT</span>
    </div>

    <div class="flex-1 flex flex-col justify-end overflow-hidden">
      <TransitionGroup name="chat" tag="div" class="relative">
        <div
          v-for="(msg, index) in chatStore.messages"
          :key="msg.id"
          class="px-4 py-1.5 border-l-2 cursor-pointer select-none"
        :class="{
          'border-transparent hover:bg-white/[0.04]':
            !msg.isMasked && !msg.falsePositive && !isFlashing(msg, index),
          'border-l-[#1a1a2e] bg-[#1a1a2e]': msg.isMasked && !msg.correctMask && !msg.falsePositive,
          'border-l-green-400 bg-green-500/30': msg.correctMask,
          'border-l-red-400 bg-red-500/30': msg.falsePositive,
          'threat-flash': isFlashing(msg, index),
        }"
        :style="
          !msg.isMasked && !msg.falsePositive && !isFlashing(msg, index)
            ? threatStyle(msg, index)
            : {}
        "
        @click="handleClick(msg, index)"
      >
        <template v-if="msg.isMasked">
          <span class="text-sm font-bold text-white/40">{{ msg.username }}</span>
          <span class="ml-2 text-sm text-white/30 line-through">[CENSORED]</span>
        </template>
        <template v-else>
          <span class="text-sm font-bold" :style="{ color: msg.color }">{{ msg.username }}</span>
          <span class="ml-2 text-sm text-white/80">{{ msg.text }}</span>
        </template>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.chat-move,
.chat-enter-active,
.chat-leave-active {
  transition: all 0.3s ease;
}

.chat-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.chat-leave-active {
  position: absolute;
  width: 100%;
}

.chat-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

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
