# VTuber Mask - Technical Specification

## Technology Stack

### Recommended Stack (Modern)

- **Framework:** Nuxt 3
- **Language:** TypeScript
- **State Management:** Pinia (built-in with Nuxt)
- **Build Tool:** Vite (built-in with Nuxt)
- **Styling:** Tailwind CSS v4 (utility-first) + scoped styles for keyframes/animations
- **UI Components:** @nuxt/ui (selectively - menu screens, modals, buttons only)
- **Linting:** ESLint (via @nuxt/eslint)
- **Formatting:** Prettier
- **Testing:** Vitest (optional for game jam)
- **Deployment:** Static export to Itch.io or GitHub Pages

### Why Tailwind CSS v4?

- **Utility-first:** Rapid prototyping - style directly in templates without switching files
- **Game jam speed:** No naming CSS classes, no context switching
- **Consistent spacing/colors:** Design tokens enforce visual consistency
- **Responsive:** Built-in responsive utilities if needed
- **Small bundle:** Purges unused styles automatically
- **Arbitrary values:** `w-[220px]` `h-[180px]` for exact game dimensions
- **Dark theme native:** Game's dark UI maps naturally to Tailwind's dark palette

### @nuxt/ui - Selective Use

@nuxt/ui is a dashboard/app-focused component library (125+ components). **Most game UI is custom**, but these components are useful:

- **UButton:** Menu screen buttons (Start, Restart, Settings)
- **UModal:** Pause overlay, settings panel
- **UCard:** Game over stats display
- **UBadge:** Score/combo indicators on menu screens

**Do NOT use @nuxt/ui for:**

- In-game HUD (needs custom positioning/animations)
- Chat panel (custom scrolling behavior)
- Threat overlays (custom click handling/animations)
- Stream panel (fully custom layout)

### Why Nuxt 3?

- **All the benefits of Vue 3** with additional features
- **Auto-imports:** No need to import components, composables, or utilities
- **TypeScript built-in:** Zero config TypeScript support
- **Pinia integrated:** State management ready out of the box
- **File-based routing:** Organized structure for menu/game/gameover screens
- **Optimized builds:** Better tree-shaking and code splitting
- **Developer experience:** Hot module replacement, error overlay, DevTools
- **SSG support:** Can export to static HTML for easy deployment
- **Smaller bundle:** Only includes what you use
- **Perfect for UI-heavy games** with reactive state updates

### Nuxt Benefits for Game Jam

1. **Faster Development:** Auto-imports save time - no import statements needed
2. **Type Safety:** TypeScript catches bugs before runtime - critical for tight deadlines
3. **Hot Reload:** See changes instantly without full page reload
4. **Organized Structure:** Clear conventions prevent decision paralysis
5. **Easy Deployment:** One command to generate static files
6. **Better DX:** Error overlay, Vue DevTools, TypeScript hints
7. **No Routing Code:** Pages automatically become routes
8. **Tailwind + Scoped Styles:** Utility classes for layout, scoped styles for animations
9. **Reactive by Default:** State changes automatically update UI
10. **Production Ready:** Optimized builds out of the box

### Why NOT Phaser?

- Phaser is overkill for a UI-driven click game
- This game is fundamentally a web app, not a sprite-based game
- Canvas rendering would make styling and DOM manipulation harder
- Nuxt/Vue's reactive system is better suited for this use case
- **This is a UI game disguised as a game** - Nuxt excels at UI

## Project Structure (Nuxt 3 + TypeScript)

```
vtuber-mask/
├── nuxt.config.ts              # Nuxt configuration
├── tsconfig.json               # TypeScript configuration (auto-generated)
├── package.json
├── eslint.config.mjs           # ESLint flat config (via @nuxt/eslint)
├── .prettierrc                 # Prettier formatting
├── app.vue                     # Root component (optional, can use pages/)
├── pages/
│   ├── index.vue               # Main menu (/)
│   ├── game.vue                # Game screen (/game)
│   └── gameover.vue            # Game over screen (/gameover)
├── components/
│   ├── VTuberPanel.vue         # VTuber model component
│   ├── StreamPanel.vue         # Stream screen component
│   ├── ChatPanel.vue           # Chat box component
│   ├── HUD.vue                 # Score, health, combo display
│   ├── ThreatOverlay.vue       # Threat visual element
│   ├── MaskEffect.vue          # Mask animation component
│   └── GameMenu.vue            # Main menu component
├── stores/
│   ├── game.ts                 # Game state (Pinia)
│   ├── threat.ts               # Threat management (Pinia)
│   ├── score.ts                # Score, combo, health (Pinia)
│   └── audio.ts                # Audio state (Pinia)
├── composables/
│   ├── useGameLoop.ts          # Game loop logic (auto-imported)
│   ├── useAudio.ts             # Audio management (auto-imported)
│   ├── useAnimation.ts         # Animation helpers (auto-imported)
│   ├── useInput.ts             # Click detection (auto-imported)
│   └── useEventBus.ts          # Event system (auto-imported)
├── types/
│   ├── index.ts                # Type exports
│   ├── threat.ts               # Threat types
│   ├── game.ts                 # Game state types
│   └── ui.ts                   # UI component types
├── data/
│   ├── threats.ts              # Threat definitions
│   ├── config.ts               # Game configuration constants
│   └── chatMessages.ts         # Normal chat messages
├── utils/
│   ├── debug.ts                # Debug utilities (auto-imported)
│   └── storage.ts              # LocalStorage helpers (auto-imported)
├── public/
│   └── assets/
│       ├── images/
│       │   ├── vtuber/         # VTuber sprites
│       │   ├── stream/         # Stream content
│       │   ├── threats/        # Threat visuals
│       │   └── masks/          # Mask overlays
│       ├── audio/
│       │   ├── music/          # Background music
│       │   └── sfx/            # Sound effects
│       └── fonts/              # Custom fonts
└── README.md
```

