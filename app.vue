<script setup lang="ts">
const { containerStyle } = useViewportScale()
</script>

<template>
  <div class="flex items-center justify-center w-screen h-screen bg-[#111118]">
    <div :style="containerStyle">
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </div>
  </div>
</template>
