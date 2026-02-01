import angrySrc from '~/assets/audio/angry.mp3'
import bgmSrc from '~/assets/audio/bgm.mp3'
import correctSrc from '~/assets/audio/correct_action.mp3'
import discordNotificationSrc from '~/assets/audio/discord_notification.mp3'
import gameOverSrc from '~/assets/audio/game_over.mp3'
import clickSrc from '~/assets/audio/generic_click.mp3'
import hurt1Src from '~/assets/audio/hurt_1.mp3'
import hurt2Src from '~/assets/audio/hurt_2.mp3'
import hurt3Src from '~/assets/audio/hurt_3.mp3'
import incorrectSrc from '~/assets/audio/incorrect_action.mp3'
import newChatSrc from '~/assets/audio/new_chat.mp3'

const hurtSrcs = [hurt1Src, hurt2Src, hurt3Src]

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
  function playClick() {
    playSfx(clickSrc, 0.3)
  }

  function playCorrect() {
    playSfx(correctSrc, 0.5)
  }

  function playIncorrect() {
    playSfx(incorrectSrc, 0.5)
  }

  function playHurt() {
    const src = hurtSrcs[Math.floor(Math.random() * hurtSrcs.length)]!
    playSfx(src, 0.5)
  }

  function playNewChat() {
    playSfx(newChatSrc, 0.15)
  }

  function playAngry() {
    playSfx(angrySrc, 0.5)
  }

  function playDiscordNotification() {
    playSfx(discordNotificationSrc, 0.4)
  }

  function playGameOver() {
    playSfx(gameOverSrc, 0.6)
  }

  function startBgm() {
    if (bgmElement) return
    bgmElement = new Audio(bgmSrc)
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
    playAngry,
    playClick,
    playCorrect,
    playDiscordNotification,
    playIncorrect,
    playHurt,
    playNewChat,
    playGameOver,
    startBgm,
    stopBgm,
  }
}