**Nuxt 3 Conventions:**

- **`pages/`:** File-based routing - each `.vue` file becomes a route
- **`components/`:** Auto-imported components (no import needed)
- **`composables/`:** Auto-imported composables (no import needed)
- **`stores/`:** Pinia stores (built-in support)
- **`utils/`:** Auto-imported utility functions
- **`types/`:** TypeScript type definitions
- **`public/`:** Static assets served at root URL
- **No `src/` folder:** Nuxt uses root-level directories
- **No manual routing:** Routes created automatically from pages/
- **Auto-imports:** Components, composables, and utils don't need imports

## Core Systems

### 1. Game Store (stores/game.ts)

**Responsibilities:**

- Manage game state (menu, playing, paused, gameover)
- Handle game loop timing
- Control difficulty progression
- Coordinate state transitions

**Implementation (Pinia + TypeScript):**

```typescript
// stores/game.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GameState } from '@/types/game'

export const useGameStore = defineStore('game', () => {
  // State
  const state = ref<GameState>('menu')
  const gameTime = ref(0)
  const targetDuration = ref(300) // 5 minutes in seconds
  const difficulty = ref(1.0)
  const isRunning = ref(false)
  const lastFrameTime = ref(0)

  // Computed
  const timeRemaining = computed(() => targetDuration.value - gameTime.value)
  const difficultyMultiplier = computed(() => 1 + (gameTime.value / 60) * 0.5)

  // Actions
  function start() {
    state.value = 'playing'
    isRunning.value = true
    gameTime.value = 0
    difficulty.value = 1.0
    lastFrameTime.value = performance.now()
  }

  function pause() {
    state.value = 'paused'
    isRunning.value = false
  }

  function resume() {
    state.value = 'playing'
    isRunning.value = true
    lastFrameTime.value = performance.now()
  }

  function gameOver() {
    state.value = 'gameover'
    isRunning.value = false
  }

  function update(deltaTime: number) {
    if (!isRunning.value) return

    gameTime.value += deltaTime
    difficulty.value = difficultyMultiplier.value

    // Check win condition
    if (gameTime.value >= targetDuration.value) {
      gameOver()
    }
  }

  function reset() {
    state.value = 'menu'
    gameTime.value = 0
    difficulty.value = 1.0
    isRunning.value = false
  }

  return {
    // State
    state,
    gameTime,
    targetDuration,
    difficulty,
    isRunning,
    // Computed
    timeRemaining,
    difficultyMultiplier,
    // Actions
    start,
    pause,
    resume,
    gameOver,
    update,
    reset,
  }
})
```

**Type Definitions:**

```typescript
// types/game.ts
export type GameState = 'menu' | 'playing' | 'paused' | 'gameover'

export interface GameConfig {
  targetDuration: number
  initialDifficulty: number
  difficultyIncreaseRate: number
}
```

### 2. Threat Store (stores/threat.ts)

**Responsibilities:**

- Spawn threats based on difficulty
- Track active threats
- Remove masked or expired threats
- Manage threat lifecycle

**Type Definitions:**

```typescript
// types/threat.ts
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
  spawnTime: number // Game time when spawned
  lifetime: number // Milliseconds until auto-fail
  position: { x: number; y: number }
  visualData: VisualData
  isMasked: boolean
  element?: HTMLElement // Reference to DOM element
}

export interface ThreatDefinition {
  id: string
  type: ThreatType
  category: ThreatCategory
  severity: ThreatSeverity
  visualData: VisualData
  description: string
}
```

**Implementation:**

