<script setup lang="ts">
import { GAME_CONFIG } from '~/data/config'

const chatStore = useChatStore()
const chatContainer = ref<HTMLElement | null>(null)
const now = ref(Date.now())
let rafId: number | null = null

function tick() {
  now.value = Date.now()
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})

function getDanger(msg: (typeof chatStore.messages)[number]): number {
  if (!msg.isThreat || msg.isMasked || !msg.spawnedAt) return 0
  const elapsed = now.value - msg.spawnedAt
  const progress = Math.min(elapsed / GAME_CONFIG.THREAT_DURATION, 1)
  // Cubic ease-in: slow start, quick end
  return progress * progress * progress
}

function isFlashing(msg: (typeof chatStore.messages)[number]): boolean {
  if (!msg.isThreat || msg.isMasked || !msg.spawnedAt) return false
  const elapsed = now.value - msg.spawnedAt
  // Flash during the last 20% of the duration
  return elapsed > GAME_CONFIG.THREAT_DURATION * 0.8
}

function threatStyle(msg: (typeof chatStore.messages)[number]) {
  const danger = getDanger(msg)
  if (danger === 0) return {}
  return {
    backgroundColor: `rgb(239 68 68 / ${danger * 0.2})`,
    borderLeftColor: `rgb(239 68 68 / ${danger})`,
  }
}

function handleClick(msg: (typeof chatStore.messages)[number]) {
  if (msg.isMasked) return

  if (msg.isThreat) {
    chatStore.maskMessage(msg.id)
  } else {
    chatStore.flagFalsePositive(msg.id)
  }
}

watch(
  () => chatStore.messages.length,
  async () => {
    await nextTick()
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }
)
</script>

<template>
  <div class="w-1/2 flex flex-col bg-[#1f1f23] border-l border-white/10">
    <div
      class="flex justify-between items-center px-4 py-3.5 bg-[#18181b] border-b border-white/10 font-semibold text-sm"
    >
      <span>STREAM CHAT</span>
    </div>

    <div ref="chatContainer" class="flex-1 overflow-y-auto">
      <div
        v-for="msg in chatStore.messages"
        :key="msg.id"
        class="px-4 py-1.5 border-l-2 cursor-pointer select-none"
        :class="{
          'border-transparent hover:bg-white/[0.04]':
            !msg.isThreat && !msg.isMasked && !msg.falsePositive,
          'border-l-[#1a1a2e] bg-[#1a1a2e]': msg.isMasked,
          'border-l-red-400 bg-red-500/30': msg.falsePositive,
          'threat-flash': isFlashing(msg),
        }"
        :style="!msg.isMasked && !msg.falsePositive ? threatStyle(msg) : {}"
        @click="handleClick(msg)"
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
    </div>
  </div>
</template>

<style scoped>
.threat-flash {
  animation: threat-flash 0.4s ease-in-out infinite;
}

@keyframes threat-flash {
  0%,
  100% {
    background-color: rgb(239 68 68 / 0.15);
  }
  50% {
    background-color: rgb(239 68 68 / 0.35);
  }
}
</style>
