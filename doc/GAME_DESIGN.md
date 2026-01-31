# VTuber Mask - Game Design Document

## Game Concept

**Title:** VTuber Mask (working title)
**Theme:** Mask (Global Game Jam 2026)
**Genre:** Reaction-based, Time Management, Simulation
**Platform:** Web Browser
**Target Duration:** 5-10 minute gameplay sessions

## Core Concept

You are a VTuber protecting your own live stream. While streaming, dangerous or inappropriate content occasionally appears — in your chat, on the stream screen, or even on your VTuber model — and you must quickly click to censor it before viewers notice. The game explores the dual meaning of "mask" — both the literal censorship of content and the metaphorical mask that VTubers wear to hide their real identity.

## Narrative Frame

You are a VTuber who has just gone live. Your job is to keep the stream "seiso" (pure/clean) by masking any problematic content before it damages your reputation and emotional state. You must protect your own image — your "mask" of perfection — while keeping your viewers happy and your audience growing.

## Core Gameplay Loop

1. **Normal Stream State:** All UI elements display normally
2. **Threat Appears:** A problematic element appears in one of the three zones
3. **Detection Window:** Player has limited time to identify the threat
4. **Masking Action:** Player clicks the problematic element to apply a mask/censor
5. **Consequence:** Success or failure affects stream health and score
6. **Escalation:** Difficulty increases over time

## Main UI Elements

### 1. VTuber Model (Left Side - 30% width)

- **Normal State:** Cute avatar with idle animations
- **Threat Examples:**
  - Inappropriate hand gestures
  - Wardrobe malfunction (model glitching)
  - Leaked real face/identity showing through
  - Drinking alcohol/smoking (if character is supposed to be underage)
  - Yandere/creepy expressions
  - Copyright character poses (Mickey Mouse ears, etc.)

### 2. Stream Screen (Center - 50% width)

- **Normal State:** Game footage, desktop, or content being shared
- **Threat Examples:**
  - Personal information (real name, address, phone number)
  - Browser tabs with inappropriate content
  - Discord messages with doxing info
  - Credit card visible on desk
  - Blood/gore in game exceeding rating
  - Bomb/terrorist imagery
  - Leaked DMs or private conversations
  - NSFW images in background
  - Controversial political symbols

### 3. Chat Box (Right Side - 20% width)

- **Normal State:** Supportive viewer messages, emotes, donations
- **Threat Examples:**
  - Hate speech or slurs
  - Doxing attempts (sharing personal info)
  - Sexual harassment
  - Spam attacks
  - Dangerous links
  - Impersonation of the VTuber
  - Harassment of other viewers
  - Suicide/self-harm encouragement

## Game Mechanics

### Masking System

- **Click to Mask:** Players click directly on the problematic element
- **Mask Visual:** A pixelated blur, black bar, or cute sticker covers the area
- **Mask Types:** Different threats might require different mask styles
  - Blur for personal info
  - Black bar for inappropriate gestures
  - Cute emoji for mild issues
  - Ban hammer for chat messages

### Difficulty Progression

- **Early Game (0-2 min):** 1 threat at a time, 5+ seconds to respond
- **Mid Game (2-5 min):** Multiple threats, 3-4 seconds to respond
- **Late Game (5+ min):** Rapid-fire threats, simultaneous issues, 2 seconds to respond

### Scoring System (Position-Based)

- **Base Points:** +100 per successful mask
- **Early Mask Bonus:** Up to +100 extra for masking threats in the bottom half of chat (scales linearly — earlier = more points)
- **False Positive:** -50 points + small emotional penalty + viewer loss

### Emotional Value (HP System)

- **Emotional Value:** Continuous bar (0–100), starts at 100
- **Represents:** The VTuber's emotional state / stream mood
- **Natural Fluctuation:** Small random changes every ~3s (±0.5) + chat sentiment nudges
- **Missed Threat:** -15 emotional value
- **False Positive:** -5 emotional value
- **Early Mask Recovery:** +0–2 emotional value when masking threats in bottom half of chat
- **Game Over:** Emotional value reaches 0
- **Visual:** Gradient bar (green→yellow→red) with emoji indicator (😊/😐/😢)

### Viewer Count System

- **Separate from score** — viewers grow organically over time
- **Base Growth Rate:** 1 viewer/sec, accelerates when threats are masked
- **Viewer Rate Boost:** +0.5 per mask, capped at 10/sec
- **Missed Threat Penalty:** -50 viewers, growth rate resets to base
- **Displayed** in the platform header as live viewer count

### Chat System (Fixed-Size, Position-Based Danger)

- **Fixed capacity:** 15 visible messages, no scrollbar
- **New messages push old ones off the top** — this is how threats expire
- **Position = Danger:** Threats at the bottom (just appeared) look normal. As they scroll toward the top, they turn increasingly red. Top ~15% triggers flashing.
- **Strategic depth:** Players must prioritize — mask threats early for bonus points and emotional recovery, or risk them reaching the danger zone

