import { GAME_CONFIG } from '~/data/config'

export function useGameLoop(externalDanger?: Ref<boolean>) {
  const gameStore = useGameStore()
  const chatStore = useChatStore()
  let rafId: number | null = null
  let lastTime = 0
  let emotionalFluctuationAccum = 0

  function tick(timestamp: number) {
    if (!gameStore.isRunning) return

    const dt = lastTime ? (timestamp - lastTime) / 1000 : 0
    lastTime = timestamp

    // Check danger zones and fire one-time emotional penalties on state transitions
    const total = chatStore.messages.length
    let hasFlashing = false
    let hasRed = false
    if (total > 1) {
      for (let i = 0; i < total; i++) {
        const msg = chatStore.messages[i]!
        if (!msg.isThreat || msg.isMasked) continue
        const isFlashing = i < total * 0.15
        const position = i / (total - 1)
        const isRed = !isFlashing && position < 0.5

        if (isFlashing) {
          hasFlashing = true
          if (!msg.flashTriggered) {
            msg.flashTriggered = true
            if (!msg.redTriggered) msg.redTriggered = true // skip red if went straight to flash
            gameStore.penalizeThreatFlash()
          }
        }
        else if (isRed) {
          hasRed = true
          if (!msg.redTriggered) {
            msg.redTriggered = true
            gameStore.penalizeThreatRed()
          }
        }
      }
    }

    // Include external danger (e.g. info leak in danger state)
    if (externalDanger?.value) {
      hasFlashing = true
    }

    // Update smoothness state machine
    gameStore.updateSmoothness(dt, hasFlashing, hasRed)

    // Update viewer growth
    gameStore.updateViewers(dt)

    // Emotional fluctuation on a timer
    emotionalFluctuationAccum += dt * 1000
    const interval = GAME_CONFIG.EMOTIONAL_FLUCTUATION_INTERVAL * (0.8 + Math.random() * 0.4)
    if (emotionalFluctuationAccum >= interval) {
      emotionalFluctuationAccum = 0
      gameStore.fluctuateEmotionalValue()
    }

    rafId = requestAnimationFrame(tick)
  }

  function start() {
    gameStore.start()
    chatStore.startChat()
    lastTime = 0
    emotionalFluctuationAccum = 0
    rafId = requestAnimationFrame(tick)
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    chatStore.clearChat()
  }

  return { start, stop }
}
