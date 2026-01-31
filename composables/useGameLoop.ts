export function useGameLoop() {
  const gameStore = useGameStore()
  const chatStore = useChatStore()
  let rafId: number | null = null

  function tick() {
    if (!gameStore.isRunning) return

    const expired = chatStore.expireThreats()
    for (let i = 0; i < expired; i++) {
      gameStore.missedThreat()
    }

    rafId = requestAnimationFrame(tick)
  }

  function start() {
    gameStore.start()
    chatStore.startChat()
    rafId = requestAnimationFrame(tick)
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    chatStore.stopChat()
  }

  return { start, stop }
}
