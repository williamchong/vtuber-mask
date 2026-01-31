export type GameState = 'menu' | 'playing'

export const useGameStore = defineStore('game', () => {
  const state = ref<GameState>('menu')
  const isRunning = computed(() => state.value === 'playing')

  function start() {
    state.value = 'playing'
  }

  function reset() {
    state.value = 'menu'
  }

  return { state, isRunning, start, reset }
})
