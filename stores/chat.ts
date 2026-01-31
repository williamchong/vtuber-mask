import {
  normalMessages,
  threatMessages,
  usernames,
  usernameColors,
  type ThreatType,
} from '~/data/chatMessages'
import { GAME_CONFIG } from '~/data/config'

export interface ChatMessage {
  id: number
  username: string
  color: string
  text: string
  isThreat: boolean
  threatType: ThreatType | null
  isMasked: boolean
  falsePositive: boolean
  correctMask: boolean
  spawnedAt: number
  redTriggered: boolean
  flashTriggered: boolean
  sentiment: 1 | 0 | -1
}

let nextId = 0

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])
  let normalTimer: ReturnType<typeof setTimeout> | null = null
  let threatTimer: ReturnType<typeof setTimeout> | null = null

  function createNormalMessage(): ChatMessage {
    const msg = randomItem(normalMessages)
    return {
      id: nextId++,
      username: randomItem(usernames),
      color: randomItem(usernameColors),
      text: msg.text,
      isThreat: false,
      threatType: null,
      isMasked: false,
      falsePositive: false,
      correctMask: false,
      spawnedAt: 0,
      redTriggered: false,
      flashTriggered: false,
      sentiment: msg.sentiment,
    }
  }

  function createThreatMessage(): ChatMessage {
    const threat = randomItem(threatMessages)
    return {
      id: nextId++,
      username: randomItem(usernames),
      color: randomItem(usernameColors),
      text: threat.text,
      isThreat: true,
      threatType: threat.type,
      isMasked: false,
      falsePositive: false,
      correctMask: false,
      spawnedAt: Date.now(),
      redTriggered: false,
      flashTriggered: false,
      sentiment: 0,
    }
  }

  function addNormalMessage() {
    const msg = createNormalMessage()
    messages.value.push(msg)
    // Apply sentiment to emotional value
    const gameStore = useGameStore()
    gameStore.applySentiment(msg.sentiment)
    trimMessages()
  }

  function addThreatMessage() {
    messages.value.push(createThreatMessage())
    trimMessages()
  }

  /**
   * Trim messages to CHAT_MAX_MESSAGES. Any unmasked threats that get
   * pushed off count as missed (position-based expiry).
   * Returns the number of threats that expired.
   */
  function trimMessages(): number {
    const max = GAME_CONFIG.CHAT_MAX_MESSAGES
    if (messages.value.length <= max) return 0

    const removed = messages.value.slice(0, messages.value.length - max)
    messages.value = messages.value.slice(-max)

    let expired = 0
    for (const msg of removed) {
      if (msg.isThreat && !msg.isMasked) {
        expired++
      }
    }

    // Notify game store of expired threats
    if (expired > 0) {
      const gameStore = useGameStore()
      for (let i = 0; i < expired; i++) {
        gameStore.missedThreat()
      }
    }

    return expired
  }

  function maskMessage(id: number): number {
    const msg = messages.value.find(m => m.id === id)
    if (msg && !msg.isMasked) {
      msg.isMasked = true
      return msg.spawnedAt
    }
    return 0
  }

  function flagCorrectMask(id: number) {
    const msg = messages.value.find(m => m.id === id)
    if (msg) {
      msg.correctMask = true
      setTimeout(() => {
        msg.correctMask = false
      }, 400)
    }
  }

  function flagFalsePositive(id: number) {
    const msg = messages.value.find(m => m.id === id)
    if (msg) {
      msg.falsePositive = true
      setTimeout(() => {
        msg.falsePositive = false
      }, 400)
    }
  }

  function getDifficultyMultiplier(): number {
    const gameStore = useGameStore()
    if (!gameStore.startTime) return GAME_CONFIG.INITIAL_DIFFICULTY
    const elapsed = (Date.now() - gameStore.startTime) / 1000
    const capped = Math.min(elapsed, GAME_CONFIG.DIFFICULTY_CAP_TIME)
    return GAME_CONFIG.INITIAL_DIFFICULTY + (capped / 60) * GAME_CONFIG.DIFFICULTY_INCREASE_RATE
  }

  function scheduleNormal() {
    const multiplier = getDifficultyMultiplier()
    const interval = randomRange(1500, 2500) / multiplier
    normalTimer = setTimeout(() => {
      addNormalMessage()
      scheduleNormal()
    }, interval)
  }

  function scheduleThreat() {
    const multiplier = getDifficultyMultiplier()
    const base = GAME_CONFIG.BASE_SPAWN_INTERVAL
    const interval = Math.max(GAME_CONFIG.MIN_SPAWN_INTERVAL, base / multiplier)
    const jitter = randomRange(0.8, 1.2)
    threatTimer = setTimeout(() => {
      addThreatMessage()
      scheduleThreat()
    }, interval * jitter)
  }

  function startChat() {
    // Seed a few initial messages so chat isn't empty
    for (let i = 0; i < 8; i++) {
      // Bypass sentiment for seed messages
      const msg = createNormalMessage()
      messages.value.push(msg)
    }
    scheduleNormal()
    scheduleThreat()
  }

  function stopChat() {
    if (normalTimer) {
      clearTimeout(normalTimer)
      normalTimer = null
    }
    if (threatTimer) {
      clearTimeout(threatTimer)
      threatTimer = null
    }
  }

  function clearChat() {
    stopChat()
    messages.value = []
  }

  return {
    messages,
    addNormalMessage,
    addThreatMessage,
    maskMessage,
    flagCorrectMask,
    flagFalsePositive,
    startChat,
    stopChat,
    clearChat,
  }
})
