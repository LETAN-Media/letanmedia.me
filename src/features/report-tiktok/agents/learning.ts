type GoodConversation = {
  user: string
  bot: string
  createdAt: number
}

const GOOD_CONVERSATIONS: GoodConversation[] = [
  {
    user: 'kênh hay video?',
    bot: 'Bạn muốn report kênh hay video ạ?',
    createdAt: Date.now(),
  },
  {
    user: 'mạo danh giá?',
    bot: 'Giá 3-4 triệu/kênh. Gửi link để mình kiểm tra và báo giá chính xác ạ.',
    createdAt: Date.now(),
  },
]

const BAD_PHRASES = [
  'bạn đã hoàn toàn nắm bắt',
  'quy trình và tone giọng',
  'dưới đây là một vài câu trả lời',
  'được tối ưu hóa',
  'dựa trên những gì bạn đã cung cấp',
  'LETAN MEDIA',
]

export function saveGoodConversation(user: string, bot: string) {
  if (!user || !bot) return
  GOOD_CONVERSATIONS.push({
    user: user.trim(),
    bot: bot.trim(),
    createdAt: Date.now(),
  })
  if (GOOD_CONVERSATIONS.length > 20) {
    GOOD_CONVERSATIONS.shift()
  }
}

export function buildLearningExamples() {
  return GOOD_CONVERSATIONS.slice(-3)
    .map((c) => `Khách: ${c.user}\nBot: ${c.bot}`)
    .join('\n\n')
}

export function isBadReportAnswer(answer: string) {
  const text = answer.toLowerCase()
  if (answer.length > 220) return true
  return BAD_PHRASES.some((p) => text.includes(p.toLowerCase()))
}

export function refineReportAnswer(userMsg: string, answer: string) {
  const msg = userMsg.toLowerCase()
  if (msg.includes('kênh')) {
    return 'Dạ bạn cần report kênh TikTok đúng không? Gửi giúp mình link kênh cần xử lý nhé.'
  }
  if (msg.includes('video')) {
    return 'Dạ bạn gửi giúp mình link video TikTok cần report nhé.'
  }
  if (msg.includes('giá') || msg.includes('bao nhiêu')) {
    return 'Dạ giá tùy loại report. Bạn gửi link kênh hoặc video để mình kiểm tra và báo giá chính xác nhé.'
  }
  if (msg.includes('mạo danh')) {
    return 'Dạ report mạo danh cần link kênh và thông tin bị mạo danh. Bạn gửi mình kiểm tra nhé.'
  }
  return 'Dạ bạn gửi giúp mình link kênh hoặc video TikTok cần xử lý nhé.'
}
