# VTuber Mask - Game Jam Development Plan

## Game Jam Context

**Event:** Global Game Jam 2026
**Theme:** Mask
**Duration:** Typically 48-72 hours
**Team Size:** [Fill in your team size]
**Skill Distribution:** [Fill in: programmers, artists, designers, audio]

## Scope Philosophy

### The 1/3 Rule
For a successful game jam:
- Spend 1/3 of time on core mechanics
- Spend 1/3 of time on content and features
- Spend 1/3 of time on polish and bug fixing

### MVP-First Approach
Build the minimum viable product first, then add features in priority order. Every feature should ask: "Does this make the game more fun?"

## Feature Tiers

### Tier 0: ABSOLUTELY REQUIRED (Must Have)
These features define the core game. Without them, there is no game.

**Layout & Structure:**
- [ ] 50/50 split layout (Stream 640px | Chat 640px)
- [ ] Platform header (60px) and info bar (50px)
- [ ] Full-height chat panel with scrolling
- [ ] VTuber overlay in bottom-right corner of stream (220×180px)
- [ ] Game HUD overlay in top-left corner of stream (180×100px)
- [ ] Correct z-index layering (1 → 10 → 50 → 100)

**Core Mechanics:**
- [ ] Click to mask mechanic (detect clicks on threats)
- [ ] At least 5 threat types (3 chat, 2 stream minimum)
- [ ] Basic scoring system (points per masked threat)
- [ ] Health/failure system (3 strikes = game over)
- [ ] Threat spawning system with timing

**Content & Flow:**
- [ ] 3-minute minimum gameplay duration
- [ ] Start screen with "Begin Stream" button
- [ ] Game over screen with final score
- [ ] At least one visual mask effect (black bar or pixelation)

**Time Estimate:** 15-20 hours

### Tier 1: CORE EXPERIENCE (Should Have)
These features make the game actually fun and replayable.

- [ ] Combo system with score multiplier
- [ ] 10+ threat types for variety
- [ ] Difficulty progression (threats appear faster over time)
- [ ] Multiple mask styles (pixelation, black bar, stickers)
- [ ] Visual feedback for successful/failed masks
- [ ] Basic sound effects (mask success, damage, threat appear)
- [ ] Background music
- [ ] End game statistics screen
- [ ] Tutorial/instructions screen

**Time Estimate:** 12-18 hours

### Tier 2: ENHANCED EXPERIENCE (Nice to Have)
These features add polish and depth but aren't essential.

- [ ] Animated VTuber model (blinking, breathing)
- [ ] Particle effects for successful masks
- [ ] Screen shake and impact effects
- [ ] Combo visual effects (glow, particles)
- [ ] False positive detection (masking normal content)
- [ ] Normal chat message generation
- [ ] Rotating stream content
- [ ] Threat warning indicators
- [ ] Different severity levels with color coding
- [ ] Perfect wave bonuses

**Time Estimate:** 8-12 hours

### Tier 3: POLISH & EXTRAS (If Time Permits)
These are the cherry on top, only add if everything else is done.

- [ ] Multiple VTuber characters
- [ ] Story/narrative elements
- [ ] Achievement system
- [ ] Power-ups or special abilities
- [ ] Hard mode/difficulty settings
- [ ] Leaderboard (local storage)
- [ ] Mobile responsive design
- [ ] Accessibility options
- [ ] Easter eggs and secrets
- [ ] Multiple music tracks
- [ ] Voice acting

