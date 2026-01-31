export function useGameLoop() {
  const gameStore = useGameStore()
  const chatStore = useChatStore()

  function start() {
    gameStore.start()
    chatStore.startChat()
  }

  function stop() {
    chatStore.stopChat()
    gameStore.reset()
  }

  return { start, stop }
}
