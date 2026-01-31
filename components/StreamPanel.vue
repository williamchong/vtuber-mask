<script setup lang="ts">
import type { InfoLeakState } from '~/composables/useInfoLeak'
import type { MisbehaviorState } from '~/composables/useMisbehavior'
import streamVideo from '~/assets/video/stream_normal.mp4'

defineProps<{
  infoLeakState: InfoLeakState
  misbehaviorState: MisbehaviorState
}>()

const emit = defineEmits<{
  censorLeak: []
  censorMisbehavior: []
}>()
</script>

<template>
  <div class="relative w-1/2 bg-[#0e0e14] overflow-hidden">
    <!-- Scanline / grid texture -->
    <div class="absolute inset-0 stream-grid pointer-events-none" />

    <!-- Stream video content -->
    <video
      class="absolute inset-0 w-full h-full object-cover"
      :src="streamVideo"
      autoplay
      loop
      muted
      playsinline
    />

    <InfoLeakOverlay :state="infoLeakState" @censor="emit('censorLeak')" />

    <VTuberOverlay
      :misbehavior-state="misbehaviorState"
      @censor-misbehavior="emit('censorMisbehavior')"
    />
  </div>
</template>

<style scoped>
.stream-grid {
  background-image:
    linear-gradient(rgba(255 255 255 / 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255 255 255 / 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
