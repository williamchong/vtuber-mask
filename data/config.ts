export const GAME_CONFIG = {
  TARGET_DURATION: 300, // 5 minutes in seconds
  INITIAL_DIFFICULTY: 1.0,
  DIFFICULTY_INCREASE_RATE: 0.5,
  DIFFICULTY_CAP_TIME: 180, // seconds — difficulty stops increasing at 3 minutes
  MAX_ACTIVE_THREATS: 5,

  // Threat timing
  THREAT_DURATION: 5000, // ms before threat expires (safety net)
  BASE_SPAWN_INTERVAL: 5000, // ms between spawns
  MIN_SPAWN_INTERVAL: 2000, // fastest spawn rate

  // False positive penalties
  FALSE_POSITIVE_VIEWER_PENALTY: 20, // viewers lost on false positive

  // Early mask emotional recovery (masking in bottom half of chat)
  EARLY_MASK_EMOTIONAL_RECOVERY: 2,

  // Emotional Value (HP)
  EMOTIONAL_VALUE_MAX: 100,
  EMOTIONAL_VALUE_INITIAL: 100,
  EMOTIONAL_FLUCTUATION_INTERVAL: 3000, // ms
  EMOTIONAL_FLUCTUATION_RANGE: [-0.5, 0.5] as readonly [number, number],
  THREAT_RED_EMOTIONAL_PENALTY: 3, // one-time when threat enters red zone
  THREAT_FLASH_EMOTIONAL_PENALTY: 5, // one-time when threat enters flashing zone
  MISS_EMOTIONAL_PENALTY: 5, // on top of red+flash penalties already applied
  FALSE_POSITIVE_EMOTIONAL_PENALTY: 5,

  // Viewer count
  INITIAL_VIEWERS: 1000,
  VIEWER_MISS_PENALTY: 50, // viewers lost on miss

  // Stream smoothness state machine
  SMOOTHNESS_NORMAL_TO_SMOOTH_TIME: 4000, // ms clean play to go smooth
  VIEWER_RATE_SMOOTH: 5, // viewers/sec when smooth
  VIEWER_RATE_NORMAL: 1, // viewers/sec baseline
  VIEWER_RATE_LAGGY: -2, // viewers/sec when laggy

  // Chat
  CHAT_MAX_MESSAGES: 15,

  // Threat distribution
  THREAT_WEIGHTS: {
    chat: 0.6,
    stream: 0.3,
    vtuber: 0.1,
  },

  // Layout
  VIEWPORT_WIDTH: 1280,
  VIEWPORT_HEIGHT: 720,
} as const
