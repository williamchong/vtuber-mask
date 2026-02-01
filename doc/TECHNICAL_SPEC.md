# VTuber Mask - Technical Specification

> **Note:** This document was written during pre-production. Speculative code examples have been removed as they did not match the actual implementation. See the source code and `CLAUDE.md` for current architecture.

## Technology Stack

- **Framework:** Nuxt 3 (Vue 3 + TypeScript)
- **State Management:** Pinia
- **Build Tool:** Vite (built-in with Nuxt)
- **Styling:** Tailwind CSS v4 + scoped styles for keyframes/animations
- **UI Components:** @nuxt/ui (menu buttons, game over card only)
- **VTuber Model:** oh-my-live2d (Live2D)
- **Audio:** Web Audio API
- **Linting:** ESLint (via @nuxt/eslint) + Prettier
- **Deployment:** Static export to GitHub Pages / Itch.io

### Why Nuxt 3?

- Auto-imports for components, composables, and utils
- Built-in TypeScript, Pinia, file-based routing
- SSG support for static deployment
- Reactive state management ideal for UI-heavy game
- This is fundamentally a UI app, not a sprite-based game — Phaser/PixiJS would be overkill

### Tailwind + Scoped Styles Strategy

- **Tailwind utilities** for layout, spacing, colors, typography, positioning
- **Scoped `<style>`** for `@keyframes`, scrollbar pseudo-elements, complex animations
- **@nuxt/ui** for non-game UI (menu buttons, decorative elements)
- **Arbitrary values** for exact game dimensions: `w-[220px]`, `h-[180px]`, `z-[100]`

## Actual Architecture

### Stores (Pinia)

| Store | File             | Responsibilities                                                                           |
| ----- | ---------------- | ------------------------------------------------------------------------------------------ |
| Game  | `stores/game.ts` | Game state, emotional value, viewers, smoothness state machine, threat/mask stats, grading |
| Chat  | `stores/chat.ts` | Chat messages (max 15), threat spawning, difficulty scaling, position-based expiry         |

### Composables

| Composable           | Responsibilities                                                                   |
| -------------------- | ---------------------------------------------------------------------------------- |
| `useGameLoop`        | RAF-based loop, danger zone detection per frame, smoothness/viewer/emotion updates |
| `useInfoLeak`        | Info leak threat state machine (idle → grace → danger → censored)                  |
| `useMisbehavior`     | VTuber misbehavior (emotion < 40 trigger, continuous drain in danger)              |
| `usePersonalMessage` | Personal message threat state machine                                              |
| `useAudio`           | Web Audio API wrapper, SFX + BGM playback with caching                             |
| `useViewportScale`   | Responsive 1280x720 scaling to fit window                                          |

### Components

| Component                | Role                                                               |
| ------------------------ | ------------------------------------------------------------------ |
| `StreamPanel`            | Left 50%, video background, integrates threat overlays + VTuber    |
| `ChatPanel`              | Right 50%, renders 15 ChatMessage components with TransitionGroup  |
| `ChatMessage`            | Individual message with hold-to-mask, position-based danger states |
| `VTuberOverlay`          | Live2D model container, smoothness dot, name bar                   |
| `InfoLeakOverlay`        | Gmail-style info leak popup on stream                              |
| `PersonalMessageOverlay` | Discord-style notification on stream                               |
| `VTuberMisbehavior`      | Angry face overlay on VTuber model                                 |

### Data

| File                   | Contents                                                                 |
| ---------------------- | ------------------------------------------------------------------------ |
| `data/config.ts`       | All game constants: penalties, timings, viewer rates, difficulty scaling |
| `data/chatMessages.ts` | Normal messages (45+), threat messages (35+), usernames (30+), colors    |

## Nuxt Configuration

```typescript
// nuxt.config.ts (simplified)
export default defineNuxtConfig({
  ssr: false, // SPA mode
  modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxt/ui'],
  typescript: { strict: true, typeCheck: true },
  devtools: { enabled: true },
  app: { baseURL: './' }, // For GitHub Pages / itch.io
  vite: { build: { target: 'es2015' } },
})
```

## Testing Checklist

### Functionality

- [ ] Chat threats spawn and scroll upward correctly
- [ ] Hold-to-mask works on all threat types (chat, info leak, personal message, misbehavior)
- [ ] Emotional value decreases on red zone, flashing, miss, and false positive
- [ ] Game over triggers at 0 emotional value
- [ ] Smoothness state machine transitions correctly
- [ ] Viewer count grows/shrinks based on smoothness
- [ ] Navigation works: menu → game → gameover → menu/replay

### Balance

- [ ] Difficulty curve feels appropriate
- [ ] Chat threats are identifiable among normal messages
- [ ] Stream threats have enough time to react
- [ ] VTuber misbehavior doesn't create unrecoverable death spiral

### Browser Compatibility

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Responsive viewport scaling

## Deployment

### Static Build

```bash
npm run generate
# Output: .output/public/
```

### Itch.io

```bash
npm run generate
cd .output/public && zip -r ../../vtuber-mask.zip .
# Upload vtuber-mask.zip to itch.io as HTML5 game
# Viewport: 1280x720, fullscreen enabled
```

### GitHub Pages

Deploy `.output/public/` via GitHub Actions or manual push. The `baseURL: './'` config ensures relative asset paths work.
