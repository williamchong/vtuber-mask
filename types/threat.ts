export type ThreatType = 'vtuber' | 'stream' | 'chat'

export type ThreatCategory =
  | 'gesture'
  | 'personal-info'
  | 'hate-speech'
  | 'dox'
  | 'model-glitch'
  | 'harassment'

export type ThreatSeverity = 1 | 2 | 3

export interface VisualData {
  image?: string
  text?: string
  animation?: string
  position?: 'center' | 'top-right' | 'bottom-left'
}

export interface Threat {
  id: string
  type: ThreatType
  category: ThreatCategory
  severity: ThreatSeverity
  spawnTime: number
  lifetime: number
  position: { x: number; y: number }
  visualData: VisualData
  isMasked: boolean
  element?: HTMLElement
}

export interface ThreatDefinition {
  id: string
  type: ThreatType
  category: ThreatCategory
  severity: ThreatSeverity
  visualData: VisualData
  description: string
}

export interface ChatMessage {
  id: string
  username: string
  text: string
  userColor: string
  timestamp: number
  isThreat: boolean
  isMasked: boolean
  badges?: { type: string; icon: string; tooltip: string }[]
}
