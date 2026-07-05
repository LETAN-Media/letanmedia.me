import { buildLearningExamples } from './learning'
import { REPORT_AGENT_PROMPT } from './prompt'

export function buildDynamicPrompt() {
  const examples = buildLearningExamples()
  return `
${REPORT_AGENT_PROMPT}

Ví dụ trả lời tốt gần đây:
${examples}
`
}

export const REPORT_AGENT_SYSTEM_PROMPT = buildDynamicPrompt()
