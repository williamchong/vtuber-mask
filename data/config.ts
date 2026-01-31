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

  // Scoring
  BASE_POINTS: 100,
  EARLY_MASK_BONUS: 100, // extra points for masking in bottom half (scales with position)
  FALSE_POSITIVE_PENALTY: 50,
  FALSE_POSITIVE_VIEWER_PENALTY: 20, // viewers lost on false positive
  FALSE_POSITIVE_RATE_PENALTY: 0.5, // viewer rate reduction on false positive

  // Early mask emotional recovery (masking in bottom half of chat)
  EARLY_MASK_EMOTIONAL_RECOVERY: 2,

  // Emotional Value (HP)
  EMOTIONAL_VALUE_MAX: 100,
  EMOTIONAL_VALUE_INITIAL: 100,
  EMOTIONAL_FLUCTUATION_INTERVAL: 3000, // ms
  EMOTIONAL_FLUCTUATION_RANGE: [-0.5, 0.5] as readonly [number, number],
  MISS_EMOTIONAL_PENALTY: 15,
  FALSE_POSITIVE_EMOTIONAL_PENALTY: 5,

  // Viewer count
  INITIAL_VIEWERS: 1000,
  VIEWER_BASE_RATE: 1, // viewers/sec
  VIEWER_RATE_BOOST: 0.5, // added per timely censor
  VIEWER_MAX_RATE: 10,
  VIEWER_MISS_PENALTY: 50, // viewers lost on miss

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
