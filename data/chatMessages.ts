export const normalMessages = [
  'Hi everyone! 👋',
  'This is so fun!',
  'PogChamp',
  'Love your content!',
  'First time watching, this is great',
  'lol that was hilarious',
  'Can you say hi to me?? 🥺',
  'GG',
  'lets goooo',
  'anyone else from Japan?',
  'KEKW',
  'Hello from Brazil! 🇧🇷',
  'your voice is so soothing',
  'stream more pls!!',
  'Gave my sub today 💜',
  'LOL',
  'big fan since day 1',
  'this stream is amazing',
  'who else is watching at 3am',
  'so cute!!',
  'can we get a song?',
  'W stream',
  'chat is moving so fast',
  '😂😂😂',
  'sending love from Europe!',
  'OMG that was so good',
  'yoooo',
  'hey chat!',
  'vibing 🎵',
  'this is my fav stream',
]

export type ThreatType = 'hate-speech' | 'dox'

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
