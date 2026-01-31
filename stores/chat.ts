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
  spawnedAt: number
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
    return {
      id: nextId++,
      username: randomItem(usernames),
      color: randomItem(usernameColors),
      text: randomItem(normalMessages),
      isThreat: false,
      threatType: null,
      isMasked: false,
      falsePositive: false,
      spawnedAt: 0,
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
      spawnedAt: Date.now(),
    }
  }

  function addNormalMessage() {
    messages.value.push(createNormalMessage())
    trimMessages()
  }

  function addThreatMessage() {
    messages.value.push(createThreatMessage())
    trimMessages()
  }

  function trimMessages() {
    if (messages.value.length > 50) {
      messages.value = messages.value.slice(-50)
    }
  }

  function maskMessage(id: number): number {
    const msg = messages.value.find(m => m.id === id)
    if (msg && !msg.isMasked) {
      msg.isMasked = true
      return msg.spawnedAt
    }
    return 0
  }

  function expireThreats(): number {
    const now = Date.now()
    let expired = 0
    for (const msg of messages.value) {
      if (msg.isThreat && !msg.isMasked && msg.spawnedAt > 0) {
        if (now - msg.spawnedAt >= GAME_CONFIG.THREAT_DURATION) {
          msg.isMasked = true
          expired++
        }
      }
    }
    return expired
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
      addNormalMessage()
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
    expireThreats,
    flagFalsePositive,
    startChat,
    stopChat,
    clearChat,
  }
})