```typescript
// stores/threat.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useGameStore } from './game'
import { useEventBus } from '@/utils/eventBus'
import { threatDefinitions } from '@/data/threats'
import type { Threat, ThreatType, ThreatDefinition } from '@/types/threat'

export const useThreatStore = defineStore('threat', () => {
  const gameStore = useGameStore()
  const eventBus = useEventBus()

  // State
  const threats = ref<Threat[]>([])
  const nextSpawnTime = ref(0)
  const spawnInterval = ref(5000) // ms between spawns

  // Computed
  const activeThreats = computed(() => threats.value.filter(t => !t.isMasked))

  const threatsByType = computed(() => ({
    vtuber: threats.value.filter(t => t.type === 'vtuber'),
    stream: threats.value.filter(t => t.type === 'stream'),
    chat: threats.value.filter(t => t.type === 'chat'),
  }))

  // Actions
  function spawnThreat() {
    const definition = selectThreatDefinition()
    const threat = createThreat(definition)
    threats.value.push(threat)
    eventBus.emit('threat:spawned', threat)
  }

  function selectThreatDefinition(): ThreatDefinition {
    const difficulty = gameStore.difficulty

    // Weight distribution based on difficulty
    // Early game: 60% chat, 30% stream, 10% vtuber
    // Late game: 30% chat, 40% stream, 30% vtuber
    const weights: Record<ThreatType, number> = {
      chat: Math.max(0.3, 0.6 - difficulty * 0.3),
      stream: 0.3 + difficulty * 0.1,
      vtuber: Math.min(0.3, difficulty * 0.3),
    }

    const type = weightedRandom(weights)
    const definitions = threatDefinitions[type]
    return definitions[Math.floor(Math.random() * definitions.length)]
  }

  function createThreat(definition: ThreatDefinition): Threat {
    const gameTime = gameStore.gameTime
    const difficulty = gameStore.difficulty

    // Decrease lifetime as difficulty increases
    const baseLifetime = 5000
    const lifetime = Math.max(2000, baseLifetime - difficulty * 1000)

    return {
      id: crypto.randomUUID(),
      type: definition.type,
      category: definition.category,
      severity: definition.severity,
      spawnTime: gameTime,
      lifetime,
      position: getRandomPosition(definition.type),
      visualData: definition.visualData,
      isMasked: false,
    }
  }

  function maskThreat(threatId: string, clickPosition: { x: number; y: number }) {
    const threat = threats.value.find(t => t.id === threatId)
    if (!threat || threat.isMasked) return

    threat.isMasked = true
    const responseTime = Date.now() - threat.spawnTime

    eventBus.emit('threat:masked', { threat, responseTime, clickPosition })
  }

  function removeThreat(threatId: string) {
    const index = threats.value.findIndex(t => t.id === threatId)
    if (index !== -1) {
      threats.value.splice(index, 1)
    }
  }

  function update(deltaTime: number) {
    const currentTime = performance.now()

    // Check for expired threats
    threats.value.forEach(threat => {
      if (!threat.isMasked) {
        const elapsed = currentTime - threat.spawnTime
        if (elapsed > threat.lifetime) {
          eventBus.emit('threat:missed', threat)
          removeThreat(threat.id)
        }
      }
    })

    // Spawn new threats
    if (currentTime >= nextSpawnTime.value) {
      spawnThreat()

      // Adjust spawn interval based on difficulty
      const difficulty = gameStore.difficulty
      spawnInterval.value = Math.max(2000, 5000 - difficulty * 1000)
      nextSpawnTime.value = currentTime + spawnInterval.value
    }
  }

  function reset() {
    threats.value = []
    nextSpawnTime.value = 0
    spawnInterval.value = 5000
  }

  return {
    threats,
    activeThreats,
    threatsByType,
    spawnThreat,
    maskThreat,
    removeThreat,
    update,
    reset,
  }
})

// Helper functions
function weightedRandom<T extends string>(weights: Record<T, number>): T {
  const total = Object.values(weights).reduce((sum: number, w) => sum + (w as number), 0)
  let random = Math.random() * total

  for (const [key, weight] of Object.entries(weights)) {
    random -= weight as number
    if (random <= 0) return key as T
  }

  return Object.keys(weights)[0] as T
}

function getRandomPosition(type: ThreatType): { x: number; y: number } {
  // Return random position within the panel
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
  }
}
```

### 3. Score Manager (ScoreManager.js)

**Responsibilities:**

- Track score, combo, and health
- Calculate bonuses
- Provide stats for end screen

**Key Methods:**

```javascript
class ScoreManager {
  constructor() {
    this.score = 0
    this.combo = 0
    this.maxCombo = 0
    this.health = 100
    this.stats = {
      totalThreats: 0,
      maskedThreats: 0,
      missedThreats: 0,
      falsePositives: 0,
    }
  }

  onThreatMasked(threat, responseTime) {
    this.combo++
    const basePoints = 100
    const speedBonus = responseTime < 1000 ? 50 : 0
    const comboMultiplier = this.getComboMultiplier()
    const points = (basePoints + speedBonus) * comboMultiplier
    this.score += points
  }

  onThreatMissed(threat) {
    this.combo = 0
    this.health -= threat.severity * 10
    if (this.health <= 0) {
      GameManager.gameOver()
    }
  }

  onFalsePositive() {
    this.combo = 0
    this.health -= 5
  }

  getComboMultiplier() {
    if (this.combo >= 10) return 3.0
    if (this.combo >= 5) return 2.0
    if (this.combo >= 3) return 1.5
    return 1.0
  }
}
```

### 4. Input Manager (InputManager.js)

**Responsibilities:**

- Handle click events
- Determine what was clicked
- Apply mask effect
- Validate if click was correct

**Click Detection:**

