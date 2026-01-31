<template>
  <div class="flex items-center justify-center w-screen h-screen bg-[#1a1a2e] text-white">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-2">Game Over</h1>
      <p class="text-lg text-white/60 mb-8">Your stream has ended.</p>
      <div class="flex gap-4 justify-center">
        <UButton size="lg" color="primary" to="/game">Play Again</UButton>
        <UButton size="lg" color="neutral" variant="ghost" to="/">Main Menu</UButton>
      </div>
    </div>
  </div>
</template>
