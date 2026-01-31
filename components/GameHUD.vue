<script setup lang="ts">
const gameStore = useGameStore()

const showCombo = ref(false)
let comboTimeout: ReturnType<typeof setTimeout> | null = null

watch(
  () => gameStore.combo,
  newCombo => {
    if (newCombo >= 2) {
      showCombo.value = true
      if (comboTimeout) clearTimeout(comboTimeout)
      comboTimeout = null
    } else {
      // Fade out after a short delay when combo resets
      if (comboTimeout) clearTimeout(comboTimeout)
      comboTimeout = setTimeout(() => {
        showCombo.value = false
      }, 1500)
    }
  }
)
</script>

<template>
  <Transition name="combo-pop">
    <div
      v-if="showCombo"
      class="absolute top-4 left-4 z-[100] rounded-xl bg-black/70 backdrop-blur-[10px] border border-white/10 px-4 py-3"
    >
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-black text-[#00ff88] tabular-nums">
          {{ gameStore.combo }}x
        </span>
        <span v-if="gameStore.comboMultiplier > 1" class="text-sm font-bold text-[#00ff88]/70">
          ({{ gameStore.comboMultiplier }}x)
        </span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.combo-pop-enter-active {
  animation: combo-in 0.3s ease-out;
}
.combo-pop-leave-active {
  animation: combo-out 0.3s ease-in;
}

@keyframes combo-in {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes combo-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
</style>
