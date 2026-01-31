# VTuber Mask 🎭

A web-based reaction game for Global Game Jam 2026

## Concept

You are the content moderator for a popular VTuber's live stream. Your job is to identify and mask (censor) dangerous or inappropriate content before viewers notice it. The stream plays normally, but occasionally problematic elements appear in the VTuber model, streaming screen, or chat that you must quickly click to censor.

The game explores the dual meaning of "mask":

- **Literal:** Masking/censoring inappropriate content
- **Metaphorical:** The VTuber persona itself as a mask hiding the real person

## Quick Pitch

_"Papers, Please meets VTuber streaming - click to censor inappropriate content before it damages the stream!"_

## Core Gameplay

- **Monitor the stream:** Stream content (left) + Chat (right)
- **Identify threats:** Personal info, inappropriate gestures, hate speech, etc.
- **Click to mask:** Censor threats before time runs out (5 seconds)
- **Build combos:** Chain successful masks for bonus points (2x → 3x → 5x)
- **Avoid mistakes:** Don't mask normal content (false positives lose points)
- **Survive:** Three strikes and the stream ends - protect the VTuber!

## UI Layout (1280×720)

**50/50 Split - Optimized for Reaction Gameplay**

```
┌──────────────────────────────────────────────────────────────┐
│  🎭 VTuber Mask • Protect the Stream! • 👁 1.2K viewers      │ 60px
├──────────────────────────────┬───────────────────────────────┤
│                              │                               │
│   MAIN STREAM VIEW (50%)     │   💬 STREAM CHAT (50%)        │
│   640px × 610px              │   640px × 610px (FULL HEIGHT) │
│                              │                               │
│  [Game/Desktop Content]      │  [18-20 chat messages]        │
│                              │  [Auto-scrolling]             │
│  ┌────┐ HUD (top-left)       │  [PRIMARY THREAT ZONE]        │
│  └────┘                      │                               │
│              ┌──────┐        │                               │
│              │VTuber│ Overlay│                               │
│              └──────┘        │                               │
│              (bottom-right)  │                               │
├──────────────────────────────┴───────────────────────────────┤
│  🔴 LIVE • Reaction Game • ⭐ Subscribe                       │ 50px
└──────────────────────────────────────────────────────────────┘
```

**Key Design Decisions:**

- ✅ **Chat is 50% width** - Primary threat source (60% of threats), small click targets
- ✅ **Stream is 50% width** - Fewer threats (30%), larger targets
- ✅ **VTuber overlays bottom-right** - Fewest threats (10%), minimal space needed
- ✅ **Full-height chat** - Maximum visibility for 18-20 messages
- ✅ **Game HUD overlays top-left** - Always visible, doesn't block content

**Precise Positioning:**

- Stream Panel: 640×610px (left, relative positioning)
- Chat Panel: 640×610px (right, overflow-y: auto)
- VTuber Overlay: 220×180px (absolute, bottom: 16px, right: 16px, z-index: 50)
- Game HUD: 180×100px (absolute, top: 16px, left: 16px, z-index: 100)

## Documentation

This repository contains comprehensive design documents for the game:

### 📋 [Game Design Document](doc/GDD.md)

Complete overview of game concept, mechanics, progression, and features:

- Core gameplay loop and win/lose conditions
- Threat types for stream, chat, and VTuber areas
- Scoring system with combo multipliers
- Health/failure mechanics (3 strikes system)
- Difficulty progression and balancing
- Visual and audio design philosophy
- Meta themes and narrative context

### 💻 [Technical Specification](doc/TECHNICAL_SPEC.md)

Implementation details and architecture:

- **Technology stack:** Nuxt 3 + TypeScript + Pinia
- **Project structure:** Composables-based architecture
- **Core systems:** GameManager, ThreatManager, ScoreManager, UIManager
- **Threat data structures:** Type definitions and spawn logic
- **UI components:** Stream, Chat, VTuber, HUD specifications
- **Animation and audio systems:** Event-driven feedback
- **Performance optimization:** 60fps target, efficient rendering

### 🎨 [UI/UX Design Document](doc/UI_UX_DESIGN.md)

Visual design, layout, and user experience:

