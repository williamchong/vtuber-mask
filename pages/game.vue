<template>
  <div class="flex flex-col w-[1280px] h-[720px] mx-auto bg-[#1a1a2e] text-white">
    <header class="flex items-center justify-between h-[60px] bg-[#0f0f1e] px-6 border-b border-white/10">
      <span class="font-bold">VTuber Mask</span>
      <span class="text-sm">🎭 Protect the Stream!</span>
      <span class="text-sm text-white/70">👁 1,234</span>
    </header>

    <div class="flex flex-1">
      <!-- Stream Panel (50%) -->
      <div class="relative w-1/2 bg-[#0e0e14]">
        <div class="absolute top-4 left-4 z-[100] min-w-[180px] p-3 rounded-xl bg-black/70 backdrop-blur-[10px] text-sm">
          <div class="font-semibold">💯 0</div>
          <div class="font-semibold mt-1">🔥 0x</div>
          <div class="mt-1">❤️ 100%</div>
        </div>
        <div class="flex items-center justify-center w-full h-full text-white/30">
          Stream Panel
        </div>
      </div>

      <!-- Chat Panel (50%) -->
      <div class="w-1/2 flex flex-col bg-[#1f1f23] border-l border-white/10">
        <div class="flex justify-between items-center px-4 py-3.5 bg-[#18181b] border-b border-white/10 font-semibold text-sm">
          <span>💬 STREAM CHAT</span>
        </div>
        <div class="flex-1 flex items-center justify-center text-white/30">
          Chat messages will appear here
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center h-[50px] px-6 bg-black/80 border-t border-white/10 text-sm text-white/70">
      <span class="text-red-500 font-bold animate-pulse">🔴 LIVE</span>
      <span>Reaction Game</span>
    </div>
  </div>
</template>
