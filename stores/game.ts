import { GAME_CONFIG } from '~/data/config'

export type GameState = 'menu' | 'playing' | 'gameover'

export const useGameStore = defineStore('game', () => {
  const state = ref<GameState>('menu')
  const score = ref<number>(GAME_CONFIG.INITIAL_VIEWERS)
  const health = ref(3)
  const combo = ref(0)
  const bestCombo = ref(0)
  const threatsMasked = ref(0)
  const threatsExpired = ref(0)
  const falsePositives = ref(0)
  const startTime = ref(0)
  const endTime = ref(0)

  const isRunning = computed(() => state.value === 'playing')

  const comboMultiplier = computed(() => {
    const thresholds = GAME_CONFIG.COMBO_THRESHOLDS
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (combo.value >= thresholds[i]!.combo) return thresholds[i]!.multiplier
    }
    return 1
  })

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
    score.value = GAME_CONFIG.INITIAL_VIEWERS
    health.value = 3
    combo.value = 0
    bestCombo.value = 0
    threatsMasked.value = 0
    threatsExpired.value = 0
    falsePositives.value = 0
    startTime.value = Date.now()
    endTime.value = 0
  }

  function maskThreat(spawnedAt: number) {
    if (state.value !== 'playing') return

    threatsMasked.value++
    combo.value++
    if (combo.value > bestCombo.value) bestCombo.value = combo.value

    const elapsed = Date.now() - spawnedAt
    let points = GAME_CONFIG.BASE_POINTS
    if (elapsed <= GAME_CONFIG.SPEED_BONUS_THRESHOLD) {
      points += GAME_CONFIG.SPEED_BONUS
    }
    score.value += Math.round(points * comboMultiplier.value)
  }

  function penalizeFalsePositive() {
    if (state.value !== 'playing') return
    falsePositives.value++
    combo.value = 0
    score.value = Math.max(0, score.value - GAME_CONFIG.FALSE_POSITIVE_PENALTY)
  }

  function missedThreat() {
    if (state.value !== 'playing') return
    threatsExpired.value++
    combo.value = 0
    health.value--
    if (health.value <= 0) {
      health.value = 0
      gameOver()
    }
  }

  function gameOver() {
    endTime.value = Date.now()
    state.value = 'gameover'
  }

  function reset() {
    state.value = 'menu'
    score.value = GAME_CONFIG.INITIAL_VIEWERS
    health.value = 3
    combo.value = 0
    bestCombo.value = 0
    threatsMasked.value = 0
    threatsExpired.value = 0
    falsePositives.value = 0
    startTime.value = 0
    endTime.value = 0
  }

  return {
    state,
    score,
    health,
    combo,
    bestCombo,
    threatsMasked,
    threatsExpired,
    falsePositives,
    startTime,
    endTime,
    isRunning,
    comboMultiplier,
    survivalTime,
    accuracy,
    grade,
    start,
    maskThreat,
    penalizeFalsePositive,
    missedThreat,
    gameOver,
    reset,
  }
})
