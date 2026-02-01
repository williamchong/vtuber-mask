# VTuber Mask - UI/UX Design Document

> **Note:** This document was written during pre-production. The overall layout (50/50 split, VTuber overlay, color scheme) was implemented as designed. However, the Game HUD is inline in the header/bars rather than a top-left overlay, there is no combo system, and the chat uses fixed 15 messages without scrolling instead of 18-20 with auto-scroll. See the actual components for current UI.

## Design Philosophy

**Core Principles:**

1. **Immediate Clarity:** Players should instantly understand what's happening
2. **Visual Hierarchy:** Threats must stand out from normal content
3. **Satisfying Feedback:** Every action should feel responsive and rewarding
4. **Authentic Streaming Feel:** UI should mimic real streaming platforms
5. **Accessibility First:** Design for colorblind players and various skill levels

## Screen Layout

### Overall Composition (1280x720 base resolution) - UPDATED

**Based on real VTuber streaming layouts with full-height chat**

```
┌──────────────────────────────────────────────────────────────────┐
│  🎭 VTuber Mask • Protect the Stream! • 👁 1.2K viewers          │ Header (60px)
├───────────────────────────────────┬──────────────────────────────┤
│                                   │                              │
│      MAIN STREAM VIEW (50%)       │   💬 STREAM CHAT (50%) [⚙️]  │
│                                   │ ──────────────────────────── │
│   [Game/Desktop Content]          │ 👤 User1: Hi! 👋            │
│                                   │ 👤 User2: Amazing!          │
│  ┌──────────────┐                 │ 👤 User3: Love it           │
│  │  ┌────────┐  │ VTuber Overlay  │ 👤 User4: PogChamp          │
│  │  │VTuber │  │                  │ ⚠️👤 User5: [THREAT]       │
│  │  │Avatar │  │                  │ 👤 User6: Great job!        │
│  │  │🔴LIVE │  │                  │ 👤 User7: Nice combo!       │
│  │  └────────┘  │                 │ 👤 User8: Awesome stream!   │
│  └──────────────┘                 │ ⚠️👤 User9: [THREAT]       │
│  ┌─────────────┐ Game HUD         │ 👤 User10: Keep it up!      │
│  │Score: 1500 │                   │ 👤 User11: Love this!       │
│  │Combo: 5x ⚡│                   │ 👤 User12: Great stream     │
│  │Health: ▓▓▓░│                   │ 👤 User13: PogChamp         │
│  └─────────────┘                  │ ⚠️👤 User14: [THREAT]      │
│                                   │ 👤 User15: Amazing work!    │
│                                   │ 👤 User16: Best streamer    │
│                                   │ 👤 User17: Love it!         │
│                                   │ ⬇️ Auto-scrolling...         │
├───────────────────────────────────┴──────────────────────────────┤
│ 🔴 LIVE • Reaction Game • ⭐ Subscribe • 💬 Chat Rules           │ Info (50px)
└──────────────────────────────────────────────────────────────────┘

Proportions (Optimized for Gameplay):
- Stream Panel: 50% width (640px) - Game content with fewer threats
- Chat Panel: 50% width (640px) - PRIMARY THREAT SOURCE
- VTuber Overlay: 220px × 180px - Overlays bottom-right of stream
- Game HUD: 180px × 100px - Overlays top-left of stream
- Platform Header: 60px height
- Stream Info Bar: 50px height
- Content Height: 610px (720 - 60 - 50)

Gameplay Rationale:
✅ Chat is 50% width - MOST threats appear here (hate speech, doxxing, spam)
✅ Chat messages are SMALL targets - need more space to click accurately
✅ Stream is 50% width - FEWER threats (personal info, browser tabs)
✅ Stream threats are LARGER targets - easier to click
✅ Equal split prioritizes gameplay over realism
✅ VTuber overlaps stream (fewest threats, smallest area needed)

Threat Distribution (Expected):
- Chat: 60% of all threats (many small message-based threats)
- Stream: 30% of all threats (fewer but larger overlay threats)
- VTuber: 10% of all threats (occasional gesture/glitch threats)

Key Features:
✅ Chat is FULL COLUMN HEIGHT with 50% width (maximum threat visibility)
✅ VTuber overlaps stream in bottom-right corner (authentic overlay style)
✅ Game HUD overlaps stream in top-left (keeps stream clean)
✅ Equal stream/chat split optimizes for click accuracy
✅ More space for chat = easier to identify and click threat messages
```

