<script setup lang="ts">
const chatStore = useChatStore()
const chatContainer = ref<HTMLElement | null>(null)

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
        class="chat-message px-4 py-1.5 border-l-2 cursor-pointer select-none transition-colors duration-150"
        :class="{
          'border-transparent hover:bg-white/[0.04]':
            !msg.isThreat && !msg.isMasked && !msg.falsePositive,
          'border-l-red-500 bg-red-500/10 hover:bg-red-500/20': msg.isThreat && !msg.isMasked,
          'border-l-[#1a1a2e] bg-[#1a1a2e]': msg.isMasked,
          'border-l-red-400 bg-red-500/30': msg.falsePositive,
        }"
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
.chat-message.border-l-red-500 {
  animation: threat-pulse 1.5s ease-in-out infinite;
}

@keyframes threat-pulse {
  0%,
  100% {
    background-color: rgb(239 68 68 / 0.1);
  }
  50% {
    background-color: rgb(239 68 68 / 0.2);
  }
}
</style>
