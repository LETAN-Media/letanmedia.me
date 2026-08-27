// Shared Gemini helper for Cloudflare Pages Functions.
// SECURITY: API keys are read ONLY from environment variables (context.env).
// No hardcoded keys. Any previously committed key must be rotated/revoked.

const DEFAULT_MODEL = "gemini-2.5-flash";
const TIMEOUT_MS = 15000;
const MAX_OUTPUT_TOKENS = 1024;

function getGeminiKeys(env) {
  return [env.GEMINI_API_KEY_1, env.GEMINI_API_KEY_2].filter(Boolean);
}

/**
 * Call Gemini with a failover across configured API keys.
 * @param {object} args
 * @param {Array} args.messages  - chat messages [{role, content}]
 * @param {string} args.systemPrompt
 * @param {object} args.env      - Cloudflare context.env
 * @param {string} [args.model]
 * @returns {Promise<string>} trimmed reply text
 */
export async function generateGeminiReply({ messages, systemPrompt, env, model }) {
  const apiKeys = getGeminiKeys(env);
  if (!apiKeys.length) {
    throw new Error("Missing GEMINI_API_KEY_1 / GEMINI_API_KEY_2 environment variables");
  }

  const modelName = model || env.GEMINI_MODEL || DEFAULT_MODEL;

  // Gemini requires the conversation to start with a user turn.
  const filtered = [...messages];
  if (filtered.length && filtered[0]?.role === "assistant") filtered.shift();

  const contents = filtered
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  // Deterministic alternating start, then failover to the next key.
  let selectedIndex = Math.floor(messages.length / 2) % apiKeys.length;

  for (let attempt = 0; attempt < apiKeys.length; attempt++) {
    const apiKey = apiKeys[selectedIndex];
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { temperature: 0.7, maxOutputTokens: MAX_OUTPUT_TOKENS },
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text.trim();
      } else {
        console.warn(`Gemini key index ${selectedIndex} failed with status ${res.status}`);
      }
    } catch (err) {
      console.error(`Error using Gemini key index ${selectedIndex}:`, err.message);
    }
    selectedIndex = (selectedIndex + 1) % apiKeys.length;
  }

  throw new Error("All configured Gemini API keys failed to return a valid response.");
}