- **50/50 split layout** with precise measurements
- **VTuber overlay positioning** (bottom-right, 220×180px)
- **Full-height chat** (18-20 messages visible)
- **Z-index layering** (1 → 10 → 50 → 100)
- **Color scheme:** Dark theme (#1a1a2e) with vibrant accents (#e94560)
- **Typography and component designs** for all panels
- **Animation sequences:** Threat pulse, mask stamp, combo glow
- **Accessibility features:** Colorblind mode, high contrast
- **Complete asset checklists** for art and audio

### 📅 [Game Jam Development Plan](doc/GAME_JAM_PLAN.md)

Practical timeline and scope management for 48-hour jam:

- **Feature tiers:** Tier 0 (Must Have) → Tier 3 (Nice to Have)
- **Three clear milestones:**
  - **Playtest** (Hour 6-8): Validate core mechanic
  - **MVP** (Hour 20-24): Complete game loop
  - **Demo** (Hour 36-40): Polished & presentable
- **Hour-by-hour development schedule** with checkpoints
- **Team role assignments** (Gameplay, UI, Art, Audio)
- **Asset creation strategy:** Hand-drawn vs packs vs hybrid
- **Risk management:** Emergency scope cuts and common pitfalls
- **Playtesting schedule:** 5 scheduled sessions
- **Submission checklist:** Technical, content, presentation

## Development Roadmap

### 🎯 Milestone 1: PLAYTEST BUILD (Hour 6-8)

**Goal:** Validate core mechanic is fun

- [ ] 50/50 layout structure (Stream | Chat)
- [ ] Click detection on chat messages
- [ ] Basic mask effect (black bar overlay)
- [ ] 1-2 threat types appearing in chat
- [ ] **Success:** Team agrees clicking threats feels satisfying

### 🎯 Milestone 2: MVP BUILD (Hour 20-24)

**Goal:** Complete game loop - playable start to finish

**Layout Complete:**

- [ ] Stream panel: 640×610px (left, relative)
- [ ] Chat panel: 640×610px (right, full height scrolling)
- [ ] VTuber overlay: 220×180px (bottom-right corner, z-index: 50)
- [ ] Game HUD: 180×100px (top-left corner, z-index: 100)
- [ ] Platform header (60px) and info bar (50px)

**Core Mechanics:**

- [ ] 5+ threat types (3 chat, 2 stream)
- [ ] Click-to-mask interaction
- [ ] Threat timer (5 seconds before damage)
- [ ] Scoring system (100 pts per threat)
- [ ] Health system (3 hearts/lives)
- [ ] Game over on 0 health

**Game Flow:**

- [ ] Start screen
- [ ] 3+ minutes of gameplay
- [ ] Game over screen with final score
- [ ] Restart capability

**Visuals:**

- [ ] 2 mask styles (black bar + pixelation)
- [ ] Threat highlight/glow effect
- [ ] Damage feedback (flash or shake)

**Success:** Can play from start to game over without bugs

### 🎯 Milestone 3: DEMO BUILD (Hour 36-40)

**Goal:** Polished & ready to show judges/players

**Enhanced Gameplay:**

- [ ] Combo system (2x, 3x, 5x multipliers)
- [ ] 10+ threat types for variety
- [ ] Difficulty progression (faster spawns over time)
- [ ] 3+ mask styles (black bar, pixelation, stickers)
- [ ] False positive detection (penalize masking normal content)

**Visual Polish:**

- [ ] Platform UI styling (🔴 LIVE, viewer count)
- [ ] Chat formatting (usernames, colors)
- [ ] VTuber character art (static OK)
- [ ] Full color scheme (#1a1a2e, #e94560)
- [ ] Backdrop blur on overlays
- [ ] Threat pulse animation
- [ ] Mask stamp effect

**Audio:**

- [ ] Background music (looping track)
- [ ] 5+ sound effects (mask, damage, combo, appear, game over)

**UX Features:**

- [ ] Tutorial/instructions screen
- [ ] End game statistics (accuracy, max combo, time)
- [ ] Grade system (S/A/B/C/D)
- [ ] Pause functionality
- [ ] Mute button

**Success:** Ready for public demo/submission

## Development Status

**Current Phase:** Pre-production / Documentation Complete ✅
**Next Phase:** Playtest Build (Hour 0-8)
**Target Platform:** Web Browser (HTML5)
**Target Resolution:** 1280×720
**Estimated Dev Time:** 48 hours (Game Jam)

## Tech Stack

### Core Technologies

- **Framework:** Nuxt 3 (Vue 3 + TypeScript)
  - ✅ Reactive state management
  - ✅ Component-based architecture
  - ✅ Built-in SSG for static deployment
  - ✅ TypeScript for type safety

- **State Management:** Pinia
  - ✅ Lightweight and performant
  - ✅ Built-in with Nuxt 3
  - ✅ Perfect for game state

- **Build Tool:** Vite
  - ✅ Lightning-fast HMR
  - ✅ Optimized production builds
  - ✅ Built-in with Nuxt 3

- **Styling:** CSS3 with Scoped Styles
  - ✅ No external CSS frameworks (faster)
  - ✅ Component-scoped styles
  - ✅ CSS variables for theming

- **Audio:** Web Audio API
  - ✅ Native browser support
  - ✅ Low latency for game feedback
  - ✅ Sound effects and music

- **Linting:** ESLint + Prettier
  - ✅ Code quality and consistency
  - ✅ Auto-formatting

- **Deployment:** Static Export
  - ✅ Deploy to Itch.io (recommended for jam)
  - ✅ Or GitHub Pages / Netlify / Vercel
  - ✅ No server required

### Why Nuxt 3?

**Pros:**

- Fast development with hot module replacement
- Composables for reusable game logic
- Built-in TypeScript support
- Easy static export for jam submission
- Small bundle size (important for web game)

**Alternatives Considered:**

- **Phaser:** More features but steeper learning curve
- **PixiJS:** Great for sprites but overkill for this UI-focused game
- **Vanilla JS:** Faster but harder to maintain during jam crunch
- **React:** Similar to Vue but team prefers Vue's simplicity

**Decision:** Nuxt 3 provides the best balance of developer experience, performance, and rapid iteration for a 48-hour jam.

## Getting Started

### Quick Start (30 seconds)

1. **Read this order:**
   - This README (you are here) - Overview
   - [Game Jam Plan](doc/GAME_JAM_PLAN.md) - Milestones & priorities
   - [UI/UX Design](doc/UI_UX_DESIGN.md) - Layout specifications
   - [Technical Spec](doc/TECHNICAL_SPEC.md) - Implementation details

2. **Focus on milestones:**
   - Hour 6-8: Playtest (validate mechanic)
   - Hour 20-24: MVP (complete loop)
   - Hour 36-40: Demo (polish)

3. **Start building:**
   - Begin with 50/50 layout
   - Add click detection
   - Implement first threat type

### For Developers

**Pre-Jam Setup:**

```bash
# Create Nuxt project
npx nuxi@latest init vtuber-mask
cd vtuber-mask
npm install

# Install dependencies
npm install @pinia/nuxt
npm install -D @nuxtjs/eslint-config-typescript prettier

# Start development server
npm run dev
```

**Development Order:**

1. **Hour 2-5:** Build 50/50 layout structure
   - Create HTML containers (Stream | Chat)
   - Basic CSS (flex/grid, 640px each)
   - Add placeholder overlays (VTuber, HUD)

2. **Hour 5-8:** First playable (PLAYTEST)
   - Click detection on chat messages
   - Black bar mask effect
   - Spawn 1-2 threat types
   - **PLAYTEST: Is it fun?**

3. **Hour 8-20:** Build to MVP
   - Complete layout with correct positioning
   - Add 5+ threat types
   - Implement scoring and health
   - Add game flow (start/game over screens)
   - **CHECKPOINT: MVP complete**

4. **Hour 20-36:** Add depth & polish
   - Combo system
   - 10+ threats
   - Sound effects and music
   - Visual polish and animations
   - **CHECKPOINT: Demo ready**

**Key Files to Create:**

- `/composables/useGameManager.ts` - Game state and loop
- `/composables/useThreatManager.ts` - Threat spawning/timing
- `/composables/useScoreManager.ts` - Scoring and combos
- `/components/StreamPanel.vue` - Left 50% panel
- `/components/ChatPanel.vue` - Right 50% panel
- `/components/VTuberOverlay.vue` - Bottom-right overlay
- `/components/GameHUD.vue` - Top-left overlay

### For Designers

**Priority Order:**

**Phase 1: Playtest (Hour 0-8)**

- Basic layout mockup
- Simple threat visuals (text placeholders OK)

**Phase 2: MVP (Hour 8-20)**

- VTuber character sprite (static, 220×180px)
- Stream background (640×610px)
- 2 mask overlays (black bar, pixelation)
- Basic HUD graphics

**Phase 3: Demo (Hour 20-40)**

- Platform UI elements (header, footer)
- Chat message styling
- 10+ threat graphics
- 3rd mask style (stickers)
- VTuber expressions (if time)

**Asset Checklists:**

- See [UI/UX Design Doc](doc/UI_UX_DESIGN.md) section "Art Asset Requirements"
- Use placeholder art early, swap later
- Follow color scheme: #1a1a2e (dark), #e94560 (accent)

### For Team Leads

**Pre-Jam:**

- [ ] Review all 4 documentation files
- [ ] Assign roles: Gameplay dev, UI dev, Artist, Audio
- [ ] Set up Git repository
- [ ] Create task board (GitHub Projects or Trello)
- [ ] Schedule 5 playtesting sessions (hours 8, 14, 24, 36, 42)

**During Jam:**

- [ ] Track milestones: Playtest → MVP → Demo
- [ ] Cut features ruthlessly if behind schedule
- [ ] Mandatory breaks every 6 hours
- [ ] Backup project every 2 hours (git commits)

**Emergency Scope Cuts (if behind):**

1. Cut Tier 3 features first
2. Cut Tier 2 features second
3. Reduce threat types (keep 5-8)
4. Simplify combo system (basic scoring only)
5. Last resort: Remove VTuber overlay (just Stream + Chat)

## Threat Types Reference

### 🎭 VTuber Overlay (10% of threats)

**Large targets, rare occurrence, bottom-right corner**

- Inappropriate hand gestures
- Wardrobe malfunctions (model glitches)
- Real face showing through avatar
- Copyright character mimicry
- Emotional distress reactions

### 🖥️ Stream Panel (30% of threats)

**Medium-large targets, moderate frequency, left panel**

- Personal information (address, phone, ID card)
- Credit cards or bank details
- Inappropriate browser tabs or windows
- Excessive violence or gore in game content
- Private messages/DMs visible on screen
- Email inbox with sensitive info
- Desktop icons revealing real name

### 💬 Chat Panel (60% of threats) - PRIMARY ZONE

**Small targets, high frequency, right panel full-height**

- Hate speech or slurs
- Doxxing attempts (posting addresses)
- Sexual harassment messages
- Dangerous/malicious links
- Spam attacks (repeated messages)
- Personal questions (asking for private info)
- Toxic behavior or bullying
- Impersonation attempts

**Gameplay Balance:**

- Chat threats are smallest → need more screen space (50%)
- Chat has most threats → primary focus for players
- Stream threats are larger → easier to click despite fewer
- VTuber threats are rare → overlay is small

## Feature Comparison: Playtest → MVP → Demo

| Feature             | Playtest (8h) | MVP (24h)                  | Demo (40h)                |
| ------------------- | ------------- | -------------------------- | ------------------------- |
| **Layout**          | Rough 50/50   | Correct positioning        | Full styling              |
| **Threat Types**    | 1-2 chat      | 5 total (3 chat, 2 stream) | 10+ variety               |
| **Mask Styles**     | 1 (black bar) | 2 (bar + pixelation)       | 3+ (stickers)             |
| **Scoring**         | None          | Basic points               | Combo multipliers         |
| **Health**          | None          | 3 hearts                   | 3 hearts + visual         |
| **Game Flow**       | Click only    | Start → Play → End         | Full UX + tutorial        |
| **VTuber**          | Placeholder   | Static overlay             | Character art             |
| **HUD**             | None          | Score display              | Score + combo + health    |
| **Sound**           | None          | None                       | Music + 5+ SFX            |
| **Animations**      | None          | Basic glow                 | Pulse + stamp + particles |
| **Difficulty**      | Static        | Static                     | Progressive               |
| **False Positives** | None          | None                       | Penalty system            |
| **Statistics**      | None          | Final score                | Full stats + grade        |
| **Polish**          | Rough         | Functional                 | Polished                  |

**Goal Progression:**

- **Playtest:** Is the mechanic fun? ⚡
- **MVP:** Can I play the full game? 🎮
- **Demo:** Would I show this to others? ✨

## Project Structure

```
vtuber-mask/
├── doc/
│   ├── GDD.md                    # Game Design Document
│   ├── TECHNICAL_SPEC.md         # Technical Specification
│   ├── UI_UX_DESIGN.md          # UI/UX Design Document
│   └── GAME_JAM_PLAN.md         # 48-hour Development Plan
├── composables/
│   ├── useGameManager.ts         # Core game loop and state
│   ├── useThreatManager.ts       # Threat spawning and timing
│   ├── useScoreManager.ts        # Scoring and combo logic
│   └── useUIManager.ts           # UI state management
├── components/
│   ├── StreamPanel.vue           # Left 50% - Stream content
│   ├── ChatPanel.vue             # Right 50% - Chat messages
│   ├── VTuberOverlay.vue         # Bottom-right overlay
│   ├── GameHUD.vue               # Top-left overlay
│   └── screens/
│       ├── StartScreen.vue       # Game start menu
│       ├── GameOverScreen.vue    # End game + statistics
│       └── TutorialScreen.vue    # How to play
├── assets/
│   ├── images/                   # VTuber, threats, masks
│   ├── audio/                    # Music and SFX
│   └── styles/                   # Global CSS
└── types/
    └── game.ts                   # TypeScript definitions
```

## Tips for Success

### Do's ✅

- **Start simple:** Get playtest build working first
- **Use placeholders:** Swap art later, focus on mechanics
- **Test early and often:** 5 scheduled playtests
- **Commit frequently:** Git commit every hour
- **Take breaks:** 6 hours sleep, meal breaks
- **Cut ruthlessly:** Better polished simple than broken complex
- **Focus on feel:** Satisfying feedback > feature count

### Don'ts ❌

- **Don't add features** before Tier 0 is complete
- **Don't perfectionist** on one element for hours
- **Don't skip playtesting** - you'll miss critical issues
- **Don't work exhausted** - tired coding wastes time
- **Don't forget backup** - commit and push regularly
- **Don't ignore scope** - stick to the plan
- **Don't forget fun** - if it's not fun, cut it

### Common Pitfalls

1. **Scope creep** → Stick to tier system
2. **Tech issues** → Use familiar tools, don't experiment
3. **Asset bottleneck** → Use placeholders, parallel work
4. **No direction** → Playable prototype by hour 8
5. **Burnout** → Mandatory rest, rotate tasks

## Contributing

This is a game jam project!

**During Jam:**

- Coordinate all contributions with team lead
- Follow the development plan milestones
- Use feature branches and pull requests

**Post-Jam:**

- Feel free to fork and create your own version
- Submit issues for bugs or suggestions
- PRs welcome for improvements

## License

MIT License (recommended for jam projects)

This allows others to learn from and remix your work while maintaining credit.

## Credits

**Team:**

- [Add your team members here]
- Roles: [Gameplay Dev, UI Dev, Artist, Audio, Producer]

**Made for Global Game Jam 2026**

- **Theme:** Mask
- **Duration:** 48 hours
- **Engine:** Nuxt 3 / Vue 3 / TypeScript

## Acknowledgments

**Inspiration:**

- _Papers, Please_ - Document inspection gameplay loop
- _Content Warning_ - Content moderation as game mechanic
- _Not For Broadcast_ - Multi-panel monitoring gameplay
- VTuber community for cultural context and authenticity

**Tools & Resources:**

- Global Game Jam for the theme and event
- Nuxt team for excellent framework
- Free asset communities (Kenney, OpenGameArt)

## Links

- **Jam Submission:** [Add itch.io link]
- **Live Demo:** [Add deployed game link]
- **Devlog:** [Add blog/twitter]
- **Team Contact:** [Add social media]

---

## Final Notes

This project explores the dual meaning of "mask":

- **Literal:** Censoring inappropriate content to protect viewers
- **Metaphorical:** The VTuber persona as a mask hiding the real person

The game asks: _What are we protecting? The audience from harmful content, or the streamer's carefully crafted identity?_

**Behind every perfect stream is someone protecting the mask.** 🎭

_Good luck with your jam! Remember: scope small, iterate fast, and have fun!_

---

**Last Updated:** 2026-01-31
**Documentation Status:** Complete ✅
**Next Step:** Begin Playtest Build (Hour 0-8)
