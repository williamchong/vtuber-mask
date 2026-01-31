# VTuber Mask - Technical Specification

## Technology Stack

### Recommended Stack (Modern)
- **Framework:** Nuxt 3
- **Language:** TypeScript
- **State Management:** Pinia (built-in with Nuxt)
- **Build Tool:** Vite (built-in with Nuxt)
- **Styling:** CSS3 with Scoped Styles
- **Linting:** ESLint + @typescript-eslint
- **Formatting:** Prettier
- **Testing:** Vitest (optional for game jam)
- **Deployment:** Static export to Itch.io or GitHub Pages

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
8. **Scoped Styles:** No CSS conflicts between components
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
├── .eslintrc.cjs               # ESLint rules
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
  const activeThreats = computed(() =>
    threats.value.filter(t => !t.isMasked)
  )

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
      falsePositives: 0
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

## UI Components

### VTuber Panel

**HTML Structure:**
```html
<div id="vtuber-panel" class="panel">
  <div class="vtuber-model">
    <img id="vtuber-base" src="assets/vtuber/base.png">
    <img id="vtuber-expression" src="assets/vtuber/idle.png">
    <div id="vtuber-threat-layer"></div>
  </div>
  <div class="vtuber-info">
    <h3>KawaiiStreamer</h3>
    <span class="live-indicator">LIVE</span>
  </div>
</div>
```

**Threat Display:**
- Swap expression sprite
- Overlay gesture image
- Add glitch effect for model errors

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
  { type: 'video', image: 'video-player.png' }
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
      "Hi everyone! 👋",
      "This is so fun!",
      "You're doing great!",
      "PogChamp",
      "Love your content!",
      // ... more templates
    ]

    return {
      username: this.getRandomUsername(),
      text: templates[Math.floor(Math.random() * templates.length)],
      color: this.getRandomColor()
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
        path: 'assets/vtuber/gestures/inappropriate.png'
      },
      description: 'Inappropriate hand gesture'
    },
    {
      id: 'wardrobe-malfunction',
      category: 'model-glitch',
      severity: 3,
      visual: {
        type: 'sprite',
        path: 'assets/vtuber/glitch/wardrobe.png'
      },
      description: 'Model glitch showing too much'
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
        position: 'bottom-right'
      },
      description: 'Home address visible on screen'
    },
    {
      id: 'credit-card',
      category: 'personal-info',
      severity: 3,
      visual: {
        type: 'overlay',
        path: 'assets/stream/threats/credit-card.png',
        position: 'center'
      },
      description: 'Credit card visible'
    },
    // ... more stream threats
  ],

  chat: [
    {
      id: 'hate-speech',
      category: 'harassment',
      severity: 2,
      messages: [
        "You're so [SLUR]",
        "Kill yourself",
        "I hate [GROUP]"
      ],
      username: 'Troll123'
    },
    {
      id: 'dox-attempt',
      category: 'dox',
      severity: 3,
      messages: [
        "I found your address: [ADDRESS]",
        "Your real name is [NAME] right?",
        "I know where you live"
      ],
      username: 'CreepyViewer'
    },
    // ... more chat threats
  ]
}

export const normalChatMessages = [
  "This stream is amazing!",
  "You're so talented!",
  "Hi from Brazil! 🇧🇷",
  "First time watching, love it!",
  // ... 50+ normal messages
]
```

## Animation System

### CSS Animations

```css
/* Threat appear animation */
@keyframes threat-appear {
  0% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}

/* Masking animation */
@keyframes mask-stamp {
  0% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

/* Combo glow */
@keyframes combo-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
  50% { box-shadow: 0 0 40px rgba(255, 215, 0, 1); }
}

/* Health warning pulse */
@keyframes health-warning {
  0%, 100% { border-color: red; }
  50% { border-color: darkred; }
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
  // TypeScript support
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // Build for static deployment
  ssr: false, // SPA mode for game

  // Modules
  modules: ['@pinia/nuxt'],

  // Dev tools
  devtools: { enabled: true },

  // CSS
  css: ['~/assets/css/main.css'],

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

### ESLint Configuration (.eslintrc.cjs)

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'vue/multi-word-component-names': 'off', // Allow single-word components
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
}
```

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
    "lint": "eslint --ext .ts,.js,.vue .",
    "lint:fix": "eslint --ext .ts,.js,.vue . --fix",
    "format": "prettier --write \"**/*.{ts,js,vue,json,md}\"",
    "typecheck": "nuxt typecheck"
  }
}
```

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
# Create Nuxt 3 project
npx nuxi@latest init vtuber-mask

# Navigate to project
cd vtuber-mask

# Install dependencies
npm install

# Install Pinia (if not already included)
npm install @pinia/nuxt

# Install dev dependencies
npm install -D @nuxtjs/eslint-config-typescript prettier eslint-plugin-prettier

# Create directory structure
mkdir -p components stores composables types data utils public/assets/{images,audio}
mkdir -p public/assets/images/{vtuber,stream,threats,masks}
mkdir -p public/assets/audio/{music,sfx}
```

### Configuration Files

Create the following files:

**nuxt.config.ts** - See "Nuxt Configuration" section above
**.eslintrc.cjs** - See "ESLint Configuration" section above
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
