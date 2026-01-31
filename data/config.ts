export const GAME_CONFIG = {
  TARGET_DURATION: 300, // 5 minutes in seconds
  INITIAL_DIFFICULTY: 1.0,
  DIFFICULTY_INCREASE_RATE: 0.5,
  MAX_ACTIVE_THREATS: 5,

  // Threat timing
  THREAT_DURATION: 5000, // ms before threat expires
  BASE_SPAWN_INTERVAL: 5000, // ms between spawns
  MIN_SPAWN_INTERVAL: 2000, // fastest spawn rate

  // Scoring
  BASE_POINTS: 100,
  SPEED_BONUS: 50,
  SPEED_BONUS_THRESHOLD: 1000, // ms
  FALSE_POSITIVE_PENALTY: 50,

  // Combo multipliers
  COMBO_THRESHOLDS: [
    { combo: 3, multiplier: 1.5 },
    { combo: 5, multiplier: 2.0 },
    { combo: 10, multiplier: 3.0 },
  ],

  // Health
  MAX_HEALTH: 100,
  MISS_DAMAGE: [10, 20, 30], // per severity 1/2/3
  FALSE_POSITIVE_DAMAGE: 5,

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
