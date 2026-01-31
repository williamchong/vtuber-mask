export type GameState = 'menu' | 'playing'

export const useGameStore = defineStore('game', () => {
  const state = ref<GameState>('menu')
  const score = ref(1234)
  const isRunning = computed(() => state.value === 'playing')

  function start() {
    state.value = 'playing'
  }

  function reset() {
    state.value = 'menu'
    score.value = 1234
  }

  return { state, score, isRunning, start, reset }
})