```javascript
class InputManager {
  handleClick(event) {
    const clickPos = { x: event.clientX, y: event.clientY }

    // Check if clicked on a threat
    const threat = this.findThreatAtPosition(clickPos)

    if (threat) {
      this.maskThreat(threat, clickPos)
      const responseTime = Date.now() - threat.spawnTime
      ScoreManager.onThreatMasked(threat, responseTime)
      ThreatManager.removeThreat(threat.id)
    } else {
      // Check if clicked on normal element (false positive)
      const normalElement = this.findNormalElementAtPosition(clickPos)
      if (normalElement) {
        ScoreManager.onFalsePositive()
      }
    }
  }

  maskThreat(threat, position) {
    // Create mask overlay element
    // Play masking animation
    // Play sound effect
  }
}
```

## UI Components (Nuxt/Vue)

### Overall Layout Structure

```vue
<!-- pages/game.vue -->
<template>
  <div class="flex flex-col w-[1280px] h-[720px]">
    <!-- Platform Header -->
    <PlatformHeader />

    <div class="flex flex-1">
      <!-- Left: Stream Panel (50%) with VTuber overlay -->
      <div class="relative w-1/2">
        <StreamPanel class="w-full h-full" />
        <VTuberPanel class="absolute bottom-4 right-4 w-[220px] h-[180px] z-50" />
      </div>

      <!-- Right: Full-height Chat (50%) -->
      <ChatPanel class="w-1/2 h-full" />
    </div>

    <!-- Stream Info Bar -->
    <StreamInfoBar />
  </div>
</template>
```

**Tailwind Styling Notes:**

- Layout uses utility classes directly in templates — no separate `<style>` block needed
- `w-[220px]` and `h-[180px]` use Tailwind's arbitrary value syntax for exact game dimensions
- `z-50` maps to `z-index: 50` (Tailwind default scale)
- For custom z-index values like `z-100` (HUD), extend in `tailwind.config` or use `z-[100]`

**Layout Rationale:**

