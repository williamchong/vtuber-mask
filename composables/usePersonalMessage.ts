import { GAME_CONFIG } from '~/data/config'

export type PersonalMessageState = 'idle' | 'grace' | 'danger' | 'censored'

export function usePersonalMessage() {
  const gameStore = useGameStore()
  const audio = useAudio()

  const msgState = ref<PersonalMessageState>('idle')
  let spawnTimer: ReturnType<typeof setTimeout> | null = null
  let graceTimer: ReturnType<typeof setTimeout> | null = null
  let dangerTimer: ReturnType<typeof setTimeout> | null = null
  let censorTimer: ReturnType<typeof setTimeout> | null = null

  const isActive = computed(() => msgState.value !== 'idle')

  function scheduleNext() {
    clearSpawnTimer()
    if (!gameStore.isRunning) return

    const viewers = Math.min(gameStore.viewers, GAME_CONFIG.VIEWER_DIFFICULTY_CAP)
    const speedup =
      1 + (viewers - GAME_CONFIG.INITIAL_VIEWERS) / GAME_CONFIG.VIEWER_DIFFICULTY_SCALE
    const base = GAME_CONFIG.PERSONAL_MSG_BASE_INTERVAL
    const interval = Math.max(GAME_CONFIG.PERSONAL_MSG_MIN_INTERVAL, base / Math.max(0.5, speedup))
    const jitter = 0.7 + Math.random() * 0.6

    spawnTimer = setTimeout(() => {
      if (gameStore.isRunning && msgState.value === 'idle') {
        startMessage()
      } else {
        scheduleNext()
      }
    }, interval * jitter)
  }

  function startMessage() {
    msgState.value = 'grace'
    audio.playDiscordNotification()

    // After grace period, enter danger
    graceTimer = setTimeout(() => {
      if (msgState.value !== 'grace') return
      msgState.value = 'danger'
      gameStore.penalizePersonalMsgDanger()

      // After danger duration, expire
      dangerTimer = setTimeout(() => {
        if (msgState.value !== 'danger') return
        gameStore.missedPersonalMsg()
        msgState.value = 'idle'
        scheduleNext()
      }, GAME_CONFIG.PERSONAL_MSG_DANGER_DURATION)
    }, GAME_CONFIG.PERSONAL_MSG_GRACE_PERIOD)
  }

  function censor() {
    if (msgState.value !== 'grace' && msgState.value !== 'danger') return

    clearGraceTimer()
    clearDangerTimer()

    if (msgState.value === 'grace' || msgState.value === 'danger') {
      if (msgState.value === 'grace') {
        gameStore.threatsMasked++
      } else {
        // Danger state: already penalized on entry, still counts as masked
        gameStore.threatsMasked++
      }
    }

    msgState.value = 'censored'

    censorTimer = setTimeout(() => {
      msgState.value = 'idle'
      scheduleNext()
    }, GAME_CONFIG.PERSONAL_MSG_CENSOR_BLUR_TIME)
  }

  function start() {
    msgState.value = 'idle'
    scheduleNext()
  }

  function stop() {
    msgState.value = 'idle'
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
    msgState,
    isActive,
    censor,
    start,
    stop,
  }
}