### False Positives (Anti-Spam Mechanic)

To prevent players from clicking everything:

- Not everything needs to be masked
- Masking normal content reduces stream health
- Examples of normal content:
  - Positive chat messages
  - Appropriate game content
  - Normal VTuber expressions
  - Regular desktop apps

## Additional Features

### Power-ups/Tools (Optional)

- **Slow-Mo:** Slows threat appearance for 5 seconds
- **Scanner:** Highlights problematic elements for 3 seconds
- **Auto-Mask:** Automatically masks next threat
- **Freeze Chat:** Pauses chat messages for 5 seconds

### End Game Report

- **Final Score:** Based on successful masks
- **Grade:** S/A/B/C/D based on performance
- **Statistics:**
  - Total threats masked
  - Accuracy percentage
  - Threats by category
- **Streamer Reaction:** VTuber thanks you based on performance

## Meta Themes

### The Double Meaning of "Mask"

1. **Literal:** Censoring/masking inappropriate content
2. **Metaphorical:** The VTuber persona is itself a mask hiding the real person
3. **Player Role:** You're protecting the mask/illusion of the perfect VTuber
4. **Narrative Hook:** Occasional threats that hint at the real person behind the avatar

### Satirical Commentary

The game can gently satirize:

- Parasocial relationships in streaming culture
- The pressure on content creators to maintain a perfect image
- The often-invisible moderation work that keeps online spaces "clean"
- The disconnect between online persona and reality

## Visual Style

### Art Direction

- **UI Style:** Modern streaming interface (inspired by Twitch/YouTube)
- **VTuber Model:** Anime-style 2D or simple 3D chibi model
- **Color Scheme:** Bright, pastel colors for normal state; red alerts for threats
- **Mask Effect:** Playful censorship styles (pixels, bars, cute stickers)

### Animation

- **VTuber Idle:** Breathing, blinking, subtle movements
- **Threat Appearance:** Quick flash or subtle warning before full reveal
- **Masking Action:** Satisfying stamp/cover animation
- **UI Feedback:** Shake on failure, glow on success

## Audio Design

### Music

- **Main Theme:** Upbeat, cute electronic music (chiptune or J-pop style)
- **Tension Layers:** Music intensity increases with unmasked threats

### Sound Effects

- **Threat Appears:** Subtle alert sound (not too jarring)
- **Successful Mask:** Satisfying stamp/click sound
- **Missed Threat:** Viewer gasp or groan
- **Game Over:** Stream "ended" notification sound

### VTuber Voice (Optional)

- Brief voice lines for different situations
- "Ah!" when threat appears nearby
- "Thank you!" when threat is masked
- "E-eh?" when unusual event happens

## Technical Scope (Game Jam Appropriate)

### Minimum Viable Product (MVP)

- 3 UI sections (VTuber, Stream, Chat)
- 5-10 different threat types
- Basic clicking to mask mechanic
- Simple scoring system
- 5-minute game duration
- Basic visual and audio feedback

### Nice to Have

- Multiple mask styles
- Power-ups
- Difficulty scaling
- End game statistics
- Multiple VTuber characters/skins

### Stretch Goals

- Local leaderboard
- Daily challenges
- Unlockable VTuber models
- Story mode with narrative
- Sound effect variations

## Accessibility Considerations

- **Colorblind Mode:** Red alerts also include icons/symbols
- **Visual Indicators:** Multiple cues for threats (color, icon, sound)
- **Difficulty Settings:** Adjustable reaction time windows
- **Clear Feedback:** Obvious success/failure states
- **Tutorial:** Clear explanation of mechanics

## Replayability

- **Score Chasing:** Beat your high score
- **Different Threat Patterns:** Semi-randomized threat appearances
- **Challenge Modes:**
  - "Easy Mode" - Longer reaction times
  - "Hard Mode" - Shorter times, more simultaneous threats
  - "Chaos Mode" - Everything goes wrong at once
- **Achievement System:**
  - "Perfect Stream" - No missed threats
  - "Speed Demon" - Mask 10 threats in 5 seconds

## Development Priorities

### Day 1: Core Systems

- Basic UI layout
- Click detection and masking
- Threat spawning system
- Basic scoring

### Day 2: Content & Polish

- Create all threat types
- Add visual/audio feedback
- Create VTuber animations

### Day 3: Balance & Testing

- Difficulty balancing
- Bug fixing
- Juice and polish
- Playtesting and iteration

## Success Metrics

A successful implementation should:

1. Be immediately understandable (clear tutorial/instructions)
2. Create tension and urgency (time pressure)
3. Feel satisfying to play (good feedback)
4. Have a clear difficulty curve
5. Be replayable (score chasing)
6. Fit the "mask" theme both literally and metaphorically
