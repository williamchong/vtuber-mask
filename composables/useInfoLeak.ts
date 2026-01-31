import { GAME_CONFIG } from '~/data/config'

export type InfoLeakState = 'idle' | 'grace' | 'danger' | 'censored'

export function useInfoLeak() {
  const gameStore = useGameStore()

  const leakState = ref<InfoLeakState>('idle')
  let spawnTimer: ReturnType<typeof setTimeout> | null = null
  let graceTimer: ReturnType<typeof setTimeout> | null = null
  let dangerTimer: ReturnType<typeof setTimeout> | null = null
  let censorTimer: ReturnType<typeof setTimeout> | null = null

  const isActive = computed(() => leakState.value !== 'idle')

  function scheduleNext() {
    clearSpawnTimer()
    if (!gameStore.isRunning) return

    const viewers = Math.min(gameStore.viewers, GAME_CONFIG.VIEWER_DIFFICULTY_CAP)
    const speedup =
      1 + (viewers - GAME_CONFIG.INITIAL_VIEWERS) / GAME_CONFIG.VIEWER_DIFFICULTY_SCALE
    const base = GAME_CONFIG.INFO_LEAK_BASE_INTERVAL
    const interval = Math.max(GAME_CONFIG.INFO_LEAK_MIN_INTERVAL, base / Math.max(0.5, speedup))
    const jitter = 0.7 + Math.random() * 0.6

    spawnTimer = setTimeout(() => {
      if (gameStore.isRunning && leakState.value === 'idle') {
        startLeak()
      } else {
        scheduleNext()
      }
    }, interval * jitter)
  }

  function startLeak() {
    leakState.value = 'grace'

    // After grace period, enter danger
    graceTimer = setTimeout(() => {
      if (leakState.value !== 'grace') return
      leakState.value = 'danger'
      gameStore.penalizeInfoLeakDanger()

      // After danger duration, expire
      dangerTimer = setTimeout(() => {
        if (leakState.value !== 'danger') return
        gameStore.missedInfoLeak()
        leakState.value = 'idle'
        scheduleNext()
      }, GAME_CONFIG.INFO_LEAK_DANGER_DURATION)
    }, GAME_CONFIG.INFO_LEAK_GRACE_PERIOD)
  }

  function censor() {
    if (leakState.value !== 'grace' && leakState.value !== 'danger') return

    clearGraceTimer()
    clearDangerTimer()

    if (leakState.value === 'grace' || leakState.value === 'danger') {
      if (leakState.value === 'grace') {
        gameStore.threatsMasked++
      } else {
        // Danger state: already penalized on entry, still counts as masked
        gameStore.threatsMasked++
      }
    }

    leakState.value = 'censored'

    censorTimer = setTimeout(() => {
      leakState.value = 'idle'
      scheduleNext()
    }, GAME_CONFIG.INFO_LEAK_CENSOR_BLUR_TIME)
  }

  function start() {
    leakState.value = 'idle'
    scheduleNext()
  }

  function stop() {
    leakState.value = 'idle'
    clearSpawnTimer()
    clearGraceTimer()
    clearDangerTimer()
    clearCensorTimer()
  }

  function clearSpawnTimer() {
    if (spawnTimer) {
      clearTimeout(spawnTimer)
      spawnTimer = null
    }
  }
  function clearGraceTimer() {
    if (graceTimer) {
      clearTimeout(graceTimer)
      graceTimer = null
    }
  }
  function clearDangerTimer() {
    if (dangerTimer) {
      clearTimeout(dangerTimer)
      dangerTimer = null
    }
  }
  function clearCensorTimer() {
    if (censorTimer) {
      clearTimeout(censorTimer)
      censorTimer = null
    }
  }

  return {
    leakState,
    isActive,
    censor,
    start,
    stop,
  }
}