- 50/50 split optimizes for gameplay (chat has 60% of threats)
- VTuber overlaps stream (doesn't steal space from chat)
- Chat is full height (maximum threat visibility)
- Stream threats are larger/fewer (needs less space)

### PlatformHeader Component

```vue
<!-- components/PlatformHeader.vue -->
<template>
  <header
    class="flex items-center justify-between h-[60px] bg-[#0f0f1e] px-6 border-b border-white/10"
  >
    <div class="flex items-center gap-3">
      <img src="/logo.svg" class="h-8" />
      <h1 class="text-lg font-bold">VTuber Mask</h1>
    </div>
    <div>
      <span class="text-sm font-medium">🎭 Protect the Stream!</span>
    </div>
    <div class="flex items-center gap-4">
      <span class="text-sm text-white/70">👁 {{ viewerCount.toLocaleString() }}</span>
      <button class="text-white/60 hover:text-white transition-colors" @click="openSettings">
        ⚙️
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const viewerCount = ref(1234)
</script>
```

### VTuber Panel Component (Overlay)

```vue
<!-- components/VTuberPanel.vue -->
<template>
  <div
    class="relative p-3 rounded-xl border-2 border-white/10 backdrop-blur-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] bg-gradient-to-br from-[rgba(26,26,46,0.95)] to-[rgba(22,33,62,0.95)]"
  >
    <div class="relative w-full h-[120px] rounded-lg overflow-hidden">
      <img :src="currentExpression" class="w-full h-full object-cover" />

      <!-- Threat overlays -->
      <ThreatOverlay
        v-for="threat in vtuberThreats"
        :key="threat.id"
        :threat="threat"
        @click="maskThreat(threat)"
      />
    </div>

    <div class="flex justify-between items-center mt-2 text-xs">
      <span class="font-semibold text-white">{{ vtuberName }} 認証済</span>
      <span class="flex items-center gap-1 text-[11px] text-white/80">
        <span class="animate-pulse">🔴</span> LIVE {{ viewerCount }} 👁
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const threatStore = useThreatStore()
const vtuberThreats = computed(() =>
  threatStore.threats.filter(t => t.type === 'vtuber' && !t.isMasked)
)

const vtuberName = ref('KawaiiChan')
const viewerCount = ref(1234)
const currentExpression = ref('/assets/images/vtuber/idle.png')
</script>
```

**Notes:**

- Gradient backgrounds use Tailwind arbitrary values: `bg-gradient-to-br from-[...] to-[...]`
- `backdrop-blur-[10px]` for the frosted glass effect
- `animate-pulse` is a built-in Tailwind animation (replaces custom `@keyframes pulse`)
- No `<style>` block needed — all styling is in utility classes
- No imports needed — Nuxt auto-imports `computed`, `ref`, and `useThreatStore`

**Overlay Positioning:**

- Position: Absolute, bottom-right of stream panel
- Z-index: 50 (above stream content, below game HUD)
- Semi-transparent background with backdrop blur
- Rounded corners and subtle border for modern look
- Compact 220×180px footprint

### Chat Panel Component (Full Height - Primary Threat Zone)

```vue
<!-- components/ChatPanel.vue -->
<template>
  <div class="flex flex-col w-full h-full bg-[#1f1f23] overflow-hidden border-l border-white/10">
    <div
      class="flex justify-between items-center px-4 py-3.5 bg-[#18181b] border-b border-white/10 font-semibold text-sm"
    >
      <span>💬 STREAM CHAT</span>
      <button class="text-white/60 hover:text-white transition-colors text-base p-1">⚙️</button>
    </div>

    <div ref="chatContainer" class="flex-1 overflow-y-auto overflow-x-hidden py-1 scrollbar-thin">
      <div
        v-for="message in visibleMessages"
        :key="message.id"
        :class="[
          'px-4 py-1.5 text-sm leading-relaxed border-l-2 border-transparent cursor-pointer transition-colors duration-100 break-words',
          'hover:bg-white/[0.04] hover:border-l-[#e94560]',
          message.isThreat && 'chat-threat bg-[#ff3355]/15 !border-l-[#ff3355]',
        ]"
        @click="handleMessageClick(message)"
      >
        <!-- Badges -->
        <span v-if="message.badges" class="inline-flex gap-0.5 mr-1.5 items-center">
          <img
            v-for="badge in message.badges"
            :key="badge.type"
            :src="badge.icon"
            :title="badge.tooltip"
            class="w-[18px] h-[18px] align-middle"
          />
        </span>

        <!-- Username -->
        <span class="font-bold mr-1.5" :style="{ color: message.userColor }">
          {{ message.username }}:
        </span>

        <!-- Message -->
        <span class="text-white/95">{{ message.text }}</span>

        <!-- Timestamp -->
        <span class="text-[11px] text-white/35 ml-2">{{ formatTime(message.timestamp) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/types/threat'

const threatStore = useThreatStore()
const scoreStore = useScoreStore()
const chatContainer = ref<HTMLElement>()

const visibleMessages = computed(() => threatStore.chatMessages.slice(-20))

function handleMessageClick(message: ChatMessage) {
  if (message.isThreat && !message.isMasked) {
    threatStore.maskThreat(message.id, { x: 0, y: 0 })
  } else if (!message.isThreat) {
    scoreStore.onFalsePositive()
  }
}

// Auto-scroll to bottom when new messages arrive
watch(visibleMessages, async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
})
</script>

<style scoped>
/* Threat pulse animation - can't be done with Tailwind alone */
.chat-threat {
  animation: threat-pulse 1s ease-in-out;
}

@keyframes threat-pulse {
  0%,
  100% {
    background: rgba(255, 51, 85, 0.15);
  }
  50% {
    background: rgba(255, 51, 85, 0.25);
  }
}

/* Custom scrollbar - keep in scoped styles */
.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
```

**Tailwind + Scoped Style Strategy:**

- **Tailwind utilities** for layout, spacing, colors, typography, and hover states
- **Scoped `<style>`** only for keyframe animations and pseudo-element selectors (scrollbars)
- This hybrid approach gives the speed of utility classes with the power of CSS animations

**Full-Height Chat Benefits:**

- Displays **18-20 messages** at once (vs 8-10 in smaller chat)
- 50% screen width = **larger font sizes** (14px) for better readability
- **Primary threat zone** gets primary screen real estate
- Easier to spot threats among normal messages
- Better click accuracy with larger message areas
- Full height scrolling for continuous threat monitoring

### Stream Panel Component

```vue
<!-- components/StreamPanel.vue -->
<template>
  <div class="relative w-full h-full bg-[#0e0e14]">
    <!-- Game HUD Overlay -->
    <div
      class="absolute top-4 left-4 z-[100] min-w-[180px] p-3 rounded-xl bg-black/70 backdrop-blur-[10px]"
    >
      <div class="text-base font-semibold mb-2">💯 {{ score.toLocaleString() }}</div>
      <div class="text-base font-semibold mb-2" :class="{ 'hud-combo-glow': combo > 0 }">
        🔥 {{ combo }}x
      </div>
      <div class="text-base font-semibold">
        <div class="w-full h-2 bg-white/20 rounded overflow-hidden mb-1">
          <div
            class="h-full bg-gradient-to-r from-[#00ff88] via-[#ffaa00] to-[#ff3355] transition-[width] duration-300"
            :style="{ width: health + '%' }"
          />
        </div>
        <span>❤️ {{ health }}%</span>
      </div>
    </div>

    <!-- Stream content -->
    <div class="w-full h-full">
      <img :src="currentStreamContent" class="w-full h-full object-cover" />

      <!-- Threat overlays -->
      <ThreatOverlay
        v-for="threat in streamThreats"
        :key="threat.id"
        :threat="threat"
        @click="maskThreat(threat)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const scoreStore = useScoreStore()
const threatStore = useThreatStore()

const score = computed(() => scoreStore.score)
const combo = computed(() => scoreStore.combo)
const health = computed(() => scoreStore.health)

const streamThreats = computed(() =>
  threatStore.threats.filter(t => t.type === 'stream' && !t.isMasked)
)
</script>

<style scoped>
.hud-combo-glow {
  animation: combo-glow 1s ease-in-out infinite;
}

@keyframes combo-glow {
  0%,
  100% {
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 215, 0, 1);
  }
}
</style>
```

### StreamInfoBar Component

```vue
<!-- components/StreamInfoBar.vue -->
<template>
  <div
    class="flex justify-between items-center h-[50px] px-6 bg-gradient-to-t from-black/90 to-black/70 backdrop-blur-[10px] border-t border-white/10"
  >
    <div class="flex gap-4 items-center">
      <span class="text-red-500 font-bold animate-pulse">🔴 LIVE</span>
      <span class="text-sm text-white/70">Reaction Game</span>
      <span class="text-sm text-white/70">{{ viewerCount.toLocaleString() }} viewers</span>
    </div>

    <div class="flex gap-2">
      <UButton color="warning" variant="solid" size="sm">⭐ Subscribe</UButton>
      <UButton color="neutral" variant="ghost" size="sm">Share</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const viewerCount = ref(1234)
</script>
```

**@nuxt/ui Usage:** The `UButton` component is used here for decorative stream UI buttons. These are non-interactive game elements (cosmetic), so the pre-built styling saves time without impacting game mechanics.

**Key Points:**

- All components use Nuxt 3 auto-imports
- TypeScript for type safety
- Reactive state with Pinia stores
- **Tailwind utilities** for layout, spacing, colors, typography
- **Scoped `<style>`** only when needed for keyframes and pseudo-elements
- **@nuxt/ui** for non-game UI elements (menu buttons, decorative stream UI)
- Component-based architecture

### Stream Panel

**HTML Structure:**

```html
<div id="stream-panel" class="panel">
  <div class="stream-screen">
    <div class="stream-content" id="stream-content">
      <!-- Dynamic content here -->
    </div>
    <div class="stream-overlay" id="stream-threats">
      <!-- Threats spawn here -->
    </div>
  </div>
  <div class="stream-ui">
    <span class="viewer-count">👁️ 1,234 viewers</span>
  </div>
</div>
```

**Content Rotation:**

```javascript
const streamContents = [
  { type: 'game', image: 'gameplay1.gif' },
  { type: 'desktop', image: 'desktop.png' },
  { type: 'browser', image: 'browser.png' },
  { type: 'video', image: 'video-player.png' },
]

// Rotate content every 30 seconds
setInterval(() => {
  displayRandomStreamContent()
}, 30000)
```

### Chat Panel

**HTML Structure:**

```html
<div id="chat-panel" class="panel">
  <div class="chat-header">
    <span>STREAM CHAT</span>
  </div>
  <div class="chat-messages" id="chat-container">
    <!-- Messages appear here -->
  </div>
</div>
```

**Message Generation:**

```javascript
class ChatManager {
  generateMessage(isThreat = false) {
    if (isThreat) {
      return this.getThreatMessage()
    }

    // Normal messages with variation
    const templates = [
      'Hi everyone! 👋',
      'This is so fun!',
      "You're doing great!",
      'PogChamp',
      'Love your content!',
      // ... more templates
    ]

    return {
      username: this.getRandomUsername(),
      text: templates[Math.floor(Math.random() * templates.length)],
      color: this.getRandomColor(),
    }
  }

  addMessage(message) {
    const messageEl = document.createElement('div')
    messageEl.className = message.isThreat ? 'chat-message threat' : 'chat-message'
    messageEl.innerHTML = `
      <span class="username" style="color: ${message.color}">${message.username}:</span>
      <span class="text">${message.text}</span>
    `
    chatContainer.appendChild(messageEl)

    // Auto-scroll
    chatContainer.scrollTop = chatContainer.scrollHeight

    // Remove old messages (keep last 20)
    if (chatContainer.children.length > 20) {
      chatContainer.removeChild(chatContainer.firstChild)
    }
  }
}
```

## Threat Data Structure

### threats.js

```javascript
export const threatDefinitions = {
  vtuber: [
    {
      id: 'inappropriate-gesture',
      category: 'gesture',
      severity: 2,
      visual: {
        type: 'sprite',
        path: 'assets/vtuber/gestures/inappropriate.png',
      },
      description: 'Inappropriate hand gesture',
    },
    {
      id: 'wardrobe-malfunction',
      category: 'model-glitch',
      severity: 3,
      visual: {
        type: 'sprite',
        path: 'assets/vtuber/glitch/wardrobe.png',
      },
      description: 'Model glitch showing too much',
    },
    // ... more vtuber threats
  ],

  stream: [
    {
      id: 'personal-info-address',
      category: 'dox',
      severity: 3,
      visual: {
        type: 'overlay',
        path: 'assets/stream/threats/address.png',
        position: 'bottom-right',
      },
      description: 'Home address visible on screen',
    },
    {
      id: 'credit-card',
      category: 'personal-info',
      severity: 3,
      visual: {
        type: 'overlay',
        path: 'assets/stream/threats/credit-card.png',
        position: 'center',
      },
      description: 'Credit card visible',
    },
    // ... more stream threats
  ],

  chat: [
    {
      id: 'hate-speech',
      category: 'harassment',
      severity: 2,
      messages: ["You're so [SLUR]", 'Kill yourself', 'I hate [GROUP]'],
      username: 'Troll123',
    },
    {
      id: 'dox-attempt',
      category: 'dox',
      severity: 3,
      messages: [
        'I found your address: [ADDRESS]',
        'Your real name is [NAME] right?',
        'I know where you live',
      ],
      username: 'CreepyViewer',
    },
    // ... more chat threats
  ],
}

export const normalChatMessages = [
  'This stream is amazing!',
  "You're so talented!",
  'Hi from Brazil! 🇧🇷',
  'First time watching, love it!',
  // ... 50+ normal messages
]
```

## Animation System

### CSS Animations

```css
/* Threat appear animation */
@keyframes threat-appear {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Masking animation */
@keyframes mask-stamp {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(5deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

/* Combo glow */
@keyframes combo-glow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 215, 0, 1);
  }
}

/* Health warning pulse */
@keyframes health-warning {
  0%,
  100% {
    border-color: red;
  }
  50% {
    border-color: darkred;
  }
}
```

### JavaScript Animation Helpers

```javascript
// Shake effect on damage
function shakeElement(element) {
  element.classList.add('shake')
  setTimeout(() => element.classList.remove('shake'), 500)
}

// Particle effect on successful mask
function createMaskParticles(x, y) {
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.left = x + 'px'
    particle.style.top = y + 'px'
    document.body.appendChild(particle)

    setTimeout(() => particle.remove(), 1000)
  }
}
```

## Audio System

```javascript
class AudioManager {
  constructor() {
    this.sounds = {}
    this.music = null
    this.musicVolume = 0.3
    this.sfxVolume = 0.5
  }

  loadSounds() {
    this.sounds.threatAppear = new Audio('assets/audio/sfx/threat.mp3')
    this.sounds.maskSuccess = new Audio('assets/audio/sfx/mask.mp3')
    this.sounds.combo = new Audio('assets/audio/sfx/combo.mp3')
    this.sounds.damage = new Audio('assets/audio/sfx/damage.mp3')
    this.sounds.gameOver = new Audio('assets/audio/sfx/gameover.mp3')

    this.music = new Audio('assets/audio/music/main-theme.mp3')
    this.music.loop = true
    this.music.volume = this.musicVolume
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].currentTime = 0
      this.sounds[soundName].volume = this.sfxVolume
      this.sounds[soundName].play()
    }
  }

  playMusic() {
    this.music.play()
  }

  setMusicIntensity(level) {
    // Adjust music based on threat level or combo
    // Could layer additional tracks
  }
}
```

## Performance Considerations

### Optimization Strategies

1. **Object Pooling:** Reuse DOM elements for chat messages and threats
2. **Debouncing:** Limit update frequency for non-critical UI elements
3. **Asset Preloading:** Load all images and sounds at game start
4. **CSS Over JS:** Use CSS animations where possible
5. **Efficient Rendering:** Only update changed UI elements

### Asset Size Management

- Keep images under 200KB each
- Use sprite sheets for VTuber expressions
- Compress audio files (MP3, OGG for compatibility)
- Target total asset size under 10MB

## Nuxt Configuration

### nuxt.config.ts

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // TypeScript support
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // Build for static deployment
  ssr: false, // SPA mode for game

  // Modules
  modules: [
    '@pinia/nuxt', // State management
    '@nuxt/eslint', // ESLint flat config integration
    '@nuxt/ui', // UI components (selective use for menus/buttons)
  ],

  // Dev tools
  devtools: { enabled: true },

  // App config
  app: {
    head: {
      title: 'VTuber Mask - Protect the Stream',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A reaction game for Global Game Jam 2026' },
      ],
    },
    baseURL: './', // For relative paths on itch.io
  },

  // Vite config
  vite: {
    build: {
      target: 'es2015',
      assetsDir: 'assets',
    },
  },

  // Runtime config
  runtimeConfig: {
    public: {
      debugMode: process.env.NODE_ENV === 'development',
    },
  },
})
```

**Notes:**

- `@nuxt/ui` includes Tailwind CSS v4 automatically — no separate `tailwindcss` config needed
- `@nuxt/eslint` provides flat config ESLint integration (replaces `.eslintrc.cjs`)
- No `css` entry needed — Tailwind is injected by `@nuxt/ui`

### ESLint Configuration (eslint.config.mjs)

Uses `@nuxt/eslint` flat config — auto-generated from Nuxt module:

```javascript
// eslint.config.mjs
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Custom overrides go here
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  }
)
```

**Note:** The `@nuxt/eslint` module auto-generates the base config during `nuxt prepare`. No need for separate `@nuxtjs/eslint-config-typescript` or plugin installs.

### Prettier Configuration (.prettierrc)

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid",
  "vueIndentScriptAndStyle": false
}
```

