import { GAME_CONFIG } from '~/data/config'

export function useViewportScale() {
  const scale = ref(1)

  function update() {
    scale.value = Math.min(
      window.innerWidth / GAME_CONFIG.VIEWPORT_WIDTH,
      window.innerHeight / GAME_CONFIG.VIEWPORT_HEIGHT,
      1
    )
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  const containerStyle = computed(() => ({
    transform: `scale(${scale.value})`,
    transformOrigin: 'center center',
  }))

  return { scale, containerStyle }
}
