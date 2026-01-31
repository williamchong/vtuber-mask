export interface NormalMessage {
  text: string
  sentiment: 1 | 0 | -1
}

export const normalMessages: NormalMessage[] = [
  // Positive
  { text: 'Hi everyone! 👋', sentiment: 1 },
  { text: 'This is so fun!', sentiment: 1 },
  { text: 'PogChamp', sentiment: 1 },
  { text: 'Love your content!', sentiment: 1 },
  { text: 'First time watching, this is great', sentiment: 1 },
  { text: 'lol that was hilarious', sentiment: 1 },
  { text: 'GG', sentiment: 1 },
  { text: 'lets goooo', sentiment: 1 },
  { text: 'Hello from Brazil! 🇧🇷', sentiment: 1 },
  { text: 'your voice is so soothing', sentiment: 1 },
  { text: 'stream more pls!!', sentiment: 1 },
  { text: 'Gave my sub today 💜', sentiment: 1 },
  { text: 'big fan since day 1', sentiment: 1 },
  { text: 'this stream is amazing', sentiment: 1 },
  { text: 'so cute!!', sentiment: 1 },
  { text: 'W stream', sentiment: 1 },
  { text: 'OMG that was so good', sentiment: 1 },
  { text: 'vibing 🎵', sentiment: 1 },
  { text: 'this is my fav stream', sentiment: 1 },

  // Neutral
  { text: 'Can you say hi to me?? 🥺', sentiment: 0 },
  { text: 'anyone else from Japan?', sentiment: 0 },
  { text: 'KEKW', sentiment: 0 },
  { text: 'LOL', sentiment: 0 },
  { text: 'who else is watching at 3am', sentiment: 0 },
  { text: 'can we get a song?', sentiment: 0 },
  { text: 'chat is moving so fast', sentiment: 0 },
  { text: '😂😂😂', sentiment: 0 },
  { text: 'sending love from Europe!', sentiment: 0 },
  { text: 'yoooo', sentiment: 0 },
  { text: 'hey chat!', sentiment: 0 },

  // Negative
  { text: 'this is kinda boring ngl', sentiment: -1 },
  { text: 'meh', sentiment: -1 },
  { text: 'when does it get good', sentiment: -1 },
  { text: 'I expected more tbh', sentiment: -1 },
  { text: 'seen better streams today', sentiment: -1 },
  { text: 'ResidentSleeper', sentiment: -1 },
  { text: 'chat is dead', sentiment: -1 },
  { text: 'zzzz', sentiment: -1 },
  { text: 'is this it?', sentiment: -1 },
  { text: 'mid content honestly', sentiment: -1 },
]

export type ThreatType = 'hate-speech' | 'dox' | 'spam' | 'scam' | 'spoiler'

export interface ThreatMessage {
  text: string
  type: ThreatType
}

export const threatMessages: ThreatMessage[] = [
  { text: "You're so ugly, why do you even stream", type: 'hate-speech' },
  { text: 'Nobody likes you, just quit already', type: 'hate-speech' },
  { text: 'Go away loser, nobody asked', type: 'hate-speech' },
  { text: "You're the worst streamer I've ever seen", type: 'hate-speech' },
  { text: 'Untalented hack, stop streaming', type: 'hate-speech' },
  { text: 'kys honestly', type: 'hate-speech' },
  { text: 'I found your address: 123 Maple Street', type: 'dox' },
  { text: 'Your real name is Sarah right? I looked it up', type: 'dox' },
  { text: 'I know where you live, 456 Oak Avenue', type: 'dox' },
  { text: "Isn't your phone number 555-0142?", type: 'dox' },
  { text: 'BUY FOLLOWERS CHEAP at totallylegit.com!!!', type: 'spam' },
  { text: '🔥🔥🔥 FREE GIFT CARDS click my profile 🔥🔥🔥', type: 'spam' },
  { text: 'FOLLOW MY CHANNEL FOLLOW MY CHANNEL FOLLOW MY CHANNEL', type: 'spam' },
  { text: 'Get rich quick! DM me for crypto tips 💰💰💰', type: 'scam' },
  { text: 'I can get you verified for $50, DM me', type: 'scam' },
  { text: "Send me your login and I'll boost your account", type: 'scam' },
  { text: "The villain is actually the hero's brother btw", type: 'spoiler' },
  { text: 'She dies at the end of the movie lol', type: 'spoiler' },
  { text: 'The killer is the detective, I just saved you 2 hours', type: 'spoiler' },
]

export const usernames = [
  'xXGamerXx',
  'CuteViewer42',
  'StreamFan99',
  'NightOwl_',
  'PixelDream',
  'ChatLurker',
  'HypeSquad7',
  'Moonbeam22',
  'VibeCheck_',
  'StarGazer88',
  'CozyVibes',
  'CloudNine',
  'SunnyDay_',
  'AquaMarine',
  'GlowUp100',
  'NekoFan_',
  'BreezeWave',
  'Sparkle55',
  'ChillZone',
  'LunaLight',
]

export const usernameColors = [
  '#ff7eb3',
  '#7eb3ff',
  '#7eff9e',
  '#ffe07e',
  '#c07eff',
  '#ff7e7e',
  '#7edcff',
  '#ffb87e',
  '#7effea',
  '#e8ff7e',
]
