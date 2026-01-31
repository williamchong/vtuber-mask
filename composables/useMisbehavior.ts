import { GAME_CONFIG } from '~/data/config'

export type MisbehaviorState = 'idle' | 'grace' | 'danger' | 'censored'

export function useMisbehavior() {
  const gameStore = useGameStore()
  const audio = useAudio()

  const state = ref<MisbehaviorState>('idle')
  let checkTimer: ReturnType<typeof setTimeout> | null = null
  let graceTimer: ReturnType<typeof setTimeout> | null = null
  let drainTimer: ReturnType<typeof setInterval> | null = null
  let censorTimer: ReturnType<typeof setTimeout> | null = null

  function scheduleCheck() {
    clearCheckTimer()
    if (!gameStore.isRunning) return

    checkTimer = setTimeout(() => {
      if (!gameStore.isRunning || state.value !== 'idle') {
        scheduleCheck()
        return
      }

      // Only trigger below emotion threshold
      const emotion = gameStore.emotionalValue
      if (emotion >= GAME_CONFIG.MISBEHAVIOR_EMOTION_THRESHOLD) {
        scheduleCheck()
        return
      }

      // Higher chance at lower emotion
      const chance =
        (GAME_CONFIG.MISBEHAVIOR_EMOTION_THRESHOLD - emotion) /
        GAME_CONFIG.MISBEHAVIOR_EMOTION_THRESHOLD
      if (Math.random() > chance) {
        scheduleCheck()
        return
      }

      trigger()
    }, GAME_CONFIG.MISBEHAVIOR_CHECK_INTERVAL)
  }

  function trigger() {
    state.value = 'grace'
    audio.playAngry()

    graceTimer = setTimeout(() => {
      if (state.value !== 'grace') return
      state.value = 'danger'
      gameStore.penalizeMisbehaviorDanger()
      startDrain()
    }, GAME_CONFIG.MISBEHAVIOR_GRACE_PERIOD)
  }

  function startDrain() {
    clearDrainTimer()
    const intervalMs = 200 // drain every 200ms for smooth decrease
    drainTimer = setInterval(() => {
      if (state.value !== 'danger' || !gameStore.isRunning) {
        clearDrainTimer()
        return
      }
      gameStore.drainMisbehaviorDanger(intervalMs / 1000)
    }, intervalMs)
  }

  function censor() {
    if (state.value !== 'grace' && state.value !== 'danger') return
    clearGraceTimer()
    clearDrainTimer()
    gameStore.threatsMasked++
    state.value = 'censored'

    censorTimer = setTimeout(() => {
      state.value = 'idle'
      scheduleCheck()
    }, GAME_CONFIG.MISBEHAVIOR_CENSOR_BLUR_TIME)
  }

  function start() {
    state.value = 'idle'
    scheduleCheck()
  }

  function stop() {
    state.value = 'idle'
    clearCheckTimer()
    clearGraceTimer()
    clearDrainTimer()
    clearCensorTimer()
  }

  function clearCheckTimer() {
    if (checkTimer) {
      clearTimeout(checkTimer)
      checkTimer = null
    }
  }

  function clearGraceTimer() {
    if (graceTimer) {
      clearTimeout(graceTimer)
      graceTimer = null
    }
  }

  function clearDrainTimer() {
    if (drainTimer) {
      clearInterval(drainTimer)
      drainTimer = null
    }
  }

  function clearCensorTimer() {
    if (censorTimer) {
      clearTimeout(censorTimer)
      censorTimer = null
    }
  }

  return {
    state,
    censor,
    start,
    stop,
  }
}