### package.json Scripts

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"**/*.{ts,js,vue,json,md}\"",
    "typecheck": "nuxt typecheck",
    "postinstall": "nuxt prepare"
  }
}
```

**Note:** ESLint flat config doesn't need `--ext` flags — file patterns are configured in the config file.

## Testing Checklist

### Functionality

- [ ] Threats spawn correctly in all three panels
- [ ] Clicking threats masks them successfully
- [ ] Score increases with successful masks
- [ ] Combo system works and resets on failure
- [ ] Health decreases on missed threats
- [ ] Game over triggers at 0 health
- [ ] False positives penalize correctly
- [ ] Navigation between pages works (menu → game → gameover)

### Balance

- [ ] Difficulty curve feels appropriate
- [ ] Threats are visible and identifiable
- [ ] Reaction time windows are fair
- [ ] Score scaling rewards skill

### Polish

- [ ] All animations play smoothly
- [ ] Sound effects trigger correctly
- [ ] UI is readable and clear
- [ ] Visual feedback for all actions
- [ ] Page transitions are smooth

### Browser Compatibility

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (responsive)

### Type Safety

- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] All stores properly typed
- [ ] All components properly typed
- [ ] All composables properly typed

## Deployment

### Build Process (Nuxt Static Generation)

```bash
# Generate static files for deployment
npm run generate

