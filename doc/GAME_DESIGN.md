# VTuber Mask - Game Design Document

## Game Concept

**Title:** VTuber Mask (working title)
**Theme:** Mask (Global Game Jam 2026)
**Genre:** Reaction-based, Time Management, Simulation
**Platform:** Web Browser
**Target Duration:** 5-10 minute gameplay sessions

## Core Concept

Players take on the role of a content moderator for a VTuber live stream. While the stream plays normally, dangerous or inappropriate elements occasionally appear that must be quickly identified and "masked" (censored) before viewers notice. The game explores the dual meaning of "mask" - both the literal censorship of content and the metaphorical mask that VTubers wear to hide their real identity.

## Narrative Frame

You are the behind-the-scenes moderator for a popular VTuber. Your job is to keep the stream "seiso" (pure/clean) by masking any problematic content before it damages the VTuber's reputation. The VTuber themselves is unaware of many issues happening on screen, relying on you to protect their image - their "mask" of perfection.

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

### Scoring System
- **Base Points:** +100 per successful mask
- **Speed Bonus:** +50 for masking within 1 second
- **Combo System:**
  - Consecutive successful masks multiply score
  - 3x combo: 1.5x points
  - 5x combo: 2x points
  - 10x combo: 3x points
  - Combo breaks on missed threat or false positive
- **Perfect Clear:** +500 bonus for masking all threats in a wave

### Health/Failure System
- **Stream Health:** Starts at 100%
- **Missed Threat:** -10% to -30% depending on severity
- **False Positive:** -5% (masking something innocent)
- **Game Over:** Stream health reaches 0%
- **Success:** Survive for target duration (5-10 minutes)

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

### Combo Bonuses
- **Visual Feedback:** Screen borders glow with combo color
- **Audio Cues:** Increasing pitch with combo level
- **Combo Counter:** Displayed prominently
- **Combo Milestone Rewards:**
  - 5 combo: Slow-mo for 3 seconds
  - 10 combo: Preview indicator (highlights next threat location)
  - 20 combo: Auto-mask one threat

### Power-ups/Tools (Optional)
- **Slow-Mo:** Slows threat appearance for 5 seconds
- **Scanner:** Highlights problematic elements for 3 seconds
- **Auto-Mask:** Automatically masks next threat
- **Freeze Chat:** Pauses chat messages for 5 seconds

### End Game Report
- **Final Score:** Based on successful masks and combos
- **Grade:** S/A/B/C/D based on performance
- **Statistics:**
  - Total threats masked
  - Highest combo
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
- **Combo Music:** Additional melodic layers at high combos

### Sound Effects
- **Threat Appears:** Subtle alert sound (not too jarring)
- **Successful Mask:** Satisfying stamp/click sound
- **Missed Threat:** Viewer gasp or groan
- **Combo:** Rising pitch chimes
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
- Combo system
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
  - "Combo Master" - Achieve 20x combo
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
- Implement combo system
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
