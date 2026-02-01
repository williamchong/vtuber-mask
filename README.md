# VTuber Mask

A web-based reaction game for Global Game Jam 2026

## Concept

You're a VTuber who just went live. Dangerous content keeps appearing — in your chat, on the stream screen, and even on your VTuber model. Hold to censor it before your viewers notice!

The game explores the dual meaning of "mask":

- **Literal:** Masking/censoring inappropriate content
- **Metaphorical:** The VTuber persona itself as a mask hiding the real person

## Core Gameplay

- **Monitor the stream:** Stream content (left) + Chat (right) in a 50/50 split
- **Identify threats:** Hate speech, doxxing, spam, scam links in chat; personal info leaks, private messages, and VTuber misbehavior on stream
- **Hold to mask:** Press and hold on threats to censor them (100ms hold)
- **Watch your position:** Chat threats turn red as they scroll toward the top — mask them early for emotional recovery
- **Avoid false positives:** Masking normal chat costs emotional value and viewers
- **Survive:** Your emotional value (0-100) drains when threats go unmasked. Game over at 0.

## Play

```bash
npm install
npm run dev
# Open http://localhost:3000
```

Or play the deployed version at [williamchong.github.io/vtuber-mask](https://williamchong.github.io/vtuber-mask)

## How It Works

### Emotional Value (HP)

A continuous bar from 0-100. Penalties accumulate from:

- Threats entering the red zone (top half of chat): -3
- Threats entering flashing zone (top 15%): -5
- Missed threats (pushed off top): -5 emotional, -50 viewers
- False positives (masking normal messages): -5 emotional, -20 viewers
- Stream threats left in danger state: varies by type

Recovery comes from masking threats early (bottom half of chat) and positive chat sentiment.

### Stream Smoothness

A state machine that drives viewer growth:

- **Smooth** (green dot): +5 viewers/sec — achieved after 4s with no danger
- **Normal** (yellow dot): +1 viewer/sec — starting state
- **Laggy** (red dot): -2 viewers/sec — triggered by flashing threats, misses, or false positives

### Difficulty Scaling

Two independent axes that make the game harder over time:

- **Chat speed** scales with viewer count (more viewers = faster chat = harder to spot threats)
- **Threat ratio** scales with elapsed time (threats become proportionally more frequent over 3 minutes)

### Threat Types

**Chat (4 types):** Hate speech, doxxing attempts, spam, scam links — appear as messages that scroll upward and must be held to censor.

**Stream (3 types):**

| Threat | Trigger | Duration | Miss Penalty |
|---|---|---|---|
| Personal Info Leak | Random timer | ~4s | -8 emo, -30 viewers |
| VTuber Misbehavior | Emotion < 40 | Continuous drain | -5 emo/danger entry |
| Personal Message | Random timer | ~4s | -8 emo, -30 viewers |

### Grading

Performance is graded on accuracy (threats masked / total threats):

- **S:** 95%+
- **A:** 85%+
- **B:** 70%+
- **C:** 50%+
- **D:** Below 50%

## UI Layout (1280x720)

```
+----------------------------------------------+
| Emotional Value Bar (24px)                    |
+----------------------------------------------+
| Header (60px) - Logo, Viewer Count, Smoothness|
+----------------------+-----------------------+
|                      |                       |
|   Stream Panel (50%) |   Chat Panel (50%)    |
|                      |   15 fixed messages   |
|   [Video BG]         |   newest at bottom    |
|                      |   oldest = danger     |
|   [Info Leak]        |                       |
|   [Personal Msg]     |                       |
|            [VTuber]  |                       |
|            (Live2D)  |                       |
+----------------------+-----------------------+
| Info Bar (50px) - LIVE badge, hold hint       |
+----------------------------------------------+
```

## Tech Stack

- **Framework:** Nuxt 3 (Vue 3 + TypeScript)
- **State:** Pinia (2 stores: `game.ts` + `chat.ts`)
- **Styling:** Tailwind CSS v4 + scoped styles for animations
- **UI Components:** @nuxt/ui (menu buttons, game over card only)
- **VTuber:** oh-my-live2d (Live2D Hiyori model)
- **Audio:** Web Audio API (BGM + 9 SFX)
- **Deploy:** Static export (`npm run generate`)

## Project Structure

```
vtuber-mask/
+-- pages/
|   +-- index.vue              # Main menu ("Go Live")
|   +-- game.vue               # Gameplay (HUD, panels, game loop)
|   +-- gameover.vue           # Stats + grade + replay
+-- components/
|   +-- StreamPanel.vue        # Left 50% - video bg, threat overlays
|   +-- ChatPanel.vue          # Right 50% - chat message list
|   +-- ChatMessage.vue        # Individual message with hold-to-mask
|   +-- VTuberOverlay.vue      # Live2D model, smoothness dot
|   +-- InfoLeakOverlay.vue    # Gmail-style info leak popup
|   +-- PersonalMessageOverlay.vue  # Discord-style notification
|   +-- VTuberMisbehavior.vue  # Angry face overlay on VTuber
+-- stores/
|   +-- game.ts                # Emotional value, viewers, smoothness, stats
|   +-- chat.ts                # Messages, threat spawning, difficulty
+-- composables/
|   +-- useGameLoop.ts         # RAF loop, danger zone detection
|   +-- useInfoLeak.ts         # Info leak state machine
|   +-- useMisbehavior.ts      # VTuber misbehavior state machine
|   +-- usePersonalMessage.ts  # Personal message state machine
|   +-- useAudio.ts            # Web Audio API, SFX + BGM
|   +-- useViewportScale.ts    # Responsive 1280x720 scaling
+-- data/
|   +-- config.ts              # All game constants and tuning values
|   +-- chatMessages.ts        # Normal messages, threats, usernames
+-- types/
|   +-- threat.ts, game.ts, ui.ts, index.ts
+-- public/assets/
|   +-- audio/                 # BGM + 9 SFX files
|   +-- images/                # vtuber_angry.png, gmail.png, discord_msg.png
|   +-- video/                 # stream_normal.mp4
+-- doc/                       # Design documents (pre-production reference)
```

## Development Commands

```bash
npm run dev              # Dev server at http://localhost:3000
npm run generate         # Static build for deployment
npm run preview          # Preview static build
npm run lint             # ESLint check
npm run lint:fix         # Auto-fix lint issues
npm run typecheck        # TypeScript checking
```

## Documentation

Design documents in `doc/` were written during pre-production. The actual implementation diverged in several ways (hold vs click, emotional value vs hearts, accuracy grading vs score/combo). Use them as design reference, not as source of truth.

- [Game Design](doc/GAME_DESIGN.md) - Game concept, mechanics, threat types
- [Technical Spec](doc/TECHNICAL_SPEC.md) - Architecture reference (speculative code examples)
- [UI/UX Design](doc/UI_UX_DESIGN.md) - Layout specs, colors, animations
- [Game Jam Plan](doc/GAME_JAM_PLAN.md) - Feature tiers, milestone tracking

## Development Status

**Current Phase:** Demo Build Complete

**Implemented:**

- Hold-to-mask mechanic with position-based danger zones
- Emotional value (0-100) HP system with game over
- Viewer count driven by stream smoothness state machine
- 7 threat types (4 chat + 3 stream) with dedicated composables
- Difficulty scaling (viewer-driven chat speed + time-driven threat ratio)
- Live2D VTuber model with emotion-triggered misbehavior
- BGM + 9 sound effects
- Grade system (S/A/B/C/D) with end-game stats
- Responsive viewport scaling (1280x720)
- Multilingual chat (English + Chinese)

**Not yet implemented:**

- Pause menu / mute button
- Tutorial screen
- Combo system
- Multiple mask styles
- Particle effects
- Achievements / leaderboard

## Credits

**Made for Global Game Jam 2026**

- **Theme:** Mask
- **Engine:** Nuxt 3 / Vue 3 / TypeScript

**Inspiration:**

- _Papers, Please_ - Document inspection gameplay
- _Not For Broadcast_ - Multi-panel monitoring
- VTuber streaming culture

## License

MIT
