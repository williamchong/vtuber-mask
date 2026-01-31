import { GAME_CONFIG } from '~/data/config'

export type GameState = 'menu' | 'playing' | 'gameover'
export type StreamSmoothness = 'smooth' | 'normal' | 'laggy'

export const useGameStore = defineStore('game', () => {
  const state = ref<GameState>('menu')
  const emotionalValue = ref<number>(GAME_CONFIG.EMOTIONAL_VALUE_INITIAL)
  const viewers = ref<number>(GAME_CONFIG.INITIAL_VIEWERS)
  const smoothness = ref<StreamSmoothness>('normal')
  const smoothnessTimer = ref<number>(0)
  const threatsMasked = ref<number>(0)
  const threatsExpired = ref<number>(0)
  const falsePositives = ref<number>(0)
  const startTime = ref<number>(0)
  const endTime = ref<number>(0)
  const peakViewers = ref<number>(GAME_CONFIG.INITIAL_VIEWERS)
  const viewerDelta = ref<number>(0)

  const viewerRate = computed(() => {
    switch (smoothness.value) {
      case 'smooth':
        return GAME_CONFIG.VIEWER_RATE_SMOOTH
      case 'normal':
        return GAME_CONFIG.VIEWER_RATE_NORMAL
      case 'laggy':
        return GAME_CONFIG.VIEWER_RATE_LAGGY
    }
  })

  const isRunning = computed(() => state.value === 'playing')

  const survivalTime = computed(() => {
    const end = endTime.value || Date.now()
    return startTime.value ? Math.floor((end - startTime.value) / 1000) : 0
  })

  const accuracy = computed(() => {
    const total = threatsMasked.value + threatsExpired.value
    if (total === 0) return 0
    return Math.round((threatsMasked.value / total) * 100)
  })

  const grade = computed(() => {
    const acc = accuracy.value
    if (acc >= 95) return 'S'
    if (acc >= 85) return 'A'
    if (acc >= 70) return 'B'
    if (acc >= 50) return 'C'
    return 'D'
  })

  function start() {
    state.value = 'playing'
    emotionalValue.value = GAME_CONFIG.EMOTIONAL_VALUE_INITIAL
    viewers.value = GAME_CONFIG.INITIAL_VIEWERS
    smoothness.value = 'normal'
    smoothnessTimer.value = 0
    threatsMasked.value = 0
    threatsExpired.value = 0
    falsePositives.value = 0
    startTime.value = Date.now()
    endTime.value = 0
    peakViewers.value = GAME_CONFIG.INITIAL_VIEWERS
    viewerDelta.value = 0
  }

  function setLaggy() {
    smoothness.value = 'laggy'
    smoothnessTimer.value = 0
  }

  /**
   * Update smoothness state machine each frame.
   * @param dt delta time in seconds
   * @param hasRedOrFlashing whether any unmasked threat is in the red/flashing zone
   */
  function updateSmoothness(dt: number, hasFlashing: boolean, hasRed: boolean) {
    if (state.value !== 'playing') return

    const dtMs = dt * 1000

    switch (smoothness.value) {
      case 'laggy':
        if (!hasFlashing) {
          smoothness.value = 'normal'
          smoothnessTimer.value = 0
        }
        break

      case 'normal':
        if (hasFlashing) {
          setLaggy()
        } else if (!hasRed) {
          smoothnessTimer.value += dtMs
          if (smoothnessTimer.value >= GAME_CONFIG.SMOOTHNESS_NORMAL_TO_SMOOTH_TIME) {
            smoothness.value = 'smooth'
            smoothnessTimer.value = 0
          }
        } else {
          smoothnessTimer.value = 0
        }
        break

      case 'smooth':
        if (hasFlashing || hasRed) {
          smoothness.value = 'normal'
          smoothnessTimer.value = 0
        }
        break
    }
  }

  function penalizeThreatRed() {
    if (state.value !== 'playing') return
    emotionalValue.value = Math.max(
      0,
      emotionalValue.value - GAME_CONFIG.THREAT_RED_EMOTIONAL_PENALTY
    )
    if (emotionalValue.value <= 0) gameOver()
  }

  function penalizeThreatFlash() {
    if (state.value !== 'playing') return
    emotionalValue.value = Math.max(
      0,
      emotionalValue.value - GAME_CONFIG.THREAT_FLASH_EMOTIONAL_PENALTY
    )
    if (emotionalValue.value <= 0) gameOver()
  }

  /**
   * @param positionRatio 0 = top of chat (late), 1 = bottom of chat (early)
   */
  function maskThreat(positionRatio: number) {
    if (state.value !== 'playing') return

    threatsMasked.value++

    const earlyBonus = Math.max(0, positionRatio - 0.5) * 2 // 0→1 for bottom half

    // Early mask emotional recovery (only in bottom half)
    if (positionRatio > 0.5) {
      emotionalValue.value = Math.min(
        GAME_CONFIG.EMOTIONAL_VALUE_MAX,
        emotionalValue.value + GAME_CONFIG.EARLY_MASK_EMOTIONAL_RECOVERY * earlyBonus
      )
    }
  }

  function penalizeFalsePositive() {
    if (state.value !== 'playing') return
    falsePositives.value++
    emotionalValue.value = Math.max(
      0,
      emotionalValue.value - GAME_CONFIG.FALSE_POSITIVE_EMOTIONAL_PENALTY
    )
    const before = viewers.value
    viewers.value = Math.max(0, viewers.value - GAME_CONFIG.FALSE_POSITIVE_VIEWER_PENALTY)
    viewerDelta.value = Math.round(viewers.value - before)
    setLaggy()
    if (emotionalValue.value <= 0) gameOver()
  }

  function missedThreat() {
    if (state.value !== 'playing') return
    threatsExpired.value++

    emotionalValue.value = Math.max(0, emotionalValue.value - GAME_CONFIG.MISS_EMOTIONAL_PENALTY)
    const before = viewers.value
    viewers.value = Math.max(0, viewers.value - GAME_CONFIG.VIEWER_MISS_PENALTY)
    viewerDelta.value = Math.round(viewers.value - before)
    setLaggy()

    if (emotionalValue.value <= 0) gameOver()
  }

  function penalizeInfoLeakDanger() {
    if (state.value !== 'playing') return
    emotionalValue.value = Math.max(
      0,
      emotionalValue.value - GAME_CONFIG.INFO_LEAK_DANGER_EMOTIONAL_PENALTY
    )
    setLaggy()
    if (emotionalValue.value <= 0) gameOver()
  }

  function missedInfoLeak() {
    if (state.value !== 'playing') return
    threatsExpired.value++
    emotionalValue.value = Math.max(
      0,
      emotionalValue.value - GAME_CONFIG.INFO_LEAK_MISS_EMOTIONAL_PENALTY
    )
    const before = viewers.value
    viewers.value = Math.max(0, viewers.value - GAME_CONFIG.INFO_LEAK_MISS_VIEWER_PENALTY)
    viewerDelta.value = Math.round(viewers.value - before)
    setLaggy()
    if (emotionalValue.value <= 0) gameOver()
  }

  function penalizeMisbehaviorDanger() {
    if (state.value !== 'playing') return
    emotionalValue.value = Math.max(
      0,
      emotionalValue.value - GAME_CONFIG.MISBEHAVIOR_DANGER_EMOTIONAL_PENALTY
    )
    setLaggy()
    if (emotionalValue.value <= 0) gameOver()
  }

  function drainMisbehaviorDanger(dt: number) {
    if (state.value !== 'playing') return
    emotionalValue.value = Math.max(
      0,
      emotionalValue.value - GAME_CONFIG.MISBEHAVIOR_DANGER_EMOTIONAL_DRAIN * dt
    )
    viewers.value = Math.max(0, viewers.value - GAME_CONFIG.MISBEHAVIOR_DANGER_VIEWER_DRAIN * dt)
    if (emotionalValue.value <= 0) gameOver()
  }

  function updateViewers(dt: number) {
    if (state.value !== 'playing') return
    viewers.value = Math.max(0, viewers.value + viewerRate.value * dt)
    if (viewers.value > peakViewers.value) peakViewers.value = Math.floor(viewers.value)
  }

  function fluctuateEmotionalValue() {
    if (state.value !== 'playing') return
    const [min, max] = GAME_CONFIG.EMOTIONAL_FLUCTUATION_RANGE
    const delta = min + Math.random() * (max - min)
    emotionalValue.value = Math.max(
      0,
      Math.min(GAME_CONFIG.EMOTIONAL_VALUE_MAX, emotionalValue.value + delta)
    )
    if (emotionalValue.value <= 0) gameOver()
  }

  function applySentiment(sentiment: 1 | 0 | -1) {
    if (state.value !== 'playing') return
    emotionalValue.value = Math.max(
      0,
      Math.min(GAME_CONFIG.EMOTIONAL_VALUE_MAX, emotionalValue.value + sentiment * 0.15)
    )
  }

  function gameOver() {
    endTime.value = Date.now()
    state.value = 'gameover'
  }

  function reset() {
    state.value = 'menu'
    emotionalValue.value = GAME_CONFIG.EMOTIONAL_VALUE_INITIAL
    viewers.value = GAME_CONFIG.INITIAL_VIEWERS
    smoothness.value = 'normal'
    smoothnessTimer.value = 0
    threatsMasked.value = 0
    threatsExpired.value = 0
    falsePositives.value = 0
    startTime.value = 0
    endTime.value = 0
    peakViewers.value = GAME_CONFIG.INITIAL_VIEWERS
    viewerDelta.value = 0
  }

  return {
    state,
    emotionalValue,
    viewers,
    smoothness,
    viewerRate,
    threatsMasked,
    threatsExpired,
    falsePositives,
    startTime,
    endTime,
    peakViewers,
    viewerDelta,
    isRunning,
    survivalTime,
    accuracy,
    grade,
    start,
    maskThreat,
    penalizeThreatRed,
    penalizeThreatFlash,
    penalizeFalsePositive,
    missedThreat,
    penalizeInfoLeakDanger,
    missedInfoLeak,
    penalizeMisbehaviorDanger,
    drainMisbehaviorDanger,
    updateSmoothness,
    updateViewers,
    fluctuateEmotionalValue,
    applySentiment,
    gameOver,
    reset,
  }
})
