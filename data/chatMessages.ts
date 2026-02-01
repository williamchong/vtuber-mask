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

  // Positive - Chinese
  { text: '主播今天超可愛！😊', sentiment: 1 },
  { text: '別理酸民，我們支持你！💪', sentiment: 1 },
  { text: '你的直播超有趣的！👍', sentiment: 1 },
  { text: '你是我的偶像！❤️', sentiment: 1 },
  { text: '粉絲團守護你！🛡️', sentiment: 1 },
  { text: '主播辛苦了~😘', sentiment: 1 },
  { text: '你是最棒的！✨', sentiment: 1 },
  { text: '笑死我了😂', sentiment: 1 },
  { text: '支持你一輩子！👏', sentiment: 1 },
  { text: '加油💕', sentiment: 1 },
  { text: '聲音好療癒🎵', sentiment: 1 },
  { text: '❤️❤️❤️', sentiment: 1 },
  { text: '超專業的直播！😄', sentiment: 1 },
  { text: '正能量滿滿！🌈', sentiment: 1 },
  { text: '永遠支持！👍', sentiment: 1 },
  { text: '超愛你的直播😂', sentiment: 1 },

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

  // Neutral - Chinese
  { text: '有人台灣嗎？🇹🇼', sentiment: 0 },
  { text: '哈囉大家', sentiment: 0 },
  { text: '早安啊', sentiment: 0 },
  { text: '今晚唱什麼？🎤', sentiment: 0 },
  { text: '聊天室好快', sentiment: 0 },
  { text: '233333', sentiment: 0 },
  { text: '來自香港的👋', sentiment: 0 },
  { text: '大家好！', sentiment: 0 },

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

  // Negative - Chinese
  { text: '有點無聊', sentiment: -1 },
  { text: '想睡覺了', sentiment: -1 },
  { text: '這就沒了？', sentiment: -1 },
  { text: '普通而已', sentiment: -1 },
]

export type ThreatType = 'hate-speech' | 'dox' | 'spam' | 'scam'

export interface ThreatMessage {
  text: string
  type: ThreatType
}

export const threatMessages: ThreatMessage[] = [
  // Hate speech
  { text: "You're so ugly, why do you even stream", type: 'hate-speech' },
  { text: 'Nobody likes you, just quit already', type: 'hate-speech' },
  { text: 'Go away loser, nobody asked', type: 'hate-speech' },
  { text: "You're the worst streamer I've ever seen", type: 'hate-speech' },
  { text: 'Untalented hack, stop streaming', type: 'hate-speech' },
  { text: 'kys honestly', type: 'hate-speech' },

  // Hate speech - Chinese
  { text: '妳那張假臉像塑膠玩具，滾吧！', type: 'hate-speech' },
  { text: 'VTuber？只是躲在螢幕後的肥豬！', type: 'hate-speech' },
  { text: '妳的聲音像被車碾過的貓，難聽死了！', type: 'hate-speech' },
  { text: '假奶假屁股假一切，虛擬婊子！', type: 'hate-speech' },
  { text: '看到妳的臉就想吐，去死吧廢物！', type: 'hate-speech' },
  { text: '靠賣萌騙錢，現實中連乞丐都不如！', type: 'hate-speech' },
  { text: '妳是直播圈恥辱，去死一百次！', type: 'hate-speech' },
  { text: '虛擬形象再美，真人一定是醜八怪！', type: 'hate-speech' },
  { text: '妳的笑聲像鬼叫，賤人滾遠點！', type: 'hate-speech' },
  { text: '妳的存在就是對世界的詛咒！', type: 'hate-speech' },

  // Dox
  { text: 'I found your address: 123 Maple Street', type: 'dox' },
  { text: 'Your real name is Sarah right? I looked it up', type: 'dox' },
  { text: 'I know where you live, 456 Oak Avenue', type: 'dox' },
  { text: "Isn't your phone number 555-0142?", type: 'dox' },

  // Dox - Chinese
  { text: '我找到你家地址了：台北市信義區XX路123號', type: 'dox' },
  { text: '妳本名叫XXX對吧？我查到了', type: 'dox' },
  { text: '我知道妳住哪，小心點', type: 'dox' },
  { text: '妳的手機號碼是09xx-xxx-xxx？', type: 'dox' },

  // Spam
  { text: 'BUY FOLLOWERS CHEAP at totallylegit.com!!!', type: 'spam' },
  { text: '🔥🔥🔥 FREE GIFT CARDS click my profile 🔥🔥🔥', type: 'spam' },
  { text: 'FOLLOW MY CHANNEL FOLLOW MY CHANNEL FOLLOW MY CHANNEL', type: 'spam' },

  // Spam - Chinese
  { text: '買粉絲便宜！超划算！！！', type: 'spam' },
  { text: '🔥🔥🔥 免費禮物點我主頁 🔥🔥🔥', type: 'spam' },
  { text: '追蹤我追蹤我追蹤我', type: 'spam' },

  // Scam
  { text: 'Get rich quick! DM me for crypto tips 💰💰💰', type: 'scam' },
  { text: 'I can get you verified for $50, DM me', type: 'scam' },
  { text: "Send me your login and I'll boost your account", type: 'scam' },

  // Scam - Chinese
  { text: '快速致富！私我加密貨幣 tips 💰💰💰', type: 'scam' },
  { text: '我可以幫妳認證，只要$50', type: 'scam' },
  { text: '給我帳號密碼幫妳升級', type: 'scam' },
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
  '小貓咪',
  '直播粉絲',
  '夜貓子',
  '星星閃閃',
  '雲朵飘飘',
  '快樂追星',
  '月光寶盒',
  '可愛捏',
  '甜心派',
  '夢想家',
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
