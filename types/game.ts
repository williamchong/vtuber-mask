export type GameState = 'menu' | 'playing' | 'paused' | 'gameover'

export interface GameConfig {
  targetDuration: number
  initialDifficulty: number
  difficultyIncreaseRate: number
}
