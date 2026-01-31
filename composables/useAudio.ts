const audioCache = new Map<string, HTMLAudioElement>()
let bgmElement: HTMLAudioElement | null = null

function getAudio(path: string): HTMLAudioElement {
  let audio = audioCache.get(path)
  if (!audio) {
    audio = new Audio(path)
    audioCache.set(path, audio)
  }
  return audio
}

function playSfx(path: string, volume = 0.5) {
  const audio = getAudio(path)
  audio.volume = volume
  audio.currentTime = 0
  audio.play().catch(() => {})
}

export function useAudio() {
  const baseURL = useRuntimeConfig().app.baseURL || '/'
  const sfxPath = (name: string) => `${baseURL}audio/${name}`

  function playClick() {
    playSfx(sfxPath('generic_click.mp3'), 0.3)
  }

  function playCorrect() {
    playSfx(sfxPath('correct_action.mp3'), 0.5)
  }

  function playIncorrect() {
    playSfx(sfxPath('incorrect_action.mp3'), 0.5)
  }

  function playHurt() {
    const idx = Math.floor(Math.random() * 3) + 1
    playSfx(sfxPath(`hurt_${idx}.mp3`), 0.5)
  }

  function playNewChat() {
    playSfx(sfxPath('new_chat.mp3'), 0.15)
  }

  function playGameOver() {
    playSfx(sfxPath('game_over.mp3'), 0.6)
  }

  function startBgm() {
    if (bgmElement) return
    bgmElement = new Audio(sfxPath('bgm.mp3'))
    bgmElement.loop = true
    bgmElement.volume = 0.08
    bgmElement.play().catch(() => {})
  }

  function stopBgm() {
    if (!bgmElement) return
    bgmElement.pause()
    bgmElement.currentTime = 0
    bgmElement = null
  }

  return {
    playClick,
    playCorrect,
    playIncorrect,
    playHurt,
    playNewChat,
    playGameOver,
    startBgm,
    stopBgm,
  }
}