**Time Estimate:** 10+ hours (likely won't all be done)

---

## Quick Priority Reference

### 🎯 PLAYTEST (Hour 6-8)
**Focus:** Validate core mechanic
- 50/50 layout (rough is OK)
- Click chat threats → see mask effect
- **Success = Team agrees it's fun**

### 🎯 MVP (Hour 20-24)
**Focus:** Complete game loop
- All Tier 0 features ✅
- Start → Play → Game Over → Restart
- 5+ threat types, scoring, health system
- **Success = Can play from start to finish**

### 🎯 DEMO (Hour 36-40)
**Focus:** Polished & presentable
- All Tier 0 + Tier 1 features ✅
- Combo system, 10+ threats, difficulty progression
- Sound effects, music, animations
- Tutorial, statistics, grade system
- **Success = Ready to show judges/players**

---

## Development Milestones

### PLAYTEST BUILD (Hour 6-8) - First Playable
**Goal:** Validate core mechanic is fun

**Must Have:**
- [ ] 50/50 layout visible (can be rough/unstyled)
- [ ] Stream panel (left) and Chat panel (right) rendered
- [ ] 1-2 threat types appear in chat
- [ ] Click detection works on chat messages
- [ ] Basic mask effect (any visual change on click)
- [ ] Threats disappear when clicked

**Can Skip:**
- Scoring, health, game over
- Multiple mask styles
- VTuber overlay (use placeholder)
- Header/footer bars
- Animations, sound, polish

**Success Criteria:**
✅ Can click a threat and see it get masked
✅ Team agrees the mechanic feels satisfying
✅ No critical bugs preventing interaction

---

### MVP BUILD (Hour 20-24) - Minimum Viable Product
**Goal:** Complete game loop, ready for extended playtesting

**Must Have (Tier 0 Complete):**
- [ ] **Layout:** 50/50 split with proper positioning
  - [ ] Stream panel: 640×610px (left, relative)
  - [ ] Chat panel: 640×610px (right, full height)
  - [ ] VTuber overlay: bottom-right corner (220×180px, 16px gaps)
  - [ ] Game HUD: top-left corner (180×100px, 16px gaps)
  - [ ] Header: 60px, Info bar: 50px

- [ ] **Mechanics:**
  - [ ] 5+ threat types (3 chat, 2 stream)
  - [ ] Click detection on all threat areas
  - [ ] Scoring system (100 pts per threat)
  - [ ] Health system (3 hearts/lives)
  - [ ] Game over on 0 health
  - [ ] Threat timer (5 seconds before damage)

- [ ] **Visual Feedback:**
  - [ ] 1-2 mask styles (black bar + pixelation)
  - [ ] Threat highlight/glow effect
  - [ ] Damage feedback (flash or shake)
  - [ ] Score display in HUD

- [ ] **Game Flow:**
  - [ ] Start screen
  - [ ] 3+ minutes of gameplay
  - [ ] Game over screen with final score
  - [ ] Restart capability

**Can Skip for MVP:**
- Combo system
- Sound effects
- Animations
- Particle effects
- Multiple VTuber expressions
- Tutorial screen
- Statistics screen

**Success Criteria:**
✅ Can play from start to game over
✅ Game is challenging but fair
✅ All Tier 0 features working
✅ No game-breaking bugs

---

### DEMO BUILD (Hour 36-40) - Polished & Presentable
**Goal:** Ready to show judges/players, includes Tier 1 features

**Must Have (MVP + Tier 1):**
- [ ] **Visual Polish:**
  - [ ] Platform UI styling (header with "LIVE", viewer count)
  - [ ] Chat styling (usernames, message formatting)
  - [ ] Stream content background
  - [ ] VTuber character art (static is fine)
  - [ ] Backdrop blur on overlays
  - [ ] Color scheme implemented (#1a1a2e, #e94560, etc.)

- [ ] **Gameplay Depth:**
  - [ ] Combo system (2x, 3x, 5x multipliers)
  - [ ] 10+ threat types for variety
  - [ ] Difficulty progression (faster spawns over time)
  - [ ] Multiple mask styles (3+: black bar, pixelation, stickers)
  - [ ] False positive detection (penalize masking normal content)

- [ ] **Feedback & Juice:**
  - [ ] Visual feedback (successful mask, damage taken)
  - [ ] 5+ sound effects (mask, damage, combo, threat appear, game over)
  - [ ] Background music (looping track)
  - [ ] Basic animations (threat pulse, mask stamp effect)
  - [ ] Combo visual indicator (glow or particle)

- [ ] **User Experience:**
  - [ ] Tutorial/instructions screen
  - [ ] End game statistics (accuracy, max combo, time survived)
  - [ ] Grade system (S/A/B/C/D)
  - [ ] Pause functionality
  - [ ] Mute button for audio

**Optional (Time Permitting):**
- Animated VTuber (blinking, expressions)
- Screen shake effects
- Particle systems
- Severity color coding
- Perfect wave bonuses

**Success Criteria:**
✅ Game feels polished and complete
✅ Audio/visual feedback is satisfying
✅ Players understand how to play without explanation
✅ Combo system adds depth and excitement
✅ Ready for public demo/submission

---

## Day-by-Day Plan (48-hour Jam)

### Before Jam Starts (Preparation)
- [ ] Set up development environment
- [ ] Choose tech stack and create project skeleton
- [ ] Gather team and assign roles
- [ ] Create communication channel (Discord, Slack)
- [ ] Download/bookmark asset resources
- [ ] Test build and deployment process

### Day 1 (Friday Evening - Hours 0-8)

**Hour 0-2: Setup & Planning**
- [ ] Jam theme announced
- [ ] Team brainstorm and concept finalization
- [ ] Review this document and prioritize features
- [ ] Set up project repository
- [ ] Create task list in Trello/GitHub Issues

**Hour 2-5: Core Foundation**
- [ ] Create HTML structure:
  - [ ] Container: 1280×720px
  - [ ] Header bar (60px)
  - [ ] Two-column layout (50% | 50%)
  - [ ] Stream panel (left, position: relative)
  - [ ] Chat panel (right, overflow-y: auto)
  - [ ] Info bar (50px)
- [ ] Basic CSS styling:
  - [ ] 50/50 split with flex or grid
  - [ ] Dark background colors (#1a1a2e)
  - [ ] Chat message list styling
- [ ] Set up game loop and state management
- [ ] Implement click detection on chat messages
- [ ] Create first threat type (hate speech message)

**Hour 5-8: First Playable (PLAYTEST BUILD)**
- [ ] Add masking mechanic (black bar overlay on click)
- [ ] Implement basic scoring (display score in console)
- [ ] Create 2-3 more threat types (doxxing, spam)
- [ ] Add VTuber placeholder overlay (bottom-right)
- [ ] Add HUD placeholder overlay (top-left)
- [ ] Test basic gameplay loop
- [ ] **PLAYTEST:** Is clicking threats fun?

**Goal:** By end of Day 1, you should be able to click chat threats and see them get masked with correct layout structure.

### Day 2 (Saturday - Hours 8-28)

**Hour 8-12: Layout Finalization & Content**
- [ ] Complete layout implementation:
  - [ ] VTuber overlay: bottom-right (220×180px, 16px gaps)
  - [ ] Game HUD: top-left (180×100px, 16px gaps)
  - [ ] Z-index layering: stream(1), threats(10), vtuber(50), hud(100)
  - [ ] Chat auto-scroll to bottom
- [ ] Create/gather VTuber sprite (static image OK)
- [ ] Design stream content background
- [ ] Implement threat spawning system with timing
- [ ] Add 3+ more threat types (total 5+)
- [ ] Create 2nd mask style (pixelation)

**Hour 12-14: Lunch & Playtesting**
- [ ] Team plays the game for 5+ minutes
- [ ] Identify what's fun and what's not
- [ ] Adjust threat spawn rate and timing
- [ ] Fix critical bugs
- [ ] Verify 50/50 layout works for gameplay

**Hour 14-18: MVP Completion**
- [ ] Implement health system (3 hearts display)
- [ ] Add threat timer (5 sec countdown, visual indicator)
- [ ] Create start screen with "Begin Stream" button
- [ ] Create game over screen with final score
- [ ] Implement restart functionality
- [ ] Add scoring display in HUD
- [ ] **PLAYTEST:** Is the full game loop working?
- [ ] **CHECKPOINT: MVP BUILD COMPLETE**

**Hour 18-20: Dinner Break**
- [ ] Rest and recharge
- [ ] Backup project files
- [ ] Review remaining tasks

**Hour 20-24: Tier 1 Features - Depth**
- [ ] Implement combo system (2x, 3x, 5x multipliers)
- [ ] Add combo display in HUD with glow effect
- [ ] Add 5+ more threat types (total 10+)
- [ ] Implement difficulty progression (spawn rate increases)
- [ ] Add 3rd mask style (cute stickers)
- [ ] Create false positive system (normal chat messages)
- [ ] Add penalty for masking normal content
- [ ] **PLAYTEST:** Are combos satisfying?

**Hour 24-28: Tier 1 Features - Polish**
- [ ] Add background music (looping track)
- [ ] Implement 5 key sound effects:
  - [ ] Threat appear sound
  - [ ] Successful mask sound
  - [ ] Damage taken sound
  - [ ] Combo achieved sound
  - [ ] Game over sound
- [ ] Add threat pulse animation (faster as time runs out)
- [ ] Add mask stamp animation on click
- [ ] Implement visual feedback for damage (flash/shake)
- [ ] Create end game statistics screen
- [ ] Add tutorial/instructions screen
- [ ] **PLAYTEST:** Does feedback feel good?

**Goal:** By end of Day 2, game should be fully playable with all Tier 1 features (MVP + depth + polish).

### Day 3 (Sunday - Hours 28-48)

**Hour 28-32: Testing & Balance**
- [ ] Extensive playtesting (full game run-throughs)
- [ ] Balance difficulty curve:
  - [ ] Adjust threat spawn rate progression
  - [ ] Tune combo multipliers
  - [ ] Verify 3-minute survival is achievable
- [ ] Adjust scoring thresholds for grades
- [ ] Fix all critical bugs
- [ ] Test on Chrome, Firefox, Safari
- [ ] Verify layout works at 1280×720

**Hour 32-36: Visual Polish (Toward Demo Build)**
- [ ] Platform UI styling:
  - [ ] Header with "🔴 LIVE" indicator and viewer count
  - [ ] Footer with stream info
  - [ ] Chat username colors and formatting
- [ ] Implement full color scheme:
  - [ ] Backgrounds (#1a1a2e, #16213e)
  - [ ] Accent colors (#e94560)
  - [ ] Success/warning/danger colors
- [ ] Add backdrop blur to VTuber and HUD overlays
- [ ] Improve visual feedback (better animations)
- [ ] Refine threat highlight effects
- [ ] Add particle effect for successful mask (if time)

**Hour 36-40: Demo Build Completion**
- [ ] Implement grade system (S/A/B/C/D)
- [ ] Add pause functionality
- [ ] Add mute button for audio
- [ ] Create credits screen
- [ ] Add Tier 2 features if time permits:
  - [ ] Animated VTuber (blinking/breathing)
  - [ ] Screen shake on damage
  - [ ] Severity color coding
  - [ ] Perfect wave bonuses
- [ ] **CHECKPOINT: DEMO BUILD COMPLETE**
- [ ] **PLAYTEST:** Is it ready to show?

**Hour 40-44: Final Testing & Bug Fixing**
- [ ] Full game run-throughs
- [ ] Fix any remaining bugs
- [ ] Test submission process
- [ ] Create promotional screenshots

**Hour 44-47: Submission Preparation**
- [ ] Write game description for jam page
- [ ] Create gameplay GIF/video
- [ ] Take polished screenshots
- [ ] Build final version
- [ ] Upload to itch.io/jam platform

**Hour 47-48: Submit & Buffer**
- [ ] Final submission
- [ ] Buffer time for technical issues
- [ ] Celebrate!

**Goal:** Game is submitted, playable, fun, and showcases the theme.

## Team Role Suggestions

### Programmer 1 (Gameplay)
- Game loop and state management
- Threat spawning system
- Scoring and combo logic
- Click detection and masking
- Health and difficulty systems

### Programmer 2 (UI/Frontend)
- HTML/CSS layout
- UI animations
- Visual effects and particles
- Menu screens
- Asset integration

### Artist/Designer
- VTuber character design
- Threat visual assets
- Mask overlays
- UI elements and icons
- Background art
- Color scheme and branding

### Audio Designer
- Background music composition
- Sound effects creation
- Audio mixing and balancing
- VTuber voice clips (if included)

### Generalist/Producer
- Task management
- Playtesting coordination
- Content creation (threat ideas)
- Documentation
- Submission preparation

*Note: For smaller teams, combine roles. One person can handle programming + UI, another can do art + audio.*

## Asset Creation Strategy

### Art Assets

**Option A: Hand-drawn (Higher Quality, More Time)**
- Draw VTuber character in chosen style
- Create threat graphics
- Pros: Unique, polished, thematic
- Cons: Time-consuming, requires skilled artist

**Option B: Asset Packs (Faster, Generic)**
- Use free VTuber models from Booth.pm or VRoid
- Download UI elements from Kenney.nl or itch.io
- Pros: Fast, consistent quality
- Cons: Less unique, potential licensing issues

**Option C: Hybrid (Recommended)**
- Use free/placeholder assets for background elements
- Create custom assets only for key elements (VTuber, masks)
- Pros: Balanced approach, manageable scope
- Cons: Requires coordination

### Audio Assets

**Music Options:**
1. Create original chiptune tracks (tools: BeepBox, Bosca Ceoil)
2. Use royalty-free music (incompetech.com, freesound.org)
3. Generate AI music (Suno, Soundraw) - check jam rules
4. Use game jam friendly music packs

**SFX Options:**
1. Record with household items + audio editing
2. Use free SFX libraries (freesound.org, zapsplat.com)
3. Generate with tools (Bfxr, ChipTone)
4. Voice act simple cues (gasps, cheers)

## Risk Management

### Common Pitfalls & Solutions

**Pitfall 1: Scope Creep**
- Solution: Stick to Tier 0 and 1 features until Day 3
- Red Flag: Adding new features before core is done
- Recovery: Cut features ruthlessly, focus on polish

**Pitfall 2: Technical Difficulties**
- Solution: Use familiar technology, avoid experimental tools
- Red Flag: Spending hours debugging one issue
- Recovery: Move to a working alternative, don't get stuck

**Pitfall 3: Asset Bottleneck**
- Solution: Use placeholders, create assets in parallel
- Red Flag: Programmers waiting for art assets
- Recovery: Implement with placeholder art, swap later

**Pitfall 4: No Clear Direction**
- Solution: Have a playable prototype by hour 8
- Red Flag: Still discussing features on Day 2
- Recovery: Single decision-maker makes final calls

**Pitfall 5: Burnout**
- Solution: Mandatory sleep, meal breaks, and rest
- Red Flag: Team member exhausted and making mistakes
- Recovery: Rotate tasks, take breaks, cut scope

### Emergency Scope Cuts

If you're running behind, cut in this order:

1. **Cut First:** Tier 3 features (polish, extras)
2. **Cut Second:** Tier 2 features (enhanced experience)
3. **Cut Third:** Multiple threat types (keep 5-8 instead of 15+)
4. **Cut Fourth:** Combo system (just keep basic scoring)
5. **Last Resort:** Simplify one panel (remove VTuber, keep Stream + Chat)

**Never Cut:** Click to mask mechanic, basic scoring, game over condition

## Playtesting Schedule

### Playtest 1: Hour 6-8
- **Goal:** Is the core mechanic fun?
- **Questions:** Can you click threats? Does masking feel good?
- **Action:** Fix critical issues, validate concept

### Playtest 2: Hour 14-16
- **Goal:** Is the game challenging and fair?
- **Questions:** Is difficulty balanced? Are threats visible?
- **Action:** Adjust spawn rates, timing, visual clarity

### Playtest 3: Hour 24-26
- **Goal:** Is the game loop satisfying?
- **Questions:** Do combos feel rewarding? Is audio/visual feedback good?
- **Action:** Tune feedback, add juice, improve feel

### Playtest 4: Hour 36-38
- **Goal:** Is the game ready to ship?
- **Questions:** Any game-breaking bugs? Is it fun for 5+ minutes?
- **Action:** Final bug fixes, minor balance tweaks

### Playtest 5: Hour 42-44
- **Goal:** Final validation
- **Questions:** Does it work on all browsers? Is it submission-ready?
- **Action:** Last minute fixes only

## Submission Checklist

### Technical
- [ ] Game runs in major browsers (Chrome, Firefox, Safari)
- [ ] No console errors or critical bugs
- [ ] Performant (60fps on average hardware)
- [ ] Mobile responsive OR clear "desktop only" message
- [ ] Loading screen (if assets take time to load)
- [ ] Clear instructions/tutorial

### Content
- [ ] Game is completable (has win/lose condition)
- [ ] Minimum 5 minutes of gameplay content
- [ ] Theme is clearly represented
- [ ] Credits screen with team names
- [ ] All assets are properly licensed

### Presentation
- [ ] Engaging title
- [ ] Clear description explaining gameplay
- [ ] 3-5 screenshots showing key features
- [ ] Gameplay GIF or short video
- [ ] Controls/instructions listed
- [ ] Browser compatibility noted

### Polish
- [ ] Audio can be muted
- [ ] Game can be paused
- [ ] Clear visual and audio feedback
- [ ] No placeholder text/graphics in final build
- [ ] Professional presentation

## Post-Jam Improvements

After the jam, if you want to continue development:

### Week 1 Post-Jam
- Address critical bugs found by players
- Add most-requested feature
- Improve accessibility
- Add proper tutorial

### Week 2-4 Post-Jam
- Add story mode with progression
- Create multiple characters
- Add daily challenges
- Implement leaderboard

### Long-term
- Port to mobile
- Add multiplayer/competitive mode
- Create content updates
- Consider commercial release

## Success Metrics

Your game jam submission is successful if:

✅ **Submitted on Time:** Game is uploaded before deadline
✅ **Playable:** No game-breaking bugs, completable
✅ **Thematic:** Clearly uses "mask" theme in meaningful way
✅ **Fun:** Players enjoy the core loop
✅ **Polished:** Feels finished within the scope
✅ **Unique:** Has a memorable hook or twist

Bonus success:
🌟 **Innovative:** Does something unexpected with the theme
🌟 **Memorable:** Players remember and recommend it
🌟 **Complete:** Feels like a full game, not a prototype
🌟 **Replayable:** Players want to beat their high score

## Final Tips

1. **Sleep:** Don't pull all-nighters. 6 hours sleep > 6 hours tired coding
2. **Scope Small:** Better to have a polished simple game than broken complex one
3. **Prioritize Fun:** If a feature isn't fun, cut it
4. **Save Often:** Commit to git every hour, backup everything
5. **Communicate:** Use voice chat for complex discussions, text for quick updates
6. **Take Breaks:** Step away from the screen every 2 hours
7. **Embrace Jank:** Perfection is the enemy of done
8. **Have Fun:** You're making a game about VTubers censoring streams - enjoy it!

Good luck with your game jam! 🎮🎭
