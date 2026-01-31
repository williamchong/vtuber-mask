export const GAME_CONFIG = {
  TARGET_DURATION: 300, // 5 minutes in seconds
  MAX_ACTIVE_THREATS: 5,

  // Viewer-driven chat speed
  VIEWER_DIFFICULTY_FLOOR: 0.5, // minimum chat speed multiplier (when viewers very low)
  VIEWER_DIFFICULTY_SCALE: 900, // viewers above initial per 1x multiplier increase
  VIEWER_DIFFICULTY_CAP: 2000, // stop scaling chat speed past this viewer count

  // Time-driven threat ratio (threats get proportionally more frequent over time)
  THREAT_RATIO_INCREASE_RATE: 0.3, // per minute
  THREAT_RATIO_CAP_TIME: 180, // seconds — threat ratio stops increasing at 3 minutes

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
  INITIAL_VIEWERS: 100,
  VIEWER_MISS_PENALTY: 50, // viewers lost on miss

  // Stream smoothness state machine
  SMOOTHNESS_NORMAL_TO_SMOOTH_TIME: 4000, // ms clean play to go smooth
  VIEWER_RATE_SMOOTH: 5, // viewers/sec when smooth
  VIEWER_RATE_NORMAL: 1, // viewers/sec baseline
  VIEWER_RATE_LAGGY: -2, // viewers/sec when laggy

  // Info Leak (stream panel threat)
  INFO_LEAK_BASE_INTERVAL: 30000, // ms between spawn attempts
  INFO_LEAK_MIN_INTERVAL: 15000, // fastest spawn rate
  INFO_LEAK_GRACE_PERIOD: 1000, // ms — censor with no penalty
  INFO_LEAK_DANGER_DURATION: 4000, // ms — danger state before expiry
  INFO_LEAK_CENSOR_BLUR_TIME: 3000, // ms — blur duration after censoring
  INFO_LEAK_MISS_EMOTIONAL_PENALTY: 8,
  INFO_LEAK_MISS_VIEWER_PENALTY: 30,
  INFO_LEAK_DANGER_EMOTIONAL_PENALTY: 5, // one-time on entering danger

  // VTuber Misbehavior (emotion-triggered threat)
  MISBEHAVIOR_EMOTION_THRESHOLD: 40, // only triggers below this emotional value
  MISBEHAVIOR_CHECK_INTERVAL: 5000, // ms between spawn checks
  MISBEHAVIOR_GRACE_PERIOD: 1000, // ms — censor with no penalty
  MISBEHAVIOR_DANGER_EMOTIONAL_PENALTY: 5, // one-time on entering danger
  MISBEHAVIOR_DANGER_EMOTIONAL_DRAIN: 3, // per second while in danger
  MISBEHAVIOR_DANGER_VIEWER_DRAIN: 5, // per second while in danger
  MISBEHAVIOR_CENSOR_BLUR_TIME: 2000, // ms — blur duration after censoring

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
