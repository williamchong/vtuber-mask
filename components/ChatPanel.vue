<script setup lang="ts">
const chatStore = useChatStore()
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
        <ChatMessage
          v-for="(msg, index) in chatStore.messages"
          :key="msg.id"
          :message="msg"
          :index="index"
          :total-messages="chatStore.messages.length"
        />
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
</style>