# Output goes to .output/public/
# Upload .output/public/ to itch.io or GitHub Pages
```

### Itch.io Deployment

```bash
# 1. Generate static build
npm run generate

# 2. Zip the output
cd .output/public
zip -r ../../vtuber-mask.zip .

# 3. Upload to itch.io
# - Go to itch.io dashboard
# - Upload vtuber-mask.zip
# - Mark as HTML5 game
# - Set index.html as the main file
# - Set viewport size (1280x720 recommended)
# - Enable fullscreen option
```

**Itch.io Settings:**

- Kind of project: HTML
- Viewport dimensions: 1280 x 720
- Fullscreen button: ✅ Enabled
- Mobile friendly: ✅ Yes (with responsive design)
- Embed options: Click to launch in fullscreen

### GitHub Pages Deployment

```bash
# Option 1: Manual deployment
npm run generate
git subtree push --prefix .output/public origin gh-pages

# Option 2: GitHub Actions (create .github/workflows/deploy.yml)
# See below for GitHub Actions configuration
```

**GitHub Actions (.github/workflows/deploy.yml):**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run generate
      - uses: actions/upload-pages-artifact@v1
        with:
          path: .output/public

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v1
        id: deployment
```

### Vercel Deployment (Alternative - Easy)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Nuxt has built-in Vercel support - zero configuration needed.