## Color Scheme

### Primary Palette

```
Main Background:     #1a1a2e (Dark blue-black)
Panel Background:    #16213e (Slightly lighter blue-black)
Accent Primary:      #e94560 (Vibrant pink/red - for alerts)
Accent Secondary:    #0f3460 (Deep blue - for UI elements)
Success Green:       #00ff88 (Bright green - for successful masks)
Warning Orange:      #ffaa00 (Orange - for medium severity)
Danger Red:          #ff3355 (Red - for high severity)
Text Primary:        #ffffff (White)
Text Secondary:      #a0a0c0 (Light purple-gray)
```

### Threat Color Coding

- **Low Severity:** Yellow glow (#ffaa00)
- **Medium Severity:** Orange glow (#ff6b35)
- **High Severity:** Red glow (#ff3355)
- **Pulsing Effect:** Increases in intensity as time runs out

### UI State Colors

- **Normal State:** Neutral blues and purples
- **Combo Active:** Gold/yellow highlights (#ffd700)
- **Low Health:** Red border pulse
- **Perfect Clear:** Rainbow shimmer effect

## Typography

### Font Choices

```css
/* Main UI Font - Clean, modern */
--font-ui: 'Inter', 'Segoe UI', system-ui, sans-serif;

/* Streamer Name, Headers - Playful */
--font-display: 'Fredoka', 'Comic Sans MS', cursive;

/* Chat Messages - Readable */
--font-chat: 'Roboto', 'Arial', sans-serif;

/* Score/Numbers - Bold, clear */
--font-numbers: 'Orbitron', 'Courier New', monospace;
```

### Size Scale

```css
--text-xs: 12px; /* Chat usernames, small labels */
--text-sm: 14px; /* Chat messages, secondary info */
--text-md: 16px; /* Body text, UI labels */
--text-lg: 20px; /* Panel headers */
--text-xl: 28px; /* Score display */
--text-2xl: 36px; /* Combo counter */
--text-3xl: 48px; /* Game over screen */
```

## Component Designs

### 0. Platform Header (NEW - Top Bar)

```
┌─────────────────────────────────────────────────────────────────┐
│ 🎭 VTuber Mask • Protect the Stream! • 👁 1.2K viewers • ⚙️     │
└─────────────────────────────────────────────────────────────────┘
```

**Position:** Very top of screen
**Height:** 60px
**Purpose:** Mimics YouTube/Twitch platform UI

**Visual Design:**

- Background: Solid dark (#0f0f1e)
- Border bottom: 1px rgba(255,255,255,0.1)
- Left section: Game logo + title
- Center section: Stream title
- Right section: Viewer count + settings icon

**Elements:**

- Game logo (32×32px icon)
- Stream title (18px, medium weight)
- Live viewer count (animated, updates every 5s)
- Settings icon (for pause menu)

### 1. Game HUD (In-Game Overlay)

```
┌──────────────┐
│ 💯 2,450     │
│ 🔥 12x COMBO │
│ ❤️ ▓▓▓░░ 60% │
└──────────────┘
```

**Position:** Top-left corner of stream panel (overlay)
**Dimensions:** 180px × 100px

**Visual Design:**

- Semi-transparent dark background (rgba(0,0,0,0.7))
- Backdrop blur (10px)
- Rounded corners (12px)
- Subtle border glow
- Score: Gold color when combo active, white normally
- Combo: Size scales with combo level (1.0x → 1.5x at 10+ combo)
- Health: Bar with gradient (green → yellow → red)

**Animations:**

- Score: Bounce up (+20px) when points added
- Combo: Pulse on each successful mask
- Health: Shake (±5px) when damage taken
- Glow intensifies with higher combo

### 2. VTuber Panel (Overlay on Stream - Bottom Right)

```
┌──────────────────┐
│   ╭─────────╮    │
│   │  ^_^    │    │  ← VTuber Model (Overlay)
│   │  │ │    │    │
│   ╰─────────╯    │
│ KawaiiChan 認証済│  ← Streamer Name + Badge
│ 🔴 LIVE  1.2K 👁│  ← Status + Viewers
└──────────────────┘
```

**Position:** Overlay on bottom-right corner of stream panel
**Dimensions:** 220px width × 180px height (compact overlay)
**Z-index:** Above stream content, below game HUD

**Visual Details:**

- Rounded corners (border-radius: 16px)
- Semi-transparent dark background with backdrop blur
- Gradient border (subtle glow effect)
- Model centered with padding
- Drop shadow for depth
- Idle breathing animation (2s cycle)
- **NEW:** Badge icon next to name (verified VTuber)
- **NEW:** Live indicator with viewer count inline

**Threat Visualization:**

- Inappropriate gesture: Overlay sprite on model
- Wardrobe malfunction: Glitch effect with pixelation
- Face reveal: Blur effect with photo overlay
- Warning indicator: Red outline pulse (2px, pulsing)
- Severity glow: Color-coded based on threat level

**Mask Effect:**

- Large emoji or pixelated blur covers the threat
- Animation: Scale from 0 → 1.2 → 1.0 (300ms)
- Stamp animation (scale from 0 to 1.2 to 1)
- Particles burst outward
- Satisfying "thunk" sound

### 3. Stream Panel (Main Content - Left Side)

```
┌────────────────────────────────────┐
│  ┌──────────────┐                  │
│  │ Score: 2,450│                   │
│  │ Combo: 5x ⚡ │                   │
│  │ Health: ▓▓▓░│                   │
│  └──────────────┘                  │
│                                    │
│    GAME/DESKTOP CONTENT            │  ← Main display area
│    (Threats appear here)           │
│                                    │
│                                    │
│                  ┌──────────────┐  │
│                  │   VTuber     │  │  ← VTuber Overlay
│                  │   Overlay    │  │
│                  └──────────────┘  │
└────────────────────────────────────┘
```

**Position:** Left side (50% of total width - gameplay optimized)
**Dimensions:** 640px width × 610px height (minus header/footer)

**Reasoning for 50%:**

- Stream threats are LARGER and FEWER (easier to spot and click)
- VTuber overlay adds visual interest without taking full column
- More space allocated to chat where MOST threats appear

**Content Types:**

1. **Game Footage:**
   - Animated GIF or video of gameplay
   - Could be placeholder retro game graphics

2. **Desktop View:**
   - Fake desktop with icons, folders
   - Browser window in foreground
   - Potential threat: tab with inappropriate content

3. **Video Player:**
   - Fake YouTube/video player interface
   - Playing innocent content normally

4. **Application Window:**
   - Discord, Twitter, or other apps
   - Threats appear as messages or notifications

**Threat Placement:**

- Overlays appear at specific positions
- Flash briefly before settling
- Glow effect around threat area
- Subtle pulse to draw attention

**Mask Styles:**

- **Black Bar:** For sensitive info (horizontal bar)
- **Pixelation:** For inappropriate images
- **Blur:** For personal information
- **Cute Sticker:** For mild issues (sparkle, heart, star)

### 4. Chat Panel (Right Side - FULL HEIGHT) - PRIMARY THREAT ZONE

```
┌────────────────────────────────┐
│ 💬 STREAM CHAT            [⚙️] │ ← Header
├────────────────────────────────┤
│ 🔰👤 User1: Hi everyone! 👋   │
│ ⭐👤 User2: Amazing stream!   │
│ 👤 User3: Love this content   │
│ 👤 User4: PogChamp PogChamp   │
│ ⚠️👤 User5: [THREAT MESSAGE]  │ ← Click to mask
│ 👤 User6: Great job streamer  │
│ 👤 User7: Nice combo there!   │
│ 👤 User8: This is awesome!    │
│ ⚠️👤 User9: [THREAT MESSAGE]  │ ← Click to mask
│ 👤 User10: Keep it up!        │
│ 👤 User11: Best stream ever   │
│ 👤 User12: PogChamp           │
│ 👤 User13: Wow amazing!       │
│ ⚠️👤 User14: [THREAT MESSAGE] │ ← Click to mask
│ 👤 User15: Love your content  │
│ 👤 User16: First time here!   │
│ 👤 User17: Subscribed!        │
│ 👤 User18: Great gameplay     │
│ ⬇️ Auto-scrolling...          │
└────────────────────────────────┘
```

**Position:** Right column - FULL HEIGHT (no VTuber section above)
**Dimensions:** 640px width × 610px height (50% of screen width, full content height)

**Why 50% width and full height:**

- **60% of ALL threats** appear in chat (hate speech, doxxing, harassment)
- Chat messages are **SMALL clickable targets** - need space for accuracy
- Can display **18-20 messages** at once (excellent threat visibility)
- Full height = maximum scrolling space for threat detection
- Equal split with stream optimizes for gameplay over realism
- Wider messages = easier to read and identify threats quickly

**Gameplay Priority:**
✅ PRIMARY threat source gets PRIMARY screen space
✅ More visible messages = faster threat identification
✅ Larger click targets = better accuracy under time pressure
✅ Full height = see more context for threat detection

**Message Structure:**

```html
<div class="chat-message [normal|threat]">
  <span class="username" style="color: [user-color]">Username:</span>
  <span class="message-text">Message content here</span>
  <span class="timestamp">10:23</span>
</div>
```

**Visual Design:**

- Dark background (#0e1621)
- Username colors: Random pastel colors
- Emojis and emoticons supported
- Messages fade in from bottom
- Auto-scroll to show latest

**Threat Visualization:**

- Red background highlight
- Warning icon (⚠️) before message
- Bold text
- Slight shake animation on appear
- Priority positioning (doesn't scroll away immediately)

**Mask Effect:**

- [CENSORED] or [BANNED] replaces message
- Red ❌ or 🔨 icon appears
- Message fades to gray
- Ban animation (crossed out)

**Updated Features (Based on Real Streams):**

- User badges: 🔰 (newbie), ⭐ (subscriber), 👑 (moderator)
- Timestamps: Added to each message
- User avatars: Small circular icons (optional)
- Hover effect: Highlight message on hover
- @ mentions: Highlighted in different color

### 5. Stream Info Bar (NEW - Bottom Bar)

```
┌─────────────────────────────────────────────────────────────────┐
│ 🔴 LIVE • Reaction Game • ⭐ Subscribe • 💬 Chat Rules • Share  │
└─────────────────────────────────────────────────────────────────┘
```

**Position:** Bottom of screen
**Height:** 50px
**Purpose:** Mimics YouTube/Twitch stream info bar

**Visual Design:**

- Background: Gradient from rgba(0,0,0,0.9) to rgba(0,0,0,0.7)
- Backdrop blur: 10px
- Border top: 1px rgba(255,255,255,0.1)

**Elements:**

- Left section:
  - 🔴 LIVE indicator (pulsing red dot)
  - Category tag
  - Viewer count (real-time)
- Center section:
  - Stream title/description
- Right section:
  - Subscribe button (fake, decorative)
  - Share button (optional)
  - Chat rules link (optional)

**Styling:**

```css
.stream-info-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  gap: 16px;
}

.live-indicator {
  color: #ff0000;
  font-weight: bold;
  animation: live-pulse 2s infinite;
}

@keyframes live-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
```

### 6. Mask Overlays

**Pixelation Mask:**

```
┌─────────┐
│░░▓▓░░▓▓│
│▓▓░░▓▓░░│
│░░▓▓░░▓▓│  Large pixel blocks
│▓▓░░▓▓░░│
└─────────┘
```

**Black Bar Mask:**

```
┌─────────┐
│         │
│█████████│  Solid black rectangle
│         │
└─────────┘
```

**Blur Mask:**

```
┌─────────┐
│░▒▓█▓▒░  │
│▒▓███▓▒  │  Gaussian blur effect
│░▒▓█▓▒░  │
└─────────┘
```

**Cute Sticker Mask:**

```
    ⭐
  ✨💫✨
    ⭐      Sparkles, hearts, stars
```

## Animation & Feedback

### Threat Appearance Sequence

```
0.0s: Warning glow begins (subtle)
0.5s: Threat element fades in
0.8s: Full opacity reached
1.0s: Glow intensifies
2.0s: Urgent pulsing begins
...
5.0s: Threat expires (if not masked)
```

### Successful Mask Sequence

```
0.0s: Click detected
0.1s: Mask animation starts (stamp effect)
0.2s: Sound effect plays
0.3s: Particle burst
0.4s: Score popup (+150!)
0.6s: Combo counter updates
1.0s: Animation complete
```

### Missed Threat Sequence

```
0.0s: Threat expires or escapes notice
0.1s: Health bar flashes red
0.2s: Screen shake effect
0.3s: "MISSED!" text appears
0.4s: Damage sound effect
0.6s: Combo resets to 0
1.0s: Normal state resumes
```

### Combo Effects

```
3x Combo:  Border glow (yellow)
5x Combo:  Intensified glow + size increase
10x Combo: Rainbow border, particle effects
15x Combo: Screen border pulses
20x Combo: Full screen effects, epic sound
```

## UI States

### 1. Main Menu

```
┌─────────────────────────────────────┐
│                                     │
│        VTUBER MASK 🎭               │
│     Protect the Stream!             │
│                                     │
│         [START GAME]                │
│         [HOW TO PLAY]               │
│         [SETTINGS]                  │
│                                     │
│     Made for Global Game Jam 2026  │
└─────────────────────────────────────┘
```

**Visual Style:**

- Animated background (subtle particle effects)
- Large logo/title with glow effect
- Buttons with hover effects
- Pastel color scheme

### 2. Tutorial/How to Play

```
┌─────────────────────────────────────┐
│         HOW TO PLAY                 │
├─────────────────────────────────────┤
│  1. Watch the stream 👀             │
│  2. Click dangerous content 🚫      │
│  3. Mask it before viewers see! 🎭  │
│                                     │
│  🎯 Build combos for bonus points   │
│  ❤️ Don't let health reach zero     │
│  ⚠️ Don't mask normal content!      │
│                                     │
│         [GOT IT!]                   │
└─────────────────────────────────────┘
```

### 3. Active Gameplay

- Full interface as described above
- Minimal UI chrome, maximum playfield
- Persistent HUD
- Dynamic threat spawning

### 4. Pause Menu

```
┌─────────────────────────────────────┐
│           ⏸️ PAUSED                 │
├─────────────────────────────────────┤
│      Score: 2,450                   │
│      Combo: 12x                     │
│      Health: 60%                    │
│                                     │
│         [RESUME]                    │
│         [RESTART]                   │
│         [QUIT]                      │
└─────────────────────────────────────┘
```

### 5. Game Over Screen

```
┌─────────────────────────────────────┐
│       STREAM ENDED 💔               │
├─────────────────────────────────────┤
│    FINAL SCORE: 3,250               │
│    GRADE: B                         │
│                                     │
│    📊 STATISTICS:                   │
│    Threats Masked: 28/32            │
│    Max Combo: 15x                   │
│    Accuracy: 87.5%                  │
│    Time Survived: 4:32              │
│                                     │
│    [PLAY AGAIN]  [MAIN MENU]        │
└─────────────────────────────────────┘
```

**Grade Calculation:**

- S: 95%+ accuracy, 4+ min survived
- A: 85%+ accuracy, 3+ min survived
- B: 70%+ accuracy, 2+ min survived
- C: 50%+ accuracy, any time
- D: Below 50% or died early

## Accessibility Features

### Visual Accessibility

1. **High Contrast Mode:**
   - Increase border thickness
   - Stronger color differentiation
   - Disable subtle animations

2. **Colorblind Modes:**
   - Icon indicators in addition to colors
   - Patterns/shapes for severity levels
   - Red/Green alternatives

3. **Threat Indicators:**
   - Not color-dependent
   - Shape outlines (triangle for high severity, circle for low)
   - Icons to indicate threat type

### Difficulty Accessibility

1. **Easy Mode:**
   - 7-second reaction time
   - Fewer simultaneous threats
   - Clearer visual indicators
   - More forgiving health system

2. **Practice Mode:**
   - No time limit
   - See threat type labels
   - Unlimited health
   - Learn threat patterns

3. **Slow Motion Toggle:**
   - Reduce game speed to 50%
   - For players who need more time

## Z-Index Layering

**Visual Hierarchy (from top to bottom):**

```
Layer 100: Game HUD (top-left overlay)
  ↓
Layer 50:  VTuber Overlay (bottom-right of stream)
  ↓
Layer 10:  Threat Overlays (on stream content)
  ↓
Layer 1:   Stream Content (base layer)
  ↓
Layer 0:   Background
```

**CSS Implementation:**

```css
.stream-content {
  z-index: 1;
}

.threat-overlay {
  z-index: 10;
}

.vtuber-overlay {
  z-index: 50;
}

.game-hud {
  z-index: 100;
}
```

## Precise Positioning

### VTuber Overlay (Bottom-Right Corner)

**Position Specifications:**

```css
.vtuber-overlay {
  position: absolute;
  bottom: 16px; /* 16px from bottom edge */
  right: 16px; /* 16px from right edge */
  width: 220px;
  height: 180px;
  z-index: 50;

  /* Visual styling */
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95));
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

**Corner Placement Diagram:**

```
Stream Panel (640px × 610px)
┌────────────────────────────┐
│                            │
│    Stream Content          │
│                            │
│                            │
│                            │
│                            │
│                            │
│                            │
│                 ┌────────┐ │ ← 16px gap
│                 │VTuber  │ │
│                 │220×180 │ │
│                 └────────┘ │
└────────────────────────────┘
                  ↑
                16px gap
```

### Game HUD (Top-Left Overlay)

**Position Specifications:**

```css
.game-hud {
  position: absolute;
  top: 16px; /* 16px from top edge */
  left: 16px; /* 16px from left edge */
  width: 180px;
  min-height: 100px;
  z-index: 100;

  /* Visual styling */
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px;
}
```

**Top-Left Placement Diagram:**

```
Stream Panel (640px × 610px)
┌────────────────────────────┐
│ ┌────────┐                 │ ← 16px gap
│ │HUD     │                 │
│ │180×100 │                 │
│ └────────┘                 │
│  ↑                         │
│ 16px gap                   │
│                            │
│    Stream Content          │
│                            │
│                            │
│                            │
└────────────────────────────┘
```

## Responsive Design

### Desktop (1280×720+) - Primary Target

**Layout:** 50% Stream | 50% Chat

```
┌──────────────────────────────┬──────────────────────────────┐
│         Stream (640px)        │         Chat (640px)         │
│                              │                              │
│  ┌───┐ HUD        ┌────┐     │  18-20 messages visible      │
│  └───┘            │VTub│     │                              │
│                   └────┘     │  Full height scrolling       │
└──────────────────────────────┴──────────────────────────────┘
```

- VTuber overlay in bottom-right of stream
- Game HUD in top-left of stream
- Chat full height with 50% width
- Optimal click accuracy

### Tablet (768px - 1280px)

**Layout:** 50% Stream | 50% Chat (maintained)

- Slightly smaller VTuber overlay (200×160px)
- Compressed spacing (12px gaps instead of 16px)
- Smaller font sizes
- Maintain 50/50 split for gameplay

### Mobile (< 768px) - Vertical Stack

**Layout:** Vertical stacking prioritizing gameplay

```
┌────────────────┐
│ Header         │ 50px
├────────────────┤
│ Stream         │ 50% of remaining
│ (VTuber        │
│  overlay)      │
├────────────────┤
│ Chat           │ 50% of remaining
│ (scrollable)   │
│                │
├────────────────┤
│ Info Bar       │ 40px
└────────────────┘
```

- Stream and Chat stack vertically
- Each gets 50% of available height
- VTuber overlay smaller (180×140px)
- Chat shows 10-12 messages
- Touch-optimized click targets
- VTuber appears as small icon
- Reduced threat complexity

## Sound Design Integration

### UI Sound Cues

- **Menu Navigation:** Soft click
- **Button Hover:** Subtle beep
- **Start Game:** Rising tone
- **Threat Appears:** Alert chirp (pitch varies by severity)
- **Successful Mask:** Satisfying "stamp" sound
- **Combo Build:** Musical notes ascending
- **Damage Taken:** Discord notification sound (ironic)
- **Game Over:** Sad trombone or "stream ended" notification

### Music Layers

- **Base Layer:** Cute chiptune melody
- **+3 Combo:** Add rhythm layer
- **+7 Combo:** Add harmony layer
- **+10 Combo:** Full orchestration
- **Low Health:** Music becomes tense, add heartbeat

## Polish & Juice

### Particle Effects

- Successful mask: Confetti burst
- High combo: Sparkles around score
- Damage: Screen shake + red flash
- Perfect wave: Rainbow shimmer

### Screen Effects

- **Combo Glow:** Border glows brighter with combo
- **Vignette:** Darkens at low health
- **Color Shift:** Slight red tint when in danger
- **Slow-Mo:** Brief slow-motion on close calls

### Micro-interactions

- Buttons: Scale up 5% on hover
- Panels: Subtle float animation
- VTuber: Blink randomly, react to events
- Chat: Messages bounce in slightly

### Dynamic Elements

- Viewer count slowly increases over time
- Occasional normal "donation" messages
- VTuber idle variations (stretching, waving)
- Background ambient animations

## Visual Asset Checklist

### VTuber Assets

- [ ] Base model (idle pose)
- [ ] 5-8 expression variations
- [ ] 3-5 gesture sprites
- [ ] Glitch/malfunction overlay
- [ ] Face reveal overlay (blurred photo)

### Stream Content Assets

- [ ] 3-4 different "game" backgrounds
- [ ] Desktop mockup
- [ ] Browser window template
- [ ] Video player template
- [ ] Personal info overlays (address, credit card, etc.)
- [ ] Inappropriate content placeholders

### Mask Assets

- [ ] Pixelation overlay (tileable)
- [ ] Black bar (stretchable)
- [ ] Blur shader/image
- [ ] 5-10 cute stickers (stars, hearts, etc.)
- [ ] Ban hammer icon
- [ ] Censored stamp

### UI Elements

- [ ] Heart icons (full/empty)
- [ ] Combo flame icon
- [ ] Severity warning icons
- [ ] Grade medals (S/A/B/C/D)
- [ ] Button backgrounds
- [ ] Panel backgrounds

### Effects

- [ ] Particle sprites (confetti, sparkles)
- [ ] Glow overlays
- [ ] Screen shake shader
- [ ] Transition wipes

## Implementation Priority

### Phase 1: Core Layout ✅ CRITICAL

1. **Create 50/50 split layout**
   - Stream container: 50% width (640px), relative positioning
   - Chat panel: 50% width (640px), full height
   - Platform header: Full width, 60px
   - Stream info bar: Full width, 50px

2. **Position overlays correctly**
   - VTuber overlay: Absolute position, bottom: 16px, right: 16px
   - Game HUD: Absolute position, top: 16px, left: 16px
   - Set correct z-index values (1, 10, 50, 100)

3. **Implement chat full-height scrolling**
   - Chat messages container with overflow-y: auto
   - Display 18-20 messages
   - Auto-scroll to bottom on new messages

### Phase 2: Visual Identity

1. **Implement color scheme**
   - Platform UI colors (#0f0f1e header, gradient footer)
   - Chat background (#1f1f23)
   - Threat highlighting (rgba red with pulse)
   - Backdrop blur effects

2. **Add typography**
   - Platform fonts (system fonts for performance)
   - Chat message sizing (14px for readability)
   - Username styling with custom colors

3. **Create panel aesthetics**
   - VTuber overlay: Semi-transparent with backdrop blur
   - Game HUD: Dark overlay with blur
   - Rounded corners (12px)
   - Subtle borders and shadows

### Phase 3: Interactive Elements

1. **Click detection**
   - Chat messages clickable
   - Stream threat overlays clickable
   - VTuber threat areas clickable
   - False positive detection

2. **Visual feedback**
   - Hover states on chat messages
   - Threat pulse animations
   - Click ripple effects
   - Mask stamp animations

### Phase 4: Animations & Polish

1. **Threat animations**
   - Threat appearance (fade + pulse)
   - Urgency pulse (faster as time runs out)
   - Mask application (stamp effect)

2. **UI animations**
   - Score bounce on update
   - Combo glow effect
   - Health bar color transition
   - Screen shake on damage

3. **Particle effects**
   - Confetti on successful mask
   - Sparkles at high combo
   - Damage flash

### Phase 5: Responsive & Accessibility

1. **Responsive breakpoints**
   - Desktop (1280+): Full layout
   - Tablet (768-1280): Maintain 50/50, smaller overlays
   - Mobile (<768): Vertical stack

2. **Accessibility features**
   - Keyboard navigation support
   - Screen reader labels
   - High contrast mode
   - Colorblind-friendly indicators

## Design Validation

### Gameplay Testing:

- [ ] Can I identify threats within 1 second?
- [ ] Are chat threats easy to click accurately?
- [ ] Is the VTuber overlay visible but not intrusive?
- [ ] Does 50/50 split feel balanced for gameplay?
- [ ] Can I see 18-20 chat messages clearly?

### Visual Testing:

- [ ] Is the feedback satisfying?
- [ ] Does the UI feel like a real stream?
- [ ] Are combos exciting visually?
- [ ] Is damage/danger immediately clear?
- [ ] Are masked areas obviously censored?

### Technical Testing:

- [ ] Does it work for colorblind players?
- [ ] Is performance smooth (60fps)?
- [ ] Do overlays layer correctly?
- [ ] Does chat auto-scroll properly?
- [ ] Are click targets large enough?

### Accessibility Testing:

- [ ] Can navigate with keyboard only?
- [ ] Do screen readers work correctly?
- [ ] Is text readable at all sizes?
- [ ] Are contrast ratios sufficient?

## Key Measurements Summary

```
Total Resolution: 1280px × 720px

Header:     1280px × 60px
Content:    1280px × 610px
  - Stream: 640px × 610px (left, relative positioning)
  - Chat:   640px × 610px (right, full height)
Info Bar:   1280px × 50px

Overlays (on Stream):
  - VTuber:   220px × 180px (bottom-right, 16px gaps)
  - Game HUD: 180px × 100px (top-left, 16px gaps)

Z-Index Layers:
  - Stream Content: z-index: 1
  - Threat Overlays: z-index: 10
  - VTuber Overlay: z-index: 50
  - Game HUD: z-index: 100
```

## Final Layout Notes

**Critical Features:**

- ✅ 50/50 split optimized for gameplay (chat has 60% of threats)
- ✅ VTuber in **bottom-right corner** of stream (overlay style)
- ✅ Chat is **full height** for maximum threat visibility
- ✅ Game HUD in top-left (non-intrusive)
- ✅ Platform header and info bar for authentic streaming feel

**Gameplay Optimization:**

- Chat messages are small targets → need 50% width for accuracy
- Stream threats are larger → need less space
- VTuber threats are rare → can be small overlay
- Equal split balances realism with playability

**Visual Hierarchy:**

- Game HUD always visible (z-index: 100)
- VTuber visible but doesn't block important content
- Chat dominates right side for threat scanning
- Stream content remains primary focus

**This layout provides the best balance between authentic streaming aesthetics and optimal reaction-based gameplay.**
