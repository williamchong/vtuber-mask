# VTuber Mask - Game Jam Development Plan

> **Note:** This plan was written before the jam. The game is now at Demo Build stage. Feature tier checklists and milestone checklists below have been updated to reflect actual completion status.

## Game Jam Context

**Event:** Global Game Jam 2026
**Theme:** Mask
**Duration:** Typically 48-72 hours

## Feature Tiers

### Tier 0: ABSOLUTELY REQUIRED (Must Have)

These features define the core game. Without them, there is no game.

**Layout & Structure:**

- [x] 50/50 split layout (Stream 640px | Chat 640px)
- [x] Platform header (60px) and info bar (50px)
- [x] Full-height chat panel with scrolling
- [x] VTuber overlay in bottom-right corner of stream (220×150px)
- [ ] ~~Game HUD overlay in top-left corner of stream~~ (HUD is inline in header/bars instead)
- [x] Correct z-index layering (stream → threats → VTuber)

**Core Mechanics:**

- [x] Hold-to-mask mechanic (changed from click to hold)
- [x] 7+ threat types (4 chat types + 3 stream threats)
- [x] Accuracy-based grading system (changed from point scoring)
- [x] Emotional value system 0-100 (changed from 3-strike health)
- [x] Threat spawning system with timing

**Content & Flow:**

- [x] Open-ended gameplay duration (game over when emotional value hits 0)
- [x] Start screen with "Go Live" button
- [x] Game over screen with stats + grade
- [x] Blur/censor mask effect

### Tier 1: CORE EXPERIENCE (Should Have)

These features make the game actually fun and replayable.

- [ ] Combo system with score multiplier
- [x] 7+ threat types (4 chat + 3 stream) — not 10+ but good variety
- [x] Difficulty progression (viewer-driven chat speed + time-driven threat ratio)
- [ ] Multiple mask styles (only blur/censor used currently)
- [x] Visual feedback for successful/failed masks (green/red flash, hold progress)
- [x] Sound effects (9 SFX: click, correct, incorrect, hurt x3, angry, discord, game over)
- [x] Background music (looping BGM)
- [x] End game statistics screen (accuracy, threats masked, survival time, peak viewers)
- [ ] Tutorial/instructions screen

### Tier 2: ENHANCED EXPERIENCE (Nice to Have)

These features add polish and depth but aren't essential.

- [x] Animated VTuber model (Live2D with oh-my-live2d)
- [ ] Particle effects for successful masks
- [ ] Screen shake and impact effects
- [ ] Combo visual effects (glow, particles)
- [x] False positive detection (masking normal chat = penalty)
- [x] Normal chat message generation (45+ messages with sentiment)
- [x] Stream video content background
- [x] Threat warning indicators (position-based red tint + flashing)
- [ ] Different severity levels with color coding
- [ ] Perfect wave bonuses

### Tier 3: POLISH & EXTRAS (If Time Permits)

These are the cherry on top, only add if everything else is done.

- [ ] Multiple VTuber characters
- [ ] Story/narrative elements
- [ ] Achievement system
- [ ] Power-ups or special abilities
- [ ] Hard mode/difficulty settings
- [ ] Leaderboard (local storage)
- [x] Responsive viewport scaling (maintains 1280×720 aspect ratio)
- [ ] Accessibility options
- [ ] Easter eggs and secrets
- [ ] Multiple music tracks
- [ ] Voice acting

---

## Development Milestones

### PLAYTEST BUILD (Hour 6-8) - First Playable ✅ COMPLETE

**Goal:** Validate core mechanic is fun

**Must Have:**

- [x] 50/50 layout visible
- [x] Stream panel (left) and Chat panel (right) rendered
- [x] Threat types appear in chat
- [x] Hold detection works on chat messages
- [x] Mask effect (blur/censor on hold)
- [x] Threats marked as masked

**Success Criteria:**
✅ Can hold a threat and see it get masked
✅ Mechanic feels satisfying
✅ No critical bugs preventing interaction

---

### MVP BUILD (Hour 20-24) - Minimum Viable Product ✅ COMPLETE

**Goal:** Complete game loop, ready for extended playtesting

**Must Have (Tier 0 Complete):**

- [x] **Layout:** 50/50 split with proper positioning
  - [x] Stream panel (left, relative)
  - [x] Chat panel (right, full height, 15 fixed messages)
  - [x] VTuber overlay: bottom-right corner (Live2D model)
  - [x] Emotional value bar (top), header, info bar
  - [x] Header: 60px, Info bar: 50px

- [x] **Mechanics:**
  - [x] 7+ threat types (4 chat + 3 stream)
  - [x] Hold detection on all threat areas
  - [x] Accuracy-based grading (replaced point scoring)
  - [x] Emotional value system 0-100 (replaced hearts)
  - [x] Game over on 0 emotional value
  - [x] Position-based danger (replaced fixed timer)

- [x] **Visual Feedback:**
  - [x] Blur/censor mask effect
  - [x] Position-based red tint + flashing danger zones
  - [x] Miss flash animation (red border shake)
  - [x] Viewer delta popup, smoothness dot

- [x] **Game Flow:**
  - [x] Start screen ("Go Live")
  - [x] Open-ended gameplay (until emotional value hits 0)
  - [x] Game over screen with stats + grade
  - [x] Play again + main menu navigation

**Success Criteria:**
✅ Can play from start to game over
✅ Game is challenging but fair
✅ All Tier 0 features working
✅ No game-breaking bugs

---

### DEMO BUILD (Hour 36-40) - Polished & Presentable ✅ MOSTLY COMPLETE

**Goal:** Ready to show judges/players, includes Tier 1 features

**Must Have (MVP + Tier 1):**

- [x] **Visual Polish:**
  - [x] Platform UI styling (header with viewer count + smoothness dot)
  - [x] Chat styling (usernames, colors, message formatting, TransitionGroup)
  - [x] Stream video background
  - [x] Live2D VTuber model (animated)
  - [x] Backdrop blur on overlays
  - [x] Color scheme implemented

- [ ] **Gameplay Depth:**
  - [ ] Combo system — NOT IMPLEMENTED (using accuracy grading instead)
  - [x] 7+ threat types (4 chat + 3 stream)
  - [x] Difficulty progression (viewer-driven + time-driven)
  - [ ] Multiple mask styles — only blur/censor
  - [x] False positive detection (penalize masking normal content)

- [x] **Feedback & Juice:**
  - [x] Visual feedback (green/red flash, hold progress bar, danger tints)
  - [x] 9 sound effects
  - [x] Background music (looping)
  - [x] Animations (danger zone transitions, miss flash, viewer delta popup)
  - [ ] Combo visual indicator — N/A (no combo system)

- [ ] **User Experience:**
  - [ ] Tutorial/instructions screen
  - [x] End game statistics (accuracy, threats masked, time survived, peak viewers)
  - [x] Grade system (S/A/B/C/D)
  - [ ] Pause functionality
  - [ ] Mute button for audio

**Completed Optional:**

- [x] Animated VTuber (Live2D model)
- [x] Viewport scaling for responsive play

**Still Missing:**

- Tutorial screen
- Pause menu
- Mute/settings
- Combo system
- Multiple mask styles
- Particle effects

**Success Criteria:**
✅ Game feels polished and complete
✅ Audio/visual feedback is satisfying
✅ Players can learn by playing (hold hint shown on first tap)
✅ Ready for public demo/submission