## Post-Jam Extensions

### Potential Additions

- Multiple VTuber characters with different personalities
- Story mode with progression
- Daily challenges
- Leaderboard integration
- More threat types and variety
- Customizable difficulty
- Accessibility options
- Mobile touch controls
- Internationalization

## Quick Start Development

### Initial Setup

```bash
# Create Nuxt 3 project (includes @nuxt/ui and Tailwind CSS v4)
npx nuxi@latest init vtuber-mask
cd vtuber-mask

# Install core dependencies
npm install
npm install @pinia/nuxt

# Install formatting
npm install -D prettier

# Create directory structure
mkdir -p components stores composables types data utils public/assets/{images,audio}
mkdir -p public/assets/images/{vtuber,stream,threats,masks}
mkdir -p public/assets/audio/{music,sfx}
```

**Note:** `@nuxt/ui` bundles Tailwind CSS v4, `@nuxt/eslint` bundles ESLint — minimal extra dependencies needed.

### Configuration Files

Create the following files:

**nuxt.config.ts** - See "Nuxt Configuration" section above
**eslint.config.mjs** - See "ESLint Configuration" section above
**.prettierrc** - See "Prettier Configuration" section above

### Development Workflow

```bash
# Start development server
npm run dev

# Open http://localhost:3000

# In another terminal - run type checking
npm run typecheck

# Format code
npm run format

# Lint code
npm run lint:fix
```

### Development Steps (Game Jam Timeline)

**Hour 0-2: Setup**

```bash
# 1. Set up Nuxt project (above)
# 2. Create basic pages (index, game, gameover)
# 3. Set up ESLint and Prettier
# 4. Create type definitions in types/
```

**Hour 2-4: Core Components**

```bash
# 1. Create components (VTuberPanel, StreamPanel, ChatPanel, HUD)
# 2. Set up basic styling in each component
# 3. Create game store (stores/game.ts)
# 4. Create score store (stores/score.ts)
```

**Hour 4-8: Game Logic**

```bash
# 1. Create threat store (stores/threat.ts)
# 2. Implement threat data (data/threats.ts)
# 3. Create game loop composable (composables/useGameLoop.ts)
# 4. Implement click detection (composables/useInput.ts)
```

**Hour 8-12: Features**

```bash
# 1. Add masking mechanic
# 2. Implement combo system
# 3. Add audio management (stores/audio.ts, composables/useAudio.ts)
# 4. Create navigation between pages
```

### Useful Nuxt Commands

```bash
npm run dev          # Start dev server with HMR
npm run build        # Build for production (SSR)
npm run generate     # Generate static site (for deployment)
npm run preview      # Preview production build locally
npm run typecheck    # Run TypeScript type checking
npm run lint         # Check code quality
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Prettier
```

### Auto-Import Examples

Because of Nuxt's auto-import feature, you don't need to import:

```vue
<!-- components/VTuberPanel.vue -->
<script setup lang="ts">
// No imports needed! Nuxt auto-imports these:
const gameStore = useGameStore() // Auto-imported from stores/
const { health } = useScoreStore() // Auto-imported
const { playSound } = useAudio() // Auto-imported from composables/

// Components are also auto-imported
// <ThreatOverlay /> works without importing
// <UButton /> from @nuxt/ui works without importing
</script>
```

### Debugging

```bash
# Vue DevTools
# Install Vue DevTools browser extension
# It will automatically connect to your Nuxt app

# TypeScript errors
npm run typecheck

# View in browser
# Nuxt provides excellent error overlay in development
```
